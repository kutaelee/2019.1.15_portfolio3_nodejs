$(function () {
$('.edu').toggle();
$('.edu_btn').click(function(){
  $('.edu').slideToggle('fast');
});

$('.edu').click(function(){
  $('.edu').slideToggle('fast');
})

$('.right-menu a').click(function(){
 $(this).siblings().removeClass('active');
  $(this).addClass('active');


var tab = $(this).attr('href').replace('#','.');
$('.content>div').removeClass('open');
$(tab).addClass('open');

});


});
