/* 버튼 hover css 함수 */
function writemosueover(id){
  $(id).css({
    'background-color':'orange',
    'color':'snow'
  });
}
function writemosueout(id){
  $(id).css({
    'background-color':'#FFC61A',
    'color':'snow'
  });
}

/* 버튼 hover css 기능 */
$(".back_btn").mouseover(function(){
  writemosueover(".back_btn");
  $(this).mouseout(function(){
    writemosueout(".back_btn");
  });
});

$(".submit_btn").mouseover(function(){
  writemosueover(".submit_btn");
  $(this).mouseout(function(){
    writemosueout(".submit_btn");
    });
});

/* 뒤로가기 버튼 기능 */
$('.back_btn').click(function(){
  $('.content h3').show();
  $.ajax({
  url:"/project/pageload",
  type:"post",
  data:{'data':cur_project_page},
  datatype:"text/html",
  success:function(result){
    projectload(result);
    $('.content_div').show("fast");
    $('.page_btn').toggle();
    $.when(alert_call("글쓰기 취소!")).done(()=>{
      alert_none();
    })
  },error:function(request,status,error){
    alert("code = "+ request.status + " message = " + request.responseText + " error = " + error);
  }
    })
})



 

$(document).ready(function(){
  /* 프로젝트 명 검증 */
  // 아작스로 이미 있는 프로젝트명인지 검사 후 전송 
 $('#project_name').change(function(){
   var title=$('#project_name').val();
   $.ajax({
     url:'project/select',
     type:'post',
     data:{'title':title},
     datatype:'text/html',
     success:function(result){
      if(result!="없음"){
        $(".check_a").text("프로젝트명이 이미 있습니다.");
        $('.submit_btn').attr('disabled','true');
      }else{
        $(".check_a").text("");
        $('.submit_btn').removeAttr('disabled','false');
      }
     },error:function(request,status,error){
      alert("code = "+ request.status + " message = " + request.responseText + " error = " + error);
    }
   })
 })



 // 프로젝트 명이 폴더이름으로 저장되기때문에 특수문자 금지
 $("#project_name").bind("keyup",function(){
  re = /[~!@\#$%^&*\()\-=+_'<>]/gi; 
  var temp=$("#project_name").val();
  if(re.test(temp)){ //특수문자가 포함되면 삭제하여 값으로 다시셋팅
  $("#project_name").val(temp.replace(re,""));
  $(".check_a").text("프로젝트명은 특수문자를 포함할 수 없습니다");
 }
});


 /* 글전송 시 값 검증 */
 $('.submit_btn').click(function(){

  if($('#img').val()=="")
  {
    $.when(alert_call("적어도 한개의 이미지를 첨부하셔야 합니다.")).done(()=>{
      alert_none();
    })
  }else if($('#project_name').val()==""){
    $.when(alert_call("프로젝트 제목을 입력해주세요!")).done(()=>{
      alert_none();
    })
  }else if($('#project_lang').val()==""){
    $.when(alert_call("사용언어를 입력해주세요!")).done(()=>{
      alert_none();
    })
  } else if($('#project_date').val()==""){
    $.when(alert_call("기간을 입력해주세요!")).done(()=>{
      alert_none();
    })
  }
  else{
    // 에디터의 내용이 textarea에 적용된다.
    oEditors.getById["ir1"].exec("UPDATE_CONTENTS_FIELD", []);

    // 에디터의 내용에 대한 값 검증은 이곳에서
    // document.getElementById("ir1").value를 이용해서 처리한다.
        $("#write_form").submit();
  }
    
 })

 /* 글 수정 기능 */
 $('.update_btn').click(function(){

  if($('#img').val()=="")
  {
    $.when(alert_call("적어도 한개의 이미지를 첨부하셔야 합니다.")).done(()=>{
      alert_none();
    })
  }else if($('#project_name').val()==""){
    $.when(alert_call("프로젝트 제목을 입력해주세요!")).done(()=>{
      alert_none();
    })
  }else if($('#project_lang').val()==""){
    $.when(alert_call("사용언어를 입력해주세요!")).done(()=>{
      alert_none();
    })
  } else if($('#project_date').val()==""){
    $.when(alert_call("기간을 입력해주세요!")).done(()=>{
      alert_none();
    })
  }
  else{
    // 에디터의 내용이 textarea에 적용된다.
    oEditors.getById["ir1"].exec("UPDATE_CONTENTS_FIELD", []);
    $.ajax({
      url:'/project/deletefiles',
      type:'post',
      data:{'cur_title':cur_project_title,'id':writer},
      success:function(result){
        var inputtitle = $("<input>").attr("name","cur_title").val(cur_project_title);
        $("#write_form").append(inputtitle).submit();
      },error:function(request,status,error){
        alert("code = "+ request.status + " message = " + request.responseText + " error = " + error);
      }
    })      
  }
 })
});
