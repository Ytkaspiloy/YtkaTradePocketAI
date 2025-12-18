class TradingBot {
    constructor() {
        this.currentPair = 'EUR/USD';
        this.currentTimeframe = 30;
        this.isGenerating = false;
        this.activeTrade = null;
        this.tradeHistory = [];
        this.chartData = [];
        this.chartType = 'candle';
        this.livePrices = {};
        this.indicators = {
            rsi: 50,
            macd: { value: 0, signal: 0 },
            volume: 0,
            support: [],
            resistance: [],
            fibLevels: []
        };
        
        this.pairs = [
            'EUR/JPY', 'CHF/JPY', 'AUD/CAD', 'USD/CAD', 'USD/CHF',
            'GBP/AUD', 'USD/JPY', 'EUR/USD', 'EUR/AUD', 'AUD/USD',
            'CAD/JPY', 'AUD/JPY', 'EUR/GBP', 'GBP/JPY', 'GBP/CHF',
            'EUR/CAD', 'CAD/CHF', 'AUD/CHF'
        ];
        
        this.initialize();
    }

    initialize() {
        this.bindEvents();
        this.startLiveData();
        this.initializeChart();
        this.loadHistory();
        this.updateUI();
    }

    bindEvents() {
        // Generate Signal Button
        document.getElementById('generate-btn').addEventListener('click', () => this.generateSignal());
        
        // Auto Trade Button
        document.getElementById('auto-trade').addEventListener('click', () => this.toggleAutoTrade());
        
        // Pair Selector
        document.getElementById('currency-pair').addEventListener('change', (e) => {
            this.currentPair = e.target.value;
            this.updateChart();
        });
        
        // Timeframe Selector
        document.getElementById('timeframe').addEventListener('change', (e) => {
            this.currentTimeframe = parseInt(e.target.value);
        });
        
        // Investment Slider
        document.getElementById('amount').addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById('amount-value').textContent = `$${value}`;
            const profit = Math.round(value * 0.85);
            document.getElementById('potential-profit').textContent = `+$${profit}`;
        });
        
        // Chart Type Controls
        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
                e.target.closest('.chart-btn').classList.add('active');
                this.chartType = e.target.closest('.chart-btn').dataset.type;
                this.updateChart();
            });
        });
    }

    startLiveData() {
        // Update server time
        setInterval(() => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
            document.getElementById('server-time').querySelector('span').textContent = timeStr;
        }, 1000);

        // Simulate live price updates
        setInterval(() => this.updateLivePrices(), 1000);
    }

    updateLivePrices() {
        const priceChanges = {};
        
        this.pairs.forEach(pair => {
            const basePrice = this.getPairBasePrice(pair);
            const change = (Math.random() - 0.5) * 0.001;
            const newPrice = basePrice * (1 + change);
            
            priceChanges[pair] = {
                price: newPrice.toFixed(5),
                change: change > 0 ? '+' + (change * 10000).toFixed(2) : (change * 10000).toFixed(2)
            };
        });

        this.livePrices = priceChanges;
        
        // Update current pair display
        if (priceChanges[this.currentPair]) {
            const price = priceChanges[this.currentPair];
            const isPositive = parseFloat(price.change) > 0;
            const colorClass = isPositive ? 'green' : 'red';
            
            document.getElementById('live-price').innerHTML = `
                <i class="fas fa-chart-line"></i>
                <span>${this.currentPair}: <strong>${price.price}</strong></span>
                <span class="${colorClass}">${price.change}pips</span>
            `;
        }
    }

    getPairBasePrice(pair) {
        // Base prices for common pairs
        const basePrices = {
            'EUR/USD': 1.0850,
            'GBP/USD': 1.2650,
            'USD/JPY': 148.50,
            'USD/CHF': 0.8800,
            'AUD/USD': 0.6550,
            'USD/CAD': 1.3550,
            'EUR/JPY': 160.80,
            'GBP/JPY': 187.50,
            'EUR/GBP': 0.8570,
            'AUD/JPY': 97.20,
            'CAD/JPY': 109.50,
            'CHF/JPY': 168.80,
            'EUR/AUD': 1.6550,
            'GBP/AUD': 1.9300,
            'EUR/CAD': 1.4700,
            'AUD/CAD': 0.8880,
            'GBP/CHF': 1.1280,
            'CAD/CHF': 0.6500,
            'AUD/CHF': 0.5750
        };
        
        return basePrices[pair] || 1.0000;
    }

    async generateSignal() {
        if (this.isGenerating || this.activeTrade) return;
        
        this.isGenerating = true;
        const btn = document.getElementById('generate-btn');
        const originalText = btn.innerHTML;
        
        // Show analyzing state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Market...';
        btn.disabled = true;
        
        // Generate chart data
        await this.generateChartData();
        
        // Analyze market
        await this.analyzeMarket();
        
        // Generate signal
        const signal = this.createSignal();
        
        // Display signal
        this.displaySignal(signal);
        
        // Start trade
        this.startTrade(signal);
        
        // Reset button
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            this.isGenerating = false;
        }, 2000);
    }

    async generateChartData() {
        // Generate realistic OHLC data for 150 candles
        const data = [];
        let price = this.getPairBasePrice(this.currentPair);
        
        for (let i = 0; i < 150; i++) {
            const open = price;
            const change = (Math.random() - 0.5) * 0.002;
            const close = open * (1 + change);
            const high = Math.max(open, close) * (1 + Math.random() * 0.001);
            const low = Math.min(open, close) * (1 - Math.random() * 0.001);
            const volume = Math.random() * 1000 + 500;
            
            data.unshift({
                time: new Date(Date.now() - i * this.currentTimeframe * 1000),
                open,
                high,
                low,
                close,
                volume
            });
            
            price = close;
        }
        
        this.chartData = data;
        
        // Calculate indicators
        this.calculateIndicators();
    }

    calculateIndicators() {
        // Calculate RSI
        const closes = this.chartData.map(d => d.close);
        this.indicators.rsi = this.calculateRSI(closes);
        
        // Calculate MACD
        const macdData = this.calculateMACD(closes);
        this.indicators.macd = macdData;
        
        // Calculate support and resistance
        this.identifySupportResistance();
        
        // Calculate Fibonacci levels
        this.calculateFibonacciLevels();
    }

    calculateRSI(prices, period = 14) {
        let gains = 0;
        let losses = 0;
        
        for (let i = 1; i <= period; i++) {
            const change = prices[i] - prices[i - 1];
            if (change > 0) gains += change;
            else losses -= change;
        }
        
        const avgGain = gains / period;
        const avgLoss = losses / period;
        
        if (avgLoss === 0) return 100;
        
        const rs = avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    }

    calculateMACD(prices) {
        const ema12 = this.calculateEMA(prices, 12);
        const ema26 = this.calculateEMA(prices, 26);
        const macdLine = ema12 - ema26;
        const signalLine = this.calculateEMA([macdLine], 9);
        
        return {
            value: macdLine,
            signal: signalLine,
            histogram: macdLine - signalLine
        };
    }

    calculateEMA(prices, period) {
        const multiplier = 2 / (period + 1);
        let ema = prices[0];
        
        for (let i = 1; i < prices.length; i++) {
            ema = (prices[i] - ema) * multiplier + ema;
        }
        
        return ema;
    }

    identifySupportResistance() {
        const prices = this.chartData.map(d => d.close);
        const windowSize = 10;
        
        this.indicators.support = [];
        this.indicators.resistance = [];
        
        for (let i = windowSize; i < prices.length - windowSize; i++) {
            const window = prices.slice(i - windowSize, i + windowSize);
            const current = prices[i];
            
            if (current === Math.min(...window)) {
                this.indicators.support.push({
                    price: current,
                    index: i
                });
            }
            
            if (current === Math.max(...window)) {
                this.indicators.resistance.push({
                    price: current,
                    index: i
                });
            }
        }
    }

    calculateFibonacciLevels() {
        const highs = this.chartData.map(d => d.high);
        const lows = this.chartData.map(d => d.low);
        
        const highestHigh = Math.max(...highs);
        const lowestLow = Math.min(...lows);
        const range = highestHigh - lowestLow;
        
        this.indicators.fibLevels = [
            { level: 0, price: lowestLow },
            { level: 0.236, price: lowestLow + range * 0.236 },
            { level: 0.382, price: lowestLow + range * 0.382 },
            { level: 0.5, price: lowestLow + range * 0.5 },
            { level: 0.618, price: lowestLow + range * 0.618 },
            { level: 0.786, price: lowestLow + range * 0.786 },
            { level: 1, price: highestHigh }
        ];
    }

    analyzeMarket() {
        // Analyze current market conditions
        const currentPrice = this.chartData[0].close;
        const trend = this.determineTrend();
        const momentum = this.analyzeMomentum();
        const volatility = this.calculateVolatility();
        
        return {
            trend,
            momentum,
            volatility,
            currentPrice,
            timestamp: new Date()
        };
    }

    determineTrend() {
        const closes = this.chartData.map(d => d.close);
        const sma20 = this.calculateSMA(closes, 20);
        const sma50 = this.calculateSMA(closes, 50);
        
        return sma20 > sma50 ? 'bullish' : 'bearish';
    }

    analyzeMomentum() {
        const rsi = this.indicators.rsi;
        const macd = this.indicators.macd.value;
        const macdSignal = this.indicators.macd.signal;
        
        let score = 0;
        
        if (rsi > 70) score -= 2;
        else if (rsi < 30) score += 2;
        
        if (macd > macdSignal) score += 1;
        else score -= 1;
        
        return score;
    }

    calculateVolatility() {
        const highs = this.chartData.slice(0, 20).map(d => d.high);
        const lows = this.chartData.slice(0, 20).map(d => d.low);
        const atr = this.calculateATR(highs, lows);
        
        return atr / this.chartData[0].close;
    }

    calculateSMA(prices, period) {
        const sum = prices.slice(0, period).reduce((a, b) => a + b, 0);
        return sum / period;
    }

    calculateATR(highs, lows, period = 14) {
        const tr = highs.map((high, i) => Math.max(
            high - lows[i],
            Math.abs(high - (lows[i-1] || lows[i])),
            Math.abs(lows[i] - (highs[i-1] || highs[i]))
        ));
        
        return this.calculateSMA(tr, period);
    }

    createSignal() {
        const analysis = this.analyzeMarket();
        const direction = this.determineSignalDirection(analysis);
        const confidence = this.calculateConfidence(analysis);
        const expiry = this.currentTimeframe;
        
        return {
            pair: this.currentPair,
            direction,
            expiry,
            confidence,
            timestamp: new Date(),
            entryPrice: this.chartData[0].close,
            analysis: analysis,
            indicators: { ...this.indicators }
        };
    }

    determineSignalDirection(analysis) {
        const rsi = this.indicators.rsi;
        const macd = this.indicators.macd;
        const trend = analysis.trend;
        
        // Simple decision logic based on indicators
        if (rsi < 30 && macd.value > macd.signal && trend === 'bullish') {
            return 'BUY';
        } else if (rsi > 70 && macd.value < macd.signal && trend === 'bearish') {
            return 'SELL';
        }
        
        // Fallback random decision (in real app this would be more sophisticated)
        return Math.random() > 0.5 ? 'BUY' : 'SELL';
    }

    calculateConfidence(analysis) {
        let confidence = 50;
        
        // RSI confidence
        const rsi = this.indicators.rsi;
        if (rsi < 20 || rsi > 80) confidence += 20;
        else if (rsi < 30 || rsi > 70) confidence += 10;
        
        // MACD confidence
        const macd = this.indicators.macd;
        if (macd.value > macd.signal && macd.histogram > 0) confidence += 15;
        else if (macd.value < macd.signal && macd.histogram < 0) confidence += 15;
        
        // Trend alignment
        const signal = this.determineSignalDirection(analysis);
        if ((signal === 'BUY' && analysis.trend === 'bullish') ||
            (signal === 'SELL' && analysis.trend === 'bearish')) {
            confidence += 15;
        }
        
        // Volatility adjustment
        if (analysis.volatility < 0.001) confidence -= 10;
        else if (analysis.volatility > 0.005) confidence += 10;
        
        return Math.min(Math.max(confidence, 10), 95);
    }

    displaySignal(signal) {
        // Show signal details section
        document.getElementById('signal-details').style.display = 'block';
        
        // Update signal information
        document.getElementById('signal-pair').textContent = signal.pair;
        
        const directionEl = document.getElementById('signal-direction');
        directionEl.className = `signal-direction ${signal.direction.toLowerCase()}`;
        directionEl.innerHTML = `
            <span class="direction-icon">
                <i class="fas fa-arrow-${signal.direction === 'BUY' ? 'up' : 'down'}"></i>
            </span>
            <span>${signal.direction}</span>
        `;
        
        document.getElementById('signal-timeframe').textContent = 
            `${signal.expiry} second${signal.expiry !== 1 ? 's' : ''}`;
        
        // Update indicators
        document.getElementById('signal-rsi').textContent = this.indicators.rsi.toFixed(1);
        document.getElementById('signal-macd').textContent = 
            this.indicators.macd.value > this.indicators.macd.signal ? 'Bullish' : 'Bearish';
        
        // Update confidence
        const confidenceFill = document.querySelector('.confidence-fill');
        confidenceFill.style.width = `${signal.confidence}%`;
        document.querySelector('.confidence-value').textContent = `${signal.confidence}%`;
        
        // Update current signal info
        document.getElementById('info-pair').textContent = signal.pair;
        document.getElementById('info-direction').textContent = signal.direction;
        document.getElementById('info-direction').className = signal.direction.toLowerCase();
        
        // Start countdown timer
        this.startSignalTimer(signal.expiry);
    }

    startSignalTimer(seconds) {
        let timeLeft = seconds;
        const timerElement = document.getElementById('signal-timer').querySelector('span');
        const progressFill = document.querySelector('.progress-fill');
        const progressTime = document.getElementById('progress-time');
        
        // Reset progress bar
        progressFill.style.width = '0%';
        progressFill.style.transition = `width ${seconds}s linear`;
        
        // Start countdown
        const timer = setInterval(() => {
            timeLeft--;
            
            // Update timer display
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            timerElement.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            progressTime.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            
            // Update progress bar
            const progress = ((seconds - timeLeft) / seconds) * 100;
            progressFill.style.width = `${progress}%`;
            
            // Check if timer finished
            if (timeLeft <= 0) {
                clearInterval(timer);
                timerElement.textContent = 'Expired';
                this.finishTrade();
            }
        }, 1000);
        
        // Set initial state
        timerElement.textContent = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
        progressTime.textContent = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
        
        // Trigger CSS transition
        setTimeout(() => {
            progressFill.style.width = '100%';
        }, 50);
    }

    startTrade(signal) {
        this.activeTrade = {
            ...signal,
            startTime: new Date(),
            endTime: new Date(Date.now() + signal.expiry * 1000),
            status: 'active'
        };
        
        // Disable generate button during trade
        document.getElementById('generate-btn').disabled = true;
        document.getElementById('auto-trade').disabled = true;
    }

    finishTrade() {
        if (!this.activeTrade) return;
        
        // Simulate price movement
        const priceChange = (Math.random() - 0.45) * 0.01; // Slight bias toward winning
        const endPrice = this.activeTrade.entryPrice * (1 + priceChange);
        
        // Determine trade result
        let result, profit;
        const investment = parseInt(document.getElementById('amount').value);
        
        if (this.activeTrade.direction === 'BUY') {
            if (endPrice > this.activeTrade.entryPrice) {
                result = 'win';
                profit = Math.round(investment * 0.85);
            } else if (endPrice < this.activeTrade.entryPrice) {
                result = 'loss';
                profit = -investment;
            } else {
                result = 'return';
                profit = 0;
            }
        } else { // SELL
            if (endPrice < this.activeTrade.entryPrice) {
                result = 'win';
                profit = Math.round(investment * 0.85);
            } else if (endPrice > this.activeTrade.entryPrice) {
                result = 'loss';
                profit = -investment;
            } else {
                result = 'return';
                profit = 0;
            }
        }
        
        // Complete trade
        this.activeTrade.endPrice = endPrice;
        this.activeTrade.result = result;
        this.activeTrade.profit = profit;
        this.activeTrade.status = 'completed';
        
        // Add to history
        this.addToHistory(this.activeTrade);
        
        // Show result
        this.showTradeResult(result, profit, endPrice);
        
        // Enable buttons
        setTimeout(() => {
            document.getElementById('generate-btn').disabled = false;
            document.getElementById('auto-trade').disabled = false;
            this.activeTrade = null;
        }, 3000);
    }

    showTradeResult(result, profit, endPrice) {
        const resultDisplay = document.getElementById('signal-result-display');
        const profitClass = profit > 0 ? 'profit-positive' : profit < 0 ? 'profit-negative' : 'profit-neutral';
        const resultIcon = profit > 0 ? 'fa-check-circle' : profit < 0 ? 'fa-times-circle' : 'fa-exchange-alt';
        const resultColor = profit > 0 ? 'green' : profit < 0 ? 'red' : 'orange';
        
        resultDisplay.innerHTML = `
            <div class="trade-result" style="text-align: center; padding: 20px;">
                <div style="font-size: 48px; color: var(--accent-${resultColor}); margin-bottom: 15px;">
                    <i class="fas ${resultIcon}"></i>
                </div>
                <h3 style="margin-bottom: 10px; color: var(--text-primary);">
                    Trade ${result === 'win' ? 'WON' : result === 'loss' ? 'LOST' : 'RETURNED'}
                </h3>
                <div style="font-size: 24px; font-weight: 700; margin-bottom: 10px;" class="${profitClass}">
                    ${profit > 0 ? '+' : ''}$${profit}
                </div>
                <div style="color: var(--text-secondary); font-size: 14px; margin-bottom: 5px;">
                    Entry: ${this.activeTrade.entryPrice.toFixed(5)}
                </div>
                <div style="color: var(--text-secondary); font-size: 14px;">
                    Exit: ${endPrice.toFixed(5)}
                </div>
                <div style="margin-top: 20px;">
                    <button class="btn btn-primary" onclick="tradingBot.generateSignal()">
                        <i class="fas fa-redo"></i> New Trade
                    </button>
                </div>
            </div>
        `;
    }

    addToHistory(trade) {
        const historyEntry = {
            time: trade.timestamp.toLocaleTimeString(),
            pair: trade.pair,
            direction: trade.direction,
            expiry: `${trade.expiry}s`,
            result: trade.result,
            profit: trade.profit
        };
        
        this.tradeHistory.unshift(historyEntry);
        if (this.tradeHistory.length > 20) {
            this.tradeHistory.pop();
        }
        
        this.updateHistoryTable();
    }

    updateHistoryTable() {
        const tbody = document.querySelector('#trade-history tbody');
        tbody.innerHTML = '';
        
        this.tradeHistory.forEach(trade => {
            const row = document.createElement('tr');
            
            const profitClass = trade.profit > 0 ? 'profit-positive' : 
                               trade.profit < 0 ? 'profit-negative' : 'profit-neutral';
            
            row.innerHTML = `
                <td>${trade.time}</td>
                <td>${trade.pair}</td>
                <td><span class="${trade.direction.toLowerCase()}">${trade.direction}</span></td>
                <td>${trade.expiry}</td>
                <td><span class="${trade.result}">${trade.result.toUpperCase()}</span></td>
                <td class="${profitClass}">${trade.profit > 0 ? '+' : ''}$${trade.profit}</td>
            `;
            
            tbody.appendChild(row);
        });
    }

    loadHistory() {
        // Load sample history
        const sampleHistory = [
            { time: '14:30:22', pair: 'EUR/USD', direction: 'BUY', expiry: '30s', result: 'win', profit: 85 },
            { time: '14:25:15', pair: 'GBP/JPY', direction: 'SELL', expiry: '15s', result: 'win', profit: 85 },
            { time: '14:20:08', pair: 'USD/CAD', direction: 'BUY', expiry: '60s', result: 'loss', profit: -100 },
            { time: '14:15:42', pair: 'AUD/JPY', direction: 'SELL', expiry: '10s', result: 'win', profit: 85 },
            { time: '14:10:55', pair: 'EUR/GBP', direction: 'BUY', expiry: '5s', result: 'return', profit: 0 }
        ];
        
        this.tradeHistory = sampleHistory;
        this.updateHistoryTable();
    }

    initializeChart() {
        const svg = d3.select('#trading-chart')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', 'trading-chart-svg');
        
        // Store SVG reference
        this.chartSvg = svg;
        
        // Initial chart update
        this.updateChart();
    }

    updateChart() {
        if (!this.chartSvg || this.chartData.length === 0) return;
        
        const width = this.chartSvg.node().getBoundingClientRect().width;
        const height = this.chartSvg.node().getBoundingClientRect().height;
        const margin = { top: 40, right: 40, bottom: 60, left: 60 };
        
        // Clear previous chart
        this.chartSvg.selectAll('*').remove();
        
        // Create scales
        const x = d3.scaleTime()
            .domain(d3.extent(this.chartData, d => d.time))
            .range([margin.left, width - margin.right]);
        
        const y = d3.scaleLinear()
            .domain([
                d3.min(this.chartData, d => d.low) * 0.999,
                d3.max(this.chartData, d => d.high) * 1.001
            ])
            .range([height - margin.bottom, margin.top]);
        
        // Add grid
        this.chartSvg.append('g')
            .attr('class', 'chart-grid')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSize(-height + margin.top + margin.bottom).tickFormat(''));
        
        this.chartSvg.append('g')
            .attr('class', 'chart-grid')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right).tickFormat(''));
        
        // Draw candlesticks
        const candles = this.chartSvg.selectAll('.candle')
            .data(this.chartData)
            .enter()
            .append('g')
            .attr('class', d => d.close >= d.open ? 'candle-up' : 'candle-down');
        
        // Draw candle wicks
        candles.append('line')
            .attr('x1', d => x(d.time))
            .attr('x2', d => x(d.time))
            .attr('y1', d => y(d.high))
            .attr('y2', d => y(d.low))
            .attr('stroke-width', 1);
        
        // Draw candle bodies
        const candleWidth = Math.max(1, (width - margin.left - margin.right) / this.chartData.length * 0.6);
        
        candles.append('rect')
            .attr('x', d => x(d.time) - candleWidth/2)
            .attr('y', d => y(Math.max(d.open, d.close)))
            .attr('width', candleWidth)
            .attr('height', d => Math.abs(y(d.open) - y(d.close)) || 1);
        
        // Draw support levels
        this.indicators.support.forEach(level => {
            this.chartSvg.append('line')
                .attr('class', 'support-line')
                .attr('x1', margin.left)
                .attr('x2', width - margin.right)
                .attr('y1', y(level.price))
                .attr('y2', y(level.price));
            
            this.chartSvg.append('text')
                .attr('class', 'chart-label')
                .attr('x', width - margin.right - 40)
                .attr('y', y(level.price) - 5)
                .text(`Support: ${level.price.toFixed(5)}`);
        });
        
        // Draw resistance levels
        this.indicators.resistance.forEach(level => {
            this.chartSvg.append('line')
                .attr('class', 'resistance-line')
                .attr('x1', margin.left)
                .attr('x2', width - margin.right)
                .attr('y1', y(level.price))
                .attr('y2', y(level.price));
            
            this.chartSvg.append('text')
                .attr('class', 'chart-label')
                .attr('x', width - margin.right - 50)
                .attr('y', y(level.price) - 5)
                .text(`Resistance: ${level.price.toFixed(5)}`);
        });
        
        // Draw Fibonacci levels
        this.indicators.fibLevels.forEach(level => {
            this.chartSvg.append('line')
                .attr('class', 'fib-level')
                .attr('x1', margin.left)
                .attr('x2', width - margin.right)
                .attr('y1', y(level.price))
                .attr('y2', y(level.price));
            
            this.chartSvg.append('text')
                .attr('class', 'chart-label')
                .attr('x', margin.left + 5)
                .attr('y', y(level.price) - 5)
                .text(`Fib ${(level.level * 100)}%: ${level.price.toFixed(5)}`);
        });
        
        // Draw order blocks (simplified - highlight recent consolidation areas)
        const recentData = this.chartData.slice(0, 20);
        const recentHighs = recentData.map(d => d.high);
        const recentLows = recentData.map(d => d.low);
        const consolidationHigh = Math.min(...recentHighs);
        const consolidationLow = Math.max(...recentLows);
        
        if (consolidationHigh > consolidationLow) {
            // Bullish order block (green)
            this.chartSvg.append('rect')
                .attr('class', 'order-block-bull')
                .attr('x', margin.left)
                .attr('y', y(consolidationHigh))
                .attr('width', width - margin.left - margin.right)
                .attr('height', y(consolidationLow) - y(consolidationHigh))
                .attr('opacity', 0.3);
            
            // Bearish order block (red) - recent high area
            const bearishStart = y(consolidationHigh) - 20;
            const bearishHeight = 20;
            
            this.chartSvg.append('rect')
                .attr('class', 'order-block-bear')
                .attr('x', margin.left)
                .attr('y', bearishStart)
                .attr('width', width - margin.left - margin.right)
                .attr('height', bearishHeight)
                .attr('opacity', 0.3);
        }
        
        // Add axes
        this.chartSvg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));
        
        this.chartSvg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));
        
        // Add labels
        this.chartSvg.append('text')
            .attr('class', 'chart-label')
            .attr('x', width / 2)
            .attr('y', height - 10)
            .attr('text-anchor', 'middle')
            .text('Time');
        
        this.chartSvg.append('text')
            .attr('class', 'chart-label')
            .attr('transform', 'rotate(-90)')
            .attr('x', -height / 2)
            .attr('y', 15)
            .attr('text-anchor', 'middle')
            .text('Price');
        
        // Update live indicators
        document.getElementById('live-rsi').textContent = this.indicators.rsi.toFixed(1);
        document.getElementById('live-macd').textContent = 
            this.indicators.macd.value > this.indicators.macd.signal ? 'Bullish' : 'Bearish';
        document.getElementById('live-volume').textContent = 
            Math.round(this.chartData[0].volume).toLocaleString();
    }

    toggleAutoTrade() {
        const btn = document.getElementById('auto-trade');
        const icon = btn.querySelector('i');
        
        if (btn.classList.contains('active')) {
            // Stop auto trading
            btn.classList.remove('active');
            icon.className = 'fas fa-play-circle';
            btn.querySelector('span').textContent = 'Auto Trade (5s)';
            
            if (this.autoTradeInterval) {
                clearInterval(this.autoTradeInterval);
                this.autoTradeInterval = null;
            }
        } else {
            // Start auto trading
            btn.classList.add('active');
            icon.className = 'fas fa-stop-circle';
            btn.querySelector('span').textContent = 'Stop Auto Trade';
            
            this.autoTradeInterval = setInterval(() => {
                if (!this.isGenerating && !this.activeTrade) {
                    this.generateSignal();
                }
            }, 5000); // Every 5 seconds
        }
    }

    updateUI() {
        // Initial updates
        this.updateLivePrices();
        this.generateChartData().then(() => this.updateChart());
    }
}

// Initialize trading bot when page loads
let tradingBot;

document.addEventListener('DOMContentLoaded', () => {
    tradingBot = new TradingBot();
});
