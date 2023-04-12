"use strict";

let http = require('http');

let codeSniffer = '',
    options = {
        host: 'faunayfloradelargentinanativa.blogspot.com',
        port: 80
    };

//Data sniffer
function httpResponse(res){
    console.log(`Status: ${res.statusCode}. Message: ${res.statusMessage}`);
    res.on('data', function(data) {
        codeSniffer += data
    });
}

function httpError(err){
    console.log(`Error code: ${err.code}. Error msg: ${err.message}`);
}

function httpInitServer(req, res){
    res.writeHead(200, { 'Content-Type' : 'text/html' });
    res.end(codeSniffer);
}

http
    .get(options, httpResponse)
    .on('error', httpError);

http
    .createServer(httpInitServer)
    .listen(3000);

console.log(`Running server on localhost:3000`);