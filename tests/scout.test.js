/**
 * Scout Agent 測試
 *
 * 運行方式：node tests/scout.test.js
 */

const { ScoutAgent, TRIGGER_TYPES, ALERT_LEVELS } = require('../agents/Scout');

// ============================================================
// 測試輔助函數
// ============================================================

function log(message, data = null) {
  console.log(`\n[TEST] ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
}

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

// ============================================================
// 測試用例
// ============================================================

async function testBasicCreation() {
  log('測試 1: 基本創建');

  const scout = new ScoutAgent({
    symbol: 'TSMC',
    name: '台積電',
    market: 'TW'
  });

  assert(scout.agentId === 'Scout-TSMC', 'Agent ID 正確');
  assert(scout.symbol === 'TSMC', 'Symbol 正確');
  assert(scout.name === '台積電', 'Name 正確');
  assert(scout.market === 'TW', 'Market 正確');
  assert(scout.isActive === true, 'Default active state');
}

async function testSingleScan() {
  log('測試 2: 單次掃描');

  const scout = new ScoutAgent({
    symbol: 'NVDA',
    name: '輝達',
    market: 'US'
  });

  const report = await scout.scan();

  assert(report.agentId === 'Scout-NVDA', 'Report agent ID 正確');
  assert(report.symbol === 'NVDA', 'Report symbol 正確');
  assert(['NORMAL', 'ALERT'].includes(report.status), 'Status 有效');
  assert(typeof report.timestamp === 'string', 'Timestamp 存在');
  assert(report.data !== null, 'Data 存在');
  assert(report.metrics.scanNumber === 1, 'Scan count 正確');

  log('掃描報告', {
    status: report.status,
    level: report.level,
    triggersCount: report.triggersCount,
    summary: report.summary
  });
}

async function testMultipleScan() {
  log('測試 3: 多次掃描');

  const scout = new ScoutAgent({
    symbol: 'AAPL',
    market: 'US'
  });

  // 執行 5 次掃描
  for (let i = 1; i <= 5; i++) {
    const report = await scout.scan();
    assert(report.metrics.scanNumber === i, `Scan count ${i} 正確`);
  }

  const status = scout.getStatus();
  assert(status.scanCount === 5, '總掃描次數正確');
}

async function testCustomThresholds() {
  log('測試 4: 自定義閾值');

  const scout = new ScoutAgent({
    symbol: 'MSFT',
    thresholds: {
      volumeSpike: 2.0,       // 降低到 2 倍
      priceChange: 0.01,      // 降低到 1%
      bigOrderAmount: 5000000 // 降低到 500 萬
    }
  });

  assert(scout.thresholds.volumeSpike === 2.0, '自定義 volumeSpike 正確');
  assert(scout.thresholds.priceChange === 0.01, '自定義 priceChange 正確');
  assert(scout.thresholds.bigOrderAmount === 5000000, '自定義 bigOrderAmount 正確');

  // 更新閾值
  scout.updateThresholds({ volumeSpike: 1.5 });
  assert(scout.thresholds.volumeSpike === 1.5, '更新閾值成功');
}

async function testCustomDataSource() {
  log('測試 5: 自定義數據源');

  // 創建一個模擬數據源，強制觸發警報
  const mockDataSource = {
    fetch: async (symbol) => ({
      symbol: symbol,
      timestamp: new Date().toISOString(),
      price: {
        current: 90,  // 低於支撐位
        open: 100,
        high: 102,
        low: 88,
        close: 90,
        change: -0.10,
        changePct: -10
      },
      volume: {
        current: 50000,
        avg5min: 10000,
        spikeRatio: 5.0  // 5 倍成交量
      },
      levels: {
        support: 95,
        resistance: 105
      },
      orderbook: {
        bidDepth: 30000,
        askDepth: 70000,
        imbalance: -0.4  // 賣盤壓力大
      },
      bigOrder: {
        detected: true,
        direction: 'SELL',
        amount: 15000000
      }
    })
  };

  const scout = new ScoutAgent({
    symbol: 'TEST',
    dataSource: mockDataSource
  });

  const report = await scout.scan();

  assert(report.status === 'ALERT', '應該觸發警報');
  assert(report.triggersCount > 0, '應該有觸發條件');
  assert(report.level === 'CRITICAL', '應該是 CRITICAL 級別');

  log('強制警報報告', {
    status: report.status,
    level: report.level,
    triggersCount: report.triggersCount,
    triggers: report.triggers.map(t => t.type)
  });
}

async function testParallelScouts() {
  log('測試 6: 並行多 Scout');

  const symbols = ['TSMC', 'NVDA', 'AAPL', 'MSFT', 'GOOGL'];
  const scouts = symbols.map(s => new ScoutAgent({ symbol: s }));

  console.log(`創建 ${scouts.length} 個 Scout Agent`);

  // 並行執行
  const startTime = Date.now();
  const reports = await Promise.all(scouts.map(s => s.scan()));
  const duration = Date.now() - startTime;

  assert(reports.length === 5, '應該有 5 份報告');

  reports.forEach((r, i) => {
    assert(r.symbol === symbols[i], `報告 ${i} symbol 正確`);
  });

  console.log(`\n並行執行 ${scouts.length} 個 Scout 耗時: ${duration}ms`);

  // 統計結果
  const alertCount = reports.filter(r => r.status === 'ALERT').length;
  const normalCount = reports.filter(r => r.status === 'NORMAL').length;
  console.log(`結果: ${alertCount} ALERT, ${normalCount} NORMAL`);
}

async function testTriggerTypes() {
  log('測試 7: 觸發類型常量');

  assert(TRIGGER_TYPES.SUPPORT_BREAK === 'SUPPORT_BREAK', 'SUPPORT_BREAK 存在');
  assert(TRIGGER_TYPES.VOLUME_SPIKE === 'VOLUME_SPIKE', 'VOLUME_SPIKE 存在');
  assert(TRIGGER_TYPES.BIG_ORDER_IN === 'BIG_ORDER_IN', 'BIG_ORDER_IN 存在');
  assert(TRIGGER_TYPES.BIG_ORDER_OUT === 'BIG_ORDER_OUT', 'BIG_ORDER_OUT 存在');

  assert(ALERT_LEVELS.INFO === 'INFO', 'INFO 存在');
  assert(ALERT_LEVELS.WARNING === 'WARNING', 'WARNING 存在');
  assert(ALERT_LEVELS.CRITICAL === 'CRITICAL', 'CRITICAL 存在');
}

// ============================================================
// 運行所有測試
// ============================================================

async function runAllTests() {
  console.log('========================================');
  console.log('🐝 Scout Agent 測試套件');
  console.log('========================================');

  try {
    await testBasicCreation();
    await testSingleScan();
    await testMultipleScan();
    await testCustomThresholds();
    await testCustomDataSource();
    await testParallelScouts();
    await testTriggerTypes();

    console.log('\n========================================');
    console.log('✅ 所有測試通過！');
    console.log('========================================\n');

  } catch (error) {
    console.error('\n❌ 測試失敗:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 執行
runAllTests();
