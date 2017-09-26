
var access_token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDY0NTM5MTUsInVzZXJfbmFtZSI6Im1nYXBwaWQwMXxmcmFuazQ1NiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiMjY5NTVmNzQtYjY0Ni00MDE0LWI2NmMtMDg5OWI1N2NmYWVjIiwiY2xpZW50X2lkIjoid2ViX2FwcCIsInNjb3BlIjpbIm9wZW5pZCJdfQ.IBpquHuVervqlIvFQlPVD5tylhU_MpuNuhJo0LzrXJ7BjOnD5BslVWLBeYVVVv0z2Vbc_fODtP_KXo-gbc8l3WGRxrgC36Xn2ovpZ6Q-nN8rYXIz3lKh_0TpVv2H_fUTRXdiclf3wZ-OrYXRNgQDcZNmO045ug2LgKMCthtRuExdrVNkqCn-NshcacxD_stB7DgFqtdMshg5shNTX2MOeLwoJW8g2CtBs9sIvzFLrnw7HF34BYz7A7AaFdEZFXxSMaOK0ugZbojDxUJuLp4oRGQ7R4jw61SRVXz5ZjCqwSr6D3z9GyOdA4udNhMU-IxNxE9WWDB6ddyy7APqwk2EzQ";

var ajaxurl = {
    forseti: 'http://192.168.0.225:8088/forseti/' ,
    uaa: 'http://192.168.0.225:8088/uaa/',
    // param:'?access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDY0NTM5MTUsInVzZXJfbmFtZSI6Im1nYXBwaWQwMXxmcmFuazQ1NiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiMjY5NTVmNzQtYjY0Ni00MDE0LWI2NmMtMDg5OWI1N2NmYWVjIiwiY2xpZW50X2lkIjoid2ViX2FwcCIsInNjb3BlIjpbIm9wZW5pZCJdfQ.IBpquHuVervqlIvFQlPVD5tylhU_MpuNuhJo0LzrXJ7BjOnD5BslVWLBeYVVVv0z2Vbc_fODtP_KXo-gbc8l3WGRxrgC36Xn2ovpZ6Q-nN8rYXIz3lKh_0TpVv2H_fUTRXdiclf3wZ-OrYXRNgQDcZNmO045ug2LgKMCthtRuExdrVNkqCn-NshcacxD_stB7DgFqtdMshg5shNTX2MOeLwoJW8g2CtBs9sIvzFLrnw7HF34BYz7A7AaFdEZFXxSMaOK0ugZbojDxUJuLp4oRGQ7R4jw61SRVXz5ZjCqwSr6D3z9GyOdA4udNhMU-IxNxE9WWDB6ddyy7APqwk2EzQ',
}

var now_pcode  ; // 当前期数


/**
 * ajax 全局配置
 */

/*$.ajaxSetup({
    dataType: 'json',
    crossDomain: true,
    headers: {
       Authorization: "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDY0MzkwODksInVzZXJfbmFtZSI6Im1nYXBwaWQwMXxmcmFuazQ1NiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiMzUzMzNjNjAtNDQ5Yy00NmRlLWEyM2YtYzlmYzBkODc5N2ZlIiwiY2xpZW50X2lkIjoid2ViX2FwcCIsInNjb3BlIjpbIm9wZW5pZCJdfQ.mM75z-_vv_8G5UvJu6lPHgjZyADEa0djCzsuv"
    // mauth: "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDY0MzkwODksInVzZXJfbmFtZSI6Im1nYXBwaWQwMXxmcmFuazQ1NiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiMzUzMzNjNjAtNDQ5Yy00NmRlLWEyM2YtYzlmYzBkODc5N2ZlIiwiY2xpZW50X2lkIjoid2ViX2FwcCIsInNjb3BlIjpbIm9wZW5pZCJdfQ.mM75z-_vv_8G5UvJu6lPHgjZyADEa0djCzsuv"
    },
    beforeSend: function(xhr, setting){
        console.log(xhr);
    },
    error: function(){
        console.log('错误');
    }
});*/




$(function(){

    gamePlay() ;
    shopCar() ;
    helpChoose() ;
    getLotterys() ; // 获取彩种
    getPlayTree(1) ;  // 玩法
    priodDataNewly(1) ; // 最近5期开奖

   // 最新开奖期数
    function priodDataNewly(gameid) {
        $.ajax({
            type: 'get',
            headers: {
                "Authorization": "bearer  "+access_token,
            },
            url : ajaxurl.forseti+'api/priodDataNewly' ,
            data: { lotteryId:gameid ,} ,
            success: function(res){
                now_pcode = res.data[1].pcode ;

            },
            error: function() {

            }
        });
    }
    var riable=0;
    // 玩法菜单选择
    function gamePlay() {
        $(".nfdprize_text").click(function(){
            if(riable==0){
                riable=1;
                $(".m-lott-methodBox .nfdprize_text b").addClass('cur')
            }else{
                riable =0;
                $(".m-lott-methodBox .nfdprize_text b").removeClass('cur')
            }
            $(".m-lott-methodBox-list").toggle();
        });
        $('.ui_playlist_cover').click(function(){
            $(".nfdprize_text").click();
        })
    }

// 购物车动画
    function shopCar() {
        $('#ui_cart').on('click',function(){
            $('#ui_bet').stop(true,true).animate({left: 0},300,function(){
                $('#body').addClass('bet_cart');

            });
        })
        $('#bet_back').on('click',function(){
            $('#body').removeClass('bet_cart');

            $('#ui_bet').stop(true,true).animate({left: '100%'},300);
        });

    }
// 助手选单
    function helpChoose() {
        $('.ui_help').on('click','.ui_btn_help',function(){
            $(this).parent('.ui_help').find('ul').stop().fadeIn(200);
            $(this).append('<div class="ui_cover"></div>');
            $('.ui_help').find('ul').on('click',function(){
                $('.ui_cover').remove();
                $(this).hide();
            });
            $('.ui_cover').on('click',function(){
                $('.ui_cover').remove();
                $('.ui_help').find('ul').hide();
            })
        });
    }

    // 获取彩种
    function getLotterys() {
        /*  $.getJSON( ajaxurl.forseti+'apis/lotterys', function(res) {

         })*/
        $.ajax({
            type: 'GET',
            url : ajaxurl.forseti+'apis/lotterys',
            data: {} ,
            dataType:'json',
            success: function(res){
                var allstr ='' ;  // 全部彩种
                var hotstr ='' ;  // 热门彩种

                $.each(res.data,function (i,v) { // 通过 v.cid 跳转到每个彩种
                    allstr +='<a href="javascript:;">'+
                        '<div class="menu_logo"><img src="'+v.imgUrl+'"></div>'+
                        ' <div class="menu_name">'+
                        ' <h2>'+v.name+'</h2>'+
                        ' <span>'+v.periodDesc+'</span>'+
                        '</div> </a>' ;
                    if(v.ifHot == '1'){
                        hotstr +='<a href="javascript:;">'+
                            '<div class="menu_logo"><img src="'+v.imgUrl+'"></div>'+
                            ' <div class="menu_name">'+
                            ' <h2>'+v.name+'</h2>'+
                            ' <span>'+v.periodDesc+'</span>'+
                            '</div> </a>' ;
                    }

                });

                $('.game-hot').html(hotstr) ;
                $('.game-all').html(allstr) ;

            },
            error: function() {

            }
        });
    }

// 玩法树
    function getPlayTree(gameid) {
        $.ajax({
            type: 'get',
            headers: {
                "Authorization": "bearer  "+access_token,
            },
            url : ajaxurl.forseti+'api/playsTree' ,
            data: { lotteryId:gameid} ,
            success: function(res){

            },
            error: function() {

            }
        });
    }





}())


