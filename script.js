// Trading Robot Configuration
const TRADING_CONFIG = {
    assets: {
        'EURJPY': { name: 'EUR/JPY', price: 158.425, volatility: 0.8 },
        'USDJPY': { name: 'USD/JPY', price: 148.350, volatility: 0.7 },
        'EURUSD': { name: 'EUR/USD', price: 1.0830, volatility: 0.8 },
        'GBPJPY': { name: 'GBP/JPY', price: 188.750, volatility: 1.0 },
        'AUDUSD': { name: 'AUD/USD', price: 0.6590, volatility: 0.6 },
        'USDCAD': { name: 'USD/CAD', price: 1.3520, volatility: 0.5 },
        'USDCHF': { name: 'USD/CHF', price: 0.9025, volatility: 0.6 },
        'EURGBP': { name: 'EUR/GBP', price: 0.8520, volatility: 0.4 },
        'AUDJPY': { name: 'AUD/JPY', price: 97.820, volatility: 0.7 },
        'CHFJPY': { name: 'CHF/JPY', price: 165.320, volatility: 0.7 },
        'AUDCAD': { name: 'AUD/CAD', price: 0.8925, volatility: 0.6 },
        'GBPAUD': { name: 'GBP/AUD', price: 1.9250, volatility: 0.9 },
        'EURAUD': { name: 'EUR/AUD', price: 1.6420, volatility: 0.7 },
        'CADJPY': { name: 'CAD/JPY', price: 109.850, volatility: 0.5 },
        'GBPCHF': { name: 'GBP/CHF', price: 1.1320, volatility: 0.8 },
        'EURCAD': { name: 'EUR/CAD', price: 1.4650, volatility: 0.6 },
        'CADCHF': { name: 'CAD/CHF', price: 0.6670, volatility: 0.4 },
        'AUDCHF': { name: 'AUD/CHF', price: 0.5930, volatility: 0.5 }
    },
    
    timeframes: {
        60: { name: '1 минута', seconds: 60 },
        120: { name: '2 минуты', seconds: 120 },
        180: { name: '3 минуты', seconds: 180 },
        300: { name: '5 минут', seconds: 300 }
    }
};

// Translation dictionaries
const translations = {
    ru: {
        instrument: 'ИНСТРУМЕНТ',
        expiration: 'ЭКСПИРАЦИЯ',
        signalAccuracy: 'ТОЧНОСТЬ СИГНАЛОВ',
        signal: 'СИГНАЛ',
        getSignal: 'ПОЛУЧИТЬ СИГНАЛ',
        ready: 'Готов к работе',
        winRate: 'Винрейт:',
        profitFactor: 'Профит фактор:',
        todayTrades: 'Сделок сегодня:',
        last24h: 'Последние 24ч:',
        weekly: 'За неделю:',
        totalSignals: 'Всего сигналов:',
        timeframe: 'Таймфрейм:',
        analyzing150: 'Анализ 150 свечей',
        waitingForSignal: 'Ожидание сигнала',
        chartWillAppear: 'График появится здесь после генерации сигнала',
        generateFirstSignal: 'Сгенерировать первый сигнал',
        currentSignal: 'ТЕКУЩИЙ СИГНАЛ',
        waiting: 'Ожидание',
        clickGenerate: 'Нажмите "Получить сигнал" для анализа',
        direction: 'Направление:',
        entryPrice: 'Цена входа:',
        accuracy: 'Точность:',
        generationTime: 'Время генерации:',
        expiresIn: 'Истекает через:',
        lastResults: 'ПОСЛЕДНИЕ РЕЗУЛЬТАТЫ',
        disclaimer: 'Торговля бинарными опционами связана с высокими рисками. Past performance is not indicative of future results.',
        exitPrice: 'Цена выхода:',
        result: 'Результат:',
        buy: 'ПОКУПКА',
        sell: 'ПРОДАЖА',
        win: 'ВЫИГРЫШ',
        loss: 'ПРОИГРЫШ',
        refund: 'ВОЗВРАТ',
        expand: 'Развернуть',
        collapse: 'Свернуть',
        priceChart: 'График цены:',
        time: 'Время:'
    },
    en: {
        instrument: 'INSTRUMENT',
        expiration: 'EXPIRATION',
        signalAccuracy: 'SIGNAL ACCURACY',
        signal: 'SIGNAL',
        getSignal: 'GET SIGNAL',
        ready: 'Ready to trade',
        winRate: 'Win Rate:',
        profitFactor: 'Profit Factor:',
        todayTrades: 'Today Trades:',
        last24h: 'Last 24h:',
        weekly: 'Weekly:',
        totalSignals: 'Total Signals:',
        timeframe: 'Timeframe:',
        analyzing150: 'Analyzing 150 candles',
        waitingForSignal: 'Waiting for signal',
        chartWillAppear: 'Chart will appear here after signal generation',
        generateFirstSignal: 'Generate first signal',
        currentSignal: 'CURRENT SIGNAL',
        waiting: 'Waiting',
        clickGenerate: 'Click "Get Signal" to analyze',
        direction: 'Direction:',
        entryPrice: 'Entry Price:',
        accuracy: 'Accuracy:',
        generationTime: 'Generation Time:',
        expiresIn: 'Expires in:',
        lastResults: 'LAST RESULTS',
        disclaimer: 'Binary options trading involves high risks. Past performance is not indicative of future results.',
        exitPrice: 'Exit Price:',
        result: 'Result:',
        buy: 'BUY',
        sell: 'SELL',
        win: 'WIN',
        loss: 'LOSS',
        refund: 'REFUND',
        expand: 'Expand',
        collapse: 'Collapse',
        priceChart: 'Price Chart:',
        time: 'Time:'
    }
};

// Global Variables
let currentChart = null;
let currentSignal = null;
let isSignalActive = false;
let expirationTimer = null;
let resultsHistory = [];
let currentAsset = 'EURUSD';
let currentTimeframe = 60; // 1 minute by default
let currentLanguage = 'ru';
let priceHistory = [];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Scalping Robot Pro...');
    
    // Set default timeframe
    document.getElementById('current-tf').textContent = TRADING_CONFIG.timeframes[currentTimeframe].name;
    
    initializeLanguage();
    initializeEventListeners();
    updateTimeDisplay();
    loadResultsHistory();
    updateStatsDisplay();
    
    // Update time every second
    setInterval(updateTimeDisplay, 1000);
    
    console.log('Scalping Robot Pro initialized successfully!');
});

// Initialize language system
function initializeLanguage() {
    // Set up language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentLanguage = this.dataset.lang;
            
            // Update active button
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Apply translations
            applyTranslations();
        });
    });
    
    // Apply initial translations
    applyTranslations();
}

// Apply translations to all elements
function applyTranslations() {
    const dict = translations[currentLanguage];
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (dict[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = dict[key];
            } else {
                element.textContent = dict[key];
            }
        }
    });
    
    // Update signal button text
    const signalBtn = document.getElementById('generate-signal');
    if (signalBtn) {
        const span = signalBtn.querySelector('span');
        if (span) span.textContent = dict.getSignal;
    }
    
    // Update first signal button
    const firstSignalBtn = document.getElementById('generate-first-signal');
    if (firstSignalBtn) {
        const span = firstSignalBtn.querySelector('span');
        if (span) span.textContent = dict.generateFirstSignal;
    }
    
    // Update status text if waiting
    const statusText = document.getElementById('status-text');
    if (statusText && !isSignalActive) {
        statusText.textContent = dict.waiting;
    }
}

// Initialize event listeners
function initializeEventListeners() {
    console.log('Initializing event listeners...');
    
    // Asset selection
    const assetSelect = document.getElementById('asset-select');
    if (assetSelect) {
        assetSelect.addEventListener('change', function() {
            currentAsset = this.value;
            console.log('Asset changed to:', currentAsset);
            updateAssetInfo();
        });
    }
    
    // Timeframe buttons
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current timeframe
            currentTimeframe = parseInt(this.dataset.time);
            console.log('Timeframe changed to:', currentTimeframe);
            
            // Update display
            document.getElementById('current-tf').textContent = 
                TRADING_CONFIG.timeframes[currentTimeframe].name;
        });
    });
    
    // Generate signal button
    const generateBtn = document.getElementById('generate-signal');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateSignal);
    }
    
    // Generate first signal button
    const firstSignalBtn = document.getElementById('generate-first-signal');
    if (firstSignalBtn) {
        firstSignalBtn.addEventListener('click', generateSignal);
    }
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    console.log('Event listeners initialized');
}

// Handle window resize
function handleResize() {
    if (currentChart) {
        const chartContainer = document.getElementById('trading-chart');
        if (chartContainer) {
            currentChart.resize(
                chartContainer.clientWidth,
                chartContainer.clientHeight
            );
        }
    }
}

// Initialize TradingView Lightweight Charts
function initializeChart() {
    console.log('Initializing chart...');
    const chartContainer = document.getElementById('trading-chart');
    
    if (!chartContainer) {
        console.error('Chart container not found!');
        return;
    }
    
    try {
        // Clear container
        chartContainer.innerHTML = '';
        
        // Create chart
        currentChart = LightweightCharts.createChart(chartContainer, {
            width: chartContainer.clientWidth,
            height: chartContainer.clientHeight || 400,
            layout: {
                backgroundColor: '#1a2238',
                textColor: '#8b9dc3',
                fontSize: 12,
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
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.1,
                },
            },
            timeScale: {
                borderColor: '#2a3655',
                timeVisible: true,
                secondsVisible: false,
                rightOffset: 10,
                barSpacing: 6,
                minBarSpacing: 4,
            },
            handleScroll: {
                mouseWheel: true,
                pressedMouseMove: true,
                horzTouchDrag: true,
                vertTouchDrag: true,
            },
            handleScale: {
                axisPressedMouseMove: true,
                mouseWheel: true,
                pinch: true,
            },
        });
        
        console.log('Chart initialized successfully');
        
        // Generate initial chart data
        generateChartData();
        
    } catch (error) {
        console.error('Error creating chart:', error);
        chartContainer.innerHTML = `
            <div style="color: #ff4444; padding: 20px; text-align: center;">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px;"></i>
                <h3>Ошибка загрузки графика</h3>
                <p>Пожалуйста, обновите страницу</p>
            </div>
        `;
    }
}

// Generate chart data with technical analysis
function generateChartData() {
    if (!currentChart) return;
    
    const asset = TRADING_CONFIG.assets[currentAsset];
    const basePrice = asset.price;
    const volatility = asset.volatility;
    
    // Clear existing series
    currentChart.removeSeries(currentChart._series || []);
    
    // Create candlestick series
    const candlestickSeries = currentChart.addCandlestickSeries({
        upColor: '#00ff88',
        downColor: '#ff4444',
        borderDownColor: '#ff4444',
        borderUpColor: '#00ff88',
        wickDownColor: '#ff4444',
        wickUpColor: '#00ff88',
        priceFormat: {
            type: 'price',
            precision: 4,
            minMove: 0.0001,
        }
    });
    
    // Generate 150 candles
    const candlesData = [];
    const now = Math.floor(Date.now() / 1000);
    
    for (let i = 150; i >= 0; i--) {
        const time = now - (i * 60); // 1 minute candles
        
        if (i === 0) {
            candlesData.push({
                time: time,
                open: basePrice,
                high: basePrice * (1 + Math.random() * 0.001),
                low: basePrice * (1 - Math.random() * 0.001),
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
    
    // Set candle data
    candlestickSeries.setData(candlesData);
    
    // Store price history for mini-charts
    priceHistory = candlesData.map(c => ({ time: c.time, price: c.close }));
    
    // Draw technical analysis
    drawTechnicalAnalysis(candlesData);
    
    // Fit content
    currentChart.timeScale().fitContent();
    
    console.log('Chart data generated successfully');
}

// Draw technical analysis indicators
function drawTechnicalAnalysis(candlesData) {
    if (!currentChart || candlesData.length < 10) return;
    
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
            lineStyle: level === 0.618 || level === 0.382 ? 2 : 0,
        });
        
        lineSeries.setData([
            { time: candlesData[0].time, value: price },
            { time: candlesData[candlesData.length - 1].time, value: price }
        ]);
    });
    
    // Draw support line (blue)
    const supportLevel = minLow + (range * 0.382);
    const supportSeries = currentChart.addLineSeries({
        color: '#0066ff',
        lineWidth: 2,
        lineStyle: 0,
    });
    supportSeries.setData([
        { time: candlesData[0].time, value: supportLevel },
        { time: candlesData[candlesData.length - 1].time, value: supportLevel }
    ]);
    
    // Draw resistance line (red)
    const resistanceLevel = maxHigh - (range * 0.382);
    const resistanceSeries = currentChart.addLineSeries({
        color: '#ff4444',
        lineWidth: 2,
        lineStyle: 0,
    });
    resistanceSeries.setData([
        { time: candlesData[0].time, value: resistanceLevel },
        { time: candlesData[candlesData.length - 1].time, value: resistanceLevel }
    ]);
    
    // Draw trend line (green diagonal)
    const trendStart = candlesData[0].close;
    const trendEnd = candlesData[candlesData.length - 1].close;
    const trendStep = (trendEnd - trendStart) / (candlesData.length - 1);
    
    const trendSeries = currentChart.addLineSeries({
        color: '#22ff55',
        lineWidth: 2,
        lineStyle: 0,
    });
    
    const trendData = candlesData.map((candle, index) => ({
        time: candle.time,
        value: trendStart + (trendStep * index)
    }));
    
    trendSeries.setData(trendData);
    
    // Draw order blocks
    drawOrderBlocks(candlesData);
}

// Draw order blocks
function drawOrderBlocks(candlesData) {
    if (!currentChart) return;
    
    // Find significant candles for order blocks
    for (let i = 1; i < candlesData.length - 1; i++) {
        const candle = candlesData[i];
        const prevCandle = candlesData[i - 1];
        
        // Bullish engulfing pattern - green order block
        if (candle.close > candle.open && 
            candle.close > prevCandle.high && 
            candle.open < prevCandle.low) {
            
            const areaSeries = currentChart.addHistogramSeries({
                color: 'rgba(0, 255, 136, 0.2)',
            });
            
            const areaData = [
                { time: candle.time, value: candle.high, color: 'rgba(0, 255, 136, 0.1)' },
                { time: candle.time + 600, value: candle.high, color: 'rgba(0, 255, 136, 0.1)' },
                { time: candle.time + 600, value: candle.low, color: 'rgba(0, 255, 136, 0.1)' },
                { time: candle.time, value: candle.low, color: 'rgba(0, 255, 136, 0.1)' }
            ];
            
            areaSeries.setData(areaData);
        }
        
        // Bearish engulfing pattern - red order block
        if (candle.close < candle.open && 
            candle.close < prevCandle.low && 
            candle.open > prevCandle.high) {
            
            const areaSeries = currentChart.addHistogramSeries({
                color: 'rgba(255, 68, 68, 0.2)',
            });
            
            const areaData = [
                { time: candle.time, value: candle.high, color: 'rgba(255, 68, 68, 0.1)' },
                { time: candle.time + 600, value: candle.high, color: 'rgba(255, 68, 68, 0.1)' },
                { time: candle.time + 600, value: candle.low, color: 'rgba(255, 68, 68, 0.1)' },
                { time: candle.time, value: candle.low, color: 'rgba(255, 68, 68, 0.1)' }
            ];
            
            areaSeries.setData(areaData);
        }
    }
}

// Update asset information
function updateAssetInfo() {
    const asset = TRADING_CONFIG.assets[currentAsset];
    if (!asset) return;
    
    const pairElement = document.getElementById('current-pair');
    const priceElement = document.getElementById('current-price');
    const changeElement = document.getElementById('price-change');
    
    if (pairElement) pairElement.textContent = asset.name;
    if (priceElement) priceElement.textContent = asset.price.toFixed(4);
    
    // Update price change
    if (changeElement) {
        const change = (Math.random() - 0.5) * 0.2;
        changeElement.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
        changeElement.className = change >= 0 ? 'positive' : 'negative';
    }
}

// Generate trading signal
function generateSignal() {
    if (isSignalActive) {
        console.log('Signal already active, please wait...');
        return;
    }
    
    console.log('Generating new signal...');
    
    // Show chart if this is the first signal
    if (!currentChart) {
        document.getElementById('no-chart-message').style.display = 'none';
        document.getElementById('chart-container').style.display = 'flex';
        initializeChart();
    }
    
    const signalBtn = document.getElementById('generate-signal');
    const firstSignalBtn = document.getElementById('generate-first-signal');
    
    if (signalBtn) {
        signalBtn.disabled = true;
        signalBtn.classList.add('signal-active');
    }
    
    if (firstSignalBtn) {
        firstSignalBtn.disabled = true;
    }
    
    isSignalActive = true;
    
    // Show analyzing animation
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        signalContent.innerHTML = `
            <div class="signal-analyzing" style="text-align: center;">
                <div class="loader"></div>
                <p style="margin-top: 15px; color: #8b9dc3; font-size: 16px;">
                    <i class="fas fa-chart-line"></i><br>
                    Анализ рынка...
                </p>
            </div>
        `;
    }
    
    // Update signal status
    updateSignalStatus(translations[currentLanguage].analyzing || 'Анализ', '#ffaa00');
    
    // Simulate analysis delay
    setTimeout(() => {
        createSignal();
    }, 2000);
}

// Update signal status
function updateSignalStatus(text, color) {
    const signalStatus = document.getElementById('signal-status');
    const statusText = document.getElementById('status-text');
    
    if (signalStatus && statusText) {
        const dot = signalStatus.querySelector('.status-dot');
        if (dot) dot.style.background = color;
        statusText.textContent = text;
        statusText.style.color = color;
    }
}

// Create trading signal
function createSignal() {
    console.log('Creating signal for', currentAsset);
    
    const asset = TRADING_CONFIG.assets[currentAsset];
    if (!asset) return;
    
    const currentPrice = asset.price;
    const volatility = asset.volatility;
    
    // Technical analysis logic
    const rsi = 30 + Math.random() * 40; // 30-70
    const macd = (Math.random() - 0.5) * 2;
    const trend = Math.random() > 0.5 ? 'UP' : 'DOWN';
    
    // Determine direction based on technical analysis
    let direction;
    let confidence;
    
    if (rsi < 40 && macd < 0 && trend === 'UP') {
        direction = 'BUY'; // Oversold with bullish trend
        confidence = 82 + Math.random() * 15; // 82-97%
    } else if (rsi > 60 && macd > 0 && trend === 'DOWN') {
        direction = 'SELL'; // Overbought with bearish trend
        confidence = 82 + Math.random() * 15;
    } else if (trend === 'UP') {
        direction = 'BUY';
        confidence = 75 + Math.random() * 15; // 75-90%
    } else {
        direction = 'SELL';
        confidence = 75 + Math.random() * 15;
    }
    
    // Limit confidence to 99%
    confidence = Math.min(99, Math.round(confidence));
    
    // Create signal object
    currentSignal = {
        asset: currentAsset,
        pair: asset.name,
        direction: direction,
        entryPrice: currentPrice,
        expiration: currentTimeframe,
        confidence: confidence,
        timestamp: Date.now(),
        result: null,
        priceHistory: []
    };
    
    console.log('Signal created:', currentSignal);
    
    // Display signal
    displaySignal();
    
    // Start expiration timer
    startExpirationTimer();
}

// Display generated signal
function displaySignal() {
    const signal = currentSignal;
    if (!signal) return;
    
    // Hide placeholder, show details
    document.getElementById('signal-content').style.display = 'none';
    document.getElementById('signal-details').style.display = 'block';
    document.getElementById('expiration-timer').style.display = 'block';
    
    const dict = translations[currentLanguage];
    
    // Update signal details
    document.getElementById('signal-pair').textContent = signal.pair;
    
    const directionElement = document.getElementById('signal-direction');
    directionElement.textContent = signal.direction === 'BUY' ? dict.buy : dict.sell;
    directionElement.setAttribute('data-direction', signal.direction);
    
    document.getElementById('signal-entry').textContent = signal.entryPrice.toFixed(4);
    document.getElementById('signal-accuracy').textContent = signal.confidence + '%';
    document.getElementById('signal-expiration').textContent = TRADING_CONFIG.timeframes[signal.expiration].name;
    
    const time = new Date(signal.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    document.getElementById('signal-time').textContent = time;
    
    // Update signal status
    const statusColor = signal.direction === 'BUY' ? '#00ff88' : '#ff4444';
    updateSignalStatus('АКТИВЕН', statusColor);
    
    // Start recording price history for this signal
    startPriceRecording();
}

// Start recording price history
function startPriceRecording() {
    if (!currentSignal) return;
    
    // Clear previous history
    currentSignal.priceHistory = [];
    
    // Record initial price
    const asset = TRADING_CONFIG.assets[currentAsset];
    if (asset) {
        currentSignal.priceHistory.push({
            time: Date.now(),
            price: asset.price
        });
    }
    
    // Record price every second during expiration
    const priceInterval = setInterval(() => {
        if (!currentSignal || currentSignal.result) {
            clearInterval(priceInterval);
            return;
        }
        
        const asset = TRADING_CONFIG.assets[currentAsset];
        if (asset) {
            // Simulate price movement
            const volatility = asset.volatility;
            const lastPrice = currentSignal.priceHistory[currentSignal.priceHistory.length - 1].price;
            const change = (Math.random() - 0.5) * volatility * 0.0001;
            const newPrice = lastPrice * (1 + change);
            
            currentSignal.priceHistory.push({
                time: Date.now(),
                price: newPrice
            });
        }
    }, 1000);
}

// Start expiration timer
function startExpirationTimer() {
    if (!currentSignal) return;
    
    const expirationTime = TRADING_CONFIG.timeframes[currentSignal.expiration].seconds;
    let timeLeft = expirationTime;
    
    const timerBar = document.getElementById('timer-bar');
    const timerValue = document.getElementById('timer-value');
    
    if (!timerBar || !timerValue) return;
    
    timerBar.style.width = '100%';
    timerBar.style.transition = `width ${expirationTime}s linear`;
    timerBar.style.background = 'linear-gradient(90deg, #00ff88, #0066ff)';
    
    // Start countdown
    expirationTimer = setInterval(() => {
        timeLeft--;
        
        // Update timer display
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerValue.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
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
    const initialMinutes = Math.floor(expirationTime / 60);
    const initialSeconds = expirationTime % 60;
    timerValue.textContent = `${initialMinutes.toString().padStart(2, '0')}:${initialSeconds.toString().padStart(2, '0')}`;
}

// Calculate signal result
function calculateSignalResult() {
    console.log('Calculating signal result...');
    
    const signal = currentSignal;
    if (!signal) return;
    
    const asset = TRADING_CONFIG.assets[signal.asset];
    if (!asset) return;
    
    // Get final price from price history or simulate
    let finalPrice;
    if (signal.priceHistory && signal.priceHistory.length > 0) {
        finalPrice = signal.priceHistory[signal.priceHistory.length - 1].price;
    } else {
        // Fallback: simulate price movement
        const volatility = asset.volatility;
        const randomMove = (Math.random() - 0.5) * volatility * 0.01;
        finalPrice = signal.entryPrice * (1 + randomMove);
    }
    
    // Determine result based on direction and price movement
    let result;
    
    if (signal.direction === 'BUY') {
        result = finalPrice > signal.entryPrice ? 'WIN' : 
                finalPrice < signal.entryPrice ? 'LOSS' : 'REFUND';
    } else { // SELL
        result = finalPrice < signal.entryPrice ? 'WIN' : 
                finalPrice > signal.entryPrice ? 'LOSS' : 'REFUND';
    }
    
    // Update signal with result
    signal.result = result;
    signal.exitPrice = finalPrice;
    
    console.log('Signal result:', result, 'Entry:', signal.entryPrice, 'Exit:', finalPrice);
    
    // Display result
    displayResult(result, finalPrice);
    
    // Add to history
    addToHistory(signal);
    
    // Reset after delay
    setTimeout(resetSignal, 3000);
}

// Display signal result
function displayResult(result, finalPrice) {
    const dict = translations[currentLanguage];
    const resultText = result === 'WIN' ? dict.win : 
                     result === 'LOSS' ? dict.loss : dict.refund;
    const resultColor = result === 'WIN' ? '#00ff88' : 
                       result === 'LOSS' ? '#ff4444' : '#8b9dc3';
    
    // Update signal details with result
    const detailsElement = document.getElementById('signal-details');
    if (detailsElement) {
        detailsElement.innerHTML += `
            <div class="detail-row" style="margin-top: 15px; padding-top: 15px; border-top: 2px solid ${resultColor}30;">
                <span class="detail-label">${dict.result}:</span>
                <span class="detail-value" style="color: ${resultColor}; font-weight: 800; font-size: 16px;">
                    ${resultText}
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">${dict.exitPrice}:</span>
                <span class="detail-value">${finalPrice.toFixed(4)}</span>
            </div>
        `;
    }
    
    // Update signal status
    updateSignalStatus(resultText, resultColor);
}

// Add signal to history
function addToHistory(signal) {
    const dict = translations[currentLanguage];
    
    const resultItem = {
        id: Date.now(),
        pair: signal.pair,
        direction: signal.direction,
        entryPrice: signal.entryPrice,
        exitPrice: signal.exitPrice,
        accuracy: signal.confidence,
        result: signal.result,
        timeframe: TRADING_CONFIG.timeframes[signal.expiration].name,
        priceHistory: signal.priceHistory || [],
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        timestamp: Date.now(),
        expanded: false
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
    
    // Save to localStorage
    localStorage.setItem('scalpingRobotResults', JSON.stringify(resultsHistory));
}

// Update history display
function updateHistoryDisplay() {
    const resultsList = document.getElementById('results-list');
    if (!resultsList) return;
    
    resultsList.innerHTML = '';
    
    const dict = translations[currentLanguage];
    
    resultsHistory.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${item.result.toLowerCase()} ${item.expanded ? 'expanded' : ''}`;
        resultItem.dataset.id = item.id;
        
        const directionText = item.direction === 'BUY' ? dict.buy : dict.sell;
        const directionColor = item.direction === 'BUY' ? '#00ff88' : '#ff4444';
        const resultColor = item.result === 'WIN' ? '#00ff88' : 
                           item.result === 'LOSS' ? '#ff4444' : '#8b9dc3';
        const resultText = item.result === 'WIN' ? dict.win : 
                          item.result === 'LOSS' ? dict.loss : dict.refund;
        
        // Create mini-chart SVG
        const chartSVG = createMiniChart(item.priceHistory, item.result);
        
        resultItem.innerHTML = `
            <div class="result-header">
                <div class="result-main-info">
                    <div class="result-pair">${item.pair}</div>
                    <div class="result-direction ${item.direction.toLowerCase()}" style="color: ${directionColor}">
                        ${directionText}
                    </div>
                    <div class="result-accuracy" style="color: ${item.accuracy > 80 ? '#00ff88' : '#ffaa00'}">
                        ${item.accuracy}%
                    </div>
                </div>
                <div class="result-price-info">
                    <div class="price-entry">
                        <div class="price-label">${dict.entryPrice}</div>
                        <div class="price-value">${item.entryPrice.toFixed(4)}</div>
                    </div>
                    <div class="price-exit">
                        <div class="price-label">${dict.exitPrice}</div>
                        <div class="price-value">${item.exitPrice.toFixed(4)}</div>
                    </div>
                </div>
            </div>
            <div class="result-details">
                <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 5px;">
                    ${dict.priceChart}
                </div>
                <div class="price-chart-mini">
                    ${chartSVG}
                </div>
            </div>
            <div class="result-footer">
                <div class="result-time">
                    <i class="far fa-clock"></i>
                    ${item.time} • ${item.timeframe}
                </div>
                <button class="result-expand" onclick="toggleResultExpand(${item.id})">
                    <i class="fas fa-${item.expanded ? 'chevron-up' : 'chevron-down'}"></i>
                    ${item.expanded ? dict.collapse : dict.expand}
                </button>
            </div>
        `;
        
        resultsList.appendChild(resultItem);
    });
}

// Create mini-chart SVG
function createMiniChart(priceHistory, result) {
    if (!priceHistory || priceHistory.length < 2) {
        return '<div style="color: var(--text-muted); font-size: 10px; padding: 10px;">Нет данных</div>';
    }
    
    const prices = priceHistory.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;
    
    const width = 200;
    const height = 40;
    const padding = 5;
    
    // Normalize prices to fit in the chart
    const normalizedPrices = prices.map(price => {
        return ((price - minPrice) / priceRange) * (height - 2 * padding) + padding;
    });
    
    // Create SVG path
    let path = `M ${padding} ${height - normalizedPrices[0]}`;
    const step = (width - 2 * padding) / (normalizedPrices.length - 1);
    
    for (let i = 1; i < normalizedPrices.length; i++) {
        const x = padding + (i * step);
        const y = height - normalizedPrices[i];
        path += ` L ${x} ${y}`;
    }
    
    const color = result === 'WIN' ? '#00ff88' : 
                 result === 'LOSS' ? '#ff4444' : '#8b9dc3';
    
    return `
        <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}">
            <path d="${path}" 
                  stroke="${color}" 
                  stroke-width="2" 
                  fill="none" 
                  class="price-line ${result.toLowerCase()}" />
        </svg>
    `;
}

// Toggle result expand/collapse
function toggleResultExpand(id) {
    const item = resultsHistory.find(r => r.id === id);
    if (item) {
        item.expanded = !item.expanded;
        updateHistoryDisplay();
        localStorage.setItem('scalpingRobotResults', JSON.stringify(resultsHistory));
    }
}

// Update statistics display
function updateStats() {
    const totalTrades = resultsHistory.length;
    const wins = resultsHistory.filter(r => r.result === 'WIN').length;
    const losses = resultsHistory.filter(r => r.result === 'LOSS').length;
    const refunds = resultsHistory.filter(r => r.result === 'REFUND').length;
    
    // Calculate win rate (excluding refunds)
    const winRate = (wins + losses) > 0 ? (wins / (wins + losses) * 100) : 0;
    
    // Calculate accuracy (counting refunds as 0.5)
    const accuracy = totalTrades > 0 ? ((wins + (refunds * 0.5)) / totalTrades * 100) : 0;
    
    // Calculate profit factor
    const profitFactor = losses > 0 ? (wins / losses).toFixed(2) : '∞';
    
    // Count today's trades
    const today = new Date().toDateString();
    const todayTrades = resultsHistory.filter(r => 
        new Date(r.timestamp).toDateString() === today
    ).length;
    
    // Update displays
    document.getElementById('win-rate').textContent = winRate.toFixed(1) + '%';
    document.getElementById('profit-factor').textContent = profitFactor;
    document.getElementById('today-trades').textContent = todayTrades;
    
    // Update accuracy meter
    const accuracyFill = document.querySelector('.accuracy-fill');
    const accuracyValue = document.querySelector('.accuracy-value');
    if (accuracyFill && accuracyValue) {
        const displayAccuracy = totalTrades > 0 ? accuracy : 87.4;
        accuracyFill.style.width = displayAccuracy + '%';
        accuracyValue.textContent = displayAccuracy.toFixed(1) + '%';
    }
}

// Update stats display (initial)
function updateStatsDisplay() {
    updateStats();
}

// Reset signal state
function resetSignal() {
    console.log('Resetting signal state...');
    
    isSignalActive = false;
    currentSignal = null;
    
    const signalBtn = document.getElementById('generate-signal');
    const firstSignalBtn = document.getElementById('generate-first-signal');
    
    if (signalBtn) {
        signalBtn.disabled = false;
        signalBtn.classList.remove('signal-active');
    }
    
    if (firstSignalBtn) {
        firstSignalBtn.disabled = false;
    }
    
    const dict = translations[currentLanguage];
    
    // Show placeholder, hide details and timer
    document.getElementById('signal-content').style.display = 'flex';
    document.getElementById('signal-details').style.display = 'none';
    document.getElementById('expiration-timer').style.display = 'none';
    
    // Reset placeholder
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        signalContent.innerHTML = `
            <div class="signal-placeholder">
                <i class="fas fa-chart-line"></i>
                <p>${dict.clickGenerate}</p>
            </div>
        `;
    }
    
    // Reset signal status
    updateSignalStatus(dict.waiting, '#00ff88');
    
    // Reset timer
    const timerBar = document.getElementById('timer-bar');
    if (timerBar) {
        timerBar.style.width = '0%';
        timerBar.style.transition = 'none';
    }
    
    // Clear any remaining timer
    if (expirationTimer) {
        clearInterval(expirationTimer);
        expirationTimer = null;
    }
    
    console.log('Signal state reset');
}

// Load results history from localStorage
function loadResultsHistory() {
    try {
        const saved = localStorage.getItem('scalpingRobotResults');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Ensure all items have required fields
            resultsHistory = parsed.map(item => ({
                ...item,
                expanded: item.expanded || false,
                priceHistory: item.priceHistory || []
            }));
            updateHistoryDisplay();
            console.log('Loaded history:', resultsHistory.length, 'items');
        }
    } catch (error) {
        console.error('Error loading history:', error);
    }
}

// Update time display
function updateTimeDisplay() {
    const now = new Date();
    const timeString = now.toUTCString().split(' ')[4];
    const timeText = document.getElementById('time-text');
    
    if (timeText) {
        timeText.textContent = timeString + ' UTC';
    }
}

// Make toggleResultExpand globally available
window.toggleResultExpand = toggleResultExpand;

// Initialize with default values
updateAssetInfo();
