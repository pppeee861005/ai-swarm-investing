# Dynamic Workflow 常見模式指南
## 3 種自適應執行模式的完整解析

---

## 🎯 概述

Dynamic Workflow（動態工作流）允許根據實時結果自動調整執行策略。本文檔詳細分析 3 種最常見的模式、代碼實現和應用場景。

---

## 模式 1：Loop-Until-Count
### 迴圈直到達成目標數量

**核心邏輯：** 持續執行 Agent，直到產生足夠數量的結果。

```javascript
const bugs = []
while (bugs.length < 10) {  // 動態條件：目標數量
  const result = await agent("找出代碼中的 bug", {
    schema: BUGS_SCHEMA
  })
  bugs.push(...result.bugs)
  log(`${bugs.length}/10 已發現`)
}
return { confirmed: bugs }
```

### 應用場景

| 場景 | 說明 | Token 消耗預測 |
|------|------|----------------|
| 🐞 **Bug 發現** | 持續執行直到找到 10 個 bug | 5 輪 × 50k = 250k |
| 🔍 **代碼審查** | 逐輪進行代碼審查，直到覆蓋完整 | 基於代碼規模動態 |
| ✅ **品質關卡** | 達成品質指標後自動停止 | 根據複雜度調整 |

### 執行流程圖

```
輪次 1 → 發現 2 個 bug → bugs.length = 2 → 2 < 10 ✓ 繼續
輪次 2 → 發現 3 個 bug → bugs.length = 5 → 5 < 10 ✓ 繼續
輪次 3 → 發現 4 個 bug → bugs.length = 9 → 9 < 10 ✓ 繼續
輪次 4 → 發現 1 個 bug → bugs.length = 10 → 10 < 10 ✗ 停止

總耗時：4 輪 | 總 Token：約 200k
```

### 優化建議

1. **設置上限保護：** 防止無限迴圈
```javascript
const bugs = []
const MAX_ROUNDS = 20  // 最多執行 20 輪
let rounds = 0

while (bugs.length < 10 && rounds < MAX_ROUNDS) {
  const result = await agent("找出代碼中的 bug", { schema: BUGS_SCHEMA })
  bugs.push(...result.bugs)
  rounds++
}
return { confirmed: bugs, rounds, exceeded: bugs.length < 10 }
```

2. **動態調整目標數量：** 根據發現速度調整目標
```javascript
let targetCount = 5
const bugs = []

while (bugs.length < targetCount) {
  const result = await agent("找出代碼中的 bug", { schema: BUGS_SCHEMA })
  const newBugs = result.bugs.filter(b => !seen.has(key(b)))

  if (newBugs.length === 0) {
    // 如果一輪無新發現，降低目標
    targetCount = bugs.length
    break
  }

  bugs.push(...newBugs)
}
return { confirmed: bugs }
```

---

## 模式 2：Loop-Until-Budget
### 迴圈直到用完預算

**核心邏輯：** 根據 Token 預算動態調整執行次數和範圍。

```javascript
const findings = []
while (budget.total && budget.remaining() > 50_000) {  // 預算驅動
  const result = await agent("進行安全審計", {
    schema: FINDINGS_SCHEMA
  })
  findings.push(...result.findings)
  log(`${findings.length} 個發現，預算剩餘 ${Math.round(budget.remaining()/1000)}k`)
}
return { findings }
```

### 應用場景

| 場景 | 說明 | 預算配置 |
|------|------|---------|
| 💰 **受限環境** | 用戶設置固定 Token 預算 | +500k Token |
| 🔎 **安全審計** | 自動擴展搜索範圍直到預算用盡 | 根據發現量動態 |
| ⚙️ **系統掃描** | 對多個目標進行並行掃描 | 預分配預算池 |

### 執行流程圖

```
初始預算：500k Token

輪次 1 → 發現 5 項 → 消耗 120k → 剩餘 380k → 380k > 50k ✓ 繼續
輪次 2 → 發現 8 項 → 消耗 150k → 剩餘 230k → 230k > 50k ✓ 繼續
輪次 3 → 發現 3 項 → 消耗 100k → 剩餘 130k → 130k > 50k ✓ 繼續
輪次 4 → 發現 2 項 → 消耗 90k  → 剩餘 40k  → 40k > 50k ✗ 停止

總發現：18 項 | 總消耗：460k Token | 剩餘：40k Token（保留安全邊際）
```

### 實現細節

```javascript
class BudgetAwareWorkflow {
  constructor(initialBudget) {
    this.totalBudget = initialBudget
    this.remaining = initialBudget
    this.minReserve = 50_000  // 安全邊際
  }

  canContinue() {
    return this.remaining > this.minReserve
  }

  async run(agent, prompt) {
    const result = await agent(prompt, {
      budget: this.remaining - this.minReserve  // 傳遞剩餘預算
    })

    this.remaining -= result.tokensUsed
    return result
  }

  getStats() {
    return {
      totalUsed: this.totalBudget - this.remaining,
      remaining: this.remaining,
      utilization: ((this.totalBudget - this.remaining) / this.totalBudget * 100).toFixed(2) + '%'
    }
  }
}

// 使用範例
const workflow = new BudgetAwareWorkflow(500_000)
const findings = []

while (workflow.canContinue()) {
  const result = await workflow.run(auditAgent, "進行安全審計")
  findings.push(...result.findings)
  console.log(`進度：${findings.length} 項發現 | ${workflow.getStats().utilization}`)
}
```

### 優化建議

1. **動態預算分配：** 根據場景調整預留額度
```javascript
const MIN_RESERVE = {
  'quick_scan': 20_000,      // 快速掃描保留 20k
  'full_audit': 50_000,      // 完整審計保留 50k
  'deep_analysis': 100_000   // 深度分析保留 100k
}

const minReserve = MIN_RESERVE[scanType]
while (workflow.remaining > minReserve) { ... }
```

2. **成本意識的 Agent 選擇：** 根據預算選擇不同複雜度的 Agent
```javascript
while (workflow.remaining > minReserve) {
  let agentToUse
  if (workflow.remaining > 300_000) {
    agentToUse = agentComplex     // 複雜 Agent（100k/次）
  } else if (workflow.remaining > 100_000) {
    agentToUse = agentModerate    // 中等 Agent（50k/次）
  } else {
    agentToUse = agentLite        // 輕量 Agent（20k/次）
  }

  const result = await workflow.run(agentToUse, prompt)
  findings.push(...result.findings)
}
```

---

## 模式 3：Loop-Until-Dry
### 迴圈直到沒有新發現

**核心邏輯：** 持續執行直到多輪無新發現，達到完整性保障。

```javascript
const confirmed = []
let dryRounds = 0  // 連續無新發現的輪次

while (dryRounds < 2) {  // 2輪無新發現則停止
  // 並行執行多個 Finder Agent
  const found = (await parallel(FINDERS.map(f => () =>
    agent(f.prompt, { schema: BUGS })
  ))).filter(Boolean).flatMap(r => r.bugs)

  // 去重：只保留新發現
  const fresh = found.filter(b => !seen.has(key(b)))

  if (!fresh.length) {
    dryRounds++  // 無新發現，計數器 +1
    continue
  }

  dryRounds = 0  // 有新發現，重置計數器
  fresh.forEach(b => seen.add(key(b)))
  confirmed.push(...fresh)

  log(`第${dryRounds}輪：新增 ${fresh.length} 項`)
}

return { confirmed }
```

### 應用場景

| 場景 | 說明 | 停止條件 |
|------|------|---------|
| 🔄 **迭代搜索** | 持續搜索直到沒有新發現 | 2-3 輪無新發現 |
| 📊 **完整審計** | 確保覆蓋全面，無遺漏 | N 輪無新結果 |
| ⚡ **自適應停止** | 自動停止，不浪費資源 | 動態設置停止條件 |

### 執行流程圖

```
輪次 1（3個Agent並行）→ 發現 A, B, C, D, E（5項新）→ dryRounds = 0
輪次 2（3個Agent並行）→ 發現 C, D, E, F, G（F, G 是新）→ dryRounds = 0
輪次 3（3個Agent並行）→ 發現 D, E, F（全是舊）→ dryRounds = 1
輪次 4（3個Agent並行）→ 發現 E, F（全是舊）→ dryRounds = 2

dryRounds = 2，停止
確認項目：A, B, C, D, E, F, G（7 項）
```

### 實現細節

```javascript
class CompleteAuditWorkflow {
  constructor(agentList, dryThreshold = 2) {
    this.agents = agentList
    this.dryThreshold = dryThreshold
    this.seen = new Set()
    this.confirmed = []
    this.rounds = 0
    this.dryRounds = 0
  }

  getKey(item) {
    // 根據內容生成唯一 key
    return JSON.stringify(item)
  }

  async runRound() {
    this.rounds++

    // 並行執行所有 Agent
    const results = await Promise.all(
      this.agents.map(agent => agent.run())
    )

    // 扁平化並去重
    const allFound = results.flatMap(r => r.items || [])
    const fresh = allFound.filter(item => {
      const key = this.getKey(item)
      if (this.seen.has(key)) return false
      this.seen.add(key)
      return true
    })

    // 更新乾燥計數
    if (fresh.length === 0) {
      this.dryRounds++
    } else {
      this.dryRounds = 0
      this.confirmed.push(...fresh)
    }

    return {
      round: this.rounds,
      freshFound: fresh.length,
      totalConfirmed: this.confirmed.length,
      dryRounds: this.dryRounds,
      shouldStop: this.dryRounds >= this.dryThreshold
    }
  }

  async execute() {
    while (this.dryRounds < this.dryThreshold) {
      const status = await this.runRound()
      console.log(`輪次 ${status.round}：新增 ${status.freshFound} 項，累計 ${status.totalConfirmed} 項`)

      if (status.shouldStop) break
    }

    return {
      totalRounds: this.rounds,
      confirmedItems: this.confirmed,
      dryRoundsBeforeStop: this.dryRounds
    }
  }
}

// 使用範例
const audit = new CompleteAuditWorkflow([
  { run: () => agent1.audit() },
  { run: () => agent2.audit() },
  { run: () => agent3.audit() }
], 2)

const result = await audit.execute()
console.log(`審計完成：${result.totalRounds} 輪，發現 ${result.confirmedItems.length} 項`)
```

### 優化建議

1. **智能乾燥檢測：** 基於發現速度動態調整閾值
```javascript
class SmartAuditWorkflow extends CompleteAuditWorkflow {
  calculateDryThreshold(discoveryRate) {
    // 發現速度越慢，閾值越低
    if (discoveryRate > 0.8) return 3      // 高效率：需要 3 輪確認
    if (discoveryRate > 0.5) return 2      // 中等效率：2 輪確認
    return 1                               // 低效率：1 輪確認即可
  }

  async runRound() {
    const status = await super.runRound()

    const rate = status.freshFound / this.agents.length
    this.dryThreshold = this.calculateDryThreshold(rate)

    return status
  }
}
```

2. **並行度調整：** 根據發現速度增減 Agent 數量
```javascript
async runRound() {
  // 如果發現速度快，增加 Agent 數量
  if (this.discoveryRate > 0.7 && this.agents.length < MAX_AGENTS) {
    this.agents.push(await launchNewAgent())
  }

  // 如果沒有新發現，減少 Agent 數量節省資源
  if (this.dryRounds > 0 && this.agents.length > MIN_AGENTS) {
    this.agents.pop()
  }

  return super.runRound()
}
```

---

## 📊 模式對比矩陣

| 維度 | Loop-Until-Count | Loop-Until-Budget | Loop-Until-Dry |
|------|------------------|-------------------|----------------|
| **停止條件** | 達成數量目標 | 預算用盡 | N 輪無新發現 |
| **用途** | 發現類任務 | 受預算限制 | 完整性保障 |
| **Token 預測** | 基於輪數 | 完全可控 | 不確定（可能多） |
| **並行度** | 低（逐輪） | 中等（預算內） | 高（多 Agent） |
| **適用場景** | Bug 查找、改進點列舉 | 安全掃描、成本敏感 | 全面審計、品質關卡 |
| **復雜度** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🎯 選擇決策樹

```
需要執行動態工作流
  │
  ├─ 知道目標數量？
  │  ├─ 是 → Loop-Until-Count
  │  │       (e.g., 找 10 個 bug)
  │  └─ 否 ↓
  │
  ├─ 有預算限制？
  │  ├─ 是 → Loop-Until-Budget
  │  │       (e.g., 用戶提供 500k Token)
  │  └─ 否 ↓
  │
  └─ 需要確保完整性？
     ├─ 是 → Loop-Until-Dry
     │       (e.g., 全面審計無遺漏)
     └─ 否 → 用 Static Workflow
             (流程固定)
```

---

## 💡 最佳實踐

### 1. **始終設置上限保護**
```javascript
// ❌ 危險：無限迴圈風險
while (true) { ... }

// ✅ 安全：設置多重保護
while (
  bugs.length < 10 &&
  rounds < MAX_ROUNDS &&
  budget.remaining() > MIN_RESERVE
) { ... }
```

### 2. **實時監控進度**
```javascript
const progress = {
  itemsFound: results.length,
  tokensUsed: 150_000,
  expectedTotal: 250_000,
  percentComplete: 60,
  estimatedRoundsLeft: 2
}

log(`進度：${progress.percentComplete}% | 預計還需 ${progress.estimatedRoundsLeft} 輪`)
```

### 3. **記錄決策日誌**
```javascript
const log = {
  timestamp: new Date(),
  round: 5,
  itemsDiscovered: 3,
  dryRoundsCount: 1,
  budgetRemaining: 120_000,
  decision: '繼續執行（新發現 > 0）'
}

auditLog.push(log)
```

---

**最後更新：** 2026年5月29日
**相關文檔：** [動態工作流執行案例研究](./test_report.md)
