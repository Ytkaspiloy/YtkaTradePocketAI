// Trading Robot Configuration
const TRADING_CONFIG = {
    assets: {
        'EURJPY': { name: 'EUR/JPY', price: 158.425, volatility: 0.8 },
        'CHFJPY': { name: 'CHF/JPY', price: 165.320, volatility: 0.7 },
        'AUDCAD': { name: 'AUD/CAD', price: 0.8925, volatility: 0.6 },
        'USDCAD': { name: 'USD/CAD', price: 1.3520, volatility: 0.5 },
        'USDCHF': { name: 'USD/CHF', price: 0.9025, volatility: 0.6 },
        'GBPAUD': { name: 'GBP/AUD', price: 1.9250, volatility: 0.9 },
        'USDJPY': { name: 'USD/JPY', price: 148.350, volatility: 0.7 },
        'EURUSD': { name: 'EUR/USD', price: 1.0830, volatility: 0.8 },
        'EURAUD': { name: 'EUR/AUD', price: 1.6420, volatility: 0.7 },
        'AUDUSD': { name: 'AUD/USD', price: 0.6590, volatility: 0.6 },
        'CADJPY': { name: 'CAD/JPY', price: 109.850, volatility: 0.5 },
        'AUDJPY': { name: 'AUD/JPY', price: 97.820, volatility: 0.7 },
        'EURGBP': { name: 'EUR/GBP', price: 0.8520, volatility: 0.4 },
        'GBPJPY': { name: 'GBP/JPY', price: 188.750, volatility: 1.0 },
        'GBPCHF': { name: 'GBP/CHF', price: 1.1320, volatility: 0.8 },
        'EURCAD': { name: 'EUR/CAD', price: 1.4650, volatility: 0.6 },
        'CADCHF': { name: 'CAD/CHF', price: 0.6670, volatility: 0.4 },
        'AUDCHF': { name: 'AUD/CHF', price: 0.5930, volatility: 0.5 }
    },
    
    timeframes: [3, 5, 10, 15, 30, 60, 120, 180],
    
    indicators: {
        fibonacci: true,
        supportResistance: true,
        trendLines: true,
        orderBlocks: true,
        movingAverages: true
    }
};

// Global Variables
let currentChart = null;
let currentSignal = null;
let isSignalActive = false;
let expirationTimer = null;
let resultsHistory = [];
let currentLanguage = 'ru';
let currentAsset = 'EURJPY';
let currentTimeframe = 3;
let candlesData = [];

// Translation dictionaries
const translations = {
    ru: {
        instrument: 'ИНСТРУМЕНТ',
        timeframe: 'ЭКСПИРАЦИЯ',
        analysis: 'АНАЛИЗ',
        signal: 'СИГНАЛ',
        getSignal: 'ПОЛУЧИТЬ СИГНАЛ',
        ready: 'Готов к работе',
        accuracy: 'Точность:',
        winRate: 'Винрейт:',
        trades: 'Сделок:',
        currentSignal: 'ТЕКУЩИЙ СИГНАЛ',
        waiting: 'Ожидание',
        clickGenerate: 'Нажмите "Получить сигнал" для анализа',
        expires: 'Истекает через:',
        lastResults: 'ПОСЛЕДНИЕ РЕЗУЛЬТАТЫ',
        candles: 'Анализ 150 свечей',
        fibonacci: 'Сетка Фибоначчи',
        support: 'Уровни поддержки',
        resistance: 'Уровни сопротивления',
        trend: 'Трендовые линии',
        orderblocks: 'Ордер-блоки',
        disclaimer: 'Торговля бинарными опционами связана с высокими рисками. Past performance is not indicative of future results.',
        buy: 'ПОКУПКА',
        sell: 'ПРОДАЖА',
        win: 'ВЫИГРЫШ',
        loss: 'ПРОИГРЫШ',
        refund: 'ВОЗВРАТ',
        analyzing: 'Анализ рынка...',
        signalGenerated: 'СИГНАЛ СГЕНЕРИРОВАН'
    },
    en: {
        instrument: 'INSTRUMENT',
        timeframe: 'EXPIRATION',
        analysis: 'ANALYSIS',
        signal: 'SIGNAL',
        getSignal: 'GET SIGNAL',
        ready: 'Ready to trade',
        accuracy: 'Accuracy:',
        winRate: 'Win Rate:',
        trades: 'Trades:',
        currentSignal: 'CURRENT SIGNAL',
        waiting: 'Waiting',
        clickGenerate: 'Click "Get Signal" to analyze',
        expires: 'Expires in:',
        lastResults: 'LAST RESULTS',
        candles: 'Analyzing 150 candles',
        fibonacci: 'Fibonacci Grid',
        support: 'Support Levels',
        resistance: 'Resistance Levels',
        trend: 'Trend Lines',
        orderblocks: 'Order Blocks',
        disclaimer: 'Binary options trading involves high risks. Past performance is not indicative of future results.',
        buy: 'BUY',
        sell: 'SELL',
        win: 'WIN',
        loss: 'LOSS',
        refund: 'REFUND',
        analyzing: 'Market analysis...',
        signalGenerated: 'SIGNAL GENERATED'
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeChart();
    initializeEventListeners();
    updateTimeDisplay();
    loadResultsHistory();
    
    // Update time every second
    setInterval(updateTimeDisplay, 1000);
    
    // Generate initial candles
    generateCandles();
});

// Initialize language settings
function initializeLanguage() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            currentLanguage = this.dataset.lang;
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            applyTranslations();
        });
    });
    
    applyTranslations();
}

// Apply translations to all elements
function applyTranslations() {
    const dict = translations[currentLanguage];
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (dict[key]) {
            element.textContent = dict[key];
        }
    });
    
    // Update button text
    const signalBtn = document.getElementById('generate-signal');
    if (signalBtn) {
        const icon = signalBtn.querySelector('i');
        signalBtn.innerHTML = `${icon.outerHTML} ${dict.getSignal}`;
    }
}

// Initialize TradingView Lightweight Charts
function initializeChart() {
    const chartContainer = document.getElementById('trading-chart');
    
    // Clear previous chart
    chartContainer.innerHTML = '';
    
    // Create chart
    currentChart = LightweightCharts.createChart(chartContainer, {
        width: chartContainer.clientWidth,
        height: 500,
        layout: {
            backgroundColor: '#1a2238',
            textColor: '#8b9dc3',
        },
        grid: {
            vertLines: {
                color: '#2a3655',
            },
            horzLines: {
                color: '#2a3655',
            },
        },
        crosshair: {
            mode: LightweightCharts.CrosshairMode.Normal,
        },
        rightPriceScale: {
            borderColor: '#2a3655',
        },
        timeScale: {
            borderColor: '#2a3655',
            timeVisible: true,
            secondsVisible: true,
        },
    });
    
    // Create candlestick series
    const candlestickSeries = currentChart.addCandlestickSeries({
        upColor: '#00ff88',
        downColor: '#ff4444',
        borderDownColor: '#ff4444',
        borderUpColor: '#00ff88',
        wickDownColor: '#ff4444',
        wickUpColor: '#00ff88',
    });
    
    // Create line series for indicators
    const lineSeries = currentChart.addLineSeries({
        color: '#0066ff',
        lineWidth: 1,
    });
}

// Generate random candle data
function generateCandles() {
    const asset = TRADING_CONFIG.assets[currentAsset];
    const basePrice = asset.price;
    const volatility = asset.volatility;
    
    candlesData = [];
    const now = Math.floor(Date.now() / 1000);
    
    for (let i = 150; i >= 0; i--) {
        const time = now - (i * currentTimeframe);
        
        if (i === 0) {
            candlesData.push({
                time: time,
                open: basePrice * (1 + (Math.random() - 0.5) * 0.001),
                high: basePrice * (1 + Math.random() * 0.002),
                low: basePrice * (1 - Math.random() * 0.002),
                close: basePrice,
            });
        } else {
            const prevClose = i === 150 ? basePrice : candlesData[candlesData.length - 1].close;
            const change = (Math.random() - 0.5) * volatility * 0.01;
            const open = prevClose;
            const close = prevClose * (1 + change);
            const high = Math.max(open, close) * (1 + Math.random() * 0.001);
            const low = Math.min(open, close) * (1 - Math.random() * 0.001);
            
            candlesData.push({
                time: time,
                open: open,
                high: high,
                low: low,
                close: close,
            });
        }
    }
    
    updateChart();
}

// Update chart with current data
function updateChart() {
    if (!currentChart || candlesData.length === 0) return;
    
    const candlestickSeries = currentChart.addCandlestickSeries();
    candlestickSeries.setData(candlesData);
    
    // Draw technical analysis
    drawTechnicalAnalysis();
}

// Draw technical analysis indicators
function drawTechnicalAnalysis() {
    if (candlesData.length < 10) return;
    
    // Calculate support and resistance levels
    const highs = candlesData.map(c => c.high);
    const lows = candlesData.map(c => c.low);
    const maxHigh = Math.max(...highs);
    const minLow = Math.min(...lows);
    const range = maxHigh - minLow;
    
    // Draw Fibonacci levels
    const fibLevels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
    fibLevels.forEach(level => {
        const price = maxHigh - (range * level);
        const lineSeries = currentChart.addLineSeries({
            color: level === 0.5 ? '#ffaa00' : '#5d6d97',
            lineWidth: level === 0.5 ? 2 : 1,
            lineStyle: level === 0.5 ? 0 : 2, // 0 = solid, 2 = dotted
        });
        
        lineSeries.setData([
            { time: candlesData[0].time, value: price },
            { time: candlesData[candlesData.length - 1].time, value: price }
        ]);
    });
    
    // Draw support and resistance lines
    const supportLevel = minLow + (range * 0.382);
    const resistanceLevel = maxHigh - (range * 0.382);
    
    // Support line (blue)
    const supportSeries = currentChart.addLineSeries({
        color: '#0066ff',
        lineWidth: 2,
        lineStyle: 0,
    });
    supportSeries.setData([
        { time: candlesData[0].time, value: supportLevel },
        { time: candlesData[candlesData.length - 1].time, value: supportLevel }
    ]);
    
    // Resistance line (red)
    const resistanceSeries = currentChart.addLineSeries({
        color: '#ff4444',
        lineWidth: 2,
        lineStyle: 0,
    });
    resistanceSeries.setData([
        { time: candlesData[0].time, value: resistanceLevel },
        { time: candlesData[candlesData.length - 1].time, value: resistanceLevel }
    ]);
    
    // Draw trend line (green)
    const trendStart = candlesData[0].low;
    const trendEnd = candlesData[candlesData.length - 1].high;
    
    const trendSeries = currentChart.addLineSeries({
        color: '#22ff55',
        lineWidth: 2,
        lineStyle: 0,
    });
    trendSeries.setData([
        { time: candlesData[0].time, value: trendStart },
        { time: candlesData[candlesData.length - 1].time, value: trendEnd }
    ]);
    
    // Draw order blocks
    drawOrderBlocks();
}

// Draw order blocks
function drawOrderBlocks() {
    // Bullish order blocks (green)
    const bullishBlocks = [];
    const bearishBlocks = [];
    
    // Find significant candles for order blocks
    for (let i = 1; i < candlesData.length - 1; i++) {
        const candle = candlesData[i];
        const prevCandle = candlesData[i - 1];
        const nextCandle = candlesData[i + 1];
        
        // Bullish engulfing pattern
        if (candle.close > candle.open && 
            candle.close > prevCandle.high && 
            candle.open < prevCandle.low) {
            bullishBlocks.push({
                time: candle.time,
                low: candle.low,
                high: candle.high,
            });
        }
        
        // Bearish engulfing pattern
        if (candle.close < candle.open && 
            candle.close < prevCandle.low && 
            candle.open > prevCandle.high) {
            bearishBlocks.push({
                time: candle.time,
                low: candle.low,
                high: candle.high,
            });
        }
    }
    
    // Draw bullish order blocks
    bullishBlocks.forEach(block => {
        const areaSeries = currentChart.addHistogramSeries({
            color: 'rgba(0, 255, 136, 0.1)',
        });
        
        areaSeries.setData([
            { time: block.time, value: block.low, color: 'rgba(0, 255, 136, 0.1)' },
            { time: block.time + (currentTimeframe * 50), value: block.high, color: 'rgba(0, 255, 136, 0.1)' }
        ]);
    });
    
    // Draw bearish order blocks
    bearishBlocks.forEach(block => {
        const areaSeries = currentChart.addHistogramSeries({
            color: 'rgba(255, 68, 68, 0.1)',
        });
        
        areaSeries.setData([
            { time: block.time, value: block.high, color: 'rgba(255, 68, 68, 0.1)' },
            { time: block.time + (currentTimeframe * 50), value: block.low, color: 'rgba(255, 68, 68, 0.1)' }
        ]);
    });
}

// Initialize event listeners
function initializeEventListeners() {
    // Asset selection
    document.getElementById('asset-select').addEventListener('change', function() {
        currentAsset = this.value;
        updateAssetInfo();
        generateCandles();
    });
    
    // Timeframe buttons
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTimeframe = parseInt(this.dataset.time);
        });
    });
    
    // Chart timeframe buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // In real implementation, this would update chart timeframe
        });
    });
    
    // Generate signal button
    document.getElementById('generate-signal').addEventListener('click', generateSignal);
}

// Update asset information
function updateAssetInfo() {
    const asset = TRADING_CONFIG.assets[currentAsset];
    document.getElementById('current-pair').textContent = asset.name;
    document.getElementById('current-price').textContent = asset.price.toFixed(4);
    
    // Update price change
    const change = (Math.random() - 0.5) * 0.2;
    const priceChange = document.getElementById('price-change');
    priceChange.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
    priceChange.className = change >= 0 ? 'positive' : 'negative';
}

// Generate trading signal
function generateSignal() {
    if (isSignalActive) return;
    
    const signalBtn = document.getElementById('generate-signal');
    signalBtn.disabled = true;
    signalBtn.classList.add('signal-active');
    
    // Show analyzing animation
    const signalContent = document.getElementById('signal-content');
    signalContent.innerHTML = `
        <div class="signal-analyzing">
            <div class="loader"></div>
            <p style="margin-top: 15px;">${translations[currentLanguage].analyzing}</p>
        </div>
    `;
    
    // Update signal status
    const signalStatus = document.getElementById('signal-status');
    signalStatus.innerHTML = `
        <span class="status-dot" style="background: #ffaa00;"></span>
        <span>${translations[currentLanguage].analyzing}</span>
    `;
    
    // Simulate analysis delay
    setTimeout(() => {
        createSignal();
    }, 2000);
}

// Create trading signal
function createSignal() {
    const asset = TRADING_CONFIG.assets[currentAsset];
    const currentPrice = asset.price;
    const volatility = asset.volatility;
    
    // Technical analysis logic
    const rsi = 30 + Math.random() * 40; // 30-70
    const macd = (Math.random() - 0.5) * 2;
    const trendStrength = Math.random();
    
    // Determine direction based on technical analysis
    let direction;
    let confidence;
    
    if (rsi < 40 && macd < 0) {
        direction = 'BUY'; // Oversold
        confidence = 75 + Math.random() * 20;
    } else if (rsi > 60 && macd > 0) {
        direction = 'SELL'; // Overbought
        confidence = 75 + Math.random() * 20;
    } else {
        direction = Math.random() > 0.5 ? 'BUY' : 'SELL';
        confidence = 60 + Math.random() * 25;
    }
    
    // Calculate predicted price movement
    const predictedChange = (direction === 'BUY' ? 1 : -1) * volatility * 0.005 * (confidence / 100);
    const predictedPrice = currentPrice * (1 + predictedChange);
    
    // Create signal object
    currentSignal = {
        asset: currentAsset,
        pair: asset.name,
        direction: direction,
        entryPrice: currentPrice,
        predictedPrice: predictedPrice,
        expiration: currentTimeframe,
        confidence: Math.round(confidence),
        timestamp: Date.now(),
        result: null
    };
    
    // Display signal
    displaySignal();
    
    // Start expiration timer
    startExpirationTimer();
}

// Display generated signal
function displaySignal() {
    const signal = currentSignal;
    const signalContent = document.getElementById('signal-content');
    
    const directionClass = signal.direction === 'BUY' ? 'buy' : 'sell';
    const directionColor = signal.direction === 'BUY' ? '#00ff88' : '#ff4444';
    
    signalContent.innerHTML = `
        <div class="signal-details">
            <div class="signal-pair" style="font-size: 24px; font-weight: 700;">${signal.pair}</div>
            <div class="signal-direction" style="color: ${directionColor}; font-size: 32px; font-weight: 800; margin: 10px 0;">
                ${translations[currentLanguage][signal.direction.toLowerCase()]}
            </div>
            <div class="signal-info">
                <div style="display: flex; justify-content: space-between; margin: 15px 0;">
                    <span style="color: var(--text-secondary);">${translations[currentLanguage].entryPrice || 'Цена входа'}:</span>
                    <span style="font-weight: 700;">${signal.entryPrice.toFixed(4)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 15px 0;">
                    <span style="color: var(--text-secondary);">${translations[currentLanguage].expiration || 'Экспирация'}:</span>
                    <span style="font-weight: 700;">${signal.expiration}s</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 15px 0;">
                    <span style="color: var(--text-secondary);">${translations[currentLanguage].confidence || 'Уверенность'}:</span>
                    <span style="font-weight: 700; color: ${directionColor};">${signal.confidence}%</span>
                </div>
            </div>
            <div style="margin-top: 20px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                <div style="color: var(--text-secondary); font-size: 12px; margin-bottom: 5px;">
                    ${translations[currentLanguage].signalGenerated || 'СИГНАЛ СГЕНЕРИРОВАН'}
                </div>
                <div style="font-size: 11px; color: var(--text-muted);">
                    ${new Date(signal.timestamp).toLocaleTimeString()}
                </div>
            </div>
        </div>
    `;
    
    // Update signal status
    const signalStatus = document.getElementById('signal-status');
    signalStatus.innerHTML = `
        <span class="status-dot" style="background: ${directionColor}; animation: pulse 1s infinite;"></span>
        <span style="color: ${directionColor}; font-weight: 600;">ACTIVE</span>
    `;
    
    isSignalActive = true;
}

// Start expiration timer
function startExpirationTimer() {
    const expirationTime = currentSignal.expiration;
    let timeLeft = expirationTime;
    
    const timerBar = document.getElementById('timer-bar');
    const timerValue = document.getElementById('timer-value');
    
    timerBar.style.width = '100%';
    timerBar.style.transition = `width ${expirationTime}s linear`;
    
    // Start countdown
    expirationTimer = setInterval(() => {
        timeLeft--;
        
        // Update timer display
        const seconds = timeLeft % 60;
        timerValue.textContent = `00:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress bar
        const progress = (timeLeft / expirationTime) * 100;
        timerBar.style.width = `${progress}%`;
        
        // Change color based on time
        if (timeLeft < expirationTime * 0.3) {
            timerBar.style.background = 'linear-gradient(90deg, #ff4444, #ffaa00)';
        } else if (timeLeft < expirationTime * 0.7) {
            timerBar.style.background = 'linear-gradient(90deg, #ffaa00, #00ff88)';
        }
        
        // Expiration complete
        if (timeLeft <= 0) {
            clearInterval(expirationTimer);
            calculateSignalResult();
        }
    }, 1000);
    
    // Initial update
    timerValue.textContent = `00:${expirationTime.toString().padStart(2, '0')}`;
}

// Calculate signal result
function calculateSignalResult() {
    const signal = currentSignal;
    const asset = TRADING_CONFIG.assets[signal.asset];
    
    // Simulate price movement during expiration
    const volatility = asset.volatility;
    const randomMove = (Math.random() - 0.5) * volatility * 0.01;
    const finalPrice = signal.entryPrice * (1 + randomMove);
    
    // Determine result
    let result;
    let resultClass;
    
    if (signal.direction === 'BUY') {
        if (finalPrice > signal.entryPrice * 1.0001) { // Small threshold
            result = 'WIN';
            resultClass = 'win';
        } else if (finalPrice < signal.entryPrice * 0.9999) {
            result = 'LOSS';
            resultClass = 'loss';
        } else {
            result = 'REFUND';
            resultClass = 'refund';
        }
    } else { // SELL
        if (finalPrice < signal.entryPrice * 0.9999) {
            result = 'WIN';
            resultClass = 'win';
        } else if (finalPrice > signal.entryPrice * 1.0001) {
            result = 'LOSS';
            resultClass = 'loss';
        } else {
            result = 'REFUND';
            resultClass = 'refund';
        }
    }
    
    // Update signal with result
    signal.result = result;
    signal.finalPrice = finalPrice;
    
    // Display result
    displayResult(result, resultClass, finalPrice);
    
    // Add to history
    addToHistory(signal);
    
    // Reset after delay
    setTimeout(resetSignal, 3000);
}

// Display signal result
function displayResult(result, resultClass, finalPrice) {
    const signalContent = document.getElementById('signal-content');
    const resultText = translations[currentLanguage][result.toLowerCase()];
    const resultColor = result === 'WIN' ? '#00ff88' : 
                       result === 'LOSS' ? '#ff4444' : '#8b9dc3';
    
    signalContent.innerHTML += `
        <div class="signal-result" style="margin-top: 20px; padding: 20px; background: ${resultColor}15; border-radius: 12px; border: 1px solid ${resultColor}30;">
            <div style="font-size: 28px; font-weight: 800; color: ${resultColor}; margin-bottom: 10px;">
                ${resultText}
            </div>
            <div style="color: var(--text-secondary); font-size: 14px; margin-bottom: 10px;">
                ${translations[currentLanguage].finalPrice || 'Финальная цена'}: ${finalPrice.toFixed(4)}
            </div>
            <div style="font-size: 12px; color: var(--text-muted);">
                ${new Date().toLocaleTimeString()}
            </div>
        </div>
    `;
    
    // Update signal status
    const signalStatus = document.getElementById('signal-status');
    signalStatus.innerHTML = `
        <span class="status-dot" style="background: ${resultColor};"></span>
        <span style="color: ${resultColor}; font-weight: 600;">${result}</span>
    `;
}

// Add signal to history
function addToHistory(signal) {
    const resultItem = {
        pair: signal.pair,
        direction: signal.direction,
        result: signal.result,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        timestamp: Date.now()
    };
    
    resultsHistory.unshift(resultItem);
    
    // Keep only last 10 results
    if (resultsHistory.length > 10) {
        resultsHistory = resultsHistory.slice(0, 10);
    }
    
    // Update history display
    updateHistoryDisplay();
    
    // Update stats
    updateStats();
}

// Update history display
function updateHistoryDisplay() {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';
    
    resultsHistory.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${item.result.toLowerCase()}`;
        
        resultItem.innerHTML = `
            <div class="result-pair">${item.pair}</div>
            <div class="result-direction ${item.direction.toLowerCase()}">
                ${translations[currentLanguage][item.direction.toLowerCase()]}
            </div>
            <div class="result-result" style="color: ${item.result === 'WIN' ? '#00ff88' : item.result === 'LOSS' ? '#ff4444' : '#8b9dc3'}; font-weight: 700;">
                ${translations[currentLanguage][item.result.toLowerCase()]}
            </div>
            <div class="result-time">${item.time}</div>
        `;
        
        resultsList.appendChild(resultItem);
    });
}

// Update statistics
function updateStats() {
    const totalTrades = resultsHistory.length;
    const wins = resultsHistory.filter(r => r.result === 'WIN').length;
    const losses = resultsHistory.filter(r => r.result === 'LOSS').length;
    const refunds = resultsHistory.filter(r => r.result === 'REFUND').length;
    
    const accuracy = totalTrades > 0 ? ((wins + refunds * 0.5) / totalTrades * 100) : 0;
    const winRate = totalTrades > 0 ? (wins / (wins + losses) * 100) : 0;
    
    document.getElementById('accuracy').textContent = `${accuracy.toFixed(1)}%`;
    document.getElementById('win-rate').textContent = `${winRate.toFixed(1)}%`;
    document.getElementById('total-trades').textContent = totalTrades.toString();
}

// Reset signal state
function resetSignal() {
    isSignalActive = false;
    currentSignal = null;
    
    const signalBtn = document.getElementById('generate-signal');
    signalBtn.disabled = false;
    signalBtn.classList.remove('signal-active');
    
    const signalContent = document.getElementById('signal-content');
    signalContent.innerHTML = `
        <div class="signal-placeholder">
            <i class="fas fa-chart-line"></i>
            <p>${translations[currentLanguage].clickGenerate}</p>
        </div>
    `;
    
    const signalStatus = document.getElementById('signal-status');
    signalStatus.innerHTML = `
        <span class="status-dot"></span>
        <span>${translations[currentLanguage].waiting}</span>
    `;
    
    const timerBar = document.getElementById('timer-bar');
    timerBar.style.width = '0%';
    timerBar.style.transition = 'none';
    timerBar.style.background = 'linear-gradient(90deg, var(--accent-green), var(--accent-blue))';
    
    document.getElementById('timer-value').textContent = '--:--';
    
    // Clear any remaining timer
    if (expirationTimer) {
        clearInterval(expirationTimer);
        expirationTimer = null;
    }
}

// Load results history from localStorage
function loadResultsHistory() {
    const saved = localStorage.getItem('scalpingRobotResults');
    if (saved) {
        resultsHistory = JSON.parse(saved);
        updateHistoryDisplay();
        updateStats();
    }
}

// Save results history to localStorage
function saveResultsHistory() {
    localStorage.setItem('scalpingRobotResults', JSON.stringify(resultsHistory));
}

// Update time display
function updateTimeDisplay() {
    const now = new Date();
    const timeString = now.toUTCString().split(' ')[4];
    document.getElementById('current-time').innerHTML = 
        `<i class="far fa-clock"></i> ${timeString} UTC`;
}

// Handle window resize
window.addEventListener('resize', function() {
    if (currentChart) {
        currentChart.resize(
            document.getElementById('trading-chart').clientWidth,
            500
        );
    }
});

// Save history periodically
setInterval(saveResultsHistory, 30000);

// Initialize with default asset
updateAssetInfo();
