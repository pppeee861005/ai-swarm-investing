# Workflow.js 實現深度指南
## 從工作流腳本到可復用模板

---

## 📁 工作流腳本的存儲位置

你的黃金報告工作流已經保存在：

```
/home/claude2/.claude/projects/-home-claude2/37d9c11e-84c7-4c90-9585-f161a1aa0742/workflows/scripts/gold-price-middle-east-analysis-wf_6563c9f3-d57.js
```

這個 `.js` 文件包含了完整的工作流定義、元數據和執行邏輯。

---

## 🔄 3 種復用方式

### 方式 1：直接複製並重新執行（完全復用）

**概念：** 無需任何修改，直接重新執行相同的工作流

```javascript
// 再次執行同樣的工作流（不修改任何內容）
Workflow({
  scriptPath: "/home/claude2/.claude/projects/-home-claude2/37d9c11e-84c7-4c90-9585-f161a1aa0742/workflows/scripts/gold-price-middle-east-analysis-wf_6563c9f3-d57.js"
})
```

**優點：**
- ✅ 快速重複執行相同分析
- ✅ 獲取最新的黃金價格和中東新聞
- ✅ 零代碼改動

**適用場景：**
- 📊 每週自動生成黃金報告
- 📈 監控價格變化趨勢
- 🌍 追蹤中東局勢更新

**執行頻率建議：**
```
📅 每週一 09:00 → 生成周度報告
📅 市場重大事件發生時 → 即時觸發更新
📅 月末月初 → 生成月度匯總
```

---

### 方式 2：修改參數後復用（適應不同場景）

**概念：** 基於原有腳本邏輯，通過改變參數進行新的分析

#### 修改類型 1：分析不同的商品

```javascript
// 原版：黃金分析
agent('查詢過去一週黃金現貨價格...')

// 修改為：白銀分析
agent('查詢過去一週白銀現貨價格...')

// 修改為：原油分析
agent('查詢過去一週原油現貨價格...')

// 修改為：銅價分析
agent('查詢過去一週銅現貨價格...')
```

**商品覆蓋矩陣：**

| 商品 | 特點 | 適用投資者 |
|------|------|----------|
| **黃金** | 避險資產，與利率反向 | 保守型、避險型 |
| **白銀** | 工業金屬，波動性更大 | 進取型 |
| **原油** | 能源商品，地緣敏感 | 宏觀型 |
| **銅** | 經濟晴雨表，循環性強 | 成長型 |
| **稀土** | 戰略資源，政策敏感 | 前瞻型 |

#### 修改類型 2：分析不同的地區衝突

```javascript
// 原版：中東戰爭
agent('查詢最近一週中東局勢發展...')

// 修改為：烏克蘭衝突
agent('查詢最近一週烏克蘭戰爭發展...')

// 修改為：台灣局勢
agent('查詢最近一週台灣地區局勢...')

// 修改為：南海局勢
agent('查詢最近一週南海地區局勢...')
```

**地區衝突與商品關聯：**

| 地區 | 主要商品影響 | 敏感指標 |
|------|-------------|--------|
| **中東** | 原油、黃金 | 荷莫茲海峽 |
| **烏克蘭** | 原油、天然氣、小麥 | 黑海通道 |
| **台灣** | 晶片、稀土 | 台灣海峽 |
| **南海** | 原油、稀土 | 航道自由度 |

#### 修改類型 3：調整報告長度

```javascript
// 原版：500字
agent(`...生成一份約500字的週黃金價格變化報告...`)

// 修改為：1000字深度分析
agent(`...生成一份約1000字的深度黃金市場分析報告...`)

// 修改為：200字快速摘要
agent(`...生成一份約200字的黃金價格摘要...`)

// 修改為：2000字投資組合指導
agent(`...生成一份約2000字的投資決策指南...`)
```

**報告長度選擇：**

| 長度 | 用途 | 時間成本 | Token 消耗 |
|------|------|---------|-----------|
| **200 字** | 快速摘要 | 1 分鐘 | 30k |
| **500 字** | 週度報告（推薦） | 2-3 分鐘 | 60k |
| **1000 字** | 深度分析 | 4-5 分鐘 | 120k |
| **2000 字** | 投資決策指南 | 7-8 分鐘 | 200k |

**實際修改步驟：**

1. 複製原始 `.js` 文件
2. 修改 3 處關鍵位置的提示詞
3. 保存為新文件名（如 `silver-ukraine-analysis.js`）
4. 執行新工作流

---

### 方式 3：保存為可配置的模板（高級復用）

**概念：** 創建一個通用的「商品 + 事件」分析工作流模板，支持動態參數

#### 模板結構

```javascript
export const meta = {
  name: 'commodity-event-analysis',
  description: '通用的商品價格與地緣事件關聯分析',
  phases: [
    { title: '蒐集數據', detail: '查詢商品價格和事件發展' },
    { title: '分析整合', detail: '分析兩者關聯並生成報告' }
  ]
}

phase('蒐集數據')

// 使用 args 參數接收動態輸入
const commodity = args.commodity || 'gold'        // 黃金、白銀、原油
const event = args.event || 'middle-east'        // 中東、烏克蘭、台灣
const length = args.length || '500'              // 報告長度

const [commodityData, eventData] = await Promise.all([
  agent(`查詢過去一週${commodity}現貨價格...`),
  agent(`查詢最近一週${event}局勢發展...`)
])

phase('分析整合')

const report = await agent(`
基於以下信息，生成一份約${length}字的週${commodity}價格變化報告...
`)

return { commodityData, eventData, report }
```

#### 使用方式

```javascript
// 黃金 + 中東（預設值）
Workflow({
  scriptPath: "...commodity-event-analysis.js"
})

// 白銀 + 烏克蘭戰爭
Workflow({
  scriptPath: "...commodity-event-analysis.js",
  args: {
    commodity: "白銀",
    event: "烏克蘭戰爭",
    length: "800"
  }
})

// 原油 + 台灣局勢（深度分析）
Workflow({
  scriptPath: "...commodity-event-analysis.js",
  args: {
    commodity: "原油",
    event: "台灣地區",
    length: "1500"
  }
})

// 銅 + 南海（快速摘要）
Workflow({
  scriptPath: "...commodity-event-analysis.js",
  args: {
    commodity: "銅",
    event: "南海局勢",
    length: "300"
  }
})
```

#### 模板的優勢

| 優勢 | 說明 |
|------|------|
| 🔄 **高度復用** | 一個模板支持 50+ 種組合 |
| ⚙️ **易於擴展** | 新增商品或事件無需修改代碼 |
| 📊 **數據一致性** | 使用相同邏輯結構，結果可比較 |
| 🔧 **易於維護** | 修改一次模板，所有衍生都受益 |
| 📈 **版本控制** | 清晰的參數版本，便於追蹤 |

---

## 🎨 Template 設計最佳實踐

### DO（應該做）

```javascript
// ✅ 參數化重要信息
const commodity = args.commodity || 'gold'
const event = args.event || 'middle-east'
const length = args.length || '500'

// ✅ 清晰的變數名稱
const [commodityData, geopoliticalData] = await Promise.all([
  agent(`查詢${commodity}...`),
  agent(`查詢${event}...`)
])

// ✅ 有組織的代碼結構
phase('蒐集數據')      // Phase 1：數據獲取
// ... 數據蒐集邏輯 ...

phase('分析整合')      // Phase 2：聚合分析
// ... 分析和報告生成邏輯 ...

// ✅ 有意義的日誌輸出
log(`✅ 成功獲取 ${commodity} 價格數據 | 周度漲幅：+2.3%`)
log(`✅ ${event} 最新進展已整合 | 信息源數：5`)

// ✅ 錯誤處理
try {
  const result = await agent(...)
} catch (error) {
  log(`⚠️ 發生錯誤：${error.message}`)
  return { success: false, error }
}

// ✅ 結構化返回值
return {
  commodity: commodity,
  event: event,
  commodityData: commodityData,
  geopoliticalData: geopoliticalData,
  report: report,
  generatedAt: new Date().toISOString()
}
```

### DON'T（不應該做）

```javascript
// ❌ 硬編碼數值（難以復用）
const commodity = 'gold'
const event = 'middle-east'
// 修改時要改代碼

// ❌ 不清楚的變數名（難以維護）
const [a, b] = await Promise.all([...])
const c = await agent(...)

// ❌ 沒有結構劃分（難以理解）
// 全部代碼混在一起，無 phase 標記

// ❌ 無意義的日誌（難以調試）
log('done')           // 不知道做了什麼
log('success')        // 缺乏上下文

// ❌ 忽略錯誤（難以可靠運行）
const result = await agent(...)  // 如果失敗會中斷整個工作流

// ❌ 返回值不清楚
return report        // 調用者不知道除了報告還有什麼
```

---

## 📊 復用的 3 大優勢

| 優勢 | 說明 | 收益 |
|------|------|------|
| **⏱️ 時間節省** | 不用重複寫代碼，直接修改參數 | 從 30min → 3min |
| **✅ 一致性** | 使用同樣的邏輯結構，結果更可比較 | 提升分析信度 |
| **🔧 可維護性** | 修改一次模板，所有衍生都受益 | 降低維護成本 |

---

## 🚀 進階：與蜂群協作集成

### ccwf × Workflow 的協同優勢

此工作流系統可與 **Claude Code Workflow Framework (ccwf)** 深度整合，形成主動式蜂群協作：

#### 場景 1：定時自動生成報告
```javascript
// 每週一 09:00 自動執行
Schedule({
  scriptPath: "...commodity-event-analysis.js",
  trigger: "cron('0 9 * * 1')",
  args: {
    commodity: "黃金",
    event: "中東",
    length: "500"
  }
})
```

#### 場景 2：事件驅動的工作流
```javascript
// 當中東發生重大事件時自動觸發
Trigger({
  source: "news-feed",
  keywords: ["中東", "衝突", "戰爭"],
  action: () => Workflow({
    scriptPath: "...commodity-event-analysis.js",
    args: { event: "中東地區" }
  })
})
```

#### 場景 3：多工作流並行聚合
```javascript
// 並行執行多個商品分析，最後統一匯總
const results = await Promise.all([
  Workflow({ args: { commodity: "黃金" } }),
  Workflow({ args: { commodity: "白銀" } }),
  Workflow({ args: { commodity: "原油" } })
])

// 生成投資組合建議
const portfolio = await agent(`
根據以下三份報告，生成一份投資組合建議：
${results.map(r => r.report).join('\n')}
`)
```

#### 場景 4：多層級聚合（蜂群層級）
```
Tier 1 (Scouts)      → 蒐集單個商品的數據報告
          ↓
Tier 2 (Coordinators) → 進行跨商品比較分析
          ↓
Tier 3 (Strategists)  → 生成整體投資策略建議
```

**這就是 ccwf 成為「主動式蜂群協作」的關鍵！**

---

## 📋 Workflow.js 檢查清單

創建新工作流時確保包含：

- [ ] 清晰的 `meta` 定義（名稱、描述、階段）
- [ ] 參數化的核心邏輯（使用 `args`）
- [ ] 合理的 `phase` 劃分（蒐集、分析、整合）
- [ ] 完整的日誌輸出（進度、錯誤、完成）
- [ ] 結構化的返回值（易於被下游工作流使用）
- [ ] 錯誤處理機制（Try-catch、降級策略）
- [ ] 性能優化（Promise.all 並行、快取機制）
- [ ] 文檔註釋（參數說明、使用示例）

---

**最後更新：** 2026年5月29日
**相關文檔：** [動態工作流執行案例研究](./test_report.md)、[test_529.md 原始執行記錄](./test_529.md)
