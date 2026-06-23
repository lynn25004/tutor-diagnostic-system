const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const crypto = require("crypto");

const root = __dirname;
const dataDir = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(root, "data");
const pdfDir = path.join(dataDir, "pdf-cache");
const sourceFile = path.join(dataDir, "source-cache.json");
const recordsFile = path.join(dataDir, "records.json");
const pendingImportFile = path.join(dataDir, "pending-imports.json");
const officialBankFile = path.join(dataDir, "official-question-bank.json");
const port = Number(process.env.PORT || 4173);
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const hasSupabase = Boolean(supabaseUrl && supabaseKey);
const teacherAccessCode = process.env.TEACHER_ACCESS_CODE || "";
const teacherCookieName = "td_teacher_session";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8"
};

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(pdfDir, { recursive: true });
ensureJson(sourceFile, { updatedAt: null, sources: [], notes: [] });
ensureJson(recordsFile, []);
ensureJson(pendingImportFile, []);
ensureJson(officialBankFile, []);

function ensureJson(file, fallback) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(fallback, null, 2), "utf8");
  }
}

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(file, value) {
  const tempFile = `${file}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(value, null, 2), "utf8");
  fs.renameSync(tempFile, file);
}

async function supabaseRequest(table, options = {}) {
  if (!hasSupabase) return null;
  const {
    method = "GET",
    query = "",
    body = undefined,
    prefer = ""
  } = options;
  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${table}${query}`, {
    method,
    headers: {
      apikey: supabaseKey,
      authorization: `Bearer ${supabaseKey}`,
      "content-type": "application/json",
      ...(prefer ? { prefer } : {})
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase ${table} ${method} 失敗：${response.status} ${text}`);
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function getRecordsStore() {
  if (!hasSupabase) return readJson(recordsFile, []);
  const rows = await supabaseRequest("student_records", {
    query: "?select=payload&order=updated_at.desc"
  });
  return rows.map((row) => row.payload);
}

async function setRecordsStore(records) {
  if (!hasSupabase) {
    writeJson(recordsFile, records);
    return;
  }
  await supabaseRequest("student_records", { method: "DELETE", query: "?id=not.is.null" });
  if (records.length) {
    await supabaseRequest("student_records", {
      method: "POST",
      body: records.map((record) => ({
        id: record.id,
        student_name: record.studentName,
        grade_label: record.gradeLabel,
        payload: record,
        updated_at: new Date().toISOString()
      })),
      prefer: "return=minimal"
    });
  }
}

async function getOfficialBankStore() {
  if (!hasSupabase) return readJson(officialBankFile, []);
  const rows = await supabaseRequest("official_question_bank", {
    query: "?select=payload&order=approved_at.desc"
  });
  return rows.map((row) => row.payload);
}

async function setOfficialBankStore(items) {
  if (!hasSupabase) {
    writeJson(officialBankFile, items);
    return;
  }
  await supabaseRequest("official_question_bank", { method: "DELETE", query: "?id=not.is.null" });
  if (items.length) {
    await supabaseRequest("official_question_bank", {
      method: "POST",
      body: items.map((item) => ({
        id: item.id,
        year: item.year,
        subject: item.subject,
        title: item.title,
        source_url: item.url,
        payload: item,
        approved_at: item.approvedAt || new Date().toISOString()
      })),
      prefer: "return=minimal"
    });
  }
}

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "content-type": type,
    "cache-control": "no-store"
  });
  res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body, null, 2));
}

function redirect(res, location) {
  res.writeHead(302, {
    location,
    "cache-control": "no-store"
  });
  res.end();
}

function teacherSessionToken() {
  return crypto
    .createHash("sha256")
    .update(`teacher:${teacherAccessCode}`)
    .digest("hex");
}

function parseCookies(req) {
  return Object.fromEntries(
    String(req.headers.cookie || "")
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const index = item.indexOf("=");
        return index === -1 ? [item, ""] : [item.slice(0, index), decodeURIComponent(item.slice(index + 1))];
      })
  );
}

function isTeacherAuthenticated(req) {
  if (!teacherAccessCode) return true;
  return parseCookies(req)[teacherCookieName] === teacherSessionToken();
}

function requireTeacher(req, res) {
  if (isTeacherAuthenticated(req)) return true;
  send(res, 401, { ok: false, error: "teacher_auth_required" });
  return false;
}

function setTeacherCookie(res) {
  res.setHeader(
    "set-cookie",
    `${teacherCookieName}=${encodeURIComponent(teacherSessionToken())}; HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000`
  );
}

function clearTeacherCookie(res) {
  res.setHeader(
    "set-cookie",
    `${teacherCookieName}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`
  );
}

function serveStatic(req, res) {
  const requested = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);
  const safePath = requested === "/" ? "/index.html" : requested;
  const filePath = path.normalize(path.join(root, safePath));

  if (!filePath.startsWith(root)) {
    send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    send(res, 404, "Not found", "text/plain; charset=utf-8");
    return;
  }

  send(res, 200, fs.readFileSync(filePath), mime[path.extname(filePath)] || "application/octet-stream");
}

async function syncSources() {
  const recentYears = recentRocYears(10);
  const targets = [
    {
      key: "cap",
      title: "國中教育會考官方網站",
      url: "https://cap.rcpet.edu.tw/"
    },
    {
      key: "cap-examination",
      title: "國中教育會考歷屆試題官方頁",
      url: "https://cap.rcpet.edu.tw/examination.html",
      years: recentYears
    },
    {
      key: "naer",
      title: "國家教育研究院課程綱要資源",
      url: "https://www.naer.edu.tw/"
    }
  ];

  const sources = [];
  const notes = [];

  for (const target of targets) {
    try {
      const response = await fetch(target.url, { headers: { "user-agent": "TutorDiagnosticSystem/1.0" } });
      const html = await response.text();
      const linkMatches = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gims)]
        .map((match) => ({
          href: new URL(match[1], target.url).toString(),
          text: cleanText(match[2])
        }))
        .filter((item) => /試題|題本|參考答案|課程綱要|素養|命題|國文|英語|數學|社會|自然|會考/.test(item.text))
        .slice(0, 30);

      const yearMatches = target.years
        ? target.years.map((year) => ({
          year,
          href: target.url,
          text: `${year}年國中教育會考`,
          foundOnPage: html.includes(`${year}年國中教育會考`)
        }))
        : [];

      sources.push({
        ...target,
        fetchedAt: new Date().toISOString(),
        status: response.status,
        recentYears: target.years || [],
        matches: [...yearMatches, ...linkMatches]
      });
    } catch (error) {
      notes.push(`${target.title} 同步失敗：${error.message}`);
      sources.push({
        ...target,
        fetchedAt: new Date().toISOString(),
        status: "failed",
        matches: []
      });
    }
  }

  const payload = {
    updatedAt: new Date().toISOString(),
    recentYears,
    sources,
    notes,
    policy: "官方題目可作為題庫核心；近十年同步範圍會以目前民國年往前推十年，例如 115 年時同步 106-115 年。匯入時需保留年份、科目、來源網址、匯入時間與使用備註。PDF/圖片題本解析建議進入待審核區後人工確認。"
  };
  writeJson(sourceFile, payload);
  return payload;
}

function recentRocYears(count) {
  const currentRocYear = new Date().getFullYear() - 1911;
  return Array.from({ length: count }, (_, index) => currentRocYear - index);
}

function cleanText(value) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString("utf8").replace(/^\uFEFF/, "");
  return text ? JSON.parse(text) : {};
}

function importCandidates() {
  const sourceCache = readJson(sourceFile, { sources: [] });
  const seen = new Set();
  const candidates = [];

  for (const source of sourceCache.sources || []) {
    for (const match of source.matches || []) {
      const href = match.href || "";
      const text = match.text || "";
      const looksPdf = /\.pdf($|\?)/i.test(href) || /drive\.google\.com\/file/i.test(href) || /PDF|PDF檔|試題|題本|參考答案/.test(text);
      if (!looksPdf || seen.has(href)) continue;
      seen.add(href);
      candidates.push({
        id: safeId(href),
        title: text || href,
        url: href,
        sourceTitle: source.title,
        year: inferYear(`${text} ${href}`),
        subject: inferSubject(`${text} ${href}`),
        imported: false
      });
    }
  }

  const pending = readJson(pendingImportFile, []);
  candidates.forEach((candidate) => {
    candidate.imported = pending.some((item) => item.url === candidate.url);
  });
  return candidates;
}

async function importPdfCandidate(body) {
  if (!body.url) throw new Error("缺少 PDF 來源網址");
  const id = safeId(body.url);
  const fileName = `${body.year || "unknown"}-${body.subject || "unknown"}-${id}.pdf`;
  const filePath = path.join(pdfDir, fileName);
  let response;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    response = await fetch(downloadUrl(body.url), {
      headers: { "user-agent": "TutorDiagnosticSystem/1.0" },
      signal: controller.signal
    });
  } catch (error) {
    if (error.name === "AbortError") throw new Error("下載逾時：官方 PDF 來源回應過慢，請稍後重試或改選其他候選。");
    throw error;
  } finally {
    clearTimeout(timeout);
  }
  if (!response.ok) throw new Error(`下載失敗：HTTP ${response.status}`);

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.mkdirSync(pdfDir, { recursive: true });
  fs.writeFileSync(filePath, buffer);
  let extractedText = "";
  let extractionError = "";
  try {
    extractedText = extractPdfText(buffer).slice(0, 5000);
  } catch (error) {
    extractionError = error.message;
  }
  const quality = textQuality(extractedText);
  const item = {
    id,
    title: body.title || body.url,
    url: body.url,
    sourceTitle: body.sourceTitle || "官方來源",
    year: body.year || inferYear(`${body.title || ""} ${body.url}`),
    subject: body.subject || inferSubject(`${body.title || ""} ${body.url}`),
    fileName,
    filePath,
    importedAt: new Date().toISOString(),
    status: "pending_review",
    extractedText,
    textPreview: extractedText.slice(0, 1200),
    extractionNote: extractionError
      ? `PDF 已下載，但初步文字擷取失敗：${extractionError}。請使用進階 PDF/OCR 解析。`
      : extractedText.length && quality >= 0.35
      ? "已完成初步文字擷取，仍建議人工核對題號、圖片與表格。"
      : "PDF 已下載，但文字擷取品質不足；可能是掃描圖檔、內嵌字型或編碼特殊，需使用進階 PDF/OCR 解析。",
    extractionQuality: quality
  };

  const pending = readJson(pendingImportFile, []);
  const next = [item, ...pending.filter((old) => old.id !== id)];
  writeJson(pendingImportFile, next);
  return item;
}

function downloadUrl(url) {
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
  return url;
}

async function approveImport(body) {
  const pending = readJson(pendingImportFile, []);
  const official = await getOfficialBankStore();
  const item = pending.find((entry) => entry.id === body.id);
  if (!item) throw new Error("找不到待審核項目");

  const approved = {
    ...item,
    status: "approved",
    approvedAt: new Date().toISOString(),
    usageNote: body.usageNote || "官方題目全文作為題庫核心，已保留來源、年份、科目與網址。"
  };
  await setOfficialBankStore([approved, ...official.filter((entry) => entry.id !== body.id)]);
  writeJson(pendingImportFile, pending.map((entry) => entry.id === body.id ? approved : entry));
  return approved;
}

function safeId(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash).toString(16);
}

function inferYear(text) {
  const match = text.match(/(10[0-9]|11[0-9])\s*年/);
  return match ? Number(match[1]) : null;
}

function inferSubject(text) {
  if (/國文/.test(text)) return "國文";
  if (/英語|英文/.test(text)) return "英語";
  if (/數學/.test(text)) return "數學";
  if (/社會|地理|歷史|公民/.test(text)) return "社會";
  if (/自然|生物|理化|物理|化學/.test(text)) return "自然";
  if (/寫作/.test(text)) return "寫作";
  return "未分類";
}

function extractPdfText(buffer) {
  const raw = buffer.subarray(0, Math.min(buffer.length, 220000)).toString("latin1");
  const chunks = [];
  const streamPattern = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let match;
  let streamCount = 0;

  while ((match = streamPattern.exec(raw)) && streamCount < 12) {
    streamCount += 1;
    const streamBuffer = Buffer.from(match[1], "latin1");
    const inflated = tryInflate(streamBuffer);
    const textSource = inflated
      ? inflated.subarray(0, Math.min(inflated.length, 60000)).toString("latin1")
      : match[1].slice(0, 60000);
    chunks.push(...extractPdfStrings(textSource));
    if (chunks.length > 300) break;
  }

  return chunks
    .join(" ")
    .replace(/\\[rn]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tryInflate(buffer) {
  const attempts = [
    () => zlib.inflateSync(buffer),
    () => zlib.inflateRawSync(buffer)
  ];

  for (const attempt of attempts) {
    try {
      return attempt();
    } catch {
      // Try next decoder.
    }
  }
  return null;
}

function extractPdfStrings(value) {
  const strings = [];
  const literalPattern = /\(([^()]|\\.){2,200}\)/g;
  let match;
  while ((match = literalPattern.exec(value)) && strings.length < 300) {
    strings.push(match[0].slice(1, -1).replace(/\\([()\\])/g, "$1"));
  }
  return strings.filter((item) => /[\w\u0080-\uffff]/.test(item));
}

function textQuality(text) {
  if (!text) return 0;
  const meaningful = [...text].filter((char) => /[A-Za-z0-9\u4e00-\u9fff，。？！、：；「」]/.test(char)).length;
  return meaningful / Math.max(text.length, 1);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);

  try {
    if (req.method === "GET" && url.pathname === "/teacher.html" && !isTeacherAuthenticated(req)) {
      redirect(res, "/teacher-login.html");
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/health") {
      send(res, 200, { ok: true, port, storage: hasSupabase ? "supabase" : "json", now: new Date().toISOString() });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/auth/teacher") {
      send(res, 200, { ok: true, authenticated: isTeacherAuthenticated(req), enabled: Boolean(teacherAccessCode) });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/auth/teacher") {
      const body = await readBody(req);
      if (!teacherAccessCode || body.code === teacherAccessCode) {
        setTeacherCookie(res);
        send(res, 200, { ok: true });
      } else {
        send(res, 401, { ok: false, error: "密碼不正確" });
      }
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/auth/logout") {
      clearTeacherCookie(res);
      send(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/sources") {
      if (!requireTeacher(req, res)) return;
      send(res, 200, readJson(sourceFile, { updatedAt: null, sources: [] }));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/sources/sync") {
      if (!requireTeacher(req, res)) return;
      send(res, 200, await syncSources());
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/records") {
      if (!requireTeacher(req, res)) return;
      send(res, 200, await getRecordsStore());
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/records") {
      if (!requireTeacher(req, res)) return;
      const body = await readBody(req);
      await setRecordsStore(body);
      send(res, 200, { ok: true, savedAt: new Date().toISOString() });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/import/candidates") {
      if (!requireTeacher(req, res)) return;
      send(res, 200, importCandidates());
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/import/pending") {
      if (!requireTeacher(req, res)) return;
      send(res, 200, readJson(pendingImportFile, []));
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/import/official-bank") {
      if (!requireTeacher(req, res)) return;
      send(res, 200, await getOfficialBankStore());
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/import/download") {
      if (!requireTeacher(req, res)) return;
      send(res, 200, await importPdfCandidate(await readBody(req)));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/import/approve") {
      if (!requireTeacher(req, res)) return;
      send(res, 200, await approveImport(await readBody(req)));
      return;
    }

    serveStatic(req, res);
  } catch (error) {
    send(res, 500, { ok: false, error: error.message });
  }
});

server.listen(port, () => {
  console.log(`家教診斷系統已啟動：http://localhost:${port}`);
});
