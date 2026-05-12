// QuantumTrade Pro v12.7 - Working Real API Connection
console.log("=".repeat(70));
console.log("QuantumTrade Pro v12.7 - Real API Connection");
console.log("=".repeat(70));

// ====== Configuration ======
const ALL_ASSETS = [
    "EURUSD_otc", "GBPUSD_otc", "USDJPY_otc", "USDCHF_otc",
    "EURUSD", "GBPUSD", "USDJPY", "USDCHF",
    "XAUUSD_otc", "XAGUSD_otc", "BTCUSD_otc", "ETHUSD_otc"
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

// ====== CORS Proxy Service ======
// Используем публичные CORS прокси для обхода ограничений
const CORS_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://cors-anywhere.herokuapp.com/',
    'https://corsproxy.io/?',
    'https://api.codetabs.com/v1/proxy?quest='
];

// ====== PocketOption Real API Client ======
class PocketOptionAPI {
    constructor() {
        this.ws = null;
        this.ssid = null;
        this.isDemo = true;
        this.messageId = 0;
        this.pendingRequests = {};
        this.candleSubscriptions = {};
        this.isConnected = false;
        this.currentBalance = 0;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        
        // Реальные WebSocket endpoints PocketOption
        this.WS_DEMO_URL = 'wss://demo-api-eu.pocketoption.com/ws';
        this.WS_REAL_URL = 'wss://api-eu.pocketoption.com/ws';
        this.REST_API_URL = 'https://api.pocketoption.com/api/v1/';
        
        // Пинг для поддержания соединения
        this.pingInterval = null;
    }

    async connect(ssid, isDemo = true) {
        this.ssid = ssid;
        this.isDemo = isDemo;
        
        return new Promise((resolve, reject) => {
            try {
                const wsUrl = isDemo ? this.WS_DEMO_URL : this.WS_REAL_URL;
                
                log(`Connecting to ${isDemo ? 'DEMO' : 'REAL'} account...`);
                log(`WebSocket URL: ${wsUrl}`);
                
                this.ws = new WebSocket(wsUrl);
                
                this.ws.onopen = () => {
                    log('WebSocket connection established');
                    this.isConnected = true;
                    this.reconnectAttempts = 0;
                    
                    // Отправляем авторизацию
                    this.sendAuthorization();
                    
                    // Запускаем пинг
                    this.startPing();
                };
                
                this.ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        this.handleMessage(data);
                        
                        // Проверяем успешную авторизацию
                        if (data.name === 'profile' || data.name === 'auth') {
                            if (data.status === 200 || data.msg?.status === 'success') {
                                this.isConnected = true;
                                resolve(true);
                            } else if (data.status === 403 || data.msg?.status === 'error') {
                                reject(new Error('Authentication failed: Invalid SSID'));
                            }
                        }
                    } catch (e) {
                        console.error('Parse error:', e);
                    }
                };
                
                this.ws.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    log('WebSocket connection error');
                    
                    // Пробуем переподключиться
                    if (this.reconnectAttempts < this.maxReconnectAttempts) {
                        this.reconnectAttempts++;
                        log(`Reconnection attempt ${this.reconnectAttempts}...`);
                        setTimeout(() => {
                            this.connect(ssid, isDemo).then(resolve).catch(reject);
                        }, 2000);
                    } else {
                        reject(new Error('Max reconnection attempts reached'));
                    }
                };
                
                this.ws.onclose = (event) => {
                    log(`WebSocket closed: ${event.code} ${event.reason}`);
                    this.isConnected = false;
                    this.stopPing();
                    
                    // Автоматическое переподключение
                    if (this.isConnected === false && this.reconnectAttempts < this.maxReconnectAttempts) {
                        setTimeout(() => {
                            this.reconnectAttempts++;
                            this.connect(ssid, isDemo);
                        }, 3000);
                    }
                };
                
                // Таймаут
                setTimeout(() => {
                    if (!this.isConnected) {
                        reject(new Error('Connection timeout'));
                    }
                }, 15000);
                
            } catch (error) {
                reject(error);
            }
        });
    }

    sendAuthorization() {
        const authMessage = {
            name: 'authorization',
            msg: {
                ssid: this.ssid,
                demo: this.isDemo,
                version: '2.0'
            }
        };
        
        this.sendRaw(authMessage);
    }

    sendRaw(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
            return true;
        }
        return false;
    }

    sendMessage(action, params = {}) {
        if (!this.isConnected) return null;
        
        this.messageId++;
        const message = {
            name: action,
            msg: {
                ...params,
                ssid: this.ssid,
                demo: this.isDemo
            },
            id: this.messageId.toString()
        };
        
        this.sendRaw(message);
        return this.messageId.toString();
    }

    handleMessage(data) {
        console.log('Received:', data.name || data.type);
        
        // Обработка разных типов сообщений
        switch (data.name) {
            case 'profile':
                if (data.msg?.balance) {
                    this.currentBalance = parseFloat(data.msg.balance);
                }
                break;
                
            case 'candle':
            case 'candle-generated':
                this.handleCandle(data.msg);
                break;
                
            case 'open-order':
            case 'order-result':
                this.handleOrderResult(data);
                break;
                
            case 'balance':
                if (data.msg?.balance) {
                    this.currentBalance = parseFloat(data.msg.balance);
                }
                break;
                
            case 'pong':
                // Пинг-понг для поддержания соединения
                break;
        }
        
        // Обработка ответов на запросы
        if (data.id && this.pendingRequests[data.id]) {
            this.pendingRequests[data.id](data);
            delete this.pendingRequests[data.id];
        }
    }

    handleCandle(candleData) {
        Object.keys(this.candleSubscriptions).forEach(asset => {
            if (candleData.active === asset || candleData.asset === asset) {
                const callback = this.candleSubscriptions[asset];
                if (callback) {
                    callback({
                        open: parseFloat(candleData.open),
                        high: parseFloat(candleData.high),
                        low: parseFloat(candleData.low),
                        close: parseFloat(candleData.close),
                        time: candleData.time || Date.now() / 1000,
                        volume: parseFloat(candleData.volume || 0)
                    });
                }
            }
        });
    }

    handleOrderResult(data) {
        const orderId = data.msg?.order_id || data.id;
        if (orderId && this.pendingRequests[orderId]) {
            this.pendingRequests[orderId]({
                success: data.msg?.status === 'success' || data.name === 'order-result',
                id: orderId,
                profit: parseFloat(data.msg?.profit || 0),
                result: data.msg?.result || 'unknown'
            });
            delete this.pendingRequests[orderId];
        }
    }

    startPing() {
        this.pingInterval = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.sendRaw({ name: 'ping' });
            }
        }, 30000); // Пинг каждые 30 секунд
    }

    stopPing() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }

    async getHistory(asset, period, count = 100) {
        return new Promise((resolve) => {
            const requestId = this.sendMessage('candles', {
                active: asset,
                size: count,
                from: Math.floor(Date.now() / 1000) - (count * period),
                to: Math.floor(Date.now() / 1000)
            });
            
            if (!requestId) {
                resolve([]);
                return;
            }
            
            this.pendingRequests[requestId] = (data) => {
                if (data.msg?.candles) {
                    const candles = data.msg.candles
                        .filter(c => parseFloat(c.close) > 0)
                        .map(c => ({
                            open: parseFloat(c.open),
                            high: parseFloat(c.high),
                            low: parseFloat(c.low),
                            close: parseFloat(c.close),
                            time: c.time
                        }));
                    resolve(candles);
                } else {
                    resolve([]);
                }
            };
            
            // Таймаут
            setTimeout(() => {
                if (this.pendingRequests[requestId]) {
                    delete this.pendingRequests[requestId];
                    resolve([]);
                }
            }, 10000);
        });
    }

    subscribeToCandles(asset, callback) {
        this.candleSubscriptions[asset] = callback;
        
        this.sendMessage('subscribe', {
            active: asset,
            name: 'candle-generated'
        });
        
        log(`Subscribed to ${asset} candles`);
    }

    unsubscribeFromCandles(asset) {
        delete this.candleSubscriptions[asset];
        
        this.sendMessage('unsubscribe', {
            active: asset,
            name: 'candle-generated'
        });
    }

    async placeOrder(asset, amount, direction, duration) {
        return new Promise((resolve) => {
            const orderId = this.sendMessage('open-order', {
                active: asset,
                amount: amount,
                direction: direction,
                duration: duration,
                demo: this.isDemo
            });
            
            if (!orderId) {
                resolve({
                    id: 'err',
                    success: false,
                    amount: amount,
                    error: 'Failed to send order'
                });
                return;
            }
            
            this.pendingRequests[orderId] = (response) => {
                resolve(response);
            };
            
            // Таймаут
            setTimeout(() => {
                if (this.pendingRequests[orderId]) {
                    delete this.pendingRequests[orderId];
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
            const requestId = this.sendMessage('get-balance');
            
            if (!requestId) {
                resolve(0);
                return;
            }
            
            this.pendingRequests[requestId] = (data) => {
                if (data.msg?.balance) {
                    this.currentBalance = parseFloat(data.msg.balance);
                    resolve(this.currentBalance);
                } else {
                    resolve(0);
                }
            };
            
            setTimeout(() => {
                if (this.pendingRequests[requestId]) {
                    delete this.pendingRequests[requestId];
                    resolve(0);
                }
            }, 5000);
        });
    }

    disconnect() {
        this.stopPing();
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.isConnected = false;
        this.candleSubscriptions = {};
        this.pendingRequests = {};
    }
}

// ====== Technical Analyzer (simplified) ======
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

        if (closes.length < 30) {
            return { signal: 'hold', confidence: 0 };
        }

        const analysis = {};
        let score = 0;
        const enabled = new Set(this.enabledIndicators);
        const lastC = closes[closes.length - 1];

        // RSI
        if (enabled.has('rsi') && closes.length >= 15) {
            const rsi = this.calculateRSI(closes, 14);
            analysis.rsi = rsi;
            
            const w = ALL_INDICATORS['rsi'].weight * this.weightMultiplier;
            if (rsi < 30) score += w;
            else if (rsi > 70) score -= w;
        }

        // MACD
        if (enabled.has('macd') && closes.length >= 26) {
            const ema12 = this.calculateEMA(closes, 12);
            const ema26 = this.calculateEMA(closes, 26);
            const macdLine = ema12 - ema26;
            const signalLine = this.calculateEMA([macdLine], 9);
            
            analysis.macd = macdLine;
            analysis.macd_signal = signalLine;
            
            const w = ALL_INDICATORS['macd'].weight * this.weightMultiplier;
            if (macdLine > signalLine) score += w;
            else if (macdLine < signalLine) score -= w;
        }

        // Stochastic
        if (enabled.has('stoch') && closes.length >= 14) {
            const recent14H = Math.max(...highs.slice(-14));
            const recent14L = Math.min(...lows.slice(-14));
            const stochK = ((lastC - recent14L) / (recent14H - recent14L)) * 100;
            analysis.stoch_k = stochK;
            
            const w = ALL_INDICATORS['stoch'].weight * this.weightMultiplier;
            if (stochK < 20) score += w;
            else if (stochK > 80) score -= w;
        }

        // Bollinger Bands
        if (enabled.has('bb') && closes.length >= 20) {
            const sma = this.calculateSMA(closes.slice(-20));
            const std = this.calculateStdDev(closes.slice(-20));
            analysis.bb_upper = sma + 2 * std;
            analysis.bb_lower = sma - 2 * std;
            
            const w = ALL_INDICATORS['bb'].weight * this.weightMultiplier;
            if (lastC <= analysis.bb_lower) score += w;
            else if (lastC >= analysis.bb_upper) score -= w;
        }

        // Trend
        if (enabled.has('trend')) {
            const sma5 = this.calculateSMA(closes.slice(-5));
            const sma20 = this.calculateSMA(closes.slice(-20));
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
        
        if (score >= threshold) signal = 'call';
        else if (score <= -threshold) signal = 'put';

        analysis.signal = signal;
        analysis.confidence = confidence;
        analysis.score = Math.floor(score);
        analysis.max_score = Math.floor(maxScore);
        analysis.enabled_count = enabled.size;
        analysis.last_price = lastC;

        return analysis;
    }

    calculateRSI(prices, period) {
        if (prices.length < period + 1) return 50;
        
        let gains = 0;
        let losses = 0;
        
        for (let i = prices.length - period; i < prices.length; i++) {
            const diff = prices[i] - prices[i - 1];
            if (diff >= 0) gains += diff;
            else losses -= diff;
        }
        
        const avgGain = gains / period;
        const avgLoss = losses / period;
        
        if (avgLoss === 0) return 100;
        const rs = avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    }

    calculateSMA(prices) {
        return prices.reduce((a, b) => a + b, 0) / prices.length;
    }

    calculateEMA(prices, period) {
        if (prices.length < period) return prices[prices.length - 1];
        
        const k = 2 / (period + 1);
        let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;
        
        for (let i = period; i < prices.length; i++) {
            ema = prices[i] * k + ema * (1 - k);
        }
        
        return ema;
    }

    calculateStdDev(prices) {
        const mean = this.calculateSMA(prices);
        const variance = prices.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / prices.length;
        return Math.sqrt(variance);
    }
}

// ====== Trading Engine ======
class TradingEngine {
    constructor(ssid, config) {
        this.api = new PocketOptionAPI();
        this.ssid = ssid;
        this.config = config;
        
        // Состояние
        this.isRunning = false;
        this.isConnected = false;
        this.autoTrading = false;
        this.activeTrades = 0;
        
        // Баланс
        this.currentBalance = 0;
        this.startBalance = 0;
        
        // Статистика
        this.totalTrades = 0;
        this.wins = 0;
        this.losses = 0;
        this.consecutiveLosses = 0;
        this.totalProfit = 0;
        this.totalLoss = 0;
        
        // Мартингейл
        this.martingaleEnabled = config.martingale || false;
        this.martingaleMultiplier = config.multiplier || 2.5;
        this.martingaleMaxLevel = config.maxLevel || 5;
        this.martingaleLevel = 0;
        this.baseAmount = config.amount || 1;
        this.maxOrderAmount = 5000;
        
        // Трейдинг
        this.autoAmount = config.amount || 1;
        this.autoDuration = config.duration || 60;
        this.autoMinConfidence = config.minConfidence || 50;
        this.currentAsset = config.asset || 'EURUSD_otc';
        this.currentTimeframe = config.timeframe || 60;
        
        // Данные
        this.candlesBuffer = [];
        this.lastAnalysis = null;
        this.latestPrice = 0;
        this.tradeHistory = [];
        this.profitHistory = [];
        this.callbacks = [];
        
        // Анализ
        this.analyzer = new TechnicalAnalyzer(
            config.enabledIndicators || Object.keys(ALL_INDICATORS),
            config.analysisStrategy || 'combined',
            STRATEGY_CONFIGS[config.analysisStrategy]?.weight_multiplier || 1.0
        );
        
        this.lastTradeTime = 0;
    }

    on(callback) {
        this.callbacks.push(callback);
    }

    emit(event, data = null) {
        this.callbacks.forEach(cb => {
            try {
                cb(event, data);
            } catch (e) {
                console.error('Callback error:', e);
            }
        });
    }

    async start() {
        try {
            log('Starting connection...');
            const connected = await this.api.connect(this.ssid, true);
            
            if (connected) {
                this.isConnected = true;
                this.isRunning = true;
                
                // Получаем баланс
                this.currentBalance = await this.api.getBalance();
                this.startBalance = this.currentBalance;
                
                this.emit('connected', { balance: this.currentBalance });
                this.emit('log', `✅ Connected! Balance: $${this.currentBalance.toFixed(2)}`);
                
                // Загружаем историю
                await this.loadHistoricalData();
                
                // Подписываемся на свечи
                this.subscribeToCandles();
                
                // Периодическое обновление баланса
                setInterval(async () => {
                    if (this.isConnected) {
                        await this.api.getBalance();
                        this.emit('balance', { 
                            balance: this.currentBalance, 
                            profit: this.currentBalance - this.startBalance 
                        });
                    }
                }, 5000);
                
                return true;
            }
        } catch (error) {
            this.emit('log', `❌ Connection failed: ${error.message}`);
            return false;
        }
        return false;
    }

    async loadHistoricalData() {
        this.emit('log', `Loading history for ${this.currentAsset}...`);
        const candles = await this.api.getHistory(this.currentAsset, this.currentTimeframe, 150);
        
        if (candles.length > 0) {
            this.candlesBuffer = candles;
            this.latestPrice = candles[candles.length - 1].close;
            this.emit('log', `Loaded ${candles.length} candles`);
            
            if (this.candlesBuffer.length >= 30) {
                this.runAnalysis();
            }
        } else {
            this.emit('log', 'No historical data received, using demo data');
            this.generateDemoData();
        }
    }

    generateDemoData() {
        const candles = [];
        let price = 1.0843;
        
        for (let i = 150; i >= 0; i--) {
            const change = (Math.random() - 0.5) * 0.0010;
            price += change;
            candles.push({
                open: price - change,
                high: price + Math.abs(change) * 1.5,
                low: price - Math.abs(change) * 1.5,
                close: price,
                time: Date.now() / 1000 - i * this.currentTimeframe
            });
        }
        
        this.candlesBuffer = candles;
        this.latestPrice = price;
        this.emit('log', 'Using demo data (real API data not available)');
    }

    subscribeToCandles() {
        this.api.subscribeToCandles(this.currentAsset, (candle) => {
            if (!this.isRunning) return;
            
            if (candle.close > 0) {
                this.latestPrice = candle.close;
                this.candlesBuffer.push(candle);
                
                if (this.candlesBuffer.length > 300) {
                    this.candlesBuffer.shift();
                }
                
                this.emit('live_candle', { asset: this.currentAsset, candle: candle });
                
                if (this.candlesBuffer.length >= 30) {
                    this.runAnalysis();
                }
            }
        });
    }

    runAnalysis() {
        this.lastAnalysis = this.analyzer.analyze(this.candlesBuffer);
        this.emit('analysis', { asset: this.currentAsset, analysis: this.lastAnalysis });
        
        // Автотрейдинг
        if (this.autoTrading && this.lastAnalysis) {
            const now = Date.now() / 1000;
            if (now - this.lastTradeTime >= 3) {
                this.checkAutoTrade();
            }
        }
    }

    checkAutoTrade() {
        const signal = this.lastAnalysis.signal;
        const confidence = this.lastAnalysis.confidence;
        
        if (signal !== 'hold' && confidence >= this.autoMinConfidence) {
            const amount = this.calculateTradeAmount();
            
            if (amount <= this.maxOrderAmount && amount <= this.currentBalance * 0.95) {
                this.lastTradeTime = Date.now() / 1000;
                this.executeTrade(this.currentAsset, amount, signal, this.autoDuration, 'AUTO');
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
            const calculated = this.baseAmount * Math.pow(this.martingaleMultiplier, lossLevel);
            
            if (calculated > this.maxOrderAmount || calculated > this.currentBalance * 0.95) {
                this.consecutiveLosses = 0;
                this.martingaleLevel = 0;
                return this.baseAmount;
            }
            
            return Math.round(calculated * 100) / 100;
        }
        
        this.martingaleLevel = 0;
        return this.baseAmount;
    }

    async executeTrade(asset, amount, direction, duration, type = 'AUTO') {
        this.activeTrades++;
        const balanceBefore = this.currentBalance;
        
        this.emit('log', `${type === 'AUTO' ? '🎯' : '👆'} ${type} ${direction.toUpperCase()} $${amount.toFixed(2)} | Dur: ${duration}s`);
        
        try {
            const result = await this.api.placeOrder(asset, amount, direction, duration);
            
            // Ждем завершения сделки
            await new Promise(resolve => setTimeout(resolve, (duration + 5) * 1000));
            
            const balanceAfter = await this.api.getBalance();
            this.currentBalance = balanceAfter;
            const profit = balanceAfter - balanceBefore;
            
            this.totalTrades++;
            let resultType;
            
            if (profit > 0.005) {
                this.wins++;
                this.totalProfit += profit;
                this.consecutiveLosses = 0;
                this.martingaleLevel = 0;
                resultType = 'win';
            } else if (profit < -0.005) {
                this.losses++;
                this.totalLoss += Math.abs(profit);
                this.consecutiveLosses++;
                resultType = 'loss';
            } else {
                resultType = 'draw';
            }
            
            const trade = {
                time: new Date().toLocaleTimeString(),
                type: type,
                direction: direction,
                amount: amount,
                result: resultType,
                profit: profit,
                balanceBefore: balanceBefore,
                balanceAfter: balanceAfter,
                level: this.martingaleLevel,
                losses: this.consecutiveLosses
            };
            
            this.tradeHistory.unshift(trade);
            this.profitHistory.push(balanceAfter);
            
            this.emit('trade_result', trade);
            this.emit('profit_update', this.profitHistory);
            
            const emoji = resultType === 'win' ? '✅' : resultType === 'loss' ? '❌' : '➖';
            this.emit('log', `${emoji} ${type} ${resultType.toUpperCase()} $${profit >= 0 ? '+' : ''}${profit.toFixed(2)} | Bal: $${balanceAfter.toFixed(2)}`);
            
        } catch (error) {
            this.emit('log', `❌ Trade error: ${error.message}`);
        }
        
        this.activeTrades--;
    }

    async executeManual(asset, amount, direction, duration) {
        await this.executeTrade(asset, amount, direction, duration, 'MANUAL');
    }

    startAuto() {
        this.autoTrading = true;
        this.lastTradeTime = 0;
        this.emit('auto_trading', true);
        this.emit('log', '🤖 AUTO TRADING ON');
    }

    stopAuto() {
        this.autoTrading = false;
        this.emit('auto_trading', false);
        this.emit('log', '⏸️ AUTO TRADING OFF');
    }

    async switchAsset(asset, timeframe = null) {
        this.api.unsubscribeFromCandles(this.currentAsset);
        this.currentAsset = asset;
        if (timeframe) this.currentTimeframe = timeframe;
        this.candlesBuffer = [];
        
        await this.loadHistoricalData();
        this.subscribeToCandles();
    }

    updateStrategy(strategyType, enabledIndicators = null) {
        if (enabledIndicators) {
            this.analyzer = new TechnicalAnalyzer(
                enabledIndicators,
                strategyType,
                STRATEGY_CONFIGS[strategyType]?.weight_multiplier || 1.0
            );
        }
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
        return {
            total_trades: this.totalTrades,
            wins: this.wins,
            losses: this.losses,
            win_rate: this.totalTrades > 0 ? (this.wins / this.totalTrades * 100) : 0,
            net_profit: this.totalProfit - this.totalLoss,
            total_profit: this.totalProfit,
            total_loss: this.totalLoss,
            profit_factor: this.totalLoss > 0 ? this.totalProfit / this.totalLoss : 0,
            balance: this.currentBalance,
            start_balance: this.startBalance,
            return_pct: this.startBalance > 0 ? ((this.currentBalance - this.startBalance) / this.startBalance * 100) : 0,
            martingale_level: this.martingaleLevel,
            consecutive_losses: this.consecutiveLosses,
            auto_trades: this.totalTrades,
            manual_trades: 0
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

// ====== UI Functions (same as before) ======
// [Previous UI code remains the same...]
