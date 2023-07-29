const http = require('node:http');
const fs = require('node:fs/promises');

const hostname = 'localhost';
const port = 8080;

const pages = {
    index: '/',
    about: '/about',
    'contact-me': '/contact-me',
};

const server = http.createServer(async (req, res) => {
    try {
        const pageReq = req.url;
        const pageExist = Object.values(pages).includes(pageReq);
        if (pageExist) {
            const file = Object.keys(pages).find(
                (page) => pages[page] === pageReq,
            );
            const filePath = `src/${file}.html`;
            const fileRes = await fs.readFile(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(fileRes);
        } else {
            const notFoundPage = await fs.readFile('src/404.html');
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(notFoundPage);
        }
    } catch (err) {
        console.error(err);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
