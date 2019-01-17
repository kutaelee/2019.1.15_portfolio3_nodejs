
var curpage=0;
var scrollPosition=0;
var lastscroll=0;
var sw=false;
var position=0;
var cur_project_page=0;
var select_num=0;
var cur_project_title="";
var id_check=false;
var pw_check=false;
var pw2_check=false;
var writer="";
var st=0;

  /*반응형 페이지 */
  $(window).resize(function(e) {
    if($(window).width() > 1370 &&$(window).width() <= 1550){
      $('body').attr('class','notebook');
    }
   else  if($(window).width() > 800 && $(window).width() <= 1370){
    $('body').attr('class','pad');
  }
   else if( $(window).width() > 470 && $(window).width() <= 800) {
  
       $('body').attr('class','mobile');
   } else if ($(window).width() <= 470) {
  
    $('body').attr('class','smartphone');
  }else{
    $('body').removeAttr('class','pad');
    $('body').removeAttr('class','notebook');
    $('body').removeAttr('class','mobile');
   }
    
  });

  /* 프로젝트 창 닫는 함수 */
function projectclose(){
  $(".content_div").css("-webkit-filter","none");

  $('.content').css({
    'transform':'translateX(0%)',
    'transition':'1.5s'
  })
  $('.home').fadeIn();
  $('.scrollspy').fadeIn();
  $('.guest_book').fadeIn();
  $('footer').fadeIn();
  $('.project_div').css({
    'transform':'translateX(100%)',
    'transition':'1.5s'
  })
  var offset = $(".content_head").offset();
  $('html, body').animate({scrollTop : offset.top}, 0);
  $('.project_div').text("");
}

/*프로젝트 요소 생성 전역 함수 (index,write 페이지 둘다 쓰임)*/
function projectload(result) {
  $('.content_div').text("");


  var i=0;
  while(i<6&&i<result.length){
    $('.content_div').append('<section class="content_section" id="'+result[i].title+'"><div class="project" id="'+result[i].num+'">'+'<div class="sumnail">+</div><img src="'+result[i].img+'">'+'<h2>'+result[i].lang+'</h2>'+'<p class="project_name" value="'+result[i].title+'">'+result[i].title+'</p> </div></section>');
  
    i++;
  }
  if(i<6){
    while(i<6){
      $('.content_div').append('<section class="content_section2"> <div class="project"><img src="./Assest/img/commingsoon.JPG"> <h2>Comming Soon</h2> <p> . . . </p> </div> </section>');
      i++;
    }
  }
  $('.content_div').append('<br/><span class="write_btn" id="button" data-text="글쓰기"><button>글쓰기</a></button>');
}


$(document).ready(function(){
  
  /* 접속 시 사이즈 구별 */
  if($(window).width() > 1370 &&$(window).width() <= 1550){
    $('body').attr('class','notebook');
  }
 else  if($(window).width() > 800 && $(window).width() <= 1370){
  $('body').attr('class','pad');
}
 else if( $(window).width() > 470 && $(window).width() <= 800) {

     $('body').attr('class','mobile');
 } else if ($(window).width() <= 470) {

  $('body').attr('class','smartphone');
}else{
  $('body').removeAttr('class','pad');
  $('body').removeAttr('class','notebook');
  $('body').removeAttr('class','mobile');
 }

        /*main*/
  /* scroll top변수 */
  var mainoffset=$(".main").offset();
  var projectoffset=$(".content_head").offset();
  var profileoffset=$(".profile_head").offset();
  var guestbookoffset=$(".guest_book_head").offset();
 
  /*scrollspy css 변경 함수 */
 function scrollspy_css(id){
  $('.navi a').css({
    'color':'snow'
  })
  $(id).css({
    'color':'#FFC61A'
  })
 }
 /*scrollspy css기능*/
  $(window).scroll(function() {
    st = $(this).scrollTop();
    if(st==0){
      $('.active_scroll').attr('class','scrollspy');
    }else{  
      $('.scrollspy').attr('class','active_scroll');
    }
    if(st==0||st<profileoffset.top-200){
      scrollspy_css('#welcome');
    }else if(st>profileoffset.top&&st<projectoffset.top-200){
      scrollspy_css('#profile');
    }else if(st>projectoffset.top-200&&st<guestbookoffset.top-200){
      scrollspy_css('#project');     
    }else if(st>guestbookoffset.top){
      scrollspy_css('#guest_book');    
    }

  });
/*scrollspy scroll기능*/
$('#welcome').click(function(){
  $('html, body').animate({scrollTop : mainoffset.top}, 400);
})
$('#project').click(function(){
  $('html, body').animate({scrollTop : projectoffset.top}, 400);
})
$('.project_btn').click(function(){
  $('html, body').animate({scrollTop : projectoffset.top}, 400);
})
$('#profile').click(function(){
  $('html, body').animate({scrollTop : profileoffset.top+50}, 400);
})
$('#guest_book').click(function(){
  $('html, body').animate({scrollTop : guestbookoffset.top+50}, 400);
})
/* logo 클릭 기능*/
$(".home_btn").click(function(){
  window.location.href="/";
});

/*profile load */
$.ajax({
url:"/profile",
type:"post",
datatype:"text/html",
success:function(result){

$('.profile').html(result);
$('.profile').show("fast");

}
});

  /*N분마다 테스터 글 삭제 */
  setInterval(function(){
    $.ajax({
      url:"/project/remove",
      type:"post",
      success:function(){
      }
    })
    },1000 * 60 * 30);



    /* project */




/*project 페이징 버튼 load*/
$.ajax({
  url:"/project/load",
  type:"post",
  success:function(result){
    projectload(result);
    $.ajax({
    url:"/project/count",
    type:"post",
    success:function(result){
      var j=1;
      if(0<result[0].totalCount)
      {
        while(j<(result[0].totalCount/6)+1){
          if(j==1)
          {
            $('.content_paging').append('<button class="page_btn" id="'+j+'" style="background:orange;color:snow">'+j+'</button>');  
          }else{
            $('.content_paging').append('<button class="page_btn" id="'+j+'">'+j+'</button>');  
          }
           
          j++;
          if(j>10){break;}
        }
      }
      if(j>10){
        $('.content_paging').append('<button class="page_btn">▶</button>');
      }
  
    }
  })
  }
  
  });

/* 프로젝트 페이징 버튼 클릭 기능 */
$(document).on('click','.page_btn',function(){
  $('.content_paging button').css({
    'background':'snow',
    'color':'orange'
  })
  $(this).css({
    'background':'orange',
    'color':'snow'
  })
  var data=$(this).prop('id')-1;   
  if(data==0){
    data=0;
  }else{
    data*=6;
  }
  cur_project_page=data;
  $.ajax({
    url:"/project/pageload",
    type:"post",
    data:{'data':data},
    datatype:"text/html",
    success:function(result){
      projectload(result);
    }
  })
});

 

/*sumnail hover*/
$(document).on("mouseover",".content_section img",function(){
  
  $(this).siblings('.sumnail').fadeIn();
  $('.sumnail').mouseout(function(){
    $('.sumnail').stop().fadeOut();
    });
});


/*글쓰기 버튼 hover*/
$(document).on("mouseover",".write_btn",function(){
  $('.write_btn').children().css({
    'background-color':'orange'
  });
  $(this).mouseout(function(){
    $('.write_btn').children().css({
      'background-color':'#FFC61A'
    });
    });
});

/* 글쓰기 버튼 세션체크 및 글작성페이지 load */
$(document).on('click','.write_btn',function(){
  $('.content h3').hide();
  $.ajax({
    url:'/member/check',
    type:'post',
    datatype:'text/html',
    success:function(result){
      if(result){
        $.ajax({
          url:'/write',
          type:'post',
          datatype:'text/html',
          success:function(result){
            $('.content_div').html(result);
            $('.content_div').show("fast");
            $('.page_btn').toggle();        
          }
        })
      }else{
        alert("로그인 후 이용해주세요!");
      }
    }
  })
 
});
/* 프로젝트 닫기버튼 */
$(document).on('click','.board_nav',function(){
  projectclose();
});
$(document).on('click','.project_close_btn',function(){
  projectclose();
});

/*프로젝트 선택 시 load */
$(document).on("click",".sumnail",function(){
  select_num=$(this).parent().prop('id');
  curpage=0;
  cur_project_title=$(this).parent().parent().prop('id');

  $.ajax({
  url:"/board",
  type:"post",
  datatype:"text/html",
  success:function(result){
    $('.project_div').append(result);
    $('.board_nav').append(' <span class="project_close_btn" id="arrow"><img src="./Assest/img/arrow-17-64.gif"></span>');
    $('.project_div').fadeIn();
    $('.'+select_num).parent().css({
      'opacity':'1'
    })
    $('.content').css({
      'transform':'translateX(-100%)',
      'transition':'1.5s'
    })
    $('.home').hide();
    $('.guest_book').hide();
    $('.active_scroll').hide();
    $('footer').hide();

    $('.project_div').css({
      'transform':'translateX(0%)',
      'transition':'1.5s'
    })
    $('html, body').animate({scrollTop : 0}, 0);
  }

    })
  });

/* 로그인,회원가입 페이지 */

/*필터 블러,해제*/
function filterblur(){
  $(".main").css("-webkit-filter","blur(5px)");
  $(".project").css("-webkit-filter","blur(5px)");
  $(".profile").css("-webkit-filter","blur(5px)");
  $(".guest_book").css("-webkit-filter","blur(5px)");
  $(".lisence").css("-webkit-filter","blur(5px)");
}
function filternone(){
  $(".main").css("-webkit-filter","none");
  $(".project").css("-webkit-filter","none");
  $(".profile").css("-webkit-filter","none");
  $(".guest_book").css("-webkit-filter","none");
  $(".lisence").css("-webkit-filter","none");
}
/* 창 흔들기 애니메이션 */
function shake(classname){
  $('.'+classname).animate({
    left:10
  },10);
  $('.'+classname).animate({
    left:0
  },10);
  $('.'+classname).animate({
    left:-10
  },10);
  $('.'+classname).animate({
    left:0
  },10);
  
}

/* 회원가입 click */
$('.join_span').click(function(){
  $('.login_div').hide();
  $('.join_div').animate({top : st}, 10);
  $('.join_div').fadeIn();
  filterblur();
  $('.join_div').css('-webkit-filter','drop-shadow(5px 5px 20px black)');
  $('.close_btn').click(function(){
    $('#join_form input').val("");
    $('.check_div').html("");
    filternone();
    $('.join_div').fadeOut('slow');
  });
})

/* 회원가입 데이터 검증 */
$('.join_id').keyup(function(){
  $('.join_btn button').removeAttr('disabled','false');
  var data=$('.join_id').val();
  if(data.length<4||data.length>15){
    $('.check_div').html("아이디는 영문기준 4글자 이상<br/> 15글자 미만으로 입력하셔야 합니다.");
  } else{

    $.ajax({
      url:'/member/select',
      type:'post',
      data:{'id':data},
      datatype:'text/html',
      success:function(result){
        $('.check_div').text(result);
        if(result=="사용해도 좋은 아이디 입니다."){
           id_check=true;
        }else{
          id_check=false;
        }
      }
      })
  }
 
});
$('#join_password').keyup(function(){
  $('.join_btn button').removeAttr('disabled','false');
  var data=$('#join_password').val();
  var data2=$('#join_password2').val();
  if(data.length<4||data.length>20){
    $('.check_div').html("비밀번호는 영문기준 4글자 이상<br/> 20글자 미만으로 입력하셔야 합니다.");
  } else{
    $('.check_div').html("사용해도 좋은 비밀번호 입니다.");
    if(data2!=""){
      if(data!=data2){
        $('.check_div').text("비밀번호가 서로 다릅니다.");
        pw_check=false;
        pw2_check=false;
      } else{
        pw_check=true;
        pw2_check=true;
        $('.check_div').text("사용해도 좋은 비밀번호 입니다.");
      }
    }
  }
});
$('#join_password2').keyup(function(){
  $('.join_btn button').removeAttr('disabled','false');
  var data=$('#join_password').val();
  var data2=$('#join_password2').val();
  if(data2.length<4||data2.length>20){
    $('.check_div').html("비밀번호는 영문기준 4글자 이상<br/> 20글자 미만으로 입력하셔야 합니다.");
  } else{
    if(data!=""){
      if(data!=data2){
        pw_check=false;
        pw2_check=false;
        $('.check_div').text("비밀번호가 서로 다릅니다.");
      } else{
        pw_check=true;
        pw2_check=true;
        $('.check_div').text("사용해도 좋은 비밀번호 입니다.");
      }
    }
  }
});

/* 회원가입 버튼*/
$('.join_btn').mouseover(function(){
  if(id_check&&pw_check&&pw2_check){
    $('.join_btn button').removeAttr('disabled','false');
  }else{
    shake("join_div");
    $('.join_btn button').attr('disabled','true');
  }
});

$('.join_btn').click(function(){
  var data=$('#join_form').serialize();
  if(id_check&&pw_check&&pw2_check){
  $.ajax({
    url:'/member/join',
    type:'post',
    data:data,
    datatype:'text/html',
    success:function(result){
      alert(result);
      if(result=="가입성공!")
      {
      filternone();
      $('.join_div').hide('slow');
      $('.join_div input').val("");
      document.location.href="/";
      }
    }
  })
}else{
  alert("가입에 실패 하였습니다. 다시 입력해주세요");
}
});

/* 로그인 페이지*/

/* 로그인 페이지 load*/
$('.login_span').click(function(){
  $('.join_div').hide();
  $('.login_div').animate({top : st}, 100);
  var logintop=$('.login_div').offset();
  $('.login_div').fadeIn();
  $('body').animate({top : logintop.top}, 100);
  filterblur();
  $('.login_div').css('-webkit-filter','drop-shadow(5px 5px 20px black)');

  $('.close_btn').click(function(){
    filternone();
    $('.login_div').fadeOut('slow');
  });
})

/* 로그인 데이터 검증 */
$('.login_btn').click(function(){
  var data=$('#login_form').serialize();
  $.ajax({
    url:'/member/login',
    data:data,
    type:'post',
    datatype:'json',
    success:function(result){
      if(result!="일치하는 회원 정보가 없습니다."){   
        $.ajax({
          url:'/member/loginsession',
          data:result[0],
          type:'post',
          datatype:'json',
          success:function(result){
            alert(result+"님 반갑습니다.");
            filternone();
            window.location.href='/';
          }
        })
      }else{
        $('.check_div').text(result);
      }
     
    }
  })
})
/* 로그아웃 세션체크 */
$('.logout_span').hide();
$.ajax({
  url:'/member/check',
  datatype:'boolean', 
  type:'post',
  success:function(result){
    if(result){
      $('.join_span').hide();
      $('.login_span').hide();
      $('.logout_span').show();
    }else{
      $('.logout_span').hide();
      $('.login_span').show();
      $('.join_span').show();
     
    }
  }

})
/* 로그아웃 */
$('.logout_span').click(function(){
  $.ajax({
    url:'/member/logout',
    type:'get',
    success:function(){
      window.location.href="/";
      alert("로그아웃 완료");
     
    }
  })
});

  /* guestbook */
  $.ajax({
    url:'/visit',
    type:'post',
    datatype:'text/html',
    success:function(result){
      $('.guest_book').append(result);
    }
  })

/* footer */
$(".mygit").click(function(){
  window.open("https://github.com/kutaelee?tab=repositories","_blank");
});
$(".issue").click(function(){
  window.open("http://issuemoa.kr/","_blank");
});


});//ready 끝

