// TradeSignal Premium Bot - Логика v3

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== ДАННЫЕ FOREX ====================
    const forexAssets = [
        "GBP/CAD", "EUR/JPY", "CHF/JPY", "AUD/CAD", "USD/CAD", "USD/CHF", 
        "GBP/AUD", "USD/JPY", "EUR/USD", "EUR/AUD", "AUD/USD", "CAD/JPY",
        "AUD/JPY", "EUR/GBP", "GBP/JPY", "GBP/CHF", "EUR/CAD", "CAD/CHF", "AUD/CHF"
    ];

    // ==================== СОСТОЯНИЕ ====================
    let currentAsset = "EUR/USD";
    let currentTimeframe = 5;
    let isLocked = false;       // Блокировка интерфейса
    let isAnalyzing = false;    // Идёт анализ
    let lockTimerInterval = null;
    let lockSeconds = 0;
    let tvWidget = null;

    // ==================== DOM ====================
    const assetSearch = document.getElementById('assetSearch');
    const assetsList = document.getElementById('assetsList');
    const currentAssetEl = document.getElementById('currentAsset');
    const timeframePills = document.getElementById('timeframePills');
    const generateBtn = document.getElementById('generateBtn');
    const analysisOverlay = document.getElementById('analysisOverlay');
    const analysisDetail = document.getElementById('analysisDetail');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const indicator1 = document.getElementById('indicator1');
    const indicator2 = document.getElementById('indicator2');
    const indicator3 = document.getElementById('indicator3');
    const lockOverlay = document.getElementById('lockOverlay');
    const lockTimerValue = document.getElementById('lockTimerValue');
    const signalCard = document.getElementById('signalCard');
    const signalBadge = document.getElementById('signalBadge');
    const signalTimeframe = document.getElementById('signalTimeframe');
    const signalArrow = document.getElementById('signalArrow');
    const signalType = document.getElementById('signalType');
    const signalProbability = document.getElementById('signalProbability');
    const signalExpiry = document.getElementById('signalExpiry');
    const signalVolatility = document.getElementById('signalVolatility');
    const signalAdvice = document.getElementById('signalAdvice');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const chartPlaceholder = document.getElementById('chartPlaceholder');
    const tfPills = document.querySelectorAll('.tf-pill');

    // ==================== ИНИЦИАЛИЗАЦИЯ ====================
    function init() {
        renderForexList(forexAssets);
        loadTradingViewChart(currentAsset);
        setupEventListeners();
        loadHistory();
        updateSignalTimeframeDisplay();
    }

    // ==================== РЕНДЕРИНГ ====================
    function renderForexList(assets) {
        assetsList.innerHTML = '';
        assets.forEach(asset => {
            const div = document.createElement('div');
            div.className = `asset-item ${asset === currentAsset ? 'active' : ''}`;
            div.innerHTML = `<span class="asset-symbol">${asset}</span>`;
            div.addEventListener('click', () => {
                if (!isLocked) selectAsset(asset);
            });
            assetsList.appendChild(div);
        });
    }

    function selectAsset(asset) {
        if (isLocked) return;
        currentAsset = asset;
        currentAssetEl.textContent = asset;
        
        document.querySelectorAll('.asset-item').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.asset-item').forEach(item => {
            if (item.querySelector('.asset-symbol').textContent === asset) {
                item.classList.add('active');
            }
        });
        
        loadTradingViewChart(asset);
        resetSignalCard();
    }

    // ==================== TRADINGVIEW ====================
    function loadTradingViewChart(symbol) {
        const chartContainer = document.getElementById('tradingviewChart');
        chartContainer.innerHTML = '';
        chartPlaceholder.style.display = 'flex';
        
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
                "hotlist": false,
                "calendar": false,
                "studies": ["MASimple@tv-basicstudies"],
                "width": "100%",
                "height": "100%"
            });
            
            tvWidget.onChartReady(() => {
                chartPlaceholder.style.display = 'none';
            });
        } catch (e) {
            console.error('TradingView error:', e);
            chartPlaceholder.innerHTML = '<span>Ошибка загрузки</span>';
        }
    }

    function getTVInterval(minutes) {
        const map = { 1: "1", 2: "2", 3: "3", 5: "5", 10: "10", 15: "15", 30: "30", 60: "60", 240: "240" };
        return map[minutes] || "5";
    }

    // ==================== АНАЛИЗ С ПЛАВНЫМ СЛУЧАЙНЫМ ПРОГРЕССОМ ====================
    function startAnalysis(callback) {
        if (isAnalyzing || isLocked) return;
        isAnalyzing = true;
        disableAllControls();
        
        analysisOverlay.classList.add('active');
        progressFill.style.width = '0%';
        progressPercent.textContent = '0%';
        analysisDetail.textContent = 'Загрузка данных...';
        indicator1.style.opacity = '0.4';
        indicator2.style.opacity = '0.4';
        indicator3.style.opacity = '0.4';
        
        // Случайная длительность анализа: 2.5 - 5 секунд
        const totalDuration = 2500 + Math.random() * 2500;
        const startTime = performance.now();
        
        // Генерируем несколько сегментов прогресса с разной скоростью
        const segments = generateRandomSegments(totalDuration);
        let currentSegment = 0;
        let segmentStartTime = startTime;
        let segmentStartProgress = 0;
        
        const indicators = [
            { el: indicator1, name: '● RSI', progress: 0.3 },
            { el: indicator2, name: '● MACD', progress: 0.6 },
            { el: indicator3, name: '● MA', progress: 0.85 }
        ];
        
        function animate(timestamp) {
            const elapsedTotal = timestamp - startTime;
            const progress = Math.min(elapsedTotal / totalDuration, 1);
            
            // Находим текущий сегмент
            while (currentSegment < segments.length - 1 && progress >= segments[currentSegment].endProgress) {
                currentSegment++;
                segmentStartTime = timestamp;
                segmentStartProgress = progress;
            }
            
            // Плавное движение внутри сегмента
            const seg = segments[Math.min(currentSegment, segments.length - 1)];
            const segElapsed = timestamp - segmentStartTime;
            const segDuration = seg.duration;
            const segProgress = Math.min(segElapsed / segDuration, 1);
            
            // Используем easing для плавности
            const easedProgress = easeInOutCubic(segProgress);
            const displayProgress = seg.startProgress + (seg.endProgress - seg.startProgress) * easedProgress;
            
            progressFill.style.width = `${displayProgress * 100}%`;
            progressPercent.textContent = `${Math.round(displayProgress * 100)}%`;
            
            // Обновляем текст анализа
            if (displayProgress < 0.2) {
                analysisDetail.textContent = 'Сканирование паттернов...';
            } else if (displayProgress < 0.4) {
                analysisDetail.textContent = 'Анализ волатильности...';
            } else if (displayProgress < 0.6) {
                analysisDetail.textContent = 'Расчёт уровней поддержки...';
            } else if (displayProgress < 0.8) {
                analysisDetail.textContent = 'Оценка индикаторов...';
            } else {
                analysisDetail.textContent = 'Формирование сигнала...';
            }
            
            // Подсветка индикаторов
            indicators.forEach(ind => {
                if (displayProgress >= ind.progress) {
                    ind.el.style.opacity = '1';
                    ind.el.style.color = '#10b981';
                }
            });
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Завершение
                progressFill.style.width = '100%';
                progressPercent.textContent = '100%';
                analysisDetail.textContent = 'Анализ завершён!';
                
                setTimeout(() => {
                    analysisOverlay.classList.remove('active');
                    isAnalyzing = false;
                    callback();
                }, 400);
            }
        }
        
        requestAnimationFrame(animate);
    }

    function generateRandomSegments(totalDuration) {
        // Создаём 3-5 сегментов с разной скоростью
        const numSegments = 3 + Math.floor(Math.random() * 3);
        const segments = [];
        let currentProgress = 0;
        
        for (let i = 0; i < numSegments; i++) {
            const isLast = i === numSegments - 1;
            const remainingProgress = 1 - currentProgress;
            const segmentProgress = isLast ? remainingProgress : remainingProgress * (0.2 + Math.random() * 0.5);
            const segmentDuration = totalDuration * (segmentProgress + (Math.random() - 0.3) * 0.2);
            
            segments.push({
                startProgress: currentProgress,
                endProgress: currentProgress + segmentProgress,
                duration: Math.max(segmentDuration, 300)
            });
            
            currentProgress += segmentProgress;
        }
        
        return segments;
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // ==================== ГЕНЕРАЦИЯ СИГНАЛА ====================
    function generateSignal() {
        const isUp = Math.random() >= 0.5;
        const probability = Math.floor(Math.random() * 21) + 70;
        
        const volatilities = ['Низкая', 'Средняя', 'Высокая', 'Очень высокая'];
        const volatility = volatilities[Math.floor(Math.random() * volatilities.length)];
        
        const expiryMinutes = currentTimeframe * (Math.floor(Math.random() * 3) + 1);
        const expiryText = expiryMinutes >= 60 ? 
            `${Math.floor(expiryMinutes/60)}ч ${expiryMinutes%60}м` : `${expiryMinutes} мин`;
        
        // Обновить карточку сигнала
        signalCard.classList.add('visible');
        signalCard.classList.remove('up', 'down');
        signalCard.classList.add(isUp ? 'up' : 'down');
        
        signalBadge.textContent = 'СИГНАЛ';
        signalArrow.textContent = isUp ? '▲' : '▼';
        signalType.textContent = isUp ? 'CALL / ВВЕРХ' : 'PUT / ВНИЗ';
        signalProbability.textContent = `${probability}%`;
        signalExpiry.textContent = expiryText;
        signalVolatility.textContent = volatility;
        
        const advices = [
            'Рекомендуемый риск: не более 2% от депозита.',
            'Учитывайте новостной фон перед входом.',
            'Подтвердите сигнал на старшем таймфрейме.',
            'Отличная точка для входа в рынок.',
            'Дождитесь подтверждающей свечи.'
        ];
        signalAdvice.textContent = `💡 ${advices[Math.floor(Math.random() * advices.length)]}`;
        
        // Добавить в историю
        addToHistory(isUp, probability, expiryText);
        
        // Вибро-отклик
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }

    // ==================== ТАЙМЕР БЛОКИРОВКИ ====================
    function startLockTimer() {
        isLocked = true;
        lockSeconds = currentTimeframe * 60;
        
        lockOverlay.classList.add('active');
        updateLockTimerDisplay();
        disableAllControls();
        
        lockTimerInterval = setInterval(() => {
            lockSeconds--;
            updateLockTimerDisplay();
            
            if (lockSeconds <= 0) {
                clearInterval(lockTimerInterval);
                lockTimerInterval = null;
                isLocked = false;
                lockOverlay.classList.remove('active');
                enableAllControls();
                signalBadge.textContent = 'ГОТОВ';
                signalBadge.style.background = 'rgba(16,185,129,0.2)';
                signalBadge.style.color = '#10b981';
            }
        }, 1000);
    }

    function updateLockTimerDisplay() {
        const minutes = Math.floor(lockSeconds / 60);
        const seconds = lockSeconds % 60;
        lockTimerValue.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // ==================== КНОПКА ГЕНЕРАЦИИ ====================
    function handleGenerateClick() {
        if (isLocked || isAnalyzing) return;
        
        // Сбросить предыдущий сигнал
        resetSignalCard();
        
        // Запустить анализ
        startAnalysis(() => {
            // После анализа сгенерировать сигнал
            generateSignal();
            // Запустить таймер блокировки
            startLockTimer();
        });
    }

    function resetSignalCard() {
        signalCard.classList.remove('visible', 'up', 'down');
        signalBadge.textContent = 'ОЖИДАНИЕ';
        signalBadge.style.background = 'rgba(148,163,184,0.15)';
        signalBadge.style.color = '#94a3b8';
        signalArrow.textContent = '—';
        signalType.textContent = 'Ожидание сигнала';
        signalProbability.textContent = '--';
        signalExpiry.textContent = '--';
        signalVolatility.textContent = '--';
        signalAdvice.textContent = '';
        indicator1.style.opacity = '0.4';
        indicator1.style.color = '#94a3b8';
        indicator2.style.opacity = '0.4';
        indicator2.style.color = '#94a3b8';
        indicator3.style.opacity = '0.4';
        indicator3.style.color = '#94a3b8';
    }

    function updateSignalTimeframeDisplay() {
        signalTimeframe.textContent = `${currentTimeframe} мин`;
    }

    // ==================== БЛОКИРОВКА / РАЗБЛОКИРОВКА ====================
    function disableAllControls() {
        generateBtn.classList.add('disabled');
        assetSearch.disabled = true;
        timeframePills.style.pointerEvents = 'none';
        timeframePills.style.opacity = '0.5';
        assetsList.style.pointerEvents = 'none';
        assetsList.style.opacity = '0.5';
    }

    function enableAllControls() {
        generateBtn.classList.remove('disabled');
        assetSearch.disabled = false;
        timeframePills.style.pointerEvents = 'auto';
        timeframePills.style.opacity = '1';
        assetsList.style.pointerEvents = 'auto';
        assetsList.style.opacity = '1';
    }

    // ==================== ИСТОРИЯ ====================
    function addToHistory(isUp, probability, expiry) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${isUp ? 'up' : 'down'}`;
        historyItem.innerHTML = `
            <div class="history-header">
                <span class="history-asset">${currentAsset}</span>
                <span class="history-time">${timeStr}</span>
            </div>
            <div class="history-dir">${isUp ? '▲ CALL' : '▼ PUT'}</div>
            <div class="history-meta">
                <span>${probability}%</span>
                <span>${expiry}</span>
            </div>
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
                meta: item.querySelector('.history-meta').innerHTML,
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
                    <div class="history-meta">${item.meta}</div>
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
        const filtered = forexAssets.filter(a => a.toLowerCase().includes(searchTerm));
        renderForexList(filtered.length > 0 ? filtered : forexAssets);
        // Подсветить текущий актив
        document.querySelectorAll('.asset-item').forEach(item => {
            if (item.querySelector('.asset-symbol').textContent === currentAsset) {
                item.classList.add('active');
            }
        });
    }

    // ==================== СОБЫТИЯ ====================
    function setupEventListeners() {
        // Таймфрейм
        tfPills.forEach(pill => {
            pill.addEventListener('click', function() {
                if (isLocked) return;
                tfPills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                currentTimeframe = parseInt(this.dataset.tf);
                updateSignalTimeframeDisplay();
                resetSignalCard();
                
                if (tvWidget) {
                    try {
                        tvWidget.chart().setResolution(getTVInterval(currentTimeframe));
                    } catch(e) {}
                }
            });
        });
        
        // Кнопка генерации
        generateBtn.addEventListener('click', handleGenerateClick);
        
        // Поиск
        assetSearch.addEventListener('input', function() {
            if (!isLocked) filterAssets(this.value);
        });
        
        // Очистка истории
        clearHistoryBtn.addEventListener('click', clearHistory);
        
        // Предотвращение действий при блокировке
        document.addEventListener('click', function(e) {
            if (isLocked && e.target.closest('.asset-item')) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    }

    init();
});
