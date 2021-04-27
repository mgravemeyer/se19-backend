// import { createServer, IncomingMessage, ServerResponse } from 'http';

const http = require('http');

var express = require('express'), app = express(), port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`)
// })

app.get('/list', (req, res) => {
    res.send('Here is the list!')
})

app.post('/list', (req, res) => {
    res.send('Added Item in List!')
})

console.log('API started on: ' + port)

//mongodb connection

const findItems = async () => {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://test-user:Jnsgc7y.EWM4X@se19cluster.8tdv4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const connect = await client.connect(err => {
        const collection = client.db("test").collection("devices").insertOne({'test': "test"})
            .then(result => {
                console.log(result)
                client.close();
            })
        // perform actions on the collection object
    })
};

findItems();

