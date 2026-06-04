# 🚀 Phase 1 實施計劃：主項目框架 + 子專案 1-2

**開始日期**：2026-06-02
**目標完成日期**：2026-06-09（7 天）
**目標**：完成主項目文檔框架 + 首 2 個子專案推上 GitHub

---

## 📊 Phase 1 全貌

### **交付清單**

```
✅ ai-swarm-investing (主項目)
   ├─ README.md（故事 + 導航）
   ├─ docs/04-GALLERY.md（7 篇故事索引）
   ├─ docs/08-SUBPROJECTS.md（子專案地圖）
   ├─ docs/00-ARCHITECTURE.md（星型架構詳解）
   ├─ docs/02-GETTING-STARTED.md（快速開始）
   ├─ examples/01-hello-monitor.js（最簡單的例子）
   ├─ .github/workflows/（CI/CD 配置）
   └─ IMPLEMENTATION_PLAN_SCHEME_B.md（本項目規劃）

✅ ai-swarm-monitor (子專案 1)
   ├─ README.md（簡潔、有故事）
   ├─ docs/STORY.md（對應 Substack 文章）
   ├─ docs/ARCHITECTURE.md（技術詳解）
   ├─ src/Agent.Monitor.js（核心代碼）
   ├─ examples/（3 個例子）
   ├─ tests/（基礎測試）
   ├─ package.json (name: "@ai-swarm/monitor")
   └─ GitHub repo 推送完成

✅ ai-swarm-triangulate (子專案 2)
   └─ （同上）
```

---

## 📅 周計劃表（Day by Day）

### **Week 1：Mon-Sun (Day 1-7)**

#### **Day 1-2：主項目文檔框架（Mon-Tue）**

**目標**：完成主項目的核心文檔

**任務清單**：

```
[ ] 1.1 更新 README.md
    - 驗證故事開場是否符合方案 B
    - 確保所有 GitHub 連結格式正確
    - 添加 "方案 B" 的說明（星型架構）

[ ] 1.2 編寫 docs/04-GALLERY.md （或更新）
    - 7 篇故事的統一格式（見下方模板）
    - 每篇 300-500 字
    - 包含：故事片段、核心概念、適合人群、資源連結

[ ] 1.3 編寫 docs/08-SUBPROJECTS.md
    - 快速查找表（7 個子專案）
    - 按難度排序的清單
    - 按功能分類的清單
    - 學習目標分類

[ ] 1.4 編寫 docs/00-ARCHITECTURE.md
    - 星型架構為什麼選這個設計
    - 7 個 workflow 協作圖（ASCII）
    - 技術棧選擇
    - 與方案 A、C 的對比

[ ] 1.5 編寫 docs/02-GETTING-STARTED.md
    - 環境配置（Node.js 版本要求）
    - 三種安裝方式：
      1. 只用某個子專案
      2. 整合多個 workflow
      3. 自己擴展 Agent
    - Hello World 例子（使用 monitor）

[ ] 1.6 創建 docs/assets/ 目錄
    - architecture-diagram.txt (ASCII)
    - star-diagram.txt (ASCII)
    - （後續用 PlantUML 或 Mermaid 生成更好的圖）
```

**產出檔案**：
```
docs/04-GALLERY.md
docs/08-SUBPROJECTS.md
docs/00-ARCHITECTURE.md
docs/02-GETTING-STARTED.md
docs/assets/architecture-diagram.txt
```

**時間估算**：
- 1.1：0.5h
- 1.2：2h
- 1.3：1.5h
- 1.4：2h
- 1.5：1.5h
- 1.6：0.5h
- **小計：8 小時**

---

#### **Day 3：主項目集成示例（Wed）**

**目標**：創建可運行的示例代碼

**任務清單**：

```
[ ] 2.1 編寫 examples/01-hello-monitor.js
    - 最簡單的用法：監控 1 支股票
    - 使用模擬數據
    - 代碼行數 < 50
    - 完整的註釋

[ ] 2.2 編寫 examples/README.md
    - 3 個例子的說明
    - 運行步驟
    - 預期輸出

[ ] 2.3 設置 .github/workflows/
    - test.yml（每次 PR 自動測試）
    - docs-sync.yml（文檔同步，可選）
    - 確保主項目可以通過基礎測試
```

**產出檔案**：
```
examples/01-hello-monitor.js
examples/README.md
.github/workflows/test.yml
.github/workflows/docs-sync.yml
```

**時間估算**：
- 2.1：2h
- 2.2：1h
- 2.3：1.5h
- **小計：4.5 小時**

**累計耗時**：~12.5 小時（主項目框架完成）

---

#### **Day 4-5：子專案 1 GitHub 化（Thu-Fri）**

**目標**：ai-swarm-monitor 完整化並推上 GitHub

**任務清單**：

```
[ ] 3.1 準備源代碼
    - [ ] 從現有代碼提取 Scout Agent 的實現
    - [ ] 從現有代碼提取 Lead Agent 的實現
    - [ ] 從現有代碼提取 Notifier Agent 的實現
    - [ ] 整理代碼結構（按 src/ 目錄標準）

[ ] 3.2 建立目錄結構
    ```
    ai-swarm-monitor/
    ├── src/
    │   ├── Agent.Monitor.js
    │   ├── types.ts
    │   └── utils/
    ├── docs/
    │   ├── STORY.md
    │   ├── ARCHITECTURE.md
    │   ├── API.md
    │   └── EXAMPLES.md
    ├── examples/
    │   ├── 01-basic.js
    │   ├── 02-advanced.js
    │   └── 03-integrated.js
    ├── tests/
    │   ├── Agent.Monitor.test.js
    │   └── integration.test.js
    ├── config/
    │   └── default.json
    ├── package.json
    ├── README.md
    ├── CHANGELOG.md
    ├── LICENSE
    └── .github/
        └── workflows/
            └── test.yml
    ```

[ ] 3.3 編寫 README.md
    - 故事開場（50-100 字引誘）
    - 核心功能列表
    - 快速開始（3 行代碼）
    - 安裝和配置
    - 貢獻鏈接（指向主項目）

[ ] 3.4 編寫 docs/STORY.md ⭐ （最重要）
    - 完整的故事線（對應 Substack 文章）
    - 技術原理解釋
    - Scout / Lead / Notifier 三層架構解釋
    - 實戰場景
    - 與其他 workflow 的交互（預告 triangulate）

[ ] 3.5 編寫 docs/ARCHITECTURE.md
    - 三層架構詳解
    - Scout Agent 的監控指標
    - Lead Agent 的評估邏輯
    - Notifier Agent 的通知機制
    - 觸發條件和門檻值

[ ] 3.6 編寫 docs/API.md
    - class AgentMonitor 定義
    - methods: watchStocks() / onAnomalyDetected() / stop()
    - event: 'alert' / 'update' / 'error'
    - types: MonitorConfig / StockAlert / AnomalyReport

[ ] 3.7 編寫 docs/EXAMPLES.md
    - 基礎例子：監控 1 支股票
    - 進階例子：監控 5 支股票 + 自定義規則
    - 整合例子：與 triangulate 協作

[ ] 3.8 編寫 src/Agent.Monitor.js
    - 完整的代碼實現
    - 詳細的中文註釋
    - 符合 Agent 基類接口

[ ] 3.9 編寫 tests/
    - Agent.Monitor.test.js（單元測試）
    - 測試監控邏輯
    - 測試異動偵測
    - 測試通知機制

[ ] 3.10 編寫 package.json
    ```json
    {
      "name": "@ai-swarm/monitor",
      "version": "0.1.0",
      "description": "Real-time multi-stock monitoring with anomaly detection",
      "main": "src/Agent.Monitor.js",
      "dependencies": {
        "@anthropic-ai/sdk": "^latest"
      },
      "scripts": {
        "test": "jest",
        "build": "tsc",
        "dev": "node examples/01-basic.js"
      }
    }
    ```

[ ] 3.11 編寫 CHANGELOG.md
    - v0.1.0 (2026-06-05)
      - Initial release
      - 20 Scout Agents for parallel monitoring
      - Lead Agent for decision making
      - Telegram/Email notifications

[ ] 3.12 推送到 GitHub
    - [ ] 在 GitHub 創建 ai-swarm-monitor repo
    - [ ] git init && git add && git commit
    - [ ] git push origin main
    - [ ] 設置 repo description 和 topics
    - [ ] 啟用 Discussions 和 Issues
```

**產出檔案**：
- src/Agent.Monitor.js（~300 行代碼）
- docs/STORY.md（~1000 字）
- docs/ARCHITECTURE.md（~800 字）
- docs/API.md（~500 字）
- docs/EXAMPLES.md（~300 字）
- examples/（3 個完整例子）
- tests/（完整的測試套件）
- package.json
- CHANGELOG.md
- README.md

**時間估算**：
- 3.1-3.2：2h
- 3.3：1h
- 3.4：3h ⭐（最耗時，需要精心編寫故事）
- 3.5：2h
- 3.6：1.5h
- 3.7：1.5h
- 3.8-3.9：3h
- 3.10-3.12：1.5h
- **小計：16 小時**

---

#### **Day 6-7：子專案 2 GitHub 化（Sat-Sun）**

**目標**：ai-swarm-triangulate 完整化並推上 GitHub

**任務清單**：同 Day 4-5，但針對 triangulate

**時間估算**：16 小時

---

## 📋 每日進度檢查清單

### **Day 1-2 檢查點**

```
[ ] README.md 已更新
[ ] docs/04-GALLERY.md 可點擊
[ ] docs/08-SUBPROJECTS.md 內容完整
[ ] docs/00-ARCHITECTURE.md 架構圖清晰
[ ] docs/02-GETTING-STARTED.md 步驟明確
[ ] docs/assets/ 已創建
```

**驗收標準**：主項目本地可 clone，所有 md 檔案可讀，所有連結格式正確

---

### **Day 3 檢查點**

```
[ ] examples/01-hello-monitor.js 可運行
[ ] examples/README.md 說明清晰
[ ] .github/workflows/test.yml 配置正確
[ ] 主項目本地 npm test 可通過（如有測試）
```

**驗收標準**：示例代碼可直接複制運行，無錯誤

---

### **Day 4-5 檢查點**

```
[ ] ai-swarm-monitor 目錄結構完整
[ ] README.md 簡潔有力
[ ] docs/STORY.md 故事完整且吸引人
[ ] docs/ARCHITECTURE.md 技術細節清楚
[ ] src/Agent.Monitor.js 代碼完整且有註釋
[ ] examples/ 有 3 個完整例子
[ ] tests/ 通過（npm test）
[ ] package.json 名稱正確（@ai-swarm/monitor）
[ ] GitHub repo 已創建並推送
[ ] repo 設置了 description 和 topics
```

**驗收標準**：
- 可 npm install @ai-swarm/monitor（後續）
- 代碼通過 linter（如有）
- 所有文檔交叉引用正確
- GitHub repo stars 初始設置完成

---

### **Day 6-7 檢查點**

同 Day 4-5，但針對 ai-swarm-triangulate

---

## 🎯 Phase 1 完成標準

### **主項目**

```
✅ README.md
✅ docs/04-GALLERY.md
✅ docs/08-SUBPROJECTS.md
✅ docs/00-ARCHITECTURE.md
✅ docs/02-GETTING-STARTED.md
✅ examples/01-hello-monitor.js
✅ .github/workflows/
✅ IMPLEMENTATION_PLAN_SCHEME_B.md（本計劃）
```

### **ai-swarm-monitor**

```
✅ 完整的源代碼（src/）
✅ 5 份文檔（README + STORY + ARCHITECTURE + API + EXAMPLES）
✅ 3 個完整例子（examples/）
✅ 基礎測試套件（tests/）
✅ 正確的 package.json (@ai-swarm/monitor)
✅ CHANGELOG.md + LICENSE + .gitignore
✅ GitHub repo 已創建和推送
✅ repo 已設置 description 和 topics
```

### **ai-swarm-triangulate**

```
同上
```

---

## 💡 Phase 1 的關鍵要點

### **1. STORY.md 是靈魂**

`docs/STORY.md` 是每個子專案最重要的文件，因為它：
- 對應一篇 Substack 文章
- 讓開發者邊讀故事邊理解代碼
- 建立與其他子專案的邏輯連接

**投入時間**：Phase 1 的 3 個小時應該全部用在寫好 STORY.md

### **2. 代碼註釋很重要**

華文開發者占主要受眾，所以：
- 所有核心邏輯要有中文註釋
- 類和方法要有 JSDoc 說明
- 配置文件要有說明

### **3. 示例代碼是入門的鑰匙**

每個子專案的 3 個例子應該是：
1. **基礎**：最簡單的用法（< 30 行）
2. **進階**：添加自定義配置
3. **整合**：與其他子專案協作

### **4. GitHub repo 的設置細節**

推送後立即做：
- ✅ 設置 repo description（50 字以內）
- ✅ 添加 topics（ai-agent, workflow 等）
- ✅ 啟用 Discussions
- ✅ 啟用 Issues
- ✅ 設置 README as homepage

---

## ⚠️ 風險和應對

| 風險 | 影響 | 應對 |
|------|------|------|
| **STORY.md 寫不好** | 影響用戶理解 | 先寫大綱，分段完成 |
| **代碼還未完全實現** | 無法驗證 | 用模擬數據 + 虛擬實現 |
| **測試難以覆蓋** | 無法驗證質量 | 寫 integration test |
| **文檔連結失效** | 影響用戶體驗 | 每天檢查連結 |
| **GitHub workflow 配置錯誤** | 無法自動發布 | 本地測試後再推送 |

---

## 📈 Phase 1 完成後的里程碑

### **立即發生的事**

1. **GitHub Organization 成形**
   ```
   pppeee861005/
   ├── ai-swarm-investing (主)
   ├── ai-swarm-monitor (子1)
   └── ai-swarm-triangulate (子2)
   ```

2. **NPM 包發布**（如果配置好 workflows）
   ```bash
   npm install @ai-swarm/monitor
   npm install @ai-swarm/triangulate
   ```

3. **Substack 準備**
   - E01 《蜂群覺醒》對應代碼已上線
   - E02 《三維獵殺》對應代碼已上線
   - 可以開始編寫 Substack 文章

### **Phase 2 準備**

- ✅ 所有開發人員知道如何提交 PR
- ✅ 有完整的文檔規範
- ✅ 有清晰的架構模板

---

## 🚀 Day 1 的立即行動

**現在該做的**（今天）：

1. ✅ 確認本計劃的可行性
2. ✅ 準備好編輯工具（VS Code + Git）
3. ✅ 創建 GitHub 組織（如還未創建）
4. ✅ 開始編寫 docs/04-GALLERY.md

**明天該做的**：

1. ✅ 完成所有主項目文檔
2. ✅ 提交至本地 Git

**后天開始**：

1. ✅ Day 4 準備子專案 1 的源代碼

---

## 📞 支援和反饋

如果在實施過程中遇到問題：

- 📖 查看 IMPLEMENTATION_PLAN_SCHEME_B.md（總體規劃）
- 🎯 參考 GITHUB_ARCHITECTURE_PLAN.md（架構設計）
- 💬 在 GitHub Discussions 發起討論

---

**Phase 1 準備好開始了嗎？**

答案是 YES → 開始 Day 1

