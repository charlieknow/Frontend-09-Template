const HTTP = require('http');

HTTP.createServer((request, response) => {
    let body = [];

    request.on('error', err => {
        console.error(err);
    }).on('data', chunk => {
        // body.push(chunk.toString());
        body.push(chunk);

        // console.log(body.toString())
    }).on('end', () => {
        // body = body.toString();
        console.log(body);
        body = Buffer.concat(body).toString();

        console.log('body:', body);

        // 必须写 Content-Type
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(`
            <html>
                <head d=c a='dd'></head>
                <style>
                    body div.q {
                        background: red;
                    }
                </style>
                <body>
                    <div class='q a'></div>
                </body>
            </html>
        `);
    })
}).listen(8008);

console.log('server started');