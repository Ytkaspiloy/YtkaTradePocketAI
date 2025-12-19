// Конфигурация
const assets = {
    'EURUSD': { name: 'EUR/USD', price: 1.0830 },
    'USDJPY': { name: 'USD/JPY', price: 148.35 },
    'GBPUSD': { name: 'GBP/USD', price: 1.2650 },
    'AUDUSD': { name: 'AUD/USD', price: 0.6590 },
    'USDCAD': { name: 'USD/CAD', price: 1.3520 }
};

let currentChart = null;
let currentSignal = null;
let isSignalActive = false;
let expirationTimer = null;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен');
    
    // Инициализация графика
    initChart();
    
    // Инициализация событий
    initEvents();
    
    // Обновление времени
    updateTime();
    setInterval(updateTime, 1000);
});

// Инициализация графика
function initChart() {
    const ctx = document.getElementById('trading-chart').getContext('2d');
    
    // Генерация тестовых данных
    const data = generateChartData();
    
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Цена',
                data: data.prices,
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true }
            },
            scales: {
                x: {
                    grid: { color: '#2a3655' },
                    ticks: { color: '#8b9dc3' }
                },
                y: {
                    grid: { color: '#2a3655' },
                    ticks: { color: '#8b9dc3' }
                }
            }
        }
    });
}

// Генерация данных графика
function generateChartData() {
    const labels = [];
    const prices = [];
    
    // 24 точки (24 часа)
    for (let i = 23; i >= 0; i--) {
        const time = new Date();
        time.setHours(time.getHours() - i);
        labels.push(time.getHours() + ':00');
        
        // Случайное движение цены
        const lastPrice = prices.length > 0 ? prices[prices.length - 1] : 1.0830;
        const change = (Math.random() - 0.5) * 0.002;
        prices.push(lastPrice * (1 + change));
    }
    
    return { labels, prices };
}

// Инициализация событий
function initEvents() {
    // Выбор актива
    const assetSelect = document.getElementById('asset-select');
    if (assetSelect) {
        assetSelect.addEventListener('change', function() {
            updateAssetInfo(this.value);
        });
    }
    
    // Кнопки таймфреймов
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Снять активный класс со всех
            document.querySelectorAll('.time-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Добавить активный класс нажатой
            this.classList.add('active');
            
            // Обновить отображение
            const time = this.dataset.time;
            const timeText = time === '60' ? '1 мин' : 
                           time === '120' ? '2 мин' : 
                           time === '180' ? '3 мин' : '5 мин';
            document.getElementById('current-tf').textContent = timeText;
        });
    });
    
    // Кнопка генерации сигнала
    const generateBtn = document.getElementById('generate-signal');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateSignal);
    }
}

// Обновление информации об активе
function updateAssetInfo(asset) {
    const assetData = assets[asset];
    if (!assetData) return;
    
    document.getElementById('current-pair').textContent = assetData.name;
    document.getElementById('current-price').textContent = assetData.price.toFixed(4);
    
    // Случайное изменение цены
    const change = (Math.random() - 0.5) * 0.1;
    const changeElement = document.getElementById('price-change');
    changeElement.textContent = (change >= 0 ? '+' : '') + change.toFixed(2) + '%';
    changeElement.className = change >= 0 ? 'positive' : 'negative';
}

// Генерация сигнала
function generateSignal() {
    if (isSignalActive) {
        alert('Дождитесь завершения текущего сигнала');
        return;
    }
    
    isSignalActive = true;
    
    // Блокируем кнопку
    const btn = document.getElementById('generate-signal');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> АНАЛИЗ...';
    
    // Показываем статус анализа
    const statusElement = document.getElementById('signal-status');
    const statusText = document.getElementById('status-text');
    if (statusElement && statusText) {
        statusText.textContent = 'Анализ';
        statusText.style.color = '#ffaa00';
        const dot = statusElement.querySelector('.status-dot');
        if (dot) dot.style.background = '#ffaa00';
    }
    
    // Очищаем предыдущий сигнал
    const signalContent = document.getElementById('signal-content');
    if (signalContent) {
        signalContent.innerHTML = `
            <div style="text-align: center; color: #8b9dc3;">
                <div class="loader" style="display: inline-block; width: 40px; height: 40px; border: 3px solid #2a3655; border-top-color: #00ff88; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="margin-top: 10px;">Анализ рынка...</p>
            </div>
        `;
    }
    
    // Имитация анализа (2 секунды)
    setTimeout(() => {
        createSignal();
    }, 2000);
}

// Создание сигнала
function createSignal() {
    // Выбираем случайное направление
    const direction = Math.random() > 0.5 ? 'BUY' : 'SELL';
    const confidence = Math.floor(70 + Math.random() * 25); // 70-95%
    const asset = document.getElementById('asset-select').value;
    const assetData = assets[asset];
    
    // Создаем объект сигнала
    currentSignal = {
        asset: asset,
        pair: assetData.name,
        direction: direction,
        entryPrice: assetData.price,
        confidence: confidence,
        timestamp: new Date()
    };
    
    // Отображаем сигнал
    displaySignal();
    
    // Запускаем таймер
    startTimer();
}

// Отображение сигнала
function displaySignal() {
    // Скрываем контент, показываем детали
    document.getElementById('signal-content').style.display = 'none';
    document.getElementById('signal-details').style.display = 'block';
    document.getElementById('expiration-timer').style.display = 'block';
    
    const detailsElement = document.getElementById('signal-details');
    if (detailsElement) {
        detailsElement.innerHTML = `
            <div style="padding: 15px;">
                <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                    <span style="color: #8b9dc3;">Инструмент:</span>
                    <span style="font-weight: bold;">${currentSignal.pair}</span>
                </div>
                <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                    <span style="color: #8b9dc3;">Направление:</span>
                    <span style="font-weight: bold; color: ${currentSignal.direction === 'BUY' ? '#00ff88' : '#ff4444'}">
                        ${currentSignal.direction === 'BUY' ? 'ПОКУПКА' : 'ПРОДАЖА'}
                    </span>
                </div>
                <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                    <span style="color: #8b9dc3;">Цена входа:</span>
                    <span style="font-weight: bold;">${currentSignal.entryPrice.toFixed(4)}</span>
                </div>
                <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                    <span style="color: #8b9dc3;">Точность:</span>
                    <span style="font-weight: bold; color: #00ff88">${currentSignal.confidence}%</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #8b9dc3;">Время:</span>
                    <span style="font-size: 12px; color: #5d6d97;">
                        ${currentSignal.timestamp.toLocaleTimeString()}
                    </span>
                </div>
            </div>
        `;
    }
    
    // Обновляем статус
    const statusElement = document.getElementById('signal-status');
    const statusText = document.getElementById('status-text');
    if (statusElement && statusText) {
        statusText.textContent = 'АКТИВЕН';
        statusText.style.color = currentSignal.direction === 'BUY' ? '#00ff88' : '#ff4444';
        const dot = statusElement.querySelector('.status-dot');
        if (dot) dot.style.background = currentSignal.direction === 'BUY' ? '#00ff88' : '#ff4444';
    }
}

// Запуск таймера (ИСПРАВЛЕННЫЙ)
function startTimer() {
    const totalTime = 60; // 1 минута
    let timeLeft = totalTime;
    
    const timerBar = document.getElementById('timer-bar');
    const timerValue = document.getElementById('timer-value');
    
    // Сбрасываем стили
    timerBar.style.transition = 'none';
    timerBar.style.transform = 'scaleX(1)';
    timerBar.offsetHeight; // Форсируем перерисовку
    
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
        
        // Меняем цвет при малом времени
        if (timeLeft < 10) {
            timerBar.style.background = 'linear-gradient(90deg, #ff4444, #ffaa00)';
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
    // Определяем результат
    const randomResult = Math.random();
    let result, resultColor, resultText;
    
    if (randomResult > 0.6) {
        result = 'WIN';
        resultColor = '#00ff88';
        resultText = 'ВЫИГРЫШ';
    } else if (randomResult > 0.3) {
        result = 'LOSS';
        resultColor = '#ff4444';
        resultText = 'ПРОИГРЫШ';
    } else {
        result = 'REFUND';
        resultColor = '#8b9dc3';
        resultText = 'ВОЗВРАТ';
    }
    
    // Показываем результат
    const detailsElement = document.getElementById('signal-details');
    if (detailsElement) {
        detailsElement.innerHTML += `
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #2a3655;">
                <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: ${resultColor}; margin-bottom: 5px;">
                        ${resultText}
                    </div>
                    <div style="font-size: 12px; color: #8b9dc3;">
                        Сигнал завершен
                    </div>
                </div>
            </div>
        `;
    }
    
    // Обновляем статус
    const statusElement = document.getElementById('signal-status');
    const statusText = document.getElementById('status-text');
    if (statusElement && statusText) {
        statusText.textContent = resultText;
        statusText.style.color = resultColor;
        const dot = statusElement.querySelector('.status-dot');
        if (dot) dot.style.background = resultColor;
    }
    
    // Добавляем в историю
    addToHistory(result, resultText, resultColor);
    
    // Сбрасываем через 3 секунды
    setTimeout(resetSignal, 3000);
}

// Добавление в историю
function addToHistory(result, resultText, resultColor) {
    const resultsList = document.getElementById('results-list');
    if (!resultsList) return;
    
    const historyItem = document.createElement('div');
    historyItem.style.cssText = `
        background: #131a2d;
        padding: 8px 12px;
        border-radius: 6px;
        border-left: 3px solid ${resultColor};
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
    `;
    
    historyItem.innerHTML = `
        <div>
            <span style="font-weight: bold;">${currentSignal.pair}</span>
            <span style="margin: 0 8px; color: ${currentSignal.direction === 'BUY' ? '#00ff88' : '#ff4444'}">
                ${currentSignal.direction === 'BUY' ? '↑' : '↓'}
            </span>
            <span style="color: ${resultColor}">${resultText}</span>
        </div>
        <div style="color: #5d6d97;">
            ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
    `;
    
    // Добавляем в начало
    resultsList.insertBefore(historyItem, resultsList.firstChild);
    
    // Обновляем статистику
    updateStats();
}

// Обновление статистики
function updateStats() {
    const results = document.querySelectorAll('#results-list > div');
    const totalTrades = results.length;
    const wins = Array.from(results).filter(r => r.textContent.includes('ВЫИГРЫШ')).length;
    const accuracy = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : 0;
    
    document.getElementById('total-trades').textContent = totalTrades;
    document.getElementById('accuracy').textContent = accuracy + '%';
    document.getElementById('win-rate').textContent = accuracy + '%';
}

// Сброс сигнала
function resetSignal() {
    isSignalActive = false;
    currentSignal = null;
    
    // Восстанавливаем кнопку
    const btn = document.getElementById('generate-signal');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-bolt"></i> ПОЛУЧИТЬ СИГНАЛ';
    
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
    const statusElement = document.getElementById('signal-status');
    const statusText = document.getElementById('status-text');
    if (statusElement && statusText) {
        statusText.textContent = 'Ожидание';
        statusText.style.color = '';
        const dot = statusElement.querySelector('.status-dot');
        if (dot) dot.style.background = '#00ff88';
    }
    
    // Сбрасываем таймер
    const timerBar = document.getElementById('timer-bar');
    const timerValue = document.getElementById('timer-value');
    if (timerBar && timerValue) {
        timerBar.style.transition = 'none';
        timerBar.style.transform = 'scaleX(1)';
        timerBar.style.background = 'linear-gradient(90deg, #00ff88, #0066ff)';
        timerValue.textContent = '01:00';
    }
    
    // Очищаем интервал
    if (expirationTimer) {
        clearInterval(expirationTimer);
        expirationTimer = null;
    }
}

// Обновление времени
function updateTime() {
    const now = new Date();
    const timeString = now.toUTCString().split(' ')[4];
    const timeElement = document.getElementById('time-text');
    
    if (timeElement) {
        timeElement.textContent = timeString + ' UTC';
    }
}

// Добавляем CSS для анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
