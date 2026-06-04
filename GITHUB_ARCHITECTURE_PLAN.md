# GitHub 星型架構規劃 | AI Swarm Investing

**決策日期**：2026-05-29
**架構**：星型結構（1 個主項目 + 7 個子專案）
**目標**：全球開發者友好、故事驅動、代碼可複用

---

## 🌟 星型架構全景圖

```
GitHub Organization: pppeee861005

                     📚 ai-swarm-docs
                          ↑
                          │ (文檔同步)
                          │
    ai-swarm-monitor ← ai-swarm-investing → ai-swarm-advisor
         ↓                    ↓                     ↓
    (子專案1)          (🌟 中樞)             (子專案7)
    蜂群覺醒          故事+架構+導航        終極顧問

    ai-swarm-triangulate ← → ai-swarm-rebalance
         ↓                          ↓
    (子專案2)                  (子專案3)
    三維獵殺                    自動校準

    ai-swarm-news-hunter ← → ai-swarm-cross-market ← → ai-swarm-stress-test
         ↓                          ↓                          ↓
    (子專案4)                  (子專案5)                  (子專案6)
    新聞獵手                    跨境狙擊                    末日推演
```

---

## 📂 主項目結構：ai-swarm-investing

```
ai-swarm-investing/
│
├── 📋 README.md
│   ├── 故事開場（100 字氛圍）
│   ├── 快速導航（7 個子專案）
│   ├── 架構圖
│   └── 快速開始 3 步
│
├── 📖 docs/
│   │
│   ├── 00-ARCHITECTURE.md
│   │   ├── 星型架構為什麼？
│   │   ├── 7 個 workflow 協作圖
│   │   ├── 技術棧選擇
│   │   └── 擴展指南
│   │
│   ├── 01-STORY-COMPLETE.md
│   │   ├── 霸道女總裁完整故事線
│   │   ├── 克勞德 7 次獨白
│   │   ├── 情感弧線圖
│   │   └── 對應各篇 Substack 連結
│   │
│   ├── 02-GETTING-STARTED.md
│   │   ├── 環境配置（Node.js / Python）
│   │   ├── 三種安裝方式
│   │   │   ├── 方式1：只用某個子專案
│   │   │   ├── 方式2：整合所有 workflow
│   │   │   └── 方式3：自己擴展 Agent
│   │   └── Hello World 例子
│   │
│   ├── 03-ROADMAP.md
│   │   ├── 已完成（E01 監控、E02 三角）
│   │   ├── 開發中（E03-E06）
│   │   ├── 計劃中（E07 終極、E08-E10 擴展）
│   │   └── 社群貢獻機會
│   │
│   ├── 04-GALLERY.md ⭐ 最重要
│   │   ├── 第一篇：蜂群覺醒
│   │   │   ├── 故事片段（50 字引誘）
│   │   │   ├── 核心功能
│   │   │   ├── GitHub 連結
│   │   │   ├── Substack 文章連結
│   │   │   ├── 架構圖
│   │   │   └── 3 個實戰例子
│   │   ├── 第二篇：三維獵殺
│   │   ├── ... (重複 7 次)
│   │   └── 第七篇：終極顧問
│   │
│   ├── 05-API-REFERENCE.md
│   │   ├── 通用 Agent 基類
│   │   ├── 7 個專用 Agent API
│   │   ├── 資料結構定義
│   │   └── 事件系統
│   │
│   ├── 06-INTEGRATION-GUIDE.md
│   │   ├── 如何整合 2+ 個 workflow
│   │   ├── 共享狀態管理
│   │   ├── 實戰案例（整合監控+三角）
│   │   └── 性能優化建議
│   │
│   ├── 07-CONTRIBUTING.md
│   │   ├── 貢獻指南
│   │   ├── PR 流程
│   │   ├── Agent 設計規範
│   │   └── 測試要求
│   │
│   ├── 08-SUBPROJECTS.md ⭐ 子專案地圖
│   │   └── 完整的 7 個子專案列表 + 特性表格
│   │
│   ├── 09-LEARNING-PATHS.md
│   │   ├── 🔰 新手路徑（3 天）
│   │   ├── 🚀 進階路徑（1 週）
│   │   ├── 🏆 高階路徑（2 週）
│   │   └── 🎓 學者路徑（4 週 deep dive）
│   │
│   └── assets/
│       ├── architecture.png
│       ├── story-flowchart.png
│       ├── star-diagram.svg
│       └── workflow-integration.png
│
├── 🏗️ core/ (共享代碼 - monorepo packages)
│   │
│   ├── package.json (workspace root)
│   │
│   ├── packages/
│   │   │
│   │   ├── @ai-swarm/core
│   │   │   ├── src/
│   │   │   │   ├── Agent.base.js (所有 Agent 的基類)
│   │   │   │   ├── types.ts (通用類型定義)
│   │   │   │   ├── WorkflowRuntime.js (蜂群執行引擎)
│   │   │   │   ├── EventBus.js (事件系統)
│   │   │   │   └── utils/ (通用工具函數)
│   │   │   ├── tests/
│   │   │   └── package.json
│   │   │
│   │   ├── @ai-swarm/monitor ↔ ai-swarm-monitor (子專案1)
│   │   ├── @ai-swarm/triangulate ↔ ai-swarm-triangulate (子專案2)
│   │   ├── @ai-swarm/rebalance ↔ ai-swarm-rebalance (子專案3)
│   │   ├── @ai-swarm/news-hunter ↔ ai-swarm-news-hunter (子專案4)
│   │   ├── @ai-swarm/cross-market ↔ ai-swarm-cross-market (子專案5)
│   │   ├── @ai-swarm/stress-test ↔ ai-swarm-stress-test (子專案6)
│   │   └── @ai-swarm/advisor ↔ ai-swarm-advisor (子專案7)
│   │
│   └── .npmrc (workspace 配置)
│
├── 📝 examples/
│   ├── 01-hello-monitor.js
│   │   └── # 最簡單：監控 1 檔股票
│   │
│   ├── 02-integrated-workflow.js
│   │   └── # 進階：監控 + 三角 + 再平衡
│   │
│   ├── 03-full-stack.js
│   │   └── # 完整：所有 7 個 workflow 協作
│   │
│   └── README.md
│       └── # 每個例子的說明 + 預期結果
│
├── 🧪 tests/
│   ├── integration/
│   │   ├── monitor-triangulate.test.js
│   │   └── full-stack.test.js
│   └── README.md
│
├── ⚙️ config/
│   ├── default.json (預設配置)
│   ├── production.json
│   ├── development.json
│   └── agents.config.js (Agent 預設參數)
│
├── 📊 data/
│   ├── README.md
│   │   └── # 樣本資料說明
│   ├── sample-stocks.json
│   ├── sample-news.json
│   └── .gitkeep
│
├── 📋 ARCHITECTURE.md (簡版)
├── 🔗 SUBPROJECTS.md (子專案快速導航)
├── 📖 README.md (開場故事 + 快速導航)
├── 📄 CONTRIBUTING.md
├── 📜 LICENSE (MIT)
├── 🚀 CHANGELOG.md
├── .gitignore
├── package.json (主項目依賴)
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── subproject_integration.md
│   │
│   ├── PULL_REQUEST_TEMPLATE.md
│   │
│   └── workflows/
│       ├── test.yml (每次 PR 自動測試)
│       ├── docs-sync.yml (文檔同步)
│       └── release.yml (版本發佈)
│
└── 📌 VERSION.md
    ├── 主專案版本：v0.2.0
    ├── 子專案版本列表：
    │   ├── monitor: v0.1.0
    │   ├── triangulate: v0.1.0
    │   ├── ...
    │   └── advisor: v0.0.1 (開發中)
    └── 協作版本表 (哪些版本能協作)
```

---

## 🐝 子專案標準模板：ai-swarm-{name}

```
ai-swarm-monitor/           (以監控為例)
│
├── 📖 README.md
│   ├── 故事開頭（50-100 字引誘）
│   ├── 核心功能
│   ├── 特點列表
│   ├── 快速開始（3 行代碼）
│   ├── 安裝說明
│   ├── 貢獻鏈接（指向主專案）
│   └── 許可證
│
├── 📚 docs/
│   ├── STORY.md ⭐
│   │   ├── 完整的故事（對應 Substack 文章）
│   │   ├── 技術原理解釋
│   │   ├── 實戰場景
│   │   └── 與其他 workflow 的交互
│   │
│   ├── ARCHITECTURE.md
│   │   ├── 設計思路
│   │   ├── Agent 角色定義
│   │   ├── 狀態流圖
│   │   └── 數據流程圖
│   │
│   ├── API.md
│   │   ├── 類定義
│   │   ├── 方法簽名
│   │   ├── 事件列表
│   │   └── 錯誤處理
│   │
│   └── EXAMPLES.md
│       ├── 基礎例子
│       ├── 進階例子
│       └── 與其他 workflow 的整合例子
│
├── 📦 src/
│   ├── Agent.Monitor.js
│   │   ├── class AgentMonitor extends Agent
│   │   ├── watchStocks(symbols)
│   │   ├── onAnomalyDetected(callback)
│   │   └── ...
│   │
│   ├── types.ts
│   │   ├── interface MonitorConfig
│   │   ├── interface StockAlert
│   │   └── ...
│   │
│   └── utils/
│       ├── priceAnalyzer.js
│       ├── anomalyDetector.js
│       └── alertFormatter.js
│
├── 🧪 tests/
│   ├── Agent.Monitor.test.js
│   ├── integration.test.js (與主專案協作)
│   └── fixtures/ (測試數據)
│
├── 📋 examples/
│   ├── basic-monitor-5-stocks.js
│   │   └── # 最簡單的用法
│   │
│   ├── advanced-with-custom-alerts.js
│   │   └── # 自定義告警規則
│   │
│   └── integrated-with-triangulate.js
│       └── # 與三角系統整合
│
├── 🔧 config/
│   ├── default.json
│   └── development.json
│
├── 📝 package.json
│   ├── name: "@ai-swarm/monitor"
│   ├── dependencies:
│   │   └── "@ai-swarm/core": "^0.2.0"
│   └── scripts:
│       ├── test
│       ├── build
│       └── link-to-main
│
├── 📜 LICENSE
├── 📄 CHANGELOG.md
├── .gitignore
│
└── .github/
    └── workflows/
        └── test.yml
```

---

## 🔗 7 個子專案清單

| # | 名稱 | GitHub Repo | 功能 | 難度 | 狀態 |
|---|------|-------------|------|------|------|
| 1 | 蜂群覺醒 | ai-swarm-monitor | 實時多股票監控 + 異常偵測 | ⭐⭐⭐ | 🟢 完成 |
| 2 | 三維獵殺 | ai-swarm-triangulate | 籌碼+基本+技術三維印證 | ⭐⭐⭐⭐ | 🟢 完成 |
| 3 | 自動校準 | ai-swarm-rebalance | 動態再平衡引擎 | ⭐⭐⭐ | 🟡 開發中 |
| 4 | 新聞獵手 | ai-swarm-news-hunter | 新聞-基本面套利偵測 | ⭐⭐⭐⭐ | 🟡 開發中 |
| 5 | 跨境狙擊 | ai-swarm-cross-market | 跨市場套利掃描器 | ⭐⭐⭐⭐⭐ | 🔴 未開始 |
| 6 | 末日推演 | ai-swarm-stress-test | 風險情境模擬器 | ⭐⭐⭐⭐ | 🔴 未開始 |
| 7 | 終極顧問 | ai-swarm-advisor | AI 投資顧問系統 | ⭐⭐⭐⭐⭐ | 🔴 未開始 |

---

## 📖 docs/04-GALLERY.md 的標準格式

每篇 7 個欄位：

```markdown
## 第一篇：《蜂群覺醒》

### 故事開場（引誘讀者）
妳盯著 20 個股票的即時報價，眼睛快瞎了。
直到妳發現了一個秘密...

[🔗 完整故事在 Substack](https://...)

### 核心功能
- ✅ 實時監控 5-100+ 檔股票
- ✅ 毫秒級異常偵測
- ✅ 自定義告警規則
- ✅ 與其他 workflow 協作

### 技術架構
[ASCII 圖或 SVG]

### 快速開始
\`\`\`javascript
const { AgentMonitor } = require('@ai-swarm/monitor');
const monitor = new AgentMonitor({ symbols: ['TSMC', 'NVDA', 'AAPL'] });
monitor.start();
\`\`\`

### GitHub 項目
🔗 [ai-swarm-monitor](https://github.com/pppeee861005/ai-swarm-monitor)
- ⭐ Stars: 234
- 📦 NPM: @ai-swarm/monitor
- 📚 文檔: [docs/STORY.md](...)

### 實戰例子
1. [監控 5 檔股票基礎例子](...)
2. [自定義告警規則進階例子](...)
3. [與三角系統整合實戰](...)

### 社群集成
- 🎓 學習路徑：[新手 3 天路線](...)
- 🤝 貢獻機會：[擴展告警規則](...)
- 💬 討論：[GitHub Discussions](...)
```

---

## 🚀 實施 SOP（分階段）

### 第一階段：主項目結構（本週）

```
[ ] 1. 在主專案中建立完整 docs/ 目錄
[ ] 2. 編寫 README.md（故事 + 導航）
[ ] 3. 編寫 docs/04-GALLERY.md（7 篇索引）
[ ] 4. 編寫 docs/08-SUBPROJECTS.md
[ ] 5. 建立 docs/assets/ 存放架構圖
[ ] 6. 設置 .github/workflows/ (CI/CD)
[ ] 7. 主專案首次 push (GitHub)
```

### 第二階段：子專案遷移（2-3 週）

```
[ ] 1. 創建 ai-swarm-monitor (從現有代碼複製)
      [ ] 1.1 複製 src/
      [ ] 1.2 編寫 README.md
      [ ] 1.3 編寫 docs/STORY.md
      [ ] 1.4 設置 package.json (@ai-swarm/monitor)
      [ ] 1.5 Push 到 GitHub

[ ] 2. 創建 ai-swarm-triangulate
      [ ] ... (同上)

[ ] 3-7. 創建其他子專案
      (按優先級：完成度高的優先)
```

### 第三階段：整合與測試（2-3 週）

```
[ ] 1. 主專案中建立 core/packages/
      [ ] 1.1 建立 @ai-swarm/core (共享代碼)
      [ ] 1.2 從各子專案抽象通用邏輯

[ ] 2. 建立 monorepo workspace
      [ ] 2.1 根 package.json 配置 workspace
      [ ] 2.2 各子專案 package.json 指向 @ai-swarm/core

[ ] 3. 寫集成例子
      [ ] 3.1 examples/01-hello-monitor.js
      [ ] 3.2 examples/02-integrated.js
      [ ] 3.3 examples/03-full-stack.js

[ ] 4. 寫集成測試
      [ ] tests/integration/
```

### 第四階段：文檔完善（2 週）

```
[ ] 1. 編寫 docs/05-API-REFERENCE.md
[ ] 2. 編寫 docs/06-INTEGRATION-GUIDE.md
[ ] 3. 編寫 docs/09-LEARNING-PATHS.md
[ ] 4. 製作架構圖 + 流程圖
[ ] 5. 錄製 YouTube Demo 視頻（可選）
```

---

## 📊 GitHub 組織建議

```
Organization: pppeee861005

Repositories:
├── ai-swarm-investing (主)
├── ai-swarm-monitor (子)
├── ai-swarm-triangulate (子)
├── ai-swarm-rebalance (子)
├── ai-swarm-news-hunter (子)
├── ai-swarm-cross-market (子)
├── ai-swarm-stress-test (子)
├── ai-swarm-advisor (子)
└── ai-swarm-docs (可選：單獨 docs 站點)

Topics (用於搜尋):
- ai-agent
- workflow
- quantitative-trading
- swarm-intelligence
- investing
- claude-api
- javascript
- open-source
```

---

## 🎯 質量保障

### 每個子專案必須有

```
✅ README.md (簡潔、有故事)
✅ docs/STORY.md (對應 Substack 文章)
✅ docs/ARCHITECTURE.md (技術詳解)
✅ examples/ (至少 3 個)
✅ tests/ (80%+ 覆蓋率)
✅ package.json (清晰依賴)
✅ CHANGELOG.md (版本記錄)
✅ 中文注釋 (考慮 Asia 開發者)
```

### 主專案必須有

```
✅ docs/04-GALLERY.md (7 篇完整索引)
✅ docs/08-SUBPROJECTS.md (子專案導航)
✅ 清晰的架構圖 (ASCII 或 SVG)
✅ examples/ (3 個漸進式例子)
✅ 中英文版本
```

---

## 💡 關鍵亮點

### 1. 故事驅動（Narrative-Driven）
每個 repo 都有 STORY.md，對標 Substack 文章，讓開發者邊讀故事邊理解代碼。

### 2. 漸進式學習（Progressive Learning）
- 新手：只看主項目 README + 第一篇故事
- 進階：fork ai-swarm-monitor，跑例子
- 高階：整合 2+ workflow

### 3. 全球友好
- 英文 README（給全球開發者）
- 中文故事/注釋（給華文圈）
- 清晰的架構圖（跨語言）

### 4. 企業可用
- 模組化結構，可獨立使用某個 workflow
- npm packages (@ai-swarm/*)，企業部署友好
- monorepo，易於貢獻和維護

---

## 📅 時間表

| 時期 | 任務 | 預計耗時 |
|------|------|---------|
| **本週** | 主項目結構 + GALLERY | 12 小時 |
| **下週** | 遷移 monitor + triangulate | 10 小時 |
| **第三週** | 遷移其他 5 個 | 15 小時 |
| **第四週** | 集成測試 + 文檔 | 16 小時 |
| **總計** | | ~53 小時 |

---

## ✅ 檢查清單（上線前）

```
主項目
[ ] README 故事 + 導航完整
[ ] docs/ 包含 9 個 md 文件
[ ] examples/ 有 3 個逐漸複雜的例子
[ ] .github/workflows 配置好
[ ] 所有連結可點擊（內部 + 外部）

子專案（每個）
[ ] STORY.md 完整
[ ] 代碼註釋詳細
[ ] 至少 3 個 example
[ ] 測試通過
[ ] package.json 清晰

Substack 文章
[ ] 對應的 GitHub 連結已插入
[ ] 連結可點擊、無死鏈
[ ] 故事線完整

GitHub
[ ] 所有 repo 都有描述和 topics
[ ] README 都用了 emoji（視覺吸引）
[ ] 都有 MIT license
```

---

**下一步**：要我幫你開始建立主項目的文檔結構嗎？
