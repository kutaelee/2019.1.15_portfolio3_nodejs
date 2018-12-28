var express = require('express');
var router = express.Router();
var path=require('path');
var fs=require('fs');
var mime = require('mime');

const bodyParser = require("body-parser");

router.get('/', function(req, res) {
  console.log('a');
  res.send('views/index.html');
});

router.post('/:id/num',function(req,res,next){
  console.log(req.body.forder);
  fs.readdir('./views/data/'+req.body.list+'/'+req.body.forder,(err,data) =>{
    if(err) throw err;
    res.send(data);
  });
});
router.post('/forder',function(req,res,next){
  console.log(req.body.list);
  fs.readdir('./views/data/'+req.body.list,(err,data) =>{
    if(err) throw err;
    res.send(data);
  });
});
router.get('/:id',function(req,res){
    fs.readFile('./views/view/'+req.params.id+'.html',(err,data) =>{
      if(err) throw err;
      res.type('html');
      res.send(data);
  });
});
router.post('/:id',function(req,res,next){

  fs.readFile('./views/view/document.html',(err,data) =>{
    if(err) throw err;
    res.send(data);
  });
});

module.exports = router;
