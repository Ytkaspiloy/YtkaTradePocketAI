// Локализация
const translations = {
    ru: {
        language: "Язык",
        asset: "Актив",
        timeframe: "Таймфрейм",
        indicators: "Индикаторы",
        fibonacci: "Фибо",
        support: "Поддержка",
        resistance: "Сопротивление",
        trend: "Тренд",
        generateSignal: "Получить сигнал",
        autoTrading: "Авто-торговля",
        nextSignal: "Следующий сигнал через:",
        signalTitle: "Торговый сигнал",
        chartTitle: "График в реальном времени",
        historyTitle: "История сигналов",
        accuracy: "Точность:",
        signals: "Сигналов:",
        profit: "Доходность:",
        bullishBlock: "Бычий блок",
        bearishBlock: "Медвежий блок",
        supportLevel: "Поддержка",
        resistanceLevel: "Сопротивление",
        clearHistory: "Очистить",
        loadingText: "Анализируем график...",
        analyzing: "Анализ рынка...",
        time: "Время",
        direction: "Направление",
        result: "Результат",
        profitCol: "Прибыль",
        buy: "ПОКУПКА",
        sell: "ПРОДАЖА",
        success: "УСПЕХ",
        failure: "ПРОВАЛ",
        refund: "ВОЗВРАТ"
    },
    en: {
        language: "Language",
        asset: "Asset",
        timeframe: "Timeframe",
        indicators: "Indicators",
        fibonacci: "Fibonacci",
        support: "Support",
        resistance: "Resistance",
        trend: "Trend",
        generateSignal: "Generate Signal",
        autoTrading: "Auto Trading",
        nextSignal: "Next signal in:",
        signalTitle: "Trading Signal",
        chartTitle: "Real-time Chart",
        historyTitle: "Signal History",
        accuracy: "Accuracy:",
        signals: "Signals:",
        profit: "Profit:",
        bullishBlock: "Bullish Block",
        bearishBlock: "Bearish Block",
        supportLevel: "Support",
        resistanceLevel: "Resistance",
        clearHistory: "Clear",
        loadingText: "Analyzing chart...",
        analyzing: "Market analysis...",
        time: "Time",
        direction: "Direction",
        result: "Result",
        profitCol: "Profit",
        buy: "BUY",
        sell: "SELL",
        success: "SUCCESS",
        failure: "FAILURE",
        refund: "REFUND"
    },
    uz: {
        language: "Til",
        asset: "Aktiv",
        timeframe: "Vaqt oralig'i",
        indicators: "Indikatorlar",
        fibonacci: "Fibonachchi",
        support: "Qo'llab-quvvatlash",
        resistance: "Qarshilik",
        trend: "Trend",
        generateSignal: "Signal olish",
        autoTrading: "Avto-savdo",
        nextSignal: "Keyingi signal:",
        signalTitle: "Savdo signali",
        chartTitle: "Real vaqt grafigi",
        historyTitle: "Signal tarixi",
        accuracy: "Aniqlik:",
        signals: "Signallar:",
        profit: "Foyda:",
        bullishBlock: "Buvi blok",
        bearishBlock: "Ayiy blok",
        supportLevel: "Qo'llab-quvvatlash",
        resistanceLevel: "Qarshilik",
        clearHistory: "Tozalash",
        loadingText: "Grafik tahlil qilinmoqda...",
        analyzing: "Bozor tahlili...",
        time: "Vaqt",
        direction: "Yo'nalish",
        result: "Natija",
        profitCol: "Foyda",
        buy: "SOTIB OLISH",
        sell: "SOTISH",
        success: "MUVAFFAQIYAT",
        failure: "MUVOFFAQIYATSIZLIK",
        refund: "QAYTARISH"
    }
};

let currentLang = 'ru';
let chart = null;
let isAutoTrading = false;
let countdownInterval = null;
let currentSignal = null;
let signalHistory = [];

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    initEventListeners();
    updateStats();
    startCountdown();
    loadSignalHistory();
    generateMockData();
});

// Инициализация языка
function initLanguage() {
    const savedLang = localStorage.getItem('tradingBotLang') || 'ru';
    changeLanguage(savedLang, false);
    
    // Кастомный селектор
    const langItems = document.querySelectorAll('.lang-item');
    langItems.forEach(item => {
        item.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            const flag = this.getAttribute('data-flag');
            changeLanguage(lang, true);
            
            // Обновление отображения
            document.getElementById('current-flag').src = flag;
            document.getElementById('current-lang-text').textContent = this.textContent;
            toggleLangDropdown();
        });
    });
}

function toggleLangDropdown() {
    const dropdown = document.getElementById('lang-options');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function changeLanguage(lang, updateDropdown = true) {
    currentLang = lang;
    localStorage.setItem('tradingBotLang', lang);
    
    const t = translations[lang];
    
    // Обновление текста
    document.getElementById('language-label').innerHTML = `<i class="fas fa-globe"></i> ${t.language}`;
    document.getElementById('currency-label').innerHTML = `<i class="fas fa-chart-line"></i> ${t.asset}`;
    document.getElementById('timeframe-label').innerHTML = `<i class="fas fa-clock"></i> ${t.timeframe}`;
    document.getElementById('generate-text').textContent = t.generateSignal;
    document.getElementById('auto-trading-text').textContent = t.autoTrading;
    document.getElementById('next-signal-label').textContent = t.nextSignal;
    document.getElementById('signal-title').innerHTML = `<i class="fas fa-bell"></i> ${t.signalTitle}`;
    document.getElementById('chart-title').innerHTML = `<i class="fas fa-chart-candlestick"></i> ${t.chartTitle}`;
    document.querySelector('.history-header h3').innerHTML = `<i class="fas fa-history"></i> ${t.historyTitle}`;
    document.getElementById('accuracy-label').textContent = t.accuracy;
    document.getElementById('signals-label').textContent = t.signals;
    document.getElementById('profit-label').textContent = t.profit;
    document.getElementById('bullish-label').textContent = t.bullishBlock;
    document.getElementById('bearish-label').textContent = t.bearishBlock;
    document.getElementById('support-label').textContent = t.supportLevel;
    document.getElementById('resistance-label').textContent = t.resistanceLevel;
    document.getElementById('clear-history').textContent = t.clearHistory;
    
    if (updateDropdown) {
        document.getElementById('language').value = lang;
    }
    
    updateHistoryTableHeaders(t);
}

function updateHistoryTableHeaders(t) {
    const headers = document.querySelectorAll('#signals-history th');
    if (headers.length >= 6) {
        headers[0].textContent = t.time;
        headers[1].textContent = t.asset;
        headers[2].textContent = t.direction;
        headers[3].textContent = t.timeframe;
        headers[4].textContent = t.result;
        headers[5].textContent = t.profitCol;
    }
}

// Инициализация обработчиков событий
function initEventListeners() {
    // Кнопка генерации сигнала
    document.getElementById('generate-btn').addEventListener('click', generateSignal);
    
    // Кнопка авто-торговли
    document.getElementById('auto-trading-btn').addEventListener('click', toggleAutoTrading);
    
    // Кнопка обновления графика
    document.getElementById('refresh-chart').addEventListener('click', refreshChart);
    
    // Кнопка полного экрана
    document.getElementById('fullscreen-chart').addEventListener('click', toggleFullscreen);
    
    // Очистка истории
    document.getElementById('clear-history').addEventListener('click', clearHistory);
    
    // Переключение индикаторов
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            updateChart();
        });
    });
    
    // Изменение актива или таймфрейма
    document.getElementById('currency-pair').addEventListener('change', updateChart);
    document.getElementById('timeframe').addEventListener('change', updateChart);
    
    // Закрытие выпадающего меню языка при клике вне его
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#custom-language-selector')) {
            document.getElementById('lang-options').style.display = 'none';
        }
    });
}

// Генерация сигнала
function generateSignal() {
    const asset = document.getElementById('currency-pair').value;
    const timeframe = document.getElementById('timeframe').value;
    
    showLoading(true);
    
    // Симуляция анализа
    simulateAnalysis(asset, timeframe)
        .then(signal => {
            currentSignal = signal;
            displaySignal(signal);
            updateChartWithSignal(signal);
            addToHistory(signal);
            updateStats();
            showLoading(false);
            startCountdown();
        })
        .catch(error => {
            console.error('Error generating signal:', error);
            showLoading(false);
        });
}

// Симуляция анализа
function simulateAnalysis(asset, timeframe) {
    return new Promise((resolve) => {
        const analysisTime = 3000; // 3 секунды анализа
        
        // Обновление прогресс-бара
        const progressBar = document.getElementById('progress-fill');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 100 / (analysisTime / 100);
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }, 100);
        
        setTimeout(() => {
            clearInterval(interval);
            progressBar.style.width = '100%';
            
            // Генерация случайного сигнала
            const isBuy = Math.random() > 0.5;
            const direction = isBuy ? 'BUY' : 'SELL';
            const entryPrice = 100 + Math.random() * 50;
            const exitPrice = entryPrice + (isBuy ? 1 : -1) * (Math.random() * 2);
            const result = calculateResult(entryPrice, exitPrice, isBuy);
            
            resolve({
                id: Date.now(),
                asset: asset,
                timeframe: timeframe,
                direction: direction,
                entryPrice: entryPrice.toFixed(5),
                exitPrice: exitPrice.toFixed(5),
                timestamp: new Date().toLocaleTimeString(),
                result: result.status,
                profit: result.profit,
                probability: (70 + Math.random() * 25).toFixed(1),
                indicators: {
                    fibonacci: Math.random() > 0.3,
                    support: Math.random() > 0.4,
                    resistance: Math.random() > 0.4,
                    trend: Math.random() > 0.5
                }
            });
        }, analysisTime);
    });
}

// Расчет результата
function calculateResult(entry, exit, isBuy) {
    if (exit === entry) {
        return { status: 'REFUND', profit: '0%' };
    }
    
    const profit = ((exit - entry) / entry * 100).toFixed(2);
    
    if ((isBuy && exit > entry) || (!isBuy && exit < entry)) {
        return { status: 'SUCCESS', profit: `+${profit}%` };
    } else {
        return { status: 'FAILURE', profit: `${profit}%` };
    }
}

// Отображение сигнала
function displaySignal(signal) {
    const t = translations[currentLang];
    const signalResult = document.getElementById('signal-result');
    const signalTime = document.getElementById('signal-time');
    const signalStatus = document.getElementById('signal-status');
    
    // Обновление времени
    signalTime.textContent = signal.timestamp;
    
    // Обновление статуса
    signalStatus.textContent = signal.result;
    signalStatus.className = 'signal-status';
    signalStatus.classList.add(signal.result.toLowerCase());
    
    // Создание отображения сигнала
    signalResult.innerHTML = `
        <div class="signal-display">
            <div class="signal-direction ${signal.direction.toLowerCase()}">
                ${signal.direction === 'BUY' ? t.buy : t.sell}
            </div>
            <div class="signal-info">
                <div class="info-item">
                    <div class="info-label">${t.asset}</div>
                    <div class="info-value">${signal.asset}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">${t.timeframe}</div>
                    <div class="info-value">${getTimeframeText(signal.timeframe)}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">${t.profit}</div>
                    <div class="info-value ${signal.profit.startsWith('+') ? 'profit-positive' : 'profit-negative'}">
                        ${signal.profit}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getTimeframeText(value) {
    const timeframes = {
        '3': '3 секунды',
        '5': '5 секунд',
        '10': '10 секунд',
        '15': '15 секунд',
        '30': '30 секунд',
        '60': '1 минута',
        '120': '2 минуты',
        '180': '3 минуты'
    };
    return timeframes[value] || value;
}

// Обновление графика с сигналом
function updateChartWithSignal(signal) {
    if (!chart) {
        generateMockData();
    }
    
    // Добавление маркеров на график
    const annotations = [{
        x: 149,
        y: parseFloat(signal.entryPrice),
        xref: 'x',
        yref: 'y',
        text: signal.direction === 'BUY' ? '📈 ВХОД' : '📉 ВХОД',
        showarrow: true,
        arrowhead: 2,
        ax: 0,
        ay: signal.direction === 'BUY' ? -40 : 40,
        bgcolor: signal.direction === 'BUY' ? '#10B981' : '#EF4444',
        font: { color: 'white', size: 12 }
    }];
    
    Plotly.relayout('trading-chart', {
        annotations: annotations,
        shapes: generateChartShapes(signal)
    });
}

// Генерация фигур для графика
function generateChartShapes(signal) {
    const shapes = [];
    const isBullish = signal.direction === 'BUY';
    
    // Order blocks
    shapes.push({
        type: 'rect',
        xref: 'x',
        yref: 'y',
        x0: 120,
        x1: 150,
        y0: parseFloat(signal.entryPrice) - (isBullish ? 0.5 : 0.2),
        y1: parseFloat(signal.entryPrice) + (isBullish ? 0.2 : 0.5),
        fillcolor: isBullish ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
        line: {
            color: isBullish ? '#10B981' : '#EF4444',
            width: 2
        }
    });
    
    // Support levels
    shapes.push({
        type: 'line',
        x0: 0,
        x1: 150,
        y0: parseFloat(signal.entryPrice) - 1,
        y1: parseFloat(signal.entryPrice) - 1,
        line: {
            color: '#3B82F6',
            width: 2,
            dash: 'solid'
        }
    });
    
    // Resistance levels
    shapes.push({
        type: 'line',
        x0: 0,
        x1: 150,
        y0: parseFloat(signal.entryPrice) + 1,
        y1: parseFloat(signal.entryPrice) + 1,
        line: {
            color: '#EF4444',
            width: 2,
            dash: 'solid'
        }
    });
    
    // Trend line
    shapes.push({
        type: 'line',
        x0: 100,
        x1: 150,
        y0: parseFloat(signal.entryPrice) - 0.8,
        y1: parseFloat(signal.entryPrice) + 0.3,
        line: {
            color: '#10B981',
            width: 2,
            dash: 'solid'
        }
    });
    
    return shapes;
}

// Обновление графика
function updateChart() {
    generateMockData();
}

function refreshChart() {
    generateMockData(true);
}

// Генерация моковых данных для графика
function generateMockData(refresh = false) {
    const asset = document.getElementById('currency-pair').value;
    const timeframe = document.getElementById('timeframe').value;
    
    // Генерация свечей
    let open = 100;
    const data = [];
    
    for (let i = 0; i < 150; i++) {
        const close = open + (Math.random() - 0.5) * 2;
        const high = Math.max(open, close) + Math.random() * 0.5;
        const low = Math.min(open, close) - Math.random() * 0.5;
        
        data.push({
            time: i,
            open: open,
            high: high,
            low: low,
            close: close
        });
        
        open = close;
    }
    
    // Подготовка данных для Plotly
    const x = data.map(d => d.time);
    const openPrices = data.map(d => d.open);
    const highPrices = data.map(d => d.high);
    const lowPrices = data.map(d => d.low);
    const closePrices = data.map(d => d.close);
    
    // Свечной график
    const candlestick = {
        x: x,
        open: openPrices,
        high: highPrices,
        low: lowPrices,
        close: closePrices,
        type: 'candlestick',
        name: asset,
        increasing: { line: { color: '#10B981' }, fillcolor: '#10B981' },
        decreasing: { line: { color: '#EF4444' }, fillcolor: '#EF4444' }
    };
    
    // Настройки макета
    const layout = {
        title: {
            text: `${asset} - ${getTimeframeText(timeframe)}`,
            font: { color: '#F1F5F9', size: 16 }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#94A3B8' },
        xaxis: {
            title: 'Время',
            gridcolor: 'rgba(255,255,255,0.1)',
            zerolinecolor: 'rgba(255,255,255,0.2)'
        },
        yaxis: {
            title: 'Цена',
            gridcolor: 'rgba(255,255,255,0.1)',
            zerolinecolor: 'rgba(255,255,255,0.2)'
        },
        hovermode: 'x unified',
        showlegend: false,
        annotations: [],
        shapes: generateChartShapes(currentSignal || { entryPrice: '110.50', direction: 'BUY' })
    };
    
    const config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
        modeBarButtonsToAdd: ['drawline', 'drawopenpath', 'eraseshape']
    };
    
    if (refresh || !chart) {
        Plotly.newPlot('trading-chart', [candlestick], layout, config);
    } else {
        Plotly.react('trading-chart', [candlestick], layout, config);
    }
    
    chart = true;
}

// Таймер обратного отсчета
function startCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);
    
    let seconds = 30;
    const countdownElement = document.getElementById('countdown-timer');
    
    function updateCountdown() {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            if (isAutoTrading) {
                generateSignal();
            }
            seconds = 30;
            countdownInterval = setInterval(updateCountdown, 1000);
        }
        seconds--;
    }
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Авто-торговля
function toggleAutoTrading() {
    const button = document.getElementById('auto-trading-btn');
    isAutoTrading = !isAutoTrading;
    
    if (isAutoTrading) {
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-stop-circle"></i> Стоп Авто-торговля';
        generateSignal(); // Немедленно генерируем сигнал
    } else {
        button.classList.remove('active');
        button.innerHTML = '<i class="fas fa-robot"></i> Авто-торговля';
    }
}

// Полноэкранный режим
function toggleFullscreen() {
    const chartContainer = document.getElementById('chart-container');
    
    if (!document.fullscreenElement) {
        if (chartContainer.requestFullscreen) {
            chartContainer.requestFullscreen();
        } else if (chartContainer.webkitRequestFullscreen) {
            chartContainer.webkitRequestFullscreen();
        } else if (chartContainer.msRequestFullscreen) {
            chartContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// История сигналов
function addToHistory(signal) {
    const t = translations[currentLang];
    
    signalHistory.unshift(signal);
    if (signalHistory.length > 50) {
        signalHistory.pop();
    }
    
    localStorage.setItem('tradingSignals', JSON.stringify(signalHistory));
    updateHistoryTable();
}

function loadSignalHistory() {
    const saved = localStorage.getItem('tradingSignals');
    if (saved) {
        signalHistory = JSON.parse(saved);
        updateHistoryTable();
    }
}

function updateHistoryTable() {
    const t = translations[currentLang];
    const tableBody = document.querySelector('#signals-history tbody');
    tableBody.innerHTML = '';
    
    signalHistory.forEach(signal => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${signal.timestamp}</td>
            <td>${signal.asset}</td>
            <td><span class="direction-badge ${signal.direction.toLowerCase()}">
                ${signal.direction === 'BUY' ? t.buy : t.sell}
            </span></td>
            <td>${getTimeframeText(signal.timeframe)}</td>
            <td><span class="result-badge ${signal.result.toLowerCase()}">
                ${t[signal.result.toLowerCase()]}
            </span></td>
            <td class="${signal.profit.startsWith('+') ? 'profit-positive' : 'profit-negative'}">
                ${signal.profit}
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Обновление стилей для значков
    const style = document.createElement('style');
    style.textContent = `
        .direction-badge {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }
        .direction-badge.buy {
            background: rgba(16, 185, 129, 0.2);
            color: #10B981;
        }
        .direction-badge.sell {
            background: rgba(239, 68, 68, 0.2);
            color: #EF4444;
        }
        .result-badge {
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
        }
        .result-badge.success {
            background: rgba(16, 185, 129, 0.2);
            color: #10B981;
        }
        .result-badge.failure {
            background: rgba(239, 68, 68, 0.2);
            color: #EF4444;
        }
        .result-badge.refund {
            background: rgba(251, 191, 36, 0.2);
            color: #FBBF24;
        }
        .profit-negative {
            color: #EF4444;
        }
    `;
    document.head.appendChild(style);
}

function clearHistory() {
    if (confirm('Очистить историю сигналов?')) {
        signalHistory = [];
        localStorage.removeItem('tradingSignals');
        updateHistoryTable();
    }
}

// Обновление статистики
function updateStats() {
    if (signalHistory.length > 0) {
        const successful = signalHistory.filter(s => s.result === 'SUCCESS').length;
        const accuracy = (successful / signalHistory.length * 100).toFixed(1);
        const totalProfit = signalHistory.reduce((sum, s) => {
            const profit = parseFloat(s.profit);
            return isNaN(profit) ? sum : sum + profit;
        }, 0);
        
        document.getElementById('accuracy-value').textContent = `${accuracy}%`;
        document.getElementById('signals-count').textContent = signalHistory.length;
        document.getElementById('profit-value').textContent = totalProfit > 0 ? `+${totalProfit.toFixed(1)}%` : `${totalProfit.toFixed(1)}%`;
    }
}

// Показать/скрыть загрузку
function showLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    const progressBar = document.getElementById('progress-fill');
    
    if (show) {
        overlay.style.display = 'flex';
        progressBar.style.width = '0%';
        document.getElementById('loading-text').textContent = translations[currentLang].analyzing;
    } else {
        overlay.style.display = 'none';
        progressBar.style.width = '100%';
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 500);
    }
}

// Генерация начальных данных при загрузке
setTimeout(() => {
    generateMockData();
}, 1000);
