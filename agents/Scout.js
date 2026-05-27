/**
 * Scout Agent - 偵察兵
 *
 * 職責：
 * - 監控單一股票的即時數據
 * - 偵測異常（支撐破位、量能突增、大單進出）
 * - 向 Lead Agent 回報異動
 *
 * @author AI Agent Commander
 * @version 0.1.0
 * @model Claude Haiku（輕量、低成本、高並發）
 */

// ============================================================
// 觸發條件定義
// ============================================================

const TRIGGER_TYPES = {
  SUPPORT_BREAK: 'SUPPORT_BREAK',       // 支撐破位
  RESISTANCE_BREAK: 'RESISTANCE_BREAK', // 突破壓力
  VOLUME_SPIKE: 'VOLUME_SPIKE',         // 成交量突增
  BIG_ORDER_IN: 'BIG_ORDER_IN',         // 大單買入
  BIG_ORDER_OUT: 'BIG_ORDER_OUT',       // 大單賣出
  IMBALANCE: 'IMBALANCE',               // 買賣失衡
  PRICE_SURGE: 'PRICE_SURGE',           // 價格急漲
  PRICE_DROP: 'PRICE_DROP'              // 價格急跌
};

const ALERT_LEVELS = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL'
};

// ============================================================
// Scout Agent 類
// ============================================================

class ScoutAgent {
  /**
   * 創建 Scout Agent
   * @param {Object} config - 配置對象
   * @param {string} config.symbol - 股票代碼
   * @param {string} config.name - 股票名稱
   * @param {string} config.market - 市場（TW/US/HK）
   * @param {Object} config.thresholds - 觸發閾值
   * @param {Object} config.dataSource - 數據源接口
   */
  constructor(config) {
    this.agentId = `Scout-${config.symbol}`;
    this.symbol = config.symbol;
    this.name = config.name || config.symbol;
    this.market = config.market || 'US';

    // 觸發閾值（可自定義）
    this.thresholds = {
      supportBreak: config.thresholds?.supportBreak || 0.02,      // 跌破支撐 2%
      resistanceBreak: config.thresholds?.resistanceBreak || 0.02, // 突破壓力 2%
      volumeSpike: config.thresholds?.volumeSpike || 3.0,         // 成交量 3 倍
      bigOrderAmount: config.thresholds?.bigOrderAmount || 10000000, // 大單 1000 萬
      imbalance: config.thresholds?.imbalance || 0.3,             // 失衡 30%
      priceChange: config.thresholds?.priceChange || 0.03,        // 價格變動 3%
      ...config.thresholds
    };

    // 數據源（可注入）
    this.dataSource = config.dataSource || null;

    // 歷史數據緩存
    this.cache = {
      lastPrice: null,
      lastVolume: null,
      support: null,
      resistance: null,
      avgVolume5min: null
    };

    // 狀態
    this.isActive = true;
    this.lastScanTime = null;
    this.scanCount = 0;
  }

  // ============================================================
  // 核心監控方法
  // ============================================================

  /**
   * 執行一次監控掃描
   * @returns {Object} 掃描報告
   */
  async scan() {
    const startTime = Date.now();
    this.scanCount++;

    try {
      // 1. 獲取市場數據
      const marketData = await this.fetchMarketData();

      // 2. 更新緩存
      this.updateCache(marketData);

      // 3. 檢查所有觸發條件
      const triggers = this.checkAllTriggers(marketData);

      // 4. 生成報告
      const report = this.generateReport(marketData, triggers, startTime);

      this.lastScanTime = new Date().toISOString();

      return report;

    } catch (error) {
      return this.generateErrorReport(error, startTime);
    }
  }

  /**
   * 獲取市場數據
   * @returns {Object} 市場數據
   */
  async fetchMarketData() {
    // 如果有注入的數據源，使用它
    if (this.dataSource && typeof this.dataSource.fetch === 'function') {
      return await this.dataSource.fetch(this.symbol);
    }

    // 否則使用模擬數據（開發/測試用）
    return this.generateMockData();
  }

  /**
   * 生成模擬數據（開發/測試用）
   * @returns {Object} 模擬市場數據
   */
  generateMockData() {
    const basePrice = this.cache.lastPrice || 100;
    const baseVolume = this.cache.avgVolume5min || 10000;

    // 隨機波動
    const priceChange = (Math.random() - 0.5) * 0.1; // ±5%
    const volumeMultiplier = 0.5 + Math.random() * 4; // 0.5x ~ 4.5x

    const currentPrice = basePrice * (1 + priceChange);
    const currentVolume = baseVolume * volumeMultiplier;

    // 模擬支撐/壓力位
    const support = this.cache.support || basePrice * 0.95;
    const resistance = this.cache.resistance || basePrice * 1.05;

    // 模擬大單（10% 機率出現）
    const hasBigOrder = Math.random() < 0.1;
    const bigOrderDirection = Math.random() > 0.5 ? 'BUY' : 'SELL';
    const bigOrderAmount = hasBigOrder
      ? this.thresholds.bigOrderAmount * (1 + Math.random())
      : 0;

    // 模擬買賣盤
    const bidDepth = 50000 + Math.random() * 100000;
    const askDepth = 50000 + Math.random() * 100000;

    return {
      symbol: this.symbol,
      timestamp: new Date().toISOString(),

      price: {
        current: currentPrice,
        open: basePrice,
        high: Math.max(basePrice, currentPrice) * 1.01,
        low: Math.min(basePrice, currentPrice) * 0.99,
        close: currentPrice,
        change: priceChange,
        changePct: priceChange * 100
      },

      volume: {
        current: Math.floor(currentVolume),
        avg5min: Math.floor(baseVolume),
        spikeRatio: volumeMultiplier
      },

      levels: {
        support: support,
        resistance: resistance
      },

      orderbook: {
        bidDepth: Math.floor(bidDepth),
        askDepth: Math.floor(askDepth),
        imbalance: (bidDepth - askDepth) / (bidDepth + askDepth)
      },

      bigOrder: {
        detected: hasBigOrder,
        direction: hasBigOrder ? bigOrderDirection : null,
        amount: bigOrderAmount
      }
    };
  }

  // ============================================================
  // 觸發條件檢查
  // ============================================================

  /**
   * 檢查所有觸發條件
   * @param {Object} data - 市場數據
   * @returns {Array} 觸發的條件列表
   */
  checkAllTriggers(data) {
    const triggers = [];

    // 1. 支撐破位
    if (this.checkSupportBreak(data)) {
      triggers.push({
        type: TRIGGER_TYPES.SUPPORT_BREAK,
        level: ALERT_LEVELS.CRITICAL,
        description: `跌破支撐位 ${data.levels.support.toFixed(2)}`,
        details: {
          currentPrice: data.price.current,
          supportLevel: data.levels.support,
          breakPercent: ((data.levels.support - data.price.current) / data.levels.support * 100).toFixed(2)
        }
      });
    }

    // 2. 突破壓力
    if (this.checkResistanceBreak(data)) {
      triggers.push({
        type: TRIGGER_TYPES.RESISTANCE_BREAK,
        level: ALERT_LEVELS.WARNING,
        description: `突破壓力位 ${data.levels.resistance.toFixed(2)}`,
        details: {
          currentPrice: data.price.current,
          resistanceLevel: data.levels.resistance,
          breakPercent: ((data.price.current - data.levels.resistance) / data.levels.resistance * 100).toFixed(2)
        }
      });
    }

    // 3. 成交量突增
    if (this.checkVolumeSpike(data)) {
      triggers.push({
        type: TRIGGER_TYPES.VOLUME_SPIKE,
        level: ALERT_LEVELS.WARNING,
        description: `成交量突增 ${data.volume.spikeRatio.toFixed(1)}x`,
        details: {
          currentVolume: data.volume.current,
          avgVolume: data.volume.avg5min,
          spikeRatio: data.volume.spikeRatio
        }
      });
    }

    // 4. 大單進出
    if (this.checkBigOrder(data)) {
      const triggerType = data.bigOrder.direction === 'BUY'
        ? TRIGGER_TYPES.BIG_ORDER_IN
        : TRIGGER_TYPES.BIG_ORDER_OUT;

      triggers.push({
        type: triggerType,
        level: data.bigOrder.direction === 'SELL' ? ALERT_LEVELS.CRITICAL : ALERT_LEVELS.WARNING,
        description: `大單${data.bigOrder.direction === 'BUY' ? '買入' : '賣出'} ${(data.bigOrder.amount / 10000).toFixed(0)}萬`,
        details: {
          direction: data.bigOrder.direction,
          amount: data.bigOrder.amount
        }
      });
    }

    // 5. 買賣失衡
    if (this.checkImbalance(data)) {
      triggers.push({
        type: TRIGGER_TYPES.IMBALANCE,
        level: ALERT_LEVELS.INFO,
        description: `買賣失衡 ${(data.orderbook.imbalance * 100).toFixed(1)}%`,
        details: {
          bidDepth: data.orderbook.bidDepth,
          askDepth: data.orderbook.askDepth,
          imbalance: data.orderbook.imbalance
        }
      });
    }

    // 6. 價格急漲/急跌
    if (this.checkPriceChange(data)) {
      const triggerType = data.price.change > 0
        ? TRIGGER_TYPES.PRICE_SURGE
        : TRIGGER_TYPES.PRICE_DROP;

      triggers.push({
        type: triggerType,
        level: Math.abs(data.price.change) > 0.05 ? ALERT_LEVELS.CRITICAL : ALERT_LEVELS.WARNING,
        description: `價格${data.price.change > 0 ? '急漲' : '急跌'} ${data.price.changePct.toFixed(2)}%`,
        details: {
          currentPrice: data.price.current,
          change: data.price.change,
          changePct: data.price.changePct
        }
      });
    }

    return triggers;
  }

  // 個別觸發條件檢查方法

  checkSupportBreak(data) {
    return data.price.current < data.levels.support * (1 - this.thresholds.supportBreak);
  }

  checkResistanceBreak(data) {
    return data.price.current > data.levels.resistance * (1 + this.thresholds.resistanceBreak);
  }

  checkVolumeSpike(data) {
    return data.volume.spikeRatio > this.thresholds.volumeSpike;
  }

  checkBigOrder(data) {
    return data.bigOrder.detected && data.bigOrder.amount > this.thresholds.bigOrderAmount;
  }

  checkImbalance(data) {
    return Math.abs(data.orderbook.imbalance) > this.thresholds.imbalance;
  }

  checkPriceChange(data) {
    return Math.abs(data.price.change) > this.thresholds.priceChange;
  }

  // ============================================================
  // 報告生成
  // ============================================================

  /**
   * 生成掃描報告
   * @param {Object} data - 市場數據
   * @param {Array} triggers - 觸發的條件
   * @param {number} startTime - 開始時間
   * @returns {Object} 掃描報告
   */
  generateReport(data, triggers, startTime) {
    const duration = Date.now() - startTime;
    const hasAlert = triggers.length > 0;

    // 計算最高警報等級
    let highestLevel = ALERT_LEVELS.INFO;
    if (triggers.some(t => t.level === ALERT_LEVELS.CRITICAL)) {
      highestLevel = ALERT_LEVELS.CRITICAL;
    } else if (triggers.some(t => t.level === ALERT_LEVELS.WARNING)) {
      highestLevel = ALERT_LEVELS.WARNING;
    }

    return {
      // 元數據
      agentId: this.agentId,
      symbol: this.symbol,
      name: this.name,
      market: this.market,
      timestamp: new Date().toISOString(),

      // 狀態
      status: hasAlert ? 'ALERT' : 'NORMAL',
      level: hasAlert ? highestLevel : null,

      // 觸發條件
      triggersCount: triggers.length,
      triggers: triggers,

      // 市場數據摘要
      summary: {
        price: data.price.current.toFixed(2),
        change: `${data.price.change > 0 ? '+' : ''}${data.price.changePct.toFixed(2)}%`,
        volume: data.volume.current,
        volumeRatio: `${data.volume.spikeRatio.toFixed(1)}x`
      },

      // 完整數據
      data: data,

      // 性能指標
      metrics: {
        scanNumber: this.scanCount,
        durationMs: duration
      },

      // 置信度（基於數據質量和觸發條件數量）
      confidence: this.calculateConfidence(data, triggers)
    };
  }

  /**
   * 生成錯誤報告
   * @param {Error} error - 錯誤對象
   * @param {number} startTime - 開始時間
   * @returns {Object} 錯誤報告
   */
  generateErrorReport(error, startTime) {
    return {
      agentId: this.agentId,
      symbol: this.symbol,
      timestamp: new Date().toISOString(),
      status: 'ERROR',
      error: {
        message: error.message,
        stack: error.stack
      },
      metrics: {
        scanNumber: this.scanCount,
        durationMs: Date.now() - startTime
      }
    };
  }

  /**
   * 計算置信度
   * @param {Object} data - 市場數據
   * @param {Array} triggers - 觸發條件
   * @returns {number} 置信度 0-1
   */
  calculateConfidence(data, triggers) {
    let confidence = 0.5; // 基礎置信度

    // 有觸發條件增加置信度
    confidence += Math.min(triggers.length * 0.1, 0.3);

    // 多個觸發條件同時發生增加置信度
    if (triggers.length >= 2) confidence += 0.1;

    // 成交量大增加置信度
    if (data.volume.spikeRatio > 2) confidence += 0.05;

    return Math.min(confidence, 1.0);
  }

  // ============================================================
  // 緩存管理
  // ============================================================

  /**
   * 更新緩存
   * @param {Object} data - 市場數據
   */
  updateCache(data) {
    this.cache.lastPrice = data.price.current;
    this.cache.lastVolume = data.volume.current;
    this.cache.support = data.levels.support;
    this.cache.resistance = data.levels.resistance;
    this.cache.avgVolume5min = data.volume.avg5min;
  }

  /**
   * 清除緩存
   */
  clearCache() {
    this.cache = {
      lastPrice: null,
      lastVolume: null,
      support: null,
      resistance: null,
      avgVolume5min: null
    };
  }

  // ============================================================
  // 工具方法
  // ============================================================

  /**
   * 獲取 Agent 狀態
   * @returns {Object} 狀態信息
   */
  getStatus() {
    return {
      agentId: this.agentId,
      symbol: this.symbol,
      isActive: this.isActive,
      scanCount: this.scanCount,
      lastScanTime: this.lastScanTime,
      thresholds: this.thresholds
    };
  }

  /**
   * 更新閾值配置
   * @param {Object} newThresholds - 新閾值
   */
  updateThresholds(newThresholds) {
    this.thresholds = { ...this.thresholds, ...newThresholds };
  }

  /**
   * 暫停/恢復 Agent
   * @param {boolean} active - 是否激活
   */
  setActive(active) {
    this.isActive = active;
  }
}

// ============================================================
// 導出
// ============================================================

module.exports = {
  ScoutAgent,
  TRIGGER_TYPES,
  ALERT_LEVELS
};
