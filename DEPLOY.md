# 家教診斷系統免費正式部署

## 架構

免費部署採用：

- Render Free Web Service：跑 Node.js 後端與前端頁面
- Supabase Free Database：保存學生檔案與正式官方題庫
- 本機 JSON：只作為沒有 Supabase 時的備援

> 注意：Render 免費方案沒有永久磁碟，因此不要依賴伺服器本機檔案保存重要資料。

## 一、建立 Supabase 專案

1. 到 Supabase 建立新專案。
2. 進入 SQL Editor。
3. 貼上 `supabase-schema.sql`。
4. 執行 SQL 建立資料表。

需要的資料表：

- `student_records`
- `official_question_bank`

## 二、取得 Supabase 環境變數

到 Supabase 專案設定取得：

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

請不要把 `SERVICE_ROLE_KEY` 放到前端，也不要公開。

## 三、部署到 Render 免費方案

1. 到 Render 建立 Blueprint。
2. 選 GitHub repo：
   `lynn25004/tutor-diagnostic-system`
3. Render 會讀取 `render.yaml`。
4. 確認方案是 Free。
5. 在 Render Environment Variables 填入：
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. 部署。

## 四、正式網址

部署完成後會得到類似：

`https://tutor-diagnostic-system.onrender.com`

老師端：

`https://tutor-diagnostic-system.onrender.com/teacher.html`

學生端：

`https://tutor-diagnostic-system.onrender.com/student.html`

健康檢查：

`https://tutor-diagnostic-system.onrender.com/api/health`

如果 Supabase 設定成功，健康檢查會顯示：

```json
{
  "ok": true,
  "storage": "supabase"
}
```

## 五、目前儲存策略

會寫入 Supabase：

- 學生檔案
- 歷次診斷
- 核准後的正式官方題庫

仍在伺服器暫存：

- 官方來源快取
- 待審核 PDF 暫存
- PDF 檔案快取

免費版建議先保存「來源網址與核准紀錄」，不要大量保存 PDF 檔案本體。

## 六、後續升級

若未來開始正式營運，建議升級：

- Supabase Storage：保存 PDF 檔案
- PostgreSQL 題目結構化表
- 老師登入系統
- 題庫審核流程
- 進階 PDF/OCR 解析
