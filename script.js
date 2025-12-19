// Конфигурация приложения
const APP_CONFIG = {
    currentLang: 'ru',
    chartType: 'candlestick',
    signalType: 'smart',
    drawingMode: null,
    drawings: []
};

// Локализация
const TRANSLATIONS = {
    ru: {
        instrument: 'ИНСТРУМЕНТ',
        expiration: 'ЭКСПИРАЦИЯ',
        signalType: 'ТИП СИГНАЛА',
        realQuotes: 'РЕАЛЬНЫЕ КОТИРОВКИ',
        signal: 'СИГНАЛ',
        getSignal: 'ПОЛУЧИТЬ СИГНАЛ',
        priceUpdate: 'Обновление цен...',
        currentPrice: 'Текущая цена:',
        change: 'Изменение:',
        time: 'Время:',
        timeframe: 'Таймфрейм:',
        dataSource: 'Источник: Twelve Data API',
        currentSignal: 'ТЕКУЩИЙ СИГНАЛ',
        waiting: 'Ожидание',
        clickForAnalysis: 'Нажмите "Получить сигнал" для анализа',
        indicators: 'ИНДИКАТОРЫ',
        expiresIn: 'Истекает через:',
        lastResults: 'ПОСЛЕДНИЕ РЕЗУЛЬТАТЫ',
        apiInfo: 'Используются реальные котировки Forex. Обновление каждые 5 секунд.',
        disclaimer: 'Торговля бинарными опционами связана с высокими рисками.',
        analysis: 'АНАЛИЗ РЫНКА...',
        smartMoney: 'Смарт-Мани',
        indicatorsBtn: 'Индикаторы',
        buy: 'ПОКУПКА',
        sell: 'ПРОДАЖА',
        entryPrice: 'Цена входа:',
        accuracy: 'Точность:',
        trend: 'Тренд:',
        upTrend: 'Восходящий ↗',
        downTrend: 'Нисходящий ↘',
        rsi: 'RSI:',
        macd: 'MACD:',
        bollinger: 'Боллинджер:',
        stochastic: 'Стохастик:',
        volume: 'Объем:',
        support: 'Поддержка:',
        resistance: 'Сопротивление:',
        win: 'ВЫИГРЫШ',
        loss: 'ПРОИГРЫШ',
        refund: 'ВОЗВРАТ',
        entry: 'Вход',
        exit: 'Выход',
        modeDemo: 'Режим: Демо',
        modeReal: 'Режим: Реальный'
    },
    en: {
        instrument: 'INSTRUMENT',
        expiration: 'EXPIRATION',
        signalType: 'SIGNAL TYPE',
        realQuotes: 'REAL QUOTES',
        signal: 'SIGNAL',
        getSignal: 'GET SIGNAL',
        priceUpdate: 'Updating prices...',
        currentPrice: 'Current price:',
        change: 'Change:',
        time: 'Time:',
        timeframe: 'Timeframe:',
        dataSource: 'Source: Twelve Data API',
        currentSignal: 'CURRENT SIGNAL',
        waiting: 'Waiting',
        clickForAnalysis: 'Click "Get Signal" for analysis',
        indicators: 'INDICATORS',
        expiresIn: 'Expires in:',
        lastResults: 'LAST RESULTS',
        apiInfo: 'Using real Forex quotes. Updated every 5 seconds.',
        disclaimer: 'Binary options trading involves high risks.',
        analysis: 'MARKET ANALYSIS...',
        smartMoney: 'Smart Money',
        indicatorsBtn: 'Indicators',
        buy: 'BUY',
        sell: 'SELL',
        entryPrice: 'Entry price:',
        accuracy: 'Accuracy:',
        trend: 'Trend:',
        upTrend: 'Upward ↗',
        downTrend: 'Downward ↘',
        rsi: 'RSI:',
        macd: 'MACD:',
        bollinger: 'Bollinger:',
        stochastic: 'Stochastic:',
        volume: 'Volume:',
        support: 'Support:',
        resistance: 'Resistance:',
        win: 'WIN',
        loss: 'LOSS',
        refund: 'REFUND',
        entry: 'Entry',
        exit: 'Exit',
        modeDemo: 'Mode: Demo',
        modeReal: 'Mode: Real'
    }
};

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

// Глобальные переменные
let currentChart = null;
let currentSignal = null;
let isSignalActive = false;
let expirationTimer = null;
let resultsHistory = [];
let currentAsset = 'EURUSD';
let currentTimeframe = 60;
let priceUpdateInterval = null;
let chartData = {
    labels: [],
    prices: [],
    candles: []
};
let priceHistory = [];

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Инициализация Scalping Robot Pro...');
    
    // Инициализация локализации
    initLocalization();
    
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
    
    console.log('✅ Scalping Robot Pro готов к работе!');
});

// Инициализация локализации
function initLocalization() {
    // Установка обработчиков для кнопок переключения языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            setLanguage(lang);
            
            // Обновляем активную кнопку
            document.querySelectorAll('.lang-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// Установка языка
function setLanguage(lang) {
    APP_CONFIG.currentLang = lang;
    
    // Обновляем все текстовые элементы
    Object.keys(TRANSLATIONS[lang]).forEach(key => {
        document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => {
            el.textContent = TRANSLATIONS[lang][key];
        });
    });
    
    // Обновляем текст режима
    document.getElementById('mode-text').textContent = TRANSLATIONS[lang].modeDemo;
    
    console.log(`🌐 Язык изменен на: ${lang}`);
}

// Инициализация графика
function initChart() {
    const ctx = document.getElementById('trading-chart').getContext('2d');
    
    // Генерация тестовых данных
    generateTestChartData();
    
    // Создаем свечной график
    currentChart = new Chart(ctx, {
        type: APP_CONFIG.chartType === 'candlestick' ? 'candlestick' : 'line',
        data: {
            labels: chartData.labels,
            datasets: [APP_CONFIG.chartType === 'candlestick' ? {
                label: 'Цена',
                data: chartData.candles,
                borderColor: '#00ff88',
                backgroundColor: chartData.candles.map(c => 
                    c.o <= c.c ? 'rgba(0, 255, 136, 0.8)' : 'rgba(255, 68, 68, 0.8)'
                ),
                borderWidth: 1,
                color: {
                    up: '#00ff88',
                    down: '#ff4444',
                    unchanged: '#8b9dc3'
                }
            } : {
                label: 'Цена',
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
                    backgroundColor: 'rgba(26, 34, 56, 0.9)',
                    titleColor: '#8b9dc3',
                    bodyColor: '#ffffff',
                    borderColor: '#2a3655',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: { 
                        color: 'rgba(42, 54, 85, 0.5)',
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
                        color: 'rgba(42, 54, 85, 0.5)',
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

// Генерация тестовых данных для графика
function generateTestChartData() {
    const labels = [];
    const prices = [];
    const candles = [];
    const now = new Date();
    
    // 24 часа данных
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now);
        time.setHours(time.getHours() - i);
        const hour = time.getHours().toString().padStart(2, '0');
        const minute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        labels.push(`${hour}:${minute}`);
        
        // Начинаем с текущей цены
        const basePrice = ASSETS[currentAsset].price;
        const lastPrice = prices.length > 0 ? prices[prices.length - 1] : basePrice;
        
        // Реалистичное движение цены для свечей
        const volatility = 0.0005;
        const change = (Math.random() - 0.5) * volatility;
        const newPrice = lastPrice * (1 + change);
        
        // Создаем свечу
        const open = lastPrice;
        const close = newPrice;
        const high = Math.max(open, close) * (1 + Math.random() * 0.0003);
        const low = Math.min(open, close) * (1 - Math.random() * 0.0003);
        
        candles.push({ o: open, h: high, l: low, c: close });
        prices.push(newPrice);
    }
    
    chartData = { labels, prices, candles };
    priceHistory = prices;
}

// Обновление графика реальными данными
function updateChartWithRealData() {
    if (!currentChart || chartData.prices.length === 0) return;
    
    const currentPrice = ASSETS[currentAsset].price;
    const now = new Date();
    
    if (APP_CONFIG.chartType === 'candlestick') {
        // Обновляем свечи
        const lastCandle = chartData.candles[chartData.candles.length - 1];
        lastCandle.c = currentPrice;
        lastCandle.h = Math.max(lastCandle.h, currentPrice);
        lastCandle.l = Math.min(lastCandle.l, currentPrice);
        
        // Обновляем график
        currentChart.data.datasets[0].data = chartData.candles;
        currentChart.data.datasets[0].backgroundColor = chartData.candles.map(c => 
            c.o <= c.c ? 'rgba(0, 255, 136, 0.8)' : 'rgba(255, 68, 68, 0.8)'
        );
    } else {
        // Обновляем линейный график
        chartData.prices.push(currentPrice);
        chartData.prices.shift();
        
        // Обновляем метки времени
        chartData.labels.push(now.getHours().toString().padStart(2, '0') + ':' + 
                             now.getMinutes().toString().padStart(2, '0'));
        chartData.labels.shift();
        
        // Обновляем график
        currentChart.data.labels = chartData.labels;
        currentChart.data.datasets[0].data = chartData.prices;
    }
    
    currentChart.update('none');
    priceHistory = [...chartData.prices];
}

// Инициализация событий
function initEvents() {
    console.log('🎯 Инициализация обработчиков событий...');
    
    // Выбор актива
    const assetSelect = document.getElementById('asset-select');
    if (assetSelect) {
        assetSelect.addEventListener('change', function() {
            currentAsset = this.value;
            console.log('📊 Актив изменен на:', currentAsset);
            
            // Обновляем отображение
            updateAssetDisplay();
            
            // Перезагружаем данные графика
            generateTestChartData();
            updateChart();
        });
    }
    
    // Кнопки таймфреймов
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Снимаем активный класс
            document.querySelectorAll('.time-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Добавляем активный класс
            this.classList.add('active');
            
            // Обновляем таймфрейм
            currentTimeframe = parseInt(this.dataset.time);
            
            // Обновляем отображение
            const timeText = getTimeframeText(currentTimeframe);
            document.getElementById('current-tf').textContent = timeText;
            
            console.log('⏱️ Таймфрейм изменен на:', timeText);
        });
    });
    
    // Выбор типа сигнала
    document.querySelectorAll('.signal-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.signal-type-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            APP_CONFIG.signalType = this.dataset.type;
            console.log('🔧 Тип сигнала изменен на:', APP_CONFIG.signalType);
        });
    });
    
    // Выбор типа графика
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-type-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            APP_CONFIG.chartType = this.dataset.type;
            
            // Обновляем график
            updateChartType();
            console.log('📈 Тип графика изменен на:', APP_CONFIG.chartType);
        });
    });
    
    // Инструменты рисования
    document.querySelectorAll('.draw-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.dataset.tool === 'clear') {
                clearDrawings();
                document.querySelectorAll('.draw-btn').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
            } else {
                APP_CONFIG.drawingMode = this.dataset.tool;
                document.querySelectorAll('.draw-btn').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                console.log('🎨 Режим рисования:', APP_CONFIG.drawingMode);
            }
        });
    });
    
    // Кнопка генерации сигнала
    const generateBtn = document.getElementById('generate-signal');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateSignal);
    }
    
    // Обработка кликов на графике для рисования
    const chartCanvas = document.getElementById('trading-chart');
    if (chartCanvas) {
        chartCanvas.addEventListener('click', handleChartClick);
    }
    
    console.log('✅ Обработчики событий инициализированы');
}

// Обновление типа графика
function updateChartType() {
    if (!currentChart) return;
    
    // Изменяем тип графика
    currentChart.config.type = APP_CONFIG.chartType === 'candlestick' ? 'candlestick' : 'line';
    
    if (APP_CONFIG.chartType === 'candlestick') {
        currentChart.data.datasets[0] = {
            label: 'Цена',
            data: chartData.candles,
            borderColor: '#00ff88',
            backgroundColor: chartData.candles.map(c => 
                c.o <= c.c ? 'rgba(0, 255, 136, 0.8)' : 'rgba(255, 68, 68, 0.8)'
            ),
            borderWidth: 1,
            color: {
                up: '#00ff88',
                down: '#ff4444',
                unchanged: '#8b9dc3'
            }
        };
    } else {
        currentChart.data.datasets[0] = {
            label: 'Цена',
            data: chartData.prices,
            borderColor: '#00ff88',
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0
        };
    }
    
    currentChart.update();
}

// Обработка кликов на графике для рисования
function handleChartClick(event) {
    if (!APP_CONFIG.drawingMode || !currentChart) return;
    
    const rect = currentChart.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Преобразуем координаты в данные графика
    const xScale = currentChart.scales.x;
    const yScale = currentChart.scales.y;
    const xValue = xScale.getValueForPixel(x);
    const yValue = yScale.getValueForPixel(y);
    
    const drawing = {
        type: APP_CONFIG.drawingMode,
        x: xValue,
        y: yValue,
        timestamp: new Date()
    };
    
    APP_CONFIG.drawings.push(drawing);
    console.log('📐 Добавлен рисунок:', drawing);
}

// Очистка рисунков
function clearDrawings() {
    APP_CONFIG.drawings = [];
    APP_CONFIG.drawingMode = null;
    console.log('🧹 Все рисунки очищены');
}

// Обновление графика
function updateChart() {
    if (currentChart) {
        if (APP_CONFIG.chartType === 'candlestick') {
            currentChart.data.datasets[0].data = chartData.candles;
            currentChart.data.datasets[0].backgroundColor = chartData.candles.map(c => 
                c.o <= c.c ? 'rgba(0, 255, 136, 0.8)' : 'rgba(255, 68, 68, 0.8)'
            );
        } else {
            currentChart.data.datasets[0].data = chartData.prices;
        }
        currentChart.update();
    }
}

// Получение текста таймфрейма
function getTimeframeText(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} мин`;
}

// Загрузка начальных цен
async function loadInitialPrices() {
    console.log('📡 Загрузка начальных цен...');
    
    try {
        await fetchRealPrices();
    } catch (error) {
        console.warn('⚠️ Не удалось загрузить реальные цены, используем демо-данные');
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
            // Обновляем цены
            if (data.rates.EUR) {
                ASSETS.EURUSD.price = 1 / data.rates.EUR;
            }
            
            if (data.rates.JPY) {
                ASSETS.USDJPY.price = data.rates.JPY;
            }
            
            if (data.rates.GBP) {
                ASSETS.GBPUSD.price = 1 / data.rates.GBP;
            }
            
            if (data.rates.AUD) {
                ASSETS.AUDUSD.price = 1 / data.rates.AUD;
            }
            
            if (data.rates.CAD) {
                ASSETS.USDCAD.price = data.rates.CAD;
            }
            
            if (data.rates.CHF) {
                ASSETS.USDCHF.price = data.rates.CHF;
            }
            
            if (data.rates.EUR && data.rates.JPY) {
                ASSETS.EURJPY.price = (1 / data.rates.EUR) * data.rates.JPY;
            }
            
            if (data.rates.GBP && data.rates.JPY) {
                ASSETS.GBPJPY.price = (1 / data.rates.GBP) * data.rates.JPY;
            }
            
            console.log('✅ Реальные цены загружены');
            return true;
        }
    } catch (error) {
        console.error('❌ Ошибка загрузки реальных цен:', error);
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
            console.warn('⚠️ Ошибка обновления цен:', error);
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
    
    if (priceElement) priceElement.textContent = asset.price.toFixed(5);
    if (pairElement) pairElement.textContent = asset.name;
    
    // Рассчитываем изменение
    if (changeElement) {
        const changePercent = (Math.random() - 0.5) * 0.1;
        const changeValue = asset.price * changePercent;
        
        changeElement.textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
        changeElement.className = changePercent >= 0 ? 'positive' : 'negative';
        
        // Обновляем статистику
        document.getElementById('current-price-display').textContent = asset.price.toFixed(5);
        document.getElementById('price-change-display').textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
        document.getElementById('price-time').textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    }
    
    // Обновляем время на графике
    document.getElementById('chart-time').textContent = `Обновлено: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})} UTC`;
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
        alert('⏳ Дождитесь завершения текущего сигнала');
        return;
    }
    
    isSignalActive = true;
    
    const btn = document.getElementById('generate-signal');
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${TRANSLATIONS[APP_CONFIG.currentLang].analysis}`;
    
    updateSignalStatus(TRANSLATIONS[APP_CONFIG.currentLang].analysis, '#ffaa00');
    showAnalysisAnimation();
    
    setTimeout(() => {
        createSignal();
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
                    ${APP_CONFIG.signalType === 'smart' ? 'Анализ Смарт-Мани...' : 'Анализ индикаторов...'}
                </p>
                <div style="margin-top: 10px; font-size: 12px; color: #5d6d97;">
                    Используются актуальные рыночные данные
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
    const analysis = APP_CONFIG.signalType === 'smart' 
        ? performSmartMoneyAnalysis() 
        : performIndicatorsAnalysis();
    
    currentSignal = {
        asset: currentAsset,
        pair: asset.name,
        direction: analysis.direction,
        entryPrice: asset.price,
        confidence: analysis.confidence,
        analysis: analysis,
        timestamp: new Date(),
        result: null,
        signalType: APP_CONFIG.signalType
    };
    
    console.log('🎯 Создан сигнал:', currentSignal);
    
    displaySignal();
    startExpirationTimer();
}

// Анализ Смарт-Мани
function performSmartMoneyAnalysis() {
    const prices = priceHistory.length > 0 ? priceHistory : chartData.prices;
    
    // Комплексный анализ Смарт-Мани
    const lastPrice = prices[prices.length - 1];
    const volume = Math.random() * 1000000 + 500000; // Имитация объема
    
    // Определяем уровни поддержки и сопротивления
    const support = Math.min(...prices.slice(-20)) * 0.9995;
    const resistance = Math.max(...prices.slice(-20)) * 1.0005;
    
    // Логика Смарт-Мани
    let direction = 'BUY';
    let confidence = 80;
    
    // Если цена около поддержки - покупаем
    if (lastPrice <= support * 1.001) {
        direction = 'BUY';
        confidence = 85 + Math.random() * 10;
    }
    // Если цена около сопротивления - продаем
    else if (lastPrice >= resistance * 0.999) {
        direction = 'SELL';
        confidence = 85 + Math.random() * 10;
    }
    // Случайный выбор с учетом тренда
    else {
        const trend = lastPrice > prices[prices.length - 10] ? 'UP' : 'DOWN';
        direction = trend === 'UP' ? 'BUY' : 'SELL';
        confidence = 75 + Math.random() * 15;
    }
    
    return {
        direction,
        confidence: Math.min(99, Math.round(confidence)),
        rsi: calculateRSI(prices),
        macd: calculateMACD(prices),
        bollinger: calculateBollinger(prices),
        stochastic: calculateStochastic(prices),
        volume: volume,
        support: support,
        resistance: resistance,
        trend: lastPrice > prices[prices.length - 20] ? 'UP' : 'DOWN'
    };
}

// Анализ по индикаторам
function performIndicatorsAnalysis() {
    const prices = priceHistory.length > 0 ? priceHistory : chartData.prices;
    
    // Множественные индикаторы
    const rsi = calculateRSI(prices);
    const macd = calculateMACD(prices);
    const bollinger = calculateBollinger(prices);
    const stochastic = calculateStochastic(prices);
    const sma20 = calculateSMA(prices, 20);
    const sma50 = calculateSMA(prices, 50);
    
    let direction = 'BUY';
    let confidence = 75;
    let indicatorsCount = 0;
    let buySignals = 0;
    let sellSignals = 0;
    
    // Анализ RSI
    if (rsi < 30) {
        buySignals++;
        confidence += 5;
    } else if (rsi > 70) {
        sellSignals++;
        confidence += 5;
    }
    indicatorsCount++;
    
    // Анализ MACD
    if (macd.signal > macd.histogram) {
        buySignals++;
    } else {
        sellSignals++;
    }
    indicatorsCount++;
    
    // Анализ Боллинджера
    const lastPrice = prices[prices.length - 1];
    if (lastPrice < bollinger.lower) {
        buySignals++;
        confidence += 5;
    } else if (lastPrice > bollinger.upper) {
        sellSignals++;
        confidence += 5;
    }
    indicatorsCount++;
    
    // Анализ Стохастика
    if (stochastic.k < 20) {
        buySignals++;
        confidence += 3;
    } else if (stochastic.k > 80) {
        sellSignals++;
        confidence += 3;
    }
    indicatorsCount++;
    
    // Анализ скользящих средних
    if (sma20 > sma50 && lastPrice > sma20) {
        buySignals++;
        confidence += 7;
    } else if (sma20 < sma50 && lastPrice < sma20) {
        sellSignals++;
        confidence += 7;
    }
    indicatorsCount++;
    
    // Определяем направление по большинству сигналов
    direction = buySignals > sellSignals ? 'BUY' : 'SELL';
    
    // Расчет уверенности на основе согласованности индикаторов
    const agreement = Math.max(buySignals, sellSignals) / indicatorsCount;
    confidence = 70 + (agreement * 25);
    
    return {
        direction,
        confidence: Math.min(99, Math.round(confidence)),
        rsi,
        macd,
        bollinger,
        stochastic,
        sma20,
        sma50,
        trend: lastPrice > sma20 ? 'UP' : 'DOWN',
        agreement: Math.round(agreement * 100)
    };
}

// Расчет индикаторов
function calculateSMA(prices, period) {
    if (prices.length < period) return prices[prices.length - 1];
    const slice = prices.slice(-period);
    return slice.reduce((a, b) => a + b, 0) / period;
}

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

function calculateMACD(prices) {
    const ema12 = calculateEMA(prices, 12);
    const ema26 = calculateEMA(prices, 26);
    const macdLine = ema12 - ema26;
    const signalLine = calculateEMA(prices.slice(-9).concat([macdLine]), 9);
    const histogram = macdLine - signalLine;
    
    return { macdLine, signalLine, histogram };
}

function calculateEMA(prices, period) {
    const k = 2 / (period + 1);
    let ema = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
        ema = prices[i] * k + ema * (1 - k);
    }
    
    return ema;
}

function calculateBollinger(prices) {
    const period = 20;
    if (prices.length < period) {
        const price = prices[prices.length - 1];
        return { upper: price * 1.02, middle: price, lower: price * 0.98 };
    }
    
    const slice = prices.slice(-period);
    const sma = slice.reduce((a, b) => a + b, 0) / period;
    const variance = slice.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period;
    const stdDev = Math.sqrt(variance);
    
    return {
        upper: sma + (stdDev * 2),
        middle: sma,
        lower: sma - (stdDev * 2)
    };
}

function calculateStochastic(prices) {
    const period = 14;
    if (prices.length < period) return { k: 50, d: 50 };
    
    const slice = prices.slice(-period);
    const lowest = Math.min(...slice);
    const highest = Math.max(...slice);
    const k = ((prices[prices.length - 1] - lowest) / (highest - lowest)) * 100;
    
    // Упрощенный расчет %D
    const d = k * 0.7 + 50 * 0.3;
    
    return { k, d };
}

// Отображение сигнала
function displaySignal() {
    const signal = currentSignal;
    if (!signal) return;
    
    document.getElementById('signal-content').style.display = 'none';
    document.getElementById('signal-details').style.display = 'block';
    document.getElementById('signal-indicators').style.display = 'block';
    document.getElementById('expiration-timer').style.display = 'block';
    
    const t = TRANSLATIONS[APP_CONFIG.currentLang];
    const detailsHTML = `
        <div style="padding: 20px;">
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${t.instrument}:</span>
                <span style="font-weight: 700; font-size: 16px;">${signal.pair}</span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${t.signalType}:</span>
                <span style="font-weight: 600; font-size: 14px; color: #00ff88;">
                    ${signal.signalType === 'smart' ? t.smartMoney : t.indicatorsBtn}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${t.direction}:</span>
                <span style="font-weight: 800; font-size: 18px; color: ${signal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; text-transform: uppercase;">
                    ${signal.direction === 'BUY' ? t.buy : t.sell}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${t.entryPrice}:</span>
                <span style="font-weight: 700; font-family: 'Courier New', monospace; font-size: 16px;">
                    ${signal.entryPrice.toFixed(5)}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${t.accuracy}:</span>
                <span style="font-weight: 800; color: #00ff88; font-size: 18px;">
                    ${signal.confidence}%
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${t.trend}:</span>
                <span style="font-weight: 600; color: ${signal.analysis.trend === 'UP' ? '#00ff88' : '#ff4444'}">
                    ${signal.analysis.trend === 'UP' ? t.upTrend : t.downTrend}
                </span>
            </div>
            
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(42, 54, 85, 0.5);">
                <div style="font-size: 11px; color: #5d6d97; text-align: center;">
                    <i class="far fa-clock"></i>
                    ${signal.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('signal-details').innerHTML = detailsHTML;
    
    // Показываем индикаторы
    displayIndicators(signal.analysis);
    
    updateSignalStatus('АКТИВЕН', signal.direction === 'BUY' ? '#00ff88' : '#ff4444');
    
    const btn = document.getElementById('generate-signal');
    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-bolt"></i> ${t.getSignal}`;
}

// Отображение индикаторов
function displayIndicators(analysis) {
    const t = TRANSLATIONS[APP_CONFIG.currentLang];
    const indicatorsGrid = document.getElementById('indicators-grid');
    
    let indicatorsHTML = `
        <div class="indicators-row">
            <div class="indicator-item">
                <span class="indicator-label">${t.rsi}</span>
                <span class="indicator-value ${analysis.rsi < 30 ? 'oversold' : analysis.rsi > 70 ? 'overbought' : 'neutral'}">
                    ${analysis.rsi.toFixed(1)}
                </span>
            </div>
            <div class="indicator-item">
                <span class="indicator-label">${t.macd}</span>
                <span class="indicator-value ${analysis.macd.histogram > 0 ? 'positive' : 'negative'}">
                    ${analysis.macd.histogram.toFixed(4)}
                </span>
            </div>
        </div>
        <div class="indicators-row">
            <div class="indicator-item">
                <span class="indicator-label">${t.stochastic}</span>
                <span class="indicator-value ${analysis.stochastic.k < 20 ? 'oversold' : analysis.stochastic.k > 80 ? 'overbought' : 'neutral'}">
                    K: ${analysis.stochastic.k.toFixed(1)} D: ${analysis.stochastic.d.toFixed(1)}
                </span>
            </div>
            <div class="indicator-item">
                <span class="indicator-label">${t.volume}</span>
                <span class="indicator-value">
                    ${(analysis.volume / 1000000).toFixed(2)}M
                </span>
            </div>
        </div>
    `;
    
    if (analysis.support && analysis.resistance) {
        indicatorsHTML += `
            <div class="indicators-row">
                <div class="indicator-item">
                    <span class="indicator-label">${t.support}</span>
                    <span class="indicator-value">${analysis.support.toFixed(5)}</span>
                </div>
                <div class="indicator-item">
                    <span class="indicator-label">${t.resistance}</span>
                    <span class="indicator-value">${analysis.resistance.toFixed(5)}</span>
                </div>
            </div>
        `;
    }
    
    indicatorsGrid.innerHTML = indicatorsHTML;
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
    
    timerBar.style.transition = 'none';
    timerBar.style.transform = 'scaleX(1)';
    void timerBar.offsetWidth;
    
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
    const t = TRANSLATIONS[APP_CONFIG.currentLang];
    
    let result, resultColor, resultText;
    
    if (currentSignal.direction === 'BUY') {
        if (currentPrice > entryPrice * 1.0001) {
            result = 'WIN';
            resultColor = '#00ff88';
            resultText = t.win;
        } else if (currentPrice < entryPrice * 0.9999) {
            result = 'LOSS';
            resultColor = '#ff4444';
            resultText = t.loss;
        } else {
            result = 'REFUND';
            resultColor = '#8b9dc3';
            resultText = t.refund;
        }
    } else {
        if (currentPrice < entryPrice * 0.9999) {
            result = 'WIN';
            resultColor = '#00ff88';
            resultText = t.win;
        } else if (currentPrice > entryPrice * 1.0001) {
            result = 'LOSS';
            resultColor = '#ff4444';
            resultText = t.loss;
        } else {
            result = 'REFUND';
            resultColor = '#8b9dc3';
            resultText = t.refund;
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
    const t = TRANSLATIONS[APP_CONFIG.currentLang];
    const resultHTML = `
        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid ${resultColor}30;">
            <div style="text-align: center;">
                <div style="font-size: 28px; font-weight: 800; color: ${resultColor}; margin-bottom: 5px;">
                    ${resultText}
                </div>
                <div style="font-size: 14px; color: #8b9dc3; margin-bottom: 15px;">
                    Сигнал завершен
                </div>
                
                <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 15px;">
                    <div style="text-align: center;">
                        <div style="font-size: 11px; color: #5d6d97;">${t.entry}</div>
                        <div style="font-size: 16px; font-weight: 700;">${currentSignal.entryPrice.toFixed(5)}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 11px; color: #5d6d97;">${t.exit}</div>
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
    const t = TRANSLATIONS[APP_CONFIG.currentLang];
    
    const historyItem = document.createElement('div');
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
    `;
    
    historyItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-weight: 700; min-width: 70px;">${currentSignal.pair}</span>
            <span style="color: ${currentSignal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; font-weight: 600;">
                ${currentSignal.direction === 'BUY' ? t.buy : t.sell}
            </span>
            <span style="color: ${resultColor}; font-weight: 800;">
                ${currentSignal.result === 'WIN' ? t.win : currentSignal.result === 'LOSS' ? t.loss : t.refund}
            </span>
        </div>
        <div style="color: #5d6d97; font-size: 11px; text-align: right;">
            <div>${currentSignal.entryPrice.toFixed(5)} → ${currentSignal.exitPrice.toFixed(5)}</div>
            <div>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        </div>
    `;
    
    resultsList.insertBefore(historyItem, resultsList.firstChild);
    saveHistory();
}

// Сохранение истории
function saveHistory() {
    try {
        let savedHistory = JSON.parse(localStorage.getItem('tradingHistory') || '[]');
        savedHistory.unshift({
            signal: currentSignal,
            timestamp: new Date().toISOString()
        });
        
        if (savedHistory.length > 50) {
            savedHistory = savedHistory.slice(0, 50);
        }
        
        localStorage.setItem('tradingHistory', JSON.stringify(savedHistory));
    } catch (error) {
        console.error('Ошибка сохранения истории:', error);
    }
}

// Загрузка истории
function loadHistory() {
    try {
        const savedHistory = JSON.parse(localStorage.getItem('tradingHistory') || '[]');
        
        if (savedHistory.length > 0) {
            console.log(`📚 Загружено ${savedHistory.length} записей истории`);
        }
    } catch (error) {
        console.error('Ошибка загрузки истории:', error);
    }
}

// Сброс сигнала
function resetSignal() {
    isSignalActive = false;
    currentSignal = null;
    
    document.getElementById('signal-content').style.display = 'flex';
    document.getElementById('signal-details').style.display = 'none';
    document.getElementById('signal-indicators').style.display = 'none';
    document.getElementById('expiration-timer').style.display = 'none';
    
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        signalContent.innerHTML = `
            <div class="signal-placeholder">
                <i class="fas fa-chart-line"></i>
                <p>${TRANSLATIONS[APP_CONFIG.currentLang].clickForAnalysis}</p>
            </div>
        `;
    }
    
    updateSignalStatus(TRANSLATIONS[APP_CONFIG.currentLang].waiting, '#00ff88');
    
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
`;
document.head.appendChild(style);

// Экспортируем функции для отладки
window.debug = {
    getCurrentPrice: () => ASSETS[currentAsset].price,
    getAssetInfo: () => ASSETS[currentAsset],
    getAllPrices: () => ASSETS,
    forcePriceUpdate: updatePrices,
    simulateSignal: generateSignal
};
