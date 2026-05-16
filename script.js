// BinarySignal Pro - Full OTC Assets + Seconds Timeframes

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== TRANSLATIONS ====================
    const translations = {
        ru: {
            signals: "Сигналов",
            accuracy: "Точность",
            online: "Онлайн",
            search_placeholder: "🔍 Поиск актива...",
            currencies: "💱 ВАЛЮТЫ",
            crypto: "₿ КРИПТОВАЛЮТЫ",
            commodities: "🛢 СЫРЬЁ",
            stocks: "📊 АКЦИИ",
            indices: "🌐 ИНДЕКСЫ",
            binary_options: "Бинарные опционы",
            waiting_signal: "ОЖИДАНИЕ СИГНАЛА",
            probability: "Вероятность",
            expiry: "Экспирация",
            volatility: "Волатильность",
            press_button: "💡 Нажмите кнопку для получения сигнала",
            market_analysis: "АНАЛИЗ РЫНКА",
            step1: "Сбор данных",
            step2: "Паттерны",
            step3: "Уровни",
            step4: "Индикаторы",
            step5: "Волатильность",
            step6: "Сигнал",
            timeframe_expiry: "⏱ Таймфрейм / Экспирация:",
            get_signal: "ПОЛУЧИТЬ СИГНАЛ",
            timer: "⏱ Таймер:",
            history: "📋 История",
            avg_prob: "Сред. вер-ть",
            no_signals: "Нет сигналов",
            clear: "Очистить",
            footer_text: "Бот для бинарных опционов с ИИ-анализом.",
            buy_call: "КУПИТЬ / CALL",
            sell_put: "ПРОДАТЬ / PUT",
            init_neural: "Инициализация нейросети...",
            data_collection: "Сбор рыночных данных...",
            patterns: "Поиск паттернов Price Action...",
            levels: "Расчёт уровней поддержки...",
            indicators: "Анализ RSI, MACD, MA...",
            volatility_step: "Оценка волатильности...",
            signal_step: "Формирование сигнала...",
            analysis_complete: "Анализ завершён!",
            advices: [
                "Риск не более 2% от депозита.",
                "Идеальное время для входа!",
                "Подтвердите сигнал на старшем ТФ.",
                "Отличная точка входа в рынок.",
                "Следуйте за трендом.",
                "Установите stop-loss.",
                "Рынок даёт чёткий сигнал."
            ]
        },
        en: {
            signals: "Signals",
            accuracy: "Accuracy",
            online: "Online",
            search_placeholder: "🔍 Search asset...",
            currencies: "💱 CURRENCIES",
            crypto: "₿ CRYPTO",
            commodities: "🛢 COMMODITIES",
            stocks: "📊 STOCKS",
            indices: "🌐 INDICES",
            binary_options: "Binary Options",
            waiting_signal: "WAITING FOR SIGNAL",
            probability: "Probability",
            expiry: "Expiry",
            volatility: "Volatility",
            press_button: "💡 Press the button to get a signal",
            market_analysis: "MARKET ANALYSIS",
            step1: "Data Collection",
            step2: "Patterns",
            step3: "Levels",
            step4: "Indicators",
            step5: "Volatility",
            step6: "Signal",
            timeframe_expiry: "⏱ Timeframe / Expiry:",
            get_signal: "GET SIGNAL",
            timer: "⏱ Timer:",
            history: "📋 History",
            avg_prob: "Avg Prob",
            no_signals: "No signals",
            clear: "Clear",
            footer_text: "AI-powered binary options bot.",
            buy_call: "BUY / CALL",
            sell_put: "SELL / PUT",
            init_neural: "Initializing neural network...",
            data_collection: "Collecting market data...",
            patterns: "Searching for Price Action patterns...",
            levels: "Calculating support levels...",
            indicators: "Analyzing RSI, MACD, MA...",
            volatility_step: "Evaluating volatility...",
            signal_step: "Forming signal...",
            analysis_complete: "Analysis complete!",
            advices: [
                "Risk no more than 2% of deposit.",
                "Perfect entry time!",
                "Confirm signal on higher timeframe.",
                "Excellent entry point.",
                "Follow the trend.",
                "Set a stop-loss.",
                "Market gives a clear signal."
            ]
        }
    };

    let currentLang = 'ru';
    let currentTheme = 'dark';

    // ==================== DATA ====================
    const forexAssets = [
        "GBP/CAD", "EUR/JPY", "CHF/JPY", "AUD/CAD", "USD/CAD", "USD/CHF", 
        "GBP/AUD", "USD/JPY", "EUR/USD", "EUR/AUD", "AUD/USD", "CAD/JPY",
        "AUD/JPY", "EUR/GBP", "GBP/JPY", "GBP/CHF", "EUR/CAD", "CAD/CHF", "AUD/CHF"
    ];

    const otcData = {
        currencies: [
            "AED/CNY OTC", "AUD/CAD OTC", "AUD/CHF OTC", "AUD/JPY OTC", "AUD/NZD OTC", "AUD/USD OTC",
            "BHD/CNY OTC", "CAD/CHF OTC", "CAD/JPY OTC", "CHF/JPY OTC", "CHF/NOK OTC",
            "EUR/CHF OTC", "EUR/GBP OTC", "EUR/HUF OTC", "EUR/JPY OTC", "EUR/NZD OTC",
            "EUR/RUB OTC", "EUR/TRY OTC", "EUR/USD OTC", "GBP/AUD OTC", "GBP/JPY OTC", "GBP/USD OTC",
            "JOD/CNY OTC", "KES/USD OTC", "LBP/USD OTC", "MAD/USD OTC", "NGN/USD OTC",
            "NZD/JPY OTC", "NZD/USD OTC", "OMR/CNY OTC", "QAR/CNY OTC", "SAR/CNY OTC",
            "TND/USD OTC", "UAH/USD OTC", "USD/ARS OTC", "USD/BDT OTC", "USD/BRL OTC",
            "USD/CAD OTC", "USD/CHF OTC", "USD/CLP OTC", "USD/CNH OTC", "USD/COP OTC",
            "USD/DZD OTC", "USD/EGP OTC", "USD/IDR OTC", "USD/INR OTC", "USD/JPY OTC",
            "USD/MXN OTC", "USD/MYR OTC", "USD/PHP OTC", "USD/PKR OTC", "USD/RUB OTC",
            "USD/SGD OTC", "USD/THB OTC", "USD/VND OTC", "YER/USD OTC", "ZAR/USD OTC"
        ],
        crypto: [
            "Avalanche OTC", "Bitcoin OTC", "Bitcoin ETF OTC", "BNB OTC", "Cardano OTC",
            "Chainlink OTC", "Dogecoin OTC", "Ethereum OTC", "Litecoin OTC", "Polkadot OTC",
            "Polygon OTC", "Solana OTC", "Toncoin OTC", "TRON OTC"
        ],
        commodities: [
            "Gold OTC", "Natural Gas OTC", "Palladium spot OTC", "Platinum spot OTC"
        ],
        stocks: [
            "Advanced Micro Devices OTC", "Alibaba OTC", "American Express OTC", "Apple OTC",
            "Citigroup Inc OTC", "Cisco OTC", "Coinbase Global OTC", "ExxonMobil OTC",
            "FACEBOOK INC OTC", "FedEx OTC", "GameStop Corp OTC", "Intel OTC",
            "Marathon Digital Holdings OTC", "McDonald's OTC", "Microsoft OTC", "Netflix OTC",
            "Palantir Technologies OTC", "Pfizer Inc OTC", "Tesla OTC", "VISA OTC", "VIX OTC"
        ],
        indices: [
            "AUS 200 OTC", "D30EUR OTC", "DJI30 OTC", "E35EUR OTC", "E50EUR OTC",
            "F40EUR OTC", "JPN225 OTC", "SP500 OTC", "US100 OTC", "100GBP OTC"
        ]
    };

    // ==================== STATE ====================
    let currentAsset = "EUR/USD";
    let currentTab = 'forex';
    let currentTimeframe = 1; // for forex: minutes, for otc: seconds stored separately is handled
    let isLocked = false;
    let isAnalyzing = false;
    let lockTimerInterval = null;
    let lockSeconds = 0;
    let tvWidget = null;

    // ==================== DOM ====================
    const assetSearch = document.getElementById('assetSearch');
    const assetsList = document.getElementById('assetsList');
    const otcCategories = document.getElementById('otcCategories');
    const currentAssetEl = document.getElementById('currentAsset');
    const forexTimeframes = document.getElementById('forexTimeframes');
    const otcTimeframes = document.getElementById('otcTimeframes');
    const generateBtn = document.getElementById('generateBtn');
    const signalOverlay = document.getElementById('signalOverlay');
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
    const otcBg = document.getElementById('otcBg');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const totalSignalsEl = document.getElementById('totalSignals');
    const avgAccuracyEl = document.getElementById('avgAccuracy');
    const miniTotalSignals = document.getElementById('miniTotalSignals');
    const miniWinRate = document.getElementById('miniWinRate');
    const miniAvgProb = document.getElementById('miniAvgProb');
    const otcCurrencies = document.getElementById('otcCurrencies');
    const otcCrypto = document.getElementById('otcCrypto');
    const otcCommodities = document.getElementById('otcCommodities');
    const otcStocks = document.getElementById('otcStocks');
    const otcIndices = document.getElementById('otcIndices');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    function t(key) {
        return translations[currentLang][key] || key;
    }

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (el.tagName === 'INPUT') {
                el.placeholder = t(key);
            } else {
                el.textContent = t(key);
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
        });
        if (!signalHero.classList.contains('up') && !signalHero.classList.contains('down')) {
            heroAction.textContent = t('waiting_signal');
        }
        heroAdvice.textContent = t('press_button');
    }

    function applyTheme() {
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(currentTheme);
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('binarySignalTheme', currentTheme);
    }

    function toggleTheme() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme();
    }

    function init() {
        const savedLang = localStorage.getItem('binarySignalLang');
        if (savedLang && (savedLang === 'ru' || savedLang === 'en')) currentLang = savedLang;
        const savedTheme = localStorage.getItem('binarySignalTheme');
        if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) currentTheme = savedTheme;
        
        applyTheme();
        updateLangButtons();
        applyTranslations();
        renderForexList(forexAssets);
        renderOTCList();
        loadTradingViewChart(currentAsset);
        setupEventListeners();
        loadHistory();
        updateStats();
        resetSignalHero();
        setActiveForexTimeframe(1);
        setActiveOTCTimeframe(5);
        updateExpiryDisplay();
    }

    function updateLangButtons() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === currentLang) btn.classList.add('active');
        });
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
        [otcCurrencies, otcCrypto, otcCommodities, otcStocks, otcIndices].forEach(el => el.innerHTML = '');
        otcData.currencies.forEach(c => otcCurrencies.appendChild(createOTCItem(c)));
        otcData.crypto.forEach(c => otcCrypto.appendChild(createOTCItem(c)));
        otcData.commodities.forEach(c => otcCommodities.appendChild(createOTCItem(c)));
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
            otcBg.style.display = 'none';
            forexTimeframes.style.display = 'flex';
            otcTimeframes.style.display = 'none';
            loadTradingViewChart(asset);
        } else {
            tradingviewChart.style.display = 'none';
            otcBg.style.display = 'block';
            forexTimeframes.style.display = 'none';
            otcTimeframes.style.display = 'flex';
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
                "theme": currentTheme,
                "style": "1",
                "locale": currentLang === 'ru' ? 'ru' : 'en',
                "toolbar_bg": currentTheme === 'dark' ? "#1a2236" : "#f8fafc",
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

    function setActiveForexTimeframe(tf) {
        currentTimeframe = tf;
        forexTimeframes.querySelectorAll('.tf-pill').forEach(p => {
            p.classList.remove('active');
            if (parseInt(p.dataset.tf) === tf) p.classList.add('active');
        });
        updateExpiryDisplay();
    }

    function setActiveOTCTimeframe(tf) {
        currentTimeframe = tf;
        otcTimeframes.querySelectorAll('.tf-pill').forEach(p => {
            p.classList.remove('active');
            if (parseInt(p.dataset.tf) === tf) p.classList.add('active');
        });
        updateExpiryDisplay();
    }

    function updateExpiryDisplay() {
        if (currentTab === 'forex') {
            heroTimeframeBadge.textContent = `${currentTimeframe} min`;
            heroExpiry.textContent = `${currentTimeframe} min`;
        } else {
            heroTimeframeBadge.textContent = `${currentTimeframe}s`;
            heroExpiry.textContent = `${currentTimeframe}s`;
        }
    }

    // ==================== ANALYSIS ====================
    function startAnalysis(callback) {
        if (isAnalyzing || isLocked) return;
        isAnalyzing = true;
        disableControls();
        
        analysisOverlay.classList.add('active');
        progressFill.style.width = '0%';
        progressPercent.textContent = '0%';
        analysisLive.textContent = t('init_neural');
        
        for (let i = 1; i <= 6; i++) {
            const step = document.getElementById(`step${i}`);
            if (step) { step.classList.remove('done'); step.querySelector('.step-dot').style.background = '#334155'; }
        }
        
        const totalDuration = 2500 + Math.random() * 2500;
        const startTime = performance.now();
        const segments = generateSegments(totalDuration);
        let currentSeg = 0;
        
        const stepsList = [
            { id: 'step1', text: t('data_collection'), progress: 0.15 },
            { id: 'step2', text: t('patterns'), progress: 0.32 },
            { id: 'step3', text: t('levels'), progress: 0.52 },
            { id: 'step4', text: t('indicators'), progress: 0.72 },
            { id: 'step5', text: t('volatility_step'), progress: 0.88 },
            { id: 'step6', text: t('signal_step'), progress: 0.98 }
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
                analysisLive.textContent = t('analysis_complete');
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

    // ==================== SIGNAL ====================
    function generateSignal() {
        const isUp = Math.random() >= 0.5;
        const probability = Math.floor(Math.random() * 16) + 75;
        const volatilities = ['Low', 'Moderate', 'Medium', 'Elevated', 'High'];
        const volatility = volatilities[Math.floor(Math.random() * volatilities.length)];
        
        signalHero.classList.add('active');
        signalHero.classList.remove('up', 'down');
        signalHero.classList.add(isUp ? 'up' : 'down');
        signalOverlay.classList.add('visible');
        
        heroArrow.textContent = isUp ? '▲' : '▼';
        heroAction.textContent = isUp ? t('buy_call') : t('sell_put');
        heroAsset.textContent = currentAsset;
        heroTimeframeBadge.textContent = currentTab === 'forex' ? `${currentTimeframe} min` : `${currentTimeframe}s`;
        heroProbability.textContent = `${probability}%`;
        heroExpiry.textContent = currentTab === 'forex' ? `${currentTimeframe} min` : `${currentTimeframe}s`;
        heroVolatility.textContent = volatility;
        
        const advices = t('advices');
        heroAdvice.textContent = `💡 ${advices[Math.floor(Math.random() * advices.length)]}`;
        
        addToHistory(isUp, probability);
        updateStats();
        if (navigator.vibrate) navigator.vibrate([100, 60, 200]);
    }

    function resetSignalHero() {
        signalHero.classList.remove('active', 'up', 'down');
        signalOverlay.classList.remove('visible');
        heroArrow.textContent = '—';
        heroAction.textContent = t('waiting_signal');
        heroAsset.textContent = currentAsset;
        heroTimeframeBadge.textContent = currentTab === 'forex' ? `${currentTimeframe} min` : `${currentTimeframe}s`;
        heroProbability.textContent = '--%';
        heroExpiry.textContent = currentTab === 'forex' ? `${currentTimeframe} min` : `${currentTimeframe}s`;
        heroVolatility.textContent = '--';
        heroAdvice.textContent = t('press_button');
    }

    // ==================== TIMER ====================
    function startLockTimer() {
        isLocked = true;
        // Для OTC таймфрейм в секундах, для FOREX в минутах
        if (currentTab === 'otc') {
            lockSeconds = currentTimeframe; // секунды
        } else {
            lockSeconds = currentTimeframe * 60; // минуты в секунды
        }
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
        if (currentTab === 'otc') {
            timerValue.textContent = `00:${String(lockSeconds).padStart(2,'0')}`;
        } else {
            const m = Math.floor(lockSeconds / 60);
            const s = lockSeconds % 60;
            timerValue.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        }
    }

    function disableControls() {
        generateBtn.classList.add('disabled');
        assetSearch.disabled = true;
        forexTimeframes.style.pointerEvents = 'none';
        forexTimeframes.style.opacity = '0.5';
        otcTimeframes.style.pointerEvents = 'none';
        otcTimeframes.style.opacity = '0.5';
        assetsList.style.pointerEvents = 'none';
        assetsList.style.opacity = '0.5';
        otcCategories.style.pointerEvents = 'none';
        otcCategories.style.opacity = '0.5';
    }

    function enableControls() {
        generateBtn.classList.remove('disabled');
        assetSearch.disabled = false;
        forexTimeframes.style.pointerEvents = 'auto';
        forexTimeframes.style.opacity = '1';
        otcTimeframes.style.pointerEvents = 'auto';
        otcTimeframes.style.opacity = '1';
        assetsList.style.pointerEvents = 'auto';
        assetsList.style.opacity = '1';
        otcCategories.style.pointerEvents = 'auto';
        otcCategories.style.opacity = '1';
    }

    // ==================== HISTORY ====================
    function addToHistory(isUp, probability) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString(currentLang === 'ru' ? 'ru-RU' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${isUp ? 'up' : 'down'}`;
        const expiryStr = currentTab === 'forex' ? `${currentTimeframe}m` : `${currentTimeframe}s`;
        historyItem.innerHTML = `
            <span class="hi-asset">${currentAsset}</span>
            <span class="hi-dir">${isUp ? '▲ CALL' : '▼ PUT'}</span>
            <span class="hi-prob">${probability}%</span>
            <span class="hi-exp">${expiryStr}</span>
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
        historyList.innerHTML = `<div class="empty-history" data-i18n="no_signals">${t('no_signals')}</div>`;
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
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                currentLang = this.dataset.lang;
                updateLangButtons();
                applyTranslations();
                resetSignalHero();
                updateExpiryDisplay();
                localStorage.setItem('binarySignalLang', currentLang);
                if (currentTab === 'forex') loadTradingViewChart(currentAsset);
            });
        });

        themeToggle.addEventListener('click', toggleTheme);

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
                    selectAsset('EUR/USD OTC', 'otc');
                }
                resetSignalHero();
                assetSearch.value = '';
            });
        });
        
        // Forex timeframes
        forexTimeframes.querySelectorAll('.tf-pill').forEach(pill => {
            pill.addEventListener('click', function() {
                if (isLocked || isAnalyzing) return;
                const tf = parseInt(this.dataset.tf);
                setActiveForexTimeframe(tf);
                resetSignalHero();
                if (currentTab === 'forex' && tvWidget) {
                    try { tvWidget.chart().setResolution(getTVInterval(tf)); } catch(e) {}
                }
            });
        });

        // OTC timeframes (seconds)
        otcTimeframes.querySelectorAll('.tf-pill').forEach(pill => {
            pill.addEventListener('click', function() {
                if (isLocked || isAnalyzing) return;
                const tf = parseInt(this.dataset.tf);
                setActiveOTCTimeframe(tf);
                resetSignalHero();
            });
        });
        
        generateBtn.addEventListener('click', handleGenerate);
        assetSearch.addEventListener('input', function() { if (!isLocked && !isAnalyzing) filterAssets(this.value); });
        clearHistoryBtn.addEventListener('click', clearHistory);
    }

    init();
});
