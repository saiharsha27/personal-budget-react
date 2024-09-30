// Budget API
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/budget', (req, res) => {
    // eslint-disable-next-line no-undef
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
});
