var express = require('express');
var app = express();
var fs=require('fs');
var path=require('path');
const router = require('./router/main.js');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.locals.pretty=true;

app.use(express.static(path.join(__dirname, '/views')));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/',router);
app.use('/:id',router);
app.use('/:id/num',router);

 app.listen(3000);
//
// const http = require('http');
// const hostname = '110.9.127.167'; //클라우드 서버컴퓨터(원격 접속 후 웹서버 구축)라면 아래 (5)번 항목 참고
// const port = 3000;
// const server = http.createServer((req, res) => {
//      res.statusCode = 200;
//      res.setHeader('Content-Type', 'text/plain');
//      res.end('공사중\n'); });
//
//
//
// server.listen(port, hostname, () => {
//      console.log(`Server running at http://${hostname}:${port}/`);
// });
