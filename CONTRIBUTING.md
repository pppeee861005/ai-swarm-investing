# 貢獻指南

感謝你對 AI Swarm Investing 的興趣！我們歡迎所有形式的貢獻。

---

## 如何貢獻

### 1. 報告 Bug

如果你發現了 Bug，請在 [GitHub Issues](https://github.com/pppeee861005/ai-swarm-investing/issues) 提交報告，包含：

- 問題描述
- 重現步驟
- 預期行為 vs 實際行為
- 環境信息（Claude Code 版本、Node.js 版本等）

### 2. 功能建議

有新想法？請在 [Discussions](https://github.com/pppeee861005/ai-swarm-investing/discussions) 開啟討論：

- 描述你想要的功能
- 解釋為什麼這個功能有價值
- 如果可能，提供初步設計思路

### 3. 提交代碼

#### 開發流程

```bash
# 1. Fork 倉庫

# 2. 克隆你的 Fork
git clone https://github.com/YOUR_USERNAME/ai-swarm-investing.git

# 3. 創建功能分支
git checkout -b feature/your-feature-name

# 4. 開發和測試

# 5. 提交變更
git add .
git commit -m "feat: 添加 XXX 功能"

# 6. 推送到你的 Fork
git push origin feature/your-feature-name

# 7. 創建 Pull Request
```

#### Commit 規範

請使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
feat: 新功能
fix: Bug 修復
docs: 文檔更新
style: 代碼格式（不影響功能）
refactor: 重構（不是新功能也不是 Bug 修復）
test: 添加測試
chore: 構建/工具變更
```

### 4. 改進文檔

文檔改進同樣重要！你可以：

- 修正錯字
- 添加使用範例
- 改進說明清晰度
- 翻譯文檔

---

## 開發環境設置

### 前置條件

- Node.js 18+
- Claude Code 2.1.47+
- Git

### 設置步驟

```bash
# 克隆倉庫
git clone https://github.com/pppeee861005/ai-swarm-investing.git
cd ai-swarm-investing

# 安裝依賴（如果有）
npm install

# 啟用 Workflow
export CLAUDE_CODE_WORKFLOWS_ENABLED=1
```

---

## 代碼風格

### JavaScript

- 使用 ES6+ 語法
- 使用 async/await 處理異步
- 使用有意義的變量名
- 添加必要的註釋

### 文檔

- 使用繁體中文或英文
- Markdown 格式
- 包含代碼範例

---

## 新增 Workflow 指南

如果你想貢獻新的 Workflow（例如 Swarm-08），請：

1. 在 `workflows/` 目錄創建新文件
2. 遵循現有 Workflow 的結構
3. 在 `docs/` 添加對應的文檔
4. 更新 README.md 的武器庫列表
5. 添加使用範例

### Workflow 結構模板

```javascript
/**
 * Swarm-XX: [名稱]
 *
 * 功能：[描述]
 * 作者：[你的名字]
 * 日期：[日期]
 */

const metadata = {
  name: "swarm-xx-name",
  description: "描述",
  version: "0.1.0",
  author: "你的名字"
};

async function execute(context) {
  // 實現邏輯
}

module.exports = { metadata, execute };
```

---

## 行為準則

- 尊重所有貢獻者
- 建設性地提供反饋
- 專注於技術討論
- 歡迎新手

---

## 問題？

如果有任何問題，請：

- 查看現有的 [Issues](https://github.com/pppeee861005/ai-swarm-investing/issues)
- 在 [Discussions](https://github.com/pppeee861005/ai-swarm-investing/discussions) 提問
- 閱讀 [Substack 文章](https://aiagentcommander.substack.com) 了解背景

---

感謝你的貢獻！讓我們一起用蜂群重構投資決策。

*新人類聯盟 · Homo Coalitio*
