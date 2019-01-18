$(document).ready(function(){
    $('.car').click(function(){
        $('.car').css({
            'margin-left':'-12%',
            'transition':'3s'
        })
        $('.taxi_stop h4').text("Good Bye!");
        setInterval(function(){
            window.location.href="/";
        },3500);
    });
    
});
