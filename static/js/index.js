window.onload = function () {
    initViewHeight();
    initKuang();
    initNavChoice();
    // initChoiceObj()
    // initLeftViewEve();   //代码已转移至UserNavigation
    // initRightViewEve();  //代码已转移至UserMenu
    // initPopEve()
    initPopWafa();
    // initPopFengpan01();
   // initPopFengpan02();
    // initPop01();
    // initTipPop01();
    // initTipPop02();
    // initTipPop03();
    // initTipPop04()
   // initTipPop05();
   // initTipPop06();
   // initBetPop01();

};

// 此方法在盘面数据加载完成后调用
function initKuang() {

    $('.so-con-right div div p').each(function (i, t) {
        if ($(t).find('span')[0].innerText.length < 3) {
           // var className = $(t).attr('class');
           // $(t).attr('class', 'so-con-span-short ' + className);
            $(t).attr('class', 'so-con-span-short');
        }
        $(t).show();
    });
    // 重慶時時彩第一球 左字為一個字時
    $('.so-con-right div .first_ball p').each(function (i, t) {
        if ($(t).find('span')[0].innerText.length < 1) {
           // var className = $(t).attr('class');
           // $(t).attr('class', 'so-con-span-short ' + className);
            $(t).attr('class', 'so-con-span-short');
        }
        $(t).show();
    });
    // 重慶時時彩第二球 左字為一個字時
    $('.so-con-right div .sec_ball p').each(function (i, t) {
        if ($(t).find('span')[0].innerText.length < 1) {
           // var className = $(t).attr('class');
           // $(t).attr('class', 'so-con-span-short ' + className);
            $(t).attr('class', 'so-con-span-short' );
        }
        $(t).show();
    });
    $('.so-con-right div div p').each(function (i, t) {
        if ($(t).find('span')[0].innerText.length > 6) {
           // var className = $(t).attr('class');
           // $(t).attr('class', 'font-ss ' + className);
            $(t).attr('class', 'font-ss ');
        }
        $(t).show();
    });
    // 江西11選5 雙面
    $('.so-con-right .jc115 div div p').each(function (i, t) {
        if ($(t).find('span')[0].innerText.length < 3) {
           // var className = $(t).attr('class');
          //  $(t).attr('class', 'so-con-span-short ' + className);
            $(t).attr('class', 'so-con-span-short');
        }
        $(t).show();
    });
}

// 此方法用来初始化页面高度
function initViewHeight() {
    var viewHeight = $(window).height();
    var topHeight = $('.so-in-top').height();
    var mainHeight = $('.so-in-main').height();
    var rightConHeight = 0;
    var leftConHeight = 0;
    rightConHeight = viewHeight - topHeight - mainHeight;
    $('.so-con-right').height(rightConHeight + 'px');
    // 六合彩左側選單高度
    leftConHeight = viewHeight - topHeight - mainHeight;
    $('.so-con-left').height(leftConHeight + 'px');
    // 左边菜单玩法框高度初始化
    var leftTopHeight = $('.so-l-c-top').height();
    $('.so-l-c-con').height((viewHeight - leftTopHeight) + 'px');
}

// 此方法用来控制点击左边nav切换盘面
function initNavChoice() {
    $('.so-con-left li').each(function (i, t) {
        $(t).click(function () {
            var hasreset = $(this).hasClass('reset_bet') ; // 江西11选5切换时，需要重置投注
           // setCookie('ifclick',hasreset) ;
            if(hasreset){
                resetAction() ;
            }
            $('.so-con-right > div').hide();
            $('.so-con-left li').removeClass('active');
            $(this).addClass('active');
            $('#so-item' + i).show();
        })
    }).eq(0).click();
    TouchSlide({
        slideCell: '#so-item2',
    });
    //PK10点击左边nav切换盘面
    $('.so-con-left li').on('click',function(){
        var i = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('#pk10-item' + i).show().siblings().hide();
    }).eq(0).click();
}

// 此方法用来控制盘面选择,更新盘面信息后应该重新调用一次
/* function initChoiceObj() {
   /!* $(".so-con-right p").each(function (i, t) {*!/

        $('.so-con-right p').click(function () {
            var className = $(this).attr("class") || ""
            if (className.indexOf("active") >= 0) {
                $(this).attr("class", className.replace("active", ""))
            } else {
                $(this).attr("class", className + " active")
            }
                var choosed =   $(".so-con-right p.active").length ;
                console.log(choosed)

        })
   /!* })*!/
}*/

// 此方法用来初始化左侧边栏的呼出和关闭的点击事件
function initLeftViewEve() {
    $('.so-left-close').click(function () {
        var className = $('.so-left').attr('class') || '';
        $('.so-left').attr('class', className.replace('active', 'close'));
        $('.so-shade').hide();// .fadeOut(2000)
    });
    $('.so-menu').click(function () {
        var className = $('.so-left').attr('class') || '';
        if (className.indexOf('close') >= 0) {
            $('.so-left').attr('class', className.replace('close', 'active'));
        } else {
            $('.so-left').attr('class', className + ' active');
        }
        $('.so-shade').show();
    });
}

// 此方法用来初始化右菜单的呼出和关闭的点击事件
function initRightViewEve() {
    $('.so-right').click(function () {
        var className = $('.so-right').attr('class') || '';
        $('.so-right > div:last-child > div').slideToggle(500, function () {
            $('.so-right').attr('class', className.replace('active', 'close'));
            $('.so-shade').hide();
        });
    });
    $('.so-top-zoushi').click(function () {
        var className = $('.so-right').attr('class') || '';
        if (className.indexOf('close') >= 0) {
            $('.so-right').attr('class', className.replace('close', 'active'));
        } else {
            $('.so-right').attr('class', className + ' active');
        }
        $('.so-shade').show();
        $('.so-right > div:last-child > div').slideToggle(500, function () {
        });
    });
}

// function initRightViewEve(){
//     $('.so-top-zoushi').on('click',function(){
//         $('.so-right').slideToggle(500);
//         $(".so-shade").show();
//     });
//     $(".so-top-zoushi").click(function(){
//         $(".so-right").off("click");
//     });
// }


// function onclick(){
//     $('.so-top-zoushi').on('click',function(){
//         $('.so-right').slideToggle(500);
//         $(".so-shade").show();
//     });
//     $(".so-top-zoushi").click(function(){
//         $(".so-right").off("click");
//     });
// }

// function initRightViewEve() {
//     $('.so-in-top').on('click', '.so-top-zoushi', function () {
//         $(this).parent('.so-in-top').find('.so-right > div:last-child > div').stop().fadeIn(200);
//         $(this).append('<div class="so-shade"></div>');
//         $('.so-in-top').find('.so-right > div:last-child > div').on('click', function () {
//             $('.so-shade').remove();
//             $(this).hide();
//         });
//         $('.so-shade').on('click', function () {
//             $('.so-shade').remove();
//             $('.so-in-top').find('.so-right > div:last-child > div').hide();
//         })
//     });
// }


// 此方法弹出结算框，len ,注单数量
/* function initPopEve() {
    $(".so-add").click(function () {
        var amount = $('.bet-amount').val() ;
        var nums = Number($('.bet-select-num').text()) ;
        if(nums<1){ // 没有选择投注项目
            $('.bet-error-content').html('请选择投注项目') ;
            $(".so-tip-pop-04").toggle() ;
            $(".so-shade").toggle() ;
            return false;
        }
        if(!amount || !isPositiveNum(amount)){ // 投注金额不正确
            $('.bet-error-content').html('请输入投注金额') ;
            $(".so-tip-pop-04").toggle() ;
            $(".so-shade").toggle() ;
            return false;
        }
        // 注单金额正确
        $(".so-pop").toggle()
        $(".so-shade").toggle()
    }) ;

    $(".so-pop a").click(function () {
        $(".so-pop").toggle()
        $(".so-shade").toggle()
    }) ;

    // 投注金额提示弹窗关闭
    $(".so-tip-pop-04").click(function () {
        $(".so-tip-pop-04").toggle()
        $(".so-shade").toggle()
    }) ;
}*/


// 此方法弹出遊戲說明
function initPopWafa() {
    $('.play').click(function () {
        $('.so-pop-wanfa').toggle();
        $('.so-shade').toggle();
    });
    $('.so-pop-wanfa a').click(function () {
        $('.so-pop-wanfa').toggle();
        $('.so-shade').hide();
    });
}

// demo dialog
// 本彩种暂停销售
// function initPop01() {
//     $('.so-pop-01-click').click(function () {
//         $('.so-pop-01').toggle();
//         $('.so-shade').toggle();
//     });
//     $('.so-pop-01 a').click(function () {
//         $('.so-pop-01').toggle();
//         $('.so-shade').toggle();
//     });
// }
// 本期投注已结束
/*function initBetPop01() {
    $('.so-bet-end-pop-click').click(function () {
        $('.so-bet-end-pop').toggle();
        $('.so-shade').toggle();
    });
    $('.so-bet-end-pop').click(function () {
        $('.so-bet-end-pop').toggle();
        $('.so-shade').toggle();
    });
}*/
// 投注项目未符合最低条件
// function initPopFengpan01() {
//     $('.so-fengpan-pop-01-click').click(function () {
//         $('.so-fengpan-pop-01').toggle();
//         $('.so-shade').toggle();
//     });
//     $('.so-fengpan-pop-01').click(function () {
//         $('.so-fengpan-pop-01').toggle();
//         $('.so-shade').toggle();
//     });
// }
// 投注项目超过规定数量
/*function initPopFengpan02() {
    $('.so-fengpan-pop-02-click').click(function () {
        $('.so-fengpan-pop-02').toggle();
        $('.so-shade').toggle();
    });
    $('.so-fengpan-pop-02').click(function () {
        $('.so-fengpan-pop-02').toggle();
        $('.so-shade').toggle();
    });
}*/

// // 此期已封盘
// function initTipPop01() {
//     $('.so-tip-pop-01-click').click(function () {
//         $('.so-tip-pop-01').toggle();
//         $('.so-shade').toggle();
//     });
//     $('.so-tip-pop-01').click(function () {
//         $('.so-tip-pop-01').toggle();
//         $('.so-shade').toggle();
//     });
// }
// // 余额不足
// function initTipPop02() {
//     $('.so-tip-pop-02-click').click(function () {
//         $('.so-tip-pop-02').toggle();
//         $('.so-shade').toggle();
//     });
//     $('.so-tip-pop-02').click(function () {
//         $('.so-tip-pop-02').toggle();
//         $('.so-shade').toggle();
//     });
// }
// // 请选择投注项目
// function initTipPop03() {
//     $('.so-tip-pop-03-click').click(function () {
//         $('.so-tip-pop-03').toggle();
//         $('.so-shade').toggle();
//     });
//     $('.so-tip-pop-03').click(function () {
//         $('.so-tip-pop-03').toggle();
//         $('.so-shade').toggle();
//     });
// }
// 请输入投注金额
/* function initTipPop04() {
    $(".so-tip-pop-04-click").click(function () {
        $(".so-tip-pop-04").toggle()
        $(".so-shade").toggle()
    })
    $(".so-tip-pop-04").click(function () {
        $(".so-tip-pop-04").toggle()
        $(".so-shade").toggle()
    })
}*/
// 下注弹窗_成功
/*function initTipPop05() {
    $('.so-tip-pop-05-click').click(function () {
        $('.so-tip-pop-05').toggle();
        $('.so-shade').toggle();
    });
    $('.so-tip-pop-05').click(function () {
        $('.so-tip-pop-05').toggle();
        $('.so-shade').toggle();
    });
}*/
// 下注弹窗_失敗
/*function initTipPop06() {
    $(".so-tip-pop-06-click").click(function () {
        $(".so-tip-pop-06").toggle()
        $(".so-shade").toggle()
    })
    $(".so-tip-pop-06").click(function () {
        $(".so-tip-pop-06").toggle()
        $(".so-shade").toggle()
    })
}*/

//禁止iossafari瀏覽器出現頁面雙擊放大
$('body').on('touchend',function(e) { e.preventDefault; });