const express = require('express');
const app = express();
const fs = require("fs");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/homepage', (req, res) => {
    try {
        if (fs.existsSync('./homepage.json')) {
            fs.readFile('./homepage.json', (err, data) => {
                if (err) res.status(500).send();
                else res.status(200).send(JSON.parse(data));
            });
        } else {
            res.status(404).send();
        }
    } catch (ex) {
        console.log(`Failed top get homepage object: ${ex}`)
    }
});

app.post('/homepage', (req, res) => {
    try {
        fs.writeFile('./homepage.json', JSON.stringify(req.body), (err) => {
            if (err) res.status(500).send();
            else res.status(200).send();
        });
    } catch (ex) {
        console.log(`Failed to update homepage object: ${ex}`);
    }
});

const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Api listening at http://%s:%s", host, port)
})