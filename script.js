// BinarySignal Pro - Close signal, Weekend check, Unified TF, Price compare, Fireworks

document.addEventListener('DOMContentLoaded', function() {
    
    const translations = {
        ru: {
            signals: "Сигналов", accuracy: "Точность", wins: "Побед", online: "Онлайн",
            search_placeholder: "🔍 Поиск актива...", currencies: "💱 ВАЛЮТЫ", crypto: "₿ КРИПТОВАЛЮТЫ",
            commodities: "🛢 СЫРЬЁ", stocks: "📊 АКЦИИ", indices: "🌐 ИНДЕКСЫ",
            binary_options: "Бинарные опционы", waiting_signal: "ОЖИДАНИЕ СИГНАЛА",
            probability: "Вероятность", expiry: "Экспирация", volatility: "Волатильность",
            entry_price: "Вход", press_button: "💡 Нажмите кнопку для получения сигнала",
            market_analysis: "АНАЛИЗ РЫНКА",
            step1: "Сбор данных", step2: "Паттерны", step3: "Уровни", step4: "Индикаторы",
            step5: "Волатильность", step6: "Сигнал",
            timeframe_expiry: "⏱ Таймфрейм / Экспирация:",
            get_signal: "ПОЛУЧИТЬ СИГНАЛ", timer: "⏱ Таймер:",
            history: "📋 История", avg_prob: "Сред. вер-ть", no_signals: "Нет сигналов",
            clear: "Очистить", close_signal: "Закрыть сигнал",
            footer_text: "Бот для бинарных опционов с ИИ-анализом.",
            buy_call: "КУПИТЬ / CALL", sell_put: "ПРОДАТЬ / PUT",
            init_neural: "Инициализация нейросети...",
            data_collection: "Сбор данных...", patterns: "Поиск паттернов...",
            levels: "Расчёт уровней...", indicators: "Анализ индикаторов...",
            volatility_step: "Оценка волатильности...", signal_step: "Формирование сигнала...",
            analysis_complete: "Анализ завершён!",
            forex_closed: "Форекс закрыт (суббота/воскресенье)",
            win_result: "✅ ПОБЕДА! +{profit}%",
            lose_result: "❌ ПРОИГРЫШ",
            draw_result: "➖ НИЧЬЯ",
            advices: ["Риск не более 2%.","Отличный вход!","Подтвердите на старшем ТФ.","Хорошая точка!","Следуйте тренду.","Stop-loss обязателен.","Чёткий сигнал."]
        },
        en: {
            signals: "Signals", accuracy: "Accuracy", wins: "Wins", online: "Online",
            search_placeholder: "🔍 Search asset...", currencies: "💱 CURRENCIES", crypto: "₿ CRYPTO",
            commodities: "🛢 COMMODITIES", stocks: "📊 STOCKS", indices: "🌐 INDICES",
            binary_options: "Binary Options", waiting_signal: "WAITING FOR SIGNAL",
            probability: "Probability", expiry: "Expiry", volatility: "Volatility",
            entry_price: "Entry", press_button: "💡 Press button to get a signal",
            market_analysis: "MARKET ANALYSIS",
            step1: "Data Collection", step2: "Patterns", step3: "Levels", step4: "Indicators",
            step5: "Volatility", step6: "Signal",
            timeframe_expiry: "⏱ Timeframe / Expiry:",
            get_signal: "GET SIGNAL", timer: "⏱ Timer:",
            history: "📋 History", avg_prob: "Avg Prob", no_signals: "No signals",
            clear: "Clear", close_signal: "Close signal",
            footer_text: "AI-powered binary options bot.",
            buy_call: "BUY / CALL", sell_put: "SELL / PUT",
            init_neural: "Initializing neural network...",
            data_collection: "Collecting data...", patterns: "Finding patterns...",
            levels: "Calculating levels...", indicators: "Analyzing indicators...",
            volatility_step: "Evaluating volatility...", signal_step: "Forming signal...",
            analysis_complete: "Analysis complete!",
            forex_closed: "Forex closed (Saturday/Sunday)",
            win_result: "✅ WIN! +{profit}%",
            lose_result: "❌ LOSS",
            draw_result: "➖ DRAW",
            advices: ["Risk max 2%.","Perfect entry!","Confirm on HTF.","Great point!","Follow trend.","Use stop-loss.","Clear signal."]
        }
    };

    let currentLang = 'ru';
    let currentTheme = 'dark';

    const forexAssets = [
        "GBP/CAD","EUR/JPY","CHF/JPY","AUD/CAD","USD/CAD","USD/CHF",
        "GBP/AUD","USD/JPY","EUR/USD","EUR/AUD","AUD/USD","CAD/JPY",
        "AUD/JPY","EUR/GBP","GBP/JPY","GBP/CHF","EUR/CAD","CAD/CHF","AUD/CHF"
    ];

    const otcData = {
        currencies: ["AED/CNY OTC","AUD/CAD OTC","AUD/CHF OTC","AUD/JPY OTC","AUD/NZD OTC","AUD/USD OTC","BHD/CNY OTC","CAD/CHF OTC","CAD/JPY OTC","CHF/JPY OTC","CHF/NOK OTC","EUR/CHF OTC","EUR/GBP OTC","EUR/HUF OTC","EUR/JPY OTC","EUR/NZD OTC","EUR/RUB OTC","EUR/TRY OTC","EUR/USD OTC","GBP/AUD OTC","GBP/JPY OTC","GBP/USD OTC","JOD/CNY OTC","KES/USD OTC","LBP/USD OTC","MAD/USD OTC","NGN/USD OTC","NZD/JPY OTC","NZD/USD OTC","OMR/CNY OTC","QAR/CNY OTC","SAR/CNY OTC","TND/USD OTC","UAH/USD OTC","USD/ARS OTC","USD/BDT OTC","USD/BRL OTC","USD/CAD OTC","USD/CHF OTC","USD/CLP OTC","USD/CNH OTC","USD/COP OTC","USD/DZD OTC","USD/EGP OTC","USD/IDR OTC","USD/INR OTC","USD/JPY OTC","USD/MXN OTC","USD/MYR OTC","USD/PHP OTC","USD/PKR OTC","USD/RUB OTC","USD/SGD OTC","USD/THB OTC","USD/VND OTC","YER/USD OTC","ZAR/USD OTC"],
        crypto: ["Avalanche OTC","Bitcoin OTC","Bitcoin ETF OTC","BNB OTC","Cardano OTC","Chainlink OTC","Dogecoin OTC","Ethereum OTC","Litecoin OTC","Polkadot OTC","Polygon OTC","Solana OTC","Toncoin OTC","TRON OTC"],
        commodities: ["Gold OTC","Natural Gas OTC","Palladium spot OTC","Platinum spot OTC"],
        stocks: ["Advanced Micro Devices OTC","Alibaba OTC","American Express OTC","Apple OTC","Citigroup Inc OTC","Cisco OTC","Coinbase Global OTC","ExxonMobil OTC","FACEBOOK INC OTC","FedEx OTC","GameStop Corp OTC","Intel OTC","Marathon Digital Holdings OTC","McDonald's OTC","Microsoft OTC","Netflix OTC","Palantir Technologies OTC","Pfizer Inc OTC","Tesla OTC","VISA OTC","VIX OTC"],
        indices: ["AUS 200 OTC","D30EUR OTC","DJI30 OTC","E35EUR OTC","E50EUR OTC","F40EUR OTC","JPN225 OTC","SP500 OTC","US100 OTC","100GBP OTC"]
    };

    // Unified timeframe: value is in seconds
    const timeframes = { 5:5, 15:15, 30:30, 1:60, 2:120, 3:180, 5:300, 10:600, 15:900 };
    let currentAsset = "EUR/USD";
    let currentTab = 'forex';
    let currentTimeframe = 60; // seconds (1m)
    let isLocked = false;
    let isAnalyzing = false;
    let lockTimerInterval = null;
    let lockSeconds = 0;
    let tvWidget = null;
    let entryPrice = null;
    let signalDirection = null; // 'up' or 'down'
    let signalActive = false;
    let fireworksActive = false;

    // DOM
    const assetSearch = document.getElementById('assetSearch');
    const assetsList = document.getElementById('assetsList');
    const otcCategories = document.getElementById('otcCategories');
    const forexClosed = document.getElementById('forexClosed');
    const currentAssetEl = document.getElementById('currentAsset');
    const timeframePills = document.getElementById('timeframePills');
    const generateBtn = document.getElementById('generateBtn');
    const signalOverlay = document.getElementById('signalOverlay');
    const signalHero = document.getElementById('signalHero');
    const signalClose = document.getElementById('signalClose');
    const heroArrow = document.getElementById('heroArrow');
    const heroAction = document.getElementById('heroAction');
    const heroAsset = document.getElementById('heroAsset');
    const heroTimeframeBadge = document.getElementById('heroTimeframeBadge');
    const heroProbability = document.getElementById('heroProbability');
    const heroExpiry = document.getElementById('heroExpiry');
    const heroVolatility = document.getElementById('heroVolatility');
    const heroEntryPrice = document.getElementById('heroEntryPrice');
    const entryPriceStat = document.getElementById('entryPriceStat');
    const heroAdvice = document.getElementById('heroAdvice');
    const heroResult = document.getElementById('heroResult');
    const analysisOverlay = document.getElementById('analysisOverlay');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const analysisLive = document.getElementById('analysisLive');
    const timerBox = document.getElementById('timerBox');
    const timerValue = document.getElementById('timerValue');
    const tradingviewChart = document.getElementById('tradingviewChart');
    const chartPlaceholder = document.getElementById('chartPlaceholder');
    const otcBg = document.getElementById('otcBg');
    const fireworksCanvas = document.getElementById('fireworksCanvas');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const totalSignalsEl = document.getElementById('totalSignals');
    const avgAccuracyEl = document.getElementById('avgAccuracy');
    const totalWinsEl = document.getElementById('totalWins');
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

    function t(key) { return translations[currentLang][key] || key; }
    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            if (el.tagName === 'INPUT') el.placeholder = t(el.getAttribute('data-i18n'));
            else el.textContent = t(el.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => el.placeholder = t(el.getAttribute('data-i18n-placeholder')));
        document.querySelectorAll('[data-i18n-title]').forEach(el => el.title = t(el.getAttribute('data-i18n-title')));
        if (!signalHero.classList.contains('up') && !signalHero.classList.contains('down')) heroAction.textContent = t('waiting_signal');
        heroAdvice.textContent = t('press_button');
    }
    function applyTheme() {
        document.body.classList.remove('dark','light');
        document.body.classList.add(currentTheme);
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('binarySignalTheme', currentTheme);
    }
    function toggleTheme() { currentTheme = currentTheme === 'dark' ? 'light' : 'dark'; applyTheme(); }

    // Check if weekend
    function isWeekend() {
        const now = new Date();
        const day = now.getDay();
        return day === 0 || day === 6;
    }

    function checkForexAccess() {
        if (currentTab === 'forex' && isWeekend()) {
            forexClosed.style.display = 'flex';
            assetsList.style.display = 'none';
            generateBtn.classList.add('disabled');
            timeframePills.style.pointerEvents = 'none';
            timeframePills.style.opacity = '0.5';
            return false;
        } else {
            forexClosed.style.display = 'none';
            if (currentTab === 'forex') {
                assetsList.style.display = 'flex';
                if (!isLocked) {
                    generateBtn.classList.remove('disabled');
                    timeframePills.style.pointerEvents = 'auto';
                    timeframePills.style.opacity = '1';
                }
            }
            return true;
        }
    }

    function init() {
        const savedLang = localStorage.getItem('binarySignalLang');
        if (savedLang) currentLang = savedLang;
        const savedTheme = localStorage.getItem('binarySignalTheme');
        if (savedTheme) currentTheme = savedTheme;
        applyTheme();
        updateLangButtons();
        applyTranslations();
        renderForexList(forexAssets);
        renderOTCList();
        setupEventListeners();
        loadHistory();
        updateStats();
        resetSignalHero();
        setActiveTimeframeUI(60);
        updateExpiryDisplay();
        checkForexAccess();
        if (currentTab === 'forex' && !isWeekend()) loadTradingViewChart(currentAsset);
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
        div.className = `asset-item ${symbol === currentAsset ? 'active' : ''}`;
        div.innerHTML = `<span class="asset-symbol">${symbol}</span>`;
        div.addEventListener('click', () => { if (!isLocked && !isAnalyzing) selectAsset(symbol, 'otc'); });
        return div;
    }

    function selectAsset(asset, tab) {
        if (tab === 'forex' && isWeekend()) return;
        currentAsset = asset;
        currentTab = tab;
        currentAssetEl.textContent = asset;
        document.querySelectorAll('.asset-item').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.asset-item').forEach(item => {
            if (item.querySelector('.asset-symbol').textContent === asset) item.classList.add('active');
        });
        resetSignalHero();
        checkForexAccess();
        if (tab === 'forex') {
            tradingviewChart.style.display = 'block';
            otcBg.style.display = 'none';
            if (!isWeekend()) loadTradingViewChart(asset);
        } else {
            tradingviewChart.style.display = 'none';
            otcBg.style.display = 'block';
            if (tvWidget) { tvWidget.remove(); tvWidget = null; }
        }
    }

    function loadTradingViewChart(symbol) {
        tradingviewChart.innerHTML = '';
        const ph = document.createElement('div');
        ph.className = 'chart-placeholder'; ph.id = 'chartPlaceholder';
        ph.innerHTML = '<div class="loading-spinner"></div>';
        tradingviewChart.appendChild(ph);
        let tvSymbol = symbol.replace('/','');
        tvSymbol = `FX:${tvSymbol}`;
        try {
            tvWidget = new TradingView.widget({
                "container_id": "tradingviewChart","autosize":true,"symbol":tvSymbol,
                "interval": getTVInterval(currentTimeframe),"timezone":"Europe/Moscow",
                "theme":currentTheme,"style":"1","locale":currentLang==='ru'?'ru':'en',
                "toolbar_bg": currentTheme==='dark'?"#1a2236":"#f8fafc",
                "enable_publishing":false,"hide_top_toolbar":true,"hide_side_toolbar":true,
                "allow_symbol_change":false,"save_image":false,"details":false,"studies":[],
                "width":"100%","height":"100%"
            });
            tvWidget.onChartReady(() => {
                const cp = document.getElementById('chartPlaceholder');
                if (cp) cp.style.display = 'none';
            });
        } catch(e) { console.error('TV error:',e); }
    }

    function getTVInterval(seconds) {
        const map = {5:"5S",15:"15S",30:"30S",60:"1",120:"2",180:"3",300:"5",600:"10",900:"15"};
        return map[seconds] || "1";
    }

    function setActiveTimeframeUI(seconds) {
        currentTimeframe = seconds;
        timeframePills.querySelectorAll('.tf-pill').forEach(p => {
            p.classList.remove('active');
            if (parseInt(p.dataset.tf) === seconds || (seconds >= 60 && parseInt(p.dataset.tf) === seconds/60) || (seconds < 60 && parseInt(p.dataset.tf) === seconds)) {
                // match by value
            }
        });
        // Better matching
        timeframePills.querySelectorAll('.tf-pill').forEach(p => {
            const tfVal = parseInt(p.dataset.tf);
            let tfSeconds;
            if (tfVal < 60) tfSeconds = tfVal;
            else tfSeconds = tfVal * 60;
            if (tfSeconds === seconds) p.classList.add('active');
        });
        updateExpiryDisplay();
        if (currentTab === 'forex' && tvWidget) {
            try { tvWidget.chart().setResolution(getTVInterval(seconds)); } catch(e) {}
        }
    }

    function updateExpiryDisplay() {
        let display;
        if (currentTimeframe < 60) display = `${currentTimeframe}s`;
        else display = `${currentTimeframe/60} min`;
        heroTimeframeBadge.textContent = display;
        heroExpiry.textContent = display;
    }

    // Get current price from TradingView
    function getCurrentPrice(callback) {
        if (currentTab === 'otc') {
            callback((Math.random() * 2 + 0.5).toFixed(5));
            return;
        }
        if (tvWidget && tvWidget.chart) {
            try {
                tvWidget.chart().getBars({ symbol: `FX:${currentAsset.replace('/','')}`, interval: getTVInterval(currentTimeframe), range: 1 }, bars => {
                    if (bars && bars.length > 0) {
                        callback(bars[bars.length-1].close);
                    } else {
                        callback((Math.random() * 2 + 0.5).toFixed(5));
                    }
                });
            } catch(e) {
                callback((Math.random() * 2 + 0.5).toFixed(5));
            }
        } else {
            callback((Math.random() * 2 + 0.5).toFixed(5));
        }
    }

    // Analysis
    function startAnalysis(callback) {
        if (isAnalyzing || isLocked) return;
        if (currentTab === 'forex' && isWeekend()) return;
        isAnalyzing = true;
        disableControls();
        analysisOverlay.classList.add('active');
        progressFill.style.width = '0%'; progressPercent.textContent = '0%';
        analysisLive.textContent = t('init_neural');
        for (let i=1;i<=6;i++) {
            const step = document.getElementById(`step${i}`);
            if (step) { step.classList.remove('done'); step.querySelector('.step-dot').style.background='#334155'; }
        }
        const totalDuration = 2500 + Math.random()*2500;
        const startTime = performance.now();
        const segments = generateSegments(totalDuration);
        let currentSeg = 0;
        const stepsList = [
            {id:'step1',text:t('data_collection'),progress:0.15},
            {id:'step2',text:t('patterns'),progress:0.32},
            {id:'step3',text:t('levels'),progress:0.52},
            {id:'step4',text:t('indicators'),progress:0.72},
            {id:'step5',text:t('volatility_step'),progress:0.88},
            {id:'step6',text:t('signal_step'),progress:0.98}
        ];
        function animate(timestamp) {
            const elapsed = timestamp - startTime;
            const rawProgress = Math.min(elapsed/totalDuration,1);
            while (currentSeg < segments.length-1 && rawProgress >= segments[currentSeg].endProgress) currentSeg++;
            const seg = segments[Math.min(currentSeg, segments.length-1)];
            const segElapsed = timestamp - (startTime + seg.startTime*totalDuration);
            const segDuration = seg.duration*totalDuration;
            const segProg = Math.min(segElapsed/segDuration,1);
            const eased = easeInOutCubic(segProg);
            const displayProgress = seg.startProgress + (seg.endProgress - seg.startProgress)*eased;
            progressFill.style.width = `${displayProgress*100}%`;
            progressPercent.textContent = `${Math.round(displayProgress*100)}%`;
            stepsList.forEach(s => {
                if (displayProgress >= s.progress) {
                    const stepEl = document.getElementById(s.id);
                    if (stepEl && !stepEl.classList.contains('done')) {
                        stepEl.classList.add('done');
                        stepEl.querySelector('.step-dot').style.background='#10b981';
                        analysisLive.textContent = s.text;
                    }
                }
            });
            if (rawProgress < 1) requestAnimationFrame(animate);
            else {
                progressFill.style.width='100%'; progressPercent.textContent='100%';
                analysisLive.textContent = t('analysis_complete');
                setTimeout(() => { analysisOverlay.classList.remove('active'); isAnalyzing=false; callback(); },350);
            }
        }
        requestAnimationFrame(animate);
    }

    function generateSegments(total) {
        const n = 3 + Math.floor(Math.random()*4);
        const segs = []; let cp = 0;
        for (let i=0;i<n;i++) {
            const isLast = i===n-1, remain = 1-cp;
            const sp = isLast ? remain : remain*(0.15+Math.random()*0.5);
            segs.push({startProgress:cp,endProgress:cp+sp,duration:sp*(0.7+Math.random()*0.6),startTime:cp});
            cp += sp;
        }
        return segs;
    }
    function easeInOutCubic(t) { return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2; }

    // Signal
    function generateSignal() {
        const isUp = Math.random() >= 0.5;
        const probability = Math.floor(Math.random()*16)+75;
        const volatilities = ['Low','Moderate','Medium','Elevated','High'];
        const volatility = volatilities[Math.floor(Math.random()*volatilities.length)];
        signalDirection = isUp ? 'up' : 'down';
        signalActive = true;
        signalHero.classList.add('active'); signalHero.classList.remove('up','down');
        signalHero.classList.add(isUp?'up':'down');
        signalOverlay.classList.add('visible');
        heroArrow.textContent = isUp?'▲':'▼';
        heroAction.textContent = isUp?t('buy_call'):t('sell_put');
        heroAsset.textContent = currentAsset;
        heroProbability.textContent = `${probability}%`;
        heroVolatility.textContent = volatility;
        heroResult.style.display = 'none';
        updateExpiryDisplay();
        const advices = t('advices');
        heroAdvice.textContent = `💡 ${advices[Math.floor(Math.random()*advices.length)]}`;
        // Get entry price
        getCurrentPrice(price => {
            entryPrice = parseFloat(price);
            heroEntryPrice.textContent = entryPrice.toFixed(5);
            entryPriceStat.style.display = 'flex';
        });
        addToHistory(isUp, probability, 'pending');
        updateStats();
        if (navigator.vibrate) navigator.vibrate([100,60,200]);
    }

    function resetSignalHero() {
        signalHero.classList.remove('active','up','down');
        signalOverlay.classList.remove('visible');
        signalActive = false;
        signalDirection = null;
        entryPrice = null;
        heroArrow.textContent = '—';
        heroAction.textContent = t('waiting_signal');
        heroAsset.textContent = currentAsset;
        heroProbability.textContent = '--%';
        heroVolatility.textContent = '--';
        heroEntryPrice.textContent = '--';
        entryPriceStat.style.display = 'none';
        heroResult.style.display = 'none';
        heroAdvice.textContent = t('press_button');
        updateExpiryDisplay();
    }

    function closeSignal() {
        if (lockTimerInterval) {
            clearInterval(lockTimerInterval);
            lockTimerInterval = null;
        }
        isLocked = false;
        timerBox.classList.remove('active');
        timerValue.textContent = '--:--';
        enableControls();
        resetSignalHero();
        stopFireworks();
        checkForexAccess();
    }

    // Timer
    function startLockTimer() {
        isLocked = true;
        lockSeconds = currentTimeframe;
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
                checkResult();
            }
        }, 1000);
    }

    function updateLockTimerDisplay() {
        const m = Math.floor(lockSeconds/60);
        const s = lockSeconds%60;
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
        if (currentTab === 'forex' && isWeekend()) {
            generateBtn.classList.add('disabled');
            timeframePills.style.pointerEvents = 'none';
            timeframePills.style.opacity = '0.5';
        } else {
            generateBtn.classList.remove('disabled');
            timeframePills.style.pointerEvents = 'auto';
            timeframePills.style.opacity = '1';
        }
        assetSearch.disabled = false;
        assetsList.style.pointerEvents = 'auto';
        assetsList.style.opacity = '1';
        otcCategories.style.pointerEvents = 'auto';
        otcCategories.style.opacity = '1';
    }

    // Check result
    function checkResult() {
        if (!signalActive || !entryPrice) return;
        getCurrentPrice(currentPrice => {
            currentPrice = parseFloat(currentPrice);
            let result;
            if (currentPrice > entryPrice) result = 'up';
            else if (currentPrice < entryPrice) result = 'down';
            else result = 'draw';
            
            let isWin = false;
            if (signalDirection === 'up' && result === 'up') isWin = true;
            else if (signalDirection === 'down' && result === 'down') isWin = true;
            else if (result === 'draw') isWin = null; // draw
            
            const profit = Math.abs(((currentPrice - entryPrice) / entryPrice) * 100).toFixed(2);
            
            if (isWin === true) {
                heroResult.style.display = 'block';
                heroResult.textContent = t('win_result').replace('{profit}', profit);
                heroResult.className = 'hero-result win';
                startFireworks();
                updateLastHistoryResult('win');
            } else if (isWin === false) {
                heroResult.style.display = 'block';
                heroResult.textContent = t('lose_result');
                heroResult.className = 'hero-result lose';
                shakeSignal();
                updateLastHistoryResult('lose');
            } else {
                heroResult.style.display = 'block';
                heroResult.textContent = t('draw_result');
                heroResult.className = 'hero-result draw';
                updateLastHistoryResult('draw');
            }
            updateStats();
            // Auto close after 3 seconds
            setTimeout(() => {
                if (signalActive) closeSignal();
            }, 5000);
        });
    }

    function updateLastHistoryResult(result) {
        const items = historyList.querySelectorAll('.history-item');
        if (items.length > 0) {
            const last = items[0];
            last.setAttribute('data-result', result);
            if (result === 'win') last.classList.add('win-result');
            else if (result === 'lose') last.classList.add('lose-result');
            else last.classList.add('draw-result');
            saveHistory();
        }
    }

    function shakeSignal() {
        signalHero.style.animation = 'shake 0.6s ease';
        setTimeout(() => signalHero.style.animation = '', 600);
    }

    // Fireworks
    function startFireworks() {
        if (fireworksActive) return;
        fireworksActive = true;
        const canvas = fireworksCanvas;
        canvas.style.display = 'block';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        const particles = [];
        for (let i=0;i<150;i++) {
            particles.push({
                x: canvas.width/2 + (Math.random()-0.5)*400,
                y: canvas.height/2 + (Math.random()-0.5)*300,
                vx: (Math.random()-0.5)*8,
                vy: (Math.random()-0.5)*8 - 3,
                life: 1, decay: 0.008 + Math.random()*0.02,
                color: `hsl(${Math.random()*360},100%,${50+Math.random()*30}%)`,
                size: 2+Math.random()*4
            });
        }
        function animate() {
            if (!fireworksActive) { canvas.style.display = 'none'; return; }
            ctx.clearRect(0,0,canvas.width,canvas.height);
            let alive = false;
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life -= p.decay;
                if (p.life > 0) {
                    alive = true;
                    ctx.beginPath();
                    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
                    ctx.fillStyle = p.color.replace('100%',`${p.life*100}%`).replace('50%',`${50*p.life}%`);
                    ctx.fill();
                }
            });
            if (alive) requestAnimationFrame(animate);
            else { fireworksActive = false; canvas.style.display = 'none'; }
        }
        requestAnimationFrame(animate);
        setTimeout(() => { fireworksActive = false; canvas.style.display = 'none'; }, 3000);
    }

    function stopFireworks() {
        fireworksActive = false;
        fireworksCanvas.style.display = 'none';
    }

    // History
    function addToHistory(isUp, probability, result) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString(currentLang==='ru'?'ru-RU':'en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
        const expiryStr = currentTimeframe<60?`${currentTimeframe}s`:`${currentTimeframe/60}m`;
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${isUp?'up':'down'}`;
        historyItem.setAttribute('data-result', result || 'pending');
        historyItem.innerHTML = `
            <span class="hi-asset">${currentAsset}</span>
            <span class="hi-dir">${isUp?'▲ CALL':'▼ PUT'}</span>
            <span class="hi-prob">${probability}%</span>
            <span class="hi-exp">${expiryStr}</span>
            <span class="hi-result"></span>
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
                isUp: item.classList.contains('up'),
                result: item.getAttribute('data-result')
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
                div.className = `history-item ${item.isUp?'up':'down'} ${item.result?item.result+'-result':''}`;
                div.setAttribute('data-result', item.result || 'pending');
                div.innerHTML = `
                    <span class="hi-asset">${item.asset}</span>
                    <span class="hi-dir">${item.dir}</span>
                    <span class="hi-prob">${item.prob}</span>
                    <span class="hi-exp">${item.exp}</span>
                    <span class="hi-result">${item.result==='win'?'✅':item.result==='lose'?'❌':item.result==='draw'?'➖':''}</span>
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
        let wins = 0, sumProb = 0;
        items.forEach(item => {
            const prob = parseInt(item.querySelector('.hi-prob').textContent);
            if (!isNaN(prob)) sumProb += prob;
            if (item.getAttribute('data-result') === 'win') wins++;
        });
        totalWinsEl.textContent = wins;
        const avgProb = total>0?Math.round(sumProb/total):0;
        avgAccuracyEl.textContent = total>0?`${avgProb}%`:'--';
        miniAvgProb.textContent = total>0?`${avgProb}%`:'--%';
        miniWinRate.textContent = total>0?`${Math.round((wins/total)*100)}%`:'--%';
    }

    function clearHistory() {
        historyList.innerHTML = `<div class="empty-history">${t('no_signals')}</div>`;
        localStorage.removeItem('binarySignalHistory');
        updateStats();
    }

    function filterAssets(query) {
        const s = query.toLowerCase().trim();
        if (currentTab==='forex') {
            const filtered = forexAssets.filter(a=>a.toLowerCase().includes(s));
            renderForexList(filtered.length>0?filtered:forexAssets);
        } else {
            document.querySelectorAll('.otc-items .asset-item').forEach(item => {
                const sym = item.querySelector('.asset-symbol').textContent.toLowerCase();
                item.style.display = (!s||sym.includes(s))?'flex':'none';
            });
        }
    }

    function handleGenerate() {
        if (isLocked || isAnalyzing) return;
        if (currentTab==='forex' && isWeekend()) return;
        resetSignalHero();
        stopFireworks();
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
                if (currentTab==='forex' && !isWeekend()) loadTradingViewChart(currentAsset);
            });
        });
        themeToggle.addEventListener('click', toggleTheme);
        signalClose.addEventListener('click', closeSignal);

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (isLocked || isAnalyzing) return;
                tabBtns.forEach(b=>b.classList.remove('active'));
                this.classList.add('active');
                currentTab = this.dataset.tab;
                if (currentTab==='forex') {
                    assetsList.style.display = isWeekend()?'none':'flex';
                    otcCategories.style.display = 'none';
                    renderForexList(forexAssets);
                    selectAsset('EUR/USD','forex');
                } else {
                    assetsList.style.display = 'none';
                    otcCategories.style.display = 'block';
                    selectAsset('EUR/USD OTC','otc');
                }
                resetSignalHero();
                checkForexAccess();
                assetSearch.value = '';
            });
        });

        timeframePills.querySelectorAll('.tf-pill').forEach(pill => {
            pill.addEventListener('click', function() {
                if (isLocked || isAnalyzing) return;
                const tfVal = parseInt(this.dataset.tf);
                let seconds;
                if (tfVal < 60) seconds = tfVal;
                else seconds = tfVal * 60;
                setActiveTimeframeUI(seconds);
                resetSignalHero();
                if (currentTab==='forex' && tvWidget && !isWeekend()) {
                    try { tvWidget.chart().setResolution(getTVInterval(seconds)); } catch(e) {}
                }
            });
        });

        generateBtn.addEventListener('click', handleGenerate);
        assetSearch.addEventListener('input', function() { if (!isLocked && !isAnalyzing) filterAssets(this.value); });
        clearHistoryBtn.addEventListener('click', clearHistory);

        // Check forex access every minute
        setInterval(checkForexAccess, 60000);
    }

    init();
});
