var board_title="";
var board_id="";
var forderlist=new Array();
var i=0;
curpage=0;
/* 슬라이드 이미지 넘기는 함수 */
function left(){
  curpage--;
  $(".slide_img").html('<img src="..'+imgdir+'/'+cur_project_title+'/'+forderlist[curpage]+'">');
  $(".pagenum").text((curpage+1)+'/'+forderlist.length);
}
function right(){
  curpage++;
  $(".slide_img").html('<img src="..'+imgdir+'/'+cur_project_title+'/'+forderlist[curpage]+'">');
  $(".pagenum").text((curpage+1)+'/'+forderlist.length);
}

/* 프로젝트 게시판 로드 */
function board_load(){
  $.ajax({
    url:"/project/get",
    type:"post",
    data:{'data':select_num},
    datatype:"text/html",
    success:function(result){
      board_title=result[0].title;
      board_id=result[0].id;
      $('.board_Lang').append(result[0].lang);
      $('.board_title').append(result[0].title);
      $('.board_date').append(result[0].date);
      $('.board_text').append(result[0].text);       
      $('.content_div').show("fast");
      writer=result[0].id;
      cur_project_title=result[0].title;
    },error:function(request,status,error){
      alert("code = "+ request.status + " message = " + request.responseText + " error = " + error);
    }
      })
}
function board_reload(){
  $.ajax({
    url:"/project/pageload",
    type:"post",
    data:{'data':cur_project_page},
    datatype:"text/html",
    success:function(result){
      projectload(result);
    },error:function(request,status,error){
      alert("code = "+ request.status + " message = " + request.responseText + " error = " + error);
    }
  })
}
/* 글 삭제 */
  $('.delete_btn').click(function(){
    $.ajax({
      url:"/session/check",
      data:{'tag':'delete','board_id':board_id,'title':board_title},
      type:"post",
      success:function(result){
        if(result){
          $.when(alert_call("삭제완료!")).done(()=>{
            alert_none();
          })
              window.location.href="/";            
        }else{
          $.when(alert_call("삭제 권한이 없습니다!")).done(()=>{
            alert_none();
          })
        }
      },error:function(request,status,error){
        alert("code = "+ request.status + " message = " + request.responseText + " error = " + error);
      }
    })
  });

   /* 글 수정 */
   $('.update_btn').click(function(){
    $.ajax({
      url:"/member/check",
      type:"post",
      success:function(result){
        if(result==board_id||result=="admin"){
          $('.project_div').fadeOut();
          $('.main').show();
          $('.profile').hide();
          $('.lisence').hide();
          $('.profile_head').hide();
          $('footer').show();
          $('body').css({
            'overflow-y':'auto'
          })
          $('.content').css({
            'transform':'rotateX(0)'
          })
          var offset = $(".content_head").offset();
          $('html, body').animate({scrollTop : offset.top}, 300);
      
          $.ajax({
            url:'/modifyproject',
            type:'post',
            datatype:'text/html',
            success:function(result){
              $('.content_div').html(result);
              $('.content_div').show("fast");
              $('.page_btn').toggle();
              $.ajax({
                url:'/project/get',
                type:'post',
                data:{'data':select_num},
                datatype:'text/html',
                success:function(result){
                $('#project_name').val(result[0].title);
                $('#project_lang').val(result[0].lang);
                 $('#project_date').val(result[0].date);
                 $('#ir1').val(result[0].text); 
                 $('.page_btn').hide();
                }
              })
          
            },error:function(request,status,error){
              alert("code = "+ request.status + " message = " + request.responseText + " error = " + error);
            }
          })
        }else{
          $.when(alert_call("수정권한이 없습니다!")).done(()=>{
            alert_none();
          })
        }
      },error:function(request,status,error){
        alert("code = "+ request.status + " message = " + request.responseText + " error = " + error);
      }
    })
  });


  /*프로젝트 내용통신*/
  $(document).ready(function(){
    board_load();
})



/* 방향키 입력 슬라이드 이미지*/

// $(document).on('keydown',function(event) {
//     if (event.keyCode == '37') {
//       if(curpage>0){
//         left();
//       }else{
//       alert("첫페이지 입니다.");
//     }
// }
//   else  if (event.keyCode == '39') {
//       if(curpage!=forderlist.length-1){
//     right();
//       }else{
//     alert("끝페이지 입니다.");
//   }
// }
// });


/* 선택한 프로젝트의 슬라이드 이미지 통신 */

var imgdir="";
$.ajax({
  url:"/project/select",
  type:"post",
  data:{"title":cur_project_title},
  datatype:"json",
  success:function(result){
    if(result){
      imgdir=result[0].img+"";
      imgdir=imgdir.substring(0,5);
      $.ajax({
        url:"/project/num",
        type:"post",
        data:{"list":cur_project_title,"dir":imgdir},
        datatype:"json",
        success:function(result){
          if(result){
            forderlist=(result);
            $(".slide_img").html('<img src="..'+imgdir+'/'+cur_project_title+'/'+forderlist[0]+'">');
            $(".pagenum").text((curpage+1)+'/'+(forderlist.length));    
          }else{
            $.when(alert_call("삭제된 글입니다.")).done(()=>{
              alert_none();
            })
            board_reload();
          }
         
        },error:function(request,status,error){
          alert("code = "+ request.status + " message = " + request.responseText + " error = " + error);
        }
        });
    }else{
      $.when(alert_call("삭제된 글입니다.")).done(()=>{
        alert_none();
        board_reload();
      })
    }
 
 
  },error:function(request,status,error){
    alert("code = "+ request.status + " message = " + request.responseText + " error = " + error);
  }
})

/* 버튼 hover */
$('.project_btn_div button').mouseover(function(){
  $(this).css({
    'background':'orange'
  })

  $(this).mouseout(function(){
    $(this).css({
      'background':'#FFC61A'
    })
  })
})


/* 슬라이드 이미지 버튼 기능 */
$(".left").click(function(){
  if(curpage!=0){
    left();
  }else{
    $.when(alert_call("첫페이지 입니다.")).done(()=>{
      alert_none();
    })
  }
});

$(".right").click(function(){
  if(curpage!=forderlist.length-1){
    right();
  }else{
    $.when(alert_call("끝페이지 입니다.")).done(()=>{
      alert_none();
    })
  }
});

/*슬라이드 이미지 버튼 hover */
$(".left").mouseover(function(){
  $(this).css({
    'background':'black'
  })
  $(this).mouseout(function(){
    $(this).css({
      'background':'white'
    })
  })
});
$(".right").mouseover(function(){
  $(this).css({
    'background':'black'
  })
  $(this).mouseout(function(){
    $(this).css({
      'background':'white'
    })
  })
});

