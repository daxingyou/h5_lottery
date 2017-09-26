
$(function(){
    var riable=0;
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



    shopCar() ;
    helpChoose() ;

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


}())
