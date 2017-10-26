// record html 
//投注紀錄的收合選單
$(function(){
    $('.slide_toggle').on('click',function(){
        $(this).find('.panel').stop(true,true).slideToggle(200);
        $(this).toggleClass('active').siblings().removeClass('active').find('.panel').stop(true,true).slideUp(200);
    });
    $('.tab_content .slide_toggle:first-child').click();
})

//只有路珠才用這個tab寫法 因為他有x軸的滑動 不適合用touchslide
$(document).ready(function(){
    $('ul.tab01 li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tab01 li').removeClass('on');
        $('#road01 .tab_content_out').removeClass('on');

        $(this).addClass('on');
        $("#"+tab_id).addClass('on');
    });
});
$(document).ready(function(){
    $('ul.tab02 li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tab02 li').removeClass('on');
        $('#road02 .tab_content_out').removeClass('on');

        $(this).addClass('on');
        $("#"+tab_id).addClass('on');
    });
});

//篩選
$( ".dropdown_icon" ).click(function() {
    $( ".dropdown" ).slideToggle( "fast", function() {
    });
    $('.so-shade').fadeToggle("fast", "linear");
});