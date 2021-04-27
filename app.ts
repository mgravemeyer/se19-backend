// import { createServer, IncomingMessage, ServerResponse } from 'http';

const http = require('http');

var express = require('express'), app = express(), port = process.env.PORT || 3000;

//start the mongodb connection
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test-user:Jnsgc7y.EWM4X@se19cluster.8tdv4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();
client.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use(
    express.urlencoded({
        extended: true
    })
)

app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening at port:${port}`)
})

app.get('/list', (req, res) => {
        client.db("se19app").collection('list').find().toArray().then(results => {
            res.send(results)
        }).catch(error =>
            res.send(error)
        );
});

app.post('/list', (req, res) => {
    if (req.body.name !== undefined) {
        client.db("se19app").collection('list').insertOne({'name': req.body.name}).then(
            res.send("Ok")
        )
    } else {
        res.status(400)
        res.send("'name' key was not found in json")
    }
});
