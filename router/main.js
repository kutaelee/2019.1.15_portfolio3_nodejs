var express = require('express');
var router = express.Router();
var path=require('path');
var fs=require('fs');
var mime = require('mime');
var mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");
var Q=require('q');
var session = require('express-session');
var fordername=new Array();
var xss = require("xss");
var grade="";
var db_config  = require('../DB/property.json');
const bcrypt=require('bcrypt-nodejs');


var client = mysql.createConnection({
  user: db_config.user,
  password:  db_config.password,
  database:  db_config.database
})

router.use(bodyParser.urlencoded({extended: false}));

/* session */
router.use(session({
	secret: '12sdfwerwersdfserwerwef', //keboard cat (랜덤한 값)
	resave: false,
	saveUninitialized: true,
}));
/* xss */
function escapeHtml(html) {
  return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* 객체 비어있는지 검사 함수 */
function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

/* 폴더생성 함수 */
const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}
/* 이미지 업로드 함수 */
//테스터와 관리자 구분 후 프로젝트명으로 폴더 생성
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
 
    if(req.session.user.id=="admin"){
        var dir = './views/data/'+req.body.title;
        grade="data";
      }else{
        var dir = './views/test/'+req.body.title;
        grade="test";
      }
    console.log("업로드진입");
  if (!fs.existsSync(dir)){
    console.log("mkdir진입");
        fs.mkdirSync(dir);
        cb(null, dir);
  }else
  {
    cb(null, dir);
  }

    },
    filename: function (req, file, cb) {
      cb(null,file.originalname.replace(/^\s*|\s*$/g, ''));
    }
  }),
});

/* 폴더 삭제 함수 */
function rimraf(dir_path) {
  if (fs.existsSync(dir_path)) {
      fs.readdirSync(dir_path).forEach(function(entry) {
          var entry_path = path.join(dir_path, entry);
          if (fs.lstatSync(entry_path).isDirectory()) {
              rimraf(entry_path);
          } else {
              fs.unlinkSync(entry_path);
          }
      });
      fs.rmdirSync(dir_path);
  }
}
/* 파일 삭제 함수 */
function deletefile(path,data){
  console.log("deletefiles진입");
  var i=0;
  while(i<data.length){
    fs.unlink(path+'/'+data[i], function(err) {
      if (err) throw err;
    });
    i++;
  }
  return null;
}

/* get */
router.get('/:id',function(req,res){
  fs.readFile('./views/view/'+req.params.id+'.html',(err,data) =>{
    if(err)  { console.error(err.stack);
      fs.readFile('./views/view/404.html',(err,data) =>{
        res.type('html');
        res.send(data);
      })
    }else{
      res.type('html');
      res.send(data);
    }
   
});
});
router.get('/:id/get', function(req, res, next) {
client.query("SELECT * FROM visit;", function(err, result, fields){
  if(err){
    console.log("쿼리문에 오류가 있습니다.");
  }
  else{
    res.json(result);
  }
});

});

router.get('/', function(req, res) {
console.log("main");
fs.readFile('./views/index.html',function(error,data){
 if(error){console.log(error);}
 else{
   res.writeHead(200,{'Content-Type':'text/html'})
 res.end(data);
}
})
});

/* post */

//필요한 html파일 가져올때 사용
router.post('/:id',function(req,res,next){
  console.log(req.params.id); 
    fs.readFile('./views/view/'+req.params.id+'.html',(err,data) =>{
      if(err) { fs.readFile('./views/view/404.html',(err,data) =>{
        res.type('html');
        res.send(data);
      })};
      res.send(data);
    });
  
});

/* guestbook */

// ipcheck 게스트북 글 쓸때 체크
router.post('/ip/check',function(req,res,next){
  res.send(req.ip);
  })

//게스트북 db 출력
router.post('/visit/text',function(req,res,next){
    client.query("SELECT id,text,regdate FROM visit order by id DESC limit 15;", function(err, result, fields){
      if(err){
          console.log("text 쿼리문에 오류가 있습니다.");
        }
        else{
          res.json(result);
        }
      });
  });

  //게스트북 db입력
  router.post('/visit/submit',function(req,res,next){
    var i=0;
    console.log(req.ip);
    req.body.text=escapeHtml(req.body.text);
    //줄넘김 추가
    var visit_text="";
    if(i+100<req.body.text.length){
    while(i+100<req.body.text.length){
        var temp=req.body.text.substring(i,i+100);
        visit_text+=temp+'<br/>';
        i+=100;
      }
    }else{
      visit_text=req.body.text;
    }
  
    console.log(req.body.text);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var tm=today.getHours();
    var min=today.getMinutes();
    var sec=today.getSeconds();
    if (dd < 10) {
      dd = '0' + dd;
    }
  
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = yyyy + '/' + mm + '/' + dd+ ' ' + tm+ ':' + min+ ':' + sec;
    client.query('insert into visit(text,regdate) values ("'+visit_text+'","'+today+'");', function(err, result, fields){
      if(err){
          console.log("submit 쿼리문에 오류가 있습니다.");
          res.send("방명록에 스크립트 사용금지!");
        }
        else{
          res.json(result);
        }
      });
  });

  // 게스트북 최신글 확인
  router.post('/visit/search',function(req,res,next){
    client.query('select id from visit order by id desc limit 1;', function(err, result, fields){
      if(err){
          console.log("search 쿼리문에 오류가 있습니다.");
        }
        else{
          res.json(result);
        }
      });
  });
  //게스트북 최신글 출력
  router.post('/visit/reroad',function(req,res,next){
    client.query('select text,regdate from visit where id='+req.body.id+';', function(err, result, fields){
      if(err){
          console.log("reroad 쿼리문에 오류가 있습니다.");
        }
        else{
          res.json(result);
        }
      });
  });

  /* project */

//프로젝트 첫 페이지 목록 가져오기
router.post('/project/load',function(req, res,next){
 
  client.query('select * from project order by num desc limit 6;', function(err, result, fields){
  if(err){
      console.log("projectroad 쿼리문에 오류가 있습니다.");
    }
    else{
      res.json(result);
    }
  });
});

//페이지 번호에 따라서 목록 가져오기
router.post('/project/pageload',function(req, res,next){
  client.query('select * from project order by num desc limit '+req.body.data+',6;', function(err, result, fields){
    if(err){
        console.log("projectroad 쿼리문에 오류가 있습니다.");
      }
      else{  console.log("pageload");

     
        res.json(result);
      }
    });
});

//선택한 프로젝트 슬라이드 이미지 폴더 경로 전송
router.post('/:id/num',function(req,res,next){

  client.query('select * from project where title='+req.body.list+';', function(err, result, fields){
    if(err){
        console.log("projectroad 쿼리문에 오류가 있습니다.");
      }
      else{
        if(!isEmptyObject(result))
        {
          fs.readdir('./views'+req.body.dir+'/'+req.body.list,(err,data) =>{
            if(err) throw err;
              res.send(data);
          });
      
        }else{
         res.send(false);
        }
      }
    });
});

// 섬네일 이미지 경로 전송 
router.post('/project/select',function(req,res,next){
  client.query('select img from project where title="'+req.body.title+'"limit 1;', function(err,result,fields){
    if(err){
      console.log("project select 쿼리문에 오류가 있습니다.");
    }
    else{
      if(!isEmptyObject(result)){
        res.send(result);
      }else{
        res.send(false);
       }     
      }   
  })
})

//프로젝트파일 이미지 삭제 (글수정에 사용)
router.post('/project/deletefiles',function(req,res,next){

  if(req.body.id=="admin")
  {
   fs.readdir("./views/data/"+req.body.cur_title,(err,data) =>{
      if(err) throw err;
      else{
        deletefile("./views/data/"+req.body.cur_title,data);
        res.end();
      }
    })
    
  }else{
    fs.readdir("./views/test/"+req.body.cur_title,(err,data) =>{
      if(err) throw err;
      else{    
       deletefile("./views/test/"+req.body.cur_title,data);
       res.send('완료');
      }
    })     
  }
});

//update db 수정 (글 수정)
router.post('/project/update',upload.array('filename[]'), (req, res) => {
  var hash = bcrypt.hashSync(req.session.user.pw);
  var title=escapeHtml(req.body.title);
  var lang=escapeHtml(req.body.lang);
  var date=escapeHtml(req.body.date);
  client.query("update project set title='"+title+"',password='"+hash+"',text='"+req.body.ir1+"',img='/"+grade+'/'+req.body.title+'/'+req.files[0].filename+"',date='"+date+"',lang='"+lang+"' where title='"+req.body.cur_title+"';", function(err,fields){
    if(err){
      console.log("update project 쿼리문에 오류가 있습니다.");
    }
    else{
      res.redirect('/');
      }
  })
});

//delete (글 삭제) 
//세션 체크를 먼저 하고 태그로 구별하여 라우팅하는 방식으로 수정,삭제 등 2중 ajax 문제를 해결하려 하였으나 겹치는 문제가 많아서 글 삭제만 해결
router.post('/session/check', function(req, res,next){
  if(req.session.user){
    if(req.body.tag=='delete'){
      if(req.body.board_id==req.session.user.id || req.session.user.id=='admin'){
        client.query('delete from project where title="'+req.body.title+'";', function(err,result,fields){
          if(err){
            console.log("delete project 쿼리문에 오류가 있습니다.");
          }
          else{
            if(req.body.board_id=="admin")
            {
              rimraf("./views/data/"+req.body.title);
              res.send(true);
            }else{
              rimraf("./views/test/"+req.body.title);
              res.send(true);
            }  
            }
        })
      }else{
        res.send(false);
      } 
    }
  }else{
    res.send(false);
  }
})

// 관리자외의 글 select 및 delete 함수
function select_test_project(){
  setTimeout(function(){
  var i=0;
  client.query('select title from project where id!="admin";', function(err,result){
    if(err){
      console.log("remove 쿼리문에 오류가 있습니다.");
    }
    else{
      if(i<result.length){
        while(i<result.length){
          rimraf("./views/test/"+result[i].title);
          i++;
        }
        client.query('delete from project where id!="admin";', function(err){
          if(err){
            console.log("remove 쿼리문에 오류가 있습니다.");
          }
          else{
          }
          console.log("db delete");
        }); 
        console.log("file delete");
      }    
    }
  });
},1000*10)
}

// 30분마다 관리자외의 글 삭제
setInterval(select_test_project,1000*60*30);


// 글쓰기
router.post('/project/write', upload.array('filename[]'), (req, res) => {
  var hash = bcrypt.hashSync(req.session.user.pw);
  var title=escapeHtml(req.body.title);
  var lang=escapeHtml(req.body.lang);
  var date=escapeHtml(req.body.date);
  console.log(req.ip); 
   client.query("insert into project(id,password,title,text,img,date,lang) values('"+req.session.user.id+"','"+hash+"','"+title+"','"+req.body.ir1+"','/"+grade+"/"+title+"/"+req.files[0].filename+"','"+date+"','"+lang+"')", function(err, result, fields){
    if(err){
        console.log("write 쿼리문에 오류가 있습니다.");
      }else{
        res.redirect('/#Project');
      }
    });
 
});



//선택한 프로젝트 db내용 가져오기 
router.post('/project/get',function(req, res,next){
  client.query('select * from project where num='+req.body.data+';', function(err, result, fields){
    if(err){
        console.log("projectroad 쿼리문에 오류가 있습니다.");
      }
      else{
        if(!isEmptyObject(result))
        {
         res.json(result);
        }else{
          res.redirect('/');
        }
      }
    });
});

// 프로젝트 갯수 확인
router.post('/project/count',function(req, res,next){
  client.query('select count(*) as totalCount from project;', function(err, result, fields){
    if(err){
        console.log("projectroad 쿼리문에 오류가 있습니다.");
      }
      else{
        res.json(result);
      }
    });
});

/* member */

//로그인 회원정보 확인
router.post('/member/login',function(req,res,next){
  client.query('select * from member where id="'+req.body.id+'";', function(err, member, fields){
    if(!isEmptyObject(member)){ 
      if(bcrypt.compareSync(req.body.password,member[0].password)){
        console.log(member);
        res.json(member);
      }
      else{
        res.send(false);
      }
    }else{
      res.send(false);
    }
  })
});

//로그인 세션 등록
router.post('/member/loginsession', function(req, res,next){
  var paramID = req.body.id;
  var pw = bcrypt.hashSync(req.body.password);

  if (req.session.user) {
    console.log('이미 로그인 되어 있음');

    res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
    res.send(req.body.id);
} else {
    req.session.user =
        {
            id: paramID,
            pw: pw,
            name: 'username',
            authorized: true
        };
    res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" }); 
    res.end(req.body.id);
}
});

//로그아웃
router.get('/member/logout', function(req, res){
  if (req.session.user) {
    console.log('로그아웃 처리');
    req.session.destroy(
        function (err) {
            if (err) {
                console.log('세션 삭제시 에러');
                return;
            }
            console.log('세션 삭제 성공');
            //파일 지정시 제일 앞에 / 를 붙여야 root 즉 public 안에서부터 찾게 된다
            res.redirect('/');
        }
    );          //세션정보 삭제

} else {
    console.log('로긴 안되어 있음');
    res.redirect('/');
}

});

//세션 체크 (여러곳에서 자주 호출)
router.post('/member/check', function(req, res,next){
  if(req.session.user){
    res.send(req.session.user.id);
  }else{
    res.send(false);
  }
})



// 회원가입 시 아이디 중복확인
router.post('/member/select',function(req,res,next){
  client.query('select num from member where id="'+req.body.id+'";', function(err, member, fields){
 
    if(member!=null&&member!=""){
      res.send(false);
    }else{
      res.send(true);
    }
  })
});

//회원가입시 중복 한번 더 확인 하고 db 등록 (클라이언트에서 걸러내도 확인 버튼 누르는 순간 겹칠 수 있음)
router.post('/member/join',function(req,res,next){
  console.log('join');
  client.query('select id from member where id="'+req.body.id+'";', function(err, member, fields){
  if(member!=null&&member!=""){
    res.send(false)
  }else{
    var hash=bcrypt.hashSync(req.body.password);
    client.query('insert into member(id,password) values ("'+req.body.id+'","'+hash+'");', function(err, result, fields){
      if(err){
        console.log("join 쿼리문에 오류가 있습니다")
        res.send(false);
      }else{
        var paramID = req.body.id;
        var pw = hash;
        req.session.user =
        {
            id: paramID,
            pw: pw,
            name: 'username',
            authorized: true
        };
        res.send(true);
      }
  })
  }
  })
  
});


/* 에러 처리 */
router.use(function(err, req, res, next) {
  console.error(err.stack);
  if(err.errcode=-4058){
      res.status(500).send("서버 에러!");
  }else if(err.errcode=404){
    res.status(404).send("잘못된 경로입니다.");
  }else{
    res.status(500).send('something error');
  }
});


module.exports = router;

