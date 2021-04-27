// import { createServer, IncomingMessage, ServerResponse } from 'http';

const http = require('http');

var express = require('express'), app = express(), port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

app.get('/list', (req, res) => {
    res.send('Here is the list!')
})

app.post('/list', (req, res) => {
    res.send('Added Item in List!')
})

console.log('API started on: ' + port)