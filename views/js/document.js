/*모바일*/
var list_sw=false;
$(window).resize(function(e) {
    if ($(window).width() <= 800) {
     $('body').addClass('mobile');
     $('.list').hide();
    }
    else {
     $('body').removeClass('mobile');
     $('.list_toggle').hide();
    }
});
$(document).on('click', 'body.mobile .list_toggle', function() {
    $('.list').toggle('slide');
    $('.slide_section').toggle('slide');
    list_sw=!list_sw;
    if(list_sw){
      $('.list_toggle').text("list 닫기");
    }else{
      $('.list_toggle').text("list 열기");
    }
});
$(document).on('click', 'body.mobile .list_span', function() {
  $('.list').toggle('slide');
  $('.slide_section').toggle('slide');
  list_sw=!list_sw;
  if(list_sw){
    $('.list_toggle').text("list 닫기");
  }else{
    $('.list_toggle').text("list 열기");
  }
  });
$(document).ready(function(){
    $(window).resize(); // call once for good measure!
});

/*pc*/
function right(){
  if(imglistnum<imglist.length-1&&forder!="")
  {
      imglistnum+=1;
      $(".slide_div").html('<img class="slide_img" src=../data/'+tagval+"/"+forder+'/'+imglist[imglistnum]+">");
      $(".slide_div2").html('<img class="slide_img2" src=../data/'+tagval+"/"+forder+'/'+imglist[imglistnum]+">");
  }else{
    alert(" 끝 페이지 입니다.")
  }
}
function left(){
  if(imglistnum>0&&forder!="")
  {
      imglistnum-=1;
      $(".slide_div").html('<img class="slide_img" src=../data/'+tagval+"/"+forder+'/'+imglist[imglistnum]+">");
      $(".slide_div2").html('<img class="slide_img2" src=../data/'+tagval+"/"+forder+'/'+imglist[imglistnum]+">");
  }else{
    alert(" 첫페이지 입니다.");
  }
}

function select_light(){
  $('#'+imglistnum).children().css({
    'color':'#FFFFFF'

  })
  $('#'+imglistnum).css({
    'background-color':'#484848',
    'opacity':'1'
  })
}


$('.neon').append(tagval);
var filename="";
var nowpagenum=0;
var imglist=new Array();
var forderlist=new Array();
var imglistnum=0;
var num="0";
var url="./views/data/"+tagval+"/"+tagval+".zip";
var sizesw=false;
$(".open_github").hide();

/*폴더 리스트 통신*/
$.ajax({
  url:"/forder",
  type:"post",
  data:{"list":tagval},
  datatype:"json",
  success:function(result){
    var i=0;
    var j=0;
    var y=0;
    forderlist=(result);
    if(!result.length/8==0){
    while(j<result.length/8){

      $('.list_page').append('<div class="page'+j+'">');
      while(i<result.length){
          $('.page'+j).append('<span class="forder_span"><a class="list_a" id="'+result[i]+'"value="'+i+'">'+(i+1)+"번 "+result[i]+'</a> </span><br/><br/>');
          i++;

          if(i%8==0)
          break;
        } j++;
        $('.list_page').append('</div>');
        $('.pagenum_div').append('<span class="pagenum_box"><a class="pagenum" id="'+j+'">'+j+'</a></span>');
        if(j==1){
          $('.pagenum_box').css({
            'background-color':'red'
          })
        }
      }
    }
    else{
        while(i<result.length){
        $('.list_page').append('<div class="page'+j+'">');
        $('.page'+j).append('<span class="forder_span"><a class="list_a" id="'+result[i]+'"value="'+i+'">'+(i+1)+" "+result[i]+'</a> </span><br/><br/>');
        $('.list_page').append('</div>');
        i++;
      }

    }
    for(i=1; i<j; i++)
    {
      $('.page'+i).hide();
    }

}
})
/*슬라이드 이미지 통신*/
$(document).on("click",".forder_span",function(event){
  $(".forder_span").hide();
  $('.pagenum_div').text("");
  $('.list_page').text("");
  forder=$(this).children().prop("id");
  if(forder=='XE_이슈모아(개인)'){  $(".open_github").text("이슈모아 가보기"); }
  if(forder!=""&&forder!="Node_포트폴리오사이트"){$(".open_github").show();}
$.ajax({
url:"/"+tagval+"/num",
type:"post",
data:{"list":tagval,"forder":forder},
datatype:"json",
success:function(result){
  var i=0;
  var j=0;
  var y=0;
  imglist=(result);
  if(!result.length/8==0){
  while(j<result.length/8){

    $('.list_page').append('<div class="page'+j+'">');
    while(i<result.length){
        $('.page'+j).append('<span class="list_span" id="'+i+'"><a class="list_a" id="'+result[i]+'"value="'+i+'">'+(i+1)+" "+result[i].substring(4,result[i].length-4)+'</a> </span>');
        i++;

        if(i%8==0)
        break;
      } j++;
      $('.list_page').append('</div>');
      $('.pagenum_div').append('<span class="pagenum_box'+j+'"><a class="pagenum" id="'+j+'">'+j+'</a></span>');
      if(j==1){
        $('.pagenum_div').children().css({
          'background-color':'red'
        })
      }
    }
  }
  else{
      while(i<result.length){
      $('.list_page').append('<div class="page'+j+'">');
      $('.page'+j).append('<span class="list_span" id="'+i+'"><a class="list_a" id="'+result[i]+'"value="'+i+'">'+(i+1)+" "+result[i].substring(4,result[i].length-4)+'</a> </span>');
      $('.list_page').append('</div>');
      i++;
    }

  }
  for(i=1; i<j; i++)
  {
    $('.page'+i).hide();
  }

}
});

});



/*깃허브 페이지 이동*/
$(document).on("click",".open_github",function(event){
  if(forder!='XE_이슈모아(개인)')
  {
      window.open("https://github.com/kutaelee/"+tagval+"_project","_blank");
  }else{

    window.open('http://issuemoa.kr/','_blank');
  }

});

/* 리스트에서 폴더로 뒤로가기 통신*/
$(document).on("click",".forder_back",function(event){
  $(".forder_span").show();
  $('.pagenum_div').text("");
  $('.list_page').text("");
  $('.slide_div').html('<div class="slide_div"> <h1 class="default_h1">리스트에서 프로젝트를 고르시면 해당 프로젝트의 PPT목록이 나타납니다! <br/><br/>버튼클릭으로 이전이나 다음페이지를 넘길 수 있습니다. <br/><br/> 해당 프로젝트의 소스코드를 github에 공유해놓았습니다. <br/><br/>우측상단 버튼을 클릭하시면 깃허브로 이동합니다. <br/> <br/> 감사합니다. 피드백 남겨주시면 새겨듣겠습니다. </h1></div>');
  $(".open_github").text("Open GitHub");
  imglistnum=0;
  nowpagenum=0;
  forder="";
  $.ajax({
    url:"/forder",
    type:"post",
    data:{"list":tagval},
    datatype:"json",
    success:function(result){
      var i=0;
      var j=0;
      var y=0;
      forderlist=(result);
      if(!result.length/8==0){
      while(j<result.length/8){

        $('.list_page').append('<div class="page'+j+'">');
        while(i<result.length){
            $('.page'+j).append('<span class="forder_span"><a class="list_a" id="'+result[i]+'"value="'+i+'">'+(i+1)+"번 "+result[i]+'</a> </span><br/><br/>');
            i++;

            if(i%8==0)
            break;
          } j++;
          $('.list_page').append('</div>');
          $('.pagenum_div').append('<span class="pagenum_box"><a class="pagenum" id="'+j+'">'+j+'</a></span>');
          if(j==1){
            $('.pagenum_box').css({
              'background-color':'red'
            })
          }
        }
      }
      else{
          while(i<result.length){
          $('.list_page').append('<div class="page'+j+'">');
          $('.page'+j).append('<span class="forder_span"><a class="list_a" id="'+result[i]+'"value="'+i+'">'+(i+1)+" "+result[i]+'</a> </span><br/><br/>');
          $('.list_page').append('</div>');
          i++;
        }

      }
      for(i=1; i<j; i++)
      {
        $('.page'+i).hide();
      }

  }
  })
});

/*리스트에서 포트폴리오 선택 시 이미지 출력*/
$(document).on("click",".list_span",function(event){

  $('.list_span').children().css({
    'color':'snow'
  })
  $('.list_span').css({
    'background-color':'#363636',
    'opacity':'0.7'
  })

  filename=$(this).children().attr('id');
  $(".slide_div").html('<img class="slide_img" id="'+tagval+'"src=../data/'+tagval+'/'+forder+'/'+filename+'>');
  $("#left").show();
  $("#right").show();
  imglistnum=Number($(this).children().attr('value'));
select_light();
});

var nowlistnum=0;
var focus=parseInt(nowlistnum/8);
/*리스트 페이지 이동 및 css*/
$(document).on("click",".pagenum",function(event){
$(".pagenum").parent().css({
  'background-color':'#002266'
})
$(this).parent().css({
  'background-color':'red'
})
num=$(this).attr('id');
$('.page'+nowpagenum).hide();
num-=1;
$('.page'+num).show();
nowpagenum=num;

});

/*  슬라이드 버튼 기능*/
$(document).on('keydown',function(event) {

  $('.page'+nowpagenum).hide();
  focus=parseInt(nowlistnum/8);
  $('.page'+focus).show();
  $(".pagenum").parent().css({
    'background-color':'#002266'
  })
  $(".pagenum_box"+(focus+1)).css({
    'background-color':'red'
  })
  nowpagenum=focus;
  if (event.keyCode == '37') {
    left();
    if(imglistnum!=0){nowlistnum=imglistnum-1;}
  }
  else if (event.keyCode == '39') {
    right();
  if(nowlistnum<imglist.length){nowlistnum=imglistnum+1;}
} else if (event.keyCode == '13') {
  sizesw=!sizesw;
  if(sizesw){
    $('.open_github').hide();
    $('.slide_section').attr('class','slide_section2')
    $('.slide_div').attr('class','slide_div2');
    $('.slide_img').attr('class','slide_img2');
    $('.default_h1').attr('class','default2_h1');
    } else{
          $('.open_github').hide();
          $('.slide_section2').attr('class','slide_section');
          $('.slide_div2').attr('class','slide_div');
          $('.slide_img2').attr('class','slide_img');
          $('.default2_h1').attr('class','default_h1');
        }
    $('#left').toggle();
    $('#right').toggle();

    $('.console-div').toggle();
    $('.return_div').toggle();
    $('.list').toggle();

}

  $('.list_span').children().css({
    'color':'snow'
  })
  $('.list_span').css({
    'background-color':'#363636',
    'opacity':'0.7'
  })
  select_light();

});

/*슬라이드 버튼 클릭*/
$(document).on("click","#left",function(event){
  $('.page'+nowpagenum).hide();
  focus=parseInt(nowlistnum/8);
  $('.page'+focus).show();
  $(".pagenum").parent().css({
    'background-color':'#002266'
  })
  $(".pagenum_box"+(focus+1)).css({
    'background-color':'red'
  })
  nowpagenum=focus;

  left();

  if(imglistnum!=0){nowlistnum=imglistnum-1;}
  $('.list_span').children().css({
    'color':'snow'
  })
  $('.list_span').css({
    'background-color':'#363636',
    'opacity':'0.7'
  })
  select_light();

});
$(document).on("click","#right",function(event){
  $('.page'+nowpagenum).hide();
  focus=parseInt(nowlistnum/8);
  $('.page'+focus).show();
  $(".pagenum").parent().css({
    'background-color':'#002266'
  })
  $(".pagenum_box"+(focus+1)).css({
    'background-color':'red'
  })
  nowpagenum=focus;
  right();
  if(nowlistnum<imglist.length){nowlistnum=imglistnum+1;}

  $('.list_span').children().css({
    'color':'snow'
  })
  $('.list_span').css({
    'background-color':'#363636',
    'opacity':'0.7'
  })
  select_light();

});

/*마우스오버 아웃 css*/
$(document).on("mouseover",".list_span",function(event){
  $(this).children().css({
    'color':'#FFFFFF'

  })
  $(this).css({
    'background-color':'#484848',
    'opacity':'1'
  })
  $(this).mouseout(function(){
    if(imglistnum!=Number($(this).children().attr('value')))
    {
    $(this).children().css({
      'color':'snow'
    })
    $(this).css({
      'background-color':'#363636',
      'opacity':'0.7'
    })
  }
  });

});
$(document).on("mouseover",".pagenum",function(event){
$(this).css({
'color':'orange',
})
$(this).mouseout(function(){
$(this).css({
  'color':'snow'
})
})
});
$(document).on("mouseover",".forder_span",function(event){
$(this).css({
'color':'orange',
})
$(this).mouseout(function(){
$(this).css({
  'color':'snow'
})
})
});
$(document).on("mouseover",".return_a",function(event){
$(this).css({
'color':'orange',
})

$(this).mouseout(function(){
$(this).css({
  'color':'snow'
})
})
});

$(document).on("mouseover","#left",function(event){
$(this).css({
'color':'orange',
})
$(this).mouseout(function(){
$(this).css({
  'color':'black'
})
})
});
$(document).on("mouseover","#right",function(event){
$(this).css({
'color':'orange',
})
$(this).mouseout(function(){
$(this).css({
  'color':'black'
})
})
});

$(document).on("mouseover",".forder_back",function(event){
$(this).css({
'color':'orange',
})
$(this).mouseout(function(){
$(this).css({
  'color':'snow'
})
})
});


/*글자 타이핑 */
// function([string1, string2],target id,[color1,color2])
 consoleText([tagval,'Project','PPT'], 'text',['Crimson','AntiqueWhite','lightblue','Goldenrod']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}
