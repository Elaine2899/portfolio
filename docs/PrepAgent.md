# PrepAgent — Telegram AI 備考助教與 RAG 知識庫

> 履歷條目：個人專案 | PrepAgent  Telegram AI 備考助教與 RAG 知識庫

## 專案目的

將唐麗英老師 YT 統計學課程的 whisper 逐字稿（29 個 .txt）轉化為可對話的 Telegram AI 備考助教。
全雲端架構，Mac 關機後服務仍可運作。設計為模組化，可快速新增科目。

## 技術棧

| 層次 | 技術 | 用途 |
|------|------|------|
| 介面 | Telegram Bot | 使用者對話入口 |
| 協調 | n8n Cloud | Workflow 觸發、路由、AI Agent 執行 |
| LLM | Google Gemini (`gemini-2.0-flash`) | n8n 內建節點，同一 Google AI Studio key |
| Embedding | `gemini-embedding-001`（3072 維） | v1beta REST API 直接呼叫，繞過 SDK |
| 向量庫 | Supabase pgvector (`halfvec(3072)`) | 雲端，`ivfflat + halfvec_cosine_ops` |
| Ingestion | Python 3.12 + requests | 一次性本地執行，推送逐字稿到 Supabase |

## 重要架構決策

### Embedding 呼叫方式：直接 REST，不用 SDK
- `google-generativeai` 和 `google-genai` SDK 在 AI Studio API key 下固定走 `v1beta`
- `gemini-embedding-001` 在 `v1beta` 可用，因此用 `requests` 直接 POST `v1beta` endpoint
- URL：`https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent`

### 向量型別：`halfvec` 而非 `vector`
- `gemini-embedding-001` 輸出 3072 維
- pgvector 的 `vector` 型別 ivfflat 最多支援 2000 維
- `halfvec`（16-bit float）的 ivfflat 最多支援 4000 維（3072 < 4000 ✓）
- 額外好處：省一半儲存空間，語意搜尋精度差異可忽略

### 逐字稿格式
- Whisper 輸出格式：每行 `行號\t文字`（例如 `1\t各位同學大家好`）
- `chunker.py:_parse_lines()` 負責剝離行號前綴
- 分塊策略：20 行一組，5 行 overlap（滑動視窗）

## 檔案結構

```
agentForPre/
├── .env                        # 實際金鑰（gitignored）
├── .env.example                # 金鑰範本
├── supabase_schema.sql         # 建表 SQL（每次重建都要重跑）
│
├── harness/                    # Python Ingestion Harness
│   ├── config.py               # SUBJECTS 字典、分塊/嵌入參數
│   ├── chunker.py              # chunk_file() — 逐字稿分塊
│   ├── ingest.py               # 主程式：讀取→分塊→嵌入→Supabase
│   ├── verify.py               # 驗證：row count + 測試 RAG 查詢
│   └── requirements.txt        # requests, supabase, python-dotenv
│
├── n8n/
│   └── system_prompt.txt       # 複製貼上至 n8n AI Agent 節點
│
└── data/                       # 逐字稿原始檔（勿修改）
    ├── Lec01.txt … Lec16.txt   # 統計學一（基礎）
    └── ProLec01.txt … ProLec13.txt  # 統計學二（進階）
```

## 執行指令

```bash
# 初次建立環境
cd harness
pip install -r requirements.txt

# 重建 Supabase schema（維度或模型異動時必須重跑）
# → 到 Supabase SQL Editor 貼上並執行 supabase_schema.sql

# 資料 Ingestion（一次性）
python ingest.py

# 新增科目
python ingest.py --subject <key> --dir ../data/<folder>

# 清除並重新 ingest
python ingest.py --subject statistics --clear

# 驗證 Supabase 資料與 RAG 是否正常
python verify.py
```

## Supabase schema 重點

```sql
-- 型別：halfvec(3072)，不是 vector(3072)
embedding halfvec(3072)

-- 索引：halfvec_cosine_ops，不是 vector_cosine_ops
create index ... using ivfflat (embedding halfvec_cosine_ops)

-- match_documents 函式參數型別也是 halfvec(3072)
```

**注意**：每次改維度或型別都需要 `drop table` 重建，`alter column` 無法直接改 vector 維度。

## n8n Workflow 結構

```
Telegram Trigger
  → Switch（/ask / /quiz / /summary / 其他）
  → AI Agent
      Model: gemini-2.0-flash
      Memory: Window Buffer（5 輪）
      Tool: Supabase Vector Store（match_documents，top_k=5）
      Embedding: Google text-embedding-004（n8n 內建節點）
  → Telegram Send
```

系統提示詞在 `n8n/system_prompt.txt`，直接複製至 n8n AI Agent 節點的 System Message 欄位。

## 新增科目 SOP

1. 建立 `data/<科目>/` 資料夾，放入 whisper 逐字稿
2. 在 `harness/config.py` 的 `SUBJECTS` 字典新增條目
3. 執行 `python ingest.py --subject <key>`
4. n8n 系統提示詞加入科目切換指令邏輯

## 已知陷阱

- **SDK v1beta 問題**：任何 Google Python SDK 在 AI Studio key 下都走 `v1beta`；embedding 模型相容性以實測為準，目前確認 `gemini-embedding-001` 在 `v1beta` 可用
- **halfvec vs vector**：pgvector 的 ivfflat 對 `vector` 限制 2000 維，對 `halfvec` 限制 4000 維；3072 維必須用 `halfvec`
- **逐字稿編碼**：檔案為 UTF-8，`chunker.py` 明確指定 `encoding="utf-8"`
- **Supabase Service Key**：ingestion 需要 service_role key（有 INSERT 權限），不是 anon key
