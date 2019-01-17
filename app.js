var express = require('express');
var app = express();
var path=require('path');
const router = require('./router/main.js');
var bodyParser = require('body-parser');

// app.use(express.static(path.join(__dirname, '/data/imsi')));
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.pretty=true;


app.use(express.static(path.join(__dirname, '/views')));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/',router);
app.use('/ip/check',router);
app.use('/:visit/text',router);
app.use('/project/write',router);
app.use('/member/:id',router);
app.use('/:id/num',router);
app.use('/:id',router);


app.listen(4500);
