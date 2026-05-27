/**
 * Basic Monitor Example
 *
 * 這是一個簡化的監控範例，展示蜂群監控的基本結構。
 * 用於學習和測試，不建議直接用於生產環境。
 *
 * @author AI Agent Commander
 * @version 0.1.0
 */

// ============================================================
// 配置
// ============================================================

const config = {
  stocks: ['TSMC', 'NVDA', 'AAPL'],
  triggers: {
    volumeSpike: 3.0,  // 成交量突增 3 倍觸發
    priceChange: 0.02  // 價格變動 2% 觸發
  }
};

// ============================================================
// Scout Agent（偵察兵）
// ============================================================

class ScoutAgent {
  constructor(symbol) {
    this.symbol = symbol;
    this.agentId = `Scout-${symbol}`;
  }

  async monitor() {
    // 模擬獲取市場數據
    const data = await this.fetchMarketData();

    // 檢查觸發條件
    const triggers = this.checkTriggers(data);

    return {
      agentId: this.agentId,
      symbol: this.symbol,
      timestamp: new Date().toISOString(),
      status: triggers.length > 0 ? 'ALERT' : 'NORMAL',
      triggers: triggers,
      data: data
    };
  }

  async fetchMarketData() {
    // TODO: 替換為真實 API 調用
    // 這裡使用模擬數據
    return {
      price: 100 + Math.random() * 10,
      volume: 10000 + Math.random() * 50000,
      change: (Math.random() - 0.5) * 0.1
    };
  }

  checkTriggers(data) {
    const triggers = [];

    // 檢查成交量突增
    if (data.volume > 30000) {
      triggers.push({
        type: 'VOLUME_SPIKE',
        description: `成交量異常：${data.volume.toFixed(0)}`
      });
    }

    // 檢查價格變動
    if (Math.abs(data.change) > config.triggers.priceChange) {
      triggers.push({
        type: 'PRICE_CHANGE',
        description: `價格變動：${(data.change * 100).toFixed(2)}%`
      });
    }

    return triggers;
  }
}

// ============================================================
// Lead Agent（指揮官）
// ============================================================

class LeadAgent {
  constructor() {
    this.agentId = 'Lead-Opus';
  }

  async evaluate(scoutReports) {
    // 過濾有異動的報告
    const alerts = scoutReports.filter(r => r.status === 'ALERT');

    if (alerts.length === 0) {
      return {
        action: 'NONE',
        message: '無異動'
      };
    }

    // 生成評估結果
    return {
      action: 'ALERT',
      level: alerts.length >= 2 ? 'WARNING' : 'INFO',
      alerts: alerts.map(a => ({
        symbol: a.symbol,
        triggers: a.triggers
      })),
      summary: `偵測到 ${alerts.length} 支股票異動`,
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================================
// Notifier Agent（通知官）
// ============================================================

class NotifierAgent {
  async notify(evaluation) {
    if (evaluation.action === 'NONE') {
      console.log('[Notifier] 無需通知');
      return;
    }

    // 生成通知訊息
    const message = this.formatMessage(evaluation);

    // TODO: 替換為真實的通知發送
    console.log('\n========== 蜂群預警 ==========');
    console.log(message);
    console.log('================================\n');
  }

  formatMessage(evaluation) {
    let msg = `🐝 蜂群預警\n`;
    msg += `等級：${evaluation.level}\n`;
    msg += `時間：${evaluation.timestamp}\n\n`;

    evaluation.alerts.forEach(alert => {
      msg += `【${alert.symbol}】\n`;
      alert.triggers.forEach(t => {
        msg += `  - ${t.description}\n`;
      });
    });

    return msg;
  }
}

// ============================================================
// 主循環
// ============================================================

async function runSwarm() {
  console.log('🐝 啟動蜂群監控...\n');

  // 創建 Agents
  const scouts = config.stocks.map(s => new ScoutAgent(s));
  const lead = new LeadAgent();
  const notifier = new NotifierAgent();

  // 並行執行 Scout 監控
  console.log('[Main] 執行並行監控...');
  const reports = await Promise.all(
    scouts.map(scout => scout.monitor())
  );

  // 輸出 Scout 報告
  reports.forEach(r => {
    console.log(`[${r.agentId}] ${r.status} - 觸發: ${r.triggers.length}`);
  });

  // Lead 評估
  console.log('\n[Main] Lead Agent 評估中...');
  const evaluation = await lead.evaluate(reports);

  // 發送通知
  await notifier.notify(evaluation);

  console.log('🐝 監控循環完成');
}

// ============================================================
// 執行
// ============================================================

// 單次執行
runSwarm().catch(console.error);

// 如需循環執行，取消以下註釋：
// setInterval(runSwarm, 60000);  // 每 60 秒執行一次
