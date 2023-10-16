const express = require('express');
const app = express();
const port = 80;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/teapot', (req, res) => {
    res.status(418).send('I\'m a teapot');
});

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});