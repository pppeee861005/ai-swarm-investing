# 🐝 子專案導航地圖

> **星型架構中的 7 個衛星 Repo**

---

## 🎯 快速查找表

| # | 專案名 | GitHub | NPM 包 | 難度 | 狀態 | 故事 |
|---|--------|--------|--------|------|------|------|
| 1 | 蜂群覺醒 | [ai-swarm-monitor](https://github.com/pppeee861005/ai-swarm-monitor) | `@ai-swarm/monitor` | ⭐⭐⭐ | 🟢 | [E01](./docs/04-GALLERY.md#第一篇) |
| 2 | 三維獵殺 | [ai-swarm-triangulate](https://github.com/pppeee861005/ai-swarm-triangulate) | `@ai-swarm/triangulate` | ⭐⭐⭐⭐ | 🟢 | [E02](./docs/04-GALLERY.md#第二篇) |
| 3 | 自動校準 | [ai-swarm-rebalance](https://github.com/pppeee861005/ai-swarm-rebalance) | `@ai-swarm/rebalance` | ⭐⭐⭐ | 🟡 | [E03](./docs/04-GALLERY.md#第三篇) |
| 4 | 新聞獵手 | [ai-swarm-news-hunter](https://github.com/pppeee861005/ai-swarm-news-hunter) | `@ai-swarm/news-hunter` | ⭐⭐⭐⭐ | 🟡 | [E04](./docs/04-GALLERY.md#第四篇) |
| 5 | 跨境狙擊 | [ai-swarm-cross-market](https://github.com/pppeee861005/ai-swarm-cross-market) | `@ai-swarm/cross-market` | ⭐⭐⭐⭐⭐ | 🔴 | [E05](./docs/04-GALLERY.md#第五篇) |
| 6 | 末日推演 | [ai-swarm-stress-test](https://github.com/pppeee861005/ai-swarm-stress-test) | `@ai-swarm/stress-test` | ⭐⭐⭐⭐ | 🔴 | [E06](./docs/04-GALLERY.md#第六篇) |
| 7 | 終極顧問 | [ai-swarm-advisor](https://github.com/pppeee861005/ai-swarm-advisor) | `@ai-swarm/advisor` | ⭐⭐⭐⭐⭐ | 🔴 | [E07](./docs/04-GALLERY.md#第七篇) |

---

## 🔰 新手推薦路線

### Step 1：讀故事（10 分鐘）
👉 這個 repo 的 [README.md](./README.md) 和 [docs/04-GALLERY.md](./docs/04-GALLERY.md)

### Step 2：用第一個專案（30 分鐘）
👉 [ai-swarm-monitor](https://github.com/pppeee861005/ai-swarm-monitor)
```bash
npm install @ai-swarm/monitor
# 跑一個基礎例子
node examples/basic-monitor.js
```

### Step 3：整合第二個專案（1 小時）
👉 [ai-swarm-triangulate](https://github.com/pppeee861005/ai-swarm-triangulate)
```bash
npm install @ai-swarm/triangulate
# 跑整合例子
node examples/integrated-monitor-triangulate.js
```

---

## 📚 按難度排序

### 🟢 初級（可直接使用）
- **蜂群覺醒**：多股票監控，邏輯清晰
- **自動校準**：再平衡算法，易於理解

### 🟡 中級（需要理解背景）
- **三維獵殺**：三維評分系統，邏輯複雜
- **新聞獵手**：NLP + 套利計算，需要數據

### 🔴 高級（企業級別）
- **跨境狙擊**：多市場同步，架構複雜
- **末日推演**：場景模擬，數學深度
- **終極顧問**：長期上下文，需要 Opus

---

## 🔗 按功能分類

### 監控類（告警 & 偵測）
- 蜂群覺醒（監控異動）
- 新聞獵手（捕捉機會）

### 分析類（評估 & 決策）
- 三維獵殺（三維評分）
- 末日推演（風險評估）

### 執行類（行動 & 優化）
- 自動校準（再平衡）
- 跨境狙擊（套利執行）

### 顧問類（長期決策）
- 終極顧問（個人軍師）

---

## 🎓 按學習目標分類

### 想學 Multi-Agent 架構？
→ 讀 [ai-swarm-monitor](https://github.com/pppeee861005/ai-swarm-monitor) 的代碼
→ 看 7 個 Agent 如何協作

### 想學 Workflow 設計？
→ 讀 [GITHUB_ARCHITECTURE_PLAN.md](./GITHUB_ARCHITECTURE_PLAN.md)
→ 參考 [docs/00-ARCHITECTURE.md](./docs/00-ARCHITECTURE.md)

### 想學量化交易？
→ 讀 [ai-swarm-triangulate](https://github.com/pppeee861005/ai-swarm-triangulate) 的三維評分
→ 讀 [ai-swarm-cross-market](https://github.com/pppeee861005/ai-swarm-cross-market) 的套利邏輯

### 想學 Claude API？
→ 讀所有專案如何用 Claude 進行推理
→ 重點看 [ai-swarm-advisor](https://github.com/pppeee861005/ai-swarm-advisor) 的上下文管理

---

## 🚀 本地開發（Monorepo）

如果要同時開發多個子專案，建議用 monorepo：

```bash
# 克隆主倉庫
git clone https://github.com/pppeee861005/ai-swarm-investing.git
cd ai-swarm-investing

# 安裝所有子專案
npm install

# 使用 workspace
npm run test --workspace=@ai-swarm/monitor

# 或者單獨進入子專案
cd core/packages/@ai-swarm/monitor
npm test
```

---

## 🤝 貢獻機會

### 各專案開放的貢獻點

| 專案 | 開放貢獻 | 難度 |
|------|---------|------|
| monitor | 新告警規則 | ⭐⭐ |
| triangulate | 新評分維度 | ⭐⭐⭐ |
| rebalance | 新再平衡策略 | ⭐⭐⭐ |
| news-hunter | 新聞源整合 | ⭐⭐⭐⭐ |
| cross-market | 新市場支持 | ⭐⭐⭐⭐ |
| stress-test | 新場景設計 | ⭐⭐⭐ |
| advisor | 新推薦邏輯 | ⭐⭐⭐⭐⭐ |

👉 [貢獻指南](./docs/07-CONTRIBUTING.md)

---

## 📖 Substack 文章對應

每個子專案都有對應的 Substack 故事文章，結合閱讀能更好理解：

- **E01**: [蜂群覺醒](https://aiagentcommander.substack.com/p/swarm-01)
- **E02**: [三維獵殺](https://aiagentcommander.substack.com/p/swarm-02)
- **E03**: [自動校準](https://aiagentcommander.substack.com/p/swarm-03) (待發)
- **E04**: [新聞獵手](https://aiagentcommander.substack.com/p/swarm-04) (待發)
- **E05**: [跨境狙擊](https://aiagentcommander.substack.com/p/swarm-05) (待發)
- **E06**: [末日推演](https://aiagentcommander.substack.com/p/swarm-06) (待發)
- **E07**: [終極顧問](https://aiagentcommander.substack.com/p/swarm-07) (待發)

---

## 💾 本地倉庫結構

```
ai-swarm-investing/
├── README.md (你在這)
├── SUBPROJECTS.md (本文件)
├── docs/
│   ├── 04-GALLERY.md (7篇故事聚合)
│   ├── 08-SUBPROJECTS.md (詳細對比表)
│   └── ...
├── core/
│   └── packages/
│       ├── @ai-swarm/core/ (共享基礎)
│       ├── @ai-swarm/monitor/ (本地複本)
│       ├── @ai-swarm/triangulate/
│       └── ...
└── examples/
    ├── 01-hello-monitor.js
    ├── 02-integrated.js
    └── 03-full-stack.js
```

---

## 🔗 相關文檔

- [00-ARCHITECTURE.md](./docs/00-ARCHITECTURE.md) - 星型架構詳解
- [04-GALLERY.md](./docs/04-GALLERY.md) - 7篇故事完整版
- [05-API-REFERENCE.md](./docs/05-API-REFERENCE.md) - API 參考
- [06-INTEGRATION-GUIDE.md](./docs/06-INTEGRATION-GUIDE.md) - 整合指南
- [GITHUB_ARCHITECTURE_PLAN.md](./GITHUB_ARCHITECTURE_PLAN.md) - 完整規劃

---

**最後更新**：2026-05-29
**主專案版本**：v0.2.0
