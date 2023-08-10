import express from 'express';

const app = express();
const router = express.Router();
const port = 8080;

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'src/' });
});

router.get('/about', (req, res) => {
    res.sendFile('about.html', { root: 'src/' });
});

router.get('/contact-me', (req, res) => {
    res.sendFile('contact-me.html', { root: 'src/' });
});

app.use(router, (req, res, next) => {
    res.status(404).sendFile('404.html', { root: 'src/' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
