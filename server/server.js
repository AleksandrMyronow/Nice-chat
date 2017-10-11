'use strict';

const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const server = require('http').Server(app);
const io = require('socket.io')(server, {serveClient: true});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chatNodeJs', {useMongoClient: true});
mongoose.Promise = require('bluebird');

nunjucks.configure('../client/views', {
    autoescape: true,
    express: app
});

app.use('/assets', express.static('../client/public'));

app.get('/', function(req, res) {
    res.render('index.html');
});

require('./sockets')(io);

server.listen(3000, () => {
    console.log('Server started on port 3000');
});