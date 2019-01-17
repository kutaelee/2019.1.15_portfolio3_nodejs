
/* 스킬창 열고 닫기 기능 */
$('.profile_skills_btn').click(function(){
      $('.profile_skills').fadeIn();
  $('.profile_skills').css({
    'transform':'translateX(0)',
    'transition':'1.5s'
  })
  
});
$('.profile_close_btn').click(function(){
  if('smartphone'==$('body').prop('class'))
  {
    setTimeout(function(){
      $('.profile_skills').hide();
    },1500)
     
  }
  $('.profile_skills').css({
    'transform':'translateX(110%)',
    'transition':'1.5s'
  })
});
/*스킬창 닫기 버튼 css  */
$('.profile_close_btn').mouseover(function(){
  $(this).css({
    'color':'FFD117'
  })
  $(this).mouseout(function(){
    $(this).css({
      'color':'snow'
    })
  })
});

