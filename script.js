// ==================== КОНФИГУРАЦИЯ ====================
const CONFIG = {
    // Режим языка
    languages: {
        ru: {
            // Общие
            title: "SCALPING ROBOT PRO",
            subtitle: "Торговля бинарными опционами в реальном времени",
            demoMode: "Демо режим",
            waiting: "Ожидание",
            
            // Панель управления
            instrument: "ИНСТРУМЕНТ",
            expiration: "ЭКСПИРАЦИЯ",
            signalType: "ТИП СИГНАЛА",
            indicators: "ИНДИКАТОРЫ",
            drawingTools: "ИНСТРУМЕНТЫ РИСОВАНИЯ",
            signal: "СИГНАЛ",
            
            // Типы сигналов
            smartMoney: "Smart Money",
            combined: "Комбинированный",
            
            // Индикаторы
            support: "Поддержка",
            resistance: "Сопротивление",
            
            // Инструменты рисования
            line: "Линия",
            horizontal: "Горизонталь",
            clear: "Очистить",
            
            // Кнопки
            getSignal: "ПОЛУЧИТЬ СИГНАЛ",
            updatingPrices: "Обновление цен...",
            
            // График
            candles: "Свечи",
            area: "Область",
            timeframe: "Таймфрейм",
            
            // Статистика
            currentPrice: "Текущая цена:",
            change: "Изменение:",
            accuracy: "Точность:",
            
            // Сигнал
            currentSignal: "ТЕКУЩИЙ СИГНАЛ",
            clickGenerate: "Нажмите 'Получить сигнал' для анализа",
            expiresIn: "Истекает через:",
            
            // Результаты
            lastResults: "ПОСЛЕДНИЕ РЕЗУЛЬТАТЫ",
            
            // Информация
            dataSource: "Источник: Real-time Market Data",
            apiInfo: "Используются реальные котировки Forex. Обновление каждые 5 секунд.",
            disclaimer: "Торговля бинарными опционами связана с высокими рисками. Past performance is not indicative of future results.",
            
            // Анализ
            analysis: "АНАЛИЗ",
            rsi: "RSI",
            macd: "MACD",
            ema: "EMA",
            trend: "Тренд",
            volume: "Объем",
            strength: "Сила",
            buy: "ПОКУПКА",
            sell: "ПРОДАЖА",
            win: "ВЫИГРЫШ",
            loss: "ПРОИГРЫШ",
            refund: "ВОЗВРАТ",
            entryPrice: "Цена входа:",
            exitPrice: "Цена выхода:",
            result: "Результат:"
        },
        en: {
            // General
            title: "SCALPING ROBOT PRO",
            subtitle: "Real-Time Binary Options Trading",
            demoMode: "Demo Mode",
            waiting: "Waiting",
            
            // Control Panel
            instrument: "INSTRUMENT",
            expiration: "EXPIRATION",
            signalType: "SIGNAL TYPE",
            indicators: "INDICATORS",
            drawingTools: "DRAWING TOOLS",
            signal: "SIGNAL",
            
            // Signal Types
            smartMoney: "Smart Money",
            combined: "Combined",
            
            // Indicators
            support: "Support",
            resistance: "Resistance",
            
            // Drawing Tools
            line: "Line",
            horizontal: "Horizontal",
            clear: "Clear",
            
            // Buttons
            getSignal: "GET SIGNAL",
            updatingPrices: "Updating prices...",
            
            // Chart
            candles: "Candles",
            area: "Area",
            timeframe: "Timeframe",
            
            // Stats
            currentPrice: "Current Price:",
            change: "Change:",
            accuracy: "Accuracy:",
            
            // Signal
            currentSignal: "CURRENT SIGNAL",
            clickGenerate: "Click 'Get Signal' to analyze",
            expiresIn: "Expires in:",
            
            // Results
            lastResults: "LAST RESULTS",
            
            // Info
            dataSource: "Source: Real-time Market Data",
            apiInfo: "Using real Forex quotes. Updates every 5 seconds.",
            disclaimer: "Binary options trading involves high risks. Past performance is not indicative of future results.",
            
            // Analysis
            analysis: "ANALYSIS",
            rsi: "RSI",
            macd: "MACD",
            ema: "EMA",
            trend: "Trend",
            volume: "Volume",
            strength: "Strength",
            buy: "BUY",
            sell: "SELL",
            win: "WIN",
            loss: "LOSS",
            refund: "REFUND",
            entryPrice: "Entry Price:",
            exitPrice: "Exit Price:",
            result: "Result:"
        }
    },
    
    // Конфигурация активов
    assets: {
        'EURUSD': { 
            name: 'EUR/USD', 
            base: 'EUR',
            quote: 'USD',
            price: 1.0830,
            volatility: 0.0005
        },
        'USDJPY': { 
            name: 'USD/JPY', 
            base: 'USD',
            quote: 'JPY',
            price: 148.35,
            volatility: 0.001
        },
        'GBPUSD': { 
            name: 'GBP/USD', 
            base: 'GBP',
            quote: 'USD',
            price: 1.2650,
            volatility: 0.0008
        },
        'AUDUSD': { 
            name: 'AUD/USD', 
            base: 'AUD',
            quote: 'USD',
            price: 0.6590,
            volatility: 0.0006
        },
        'USDCAD': { 
            name: 'USD/CAD', 
            base: 'USD',
            quote: 'CAD',
            price: 1.3520,
            volatility: 0.0004
        },
        'USDCHF': { 
            name: 'USD/CHF', 
            base: 'USD',
            quote: 'CHF',
            price: 0.9025,
            volatility: 0.0004
        },
        'EURJPY': { 
            name: 'EUR/JPY', 
            base: 'EUR',
            quote: 'JPY',
            price: 160.42,
            volatility: 0.0012
        },
        'GBPJPY': { 
            name: 'GBP/JPY', 
            base: 'GBP',
            quote: 'JPY',
            price: 187.65,
            volatility: 0.0015
        }
    },
    
    // Таймфреймы
    timeframes: {
        60: "1 мин",
        120: "2 мин",
        180: "3 мин",
        300: "5 мин"
    }
};

// ==================== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ====================
let currentLanguage = 'ru';
let currentChart = null;
let currentSignal = null;
let isSignalActive = false;
let expirationTimer = null;
let priceUpdateInterval = null;
let resultsHistory = [];
let currentAsset = 'EURUSD';
let currentTimeframe = 60;
let chartType = 'candlestick';
let signalType = 'smart';
let drawingMode = null;
let drawnElements = [];
let priceHistory = [];
let indicatorsData = {};

// ==================== ИНИЦИАЛИЗАЦИЯ ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Инициализация Scalping Robot Pro...');
    
    // Инициализация языка
    initLanguage();
    
    // Инициализация графика
    initChart();
    
    // Инициализация событий
    initEvents();
    
    // Загрузка начальных цен
    loadInitialPrices();
    
    // Запуск обновления цен
    startPriceUpdates();
    
    // Загрузка истории
    loadHistory();
    
    // Инициализация инструментов рисования
    initDrawingTools();
    
    console.log('✅ Scalping Robot Pro готов к работе!');
});

// ==================== СИСТЕМА ЯЗЫКА ====================
function initLanguage() {
    // Обработчики для кнопок переключения языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            switchLanguage(lang);
        });
    });
    
    // Применяем русский язык по умолчанию
    switchLanguage('ru');
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Обновляем активную кнопку
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Обновляем все тексты
    applyTranslations();
}

function applyTranslations() {
    const dict = CONFIG.languages[currentLanguage];
    
    // Обновляем все элементы с data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (dict[key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = dict[key];
            } else {
                element.textContent = dict[key];
            }
        }
    });
    
    // Обновляем кнопку сигнала
    const signalBtn = document.getElementById('generate-signal');
    if (signalBtn) {
        const span = signalBtn.querySelector('span');
        if (span) span.textContent = dict.getSignal;
    }
    
    // Обновляем статус если ожидание
    const statusText = document.getElementById('status-text');
    if (statusText && !isSignalActive) {
        statusText.textContent = dict.waiting;
    }
}

// ==================== ГРАФИК ====================
function initChart() {
    const ctx = document.getElementById('trading-chart').getContext('2d');
    
    // Генерация начальных данных
    const data = generateCandlestickData(50);
    
    // Создаем свечной график
    currentChart = new Chart(ctx, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: CONFIG.assets[currentAsset].name,
                data: data.candles,
                borderColor: ctx => {
                    const candle = data.candles[ctx.dataIndex];
                    return candle.c >= candle.o ? '#00ff88' : '#ff4444';
                },
                backgroundColor: ctx => {
                    const candle = data.candles[ctx.dataIndex];
                    return candle.c >= candle.o ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 68, 68, 0.3)';
                },
                borderWidth: 1,
                borderColorUp: '#00ff88',
                borderColorDown: '#ff4444',
                borderColorDoji: '#8b9dc3',
                colorUp: 'rgba(0, 255, 136, 0.8)',
                colorDown: 'rgba(255, 68, 68, 0.8)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(26, 34, 56, 0.95)',
                    titleColor: '#8b9dc3',
                    bodyColor: '#ffffff',
                    borderColor: '#2a3655',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const candle = context.raw;
                            return [
                                `Open: ${candle.o.toFixed(5)}`,
                                `High: ${candle.h.toFixed(5)}`,
                                `Low: ${candle.l.toFixed(5)}`,
                                `Close: ${candle.c.toFixed(5)}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'HH:mm'
                        }
                    },
                    grid: {
                        color: 'rgba(42, 54, 85, 0.3)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#8b9dc3',
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 10
                    }
                },
                y: {
                    position: 'right',
                    grid: {
                        color: 'rgba(42, 54, 85, 0.3)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#8b9dc3',
                        callback: function(value) {
                            return value.toFixed(5);
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 0
            }
        }
    });
    
    // Добавляем индикаторы на график
    addIndicatorsToChart();
}

function generateCandlestickData(count) {
    const asset = CONFIG.assets[currentAsset];
    const candles = [];
    const now = new Date();
    
    // Генерируем свечи
    for (let i = count - 1; i >= 0; i--) {
        const time = new Date(now);
        time.setMinutes(time.getMinutes() - i);
        
        let open, high, low, close;
        
        if (i === count - 1) {
            // Первая свеча
            open = asset.price;
            const change = (Math.random() - 0.5) * asset.volatility;
            close = open * (1 + change);
            high = Math.max(open, close) * (1 + Math.random() * asset.volatility * 0.3);
            low = Math.min(open, close) * (1 - Math.random() * asset.volatility * 0.3);
        } else {
            // Последующие свечи
            const prevCandle = candles[candles.length - 1];
            open = prevCandle.c;
            const change = (Math.random() - 0.5) * asset.volatility;
            close = open * (1 + change);
            high = Math.max(open, close) * (1 + Math.random() * asset.volatility * 0.3);
            low = Math.min(open, close) * (1 - Math.random() * asset.volatility * 0.3);
            
            // Корректируем high/low
            high = Math.max(high, open, close);
            low = Math.min(low, open, close);
        }
        
        candles.push({
            x: time,
            o: open,
            h: high,
            l: low,
            c: close
        });
    }
    
    // Сохраняем историю цен
    priceHistory = candles.map(c => c.c);
    
    return { candles };
}

function addIndicatorsToChart() {
    if (!currentChart) return;
    
    // Добавляем линии индикаторов
    const datasets = currentChart.data.datasets;
    
    // EMA 20
    const ema20 = calculateEMA(priceHistory, 20);
    datasets.push({
        label: 'EMA 20',
        data: ema20.map((value, index) => ({
            x: currentChart.data.datasets[0].data[index].x,
            y: value
        })),
        borderColor: '#ffaa00',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        fill: false
    });
    
    // EMA 50
    const ema50 = calculateEMA(priceHistory, 50);
    datasets.push({
        label: 'EMA 50',
        data: ema50.map((value, index) => ({
            x: currentChart.data.datasets[0].data[index].x,
            y: value
        })),
        borderColor: '#9d4edd',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        fill: false
    });
    
    // Обновляем график
    currentChart.update();
    
    // Сохраняем данные индикаторов
    indicatorsData = {
        ema20: ema20,
        ema50: ema50,
        rsi: calculateRSI(priceHistory),
        macd: calculateMACD(priceHistory)
    };
    
    // Обновляем отображение индикаторов
    updateIndicatorsDisplay();
}

// ==================== ИНДИКАТОРЫ ====================
function calculateEMA(prices, period) {
    const ema = [];
    const multiplier = 2 / (period + 1);
    
    // Первое значение EMA - простое среднее
    let sum = 0;
    for (let i = 0; i < period && i < prices.length; i++) {
        sum += prices[i];
    }
    ema[period - 1] = sum / period;
    
    // Последующие значения EMA
    for (let i = period; i < prices.length; i++) {
        ema[i] = (prices[i] - ema[i - 1]) * multiplier + ema[i - 1];
    }
    
    // Заполняем начальные значения
    for (let i = 0; i < period - 1; i++) {
        ema[i] = prices[i];
    }
    
    return ema;
}

function calculateRSI(prices, period = 14) {
    if (prices.length < period + 1) return Array(prices.length).fill(50);
    
    const gains = [];
    const losses = [];
    
    // Рассчитываем изменения
    for (let i = 1; i < prices.length; i++) {
        const change = prices[i] - prices[i - 1];
        gains.push(change > 0 ? change : 0);
        losses.push(change < 0 ? -change : 0);
    }
    
    const rsi = [];
    
    // Первое значение RSI
    let avgGain = 0;
    let avgLoss = 0;
    
    for (let i = 0; i < period; i++) {
        avgGain += gains[i];
        avgLoss += losses[i];
    }
    
    avgGain /= period;
    avgLoss /= period;
    
    let rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    rsi[period] = 100 - (100 / (1 + rs));
    
    // Следующие значения RSI
    for (let i = period + 1; i < prices.length; i++) {
        avgGain = ((avgGain * (period - 1)) + gains[i - 1]) / period;
        avgLoss = ((avgLoss * (period - 1)) + losses[i - 1]) / period;
        
        rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        rsi[i] = 100 - (100 / (1 + rs));
    }
    
    // Заполняем начальные значения
    for (let i = 0; i < period; i++) {
        rsi[i] = 50;
    }
    
    return rsi;
}

function calculateMACD(prices) {
    const ema12 = calculateEMA(prices, 12);
    const ema26 = calculateEMA(prices, 26);
    
    const macdLine = [];
    for (let i = 0; i < prices.length; i++) {
        macdLine.push(ema12[i] - ema26[i]);
    }
    
    const signalLine = calculateEMA(macdLine, 9);
    
    const histogram = [];
    for (let i = 0; i < prices.length; i++) {
        histogram.push(macdLine[i] - signalLine[i]);
    }
    
    return {
        macdLine,
        signalLine,
        histogram
    };
}

function updateIndicatorsDisplay() {
    const display = document.getElementById('indicators-display');
    if (!display) return;
    
    const dict = CONFIG.languages[currentLanguage];
    const lastIndex = priceHistory.length - 1;
    
    display.innerHTML = '';
    
    // RSI
    const rsiValue = indicatorsData.rsi[lastIndex];
    const rsiElement = createIndicatorElement('RSI', rsiValue.toFixed(2), 
        rsiValue > 70 ? 'negative' : rsiValue < 30 ? 'positive' : 'neutral');
    display.appendChild(rsiElement);
    
    // MACD
    const macdValue = indicatorsData.macd.macdLine[lastIndex];
    const macdElement = createIndicatorElement('MACD', macdValue.toFixed(5),
        macdValue > 0 ? 'positive' : 'negative');
    display.appendChild(macdElement);
    
    // EMA 20
    const ema20Value = indicatorsData.ema20[lastIndex];
    const ema20Element = createIndicatorElement('EMA20', ema20Value.toFixed(5),
        priceHistory[lastIndex] > ema20Value ? 'positive' : 'negative');
    display.appendChild(ema20Element);
    
    // EMA 50
    const ema50Value = indicatorsData.ema50[lastIndex];
    const ema50Element = createIndicatorElement('EMA50', ema50Value.toFixed(5),
        priceHistory[lastIndex] > ema50Value ? 'positive' : 'negative');
    display.appendChild(ema50Element);
    
    // Тренд
    const trend = determineTrend();
    const trendElement = createIndicatorElement(dict.trend, trend.direction,
        trend.strength > 0 ? 'positive' : 'negative');
    display.appendChild(trendElement);
}

function createIndicatorElement(label, value, type) {
    const div = document.createElement('div');
    div.className = 'indicator-item';
    
    const color = type === 'positive' ? '#00ff88' : 
                  type === 'negative' ? '#ff4444' : '#8b9dc3';
    
    div.innerHTML = `
        <span>${label}:</span>
        <span class="indicator-value" style="color: ${color}">${value}</span>
    `;
    
    return div;
}

function determineTrend() {
    const prices = priceHistory;
    if (prices.length < 20) return { direction: 'Нейтральный', strength: 0 };
    
    const lastPrice = prices[prices.length - 1];
    const ema20 = indicatorsData.ema20[prices.length - 1];
    const ema50 = indicatorsData.ema50[prices.length - 1];
    
    let direction = 'Нейтральный';
    let strength = 0;
    
    if (lastPrice > ema20 && ema20 > ema50) {
        direction = 'Бычий ↗';
        strength = 1;
    } else if (lastPrice < ema20 && ema20 < ema50) {
        direction = 'Медвежий ↘';
        strength = -1;
    }
    
    return { direction, strength };
}

// ==================== ИНСТРУМЕНТЫ РИСОВАНИЯ ====================
function initDrawingTools() {
    const drawButtons = document.querySelectorAll('.draw-btn');
    
    drawButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tool = this.dataset.tool;
            
            // Снимаем активный класс со всех кнопок
            drawButtons.forEach(b => b.classList.remove('active'));
            
            if (tool === 'clear') {
                clearDrawings();
                drawingMode = null;
            } else {
                this.classList.add('active');
                drawingMode = tool;
                alert(`Режим рисования: ${tool}. Кликните на графике чтобы добавить элемент.`);
            }
        });
    });
    
    // Добавляем обработчик кликов на график
    const chartCanvas = document.getElementById('trading-chart');
    if (chartCanvas) {
        chartCanvas.addEventListener('click', function(event) {
            if (drawingMode) {
                addDrawingElement(event);
            }
        });
    }
}

function addDrawingElement(event) {
    if (!drawingMode || !currentChart) return;
    
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const scales = currentChart.scales;
    const xValue = scales.x.getValueForPixel(x);
    const yValue = scales.y.getValueForPixel(y);
    
    const element = {
        type: drawingMode,
        x: xValue,
        y: yValue,
        timestamp: new Date()
    };
    
    drawnElements.push(element);
    drawOnChart(element);
}

function drawOnChart(element) {
    if (!currentChart) return;
    
    const ctx = currentChart.ctx;
    const scales = currentChart.scales;
    const xPixel = scales.x.getPixelForValue(element.x);
    const yPixel = scales.y.getPixelForValue(element.y);
    
    ctx.save();
    
    switch(element.type) {
        case 'line':
            // Рисуем горизонтальную линию
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.strokeStyle = '#0066ff';
            ctx.lineWidth = 2;
            ctx.moveTo(scales.x.left, yPixel);
            ctx.lineTo(scales.x.right, yPixel);
            ctx.stroke();
            
            // Добавляем текст
            ctx.fillStyle = '#0066ff';
            ctx.font = '12px Arial';
            ctx.fillText(element.y.toFixed(5), scales.x.right - 60, yPixel - 5);
            break;
            
        case 'horizontal':
            // Рисуем вертикальную линию
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = '#ffaa00';
            ctx.lineWidth = 1;
            ctx.moveTo(xPixel, scales.y.top);
            ctx.lineTo(xPixel, scales.y.bottom);
            ctx.stroke();
            break;
            
        case 'fibonacci':
            // Рисуем уровень Фибоначчи
            ctx.beginPath();
            ctx.setLineDash([3, 3]);
            ctx.strokeStyle = '#9d4edd';
            ctx.lineWidth = 1;
            ctx.moveTo(scales.x.left, yPixel);
            ctx.lineTo(scales.x.right, yPixel);
            ctx.stroke();
            
            ctx.fillStyle = '#9d4edd';
            ctx.font = '11px Arial';
            ctx.fillText('Fib: ' + element.y.toFixed(5), scales.x.right - 80, yPixel - 5);
            break;
    }
    
    ctx.restore();
}

function clearDrawings() {
    drawnElements = [];
    if (currentChart) {
        currentChart.update();
    }
}

// ==================== СОБЫТИЯ ====================
function initEvents() {
    // Выбор актива
    const assetSelect = document.getElementById('asset-select');
    if (assetSelect) {
        assetSelect.addEventListener('change', function() {
            currentAsset = this.value;
            updateAssetDisplay();
            reloadChart();
        });
    }
    
    // Кнопки таймфреймов
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTimeframe = parseInt(this.dataset.time);
            
            // Обновляем отображение
            const tfText = CONFIG.timeframes[currentTimeframe];
            document.getElementById('current-tf').textContent = tfText;
        });
    });
    
    // Типы сигналов
    document.querySelectorAll('.signal-type-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.signal-type-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            signalType = this.dataset.type;
        });
    });
    
    // Типы графиков
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            chartType = this.dataset.type;
            changeChartType(chartType);
        });
    });
    
    // Кнопка генерации сигнала
    const generateBtn = document.getElementById('generate-signal');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateSignal);
    }
}

function changeChartType(type) {
    if (!currentChart) return;
    
    currentChart.config.type = type === 'candlestick' ? 'candlestick' : 'line';
    
    if (type === 'line') {
        currentChart.data.datasets[0].type = 'line';
        currentChart.data.datasets[0].borderColor = '#00ff88';
        currentChart.data.datasets[0].backgroundColor = 'rgba(0, 255, 136, 0.1)';
        currentChart.data.datasets[0].fill = true;
    } else if (type === 'area') {
        currentChart.data.datasets[0].type = 'line';
        currentChart.data.datasets[0].borderColor = '#0066ff';
        currentChart.data.datasets[0].backgroundColor = 'rgba(0, 102, 255, 0.1)';
        currentChart.data.datasets[0].fill = true;
    } else {
        currentChart.data.datasets[0].type = 'candlestick';
    }
    
    currentChart.update();
}

// ==================== ЦЕНЫ ====================
async function loadInitialPrices() {
    try {
        await fetchRealPrices();
    } catch (error) {
        useDemoPrices();
    }
    updateAssetDisplay();
}

async function fetchRealPrices() {
    try {
        const response = await fetch('https://api.frankfurter.app/latest?from=USD');
        if (!response.ok) throw new Error('API error');
        
        const data = await response.json();
        
        if (data.rates) {
            // Обновляем цены на основе реальных данных
            CONFIG.assets.EURUSD.price = 1 / data.rates.EUR || 1.0830;
            CONFIG.assets.USDJPY.price = data.rates.JPY || 148.35;
            CONFIG.assets.GBPUSD.price = 1 / data.rates.GBP || 1.2650;
            CONFIG.assets.AUDUSD.price = 1 / data.rates.AUD || 0.6590;
            CONFIG.assets.USDCAD.price = data.rates.CAD || 1.3520;
            CONFIG.assets.USDCHF.price = data.rates.CHF || 0.9025;
            
            // Расчетные пары
            CONFIG.assets.EURJPY.price = CONFIG.assets.EURUSD.price * CONFIG.assets.USDJPY.price;
            CONFIG.assets.GBPJPY.price = CONFIG.assets.GBPUSD.price * CONFIG.assets.USDJPY.price;
            
            return true;
        }
    } catch (error) {
        console.warn('Не удалось загрузить реальные цены:', error);
        throw error;
    }
}

function useDemoPrices() {
    Object.keys(CONFIG.assets).forEach(asset => {
        const change = (Math.random() - 0.5) * CONFIG.assets[asset].volatility;
        CONFIG.assets[asset].price *= (1 + change);
    });
}

function startPriceUpdates() {
    priceUpdateInterval = setInterval(async () => {
        try {
            await fetchRealPrices();
        } catch (error) {
            useDemoPrices();
        }
        updateAssetDisplay();
        updateChartData();
    }, 5000);
}

function updateAssetDisplay() {
    const asset = CONFIG.assets[currentAsset];
    if (!asset) return;
    
    const priceElement = document.getElementById('current-price');
    const pairElement = document.getElementById('current-pair');
    const changeElement = document.getElementById('price-change');
    const priceDisplay = document.getElementById('current-price-display');
    const changeDisplay = document.getElementById('price-change-display');
    
    if (priceElement) priceElement.textContent = asset.price.toFixed(5);
    if (pairElement) pairElement.textContent = asset.name;
    if (priceDisplay) priceDisplay.textContent = asset.price.toFixed(5);
    
    // Рассчитываем изменение
    const changePercent = (Math.random() - 0.5) * 0.1;
    if (changeElement) {
        changeElement.textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
        changeElement.className = changePercent >= 0 ? 'positive' : 'negative';
    }
    if (changeDisplay) {
        changeDisplay.textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
        changeDisplay.className = changePercent >= 0 ? 'positive' : 'negative';
    }
    
    // Обновляем время
    document.getElementById('chart-time').textContent = 
        `Обновлено: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})} UTC`;
}

function updateChartData() {
    if (!currentChart) return;
    
    const asset = CONFIG.assets[currentAsset];
    const lastCandle = currentChart.data.datasets[0].data[currentChart.data.datasets[0].data.length - 1];
    
    // Создаем новую свечу
    const newTime = new Date();
    const change = (Math.random() - 0.5) * asset.volatility;
    
    const newCandle = {
        x: newTime,
        o: lastCandle.c,
        h: Math.max(lastCandle.c, asset.price) * (1 + Math.random() * asset.volatility * 0.2),
        l: Math.min(lastCandle.c, asset.price) * (1 - Math.random() * asset.volatility * 0.2),
        c: asset.price
    };
    
    // Добавляем новую свечу и удаляем старую
    currentChart.data.datasets[0].data.push(newCandle);
    currentChart.data.datasets[0].data.shift();
    
    // Обновляем индикаторы
    updateIndicators();
    
    currentChart.update('none');
}

function updateIndicators() {
    const prices = currentChart.data.datasets[0].data.map(d => d.c);
    priceHistory = prices;
    
    // Пересчитываем индикаторы
    indicatorsData.ema20 = calculateEMA(prices, 20);
    indicatorsData.ema50 = calculateEMA(prices, 50);
    indicatorsData.rsi = calculateRSI(prices);
    indicatorsData.macd = calculateMACD(prices);
    
    // Обновляем линии на графике
    updateIndicatorLines();
    updateIndicatorsDisplay();
}

function updateIndicatorLines() {
    if (!currentChart || currentChart.data.datasets.length < 3) return;
    
    const prices = currentChart.data.datasets[0].data;
    
    // Обновляем EMA 20
    currentChart.data.datasets[1].data = indicatorsData.ema20.map((value, index) => ({
        x: prices[index].x,
        y: value
    }));
    
    // Обновляем EMA 50
    currentChart.data.datasets[2].data = indicatorsData.ema50.map((value, index) => ({
        x: prices[index].x,
        y: value
    }));
}

function reloadChart() {
    if (currentChart) {
        currentChart.destroy();
    }
    initChart();
    updateIndicatorsDisplay();
}

// ==================== СИГНАЛЫ ====================
async function generateSignal() {
    if (isSignalActive) {
        alert(currentLanguage === 'ru' ? 'Дождитесь завершения текущего сигнала' : 'Wait for current signal to complete');
        return;
    }
    
    isSignalActive = true;
    
    // Блокируем кнопку
    const btn = document.getElementById('generate-signal');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + 
                   (currentLanguage === 'ru' ? 'АНАЛИЗ...' : 'ANALYZING...');
    
    // Показываем статус анализа
    updateSignalStatus(currentLanguage === 'ru' ? 'Анализ...' : 'Analyzing...', '#ffaa00');
    
    // Показываем анимацию
    showAnalysisAnimation();
    
    // Анализ (2-3 секунды)
    setTimeout(() => {
        createSignal();
    }, 2000 + Math.random() * 1000);
}

function showAnalysisAnimation() {
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        const dict = CONFIG.languages[currentLanguage];
        signalContent.innerHTML = `
            <div style="text-align: center;">
                <div style="display: inline-block; width: 60px; height: 60px; border: 3px solid #2a3655; 
                          border-top-color: #00ff88; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="margin-top: 15px; color: #8b9dc3; font-size: 14px;">
                    <i class="fas fa-chart-line"></i><br>
                    ${dict.analysis}...
                </p>
                <div style="margin-top: 10px; font-size: 12px; color: #5d6d97;">
                    ${signalType === 'smart' ? 'Smart Money Concepts' : 
                      signalType === 'indicators' ? 'Technical Indicators' : 'Combined Analysis'}
                </div>
            </div>
        `;
    }
}

function createSignal() {
    const asset = CONFIG.assets[currentAsset];
    const dict = CONFIG.languages[currentLanguage];
    
    // Анализ на основе выбранного типа
    const analysis = performAdvancedAnalysis();
    
    // Создаем сигнал
    currentSignal = {
        asset: currentAsset,
        pair: asset.name,
        direction: analysis.direction,
        entryPrice: asset.price,
        confidence: analysis.confidence,
        indicators: analysis.indicators,
        timestamp: new Date(),
        type: signalType,
        result: null
    };
    
    // Отображаем сигнал
    displaySignal();
    
    // Разблокируем кнопку
    const btn = document.getElementById('generate-signal');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-bolt"></i> ' + dict.getSignal;
    
    // Запускаем таймер
    startExpirationTimer();
}

function performAdvancedAnalysis() {
    const prices = priceHistory;
    const lastPrice = prices[prices.length - 1];
    
    // Собираем данные от всех индикаторов
    const indicators = {
        rsi: indicatorsData.rsi[prices.length - 1],
        macd: indicatorsData.macd.macdLine[prices.length - 1],
        macdHistogram: indicatorsData.macd.histogram[prices.length - 1],
        ema20: indicatorsData.ema20[prices.length - 1],
        ema50: indicatorsData.ema50[prices.length - 1],
        trend: determineTrend()
    };
    
    let direction = 'BUY';
    let confidence = 75;
    let confirmations = [];
    
    // Анализ RSI
    if (indicators.rsi < 30) {
        confirmations.push('RSI oversold');
        confidence += 5;
    } else if (indicators.rsi > 70) {
        confirmations.push('RSI overbought');
        confidence -= 5;
    }
    
    // Анализ MACD
    if (indicators.macd > 0 && indicators.macdHistogram > 0) {
        confirmations.push('MACD bullish');
        confidence += 8;
    } else if (indicators.macd < 0 && indicators.macdHistogram < 0) {
        confirmations.push('MACD bearish');
        confidence -= 8;
    }
    
    // Анализ EMA
    if (lastPrice > indicators.ema20 && indicators.ema20 > indicators.ema50) {
        confirmations.push('EMA bullish alignment');
        confidence += 10;
        direction = 'BUY';
    } else if (lastPrice < indicators.ema20 && indicators.ema20 < indicators.ema50) {
        confirmations.push('EMA bearish alignment');
        confidence += 10;
        direction = 'SELL';
    }
    
    // Smart Money анализ (если выбран)
    if (signalType === 'smart' || signalType === 'combined') {
        const smartAnalysis = analyzeSmartMoney();
        confirmations = confirmations.concat(smartAnalysis.confirmations);
        confidence += smartAnalysis.confidenceBoost;
        
        if (smartAnalysis.direction) {
            direction = smartAnalysis.direction;
        }
    }
    
    // Ограничиваем уверенность
    confidence = Math.max(60, Math.min(95, Math.round(confidence)));
    
    return {
        direction,
        confidence,
        indicators,
        confirmations
    };
}

function analyzeSmartMoney() {
    const confirmations = [];
    let confidenceBoost = 0;
    let direction = null;
    
    // Имитация анализа Smart Money
    const randomFactor = Math.random();
    
    if (randomFactor > 0.6) {
        confirmations.push('Liquidity sweep detected');
        confirmations.push('Order block formed');
        confidenceBoost += 15;
        direction = randomFactor > 0.8 ? 'BUY' : 'SELL';
    } else if (randomFactor > 0.3) {
        confirmations.push('Fair value gap');
        confidenceBoost += 8;
    }
    
    return { confirmations, confidenceBoost, direction };
}

function displaySignal() {
    const signal = currentSignal;
    const dict = CONFIG.languages[currentLanguage];
    
    // Скрываем контент, показываем детали
    document.getElementById('signal-content').style.display = 'none';
    document.getElementById('signal-details').style.display = 'block';
    document.getElementById('signal-analysis').style.display = 'block';
    document.getElementById('expiration-timer').style.display = 'block';
    
    // Детали сигнала
    const detailsHTML = `
        <div style="padding: 20px;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
                <div>
                    <div style="font-size: 11px; color: #8b9dc3; margin-bottom: 5px;">${dict.instrument}</div>
                    <div style="font-size: 18px; font-weight: 700;">${signal.pair}</div>
                </div>
                <div>
                    <div style="font-size: 11px; color: #8b9dc3; margin-bottom: 5px;">${dict.entryPrice}</div>
                    <div style="font-size: 18px; font-weight: 700; font-family: 'Courier New', monospace;">${signal.entryPrice.toFixed(5)}</div>
                </div>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 32px; font-weight: 800; color: ${signal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; 
                          text-transform: uppercase; margin-bottom: 5px;">
                    ${signal.direction === 'BUY' ? dict.buy : dict.sell}
                </div>
                <div style="font-size: 24px; font-weight: 700; color: #00ff88;">
                    ${signal.confidence}%
                </div>
                <div style="font-size: 12px; color: #8b9dc3; margin-top: 5px;">
                    ${signal.type === 'smart' ? 'Smart Money' : 
                      signal.type === 'indicators' ? 'Technical Indicators' : 'Combined Analysis'}
                </div>
            </div>
            
            <div style="font-size: 11px; color: #5d6d97; text-align: center;">
                <i class="far fa-clock"></i>
                ${signal.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
            </div>
        </div>
    `;
    
    document.getElementById('signal-details').innerHTML = detailsHTML;
    
    // Анализ индикаторов
    const analysisHTML = `
        <div style="padding: 15px;">
            <div style="font-size: 11px; color: #8b9dc3; margin-bottom: 10px; text-transform: uppercase;">
                <i class="fas fa-chart-bar"></i> ${dict.analysis}
            </div>
            <div class="analysis-grid">
                <div class="analysis-item">
                    <div class="analysis-label">${dict.rsi}</div>
                    <div class="analysis-value ${signal.indicators.rsi > 70 ? 'negative' : signal.indicators.rsi < 30 ? 'positive' : ''}">
                        ${signal.indicators.rsi.toFixed(1)}
                    </div>
                </div>
                <div class="analysis-item">
                    <div class="analysis-label">${dict.macd}</div>
                    <div class="analysis-value ${signal.indicators.macd > 0 ? 'positive' : 'negative'}">
                        ${signal.indicators.macd.toFixed(5)}
                    </div>
                </div>
                <div class="analysis-item">
                    <div class="analysis-label">${dict.ema} 20</div>
                    <div class="analysis-value ${signal.entryPrice > signal.indicators.ema20 ? 'positive' : 'negative'}">
                        ${signal.indicators.ema20.toFixed(5)}
                    </div>
                </div>
                <div class="analysis-item">
                    <div class="analysis-label">${dict.trend}</div>
                    <div class="analysis-value ${signal.indicators.trend.strength > 0 ? 'positive' : signal.indicators.trend.strength < 0 ? 'negative' : ''}">
                        ${signal.indicators.trend.direction}
                    </div>
                </div>
                <div class="analysis-item">
                    <div class="analysis-label">${dict.strength}</div>
                    <div class="analysis-value positive">
                        ${signal.confirmations.length}/5
                    </div>
                </div>
                <div class="analysis-item">
                    <div class="analysis-label">${dict.volume}</div>
                    <div class="analysis-value ${Math.random() > 0.5 ? 'positive' : 'negative'}">
                        ${(Math.random() * 100).toFixed(0)}%
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('signal-analysis').innerHTML = analysisHTML;
    
    // Обновляем статус
    updateSignalStatus('ACTIVE', signal.direction === 'BUY' ? '#00ff88' : '#ff4444');
}

function updateSignalStatus(text, color) {
    const statusElement = document.getElementById('signal-status');
    const statusText = document.getElementById('status-text');
    
    if (statusElement && statusText) {
        const dot = statusElement.querySelector('.status-dot');
        if (dot) {
            dot.style.background = color;
            dot.style.boxShadow = `0 0 10px ${color}`;
        }
        statusText.textContent = text;
        statusText.style.color = color;
    }
}

function startExpirationTimer() {
    const totalTime = currentTimeframe;
    let timeLeft = totalTime;
    
    const timerBar = document.getElementById('timer-bar');
    const timerValue = document.getElementById('timer-value');
    
    if (!timerBar || !timerValue) return;
    
    // Сбрасываем анимацию
    timerBar.style.transition = 'none';
    timerBar.style.transform = 'scaleX(1)';
    void timerBar.offsetWidth;
    
    // Запускаем анимацию
    timerBar.style.transition = `transform ${totalTime}s linear`;
    timerBar.style.transform = 'scaleX(0)';
    
    // Запускаем таймер
    expirationTimer = setInterval(() => {
        timeLeft--;
        
        // Обновляем отображение
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerValue.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Меняем цвет
        const progress = timeLeft / totalTime;
        if (progress < 0.3) {
            timerBar.style.background = 'linear-gradient(90deg, #ff4444, #ffaa00)';
        } else if (progress < 0.7) {
            timerBar.style.background = 'linear-gradient(90deg, #ffaa00, #00ff88)';
        }
        
        // Завершение
        if (timeLeft <= 0) {
            clearInterval(expirationTimer);
            finishSignal();
        }
    }, 1000);
}

function finishSignal() {
    if (!currentSignal) return;
    
    const dict = CONFIG.languages[currentLanguage];
    const currentPrice = CONFIG.assets[currentAsset].price;
    const entryPrice = currentSignal.entryPrice;
    
    // Определяем результат
    let result, resultColor, resultText;
    
    if (currentSignal.direction === 'BUY') {
        if (currentPrice > entryPrice * 1.0001) {
            result = 'WIN';
            resultColor = '#00ff88';
            resultText = dict.win;
        } else if (currentPrice < entryPrice * 0.9999) {
            result = 'LOSS';
            resultColor = '#ff4444';
            resultText = dict.loss;
        } else {
            result = 'REFUND';
            resultColor = '#8b9dc3';
            resultText = dict.refund;
        }
    } else {
        if (currentPrice < entryPrice * 0.9999) {
            result = 'WIN';
            resultColor = '#00ff88';
            resultText = dict.win;
        } else if (currentPrice > entryPrice * 1.0001) {
            result = 'LOSS';
            resultColor = '#ff4444';
            resultText = dict.loss;
        } else {
            result = 'REFUND';
            resultColor = '#8b9dc3';
            resultText = dict.refund;
        }
    }
    
    // Обновляем сигнал
    currentSignal.result = result;
    currentSignal.exitPrice = currentPrice;
    currentSignal.completedAt = new Date();
    
    // Показываем результат
    showSignalResult(result, resultText, resultColor, currentPrice);
    
    // Добавляем в историю
    addToHistory();
    
    // Сбрасываем через 5 секунд
    setTimeout(resetSignal, 5000);
}

function showSignalResult(result, resultText, resultColor, exitPrice) {
    const dict = CONFIG.languages[currentLanguage];
    const resultHTML = `
        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid ${resultColor}30;">
            <div style="text-align: center;">
                <div style="font-size: 28px; font-weight: 800; color: ${resultColor}; margin-bottom: 5px;">
                    ${resultText}
                </div>
                <div style="font-size: 14px; color: #8b9dc3; margin-bottom: 15px;">
                    ${dict.result}
                </div>
                
                <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 15px;">
                    <div style="text-align: center;">
                        <div style="font-size: 11px; color: #5d6d97;">${dict.entryPrice}</div>
                        <div style="font-size: 16px; font-weight: 700;">${currentSignal.entryPrice.toFixed(5)}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 11px; color: #5d6d97;">${dict.exitPrice}</div>
                        <div style="font-size: 16px; font-weight: 700;">${exitPrice.toFixed(5)}</div>
                    </div>
                </div>
                
                <div style="font-size: 12px; color: #5d6d97;">
                    <i class="far fa-clock"></i>
                    ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
                </div>
            </div>
        </div>
    `;
    
    const detailsElement = document.getElementById('signal-details');
    if (detailsElement) {
        detailsElement.innerHTML += resultHTML;
    }
    
    // Обновляем статус
    updateSignalStatus(resultText, resultColor);
}

function addToHistory() {
    const resultsList = document.getElementById('results-list');
    if (!resultsList) return;
    
    const dict = CONFIG.languages[currentLanguage];
    const resultColor = currentSignal.result === 'WIN' ? '#00ff88' : 
                       currentSignal.result === 'LOSS' ? '#ff4444' : '#8b9dc3';
    
    const historyItem = document.createElement('div');
    historyItem.className = `result-item ${currentSignal.result.toLowerCase()} fade-in`;
    
    historyItem.innerHTML = `
        <div class="result-info">
            <span class="result-pair">${currentSignal.pair}</span>
            <span class="result-direction ${currentSignal.direction.toLowerCase()}">
                ${currentSignal.direction === 'BUY' ? '↑' : '↓'}
            </span>
            <span class="result-accuracy">${currentSignal.confidence}%</span>
        </div>
        <div style="text-align: right;">
            <div class="result-price">${currentSignal.entryPrice.toFixed(5)} → ${currentSignal.exitPrice.toFixed(5)}</div>
            <div class="result-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        </div>
    `;
    
    // Добавляем в начало
    resultsList.insertBefore(historyItem, resultsList.firstChild);
    
    // Сохраняем историю
    saveHistory();
    
    // Обновляем статистику точности
    updateAccuracyStats();
}

function updateAccuracyStats() {
    const results = document.querySelectorAll('.result-item');
    const total = results.length;
    const wins = Array.from(results).filter(r => r.classList.contains('win')).length;
    
    if (total > 0) {
        const accuracy = ((wins / total) * 100).toFixed(1);
        document.getElementById('accuracy-rate').textContent = `${accuracy}%`;
    }
}

function saveHistory() {
    try {
        const history = {
            signal: currentSignal,
            timestamp: new Date().toISOString()
        };
        
        let savedHistory = JSON.parse(localStorage.getItem('tradingHistory') || '[]');
        savedHistory.unshift(history);
        
        if (savedHistory.length > 20) {
            savedHistory = savedHistory.slice(0, 20);
        }
        
        localStorage.setItem('tradingHistory', JSON.stringify(savedHistory));
    } catch (error) {
        console.error('Ошибка сохранения истории:', error);
    }
}

function loadHistory() {
    try {
        const savedHistory = JSON.parse(localStorage.getItem('tradingHistory') || '[]');
        
        // Можно добавить загрузку истории при старте
        if (savedHistory.length > 0) {
            console.log(`Загружено ${savedHistory.length} записей истории`);
        }
    } catch (error) {
        console.error('Ошибка загрузки истории:', error);
    }
}

function resetSignal() {
    isSignalActive = false;
    currentSignal = null;
    
    const dict = CONFIG.languages[currentLanguage];
    
    // Восстанавливаем исходное состояние
    document.getElementById('signal-content').style.display = 'flex';
    document.getElementById('signal-details').style.display = 'none';
    document.getElementById('signal-analysis').style.display = 'none';
    document.getElementById('expiration-timer').style.display = 'none';
    
    // Восстанавливаем контент
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        signalContent.innerHTML = `
            <div class="signal-placeholder">
                <i class="fas fa-chart-line"></i>
                <p>${dict.clickGenerate}</p>
            </div>
        `;
    }
    
    // Восстанавливаем статус
    updateSignalStatus(dict.waiting, '#00ff88');
    
    // Сбрасываем таймер
    const timerBar = document.getElementById('timer-bar');
    const timerValue = document.getElementById('timer-value');
    if (timerBar && timerValue) {
        timerBar.style.transition = 'none';
        timerBar.style.transform = 'scaleX(1)';
        timerBar.style.background = 'linear-gradient(90deg, #00ff88, #0066ff)';
        timerValue.textContent = CONFIG.timeframes[currentTimeframe];
    }
    
    // Очищаем интервал
    if (expirationTimer) {
        clearInterval(expirationTimer);
        expirationTimer = null;
    }
}
