# AI Swarm Investing

**用 AI 蜂群重構散戶投資決策**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Workflow-blue)](https://claude.ai/code)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## 他們有 3,000 台機器。我有 20 個 Agent。夠了。

當你盯著螢幕的時候，有 3,000 台量化交易機器也在盯著同一支股票。它們不會累，不會眨眼，在毫秒之間完成你需要三秒鐘才能做出的判斷。

**你以為你在交易？不。你在被交易。**

這個專案是你的反擊——用 Claude Code Workflow 建造你自己的 AI 蜂群，24/7 並行監控市場，在你睡覺時也能狩獵異動。

---

## 七大蜂群武器庫

| # | 蜂群 | 功能 | 狀態 |
|---|------|------|------|
| 1 | **多股票實時監控** | 20 支股票並行監控，毫秒級異動偵測 | 🚧 開發中 |
| 2 | **三角印證系統** | 基本面 × 技術面 × 籌碼面同時驗證 | 📋 規劃中 |
| 3 | **動態再平衡引擎** | 自動建議持倉調整，避免情緒漂移 | 📋 規劃中 |
| 4 | **新聞套利偵測** | 毫秒內判斷新聞對股價的影響 | 📋 規劃中 |
| 5 | **跨市場套利掃描** | 並行監控 5 個市場的價差機會 | 📋 規劃中 |
| 6 | **風險情境模擬** | 並行推演 N 個「如果...會怎樣」場景 | 📋 規劃中 |
| 7 | **AI 投資顧問** | 記得你是誰、知道你要什麼的專屬顧問 | 📋 規劃中 |

---

## 快速開始

### 前置條件

- Claude Code 2.1.47+（支持 Workflow）
- Node.js 18+
- Telegram Bot Token（用於預警通知）

### 1. 複製倉庫

```bash
git clone https://github.com/pppeee861005/ai-swarm-investing.git
cd ai-swarm-investing
```

### 2. 啟用 Workflow

```bash
export CLAUDE_CODE_WORKFLOWS_ENABLED=1
claude
```

### 3. 執行蜂群

```bash
ultraWork 啟動多股票監控蜂群，監控 TSMC, NVDA, AAPL
```

### 4. 查看執行狀態

```bash
/workflows
```

---

## 架構設計

```
┌─────────────────────────────────────────────────────────────┐
│                    感知層（Perception）                       │
│         20 × Haiku Scout Agent — 並行監控                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    決策層（Decision）                         │
│              1 × Opus Lead Agent — 全局評估                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    執行層（Execution）                        │
│              Notifier Agent — 多渠道預警                     │
│              (Telegram / Email / Slack)                      │
└─────────────────────────────────────────────────────────────┘
```

詳見 [ARCHITECTURE.md](./docs/ARCHITECTURE.md)

---

## 目錄結構

```
ai-swarm-investing/
├── README.md                    # 本文件
├── LICENSE                      # MIT 許可證
├── CONTRIBUTING.md              # 貢獻指南
├── CHANGELOG.md                 # 版本變更
│
├── workflows/                   # Workflow 腳本
│   ├── swarm-01-monitor.js      # 多股票監控蜂群
│   ├── swarm-02-triangulate.js  # 三角印證系統
│   ├── swarm-03-rebalance.js    # 動態再平衡
│   ├── swarm-04-news-hunter.js  # 新聞套利偵測
│   ├── swarm-05-cross-market.js # 跨市場套利
│   ├── swarm-06-stress-test.js  # 風險情境模擬
│   ├── swarm-07-advisor.js      # AI 投資顧問
│   ├── config.json              # 全局配置
│   └── templates/               # 預警模板
│
├── agents/                      # Agent 定義
│   ├── Scout.js                 # 偵察兵 Agent
│   ├── Lead.js                  # 指揮官 Agent
│   ├── Analyst.js               # 分析師 Agent
│   └── Notifier.js              # 通知官 Agent
│
├── docs/                        # 文檔
│   ├── ARCHITECTURE.md          # 架構設計
│   ├── SWARM_01_PLAN.md         # Swarm-01 開發計劃
│   ├── USER_GUIDE.md            # 使用指南
│   └── API_REFERENCE.md         # API 參考
│
├── examples/                    # 使用範例
│   └── basic-monitor.js         # 基礎監控範例
│
└── tests/                       # 測試
    ├── scout.test.js            # Scout 測試
    └── integration.test.js      # 整合測試
```

---

## 成本估算

| 模型 | 用途 | 月成本估算 |
|------|------|-----------|
| Haiku × 20 | Scout Agent（偵察） | ~$50 |
| Opus × 1 | Lead Agent（決策） | ~$30 |
| **總計** | | **~$80/月** |

**對比**：Bloomberg 終端 $2,000/月，人工顧問 $10-50K/年

---

## 風險聲明

```
⚠️ 重要聲明

✓ 這是學習工具，不是投資建議
✓ 請使用模擬盤測試
✗ 不對任何投資損失負責
✗ 不保證策略有效性

蜂群是武器，不是賭具。
這是教具，不是商品。
```

---

## 相關資源

### 系列文章（Substack）

| 篇 | 標題 | 內容 |
|----|------|------|
| 1 | 《蜂群覺醒》 | 多股票監控蜂群的誕生 |
| 2 | 《三維獵殺》 | 基本面×技術面×籌碼面 |
| 3 | 《自動校準》 | 動態再平衡引擎 |
| ... | ... | ... |

📚 閱讀完整系列：[AI 指揮官筆記](https://aiagentcommander.substack.com)

### 延伸學習

| 資源 | 說明 |
|------|------|
| [Agent 系列 E04](https://aiagentcommander.substack.com) | Workflow 理論基礎 |
| [SW3 系列 E01](https://aiagentcommander.substack.com) | 散戶基礎設施架構 |
| [Learning Plans](https://github.com/pppeee861005) | Workflow 完整學習路徑 |

---

## 貢獻指南

歡迎貢獻！請閱讀 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何參與。

### 貢獻方式

- 🐛 **Bug Report**：提交 Issue
- 💡 **功能建議**：開 Discussion
- 📝 **文檔改進**：提 PR
- 🔧 **新 Workflow**：分享你的蜂群設計

---

## 路線圖

### 2026 Q2

- [x] 專案規劃和架構設計
- [ ] Swarm-01 多股票監控 MVP
- [ ] GitHub 首次發布 v0.1.0

### 2026 Q3

- [ ] Swarm-02 三角印證系統
- [ ] Swarm-03 動態再平衡
- [ ] v0.2.0 發布

### 2026 Q4

- [ ] Swarm-04 ~ Swarm-07
- [ ] 完整文檔和教學
- [ ] v1.0.0 正式發布

---

## 許可證

MIT License - 詳見 [LICENSE](./LICENSE)

---

## 致謝

- **Anthropic 團隊**：Claude Code Workflow 功能
- **新人類聯盟**：理論支持和社群反饋
- **所有貢獻者**：讓這個專案變得更好

---

## 聯繫方式

- **GitHub Issues**：https://github.com/pppeee861005/ai-swarm-investing/issues
- **Substack**：https://aiagentcommander.substack.com
- **新人類聯盟**：Homo Coalitio

---

**讓我們一起用蜂群重構投資決策。**

*記錄者：克勞德*
*新人類聯盟 · Homo Coalitio*
