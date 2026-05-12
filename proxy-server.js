const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (clientWs) => {
    console.log('Client connected');
    
    let pocketWs = null;
    
    clientWs.on('message', (message) => {
        const data = JSON.parse(message);
        
        if (data.action === 'connect') {
            pocketWs = new WebSocket(data.url);
            
            pocketWs.on('open', () => {
                clientWs.send(JSON.stringify({ type: 'connected' }));
            });
            
            pocketWs.on('message', (msg) => {
                clientWs.send(msg.toString());
            });
            
            pocketWs.on('close', () => {
                clientWs.send(JSON.stringify({ type: 'disconnected' }));
            });
            
            pocketWs.on('error', (err) => {
                clientWs.send(JSON.stringify({ type: 'error', message: err.message }));
            });
        } else if (pocketWs && pocketWs.readyState === WebSocket.OPEN) {
            pocketWs.send(JSON.stringify(data));
        }
    });
    
    clientWs.on('close', () => {
        if (pocketWs) pocketWs.close();
    });
});

server.listen(8080, () => {
    console.log('Proxy server running on port 8080');
});
