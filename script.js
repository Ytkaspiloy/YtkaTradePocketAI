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
    }
};

// Global Variables
let currentChart = null;
let currentSignal = null;
let isSignalActive = false;
let expirationTimer = null;
let resultsHistory = [];
let currentAsset = 'EURJPY';
let currentTimeframe = 3;
let candlesData = [];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Scalping Robot...');
    
    initializeChart();
    initializeEventListeners();
    updateTimeDisplay();
    loadResultsHistory();
    
    // Update time every second
    setInterval(updateTimeDisplay, 1000);
    
    // Generate initial candles
    generateCandles();
    
    console.log('Scalping Robot initialized successfully!');
});

// Initialize TradingView Lightweight Charts
function initializeChart() {
    console.log('Initializing chart...');
    const chartContainer = document.getElementById('trading-chart');
    
    if (!chartContainer) {
        console.error('Chart container not found!');
        return;
    }
    
    // Clear previous chart
    chartContainer.innerHTML = '';
    
    try {
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
        
        console.log('Chart created successfully');
    } catch (error) {
        console.error('Error creating chart:', error);
    }
}

// Generate random candle data
function generateCandles() {
    console.log('Generating candles for', currentAsset);
    const asset = TRADING_CONFIG.assets[currentAsset];
    const basePrice = asset.price;
    const volatility = asset.volatility;
    
    candlesData = [];
    const now = Math.floor(Date.now() / 1000);
    const timeframe = currentTimeframe;
    
    for (let i = 150; i >= 0; i--) {
        const time = now - (i * timeframe);
        
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
    if (!currentChart || candlesData.length === 0) {
        console.log('Chart not ready or no data');
        return;
    }
    
    console.log('Updating chart with', candlesData.length, 'candles');
    
    try {
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
        });
        
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
    if (candlesData.length < 10) return;
    
    console.log('Drawing technical analysis...');
    
    try {
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
        
        // Draw trend line (green) - diagonal
        const trendSeries = currentChart.addLineSeries({
            color: '#22ff55',
            lineWidth: 2,
            lineStyle: 0,
        });
        
        // Simple upward trend
        const trendData = [];
        const step = (candlesData[candlesData.length - 1].close - candlesData[0].close) / candlesData.length;
        for (let i = 0; i < candlesData.length; i += 10) {
            trendData.push({
                time: candlesData[i].time,
                value: candlesData[0].close + (step * i)
            });
        }
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
    // Bullish order blocks (green)
    const bullishBlocks = [];
    const bearishBlocks = [];
    
    // Find significant candles for order blocks
    for (let i = 1; i < candlesData.length - 1; i++) {
        const candle = candlesData[i];
        const prevCandle = candlesData[i - 1];
        
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
    
    // Draw bullish order blocks (horizontal areas)
    bullishBlocks.forEach(block => {
        const areaSeries = currentChart.addHistogramSeries({
            color: 'rgba(0, 255, 136, 0.2)',
        });
        
        // Create multiple data points for the area
        const areaData = [];
        for (let t = block.time; t < block.time + (currentTimeframe * 20); t += currentTimeframe) {
            areaData.push({
                time: t,
                value: block.high,
                color: 'rgba(0, 255, 136, 0.1)'
            });
        }
        
        // Add bottom of the area
        areaData.push({
            time: block.time + (currentTimeframe * 20),
            value: block.low,
            color: 'rgba(0, 255, 136, 0.1)'
        });
        
        areaSeries.setData(areaData);
    });
    
    // Draw bearish order blocks
    bearishBlocks.forEach(block => {
        const areaSeries = currentChart.addHistogramSeries({
            color: 'rgba(255, 68, 68, 0.2)',
        });
        
        const areaData = [];
        for (let t = block.time; t < block.time + (currentTimeframe * 20); t += currentTimeframe) {
            areaData.push({
                time: t,
                value: block.low,
                color: 'rgba(255, 68, 68, 0.1)'
            });
        }
        
        areaData.push({
            time: block.time + (currentTimeframe * 20),
            value: block.high,
            color: 'rgba(255, 68, 68, 0.1)'
        });
        
        areaSeries.setData(areaData);
    });
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
            generateCandles();
        });
    } else {
        console.error('Asset select element not found!');
    }
    
    // Timeframe buttons
    const timeframeButtons = document.getElementById('timeframe-buttons');
    if (timeframeButtons) {
        timeframeButtons.addEventListener('click', function(e) {
            if (e.target.classList.contains('time-btn')) {
                // Remove active class from all buttons
                document.querySelectorAll('.time-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Update current timeframe
                currentTimeframe = parseInt(e.target.dataset.time);
                console.log('Timeframe changed to:', currentTimeframe, 'seconds');
                
                // Regenerate candles with new timeframe
                generateCandles();
            }
        });
    } else {
        console.error('Timeframe buttons container not found!');
    }
    
    // Generate signal button
    const generateBtn = document.getElementById('generate-signal');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateSignal);
        console.log('Signal button listener added');
    } else {
        console.error('Generate signal button not found!');
    }
    
    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            console.log('Language changed to:', this.dataset.lang);
        });
    });
    
    console.log('Event listeners initialized');
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
                <p style="margin-top: 15px; color: #8b9dc3;">Анализ рынка...</p>
            </div>
        `;
    }
    
    // Update signal status
    const signalStatus = document.getElementById('signal-status');
    if (signalStatus) {
        signalStatus.innerHTML = `
            <span class="status-dot" style="background: #ffaa00;"></span>
            <span style="color: #ffaa00;">Анализ</span>
        `;
    }
    
    // Simulate analysis delay
    setTimeout(() => {
        createSignal();
    }, 1500);
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
    
    console.log('Signal created:', currentSignal);
    
    // Display signal
    displaySignal();
    
    // Start expiration timer
    startExpirationTimer();
}

// Display generated signal
function displaySignal() {
    const signal = currentSignal;
    const signalContent = document.getElementById('signal-content');
    
    if (!signalContent || !signal) return;
    
    const directionClass = signal.direction === 'BUY' ? 'buy' : 'sell';
    const directionColor = signal.direction === 'BUY' ? '#00ff88' : '#ff4444';
    
    signalContent.innerHTML = `
        <div class="signal-details">
            <div class="signal-pair" style="font-size: 24px; font-weight: 700; margin-bottom: 10px;">${signal.pair}</div>
            <div class="signal-direction" style="color: ${directionColor}; font-size: 32px; font-weight: 800; margin: 15px 0; text-transform: uppercase;">
                ${signal.direction === 'BUY' ? 'ПОКУПКА' : 'ПРОДАЖА'}
            </div>
            <div class="signal-info">
                <div style="display: flex; justify-content: space-between; margin: 10px 0; padding: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 6px;">
                    <span style="color: #8b9dc3;">Цена входа:</span>
                    <span style="font-weight: 700;">${signal.entryPrice.toFixed(4)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0; padding: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 6px;">
                    <span style="color: #8b9dc3;">Экспирация:</span>
                    <span style="font-weight: 700;">${signal.expiration} секунд</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0; padding: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 6px;">
                    <span style="color: #8b9dc3;">Уверенность:</span>
                    <span style="font-weight: 700; color: ${directionColor};">${signal.confidence}%</span>
                </div>
            </div>
            <div style="margin-top: 20px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; text-align: center;">
                <div style="color: #8b9dc3; font-size: 12px; margin-bottom: 5px;">
                    СИГНАЛ СГЕНЕРИРОВАН
                </div>
                <div style="font-size: 11px; color: #5d6d97;">
                    ${new Date(signal.timestamp).toLocaleTimeString()}
                </div>
            </div>
        </div>
    `;
    
    // Update signal status
    const signalStatus = document.getElementById('signal-status');
    if (signalStatus) {
        signalStatus.innerHTML = `
            <span class="status-dot" style="background: ${directionColor}; animation: pulse 1s infinite;"></span>
            <span style="color: ${directionColor}; font-weight: 600;">АКТИВЕН</span>
        `;
    }
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
        timerValue.textContent = `00:${timeLeft.toString().padStart(2, '0')}`;
        
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
    console.log('Calculating signal result...');
    
    const signal = currentSignal;
    if (!signal) return;
    
    const asset = TRADING_CONFIG.assets[signal.asset];
    if (!asset) return;
    
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
    const signalContent = document.getElementById('signal-content');
    if (!signalContent) return;
    
    const resultText = result === 'WIN' ? 'ВЫИГРЫШ' : 
                     result === 'LOSS' ? 'ПРОИГРЫШ' : 'ВОЗВРАТ';
    const resultColor = result === 'WIN' ? '#00ff88' : 
                       result === 'LOSS' ? '#ff4444' : '#8b9dc3';
    
    const resultHTML = `
        <div style="margin-top: 20px; padding: 20px; background: ${resultColor}15; border-radius: 12px; border: 1px solid ${resultColor}30; text-align: center;">
            <div style="font-size: 28px; font-weight: 800; color: ${resultColor}; margin-bottom: 10px;">
                ${resultText}
            </div>
            <div style="color: #8b9dc3; font-size: 14px; margin-bottom: 10px;">
                Финальная цена: ${finalPrice.toFixed(4)}
            </div>
            <div style="font-size: 12px; color: #5d6d97;">
                ${new Date().toLocaleTimeString()}
            </div>
        </div>
    `;
    
    signalContent.innerHTML += resultHTML;
    
    // Update signal status
    const signalStatus = document.getElementById('signal-status');
    if (signalStatus) {
        signalStatus.innerHTML = `
            <span class="status-dot" style="background: ${resultColor};"></span>
            <span style="color: ${resultColor}; font-weight: 600;">${result}</span>
        `;
    }
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
            <div class="result-direction" style="color: ${directionColor}; font-weight: 700;">
                ${directionText}
            </div>
            <div class="result-result" style="color: ${resultColor}; font-weight: 700;">
                ${resultText}
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
    
    const accuracy = totalTrades > 0 ? ((wins + (resultsHistory.filter(r => r.result === 'REFUND').length * 0.5)) / totalTrades * 100) : 0;
    const winRate = (wins + losses) > 0 ? (wins / (wins + losses) * 100) : 0;
    
    const accuracyElement = document.getElementById('accuracy');
    const winRateElement = document.getElementById('win-rate');
    const totalTradesElement = document.getElementById('total-trades');
    
    if (accuracyElement) accuracyElement.textContent = `${accuracy.toFixed(1)}%`;
    if (winRateElement) winRateElement.textContent = `${winRate.toFixed(1)}%`;
    if (totalTradesElement) totalTradesElement.textContent = totalTrades.toString();
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
    
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        signalContent.innerHTML = `
            <div class="signal-placeholder">
                <i class="fas fa-chart-line"></i>
                <p>Нажмите "Получить сигнал" для анализа</p>
            </div>
        `;
    }
    
    const signalStatus = document.getElementById('signal-status');
    if (signalStatus) {
        signalStatus.innerHTML = `
            <span class="status-dot"></span>
            <span>Ожидание</span>
        `;
    }
    
    const timerBar = document.getElementById('timer-bar');
    if (timerBar) {
        timerBar.style.width = '0%';
        timerBar.style.transition = 'none';
        timerBar.style.background = 'linear-gradient(90deg, #00ff88, #0066ff)';
    }
    
    const timerValue = document.getElementById('timer-value');
    if (timerValue) {
        timerValue.textContent = '--:--';
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
            updateStats();
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
    const timeElement = document.getElementById('current-time');
    
    if (timeElement) {
        timeElement.innerHTML = `<i class="far fa-clock"></i> ${timeString} UTC`;
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    if (currentChart) {
        const chartContainer = document.getElementById('trading-chart');
        if (chartContainer) {
            currentChart.resize(
                chartContainer.clientWidth,
                500
            );
            
            // Redraw chart
            setTimeout(() => {
                updateChart();
            }, 100);
        }
    }
});

// Initialize with default asset
updateAssetInfo();
