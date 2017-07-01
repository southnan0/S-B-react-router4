import path from 'path';
import express from 'express';
var compression = require('compression');
import bodyParser from 'body-parser'

import React from 'react';
import '../app/appCommon/date';

import timer from './timer';
import defaults from './defaults';
import chatroom from './chatroom';
import {upload} from './upload';

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.resolve('./views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(compression());
// app.use(express.logger());
app.use('/build', express.static(path.resolve('./build')));
app.use(handleRender);
const server = require('http').createServer(app);
chatroom(server);

function handleRender(req, res) {
    let {url} = req;
    if (url === '/time_sse.php') {
        timer(req, res);
    } else if (url.match(/\/voice\/(.*)/g)) {
        res.sendFile(__dirname + url);
    } else if (url.match(/uploadfiles/g)) {
        res.sendFile(__dirname + url);
    } else if (url === '/upload') {
        upload(req, res);
    } else {
        // req.url is the full url
        defaults(req, res);
    }
}

server.listen(port, () => {
    console.log('this server is running on ' + port)
});