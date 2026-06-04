# docs/ 結構精簡方案

**決策時間**：2026-05-29
**目標**：從 9 個文件 → 5 個核心文件
**原則**：輕量化 + 故事驅動 + 易於維護

---

## 🔄 對比：舊規劃 vs 新規劃

### 舊規劃（複雜版）

```
docs/
├── 00-ARCHITECTURE.md      ❌ 刪除
├── 01-STORY-COMPLETE.md    ❌ 合併到 04-GALLERY.md
├── 02-GETTING-STARTED.md   ❌ 簡化為 QUICK-START.md
├── 03-ROADMAP.md           ❌ 刪除
├── 04-GALLERY.md           ✅ 保留
├── 05-API-REFERENCE.md     ❌ 移到各子專案
├── 06-INTEGRATION-GUIDE.md ❌ 刪除（各子專案自己寫）
├── 07-CONTRIBUTING.md      ✅ 簡化後保留
├── 08-SUBPROJECTS.md       ✅ 保留（已建立）
├── 09-LEARNING-PATHS.md    ❌ 刪除
└── assets/                 ✅ 保留
```

### 新規劃（精簡版）

```
ai-swarm-investing/
├── README.md                           (主故事 + 快速導航)
├── SUBPROJECTS.md                      (子專案速查)
├── GITHUB_ARCHITECTURE_PLAN.md         (規劃參考)
│
└── docs/
    ├── 04-GALLERY.md                   ✅ 7篇故事聚合
    ├── 08-SUBPROJECTS.md               ✅ 子專案詳細對比
    ├── QUICK-START.md                  ✅ 5分鐘快速開始
    ├── CONTRIBUTING.md                 ✅ 簡化貢獻指南
    └── assets/                         ✅ 圖表 + 架構圖

.github/
├── CONTRIBUTING.md
├── ISSUE_TEMPLATE/
└── workflows/
```

---

## 📊 刪除 5-6 個文件的理由

### ❌ 刪除：00-ARCHITECTURE.md
**原因**：
- 過於詳細的架構説明不適合主 repo
- 詳細架構應在 [GITHUB_ARCHITECTURE_PLAN.md](../GITHUB_ARCHITECTURE_PLAN.md) 中
- 主 repo 重點是「故事」而非「技術細節」

**替代方案**：
→ 需要詳細架構的開發者，讀 GITHUB_ARCHITECTURE_PLAN.md
→ 各子專案自己寫 ARCHITECTURE.md

---

### ❌ 刪除：01-STORY-COMPLETE.md
**原因**：
- 與 04-GALLERY.md 重複（都是故事索引）
- 04-GALLERY.md 已經包含完整故事 + 快速鏈接

**替代方案**：
→ 04-GALLERY.md 就是完整故事索引
→ 不需要單獨的 STORY-COMPLETE 文件

---

### ❌ 簡化：02-GETTING-STARTED.md → QUICK-START.md
**原因**：
- 原文檔太詳細（2000+ 字）
- 新手只需 5 分鐘快速開始，不需要深入配置

**新文件內容**（只要 500 字）：
```
# 5 分鐘快速開始

## 1. 安裝（1 分鐘）
npm install @ai-swarm/monitor

## 2. 運行（1 分鐘）
node examples/basic-monitor.js

## 3. 修改（3 分鐘）
編輯 config.stocks 改監控的股票

完整文檔 → [各子專案的 README.md]
```

---

### ❌ 刪除：03-ROADMAP.md
**原因**：
- Roadmap 容易過時
- 應在 [SUBPROJECTS.md](./08-SUBPROJECTS.md) 中用狀態表格體現
- 或在 GitHub Issues/Projects 中管理

**替代方案**：
→ 各子專案在自己的 README 說明進度
→ 主 repo 的 SUBPROJECTS.md 用狀態表格（🟢 完成 | 🟡 開發中 | 🔴 計劃）

---

### ❌ 刪除：05-API-REFERENCE.md
**原因**：
- API 應該在各子專案中詳細説明
- 主 repo 不需要全局 API 參考
- 避免代碼和文檔不同步

**替代方案**：
→ 各子專案：`docs/API.md`
→ 主 repo：不需要全局 API 文檔

---

### ❌ 刪除：06-INTEGRATION-GUIDE.md
**原因**：
- 整合指南過於複雜（屬於高級用法）
- 新手不需要，高級用戶各子專案都有說明

**替代方案**：
→ 各子專案自己寫 Integration 部分
→ 主 repo 的 README + examples/ 已經展示基本整合

---

### ❌ 刪除：09-LEARNING-PATHS.md
**原因**：
- 學習路徑是推廣工具，不是技術文檔
- 更適合放在 Substack 文章中
- 各子專案各有難度，不需要全局路徑

**替代方案**：
→ Substack 文章中包含「推薦學習順序」
→ SUBPROJECTS.md 中用難度星級（⭐⭐⭐）指示

---

## ✅ 最終保留的 5 個文件

### 1. `docs/04-GALLERY.md`（核心）

**用途**：7 篇故事聚合
**內容**：
- 每篇故事開場（50-100 字）
- GitHub 連結
- Substack 文章連結
- 核心功能列表
- 簡單架構圖
- 3 個實戰例子
- 難度 & 狀態標記

**大小**：3,000-4,000 字

---

### 2. `docs/08-SUBPROJECTS.md`（核心）

**用途**：子專案導航 + 對比
**內容**：
- 7 個子專案速查表（按狀態）
- 按難度排序
- 按功能分類
- 按學習目標分類
- 貢獻機會表
- Monorepo 開發指南
- 相關文檔鏈接

**大小**：2,000-3,000 字

---

### 3. `docs/QUICK-START.md`（新建）

**用途**：5 分鐘快速上手
**內容**：
```
# 5 分鐘快速開始

## 方式 1：只想讀故事
→ [完整故事](./04-GALLERY.md)

## 方式 2：想用代碼（最簡單）
npm install @ai-swarm/monitor
node examples/basic-monitor.js

## 方式 3：修改配置
編輯 config.stocks = ['你的股票']

## 下一步
→ [選擇你的學習路徑](./08-SUBPROJECTS.md)

## 遇到問題？
→ [貢獻指南](./CONTRIBUTING.md)
```

**大小**：500 字

---

### 4. `docs/CONTRIBUTING.md`（簡化版）

**用途**：簡化的貢獻指南
**內容**：
- 如何報告 Bug
- 如何提交 PR（3 步）
- 代碼風格（簡要）
- 測試要求
- 哪些專案開放貢獻
- 聯繫方式

**大小**：800-1,000 字

---

### 5. `docs/assets/`（保留）

**內容**：
- architecture.svg（星型架構圖）
- story-flowchart.png（故事流程）
- workflow-diagram.svg（工作流程圖）

**說明**：所有圖表都要有，視覺化很重要

---

## 📁 新的 docs 目錄結構

```
docs/
├── 04-GALLERY.md                    (3-4K 字)
├── 08-SUBPROJECTS.md                (2-3K 字)
├── QUICK-START.md                   (0.5K 字)
├── CONTRIBUTING.md                  (0.8-1K 字)
└── assets/
    ├── architecture.svg
    ├── story-flowchart.png
    └── workflow-diagram.svg

總計：6-10K 字 + 3 張圖
```

---

## 🎯 主 repo 根目錄文件

```
ai-swarm-investing/
├── README.md                         (故事開場 + 導航)
├── SUBPROJECTS.md                    (子專案速查)
├── GITHUB_ARCHITECTURE_PLAN.md       (規劃參考，可選閱讀)
├── .github/
│   ├── CONTRIBUTING.md               (正式貢獻指南)
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── workflows/
│       └── ci.yml
├── examples/
│   ├── 01-hello-monitor.js
│   ├── 02-integrated.js
│   └── 03-full-stack.js
├── docs/
│   ├── 04-GALLERY.md                 (7篇故事)
│   ├── 08-SUBPROJECTS.md             (導航)
│   ├── QUICK-START.md                (快速開始)
│   ├── CONTRIBUTING.md               (簡化版)
│   └── assets/
└── package.json
```

---

## 📊 精簡後的優勢

| 指標 | 舊規劃 | 新規劃 | 改進 |
|------|--------|--------|------|
| docs 文件數 | 9 個 | 4 個 | -55% |
| 總字數 | 15,000+ | 6-10K | -50% |
| 維護複雜度 | 高 | 低 | ⬇️ 大幅降低 |
| 新手理解成本 | 高（內容多） | 低（精而簡） | ✅ |
| GitHub 視覺整潔度 | 中 | 高 | ✅ |

---

## 🚀 遷移計劃

### Step 1：創建新文件（2 小時）

```
[ ] 1. 創建 docs/QUICK-START.md
[ ] 2. 簡化 docs/CONTRIBUTING.md
[ ] 3. 確認 docs/04-GALLERY.md 完整
[ ] 4. 確認 docs/08-SUBPROJECTS.md 完整
[ ] 5. 刪除舊的 9 個計劃中的 5-6 個文件
```

### Step 2：更新索引（30 分鐘）

```
[ ] 1. 更新 README.md 的 docs 鏈接
[ ] 2. 更新 SUBPROJECTS.md 的鏈接
[ ] 3. 確保所有內部鏈接有效
```

### Step 3：驗證（1 小時）

```
[ ] 1. 新手測試：通過 README → QUICK-START → 跑代碼
[ ] 2. 開發者測試：通過 README → GALLERY → SUBPROJECTS
[ ] 3. 貢獻者測試：通過 README → CONTRIBUTING
```

---

## 💡 核心思路

**舊方法**：把所有可能用到的文檔都寫好（結果：新手淹沒在文檔中）

**新方法**：只寫真正需要的 5 個文件（結果：清晰、輕量、易上手）

```
讀者旅程：
README → 選擇方向
  ↓
看故事？  → QUICK-START + GALLERY
看代碼？  → QUICK-START + examples
學習？   → SUBPROJECTS（難度排序）
貢獻？   → CONTRIBUTING
```

---

## ✅ 最終確認

```
刪除的 5-6 個文件：
❌ 00-ARCHITECTURE.md
❌ 01-STORY-COMPLETE.md
❌ 03-ROADMAP.md
❌ 05-API-REFERENCE.md
❌ 06-INTEGRATION-GUIDE.md
❌ 09-LEARNING-PATHS.md

保留的 4 個核心文件：
✅ 04-GALLERY.md         (7篇故事)
✅ 08-SUBPROJECTS.md     (子專案導航)
✅ QUICK-START.md        (快速開始)
✅ CONTRIBUTING.md       (貢獻指南)

配合：
✅ README.md             (故事 + 快速導航)
✅ SUBPROJECTS.md        (子專案速查)
✅ examples/             (3個實戰例子)
```

**結果**：輕量、清晰、全球友好！🎯

---

**決策日期**：2026-05-29
**執行難度**：⭐⭐ (很簡單，只是刪除+整理)
**預計耗時**：3 小時
