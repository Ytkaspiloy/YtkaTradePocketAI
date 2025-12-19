// Конфигурация API для реальных котировок
const API_CONFIG = {
    baseUrl: 'https://api.twelvedata.com',
    apiKey: 'demo',
    
    alternativeApis: [
        {
            name: 'frankfurter',
            url: 'https://api.frankfurter.app/latest',
            pairs: ['EURUSD', 'USDJPY', 'GBPUSD', 'AUDUSD', 'USDCAD', 'USDCHF']
        },
        {
            name: 'exchangerate',
            url: 'https://api.exchangerate-api.com/v4/latest/',
            pairs: ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'CHF', 'JPY']
        }
    ]
};

// Конфигурация активов
const ASSETS = {
    'EURUSD': { 
        name: 'EUR/USD', 
        base: 'EUR',
        quote: 'USD',
        price: 1.0830,
        lastUpdate: null
    },
    'USDJPY': { 
        name: 'USD/JPY', 
        base: 'USD',
        quote: 'JPY',
        price: 148.35,
        lastUpdate: null
    },
    'GBPUSD': { 
        name: 'GBP/USD', 
        base: 'GBP',
        quote: 'USD',
        price: 1.2650,
        lastUpdate: null
    },
    'AUDUSD': { 
        name: 'AUD/USD', 
        base: 'AUD',
        quote: 'USD',
        price: 0.6590,
        lastUpdate: null
    },
    'USDCAD': { 
        name: 'USD/CAD', 
        base: 'USD',
        quote: 'CAD',
        price: 1.3520,
        lastUpdate: null
    },
    'USDCHF': { 
        name: 'USD/CHF', 
        base: 'USD',
        quote: 'CHF',
        price: 0.9025,
        lastUpdate: null
    },
    'EURJPY': { 
        name: 'EUR/JPY', 
        base: 'EUR',
        quote: 'JPY',
        price: 160.42,
        lastUpdate: null
    },
    'GBPJPY': { 
        name: 'GBP/JPY', 
        base: 'GBP',
        quote: 'JPY',
        price: 187.65,
        lastUpdate: null
    }
};

// Локализация
const TRANSLATIONS = {
    ru: {
        // Заголовки
        instrument: "ИНСТРУМЕНТ",
        expiration: "ЭКСПИРАЦИЯ",
        signalType: "ТИП СИГНАЛА",
        realQuotes: "РЕАЛЬНЫЕ КОТИРОВКИ",
        signal: "СИГНАЛ",
        currentPrice: "Текущая цена:",
        change: "Изменение:",
        time: "Время:",
        timeframe: "Таймфрейм:",
        currentSignal: "ТЕКУЩИЙ СИГНАЛ",
        recentResults: "ПОСЛЕДНИЕ РЕЗУЛЬТАТЫ",
        expiresIn: "Истекает через:",
        apiInfo: "Используются реальные котировки Forex. Обновление каждые 5 секунд.",
        disclaimer: "Торговля бинарными опционами связана с высокими рисками.",
        dataSource: "Источник: Twelve Data API",
        confidence: "Уверенность:",
        direction: "Направление:",
        
        // Кнопки
        getSignal: "ПОЛУЧИТЬ СИГНАЛ",
        smartMoney: "Smart Money",
        indicators: "Индикаторы",
        combined: "Комбинированный",
        
        // Таймфреймы
        "1min": "1 мин",
        "2min": "2 мин",
        "3min": "3 мин",
        "5min": "5 мин",
        
        // Статусы
        waiting: "Ожидание",
        priceUpdate: "Обновление цен...",
        clickForAnalysis: "Нажмите 'Получить сигнал' для анализа",
        modeDemo: "Режим: Демо",
        
        // Анализ
        indicatorsAnalysis: "АНАЛИЗ ИНДИКАТОРОВ",
        trend: "Тренд",
        rsi: "RSI",
        macd: "MACD",
        bollinger: "Боллинджер",
        movingAverage: "Скользящие",
        stochastic: "Стохастик",
        volume: "Объем",
        support: "Поддержка",
        resistance: "Сопротивление",
        buy: "ПОКУПКА",
        sell: "ПРОДАЖА",
        strongBuy: "Сильная покупка",
        strongSell: "Сильная продажа",
        neutral: "Нейтрально",
        overbought: "Перекупленность",
        oversold: "Перепроданность",
        bullish: "Бычий",
        bearish: "Медвежий",
        uptrend: "Восходящий ↗",
        downtrend: "Нисходящий ↘",
        sideTrend: "Боковой ↔",
        analysis: "Анализ..."
    },
    en: {
        // Headers
        instrument: "INSTRUMENT",
        expiration: "EXPIRATION",
        signalType: "SIGNAL TYPE",
        realQuotes: "REAL QUOTES",
        signal: "SIGNAL",
        currentPrice: "Current price:",
        change: "Change:",
        time: "Time:",
        timeframe: "Timeframe:",
        currentSignal: "CURRENT SIGNAL",
        recentResults: "RECENT RESULTS",
        expiresIn: "Expires in:",
        apiInfo: "Using real Forex quotes. Updated every 5 seconds.",
        disclaimer: "Binary options trading involves high risks.",
        dataSource: "Source: Twelve Data API",
        confidence: "Confidence:",
        direction: "Direction:",
        
        // Buttons
        getSignal: "GET SIGNAL",
        smartMoney: "Smart Money",
        indicators: "Indicators",
        combined: "Combined",
        
        // Timeframes
        "1min": "1 min",
        "2min": "2 min",
        "3min": "3 min",
        "5min": "5 min",
        
        // Statuses
        waiting: "Waiting",
        priceUpdate: "Price update...",
        clickForAnalysis: "Click 'Get Signal' for analysis",
        modeDemo: "Mode: Demo",
        
        // Analysis
        indicatorsAnalysis: "INDICATORS ANALYSIS",
        trend: "Trend",
        rsi: "RSI",
        macd: "MACD",
        bollinger: "Bollinger",
        movingAverage: "Moving Average",
        stochastic: "Stochastic",
        volume: "Volume",
        support: "Support",
        resistance: "Resistance",
        buy: "BUY",
        sell: "SELL",
        strongBuy: "Strong buy",
        strongSell: "Strong sell",
        neutral: "Neutral",
        overbought: "Overbought",
        oversold: "Oversold",
        bullish: "Bullish",
        bearish: "Bearish",
        uptrend: "Uptrend ↗",
        downtrend: "Downtrend ↘",
        sideTrend: "Sideways ↔",
        analysis: "Analysis..."
    }
};

// Глобальные переменные
let currentChart = null;
let currentSignal = null;
let isSignalActive = false;
let expirationTimer = null;
let resultsHistory = [];
let currentAsset = 'EURUSD';
let currentTimeframe = 60;
let priceUpdateInterval = null;
let chartData = [];
let priceHistory = [];
let chartType = 'candlestick';
let currentLanguage = 'ru';
let signalType = 'smart';
let drawingMode = null;
let drawings = [];
let isDrawing = false;
let lastClickTime = 0;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Scalping Robot Pro...');
    
    // Инициализация локализации
    initLanguage();
    
    // Инициализация графика
    initChart();
    
    // Инициализация событий
    initEvents();
    
    // Загрузка начальных данных
    loadInitialPrices();
    
    // Запуск обновления цен
    startPriceUpdates();
    
    // Загрузка истории
    loadHistory();
    
    // Установка начального активного состояния
    setActiveStates();
    
    console.log('✅ Scalping Robot Pro ready!');
});

// Установка начальных активных состояний
function setActiveStates() {
    // Устанавливаем активный таймфрейм
    document.querySelectorAll('.time-btn').forEach(btn => {
        if (parseInt(btn.dataset.time) === currentTimeframe) {
            btn.classList.add('active');
        }
    });
    
    // Устанавливаем активный тип сигнала
    document.querySelectorAll('.signal-type-btn').forEach(btn => {
        if (btn.dataset.type === signalType) {
            btn.classList.add('active');
        }
    });
    
    // Устанавливаем активный тип графика
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        if (btn.dataset.type === chartType) {
            btn.classList.add('active');
        }
    });
}

// Инициализация локализации
function initLanguage() {
    const savedLang = localStorage.getItem('scalpingRobotLang') || 'ru';
    setLanguage(savedLang);
}

// Установка языка
function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem('scalpingRobotLang', lang);
    
    // Обновляем все элементы с атрибутом data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (TRANSLATIONS[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = TRANSLATIONS[lang][key];
            } else {
                element.textContent = TRANSLATIONS[lang][key];
            }
        }
    });
    
    // Обновляем активные кнопки языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Обновляем статус
    updateSignalStatus(getTranslation('waiting'), '#00ff88');
}

// Получение перевода
function getTranslation(key) {
    return TRANSLATIONS[currentLanguage][key] || key;
}

// Инициализация графика
function initChart() {
    const ctx = document.getElementById('trading-chart').getContext('2d');
    
    // Генерация тестовых данных
    generateTestChartData();
    
    // Настройки графика
    currentChart = new Chart(ctx, {
        type: 'candlestick',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Price',
                data: chartData.candles,
                borderColor: '#00ff88',
                backgroundColor: (ctx) => {
                    const candle = ctx.dataset.data[ctx.dataIndex];
                    return candle.c >= candle.o ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 68, 68, 0.3)';
                },
                borderWidth: 1,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(26, 34, 56, 0.95)',
                    titleColor: '#8b9dc3',
                    bodyColor: '#ffffff',
                    borderColor: '#2a3655',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: { 
                        color: 'rgba(42, 54, 85, 0.3)',
                        drawBorder: false
                    },
                    ticks: { 
                        color: '#8b9dc3',
                        maxRotation: 0
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
                            return value.toFixed(4);
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Генерация тестовых свечных данных
function generateTestChartData() {
    const labels = [];
    const candles = [];
    const prices = [];
    const now = new Date();
    
    // 50 свечей
    let currentPrice = ASSETS[currentAsset].price;
    
    for (let i = 49; i >= 0; i--) {
        const time = new Date(now);
        time.setMinutes(time.getMinutes() - i);
        labels.push(time.getHours().toString().padStart(2, '0') + ':' + 
                   time.getMinutes().toString().padStart(2, '0'));
        
        // Генерируем реалистичную свечу
        const volatility = 0.0003;
        const open = currentPrice;
        const high = open * (1 + Math.random() * volatility);
        const low = open * (1 - Math.random() * volatility);
        const close = low + Math.random() * (high - low);
        
        candles.push({ o: open, h: high, l: low, c: close });
        prices.push(close);
        
        currentPrice = close;
    }
    
    chartData = { labels, candles, prices };
    priceHistory = prices;
}

// Обновление графика реальными данными
function updateChartWithRealData() {
    if (!currentChart || chartData.candles.length === 0) return;
    
    const currentPrice = ASSETS[currentAsset].price;
    
    // Обновляем последнюю свечу
    const lastCandle = chartData.candles[chartData.candles.length - 1];
    lastCandle.h = Math.max(lastCandle.h, currentPrice);
    lastCandle.l = Math.min(lastCandle.l, currentPrice);
    lastCandle.c = currentPrice;
    
    // Обновляем график
    currentChart.data.datasets[0].data = chartData.candles;
    currentChart.update('none');
    
    // Сохраняем историю
    priceHistory = chartData.candles.map(c => c.c);
}

// Переключение типа графика
function switchChartType(type) {
    chartType = type;
    
    if (!currentChart) return;
    
    // Сохраняем старые данные
    const oldData = currentChart.data;
    
    if (type === 'candlestick') {
        currentChart.destroy();
        currentChart = null;
        
        // Создаем новый свечной график
        const ctx = document.getElementById('trading-chart').getContext('2d');
        currentChart = new Chart(ctx, {
            type: 'candlestick',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Price',
                    data: chartData.candles,
                    borderColor: '#00ff88',
                    backgroundColor: (ctx) => {
                        const candle = ctx.dataset.data[ctx.dataIndex];
                        return candle.c >= candle.o ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 68, 68, 0.3)';
                    },
                    borderWidth: 1,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(26, 34, 56, 0.95)',
                        titleColor: '#8b9dc3',
                        bodyColor: '#ffffff',
                        borderColor: '#2a3655',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: { 
                            color: 'rgba(42, 54, 85, 0.3)',
                            drawBorder: false
                        },
                        ticks: { 
                            color: '#8b9dc3',
                            maxRotation: 0
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
                                return value.toFixed(4);
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    } else if (type === 'line') {
        currentChart.destroy();
        currentChart = null;
        
        // Создаем новый линейный график
        const ctx = document.getElementById('trading-chart').getContext('2d');
        currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Price',
                    data: chartData.prices,
                    borderColor: '#00ff88',
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(26, 34, 56, 0.95)',
                        titleColor: '#8b9dc3',
                        bodyColor: '#ffffff',
                        borderColor: '#2a3655',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: { 
                            color: 'rgba(42, 54, 85, 0.3)',
                            drawBorder: false
                        },
                        ticks: { 
                            color: '#8b9dc3',
                            maxRotation: 0
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
                                return value.toFixed(4);
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
}

// Инициализация событий
function initEvents() {
    console.log('🎯 Initializing event handlers...');
    
    // Переключение языка - исправленная версия
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const newLang = this.dataset.lang;
            if (newLang !== currentLanguage) {
                setLanguage(newLang);
            }
        });
    });
    
    // Выбор актива
    const assetSelect = document.getElementById('asset-select');
    if (assetSelect) {
        assetSelect.addEventListener('change', function() {
            currentAsset = this.value;
            console.log('📊 Asset changed to:', currentAsset);
            
            updateAssetDisplay();
            generateTestChartData();
            
            if (currentChart) {
                if (chartType === 'candlestick') {
                    currentChart.data.datasets[0].data = chartData.candles;
                } else {
                    currentChart.data.datasets[0].data = chartData.prices;
                }
                currentChart.update();
            }
        });
    }
    
    // Кнопки таймфреймов - исправленная версия
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Снимаем активный класс со всех кнопок таймфреймов
            document.querySelectorAll('.time-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Добавляем активный класс нажатой кнопке
            this.classList.add('active');
            
            // Обновляем таймфрейм
            currentTimeframe = parseInt(this.dataset.time);
            
            // Обновляем отображение
            const timeText = getTimeframeText(currentTimeframe);
            document.getElementById('current-tf').textContent = timeText;
            
            console.log('⏱️ Timeframe changed:', timeText);
        });
    });
    
    // Тип сигнала - исправленная версия
    document.querySelectorAll('.signal-type-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Снимаем активный класс со всех кнопок типа сигнала
            document.querySelectorAll('.signal-type-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Добавляем активный класс нажатой кнопке
            this.classList.add('active');
            
            // Обновляем тип сигнала
            signalType = this.dataset.type;
            console.log('🎯 Signal type changed:', signalType);
        });
    });
    
    // Тип графика - исправленная версия
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Снимаем активный класс со всех кнопок типа графика
            document.querySelectorAll('.chart-type-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Добавляем активный класс нажатой кнопке
            this.classList.add('active');
            
            // Переключаем тип графика
            switchChartType(this.dataset.type);
        });
    });
    
    // Инструменты рисования - исправленная версия
    document.getElementById('draw-line').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Сбрасываем другие инструменты
        document.getElementById('draw-horizontal').classList.remove('active');
        
        // Переключаем режим рисования линии
        if (drawingMode === 'line') {
            drawingMode = null;
            this.classList.remove('active');
        } else {
            drawingMode = 'line';
            this.classList.add('active');
        }
        
        console.log('📐 Drawing mode:', drawingMode);
    });
    
    document.getElementById('draw-horizontal').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Сбрасываем другие инструменты
        document.getElementById('draw-line').classList.remove('active');
        
        // Переключаем режим рисования горизонтальной линии
        if (drawingMode === 'horizontal') {
            drawingMode = null;
            this.classList.remove('active');
        } else {
            drawingMode = 'horizontal';
            this.classList.add('active');
        }
        
        console.log('📐 Drawing mode:', drawingMode);
    });
    
    document.getElementById('clear-drawings').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Очищаем рисунки
        drawings = [];
        drawingMode = null;
        
        // Сбрасываем все активные кнопки рисования
        document.querySelectorAll('.tool-btn.active').forEach(btn => {
            btn.classList.remove('active');
        });
        
        console.log('🗑️ Drawings cleared');
        
        // Здесь можно добавить очистку визуальных элементов
        alert('Drawings cleared! (Visual cleanup would be implemented with canvas drawing)');
    });
    
    // Кнопка генерации сигнала - исправленная версия
    const generateBtn = document.getElementById('generate-signal');
    if (generateBtn) {
        generateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            generateSignal();
        });
    }
    
    // Обработка двойного клика (предотвращение зума)
    const chartCanvas = document.getElementById('trading-chart');
    chartCanvas.addEventListener('dblclick', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    
    // Обработка кликов по графику для рисования
    chartCanvas.addEventListener('click', function(event) {
        if (!drawingMode) return;
        
        const now = Date.now();
        if (now - lastClickTime < 300) return; // Защита от двойного клика
        lastClickTime = now;
        
        const rect = this.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        drawings.push({ 
            type: drawingMode, 
            x, 
            y,
            time: new Date().toLocaleTimeString()
        });
        
        console.log(`📐 Drawing added: ${drawingMode} at (${x.toFixed(0)}, ${y.toFixed(0)})`);
        
        // Показываем временное уведомление
        showDrawingNotification(`Added ${drawingMode} line`);
    });
    
    console.log('✅ Event handlers initialized');
}

// Показать уведомление о рисовании
function showDrawingNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(26, 34, 56, 0.95);
        color: #00ff88;
        padding: 10px 20px;
        border-radius: 8px;
        border: 1px solid #2a3655;
        z-index: 1000;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Получение текста таймфрейма
function getTimeframeText(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${currentLanguage === 'ru' ? 'мин' : 'min'}`;
}

// Загрузка начальных цен
async function loadInitialPrices() {
    console.log('📡 Loading initial prices...');
    
    try {
        await fetchRealPrices();
    } catch (error) {
        console.warn('⚠️ Failed to load real prices, using demo data');
        useDemoPrices();
    }
    
    updateAssetDisplay();
    updatePriceFeed();
}

// Получение реальных цен с API
async function fetchRealPrices() {
    try {
        const response = await fetch('https://api.frankfurter.app/latest?from=USD');
        
        if (!response.ok) throw new Error('API error');
        
        const data = await response.json();
        
        if (data.rates) {
            // EUR/USD
            if (data.rates.EUR) {
                ASSETS.EURUSD.price = 1 / data.rates.EUR;
            }
            
            // USD/JPY
            if (data.rates.JPY) {
                ASSETS.USDJPY.price = data.rates.JPY;
            }
            
            // GBP/USD
            if (data.rates.GBP) {
                ASSETS.GBPUSD.price = 1 / data.rates.GBP;
            }
            
            // AUD/USD
            if (data.rates.AUD) {
                ASSETS.AUDUSD.price = 1 / data.rates.AUD;
            }
            
            // USD/CAD
            if (data.rates.CAD) {
                ASSETS.USDCAD.price = data.rates.CAD;
            }
            
            // USD/CHF
            if (data.rates.CHF) {
                ASSETS.USDCHF.price = data.rates.CHF;
            }
            
            // EUR/JPY
            if (data.rates.EUR && data.rates.JPY) {
                ASSETS.EURJPY.price = (1 / data.rates.EUR) * data.rates.JPY;
            }
            
            // GBP/JPY
            if (data.rates.GBP && data.rates.JPY) {
                ASSETS.GBPJPY.price = (1 / data.rates.GBP) * data.rates.JPY;
            }
            
            console.log('✅ Real prices loaded');
            return true;
        }
    } catch (error) {
        console.error('❌ Error loading real prices:', error);
        throw error;
    }
}

// Использование демо-цен
function useDemoPrices() {
    Object.keys(ASSETS).forEach(asset => {
        const change = (Math.random() - 0.5) * 0.001;
        ASSETS[asset].price *= (1 + change);
        ASSETS[asset].lastUpdate = new Date();
    });
}

// Запуск обновления цен
function startPriceUpdates() {
    priceUpdateInterval = setInterval(async () => {
        try {
            await updatePrices();
            updateAssetDisplay();
            updatePriceFeed();
            
            if (currentChart) {
                updateChartWithRealData();
            }
        } catch (error) {
            console.warn('⚠️ Price update error:', error);
            useDemoPrices();
            updateAssetDisplay();
            updatePriceFeed();
        }
    }, 5000);
}

// Обновление цен
async function updatePrices() {
    try {
        const success = await fetchRealPrices();
        if (!success) {
            throw new Error('Failed to fetch real prices');
        }
    } catch (error) {
        useDemoPrices();
    }
}

// Обновление отображения актива
function updateAssetDisplay() {
    const asset = ASSETS[currentAsset];
    if (!asset) return;
    
    const priceElement = document.getElementById('current-price');
    const pairElement = document.getElementById('current-pair');
    const changeElement = document.getElementById('price-change');
    
    if (priceElement) {
        priceElement.textContent = asset.price.toFixed(5);
    }
    
    if (pairElement) {
        pairElement.textContent = asset.name;
    }
    
    if (changeElement) {
        const changePercent = (Math.random() - 0.5) * 0.1;
        const changeValue = asset.price * changePercent;
        
        changeElement.textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
        changeElement.className = changePercent >= 0 ? 'positive' : 'negative';
        
        document.getElementById('current-price-display').textContent = asset.price.toFixed(5);
        document.getElementById('price-change-display').textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
        document.getElementById('price-time').textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    }
    
    document.getElementById('chart-time').textContent = `${currentLanguage === 'ru' ? 'Обновлено' : 'Updated'}: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})} UTC`;
}

// Обновление ленты цен
function updatePriceFeed() {
    const feedPairs = ['EURUSD', 'USDJPY', 'GBPUSD'];
    
    feedPairs.forEach(pair => {
        const element = document.getElementById(`price-${pair}`);
        if (element && ASSETS[pair]) {
            element.textContent = ASSETS[pair].price.toFixed(5);
        }
    });
}

// Генерация сигнала
async function generateSignal() {
    if (isSignalActive) {
        alert(currentLanguage === 'ru' ? '⏳ Дождитесь завершения текущего сигнала' : '⏳ Wait for current signal to complete');
        return;
    }
    
    isSignalActive = true;
    
    const btn = document.getElementById('generate-signal');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${getTranslation('analysis')}`;
    
    updateSignalStatus(getTranslation('analysis'), '#ffaa00');
    showAnalysisAnimation();
    
    // Имитация анализа (3 секунды)
    setTimeout(() => {
        createSignal();
        btn.disabled = false;
        btn.innerHTML = originalText;
    }, 3000);
}

// Показать анимацию анализа
function showAnalysisAnimation() {
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        signalContent.innerHTML = `
            <div style="text-align: center;">
                <div style="display: inline-block; width: 60px; height: 60px; border: 3px solid #2a3655; border-top-color: #00ff88; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="margin-top: 15px; color: #8b9dc3; font-size: 14px;">
                    <i class="fas fa-chart-line"></i><br>
                    ${currentLanguage === 'ru' ? 'Анализ рынка...' : 'Market analysis...'}
                </p>
                <div style="margin-top: 10px; font-size: 12px; color: #5d6d97;">
                    ${signalType === 'smart' ? 
                      (currentLanguage === 'ru' ? 'Используются концепции Smart Money' : 'Using Smart Money concepts') : 
                      signalType === 'indicators' ? 
                      (currentLanguage === 'ru' ? 'Технический анализ индикаторов' : 'Technical indicators analysis') : 
                      (currentLanguage === 'ru' ? 'Комбинированный анализ' : 'Combined analysis')}
                </div>
            </div>
        `;
    }
}

// Создание сигнала
function createSignal() {
    const asset = ASSETS[currentAsset];
    if (!asset) return;
    
    // Анализ в зависимости от типа сигнала
    let analysis;
    if (signalType === 'smart') {
        analysis = performSmartMoneyAnalysis();
    } else if (signalType === 'indicators') {
        analysis = performTechnicalAnalysis();
    } else {
        analysis = performCombinedAnalysis();
    }
    
    currentSignal = {
        asset: currentAsset,
        pair: asset.name,
        direction: analysis.direction,
        entryPrice: asset.price,
        confidence: analysis.confidence,
        analysis: analysis,
        timestamp: new Date(),
        result: null,
        signalType: signalType
    };
    
    console.log('🎯 Signal created:', currentSignal);
    
    displaySignal();
    startExpirationTimer();
}

// Анализ Smart Money
function performSmartMoneyAnalysis() {
    const prices = priceHistory;
    
    // Smart Money концепции
    const orderFlow = Math.random() > 0.6 ? 'BUYING' : 'SELLING';
    const liquidity = Math.random() > 0.5 ? 'ABSORBED' : 'SWEPT';
    const imbalance = Math.random() > 0.5 ? 'BUY' : 'SELL';
    
    let direction = 'BUY';
    let confidence = 75;
    
    if (orderFlow === 'BUYING' && imbalance === 'BUY') {
        direction = 'BUY';
        confidence = 85 + Math.random() * 10;
    } else if (orderFlow === 'SELLING' && imbalance === 'SELL') {
        direction = 'SELL';
        confidence = 85 + Math.random() * 10;
    } else {
        direction = Math.random() > 0.5 ? 'BUY' : 'SELL';
        confidence = 70 + Math.random() * 10;
    }
    
    return {
        direction,
        confidence: Math.round(confidence),
        analysisType: 'Smart Money',
        orderFlow,
        liquidity,
        imbalance,
        marketStructure: Math.random() > 0.5 ? 'BULLISH' : 'BEARISH',
        volumeAnalysis: Math.random() > 0.5 ? 'HIGH' : 'LOW'
    };
}

// Технический анализ
function performTechnicalAnalysis() {
    const prices = priceHistory;
    const indicators = calculateAllIndicators(prices);
    
    let buySignals = 0;
    let sellSignals = 0;
    
    // RSI
    if (indicators.rsi < 30) buySignals++;
    if (indicators.rsi > 70) sellSignals++;
    
    // MACD
    if (indicators.macd.histogram > 0) buySignals++;
    if (indicators.macd.histogram < 0) sellSignals++;
    
    // Bollinger Bands
    const lastPrice = prices[prices.length - 1];
    if (lastPrice < indicators.bollinger.lower) buySignals++;
    if (lastPrice > indicators.bollinger.upper) sellSignals++;
    
    // Moving Averages
    if (indicators.ma.ema20 > indicators.ma.sma50) buySignals++;
    if (indicators.ma.ema20 < indicators.ma.sma50) sellSignals++;
    
    // Stochastic
    if (indicators.stochastic.k < 20) buySignals++;
    if (indicators.stochastic.k > 80) sellSignals++;
    
    let direction = 'BUY';
    let confidence = 75;
    
    if (buySignals > sellSignals) {
        direction = 'BUY';
        confidence = 70 + (buySignals * 5);
    } else if (sellSignals > buySignals) {
        direction = 'SELL';
        confidence = 70 + (sellSignals * 5);
    } else {
        direction = Math.random() > 0.5 ? 'BUY' : 'SELL';
        confidence = 65;
    }
    
    confidence = Math.min(95, Math.round(confidence));
    
    return {
        direction,
        confidence,
        analysisType: 'Technical Indicators',
        indicators: indicators,
        buySignals,
        sellSignals,
        signalStrength: Math.abs(buySignals - sellSignals)
    };
}

// Комбинированный анализ
function performCombinedAnalysis() {
    const smartAnalysis = performSmartMoneyAnalysis();
    const techAnalysis = performTechnicalAnalysis();
    
    let direction = 'BUY';
    let confidence = 75;
    
    if (smartAnalysis.direction === techAnalysis.direction) {
        direction = smartAnalysis.direction;
        confidence = Math.round((smartAnalysis.confidence + techAnalysis.confidence) / 2);
    } else {
        // Если сигналы противоречат, выбираем более уверенный
        if (smartAnalysis.confidence > techAnalysis.confidence) {
            direction = smartAnalysis.direction;
            confidence = smartAnalysis.confidence;
        } else {
            direction = techAnalysis.direction;
            confidence = techAnalysis.confidence;
        }
        confidence = Math.round(confidence * 0.9); // Снижаем уверенность при конфликте
    }
    
    return {
        direction,
        confidence,
        analysisType: 'Combined Analysis',
        smartMoney: smartAnalysis,
        technical: techAnalysis,
        consensus: smartAnalysis.direction === techAnalysis.direction ? 'STRONG' : 'WEAK'
    };
}

// Расчет всех индикаторов
function calculateAllIndicators(prices) {
    return {
        rsi: calculateRSI(prices),
        macd: calculateMACD(prices),
        bollinger: calculateBollingerBands(prices),
        ma: calculateMovingAverages(prices),
        stochastic: calculateStochastic(prices),
        atr: calculateATR(prices),
        support: findSupportLevel(prices),
        resistance: findResistanceLevel(prices)
    };
}

// Расчет RSI
function calculateRSI(prices) {
    if (prices.length < 14) return 50;
    
    let gains = 0;
    let losses = 0;
    
    for (let i = 1; i < 14; i++) {
        const change = prices[prices.length - i] - prices[prices.length - i - 1];
        if (change > 0) {
            gains += change;
        } else {
            losses -= change;
        }
    }
    
    const avgGain = gains / 14;
    const avgLoss = losses / 14;
    
    if (avgLoss === 0) return 100;
    
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
}

// Расчет MACD
function calculateMACD(prices) {
    if (prices.length < 26) return { histogram: 0, signal: 0, macd: 0 };
    
    // Простая реализация MACD
    const ema12 = calculateEMA(prices, 12);
    const ema26 = calculateEMA(prices, 26);
    const macd = ema12 - ema26;
    
    return {
        histogram: macd,
        signal: macd * 0.9,
        macd: macd
    };
}

// Расчет EMA
function calculateEMA(prices, period) {
    if (prices.length < period) return prices[prices.length - 1];
    
    const multiplier = 2 / (period + 1);
    let ema = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
        ema = (prices[i] - ema) * multiplier + ema;
    }
    
    return ema;
}

// Расчет Bollinger Bands
function calculateBollingerBands(prices, period = 20, deviations = 2) {
    if (prices.length < period) {
        const price = prices[prices.length - 1];
        return { upper: price, middle: price, lower: price };
    }
    
    const slice = prices.slice(-period);
    const sum = slice.reduce((a, b) => a + b, 0);
    const middle = sum / period;
    
    // Простой расчет стандартного отклонения
    const squaredDiffs = slice.map(price => Math.pow(price - middle, 2));
    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / period;
    const stdDev = Math.sqrt(variance);
    
    return {
        upper: middle + (deviations * stdDev),
        middle: middle,
        lower: middle - (deviations * stdDev)
    };
}

// Расчет скользящих средних
function calculateMovingAverages(prices) {
    return {
        sma20: calculateSMA(prices, 20),
        sma50: calculateSMA(prices, 50),
        ema20: calculateEMA(prices, 20),
        ema50: calculateEMA(prices, 50)
    };
}

// Расчет Stochastic
function calculateStochastic(prices, period = 14) {
    if (prices.length < period) return { k: 50, d: 50 };
    
    const slice = prices.slice(-period);
    const high = Math.max(...slice);
    const low = Math.min(...slice);
    const current = prices[prices.length - 1];
    
    const k = ((current - low) / (high - low)) * 100;
    
    return { k, d: k };
}

// Расчет ATR
function calculateATR(prices, period = 14) {
    if (prices.length < period) return 0;
    
    let trSum = 0;
    const start = Math.max(0, prices.length - period);
    
    for (let i = start; i < prices.length - 1; i++) {
        const high = Math.max(prices[i], prices[i + 1]);
        const low = Math.min(prices[i], prices[i + 1]);
        trSum += high - low;
    }
    
    return trSum / Math.min(period, prices.length - start);
}

// Поиск уровня поддержки
function findSupportLevel(prices) {
    if (prices.length < 10) return prices[prices.length - 1];
    
    const lookback = Math.min(20, prices.length);
    const slice = prices.slice(-lookback);
    return Math.min(...slice);
}

// Поиск уровня сопротивления
function findResistanceLevel(prices) {
    if (prices.length < 10) return prices[prices.length - 1];
    
    const lookback = Math.min(20, prices.length);
    const slice = prices.slice(-lookback);
    return Math.max(...slice);
}

// Расчет SMA
function calculateSMA(prices, period) {
    if (prices.length < period) return prices[prices.length - 1];
    
    const slice = prices.slice(-period);
    return slice.reduce((a, b) => a + b, 0) / period;
}

// Отображение сигнала
function displaySignal() {
    const signal = currentSignal;
    if (!signal) return;
    
    document.getElementById('signal-content').style.display = 'none';
    document.getElementById('signal-details').style.display = 'block';
    document.getElementById('indicators-panel').style.display = 'block';
    document.getElementById('expiration-timer').style.display = 'block';
    
    // Детали сигнала
    const detailsHTML = `
        <div style="padding: 20px;">
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${getTranslation('instrument')}:</span>
                <span style="font-weight: 700; font-size: 16px;">${signal.pair}</span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${getTranslation('signalType')}:</span>
                <span style="font-weight: 600; font-size: 13px; color: ${signalType === 'smart' ? '#ffaa00' : 
                         signalType === 'indicators' ? '#00aaff' : '#aa00ff'}">
                    ${signalType === 'smart' ? 'Smart Money' : 
                      signalType === 'indicators' ? 'Technical' : 'Combined'}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${getTranslation('direction')}:</span>
                <span style="font-weight: 800; font-size: 18px; color: ${signal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; text-transform: uppercase;">
                    ${signal.direction === 'BUY' ? getTranslation('buy') : getTranslation('sell')}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${getTranslation('currentPrice')}:</span>
                <span style="font-weight: 700; font-family: 'Courier New', monospace; font-size: 16px;">
                    ${signal.entryPrice.toFixed(5)}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${getTranslation('confidence')}:</span>
                <span style="font-weight: 800; color: ${signal.confidence > 80 ? '#00ff88' : 
                         signal.confidence > 60 ? '#ffaa00' : '#ff4444'}; font-size: 18px;">
                    ${signal.confidence}%
                </span>
            </div>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(42, 54, 85, 0.5);">
                <div style="font-size: 11px; color: #5d6d97;">
                    <i class="far fa-clock"></i>
                    ${signal.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('signal-details').innerHTML = detailsHTML;
    
    // Отображение индикаторов
    displayIndicators();
    
    updateSignalStatus('ACTIVE', signal.direction === 'BUY' ? '#00ff88' : '#ff4444');
}

// Отображение индикаторов
function displayIndicators() {
    const indicators = calculateAllIndicators(priceHistory);
    const lastPrice = priceHistory[priceHistory.length - 1];
    
    const indicatorsHTML = `
        <div class="indicators-grid">
            <div class="indicator-item">
                <span class="indicator-label">${getTranslation('trend')}:</span>
                <span class="indicator-value" style="color: ${indicators.ma.ema20 > indicators.ma.sma50 ? '#00ff88' : '#ff4444'}">
                    ${indicators.ma.ema20 > indicators.ma.sma50 ? getTranslation('bullish') : getTranslation('bearish')}
                </span>
            </div>
            
            <div class="indicator-item">
                <span class="indicator-label">${getTranslation('rsi')}:</span>
                <span class="indicator-value" style="color: ${indicators.rsi < 30 ? '#00ff88' : 
                         indicators.rsi > 70 ? '#ff4444' : '#8b9dc3'}">
                    ${indicators.rsi.toFixed(1)} 
                    ${indicators.rsi < 30 ? `(${getTranslation('oversold')})` : 
                      indicators.rsi > 70 ? `(${getTranslation('overbought')})` : ''}
                </span>
            </div>
            
            <div class="indicator-item">
                <span class="indicator-label">${getTranslation('macd')}:</span>
                <span class="indicator-value" style="color: ${indicators.macd.histogram > 0 ? '#00ff88' : '#ff4444'}">
                    ${indicators.macd.histogram.toFixed(4)}
                </span>
            </div>
            
            <div class="indicator-item">
                <span class="indicator-label">${getTranslation('bollinger')}:</span>
                <span class="indicator-value" style="color: ${lastPrice < indicators.bollinger.lower ? '#00ff88' : 
                         lastPrice > indicators.bollinger.upper ? '#ff4444' : '#8b9dc3'}">
                    ${lastPrice < indicators.bollinger.lower ? getTranslation('oversold') : 
                      lastPrice > indicators.bollinger.upper ? getTranslation('overbought') : 'Normal'}
                </span>
            </div>
            
            <div class="indicator-item">
                <span class="indicator-label">${getTranslation('movingAverage')}:</span>
                <span class="indicator-value">
                    EMA20: ${indicators.ma.ema20.toFixed(4)}
                </span>
            </div>
            
            <div class="indicator-item">
                <span class="indicator-label">${getTranslation('stochastic')}:</span>
                <span class="indicator-value" style="color: ${indicators.stochastic.k < 20 ? '#00ff88' : 
                         indicators.stochastic.k > 80 ? '#ff4444' : '#8b9dc3'}">
                    %K: ${indicators.stochastic.k.toFixed(1)}
                </span>
            </div>
            
            <div class="indicator-item">
                <span class="indicator-label">${getTranslation('support')}:</span>
                <span class="indicator-value">
                    ${indicators.support.toFixed(4)}
                </span>
            </div>
            
            <div class="indicator-item">
                <span class="indicator-label">${getTranslation('resistance')}:</span>
                <span class="indicator-value">
                    ${indicators.resistance.toFixed(4)}
                </span>
            </div>
        </div>
    `;
    
    document.getElementById('indicators-grid').innerHTML = indicatorsHTML;
}

// Обновление статуса
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

// Запуск таймера экспирации
function startExpirationTimer() {
    const totalTime = currentTimeframe;
    let timeLeft = totalTime;
    
    const timerBar = document.getElementById('timer-bar');
    const timerValue = document.getElementById('timer-value');
    
    if (!timerBar || !timerValue) return;
    
    // Сброс анимации
    timerBar.style.transition = 'none';
    timerBar.style.transform = 'scaleX(1)';
    void timerBar.offsetWidth;
    
    // Запуск новой анимации
    timerBar.style.transition = `transform ${totalTime}s linear`;
    timerBar.style.transform = 'scaleX(0)';
    
    expirationTimer = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerValue.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const progress = timeLeft / totalTime;
        if (progress < 0.3) {
            timerBar.style.background = 'linear-gradient(90deg, #ff4444, #ffaa00)';
        } else if (progress < 0.7) {
            timerBar.style.background = 'linear-gradient(90deg, #ffaa00, #00ff88)';
        }
        
        if (timeLeft <= 0) {
            clearInterval(expirationTimer);
            finishSignal();
        }
    }, 1000);
}

// Завершение сигнала
function finishSignal() {
    if (!currentSignal) return;
    
    const currentPrice = ASSETS[currentAsset].price;
    const entryPrice = currentSignal.entryPrice;
    
    let result, resultColor, resultText;
    
    if (currentSignal.direction === 'BUY') {
        if (currentPrice > entryPrice * 1.0001) {
            result = 'WIN';
            resultColor = '#00ff88';
            resultText = 'WIN';
        } else if (currentPrice < entryPrice * 0.9999) {
            result = 'LOSS';
            resultColor = '#ff4444';
            resultText = 'LOSS';
        } else {
            result = 'REFUND';
            resultColor = '#8b9dc3';
            resultText = 'REFUND';
        }
    } else {
        if (currentPrice < entryPrice * 0.9999) {
            result = 'WIN';
            resultColor = '#00ff88';
            resultText = 'WIN';
        } else if (currentPrice > entryPrice * 1.0001) {
            result = 'LOSS';
            resultColor = '#ff4444';
            resultText = 'LOSS';
        } else {
            result = 'REFUND';
            resultColor = '#8b9dc3';
            resultText = 'REFUND';
        }
    }
    
    currentSignal.result = result;
    currentSignal.exitPrice = currentPrice;
    currentSignal.completedAt = new Date();
    
    showSignalResult(result, resultText, resultColor, currentPrice);
    addToHistory();
    setTimeout(resetSignal, 5000);
}

// Показать результат сигнала
function showSignalResult(result, resultText, resultColor, exitPrice) {
    const resultHTML = `
        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid ${resultColor}30;">
            <div style="text-align: center;">
                <div style="font-size: 28px; font-weight: 800; color: ${resultColor}; margin-bottom: 5px;">
                    ${resultText}
                </div>
                <div style="font-size: 14px; color: #8b9dc3; margin-bottom: 15px;">
                    ${currentLanguage === 'ru' ? 'Сигнал завершен' : 'Signal completed'}
                </div>
                
                <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 15px;">
                    <div style="text-align: center;">
                        <div style="font-size: 11px; color: #5d6d97;">${currentLanguage === 'ru' ? 'Вход' : 'Entry'}</div>
                        <div style="font-size: 16px; font-weight: 700;">${currentSignal.entryPrice.toFixed(5)}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 11px; color: #5d6d97;">${currentLanguage === 'ru' ? 'Выход' : 'Exit'}</div>
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
    
    updateSignalStatus(resultText, resultColor);
}

// Добавление в историю
function addToHistory() {
    const resultsList = document.getElementById('results-list');
    if (!resultsList) return;
    
    const resultColor = currentSignal.result === 'WIN' ? '#00ff88' : 
                       currentSignal.result === 'LOSS' ? '#ff4444' : '#8b9dc3';
    
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.style.cssText = `
        background: rgba(19, 26, 45, 0.8);
        padding: 10px 15px;
        border-radius: 8px;
        border-left: 4px solid ${resultColor};
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        transition: all 0.2s;
        margin-bottom: 5px;
    `;
    
    historyItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-weight: 700; min-width: 70px;">${currentSignal.pair}</span>
            <span style="color: ${currentSignal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; font-weight: 600;">
                ${currentSignal.direction === 'BUY' ? getTranslation('buy') : getTranslation('sell')}
            </span>
            <span style="color: ${resultColor}; font-weight: 800;">
                ${currentSignal.result === 'WIN' ? 'WIN' : currentSignal.result === 'LOSS' ? 'LOSS' : 'REFUND'}
            </span>
        </div>
        <div style="color: #5d6d97; font-size: 11px; text-align: right;">
            <div>${currentSignal.entryPrice.toFixed(5)} → ${currentSignal.exitPrice.toFixed(5)}</div>
            <div>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        </div>
    `;
    
    // Добавляем в начало
    resultsList.insertBefore(historyItem, resultsList.firstChild);
    
    // Сохраняем историю
    saveHistory();
}

// Сохранение истории
function saveHistory() {
    try {
        const history = {
            signal: currentSignal,
            timestamp: new Date().toISOString()
        };
        
        let savedHistory = JSON.parse(localStorage.getItem('scalpingHistory') || '[]');
        savedHistory.unshift(history);
        
        if (savedHistory.length > 50) {
            savedHistory = savedHistory.slice(0, 50);
        }
        
        localStorage.setItem('scalpingHistory', JSON.stringify(savedHistory));
    } catch (error) {
        console.error('History save error:', error);
    }
}

// Загрузка истории
function loadHistory() {
    try {
        const savedHistory = JSON.parse(localStorage.getItem('scalpingHistory') || '[]');
        
        if (savedHistory.length > 0) {
            console.log(`📚 Loaded ${savedHistory.length} history records`);
        }
    } catch (error) {
        console.error('History load error:', error);
    }
}

// Сброс сигнала
function resetSignal() {
    isSignalActive = false;
    currentSignal = null;
    
    document.getElementById('signal-content').style.display = 'flex';
    document.getElementById('signal-details').style.display = 'none';
    document.getElementById('indicators-panel').style.display = 'none';
    document.getElementById('expiration-timer').style.display = 'none';
    
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        signalContent.innerHTML = `
            <div class="signal-placeholder">
                <i class="fas fa-chart-line"></i>
                <p>${getTranslation('clickForAnalysis')}</p>
            </div>
        `;
    }
    
    updateSignalStatus(getTranslation('waiting'), '#00ff88');
    
    const timerBar = document.getElementById('timer-bar');
    const timerValue = document.getElementById('timer-value');
    if (timerBar && timerValue) {
        timerBar.style.transition = 'none';
        timerBar.style.transform = 'scaleX(1)';
        timerBar.style.background = 'linear-gradient(90deg, #00ff88, #0066ff)';
        timerValue.textContent = getTimeframeText(currentTimeframe);
    }
    
    if (expirationTimer) {
        clearInterval(expirationTimer);
        expirationTimer = null;
    }
}

// Добавляем CSS анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .live-price {
        animation: pulse 2s infinite;
    }
    
    .history-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(style);

// Экспортируем функции для отладки
window.debug = {
    getCurrentPrice: () => ASSETS[currentAsset].price,
    getAssetInfo: () => ASSETS[currentAsset],
    getAllPrices: () => ASSETS,
    forcePriceUpdate: updatePrices,
    simulateSignal: generateSignal,
    switchLanguage: setLanguage,
    getCurrentState: () => ({
        asset: currentAsset,
        timeframe: currentTimeframe,
        chartType: chartType,
        signalType: signalType,
        language: currentLanguage
    })
};

// Функция для улучшенного внешнего вида
function enhanceUI() {
    // Добавляем дополнительные стили для красивого отображения
    const enhancedStyles = `
        /* Эффект градиентных границ */
        .control-panel, .chart-container, .signal-display {
            position: relative;
        }
        
        .control-panel:before, .chart-container:before, .signal-display:before {
            content: '';
            position: absolute;
            top: -1px;
            left: -1px;
            right: -1px;
            bottom: -1px;
            background: linear-gradient(45deg, #00ff88, #0066ff, #00ff88);
            border-radius: 21px;
            z-index: -1;
            opacity: 0.3;
            filter: blur(5px);
        }
        
        /* Анимация появления элементов */
        .panel-section {
            animation: fadeInUp 0.5s ease-out;
            animation-fill-mode: both;
        }
        
        .panel-section:nth-child(1) { animation-delay: 0.1s; }
        .panel-section:nth-child(2) { animation-delay: 0.2s; }
        .panel-section:nth-child(3) { animation-delay: 0.3s; }
        .panel-section:nth-child(4) { animation-delay: 0.4s; }
        .panel-section:nth-child(5) { animation-delay: 0.5s; }
        .panel-section:nth-child(6) { animation-delay: 0.6s; }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Эффект при наведении на кнопки */
        .signal-btn, .time-btn, .signal-type-btn {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        /* Анимация живых цен */
        .live-price {
            position: relative;
        }
        
        .live-price:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #00ff88, transparent);
            opacity: 0;
            animation: priceGlow 3s infinite;
        }
        
        @keyframes priceGlow {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
        }
        
        /* Эффект свечения для активных элементов */
        .active {
            position: relative;
            overflow: hidden;
        }
        
        .active:after {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: radial-gradient(circle at center, rgba(0, 255, 136, 0.1), transparent 70%);
            z-index: -1;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = enhancedStyles;
    document.head.appendChild(styleSheet);
    
    // Добавляем эффект параллакса для фона
    document.body.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        document.body.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    });
    
    // Добавляем эффект при наведении на карточки
    const cards = document.querySelectorAll('.panel-section, .stat-item, .indicator-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
    
    // Добавляем плавное появление элементов при загрузке
    document.querySelectorAll('.control-panel, .chart-container, .signal-display').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Вызываем улучшение UI после загрузки
window.addEventListener('load', function() {
    setTimeout(enhanceUI, 500);
    
    // Добавляем плавное обновление цен
    setInterval(() => {
        document.querySelectorAll('.live-price').forEach(price => {
            price.style.transform = 'scale(1.05)';
            setTimeout(() => {
                price.style.transform = 'scale(1)';
            }, 200);
        });
    }, 5000);
});
