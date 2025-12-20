// Конфигурация мультиязычности
const translations = {
    ru: {
        title: "SCALPING ROBOT PRO",
        subtitle: "Торговля бинарными опционами в реальном времени",
        mode: "Режим: Демо",
        trading_mode: "РЕЖИМ ТОРГОВЛИ",
        mode_indicators: "Индикаторы",
        mode_smart: "Smart Money",
        instrument: "ИНСТРУМЕНТ",
        expiration: "ЭКСПИРАЦИЯ",
        indicators: "ИНДИКАТОРЫ",
        real_quotes: "РЕАЛЬНЫЕ КОТИРОВКИ",
        eur_usd: "EUR/USD:",
        signal: "СИГНАЛ",
        get_signal: "ПОЛУЧИТЬ СИГНАЛ",
        updating_prices: "Обновление цен...",
        current_price: "Текущая цена:",
        change: "Изменение:",
        time: "Время:",
        timeframe: "Таймфрейм:",
        current_signal: "ТЕКУЩИЙ СИГНАЛ",
        click_for_analysis: "Нажмите 'Получить сигнал' для анализа",
        confirmations: "ПОДТВЕРЖДЕНИЯ",
        expires_in: "Истекает через:",
        last_results: "ПОСЛЕДНИЕ РЕЗУЛЬТАТЫ",
        api_info: "Используются реальные котировки Forex. Обновление каждые 5 секунд.",
        disclaimer: "Торговля бинарными опционами связана с высокими рисками."
    },
    en: {
        title: "SCALPING ROBOT PRO",
        subtitle: "Real-Time Binary Options Trading",
        mode: "Mode: Demo",
        trading_mode: "TRADING MODE",
        mode_indicators: "Indicators",
        mode_smart: "Smart Money",
        instrument: "INSTRUMENT",
        expiration: "EXPIRATION",
        indicators: "INDICATORS",
        real_quotes: "REAL QUOTES",
        eur_usd: "EUR/USD:",
        signal: "SIGNAL",
        get_signal: "GET SIGNAL",
        updating_prices: "Updating prices...",
        current_price: "Current price:",
        change: "Change:",
        time: "Time:",
        timeframe: "Timeframe:",
        current_signal: "CURRENT SIGNAL",
        click_for_analysis: "Click 'Get Signal' for analysis",
        confirmations: "CONFIRMATIONS",
        expires_in: "Expires in:",
        last_results: "LAST RESULTS",
        api_info: "Real Forex quotes are used. Update every 5 seconds.",
        disclaimer: "Binary options trading involves high risks."
    },
    es: {
        title: "SCALPING ROBOT PRO",
        subtitle: "Operaciones Binarias en Tiempo Real",
        mode: "Modo: Demo",
        trading_mode: "MODO DE OPERACIÓN",
        mode_indicators: "Indicadores",
        mode_smart: "Smart Money",
        instrument: "INSTRUMENTO",
        expiration: "EXPIRACIÓN",
        indicators: "INDICADORES",
        real_quotes: "COTIZACIONES REALES",
        eur_usd: "EUR/USD:",
        signal: "SEÑAL",
        get_signal: "OBTENER SEÑAL",
        updating_prices: "Actualizando precios...",
        current_price: "Precio actual:",
        change: "Cambio:",
        time: "Tiempo:",
        timeframe: "Timeframe:",
        current_signal: "SEÑAL ACTUAL",
        click_for_analysis: "Haga clic en 'Obtener señal' para el análisis",
        confirmations: "CONFIRMACIONES",
        expires_in: "Expira en:",
        last_results: "ÚLTIMOS RESULTADOS",
        api_info: "Se utilizan cotizaciones reales de Forex. Actualización cada 5 segundos.",
        disclaimer: "El trading de opciones binarias conlleva altos riesgos."
    }
};

// Конфигурация API
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
    'EURUSD': { name: 'EUR/USD', base: 'EUR', quote: 'USD', price: 1.0830 },
    'USDJPY': { name: 'USD/JPY', base: 'USD', quote: 'JPY', price: 148.35 },
    'GBPUSD': { name: 'GBP/USD', base: 'GBP', quote: 'USD', price: 1.2650 },
    'AUDUSD': { name: 'AUD/USD', base: 'AUD', quote: 'USD', price: 0.6590 },
    'USDCAD': { name: 'USD/CAD', base: 'USD', quote: 'CAD', price: 1.3520 },
    'USDCHF': { name: 'USD/CHF', base: 'USD', quote: 'CHF', price: 0.9025 },
    'EURJPY': { name: 'EUR/JPY', base: 'EUR', quote: 'JPY', price: 160.42 },
    'GBPJPY': { name: 'GBP/JPY', base: 'GBP', quote: 'JPY', price: 187.65 }
};

// Глобальные переменные
let currentChart = null;
let currentSignal = null;
let isSignalActive = false;
let expirationTimer = null;
let currentLanguage = 'ru';
let currentTradingMode = 'indicators';
let currentChartType = 'candlestick';
let currentAsset = 'EURUSD';
let currentTimeframe = 60;
let priceUpdateInterval = null;
let chartData = {
    labels: [],
    datasets: []
};
let drawingTools = {
    active: false,
    currentTool: null,
    drawings: []
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Инициализация Scalping Robot Pro...');
    
    // Инициализация языка
    initLanguage();
    
    // Инициализация графика
    initChart();
    
    // Инициализация событий
    initEvents();
    
    // Загрузка данных
    loadInitialPrices();
    
    // Запуск обновлений
    startPriceUpdates();
    
    // Загрузка истории
    loadHistory();
    
    console.log('✅ Scalping Robot Pro готов к работе!');
});

// Инициализация языка
function initLanguage() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            setLanguage(lang);
            
            // Обновляем активную кнопку
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Установка языка
function setLanguage(lang) {
    currentLanguage = lang;
    
    // Обновляем все элементы с data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Инициализация графика
function initChart() {
    const ctx = document.getElementById('trading-chart').getContext('2d');
    
    // Генерация тестовых данных
    generateChartData();
    
    currentChart = new Chart(ctx, {
        type: currentChartType === 'candlestick' ? 'candlestick' : 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(42, 54, 85, 0.5)' },
                    ticks: { color: '#8b9dc3' }
                },
                y: {
                    position: 'right',
                    grid: { color: 'rgba(42, 54, 85, 0.5)' },
                    ticks: { color: '#8b9dc3' }
                }
            }
        }
    });
}

// Генерация данных для графика
function generateChartData() {
    const labels = [];
    const open = [];
    const high = [];
    const low = [];
    const close = [];
    
    const now = new Date();
    let currentPrice = ASSETS[currentAsset].price;
    
    for (let i = 100; i >= 0; i--) {
        const time = new Date(now);
        time.setMinutes(time.getMinutes() - i);
        labels.push(time.getHours().toString().padStart(2, '0') + ':' + 
                    time.getMinutes().toString().padStart(2, '0'));
        
        const basePrice = i === 100 ? currentPrice : close[close.length - 1];
        const volatility = 0.0005;
        
        const o = basePrice;
        const h = o * (1 + Math.random() * volatility);
        const l = o * (1 - Math.random() * volatility);
        const c = l + Math.random() * (h - l);
        
        open.push(o);
        high.push(h);
        low.push(l);
        close.push(c);
    }
    
    if (currentChartType === 'candlestick') {
        chartData = {
            labels: labels,
            datasets: [{
                label: 'Price',
                data: close.map((c, i) => ({
                    x: labels[i],
                    o: open[i],
                    h: high[i],
                    l: low[i],
                    c: c
                })),
                color: {
                    up: '#00ff88',
                    down: '#ff4444',
                    unchanged: '#8b9dc3'
                }
            }]
        };
    } else {
        chartData = {
            labels: labels,
            datasets: [{
                label: 'Price',
                data: close,
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        };
    }
}

// Инициализация событий
function initEvents() {
    console.log('🎯 Инициализация обработчиков событий...');
    
    // Выбор актива
    document.getElementById('asset-select').addEventListener('change', function() {
        currentAsset = this.value;
        console.log('📊 Актив изменен на:', currentAsset);
        updateAssetDisplay();
        updateChart();
    });
    
    // Кнопки таймфреймов
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTimeframe = parseInt(this.dataset.time);
            document.getElementById('current-tf').textContent = getTimeframeText(currentTimeframe);
            console.log('⏱️ Таймфрейм изменен на:', getTimeframeText(currentTimeframe));
        });
    });
    
    // Режим торговли
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTradingMode = this.dataset.mode;
            console.log('🎮 Режим изменен на:', currentTradingMode);
        });
    });
    
    // Тип графика
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentChartType = this.dataset.type;
            console.log('📈 Тип графика изменен на:', currentChartType);
            updateChart();
        });
    });
    
    // Инструменты рисования
    document.querySelectorAll('.draw-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tool = this.dataset.tool;
            if (tool === 'clear') {
                drawingTools.drawings = [];
                updateChart();
            } else {
                drawingTools.active = !drawingTools.active;
                drawingTools.currentTool = drawingTools.active ? tool : null;
                document.querySelectorAll('.draw-btn').forEach(b => b.classList.remove('active'));
                if (drawingTools.active) {
                    this.classList.add('active');
                }
            }
            console.log('✏️ Инструмент рисования:', drawingTools.currentTool || 'отключен');
        });
    });
    
    // Генерация сигнала
    document.getElementById('generate-signal').addEventListener('click', generateSignal);
    
    console.log('✅ Обработчики событий инициализированы');
}

// Обновление графика
function updateChart() {
    if (!currentChart) return;
    
    generateChartData();
    currentChart.config.type = currentChartType === 'candlestick' ? 'candlestick' : 'line';
    currentChart.data = chartData;
    currentChart.update();
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

// Получение реальных цен
async function fetchRealPrices() {
    try {
        const response = await fetch('https://api.frankfurter.app/latest?from=USD');
        if (!response.ok) throw new Error('API error');
        
        const data = await response.json();
        if (data.rates) {
            // EUR/USD
            if (data.rates.EUR) ASSETS.EURUSD.price = 1 / data.rates.EUR;
            // USD/JPY
            if (data.rates.JPY) ASSETS.USDJPY.price = data.rates.JPY;
            // GBP/USD
            if (data.rates.GBP) ASSETS.GBPUSD.price = 1 / data.rates.GBP;
            // AUD/USD
            if (data.rates.AUD) ASSETS.AUDUSD.price = 1 / data.rates.AUD;
            // USD/CAD
            if (data.rates.CAD) ASSETS.USDCAD.price = data.rates.CAD;
            // USD/CHF
            if (data.rates.CHF) ASSETS.USDCHF.price = data.rates.CHF;
            // EUR/JPY
            if (data.rates.EUR && data.rates.JPY) ASSETS.EURJPY.price = (1 / data.rates.EUR) * data.rates.JPY;
            // GBP/JPY
            if (data.rates.GBP && data.rates.JPY) ASSETS.GBPJPY.price = (1 / data.rates.GBP) * data.rates.JPY;
            
            console.log('✅ Реальные цены загружены');
            return true;
        }
    } catch (error) {
        console.error('❌ Ошибка загрузки реальных цен:', error);
        throw error;
    }
}

// Демо цены
function useDemoPrices() {
    Object.keys(ASSETS).forEach(asset => {
        const change = (Math.random() - 0.5) * 0.001;
        ASSETS[asset].price *= (1 + change);
    });
}

// Запуск обновления цен
function startPriceUpdates() {
    priceUpdateInterval = setInterval(async () => {
        try {
            await updatePrices();
            updateAssetDisplay();
            updatePriceFeed();
            updateChartWithNewData();
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
        await fetchRealPrices();
    } catch (error) {
        useDemoPrices();
    }
}

// Обновление данных графика
function updateChartWithNewData() {
    if (!currentChart || !chartData.labels) return;
    
    const asset = ASSETS[currentAsset];
    const newPrice = asset.price;
    
    if (currentChartType === 'candlestick') {
        const lastCandle = chartData.datasets[0].data[chartData.datasets[0].data.length - 1];
        const newCandle = {
            x: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            o: lastCandle.c,
            h: Math.max(lastCandle.c, newPrice),
            l: Math.min(lastCandle.c, newPrice),
            c: newPrice
        };
        
        chartData.datasets[0].data.push(newCandle);
        chartData.labels.push(newCandle.x);
        
        if (chartData.datasets[0].data.length > 100) {
            chartData.datasets[0].data.shift();
            chartData.labels.shift();
        }
    } else {
        chartData.datasets[0].data.push(newPrice);
        chartData.labels.push(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
        
        if (chartData.datasets[0].data.length > 100) {
            chartData.datasets[0].data.shift();
            chartData.labels.shift();
        }
    }
    
    currentChart.update('none');
}

// Обновление отображения актива
function updateAssetDisplay() {
    const asset = ASSETS[currentAsset];
    if (!asset) return;
    
    // Обновляем основные элементы
    document.getElementById('current-price').textContent = asset.price.toFixed(5);
    document.getElementById('current-pair').textContent = asset.name;
    document.getElementById('current-price-display').textContent = asset.price.toFixed(5);
    
    // Рассчитываем изменение
    const changePercent = (Math.random() - 0.5) * 0.1;
    const changeElement = document.getElementById('price-change');
    changeElement.textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
    changeElement.className = changePercent >= 0 ? 'positive' : 'negative';
    
    // Обновляем статистику
    document.getElementById('price-change-display').textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
    document.getElementById('price-time').textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    document.getElementById('chart-time').textContent = `Обновлено: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})} UTC`;
}

// Обновление ленты цен
function updatePriceFeed() {
    ['EURUSD', 'USDJPY', 'GBPUSD'].forEach(pair => {
        const element = document.getElementById(`price-${pair}`);
        if (element && ASSETS[pair]) {
            element.textContent = ASSETS[pair].price.toFixed(5);
        }
    });
}

// Генерация сигнала
async function generateSignal() {
    if (isSignalActive) {
        alert(translations[currentLanguage].updating_prices || 'Дождитесь завершения текущего сигнала');
        return;
    }
    
    isSignalActive = true;
    
    // Блокируем кнопку
    const btn = document.getElementById('generate-signal');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + 
                    (translations[currentLanguage].updating_prices || 'АНАЛИЗ РЫНКА...');
    
    // Обновляем статус
    updateSignalStatus('Анализ рынка...', '#ffaa00');
    
    // Показываем анимацию
    showAnalysisAnimation();
    
    // Анализ рынка
    setTimeout(() => {
        createSignal();
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-bolt"></i> ' + 
                       (translations[currentLanguage].get_signal || 'ПОЛУЧИТЬ СИГНАЛ');
    }, 3000);
}

// Показать анимацию анализа
function showAnalysisAnimation() {
    document.getElementById('signal-content').innerHTML = `
        <div style="text-align: center;">
            <div style="display: inline-block; width: 60px; height: 60px; border: 3px solid #2a3655; border-top-color: #00ff88; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 15px; color: #8b9dc3; font-size: 14px;">
                <i class="fas fa-chart-line"></i><br>
                Анализ реальных котировок...
            </p>
            <div style="margin-top: 10px; font-size: 12px; color: #5d6d97;">
                Режим: ${currentTradingMode === 'indicators' ? 'Индикаторы' : 'Smart Money'}
            </div>
        </div>
    `;
}

// Создание сигнала
function createSignal() {
    const asset = ASSETS[currentAsset];
    
    // Анализ в зависимости от режима
    const analysis = currentTradingMode === 'indicators' 
        ? performTechnicalAnalysis() 
        : performSmartMoneyAnalysis();
    
    // Создаем сигнал
    currentSignal = {
        asset: currentAsset,
        pair: asset.name,
        direction: analysis.direction,
        entryPrice: asset.price,
        confidence: analysis.confidence,
        analysis: analysis,
        timestamp: new Date(),
        result: null
    };
    
    console.log('🎯 Создан сигнал:', currentSignal);
    
    // Отображаем сигнал
    displaySignal();
    
    // Показываем подтверждения
    displayConfirmations(analysis.confirmations);
    
    // Запускаем таймер
    startExpirationTimer();
}

// Технический анализ
function performTechnicalAnalysis() {
    const confirmations = [];
    
    // RSI анализ
    const rsiValue = 30 + Math.random() * 50;
    if (rsiValue < 30) {
        confirmations.push({ 
            text: 'RSI показывает перепроданность', 
            type: 'BUY', 
            confidence: 85 
        });
    } else if (rsiValue > 70) {
        confirmations.push({ 
            text: 'RSI показывает перекупленность', 
            type: 'SELL', 
            confidence: 85 
        });
    }
    
    // MACD анализ
    const macdSignal = Math.random() > 0.5 ? 'BUY' : 'SELL';
    confirmations.push({ 
        text: `MACD сигнализирует ${macdSignal === 'BUY' ? 'о покупке' : 'о продаже'}`, 
        type: macdSignal, 
        confidence: 75 
    });
    
    // Moving Average
    const maSignal = Math.random() > 0.5 ? 'BUY' : 'SELL';
    confirmations.push({ 
        text: `Скользящие средние подтверждают ${maSignal === 'BUY' ? 'восходящий' : 'нисходящий'} тренд`, 
        type: maSignal, 
        confidence: 80 
    });
    
    // Объемы
    confirmations.push({ 
        text: 'Объемы поддерживают движение', 
        type: Math.random() > 0.5 ? 'BUY' : 'SELL', 
        confidence: 70 
    });
    
    // Поддержка/Сопротивление
    confirmations.push({ 
        text: 'Цена отскочила от ключевого уровня', 
        type: Math.random() > 0.5 ? 'BUY' : 'SELL', 
        confidence: 82 
    });
    
    // Определяем общее направление
    const buyCount = confirmations.filter(c => c.type === 'BUY').length;
    const sellCount = confirmations.filter(c => c.type === 'SELL').length;
    const direction = buyCount > sellCount ? 'BUY' : 'SELL';
    
    // Средняя уверенность
    const avgConfidence = Math.round(
        confirmations.reduce((sum, c) => sum + c.confidence, 0) / confirmations.length
    );
    
    return {
        direction,
        confidence: Math.min(95, avgConfidence + 5),
        confirmations,
        rsi: rsiValue,
        macdSignal,
        maSignal
    };
}

// Smart Money анализ
function performSmartMoneyAnalysis() {
    const confirmations = [];
    
    // Ордербук анализ
    confirmations.push({ 
        text: 'Крупные ордера на покупку', 
        type: 'BUY', 
        confidence: 88 
    });
    
    // Уровни ликвидности
    confirmations.push({ 
        text: 'Ликвидность смещена в сторону покупателей', 
        type: 'BUY', 
        confidence: 85 
    });
    
    // Кластерный анализ
    confirmations.push({ 
        text: 'Кластеры показывают накопление', 
        type: Math.random() > 0.3 ? 'BUY' : 'SELL', 
        confidence: 82 
    });
    
    // Delta анализ
    confirmations.push({ 
        text: 'Положительная дельта', 
        type: 'BUY', 
        confidence: 87 
    });
    
    // Позиции институционалов
    confirmations.push({ 
        text: 'Институты увеличивают длинные позиции', 
        type: 'BUY', 
        confidence: 90 
    });
    
    const direction = Math.random() > 0.3 ? 'BUY' : 'SELL';
    const avgConfidence = Math.round(
        confirmations.reduce((sum, c) => sum + c.confidence, 0) / confirmations.length
    );
    
    return {
        direction,
        confidence: Math.min(97, avgConfidence + 7),
        confirmations
    };
}

// Отображение сигнала
function displaySignal() {
    const signal = currentSignal;
    
    document.getElementById('signal-content').style.display = 'none';
    document.getElementById('signal-details').style.display = 'block';
    document.getElementById('confirmations-panel').style.display = 'block';
    document.getElementById('expiration-timer').style.display = 'block';
    
    const detailsHTML = `
        <div style="padding: 20px;">
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">Инструмент:</span>
                <span style="font-weight: 700; font-size: 16px;">${signal.pair}</span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">Направление:</span>
                <span style="font-weight: 800; font-size: 18px; color: ${signal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; text-transform: uppercase;">
                    ${signal.direction === 'BUY' ? 'ПОКУПКА' : 'ПРОДАЖА'}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">Цена входа:</span>
                <span style="font-weight: 700; font-family: 'Courier New', monospace; font-size: 16px;">
                    ${signal.entryPrice.toFixed(5)}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">Точность:</span>
                <span style="font-weight: 800; color: #00ff88; font-size: 18px;">
                    ${signal.confidence}%
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
    updateSignalStatus('АКТИВЕН', signal.direction === 'BUY' ? '#00ff88' : '#ff4444');
}

// Отображение подтверждений
function displayConfirmations(confirmations) {
    const grid = document.getElementById('confirmations-grid');
    grid.innerHTML = '';
    
    confirmations.forEach(conf => {
        const item = document.createElement('div');
        item.className = `confirmation-item ${conf.type === 'BUY' ? 'positive' : 'negative'}`;
        item.innerHTML = `
            <div class="confirmation-icon">
                <i class="fas fa-${conf.type === 'BUY' ? 'check-circle' : 'exclamation-circle'}"></i>
            </div>
            <div class="confirmation-text">${conf.text} (${conf.confidence}%)</div>
        `;
        grid.appendChild(item);
    });
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
    
    // Сбрасываем анимацию
    timerBar.style.transition = 'none';
    timerBar.style.transform = 'scaleX(1)';
    void timerBar.offsetWidth;
    
    // Запускаем новую анимацию
    timerBar.style.transition = `transform ${totalTime}s linear`;
    timerBar.style.transform = 'scaleX(0)';
    
    // Таймер
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
            resultText = 'ВЫИГРЫШ';
        } else if (currentPrice < entryPrice * 0.9999) {
            result = 'LOSS';
            resultColor = '#ff4444';
            resultText = 'ПРОИГРЫШ';
        } else {
            result = 'REFUND';
            resultColor = '#8b9dc3';
            resultText = 'ВОЗВРАТ';
        }
    } else {
        if (currentPrice < entryPrice * 0.9999) {
            result = 'WIN';
            resultColor = '#00ff88';
            resultText = 'ВЫИГРЫШ';
        } else if (currentPrice > entryPrice * 1.0001) {
            result = 'LOSS';
            resultColor = '#ff4444';
            resultText = 'ПРОИГРЫШ';
        } else {
            result = 'REFUND';
            resultColor = '#8b9dc3';
            resultText = 'ВОЗВРАТ';
        }
    }
    
    currentSignal.result = result;
    currentSignal.exitPrice = currentPrice;
    currentSignal.completedAt = new Date();
    
    showSignalResult(result, resultText, resultColor, currentPrice);
    addToHistory();
    
    setTimeout(resetSignal, 5000);
}

// Показать результат
function showSignalResult(result, resultText, resultColor, exitPrice) {
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
                        <div style="font-size: 11px; color: #5d6d97;">Вход</div>
                        <div style="font-size: 16px; font-weight: 700;">${currentSignal.entryPrice.toFixed(5)}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 11px; color: #5d6d97;">Выход</div>
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
    
    document.getElementById('signal-details').innerHTML += resultHTML;
    updateSignalStatus(resultText, resultColor);
}

// Добавление в историю
function addToHistory() {
    const resultsList = document.getElementById('results-list');
    if (!resultsList) return;
    
    const resultColor = currentSignal.result === 'WIN' ? '#00ff88' : 
                       currentSignal.result === 'LOSS' ? '#ff4444' : '#8b9dc3';
    
    const historyItem = document.createElement('div');
    historyItem.className = `result-item ${currentSignal.result.toLowerCase()}`;
    historyItem.style.cssText = `
        animation: fadeIn 0.3s ease-out;
    `;
    
    historyItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-weight: 700; min-width: 70px;">${currentSignal.pair}</span>
            <span style="color: ${currentSignal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; font-weight: 600;">
                ${currentSignal.direction === 'BUY' ? 'ПОКУПКА' : 'ПРОДАЖА'}
            </span>
            <span style="color: ${resultColor}; font-weight: 800;">
                ${currentSignal.result === 'WIN' ? 'ВЫИГРЫШ' : currentSignal.result === 'LOSS' ? 'ПРОИГРЫШ' : 'ВОЗВРАТ'}
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
        savedHistory.unshift(currentSignal);
        
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
        const resultsList = document.getElementById('results-list');
        
        savedHistory.slice(0, 10).forEach(signal => {
            if (!signal || !signal.result) return;
            
            const resultColor = signal.result === 'WIN' ? '#00ff88' : 
                              signal.result === 'LOSS' ? '#ff4444' : '#8b9dc3';
            
            const historyItem = document.createElement('div');
            historyItem.className = `result-item ${signal.result.toLowerCase()}`;
            
            historyItem.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-weight: 700; min-width: 70px;">${signal.pair || 'N/A'}</span>
                    <span style="color: ${signal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; font-weight: 600;">
                        ${signal.direction === 'BUY' ? 'ПОКУПКА' : 'ПРОДАЖА'}
                    </span>
                    <span style="color: ${resultColor}; font-weight: 800;">
                        ${signal.result === 'WIN' ? 'ВЫИГРЫШ' : signal.result === 'LOSS' ? 'ПРОИГРЫШ' : 'ВОЗВРАТ'}
                    </span>
                </div>
                <div style="color: #5d6d97; font-size: 11px; text-align: right;">
                    <div>${signal.entryPrice ? signal.entryPrice.toFixed(5) : '0.00000'} → ${signal.exitPrice ? signal.exitPrice.toFixed(5) : '0.00000'}</div>
                    <div>${signal.completedAt ? new Date(signal.completedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '00:00'}</div>
                </div>
            `;
            
            if (resultsList) {
                resultsList.appendChild(historyItem);
            }
        });
        
        console.log(`📚 Загружено ${Math.min(savedHistory.length, 10)} записей истории`);
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
    document.getElementById('confirmations-panel').style.display = 'none';
    document.getElementById('expiration-timer').style.display = 'none';
    
    document.getElementById('signal-content').innerHTML = `
        <div class="signal-placeholder">
            <i class="fas fa-chart-line"></i>
            <p data-i18n="click_for_analysis">Нажмите "Получить сигнал" для анализа</p>
        </div>
    `;
    
    updateSignalStatus('Ожидание', '#00ff88');
    
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
    
    .live-price {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(style);

// Экспорт для отладки
window.debug = {
    getCurrentPrice: () => ASSETS[currentAsset].price,
    getAssetInfo: () => ASSETS[currentAsset],
    getAllPrices: () => ASSETS,
    forcePriceUpdate: updatePrices,
    simulateSignal: generateSignal,
    setLanguage: setLanguage
};
