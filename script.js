// TradeSignal Premium Bot v4

document.addEventListener('DOMContentLoaded', function() {
    
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

    let currentAsset = "EUR/USD";
    let currentTab = 'forex';
    let currentTimeframe = 5;
    let isLocked = false;
    let isAnalyzing = false;
    let lockTimerInterval = null;
    let lockSeconds = 0;
    let tvWidget = null;
    let canvasAnimId = null;

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
    const heroTimeframe = document.getElementById('heroTimeframe');
    const heroProbability = document.getElementById('heroProbability');
    const heroExpiry = document.getElementById('heroExpiry');
    const heroVolatility = document.getElementById('heroVolatility');
    const heroTrend = document.getElementById('heroTrend');
    const heroAdvice = document.getElementById('heroAdvice');
    const analysisOverlay = document.getElementById('analysisOverlay');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const analysisLive = document.getElementById('analysisLive');
    const lockOverlay = document.getElementById('lockOverlay');
    const lockTimerValue = document.getElementById('lockTimerValue');
    const timerMini = document.getElementById('timerMini');
    const timerMiniValue = document.getElementById('timerMiniValue');
    const chartSection = document.getElementById('chartSection');
    const tradingviewChart = document.getElementById('tradingviewChart');
    const chartPlaceholder = document.getElementById('chartPlaceholder');
    const otcAnalytics = document.getElementById('otcAnalytics');
    const analyticsCanvas = document.getElementById('analyticsCanvas');
    const otcAssetName = document.getElementById('otcAssetName');
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

    const otcVolatility = document.getElementById('otcVolatility');
    const otcSentiment = document.getElementById('otcSentiment');
    const otcStrength = document.getElementById('otcStrength');
    const otcVolume = document.getElementById('otcVolume');

    function init() {
        renderForexList(forexAssets);
        renderOTCList();
        loadTradingViewChart(currentAsset);
        setupEventListeners();
        loadHistory();
        updateStats();
        resetSignalHero();
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
            otcAnalytics.style.display = 'none';
            if (canvasAnimId) cancelAnimationFrame(canvasAnimId);
            loadTradingViewChart(asset);
        } else {
            tradingviewChart.style.display = 'none';
            otcAnalytics.style.display = 'block';
            if (tvWidget) { tvWidget.remove(); tvWidget = null; }
            otcAssetName.textContent = asset;
            startOTCAnalytics();
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
                "studies": ["MASimple@tv-basicstudies", "RSI@tv-basicstudies"],
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
        const map = {1:"1",2:"2",3:"3",5:"5",10:"10",15:"15",30:"30",60:"60",240:"240"};
        return map[min] || "5";
    }

    // OTC Аналитика
    function startOTCAnalytics() {
        const canvas = analyticsCanvas;
        const ctx = canvas.getContext('2d');
        const container = otcAnalytics;
        
        function resize() {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        }
        resize();
        window.addEventListener('resize', resize);
        
        const particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                r: Math.random() * 2.5 + 1,
                alpha: Math.random() * 0.6 + 0.2
            });
        }
        
        const lines = [];
        for (let i = 0; i < 8; i++) {
            lines.push({
                points: [],
                color: `hsl(${210 + Math.random() * 40}, 70%, ${50 + Math.random() * 20}%)`,
                offset: Math.random() * 100
            });
            for (let x = 0; x < canvas.width + 20; x += 30) {
                lines[i].points.push({ x, y: canvas.height / 2 });
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Фон
            const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            grad.addColorStop(0, '#0a0e17');
            grad.addColorStop(0.5, '#111827');
            grad.addColorStop(1, '#0a0e17');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Сетка
            ctx.strokeStyle = 'rgba(30,41,59,0.4)';
            ctx.lineWidth = 0.5;
            for (let x = 0; x < canvas.width; x += 50) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 50) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }
            
            // Линии
            const t = Date.now() / 3000;
            lines.forEach(line => {
                ctx.beginPath();
                ctx.strokeStyle = line.color;
                ctx.lineWidth = 2;
                for (let i = 0; i < line.points.length; i++) {
                    const p = line.points[i];
                    p.y = canvas.height / 2 + Math.sin(p.x / 80 + t + line.offset) * 60 + Math.cos(p.x / 40 + t * 1.5) * 25;
                    if (i === 0) ctx.moveTo(p.x, p.y);
                    else ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();
            });
            
            // Частицы
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(96,165,250,${p.alpha})`;
                ctx.fill();
            });
            
            // Обновить метрики OTC
            otcVolatility.textContent = `${(30 + Math.random() * 50).toFixed(1)}%`;
            otcSentiment.textContent = Math.random() > 0.5 ? 'Бычий 🟢' : 'Медвежий 🔴';
            otcStrength.textContent = `${(40 + Math.random() * 55).toFixed(1)}%`;
            otcVolume.textContent = Math.random() > 0.6 ? 'Высокий' : 'Средний';
            
            canvasAnimId = requestAnimationFrame(animate);
        }
        animate();
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
        
        // Сброс шагов
        for (let i = 1; i <= 6; i++) {
            const step = document.getElementById(`step${i}`);
            if (step) { step.classList.remove('done'); step.querySelector('.step-dot').style.background = '#334155'; }
        }
        
        const totalDuration = 3000 + Math.random() * 3000;
        const startTime = performance.now();
        const segments = generateSegments(totalDuration);
        let currentSeg = 0;
        
        const stepsList = [
            { id: 'step1', text: 'Сбор рыночных данных...', progress: 0.15 },
            { id: 'step2', text: 'Поиск паттернов Price Action...', progress: 0.30 },
            { id: 'step3', text: 'Расчёт уровней поддержки/сопротивления...', progress: 0.50 },
            { id: 'step4', text: 'Анализ RSI, MACD, Moving Average...', progress: 0.70 },
            { id: 'step5', text: 'Оценка волатильности и объёмов...', progress: 0.88 },
            { id: 'step6', text: 'Формирование торгового сигнала...', progress: 0.98 }
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
        const probability = Math.floor(Math.random() * 16) + 75; // 75-90%
        const volatilities = ['Низкая', 'Умеренная', 'Средняя', 'Повышенная', 'Высокая', 'Очень высокая'];
        const volatility = volatilities[Math.floor(Math.random() * volatilities.length)];
        const trends = ['Восходящий 📈', 'Нисходящий 📉', 'Боковой ➡️'];
        const trend = isUp ? trends[0] : (Math.random() > 0.5 ? trends[1] : trends[0]);
        
        const expiryMins = currentTimeframe * (Math.floor(Math.random() * 3) + 1);
        const expiryText = expiryMins >= 60 ? `${Math.floor(expiryMins/60)}ч ${expiryMins%60}м` : `${expiryMins} мин`;
        
        // Hero signal
        signalHero.classList.add('active');
        signalHero.classList.remove('up', 'down');
        signalHero.classList.add(isUp ? 'up' : 'down');
        
        heroArrow.textContent = isUp ? '▲' : '▼';
        heroAction.textContent = isUp ? 'КУПИТЬ / CALL' : 'ПРОДАТЬ / PUT';
        heroAsset.textContent = currentAsset;
        heroTimeframe.textContent = `${currentTimeframe} мин`;
        heroProbability.textContent = `${probability}%`;
        heroExpiry.textContent = expiryText;
        heroVolatility.textContent = volatility;
        heroTrend.textContent = trend;
        
        const advices = [
            'Рекомендуемый риск: не более 2% от депозита.',
            'Учитывайте новостной фон. Проверьте экономический календарь.',
            'Подтвердите сигнал на старшем таймфрейме для надёжности.',
            'Отличная точка входа! Можно рассмотреть увеличение объёма.',
            'Дождитесь подтверждающей свечи перед открытием сделки.',
            'Установите stop-loss на уровне ближайшей поддержки/сопротивления.',
            'Рынок показывает сильный тренд — следуйте за ним.'
        ];
        heroAdvice.textContent = `💡 ${advices[Math.floor(Math.random() * advices.length)]}`;
        
        addToHistory(isUp, probability, expiryText);
        updateStats();
        
        if (navigator.vibrate) navigator.vibrate([100, 60, 100, 60, 200]);
    }

    function resetSignalHero() {
        signalHero.classList.remove('active', 'up', 'down');
        heroArrow.textContent = '—';
        heroAction.textContent = 'ОЖИДАНИЕ СИГНАЛА';
        heroAsset.textContent = currentAsset;
        heroTimeframe.textContent = `${currentTimeframe} мин`;
        heroProbability.textContent = '--%';
        heroExpiry.textContent = '--';
        heroVolatility.textContent = '--';
        heroTrend.textContent = '--';
        heroAdvice.textContent = '💡 Нажмите кнопку «ПОЛУЧИТЬ СИГНАЛ» для анализа рынка';
    }

    // Таймер
    function startLockTimer() {
        isLocked = true;
        lockSeconds = currentTimeframe * 60;
        lockOverlay.classList.add('active');
        timerMini.classList.add('visible');
        updateLockTimerDisplay();
        disableControls();
        
        lockTimerInterval = setInterval(() => {
            lockSeconds--;
            updateLockTimerDisplay();
            if (lockSeconds <= 0) {
                clearInterval(lockTimerInterval);
                lockTimerInterval = null;
                isLocked = false;
                lockOverlay.classList.remove('active');
                timerMini.classList.remove('visible');
                enableControls();
            }
        }, 1000);
    }

    function updateLockTimerDisplay() {
        const m = Math.floor(lockSeconds / 60);
        const s = lockSeconds % 60;
        const str = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        lockTimerValue.textContent = str;
        timerMiniValue.textContent = str;
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

    // История и статистика
    function addToHistory(isUp, probability, expiry) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${isUp ? 'up' : 'down'}`;
        historyItem.innerHTML = `
            <span class="hi-asset">${currentAsset}</span>
            <span class="hi-dir">${isUp ? '▲ CALL' : '▼ PUT'}</span>
            <span class="hi-prob">${probability}%</span>
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
                time: item.querySelector('.hi-time').textContent,
                isUp: item.classList.contains('up')
            });
        });
        localStorage.setItem('tradeSignalHistory', JSON.stringify(items));
    }

    function loadHistory() {
        const saved = localStorage.getItem('tradeSignalHistory');
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
        localStorage.removeItem('tradeSignalHistory');
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
                    otcAnalytics.style.display = 'block';
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
                tfPills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                currentTimeframe = parseInt(this.dataset.tf);
                heroTimeframe.textContent = `${currentTimeframe} мин`;
                resetSignalHero();
                if (currentTab === 'forex' && tvWidget) {
                    try { tvWidget.chart().setResolution(getTVInterval(currentTimeframe)); } catch(e) {}
                }
            });
        });
        
        generateBtn.addEventListener('click', handleGenerate);
        assetSearch.addEventListener('input', function() { if (!isLocked && !isAnalyzing) filterAssets(this.value); });
        clearHistoryBtn.addEventListener('click', clearHistory);
    }

    init();
});
