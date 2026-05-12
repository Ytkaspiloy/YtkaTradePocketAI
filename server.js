// Сохраните как server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Статические файлы
app.use(express.static(__dirname));

// Прокси для REST API PocketOption
app.use('/api', createProxyMiddleware({
    target: 'https://api.pocketoption.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '' }
}));

// WebSocket прокси
const wss = new WebSocket.Server({ server });

wss.on('connection', (clientWs, req) => {
    console.log('Client connected');
    
    const pocketWs = new WebSocket('wss://demo-api-eu.pocketoption.com/ws');
    
    pocketWs.on('open', () => {
        console.log('Connected to PocketOption');
        clientWs.send(JSON.stringify({ type: 'proxy_connected' }));
    });
    
    pocketWs.on('message', (data) => {
        clientWs.send(data.toString());
    });
    
    clientWs.on('message', (data) => {
        if (pocketWs.readyState === WebSocket.OPEN) {
            pocketWs.send(data.toString());
        }
    });
    
    pocketWs.on('close', () => {
        clientWs.close();
    });
    
    clientWs.on('close', () => {
        pocketWs.close();
    });
    
    pocketWs.on('error', (err) => {
        console.error('PocketOption error:', err.message);
        clientWs.send(JSON.stringify({ type: 'error', message: err.message }));
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`WebSocket proxy ready at ws://localhost:${PORT}`);
});
