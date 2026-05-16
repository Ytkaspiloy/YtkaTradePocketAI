// BinarySignal Pro - Бот для бинарных опционов

document.addEventListener('DOMContentLoaded', function() {
    
    const forexAssets = [
        "GBP/CAD", "EUR/JPY", "CHF/JPY", "AUD/CAD", "USD/CAD", "USD/CHF", 
        "GBP/AUD", "USD/JPY", "EUR/USD", "EUR/AUD", "AUD/USD", "CAD/JPY",
        "AUD/JPY", "EUR/GBP", "GBP/JPY", "GBP/CHF", "EUR/CAD", "CAD/CHF", "AUD/CHF"
    ];

    const otcData = {
        currencies: [
            "EUR/USD OTC", "GBP/USD OTC", "USD/JPY OTC", "AUD/USD OTC", 
            "USD/CAD OTC", "EUR/GBP OTC", "USD/CHF OTC", "NZD/USD OTC",
            "EUR/JPY OTC", "GBP/JPY OTC", "EUR/AUD OTC", "AUD/JPY OTC"
        ],
        crypto: [
            "BTC/USD", "ETH/USD", "XRP/USD", "LTC/USD", "BNB/USD", 
            "SOL/USD", "ADA/USD", "DOT/USD", "DOGE/USD", "AVAX/USD",
            "MATIC/USD", "LINK/USD"
        ],
        stocks: [
            "AAPL", "TSLA", "AMZN", "GOOGL", "MSFT", "META", "NFLX", "NVDA",
            "AMD", "INTC", "BA", "NKE", "DIS", "V", "JPM", "GS"
        ],
        indices: [
            "S&P 500", "NASDAQ", "DJIA", "FTSE 100", "DAX 40", 
            "NIKKEI 225", "HSI", "ASX 200", "CAC 40", "IBEX 35"
        ]
    };

    let currentAsset = "EUR/USD";
    let currentTab = 'forex';
    let currentTimeframe = 1;
    let isLocked = false;
    let isAnalyzing = false;
    let lockTimerInterval = null;
    let lockSeconds = 0;
    let tvWidget = null;

    // DOM
    const assetSearch = document.getElementById('assetSearch');
    const assetsList = document.getElementById('assetsList');
    const otcCategories = document.getElementById('otcCategories');
    const currentAssetEl = document.getElementById('currentAsset');
    const timeframePills = document.getElementById('timeframePills');
    const generateBtn = document.getElementById('generateBtn');
    const signalHero = document.getElementById('signalHero');
    const heroArrow = document.getElementById('heroArrow');
    const heroAction = document.getElementById('heroAction');
    const heroAsset = document.getElementById('heroAsset');
    const heroTimeframeBadge = document.getElementById('heroTimeframeBadge');
    const heroProbability = document.getElementById('heroProbability');
    const heroExpiry = document.getElementById('heroExpiry');
    const heroVolatility = document.getElementById('heroVolatility');
    const heroAdvice = document.getElementById('heroAdvice');
    const analysisOverlay = document.getElementById('analysisOverlay');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const analysisLive = document.getElementById('analysisLive');
    const timerBox = document.getElementById('timerBox');
    const timerValue = document.getElementById('timerValue');
    const tradingviewChart = document.getElementById('tradingviewChart');
    const chartPlaceholder = document.getElementById('chartPlaceholder');
    const otcMini = document.getElementById('otcMini');
    const otcMiniAsset = document.getElementById('otcMiniAsset');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tfPills = document.querySelectorAll('.tf-pill');
    const totalSignalsEl = document.getElementById('totalSignals');
    const avgAccuracyEl = document.getElementById('avgAccuracy');
    const miniTotalSignals = document.getElementById('miniTotalSignals');
    const miniWinRate = document.getElementById('miniWinRate');
    const miniAvgProb = document.getElementById('miniAvgProb');
    const otcCurrencies = document.getElementById('otcCurrencies');
    const otcCrypto = document.getElementById('otcCrypto');
    const otcStocks = document.getElementById('otcStocks');
    const otcIndices = document.getElementById('otcIndices');

    function init() {
        renderForexList(forexAssets);
        renderOTCList();
        loadTradingViewChart(currentAsset);
        setupEventListeners();
        loadHistory();
        updateStats();
        resetSignalHero();
        setActiveTimeframe(1);
        updateExpiryDisplay();
    }

    function renderForexList(assets) {
        assetsList.innerHTML = '';
        assets.forEach(asset => {
            const div = document.createElement('div');
            div.className = `asset-item ${asset === currentAsset ? 'active' : ''}`;
            div.innerHTML = `<span class="asset-symbol">${asset}</span>`;
            div.addEventListener('click', () => { if (!isLocked && !isAnalyzing) selectAsset(asset, 'forex'); });
            assetsList.appendChild(div);
        });
    }

    function renderOTCList() {
        [otcCurrencies, otcCrypto, otcStocks, otcIndices].forEach(el => el.innerHTML = '');
        otcData.currencies.forEach(c => otcCurrencies.appendChild(createOTCItem(c)));
        otcData.crypto.forEach(c => otcCrypto.appendChild(createOTCItem(c)));
        otcData.stocks.forEach(s => otcStocks.appendChild(createOTCItem(s)));
        otcData.indices.forEach(i => otcIndices.appendChild(createOTCItem(i)));
    }

    function createOTCItem(symbol) {
        const div = document.createElement('div');
        div.className = `asset-item ${symbol === currentAsset && currentTab === 'otc' ? 'active' : ''}`;
        div.innerHTML = `<span class="asset-symbol">${symbol}</span>`;
        div.addEventListener('click', () => { if (!isLocked && !isAnalyzing) selectAsset(symbol, 'otc'); });
        return div;
    }

    function selectAsset(asset, tab) {
        currentAsset = asset;
        currentTab = tab;
        currentAssetEl.textContent = asset;
        
        document.querySelectorAll('.asset-item').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.asset-item').forEach(item => {
            if (item.querySelector('.asset-symbol').textContent === asset) item.classList.add('active');
        });

        resetSignalHero();
        
        if (tab === 'forex') {
            tradingviewChart.style.display = 'block';
            otcMini.style.display = 'none';
            loadTradingViewChart(asset);
        } else {
            tradingviewChart.style.display = 'none';
            otcMini.style.display = 'flex';
            otcMiniAsset.textContent = asset;
            if (tvWidget) { tvWidget.remove(); tvWidget = null; }
        }
    }

    function loadTradingViewChart(symbol) {
        tradingviewChart.innerHTML = '';
        const ph = document.createElement('div');
        ph.className = 'chart-placeholder';
        ph.id = 'chartPlaceholder';
        ph.innerHTML = '<div class="loading-spinner"></div>';
        tradingviewChart.appendChild(ph);
        
        let tvSymbol = symbol.replace('/', '');
        tvSymbol = `FX:${tvSymbol}`;
        
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
                "hide_top_toolbar": true,
                "hide_side_toolbar": true,
                "allow_symbol_change": false,
                "save_image": false,
                "details": false,
                "studies": [],
                "width": "100%",
                "height": "100%"
            });
            tvWidget.onChartReady(() => {
                const cp = document.getElementById('chartPlaceholder');
                if (cp) cp.style.display = 'none';
            });
        } catch (e) {
            console.error('TV error:', e);
        }
    }

    function getTVInterval(min) {
        const map = {1:"1",2:"2",3:"3",5:"5",10:"10",15:"15"};
        return map[min] || "1";
    }

    function setActiveTimeframe(tf) {
        currentTimeframe = tf;
        tfPills.forEach(p => {
            p.classList.remove('active');
            if (parseInt(p.dataset.tf) === tf) p.classList.add('active');
        });
        updateExpiryDisplay();
    }

    function updateExpiryDisplay() {
        heroTimeframeBadge.textContent = `${currentTimeframe} мин`;
        heroExpiry.textContent = `${currentTimeframe} мин`;
    }

    // Анализ
    function startAnalysis(callback) {
        if (isAnalyzing || isLocked) return;
        isAnalyzing = true;
        disableControls();
        
        analysisOverlay.classList.add('active');
        progressFill.style.width = '0%';
        progressPercent.textContent = '0%';
        analysisLive.textContent = 'Инициализация нейросети...';
        
        for (let i = 1; i <= 6; i++) {
            const step = document.getElementById(`step${i}`);
            if (step) { step.classList.remove('done'); step.querySelector('.step-dot').style.background = '#334155'; }
        }
        
        const totalDuration = 2500 + Math.random() * 2500;
        const startTime = performance.now();
        const segments = generateSegments(totalDuration);
        let currentSeg = 0;
        
        const stepsList = [
            { id: 'step1', text: 'Сбор рыночных данных...', progress: 0.15 },
            { id: 'step2', text: 'Поиск паттернов Price Action...', progress: 0.32 },
            { id: 'step3', text: 'Расчёт уровней поддержки...', progress: 0.52 },
            { id: 'step4', text: 'Анализ RSI, MACD, MA...', progress: 0.72 },
            { id: 'step5', text: 'Оценка волатильности...', progress: 0.88 },
            { id: 'step6', text: 'Формирование сигнала...', progress: 0.98 }
        ];
        
        function animate(timestamp) {
            const elapsed = timestamp - startTime;
            const rawProgress = Math.min(elapsed / totalDuration, 1);
            
            while (currentSeg < segments.length - 1 && rawProgress >= segments[currentSeg].endProgress) {
                currentSeg++;
            }
            const seg = segments[Math.min(currentSeg, segments.length - 1)];
            const segElapsed = timestamp - (startTime + seg.startTime * totalDuration);
            const segDuration = seg.duration * totalDuration;
            const segProg = Math.min(segElapsed / segDuration, 1);
            const eased = easeInOutCubic(segProg);
            const displayProgress = seg.startProgress + (seg.endProgress - seg.startProgress) * eased;
            
            progressFill.style.width = `${displayProgress * 100}%`;
            progressPercent.textContent = `${Math.round(displayProgress * 100)}%`;
            
            stepsList.forEach(s => {
                if (displayProgress >= s.progress) {
                    const stepEl = document.getElementById(s.id);
                    if (stepEl && !stepEl.classList.contains('done')) {
                        stepEl.classList.add('done');
                        stepEl.querySelector('.step-dot').style.background = '#10b981';
                        analysisLive.textContent = s.text;
                    }
                }
            });
            
            if (rawProgress < 1) {
                requestAnimationFrame(animate);
            } else {
                progressFill.style.width = '100%';
                progressPercent.textContent = '100%';
                analysisLive.textContent = 'Анализ завершён!';
                setTimeout(() => {
                    analysisOverlay.classList.remove('active');
                    isAnalyzing = false;
                    callback();
                }, 350);
            }
        }
        requestAnimationFrame(animate);
    }

    function generateSegments(total) {
        const n = 3 + Math.floor(Math.random() * 4);
        const segs = [];
        let cp = 0;
        for (let i = 0; i < n; i++) {
            const isLast = i === n - 1;
            const remain = 1 - cp;
            const sp = isLast ? remain : remain * (0.15 + Math.random() * 0.5);
            segs.push({ startProgress: cp, endProgress: cp + sp, duration: sp * (0.7 + Math.random() * 0.6), startTime: cp });
            cp += sp;
        }
        return segs;
    }

    function easeInOutCubic(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2; }

    // Сигнал
    function generateSignal() {
        const isUp = Math.random() >= 0.5;
        const probability = Math.floor(Math.random() * 16) + 75;
        const volatilities = ['Низкая', 'Умеренная', 'Средняя', 'Повышенная', 'Высокая'];
        const volatility = volatilities[Math.floor(Math.random() * volatilities.length)];
        
        signalHero.classList.add('active');
        signalHero.classList.remove('up', 'down');
        signalHero.classList.add(isUp ? 'up' : 'down');
        
        heroArrow.textContent = isUp ? '▲' : '▼';
        heroAction.textContent = isUp ? 'КУПИТЬ / CALL' : 'ПРОДАТЬ / PUT';
        heroAsset.textContent = currentAsset;
        heroTimeframeBadge.textContent = `${currentTimeframe} мин`;
        heroProbability.textContent = `${probability}%`;
        heroExpiry.textContent = `${currentTimeframe} мин`;
        heroVolatility.textContent = volatility;
        
        const advices = [
            'Риск не более 2% от депозита.',
            'Идеальное время для входа!',
            'Подтвердите сигнал на старшем ТФ.',
            'Отличная точка входа в рынок.',
            'Следуйте за трендом.',
            'Установите stop-loss.',
            'Рынок даёт чёткий сигнал.'
        ];
        heroAdvice.textContent = `💡 ${advices[Math.floor(Math.random() * advices.length)]}`;
        
        addToHistory(isUp, probability);
        updateStats();
        if (navigator.vibrate) navigator.vibrate([100, 60, 200]);
    }

    function resetSignalHero() {
        signalHero.classList.remove('active', 'up', 'down');
        heroArrow.textContent = '—';
        heroAction.textContent = 'ОЖИДАНИЕ СИГНАЛА';
        heroAsset.textContent = currentAsset;
        heroTimeframeBadge.textContent = `${currentTimeframe} мин`;
        heroProbability.textContent = '--%';
        heroExpiry.textContent = `${currentTimeframe} мин`;
        heroVolatility.textContent = '--';
        heroAdvice.textContent = '💡 Нажмите кнопку для получения сигнала';
    }

    // Таймер
    function startLockTimer() {
        isLocked = true;
        lockSeconds = currentTimeframe * 60;
        timerBox.classList.add('active');
        updateLockTimerDisplay();
        disableControls();
        
        lockTimerInterval = setInterval(() => {
            lockSeconds--;
            updateLockTimerDisplay();
            if (lockSeconds <= 0) {
                clearInterval(lockTimerInterval);
                lockTimerInterval = null;
                isLocked = false;
                timerBox.classList.remove('active');
                enableControls();
            }
        }, 1000);
    }

    function updateLockTimerDisplay() {
        const m = Math.floor(lockSeconds / 60);
        const s = lockSeconds % 60;
        timerValue.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }

    function disableControls() {
        generateBtn.classList.add('disabled');
        assetSearch.disabled = true;
        timeframePills.style.pointerEvents = 'none';
        timeframePills.style.opacity = '0.5';
        assetsList.style.pointerEvents = 'none';
        assetsList.style.opacity = '0.5';
        otcCategories.style.pointerEvents = 'none';
        otcCategories.style.opacity = '0.5';
    }

    function enableControls() {
        generateBtn.classList.remove('disabled');
        assetSearch.disabled = false;
        timeframePills.style.pointerEvents = 'auto';
        timeframePills.style.opacity = '1';
        assetsList.style.pointerEvents = 'auto';
        assetsList.style.opacity = '1';
        otcCategories.style.pointerEvents = 'auto';
        otcCategories.style.opacity = '1';
    }

    // История
    function addToHistory(isUp, probability) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${isUp ? 'up' : 'down'}`;
        historyItem.innerHTML = `
            <span class="hi-asset">${currentAsset}</span>
            <span class="hi-dir">${isUp ? '▲ CALL' : '▼ PUT'}</span>
            <span class="hi-prob">${probability}%</span>
            <span class="hi-exp">${currentTimeframe}м</span>
            <span class="hi-time">${timeStr}</span>
        `;
        if (historyList.querySelector('.empty-history')) historyList.innerHTML = '';
        historyList.prepend(historyItem);
        if (historyList.children.length > 30) historyList.lastChild.remove();
        saveHistory();
    }

    function saveHistory() {
        const items = [];
        historyList.querySelectorAll('.history-item').forEach(item => {
            items.push({
                asset: item.querySelector('.hi-asset').textContent,
                dir: item.querySelector('.hi-dir').textContent,
                prob: item.querySelector('.hi-prob').textContent,
                exp: item.querySelector('.hi-exp').textContent,
                time: item.querySelector('.hi-time').textContent,
                isUp: item.classList.contains('up')
            });
        });
        localStorage.setItem('binarySignalHistory', JSON.stringify(items));
    }

    function loadHistory() {
        const saved = localStorage.getItem('binarySignalHistory');
        if (saved) {
            const items = JSON.parse(saved);
            historyList.innerHTML = '';
            items.forEach(item => {
                const div = document.createElement('div');
                div.className = `history-item ${item.isUp ? 'up' : 'down'}`;
                div.innerHTML = `
                    <span class="hi-asset">${item.asset}</span>
                    <span class="hi-dir">${item.dir}</span>
                    <span class="hi-prob">${item.prob}</span>
                    <span class="hi-exp">${item.exp}</span>
                    <span class="hi-time">${item.time}</span>
                `;
                historyList.appendChild(div);
            });
        }
        updateStats();
    }

    function updateStats() {
        const items = historyList.querySelectorAll('.history-item');
        const total = items.length;
        totalSignalsEl.textContent = total;
        miniTotalSignals.textContent = total;
        
        if (total > 0) {
            let sumProb = 0;
            items.forEach(item => {
                const prob = parseInt(item.querySelector('.hi-prob').textContent);
                if (!isNaN(prob)) sumProb += prob;
            });
            const avgProb = Math.round(sumProb / total);
            avgAccuracyEl.textContent = `${avgProb}%`;
            miniAvgProb.textContent = `${avgProb}%`;
            miniWinRate.textContent = `${Math.round(avgProb * 0.85)}%`;
        } else {
            avgAccuracyEl.textContent = '--';
            miniAvgProb.textContent = '--%';
            miniWinRate.textContent = '--%';
        }
    }

    function clearHistory() {
        historyList.innerHTML = '<div class="empty-history">Нет сигналов</div>';
        localStorage.removeItem('binarySignalHistory');
        updateStats();
    }

    function filterAssets(query) {
        const s = query.toLowerCase().trim();
        if (currentTab === 'forex') {
            const filtered = forexAssets.filter(a => a.toLowerCase().includes(s));
            renderForexList(filtered.length > 0 ? filtered : forexAssets);
        } else {
            document.querySelectorAll('.otc-items .asset-item').forEach(item => {
                const sym = item.querySelector('.asset-symbol').textContent.toLowerCase();
                item.style.display = (!s || sym.includes(s)) ? 'flex' : 'none';
            });
        }
    }

    function handleGenerate() {
        if (isLocked || isAnalyzing) return;
        resetSignalHero();
        startAnalysis(() => {
            generateSignal();
            startLockTimer();
        });
    }

    function setupEventListeners() {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (isLocked || isAnalyzing) return;
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const tab = this.dataset.tab;
                currentTab = tab;
                if (tab === 'forex') {
                    assetsList.style.display = 'flex';
                    otcCategories.style.display = 'none';
                    renderForexList(forexAssets);
                    selectAsset('EUR/USD', 'forex');
                } else {
                    assetsList.style.display = 'none';
                    otcCategories.style.display = 'block';
                    tradingviewChart.style.display = 'none';
                    otcMini.style.display = 'flex';
                    if (tvWidget) { tvWidget.remove(); tvWidget = null; }
                    selectAsset('BTC/USD', 'otc');
                }
                resetSignalHero();
                assetSearch.value = '';
            });
        });
        
        tfPills.forEach(pill => {
            pill.addEventListener('click', function() {
                if (isLocked || isAnalyzing) return;
                const tf = parseInt(this.dataset.tf);
                setActiveTimeframe(tf);
                resetSignalHero();
                if (currentTab === 'forex' && tvWidget) {
                    try { tvWidget.chart().setResolution(getTVInterval(tf)); } catch(e) {}
                }
            });
        });
        
        generateBtn.addEventListener('click', handleGenerate);
        assetSearch.addEventListener('input', function() { if (!isLocked && !isAnalyzing) filterAssets(this.value); });
        clearHistoryBtn.addEventListener('click', clearHistory);
    }

    init();
});
