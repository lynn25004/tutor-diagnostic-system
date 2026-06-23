const STORAGE_KEYS = {
  activeTest: "smartTutor.activeTest",
  latestSubmission: "smartTutor.latestSubmission",
  records: "smartTutor.records",
  bankVersion: "smartTutor.bankVersion"
};

const gradeOptions = {
  elementary: [
    ["e3", "國小三年級"],
    ["e4", "國小四年級"],
    ["e5", "國小五年級"],
    ["e6", "國小六年級"]
  ],
  junior: [
    ["j1", "國中一年級"],
    ["j2", "國中二年級"],
    ["j3", "國中三年級"]
  ]
};

const subjectLabels = {
  all: "全科混合",
  chinese: "國文",
  math: "數學",
  english: "英語",
  social: "社會",
  science: "自然",
  social_geography: "社會：地理",
  social_history: "社會：歷史",
  social_civics: "社會：公民",
  science_biology: "自然：生物",
  science_physics: "自然：物理",
  science_chemistry: "自然：化學"
};

const subjectOptions = {
  elementary: [
    ["all", "全科混合"],
    ["chinese", "國文"],
    ["math", "數學"],
    ["english", "英語"],
    ["social", "社會"],
    ["science", "自然"]
  ],
  junior: [
    ["all", "全科混合"],
    ["chinese", "國文"],
    ["math", "數學"],
    ["english", "英語"],
    ["social_geography", "社會：地理"],
    ["social_history", "社會：歷史"],
    ["social_civics", "社會：公民"],
    ["science_biology", "自然：生物"],
    ["science_physics", "自然：物理"],
    ["science_chemistry", "自然：化學"]
  ]
};

const subjectOrder = {
  elementary: ["chinese", "math", "english", "social", "science"],
  junior: [
    "chinese",
    "math",
    "english",
    "social_geography",
    "social_history",
    "social_civics",
    "science_biology",
    "science_physics",
    "science_chemistry"
  ]
};

const gradeProfiles = {
  e3: "國小三年級重點在讀題、基本四則、詞語理解、英語單字與生活觀察。",
  e4: "國小四年級開始檢查分數初步、段落大意、be 動詞與自然社會基本概念。",
  e5: "國小五年級要看多步驟應用、小數與面積、主旨判斷、句型理解與資料判讀。",
  e6: "國小六年級要確認升國中銜接能力，包含推論、整合、跨題型表達與檢查習慣。",
  j1: "國中一年級重點是銜接國中科目語言：方程式、文言詞、基礎文法、史地公民與生物基本概念。",
  j2: "國中二年級重點是比例幾何、閱讀推論、時態與比較、力與運動、地理歷史公民因果。",
  j3: "國中三年級以會考趨勢為核心，重視素養情境、圖表判讀、跨單元整合與理由說明。"
};

const trendSources = [
  {
    title: "近年國中教育會考趨勢",
    label: "官方歷屆試題與會考命題方向",
    note: "出題越來越重視生活情境、資料判讀、跨單元整合與學生是否能說明理由。本系統只建立類題，不複製原題。",
    url: "https://cap.rcpet.edu.tw/"
  },
  {
    title: "十二年國教課綱精神",
    label: "核心素養、探究、應用",
    note: "題目不只測記憶，會加入讀懂文本、圖表資訊、推論、應用與表達。",
    url: "https://www.naer.edu.tw/"
  },
  {
    title: "題庫更新紀錄",
    label: "2026-06-22 seed bank",
    note: "已存入來源欄位、趨勢標籤、年級、科目、目標與能力標籤。目前靜態版會把題庫與紀錄存在瀏覽器本機；真正自動上網更新需接後端排程與人工審題流程。",
    url: ""
  }
];

const bankVersion = {
  date: "2026-06-22",
  description: "依國小/國中年級、學習目標、國中分科與會考素養趨勢建立的來源感知題庫；未來可接官方來源更新器。"
};

const questionBank = [
  q("e3-math-foundation-1", "elementary", ["e3"], "math", ["foundation"], "整數四則", "媽媽買了 3 包貼紙，每包 12 張，又多送 5 張，共有幾張？", ["36", "41", "47", "60"], "41", "生活情境四則類題", "課綱基礎能力類題", "先乘後加：3 × 12 + 5 = 41。"),
  q("e4-math-school-1", "elementary", ["e4"], "math", ["school"], "分數等值", "下列哪一個分數和 2/3 一樣大？", ["3/4", "4/6", "5/9", "6/12"], "4/6", "分數概念類題", "課綱基礎能力類題", "2/3 的分子分母同乘 2 得 4/6。"),
  q("e5-math-exam-1", "elementary", ["e5"], "math", ["exam"], "小數應用", "一瓶果汁 1.25 公升，4 瓶共有幾公升？", ["4.25", "4.5", "5", "5.25"], "5", "生活量感類題", "國小評量常見題型", "1.25 × 4 = 5。"),
  q("e6-math-advanced-1", "elementary", ["e6"], "math", ["advanced", "exam"], "比例推理", "4 人 6 天完成一件工作，若效率相同，8 人完成同一工作約需幾天？", ["2 天", "3 天", "6 天", "12 天"], "3 天", "反比推理類題", "升國中銜接類題", "人數加倍，時間減半，6 ÷ 2 = 3。"),

  q("e3-chinese-foundation-1", "elementary", ["e3"], "chinese", ["foundation"], "詞語理解", "「仔細」最接近哪個意思？", ["很快", "認真留意", "很生氣", "很遙遠"], "認真留意", "語詞理解類題", "課綱基礎能力類題", "仔細表示認真觀察或注意。"),
  q("e4-chinese-school-1", "elementary", ["e4"], "chinese", ["school"], "句意判讀", "「雨停了，操場又熱鬧起來。」這句話暗示什麼？", ["學生回到操場活動", "操場被關閉", "雨越下越大", "天色變黑"], "學生回到操場活動", "短句推論類題", "閱讀理解類題", "雨停後操場熱鬧，表示有人回到操場活動。"),
  q("e5-chinese-exam-1", "elementary", ["e5"], "chinese", ["exam"], "段落主旨", "一段文字反覆提到減塑、環保杯和重複使用，主旨最可能是什麼？", ["保護環境", "介紹運動", "描寫月亮", "說明古蹟"], "保護環境", "主旨判斷類題", "素養閱讀類題", "關鍵詞都指向減少浪費與環境保護。"),
  q("e6-chinese-advanced-1", "elementary", ["e6"], "chinese", ["advanced"], "推論作者態度", "作者說「真正的勇敢，是承認害怕後仍願意前進」，最可能想表達什麼？", ["勇敢不是沒有害怕", "害怕的人不能成功", "前進一定會失敗", "承認錯誤沒有用"], "勇敢不是沒有害怕", "觀點推論類題", "升國中銜接類題", "句子強調害怕與勇敢可以同時存在。"),

  q("e3-english-foundation-1", "elementary", ["e3"], "english", ["foundation"], "基礎單字", "Which word means 「書」?", ["book", "bag", "bird", "bed"], "book", "單字類題", "課綱基礎能力類題", "book 是書。"),
  q("e4-english-school-1", "elementary", ["e4"], "english", ["school"], "be 動詞", "They ___ happy.", ["am", "is", "are", "be"], "are", "be 動詞類題", "國小英語常見題型", "They 搭配 are。"),
  q("e5-english-exam-1", "elementary", ["e5"], "english", ["exam"], "現在簡單式", "My brother ___ baseball every Sunday.", ["play", "plays", "played", "playing"], "plays", "動詞變化類題", "國小英語常見題型", "第三人稱單數 brother，動詞加 s。"),
  q("e6-english-advanced-1", "elementary", ["e6"], "english", ["advanced"], "短文理解", "Mia forgot her umbrella, so she got wet. Why did Mia get wet?", ["She forgot her umbrella.", "She was hungry.", "She bought a pen.", "She went to bed."], "She forgot her umbrella.", "閱讀理解類題", "升國中銜接類題", "短文說她忘了雨傘，所以淋濕。"),

  q("j1-math-foundation-1", "junior", ["j1"], "math", ["foundation"], "一元一次方程式", "若 2x + 7 = 19，x 等於多少？", ["4", "5", "6", "7"], "6", "基礎代數類題", "國中銜接常見題型", "2x = 12，所以 x = 6。"),
  q("j2-math-school-1", "junior", ["j2"], "math", ["school"], "幾何角度", "三角形兩內角為 48 度和 72 度，第三角是多少？", ["50 度", "60 度", "70 度", "80 度"], "60 度", "幾何概念類題", "國中段考常見題型", "三角形內角和 180 度。"),
  q("j3-math-exam-1", "junior", ["j3"], "math", ["exam"], "資料判讀", "某班五次小考平均分別為 72、76、78、82、87，最合理的描述是？", ["成績逐步上升", "成績逐步下降", "完全沒有變化", "無法比較"], "成績逐步上升", "趨勢判讀類題", "會考素養類題", "數據由 72 到 87，呈現上升趨勢。"),
  q("j3-math-advanced-1", "junior", ["j3"], "math", ["advanced"], "函數應用", "若 y = 3x - 2，當 x 增加 2 時，y 會增加多少？", ["2", "3", "5", "6"], "6", "函數變化類題", "會考素養類題", "x 每增加 1，y 增加 3；增加 2 則 y 增加 6。"),

  q("j1-chinese-foundation-1", "junior", ["j1"], "chinese", ["foundation"], "文言詞義", "文言文中的「汝」通常指誰？", ["你", "我", "他", "大家"], "你", "文言詞義類題", "國中銜接常見題型", "汝是第二人稱，意思是你。"),
  q("j2-chinese-school-1", "junior", ["j2"], "chinese", ["school"], "修辭判斷", "「他的笑容像陽光一樣溫暖」使用哪種修辭？", ["譬喻", "排比", "設問", "頂真"], "譬喻", "修辭類題", "國中段考常見題型", "把笑容比作陽光，是譬喻。"),
  q("j3-chinese-exam-1", "junior", ["j3"], "chinese", ["exam"], "觀點推論", "若文章先提出社群媒體焦慮，再討論使用界線，作者最可能主張什麼？", ["應建立健康使用習慣", "應完全禁止閱讀", "手機沒有任何影響", "所有留言都可信"], "應建立健康使用習慣", "議題閱讀類題", "會考素養類題", "問題與解方都指向健康使用。"),

  q("j1-english-foundation-1", "junior", ["j1"], "english", ["foundation"], "時態基礎", "I ___ TV last night.", ["watch", "watches", "watched", "watching"], "watched", "過去式類題", "國中銜接常見題型", "last night 表示過去時間。"),
  q("j2-english-school-1", "junior", ["j2"], "english", ["school"], "比較級", "This question is ___ than that one.", ["easy", "easier", "easiest", "more easy"], "easier", "比較級類題", "國中段考常見題型", "than 前使用比較級，easy 變 easier。"),
  q("j3-english-exam-1", "junior", ["j3"], "english", ["exam"], "閱讀推論", "Lily missed breakfast and felt dizzy in class. What should she do next time?", ["Eat breakfast before school.", "Sleep in class.", "Skip lunch.", "Run faster."], "Eat breakfast before school.", "生活情境閱讀類題", "會考素養類題", "短文指出沒吃早餐導致不舒服，因此應吃早餐。"),

  q("j1-geo-foundation-1", "junior", ["j1"], "social_geography", ["foundation"], "經緯度", "表示南北位置的線稱為什麼？", ["緯線", "經線", "等高線", "海岸線"], "緯線", "地圖判讀類題", "國中社會基礎題型", "緯線表示南北位置。"),
  q("j2-geo-school-1", "junior", ["j2"], "social_geography", ["school"], "等高線", "等高線越密集，通常代表坡度如何？", ["越陡", "越平坦", "一定是海洋", "一定是盆地"], "越陡", "圖表判讀類題", "國中段考常見題型", "短距離高度變化大，坡度較陡。"),
  q("j3-geo-exam-1", "junior", ["j3"], "social_geography", ["exam"], "區域發展", "若一地交通便利、就業機會多，最可能出現什麼現象？", ["人口較集中", "人口完全消失", "降雨一定增加", "地震一定減少"], "人口較集中", "生活地理類題", "會考素養類題", "交通與就業會影響人口聚集。"),

  q("j1-history-foundation-1", "junior", ["j1"], "social_history", ["foundation"], "史料判讀", "日記、照片、書信可用來研究過去，稱為什麼？", ["史料", "公式", "礦物", "氣壓"], "史料", "史料類題", "國中社會基礎題型", "儲存過去資訊的資料可作為史料。"),
  q("j2-history-school-1", "junior", ["j2"], "social_history", ["school"], "歷史因果", "分析一場改革的原因、經過與影響，是在理解什麼？", ["歷史因果", "化學反應", "英文文法", "地形坡度"], "歷史因果", "因果推論類題", "國中段考常見題型", "歷史學習需要理解事件前後關係。"),
  q("j3-history-exam-1", "junior", ["j3"], "social_history", ["exam"], "時代特色", "若資料顯示商業活絡、城市興起，最可能反映哪種變化？", ["經濟與社會變遷", "物種分類", "文法時態", "電路通路"], "經濟與社會變遷", "資料判讀類題", "會考素養類題", "商業與城市發展反映經濟社會改變。"),

  q("j1-civics-foundation-1", "junior", ["j1"], "social_civics", ["foundation"], "法律規範", "法律主要功能之一是什麼？", ["維持秩序", "改變天氣", "增加音量", "測量高度"], "維持秩序", "公民基礎類題", "國中社會基礎題型", "法律規範行為並維持社會秩序。"),
  q("j2-civics-school-1", "junior", ["j2"], "social_civics", ["school"], "權利義務", "國民接受教育，通常同時涉及什麼？", ["權利與義務", "經緯度", "酸與鹼", "力與速度"], "權利與義務", "公民概念類題", "國中段考常見題型", "受教育是權利，也和義務相關。"),
  q("j3-civics-exam-1", "junior", ["j3"], "social_civics", ["exam"], "媒體識讀", "看到未查證的網路訊息時，最適合怎麼做？", ["查證來源再判斷", "立刻轉傳", "只看標題", "刪掉所有資料"], "查證來源再判斷", "媒體素養類題", "會考素養類題", "近年素養題重視資訊判讀與公民行動。"),

  q("j1-bio-foundation-1", "junior", ["j1"], "science_biology", ["foundation"], "細胞概念", "生物體構造與功能的基本單位是什麼？", ["細胞", "器官", "系統", "族群"], "細胞", "生物基礎類題", "國中自然基礎題型", "細胞是生物體基本單位。"),
  q("j2-bio-school-1", "junior", ["j2"], "science_biology", ["school"], "消化系統", "消化系統主要功能是什麼？", ["分解食物並吸收養分", "製造地震", "測量緯度", "產生法律"], "分解食物並吸收養分", "人體系統類題", "國中段考常見題型", "消化系統負責處理食物與吸收養分。"),
  q("j3-bio-exam-1", "junior", ["j3"], "science_biology", ["exam"], "生態系", "植物在生態系中通常扮演什麼角色？", ["生產者", "消費者", "分解者", "寄生者"], "生產者", "生態類題", "會考素養類題", "植物能行光合作用，通常是生產者。"),

  q("j1-physics-foundation-1", "junior", ["j1"], "science_physics", ["foundation"], "速度概念", "速度可用哪個方式計算？", ["距離 ÷ 時間", "時間 ÷ 距離", "質量 ÷ 體積", "溫度 × 面積"], "距離 ÷ 時間", "物理基礎類題", "國中自然基礎題型", "速度是單位時間內移動距離。"),
  q("j2-physics-school-1", "junior", ["j2"], "science_physics", ["school"], "電路概念", "要讓燈泡發亮，電路通常必須是什麼？", ["通路", "斷路", "沒有電池", "只有塑膠"], "通路", "電學類題", "國中段考常見題型", "完整通路才能讓電流通過。"),
  q("j3-physics-exam-1", "junior", ["j3"], "science_physics", ["exam"], "圖表判讀", "若物體在相同時間內移動距離越大，代表速度如何？", ["越快", "越慢", "一定停止", "無法判斷任何事"], "越快", "運動圖像類題", "會考素養類題", "同時間距離越大，速度越快。"),

  q("j1-chem-foundation-1", "junior", ["j1"], "science_chemistry", ["foundation"], "物質分類", "水的化學式是什麼？", ["H2O", "CO2", "O2", "NaCl"], "H2O", "化學基礎類題", "國中自然基礎題型", "水由氫與氧組成，化學式 H2O。"),
  q("j2-chem-school-1", "junior", ["j2"], "science_chemistry", ["school"], "化學變化", "鐵生鏽通常屬於哪一種變化？", ["化學變化", "單純形狀改變", "位置改變", "音量改變"], "化學變化", "反應概念類題", "國中段考常見題型", "生鏽產生新物質。"),
  q("j3-chem-exam-1", "junior", ["j3"], "science_chemistry", ["exam"], "酸鹼判斷", "石蕊試紙常用來判斷溶液的什麼性質？", ["酸鹼性", "重量", "體積", "透明度"], "酸鹼性", "實驗判讀類題", "會考素養類題", "石蕊試紙可判斷酸性或鹼性。")
];

function q(id, stage, grades, subject, goals, skill, prompt, options, answer, trend, source, explanation) {
  return { id, stage, grades, subject, goals, skill, prompt, options, answer, trend, source, explanation };
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

async function apiGet(path, fallback) {
  if (location.protocol === "file:") return fallback;
  try {
    const response = await fetch(path);
    return response.ok ? response.json() : fallback;
  } catch {
    return fallback;
  }
}

async function apiPost(path, value) {
  if (location.protocol === "file:") return false;
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(value)
    });
    return response.ok;
  } catch {
    return false;
  }
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-TW", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function initTeacher() {
  const els = {
    studentName: document.querySelector("#studentName"),
    stage: document.querySelector("#stage"),
    grade: document.querySelector("#grade"),
    subject: document.querySelector("#subject"),
    goal: document.querySelector("#goal"),
    count: document.querySelector("#count"),
    teacherNote: document.querySelector("#teacherNote"),
    gradeFocus: document.querySelector("#gradeFocus"),
    activeTestLabel: document.querySelector("#activeTestLabel"),
    latestSubmissionLabel: document.querySelector("#latestSubmissionLabel"),
    bankVersionLabel: document.querySelector("#bankVersionLabel")
  };

  function refreshSelects() {
    els.grade.innerHTML = gradeOptions[els.stage.value].map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
    refreshSubjects();
    refreshFocus();
  }

  function refreshSubjects() {
    els.subject.innerHTML = subjectOptions[els.stage.value].map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
  }

  function refreshFocus() {
    els.gradeFocus.textContent = gradeProfiles[els.grade.value];
  }

  els.stage.addEventListener("change", refreshSelects);
  els.grade.addEventListener("change", refreshFocus);
  refreshSelects();

  document.querySelector("#logoutTeacherBtn")?.addEventListener("click", async () => {
    await apiPost("/api/auth/logout", {});
    location.href = "./teacher-login.html";
  });

  document.querySelector("#buildTestBtn").addEventListener("click", () => {
    const config = {
      id: uid("test"),
      studentName: els.studentName.value.trim() || "未命名學生",
      stage: els.stage.value,
      grade: els.grade.value,
      gradeLabel: els.grade.options[els.grade.selectedIndex].textContent,
      subject: els.subject.value,
      subjectLabel: subjectLabels[els.subject.value],
      goal: els.goal.value,
      goalLabel: els.goal.options[els.goal.selectedIndex].textContent,
      count: Number(els.count.value),
      teacherNote: els.teacherNote.value.trim(),
      createdAt: new Date().toISOString()
    };
    const questions = pickQuestions(config);
    writeJson(STORAGE_KEYS.activeTest, { config, questions });
    localStorage.removeItem(STORAGE_KEYS.latestSubmission);
    writeJson(STORAGE_KEYS.bankVersion, bankVersion);
    renderTeacher();
    alert("測驗已建立。請開啟學生作答頁。");
  });

  document.querySelector("#saveRecordBtn").addEventListener("click", saveLatestRecord);
  document.querySelector("#saveLongNoteBtn").addEventListener("click", saveLongNote);
  document.querySelector("#exportRecordBtn").addEventListener("click", exportRecord);
  document.querySelector("#syncSourcesBtn").addEventListener("click", syncOfficialSources);
  document.querySelector("#refreshImportBtn").addEventListener("click", renderImportPanel);

  renderSources();
  renderImportPanel();
  renderTeacher();
}

function pickQuestions(config) {
  const order = config.subject === "all" ? subjectOrder[config.stage] : [config.subject];
  const picked = [];

  order.forEach((subject) => {
    const pool = rankedPool(config, subject).filter((question) => !picked.some((item) => item.id === question.id));
    if (pool[0]) picked.push(pool[0]);
    const generated = makeGeneratedQuestion(config, subject, picked.length + 1);
    if (picked.length < config.count && !picked.some((item) => item.prompt === generated.prompt)) picked.push(generated);
  });

  const fullPool = (config.subject === "all" ? order : [config.subject])
    .flatMap((subject) => rankedPool(config, subject))
    .filter((question, index, arr) => arr.findIndex((item) => item.id === question.id) === index);

  fullPool.forEach((question) => {
    if (picked.length < config.count && !picked.some((item) => item.id === question.id)) picked.push(question);
  });

  let generateIndex = 1;
  while (picked.length < config.count) {
    const subject = order[(picked.length + generateIndex - 1) % order.length];
    const generated = ensureUniqueQuestion(makeGeneratedQuestion(config, subject, generateIndex), picked, generateIndex);
    picked.push(generated);
    generateIndex += 1;
  }

  return picked.slice(0, config.count);
}

function rankedPool(config, subject) {
  return questionBank
    .filter((question) => question.stage === config.stage && question.subject === subject)
    .map((question) => {
      let score = 0;
      if (question.grades.includes(config.grade)) score += 8;
      if (question.goals.includes(config.goal)) score += 6;
      if (config.goal === "exam" && question.trend.includes("素養")) score += 4;
      if (config.goal === "foundation" && question.skill.includes("基礎")) score += 2;
      return { question, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.question);
}

function makeGeneratedQuestion(config, subject, index) {
  const gradeText = config.gradeLabel;
  const goalText = config.goalLabel;
  const subjectText = subjectLabels[subject];
  const source = config.stage === "junior"
    ? "系統生成會考趨勢類題，參考國中教育會考素養導向與十二年國教課綱精神"
    : "系統生成年級診斷類題，參考十二年國教課綱能力指標精神";
  const trend = config.goal === "exam"
    ? "近年趨勢：情境閱讀、資料判讀、跨單元應用"
    : config.goal === "foundation"
      ? "基礎趨勢：先確認前置概念與讀題能力"
      : config.goal === "advanced"
        ? "進階趨勢：舉一反三與解釋理由"
        : "校內趨勢：概念熟練與題型遷移";

  const templateSet = generatedTemplates[subject] || generatedTemplates.general;
  const templates = Array.isArray(templateSet) ? templateSet : [templateSet];
  const variantSeed = Math.abs(hashText(`${config.id}-${config.grade}-${subject}-${config.goal}-${index}`));
  const template = templates[variantSeed % templates.length];
  const level = config.goal === "advanced" || config.goal === "exam" ? "整合應用" : "核心概念";
  const built = template(config, index, variantSeed);

  return {
    id: `generated-${config.grade}-${subject}-${config.goal}-${index}-${variantSeed}`,
    stage: config.stage,
    grades: [config.grade],
    subject,
    goals: [config.goal],
    skill: built.skill || `${subjectText}${level}`,
    prompt: built.prompt,
    options: rotateOptions(built.options, variantSeed),
    answer: built.answer,
    trend,
    source,
    explanation: built.explanation || `這是依 ${gradeText}、${subjectText}、${goalText} 自動生成的診斷類題，用來補足題庫並確認學生是否能遷移概念。`
  };
}

function ensureUniqueQuestion(question, picked, index) {
  if (!picked.some((item) => item.prompt === question.prompt)) return question;
  return {
    ...question,
    id: `${question.id}-variant-${index}`,
    skill: `${question.skill}變化題`,
    prompt: `${question.prompt}（變化題 ${index}：請先找關鍵線索，再判斷答案。）`,
    explanation: `${question.explanation} 本題為同概念變化題，重點是確認學生能否遷移方法，而不是只記住原題。`
  };
}

function hashText(value) {
  return String(value).split("").reduce((total, char) => ((total << 5) - total + char.charCodeAt(0)) | 0, 0);
}

function rotateOptions(options, seed) {
  const safe = [...options];
  const shift = Math.abs(seed) % safe.length;
  return [...safe.slice(shift), ...safe.slice(0, shift)];
}

const generatedTemplates = {
  math: [
    (config, index, seed) => {
      const base = config.grade.startsWith("j") ? 12 + (seed % 9) + index * 2 : 8 + (seed % 6) + index;
      const days = config.goal === "advanced" ? 6 : 4 + (seed % 3);
      const extra = 2 + (seed % 5);
      return {
        skill: config.goal === "foundation" ? "計算與讀題" : "數量關係應用",
        prompt: `某次練習中，學生每天完成 ${base} 題，連續 ${days} 天後又多完成 ${extra} 題，共完成幾題？`,
        options: [`${base * days}`, `${base * days + extra}`, `${base + days + extra}`, `${base * extra}`],
        answer: `${base * days + extra}`,
        explanation: `先算每天 ${base} 題連續 ${days} 天：${base} × ${days} = ${base * days}，再加上 ${extra} 題。`
      };
    },
    (config, index, seed) => {
      const price = 25 + (seed % 8) * 5;
      const count = 3 + (index % 4);
      const discount = 10 + (seed % 3) * 5;
      const total = price * count - discount;
      return {
        skill: "生活應用與多步驟計算",
        prompt: `一本筆記本 ${price} 元，買 ${count} 本後折價 ${discount} 元，實際要付多少元？`,
        options: [`${price * count}`, `${total}`, `${total + discount}`, `${price + count - discount}`],
        answer: `${total}`,
        explanation: `先算原價 ${price} × ${count} = ${price * count}，再扣掉折價 ${discount} 元。`
      };
    },
    (config, index, seed) => {
      const a = 2 + (seed % 5);
      const b = 8 + index + (seed % 4);
      const x = a + b;
      return {
        skill: config.stage === "junior" ? "代數關係" : "未知數推理",
        prompt: `某數減去 ${a} 後是 ${b}，這個數是多少？`,
        options: [`${b - a}`, `${x}`, `${a * b}`, `${x + a}`],
        answer: `${x}`,
        explanation: `題目說某數 - ${a} = ${b}，所以某數 = ${b} + ${a} = ${x}。`
      };
    }
  ],
  chinese: [
    () => ({
      skill: "文意理解",
      prompt: "一篇文章提到：學習不是只追求速度，而是要知道自己錯在哪裡，並調整方法。作者最可能想表達什麼？",
      options: ["學習需要反思與調整", "速度永遠最重要", "錯誤不需要處理", "只要背答案即可"],
      answer: "學習需要反思與調整",
      explanation: "文章強調知道錯在哪裡並調整方法，因此主旨是反思與調整。"
    }),
    () => ({
      skill: "語句銜接",
      prompt: "「他先整理資料，再把重點寫成表格，最後上台說明。」這句話最適合用來描述哪一種能力？",
      options: ["組織與表達", "單純記憶", "逃避討論", "猜測答案"],
      answer: "組織與表達",
      explanation: "整理、表格與說明都指向組織資料並表達。"
    }),
    () => ({
      skill: "觀點推論",
      prompt: "作者說：「真正的練習，不是把錯題擦掉，而是留下錯因。」這句話最可能提醒讀者什麼？",
      options: ["要分析錯誤原因", "不要再寫題目", "錯題沒有價值", "只看分數即可"],
      answer: "要分析錯誤原因",
      explanation: "留下錯因代表重視錯誤分析，才能改善學習。"
    })
  ],
  english: [
    () => ({
      skill: "句意理解",
      prompt: "Amy practiced English for ten minutes every day. After one month, she could read short stories faster. What helped Amy improve?",
      options: ["Practicing every day.", "Buying a new bag.", "Skipping class.", "Sleeping late."],
      answer: "Practicing every day.",
      explanation: "短文指出每天練習後閱讀變快，因此原因是持續練習。"
    }),
    () => ({
      skill: "文法選擇",
      prompt: "Kevin usually ___ breakfast at seven, but he was late today.",
      options: ["eat", "eats", "eating", "ate"],
      answer: "eats",
      explanation: "usually 表示習慣，主詞 Kevin 是第三人稱單數，所以用 eats。"
    }),
    () => ({
      skill: "閱讀推論",
      prompt: "Mia forgot her umbrella. When she got home, her shoes were wet. How was the weather most likely?",
      options: ["Rainy.", "Sunny.", "Windless.", "Snowy in summer."],
      answer: "Rainy.",
      explanation: "忘記雨傘且鞋子濕了，最合理推論是下雨。"
    })
  ],
  social: [
    () => ({
      skill: "生活公民與社會觀察",
      prompt: "班級討論公共空間使用規則時，最適合先考量哪一點？",
      options: ["多數人共同使用的公平與安全", "只讓最快的人使用", "完全不需要規則", "只看誰聲音最大"],
      answer: "多數人共同使用的公平與安全",
      explanation: "公共空間規則應兼顧公平、安全與共同使用。"
    }),
    () => ({
      skill: "地圖與方位",
      prompt: "看校園平面圖找保健室時，最需要先確認什麼？",
      options: ["自己目前位置與方向", "同學喜歡的顏色", "午餐菜單", "鉛筆長度"],
      answer: "自己目前位置與方向",
      explanation: "地圖判讀要先確認目前位置，才能決定路線。"
    })
  ],
  science: [
    () => ({
      skill: "生活科學推論",
      prompt: "把濕衣服攤開比揉成一團更快乾，主要和哪個因素有關？",
      options: ["接觸空氣的面積較大", "衣服變重", "水變成固體", "顏色變深"],
      answer: "接觸空氣的面積較大",
      explanation: "攤開可增加蒸發面積，水分較容易散失。"
    }),
    () => ({
      skill: "實驗變因",
      prompt: "比較兩杯水蒸發快慢時，若只想看溫度影響，其他條件應該如何？",
      options: ["盡量保持相同", "全部改變", "只改杯子顏色", "不需要記錄"],
      answer: "盡量保持相同",
      explanation: "控制變因時，只改一個想研究的因素，其餘條件要一致。"
    })
  ],
  social_geography: [
    () => ({
      skill: "地理資料判讀",
      prompt: "若某城市捷運站周邊商店變多、人口流動增加，最合理的原因是什麼？",
      options: ["交通可及性提高", "緯度突然改變", "酸鹼值下降", "細胞數增加"],
      answer: "交通可及性提高",
      explanation: "交通便利會帶動人流與商業活動。"
    }),
    () => ({
      skill: "地形與人類活動",
      prompt: "山區道路彎曲且聚落較分散，最可能和哪個因素有關？",
      options: ["地形起伏較大", "人口一定最多", "海水鹽度較低", "法律條文較多"],
      answer: "地形起伏較大",
      explanation: "地形會影響交通建設與聚落分布。"
    })
  ],
  social_history: [
    () => ({
      skill: "歷史因果推論",
      prompt: "若某政策推動後，商業活動增加、城市人口上升，分析時最應注意什麼？",
      options: ["政策與社會變遷的因果關係", "單字複數變化", "化學式配平", "電路是否通路"],
      answer: "政策與社會變遷的因果關係",
      explanation: "歷史題常要求判斷事件原因、經過與影響。"
    }),
    () => ({
      skill: "史料可信度",
      prompt: "研究某事件時，同時比較官方紀錄、私人日記與報紙報導，主要是為了什麼？",
      options: ["交叉檢證資料", "讓答案更長", "避免閱讀", "只相信單一說法"],
      answer: "交叉檢證資料",
      explanation: "多種史料互相比較，可以降低單一資料偏誤。"
    })
  ],
  social_civics: [
    () => ({
      skill: "公民素養判斷",
      prompt: "看到網路訊息宣稱某政策一定會成功，但沒有提供資料來源，最適合怎麼做？",
      options: ["查證來源與不同觀點", "立刻轉傳", "只看標題判斷", "完全不需要思考"],
      answer: "查證來源與不同觀點",
      explanation: "公民素養重視資訊查證與理性判斷。"
    }),
    () => ({
      skill: "權利與責任",
      prompt: "在公共討論中，每個人都能表達意見，同時也應該注意什麼？",
      options: ["尊重他人並負責任表達", "只攻擊不同意見", "不必查證", "完全不能討論"],
      answer: "尊重他人並負責任表達",
      explanation: "民主討論同時包含表達自由與尊重責任。"
    })
  ],
  science_biology: [
    () => ({
      skill: "生物系統理解",
      prompt: "運動後呼吸變快，主要是身體需要更多什麼來幫助細胞活動？",
      options: ["氧氣", "沙子", "磁鐵", "鹽巴"],
      answer: "氧氣",
      explanation: "運動時細胞活動增加，需要更多氧氣。"
    }),
    () => ({
      skill: "生態關係",
      prompt: "若某地昆蟲數量大幅減少，仰賴昆蟲授粉的植物可能會受到什麼影響？",
      options: ["結果與繁殖可能減少", "一定變成礦物", "全部立刻消失", "與環境毫無關係"],
      answer: "結果與繁殖可能減少",
      explanation: "授粉昆蟲減少會影響部分植物繁殖。"
    })
  ],
  science_physics: [
    () => ({
      skill: "物理情境推論",
      prompt: "同一台車在相同時間內行駛距離變長，代表它的速度如何？",
      options: ["變快", "變慢", "一定停止", "無法測量時間"],
      answer: "變快",
      explanation: "相同時間內距離越長，速度越快。"
    }),
    () => ({
      skill: "力與運動",
      prompt: "推動同一個箱子時，地面越粗糙越難推，主要和哪個概念有關？",
      options: ["摩擦力", "蒸發", "光合作用", "經緯度"],
      answer: "摩擦力",
      explanation: "粗糙表面通常使摩擦力增加，因此較難推動。"
    })
  ],
  science_chemistry: [
    () => ({
      skill: "化學生活應用",
      prompt: "泡騰錠放入水中產生氣泡，最適合用哪個概念觀察？",
      options: ["化學反應產生氣體", "地圖比例尺", "文言代詞", "民主投票"],
      answer: "化學反應產生氣體",
      explanation: "產生氣泡表示可能有氣體生成，可用化學反應概念觀察。"
    }),
    () => ({
      skill: "酸鹼與生活",
      prompt: "清潔水垢時常使用酸性清潔劑，主要是利用酸和哪類物質反應的特性？",
      options: ["碳酸鹽類沉積物", "方位角", "文學修辭", "生物分類"],
      answer: "碳酸鹽類沉積物",
      explanation: "水垢常含碳酸鹽，酸可和其反應而幫助清除。"
    })
  ],
  general: [
    () => ({
      skill: "綜合判讀",
      prompt: "面對一段新資料時，最有效的第一步是什麼？",
      options: ["找出題目要問什麼", "直接猜答案", "忽略所有數字", "只看最後一個字"],
      answer: "找出題目要問什麼",
      explanation: "先確認問題目標，才能選擇合適方法。"
    })
  ]
};

function renderTeacher() {
  const active = readJson(STORAGE_KEYS.activeTest, null);
  const submission = readJson(STORAGE_KEYS.latestSubmission, null);
  const version = readJson(STORAGE_KEYS.bankVersion, bankVersion);

  document.querySelector("#activeTestLabel").textContent = active ? `${active.config.studentName}・${active.config.gradeLabel}・${active.config.subjectLabel}` : "尚未建立";
  document.querySelector("#latestSubmissionLabel").textContent = submission ? `${submission.config.studentName}・${submission.report.accuracy}%` : "尚無資料";
  document.querySelector("#bankVersionLabel").textContent = version.date;

  renderReport(submission);
  renderRecords();
}

function renderReport(submission) {
  const empty = document.querySelector("#emptyReport");
  const content = document.querySelector("#reportContent");
  const emptyTeaching = document.querySelector("#emptyTeaching");
  const teachingContent = document.querySelector("#teachingContent");

  if (!submission) {
    empty.classList.remove("hidden");
    content.classList.add("hidden");
    emptyTeaching.classList.remove("hidden");
    teachingContent.classList.add("hidden");
    return;
  }

  empty.classList.add("hidden");
  content.classList.remove("hidden");
  emptyTeaching.classList.add("hidden");
  teachingContent.classList.remove("hidden");

  document.querySelector("#scoreText").textContent = `${submission.report.accuracy}%`;
  document.querySelector("#levelText").textContent = submission.report.level;
  document.querySelector("#diagnosisText").textContent = submission.report.diagnosis;

  document.querySelector("#metricList").innerHTML = submission.report.metrics.map((item) => `
    <div class="metric">
      <div>
        <strong>${escapeHtml(item.label)}</strong>
        <span>${item.correct}/${item.total} 題</span>
        <div class="meter"><i style="width:${item.rate}%"></i></div>
      </div>
      <strong>${item.rate}%</strong>
    </div>
  `).join("");

  document.querySelector("#priorityList").innerHTML = submission.report.priorities.map((item) => `
    <div class="priority">
      <strong>${escapeHtml(item.label)}｜${escapeHtml(item.skill)}</strong>
      <span>錯 ${item.misses} 題，來源趨勢：${escapeHtml(item.trend)}</span>
    </div>
  `).join("") || `<div class="priority"><strong>目前沒有明顯弱點</strong><span>可提高題目整合度與速度要求。</span></div>`;

  teachingContent.innerHTML = renderTeaching(submission.teaching);
}

function buildReport(submission) {
  const total = submission.questions.length;
  const correct = submission.questions.filter((question) => submission.answers[question.id] === question.answer).length;
  const accuracy = Math.round((correct / total) * 100);
  const stats = {};

  submission.questions.forEach((question) => {
    const key = question.subject;
    stats[key] ||= { label: subjectLabels[key], total: 0, correct: 0, weak: {} };
    stats[key].total += 1;
    if (submission.answers[question.id] === question.answer) {
      stats[key].correct += 1;
    } else {
      stats[key].weak[question.skill] ||= { misses: 0, trend: question.trend };
      stats[key].weak[question.skill].misses += 1;
    }
  });

  const metrics = Object.values(stats).map((item) => ({
    label: item.label,
    total: item.total,
    correct: item.correct,
    rate: Math.round((item.correct / item.total) * 100)
  }));

  const priorities = Object.values(stats).flatMap((item) => {
    return Object.entries(item.weak).map(([skill, value]) => ({
      label: item.label,
      skill,
      misses: value.misses,
      trend: value.trend
    }));
  }).sort((a, b) => b.misses - a.misses).slice(0, 5);

  let level = "需要先補基礎";
  if (accuracy >= 85) level = "程度穩定，可進入進階";
  else if (accuracy >= 70) level = "基礎尚可，需加強應用";
  else if (accuracy >= 50) level = "概念不穩，需系統補強";

  const weakText = priorities.length
    ? priorities.map((item) => `${item.label}「${item.skill}」`).join("、")
    : "無明顯弱點";

  return {
    total,
    correct,
    accuracy,
    level,
    metrics,
    priorities,
    diagnosis: `${submission.config.studentName} 的 ${submission.config.gradeLabel} ${submission.config.subjectLabel} 診斷正確率為 ${accuracy}%。主要目標是「${submission.config.goalLabel}」。目前優先觀察 ${weakText}。年級重點：${gradeProfiles[submission.config.grade]}`
  };
}

function buildTeaching(submission) {
  const priorities = submission.report.priorities;
  const main = priorities[0] || { label: submission.config.subjectLabel, skill: "整合應用", trend: "素養整合" };
  const wrongQuestions = submission.questions.filter((question) => submission.answers[question.id] !== question.answer);
  const baseQuestion = wrongQuestions[0] || submission.questions[0];
  const similar = makeSimilarExample(baseQuestion);
  const lesson = lessonBlueprint(submission, main, baseQuestion);
  const practiceSet = makePracticeSet(baseQuestion, main);

  return {
    title: `${submission.config.gradeLabel} ${submission.config.subjectLabel} 補強教材：${main.skill}`,
    overview: [
      `適用學生：${submission.config.studentName}，目前診斷正確率 ${submission.report.accuracy}%。`,
      `本教材先處理「${main.skill}」，再逐步拉到 ${submission.config.goalLabel} 需要的應用層次。`,
      `建議用一堂 60-90 分鐘課完成第一輪，隔週用 10 分鐘短測追蹤。`
    ],
    target: [
      `能說出 ${main.skill} 的核心觀念與常見陷阱。`,
      `能從題目文字、圖表或情境中圈出有效線索。`,
      `能完成一題標準題、一題變化題，並用自己的話說明理由。`,
      `能把本題方法遷移到另一個數字、文本或生活情境。`
    ],
    prerequisites: lesson.prerequisites,
    concept: lesson.concept,
    vocabulary: lesson.vocabulary,
    commonMistakes: lesson.commonMistakes,
    lessonFlow: [
      { time: "0-5 分鐘", title: "暖身診斷", detail: `請學生口頭說明「${main.skill}」可能在考什麼，老師只記錄不糾正。` },
      { time: "5-20 分鐘", title: "概念建立", detail: lesson.concept.join(" ") },
      { time: "20-35 分鐘", title: "示範題精講", detail: "老師示範如何圈關鍵字、列條件、排除干擾選項，並要求學生複述解題路線。" },
      { time: "35-55 分鐘", title: "類題練習", detail: "先做一題同型，再做一題變化題；學生必須寫出理由，不只選答案。" },
      { time: "55-70 分鐘", title: "錯因整理", detail: "把錯誤分成讀題錯、概念錯、計算錯、推論錯，寫入學生檔案。" },
      { time: "70-90 分鐘", title: "挑戰與收束", detail: "完成一題舉一反三題，最後由學生說出今天可帶走的一個方法。" }
    ],
    teacherScript: [
      `先不要急著講答案。請學生重讀題目，說出他看到的條件、關鍵字和想用的方法。`,
      `若學生停住，老師只提示「這題在問什麼？」與「哪個條件最有用？」避免直接告訴公式。`,
      `學生答對後仍要追問理由，因為近年考題重視判讀與說明，不只是選到答案。`,
      `若學生答錯，先問「你是在哪一步開始不確定？」再回到概念，不要只重算一次。`,
      `每完成一題，都請學生用一句話說明：這題的陷阱是什麼、下次怎麼避免。`
    ],
    demonstration: {
      title: `示範題：${baseQuestion.skill}`,
      prompt: baseQuestion.prompt,
      answer: baseQuestion.answer,
      explanation: baseQuestion.explanation,
      source: `${baseQuestion.source}｜${baseQuestion.trend}`,
      boardSteps: lesson.boardSteps
    },
    similar,
    guidedPractice: practiceSet.guided,
    independentPractice: practiceSet.independent,
    practice: [
      {
        level: "A 基礎確認",
        items: [
          `請學生重做本次錯題中「${main.skill}」相關題目，並在題目旁寫下關鍵字。`,
          `做 3 題同型短題，每題限時 90 秒，目標正確率 80%。`
        ]
      },
      {
        level: "B 變化應用",
        items: [
          `把題目數字、人物或情境換掉，要求學生判斷方法是否仍相同。`,
          `加入一題多餘資訊題，訓練學生排除不必要條件。`
        ]
      },
      {
        level: "C 舉一反三",
        items: [
          `請學生自己出一題類似題，並寫出標準答案與解析。`,
          `老師檢查學生出的題目是否真的測到 ${main.skill}，不是只換文字。`
        ]
      }
    ],
    homework: [
      {
        title: "第 1 部分：基礎熟練",
        items: [`完成 6 題同型題，每題都要標出題目問法。`, `錯題訂正要寫「我錯在讀題、概念、計算或推論哪一類」。`]
      },
      {
        title: "第 2 部分：應用遷移",
        items: [`完成 3 題換情境題，題目數字、人物或文本不同，但核心方法相同。`, `每題寫一句理由：為什麼可以用今天的方法。`]
      },
      {
        title: "第 3 部分：挑戰反思",
        items: [`自己出 1 題類似題，附上答案與解析。`, `下次上課前用 5 分鐘小測，若達 80% 再進入下一個弱點。`]
      }
    ],
    assessment: [
      "能獨立圈出關鍵條件，給 1 分。",
      "能選出正確方法或概念，給 1 分。",
      "能完整說明理由或步驟，給 1 分。",
      "能完成變化題或自出類題，給 1 分。滿分 4 分，3 分以上表示可進入下一單元。"
    ],
    nextLesson: [
      priorities[1] ? `下一個弱點可接續處理「${priorities[1].label}｜${priorities[1].skill}」。` : "若本次達標，下一堂可提高題目整合度與限時要求。",
      "保留本次錯題，兩週後回測一題同型與一題變化題，確認是否真正穩定。"
    ]
  };
}

function makeSimilarExample(question) {
  const templates = {
    math: {
      prompt: "某班閱讀活動中，A 組 4 人共讀 96 頁，若每人閱讀量相同，B 組 6 人共可讀幾頁？",
      answer: "144 頁",
      steps: ["先求每人閱讀量：96 ÷ 4 = 24", "再乘以 6 人：24 × 6 = 144", "檢查單位是頁。"]
    },
    chinese: {
      prompt: "短文反覆提到查證、來源與不要立刻轉傳，最可能的主旨是什麼？",
      answer: "培養媒體識讀與查證習慣",
      steps: ["找反覆出現的關鍵詞", "判斷作者想提醒讀者的行動", "用完整句說明主旨。"]
    },
    english: {
      prompt: "Ken stayed up late, so he felt sleepy at school. What should Ken do next time?",
      answer: "Go to bed earlier.",
      steps: ["找原因：stayed up late", "找結果：felt sleepy", "推論建議：早點睡。"]
    }
  };
  const fallback = {
    prompt: "根據資料判斷：若某地交通便利且工作機會增加，人口分布可能如何改變？",
    answer: "人口較可能集中或增加",
    steps: ["讀懂資料條件", "找出條件與結果的關係", "用因果句回答。"]
  };
  return templates[question.subject] || fallback;
}

function lessonBlueprint(submission, main, baseQuestion) {
  const subject = baseQuestion.subject;
  const subjectName = subjectLabels[subject] || submission.config.subjectLabel;
  const defaults = {
    prerequisites: [
      `學生需先能說出 ${subjectName} 題目正在問什麼。`,
      "學生需能把題目資訊分成已知、未知與干擾資訊。",
      "學生需能用一句話描述自己的解題方法。"
    ],
    concept: [
      `${main.skill} 的核心不是背答案，而是辨認題目條件與概念之間的關係。`,
      "先讀問題，再回頭找線索；不要一看到熟悉字眼就套公式或選選項。",
      "遇到情境題時，要把生活文字轉成可操作的學科語言。"
    ],
    vocabulary: ["關鍵條件", "干擾資訊", "理由說明", "概念遷移"],
    commonMistakes: [
      "只看題目最後一句，忽略前面條件。",
      "看到熟悉詞就直接套舊方法，沒有確認題目真正要求。",
      "答案選對但說不出理由，代表概念仍不穩。"
    ],
    boardSteps: [
      "第一行寫題目問什麼。",
      "第二行列出可用條件。",
      "第三行寫解題方法或判斷理由。",
      "最後檢查答案是否符合題意。"
    ]
  };

  const bySubject = {
    math: {
      prerequisites: ["四則運算順序", "能把文字題轉成算式", "能估算答案是否合理"],
      concept: ["數學應用題要先找單位與關係。", "遇到多步驟題，先拆成小問題，再合併答案。", "計算後要用題目情境檢查單位。"],
      vocabulary: ["已知量", "未知量", "單位", "關係式", "估算"],
      commonMistakes: ["把所有數字直接相加。", "忘記先乘除後加減。", "答案沒有單位或單位不合理。"],
      boardSteps: ["圈數字與單位。", "寫出題目要求的未知量。", "列式並分步計算。", "用估算檢查答案。"]
    },
    chinese: {
      prerequisites: ["能找出句子主詞與動作", "能分辨事實與作者看法", "能用自己的話重述段落"],
      concept: ["閱讀題先看題幹，再回文章找證據。", "主旨題找反覆出現的概念，推論題找前後因果。", "答案必須被文本支持，不能只靠自己的想法。"],
      vocabulary: ["主旨", "觀點", "證據", "推論", "語氣"],
      commonMistakes: ["用自己的經驗取代文章證據。", "只抓單一句，不看上下文。", "把例子誤認為主旨。"],
      boardSteps: ["標出題幹關鍵字。", "回文本找相同或相近意思。", "刪除太絕對或無根據選項。", "用一句話說明答案證據。"]
    },
    english: {
      prerequisites: ["能辨認基本時態線索", "能找主詞與動詞", "能讀懂短文中的原因與結果"],
      concept: ["英文題先抓時間線索與主詞，再決定動詞形式。", "閱讀推論題要從句子證據推出答案。", "不熟的單字先用前後文猜，不要立刻放棄。"],
      vocabulary: ["time clue", "subject", "verb", "reason", "result"],
      commonMistakes: ["看到中文意思就忽略文法形式。", "沒有注意第三人稱單數或過去時間。", "閱讀題只看單字，不看句子關係。"],
      boardSteps: ["圈時間副詞或關鍵句。", "找主詞與動詞。", "判斷文法或語意關係。", "回到題目確認答案。"]
    }
  };

  const socialSubjects = ["social", "social_geography", "social_history", "social_civics"];
  const scienceSubjects = ["science", "science_biology", "science_physics", "science_chemistry"];
  if (socialSubjects.includes(subject)) {
    return {
      prerequisites: ["能讀懂資料中的時間、地點、人物或制度。", "能分辨原因、經過與影響。", "能用資料支持判斷。"],
      concept: ["社會題重點是資料判讀，不是只背名詞。", "地理看空間關係，歷史看時間因果，公民看權利責任與公共判斷。", "遇到圖表或情境，先找變化方向與關鍵條件。"],
      vocabulary: ["資料證據", "因果關係", "空間分布", "權利義務", "公共利益"],
      commonMistakes: ["只背名詞，遇到情境就不會判斷。", "把時間先後誤認為必然因果。", "沒有用題目資料支持答案。"],
      boardSteps: ["標出資料類型。", "找時間、地點、對象與變化。", "判斷原因與結果。", "用資料句回答。"]
    };
  }

  if (scienceSubjects.includes(subject)) {
    return {
      prerequisites: ["能分辨觀察、假設與結論。", "能找出實驗中的操縱變因與控制變因。", "能用概念解釋生活現象。"],
      concept: ["自然題重視用科學概念解釋現象。", "實驗題先看變因，圖表題先看趨勢。", "答案要能回到證據，不只背定義。"],
      vocabulary: ["觀察", "假設", "變因", "證據", "趨勢"],
      commonMistakes: ["把相關誤認為因果。", "沒有控制變因就下結論。", "只背名詞，不會套到生活情境。"],
      boardSteps: ["找出現象或實驗目的。", "標示變因與資料趨勢。", "連回科學概念。", "用因果句寫結論。"]
    };
  }

  return bySubject[subject] || defaults;
}

function makePracticeSet(baseQuestion, main) {
  const similar = makeSimilarExample(baseQuestion);
  return {
    guided: [
      {
        prompt: baseQuestion.prompt,
        hint: "先圈出題目問法，再圈出最有用的條件。",
        answer: baseQuestion.answer,
        explanation: baseQuestion.explanation
      },
      {
        prompt: similar.prompt,
        hint: "這題和示範題方法相同，但情境已改變，請先說出相同點。",
        answer: similar.answer,
        explanation: similar.steps.join(" ")
      }
    ],
    independent: [
      `請學生完成一題同型題，限時 2 分鐘，完成後口頭說明理由。`,
      `請學生完成一題含干擾資訊的題目，要求先刪除無關條件。`,
      `請學生把題目改寫成另一個生活情境，並保留同一個考點：${main.skill}。`
    ]
  };
}

function renderTeaching(teaching) {
  return `
    <div class="teaching-section">
      <h3>${escapeHtml(teaching.title)}</h3>
      <p>這份內容可直接作為下一堂課教材使用，包含課前判斷、課堂講解、示範題、練習、作業與評量標準。</p>
      <ul>${teaching.overview.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
    <div class="teaching-section">
      <h3>一、教學目標</h3>
      <ol>${teaching.target.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
    </div>
    <div class="teaching-section">
      <h3>二、課前必備能力</h3>
      <ul>${teaching.prerequisites.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
    <div class="teaching-section">
      <h3>三、概念講解</h3>
      <ol>${teaching.concept.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
      <p><strong>關鍵詞：</strong>${teaching.vocabulary.map(escapeHtml).join("、")}</p>
    </div>
    <div class="teaching-section">
      <h3>四、老師教學話術</h3>
      <ol>${teaching.teacherScript.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
    </div>
    <div class="teaching-section">
      <h3>五、示範題與詳解</h3>
      <div class="example-box">
        <strong>${escapeHtml(teaching.demonstration.title)}</strong>
        <p>${escapeHtml(teaching.demonstration.prompt)}</p>
        <p><strong>答案：</strong>${escapeHtml(teaching.demonstration.answer)}</p>
        <p><strong>詳解：</strong>${escapeHtml(teaching.demonstration.explanation)}</p>
        <p><strong>板書步驟：</strong></p>
        <ol>${teaching.demonstration.boardSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
        <p><strong>來源標籤：</strong>${escapeHtml(teaching.demonstration.source)}</p>
      </div>
    </div>
    <div class="teaching-section">
      <h3>六、類題與舉一反三</h3>
      <div class="example-box">
        <p>${escapeHtml(teaching.similar.prompt)}</p>
        <p><strong>答案：</strong>${escapeHtml(teaching.similar.answer)}</p>
        <ol>${teaching.similar.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
      </div>
    </div>
    <div class="teaching-section">
      <h3>七、引導練習</h3>
      ${teaching.guidedPractice.map((item, index) => `
        <div class="example-box">
          <strong>引導題 ${index + 1}</strong>
          <p>${escapeHtml(item.prompt)}</p>
          <p><strong>提示：</strong>${escapeHtml(item.hint)}</p>
          <p><strong>答案：</strong>${escapeHtml(item.answer)}</p>
          <p><strong>解析：</strong>${escapeHtml(item.explanation)}</p>
        </div>
      `).join("")}
    </div>
    <div class="teaching-section">
      <h3>八、課堂練習配置</h3>
      ${teaching.practice.map((group) => `
        <h4>${escapeHtml(group.level)}</h4>
        <ul>${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      `).join("")}
      <h4>獨立練習</h4>
      <ul>${teaching.independentPractice.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
    <div class="teaching-section">
      <h3>九、常見錯誤與補救</h3>
      <ul>${teaching.commonMistakes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
    <div class="teaching-section">
      <h3>十、回家練習</h3>
      ${teaching.homework.map((group) => `
        <h4>${escapeHtml(group.title)}</h4>
        <ol>${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
      `).join("")}
    </div>
    <div class="teaching-section">
      <h3>十一、評量標準與下次追蹤</h3>
      <ul>${teaching.assessment.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <ol>${teaching.nextLesson.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
    </div>
  `;
}

function initStudent() {
  const active = readJson(STORAGE_KEYS.activeTest, null);
  const doneBox = document.querySelector("#doneBox");
  const emptyQuiz = document.querySelector("#emptyQuiz");
  const questionList = document.querySelector("#questionList");
  const submitBtn = document.querySelector("#submitStudentBtn");

  if (!active) {
    submitBtn.classList.add("hidden");
    return;
  }

  document.querySelector("#quizStudent").textContent = active.config.studentName;
  document.querySelector("#quizScope").textContent = `${active.config.gradeLabel}・${active.config.subjectLabel}・${active.config.goalLabel}`;
  document.querySelector("#quizCount").textContent = String(active.questions.length);
  emptyQuiz.classList.add("hidden");

  questionList.innerHTML = active.questions.map((question, index) => `
    <article class="question-card">
      <span class="question-meta">${subjectLabels[question.subject]}｜${question.skill}</span>
      <h3>${index + 1}. ${escapeHtml(question.prompt)}</h3>
      <div class="option-grid">
        ${question.options.map((option) => `
          <label class="option-row">
            <input type="radio" name="${question.id}" value="${escapeHtml(option)}">
            <span>${escapeHtml(option)}</span>
          </label>
        `).join("")}
      </div>
    </article>
  `).join("");

  submitBtn.addEventListener("click", () => {
    const answers = {};
    active.questions.forEach((question) => {
      const selected = document.querySelector(`input[name="${question.id}"]:checked`);
      answers[question.id] = selected ? selected.value : "";
    });
    const submission = {
      id: uid("submission"),
      submittedAt: new Date().toISOString(),
      config: active.config,
      questions: active.questions,
      answers
    };
    submission.report = buildReport(submission);
    submission.teaching = buildTeaching(submission);
    writeJson(STORAGE_KEYS.latestSubmission, submission);
    questionList.classList.add("hidden");
    submitBtn.classList.add("hidden");
    doneBox.classList.remove("hidden");
  });
}

async function saveLatestRecord() {
  const submission = readJson(STORAGE_KEYS.latestSubmission, null);
  if (!submission) return;
  const records = await getRecords();
  let record = records.find((item) => item.studentName === submission.config.studentName && item.gradeLabel === submission.config.gradeLabel);
  if (!record) {
    record = {
      id: uid("record"),
      studentName: submission.config.studentName,
      gradeLabel: submission.config.gradeLabel,
      longNote: "",
      histories: []
    };
    records.unshift(record);
  }
  if (!record.histories.some((item) => item.id === submission.id)) {
    record.histories.unshift(submission);
  }
  await setRecords(records);
  await renderRecords();
  alert("已儲存到學生檔案。");
}

async function getRecords() {
  const local = readJson(STORAGE_KEYS.records, []);
  return apiGet("/api/records", local);
}

async function setRecords(records) {
  writeJson(STORAGE_KEYS.records, records);
  await apiPost("/api/records", records);
}

async function renderRecords() {
  const records = await getRecords();
  const select = document.querySelector("#recordSelect");
  const historyList = document.querySelector("#historyList");
  const longNote = document.querySelector("#longNote");
  if (!select) return;

  select.innerHTML = records.length
    ? records.map((record) => `<option value="${record.id}">${escapeHtml(record.studentName)}｜${escapeHtml(record.gradeLabel)}</option>`).join("")
    : `<option value="">尚無學生檔案</option>`;

  function renderSelected() {
    const record = records.find((item) => item.id === select.value);
    longNote.value = record?.longNote || "";
    historyList.innerHTML = record
      ? record.histories.map((history) => `
          <div class="history">
            <strong>${formatDate(history.submittedAt)}｜${history.config.subjectLabel}｜${history.report.accuracy}%</strong>
            <span>${escapeHtml(history.report.level)}；${escapeHtml(history.report.priorities[0]?.skill || "無明顯弱點")}</span>
          </div>
        `).join("")
      : `<div class="notice">尚無歷次診斷。</div>`;
  }

  select.onchange = renderSelected;
  renderSelected();
}

async function saveLongNote() {
  const records = await getRecords();
  const select = document.querySelector("#recordSelect");
  const record = records.find((item) => item.id === select.value);
  if (!record) return;
  record.longNote = document.querySelector("#longNote").value.trim();
  await setRecords(records);
  alert("長期紀錄已更新。");
}

async function exportRecord() {
  const records = await getRecords();
  const select = document.querySelector("#recordSelect");
  const record = records.find((item) => item.id === select.value);
  if (!record) return;
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${record.studentName}_${record.gradeLabel}_學生檔案.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function renderSources() {
  document.querySelector("#trendBox").textContent = bankVersion.description;
  document.querySelector("#sourceList").innerHTML = trendSources.map((source) => `
    <div class="source-item">
      <strong>${escapeHtml(source.title)}</strong>
      <span>${escapeHtml(source.label)}</span>
      <p>${escapeHtml(source.note)}</p>
      ${source.url ? `<a href="${source.url}" target="_blank" rel="noreferrer">查看來源</a>` : ""}
    </div>
  `).join("");
  loadServerSources();
}

async function loadServerSources() {
  if (location.protocol === "file:") return;

  try {
    const response = await fetch("/api/sources");
    if (!response.ok) return;
    const payload = await response.json();
    if (!payload.updatedAt) return;
    renderServerSources(payload);
  } catch {
    // 直接開 HTML 時沒有後端，保留內建來源說明。
  }
}

async function syncOfficialSources() {
  if (location.protocol === "file:") {
    alert("請用後端伺服器開啟系統，才能同步官方來源。執行：node outputs/server.js");
    return;
  }

  const button = document.querySelector("#syncSourcesBtn");
  button.disabled = true;
  button.textContent = "同步中...";
  try {
    const response = await fetch("/api/sources/sync", { method: "POST" });
    const payload = await response.json();
    renderServerSources(payload);
  } catch (error) {
    alert(`同步失敗：${error.message}`);
  } finally {
    button.disabled = false;
    button.textContent = "同步官方來源";
  }
}

function renderServerSources(payload) {
  const sourceList = document.querySelector("#sourceList");
  const serverItems = payload.sources.flatMap((source) => {
    if (!source.matches.length) {
      return [{
        title: source.title,
        label: `更新時間：${payload.updatedAt}`,
        note: `目前未解析到明確試題連結，來源網址：${source.url}`,
        url: source.url
      }];
    }

    return source.matches.slice(0, 20).map((match) => ({
      title: source.title,
      label: match.text,
      note: typeof match.foundOnPage === "boolean"
        ? `近十年年份掃描：${match.foundOnPage ? "官方頁面有對應年份" : "官方頁面未直接找到該年份文字"}。後續可進入審核區擷取題目全文、標記年份與科目。`
        : `官方來源同步結果，後續可進入審核區擷取題目全文、標記年份與科目。`,
      url: match.href
    }));
  });

  sourceList.innerHTML = [
    ...serverItems,
    {
      title: "同步政策",
      label: "官方題目全文匯入流程",
      note: payload.policy,
      url: ""
    }
  ].map((source) => `
    <div class="source-item">
      <strong>${escapeHtml(source.title)}</strong>
      <span>${escapeHtml(source.label)}</span>
      <p>${escapeHtml(source.note)}</p>
      ${source.url ? `<a href="${source.url}" target="_blank" rel="noreferrer">查看來源</a>` : ""}
    </div>
  `).join("");
}

async function renderImportPanel() {
  const candidateList = document.querySelector("#candidateList");
  const pendingList = document.querySelector("#pendingImportList");
  if (!candidateList || !pendingList) return;

  if (location.protocol === "file:") {
    candidateList.innerHTML = `<div class="source-item"><strong>需要啟動後端</strong><span>請使用 http://localhost:4173/teacher.html</span><p>PDF 匯入、下載與文字擷取必須透過後端執行。</p></div>`;
    pendingList.innerHTML = "";
    return;
  }

  const candidates = await apiGet("/api/import/candidates", []);
  const pending = await apiGet("/api/import/pending", []);

  candidateList.innerHTML = candidates.length
    ? candidates.map((item) => `
        <div class="source-item">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.year || "未判定年份")}｜${escapeHtml(item.subject)}｜${item.imported ? "已匯入" : "尚未匯入"}</span>
          <p>${escapeHtml(item.url)}</p>
          <button class="ghost-btn import-candidate-btn" type="button" data-id="${escapeHtml(item.id)}" ${item.imported ? "disabled" : ""}>下載到待審核</button>
        </div>
      `).join("")
    : `<div class="source-item"><strong>尚無 PDF 候選</strong><span>請先按「同步官方來源」</span><p>同步成功後，系統會從近十年來源中找出 PDF 或題本連結。</p></div>`;

  candidateList.querySelectorAll(".import-candidate-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const item = candidates.find((candidate) => candidate.id === button.dataset.id);
      if (!item) return;
      button.disabled = true;
      button.textContent = "下載中...";
      try {
        await apiPost("/api/import/download", item);
        await renderImportPanel();
      } catch (error) {
        alert(`下載失敗：${error.message}`);
        button.disabled = false;
        button.textContent = "下載到待審核";
      }
    });
  });

  pendingList.innerHTML = pending.length
    ? pending.map((item) => `
        <div class="source-item">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.year || "未判定年份")}｜${escapeHtml(item.subject)}｜${escapeHtml(item.status)}</span>
          <p>${escapeHtml(item.extractionNote)}</p>
          <p>${escapeHtml(item.textPreview || "目前沒有可預覽文字。")}</p>
          <button class="primary-btn approve-import-btn" type="button" data-id="${escapeHtml(item.id)}">核准進正式題庫</button>
        </div>
      `).join("")
    : `<div class="source-item"><strong>尚無待審核題本</strong><span>請先下載候選 PDF</span><p>下載後會顯示文字擷取預覽與來源資訊。</p></div>`;

  pendingList.querySelectorAll(".approve-import-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      button.textContent = "核准中...";
      await apiPost("/api/import/approve", {
        id: button.dataset.id,
        usageNote: "官方題目全文核准為正式題庫來源，保留年份、科目與來源網址。"
      });
      await renderImportPanel();
    });
  });
}

const page = document.body.dataset.page;
if (page === "teacher") initTeacher();
if (page === "student") initStudent();
