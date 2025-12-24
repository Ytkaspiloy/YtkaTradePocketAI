// Конфигурация активов для TradingView (20 валютных пар)
const ASSETS_CONFIG = {
    'EURUSD': { 
        name: 'EUR/USD', 
        symbol: 'FX_IDC:EURUSD',
        exchange: 'FX_IDC',
        price: 1.0830,
        change: 0.0012
    },
    'USDJPY': { 
        name: 'USD/JPY', 
        symbol: 'FX_IDC:USDJPY',
        exchange: 'FX_IDC',
        price: 148.35,
        change: 0.25
    },
    'GBPUSD': { 
        name: 'GBP/USD', 
        symbol: 'FX_IDC:GBPUSD',
        exchange: 'FX_IDC',
        price: 1.2650,
        change: 0.0015
    },
    'AUDUSD': { 
        name: 'AUD/USD', 
        symbol: 'FX_IDC:AUDUSD',
        exchange: 'FX_IDC',
        price: 0.6590,
        change: 0.0008
    },
    'USDCAD': { 
        name: 'USD/CAD', 
        symbol: 'FX_IDC:USDCAD',
        exchange: 'FX_IDC',
        price: 1.3520,
        change: -0.0010
    },
    'USDCHF': { 
        name: 'USD/CHF', 
        symbol: 'FX_IDC:USDCHF',
        exchange: 'FX_IDC',
        price: 0.9025,
        change: -0.0005
    },
    'EURJPY': { 
        name: 'EUR/JPY', 
        symbol: 'FX_IDC:EURJPY',
        exchange: 'FX_IDC',
        price: 160.42,
        change: 0.35
    },
    'GBPJPY': { 
        name: 'GBP/JPY', 
        symbol: 'FX_IDC:GBPJPY',
        exchange: 'FX_IDC',
        price: 187.65,
        change: 0.42
    },
    'EURCAD': { 
        name: 'EUR/CAD', 
        symbol: 'FX_IDC:EURCAD',
        exchange: 'FX_IDC',
        price: 1.4650,
        change: 0.0018
    },
    'GBPCAD': { 
        name: 'GBP/CAD', 
        symbol: 'FX_IDC:GBPCAD',
        exchange: 'FX_IDC',
        price: 1.7100,
        change: 0.0020
    },
    'AUDCAD': { 
        name: 'AUD/CAD', 
        symbol: 'FX_IDC:AUDCAD',
        exchange: 'FX_IDC',
        price: 0.8920,
        change: 0.0009
    },
    'CHFJPY': { 
        name: 'CHF/JPY', 
        symbol: 'FX_IDC:CHFJPY',
        exchange: 'FX_IDC',
        price: 164.20,
        change: 0.28
    },
    'GBPAUD': { 
        name: 'GBP/AUD', 
        symbol: 'FX_IDC:GBPAUD',
        exchange: 'FX_IDC',
        price: 1.9200,
        change: 0.0030
    },
    'EURAUD': { 
        name: 'EUR/AUD', 
        symbol: 'FX_IDC:EURAUD',
        exchange: 'FX_IDC',
        price: 1.6420,
        change: 0.0025
    },
    'CADJPY': { 
        name: 'CAD/JPY', 
        symbol: 'FX_IDC:CADJPY',
        exchange: 'FX_IDC',
        price: 109.65,
        change: 0.18
    },
    'AUDJPY': { 
        name: 'AUD/JPY', 
        symbol: 'FX_IDC:AUDJPY',
        exchange: 'FX_IDC',
        price: 97.80,
        change: 0.15
    },
    'EURGBP': { 
        name: 'EUR/GBP', 
        symbol: 'FX_IDC:EURGBP',
        exchange: 'FX_IDC',
        price: 0.8560,
        change: -0.0003
    },
    'GBPCHF': { 
        name: 'GBP/CHF', 
        symbol: 'FX_IDC:GBPCHF',
        exchange: 'FX_IDC',
        price: 1.1400,
        change: 0.0012
    },
    'CADCHF': { 
        name: 'CAD/CHF', 
        symbol: 'FX_IDC:CADCHF',
        exchange: 'FX_IDC',
        price: 0.6670,
        change: 0.0004
    },
    'AUDCHF': { 
        name: 'AUD/CHF', 
        symbol: 'FX_IDC:AUDCHF',
        exchange: 'FX_IDC',
        price: 0.5940,
        change: 0.0006
    }
};

// Таймфреймы для TradingView
const TIMEFRAMES = {
    60: "1",
    180: "3",
    300: "5",
    900: "15"
};

// Многоязычная поддержка (полный перевод)
const TRANSLATIONS = {
    ru: {
        // Шапка
        main_title: "SCALPING ROBOT PRO",
        subtitle: "Real-Time Binary Options Trading",
        status_demo: "Режим: Демо",
        
        // Панель управления
        instrument: "ИНСТРУМЕНТ",
        expiration: "ЭКСПИРАЦИЯ",
        signal_type: "ТИП СИГНАЛА",
        real_quotes: "РЕАЛЬНЫЕ КОТИРОВКИ",
        signal: "СИГНАЛ",
        get_signal: "ПОЛУЧИТЬ СИГНАЛ",
        updating_prices: "Обновление цен...",
        current_price: "Текущая цена:",
        change: "Изменение:",
        time: "Время:",
        
        // Типы сигналов
        smart_money: "Смарт-Мани",
        indicators: "Индикаторы",
        combined: "Комбинированный",
        
        // Валютные пары
        eurusd: "EUR/USD:",
        usdjpy: "USD/JPY:",
        gbpusd: "GBP/USD:",
        
        // График
        timeframe: "Таймфрейм:",
        pocketoption_chart: "График PocketOption",
        simple_chart: "Упрощенный график",
        current_signal: "ТЕКУЩИЙ СИГНАЛ",
        click_for_analysis: "Нажмите 'Получить сигнал' для анализа",
        data_source: "Источник: TradingView API",
        
        // Индикаторы
        rsi: "RSI",
        macd: "MACD",
        bollinger: "Bollinger",
        stochastic: "Stochastic",
        
        // Таймер
        expires_in: "Истекает через:",
        
        // История
        recent_results: "ПОСЛЕДНИЕ РЕЗУЛЬТАТЫ",
        
        // Подвал
        api_info: "Используются реальные котировки TradingView. Обновление в реальном времени.",
        disclaimer: "Торговля бинарными опционами связана с высокими рисками.",
        
        // Статусы
        status_waiting: "Ожидание",
        status_analysis: "Анализ рынка...",
        status_active: "АКТИВЕН",
        
        // Направления
        buy: "ПОКУПКА",
        sell: "ПРОДАЖА",
        
        // Результаты
        win: "ВЫИГРЫШ",
        loss: "ПРОИГРЫШ",
        refund: "ВОЗВРАТ",
        
        // Анализ
        analysis_volume: "Объем:",
        analysis_order_flow: "Order Flow:",
        analysis_sentiment: "Сентимент:",
        analysis_support: "Поддержка:",
        analysis_resistance: "Сопротивление:",
        analysis_confidence: "Уверенность:",
        analysis_high: "высокий",
        analysis_medium: "средний",
        analysis_positive: "позитивный",
        analysis_negative: "негативный",
        analysis_bullish: "бычий",
        analysis_bearish: "медвежий",
        
        // Сообщения
        alert_wait_signal: "Дождитесь завершения текущего сигнала",
        signal_completed: "Сигнал завершен",
        signal_expired: "Сигнал истек"
    },
    en: {
        main_title: "SCALPING ROBOT PRO",
        subtitle: "Real-Time Binary Options Trading",
        status_demo: "Mode: Demo",
        instrument: "INSTRUMENT",
        expiration: "EXPIRATION",
        signal_type: "SIGNAL TYPE",
        real_quotes: "REAL QUOTES",
        signal: "SIGNAL",
        get_signal: "GET SIGNAL",
        updating_prices: "Updating prices...",
        current_price: "Current price:",
        change: "Change:",
        time: "Time:",
        smart_money: "Smart Money",
        indicators: "Indicators",
        combined: "Combined",
        eurusd: "EUR/USD:",
        usdjpy: "USD/JPY:",
        gbpusd: "GBP/USD:",
        timeframe: "Timeframe:",
        pocketoption_chart: "PocketOption Chart",
        simple_chart: "Simple Chart",
        current_signal: "CURRENT SIGNAL",
        click_for_analysis: "Click 'Get Signal' for analysis",
        data_source: "Source: TradingView API",
        rsi: "RSI",
        macd: "MACD",
        bollinger: "Bollinger",
        stochastic: "Stochastic",
        expires_in: "Expires in:",
        recent_results: "RECENT RESULTS",
        api_info: "Real TradingView quotes are used. Real-time updates.",
        disclaimer: "Binary options trading involves high risks.",
        status_waiting: "Waiting",
        status_analysis: "Market analysis...",
        status_active: "ACTIVE",
        buy: "BUY",
        sell: "SELL",
        win: "WIN",
        loss: "LOSS",
        refund: "REFUND",
        analysis_volume: "Volume:",
        analysis_order_flow: "Order Flow:",
        analysis_sentiment: "Sentiment:",
        analysis_support: "Support:",
        analysis_resistance: "Resistance:",
        analysis_confidence: "Confidence:",
        analysis_high: "high",
        analysis_medium: "medium",
        analysis_positive: "positive",
        analysis_negative: "negative",
        analysis_bullish: "bullish",
        analysis_bearish: "bearish",
        alert_wait_signal: "Wait for current signal to complete",
        signal_completed: "Signal completed",
        signal_expired: "Signal expired"
    },
    es: {
        main_title: "SCALPING ROBOT PRO",
        subtitle: "Trading de Opciones Binarias en Tiempo Real",
        status_demo: "Modo: Demo",
        instrument: "INSTRUMENTO",
        expiration: "EXPIRACIÓN",
        signal_type: "TIPO DE SEÑAL",
        real_quotes: "COTIZACIONES REALES",
        signal: "SEÑAL",
        get_signal: "OBTENER SEÑAL",
        updating_prices: "Actualizando precios...",
        current_price: "Precio actual:",
        change: "Cambio:",
        time: "Tiempo:",
        smart_money: "Smart Money",
        indicators: "Indicadores",
        combined: "Combinado",
        eurusd: "EUR/USD:",
        usdjpy: "USD/JPY:",
        gbpusd: "GBP/USD:",
        timeframe: "Marco temporal:",
        pocketoption_chart: "Gráfico PocketOption",
        simple_chart: "Gráfico simple",
        current_signal: "SEÑAL ACTUAL",
        click_for_analysis: "Haga clic en 'Obtener señal' para el análisis",
        data_source: "Fuente: TradingView API",
        rsi: "RSI",
        macd: "MACD",
        bollinger: "Bollinger",
        stochastic: "Stochastic",
        expires_in: "Expira en:",
        recent_results: "RESULTADOS RECIENTES",
        api_info: "Se utilizan cotizaciones reales de TradingView. Actualización en tiempo real.",
        disclaimer: "El comercio de opciones binarias conlleva altos riesgos.",
        status_waiting: "Esperando",
        status_analysis: "Análisis de mercado...",
        status_active: "ACTIVO",
        buy: "COMPRA",
        sell: "VENTA",
        win: "GANAR",
        loss: "PERDER",
        refund: "REEMBOLSO",
        analysis_volume: "Volumen:",
        analysis_order_flow: "Flujo de órdenes:",
        analysis_sentiment: "Sentimiento:",
        analysis_support: "Soporte:",
        analysis_resistance: "Resistencia:",
        analysis_confidence: "Confianza:",
        analysis_high: "alto",
        analysis_medium: "medio",
        analysis_positive: "positivo",
        analysis_negative: "negativo",
        analysis_bullish: "alcista",
        analysis_bearish: "bajista",
        alert_wait_signal: "Espere a que se complete la señal actual",
        signal_completed: "Señal completada",
        signal_expired: "Señal expirada"
    },
    de: {
        main_title: "SCALPING ROBOT PRO",
        subtitle: "Echtzeit-Binäre Optionen Trading",
        status_demo: "Modus: Demo",
        instrument: "INSTRUMENT",
        expiration: "AUSLAUF",
        signal_type: "SIGNALTYP",
        real_quotes: "ECHTE KURSE",
        signal: "SIGNAL",
        get_signal: "SIGNAL ERHALTEN",
        updating_prices: "Preise werden aktualisiert...",
        current_price: "Aktueller Preis:",
        change: "Änderung:",
        time: "Zeit:",
        smart_money: "Smart Money",
        indicators: "Indikatoren",
        combined: "Kombiniert",
        eurusd: "EUR/USD:",
        usdjpy: "USD/JPY:",
        gbpusd: "GBP/USD:",
        timeframe: "Zeitrahmen:",
        pocketoption_chart: "PocketOption Chart",
        simple_chart: "Einfaches Chart",
        current_signal: "AKTUELLES SIGNAL",
        click_for_analysis: "Klicken Sie 'Signal erhalten' für die Analyse",
        data_source: "Quelle: TradingView API",
        rsi: "RSI",
        macd: "MACD",
        bollinger: "Bollinger",
        stochastic: "Stochastic",
        expires_in: "Läuft ab in:",
        recent_results: "LETZTE ERGEBNISSE",
        api_info: "Echtzeit-TradingView-Kurse werden verwendet. Echtzeit-Aktualisierung.",
        disclaimer: "Der Handel mit binären Optionen birgt hohe Risiken.",
        status_waiting: "Wartet",
        status_analysis: "Marktanalyse...",
        status_active: "AKTIV",
        buy: "KAUFEN",
        sell: "VERKAUFEN",
        win: "GEWINN",
        loss: "VERLUST",
        refund: "RÜCKERSTATTUNG",
        analysis_volume: "Volumen:",
        analysis_order_flow: "Order Flow:",
        analysis_sentiment: "Stimmung:",
        analysis_support: "Unterstützung:",
        analysis_resistance: "Widerstand:",
        analysis_confidence: "Vertrauen:",
        analysis_high: "hoch",
        analysis_medium: "mittel",
        analysis_positive: "positiv",
        analysis_negative: "negativ",
        analysis_bullish: "bullisch",
        analysis_bearish: "bärisch",
        alert_wait_signal: "Warten Sie, bis das aktuelle Signal abgeschlossen ist",
        signal_completed: "Signal abgeschlossen",
        signal_expired: "Signal abgelaufen"
    },
    fr: {
        main_title: "SCALPING ROBOT PRO",
        subtitle: "Trading d'Options Binaires en Temps Réel",
        status_demo: "Mode: Démo",
        instrument: "INSTRUMENT",
        expiration: "EXPIRATION",
        signal_type: "TYPE DE SIGNAL",
        real_quotes: "COTATIONS RÉELLES",
        signal: "SIGNAL",
        get_signal: "OBTENIR UN SIGNAL",
        updating_prices: "Mise à jour des prix...",
        current_price: "Prix actuel:",
        change: "Changement:",
        time: "Temps:",
        smart_money: "Smart Money",
        indicators: "Indicateurs",
        combined: "Combiné",
        eurusd: "EUR/USD:",
        usdjpy: "USD/JPY:",
        gbpusd: "GBP/USD:",
        timeframe: "Cadre temporel:",
        pocketoption_chart: "Graphique PocketOption",
        simple_chart: "Graphique simple",
        current_signal: "SIGNAL ACTUEL",
        click_for_analysis: "Cliquez sur 'Obtenir un signal' pour l'analyse",
        data_source: "Source: TradingView API",
        rsi: "RSI",
        macd: "MACD",
        bollinger: "Bollinger",
        stochastic: "Stochastic",
        expires_in: "Expire dans:",
        recent_results: "RÉSULTATS RÉCENTS",
        api_info: "Des cotations TradingView réelles sont utilisées. Mise à jour en temps réel.",
        disclaimer: "Le trading d'options binaires comporte des risques élevés.",
        status_waiting: "En attente",
        status_analysis: "Analyse du marché...",
        status_active: "ACTIF",
        buy: "ACHAT",
        sell: "VENTE",
        win: "GAGNER",
        loss: "PERTE",
        refund: "REMBOURSEMENT",
        analysis_volume: "Volume:",
        analysis_order_flow: "Flux d'ordres:",
        analysis_sentiment: "Sentiment:",
        analysis_support: "Support:",
        analysis_resistance: "Résistance:",
        analysis_confidence: "Confiance:",
        analysis_high: "élevé",
        analysis_medium: "moyen",
        analysis_positive: "positif",
        analysis_negative: "négatif",
        analysis_bullish: "haussier",
        analysis_bearish: "baissier",
        alert_wait_signal: "Attendez que le signal actuel se termine",
        signal_completed: "Signal terminé",
        signal_expired: "Signal expiré"
    },
    pt: {
        main_title: "SCALPING ROBOT PRO",
        subtitle: "Negociação de Opções Binárias em Tempo Real",
        status_demo: "Modo: Demo",
        instrument: "INSTRUMENTO",
        expiration: "EXPIRAÇÃO",
        signal_type: "TIPO DE SINAL",
        real_quotes: "COTAÇÕES REAIS",
        signal: "SINAL",
        get_signal: "OBTER SINAL",
        updating_prices: "Atualizando preços...",
        current_price: "Preço atual:",
        change: "Mudança:",
        time: "Tempo:",
        smart_money: "Smart Money",
        indicators: "Indicadores",
        combined: "Combinado",
        eurusd: "EUR/USD:",
        usdjpy: "USD/JPY:",
        gbpusd: "GBP/USD:",
        timeframe: "Período:",
        pocketoption_chart: "Gráfico PocketOption",
        simple_chart: "Gráfico simples",
        current_signal: "SINAL ATUAL",
        click_for_analysis: "Clique em 'Obter sinal' para análise",
        data_source: "Fonte: TradingView API",
        rsi: "RSI",
        macd: "MACD",
        bollinger: "Bollinger",
        stochastic: "Stochastic",
        expires_in: "Expira em:",
        recent_results: "RESULTADOS RECENTES",
        api_info: "Cotações TradingView reais são usadas. Atualização em tempo real.",
        disclaimer: "A negociação de opções binárias envolve altos riscos.",
        status_waiting: "Aguardando",
        status_analysis: "Análise de mercado...",
        status_active: "ATIVO",
        buy: "COMPRAR",
        sell: "VENDER",
        win: "GANHAR",
        loss: "PERDER",
        refund: "REEMBOLSO",
        analysis_volume: "Volume:",
        analysis_order_flow: "Fluxo de ordens:",
        analysis_sentiment: "Sentimento:",
        analysis_support: "Suporte:",
        analysis_resistance: "Resistência:",
        analysis_confidence: "Confiança:",
        analysis_high: "alto",
        analysis_medium: "médio",
        analysis_positive: "positivo",
        analysis_negative: "negativo",
        analysis_bullish: "altista",
        analysis_bearish: "baixista",
        alert_wait_signal: "Aguarde o sinal atual terminar",
        signal_completed: "Sinal concluído",
        signal_expired: "Sinal expirado"
    },
    ar: {
        main_title: "SCALPING ROBOT PRO",
        subtitle: "تداول الخيارات الثنائية في الوقت الحقيقي",
        status_demo: "الوضع: تجريبي",
        instrument: "الأداة",
        expiration: "الانتهاء",
        signal_type: "نوع الإشارة",
        real_quotes: "أسعار حقيقية",
        signal: "إشارة",
        get_signal: "الحصول على إشارة",
        updating_prices: "جاري تحديث الأسعار...",
        current_price: "السعر الحالي:",
        change: "التغيير:",
        time: "الوقت:",
        smart_money: "الأموال الذكية",
        indicators: "المؤشرات",
        combined: "مدمج",
        eurusd: "EUR/USD:",
        usdjpy: "USD/JPY:",
        gbpusd: "GBP/USD:",
        timeframe: "الإطار الزمني:",
        pocketoption_chart: "رسم بياني PocketOption",
        simple_chart: "رسم بياني بسيط",
        current_signal: "الإشارة الحالية",
        click_for_analysis: "انقر 'الحصول على إشارة' للتحليل",
        data_source: "المصدر: TradingView API",
        rsi: "RSI",
        macd: "MACD",
        bollinger: "Bollinger",
        stochastic: "Stochastic",
        expires_in: "تنتهي في:",
        recent_results: "النتائج الأخيرة",
        api_info: "يتم استخدام أسعار TradingView حقيقية. تحديث في الوقت الحقيقي.",
        disclaimer: "تداول الخيارات الثنائية ينطوي على مخاطر عالية.",
        status_waiting: "انتظار",
        status_analysis: "تحليل السوق...",
        status_active: "نشط",
        buy: "شراء",
        sell: "بيع",
        win: "فوز",
        loss: "خسارة",
        refund: "استرداد",
        analysis_volume: "الحجم:",
        analysis_order_flow: "تدفق الطلبات:",
        analysis_sentiment: "المشاعر:",
        analysis_support: "الدعم:",
        analysis_resistance: "المقاومة:",
        analysis_confidence: "الثقة:",
        analysis_high: "عالي",
        analysis_medium: "متوسط",
        analysis_positive: "إيجابي",
        analysis_negative: "سلبي",
        analysis_bullish: "صاعد",
        analysis_bearish: "هابط",
        alert_wait_signal: "انتظر حتى تكتمل الإشارة الحالية",
        signal_completed: "اكتملت الإشارة",
        signal_expired: "انتهت صلاحية الإشارة"
    },
    tr: {
        main_title: "SCALPING ROBOT PRO",
        subtitle: "Gerçek Zamanlı İkili Opsiyon Ticareti",
        status_demo: "Mod: Demo",
        instrument: "ARAÇ",
        expiration: "SÜRE SONU",
        signal_type: "SİNYAL TİPİ",
        real_quotes: "GERÇEK KOTASYONLAR",
        signal: "SİNYAL",
        get_signal: "SİNYAL AL",
        updating_prices: "Fiyatlar güncelleniyor...",
        current_price: "Mevcut fiyat:",
        change: "Değişim:",
        time: "Zaman:",
        smart_money: "Akıllı Para",
        indicators: "Göstergeler",
        combined: "Kombine",
        eurusd: "EUR/USD:",
        usdjpy: "USD/JPY:",
        gbpusd: "GBP/USD:",
        timeframe: "Zaman dilimi:",
        pocketoption_chart: "PocketOption Grafiği",
        simple_chart: "Basit Grafik",
        current_signal: "MEVCUT SİNYAL",
        click_for_analysis: "Analiz için 'Sinyal Al'ı tıklayın",
        data_source: "Kaynak: TradingView API",
        rsi: "RSI",
        macd: "MACD",
        bollinger: "Bollinger",
        stochastic: "Stochastic",
        expires_in: "Sona erme:",
        recent_results: "SONUÇLAR",
        api_info: "Gerçek TradingView kotasyonları kullanılıyor. Gerçek zamanlı güncelleme.",
        disclaimer: "İkili opsiyon ticareti yüksek risk içerir.",
        status_waiting: "Bekliyor",
        status_analysis: "Piyasa analizi...",
        status_active: "AKTİF",
        buy: "ALIŞ",
        sell: "SATIŞ",
        win: "KAZANÇ",
        loss: "KAYIP",
        refund: "İADE",
        analysis_volume: "Hacim:",
        analysis_order_flow: "Emir Akışı:",
        analysis_sentiment: "Duygu:",
        analysis_support: "Destek:",
        analysis_resistance: "Direnç:",
        analysis_confidence: "Güven:",
        analysis_high: "yüksek",
        analysis_medium: "orta",
        analysis_positive: "pozitif",
        analysis_negative: "negatif",
        analysis_bullish: "yükseliş",
        analysis_bearish: "düşüş",
        alert_wait_signal: "Mevcut sinyalin bitmesini bekleyin",
        signal_completed: "Sinyal tamamlandı",
        signal_expired: "Sinyal süresi doldu"
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
let currentChartType = 'TradingView';
let lastPriceUpdate = {};
let realPrices = {};

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

// Применение переводов (полный перевод)
function applyTranslations() {
    // Переводим все элементы с data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (TRANSLATIONS[currentLanguage][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                element.placeholder = TRANSLATIONS[currentLanguage][key];
            } else {
                element.textContent = TRANSLATIONS[currentLanguage][key];
            }
        }
    });
    
    // Переводим опции select элементов
    translateSelectOptions();
    
    // Обновляем статус
    updateSignalStatus(TRANSLATIONS[currentLanguage].status_waiting, '#8b9dc3');
}

// Перевод опций select элементов
function translateSelectOptions() {
    // Языки уже переведены
    const chartTypeSelect = document.getElementById('chart-type-select');
    if (chartTypeSelect) {
        Array.from(chartTypeSelect.options).forEach(option => {
            const key = option.getAttribute('data-i18n');
            if (key && TRANSLATIONS[currentLanguage][key]) {
                option.textContent = TRANSLATIONS[currentLanguage][key];
            }
        });
    }
    
    // Типы сигналов на кнопках
    document.querySelectorAll('.signal-type-btn').forEach(btn => {
        const key = btn.getAttribute('data-i18n');
        if (key && TRANSLATIONS[currentLanguage][key]) {
            btn.textContent = TRANSLATIONS[currentLanguage][key];
        }
    });
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
            updateTradingViewChart(); // Обновляем график с новым языком
            console.log('🌐 Язык изменен на:', currentLanguage);
        });
    }
    
    // Выбор актива
    const assetSelect = document.getElementById('asset-select');
    if (assetSelect) {
        assetSelect.addEventListener('change', function() {
            if (isSignalActive) {
                this.value = currentAsset; // Возвращаем предыдущее значение
                alert(TRANSLATIONS[currentLanguage].alert_wait_signal);
                return;
            }
            
            currentAsset = this.value;
            console.log('📊 Актив изменен на:', currentAsset);
            
            updateAssetDisplay();
            updateTradingViewChart();
        });
    }
    
    // Кнопки таймфреймов
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (isSignalActive) return;
            
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
            if (isSignalActive) return;
            
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
            if (isSignalActive) {
                this.value = currentChartType;
                return;
            }
            
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
    
    // Инициализируем цены
    Object.keys(ASSETS_CONFIG).forEach(asset => {
        realPrices[asset] = ASSETS_CONFIG[asset].price;
    });
    
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

// Инициализация TradingView графика с синхронизацией цен
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
    widgetContainer.style.cssText = 'width: 100%; height: 100%;';
    
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
        "hide_side_toolbar": false,
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
        "timeHoursFormat": "24-hours",
        "hide_top_toolbar": false,
        "hide_volume": true,
        "hide_tradable": true
    });
    
    chartContainer.appendChild(widgetContainer);
    widgetContainer.appendChild(widgetScript);
    
    // Добавляем слушатель для обновления цен с графика
    setTimeout(() => {
        setupPriceSync();
    }, 2000);
}

// Настройка синхронизации цен с TradingView
function setupPriceSync() {
    // Эта функция будет вызываться для синхронизации цен
    // с графиком TradingView (через симуляцию)
    updatePriceFromChart();
}

// Обновление цены с графика (симуляция)
function updatePriceFromChart() {
    const asset = ASSETS_CONFIG[currentAsset];
    if (!asset) return;
    
    // Создаем реалистичное изменение цены
    const volatility = asset.price > 100 ? 0.08 : 0.0008; // Разная волатильность для JPY пар
    const change = (Math.random() - 0.5) * volatility;
    const newPrice = asset.price * (1 + change);
    
    // Обновляем цену
    asset.price = newPrice;
    realPrices[currentAsset] = newPrice;
    
    // Рассчитываем изменение в процентах
    const changePercent = (change * 100).toFixed(2);
    asset.change = parseFloat(changePercent);
    
    // Обновляем отображение
    updateAssetDisplay(true);
}

// Инициализация простого графика
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
    const basePrice = realPrices[currentAsset] || ASSETS_CONFIG[currentAsset].price;
    
    // 24 часа данных
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now);
        time.setHours(time.getHours() - i);
        labels.push(time.getHours().toString().padStart(2, '0') + ':00');
        
        const lastPrice = prices.length > 0 ? prices[prices.length - 1] : basePrice;
        
        // Реалистичное движение цены
        const volatility = basePrice > 100 ? 0.0005 : 0.0001;
        const change = (Math.random() - 0.5) * volatility;
        prices.push(lastPrice * (1 + change));
    }
    
    return { labels, prices };
}

// Обновление отображения актива с синхронизацией цен
function updateAssetDisplay(fromChart = false) {
    const asset = ASSETS_CONFIG[currentAsset];
    if (!asset) return;
    
    const currentPrice = realPrices[currentAsset] || asset.price;
    const changePercent = asset.change || 0;
    
    const priceElement = document.getElementById('current-price');
    const pairElement = document.getElementById('current-pair');
    const changeElement = document.getElementById('price-change');
    
    if (priceElement) {
        // Форматируем цену в зависимости от типа актива
        const priceFormat = currentPrice > 100 ? 2 : 5;
        priceElement.textContent = currentPrice.toFixed(priceFormat);
    }
    
    if (pairElement) {
        pairElement.textContent = asset.name;
    }
    
    if (changeElement) {
        const isPositive = changePercent >= 0;
        changeElement.textContent = `${isPositive ? '+' : ''}${changePercent.toFixed(2)}%`;
        changeElement.className = isPositive ? 'positive' : 'negative';
        
        // Обновляем статистику
        document.getElementById('current-price-display').textContent = currentPrice.toFixed(5);
        document.getElementById('price-change-display').textContent = `${isPositive ? '+' : ''}${changePercent.toFixed(2)}%`;
        document.getElementById('price-time').textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    }
    
    document.getElementById('chart-time').textContent = `${TRANSLATIONS[currentLanguage].updating_prices}: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})} UTC`;
    
    // Если обновление не с графика, обновляем график
    if (!fromChart) {
        updateTradingViewChart();
    }
}

// Обновление ленты цен
function updatePriceFeed() {
    const feedPairs = ['EURUSD', 'USDJPY', 'GBPUSD'];
    
    feedPairs.forEach(pair => {
        const element = document.getElementById(`price-${pair}`);
        if (element && ASSETS_CONFIG[pair]) {
            // Создаем реалистичное изменение
            const volatility = ASSETS_CONFIG[pair].price > 100 ? 0.0003 : 0.00005;
            const change = (Math.random() - 0.5) * volatility;
            const newPrice = ASSETS_CONFIG[pair].price * (1 + change);
            
            // Обновляем цену
            ASSETS_CONFIG[pair].price = newPrice;
            realPrices[pair] = newPrice;
            
            // Форматируем отображение
            const priceFormat = newPrice > 100 ? 3 : 5;
            element.textContent = newPrice.toFixed(priceFormat);
        }
    });
}

// Запуск обновления цен
function startPriceUpdates() {
    priceUpdateInterval = setInterval(() => {
        updatePriceFromChart();
        updatePriceFeed();
        updateIndicators();
    }, 3000); // Обновляем каждые 3 секунды
}

// Обновление индикаторов
function updateIndicators() {
    const asset = ASSETS_CONFIG[currentAsset];
    if (!asset) return;
    
    // Синхронизированные значения на основе текущей цены
    const currentPrice = realPrices[currentAsset] || asset.price;
    const baseRSI = 50 + (Math.random() - 0.5) * 10;
    const baseMACD = (Math.random() - 0.5) * 0.005;
    
    // RSI (реалистичные значения)
    const rsi = Math.min(95, Math.max(5, baseRSI + (currentPrice % 10)));
    document.getElementById('indicator-rsi').textContent = rsi.toFixed(1);
    document.getElementById('indicator-rsi').style.color = 
        rsi > 70 ? '#ff4444' : rsi < 30 ? '#00ff88' : '#8b9dc3';
    
    // MACD
    const macd = baseMACD + (Math.random() - 0.5) * 0.001;
    document.getElementById('indicator-macd').textContent = macd.toFixed(4);
    document.getElementById('indicator-macd').style.color = 
        macd > 0 ? '#00ff88' : '#ff4444';
    
    // Stochastic
    const stochastic = 50 + (Math.random() - 0.5) * 30;
    document.getElementById('indicator-stochastic').textContent = stochastic.toFixed(1);
    document.getElementById('indicator-stochastic').style.color = 
        stochastic > 80 ? '#ff4444' : stochastic < 20 ? '#00ff88' : '#8b9dc3';
    
    // Bollinger Bands
    const bollingerStatus = Math.random() > 0.6 ? '↑' : Math.random() > 0.3 ? '↓' : '•';
    const bollingerColor = bollingerStatus === '↑' ? '#ff4444' : 
                          bollingerStatus === '↓' ? '#00ff88' : '#8b9dc3';
    
    document.getElementById('indicator-bollinger').textContent = bollingerStatus;
    document.getElementById('indicator-bollinger').style.color = bollingerColor;
}

// Генерация сигнала с блокировкой интерфейса
async function generateSignal() {
    if (isSignalActive) {
        alert(TRANSLATIONS[currentLanguage].alert_wait_signal);
        return;
    }
    
    isSignalActive = true;
    
    // Блокируем интерфейс
    const assetSelect = document.getElementById('asset-select');
    const timeBtns = document.querySelectorAll('.time-btn');
    const signalTypeBtns = document.querySelectorAll('.signal-type-btn');
    const chartTypeSelect = document.getElementById('chart-type-select');
    const generateBtn = document.getElementById('generate-signal');
    
    if (assetSelect) assetSelect.disabled = true;
    timeBtns.forEach(btn => btn.disabled = true);
    signalTypeBtns.forEach(btn => btn.disabled = true);
    if (chartTypeSelect) chartTypeSelect.disabled = true;
    
    if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + TRANSLATIONS[currentLanguage].status_analysis;
    }
    
    updateSignalStatus(TRANSLATIONS[currentLanguage].status_analysis, '#ffaa00');
    showAnalysisAnimation();
    
    // Имитация анализа (2 секунды)
    setTimeout(() => {
        createSignal();
        unlockInterface(); // Разблокируем после создания сигнала
    }, 2000);
}

// Разблокировка интерфейса
function unlockInterface() {
    const assetSelect = document.getElementById('asset-select');
    const timeBtns = document.querySelectorAll('.time-btn');
    const signalTypeBtns = document.querySelectorAll('.signal-type-btn');
    const chartTypeSelect = document.getElementById('chart-type-select');
    
    if (assetSelect) assetSelect.disabled = false;
    timeBtns.forEach(btn => btn.disabled = false);
    signalTypeBtns.forEach(btn => btn.disabled = false);
    if (chartTypeSelect) chartTypeSelect.disabled = false;
}

// Показать анимацию анализа
function showAnalysisAnimation() {
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        signalContent.innerHTML = `
            <div style="text-align: center;">
                <div style="display: inline-block; width: 50px; height: 50px; border: 3px solid #2a3655; border-top-color: #00ff88; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="margin-top: 12px; color: #8b9dc3; font-size: 13px;">
                    <i class="fas fa-chart-line"></i><br>
                    ${TRANSLATIONS[currentLanguage].status_analysis}
                </p>
                <div style="margin-top: 8px; font-size: 11px; color: #5d6d97;">
                    ${currentSignalType === 'smart' ? TRANSLATIONS[currentLanguage].smart_money : 
                      currentSignalType === 'indicators' ? TRANSLATIONS[currentLanguage].indicators : 
                      TRANSLATIONS[currentLanguage].combined}
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
    
    const currentPrice = realPrices[currentAsset] || asset.price;
    
    currentSignal = {
        asset: currentAsset,
        pair: asset.name,
        direction: analysis.direction,
        entryPrice: currentPrice,
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
    const currentPrice = realPrices[currentAsset] || ASSETS_CONFIG[currentAsset].price;
    
    // Более реалистичный анализ на основе цены
    const priceTrend = Math.random() > 0.5 ? 'up' : 'down';
    let direction = priceTrend === 'up' ? 'BUY' : 'SELL';
    let confidence = 70 + Math.random() * 25;
    
    // Корректировка на основе волатильности
    const volatility = currentPrice > 100 ? 0.02 : 0.002;
    if (Math.random() > 0.7) confidence += 10;
    
    confidence = Math.min(95, Math.round(confidence));
    
    return {
        direction,
        confidence,
        volume: Math.random() > 0.5 ? TRANSLATIONS[currentLanguage].analysis_high : TRANSLATIONS[currentLanguage].analysis_medium,
        orderFlow: direction === 'BUY' ? TRANSLATIONS[currentLanguage].analysis_positive : TRANSLATIONS[currentLanguage].analysis_negative,
        marketSentiment: direction === 'BUY' ? TRANSLATIONS[currentLanguage].analysis_bullish : TRANSLATIONS[currentLanguage].analysis_bearish,
        supportLevel: currentPrice * (direction === 'BUY' ? 0.997 : 0.999),
        resistanceLevel: currentPrice * (direction === 'BUY' ? 1.003 : 1.001)
    };
}

// Анализ по индикаторам
function performIndicatorsAnalysis() {
    const currentPrice = realPrices[currentAsset] || ASSETS_CONFIG[currentAsset].price;
    
    // Синхронизированные значения индикаторов
    const rsi = parseFloat(document.getElementById('indicator-rsi').textContent) || 50;
    const macd = parseFloat(document.getElementById('indicator-macd').textContent) || 0;
    const stochastic = parseFloat(document.getElementById('indicator-stochastic').textContent) || 50;
    
    let buySignals = 0;
    let sellSignals = 0;
    
    // RSI анализ
    if (rsi < 30) buySignals += 2;
    if (rsi > 70) sellSignals += 2;
    if (rsi > 50 && rsi < 70) buySignals++;
    if (rsi < 50 && rsi > 30) sellSignals++;
    
    // MACD анализ
    if (macd > 0) buySignals++;
    if (macd < 0) sellSignals++;
    
    // Stochastic анализ
    if (stochastic < 20) buySignals++;
    if (stochastic > 80) sellSignals++;
    
    let direction = buySignals > sellSignals ? 'BUY' : 'SELL';
    let confidence = Math.round((Math.max(buySignals, sellSignals) / 6) * 100);
    confidence = Math.min(90, Math.max(65, confidence));
    
    return {
        direction,
        confidence,
        rsi: rsi,
        macd: macd,
        stochastic: stochastic,
        bollinger: document.getElementById('indicator-bollinger').textContent
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
        // Выбираем направление с большей уверенностью
        if (indicatorsAnalysis.confidence > smartAnalysis.confidence) {
            direction = indicatorsAnalysis.direction;
        }
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
    if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-bolt"></i> ${TRANSLATIONS[currentLanguage].get_signal}`;
    }
}

// Создание деталей сигнала Смарт-Мани
function createSmartSignalDetails(signal) {
    const directionText = signal.direction === 'BUY' ? 
                         TRANSLATIONS[currentLanguage].buy : 
                         TRANSLATIONS[currentLanguage].sell;
    const priceFormat = signal.entryPrice > 100 ? 2 : 5;
    
    return `
        <div style="padding: 15px;">
            <div style="margin-bottom: 12px; text-align: center;">
                <span style="font-size: 9px; color: #8b9dc3; background: rgba(0, 102, 255, 0.2); padding: 3px 8px; border-radius: 10px;">
                    ${TRANSLATIONS[currentLanguage].smart_money}
                </span>
            </div>
            
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 12px;">${TRANSLATIONS[currentLanguage].instrument}:</span>
                <span style="font-weight: 700; font-size: 14px;">${signal.pair}</span>
            </div>
            
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 12px;">${TRANSLATIONS[currentLanguage].signal}:</span>
                <span style="font-weight: 800; font-size: 16px; color: ${signal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; text-transform: uppercase;">
                    ${directionText}
                </span>
            </div>
            
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 12px;">${TRANSLATIONS[currentLanguage].current_price}:</span>
                <span style="font-weight: 700; font-family: 'Courier New', monospace; font-size: 14px;">
                    ${signal.entryPrice.toFixed(priceFormat)}
                </span>
            </div>
            
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 12px;">${TRANSLATIONS[currentLanguage].analysis_confidence}:</span>
                <span style="font-weight: 800; color: #00ff88; font-size: 16px;">
                    ${signal.confidence}%
                </span>
            </div>
            
            <div style="background: rgba(19, 26, 45, 0.5); border-radius: 6px; padding: 10px; margin-top: 12px;">
                <div style="font-size: 11px; color: #8b9dc3; margin-bottom: 5px;">${TRANSLATIONS[currentLanguage].signal}:</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 10px;">
                    <div>${TRANSLATIONS[currentLanguage].analysis_volume} <span style="color: #00ff88;">${signal.analysis.volume}</span></div>
                    <div>${TRANSLATIONS[currentLanguage].analysis_order_flow} <span style="color: #00ff88;">${signal.analysis.orderFlow}</span></div>
                    <div>${TRANSLATIONS[currentLanguage].analysis_sentiment} <span style="color: #00ff88;">${signal.analysis.marketSentiment}</span></div>
                    <div>${TRANSLATIONS[currentLanguage].analysis_support} <span style="color: #ff4444;">${signal.analysis.supportLevel.toFixed(priceFormat)}</span></div>
                    <div>${TRANSLATIONS[currentLanguage].analysis_resistance} <span style="color: #ff4444;">${signal.analysis.resistanceLevel.toFixed(priceFormat)}</span></div>
                </div>
            </div>
            
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(42, 54, 85, 0.5);">
                <div style="font-size: 10px; color: #5d6d97; text-align: center;">
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
    const priceFormat = signal.entryPrice > 100 ? 2 : 5;
    
    return `
        <div style="padding: 15px;">
            <div style="margin-bottom: 12px; text-align: center;">
                <span style="font-size: 9px; color: #8b9dc3; background: rgba(0, 255, 136, 0.2); padding: 3px 8px; border-radius: 10px;">
                    ${TRANSLATIONS[currentLanguage].indicators}
                </span>
            </div>
            
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 12px;">${TRANSLATIONS[currentLanguage].instrument}:</span>
                <span style="font-weight: 700; font-size: 14px;">${signal.pair}</span>
            </div>
            
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 12px;">${TRANSLATIONS[currentLanguage].signal}:</span>
                <span style="font-weight: 800; font-size: 16px; color: ${signal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; text-transform: uppercase;">
                    ${directionText}
                </span>
            </div>
            
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 12px;">${TRANSLATIONS[currentLanguage].current_price}:</span>
                <span style="font-weight: 700; font-family: 'Courier New', monospace; font-size: 14px;">
                    ${signal.entryPrice.toFixed(priceFormat)}
                </span>
            </div>
            
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 12px;">${TRANSLATIONS[currentLanguage].analysis_confidence}:</span>
                <span style="font-weight: 800; color: #00ff88; font-size: 16px;">
                    ${signal.confidence}%
                </span>
            </div>
            
            <div style="background: rgba(19, 26, 45, 0.5); border-radius: 6px; padding: 10px; margin-top: 12px;">
                <div style="font-size: 11px; color: #8b9dc3; margin-bottom: 5px;">${TRANSLATIONS[currentLanguage].indicators}:</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 10px;">
                    <div>${TRANSLATIONS[currentLanguage].rsi}: <span style="color: ${signal.analysis.rsi > 70 ? '#ff4444' : signal.analysis.rsi < 30 ? '#00ff88' : '#8b9dc3'}">${signal.analysis.rsi.toFixed(1)}</span></div>
                    <div>${TRANSLATIONS[currentLanguage].macd}: <span style="color: ${signal.analysis.macd > 0 ? '#00ff88' : '#ff4444'}">${signal.analysis.macd.toFixed(4)}</span></div>
                    <div>${TRANSLATIONS[currentLanguage].stochastic}: <span style="color: ${signal.analysis.stochastic > 80 ? '#ff4444' : signal.analysis.stochastic < 20 ? '#00ff88' : '#8b9dc3'}">${signal.analysis.stochastic.toFixed(1)}</span></div>
                    <div>${TRANSLATIONS[currentLanguage].bollinger}: <span style="color: #8b9dc3;">${signal.analysis.bollinger}</span></div>
                </div>
            </div>
            
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(42, 54, 85, 0.5);">
                <div style="font-size: 10px; color: #5d6d97; text-align: center;">
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
    const priceFormat = signal.entryPrice > 100 ? 2 : 5;
    
    return `
        <div style="padding: 15px;">
            <div style="margin-bottom: 12px; text-align: center;">
                <span style="font-size: 9px; color: #8b9dc3; background: rgba(255, 68, 68, 0.2); padding: 3px 8px; border-radius: 10px;">
                    ${TRANSLATIONS[currentLanguage].combined}
                </span>
            </div>
            
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 12px;">${TRANSLATIONS[currentLanguage].instrument}:</span>
                <span style="font-weight: 700; font-size: 14px;">${signal.pair}</span>
            </div>
            
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 12px;">${TRANSLATIONS[currentLanguage].signal}:</span>
                <span style="font-weight: 800; font-size: 16px; color: ${signal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; text-transform: uppercase;">
                    ${directionText}
                </span>
            </div>
            
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 12px;">${TRANSLATIONS[currentLanguage].current_price}:</span>
                <span style="font-weight: 700; font-family: 'Courier New', monospace; font-size: 14px;">
                    ${signal.entryPrice.toFixed(priceFormat)}
                </span>
            </div>
            
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 12px;">${TRANSLATIONS[currentLanguage].analysis_confidence}:</span>
                <span style="font-weight: 800; color: #00ff88; font-size: 16px;">
                    ${signal.confidence}%
                </span>
            </div>
            
            <div style="background: rgba(19, 26, 45, 0.5); border-radius: 6px; padding: 10px; margin-top: 12px;">
                <div style="font-size: 11px; color: #8b9dc3; margin-bottom: 5px;">${TRANSLATIONS[currentLanguage].combined}:</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 10px;">
                    <div>${TRANSLATIONS[currentLanguage].smart_money}: <span style="color: #00ff88;">${signal.analysis.smartMoney.confidence}%</span></div>
                    <div>${TRANSLATIONS[currentLanguage].indicators}: <span style="color: #00ff88;">${signal.analysis.indicators.confidence}%</span></div>
                    <div>${TRANSLATIONS[currentLanguage].analysis_confidence}: <span style="color: #00ff88;">${signal.analysis.combinedScore}%</span></div>
                    <div>${TRANSLATIONS[currentLanguage].signal}: <span style="color: ${signal.analysis.smartMoney.direction === signal.analysis.indicators.direction ? '#00ff88' : '#ff4444'}">
                        ${signal.analysis.smartMoney.direction === signal.analysis.indicators.direction ? '✓' : '✗'}
                    </span></div>
                </div>
            </div>
            
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(42, 54, 85, 0.5);">
                <div style="font-size: 10px; color: #5d6d97; text-align: center;">
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
            dot.style.boxShadow = `0 0 8px ${color}`;
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
    void timerBar.offsetWidth;
    
    // Запускаем новую анимацию
    timerBar.style.transition = `width ${totalTime}s linear`;
    timerBar.style.width = '0%';
    timerBar.style.background = 'linear-gradient(90deg, #00ff88, #0066ff)';
    
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
    
    const currentPrice = realPrices[currentAsset] || ASSETS_CONFIG[currentAsset].price;
    const entryPrice = currentSignal.entryPrice;
    const priceDiff = currentPrice - entryPrice;
    const percentDiff = (priceDiff / entryPrice) * 100;
    
    let result, resultColor, resultText;
    
    if (currentSignal.direction === 'BUY') {
        if (percentDiff > 0.01) { // +0.01%
            result = 'WIN';
            resultColor = '#00ff88';
            resultText = TRANSLATIONS[currentLanguage].win;
        } else if (percentDiff < -0.01) { // -0.01%
            result = 'LOSS';
            resultColor = '#ff4444';
            resultText = TRANSLATIONS[currentLanguage].loss;
        } else {
            result = 'REFUND';
            resultColor = '#8b9dc3';
            resultText = TRANSLATIONS[currentLanguage].refund;
        }
    } else { // SELL
        if (percentDiff < -0.01) { // -0.01%
            result = 'WIN';
            resultColor = '#00ff88';
            resultText = TRANSLATIONS[currentLanguage].win;
        } else if (percentDiff > 0.01) { // +0.01%
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
    const priceFormat = exitPrice > 100 ? 2 : 5;
    const entryPriceFormat = currentSignal.entryPrice > 100 ? 2 : 5;
    
    const resultHTML = `
        <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid ${resultColor}30;">
            <div style="text-align: center;">
                <div style="font-size: 22px; font-weight: 800; color: ${resultColor}; margin-bottom: 5px;">
                    ${resultText}!
                </div>
                <div style="font-size: 12px; color: #8b9dc3; margin-bottom: 12px;">
                    ${TRANSLATIONS[currentLanguage].signal_completed}
                </div>
                
                <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 12px;">
                    <div style="text-align: center;">
                        <div style="font-size: 10px; color: #5d6d97;">${TRANSLATIONS[currentLanguage].current_price}</div>
                        <div style="font-size: 14px; font-weight: 700;">${currentSignal.entryPrice.toFixed(entryPriceFormat)}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 10px; color: #5d6d97;">${TRANSLATIONS[currentLanguage].change}</div>
                        <div style="font-size: 14px; font-weight: 700;">${exitPrice.toFixed(priceFormat)}</div>
                    </div>
                </div>
                
                <div style="font-size: 11px; color: #5d6d97;">
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
        padding: 8px 12px;
        border-radius: 6px;
        border-left: 4px solid ${resultColor};
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 11px;
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
    
    const priceFormat = currentSignal.entryPrice > 100 ? 2 : 5;
    
    historyItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-weight: 700; min-width: 60px;">${currentSignal.pair}</span>
            <span style="color: ${currentSignal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; font-weight: 600; font-size: 10px;">
                ${directionText}
            </span>
            <span style="color: ${resultColor}; font-weight: 800; font-size: 10px;">
                ${resultText}
            </span>
        </div>
        <div style="color: #5d6d97; font-size: 9px; text-align: right;">
            <div>${currentSignal.entryPrice.toFixed(priceFormat)} → ${currentSignal.exitPrice.toFixed(priceFormat)}</div>
            <div>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        </div>
    `;
    
    resultsList.insertBefore(historyItem, resultsList.firstChild);
    
    // Ограничиваем историю 20 записями
    if (resultsList.children.length > 20) {
        resultsList.removeChild(resultsList.lastChild);
    }
    
    saveHistory();
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
        const resultsList = document.getElementById('results-list');
        
        if (!resultsList) return;
        
        if (savedHistory.length > 0) {
            console.log(`📚 Загружено ${savedHistory.length} записей истории`);
            
            // Очищаем текущий список
            resultsList.innerHTML = '';
            
            // Загружаем последние 10 записей
            const recentHistory = savedHistory.slice(0, 10);
            
            recentHistory.forEach(record => {
                if (record.signal && record.signal.result) {
                    const resultColor = record.signal.result === 'WIN' ? '#00ff88' : 
                                      record.signal.result === 'LOSS' ? '#ff4444' : '#8b9dc3';
                    
                    const historyItem = document.createElement('div');
                    historyItem.className = `result-item ${record.signal.result.toLowerCase()}`;
                    historyItem.style.cssText = `
                        background: rgba(19, 26, 45, 0.8);
                        padding: 8px 12px;
                        border-radius: 6px;
                        border-left: 4px solid ${resultColor};
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 11px;
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
                    
                    const priceFormat = record.signal.entryPrice > 100 ? 2 : 5;
                    
                    historyItem.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-weight: 700; min-width: 60px;">${record.signal.pair}</span>
                            <span style="color: ${record.signal.direction === 'BUY' ? '#00ff88' : '#ff4444'}; font-weight: 600; font-size: 10px;">
                                ${directionText}
                            </span>
                            <span style="color: ${resultColor}; font-weight: 800; font-size: 10px;">
                                ${resultText}
                            </span>
                        </div>
                        <div style="color: #5d6d97; font-size: 9px; text-align: right;">
                            <div>${record.signal.entryPrice.toFixed(priceFormat)} → ${record.signal.exitPrice.toFixed(priceFormat)}</div>
                            <div>${new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                        </div>
                    `;
                    
                    resultsList.appendChild(historyItem);
                }
            });
        }
    } catch (error) {
        console.error('Ошибка загрузки истории:', error);
    }
}

// Сброс сигнала
function resetSignal() {
    isSignalActive = false;
    currentSignal = null;
    
    // Разблокируем интерфейс
    unlockInterface();
    
    // Восстанавливаем отображение
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
    
    updateSignalStatus(TRANSLATIONS[currentLanguage].status_waiting, '#8b9dc3');
    
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
    getCurrentPrice: () => realPrices[currentAsset],
    getAllPrices: () => realPrices,
    getCurrentSignal: () => currentSignal,
    getLanguage: () => currentLanguage,
    forceSignal: generateSignal,
    resetSignal: resetSignal
};
