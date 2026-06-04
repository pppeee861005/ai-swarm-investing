# 🚀 5 分鐘快速開始

> **選擇你的入場方式**

---

## 🔰 方式 1：只想讀故事（5 分鐘）

**最輕鬆的方式** — 不需要代碼知識

### 步驟
1. 讀這個頁面的 README（3 分鐘）
2. 打開 [完整故事索引](./04-GALLERY.md)（2 分鐘）
3. 按興趣挑一篇

### 推薦順序
1️⃣ **第一篇**：[蜂群覺醒](./04-GALLERY.md#第一篇蜂群覺醒)
   → 最簡單，最容易理解

2️⃣ **第二篇**：[三維獵殺](./04-GALLERY.md#第二篇三維獵殺)
   → 深入一點的邏輯

3️⃣ **第七篇**：[終極顧問](./04-GALLERY.md#第七篇終極顧問)
   → 看未來的可能性

---

## 💻 方式 2：想跑代碼（10 分鐘）

**適合開發者** — 最快看到「效果」

### 前置要求
- Node.js 14+
- 5 分鐘時間
- 一點點 JavaScript 知識（可選）

### 三步驟

#### Step 1：安裝（1 分鐘）
```bash
# 方式 A：用 npm（推薦）
npm install @ai-swarm/monitor

# 方式 B：直接複製代碼
# 複製 examples/basic-monitor.js 到你的項目
```

#### Step 2：運行（1 分鐘）
```bash
# 方式 A：用 npm
node node_modules/@ai-swarm/monitor/examples/basic-monitor.js

# 方式 B：直接運行
node basic-monitor.js
```

#### Step 3：看結果（3 分鐘）
```
你會看到：
  [Scout-TSMC] ALERT - 觸發: 1
  [Scout-NVDA] NORMAL - 觸發: 0

  ========== 蜂群預警 ==========
  🐝 蜂群預警
  等級：INFO
  時間：2026-05-29T14:30:00Z

  【TSMC】
    - 成交量異常：45230
  ================================
```

### 下一步：修改配置
編輯 `config.stocks`，改成你想監控的股票：

```javascript
const config = {
  stocks: ['AAPL', 'GOOGL', 'MSFT'],  // ← 改這裡
  triggers: {
    volumeSpike: 3.0,
    priceChange: 0.02
  }
};
```

重新運行：
```bash
node basic-monitor.js
```

---

## 🎓 方式 3：想學習整個系統（1 小時）

**適合想深入的開發者**

### 推薦學習路徑

#### 第 1 步：讀故事 + 看代碼（20 分鐘）
1. 讀 [第一篇故事：蜂群覺醒](./04-GALLERY.md#第一篇蜂群覺醒)
2. 看 `examples/basic-monitor.js` 的代碼
3. 對應故事和代碼的三個 Agent：Scout、Lead、Notifier

#### 第 2 步：看架構 + 類設計（20 分鐘）
1. 打開 `examples/basic-monitor.js`
2. 理解 3 個 Agent 類：
   - `ScoutAgent` — 監控員
   - `LeadAgent` — 指揮官
   - `NotifierAgent` — 通知官
3. 試著修改 `checkTriggers()` 方法，增加新的異動規則

#### 第 3 步：看整合例子（20 分鐘）
1. 跑 `examples/02-integrated.js`（monitor + triangulate）
2. 理解多個 workflow 如何協作
3. 思考：「我如何加入第三個 workflow？」

#### 第 4 步：開始貢獻（可選）
1. 選一個[子專案](./08-SUBPROJECTS.md)
2. 讀它的 STORY.md
3. 提交一個 PR 改進代碼

---

## 🤔 常見問題

### Q1：我不會 JavaScript，能用嗎？
**A**：可以！代碼很簡單，主要就是 class + async/await。
- [讀 5 分鐘入門](https://javascript.info/class)
- [或直接用 Python 改寫](https://github.com/pppeee861005/ai-swarm-investing/issues)

### Q2：我只想用某一個 workflow？
**A**：完全可以！
- 每個子專案都是獨立的 npm package
- `npm install @ai-swarm/monitor` 只安裝監控模塊
- 不需要整個系統

### Q3：我想整合多個 workflow？
**A**：看 `examples/03-full-stack.js`，或讀 [SUBPROJECTS.md](./08-SUBPROJECTS.md)

### Q4：報錯了怎麼辦？
**A**：
1. 檢查 Node.js 版本 ≥ 14
2. 讀錯誤訊息（很多時候能自己解決）
3. 提交 [Issue](https://github.com/pppeee861005/ai-swarm-investing/issues)

---

## 🎯 下一步

### 如果你選了方式 1（讀故事）
→ 讀完一篇故事後，點進對應的 GitHub 專案試試看代碼

### 如果你選了方式 2（跑代碼）
→ 跑完 basic-monitor.js 後，讀 [第一篇故事](./04-GALLERY.md#第一篇蜂群覺醒) 理解背景

### 如果你選了方式 3（深度學習）
→ 完成 4 步後，考慮[貢獻](./CONTRIBUTING.md)或整合到你的項目

---

## 📚 相關文檔

| 想要... | 讀這個 |
|--------|--------|
| 看 7 篇故事 | [04-GALLERY.md](./04-GALLERY.md) |
| 了解 7 個子專案 | [08-SUBPROJECTS.md](./08-SUBPROJECTS.md) |
| 學習代碼架構 | [README.md](../README.md) 或 examples/ |
| 貢獻代碼 | [CONTRIBUTING.md](./CONTRIBUTING.md) |

---

## 💬 需要幫助？

- 📖 **讀文檔**：[SUBPROJECTS.md](./08-SUBPROJECTS.md)
- 💻 **看例子**：`examples/` 目錄
- 🐛 **報告 Bug**：[GitHub Issues](https://github.com/pppeee861005/ai-swarm-investing/issues)
- 💬 **討論**：[GitHub Discussions](https://github.com/pppeee861005/ai-swarm-investing/discussions)

---

**祝你開心！** 🐝
