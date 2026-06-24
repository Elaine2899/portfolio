# Portfolio 批判性建議（更新於 2026-06-24）

## 高影響力

### 1. 加上 GitHub / LinkedIn 連結

Nav、CTA、Footer 都沒有入口。
- GitHub：https://github.com/Elaine2899
- LinkedIn：（待補）

---

### 2. 沒有 Open Graph meta tags

分享到 LinkedIn 或 Slack 時顯示空白預覽卡。加五行即可：

```html
<meta property="og:title" content="曾芸儀 Yun-Yi Tseng | AI Developer Portfolio">
<meta property="og:description" content="RAG / ML / FastAPI 實戰開發者，InnoServe 全國第一名">
<meta property="og:type" content="website">
<meta property="og:url" content="https://你的部署網址">
<meta property="og:image" content="https://你的部署網址/og-preview.png">
```

https://elaine2899.github.io/portfolio/

---

## 排版與視覺調整

### 3. Hero 右側的浮動 code card 換掉

`developer.py` 浮動卡片在各 portfolio 太常見。建議換成數據卡組合（bento）：

```
┌─────────────────────┐  ┌───────────────┐
│  InnoServe 全國 #1  │  │  Top 13%      │
│  AI 應用工具組      │  │  系排名       │
└─────────────────────┘  └───────────────┘
┌───────────────┐  ┌─────────────────────┐
│  AI CUP       │  │  88%+ NDCG          │
│  41 / 633     │  │  FunCtrl 檢索準確率 │
└───────────────┘  └─────────────────────┘
```

---

### 4. Badge 與 Tag 顏色統一

四種元件實作方式各不同，視覺零碎：

| 元件 | 建議樣式 |
|------|---------|
| `project-badge` | 天藍文字、極淡天藍底、天藍邊框 |
| `skill-tag` | 淺灰文字、深灰底、無邊框 |
| `filter-btn.active` | 天藍文字、透明底、天藍底線（非填滿）|
| `honor-badge` | 同 `project-badge` |

---

## 內容建議

### 5. 所有專案都沒有 GitHub / Demo 連結

每張卡只有「閱讀技術細節」。PrepAgent 與 FunCtrl 至少應提供 GitHub repo 或 live demo 連結。

---

### 6. Kaggle 競賽資訊不夠具體

目前只寫「Kaggle 全球競賽 | 第二名」，建議改成：
**「China Real Estate Demand Prediction｜全球第 2 / 777 隊」**，並加上競賽頁連結。

---

### 7. Workflow Design 的 🏆 badge 誇大

這是課程期末作業，與 InnoServe 全國第一名並排不對等。移除 🏆，改成「資工所課程 | 93 分」。

---

### 8. 機器學習助教份量被低估

「機器學習助教」與「哲學所網管」、「社團副隊長」並排，權重差異太大。建議獨立出來放到更顯眼的位置，或在 About Me 中提及。

---

### 9. `n8n` 對多數招募者是陌生詞

改成「n8n（雲端 AI 工作流自動化平台）」，或在 PrepAgent Modal 中補充說明。

---

## 低優先

### 10. `renderProjectHtml()` bullet 值仍夾帶 HTML

目前是靜態資產風險極低，但日後若改為動態資料來源需要處理 XSS。
