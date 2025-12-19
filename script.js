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
        60: '1 мин',
        120: '2 мин',
        180: '3 мин',
        300: '5 мин'
    }
};

// Global Variables
let currentChart = null;
let candlestickSeries = null;
let currentSignal = null;
let isSignalActive = false;
let expirationTimer = null;
let resultsHistory = [];
let currentAsset = 'EURUSD';
let currentTimeframe = 300; // 5 минут по умолчанию
let candlesData = [];
let chartInitialized = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Scalping Robot Pro...');
    
    initializeEventListeners();
    updateTimeDisplay();
    loadResultsHistory();
    updateStatsDisplay();
    
    // Update time every second
    setInterval(updateTimeDisplay, 1000);
    
    // Initialize chart after a short delay to ensure DOM is ready
    setTimeout(initializeChart, 500);
    
    console.log('Scalping Robot Pro initialized successfully!');
});

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
        
        // Create candlestick series
        candlestickSeries = currentChart.addCandlestickSeries({
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
        
        chartInitialized = true;
        console.log('Chart initialized successfully');
        
        // Generate initial data
        generateCandles();
        
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

// Generate random candle data
function generateCandles() {
    if (!chartInitialized) return;
    
    console.log('Generating candles for', currentAsset);
    const asset = TRADING_CONFIG.assets[currentAsset];
    const basePrice = asset.price;
    const volatility = asset.volatility;
    
    candlesData = [];
    const now = Math.floor(Date.now() / 1000);
    const timeframe = currentTimeframe;
    
    // Generate 150 candles
    for (let i = 150; i >= 0; i--) {
        const time = now - (i * timeframe);
        
        if (i === 0) {
            // Current candle
            candlesData.push({
                time: time,
                open: basePrice * (1 + (Math.random() - 0.5) * 0.001),
                high: basePrice * (1 + Math.random() * 0.002),
                low: basePrice * (1 - Math.random() * 0.002),
                close: basePrice,
            });
        } else {
            // Historical candles
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
    if (!chartInitialized || !candlestickSeries || candlesData.length === 0) {
        console.log('Chart not ready or no data');
        return;
    }
    
    console.log('Updating chart with', candlesData.length, 'candles');
    
    try {
        // Set data
        candlestickSeries.setData(candlesData);
        
        // Draw technical analysis
        drawTechnicalAnalysis();
        
        // Fit content
        currentChart.timeScale().fitContent();
        
        console.log('Chart updated successfully');
    } catch (error) {
        console.error('Error updating chart:', error);
    }
}

// Draw technical analysis indicators
function drawTechnicalAnalysis() {
    if (!chartInitialized || candlesData.length < 10) return;
    
    console.log('Drawing technical analysis...');
    
    try {
        // Remove existing indicators
        currentChart.removeSeries(currentChart._series?.filter(s => s !== candlestickSeries) || []);
        
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
                lineStyle: level === 0.618 || level === 0.382 ? 2 : 0, // 0 = solid, 2 = dotted
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
        drawOrderBlocks();
        
        console.log('Technical analysis drawn');
    } catch (error) {
        console.error('Error drawing technical analysis:', error);
    }
}

// Draw order blocks
function drawOrderBlocks() {
    if (!chartInitialized) return;
    
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
                { time: candle.time + currentTimeframe * 10, value: candle.high, color: 'rgba(0, 255, 136, 0.1)' },
                { time: candle.time + currentTimeframe * 10, value: candle.low, color: 'rgba(0, 255, 136, 0.1)' },
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
                { time: candle.time + currentTimeframe * 10, value: candle.high, color: 'rgba(255, 68, 68, 0.1)' },
                { time: candle.time + currentTimeframe * 10, value: candle.low, color: 'rgba(255, 68, 68, 0.1)' },
                { time: candle.time, value: candle.low, color: 'rgba(255, 68, 68, 0.1)' }
            ];
            
            areaSeries.setData(areaData);
        }
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
            if (chartInitialized) {
                generateCandles();
            }
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
            document.getElementById('current-tf').textContent = TRADING_CONFIG.timeframes[currentTimeframe];
            
            // Regenerate candles with new timeframe
            if (chartInitialized) {
                generateCandles();
            }
        });
    });
    
    // Generate signal button
    const generateBtn = document.getElementById('generate-signal');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateSignal);
        console.log('Signal button listener added');
    }
    
    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            console.log('Language changed to:', this.dataset.lang);
        });
    });
    
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
    
    const signalBtn = document.getElementById('generate-signal');
    if (signalBtn) {
        signalBtn.disabled = true;
        signalBtn.classList.add('signal-active');
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
    updateSignalStatus('Анализ', '#ffaa00');
    
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
        result: null
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
    
    // Update signal details
    document.getElementById('signal-pair').textContent = signal.pair;
    
    const directionElement = document.getElementById('signal-direction');
    directionElement.textContent = signal.direction === 'BUY' ? 'ПОКУПКА' : 'ПРОДАЖА';
    directionElement.setAttribute('data-direction', signal.direction);
    
    document.getElementById('signal-entry').textContent = signal.entryPrice.toFixed(4);
    document.getElementById('signal-accuracy').textContent = signal.confidence + '%';
    document.getElementById('signal-expiration').textContent = TRADING_CONFIG.timeframes[signal.expiration];
    
    const time = new Date(signal.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    document.getElementById('signal-time').textContent = time;
    
    // Update signal status
    const statusColor = signal.direction === 'BUY' ? '#00ff88' : '#ff4444';
    updateSignalStatus('АКТИВЕН', statusColor);
}

// Start expiration timer
function startExpirationTimer() {
    if (!currentSignal) return;
    
    const expirationTime = currentSignal.expiration;
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
    
    // Simulate price movement during expiration
    const volatility = asset.volatility;
    const randomMove = (Math.random() - 0.5) * volatility * 0.01;
    const finalPrice = signal.entryPrice * (1 + randomMove);
    
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
    signal.finalPrice = finalPrice;
    
    console.log('Signal result:', result, 'Final price:', finalPrice);
    
    // Display result
    displayResult(result, finalPrice);
    
    // Add to history
    addToHistory(signal);
    
    // Reset after delay
    setTimeout(resetSignal, 3000);
}

// Display signal result
function displayResult(result, finalPrice) {
    const resultText = result === 'WIN' ? 'ВЫИГРЫШ' : 
                     result === 'LOSS' ? 'ПРОИГРЫШ' : 'ВОЗВРАТ';
    const resultColor = result === 'WIN' ? '#00ff88' : 
                       result === 'LOSS' ? '#ff4444' : '#8b9dc3';
    
    // Update signal details with result
    const detailsElement = document.getElementById('signal-details');
    if (detailsElement) {
        detailsElement.innerHTML += `
            <div class="detail-row" style="margin-top: 15px; padding-top: 15px; border-top: 2px solid ${resultColor}30;">
                <span class="detail-label">Результат:</span>
                <span class="detail-value" style="color: ${resultColor}; font-weight: 800; font-size: 16px;">
                    ${resultText}
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Цена выхода:</span>
                <span class="detail-value">${finalPrice.toFixed(4)}</span>
            </div>
        `;
    }
    
    // Update signal status
    updateSignalStatus(resultText, resultColor);
}

// Add signal to history
function addToHistory(signal) {
    const resultItem = {
        pair: signal.pair,
        direction: signal.direction,
        accuracy: signal.confidence,
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
    
    // Save to localStorage
    localStorage.setItem('scalpingRobotResults', JSON.stringify(resultsHistory));
}

// Update history display
function updateHistoryDisplay() {
    const resultsList = document.getElementById('results-list');
    if (!resultsList) return;
    
    resultsList.innerHTML = '';
    
    resultsHistory.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${item.result.toLowerCase()}`;
        
        const directionText = item.direction === 'BUY' ? 'ПОКУПКА' : 'ПРОДАЖА';
        const directionColor = item.direction === 'BUY' ? '#00ff88' : '#ff4444';
        const resultColor = item.result === 'WIN' ? '#00ff88' : 
                           item.result === 'LOSS' ? '#ff4444' : '#8b9dc3';
        const resultText = item.result === 'WIN' ? 'ВЫИГРЫШ' : 
                          item.result === 'LOSS' ? 'ПРОИГРЫШ' : 'ВОЗВРАТ';
        
        resultItem.innerHTML = `
            <div class="result-pair">${item.pair}</div>
            <div class="result-direction" style="color: ${directionColor}">${directionText}</div>
            <div class="result-accuracy" style="color: ${item.accuracy > 80 ? '#00ff88' : '#ffaa00'}">${item.accuracy}%</div>
            <div class="result-result ${item.result.toLowerCase()}" style="color: ${resultColor}">${resultText}</div>
            <div class="result-time">${item.time}</div>
        `;
        
        resultsList.appendChild(resultItem);
    });
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
    if (signalBtn) {
        signalBtn.disabled = false;
        signalBtn.classList.remove('signal-active');
    }
    
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
                <p>Нажмите "Получить сигнал" для анализа</p>
            </div>
        `;
    }
    
    // Reset signal status
    updateSignalStatus('Ожидание', '#00ff88');
    
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
            resultsHistory = JSON.parse(saved);
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

// Initialize with default values
updateAssetInfo();
