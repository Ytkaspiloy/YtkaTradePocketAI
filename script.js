// QuantumTrade Pro v12.7 - Web Version
console.log("=".repeat(70));
console.log("QuantumTrade Pro v12.7 - Fixed Large Orders");
console.log("=".repeat(70));

// Configuration
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

// State
let isConnected = false;
let autoTrading = false;
let currentBalance = 0;
let startBalance = 0;
let tradeHistory = [];
let profitHistory = [];
let currentStrategy = "combined";
let enabledIndicators = Object.keys(ALL_INDICATORS);
let martingaleEnabled = true;
let martingaleMultiplier = 2.5;
let martingaleMaxLevel = 5;
let martingaleLevel = 0;
let consecutiveLosses = 0;
let baseAmount = 1;
let maxOrderAmount = 5000;
let wsConnection = null;
let lastAnalysis = null;
let latestPrice = 0;

// Chart
let pnlChart;
let pnlChartData = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    initIndicatorCheckboxes();
    initStatsGrid();
    populateAssetSelect();
    log("QuantumTrade Pro v12.7 initialized");
    log("Web version ready for connection");
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
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: '#1A2540' },
                    ticks: { color: '#8A9AB8' }
                },
                y: {
                    grid: { color: '#1A2540' },
                    ticks: { color: '#8A9AB8' }
                }
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
        cb.onchange = () => updateEnabledIndicators();
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

// Connection
function toggleConnection() {
    if (isConnected) {
        disconnect();
    } else {
        connect();
    }
}

function connect() {
    const ssid = document.getElementById('ssidInput').value.trim();
    if (!ssid) {
        alert('Enter SSID');
        return;
    }
    
    const btn = document.getElementById('connectBtn');
    btn.disabled = true;
    document.getElementById('connectionStatus').textContent = '🟡 Connecting...';
    
    log(`Connecting with SSID: ${ssid.substring(0, 8)}...`);
    
    // Simulate connection (in production, connect to actual API)
    setTimeout(() => {
        isConnected = true;
        currentBalance = 1000 + Math.random() * 500;
        startBalance = currentBalance;
        
        document.getElementById('connectBtn').textContent = '🔌 DISCONNECT';
        document.getElementById('connectBtn').disabled = false;
        document.getElementById('connectionStatus').textContent = '🟢 LIVE';
        document.getElementById('connectionStatus').className = 'status-online';
        document.getElementById('startAutoBtn').disabled = false;
        document.getElementById('stopAutoBtn').disabled = true;
        
        updateBalanceDisplay();
        updatePnLBanner();
        log(`Connected! $${currentBalance.toFixed(2)}`);
        
        // Start mock data stream
        startMockDataStream();
        
        updateMartingaleInfo();
    }, 1500);
}

function disconnect() {
    isConnected = false;
    autoTrading = false;
    
    if (wsConnection) {
        wsConnection.close();
        wsConnection = null;
    }
    
    document.getElementById('connectBtn').textContent = '🔌 CONNECT';
    document.getElementById('connectBtn').disabled = false;
    document.getElementById('connectionStatus').textContent = '⚫ OFFLINE';
    document.getElementById('connectionStatus').className = 'status-offline';
    document.getElementById('startAutoBtn').disabled = true;
    document.getElementById('stopAutoBtn').disabled = true;
    document.getElementById('autoStatus').textContent = '🔴 INACTIVE';
    document.getElementById('autoStatus').className = 'auto-inactive';
    
    log('Disconnected');
}

// Mock data stream for demo
function startMockDataStream() {
    const assets = ['EURUSD_otc', 'GBPUSD_otc', 'EURUSD'];
    let price = 1.0843;
    
    setInterval(() => {
        if (!isConnected) return;
        
        const change = (Math.random() - 0.5) * 0.0010;
        price += change;
        latestPrice = price;
        
        const candle = {
            open: price - change,
            high: price + Math.abs(change) * 1.5,
            low: price - Math.abs(change) * 1.5,
            close: price
        };
        
        document.getElementById('currentPrice').textContent = price.toFixed(5);
        document.getElementById('currentPrice').style.color = change >= 0 ? '#00FF88' : '#FF4444';
        document.getElementById('oPrice').textContent = `O:${candle.open.toFixed(5)}`;
        document.getElementById('hPrice').textContent = `H:${candle.high.toFixed(5)}`;
        document.getElementById('lPrice').textContent = `L:${candle.low.toFixed(5)}`;
        document.getElementById('cPrice').textContent = `C:${candle.close.toFixed(5)}`;
        
        // Run analysis periodically
        if (Math.random() < 0.3) {
            runAnalysis();
        }
    }, 1000);
}

function runAnalysis() {
    if (!lastAnalysis) {
        lastAnalysis = {
            signal: ['call', 'put', 'hold'][Math.floor(Math.random() * 3)],
            confidence: Math.floor(Math.random() * 40) + 50,
            score: Math.floor(Math.random() * 20) - 10,
            last_price: latestPrice,
            rsi: Math.floor(Math.random() * 100),
            macd: (Math.random() * 0.001).toFixed(5),
            stoch_k: Math.floor(Math.random() * 100),
            bb_upper: latestPrice * 1.02,
            bb_lower: latestPrice * 0.98,
            trend: Math.random() > 0.5 ? 'bullish' : 'bearish',
            enabled_count: enabledIndicators.length,
            max_score: 50
        };
    }
    
    const signal = lastAnalysis.signal;
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
    
    document.getElementById('liveConf').textContent = `Conf:${lastAnalysis.confidence}%`;
    document.getElementById('liveScore').textContent = `Score:${lastAnalysis.score}`;
    
    updateIndicatorValues();
    updateAnalysisText();
    
    // Auto trading logic
    if (autoTrading && isConnected && lastAnalysis.confidence >= parseInt(document.getElementById('minConfidence').value)) {
        if (signal !== 'hold') {
            const amount = calculateTradeAmount();
            if (amount <= currentBalance * 0.95 && amount <= maxOrderAmount) {
                log(`🎯 AUTO ${signal.toUpperCase()} $${amount.toFixed(2)} | Conf:${lastAnalysis.confidence}% | Dur:${document.getElementById('autoDuration').value}s`);
                executeAutoTrade(signal, amount);
            }
        }
    }
}

function calculateTradeAmount() {
    if (!martingaleEnabled || document.querySelector('input[name="strategy"]:checked').value === 'fixed') {
        martingaleLevel = 0;
        return baseAmount;
    }
    
    if (consecutiveLosses > 0) {
        const lossLevel = Math.min(consecutiveLosses, martingaleMaxLevel);
        martingaleLevel = lossLevel;
        const calculated = Math.round(baseAmount * Math.pow(martingaleMultiplier, lossLevel) * 100) / 100;
        
        if (calculated > maxOrderAmount) {
            log(`⚠️ Order amount $${calculated.toFixed(2)} exceeds MAX $${maxOrderAmount}! Resetting martingale...`);
            consecutiveLosses = 0;
            martingaleLevel = 0;
            return baseAmount;
        }
        
        if (calculated > currentBalance * 0.95) {
            log(`⚠️ Insufficient balance for $${calculated.toFixed(2)}! Resetting martingale...`);
            consecutiveLosses = 0;
            martingaleLevel = 0;
            return baseAmount;
        }
        
        return calculated;
    }
    
    martingaleLevel = 0;
    return baseAmount;
}

function executeAutoTrade(direction, amount) {
    const winProb = 0.55;
    const isWin = Math.random() < winProb;
    const profit = isWin ? amount * 0.85 : -amount;
    
    currentBalance += profit;
    
    const trade = {
        time: new Date().toLocaleTimeString(),
        type: 'AUTO',
        direction: direction.toUpperCase(),
        amount: amount,
        result: isWin ? 'WIN' : 'LOSS',
        pnl: profit,
        balanceBefore: currentBalance - profit,
        balanceAfter: currentBalance,
        level: martingaleLevel,
        losses: consecutiveLosses
    };
    
    tradeHistory.unshift(trade);
    
    if (isWin) {
        consecutiveLosses = 0;
        martingaleLevel = 0;
        log(`✅ AUTO WIN +$${profit.toFixed(2)} | Bal: $${currentBalance.toFixed(2)}`);
    } else {
        consecutiveLosses++;
        log(`❌ AUTO LOSS -$${Math.abs(profit).toFixed(2)} | Bal: $${currentBalance.toFixed(2)} | Losses:${consecutiveLosses}`);
    }
    
    updateBalanceDisplay();
    updatePnLBanner();
    updateTradeTable();
    updateMartingaleInfo();
    updateChart();
}

function manualTrade(direction) {
    if (!isConnected) {
        alert('Not connected!');
        return;
    }
    
    const amount = parseFloat(document.getElementById('manualAmount').value);
    const winProb = 0.5;
    const isWin = Math.random() < winProb;
    const profit = isWin ? amount * 0.85 : -amount;
    
    currentBalance += profit;
    
    const trade = {
        time: new Date().toLocaleTimeString(),
        type: 'MANUAL',
        direction: direction.toUpperCase(),
        amount: amount,
        result: isWin ? 'WIN' : 'LOSS',
        pnl: profit,
        balanceBefore: currentBalance - profit,
        balanceAfter: currentBalance,
        level: 0,
        losses: 0
    };
    
    tradeHistory.unshift(trade);
    
    log(`👆 MANUAL ${direction.toUpperCase()} $${amount.toFixed(2)} | ${isWin ? '✅ WIN' : '❌ LOSS'} $${Math.abs(profit).toFixed(2)}`);
    
    updateBalanceDisplay();
    updatePnLBanner();
    updateTradeTable();
    updateChart();
}

function startAutoTrading() {
    if (!isConnected) return;
    
    autoTrading = true;
    document.getElementById('autoStatus').textContent = '🟢 ACTIVE';
    document.getElementById('autoStatus').className = 'auto-active';
    document.getElementById('startAutoBtn').disabled = true;
    document.getElementById('stopAutoBtn').disabled = false;
    
    updateAutoParams();
    log(`🤖 AUTO ON | Amount: $${baseAmount.toFixed(2)} | MaxOrder: $${maxOrderAmount} | Dur: ${document.getElementById('autoDuration').value}s | Conf: ${document.getElementById('minConfidence').value}%`);
}

function stopAutoTrading() {
    autoTrading = false;
    document.getElementById('autoStatus').textContent = '🔴 INACTIVE';
    document.getElementById('autoStatus').className = 'auto-inactive';
    document.getElementById('startAutoBtn').disabled = false;
    document.getElementById('stopAutoBtn').disabled = true;
    log('⏸️ AUTO OFF');
}

function updateAutoParams() {
    baseAmount = parseFloat(document.getElementById('autoAmount').value);
    log(`Auto params updated: Amount=$${baseAmount.toFixed(2)}, Dur=${document.getElementById('autoDuration').value}s, Conf=${document.getElementById('minConfidence').value}%`);
    updateMartingaleInfo();
}

function updateMartingaleStrategy() {
    martingaleEnabled = document.querySelector('input[name="strategy"]:checked').value === 'martingale';
    updateMartingaleInfo();
}

function updateMartingaleInfo() {
    const nextAmount = calculateNextMartingaleAmount();
    document.getElementById('martingaleInfo').textContent = 
        `ML:${martingaleLevel} | Losses:${consecutiveLosses} | Next:$${nextAmount.toFixed(2)} | MaxOrder:$${maxOrderAmount}`;
}

function calculateNextMartingaleAmount() {
    const nextLevel = Math.min(consecutiveLosses + 1, martingaleMaxLevel);
    return Math.round(baseAmount * Math.pow(martingaleMultiplier, nextLevel) * 100) / 100;
}

function changeAsset() {
    log(`Asset changed to: ${document.getElementById('assetSelect').value}`);
}

function changeTimeframe() {
    log(`Timeframe changed to: ${document.getElementById('timeframeSelect').value}s`);
}

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
    log(`Applied: ${enabledIndicators.length} indicators`);
}

// UI Updates
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

function updateTradeTable() {
    const tbody = document.getElementById('tradeHistoryBody');
    tbody.innerHTML = '';
    
    tradeHistory.slice(0, 50).forEach(trade => {
        const tr = document.createElement('tr');
        const pnlColor = trade.pnl >= 0 ? '#00FF88' : '#FF4444';
        const resultColor = trade.result === 'WIN' ? '#00FF88' : trade.result === 'LOSS' ? '#FF4444' : '#FFAA00';
        
        tr.innerHTML = `
            <td>${trade.time}</td>
            <td>${trade.type}</td>
            <td style="color: ${trade.direction === 'CALL' ? '#00FF88' : '#FF4444'}">${trade.direction}</td>
            <td>$${trade.amount.toFixed(2)}</td>
            <td style="color: ${resultColor}">${trade.result}</td>
            <td style="color: ${pnlColor}">$${trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}</td>
            <td>$${trade.balanceBefore.toFixed(2)}</td>
            <td>$${trade.balanceAfter.toFixed(2)}</td>
            <td>${trade.level}</td>
            <td>${trade.losses}</td>
        `;
        tbody.appendChild(tr);
    });
}

function updateChart() {
    profitHistory.push(currentBalance);
    if (profitHistory.length > 100) profitHistory.shift();
    
    pnlChart.data.labels = profitHistory.map((_, i) => i);
    pnlChart.data.datasets[0].data = profitHistory;
    pnlChart.update();
}

function updateIndicatorValues() {
    const container = document.getElementById('indicatorValues');
    container.innerHTML = '';
    
    if (lastAnalysis) {
        Object.keys(ALL_INDICATORS).forEach(key => {
            const div = document.createElement('div');
            div.className = 'indicator-value';
            const value = lastAnalysis[key];
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
}

function updateAnalysisText() {
    if (lastAnalysis) {
        const text = `
╔══════════════════════════════════╗
║ QUANTUMTRADE PRO v12.7 ANALYSIS ║
╠══════════════════════════════════╣
║ Signal: ${lastAnalysis.signal.toUpperCase().padEnd(10)} Conf: ${lastAnalysis.confidence.toFixed(1)}%
║ Score: ${lastAnalysis.score}/${lastAnalysis.max_score}
║ Price: ${lastAnalysis.last_price.toFixed(5)}
╚══════════════════════════════════╝`;
        document.getElementById('analysisText').textContent = text;
    }
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
