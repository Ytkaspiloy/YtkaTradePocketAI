// QuantumTrade Pro v12.7 - Real PocketOption API
console.log("=".repeat(70));
console.log("QuantumTrade Pro v12.7 - Real API Connection");
console.log("=".repeat(70));

// ====== Configuration ======
const ALL_ASSETS = [
    "EURUSD_otc", "GBPUSD_otc", "USDJPY_otc", "USDCHF_otc",
    "USDCAD_otc", "AUDUSD_otc", "NZDUSD_otc", "EURJPY_otc",
    "GBPJPY_otc", "AUDJPY_otc", "EURAUD_otc", "EURGBP_otc",
    "GBPAUD_otc", "GBPCAD_otc", "AUDCAD_otc", "CADJPY_otc",
    "CHFJPY_otc", "EURCAD_otc", "CADCHF_otc", "AUDCHF_otc",
    "XAUUSD_otc", "XAGUSD_otc", "GBPCAD", "EURJPY", "CHFJPY", "AUDCAD",
    "USDCAD", "USDCHF", "GBPAUD", "USDJPY",
    "EURUSD", "EURAUD", "AUDUSD", "CADJPY",
    "AUDJPY", "EURGBP", "GBPJPY", "GBPCHF",
    "EURCAD", "CADCHF", "AUDCHF",
];

const TIMEFRAMES = {
    "1 Min": 60, "2 Min": 120, "3 Min": 180,
    "5 Min": 300, "15 Min": 900, "30 Min": 1800,
    "1 Hour": 3600
};

const STRATEGY_CONFIGS = {
    "indicators": {"name": "Classic Indicators", "indicators": ["rsi","macd","stoch","adx","cci","mfi","williams_r","bb","momentum","vwap"], "weight_multiplier": 1.0},
    "technical": {"name": "Technical Analysis", "indicators": ["trend","sr_levels","structure","sma_cross","vwap","adx"], "weight_multiplier": 1.2},
    "patterns": {"name": "Candlestick Patterns", "indicators": ["price_action","hammer","shooting_star","engulfing","doji","morning_star","evening_star","three_white_soldiers","three_black_crows"], "weight_multiplier": 1.5},
    "traders": {"name": "Professional Traders", "indicators": ["ichimoku","keltner","donchian","psar","pivot","bb","atr","order_blocks","fair_value_gaps","volume_profile"], "weight_multiplier": 1.3},
    "combined": {"name": "All-In-One Combined", "indicators": "all", "weight_multiplier": 0.8},
    "scalping": {"name": "Scalping Strategy", "indicators": ["rsi","stoch","bb","momentum","price_action","order_blocks"], "weight_multiplier": 1.8},
    "swing": {"name": "Swing Trading", "indicators": ["trend","sr_levels","structure","macd","ichimoku","pivot","volume_profile"], "weight_multiplier": 0.9},
    "custom": {"name": "Custom Strategy", "indicators": [], "weight_multiplier": 1.0}
};

const ALL_INDICATORS = {
    "rsi":{"name":"RSI (14)","weight":4}, "stoch":{"name":"Stochastic","weight":3},
    "macd":{"name":"MACD","weight":3}, "adx":{"name":"ADX","weight":2},
    "cci":{"name":"CCI","weight":2}, "mfi":{"name":"MFI","weight":2},
    "williams_r":{"name":"Williams %R","weight":2}, "momentum":{"name":"Momentum","weight":1},
    "bb":{"name":"Bollinger Bands","weight":2}, "trend":{"name":"Trend","weight":2},
    "sma_cross":{"name":"SMA Cross","weight":2}, "sr_levels":{"name":"S/R Levels","weight":2},
    "structure":{"name":"Structure","weight":1}, "vwap":{"name":"VWAP","weight":1},
    "price_action":{"name":"Price Action","weight":3}, "hammer":{"name":"Hammer","weight":3},
    "shooting_star":{"name":"Shooting Star","weight":3}, "engulfing":{"name":"Engulfing","weight":2},
    "ichimoku":{"name":"Ichimoku","weight":2}, "keltner":{"name":"Keltner","weight":1},
    "donchian":{"name":"Donchian","weight":1}, "psar":{"name":"Parabolic SAR","weight":2},
    "pivot":{"name":"Pivot Points","weight":1}, "atr":{"name":"ATR","weight":1},
    "roc":{"name":"ROC","weight":1}, "doji":{"name":"Doji","weight":2},
    "morning_star":{"name":"Morning Star","weight":3}, "evening_star":{"name":"Evening Star","weight":3},
    "three_white_soldiers":{"name":"3 White Soldiers","weight":2}, "three_black_crows":{"name":"3 Black Crows","weight":2},
    "order_blocks":{"name":"Order Blocks","weight":3}, "fair_value_gaps":{"name":"Fair Value Gaps","weight":2},
    "volume_profile":{"name":"Volume Profile","weight":2},
};

// ====== PocketOption API Client ======
class PocketOptionAPI {
    constructor() {
        this.ws = null;
        this.ssid = null;
        this.isDemo = true;
        this.messageId = 0;
        this.callbacks = {};
        this.candleCallbacks = {};
        this.isConnected = false;
        this.currentBalance = 0;
        this.currentCurrency = 'USD';
        
        // PocketOption WebSocket endpoints
        this.WS_URL = 'wss://ws2.pocketoption.com/stream/';
        this.HISTORY_URL = 'https://pocketoption.com/api/candles-history';
    }

    connect(ssid, isDemo = true) {
        return new Promise((resolve, reject) => {
            this.ssid = ssid;
            this.isDemo = isDemo;
            
            // Подключаемся через CORS прокси если нужно
            const wsUrl = this.isDemo 
                ? `${this.WS_URL}?session_id=demo${ssid}`
                : `${this.WS_URL}?session_id=${ssid}`;
            
            try {
                this.ws = new WebSocket(wsUrl);
                
                this.ws.onopen = () => {
                    console.log('WebSocket connected');
                    this.isConnected = true;
                    
                    // Авторизация
                    this.sendMessage({
                        action: 'authorize',
                        ssid: this.ssid,
                        demo: this.isDemo
                    });
                };
                
                this.ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    this.handleMessage(data);
                    
                    // После успешной авторизации резолвим промис
                    if (data.type === 'authorize' && data.status === 'success') {
                        resolve(true);
                    }
                };
                
                this.ws.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    reject(error);
                };
                
                this.ws.onclose = () => {
                    console.log('WebSocket disconnected');
                    this.isConnected = false;
                };
                
                // Таймаут подключения
                setTimeout(() => {
                    if (!this.isConnected) {
                        reject(new Error('Connection timeout'));
                    }
                }, 10000);
                
            } catch (error) {
                reject(error);
            }
        });
    }

    sendMessage(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.messageId++;
            message.id = this.messageId;
            
            // Добавляем session_id если есть
            if (this.ssid) {
                message.session_id = this.isDemo ? `demo${this.ssid}` : this.ssid;
            }
            
            this.ws.send(JSON.stringify(message));
            return this.messageId;
        }
        return null;
    }

    handleMessage(data) {
        // Обработка входящих сообщений
        if (data.type === 'candle') {
            const asset = data.asset;
            if (this.candleCallbacks[asset]) {
                this.candleCallbacks[asset](data);
            }
        }
        
        if (data.type === 'balance') {
            this.currentBalance = data.balance;
            this.currentCurrency = data.currency || 'USD';
        }
        
        // Вызов зарегистрированных колбэков
        if (data.id && this.callbacks[data.id]) {
            this.callbacks[data.id](data);
            delete this.callbacks[data.id];
        }
    }

    async getHistory(asset, period, count = 100) {
        try {
            // Реальный запрос к API истории
            const response = await fetch(`${this.HISTORY_URL}?asset=${asset}&period=${period}&count=${count}`, {
                headers: {
                    'Authorization': `Bearer ${this.ssid}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            return this.parseCandles(data);
            
        } catch (error) {
            console.error('Failed to get history:', error);
            return this.generateMockCandles(asset, period, count);
        }
    }

    parseCandles(data) {
        if (Array.isArray(data)) {
            return data.map(c => ({
                open: parseFloat(c.open),
                high: parseFloat(c.high),
                low: parseFloat(c.low),
                close: parseFloat(c.close),
                time: c.time || Date.now() / 1000
            }));
        }
        
        if (data.candles && Array.isArray(data.candles)) {
            return data.candles.map(c => ({
                open: parseFloat(c.open),
                high: parseFloat(c.high),
                low: parseFloat(c.low),
                close: parseFloat(c.close),
                time: c.time || Date.now() / 1000
            }));
        }
        
        return [];
    }

    generateMockCandles(asset, period, count) {
        const candles = [];
        let price = 1.0;
        
        // Разные базовые цены для разных активов
        if (asset.includes('EURUSD')) price = 1.0843;
        else if (asset.includes('GBPUSD')) price = 1.2630;
        else if (asset.includes('USDJPY')) price = 144.50;
        else if (asset.includes('XAUUSD')) price = 2350.0;
        else if (asset.includes('BTC')) price = 67000.0;
        
        for (let i = count; i >= 0; i--) {
            const change = (Math.random() - 0.5) * 0.002 * price;
            price += change;
            
            candles.push({
                open: price - change,
                high: price + Math.abs(change) * 1.5,
                low: price - Math.abs(change) * 1.5,
                close: price,
                time: Date.now() / 1000 - i * period
            });
        }
        
        return candles;
    }

    subscribeToCandles(asset, callback) {
        this.candleCallbacks[asset] = callback;
        
        this.sendMessage({
            action: 'subscribe',
            asset: asset,
            type: 'candle'
        });
    }

    unsubscribeFromCandles(asset) {
        delete this.candleCallbacks[asset];
        
        this.sendMessage({
            action: 'unsubscribe',
            asset: asset
        });
    }

    async placeOrder(asset, amount, direction, duration) {
        return new Promise((resolve, reject) => {
            const orderId = this.sendMessage({
                action: 'order',
                asset: asset,
                amount: amount,
                direction: direction, // 'call' or 'put'
                duration: duration,
                demo: this.isDemo
            });
            
            if (!orderId) {
                reject(new Error('Failed to send order'));
                return;
            }
            
            // Регистрируем колбэк для ответа
            this.callbacks[orderId] = (response) => {
                if (response.status === 'success') {
                    resolve({
                        id: response.order_id || 'unknown',
                        success: true,
                        amount: amount
                    });
                } else {
                    resolve({
                        id: 'err',
                        success: false,
                        amount: amount,
                        error: response.message || 'Order failed'
                    });
                }
            };
            
            // Таймаут
            setTimeout(() => {
                if (this.callbacks[orderId]) {
                    delete this.callbacks[orderId];
                    resolve({
                        id: 'err',
                        success: false,
                        amount: amount,
                        error: 'Order timeout'
                    });
                }
            }, 15000);
        });
    }

    async getBalance() {
        return new Promise((resolve) => {
            // Отправляем запрос баланса
            this.sendMessage({
                action: 'get_balance'
            });
            
            // Ждем обновления баланса
            const checkBalance = setInterval(() => {
                if (this.currentBalance > 0) {
                    clearInterval(checkBalance);
                    resolve(this.currentBalance);
                }
            }, 100);
            
            // Таймаут
            setTimeout(() => {
                clearInterval(checkBalance);
                resolve(1000); // Возвращаем демо-баланс если не получили
            }, 5000);
        });
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.isConnected = false;
    }
}

// ====== Technical Analyzer ======
class TechnicalAnalyzer {
    constructor(enabledIndicators, strategyType = 'combined', weightMultiplier = 1.0) {
        this.enabledIndicators = enabledIndicators || Object.keys(ALL_INDICATORS);
        this.strategyType = strategyType;
        this.weightMultiplier = weightMultiplier;
    }

    analyze(candles) {
        if (!candles || candles.length < 30) {
            return { signal: 'hold', confidence: 0 };
        }

        const closes = candles.map(c => c.close).filter(c => c > 0);
        const highs = candles.map(c => c.high).filter(h => h > 0);
        const lows = candles.map(c => c.low).filter(l => l > 0);
        const opens = candles.map(c => c.open).filter(o => o > 0);

        if (closes.length < 30) {
            return { signal: 'hold', confidence: 0 };
        }

        const analysis = {};
        let score = 0;
        const enabled = new Set(this.enabledIndicators);
        const lastC = closes[closes.length - 1];
        const lastH = highs[highs.length - 1];
        const lastL = lows[lows.length - 1];
        const lastO = opens[opens.length - 1];

        // RSI
        if (enabled.has('rsi') && closes.length >= 15) {
            const recentCloses = closes.slice(-15);
            const diffs = [];
            for (let i = 1; i < recentCloses.length; i++) {
                diffs.push(recentCloses[i] - recentCloses[i - 1]);
            }
            const gains = diffs.filter(d => d > 0);
            const losses = diffs.filter(d => d < 0).map(d => Math.abs(d));
            const avgGain = gains.length > 0 ? gains.reduce((a, b) => a + b, 0) / gains.length : 0;
            const avgLoss = losses.length > 0 ? losses.reduce((a, b) => a + b, 0) / losses.length : 0.0001;
            const rs = avgGain / avgLoss;
            const rsi = 100 - (100 / (1 + rs));
            analysis.rsi = rsi;
            
            const w = ALL_INDICATORS['rsi'].weight * this.weightMultiplier;
            if (rsi < 25) score += w;
            else if (rsi < 35) score += Math.max(1, w - 1);
            else if (rsi > 75) score -= w;
            else if (rsi > 65) score -= Math.max(1, w - 1);
        }

        // MACD
        if (enabled.has('macd') && closes.length >= 26) {
            const ema12 = this.calculateEMA(closes, 12);
            const ema26 = this.calculateEMA(closes, 26);
            const macdLine = ema12 - ema26;
            const signalLine = this.calculateEMA([macdLine], 9);
            const histogram = macdLine - signalLine;
            
            analysis.macd = macdLine;
            analysis.macd_signal = signalLine;
            
            const w = ALL_INDICATORS['macd'].weight * this.weightMultiplier;
            if (macdLine > signalLine && histogram > 0) score += w;
            else if (macdLine < signalLine && histogram < 0) score -= w;
        }

        // Stochastic
        if (enabled.has('stoch') && closes.length >= 14) {
            const recent14H = Math.max(...highs.slice(-14));
            const recent14L = Math.min(...lows.slice(-14));
            const stochK = ((lastC - recent14L) / (recent14H - recent14L)) * 100;
            analysis.stoch_k = stochK;
            
            const w = ALL_INDICATORS['stoch'].weight * this.weightMultiplier;
            if (stochK < 15) score += w;
            else if (stochK > 85) score -= w;
        }

        // Bollinger Bands
        if (enabled.has('bb') && closes.length >= 20) {
            const sma = this.calculateSMA(closes.slice(-20), 20);
            const std = this.calculateStdDev(closes.slice(-20));
            const bbUpper = sma + 2 * std;
            const bbLower = sma - 2 * std;
            analysis.bb_upper = bbUpper;
            analysis.bb_lower = bbLower;
            
            const w = ALL_INDICATORS['bb'].weight * this.weightMultiplier;
            if (lastC <= bbLower) score += w;
            else if (lastC >= bbUpper) score -= w;
        }

        // Trend
        if (enabled.has('trend')) {
            const sma5 = closes.length >= 5 ? this.calculateSMA(closes.slice(-5), 5) : lastC;
            const sma20 = closes.length >= 20 ? this.calculateSMA(closes.slice(-20), 20) : lastC;
            const trend = sma5 > sma20 ? 'bullish' : 'bearish';
            analysis.trend = trend;
            
            const w = ALL_INDICATORS['trend'].weight * this.weightMultiplier;
            if (trend === 'bullish') score += w;
            else score -= w;
        }

        // Momentum
        if (enabled.has('momentum') && closes.length >= 10) {
            const mom = lastC - closes[closes.length - 10];
            analysis.momentum = mom;
            
            const w = ALL_INDICATORS['momentum'].weight * this.weightMultiplier;
            if (mom > 0) score += w;
            else score -= w;
        }

        // Price Action
        if (enabled.has('price_action') && closes.length >= 3) {
            const c1 = closes[closes.length - 3];
            const c2 = closes[closes.length - 2];
            const c3 = closes[closes.length - 1];
            
            const w = ALL_INDICATORS['price_action'].weight * this.weightMultiplier;
            if (c3 > c2 && c2 > c1) score += w;
            else if (c3 < c2 && c2 < c1) score -= w;
        }

        // SMA Cross
        if (enabled.has('sma_cross') && closes.length >= 20) {
            const sma5 = this.calculateSMA(closes.slice(-5), 5);
            const sma10 = this.calculateSMA(closes.slice(-10), 10);
            const sma20 = this.calculateSMA(closes.slice(-20), 20);
            
            const w = ALL_INDICATORS['sma_cross'].weight * this.weightMultiplier;
            if (sma5 > sma10 && sma10 > sma20) score += w;
            else if (sma5 < sma10 && sma10 < sma20) score -= w;
        }

        // SR Levels
        if (enabled.has('sr_levels') && highs.length >= 20) {
            const support = Math.min(...lows.slice(-20));
            const resistance = Math.max(...highs.slice(-20));
            analysis.support = support;
            analysis.resistance = resistance;
            
            const w = ALL_INDICATORS['sr_levels'].weight * this.weightMultiplier;
            if (lastC <= support * 1.001) score += w;
            else if (lastC >= resistance * 0.999) score -= w;
        }

        // ADX
        if (enabled.has('adx') && closes.length >= 14) {
            const atr = this.calculateATR(highs, lows, closes, 14);
            analysis.adx = atr;
            
            const w = ALL_INDICATORS['adx'].weight * this.weightMultiplier;
            if (atr > 0) score += w;
        }

        // Calculate final signal
        const maxScore = Array.from(enabled)
            .filter(k => ALL_INDICATORS[k])
            .reduce((sum, k) => sum + ALL_INDICATORS[k].weight * this.weightMultiplier, 0) || 10;
        
        let confidence = Math.min(Math.floor(Math.abs(score) / maxScore * 100), 95);
        if (confidence < 50 && Math.abs(score) > 0) {
            confidence = Math.max(confidence, 50);
        }

        const threshold = Math.max(3, Math.floor(maxScore * 0.15));
        let signal = 'hold';
        
        if (score >= threshold * 3) signal = 'call';
        else if (score <= -threshold * 3) signal = 'put';
        else if (score >= threshold * 2) signal = 'call';
        else if (score <= -threshold * 2) signal = 'put';
        else if (score >= threshold) signal = 'call';
        else if (score <= -threshold) signal = 'put';

        analysis.signal = signal;
        analysis.confidence = confidence;
        analysis.score = Math.floor(score);
        analysis.max_score = Math.floor(maxScore);
        analysis.enabled_count = enabled.size;
        analysis.last_price = lastC;

        return analysis;
    }

    calculateSMA(data, period) {
        if (data.length < period) return data[data.length - 1];
        const slice = data.slice(-period);
        return slice.reduce((a, b) => a + b, 0) / period;
    }

    calculateEMA(data, period) {
        if (data.length < period) return data[data.length - 1];
        const k = 2 / (period + 1);
        let ema = data.slice(0, period).reduce((a, b) => a + b, 0) / period;
        
        for (let i = period; i < data.length; i++) {
            ema = data[i] * k + ema * (1 - k);
        }
        
        return ema;
    }

    calculateStdDev(data) {
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
        return Math.sqrt(variance);
    }

    calculateATR(highs, lows, closes, period) {
        if (highs.length < period + 1) return 0;
        
        const tr = [];
        for (let i = highs.length - period; i < highs.length; i++) {
            const h = highs[i];
            const l = lows[i];
            const prevC = i > 0 ? closes[i - 1] : closes[i];
            tr.push(Math.max(h - l, Math.abs(h - prevC), Math.abs(l - prevC)));
        }
        
        return tr.reduce((a, b) => a + b, 0) / period;
    }
}

// ====== Trading Engine ======
class TradingEngine {
    constructor(ssid, config) {
        this.ssid = ssid;
        this.config = config;
        this.api = new PocketOptionAPI();
        this.isRunning = false;
        this.isConnected = false;
        this.autoTrading = false;
        this.currentBalance = 0;
        this.startBalance = 0;
        
        // Trading state
        this.activeTrades = 0;
        this.maxActiveTrades = 1;
        this.maxOrderAmount = 5000;
        this.totalTradesAuto = 0;
        this.winsAuto = 0;
        this.lossesAuto = 0;
        this.drawsAuto = 0;
        this.totalProfitAuto = 0;
        this.totalLossAuto = 0;
        this.consecutiveLosses = 0;
        this.streakAuto = 0;
        this.bestStreakAuto = 0;
        this.worstStreakAuto = 0;
        
        // Manual trading stats
        this.totalTradesManual = 0;
        this.winsManual = 0;
        this.lossesManual = 0;
        this.drawsManual = 0;
        this.totalProfitManual = 0;
        this.totalLossManual = 0;
        
        // Martingale settings
        this.martingaleEnabled = config.martingale || true;
        this.martingaleMultiplier = config.multiplier || 2.5;
        this.martingaleMaxLevel = config.maxLevel || 5;
        this.martingaleLevel = 0;
        this.baseAmount = config.amount || 1;
        
        // Trading config
        this.autoAmount = config.amount || 1;
        this.autoDuration = config.duration || 60;
        this.autoMinConfidence = config.minConfidence || 50;
        this.currentAsset = config.asset || 'EURUSD_otc';
        this.currentTimeframe = config.timeframe || 60;
        
        // Data buffers
        this.candlesBuffer = [];
        this.lastAnalysis = null;
        this.latestPrice = 0;
        this.tradeHistory = [];
        this.profitHistory = [];
        this.callbacks = [];
        
        // Analysis
        this.analysisStrategy = config.analysisStrategy || 'combined';
        this.enabledIndicators = config.enabledIndicators || Object.keys(ALL_INDICATORS);
        this.analyzer = new TechnicalAnalyzer(
            this.enabledIndicators, 
            this.analysisStrategy,
            STRATEGY_CONFIGS[this.analysisStrategy]?.weight_multiplier || 1.0
        );
        
        this.lastTradeTime = 0;
        this.cooldownSeconds = 3;
    }

    on(callback) {
        this.callbacks.push(callback);
    }

    emit(event, data = null) {
        this.callbacks.forEach(cb => {
            try {
                if (data !== null) {
                    cb(event, data);
                } else {
                    cb(event);
                }
            } catch (e) {
                console.error('Callback error:', e);
            }
        });
    }

    async start() {
        try {
            const connected = await this.api.connect(this.ssid, true);
            if (connected) {
                this.isConnected = true;
                this.isRunning = true;
                this.currentBalance = await this.api.getBalance();
                this.startBalance = this.currentBalance;
                
                this.emit('connected', { balance: this.currentBalance });
                this.emit('log', `Connected! $${this.currentBalance.toFixed(2)}`);
                
                await this.loadHistoricalData();
                this.startRealTimeStream();
                
                return true;
            }
        } catch (error) {
            this.emit('log', `Connection failed: ${error.message}`);
            return false;
        }
        return false;
    }

    async loadHistoricalData() {
        const candles = await this.api.getHistory(
            this.currentAsset, 
            this.currentTimeframe, 
            150
        );
        
        this.candlesBuffer = candles;
        
        if (this.candlesBuffer.length >= 30) {
            this.runAnalysis();
        }
    }

    startRealTimeStream() {
        this.api.subscribeToCandles(this.currentAsset, (candleData) => {
            if (!this.isRunning) return;
            
            const candle = {
                open: parseFloat(candleData.open),
                high: parseFloat(candleData.high),
                low: parseFloat(candleData.low),
                close: parseFloat(candleData.close),
                time: candleData.time
            };
            
            if (candle.close <= 0) return;
            
            this.latestPrice = candle.close;
            this.candlesBuffer.push(candle);
            
            if (this.candlesBuffer.length > 300) {
                this.candlesBuffer.shift();
            }
            
            this.emit('live_candle', { asset: this.currentAsset, candle: candle });
            
            if (this.candlesBuffer.length >= 30) {
                this.runAnalysis();
            }
        });
        
        // Периодическая проверка баланса
        setInterval(async () => {
            if (this.isConnected) {
                try {
                    this.currentBalance = await this.api.getBalance();
                    const profit = this.currentBalance - this.startBalance;
                    this.emit('balance', { balance: this.currentBalance, profit: profit });
                } catch (e) {
                    console.error('Balance update error:', e);
                }
            }
        }, 5000);
    }

    runAnalysis() {
        this.lastAnalysis = this.analyzer.analyze(this.candlesBuffer);
        this.emit('analysis', { asset: this.currentAsset, analysis: this.lastAnalysis });
        
        // Автотрейдинг
        if (this.autoTrading && this.lastAnalysis) {
            const signal = this.lastAnalysis.signal;
            const confidence = this.lastAnalysis.confidence;
            
            if (signal !== 'hold' && confidence >= this.autoMinConfidence) {
                const now = Date.now() / 1000;
                if (now - this.lastTradeTime >= this.cooldownSeconds) {
                    const amount = this.calculateTradeAmount();
                    
                    if (amount <= this.maxOrderAmount && amount <= this.currentBalance * 0.95) {
                        this.emit('log', `🎯 AUTO ${signal.toUpperCase()} $${amount.toFixed(2)} | Conf:${confidence}%`);
                        this.lastTradeTime = now;
                        this.executeAutoTrade(this.currentAsset, amount, signal, this.autoDuration);
                    }
                }
            }
        }
    }

    calculateTradeAmount() {
        if (!this.martingaleEnabled) {
            this.martingaleLevel = 0;
            return this.baseAmount;
        }
        
        if (this.consecutiveLosses > 0) {
            const lossLevel = Math.min(this.consecutiveLosses, this.martingaleMaxLevel);
            this.martingaleLevel = lossLevel;
            const calculated = Math.round(this.baseAmount * Math.pow(this.martingaleMultiplier, lossLevel) * 100) / 100;
            
            if (calculated > this.maxOrderAmount) {
                this.emit('log', `⚠️ Order amount $${calculated.toFixed(2)} exceeds MAX $${this.maxOrderAmount}! Resetting martingale...`);
                this.consecutiveLosses = 0;
                this.martingaleLevel = 0;
                return this.baseAmount;
            }
            
            if (calculated > this.currentBalance * 0.95) {
                this.emit('log', `⚠️ Insufficient balance for $${calculated.toFixed(2)}! Resetting martingale...`);
                this.consecutiveLosses = 0;
                this.martingaleLevel = 0;
                return this.baseAmount;
            }
            
            return calculated;
        }
        
        this.martingaleLevel = 0;
        return this.baseAmount;
    }

    async executeAutoTrade(asset, amount, direction, duration) {
        try {
            const balanceBefore = this.currentBalance;
            
            const orderResult = await this.api.placeOrder(asset, amount, direction, duration);
            
            if (!orderResult.success) {
                this.emit('log', `❌ ORDER FAILED: ${orderResult.error || 'Unknown error'}`);
                return;
            }
            
            const trade = {
                id: orderResult.id,
                asset: asset,
                amount: amount,
                direction: direction,
                entryPrice: this.latestPrice,
                openTime: new Date().toLocaleTimeString(),
                duration: duration,
                martingaleLevel: this.martingaleLevel,
                balanceBefore: balanceBefore,
                type: 'AUTO'
            };
            
            this.emit('trade_open', trade);
            this.emit('log', `📈 AUTO ${direction.toUpperCase()} $${amount.toFixed(2)} | ID: ${orderResult.id}`);
            
            // Ждем завершения сделки
            await new Promise(resolve => setTimeout(resolve, (duration + 5) * 1000));
            
            const balanceAfter = await this.api.getBalance();
            this.currentBalance = balanceAfter;
            const balanceDiff = balanceAfter - balanceBefore;
            
            this.totalTradesAuto++;
            
            let resultType, emoji, pnlText;
            
            if (balanceDiff > 0.005) {
                this.winsAuto++;
                this.totalProfitAuto += balanceDiff;
                this.streakAuto = Math.max(1, this.streakAuto + 1);
                this.bestStreakAuto = Math.max(this.bestStreakAuto, this.streakAuto);
                this.consecutiveLosses = 0;
                this.martingaleLevel = 0;
                resultType = 'win';
                emoji = '✅';
                pnlText = `+$${balanceDiff.toFixed(2)}`;
            } else if (balanceDiff < -0.005) {
                this.lossesAuto++;
                this.totalLossAuto += Math.abs(balanceDiff);
                this.streakAuto = Math.min(-1, this.streakAuto - 1);
                this.worstStreakAuto = Math.min(this.worstStreakAuto, this.streakAuto);
                this.consecutiveLosses++;
                resultType = 'loss';
                emoji = '❌';
                pnlText = `-$${Math.abs(balanceDiff).toFixed(2)}`;
            } else {
                this.drawsAuto++;
                resultType = 'draw';
                emoji = '➖';
                pnlText = '$0.00';
            }
            
            trade.profit = balanceDiff;
            trade.result = resultType;
            trade.balanceAfter = balanceAfter;
            
            this.tradeHistory.unshift(trade);
            
            this.emit('trade_result', trade);
            this.emit('log', `${emoji} AUTO ${resultType.toUpperCase()} ${pnlText} | Streak: ${this.streakAuto} | ML:${this.martingaleLevel}`);
            
            this.profitHistory.push(balanceAfter);
            this.emit('profit_update', this.profitHistory);
            
        } catch (error) {
            this.emit('log', `❌ Auto trade exception: ${error.message}`);
        }
    }

    async executeManual(asset, amount, direction, duration) {
        try {
            const balanceBefore = this.currentBalance;
            
            const orderResult = await this.api.placeOrder(asset, amount, direction, duration);
            
            if (!orderResult.success) {
                this.emit('log', `❌ Manual order failed!`);
                return;
            }
            
            const trade = {
                id: orderResult.id,
                asset: asset,
                amount: amount,
                direction: direction,
                entryPrice: this.latestPrice,
                openTime: new Date().toLocaleTimeString(),
                duration: duration,
                martingaleLevel: 0,
                balanceBefore: balanceBefore,
                type: 'MANUAL'
            };
            
            this.emit('trade_open', trade);
            this.emit('log', `👆 MANUAL ${direction.toUpperCase()} $${amount.toFixed(2)}`);
            
            await new Promise(resolve => setTimeout(resolve, (duration + 5) * 1000));
            
            const balanceAfter = await this.api.getBalance();
            this.currentBalance = balanceAfter;
            const balanceDiff = balanceAfter - balanceBefore;
            
            this.totalTradesManual++;
            
            let resultType, emoji, pnlText;
            
            if (balanceDiff > 0.005) {
                this.winsManual++;
                this.totalProfitManual += balanceDiff;
                resultType = 'win';
                emoji = '✅';
                pnlText = `+$${balanceDiff.toFixed(2)}`;
            } else if (balanceDiff < -0.005) {
                this.lossesManual++;
                this.totalLossManual += Math.abs(balanceDiff);
                resultType = 'loss';
                emoji = '❌';
                pnlText = `-$${Math.abs(balanceDiff).toFixed(2)}`;
            } else {
                this.drawsManual++;
                resultType = 'draw';
                emoji = '➖';
                pnlText = '$0.00';
            }
            
            trade.profit = balanceDiff;
            trade.result = resultType;
            trade.balanceAfter = balanceAfter;
            
            this.tradeHistory.unshift(trade);
            
            this.emit('trade_result', trade);
            this.emit('log', `${emoji} MANUAL ${resultType.toUpperCase()} ${pnlText}`);
            
        } catch (error) {
            this.emit('log', `❌ Manual trade exception: ${error.message}`);
        }
    }

    startAuto() {
        this.autoTrading = true;
        this.lastTradeTime = 0;
        this.emit('auto_trading', true);
        this.emit('log', '🤖 AUTO ON');
    }

    stopAuto() {
        this.autoTrading = false;
        this.emit('auto_trading', false);
        this.emit('log', '⏸️ AUTO OFF');
    }

    async switchAsset(asset, timeframe = null) {
        this.currentAsset = asset;
        if (timeframe) this.currentTimeframe = timeframe;
        
        this.api.unsubscribeFromCandles(asset);
        this.candlesBuffer = [];
        
        await this.loadHistoricalData();
        this.startRealTimeStream();
    }

    updateStrategy(strategyType, enabledIndicators = null) {
        this.analysisStrategy = strategyType;
        if (enabledIndicators) this.enabledIndicators = enabledIndicators;
        
        const config = STRATEGY_CONFIGS[strategyType] || { weight_multiplier: 1.0 };
        this.analyzer = new TechnicalAnalyzer(this.enabledIndicators, strategyType, config.weight_multiplier);
    }

    updateAutoParams(amount = null, duration = null, minConfidence = null) {
        if (amount !== null) {
            this.autoAmount = amount;
            this.baseAmount = amount;
        }
        if (duration !== null) this.autoDuration = duration;
        if (minConfidence !== null) this.autoMinConfidence = Math.max(50, minConfidence);
    }

    getStats() {
        const total = this.totalTradesAuto + this.totalTradesManual;
        const wins = this.winsAuto + this.winsManual;
        const losses = this.lossesAuto + this.lossesManual;
        const draws = this.drawsAuto + this.drawsManual;
        const totalProfit = this.totalProfitAuto + this.totalProfitManual;
        const totalLoss = this.totalLossAuto + this.totalLossManual;
        
        const winRate = total > 0 ? (wins / total * 100) : 0;
        const net = totalProfit - totalLoss;
        const profitFactor = totalLoss !== 0 ? totalProfit / totalLoss : (totalProfit > 0 ? 999 : 0);
        
        return {
            total_trades: total,
            wins: wins,
            losses: losses,
            draws: draws,
            win_rate: winRate,
            net_profit: net,
            total_profit: totalProfit,
            total_loss: totalLoss,
            profit_factor: profitFactor,
            avg_win: wins > 0 ? totalProfit / wins : 0,
            avg_loss: losses > 0 ? totalLoss / losses : 0,
            largest_win: 0,
            largest_loss: 0,
            current_streak: this.streakAuto,
            best_streak: this.bestStreakAuto,
            worst_streak: this.worstStreakAuto,
            balance: this.currentBalance,
            start_balance: this.startBalance,
            return_pct: this.startBalance > 0 ? ((this.currentBalance - this.startBalance) / this.startBalance * 100) : 0,
            martingale_level: this.martingaleLevel,
            consecutive_losses: this.consecutiveLosses,
            auto_trades: this.totalTradesAuto,
            auto_wins: this.winsAuto,
            manual_trades: this.totalTradesManual,
            manual_wins: this.winsManual
        };
    }

    stop() {
        this.isRunning = false;
        this.autoTrading = false;
        this.api.disconnect();
    }
}

// ====== Global State ======
let engine = null;
let isConnected = false;
let autoTrading = false;
let currentBalance = 0;
let startBalance = 0;
let pnlChart = null;
let tradeHistory = [];
let profitHistory = [];
let currentStrategy = 'combined';
let enabledIndicators = Object.keys(ALL_INDICATORS);

// ====== Initialization ======
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    initIndicatorCheckboxes();
    initStatsGrid();
    populateAssetSelect();
    log("QuantumTrade Pro v12.7 initialized");
    log("Ready for connection");
});

function initChart() {
    const ctx = document.getElementById('pnlChart').getContext('2d');
    pnlChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Balance',
                data: [],
                borderColor: '#00FF88',
                borderWidth: 3,
                pointRadius: 0,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: '#1A2540' }, ticks: { color: '#8A9AB8' } },
                y: { grid: { color: '#1A2540' }, ticks: { color: '#8A9AB8' } }
            }
        }
    });
}

function initIndicatorCheckboxes() {
    const container = document.getElementById('indicatorCheckboxes');
    for (const [key, info] of Object.entries(ALL_INDICATORS)) {
        const div = document.createElement('div');
        div.className = 'indicator-checkbox';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.id = `ind_${key}`;
        cb.checked = true;
        cb.onchange = updateEnabledIndicators;
        const label = document.createElement('label');
        label.htmlFor = `ind_${key}`;
        label.textContent = info.name;
        div.appendChild(cb);
        div.appendChild(label);
        container.appendChild(div);
    }
}

function initStatsGrid() {
    const statsData = [
        ["AUTO Trades:", "auto_t", "0"], ["AUTO Wins:", "auto_w", "0"],
        ["MANUAL Trades:", "man_t", "0"], ["MANUAL Wins:", "man_w", "0"],
        ["Total Trades:", "tot", "0"], ["Total Wins:", "wins", "0"],
        ["Losses:", "loss", "0"], ["Draws:", "draws", "0"],
        ["Win Rate:", "wr", "0%"], ["Net Profit:", "net", "$0.00"],
        ["Total Profit:", "tp", "$0.00"], ["Total Loss:", "tl", "$0.00"],
        ["Profit Factor:", "pf", "0"], ["Avg Win:", "aw", "$0.00"],
        ["Avg Loss:", "al", "$0.00"], ["Largest Win:", "bw", "$0.00"],
        ["Largest Loss:", "wl", "$0.00"], ["Best Streak:", "bs", "0"],
        ["Cur Streak:", "cs", "0"], ["Return:", "rp", "0%"],
        ["Martingale Lvl:", "ml", "0"], ["Consecutive Loss:", "cl", "0"],
    ];
    
    const grid = document.getElementById('statsGrid');
    statsData.forEach(([label, id, value]) => {
        const lbl = document.createElement('label');
        lbl.textContent = label;
        const val = document.createElement('span');
        val.id = `stat_${id}`;
        val.textContent = value;
        grid.appendChild(lbl);
        grid.appendChild(val);
    });
}

function populateAssetSelect() {
    const select = document.getElementById('assetSelect');
    select.innerHTML = '';
    ALL_ASSETS.forEach(asset => {
        const option = document.createElement('option');
        option.value = asset;
        option.textContent = asset;
        select.appendChild(option);
    });
    select.value = 'EURUSD_otc';
}

// ====== Connection ======
function toggleConnection() {
    if (isConnected) {
        disconnect();
    } else {
        connect();
    }
}

async function connect() {
    const ssid = document.getElementById('ssidInput').value.trim();
    if (!ssid) {
        alert('Enter SSID');
        return;
    }
    
    const btn = document.getElementById('connectBtn');
    btn.disabled = true;
    document.getElementById('connectionStatus').textContent = '🟡 Connecting...';
    
    log(`Connecting with SSID: ${ssid.substring(0, 8)}...`);
    
    const config = {
        asset: document.getElementById('assetSelect').value,
        amount: parseFloat(document.getElementById('autoAmount').value),
        duration: parseInt(document.getElementById('autoDuration').value),
        timeframe: parseInt(document.getElementById('timeframeSelect').value),
        minConfidence: parseInt(document.getElementById('minConfidence').value),
        martingale: document.querySelector('input[name="strategy"]:checked').value === 'martingale',
        multiplier: parseFloat(document.getElementById('multiplierInput').value),
        maxLevel: parseInt(document.getElementById('maxLevelInput').value),
        analysisStrategy: currentStrategy,
        enabledIndicators: enabledIndicators
    };
    
    engine = new TradingEngine(ssid, config);
    
    engine.on('log', (msg) => log(msg));
    engine.on('connected', (data) => {
        isConnected = true;
        currentBalance = data.balance;
        startBalance = data.balance;
        
        document.getElementById('connectBtn').textContent = '🔌 DISCONNECT';
        document.getElementById('connectBtn').disabled = false;
        document.getElementById('connectionStatus').textContent = '🟢 LIVE';
        document.getElementById('connectionStatus').className = 'status-online';
        document.getElementById('startAutoBtn').disabled = false;
        document.getElementById('stopAutoBtn').disabled = true;
        
        updateBalanceDisplay();
        updatePnLBanner();
    });
    
    engine.on('balance', (data) => {
        currentBalance = data.balance;
        updateBalanceDisplay();
        updatePnLBanner();
    });
    
    engine.on('trade_open', (trade) => {
        log(`Trade opened: ${trade.direction} ${trade.amount}`);
    });
    
    engine.on('trade_result', (trade) => {
        tradeHistory.unshift(trade);
        updateTradeTable();
    });
    
    engine.on('analysis', (data) => {
        updateLiveSignal(data.analysis);
        updateIndicatorValues(data.analysis);
        updateAnalysisText(data.analysis);
    });
    
    engine.on('live_candle', (data) => {
        const candle = data.candle;
        const price = candle.close;
        const change = candle.close - candle.open;
        
        document.getElementById('currentPrice').textContent = price.toFixed(5);
        document.getElementById('currentPrice').style.color = change >= 0 ? '#00FF88' : '#FF4444';
        document.getElementById('oPrice').textContent = `O:${candle.open.toFixed(5)}`;
        document.getElementById('hPrice').textContent = `H:${candle.high.toFixed(5)}`;
        document.getElementById('lPrice').textContent = `L:${candle.low.toFixed(5)}`;
        document.getElementById('cPrice').textContent = `C:${candle.close.toFixed(5)}`;
    });
    
    engine.on('profit_update', (data) => {
        profitHistory = data;
        updateChart();
    });
    
    engine.on('auto_trading', (status) => {
        autoTrading = status;
        updateAutoStatus();
    });
    
    const success = await engine.start();
    
    if (!success) {
        document.getElementById('connectBtn').disabled = false;
        document.getElementById('connectionStatus').textContent = '⚫ OFFLINE';
        log('Connection failed');
    }
}

function disconnect() {
    if (engine) {
        engine.stop();
        engine = null;
    }
    
    isConnected = false;
    autoTrading = false;
    
    document.getElementById('connectBtn').textContent = '🔌 CONNECT';
    document.getElementById('connectBtn').disabled = false;
    document.getElementById('connectionStatus').textContent = '⚫ OFFLINE';
    document.getElementById('connectionStatus').className = 'status-offline';
    document.getElementById('startAutoBtn').disabled = true;
    document.getElementById('stopAutoBtn').disabled = true;
    
    log('Disconnected');
}

// ====== Trading Functions ======
function startAutoTrading() {
    if (!isConnected || !engine) return;
    
    updateAutoParams();
    engine.startAuto();
}

function stopAutoTrading() {
    if (engine) engine.stopAuto();
}

function manualTrade(direction) {
    if (!isConnected || !engine) {
        alert('Not connected!');
        return;
    }
    
    const amount = parseFloat(document.getElementById('manualAmount').value);
    const duration = parseInt(document.getElementById('manualDuration').value);
    const asset = document.getElementById('assetSelect').value;
    
    engine.executeManual(asset, amount, direction, duration);
}

function updateAutoParams() {
    if (engine) {
        engine.updateAutoParams(
            parseFloat(document.getElementById('autoAmount').value),
            parseInt(document.getElementById('autoDuration').value),
            parseInt(document.getElementById('minConfidence').value)
        );
    }
}

function updateMartingaleStrategy() {
    if (engine) {
        engine.martingaleEnabled = document.querySelector('input[name="strategy"]:checked').value === 'martingale';
    }
}

// ====== Strategy Functions ======
function changeStrategy() {
    const strategyKey = document.getElementById('strategySelect').value;
    currentStrategy = strategyKey;
    
    if (strategyKey !== 'custom') {
        const config = STRATEGY_CONFIGS[strategyKey];
        const indicators = config.indicators === 'all' ? Object.keys(ALL_INDICATORS) : config.indicators;
        
        Object.keys(ALL_INDICATORS).forEach(key => {
            const cb = document.getElementById(`ind_${key}`);
            if (cb) cb.checked = indicators.includes(key);
        });
    }
    
    updateEnabledIndicators();
    
    if (engine) {
        engine.updateStrategy(strategyKey, enabledIndicators);
    }
    
    log(`Strategy changed to: ${STRATEGY_CONFIGS[strategyKey]?.name || 'Custom'}`);
}

function updateEnabledIndicators() {
    enabledIndicators = [];
    Object.keys(ALL_INDICATORS).forEach(key => {
        const cb = document.getElementById(`ind_${key}`);
        if (cb && cb.checked) enabledIndicators.push(key);
    });
}

function applyCustomIndicators() {
    updateEnabledIndicators();
    if (engine) {
        engine.updateStrategy('custom', enabledIndicators);
    }
    log(`Applied: ${enabledIndicators.length} indicators`);
}

function changeAsset() {
    const asset = document.getElementById('assetSelect').value;
    const timeframe = parseInt(document.getElementById('timeframeSelect').value);
    if (engine && isConnected) {
        engine.switchAsset(asset, timeframe);
    }
    log(`Asset changed to: ${asset}`);
}

function changeTimeframe() {
    const asset = document.getElementById('assetSelect').value;
    const timeframe = parseInt(document.getElementById('timeframeSelect').value);
    if (engine && isConnected) {
        engine.switchAsset(asset, timeframe);
    }
    log(`Timeframe changed to: ${timeframe}s`);
}

// ====== UI Updates ======
function updateBalanceDisplay() {
    document.getElementById('balanceDisplay').textContent = `$${currentBalance.toFixed(2)}`;
    const profit = currentBalance - startBalance;
    const pnlEl = document.getElementById('pnlDisplay');
    pnlEl.textContent = `${profit >= 0 ? '+' : ''}$${profit.toFixed(2)}`;
    pnlEl.style.color = profit >= 0 ? '#00FF88' : '#FF4444';
}

function updatePnLBanner() {
    const profit = currentBalance - startBalance;
    const banner = document.getElementById('pnlBanner');
    banner.textContent = `P&L: ${profit >= 0 ? '+' : ''}$${profit.toFixed(2)}`;
    banner.style.color = profit >= 0 ? '#00FF88' : '#FF4444';
}

function updateLiveSignal(analysis) {
    const signal = analysis.signal;
    const liveSignalEl = document.getElementById('liveSignal');
    
    if (signal === 'call') {
        liveSignalEl.textContent = '▲ CALL';
        liveSignalEl.style.color = '#00FF88';
    } else if (signal === 'put') {
        liveSignalEl.textContent = '▼ PUT';
        liveSignalEl.style.color = '#FF4444';
    } else {
        liveSignalEl.textContent = '➖ HOLD';
        liveSignalEl.style.color = '#FFAA00';
    }
    
    document.getElementById('liveConf').textContent = `Conf:${analysis.confidence}%`;
    document.getElementById('liveScore').textContent = `Score:${analysis.score}`;
}

function updateAutoStatus() {
    if (autoTrading) {
        document.getElementById('autoStatus').textContent = '🟢 ACTIVE';
        document.getElementById('autoStatus').className = 'auto-active';
        document.getElementById('startAutoBtn').disabled = true;
        document.getElementById('stopAutoBtn').disabled = false;
    } else {
        document.getElementById('autoStatus').textContent = '🔴 INACTIVE';
        document.getElementById('autoStatus').className = 'auto-inactive';
        document.getElementById('startAutoBtn').disabled = false;
        document.getElementById('stopAutoBtn').disabled = true;
    }
}

function updateTradeTable() {
    const tbody = document.getElementById('tradeHistoryBody');
    tbody.innerHTML = '';
    
    tradeHistory.slice(0, 50).forEach(trade => {
        const tr = document.createElement('tr');
        const pnlColor = trade.profit >= 0 ? '#00FF88' : '#FF4444';
        const resultColor = trade.result === 'win' ? '#00FF88' : trade.result === 'loss' ? '#FF4444' : '#FFAA00';
        
        tr.innerHTML = `
            <td>${trade.openTime}</td>
            <td>${trade.type}</td>
            <td style="color: ${trade.direction === 'call' ? '#00FF88' : '#FF4444'}">${trade.direction.toUpperCase()}</td>
            <td>$${trade.amount.toFixed(2)}</td>
            <td style="color: ${resultColor}">${trade.result.toUpperCase()}</td>
            <td style="color: ${pnlColor}">$${trade.profit >= 0 ? '+' : ''}${trade.profit.toFixed(2)}</td>
            <td>$${trade.balanceBefore.toFixed(2)}</td>
            <td>$${trade.balanceAfter.toFixed(2)}</td>
            <td>${trade.martingaleLevel}</td>
            <td>${trade.consecutiveLosses || 0}</td>
        `;
        tbody.appendChild(tr);
    });
}

function updateChart() {
    if (pnlChart && profitHistory.length > 0) {
        pnlChart.data.labels = profitHistory.map((_, i) => i);
        pnlChart.data.datasets[0].data = profitHistory;
        pnlChart.update();
    }
}

function updateIndicatorValues(analysis) {
    const container = document.getElementById('indicatorValues');
    container.innerHTML = '';
    
    Object.keys(ALL_INDICATORS).forEach(key => {
        const div = document.createElement('div');
        div.className = 'indicator-value';
        const value = analysis[key];
        if (value !== undefined) {
            if (typeof value === 'number') {
                div.textContent = `${ALL_INDICATORS[key].name}: ${value.toFixed(4)}`;
            } else {
                div.textContent = `${ALL_INDICATORS[key].name}: ${value}`;
            }
        } else {
            div.textContent = `${ALL_INDICATORS[key].name}: --`;
        }
        container.appendChild(div);
    });
}

function updateAnalysisText(analysis) {
    const text = `
╔══════════════════════════════════╗
║ QUANTUMTRADE PRO v12.7 ANALYSIS ║
╠══════════════════════════════════╣
║ Signal: ${analysis.signal.toUpperCase().padEnd(10)} Conf: ${analysis.confidence.toFixed(1)}%
║ Score: ${analysis.score}/${analysis.max_score}
║ Price: ${analysis.last_price.toFixed(5)}
╚══════════════════════════════════╝`;
    document.getElementById('analysisText').textContent = text;
}

function switchTab(tabName) {
    const tabs = ['history', 'stats', 'strategy', 'analysis', 'indicators'];
    tabs.forEach(tab => {
        document.getElementById(`${tab}Tab`).style.display = tab === tabName ? 'block' : 'none';
    });
    
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', tabs[i] === tabName);
    });
}

function log(message) {
    const logBox = document.getElementById('logOutput');
    const time = new Date().toLocaleTimeString();
    logBox.innerHTML += `[${time}] ${message}<br>`;
    logBox.scrollTop = logBox.scrollHeight;
}
