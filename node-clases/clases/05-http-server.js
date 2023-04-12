'use strict';

require('dotenv').config();

const HTML = './assets/message.html';
var http = require('http'),
    fs   = require('fs');

function ReadFile(res){
    fs.readFile(HTML, (err, data) => {
        if(err) throw err;
        res.end(data);
    });
}

function InitServer(req, res){
    res.writeHead(200, {'Content-Type' : 'text/html'} );
    ReadFile(res);
}

http.createServer(InitServer)
    .listen(3000);

console.log(`Running server on ${ process.env.HOST }`);
    