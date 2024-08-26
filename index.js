let express = require('express');
let prom = require('prom-client');
const register = prom.register;


let app = express();

const client = require('prom-client');
const counter = new client.Counter({
name:'aula_request_total',
help:'Contador de requests'
});


app.get('/', function (req, res) {
    counter.inc();

    res.send('Olá teste do docker e prometheus!');
});

app.get('/metrics', async function (req, res) {
   
    res.set('Content-Type', 'text/plain');
    res.status(200).send(register.contentType);
    res.end(await register.metrics());
});

app.listen(3000);