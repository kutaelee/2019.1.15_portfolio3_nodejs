var list=new Array();
var color=new Array('#EAEAEA','#FFB2D9','#D1B2FF','#B2CCFF','#B2EBF4','#CEF279','#FFE08C','#FFA7A7');
var lastnum=0;
var i=0;
var j=0;

/* 방명록 토글함수  */
function toggle(){
  $('#visit'+i).show("slide");
}

$(document).ready(function(){
 
/* 방명록 텍스트 통신 */
  $.ajax({
  url:"/visit/text",
  type:"post",
  dataType:"json",
  success:function(result){
    list=(result);
    var x=list.length;
    lastnum=list[0].id;
    while(i<list.length)
    {
      var random = Math.floor(Math.random() * 8);
      /* 받아온 글을 역순으로 붙여넣고 배경색은 랜덤값 */
    $('.visit_text').append('<span id=visit'+x+' style="display:none;background-color:'+color[random]+'"><p>'+list[i].regdate+'<p/>'+list[i].text+'</span>');
    i++;
    x--;
    }

    i=0;
    /* 0.3초마다 토글시킴 애니메이션 효과*/
    setInterval(function(){
      if(i<=list.length)
      {
        toggle();
      }
      i++;
    }, 100);
    },error:function(request,status,error){
      alert("code = "+ request.status + " message = " + request.responseText + " error = " + error);
    }
    })
    /* 전송할 텍스트 글자수 제한 */
    $(document).on('keyup','#textarea',function(){
      var maxLength=$(this).attr('maxlength'); 
      if ($(this).val().length > maxLength-1) {  
        $(this).html($(this).val().substring(0, maxLength));
        $.when(alert_call("글자 수는 최대 400자 입니다!")).done(()=>{
          alert_none();
        }) 
      }  
    });
  /* 전송버튼 기능 */
    $('.visit_span').click(function(){
      if(document.getElementById('textarea').value!="" && document.getElementById('textarea').value.length!=0){

        var params=$('#textarea').serialize();
      $.ajax({
        url:"/visit/submit",
        data:params,
        type:"post",
        dataType:"json",
        success:function(){
          $('#textarea').val("");
        },error:function(request,status,error){
          $.when(alert_call(request.responseText)).done(()=>{
            alert_none();
          })
        }
      })
    }else{
      $.when(alert_call("내용을 입력해주세요")).done(()=>{
        alert_none();
      })
    }
    });

/* 실시간으로 db 불러오는 기능 */
      setInterval(function(){
        $.ajax({
          url:"/visit/search",
          type:"post",
          dataType:"json",
          success:function(data){
            if(lastnum!=data[0].id)
            {
              lastnum++;
              var result = Math.floor(Math.random() * 8);
              $.ajax({
                url:"/visit/reroad",
                type:"post",
                data:{"id":lastnum},
                dataType:"json",
                success:function(data2){

                  $('.visit_text').prepend('<span id='+lastnum+' style="display:none;background-color:'+color[result]+'"><p>'+data2[0].regdate+'<p/>'+data2[0].text+'</span>');
                  $('#'+lastnum).show('slide');

                },error:function(request,status,error){
                  alert("code = "+ request.status + " message = " + request.responseText + " error = " + error);
                }
              });
            }
          }
        });
      },3000);
});
