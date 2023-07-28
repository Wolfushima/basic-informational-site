const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 8080;

const pages = {
    index: '/',
    about: '/about',
    'contact-me': '/contact-me',
};

const server = http.createServer((req, res) => {
    try {
        const pageReq = req.url;
        const pageExist = Object.values(pages).includes(pageReq);
        if (pageExist) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const file = Object.keys(pages).find(
                (page) => pages[page] === pageReq,
            );
            const fileRes = fs.readFileSync(`src/${file}.html`, 'utf8');
            return res.end(fileRes);
        }
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        const notFoundPage = fs.readFileSync('src/404.html', 'utf8');
        res.end(notFoundPage);
    } catch (err) {
        console.error(err);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
