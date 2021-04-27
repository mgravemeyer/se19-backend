// import { createServer, IncomingMessage, ServerResponse } from 'http';

const http = require('http');

var express = require('express'), app = express(), port = process.env.PORT || 3000;

//start the mongodb connection
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test-user:Jnsgc7y.EWM4X@se19cluster.8tdv4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();
client.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening at port:${port}`)
})

app.get('/list', (req, res) => {
    req.on('end', () => {
        getListMongo();
        res.end();
    })
    res.send('Here is the list!')
})

app.post('/list', (req, res) => {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            addItemMongo(JSON.parse(data).name);
            res.end();
        })
    res.send('Added Item in List!')
})

const addItemMongo = async (data) => {
    try {
        client.db("se19app").collection('list').insertOne({'name': data})
    } catch (err) {
        console.log(err);
    }
}

const getListMongo = async () => {
    try {
        client.db("se19app").collection('list').find().forEach((item) => console.log(item))
    } catch (err) {
        console.log(err);
    }
}