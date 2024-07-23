const http = require('http');
const path = require('path');
const fs = require('fs');

const port = 3000; // Port number for the server

const server = http.createServer((req, res) => {
    // Serve the static files
    let filePath = '.' + req.url;
    if (filePath == './') filePath = './index.html';
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile('./404.html', (error, errorContent) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(errorContent, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Sorry, there was an error: ' + err.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
