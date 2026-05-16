// TradeSignal Premium Bot - Полностью обновленная логика

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== ДАННЫЕ ====================
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

    // ==================== СОСТОЯНИЕ ====================
    let currentAsset = "EUR/USD";
    let currentTimeframe = 5;
    let timerInterval = null;
    let timerSeconds = 0;
    let isTimerRunning = false;
    let currentTab = 'forex';
    let tvWidget = null;

    // ==================== DOM ====================
    const assetSearch = document.getElementById('assetSearch');
    const assetsList = document.getElementById('assetsList');
    const otcCategories = document.getElementById('otcCategories');
    const currentAssetEl = document.getElementById('currentAsset');
    const timerBox = document.getElementById('timerBox');
    const timerValue = document.getElementById('timerValue');
    const generateBtn = document.getElementById('generateBtn');
    const signalCard = document.getElementById('signalCard');
    const signalDirIcon = document.getElementById('signalDirIcon');
    const signalDirectionText = document.getElementById('signalDirectionText');
    const signalProbability = document.getElementById('signalProbability');
    const signalExpiry = document.getElementById('signalExpiry');
    const signalVolatility = document.getElementById('signalVolatility');
    const signalAdvice = document.getElementById('signalAdvice');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const analysisOverlay = document.getElementById('analysisOverlay');
    const analysisDetail = document.getElementById('analysisDetail');
    const progressBar = document.getElementById('progressBar');
    const chartWrapper = document.getElementById('chartWrapper');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tfPills = document.querySelectorAll('.tf-pill');

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

    // ==================== РЕНДЕРИНГ ====================
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
            <span class="asset-change" id="change-${asset.replace('/', '')}">+0.00%</span>
        `;
        div.addEventListener('click', () => selectAsset(asset, type));
        return div;
    }

    function renderOTCList() {
        otcCurrencies.innerHTML = '';
        otcData.currencies.forEach(c => otcCurrencies.appendChild(createAssetItem(c, 'otc')));
        otcCrypto.innerHTML = '';
        otcData.crypto.forEach(c => otcCrypto.appendChild(createAssetItem(c, 'otc')));
        otcStocks.innerHTML = '';
        otcData.stocks.forEach(s => otcStocks.appendChild(createAssetItem(s, 'otc')));
        otcIndices.innerHTML = '';
        otcData.indices.forEach(i => otcIndices.appendChild(createAssetItem(i, 'otc')));
        
        // Симуляция изменения цен
        setInterval(() => {
            document.querySelectorAll('.asset-change').forEach(el => {
                const change = (Math.random() * 2 - 1).toFixed(2);
                el.textContent = `${change > 0 ? '+' : ''}${change}%`;
                el.className = `asset-change ${change >= 0 ? 'positive' : 'negative'}`;
            });
        }, 2000);
    }

    function selectAsset(asset, type) {
        currentAsset = asset;
        currentTab = type;
        currentAssetEl.textContent = asset;
        
        document.querySelectorAll('.asset-item').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.asset-item').forEach(item => {
            if (item.querySelector('.asset-symbol').textContent === asset) {
                item.classList.add('active');
            }
        });
        
        if (type === 'forex') {
            document.getElementById('tradingviewChart').style.display = 'block';
            loadTradingViewChart(asset);
        } else {
            if (tvWidget) {
                tvWidget.remove();
                tvWidget = null;
            }
            document.getElementById('tradingviewChart').innerHTML = 
                '<div class="chart-placeholder"><div class="loading-animation"><span>📊 Графики недоступны для OTC активов</span></div></div>';
        }
        
        resetSignal();
    }

    // ==================== TRADINGVIEW ====================
    function loadTradingViewChart(symbol) {
        const chartContainer = document.getElementById('tradingviewChart');
        chartContainer.innerHTML = '';
        
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
                "toolbar_bg": "#1a2236",
                "enable_publishing": false,
                "hide_top_toolbar": false,
                "hide_side_toolbar": false,
                "allow_symbol_change": false,
                "save_image": false,
                "details": true,
                "hotlist": false,
                "calendar": false,
                "studies": ["MASimple@tv-basicstudies", "RSI@tv-basicstudies", "MACD@tv-basicstudies"],
                "width": "100%",
                "height": "100%"
            });
        } catch (e) {
            console.error('TradingView error:', e);
            chartContainer.innerHTML = '<div class="chart-placeholder"><span>⚠️ Ошибка загрузки графика</span></div>';
        }
    }

    function getTVInterval(minutes) {
        const map = { 1: "1", 2: "2", 3: "3", 5: "5", 10: "10", 15: "15", 30: "30", 60: "60", 240: "240" };
        return map[minutes] || "5";
    }

    // ==================== АНАЛИЗ + СИГНАЛ ====================
    function showAnalysis(callback) {
        const steps = [
            "Сканирование паттернов...",
            "Анализ волатильности...",
            "Проверка уровней поддержки...",
            "Расчёт индикаторов RSI, MACD...",
            "Оценка вероятности...",
            "Формирование сигнала..."
        ];
        
        analysisOverlay.classList.add('active');
        progressBar.style.width = '0%';
        
        let step = 0;
        const stepInterval = setInterval(() => {
            if (step < steps.length) {
                analysisDetail.textContent = steps[step];
                progressBar.style.width = `${((step + 1) / steps.length) * 100}%`;
                step++;
            } else {
                clearInterval(stepInterval);
                setTimeout(() => {
                    analysisOverlay.classList.remove('active');
                    callback();
                }, 300);
            }
        }, 400);
    }

    function generateSignalAfterAnalysis() {
        showAnalysis(() => {
            const isUp = Math.random() >= 0.5;
            const probability = Math.floor(Math.random() * 21) + 70;
            
            const volatilities = ['Низкая', 'Средняя', 'Высокая', 'Очень высокая'];
            const volatility = volatilities[Math.floor(Math.random() * volatilities.length)];
            
            const expiryMinutes = currentTimeframe * (Math.floor(Math.random() * 3) + 1);
            const expiryText = expiryMinutes >= 60 ? 
                `${Math.floor(expiryMinutes/60)}ч ${expiryMinutes%60}м` : `${expiryMinutes} мин`;
            
            // Обновить сигнал
            signalCard.classList.add('visible');
            signalCard.classList.remove('up', 'down');
            signalCard.classList.add(isUp ? 'up' : 'down');
            
            signalDirIcon.textContent = isUp ? '▲' : '▼';
            signalDirectionText.textContent = isUp ? 'CALL / ВВЕРХ' : 'PUT / ВНИЗ';
            signalProbability.textContent = `${probability}%`;
            signalExpiry.textContent = `⏱ ${expiryText}`;
            signalVolatility.textContent = `📊 ${volatility}`;
            
            const advices = [
                'Риск не более 2% от депозита.',
                'Проверьте фундаментальный фон.',
                'Подтвердите на старшем ТФ.',
                'Отличная точка входа!',
                'Дождитесь подтверждающей свечи.'
            ];
            signalAdvice.textContent = `💡 ${advices[Math.floor(Math.random() * advices.length)]}`;
            
            addToHistory(isUp, probability, expiryText);
            
            if (navigator.vibrate) navigator.vibrate(200);
        });
    }

    function startTimerAndGenerate() {
        if (isTimerRunning) return;
        
        timerSeconds = currentTimeframe * 60;
        isTimerRunning = true;
        generateBtn.disabled = true;
        generateBtn.classList.add('counting');
        timerBox.classList.add('active');
        
        updateTimerDisplay();
        
        timerInterval = setInterval(() => {
            timerSeconds--;
            updateTimerDisplay();
            
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                generateBtn.disabled = false;
                generateBtn.classList.remove('counting');
                timerBox.classList.remove('active');
                timerValue.textContent = '00:00';
                generateSignalAfterAnalysis();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        timerValue.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function resetSignal() {
        signalCard.classList.remove('visible', 'up', 'down');
        signalDirIcon.textContent = '—';
        signalDirectionText.textContent = 'Ожидание';
        signalProbability.textContent = '--';
        signalExpiry.textContent = '--';
        signalVolatility.textContent = '--';
        signalAdvice.textContent = '';
        
        if (timerInterval) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            generateBtn.disabled = false;
            generateBtn.classList.remove('counting');
            timerBox.classList.remove('active');
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
            <div class="history-expiry">${expiry}</div>
        `;
        
        if (historyList.querySelector('.empty-history')) {
            historyList.innerHTML = '';
        }
        historyList.prepend(historyItem);
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
        localStorage.setItem('tradeSignalHistory', JSON.stringify(items.slice(0, 50)));
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
                    <div class="history-expiry">${item.expiry}</div>
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
            document.querySelectorAll('.otc-items .asset-item').forEach(item => {
                const symbol = item.querySelector('.asset-symbol').textContent.toLowerCase();
                item.style.display = (searchTerm === '' || symbol.includes(searchTerm)) ? 'flex' : 'none';
            });
        }
    }

    // ==================== СОБЫТИЯ ====================
    function setupEventListeners() {
        // Табы
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentTab = this.dataset.tab;
                
                if (currentTab === 'forex') {
                    assetsList.style.display = 'flex';
                    otcCategories.style.display = 'none';
                    renderForexList(forexAssets);
                    loadTradingViewChart(currentAsset);
                } else {
                    assetsList.style.display = 'none';
                    otcCategories.style.display = 'block';
                    document.getElementById('tradingviewChart').innerHTML = 
                        '<div class="chart-placeholder"><span>📊 OTC графики недоступны</span></div>';
                    if (tvWidget) { tvWidget.remove(); tvWidget = null; }
                }
                resetSignal();
                assetSearch.value = '';
            });
        });
        
        // Таймфрейм пилсы
        tfPills.forEach(pill => {
            pill.addEventListener('click', function() {
                tfPills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                currentTimeframe = parseInt(this.dataset.tf);
                resetSignal();
                if (currentTab === 'forex' && tvWidget) {
                    try {
                        tvWidget.chart().setResolution(getTVInterval(currentTimeframe));
                    } catch(e) {}
                }
            });
        });
        
        // Кнопка генерации
        generateBtn.addEventListener('click', startTimerAndGenerate);
        
        // Поиск
        assetSearch.addEventListener('input', function() { filterAssets(this.value); });
        
        // Очистка истории
        clearHistoryBtn.addEventListener('click', clearHistory);
    }

    init();
});
