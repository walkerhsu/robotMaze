const express = require('express');
const {queryMap} = require('./src/mapLoader.js') 

var app = express();
var map = []
const inputfile = './res/map00.csv'
queryMap(inputfile , (response) => {
    map = response
})

app.get('/', function (req, res) {
    console.log(req.url);
    res.sendFile( __dirname + '/' + 'index.html');
});

// RESTful GET to get map
app.get("/map", (req, res) => {
    console.log(req.url)
    try {
        res.json(map)
    } catch (e) {
        console.error(e)
    }
});


app.get('/*', function (req, res) {
    console.log(req.url);
    res.sendFile( __dirname + '/' + req.url);
});
var server = app.listen(5000, function () {
    console.log('Node server is running..');
});