# 家教診斷系統正式部署

## 正式網址

部署完成後會得到類似：

`https://你的服務名稱.onrender.com`

老師端：

`https://你的服務名稱.onrender.com/teacher.html`

學生端：

`https://你的服務名稱.onrender.com/student.html`

## 建議平台

第一版正式部署建議使用 Render Web Service，原因：

- 可直接跑 Node.js 後端
- 可掛永久磁碟儲存學生檔案、官方來源快取、PDF 題庫
- 支援健康檢查 `/api/health`
- 不需要先拆前後端

## 部署步驟

1. 將 `outputs` 資料夾作為部署專案根目錄。
2. 上傳到 GitHub repository。
3. 到 Render 建立 `Blueprint` 或 `Web Service`。
4. 若使用 Blueprint，選擇 `render.yaml`。
5. 確認環境變數：
   - `NODE_ENV=production`
   - `DATA_DIR=/var/data`
6. 確認已掛永久磁碟：
   - mount path: `/var/data`
   - size: 1GB 起跳
7. 部署完成後打開 `/api/health` 檢查。

## 本機正式模式測試

在 `outputs` 目錄執行：

```powershell
npm start
```

或：

```powershell
node server.js
```

開啟：

`http://localhost:4173/teacher.html`

## 資料儲存位置

預設本機：

`outputs/data`

正式部署：

`DATA_DIR` 指定的位置，例如 `/var/data`

裡面會存：

- `records.json`：學生檔案
- `source-cache.json`：官方來源同步快取
- `pending-imports.json`：待審核 PDF 題本
- `official-question-bank.json`：正式官方題庫
- `pdf-cache/`：下載的官方 PDF

## 目前已完成

- 老師端與學生端分離
- 後端 API
- 學生檔案儲存
- 近十年官方來源同步
- PDF 候選掃描
- 官方 PDF 下載到待審核
- 核准進正式題庫
- 部署設定

## 下一步建議

- 接 GitHub 自動部署
- 接登入權限
- 接資料庫 PostgreSQL
- 接進階 PDF/OCR 解析
- 加入人工審題工作流
