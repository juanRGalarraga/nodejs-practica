'use strict';

require('dotenv').config();

var path = require('path'),
    http = require('http'),
    urls = [
        {
            route: '',
            output: ''
        },
        {
            route: 'about',
            output: '<h1>About</h1>'
        },
        {
            route: 'contact',
            output: '<h1>Contact</h1>'
        }
    ];

function init_server(req, res){
    let message = '<h1>Hello mundo</h1>',
        pathURL = path.basename(req.url);

    urls.find((url) => {
        if(url.route === pathURL){
            res.writeHead(200, { 'Content-Type' : 'text/html' });
            res.end(message + url.output);
        }
    });

    if(!res.finished){
        res.writeHead(404, { 'Content-Type' : 'text/html' });
        res.end('<h1>Error 404 : Not Found</h1>');
    }
}

console.log(path.basename('c:/hola/assets/asd.html', '.html'));

http.createServer(init_server)
    .listen(process.env.PORT);

console.log(`Running server on ${ process.env.HOST }`);