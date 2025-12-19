// Конфигурация торгового робота
const TRADING_CONFIG = {
    assets: {
        'EURUSD': { name: 'EUR/USD', symbol: 'EURUSD', price: 1.0830, volatility: 0.8 },
        'USDJPY': { name: 'USD/JPY', symbol: 'USDJPY', price: 148.35, volatility: 0.7 },
        'GBPUSD': { name: 'GBP/USD', symbol: 'GBPUSD', price: 1.2650, volatility: 0.9 },
        'AUDUSD': { name: 'AUD/USD', symbol: 'AUDUSD', price: 0.6590, volatility: 0.6 },
        'USDCAD': { name: 'USD/CAD', symbol: 'USDCAD', price: 1.3520, volatility: 0.5 },
        'USDCHF': { name: 'USD/CHF', symbol: 'USDCHF', price: 0.9025, volatility: 0.6 },
        'EURJPY': { name: 'EUR/JPY', symbol: 'EURJPY', price: 160.42, volatility: 0.8 },
        'GBPJPY': { name: 'GBP/JPY', symbol: 'GBPJPY', price: 187.65, volatility: 1.0 },
        'EURGBP': { name: 'EUR/GBP', symbol: 'EURGBP', price: 0.8560, volatility: 0.4 }
    },
    
    timeframes: {
        60: { name: '1 минута', seconds: 60 },
        120: { name: '2 минуты', seconds: 120 },
        180: { name: '3 минуты', seconds: 180 },
        300: { name: '5 минут', seconds: 300 }
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
let priceHistory = [];
let animationFrame = null;

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация Scalping Robot Pro...');
    
    initializeChart();
    initializeEventListeners();
    updateTimeDisplay();
    loadResultsHistory();
    updateStatsDisplay();
    
    // Обновление времени каждую секунду
    setInterval(updateTimeDisplay, 1000);
    
    // Обновление цены каждые 2 секунды (симуляция реальных котировок)
    setInterval(updateRealPrice, 2000);
    
    console.log('Scalping Robot Pro успешно инициализирован!');
});

// Инициализация графика с Chart.js
function initializeChart() {
    console.log('Инициализация графика...');
    
    const ctx = document.getElementById('trading-chart').getContext('2d');
    
    // Очистка предыдущего графика
    if (currentChart) {
        currentChart.destroy();
    }
    
    // Генерация данных для графика
    const chartData = generateChartData();
    
    currentChart = new Chart(ctx, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: currentAsset,
                data: chartData.candles,
                borderColor: '#2a3655',
                borderWidth: 1,
                color: {
                    up: '#00ff88',
                    down: '#ff4444',
                    unchanged: '#8b9dc3'
                }
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
                    intersect: false
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
                        color: '#2a3655'
                    },
                    ticks: {
                        color: '#8b9dc3'
                    }
                },
                y: {
                    position: 'right',
                    grid: {
                        color: '#2a3655'
                    },
                    ticks: {
                        color: '#8b9dc3'
                    }
                }
            }
        }
    });
    
    // Рисуем технический анализ
    drawTechnicalAnalysis();
    
    console.log('График успешно инициализирован');
}

// Генерация данных для свечей
function generateChartData() {
    const asset = TRADING_CONFIG.assets[currentAsset];
    const basePrice = asset.price;
    const volatility = asset.volatility;
    
    const candles = [];
    const labels = [];
    
    // Генерируем 150 свечей
    for (let i = 150; i >= 0; i--) {
        const time = new Date(Date.now() - (i * 60 * 1000)); // 1 минута интервал
        
        if (i === 0) {
            // Текущая свеча
            candles.push({
                x: time,
                o: basePrice,
                h: basePrice * (1 + Math.random() * 0.001),
                l: basePrice * (1 - Math.random() * 0.001),
                c: basePrice
            });
        } else {
            // Исторические свечи
            const prevClose = i === 150 ? basePrice : candles[candles.length - 1].c;
            const change = (Math.random() - 0.5) * volatility * 0.01;
            const open = prevClose;
            const close = prevClose * (1 + change);
            const high = Math.max(open, close) * (1 + Math.random() * 0.001);
            const low = Math.min(open, close) * (1 - Math.random() * 0.001);
            
            candles.push({
                x: time,
                o: open,
                h: high,
                l: low,
                c: close
            });
        }
        
        labels.push(time);
    }
    
    // Сохраняем историю цен для мини-графиков
    priceHistory = candles.map(c => ({ time: c.x, price: c.c }));
    
    return { candles, labels };
}

// Рисуем технический анализ
function drawTechnicalAnalysis() {
    if (!currentChart) return;
    
    const ctx = currentChart.ctx;
    const chartArea = currentChart.chartArea;
    const data = currentChart.data.datasets[0].data;
    
    if (!chartArea || data.length < 10) return;
    
    // Вычисляем уровни поддержки и сопротивления
    const prices = data.map(d => d.c);
    const highs = data.map(d => d.h);
    const lows = data.map(d => d.l);
    
    const maxHigh = Math.max(...highs);
    const minLow = Math.min(...lows);
    const range = maxHigh - minLow;
    
    // Сетка Фибоначчи
    const fibLevels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
    const fibPrices = fibLevels.map(level => maxHigh - (range * level));
    
    // Уровни поддержки и сопротивления
    const supportLevel = minLow + (range * 0.382);
    const resistanceLevel = maxHigh - (range * 0.382);
    
    // Трендовая линия
    const trendStart = data[0].c;
    const trendEnd = data[data.length - 1].c;
    
    // Сохраняем данные для отрисовки
    currentChart.fibLevels = fibPrices;
    currentChart.supportLevel = supportLevel;
    currentChart.resistanceLevel = resistanceLevel;
    currentChart.trendStart = trendStart;
    currentChart.trendEnd = trendEnd;
    
    // Добавляем плагин для рисования линий
    const fibPlugin = {
        id: 'fibonacci',
        afterDraw: function(chart) {
            const ctx = chart.ctx;
            const chartArea = chart.chartArea;
            const scales = chart.scales;
            
            if (!chartArea || !scales.x || !scales.y) return;
            
            ctx.save();
            
            // Рисуем уровни Фибоначчи
            if (chart.fibLevels) {
                chart.fibLevels.forEach((price, index) => {
                    const y = scales.y.getPixelForValue(price);
                    
                    ctx.beginPath();
                    ctx.setLineDash(index === 3 ? [] : [5, 5]); // 0.5 уровень сплошной
                    ctx.strokeStyle = index === 3 ? '#ffaa00' : '#5d6d97';
                    ctx.lineWidth = index === 3 ? 2 : 1;
                    ctx.moveTo(chartArea.left, y);
                    ctx.lineTo(chartArea.right, y);
                    ctx.stroke();
                    
                    // Подписи уровней
                    ctx.fillStyle = '#5d6d97';
                    ctx.font = '10px Arial';
                    ctx.fillText(`${fibLevels[index]}`, chartArea.right - 30, y - 5);
                });
            }
            
            // Рисуем уровень поддержки (синий)
            if (chart.supportLevel) {
                const supportY = scales.y.getPixelForValue(chart.supportLevel);
                ctx.beginPath();
                ctx.setLineDash([]);
                ctx.strokeStyle = '#0066ff';
                ctx.lineWidth = 2;
                ctx.moveTo(chartArea.left, supportY);
                ctx.lineTo(chartArea.right, supportY);
                ctx.stroke();
                
                ctx.fillStyle = '#0066ff';
                ctx.font = '10px Arial';
                ctx.fillText('Support', chartArea.right - 40, supportY - 5);
            }
            
            // Рисуем уровень сопротивления (красный)
            if (chart.resistanceLevel) {
                const resistanceY = scales.y.getPixelForValue(chart.resistanceLevel);
                ctx.beginPath();
                ctx.setLineDash([]);
                ctx.strokeStyle = '#ff4444';
                ctx.lineWidth = 2;
                ctx.moveTo(chartArea.left, resistanceY);
                ctx.lineTo(chartArea.right, resistanceY);
                ctx.stroke();
                
                ctx.fillStyle = '#ff4444';
                ctx.font = '10px Arial';
                ctx.fillText('Resistance', chartArea.right - 50, resistanceY - 5);
            }
            
            // Рисуем трендовую линию (зеленая диагональная)
            if (chart.trendStart !== undefined && chart.trendEnd !== undefined) {
                const startY = scales.y.getPixelForValue(chart.trendStart);
                const endY = scales.y.getPixelForValue(chart.trendEnd);
                
                ctx.beginPath();
                ctx.setLineDash([]);
                ctx.strokeStyle = '#22ff55';
                ctx.lineWidth = 2;
                ctx.moveTo(chartArea.left, startY);
                ctx.lineTo(chartArea.right, endY);
                ctx.stroke();
            }
            
            // Рисуем ордер-блоки
            drawOrderBlocks(chart, ctx, scales);
            
            ctx.restore();
        }
    };
    
    // Добавляем плагин к графику
    Chart.register(fibPlugin);
    
    // Обновляем график
    currentChart.update();
}

// Рисуем ордер-блоки
function drawOrderBlocks(chart, ctx, scales) {
    const data = chart.data.datasets[0].data;
    const chartArea = chart.chartArea;
    
    for (let i = 1; i < data.length - 1; i++) {
        const candle = data[i];
        const prevCandle = data[i - 1];
        
        // Бычий ордер-блок (зеленый)
        if (candle.c > candle.o && 
            candle.c > prevCandle.h && 
            candle.o < prevCandle.l) {
            
            const x = scales.x.getPixelForValue(candle.x);
            const highY = scales.y.getPixelForValue(candle.h);
            const lowY = scales.y.getPixelForValue(candle.l);
            const width = 50; // Ширина блока
            
            ctx.fillStyle = 'rgba(0, 255, 136, 0.1)';
            ctx.fillRect(x, highY, width, lowY - highY);
            
            ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, highY, width, lowY - highY);
        }
        
        // Медвежий ордер-блок (красный)
        if (candle.c < candle.o && 
            candle.c < prevCandle.l && 
            candle.o > prevCandle.h) {
            
            const x = scales.x.getPixelForValue(candle.x);
            const highY = scales.y.getPixelForValue(candle.h);
            const lowY = scales.y.getPixelForValue(candle.l);
            const width = 50;
            
            ctx.fillStyle = 'rgba(255, 68, 68, 0.1)';
            ctx.fillRect(x, highY, width, lowY - highY);
            
            ctx.strokeStyle = 'rgba(255, 68, 68, 0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, highY, width, lowY - highY);
        }
    }
}

// Инициализация обработчиков событий
function initializeEventListeners() {
    console.log('Инициализация обработчиков событий...');
    
    // Выбор актива
    const assetSelect = document.getElementById('asset-select');
    if (assetSelect) {
        assetSelect.addEventListener('change', function() {
            currentAsset = this.value;
            console.log('Актив изменен на:', currentAsset);
            updateAssetInfo();
            updateChart();
        });
    }
    
    // Кнопки таймфреймов
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentTimeframe = parseInt(this.dataset.time);
            console.log('Таймфрейм изменен на:', currentTimeframe);
            
            document.getElementById('current-tf').textContent = 
                TRADING_CONFIG.timeframes[currentTimeframe].name;
        });
    });
    
    // Кнопка генерации сигнала
    const generateBtn = document.getElementById('generate-signal');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateSignal);
    }
    
    console.log('Обработчики событий инициализированы');
}

// Обновление информации об активе
function updateAssetInfo() {
    const asset = TRADING_CONFIG.assets[currentAsset];
    if (!asset) return;
    
    document.getElementById('current-pair').textContent = asset.name;
    document.getElementById('current-price').textContent = asset.price.toFixed(4);
    
    // Обновляем изменение цены
    updatePriceChange();
}

// Обновление изменения цены
function updatePriceChange() {
    const changeElement = document.getElementById('price-change');
    if (!changeElement) return;
    
    const change = (Math.random() - 0.5) * 0.2;
    changeElement.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
    changeElement.className = change >= 0 ? 'positive' : 'negative';
}

// Обновление реальной цены (симуляция)
function updateRealPrice() {
    const asset = TRADING_CONFIG.assets[currentAsset];
    if (!asset) return;
    
    // Симулируем небольшое изменение цены
    const change = (Math.random() - 0.5) * asset.volatility * 0.0001;
    asset.price *= (1 + change);
    
    // Обновляем отображение
    updateAssetInfo();
    
    // Обновляем график если он активен
    if (currentChart) {
        updateChart();
    }
}

// Обновление графика
function updateChart() {
    if (!currentChart) {
        initializeChart();
        return;
    }
    
    // Генерируем новые данные
    const newData = generateChartData();
    
    // Обновляем данные графика
    currentChart.data.datasets[0].data = newData.candles;
    currentChart.data.datasets[0].label = currentAsset;
    
    // Обновляем график
    currentChart.update();
}

// Генерация торгового сигнала
function generateSignal() {
    if (isSignalActive) {
        console.log('Сигнал уже активен, пожалуйста подождите...');
        return;
    }
    
    console.log('Генерация нового сигнала...');
    
    const signalBtn = document.getElementById('generate-signal');
    if (signalBtn) {
        signalBtn.disabled = true;
        signalBtn.classList.add('signal-active');
    }
    
    isSignalActive = true;
    
    // Показываем анимацию анализа
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        signalContent.innerHTML = `
            <div class="signal-analyzing" style="text-align: center;">
                <div class="loader"></div>
                <p style="margin-top: 15px; color: #8b9dc3; font-size: 16px;">
                    <i class="fas fa-chart-line"></i><br>
                    Анализ рынка...
                </p>
            </div>
        `;
    }
    
    // Обновляем статус сигнала
    updateSignalStatus('Анализ', '#ffaa00');
    
    // Симулируем задержку анализа
    setTimeout(() => {
        createSignal();
    }, 2000);
}

// Обновление статуса сигнала
function updateSignalStatus(text, color) {
    const signalStatus = document.getElementById('signal-status');
    const statusText = document.getElementById('status-text');
    
    if (signalStatus && statusText) {
        const dot = signalStatus.querySelector('.status-dot');
        if (dot) dot.style.background = color;
        statusText.textContent = text;
        statusText.style.color = color;
    }
}

// Создание сигнала
function createSignal() {
    console.log('Создание сигнала для', currentAsset);
    
    const asset = TRADING_CONFIG.assets[currentAsset];
    if (!asset) return;
    
    const currentPrice = asset.price;
    const volatility = asset.volatility;
    
    // Логика технического анализа
    const rsi = 30 + Math.random() * 40; // 30-70
    const macd = (Math.random() - 0.5) * 2;
    const trend = Math.random() > 0.5 ? 'UP' : 'DOWN';
    
    // Определяем направление на основе технического анализа
    let direction;
    let confidence;
    
    if (rsi < 40 && macd < 0 && trend === 'UP') {
        direction = 'BUY'; // Перепроданность с бычьим трендом
        confidence = 82 + Math.random() * 15; // 82-97%
    } else if (rsi > 60 && macd > 0 && trend === 'DOWN') {
        direction = 'SELL'; // Перекупленность с медвежьим трендом
        confidence = 82 + Math.random() * 15;
    } else if (trend === 'UP') {
        direction = 'BUY';
        confidence = 75 + Math.random() * 15; // 75-90%
    } else {
        direction = 'SELL';
        confidence = 75 + Math.random() * 15;
    }
    
    // Ограничиваем уверенность 99%
    confidence = Math.min(99, Math.round(confidence));
    
    // Создаем объект сигнала
    currentSignal = {
        asset: currentAsset,
        pair: asset.name,
        direction: direction,
        entryPrice: currentPrice,
        expiration: currentTimeframe,
        confidence: confidence,
        timestamp: Date.now(),
        result: null,
        priceHistory: []
    };
    
    console.log('Сигнал создан:', currentSignal);
    
    // Отображаем сигнал
    displaySignal();
    
    // Запускаем таймер экспирации
    startExpirationTimer();
}

// Отображение сгенерированного сигнала
function displaySignal() {
    const signal = currentSignal;
    if (!signal) return;
    
    // Скрываем заполнитель, показываем детали
    document.getElementById('signal-content').style.display = 'none';
    document.getElementById('signal-details').style.display = 'block';
    document.getElementById('expiration-timer').style.display = 'block';
    
    // Обновляем детали сигнала
    document.getElementById('signal-pair').textContent = signal.pair;
    
    const directionElement = document.getElementById('signal-direction');
    directionElement.textContent = signal.direction === 'BUY' ? 'ПОКУПКА' : 'ПРОДАЖА';
    directionElement.setAttribute('data-direction', signal.direction);
    
    document.getElementById('signal-entry').textContent = signal.entryPrice.toFixed(4);
    document.getElementById('signal-accuracy').textContent = signal.confidence + '%';
    document.getElementById('signal-expiration').textContent = TRADING_CONFIG.timeframes[signal.expiration].name;
    
    const time = new Date(signal.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    document.getElementById('signal-time').textContent = time;
    
    // Обновляем статус сигнала
    const statusColor = signal.direction === 'BUY' ? '#00ff88' : '#ff4444';
    updateSignalStatus('АКТИВЕН', statusColor);
    
    // Начинаем запись истории цен для этого сигнала
    startPriceRecording();
}

// Начало записи истории цен
function startPriceRecording() {
    if (!currentSignal) return;
    
    // Очищаем предыдущую историю
    currentSignal.priceHistory = [];
    
    // Записываем начальную цену
    const asset = TRADING_CONFIG.assets[currentAsset];
    if (asset) {
        currentSignal.priceHistory.push({
            time: Date.now(),
            price: asset.price
        });
    }
}

// Запуск таймера экспирации (ИСПРАВЛЕННАЯ ВЕРСИЯ)
function startExpirationTimer() {
    if (!currentSignal) return;
    
    const expirationTime = TRADING_CONFIG.timeframes[currentSignal.expiration].seconds;
    let timeLeft = expirationTime;
    
    const timerBar = document.getElementById('timer-bar');
    const timerValue = document.getElementById('timer-value');
    
    if (!timerBar || !timerValue) return;
    
    // Сбрасываем анимацию
    timerBar.style.transition = 'none';
    timerBar.style.transform = 'scaleX(1)';
    timerBar.style.background = 'linear-gradient(90deg, #00ff88, #0066ff)';
    
    // Форсируем перерисовку
    timerBar.offsetHeight;
    
    // Устанавливаем плавную анимацию
    timerBar.style.transition = `transform ${expirationTime}s linear`;
    timerBar.style.transform = 'scaleX(0)';
    
    // Запускаем отсчет
    expirationTimer = setInterval(() => {
        timeLeft--;
        
        // Обновляем отображение таймера
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerValue.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Изменяем цвет в зависимости от времени
        const progress = timeLeft / expirationTime;
        
        if (progress < 0.3) {
            timerBar.style.background = 'linear-gradient(90deg, #ff4444, #ffaa00)';
        } else if (progress < 0.7) {
            timerBar.style.background = 'linear-gradient(90deg, #ffaa00, #00ff88)';
        }
        
        // Экспирация завершена
        if (timeLeft <= 0) {
            clearInterval(expirationTimer);
            calculateSignalResult();
        }
    }, 1000);
    
    // Начальное обновление
    const initialMinutes = Math.floor(expirationTime / 60);
    const initialSeconds = expirationTime % 60;
    timerValue.textContent = `${initialMinutes.toString().padStart(2, '0')}:${initialSeconds.toString().padStart(2, '0')}`;
}

// Расчет результата сигнала
function calculateSignalResult() {
    console.log('Расчет результата сигнала...');
    
    const signal = currentSignal;
    if (!signal) return;
    
    const asset = TRADING_CONFIG.assets[signal.asset];
    if (!asset) return;
    
    // Получаем финальную цену (симулируем движение)
    const volatility = asset.volatility;
    const randomMove = (Math.random() - 0.5) * volatility * 0.01;
    const finalPrice = signal.entryPrice * (1 + randomMove);
    
    // Определяем результат на основе направления и движения цены
    let result;
    
    if (signal.direction === 'BUY') {
        result = finalPrice > signal.entryPrice * 1.0001 ? 'WIN' : 
                finalPrice < signal.entryPrice * 0.9999 ? 'LOSS' : 'REFUND';
    } else { // SELL
        result = finalPrice < signal.entryPrice * 0.9999 ? 'WIN' : 
                finalPrice > signal.entryPrice * 1.0001 ? 'LOSS' : 'REFUND';
    }
    
    // Обновляем сигнал результатом
    signal.result = result;
    signal.exitPrice = finalPrice;
    
    console.log('Результат сигнала:', result, 'Вход:', signal.entryPrice, 'Выход:', finalPrice);
    
    // Отображаем результат
    displayResult(result, finalPrice);
    
    // Добавляем в историю
    addToHistory(signal);
    
    // Сбрасываем после задержки
    setTimeout(resetSignal, 3000);
}

// Отображение результата
function displayResult(result, finalPrice) {
    const resultText = result === 'WIN' ? 'ВЫИГРЫШ' : 
                     result === 'LOSS' ? 'ПРОИГРЫШ' : 'ВОЗВРАТ';
    const resultColor = result === 'WIN' ? '#00ff88' : 
                       result === 'LOSS' ? '#ff4444' : '#8b9dc3';
    
    // Обновляем детали сигнала с результатом
    const detailsElement = document.getElementById('signal-details');
    if (detailsElement) {
        detailsElement.innerHTML += `
            <div class="detail-row" style="margin-top: 15px; padding-top: 15px; border-top: 2px solid ${resultColor}30;">
                <span class="detail-label">Результат:</span>
                <span class="detail-value" style="color: ${resultColor}; font-weight: 800; font-size: 16px;">
                    ${resultText}
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Цена выхода:</span>
                <span class="detail-value">${finalPrice.toFixed(4)}</span>
            </div>
        `;
    }
    
    // Обновляем статус сигнала
    updateSignalStatus(resultText, resultColor);
}

// Добавление сигнала в историю
function addToHistory(signal) {
    const resultItem = {
        id: Date.now(),
        pair: signal.pair,
        direction: signal.direction,
        entryPrice: signal.entryPrice,
        exitPrice: signal.exitPrice,
        accuracy: signal.confidence,
        result: signal.result,
        timeframe: TRADING_CONFIG.timeframes[signal.expiration].name,
        priceHistory: signal.priceHistory || [],
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        timestamp: Date.now(),
        expanded: false
    };
    
    resultsHistory.unshift(resultItem);
    
    // Сохраняем только последние 10 результатов
    if (resultsHistory.length > 10) {
        resultsHistory = resultsHistory.slice(0, 10);
    }
    
    // Обновляем отображение истории
    updateHistoryDisplay();
    
    // Обновляем статистику
    updateStats();
    
    // Сохраняем в localStorage
    localStorage.setItem('scalpingRobotResults', JSON.stringify(resultsHistory));
}

// Обновление отображения истории
function updateHistoryDisplay() {
    const resultsList = document.getElementById('results-list');
    if (!resultsList) return;
    
    resultsList.innerHTML = '';
    
    resultsHistory.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${item.result.toLowerCase()} ${item.expanded ? 'expanded' : ''}`;
        resultItem.dataset.id = item.id;
        
        const directionText = item.direction === 'BUY' ? 'ПОКУПКА' : 'ПРОДАЖА';
        const directionColor = item.direction === 'BUY' ? '#00ff88' : '#ff4444';
        const resultColor = item.result === 'WIN' ? '#00ff88' : 
                           item.result === 'LOSS' ? '#ff4444' : '#8b9dc3';
        const resultText = item.result === 'WIN' ? 'ВЫИГРЫШ' : 
                          item.result === 'LOSS' ? 'ПРОИГРЫШ' : 'ВОЗВРАТ';
        
        // Создаем простой мини-график
        const chartHTML = createSimpleChart(item);
        
        resultItem.innerHTML = `
            <div class="result-header">
                <div class="result-main-info">
                    <div class="result-pair">${item.pair}</div>
                    <div class="result-direction ${item.direction.toLowerCase()}" style="color: ${directionColor}">
                        ${directionText}
                    </div>
                    <div class="result-accuracy" style="color: ${item.accuracy > 80 ? '#00ff88' : '#ffaa00'}">
                        ${item.accuracy}%
                    </div>
                </div>
                <div class="result-price-info">
                    <div class="price-entry">
                        <div class="price-label">Вход:</div>
                        <div class="price-value">${item.entryPrice.toFixed(4)}</div>
                    </div>
                    <div class="price-exit">
                        <div class="price-label">Выход:</div>
                        <div class="price-value">${item.exitPrice.toFixed(4)}</div>
                    </div>
                </div>
            </div>
            <div class="result-details">
                <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 5px;">
                    График цены:
                </div>
                <div class="price-chart-mini">
                    ${chartHTML}
                </div>
            </div>
            <div class="result-footer">
                <div class="result-time">
                    <i class="far fa-clock"></i>
                    ${item.time} • ${item.timeframe}
                </div>
                <button class="result-expand" onclick="toggleResultExpand(${item.id})">
                    <i class="fas fa-${item.expanded ? 'chevron-up' : 'chevron-down'}"></i>
                    ${item.expanded ? 'Свернуть' : 'Развернуть'}
                </button>
            </div>
        `;
        
        resultsList.appendChild(resultItem);
    });
}

// Создание простого мини-графика
function createSimpleChart(item) {
    // Создаем простой линейный график
    const width = 200;
    const height = 40;
    
    // Симулируем данные если их нет
    const prices = item.priceHistory && item.priceHistory.length > 0 
        ? item.priceHistory.map(p => p.price)
        : [item.entryPrice, item.exitPrice];
    
    const color = item.result === 'WIN' ? '#00ff88' : 
                 item.result === 'LOSS' ? '#ff4444' : '#8b9dc3';
    
    // Создаем SVG
    return `
        <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" style="overflow: visible;">
            <line x1="0" y1="${height/2}" x2="${width}" y2="${height/2}" 
                  stroke="#2a3655" stroke-width="1" />
            <polyline points="${prices.map((p, i) => 
                `${i * (width/(prices.length-1))},${height/2 + (item.entryPrice - p) * 10}`
            ).join(' ')}" 
                fill="none" stroke="${color}" stroke-width="2" />
        </svg>
    `;
}

// Переключение развертывания/свертывания результата
function toggleResultExpand(id) {
    const item = resultsHistory.find(r => r.id === id);
    if (item) {
        item.expanded = !item.expanded;
        updateHistoryDisplay();
        localStorage.setItem('scalpingRobotResults', JSON.stringify(resultsHistory));
    }
}

// Обновление статистики
function updateStats() {
    const totalTrades = resultsHistory.length;
    const wins = resultsHistory.filter(r => r.result === 'WIN').length;
    const losses = resultsHistory.filter(r => r.result === 'LOSS').length;
    const refunds = resultsHistory.filter(r => r.result === 'REFUND').length;
    
    // Рассчитываем винрейт (исключая возвраты)
    const winRate = (wins + losses) > 0 ? (wins / (wins + losses) * 100) : 0;
    
    // Рассчитываем точность (считая возвраты как 0.5)
    const accuracy = totalTrades > 0 ? ((wins + (refunds * 0.5)) / totalTrades * 100) : 0;
    
    // Рассчитываем профит фактор
    const profitFactor = losses > 0 ? (wins / losses).toFixed(2) : '∞';
    
    // Считаем сделки за сегодня
    const today = new Date().toDateString();
    const todayTrades = resultsHistory.filter(r => 
        new Date(r.timestamp).toDateString() === today
    ).length;
    
    // Обновляем отображение
    document.getElementById('win-rate').textContent = winRate.toFixed(1) + '%';
    document.getElementById('profit-factor').textContent = profitFactor;
    document.getElementById('today-trades').textContent = todayTrades;
    document.getElementById('total-signals').textContent = totalTrades;
    
    // Обновляем индикатор точности
    const accuracyFill = document.getElementById('accuracy-fill');
    const accuracyValue = document.getElementById('accuracy-value');
    if (accuracyFill && accuracyValue) {
        const displayAccuracy = totalTrades > 0 ? accuracy : 87.4;
        accuracyFill.style.width = displayAccuracy + '%';
        accuracyValue.textContent = displayAccuracy.toFixed(1) + '%';
    }
}

// Обновление отображения статистики (начальное)
function updateStatsDisplay() {
    updateStats();
}

// Сброс состояния сигнала
function resetSignal() {
    console.log('Сброс состояния сигнала...');
    
    isSignalActive = false;
    currentSignal = null;
    
    const signalBtn = document.getElementById('generate-signal');
    if (signalBtn) {
        signalBtn.disabled = false;
        signalBtn.classList.remove('signal-active');
    }
    
    // Показываем заполнитель, скрываем детали и таймер
    document.getElementById('signal-content').style.display = 'flex';
    document.getElementById('signal-details').style.display = 'none';
    document.getElementById('expiration-timer').style.display = 'none';
    
    // Сбрасываем заполнитель
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        signalContent.innerHTML = `
            <div class="signal-placeholder">
                <i class="fas fa-chart-line"></i>
                <p>Нажмите "Получить сигнал" для анализа</p>
            </div>
        `;
    }
    
    // Сбрасываем статус сигнала
    updateSignalStatus('Ожидание', '#00ff88');
    
    // Сбрасываем таймер
    const timerBar = document.getElementById('timer-bar');
    if (timerBar) {
        timerBar.style.transition = 'none';
        timerBar.style.transform = 'scaleX(1)';
    }
    
    // Очищаем оставшийся таймер
    if (expirationTimer) {
        clearInterval(expirationTimer);
        expirationTimer = null;
    }
    
    console.log('Состояние сигнала сброшено');
}

// Загрузка истории из localStorage
function loadResultsHistory() {
    try {
        const saved = localStorage.getItem('scalpingRobotResults');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Убеждаемся, что все элементы имеют обязательные поля
            resultsHistory = parsed.map(item => ({
                ...item,
                expanded: item.expanded || false,
                priceHistory: item.priceHistory || []
            }));
            updateHistoryDisplay();
            console.log('Загружена история:', resultsHistory.length, 'элементов');
        }
    } catch (error) {
        console.error('Ошибка загрузки истории:', error);
    }
}

// Обновление отображения времени
function updateTimeDisplay() {
    const now = new Date();
    const timeString = now.toUTCString().split(' ')[4];
    const timeText = document.getElementById('time-text');
    
    if (timeText) {
        timeText.textContent = timeString + ' UTC';
    }
}

// Делаем toggleResultExpand глобально доступной
window.toggleResultExpand = toggleResultExpand;

// Инициализация с значениями по умолчанию
updateAssetInfo();
