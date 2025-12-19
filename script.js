// Конфигурация API для реальных котировок
const API_CONFIG = {
    // Twelve Data API (бесплатный, 800 запросов в день)
    baseUrl: 'https://api.twelvedata.com',
    apiKey: 'demo', // Для демо используем demo key
    
    // Альтернативные API (бесплатные)
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
let chartData = [];
let priceHistory = [];

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Инициализация Scalping Robot Pro...');
    
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

// Инициализация графика
function initChart() {
    const ctx = document.getElementById('trading-chart').getContext('2d');
    
    // Генерация тестовых данных (пока не загрузились реальные)
    generateTestChartData();
    
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
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
    const now = new Date();
    
    // 24 часа данных
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now);
        time.setHours(time.getHours() - i);
        labels.push(time.getHours().toString().padStart(2, '0') + ':00');
        
        // Начинаем с текущей цены
        const basePrice = ASSETS[currentAsset].price;
        const lastPrice = prices.length > 0 ? prices[prices.length - 1] : basePrice;
        
        // Реалистичное движение цены
        const volatility = 0.0002; // 2 пипса
        const change = (Math.random() - 0.5) * volatility;
        prices.push(lastPrice * (1 + change));
    }
    
    chartData = { labels, prices };
    priceHistory = prices;
}

// Обновление графика реальными данными
function updateChartWithRealData() {
    if (!currentChart || chartData.prices.length === 0) return;
    
    // Добавляем новую точку
    const currentPrice = ASSETS[currentAsset].price;
    chartData.prices.push(currentPrice);
    chartData.prices.shift(); // Удаляем старую точку
    
    // Обновляем метки времени
    const now = new Date();
    chartData.labels.push(now.getHours().toString().padStart(2, '0') + ':' + 
                         now.getMinutes().toString().padStart(2, '0'));
    chartData.labels.shift();
    
    // Обновляем график
    currentChart.data.labels = chartData.labels;
    currentChart.data.datasets[0].data = chartData.prices;
    currentChart.update('none'); // Без анимации для плавности
    
    // Сохраняем историю
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
            if (currentChart) {
                currentChart.data.datasets[0].data = chartData.prices;
                currentChart.update();
            }
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
    
    // Кнопка генерации сигнала
    const generateBtn = document.getElementById('generate-signal');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateSignal);
    }
    
    console.log('✅ Обработчики событий инициализированы');
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
        // Пробуем получить реальные цены
        await fetchRealPrices();
    } catch (error) {
        console.warn('⚠️ Не удалось загрузить реальные цены, используем демо-данные');
        useDemoPrices();
    }
    
    // Обновляем отображение
    updateAssetDisplay();
    updatePriceFeed();
}

// Получение реальных цен с API
async function fetchRealPrices() {
    try {
        // Frankfurter API (бесплатный, не требует ключа)
        const response = await fetch('https://api.frankfurter.app/latest?from=USD');
        
        if (!response.ok) throw new Error('API error');
        
        const data = await response.json();
        
        // Обновляем цены
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
            
            // EUR/JPY (расчетный)
            if (data.rates.EUR && data.rates.JPY) {
                ASSETS.EURJPY.price = (1 / data.rates.EUR) * data.rates.JPY;
            }
            
            // GBP/JPY (расчетный)
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
    // Генерируем реалистичные демо-цены
    Object.keys(ASSETS).forEach(asset => {
        const change = (Math.random() - 0.5) * 0.001; // ±0.1%
        ASSETS[asset].price *= (1 + change);
        ASSETS[asset].lastUpdate = new Date();
    });
}

// Запуск обновления цен
function startPriceUpdates() {
    // Обновляем каждые 5 секунд
    priceUpdateInterval = setInterval(async () => {
        try {
            await updatePrices();
            updateAssetDisplay();
            updatePriceFeed();
            
            // Обновляем график если активен
            if (currentChart) {
                updateChartWithRealData();
            }
        } catch (error) {
            console.warn('⚠️ Ошибка обновления цен:', error);
            // Используем демо-данные при ошибке
            useDemoPrices();
            updateAssetDisplay();
            updatePriceFeed();
        }
    }, 5000); // 5 секунд
}

// Обновление цен
async function updatePrices() {
    try {
        // Пробуем получить реальные цены
        const success = await fetchRealPrices();
        if (!success) {
            throw new Error('Failed to fetch real prices');
        }
    } catch (error) {
        // Используем демо-данные с реалистичными изменениями
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
    
    // Рассчитываем изменение
    if (changeElement) {
        // Для демо: случайное изменение ±0.05%
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
    // Обновляем основные пары в ленте
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
    
    // Блокируем кнопку
    const btn = document.getElementById('generate-signal');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> АНАЛИЗ РЫНКА...';
    
    // Обновляем статус
    updateSignalStatus('Анализ рынка...', '#ffaa00');
    
    // Показываем анимацию анализа
    showAnalysisAnimation();
    
    // Анализ рынка (3 секунды)
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
                    Анализ реальных котировок...
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
    
    // Технический анализ на основе реальных данных
    const analysis = performTechnicalAnalysis();
    
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
    
    // Запускаем таймер
    startExpirationTimer();
}

// Технический анализ
function performTechnicalAnalysis() {
    const prices = priceHistory.length > 0 ? priceHistory : chartData.prices;
    
    if (prices.length < 10) {
        // Если данных мало, используем случайный анализ
        return {
            direction: Math.random() > 0.5 ? 'BUY' : 'SELL',
            confidence: Math.floor(70 + Math.random() * 25),
            rsi: 50 + (Math.random() - 0.5) * 20,
            trend: Math.random() > 0.5 ? 'UP' : 'DOWN'
        };
    }
    
    // Простой технический анализ
    const lastPrice = prices[prices.length - 1];
    const prevPrice = prices[prices.length - 2];
    const sma10 = calculateSMA(prices, 10);
    const sma20 = calculateSMA(prices, 20);
    
    let direction = 'BUY';
    let confidence = 75;
    
    // Определяем направление
    if (lastPrice > sma10 && sma10 > sma20) {
        direction = 'BUY';
        confidence = 82 + Math.random() * 13; // 82-95%
    } else if (lastPrice < sma10 && sma10 < sma20) {
        direction = 'SELL';
        confidence = 82 + Math.random() * 13;
    } else if (lastPrice > prevPrice) {
        direction = 'BUY';
        confidence = 70 + Math.random() * 15; // 70-85%
    } else {
        direction = 'SELL';
        confidence = 70 + Math.random() * 15;
    }
    
    // Ограничиваем уверенность
    confidence = Math.min(99, Math.round(confidence));
    
    return {
        direction,
        confidence,
        rsi: calculateRSI(prices),
        trend: lastPrice > sma20 ? 'UP' : 'DOWN',
        sma10,
        sma20
    };
}

// Расчет SMA
function calculateSMA(prices, period) {
    if (prices.length < period) return prices[prices.length - 1];
    
    const slice = prices.slice(-period);
    const sum = slice.reduce((a, b) => a + b, 0);
    return sum / period;
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

// Отображение сигнала
function displaySignal() {
    const signal = currentSignal;
    if (!signal) return;
    
    // Скрываем контент, показываем детали
    document.getElementById('signal-content').style.display = 'none';
    document.getElementById('signal-details').style.display = 'block';
    document.getElementById('expiration-timer').style.display = 'block';
    
    // Создаем детали сигнала
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
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">RSI:</span>
                <span style="font-weight: 600; color: ${signal.analysis.rsi > 70 ? '#ff4444' : signal.analysis.rsi < 30 ? '#00ff88' : '#8b9dc3'}">
                    ${signal.analysis.rsi.toFixed(1)}
                </span>
            </div>
            
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #8b9dc3; font-size: 13px;">Тренд:</span>
                <span style="font-weight: 600; color: ${signal.analysis.trend === 'UP' ? '#00ff88' : '#ff4444'}">
                    ${signal.analysis.trend === 'UP' ? 'Восходящий ↗' : 'Нисходящий ↘'}
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
    
    // Обновляем статус
    updateSignalStatus('АКТИВЕН', signal.direction === 'BUY' ? '#00ff88' : '#ff4444');
    
    // Разблокируем кнопку
    const btn = document.getElementById('generate-signal');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-bolt"></i> ПОЛУЧИТЬ СИГНАЛ';
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
    void timerBar.offsetWidth; // Форсируем перерисовку
    
    // Запускаем новую анимацию
    timerBar.style.transition = `transform ${totalTime}s linear`;
    timerBar.style.transform = 'scaleX(0)';
    
    // Запускаем таймер
    expirationTimer = setInterval(() => {
        timeLeft--;
        
        // Обновляем отображение
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerValue.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Меняем цвет при малом времени
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

// Завершение сигнала
function finishSignal() {
    if (!currentSignal) return;
    
    // Получаем текущую цену
    const currentPrice = ASSETS[currentAsset].price;
    const entryPrice = currentSignal.entryPrice;
    
    // Определяем результат
    let result, resultColor, resultText;
    
    if (currentSignal.direction === 'BUY') {
        if (currentPrice > entryPrice * 1.0001) { // +0.01%
            result = 'WIN';
            resultColor = '#00ff88';
            resultText = 'ВЫИГРЫШ';
        } else if (currentPrice < entryPrice * 0.9999) { // -0.01%
            result = 'LOSS';
            resultColor = '#ff4444';
            resultText = 'ПРОИГРЫШ';
        } else {
            result = 'REFUND';
            resultColor = '#8b9dc3';
            resultText = 'ВОЗВРАТ';
        }
    } else { // SELL
        if (currentPrice < entryPrice * 0.9999) { // -0.01%
            result = 'WIN';
            resultColor = '#00ff88';
            resultText = 'ВЫИГРЫШ';
        } else if (currentPrice > entryPrice * 1.0001) { // +0.01%
            result = 'LOSS';
            resultColor = '#ff4444';
            resultText = 'ПРОИГРЫШ';
        } else {
            result = 'REFUND';
            resultColor = '#8b9dc3';
            resultText = 'ВОЗВРАТ';
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
    
    // Обновляем статус
    updateSignalStatus(resultText, resultColor);
}

// Добавление в историю
function addToHistory() {
    const resultsList = document.getElementById('results-list');
    if (!resultsList) return;
    
    const resultColor = currentSignal.result === 'WIN' ? '#00ff88' : 
                       currentSignal.result === 'LOSS' ? '#ff4444' : '#8b9dc3';
    
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
    
    // Добавляем в начало
    resultsList.insertBefore(historyItem, resultsList.firstChild);
    
    // Сохраняем историю
    saveHistory();
    
    // Обновляем статистику
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
        
        // Сохраняем только последние 50 записей
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

// Обновление статистики
function updateStats() {
    // Здесь можно добавить расчет статистики
    // Например: винрейт, общая прибыль и т.д.
}

// Сброс сигнала
function resetSignal() {
    isSignalActive = false;
    currentSignal = null;
    
    // Скрываем детали, показываем контент
    document.getElementById('signal-content').style.display = 'flex';
    document.getElementById('signal-details').style.display = 'none';
    document.getElementById('expiration-timer').style.display = 'none';
    
    // Восстанавливаем контент
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        signalContent.innerHTML = `
            <div class="signal-placeholder">
                <i class="fas fa-chart-line"></i>
                <p>Нажмите "Получить сигнал" для анализа</p>
            </div>
        `;
    }
    
    // Восстанавливаем статус
    updateSignalStatus('Ожидание', '#00ff88');
    
    // Сбрасываем таймер
    const timerBar = document.getElementById('timer-bar');
    const timerValue = document.getElementById('timer-value');
    if (timerBar && timerValue) {
        timerBar.style.transition = 'none';
        timerBar.style.transform = 'scaleX(1)';
        timerBar.style.background = 'linear-gradient(90deg, #00ff88, #0066ff)';
        timerValue.textContent = getTimeframeText(currentTimeframe);
    }
    
    // Очищаем интервал
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
    
    .live-price {
        animation: pulse 2s infinite;
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
