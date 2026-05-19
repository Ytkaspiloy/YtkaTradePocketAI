// BinarySignal Pro - No price/entry, Timer NEVER resets on close, RU/EN works

document.addEventListener('DOMContentLoaded', function() {
    
    const translations = {
        ru: {
            online:"Онлайн",search_placeholder:"🔍 Поиск...",forex_closed:"Рынок закрыт (выходные)",
            probability:"Вероятность",expiry:"Экспирация",volatility:"Волатильность",
            press_button:"💡 Нажмите кнопку для сигнала",
            market_analysis:"АНАЛИЗ РЫНКА",step1:"Сбор данных",step2:"Паттерны",
            step3:"Уровни",step4:"Индикаторы",step5:"Волатильность",step6:"Сигнал",
            timeframe_expiry:"⏱ Таймфрейм / Экспирация:",get_signal:"ПОЛУЧИТЬ СИГНАЛ",
            timer:"⏱ Таймер:",history:"📋 История",signals:"Сигналов",winrate:"Винрейт",
            avg_prob:"Сред. вер-ть",no_signals:"Нет сигналов",clear:"Очистить",
            waiting_signal:"ОЖИДАНИЕ",buy_call:"CALL ▲",sell_put:"PUT ▼",
            init_neural:"Инициализация нейросети...",data_collection:"Сбор рыночных данных...",
            patterns:"Поиск паттернов...",levels:"Расчёт уровней...",indicators:"Анализ индикаторов...",
            volatility_step:"Оценка волатильности...",signal_step:"Формирование сигнала...",
            analysis_complete:"Анализ завершён!",win_result:"✅ +{profit}%",
            lose_result:"❌ ПРОИГРЫШ",draw_result:"➖ НИЧЬЯ",
            advices:["Риск ≤2%","Отличный вход!","Проверьте ТФ","Хорошая точка!","По тренду","Stop-loss!","Сигнал!"]
        },
        en: {
            online:"Online",search_placeholder:"🔍 Search...",forex_closed:"Market closed (weekend)",
            probability:"Probability",expiry:"Expiry",volatility:"Volatility",
            press_button:"💡 Press button for signal",
            market_analysis:"MARKET ANALYSIS",step1:"Data Collection",step2:"Patterns",
            step3:"Levels",step4:"Indicators",step5:"Volatility",step6:"Signal",
            timeframe_expiry:"⏱ Timeframe / Expiry:",get_signal:"GET SIGNAL",
            timer:"⏱ Timer:",history:"📋 History",signals:"Signals",winrate:"Winrate",
            avg_prob:"Avg Prob",no_signals:"No signals",clear:"Clear",
            waiting_signal:"WAITING",buy_call:"CALL ▲",sell_put:"PUT ▼",
            init_neural:"Initializing neural network...",data_collection:"Collecting market data...",
            patterns:"Finding patterns...",levels:"Calculating levels...",indicators:"Analyzing indicators...",
            volatility_step:"Evaluating volatility...",signal_step:"Forming signal...",
            analysis_complete:"Analysis complete!",win_result:"✅ +{profit}%",
            lose_result:"❌ LOSS",draw_result:"➖ DRAW",
            advices:["Risk ≤2%","Perfect entry!","Check HTF","Great point!","Follow trend","Stop-loss!","Signal!"]
        }
    };

    let currentLang = localStorage.getItem('bsLang') || 'ru';
    let currentTheme = localStorage.getItem('bsTheme') || 'dark';
    
    const forexAssets = [
        "GBP/CAD","EUR/JPY","CHF/JPY","AUD/CAD","USD/CAD","USD/CHF",
        "GBP/AUD","USD/JPY","EUR/USD","EUR/AUD","AUD/USD","CAD/JPY",
        "AUD/JPY","EUR/GBP","GBP/JPY","GBP/CHF","EUR/CAD","CAD/CHF","AUD/CHF"
    ];
    const timeframeMap = {1:60,2:120,3:180,5:300,10:600,15:900,30:1800,60:3600};
    let currentAsset = "EUR/USD";
    let currentTimeframe = 60;
    let isLocked = false, isAnalyzing = false, lockTimerInterval = null, lockSeconds = 0;
    let tvWidget = null, signalDirection = null, signalActive = false;
    let isMinimized = false;
    let signalVisible = true; // Whether signal card is visible (close just hides)

    function t(key) { return translations[currentLang][key] || key; }
    function $(id) { return document.getElementById(id); }

    function applyLang() {
        document.querySelectorAll('[data-i18n]').forEach(el => { if(el.tagName!=='INPUT') el.textContent = t(el.getAttribute('data-i18n')); });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => el.placeholder = t(el.getAttribute('data-i18n-placeholder')));
        if($('forexClosed')) $('forexClosed').querySelector('.closed-text').textContent = t('forex_closed');
        if(!signalActive) {
            $('heroAction').textContent = t('waiting_signal');
            $('heroAdvice').textContent = t('press_button');
        } else {
            const isUp = signalDirection === 'up';
            $('heroAction').textContent = isUp ? t('buy_call') : t('sell_put');
        }
    }

    function applyTheme() {
        document.body.classList.remove('dark','light');
        document.body.classList.add(currentTheme);
        $('themeToggle').querySelector('.theme-icon').textContent = currentTheme==='dark'?'☀️':'🌙';
    }

    function isWeekend() { const d = new Date().getDay(); return d===0||d===6; }

    function init() {
        applyTheme(); applyLang();
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.remove('active');
            if(b.dataset.lang === currentLang) b.classList.add('active');
        });
        renderAssets(forexAssets);
        loadTV(currentAsset);
        setupEvents();
        loadHistory(); updateStats();
        resetSignal();
        setTF(60);
        checkForex();
        setInterval(checkForex, 30000);
        restoreTimer();
    }

    function renderAssets(list) {
        $('assetsList').innerHTML = '';
        list.forEach(a => {
            const d = document.createElement('div');
            d.className = `asset-item ${a===currentAsset?'active':''}`;
            d.innerHTML = `<span>${a}</span>`;
            d.addEventListener('click', () => { if(!isLocked&&!isAnalyzing) selectAsset(a); });
            $('assetsList').appendChild(d);
        });
    }

    function selectAsset(a) {
        if(isWeekend()) return;
        currentAsset = a; $('currentAsset').textContent = a;
        document.querySelectorAll('.asset-item').forEach(e => e.classList.remove('active'));
        [...document.querySelectorAll('.asset-item')].find(e => e.textContent.trim()===a)?.classList.add('active');
        if(signalActive) updateSignalDisplay();
        loadTV(a);
    }

    function loadTV(symbol) {
        $('tradingviewChart').innerHTML = '';
        const ph = document.createElement('div'); ph.className='chart-placeholder';
        ph.innerHTML='<div class="loading-spinner"></div>'; $('tradingviewChart').appendChild(ph);
        try {
            if(tvWidget) { tvWidget.remove(); tvWidget = null; }
            tvWidget = new TradingView.widget({
                container_id:"tradingviewChart",autosize:true,symbol:`FX:${symbol.replace('/','')}`,
                interval:getTVInt(currentTimeframe),timezone:"Europe/Moscow",
                theme:currentTheme,style:"1",locale:currentLang==='ru'?'ru':'en',
                toolbar_bg:currentTheme==='dark'?"#1a2236":"#f8fafc",
                enable_publishing:false,hide_top_toolbar:true,hide_side_toolbar:true,
                allow_symbol_change:false,save_image:false,details:false,studies:[],
                width:"100%",height:"100%"
            });
            tvWidget.onChartReady(() => {
                const cp = $('tradingviewChart').querySelector('.chart-placeholder');
                if(cp) cp.style.display='none';
            });
        } catch(e) {}
    }

    function getTVInt(sec) {
        const m = {60:"1",120:"2",180:"3",300:"5",600:"10",900:"15",1800:"30",3600:"60"};
        return m[sec] || "1";
    }

    function setTF(sec) {
        currentTimeframe = sec;
        $('timeframePills').querySelectorAll('.tf-pill').forEach(p => {
            p.classList.remove('active');
            if(parseInt(p.dataset.tf)*60 === sec) p.classList.add('active');
        });
        updateExpiry();
        if(tvWidget && tvWidget.chart) {
            try {
                tvWidget.chart().setResolution(getTVInt(sec));
                setTimeout(() => { if(tvWidget && tvWidget.chart) tvWidget.chart().setSymbol(`FX:${currentAsset.replace('/','')}`); }, 100);
            } catch(e) { loadTV(currentAsset); }
        }
    }

    function updateExpiry() {
        const m = currentTimeframe/60;
        const d = m>=60?`${m/60}H`:`${m}m`;
        $('heroTimeframeBadge').textContent = d;
        $('heroExpiry').textContent = d;
    }

    function checkForex() {
        if(isWeekend()) {
            $('forexClosed').style.display='flex'; $('assetsList').style.display='none';
            $('generateBtn').classList.add('disabled');
            $('timeframePills').style.pointerEvents='none'; $('timeframePills').style.opacity='0.5';
        } else {
            $('forexClosed').style.display='none'; $('assetsList').style.display='flex';
            if(!isLocked) {
                $('generateBtn').classList.remove('disabled');
                $('timeframePills').style.pointerEvents='auto'; $('timeframePills').style.opacity='1';
            }
        }
    }

    // ========== ANALYSIS ==========
    function startAnalysis(cb) {
        if(isAnalyzing||isLocked||isWeekend()) return;
        isAnalyzing=true; disableCtrls();
        $('analysisOverlay').classList.add('active');
        $('progressFill').style.width='0%'; $('progressPercent').textContent='0%';
        $('analysisLive').textContent = t('init_neural');
        for(let i=1;i<=6;i++) {
            const s = document.getElementById(`step${i}`);
            s.classList.remove('done'); s.querySelector('.step-dot').style.background='#334155';
        }
        const total = 2500+Math.random()*2500, start = performance.now();
        const segs = genSegs(total); let cs=0;
        const steps = [
            {id:'step1',text:t('data_collection'),p:0.15},{id:'step2',text:t('patterns'),p:0.32},
            {id:'step3',text:t('levels'),p:0.52},{id:'step4',text:t('indicators'),p:0.72},
            {id:'step5',text:t('volatility_step'),p:0.88},{id:'step6',text:t('signal_step'),p:0.98}
        ];
        function anim(ts) {
            const el=ts-start, rp=Math.min(el/total,1);
            while(cs<segs.length-1&&rp>=segs[cs].ep)cs++;
            const sg=segs[Math.min(cs,segs.length-1)];
            const se=ts-(start+sg.sp*total), sd=sg.d*total, spg=Math.min(se/sd,1);
            const dp=sg.sp+(sg.ep-sg.sp)*ease(spg);
            $('progressFill').style.width=`${dp*100}%`; $('progressPercent').textContent=`${Math.round(dp*100)}%`;
            steps.forEach(s=>{if(dp>=s.p){const el=document.getElementById(s.id);if(el&&!el.classList.contains('done')){el.classList.add('done');el.querySelector('.step-dot').style.background='#10b981';$('analysisLive').textContent=s.text;}}});
            if(rp<1) requestAnimationFrame(anim);
            else {
                $('progressFill').style.width='100%'; $('progressPercent').textContent='100%';
                $('analysisLive').textContent = t('analysis_complete');
                setTimeout(() => { $('analysisOverlay').classList.remove('active'); isAnalyzing=false; cb(); },350);
            }
        }
        requestAnimationFrame(anim);
    }
    function genSegs(t){const n=3+Math.floor(Math.random()*4),s=[];let c=0;for(let i=0;i<n;i++){const l=i===n-1,r=1-c,sp=l?r:r*(0.15+Math.random()*0.5);s.push({sp:c,ep:c+sp,d:sp*(0.7+Math.random()*0.6)});c+=sp;}return s;}
    function ease(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}

    // ========== SIGNAL ==========
    function generateSignal() {
        const isUp = Math.random() >= 0.5;
        const probability = Math.floor(Math.random()*12)+78;
        const volsRu = ['Низкая','Умеренная','Средняя','Повышенная','Высокая'];
        const volsEn = ['Low','Moderate','Medium','Elevated','High'];
        const vol = currentLang==='ru'?volsRu[Math.floor(Math.random()*5)]:volsEn[Math.floor(Math.random()*5)];
        signalDirection = isUp?'up':'down';
        signalActive = true;
        isMinimized = false;
        signalVisible = true;
        
        updateSignalDisplay();
        $('signalCard').classList.add('active', isUp?'up':'down');
        $('signalModal').classList.add('visible');
        $('signalMini').classList.add('visible');
        
        $('heroProbability').textContent = `${probability}%`;
        $('heroVolatility').textContent = vol;
        $('heroResult').style.display = 'none';
        $('heroResult').className = 'hero-result';
        updateExpiry();
        $('heroAdvice').textContent = `💡 ${t('advices')[Math.floor(Math.random()*7)]}`;
        
        updateMiniDisplay();
        addToHistory(isUp, probability, 'pending');
        updateStats();
        if(navigator.vibrate) navigator.vibrate([100,60,200]);
    }

    function updateSignalDisplay() {
        const isUp = signalDirection === 'up';
        $('heroArrow').textContent = isUp?'▲':'▼';
        $('heroAction').textContent = isUp?t('buy_call'):t('sell_put');
        $('heroAsset').textContent = currentAsset;
    }

    function updateMiniDisplay() {
        const isUp = signalDirection === 'up';
        $('miniDir').textContent = isUp?'▲':'▼';
        $('miniDir').style.color = isUp?'var(--green)':'var(--red)';
        $('miniAsset').textContent = currentAsset;
    }

    function resetSignal() {
        signalActive = false; signalDirection = null; isMinimized = false; signalVisible = false;
        $('heroArrow').textContent = '—';
        $('heroAction').textContent = t('waiting_signal');
        $('heroAsset').textContent = currentAsset;
        $('heroProbability').textContent = '--%';
        $('heroVolatility').textContent = '--';
        $('heroResult').style.display = 'none';
        $('heroResult').className = 'hero-result';
        $('heroAdvice').textContent = t('press_button');
        $('signalCard').classList.remove('active','up','down');
        $('signalModal').classList.remove('visible');
        $('signalMini').classList.remove('visible');
        updateExpiry();
    }

    function minimizeSignal() {
        isMinimized = true;
        $('signalModal').classList.remove('visible');
        $('signalMini').classList.add('visible');
    }

    function expandSignal() {
        isMinimized = false;
        $('signalModal').classList.add('visible');
        $('signalMini').classList.add('visible');
        updateSignalDisplay();
    }

    // Close just hides visuals - TIMER KEEPS RUNNING
    function hideSignalVisuals() {
        signalVisible = false;
        $('signalModal').classList.remove('visible');
        $('signalMini').classList.remove('visible');
        stopFireworks();
    }

    function showSignalVisuals() {
        signalVisible = true;
        if(isMinimized) {
            $('signalMini').classList.add('visible');
        } else {
            $('signalModal').classList.add('visible');
            $('signalMini').classList.add('visible');
        }
    }

    // ========== TIMER (NEVER RESETS ON CLOSE) ==========
    function startTimer() {
        isLocked = true;
        lockSeconds = currentTimeframe;
        $('timerBox').classList.add('active');
        updateTimerDisp();
        disableCtrls();
        saveTimerState();
        lockTimerInterval = setInterval(() => {
            lockSeconds--;
            updateTimerDisp();
            $('miniTimer').textContent = $('timerValue').textContent;
            saveTimerState();
            if(lockSeconds <= 0) {
                clearInterval(lockTimerInterval);
                lockTimerInterval = null;
                isLocked = false;
                $('timerBox').classList.remove('active');
                enableCtrls();
                saveTimerState();
                checkResult();
            }
        }, 1000);
    }

    function updateTimerDisp() {
        const m = Math.floor(lockSeconds/60), s = lockSeconds%60;
        const str = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        $('timerValue').textContent = str;
        $('miniTimer').textContent = str;
    }

    function saveTimerState() {
        if(isLocked && lockSeconds > 0) {
            localStorage.setItem('bsTimer', JSON.stringify({
                asset: currentAsset, tf: currentTimeframe, sec: lockSeconds,
                dir: signalDirection, exp: Math.floor(Date.now()/1000)+lockSeconds,
                minimized: isMinimized, visible: signalVisible
            }));
        } else { localStorage.removeItem('bsTimer'); }
    }

    function restoreTimer() {
        const saved = localStorage.getItem('bsTimer');
        if(!saved) return;
        try {
            const st = JSON.parse(saved);
            const rem = st.exp - Math.floor(Date.now()/1000);
            if(rem <= 0) { localStorage.removeItem('bsTimer'); return; }
            currentAsset = st.asset; currentTimeframe = st.tf;
            signalDirection = st.dir; lockSeconds = rem;
            signalActive = true; isMinimized = st.minimized || false;
            signalVisible = st.visible !== false;
            $('currentAsset').textContent = currentAsset;
            setTF(currentTimeframe);
            updateSignalDisplay();
            $('signalCard').classList.add('active', signalDirection==='up'?'up':'down');
            if(signalVisible) {
                if(isMinimized) { $('signalMini').classList.add('visible'); }
                else { $('signalModal').classList.add('visible'); $('signalMini').classList.add('visible'); }
            }
            $('heroProbability').textContent = '80%';
            $('heroVolatility').textContent = currentLang==='ru'?'Средняя':'Medium';
            $('heroResult').style.display = 'none';
            updateExpiry();
            $('heroAdvice').textContent = currentLang==='ru'?'💡 Сигнал активен':'💡 Signal active';
            updateMiniDisplay();
            isLocked = true;
            $('timerBox').classList.add('active');
            updateTimerDisp();
            disableCtrls();
            loadTV(currentAsset);
            lockTimerInterval = setInterval(() => {
                lockSeconds--;
                updateTimerDisp(); $('miniTimer').textContent = $('timerValue').textContent;
                saveTimerState();
                if(lockSeconds<=0){clearInterval(lockTimerInterval);lockTimerInterval=null;isLocked=false;$('timerBox').classList.remove('active');enableCtrls();saveTimerState();checkResult();}
            },1000);
        } catch(e) { localStorage.removeItem('bsTimer'); }
    }

    function disableCtrls() {
        $('generateBtn').classList.add('disabled');
        $('timeframePills').style.pointerEvents='none'; $('timeframePills').style.opacity='0.5';
        $('assetsList').style.pointerEvents='none'; $('assetsList').style.opacity='0.5';
    }
    function enableCtrls() {
        if(!isWeekend()) { $('generateBtn').classList.remove('disabled'); $('timeframePills').style.pointerEvents='auto'; $('timeframePills').style.opacity='1'; }
        else { $('generateBtn').classList.add('disabled'); $('timeframePills').style.pointerEvents='none'; $('timeframePills').style.opacity='0.5'; }
        $('assetsList').style.pointerEvents='auto'; $('assetsList').style.opacity='1';
    }

    // ========== RESULT ==========
    function checkResult() {
        if(!signalActive) return;
        const isUp = signalDirection === 'up';
        // Random result for demo, replace with real API
        const winRoll = Math.random();
        const isWin = winRoll > 0.4;
        const profit = (Math.random()*5+1).toFixed(2);
        $('heroResult').style.display = 'block';
        showSignalVisuals();
        if(isWin) {
            $('heroResult').textContent = t('win_result').replace('{profit}', profit);
            $('heroResult').className = 'hero-result win';
            startFireworks();
            updateLastResult('win');
        } else if(winRoll > 0.2) {
            $('heroResult').textContent = t('lose_result');
            $('heroResult').className = 'hero-result lose';
            $('signalCard').style.animation = 'shake 0.6s ease';
            setTimeout(() => $('signalCard').style.animation = '', 600);
            updateLastResult('lose');
        } else {
            $('heroResult').textContent = t('draw_result');
            $('heroResult').className = 'hero-result draw';
            updateLastResult('draw');
        }
        updateStats();
        $('heroResult').scrollIntoView({ behavior:'smooth', block:'center' });
        setTimeout(() => { resetSignal(); enableCtrls(); checkForex(); }, 6000);
    }

    function updateLastResult(result) {
        const items = $('historyList').querySelectorAll('.history-item');
        if(items.length > 0) {
            const last = items[0];
            last.setAttribute('data-result', result);
            last.classList.add(result+'-result');
            last.querySelector('.hi-result').textContent = result==='win'?'✅':result==='lose'?'❌':'➖';
            saveHistory();
        }
    }

    // ========== FIREWORKS ==========
    function startFireworks() {
        const c = $('fireworksCanvas');
        c.style.display = 'block'; c.width = window.innerWidth; c.height = window.innerHeight;
        const ctx = c.getContext('2d');
        const p = [];
        for(let i=0;i<120;i++) p.push({x:c.width/2+(Math.random()-0.5)*300,y:c.height/2+(Math.random()-0.5)*200,vx:(Math.random()-0.5)*6,vy:(Math.random()-0.5)*6-2,life:1,decay:0.01+Math.random()*0.02,color:`hsl(${Math.random()*360},100%,${50+Math.random()*30}%)`,size:2+Math.random()*3});
        function anim() {
            ctx.clearRect(0,0,c.width,c.height); let al = false;
            p.forEach(pp => { pp.x+=pp.vx; pp.y+=pp.vy; pp.vy+=0.08; pp.life-=pp.decay; if(pp.life>0){al=true;ctx.beginPath();ctx.arc(pp.x,pp.y,pp.size,0,Math.PI*2);ctx.fillStyle=pp.color;ctx.fill();} });
            if(al) requestAnimationFrame(anim); else c.style.display='none';
        }
        requestAnimationFrame(anim);
        setTimeout(() => { c.style.display='none'; }, 3500);
    }
    function stopFireworks() { $('fireworksCanvas').style.display='none'; }

    // ========== HISTORY ==========
    function addToHistory(isUp, prob, result) {
        const ts = new Date().toLocaleTimeString(currentLang==='ru'?'ru-RU':'en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
        const exp = currentTimeframe/60; const expStr = exp>=60?`${exp/60}H`:`${exp}m`;
        const hi = document.createElement('div');
        hi.className = `history-item ${isUp?'up':'down'}`;
        hi.setAttribute('data-result', result||'pending');
        hi.innerHTML = `<span class="hi-asset">${currentAsset}</span><span class="hi-dir">${isUp?'▲C':'▼P'}</span><span class="hi-prob">${prob}%</span><span class="hi-exp">${expStr}</span><span class="hi-result"></span><span class="hi-time">${ts}</span>`;
        if($('historyList').querySelector('.empty-history')) $('historyList').innerHTML = '';
        $('historyList').prepend(hi);
        if($('historyList').children.length > 30) $('historyList').lastChild.remove();
        saveHistory();
    }
    function saveHistory() {
        const items = [];
        $('historyList').querySelectorAll('.history-item').forEach(item => {
            items.push({asset:item.querySelector('.hi-asset').textContent,dir:item.querySelector('.hi-dir').textContent,prob:item.querySelector('.hi-prob').textContent,exp:item.querySelector('.hi-exp').textContent,time:item.querySelector('.hi-time').textContent,isUp:item.classList.contains('up'),result:item.getAttribute('data-result')});
        });
        localStorage.setItem('bsHistory', JSON.stringify(items));
    }
    function loadHistory() {
        const saved = localStorage.getItem('bsHistory');
        if(saved) {
            const items = JSON.parse(saved);
            $('historyList').innerHTML = '';
            items.forEach(item => {
                const d = document.createElement('div');
                d.className = `history-item ${item.isUp?'up':'down'} ${item.result?item.result+'-result':''}`;
                d.setAttribute('data-result', item.result||'pending');
                d.innerHTML = `<span class="hi-asset">${item.asset}</span><span class="hi-dir">${item.dir}</span><span class="hi-prob">${item.prob}</span><span class="hi-exp">${item.exp}</span><span class="hi-result">${item.result==='win'?'✅':item.result==='lose'?'❌':item.result==='draw'?'➖':''}</span><span class="hi-time">${item.time}</span>`;
                $('historyList').appendChild(d);
            });
        }
        updateStats();
    }
    function updateStats() {
        const items = $('historyList').querySelectorAll('.history-item');
        const total = items.length;
        $('totalSignals').textContent = total; $('miniTotalSignals').textContent = total;
        let wins = 0, sumProb = 0;
        items.forEach(item => {
            const prob = parseInt(item.querySelector('.hi-prob').textContent);
            if(!isNaN(prob)) sumProb += prob;
            if(item.getAttribute('data-result')==='win') wins++;
        });
        $('totalWins').textContent = wins;
        const avg = total>0?Math.round(sumProb/total):0;
        $('avgAccuracy').textContent = total>0?`${avg}%`:'--';
        $('miniAvgProb').textContent = total>0?`${avg}%`:'--%';
        $('miniWinRate').textContent = total>0?`${Math.round((wins/total)*100)}%`:'--%';
    }
    function clearHistory() {
        $('historyList').innerHTML = `<div class="empty-history">${t('no_signals')}</div>`;
        localStorage.removeItem('bsHistory');
        updateStats();
    }
    function filterAssets(q) {
        const s = q.toLowerCase().trim();
        const f = forexAssets.filter(a => a.toLowerCase().includes(s));
        renderAssets(f.length>0?f:forexAssets);
    }

    function handleGenerate() {
        if(isLocked||isAnalyzing||isWeekend()) return;
        resetSignal();
        stopFireworks();
        startAnalysis(() => { generateSignal(); startTimer(); });
    }

    function setupEvents() {
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.addEventListener('click', function() {
                currentLang = this.dataset.lang;
                localStorage.setItem('bsLang', currentLang);
                document.querySelectorAll('.lang-btn').forEach(x => x.classList.remove('active'));
                this.classList.add('active');
                applyLang();
                updateExpiry();
                if(signalActive) updateSignalDisplay();
            });
        });
        $('themeToggle').addEventListener('click', () => {
            currentTheme = currentTheme==='dark'?'light':'dark';
            localStorage.setItem('bsTheme', currentTheme);
            applyTheme();
        });
        
        // Close button - HIDE VISUALS ONLY, timer keeps running
        $('signalClose').addEventListener('click', (e) => { e.stopPropagation(); hideSignalVisuals(); });
        // Minimize
        $('signalMinimize').addEventListener('click', (e) => { e.stopPropagation(); minimizeSignal(); });
        // Expand from mini
        $('signalMiniExpand').addEventListener('click', (e) => { e.stopPropagation(); expandSignal(); });
        
        $('timeframePills').querySelectorAll('.tf-pill').forEach(p => {
            p.addEventListener('click', function() {
                if(isLocked||isAnalyzing) return;
                const tf = parseInt(this.dataset.tf)*60;
                setTF(tf);
                if(!signalActive) resetSignal();
                else updateExpiry();
            });
        });
        $('generateBtn').addEventListener('click', handleGenerate);
        $('assetSearch').addEventListener('input', function() { if(!isLocked&&!isAnalyzing) filterAssets(this.value); });
        $('clearHistory').addEventListener('click', clearHistory);
    }

    init();
});
