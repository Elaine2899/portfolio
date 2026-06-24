# Portfolio 批判性建議（更新於 2026-06-24）

## 內容建議

### 2. 所有專案都沒有 GitHub / Demo 連結

每張卡只有「閱讀技術細節」。PrepAgent 與 FunCtrl 至少應提供 GitHub repo 或 live demo 連結。

---

### 3. Kaggle 競賽資訊不夠具體

目前只寫「Kaggle 全球競賽 | 第二名」，建議改成：
**「China Real Estate Demand Prediction｜全球第 2 / 777 隊」**，並加上競賽頁連結。

---

### 4. 哲學所網管的技術內容沒有被強調

目前描述是「維護所上伺服器與網頁日常運作，進行安全合規性調整，重構舊有系統」，這是有實質技術含量的工作（伺服器、資安、系統重構），但放在 experience card 裡的份量跟其他條目一樣，看起來沒什麼份量。建議把具體技術動作寫進去，例如使用的工具、解決了什麼問題。

---

### 5. `n8n` 對多數招募者是陌生詞

Skills 裡的「n8n Cloud AI Orchestration」改成「n8n（雲端 AI 工作流自動化平台）」。

---

## 低優先

### 6. `renderProjectHtml()` bullet 值仍夾帶 HTML

目前是靜態資產風險極低，但日後若改為動態資料來源需要處理 XSS。
