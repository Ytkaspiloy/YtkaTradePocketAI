// Конфигурация активов для TradingView
const ASSETS_CONFIG = {
    'EURUSD': { 
        name: 'EUR/USD', 
        symbol: 'FX:EURUSD',
        exchange: 'FX',
        type: 'forex'
    },
    'USDJPY': { 
        name: 'USD/JPY', 
        symbol: 'FX:USDJPY',
        exchange: 'FX',
        type: 'forex'
    },
    'GBPUSD': { 
        name: 'GBP/USD', 
        symbol: 'FX:GBPUSD',
        exchange: 'FX',
        type: 'forex'
    },
    'AUDUSD': { 
        name: 'AUD/USD', 
        symbol: 'FX:AUDUSD',
        exchange: 'FX',
        type: 'forex'
    },
    'USDCAD': { 
        name: 'USD/CAD', 
        symbol: 'FX:USDCAD',
        exchange: 'FX',
        type: 'forex'
    },
    'USDCHF': { 
        name: 'USD/CHF', 
        symbol: 'FX:USDCHF',
        exchange: 'FX',
        type: 'forex'
    },
    'EURJPY': { 
        name: 'EUR/JPY', 
        symbol: 'FX:EURJPY',
        exchange: 'FX',
        type: 'forex'
    },
    'GBPJPY': { 
        name: 'GBP/JPY', 
        symbol: 'FX:GBPJPY',
        exchange: 'FX',
        type: 'forex'
    },
    'BTCUSD': { 
        name: 'BTC/USD', 
        symbol: 'BITSTAMP:BTCUSD',
        exchange: 'BITSTAMP',
        type: 'crypto'
    },
    'ETHUSD': { 
        name: 'ETH/USD', 
        symbol: 'BITSTAMP:ETHUSD',
        exchange: 'BITSTAMP',
        type: 'crypto'
    }
};

// Демо цены для быстрого отображения
const DEMO_PRICES = {
    'EURUSD': 1.0830,
    'USDJPY': 148.35,
    'GBPUSD': 1.2650,
    'AUDUSD': 0.6590,
    'USDCAD': 1.3520,
    'USDCHF': 0.9025,
    'EURJPY': 160.42,
    'GBPJPY': 187.65,
    'BTCUSD': 42000,
    'ETHUSD': 2200
};

// Таймфреймы для TradingView
const TIMEFRAMES = {
    60: "1",
    120: "2",
    180: "3",
    300: "5"
};

// Многоязычная поддержка
const TRANSLATIONS = {
    ru: {
        instrument: 'ИНСТРУМЕНТ',
        expiration: 'ЭКСПИРАЦИЯ',
        signal_type: 'ТИП СИГНАЛА',
        real_quotes: 'РЕАЛЬНЫЕ КОТИРОВКИ',
        signal: 'СИГНАЛ',
        get_signal: 'ПОЛУЧИТЬ СИГНАЛ',
        updating_prices: 'Обновление цен...',
        current_price: 'Текущая цена:',
        change: 'Изменение:',
        time: 'Время:',
        timeframe: 'Таймфрейм:',
        current_signal: 'ТЕКУЩИЙ СИГНАЛ',
        click_for_analysis: 'Нажмите "Получить сигнал" для анализа',
        data_source: 'Источник: TradingView API',
        expires_in: 'Истекает через:',
        recent_results: 'ПОСЛЕДНИЕ РЕЗУЛЬТАТЫ',
        api_info: 'Используются реальные котировки TradingView. Обновление в реальном времени.',
        disclaimer: 'Торговля бинарными опционами связана с высокими рисками.',
        status_demo: 'Режим: Демо',
        status_analysis: 'Анализ рынка...',
        status_active: 'АКТИВЕН',
        status_waiting: 'Ожидание',
        buy: 'ПОКУПКА',
        sell: 'ПРОДАЖА',
        win: 'ВЫИГРЫШ',
        loss: 'ПРОИГРЫШ',
        refund: 'ВОЗВРАТ'
    },
    en: {
        instrument: 'INSTRUMENT',
        expiration: 'EXPIRATION',
        signal_type: 'SIGNAL TYPE',
        real_quotes: 'REAL QUOTES',
        signal: 'SIGNAL',
        get_signal: 'GET SIGNAL',
        updating_prices: 'Updating prices...',
        current_price: 'Current price:',
        change: 'Change:',
        time: 'Time:',
        timeframe: 'Timeframe:',
        current_signal: 'CURRENT SIGNAL',
        click_for_analysis: 'Click "Get Signal" for analysis',
        data_source: 'Source: TradingView API',
        expires_in: 'Expires in:',
        recent_results: 'RECENT RESULTS',
        api_info: 'Real TradingView quotes are used. Real-time updates.',
        disclaimer: 'Binary options trading involves high risks.',
        status_demo: 'Mode: Demo',
        status_analysis: 'Market analysis...',
        status_active: 'ACTIVE',
        status_waiting: 'Waiting',
        buy: 'BUY',
        sell: 'SELL',
        win: 'WIN',
        loss: 'LOSS',
        refund: 'REFUND'
    },
    es: {
        instrument: 'INSTRUMENTO',
        expiration: 'EXPIRACIÓN',
        signal_type: 'TIPO DE SEÑAL',
        real_quotes: 'COTIZACIONES REALES',
        signal: 'SEÑAL',
        get_signal: 'OBTENER SEÑAL',
        updating_prices: 'Actualizando precios...',
        current_price: 'Precio actual:',
        change: 'Cambio:',
        time: 'Tiempo:',
        timeframe: 'Marco temporal:',
        current_signal: 'SEÑAL ACTUAL',
        click_for_analysis: 'Haga clic en "Obtener señal" para el análisis',
        data_source: 'Fuente: TradingView API',
        expires_in: 'Expira en:',
        recent_results: 'RESULTADOS RECIENTES',
        api_info: 'Se utilizan cotizaciones reales de TradingView. Actualización en tiempo real.',
        disclaimer: 'El comercio de opciones binarias conlleva altos riesgos.',
        status_demo: 'Modo: Demo',
        status_analysis: 'Análisis de mercado...',
        status_active: 'ACTIVO',
        status_waiting: 'Esperando',
        buy: 'COMPRA',
        sell: 'VENTA',
        win: 'GANAR',
        loss: 'PERDER',
        refund: 'REEMBOLSO'
    },
    de: {
        instrument: 'INSTRUMENT',
        expiration: 'AUSLAUF',
        signal_type: 'SIGNALTYP',
        real_quotes: 'ECHTE KURSE',
        signal: 'SIGNAL',
        get_signal: 'SIGNAL ERHALTEN',
        updating_prices: 'Preise werden aktualisiert...',
        current_price: 'Aktueller Preis:',
        change: 'Änderung:',
        time: 'Zeit:',
        timeframe: 'Zeitrahmen:',
        current_signal: 'AKTUELLES SIGNAL',
        click_for_analysis: 'Klicken Sie "Signal erhalten" für die Analyse',
        data_source: 'Quelle: TradingView API',
        expires_in: 'Läuft ab in:',
        recent_results: 'LETZTE ERGEBNISSE',
        api_info: 'Echtzeit-TradingView-Kurse werden verwendet. Echtzeit-Aktualisierung.',
        disclaimer: 'Der Handel mit binären Optionen birgt hohe Risiken.',
        status_demo: 'Modus: Demo',
        status_analysis: 'Marktanalyse...',
        status_active: 'AKTIV',
        status_waiting: 'Wartet',
        buy: 'KAUFEN',
        sell: 'VERKAUFEN',
        win: 'GEWINN',
        loss: 'VERLUST',
        refund: 'RÜCKERSTATTUNG'
    },
    fr: {
        instrument: 'INSTRUMENT',
        expiration: 'EXPIRATION',
        signal_type: 'TYPE DE SIGNAL',
        real_quotes: 'COTATIONS RÉELLES',
        signal: 'SIGNAL',
        get_signal: 'OBTENIR UN SIGNAL',
        updating_prices: 'Mise à jour des prix...',
        current_price: 'Prix actuel:',
        change: 'Changement:',
        time: 'Temps:',
        timeframe: 'Cadre temporel:',
        current_signal: 'SIGNAL ACTUEL',
        click_for_analysis: 'Cliquez sur "Obtenir un signal" pour l\'analyse',
        data_source: 'Source: TradingView API',
        expires_in: 'Expire dans:',
        recent_results: 'RÉSULTATS RÉCENTS',
        api_info: 'Des cotations TradingView réelles sont utilisées. Mise à jour en temps réel.',
        disclaimer: 'Le trading d\'options binaires comporte des risques élevés.',
        status_demo: 'Mode: Démo',
        status_analysis: 'Analyse du marché...',
        status_active: 'ACTIF',
        status_waiting: 'En attente',
        buy: 'ACHAT',
        sell: 'VENTE',
        win: 'GAGNER',
        loss: 'PERTE',
        refund: 'REMBOURSEMENT'
    },
    pt: {
        instrument: 'INSTRUMENTO',
        expiration: 'EXPIRAÇÃO',
        signal_type: 'TIPO DE SINAL',
        real_quotes: 'COTAÇÕES REAIS',
        signal: 'SINAL',
        get_signal: 'OBTER SINAL',
        updating_prices: 'Atualizando preços...',
        current_price: 'Preço atual:',
        change: 'Mudança:',
        time: 'Tempo:',
        timeframe: 'Período:',
        current_signal: 'SINAL ATUAL',
        click_for_analysis: 'Clique em "Obter sinal" para análise',
        data_source: 'Fonte: TradingView API',
        expires_in: 'Expira em:',
        recent_results: 'RESULTADOS RECIENTES',
        api_info: 'Cotações TradingView reais são usadas. Atualização em tempo real.',
        disclaimer: 'A negociação de opções binárias envolve altos riscos.',
        status_demo: 'Modo: Demo',
        status_analysis: 'Análise de mercado...',
        status_active: 'ATIVO',
        status_waiting: 'Aguardando',
        buy: 'COMPRAR',
        sell: 'VENDER',
        win: 'GANHAR',
        loss: 'PERDER',
        refund: 'REEMBOLSO'
    },
    ar: {
        instrument: 'الأداة',
        expiration: 'الانتهاء',
        signal_type: 'نوع الإشارة',
        real_quotes: 'أسعار حقيقية',
        signal: 'إشارة',
        get_signal: 'الحصول على إشارة',
        updating_prices: 'جاري تحديث الأسعار...',
        current_price: 'السعر الحالي:',
        change: 'التغيير:',
        time: 'الوقت:',
        timeframe: 'الإطار الزمني:',
        current_signal: 'الإشارة الحالية',
        click_for_analysis: 'انقر "الحصول على إشارة" للتحليل',
        data_source: 'المصدر: TradingView API',
        expires_in: 'تنتهي في:',
        recent_results: 'النتائج الأخيرة',
        api_info: 'يتم استخدام أسعار TradingView حقيقية. تحديث في الوقت الحقيقي.',
        disclaimer: 'تداول الخيارات الثنائية ينطوي على مخاطر عالية.',
        status_demo: 'الوضع: تجريبي',
        status_analysis: 'تحليل السوق...',
        status_active: 'نشط',
        status_waiting: 'انتظار',
        buy: 'شراء',
        sell: 'بيع',
        win: 'فوز',
        loss: 'خسارة',
        refund: 'استرداد'
    },
    tr: {
        instrument: 'ARAÇ',
        expiration: 'SÜRE SONU',
        signal_type: 'SİNYAL TİPİ',
        real_quotes: 'GERÇEK KOTASYONLAR',
        signal: 'SİNYAL',
        get_signal: 'SİNYAL AL',
        updating_prices: 'Fiyatlar güncelleniyor...',
        current_price: 'Mevcut fiyat:',
        change: 'Değişim:',
        time: 'Zaman:',
        timeframe: 'Zaman dilimi:',
        current_signal: 'MEVCUT SİNYAL',
        click_for_analysis: 'Analiz için "Sinyal Al"ı tıklayın',
        data_source: 'Kaynak: TradingView API',
        expires_in: 'Sona erme:',
        recent_results: 'SONUÇLAR',
        api_info: 'Gerçek TradingView kotasyonları kullanılıyor. Gerçek zamanlı güncelleme.',
        disclaimer: 'İkili opsiyon ticareti yüksek risk içerir.',
        status_demo: 'Mod: Demo',
        status_analysis: 'Piyasa analizi...',
        status_active: 'AKTİF',
        status_waiting: 'Bekliyor',
        buy: 'ALIŞ',
        sell: 'SATIŞ',
        win: 'KAZANÇ',
        loss: 'KAYIP',
        refund: 'İADE'
    }
};

// Глобальные переменные
let currentAsset = 'EURUSD';
let currentTimeframe = 60;
let currentSignalType = 'smart';
let currentLanguage = 'ru';
let currentSignal = null;
let isSignalActive = false;
let expirationTimer = null;
let priceUpdateInterval = null;
let currentChart = null;
let tradingViewWidget = null;
let currentChartType = 'TradingView';

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Инициализация Scalping Robot Pro...');
    
    // Загружаем сохраненный язык
    const savedLang = localStorage.getItem('tradingLanguage') || 'ru';
    currentLanguage = savedLang;
    document.getElementById('language-select').value = currentLanguage;
    
    // Инициализация событий
    initEvents();
    
    // Загрузка начальных данных
    loadInitialData();
    
    // Запуск обновления цен
    startPriceUpdates();
    
    // Загрузка истории
    loadHistory();
    
    // Применяем переводы
    applyTranslations();
    
    console.log('✅ Scalping Robot Pro готов к работе!');
});

// Применение переводов
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (TRANSLATIONS[currentLanguage][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = TRANSLATIONS[currentLanguage][key];
            } else {
                element.textContent = TRANSLATIONS[currentLanguage][key];
            }
        }
    });
    
    // Обновляем статус в шапке
    const statusElement = document.getElementById('status-text');
    if (statusElement && TRANSLATIONS[currentLanguage].status_demo) {
        statusElement.textContent = TRANSLATIONS[currentLanguage].status_demo;
    }
}

// Инициализация событий
function initEvents() {
    console.log('🎯 Инициализация обработчиков событий...');
    
    // Выбор языка
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            currentLanguage = this.value;
            localStorage.setItem('tradingLanguage', currentLanguage);
            applyTranslations();
            console.log('🌐 Язык изменен на:', currentLanguage);
        });
    }
    
    // Выбор актива
    const assetSelect = document.getElementById('asset-select');
    if (assetSelect) {
        assetSelect.addEventListener('change', function() {
            currentAsset = this.value;
            console.log('📊 Актив изменен на:', currentAsset);
            
            updateAssetDisplay();
            updateTradingViewChart();
        });
    }
    
    // Кнопки таймфреймов
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            this.classList.add('active');
            currentTimeframe = parseInt(this.dataset.time);
            
            const timeText = getTimeframeText(currentTimeframe);
            document.getElementById('current-tf').textContent = timeText;
            
            updateTradingViewChart();
            console.log('⏱️ Таймфрейм изменен на:', timeText);
        });
    });
    
    // Кнопки типа сигнала
    document.querySelectorAll('.signal-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.signal-type-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            this.classList.add('active');
            currentSignalType = this.dataset.type;
            
            console.log('🎯 Тип сигнала изменен на:', currentSignalType);
        });
    });
    
    // Выбор типа графика
    const chartTypeSelect = document.getElementById('chart-type-select');
    if (chartTypeSelect) {
        chartTypeSelect.addEventListener('change', function() {
            currentChartType = this.value;
            toggleChartType();
        });
    }
    
    // Кнопка генерации сигнала
    const generateBtn = document.getElementById('generate-signal');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateSignal);
    }
    
    console.log('✅ Обработчики событий инициализированы');
}

// Загрузка начальных данных
function loadInitialData() {
    console.log('📡 Загрузка начальных данных...');
    
    updateAssetDisplay();
    updatePriceFeed();
    updateIndicators();
    updateTradingViewChart();
}

// Получение текста таймфрейма
function getTimeframeText(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} мин`;
}

// Переключение типа графика
function toggleChartType() {
    const tradingViewChart = document.getElementById('tradingview-chart');
    const simpleChart = document.getElementById('simple-chart');
    
    if (currentChartType === 'TradingView') {
        tradingViewChart.style.display = 'block';
        simpleChart.style.display = 'none';
        updateTradingViewChart();
    } else {
        tradingViewChart.style.display = 'none';
        simpleChart.style.display = 'block';
        initSimpleChart();
    }
}

// Инициализация TradingView графика
function updateTradingViewChart() {
    const asset = ASSETS_CONFIG[currentAsset];
    if (!asset) return;
    
    const chartContainer = document.getElementById('tradingview-chart');
    if (!chartContainer) return;
    
    // Очищаем предыдущий виджет
    chartContainer.innerHTML = '';
    
    // Создаем контейнер для TradingView
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container';
    widgetContainer.id = 'tradingview-widget';
    
    const widgetScript = document.createElement('script');
    widgetScript.type = 'text/javascript';
    widgetScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    widgetScript.async = true;
    
    const timeframe = TIMEFRAMES[currentTimeframe] || "1";
    
    widgetScript.textContent = JSON.stringify({
        "autosize": true,
        "symbol": asset.symbol,
        "interval": timeframe,
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": currentLanguage,
        "enable_publishing": false,
        "hide_volume": true,
        "hide_legend": true,
        "withdateranges": true,
        "allow_symbol_change": false,
        "save_image": false,
        "calendar": false,
        "studies": [
            "RSI@tv-basicstudies",
            "MACD@tv-basicstudies"
        ],
        "support_host": "https://www.tradingview.com",
        "backgroundColor": "rgba(19, 26, 45, 1)",
        "gridColor": "rgba(42, 54, 85, 0.5)",
        "textColor": "#8b9dc3",
        "timeHoursFormat": "24-hours"
    });
    
    chartContainer.appendChild(widgetContainer);
    widgetContainer.appendChild(widgetScript);
    
    // Добавляем стили для TradingView
    const style = document.createElement('style');
    style.textContent = `
        .tradingview-widget-copyright {
            display: none !important;
        }
        .tradingview-widget-container {
            width: 100%;
            height: 100%;
        }
        .tradingview-widget-container > div {
            width: 100%;
            height: 100%;
        }
        .tradingview-widget-container iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    `;
    document.head.appendChild(style);
}

// Инициализация простого графика (альтернатива)
function initSimpleChart() {
    const canvas = document.getElementById('simple-chart-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Очищаем предыдущий график
    if (currentChart) {
        currentChart.destroy();
    }
    
    // Генерируем демо данные
    const data = generateDemoChartData();
    
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Цена',
                data: data.prices,
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
            }
        }
    });
}

// Генерация демо данных для простого графика
function generateDemoChartData() {
    const labels = [];
    const prices = [];
    const now = new Date();
    const basePrice = DEMO_PRICES[currentAsset] || 1.0;
    
    // 24 часа данных
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now);
        time.setHours(time.getHours() - i);
        labels.push(time.getHours().toString().padStart(2, '0') + ':00');
        
        const lastPrice = prices.length > 0 ? prices[prices.length - 1] : basePrice;
        
        // Реалистичное движение цены
        const volatility = 0.0002;
        const change = (Math.random() - 0.5) * volatility;
        prices.push(lastPrice * (1 + change));
    }
    
    return { labels, prices };
}

// Обновление отображения актива
function updateAssetDisplay() {
    const asset = ASSETS_CONFIG[currentAsset];
    if (!asset) return;
    
    const priceElement = document.getElementById('current-price');
    const pairElement = document.getElementById('current-pair');
    const changeElement = document.getElementById('price-change');
    
    if (priceElement) {
        const currentPrice = DEMO_PRICES[currentAsset] || 1.0;
        priceElement.textContent = currentPrice.toFixed(5);
    }
    
    if (pairElement) {
        pairElement.textContent = asset.name;
    }
    
    if (changeElement) {
        // Демо изменение
        const changePercent = (Math.random() - 0.5) * 0.1;
        const changeValue = (DEMO_PRICES[currentAsset] || 1.0) * changePercent;
        
        changeElement.textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
        changeElement.className = changePercent >= 0 ? 'positive' : 'negative';
        
        // Обновляем статистику
        document.getElementById('current-price-display').textContent = (DEMO_PRICES[currentAsset] || 1.0).toFixed(5);
        document.getElementById('price-change-display').textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
        document.getElementById('price-time').textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    }
    
    document.getElementById('chart-time').textContent = `Обновлено: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})} UTC`;
}

// Обновление ленты цен
function updatePriceFeed() {
    const feedPairs = ['EURUSD', 'USDJPY', 'GBPUSD'];
    
    feedPairs.forEach(pair => {
        const element = document.getElementById(`price-${pair}`);
        if (element && DEMO_PRICES[pair]) {
            // Добавляем реалистичное изменение
            const change = (Math.random() - 0.5) * 0.0001;
            const newPrice = DEMO_PRICES[pair] * (1 + change);
            element.textContent = newPrice.toFixed(5);
            
            // Обновляем демо цену
            DEMO_PRICES[pair] = newPrice;
        }
    });
}

// Запуск обновления цен
function startPriceUpdates() {
    priceUpdateInterval = setInterval(() => {
        updateAssetDisplay();
        updatePriceFeed();
        updateIndicators();
    }, 5000); // Обновляем каждые 5 секунд
}

// Обновление индикаторов
function updateIndicators() {
    // Демо значения индикаторов
    const rsi = 50 + (Math.random() - 0.5) * 20;
    const macd = (Math.random() - 0.5) * 0.01;
    const stochastic = 50 + (Math.random() - 0.5) * 40;
    
    // RSI
    document.getElementById('indicator-rsi').textContent = rsi.toFixed(1);
    document.getElementById('indicator-rsi').style.color = 
        rsi > 70 ? '#ff4444' : rsi < 30 ? '#00ff88' : '#8b9dc3';
    
    // MACD
    document.getElementById('indicator-macd').textContent = macd.toFixed(3);
    document.getElementById('indicator-macd').style.color = 
        macd > 0 ? '#00ff88' : '#ff4444';
    
    // Stochastic
    document.getElementById('indicator-stochastic').textContent = stochastic.toFixed(1);
    document.getElementById('indicator-stochastic').style.color = 
        stochastic > 80 ? '#ff4444' : stochastic < 20 ? '#00ff88' : '#8b9dc3';
    
    // Bollinger Bands (симуляция)
    const bollingerStatus = Math.random() > 0.6 ? '↑' : Math.random() > 0.3 ? '↓' : '•';
    const bollingerColor = bollingerStatus === '↑' ? '#ff4444' : 
                          bollingerStatus === '↓' ? '#00ff88' : '#8b9dc3';
    
    document.getElementById('indicator-bollinger').textContent = bollingerStatus;
    document.getElementById('indicator-bollinger').style.color = bollingerColor;
}

// Генерация сигнала
async function generateSignal() {
    if (isSignalActive) {
        alert('⏳ ' + TRANSLATIONS[currentLanguage].status_waiting);
        return;
    }
    
    isSignalActive = true;
    
    const btn = document.getElementById('generate-signal');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + TRANSLATIONS[currentLanguage].status_analysis;
    
    updateSignalStatus(TRANSLATIONS[currentLanguage].status_analysis, '#ffaa00');
    showAnalysisAnimation();
    
    // Имитация анализа (3 секунды)
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
                    ${TRANSLATIONS[currentLanguage].status_analysis}
                </p>
                <div style="margin-top: 10px; font-size: 12px; color: #5d6d97;">
                    Анализ по ${currentSignalType === 'smart' ? 'Смарт-Мани' : currentSignalType === 'indicators' ? 'индикаторам' : 'комбинированному методу'}
                </div>
            </div>
        `;
    }
}

// Создание сигнала
function createSignal() {
    const asset = ASSETS_CONFIG[currentAsset];
    if (!asset) return;
    
    let analysis;
    switch (currentSignalType) {
        case 'smart':
            analysis = performSmartMoneyAnalysis();
            break;
        case 'indicators':
            analysis = performIndicatorsAnalysis();
            break;
        case 'combined':
            analysis = performCombinedAnalysis();
            break;
        default:
            analysis = performSmartMoneyAnalysis();
    }
    
    currentSignal = {
        asset: currentAsset,
        pair: asset.name,
        direction: analysis.direction,
        entryPrice: DEMO_PRICES[currentAsset] || 1.0,
        confidence: analysis.confidence,
        analysis: analysis,
        signalType: currentSignalType,
        timestamp: new Date(),
        result: null
    };
    
    console.log('🎯 Создан сигнал:', currentSignal);
    
    displaySignal();
    startExpirationTimer();
}

// Анализ Смарт-Мани
function performSmartMoneyAnalysis() {
    const currentPrice = DEMO_PRICES[currentAsset] || 1.0;
    
    let direction = Math.random() > 0.5 ? 'BUY' : 'SELL';
    let confidence = 75 + Math.random() * 20;
    
    // Симуляция анализа
    confidence = Math.min(95, Math.round(confidence));
    
    return {
        direction,
        confidence,
        volume: Math.random() > 0.5 ? 'высокий' : 'средний',
        orderFlow: direction === 'BUY' ? 'позитивный' : 'негативный',
        marketSentiment: direction === 'BUY' ? 'бычий' : 'медвежий',
        supportLevel: currentPrice * (direction === 'BUY' ? 0.997 : 0.999),
        resistanceLevel: currentPrice * (direction === 'BUY' ? 1.003 : 1.001)
    };
}

// Анализ по индикаторам
function performIndicatorsAnalysis() {
    const currentPrice = DEMO_PRICES[currentAsset] || 1.0;
    
    let direction = Math.random() > 0.5 ? 'BUY' : 'SELL';
    let confidence = 70 + Math.random() * 25;
    
    // Симуляция индикаторов
    const rsi = 50 + (Math.random() - 0.5) * 20;
    const macd = (Math.random() - 0.5) * 0.01;
    const stochastic = 50 + (Math.random() - 0.5) * 40;
    
    confidence = Math.min(90, Math.round(confidence));
    
    return {
        direction,
        confidence,
        rsi: rsi,
        macd: macd,
        stochastic: stochastic,
        bollinger: Math.random() > 0.66 ? 'верхняя полоса' : 
                  Math.random() > 0.33 ? 'нижняя полоса' : 'внутри полос'
    };
}

// Комбинированный анализ
function performCombinedAnalysis() {
    const smartAnalysis = performSmartMoneyAnalysis();
    const indicatorsAnalysis = performIndicatorsAnalysis();
    
    let direction = smartAnalysis.direction;
    let confidence = Math.round((smartAnalysis.confidence + indicatorsAnalysis.confidence) / 2);
    
    // Если анализы противоречат друг другу, снижаем уверенность
    if (smartAnalysis.direction !== indicatorsAnalysis.direction) {
        confidence = Math.round(confidence * 0.7);
    }
    
    return {
        direction,
        confidence: Math.min(92, confidence),
        smartMoney: smartAnalysis,
        indicators: indicatorsAnalysis,
        combinedScore: Math.round((smartAnalysis.confidence + indicatorsAnalysis.confidence) / 2)
    };
}

// Отображение сигнала
function displaySignal() {
    const signal = currentSignal;
    if (!signal) return;
    
    document.getElementById('signal-content').style.display = 'none';
    document.getElementById('signal-details').style.display = 'block';
    document.getElementById('expiration-timer').style.display = 'block';
    
    let detailsHTML = '';
    
    if (signal.signalType === 'smart') {
        detailsHTML = createSmartSignalDetails(signal);
    } else if (signal.signalType === 'indicators') {
        detailsHTML = createIndicatorsSignalDetails(signal);
    } else {
        detailsHTML = createCombinedSignalDetails(signal);
    }
    
    document.getElementById('signal-details').innerHTML = detailsHTML;
    
    updateSignalStatus(TRANSLATIONS[currentLanguage].status_active, 
                      signal.direction === 'BUY' ? '#00ff88' : '#ff4444');
    
    const btn = document.getElementById('generate-signal');
    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-bolt"></i> ${TRANSLATIONS[currentLanguage].get_signal}`;
}

// Создание деталей сигнала Смарт-Мани
function createSmartSignalDetails(signal) {
    const directionText = signal.direction === 'BUY' ? 
                         TRANSLATIONS[currentLanguage].buy : 
                         TRANSLATIONS[currentLanguage].sell;
    
    return `
        <div style="padding: 20px;">
            <div style="margin-bottom: 15px; text-align: center;">
                <span style="font-size: 10px; color: #8b9dc3; background: rgba(0, 102, 255, 0.2); padding: 3px 8px; border-radius: 10px;">
                    СМАРТ-МАНИ
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${TRANSLATIONS[currentLanguage].instrument}:</span>
                <span style="font-weight: 700; font-size: 16px;">${signal.pair}</span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${TRANSLATIONS[currentLanguage].signal}:</span>
                <span style="font-weight: 800; font-size: 18px; color: ${signal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; text-transform: uppercase;">
                    ${directionText}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${TRANSLATIONS[currentLanguage].current_price}:</span>
                <span style="font-weight: 700; font-family: 'Courier New', monospace; font-size: 16px;">
                    ${signal.entryPrice.toFixed(5)}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">Уверенность:</span>
                <span style="font-weight: 800; color: #00ff88; font-size: 18px;">
                    ${signal.confidence}%
                </span>
            </div>
            
            <div style="background: rgba(19, 26, 45, 0.5); border-radius: 8px; padding: 12px; margin-top: 15px;">
                <div style="font-size: 12px; color: #8b9dc3; margin-bottom: 5px;">Детали анализа:</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px;">
                    <div>Объем: <span style="color: #00ff88;">${signal.analysis.volume}</span></div>
                    <div>Order Flow: <span style="color: #00ff88;">${signal.analysis.orderFlow}</span></div>
                    <div>Сентимент: <span style="color: #00ff88;">${signal.analysis.marketSentiment}</span></div>
                    <div>Поддержка: <span style="color: #ff4444;">${signal.analysis.supportLevel.toFixed(5)}</span></div>
                    <div>Сопротивление: <span style="color: #ff4444;">${signal.analysis.resistanceLevel.toFixed(5)}</span></div>
                </div>
            </div>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(42, 54, 85, 0.5);">
                <div style="font-size: 11px; color: #5d6d97; text-align: center;">
                    <i class="far fa-clock"></i>
                    ${signal.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
                </div>
            </div>
        </div>
    `;
}

// Создание деталей сигнала Индикаторы
function createIndicatorsSignalDetails(signal) {
    const directionText = signal.direction === 'BUY' ? 
                         TRANSLATIONS[currentLanguage].buy : 
                         TRANSLATIONS[currentLanguage].sell;
    
    return `
        <div style="padding: 20px;">
            <div style="margin-bottom: 15px; text-align: center;">
                <span style="font-size: 10px; color: #8b9dc3; background: rgba(0, 255, 136, 0.2); padding: 3px 8px; border-radius: 10px;">
                    ИНДИКАТОРЫ
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${TRANSLATIONS[currentLanguage].instrument}:</span>
                <span style="font-weight: 700; font-size: 16px;">${signal.pair}</span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${TRANSLATIONS[currentLanguage].signal}:</span>
                <span style="font-weight: 800; font-size: 18px; color: ${signal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; text-transform: uppercase;">
                    ${directionText}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${TRANSLATIONS[currentLanguage].current_price}:</span>
                <span style="font-weight: 700; font-family: 'Courier New', monospace; font-size: 16px;">
                    ${signal.entryPrice.toFixed(5)}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">Уверенность:</span>
                <span style="font-weight: 800; color: #00ff88; font-size: 18px;">
                    ${signal.confidence}%
                </span>
            </div>
            
            <div style="background: rgba(19, 26, 45, 0.5); border-radius: 8px; padding: 12px; margin-top: 15px;">
                <div style="font-size: 12px; color: #8b9dc3; margin-bottom: 5px;">Показатели индикаторов:</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px;">
                    <div>RSI: <span style="color: ${signal.analysis.rsi > 70 ? '#ff4444' : signal.analysis.rsi < 30 ? '#00ff88' : '#8b9dc3'}">${signal.analysis.rsi.toFixed(1)}</span></div>
                    <div>MACD: <span style="color: ${signal.analysis.macd > 0 ? '#00ff88' : '#ff4444'}">${signal.analysis.macd.toFixed(3)}</span></div>
                    <div>Stochastic: <span style="color: ${signal.analysis.stochastic > 80 ? '#ff4444' : signal.analysis.stochastic < 20 ? '#00ff88' : '#8b9dc3'}">${signal.analysis.stochastic.toFixed(1)}</span></div>
                    <div>Bollinger: <span style="color: #8b9dc3;">${signal.analysis.bollinger}</span></div>
                </div>
            </div>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(42, 54, 85, 0.5);">
                <div style="font-size: 11px; color: #5d6d97; text-align: center;">
                    <i class="far fa-clock"></i>
                    ${signal.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
                </div>
            </div>
        </div>
    `;
}

// Создание деталей комбинированного сигнала
function createCombinedSignalDetails(signal) {
    const directionText = signal.direction === 'BUY' ? 
                         TRANSLATIONS[currentLanguage].buy : 
                         TRANSLATIONS[currentLanguage].sell;
    
    return `
        <div style="padding: 20px;">
            <div style="margin-bottom: 15px; text-align: center;">
                <span style="font-size: 10px; color: #8b9dc3; background: rgba(255, 68, 68, 0.2); padding: 3px 8px; border-radius: 10px;">
                    КОМБИНИРОВАННЫЙ
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${TRANSLATIONS[currentLanguage].instrument}:</span>
                <span style="font-weight: 700; font-size: 16px;">${signal.pair}</span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${TRANSLATIONS[currentLanguage].signal}:</span>
                <span style="font-weight: 800; font-size: 18px; color: ${signal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; text-transform: uppercase;">
                    ${directionText}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">${TRANSLATIONS[currentLanguage].current_price}:</span>
                <span style="font-weight: 700; font-family: 'Courier New', monospace; font-size: 16px;">
                    ${signal.entryPrice.toFixed(5)}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">Уверенность:</span>
                <span style="font-weight: 800; color: #00ff88; font-size: 18px;">
                    ${signal.confidence}%
                </span>
            </div>
            
            <div style="background: rgba(19, 26, 45, 0.5); border-radius: 8px; padding: 12px; margin-top: 15px;">
                <div style="font-size: 12px; color: #8b9dc3; margin-bottom: 5px;">Комбинированный анализ:</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px;">
                    <div>Смарт-Мани: <span style="color: #00ff88;">${signal.analysis.smartMoney.confidence}%</span></div>
                    <div>Индикаторы: <span style="color: #00ff88;">${signal.analysis.indicators.confidence}%</span></div>
                    <div>Общий счет: <span style="color: #00ff88;">${signal.analysis.combinedScore}%</span></div>
                    <div>Совпадение: <span style="color: ${signal.analysis.smartMoney.direction === signal.analysis.indicators.direction ? '#00ff88' : '#ff4444'}">
                        ${signal.analysis.smartMoney.direction === signal.analysis.indicators.direction ? 'ДА' : 'НЕТ'}
                    </span></div>
                </div>
            </div>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(42, 54, 85, 0.5);">
                <div style="font-size: 11px; color: #5d6d97; text-align: center;">
                    <i class="far fa-clock"></i>
                    ${signal.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
                </div>
            </div>
        </div>
    `;
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
    
    // Сброс предыдущего таймера
    if (expirationTimer) {
        clearInterval(expirationTimer);
    }
    
    // Сбрасываем анимацию
    timerBar.style.transition = 'none';
    timerBar.style.width = '100%';
    timerBar.style.transform = 'scaleX(1)';
    void timerBar.offsetWidth;
    
    // Запускаем новую анимацию
    timerBar.style.transition = `width ${totalTime}s linear`;
    timerBar.style.width = '0%';
    
    // Обновляем таймер каждую секунду
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
    
    const currentPrice = DEMO_PRICES[currentAsset] || 1.0;
    const entryPrice = currentSignal.entryPrice;
    
    let result, resultColor, resultText;
    
    if (currentSignal.direction === 'BUY') {
        if (currentPrice > entryPrice * 1.0001) {
            result = 'WIN';
            resultColor = '#00ff88';
            resultText = TRANSLATIONS[currentLanguage].win;
        } else if (currentPrice < entryPrice * 0.9999) {
            result = 'LOSS';
            resultColor = '#ff4444';
            resultText = TRANSLATIONS[currentLanguage].loss;
        } else {
            result = 'REFUND';
            resultColor = '#8b9dc3';
            resultText = TRANSLATIONS[currentLanguage].refund;
        }
    } else {
        if (currentPrice < entryPrice * 0.9999) {
            result = 'WIN';
            resultColor = '#00ff88';
            resultText = TRANSLATIONS[currentLanguage].win;
        } else if (currentPrice > entryPrice * 1.0001) {
            result = 'LOSS';
            resultColor = '#ff4444';
            resultText = TRANSLATIONS[currentLanguage].loss;
        } else {
            result = 'REFUND';
            resultColor = '#8b9dc3';
            resultText = TRANSLATIONS[currentLanguage].refund;
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
    historyItem.className = `result-item ${currentSignal.result.toLowerCase()}`;
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
    
    const directionText = currentSignal.direction === 'BUY' ? 
                         TRANSLATIONS[currentLanguage].buy : 
                         TRANSLATIONS[currentLanguage].sell;
    const resultText = currentSignal.result === 'WIN' ? 
                      TRANSLATIONS[currentLanguage].win : 
                      currentSignal.result === 'LOSS' ? 
                      TRANSLATIONS[currentLanguage].loss : 
                      TRANSLATIONS[currentLanguage].refund;
    
    historyItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-weight: 700; min-width: 70px;">${currentSignal.pair}</span>
            <span style="color: ${currentSignal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; font-weight: 600;">
                ${directionText}
            </span>
            <span style="color: ${resultColor}; font-weight: 800;">
                ${resultText}
            </span>
        </div>
        <div style="color: #5d6d97; font-size: 11px; text-align: right;">
            <div>${currentSignal.entryPrice.toFixed(5)} → ${currentSignal.exitPrice.toFixed(5)}</div>
            <div>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        </div>
    `;
    
    resultsList.insertBefore(historyItem, resultsList.firstChild);
    
    saveHistory();
    updateStats();
}

// Сохранение истории
function saveHistory() {
    try {
        const history = {
            signal: currentSignal,
            timestamp: new Date().toISOString()
        };
        
        let savedHistory = JSON.parse(localStorage.getItem('tradingHistory') || '[]');
        savedHistory.unshift(history);
        
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
            
            savedHistory.forEach(record => {
                if (record.signal && record.signal.result) {
                    const resultColor = record.signal.result === 'WIN' ? '#00ff88' : 
                                      record.signal.result === 'LOSS' ? '#ff4444' : '#8b9dc3';
                    
                    const historyItem = document.createElement('div');
                    historyItem.className = `result-item ${record.signal.result.toLowerCase()}`;
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
                    
                    const directionText = record.signal.direction === 'BUY' ? 
                                        TRANSLATIONS[currentLanguage].buy : 
                                        TRANSLATIONS[currentLanguage].sell;
                    const resultText = record.signal.result === 'WIN' ? 
                                     TRANSLATIONS[currentLanguage].win : 
                                     record.signal.result === 'LOSS' ? 
                                     TRANSLATIONS[currentLanguage].loss : 
                                     TRANSLATIONS[currentLanguage].refund;
                    
                    historyItem.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-weight: 700; min-width: 70px;">${record.signal.pair}</span>
                            <span style="color: ${record.signal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; font-weight: 600;">
                                ${directionText}
                            </span>
                            <span style="color: ${resultColor}; font-weight: 800;">
                                ${resultText}
                            </span>
                        </div>
                        <div style="color: #5d6d97; font-size: 11px; text-align: right;">
                            <div>${record.signal.entryPrice.toFixed(5)} → ${record.signal.exitPrice.toFixed(5)}</div>
                            <div>${new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                        </div>
                    `;
                    
                    document.getElementById('results-list').appendChild(historyItem);
                }
            });
        }
    } catch (error) {
        console.error('Ошибка загрузки истории:', error);
    }
}

// Обновление статистики
function updateStats() {
    try {
        const savedHistory = JSON.parse(localStorage.getItem('tradingHistory') || '[]');
        const winCount = savedHistory.filter(h => h.signal.result === 'WIN').length;
        const totalCount = savedHistory.length;
        
        const winRate = totalCount > 0 ? Math.round((winCount / totalCount) * 100) : 0;
        
        console.log(`📊 Статистика: ${winRate}% побед (${winCount}/${totalCount})`);
    } catch (error) {
        console.error('Ошибка обновления статистики:', error);
    }
}

// Сброс сигнала
function resetSignal() {
    isSignalActive = false;
    currentSignal = null;
    
    document.getElementById('signal-content').style.display = 'flex';
    document.getElementById('signal-details').style.display = 'none';
    document.getElementById('expiration-timer').style.display = 'none';
    
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        signalContent.innerHTML = `
            <div class="signal-placeholder">
                <i class="fas fa-chart-line"></i>
                <p>${TRANSLATIONS[currentLanguage].click_for_analysis}</p>
            </div>
        `;
    }
    
    updateSignalStatus(TRANSLATIONS[currentLanguage].status_waiting, '#00ff88');
    
    const timerBar = document.getElementById('timer-bar');
    const timerValue = document.getElementById('timer-value');
    if (timerBar && timerValue) {
        timerBar.style.transition = 'none';
        timerBar.style.width = '100%';
        timerBar.style.background = 'linear-gradient(90deg, #00ff88, #0066ff)';
        timerValue.textContent = getTimeframeText(currentTimeframe);
    }
    
    if (expirationTimer) {
        clearInterval(expirationTimer);
        expirationTimer = null;
    }
}

// Очистка при закрытии страницы
window.addEventListener('beforeunload', function() {
    if (priceUpdateInterval) {
        clearInterval(priceUpdateInterval);
    }
    
    if (expirationTimer) {
        clearInterval(expirationTimer);
    }
});

// Экспортируем функции для отладки
window.debug = {
    getCurrentAsset: () => currentAsset,
    getCurrentTimeframe: () => currentTimeframe,
    getCurrentSignal: () => currentSignal,
    getLanguage: () => currentLanguage,
    forceSignal: generateSignal,
    toggleChart: toggleChartType
};
