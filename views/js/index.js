
/*index js*/
var forder="";
var tagval="";
$(document).ready(function(){
$(".other_nav").hide();

  /* mouse over*/
  $(".other_nav_bar").mouseover(function(){
    $(".other_nav_bar").css({
      'opacity':'1'
    })
  });
  $(".other_nav a").mouseover(function(){
    $(this).css({
      'color':'snow'
    })

  });
  $(".section1 a").mouseover(function(){
    $(this).stop().animate({
      'font-size':'70px',

    },'fast');

      $(".section1 a").css({
      'color': 'transparent',
      'text-shadow': '0 0 5px rgba(0,0,0,0.5)'
    })

    $(this).css({
        'color':'snow',
        'background-color':'#FF24A3',
        'box-shadow': '0px 0px 20px #FFFFFF'
     })
  });
  /*mouse out*/
  $(".other_nav_bar").mouseout(function(){
    $(".other_nav_bar").css({
      'opacity':'0.8'
    })
  });
  $(".other_nav a").mouseout(function(){
    $(this).css({
      'color':'orange'
    })
  });
  $(".section1 a").mouseout(function(){
    $(".section1 a").css({
        'color':'snow',
    });
    $(this).stop().animate({
      'font-size':'38px'
    },'fast');
    $(this).css({
      'background':'none',
    })
    var tag=$(this);
    setTimeout(function(){
      $(tag).css({
        'box-shadow': 'none'
      });
    },100);
  });
var swt=true;
  /*mosue click*/
  $(".other_nav_bar").click(function(){
        $(".other_nav").slideToggle('slow');
        swt=!swt;
        if(!swt){
        $(".other_nav_span").css({
          'border-bottom':'1px solid white'
        });
      }else{
        $(".other_nav_span").css({
          'border-bottom':'none'
        });
      }
  });

  $(".section1 a").stop().click(function(){
    tagval=$(this).prop("class");
    $(".section1 a").stop().animate({
        'display':'none'
    },'fast');
    $('.container').toggle();
    $.ajax({
      url:"/"+tagval,
      type:"post",
      datatype:"text/html",
      success:function(result){
        $('.container').html(result);
        $('.container').slideToggle("slow");
      }
    });

});
});
