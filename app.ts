//-------------- express/node setup --------------
const http = require('http');
var express = require('express'), app = express(), port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
var cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//-------------- mongodb setup --------------
const mongodb = require('mongodb')

const ObjectID = require("mongodb").ObjectID;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test-user:Jnsgc7y.EWM4X@se19cluster.8tdv4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();
client.on('error', console.error.bind(console, 'MongoDB connection error:'));
//-------------- routes --------------
app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

app.get('/list', (req, res) => {
        client.db("se19app").collection('list').find().toArray().then(results => {
            res.send(results)
        }).catch(error =>
            res.send(error)
        );
});

app.post('/listAdd', (req, res) => {
    if (req.body.name !== undefined) {
        client.db("se19app").collection('list').insertOne({'_id': '123','name': req.body.name}).then(
            res.send("Ok")
        )
    } else {
        res.status(400)
        res.send("'name' key was not found in json")
    }
});

app.post('/listRemove', (req, res) => {
    if (req.body.name !== undefined) {
        client.db("se19app").collection('list').remove({_id: (req.body.id)}, function (err, result) {
            if (err) {
                res.status(400)
                res.send(`error: ${err}`)
            } else {
                res.json(result);
            }
        })
    } else {
        res.status(400)
        res.send("'id' key was not found in json")
    }
});

function uuid(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


app.post('/listRemoveAll', (req, res) => {
        client.db("se19app").collection('list').drop().then(
            res.send("Ok")
        )
});

app.listen(port, () => {
    console.log(`App listening at port:${port}`)
})