# 🤝 貢獻指南

> **這個項目歡迎所有形式的貢獻。**

感謝你想加入這個蜂群冒險！ 🐝

---

## 🎯 貢獻的 5 種方式

### 1. 🐛 報告 Bug

**最簡單的貢獻方式！**

步驟：
1. 打開 [Issues](https://github.com/pppeee861005/ai-swarm-investing/issues)
2. 點 "New Issue" → 選 "Bug report"
3. 填寫：
   - 你做了什麼
   - 預期結果
   - 實際結果
   - Node 版本、系統等信息

例子：
```
標題：basic-monitor.js 在 Node 16 上報錯

描述：
運行 npm install 和 node basic-monitor.js 後
出現 "Cannot find module @ai-swarm/core"

預期：應該正常運行

環境：
- Node: 16.0.0
- npm: 8.0.0
- OS: Mac M1
```

---

### 2. 💡 建議功能

打開 [Issues](https://github.com/pppeee861005/ai-swarm-investing/issues)
→ "New Issue" → "Feature request"

例子：
```
標題：監控 Agent 支持自定義告警聲音

說明：
目前只能在控制台看到預警，希望能支持：
- 系統通知音
- Email 告警
- 手機推送

相關專案：ai-swarm-monitor
```

---

### 3. 📝 改進文檔

最容易上手的代碼貢獻！

步驟：
1. Fork 這個 repo
2. 編輯 `docs/` 或 `README.md`
3. 提交 Pull Request

常見的改進點：
- 修正拼寫或語法
- 補充代碼例子
- 翻譯成其他語言
- 補充缺失的説明

---

### 4. 💻 提交代碼

**適合有開發經驗的貢獻者**

#### 可以貢獻的地方

| 專案 | 開放貢獻 | 難度 |
|------|---------|------|
| monitor | 新告警規則 | ⭐⭐ |
| triangulate | 新評分維度 | ⭐⭐⭐ |
| rebalance | 新再平衡策略 | ⭐⭐⭐ |
| news-hunter | 新聞源整合 | ⭐⭐⭐⭐ |
| cross-market | 新市場支持 | ⭐⭐⭐⭐ |
| stress-test | 新場景設計 | ⭐⭐⭐ |
| advisor | 新推薦邏輯 | ⭐⭐⭐⭐⭐ |

[查看所有開放的 Issue →](https://github.com/pppeee861005/ai-swarm-investing/labels/good%20first%20issue)

#### 提交代碼的 3 步驟

**Step 1：準備**
```bash
# Fork repo
git clone https://github.com/YOUR_USERNAME/ai-swarm-investing.git

# 創建分支
git checkout -b feature/new-alert-rule
```

**Step 2：編寫代碼**
- 保持風格一致（看 examples/ 就知道）
- 加中文註釋
- 寫簡單的測試（如果可能）

**Step 3：提交 PR**
1. Push 到你的 fork
2. 打開 Pull Request
3. 描述：做了什麼、為什麼改、如何測試

PR 模板：
```
## 做了什麼
[簡述改動]

## 為什麼
[為什麼做這個改動]

## 如何測試
[如何驗證改動是否有效]

## 相關 Issue
fixes #123
```

---

### 5. 📢 分享

**最輕鬆的貢獻！**

- ⭐ 在 GitHub 給項目 Star
- 🐦 在 Twitter 分享
- 💬 在社群推薦
- 📝 寫文章介紹

---

## 📋 代碼風格

### 命名規則
```javascript
// ✅ 好
class MonitorAgent { }
async function fetchStockData() { }

// ❌ 不好
class agent { }
async function fetch_stock() { }
```

### 註釋規則
```javascript
// ✅ 中文註釋，解釋「為什麼」
if (volume > threshold) {
  // 成交量異常表示可能有大單進出
  alerts.push({ type: 'VOLUME_SPIKE' });
}

// ❌ 不解釋，只重複代碼
if (volume > threshold) {
  // 如果成交量大於閾值
  alerts.push({ type: 'VOLUME_SPIKE' });
}
```

### 函數風格
```javascript
// ✅ 清晰的函數簽名 + 文檔
/**
 * 檢查是否有成交量異常
 * @param {number} volume - 當前成交量
 * @param {number} threshold - 異常閾值
 * @returns {boolean} 是否異常
 */
function isVolumeAnomaly(volume, threshold) {
  return volume > threshold;
}

// ❌ 不清楚
function check(v, t) {
  return v > t;
}
```

---

## 🔍 PR Review 流程

你提交 PR 後，會發生什麼：

1. **自動檢查** (GitHub Actions)
   - 代碼格式檢查
   - 基本測試

2. **人工審查** (維護者)
   - 檢查邏輯
   - 建議改進
   - 批准 or 請求更改

3. **合併**
   - Approve 後自動合併
   - 你的名字會在 CHANGELOG 中

---

## 👥 社群行為準則

我們希望建立一個友好、尊重、包容的社群。

**請**：
- ✅ 尊重不同的意見
- ✅ 用親切的語氣
- ✅ 幫助新手
- ✅ 認真對待反饋

**不要**：
- ❌ 人身攻擊
- ❌ 騷擾、歧視
- ❌ 垃圾訊息

如果看到不適當行為，請[聯繫我們](#聯繫方式)。

---

## 📞 聯繫方式

- 📧 Email: [待補]
- 🐦 Twitter: [@aiagentcommander](https://twitter.com/aiagentcommander)
- 💬 Discussions: [GitHub Discussions](https://github.com/pppeee861005/ai-swarm-investing/discussions)
- 📖 Blog: [Substack](https://aiagentcommander.substack.com)

---

## 🏆 致謝

每個貢獻（無論大小）都很重要。

- 代碼貢獻者會在 `CONTRIBUTORS.md` 中列出
- Issue 報告者會在 CHANGELOG 中提及
- 文檔改進者會獲得特別感謝

**感謝你讓這個蜂群更強大！** 🐝

---

**最後更新**：2026-05-29
