// TradeSignal Premium Bot - JavaScript Logic

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== ДАННЫЕ АКТИВОВ ====================
    const forexAssets = [
        "GBP/CAD", "EUR/JPY", "CHF/JPY", "AUD/CAD", "USD/CAD", "USD/CHF", 
        "GBP/AUD", "USD/JPY", "EUR/USD", "EUR/AUD", "AUD/USD", "CAD/JPY",
        "AUD/JPY", "EUR/GBP", "GBP/JPY", "GBP/CHF", "EUR/CAD", "CAD/CHF", "AUD/CHF"
    ];

    const otcData = {
        currencies: ["EUR/USD OTC", "GBP/USD OTC", "USD/JPY OTC", "AUD/USD OTC", "USD/CAD OTC", "EUR/GBP OTC", "USD/CHF OTC", "NZD/USD OTC"],
        crypto: ["BTC/USD", "ETH/USD", "XRP/USD", "LTC/USD", "BNB/USD", "SOL/USD", "ADA/USD", "DOT/USD"],
        stocks: ["AAPL", "TSLA", "AMZN", "GOOGL", "MSFT", "META", "NFLX", "NVDA"],
        indices: ["S&P 500", "NASDAQ", "DJIA", "FTSE 100", "DAX 40", "NIKKEI 225", "HSI"]
    };

    // ==================== СОСТОЯНИЕ ПРИЛОЖЕНИЯ ====================
    let currentAsset = "EUR/USD";
    let currentTimeframe = 5; // минуты
    let timerInterval = null;
    let timerSeconds = 0;
    let isTimerRunning = false;
    let currentTab = 'forex';
    let tvWidget = null;

    // ==================== DOM ЭЛЕМЕНТЫ ====================
    const assetSearch = document.getElementById('assetSearch');
    const assetsList = document.getElementById('assetsList');
    const otcCategories = document.getElementById('otcCategories');
    const currentAssetEl = document.getElementById('currentAsset');
    const timeframeSelect = document.getElementById('timeframeSelect');
    const generateBtn = document.getElementById('generateBtn');
    const timerDisplay = document.getElementById('timerDisplay');
    const timerValue = document.getElementById('timerValue');
    const signalCard = document.getElementById('signalCard');
    const signalDirection = document.getElementById('signalDirection');
    const signalProbability = document.getElementById('signalProbability');
    const signalTimeframe = document.getElementById('signalTimeframe');
    const signalExpiry = document.getElementById('signalExpiry');
    const signalVolatility = document.getElementById('signalVolatility');
    const signalAdvice = document.getElementById('signalAdvice');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const chartPlaceholder = document.getElementById('chartPlaceholder');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // OTC контейнеры
    const otcCurrencies = document.getElementById('otcCurrencies');
    const otcCrypto = document.getElementById('otcCrypto');
    const otcStocks = document.getElementById('otcStocks');
    const otcIndices = document.getElementById('otcIndices');

    // ==================== ИНИЦИАЛИЗАЦИЯ ====================
    function init() {
        renderForexList(forexAssets);
        renderOTCList();
        loadTradingViewChart(currentAsset);
        setupEventListeners();
        loadHistory();
    }

    // ==================== РЕНДЕРИНГ СПИСКОВ ====================
    function renderForexList(assets) {
        assetsList.innerHTML = '';
        assets.forEach(asset => {
            const item = createAssetItem(asset, 'forex');
            assetsList.appendChild(item);
        });
    }

    function createAssetItem(asset, type) {
        const div = document.createElement('div');
        div.className = `asset-item ${asset === currentAsset && currentTab === type ? 'active' : ''}`;
        div.innerHTML = `
            <span class="asset-symbol">${asset}</span>
            <span class="asset-change positive">+0.00%</span>
        `;
        div.addEventListener('click', () => selectAsset(asset, type));
        return div;
    }

    function renderOTCList() {
        // Валюты OTC
        otcCurrencies.innerHTML = '';
        otcData.currencies.forEach(c => {
            const item = createAssetItem(c, 'otc');
            otcCurrencies.appendChild(item);
        });
        
        // Криптовалюты
        otcCrypto.innerHTML = '';
        otcData.crypto.forEach(c => {
            const item = createAssetItem(c, 'otc');
            otcCrypto.appendChild(item);
        });
        
        // Акции
        otcStocks.innerHTML = '';
        otcData.stocks.forEach(s => {
            const item = createAssetItem(s, 'otc');
            otcStocks.appendChild(item);
        });
        
        // Индексы
        otcIndices.innerHTML = '';
        otcData.indices.forEach(i => {
            const item = createAssetItem(i, 'otc');
            otcIndices.appendChild(item);
        });
    }

    function selectAsset(asset, type) {
        currentAsset = asset;
        currentTab = type;
        currentAssetEl.textContent = asset;
        
        // Обновить активные классы
        document.querySelectorAll('.asset-item').forEach(el => el.classList.remove('active'));
        const allItems = document.querySelectorAll('.asset-item');
        allItems.forEach(item => {
            if (item.querySelector('.asset-symbol').textContent === asset) {
                item.classList.add('active');
            }
        });
        
        // Загрузить график только для FOREX
        if (type === 'forex') {
            loadTradingViewChart(asset);
            document.getElementById('tradingviewChart').style.display = 'block';
            chartPlaceholder.style.display = 'none';
        } else {
            // Для OTC скрываем график
            if (tvWidget) {
                tvWidget.remove();
                tvWidget = null;
            }
            document.getElementById('tradingviewChart').innerHTML = '<div class="chart-placeholder" id="chartPlaceholder"><span>📊 Графики недоступны для OTC активов</span></div>';
        }
        
        // Сбросить сигнал
        resetSignal();
    }

    // ==================== TRADINGVIEW ГРАФИК ====================
    function loadTradingViewChart(symbol) {
        // Очистить контейнер
        const chartContainer = document.getElementById('tradingviewChart');
        chartContainer.innerHTML = '';
        
        // Форматировать символ для TradingView (например, EUR/USD -> FX:EURUSD)
        let tvSymbol = symbol.replace('/', '');
        if (forexAssets.includes(symbol)) {
            tvSymbol = `FX:${tvSymbol}`;
        }
        
        try {
            tvWidget = new TradingView.widget({
                "container_id": "tradingviewChart",
                "autosize": true,
                "symbol": tvSymbol,
                "interval": getTVInterval(currentTimeframe),
                "timezone": "Europe/Moscow",
                "theme": "dark",
                "style": "1",
                "locale": "ru",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "hide_top_toolbar": false,
                "hide_side_toolbar": false,
                "allow_symbol_change": false,
                "save_image": false,
                "details": true,
                "hotlist": false,
                "calendar": false,
                "studies": [
                    "MASimple@tv-basicstudies",
                    "RSI@tv-basicstudies",
                    "MACD@tv-basicstudies"
                ],
                "width": "100%",
                "height": "100%"
            });
        } catch (e) {
            console.error('TradingView widget error:', e);
            chartContainer.innerHTML = '<div class="chart-placeholder"><span>⚠️ Ошибка загрузки графика. Проверьте подключение.</span></div>';
        }
    }

    function getTVInterval(minutes) {
        const map = {
            1: "1",
            2: "2",
            3: "3",
            5: "5",
            10: "10",
            15: "15",
            30: "30",
            60: "60",
            240: "240"
        };
        return map[minutes] || "5";
    }

    // ==================== ТАЙМЕР И СИГНАЛЫ ====================
    function startTimer() {
        if (isTimerRunning) return;
        
        timerSeconds = currentTimeframe * 60;
        isTimerRunning = true;
        generateBtn.disabled = true;
        generateBtn.classList.add('disabled');
        timerDisplay.classList.add('active');
        
        updateTimerDisplay();
        
        timerInterval = setInterval(() => {
            timerSeconds--;
            updateTimerDisplay();
            
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                generateBtn.disabled = false;
                generateBtn.classList.remove('disabled');
                timerDisplay.classList.remove('active');
                timerValue.textContent = '00:00';
                generateSignal();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        timerValue.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function generateSignal() {
        // Случайный сигнал: UP или DOWN
        const isUp = Math.random() >= 0.5;
        const probability = Math.floor(Math.random() * 21) + 70; // 70-90%
        
        // Волатильность
        const volatilities = ['Низкая', 'Средняя', 'Высокая', 'Очень высокая'];
        const volatility = volatilities[Math.floor(Math.random() * volatilities.length)];
        
        // Рекомендуемая экспирация
        const expiryMinutes = currentTimeframe * (Math.floor(Math.random() * 3) + 1);
        const expiryText = expiryMinutes >= 60 ? `${Math.floor(expiryMinutes/60)}ч ${expiryMinutes%60}м` : `${expiryMinutes} мин`;
        
        // Отобразить сигнал
        signalCard.classList.add('visible');
        signalCard.classList.remove('up', 'down');
        signalCard.classList.add(isUp ? 'up' : 'down');
        
        signalDirection.innerHTML = isUp ? 
            '<span class="arrow">▲</span><span class="direction-text">ВВЕРХ / CALL</span>' : 
            '<span class="arrow">▼</span><span class="direction-text">ВНИЗ / PUT</span>';
        
        signalProbability.textContent = `${probability}%`;
        signalTimeframe.textContent = `${currentTimeframe} мин`;
        signalExpiry.textContent = expiryText;
        signalVolatility.textContent = volatility;
        
        // Совет
        const advices = [
            'Рекомендуется соблюдать риск-менеджмент не более 2% от депозита.',
            'Учитывайте фундаментальные новости перед входом в сделку.',
            'Подтвердите сигнал на старшем таймфрейме.',
            'Отличная точка входа! Рассмотрите увеличение объема.',
            'Дождитесь подтверждающей свечи перед входом.'
        ];
        signalAdvice.textContent = `💡 ${advices[Math.floor(Math.random() * advices.length)]}`;
        
        // Добавить в историю
        addToHistory(isUp, probability, expiryText);
        
        // Вибро-отклик на мобильных
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
    }

    function resetSignal() {
        signalCard.classList.remove('visible', 'up', 'down');
        if (timerInterval) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            generateBtn.disabled = false;
            generateBtn.classList.remove('disabled');
            timerDisplay.classList.remove('active');
            timerValue.textContent = '--:--';
        }
    }

    // ==================== ИСТОРИЯ ====================
    function addToHistory(isUp, probability, expiry) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${isUp ? 'up' : 'down'}`;
        historyItem.innerHTML = `
            <div class="history-header">
                <span class="history-asset">${currentAsset}</span>
                <span class="history-time">${timeStr}</span>
            </div>
            <div class="history-dir">${isUp ? '▲ CALL' : '▼ PUT'}</div>
            <div class="history-prob">${probability}%</div>
            <div class="history-expiry">⏱ ${expiry}</div>
        `;
        
        if (historyList.querySelector('.empty-history')) {
            historyList.innerHTML = '';
        }
        
        historyList.prepend(historyItem);
        
        // Сохранить в localStorage
        saveHistory();
    }

    function saveHistory() {
        const items = [];
        historyList.querySelectorAll('.history-item').forEach(item => {
            items.push({
                asset: item.querySelector('.history-asset').textContent,
                time: item.querySelector('.history-time').textContent,
                direction: item.querySelector('.history-dir').textContent,
                probability: item.querySelector('.history-prob').textContent,
                expiry: item.querySelector('.history-expiry').textContent,
                class: item.classList.contains('up') ? 'up' : 'down'
            });
        });
        localStorage.setItem('tradeSignalHistory', JSON.stringify(items.slice(0, 50))); // Лимит 50 записей
    }

    function loadHistory() {
        const saved = localStorage.getItem('tradeSignalHistory');
        if (saved) {
            const items = JSON.parse(saved);
            historyList.innerHTML = '';
            items.forEach(item => {
                const div = document.createElement('div');
                div.className = `history-item ${item.class}`;
                div.innerHTML = `
                    <div class="history-header">
                        <span class="history-asset">${item.asset}</span>
                        <span class="history-time">${item.time}</span>
                    </div>
                    <div class="history-dir">${item.direction}</div>
                    <div class="history-prob">${item.probability}</div>
                    <div class="history-expiry">⏱ ${item.expiry}</div>
                `;
                historyList.appendChild(div);
            });
        }
    }

    function clearHistory() {
        historyList.innerHTML = '<div class="empty-history">Нет сигналов</div>';
        localStorage.removeItem('tradeSignalHistory');
    }

    // ==================== ПОИСК ====================
    function filterAssets(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (currentTab === 'forex') {
            const filtered = forexAssets.filter(a => a.toLowerCase().includes(searchTerm));
            renderForexList(filtered.length > 0 ? filtered : forexAssets);
        } else {
            // Для OTC показываем все группы, но подсвечиваем совпадения
            document.querySelectorAll('.asset-item').forEach(item => {
                const symbol = item.querySelector('.asset-symbol').textContent.toLowerCase();
                if (searchTerm === '' || symbol.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    }

    // ==================== ОБРАБОТЧИКИ СОБЫТИЙ ====================
    function setupEventListeners() {
        // Вкладки
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const tab = this.dataset.tab;
                currentTab = tab;
                
                if (tab === 'forex') {
                    assetsList.style.display = 'flex';
                    otcCategories.style.display = 'none';
                    renderForexList(forexAssets);
                    loadTradingViewChart(currentAsset);
                } else {
                    assetsList.style.display = 'none';
                    otcCategories.style.display = 'block';
                    document.getElementById('tradingviewChart').innerHTML = '<div class="chart-placeholder"><span>📊 Графики недоступны для OTC активов</span></div>';
                    if (tvWidget) {
                        tvWidget.remove();
                        tvWidget = null;
                    }
                }
                resetSignal();
                assetSearch.value = '';
            });
        });
        
        // Таймфрейм
        timeframeSelect.addEventListener('change', function() {
            currentTimeframe = parseInt(this.value);
            resetSignal();
            if (currentTab === 'forex' && tvWidget) {
                tvWidget.chart().setResolution(getTVInterval(currentTimeframe));
            }
        });
        
        // Кнопка генерации
        generateBtn.addEventListener('click', function() {
            if (!isTimerRunning) {
                startTimer();
            }
        });
        
        // Поиск
        assetSearch.addEventListener('input', function() {
            filterAssets(this.value);
        });
        
        // Очистка истории
        clearHistoryBtn.addEventListener('click', clearHistory);
    }

    // ==================== ЗАПУСК ====================
    init();
});
