# Swarm-01：多股票實時監控蜂群 — MVP 開發計劃

**版本**：v0.1-MVP
**最後更新**：2026-05-27
**狀態**：📋 規劃中

---

## 🎯 專案定位

### 一句話定義

> **用 20 個 Haiku Agent 並行監控 20 支股票，在你睡覺時也能狩獵異動。**

### 核心痛點

```
傳統看盤：
  一個人 → 盯 20 個視窗 → 眼睛快瞎了 → 錯過關鍵異動

蜂群監控：
  20 個 Agent → 並行監控 → 毫秒級偵測 → 自動預警
```

### 殺手級用途

| 場景 | 傳統方式 | 蜂群方式 |
|------|---------|---------|
| 看盤機出故障 | 錯過全部 | 蜂群繼續監控 |
| 出差/睡覺 | 無法監控 | 24/7 自動運行 |
| 同時多支異動 | 只能處理 1 支 | 並行處理全部 |
| 反應速度 | 3-5 秒（人眼） | <100 毫秒（Agent） |

---

## 📐 架構設計

### 三層架構

```
┌─────────────────────────────────────────────────────────────┐
│                    感知層（Perception）                       │
│         20 個 Haiku Scout Agent — 並行監控                   │
│   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                  │
│   │ H-01│ │ H-02│ │ H-03│ │ ... │ │ H-20│                  │
│   │TSMC │ │NVDA │ │AAPL │ │     │ │ XXX │                  │
│   └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘                  │
│      └───────┴───────┴───────┴───────┘                      │
│                        │                                     │
└────────────────────────┼─────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    決策層（Decision）                         │
│              Lead Agent (Opus) — 全局評估                    │
│   ┌─────────────────────────────────────────────────┐       │
│   │ • 每分鐘重新評估權重                              │       │
│   │ • 聚合所有 Scout 的異動報告                       │       │
│   │ • 判斷是否觸發預警                               │       │
│   │ • 決定預警等級（Info / Warning / Critical）       │       │
│   └─────────────────────────────────────────────────┘       │
└────────────────────────┼─────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    執行層（Execution）                        │
│              Notifier Agent — 預警通知                       │
│   ┌─────────────────────────────────────────────────┐       │
│   │ • Telegram 推送                                  │       │
│   │ • Email 通知                                     │       │
│   │ • Slack Webhook                                 │       │
│   │ • 審計日誌記錄                                   │       │
│   └─────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🤖 Agent 角色定義

### 1. Scout Agent（偵察兵）× 20

**責任**：
- 監控單一股票的即時數據
- 偵測異常（支撐破位、量能突增、大單進出）
- 向 Lead Agent 回報異動

**使用模型**：Claude Haiku（輕量、低成本、高並發）

**監控指標**：
```javascript
const monitorMetrics = {
  price: {
    current: 0,           // 當前價
    support: 0,           // 支撐位
    resistance: 0,        // 壓力位
    change_pct: 0         // 漲跌幅
  },
  volume: {
    current: 0,           // 當前成交量
    avg_5min: 0,          // 5 分鐘均量
    spike_ratio: 0        // 量能爆發比（current / avg）
  },
  orderbook: {
    bid_depth: 0,         // 買盤深度
    ask_depth: 0,         // 賣盤深度
    imbalance: 0          // 買賣失衡比
  },
  bigOrder: {
    threshold: 10000000,  // 大單定義（1000 萬）
    detected: false,      // 是否偵測到大單
    direction: null       // 買入/賣出
  }
}
```

**觸發條件**：
```javascript
const triggers = {
  SUPPORT_BREAK: (price) => price.current < price.support * 0.98,
  VOLUME_SPIKE: (volume) => volume.spike_ratio > 3.0,
  BIG_ORDER_IN: (bigOrder) => bigOrder.detected && bigOrder.direction === 'BUY',
  BIG_ORDER_OUT: (bigOrder) => bigOrder.detected && bigOrder.direction === 'SELL',
  IMBALANCE: (orderbook) => Math.abs(orderbook.imbalance) > 0.3
}
```

**輸出格式**：
```json
{
  "agent_id": "H-01",
  "symbol": "TSMC",
  "timestamp": "2026-05-27T03:17:02Z",
  "status": "ALERT",
  "triggers_fired": ["VOLUME_SPIKE", "BIG_ORDER_IN"],
  "metrics": {
    "price": { "current": 850, "change_pct": 2.1 },
    "volume": { "spike_ratio": 4.2 },
    "bigOrder": { "detected": true, "direction": "BUY", "amount": 15000000 }
  },
  "confidence": 0.87
}
```

---

### 2. Lead Agent（指揮官）× 1

**責任**：
- 每分鐘聚合所有 Scout 的報告
- 評估全局市場狀態
- 判斷是否觸發預警
- 決定預警等級和內容

**使用模型**：Claude Opus（最強推理能力）

**評估邏輯**：
```javascript
async function evaluateAlerts(scoutReports) {
  // 過濾有異動的報告
  const alerts = scoutReports.filter(r => r.status === 'ALERT')

  if (alerts.length === 0) {
    return { action: 'NONE' }
  }

  // 按嚴重程度分類
  const critical = alerts.filter(a =>
    a.triggers_fired.includes('SUPPORT_BREAK') ||
    a.triggers_fired.includes('BIG_ORDER_OUT')
  )

  const warning = alerts.filter(a =>
    a.triggers_fired.includes('VOLUME_SPIKE') ||
    a.triggers_fired.includes('BIG_ORDER_IN')
  )

  // 生成預警決策
  return {
    action: critical.length > 0 ? 'CRITICAL' : 'WARNING',
    alerts: alerts,
    summary: generateSummary(alerts),
    recommendation: generateRecommendation(alerts)
  }
}
```

**輸出格式**：
```json
{
  "evaluation_id": "EVAL-20260527-031703",
  "timestamp": "2026-05-27T03:17:03Z",
  "action": "WARNING",
  "summary": "偵測到 2 支股票異動：TSMC 大單買入、NVDA 量能爆發",
  "alerts": [
    { "symbol": "TSMC", "level": "WARNING", "triggers": ["BIG_ORDER_IN"] },
    { "symbol": "NVDA", "level": "INFO", "triggers": ["VOLUME_SPIKE"] }
  ],
  "recommendation": "觀察 TSMC 開盤走勢，NVDA 暫不需行動"
}
```

---

### 3. Notifier Agent（通知官）× 1

**責任**：
- 根據 Lead Agent 的決策發送通知
- 支持多渠道（Telegram、Email、Slack）
- 記錄審計日誌

**使用模型**：無（純執行層）

**通知格式**：
```
🐝 蜂群預警 #EVAL-20260527-031703

⚠️ 等級：WARNING
📊 異動股票：2 支

【TSMC】🔴 大單買入
  • 金額：1,500 萬
  • 當前價：850（+2.1%）
  • 建議：觀察開盤走勢

【NVDA】🟡 量能爆發
  • 爆發比：4.2x
  • 當前價：125.30（+1.8%）
  • 建議：暫不需行動

⏰ 偵測時間：03:17:03
```

---

## 🔄 Workflow 流程

### 主循環（每分鐘執行）

```
┌─────────────────────────────────────────────────────────────┐
│                    Main Loop（每 60 秒）                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ Stage 1：並行監控（Parallel）                                 │
│                                                               │
│   Scout H-01 ──┐                                             │
│   Scout H-02 ──┤                                             │
│   Scout H-03 ──┼─→ Promise.all([...]) ─→ 20 份報告          │
│   ...         ─┤                                             │
│   Scout H-20 ──┘                                             │
│                                                               │
│   預期耗時：< 2 秒（並行執行）                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ Stage 2：全局評估（Sequential）                               │
│                                                               │
│   Lead Agent ─→ 聚合 20 份報告 ─→ 判斷是否異動               │
│                                                               │
│   預期耗時：< 3 秒                                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ Decision：是否需要預警？                                      │
│                                                               │
│   ├─ 無異動 → 記錄日誌 → 等待下一輪                          │
│   │                                                           │
│   └─ 有異動 → Stage 3                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ Stage 3：通知執行（Parallel）                                 │
│                                                               │
│   Notifier ─┬─→ Telegram 推送                               │
│             ├─→ Email 通知                                   │
│             ├─→ Slack Webhook                                │
│             └─→ 審計日誌                                      │
│                                                               │
│   預期耗時：< 2 秒（並行執行）                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                        等待下一輪
```

---

## 📊 分階段開發計劃

### Phase 0：環境準備（1 天）

**目標**：準備開發環境和基礎設施

| 任務 | 說明 | 產出 |
|------|------|------|
| 0.1 | 啟用 Claude Code Workflow | 驗證 `ultraWork` 可用 |
| 0.2 | 選擇數據源 | 確定用哪個 API（模擬/真實） |
| 0.3 | 設置通知渠道 | Telegram Bot Token |
| 0.4 | 建立專案結構 | 目錄結構、package.json |

**驗收標準**：
- [ ] `ultraWork hello` 可執行
- [ ] 有可用的股票數據 API
- [ ] Telegram Bot 可發送測試訊息

---

### Phase 1：單一 Scout MVP（3 天）

**目標**：實現單一股票的監控和預警

```
Phase 1 範圍：
  1 個 Scout Agent（監控 1 支股票）
  + 簡化版 Lead Agent（直接判斷）
  + Telegram 通知
```

| 任務 | 說明 | 預期時間 |
|------|------|---------|
| 1.1 | 實現 Scout Agent 基礎結構 | 4h |
| 1.2 | 接入數據源（模擬/真實） | 4h |
| 1.3 | 實現觸發條件邏輯 | 4h |
| 1.4 | 實現 Telegram 通知 | 2h |
| 1.5 | 端到端測試 | 2h |

**產出文件**：
```
workflows/
└── swarm-01-monitor-v0.1.js   # MVP 版本
```

**驗收標準**：
- [ ] 能監控 1 支股票的價格和成交量
- [ ] 當成交量突增時，自動發 Telegram 通知
- [ ] 日誌記錄完整

---

### Phase 2：並行蜂群（5 天）

**目標**：擴展到 5 個 Scout 並行監控

```
Phase 2 範圍：
  5 個 Scout Agent（並行監控 5 支股票）
  + 完整版 Lead Agent（聚合判斷）
  + 多渠道通知
```

| 任務 | 說明 | 預期時間 |
|------|------|---------|
| 2.1 | 重構為多 Scout 架構 | 4h |
| 2.2 | 實現 Promise.all 並行執行 | 4h |
| 2.3 | 實現 Lead Agent 聚合邏輯 | 6h |
| 2.4 | 添加 Email 通知渠道 | 2h |
| 2.5 | 性能測試和優化 | 4h |

**產出文件**：
```
workflows/
└── swarm-01-monitor-v0.2.js   # 並行版本
agents/
├── Scout.js                    # Scout Agent 類
├── Lead.js                     # Lead Agent 類
└── Notifier.js                 # Notifier Agent 類
```

**驗收標準**：
- [ ] 5 個 Scout 並行執行，總耗時 < 5 秒
- [ ] Lead Agent 能正確聚合和判斷
- [ ] 支持 Telegram + Email 雙渠道

---

### Phase 3：完整蜂群（5 天）

**目標**：擴展到 20 個 Scout，完整實現

```
Phase 3 範圍：
  20 個 Scout Agent（完整蜂群）
  + 動態股票清單配置
  + 完整監控儀表板
  + 審計日誌系統
```

| 任務 | 說明 | 預期時間 |
|------|------|---------|
| 3.1 | 擴展到 20 個 Scout | 4h |
| 3.2 | 實現動態股票清單配置 | 4h |
| 3.3 | 實現 `/workflows` 監控 | 4h |
| 3.4 | 實現審計日誌系統 | 4h |
| 3.5 | 文檔編寫 | 4h |

**產出文件**：
```
workflows/
├── swarm-01-monitor.js         # 正式版本
├── config.json                 # 股票清單配置
└── templates/
    └── alert-template.md       # 預警訊息模板
docs/
├── ARCHITECTURE.md             # 架構文檔
├── USER_GUIDE.md               # 使用指南
└── API_REFERENCE.md            # API 參考
```

**驗收標準**：
- [ ] 20 個 Scout 並行執行，總耗時 < 10 秒
- [ ] 可通過配置文件動態調整監控清單
- [ ] `/workflows` 可查看執行狀態
- [ ] 完整的審計日誌

---

### Phase 4：生產優化（3 天）

**目標**：優化性能、提高穩定性

| 任務 | 說明 | 預期時間 |
|------|------|---------|
| 4.1 | 錯誤處理和重試機制 | 4h |
| 4.2 | Token 成本優化 | 4h |
| 4.3 | 壓力測試 | 4h |
| 4.4 | 部署文檔 | 2h |

**驗收標準**：
- [ ] 連續運行 24 小時無崩潰
- [ ] 單次循環 Token 成本 < 5k
- [ ] 有完整的部署和運維文檔

---

## 📈 性能指標目標

| 指標 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|------|---------|---------|---------|---------|
| Scout 數量 | 1 | 5 | 20 | 20 |
| 單輪耗時 | <5s | <5s | <10s | <8s |
| Token/輪 | <1k | <3k | <8k | <5k |
| 可靠性 | 90% | 95% | 99% | 99.9% |

---

## 💰 成本估算

### Token 成本（每月）

| 模型 | 調用次數/天 | Token/次 | 月成本 |
|------|------------|----------|--------|
| Haiku × 20 | 1440 × 20 | 500 | ~$50 |
| Opus × 1 | 1440 | 2000 | ~$30 |
| **總計** | | | **~$80/月** |

### 與傳統方案對比

| 方案 | 月成本 | 效果 |
|------|--------|------|
| 人工看盤 | $0（但需要人力） | 只能監控 3-5 支 |
| 看盤軟體 | $30-100 | 被動通知，不智能 |
| **蜂群監控** | **$80** | 20 支並行，智能判斷 |

---

## 🔌 數據源選項

### MVP 階段（模擬數據）

```javascript
// 使用模擬數據進行開發測試
const mockData = {
  TSMC: { price: 850, volume: 10000, change: 2.1 },
  NVDA: { price: 125, volume: 50000, change: 1.8 }
}
```

### 生產階段（真實數據）

| 數據源 | 優點 | 缺點 | 成本 |
|--------|------|------|------|
| Yahoo Finance API | 免費 | 延遲 15 分鐘 | $0 |
| Alpha Vantage | 免費額度 | 頻率限制 | $0-50 |
| Futu OpenAPI | 即時 | 需要帳戶 | $0（有帳戶） |
| IEX Cloud | 穩定 | 付費 | $9-50 |

**建議**：MVP 用模擬數據，Phase 3 接入 Futu OpenAPI（與 SW3 系列對齊）

---

## 📁 目錄結構

```
計劃7_AI蜂群投資Workflow/
├── README.md                           # 專案概覽
├── workflows/
│   ├── swarm-01-monitor.js             # 主 Workflow
│   ├── config.json                     # 股票清單配置
│   └── templates/
│       └── alert-template.md           # 預警模板
├── agents/
│   ├── Scout.js                        # Scout Agent
│   ├── Lead.js                         # Lead Agent
│   └── Notifier.js                     # Notifier Agent
├── docs/
│   ├── SWARM_01_MONITOR_PLAN.md        # 本文件
│   ├── ARCHITECTURE.md                 # 架構設計
│   └── USER_GUIDE.md                   # 使用指南
├── tests/
│   ├── scout.test.js                   # Scout 測試
│   └── integration.test.js             # 整合測試
└── memory/
    └── dev_log.md                      # 開發日誌
```

---

## 🚀 快速開始（Phase 1 完成後）

```bash
# 1. 啟用 Workflow
export CLAUDE_CODE_WORKFLOWS_ENABLED=1
claude

# 2. 執行蜂群監控
ultraWork 啟動多股票監控蜂群，監控 TSMC, NVDA, AAPL

# 3. 查看執行狀態
/workflows
```

---

## 📝 與系列文章的連動

| 文章 | 對應階段 | 內容 |
|------|---------|------|
| AI蜂群投資 #1《蜂群覺醒》 | Phase 1 完成後 | 故事 + MVP 代碼 |
| GitHub Release v0.1 | Phase 2 完成後 | 開源發布 |
| AI蜂群投資 #2《三維獵殺》 | Phase 3 開始時 | 下一篇預熱 |

---

## ⚠️ 風險與緩解

| 風險 | 影響 | 緩解措施 |
|------|------|---------|
| API 頻率限制 | 無法即時監控 | 使用本地緩存，降低調用頻率 |
| Token 成本超支 | 預算超標 | 設置每日上限，優先用 Haiku |
| 網路延遲 | 預警不及時 | 設置超時機制，降級處理 |
| 誤報過多 | 用戶疲勞 | 調整觸發閾值，增加確認步驟 |

---

## ✅ 里程碑總結

| 階段 | 目標 | 預計完成 | 狀態 |
|------|------|---------|------|
| Phase 0 | 環境準備 | +1 天 | 📋 待開始 |
| Phase 1 | 單一 Scout MVP | +3 天 | 📋 待開始 |
| Phase 2 | 並行蜂群 (5) | +5 天 | 📋 待開始 |
| Phase 3 | 完整蜂群 (20) | +5 天 | 📋 待開始 |
| Phase 4 | 生產優化 | +3 天 | 📋 待開始 |
| **總計** | | **17 天** | |

---

**創建者**：AI 指揮官
**記錄者**：克勞德
**最後更新**：2026-05-27

> **「他們有 3,000 台機器。我有 20 個 Agent。夠了。」**
