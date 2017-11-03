
$(function () {
    initViewHeight();
    initKuang();
    initLeftViewEve();
    initRightViewEve();
    initPopWafa();
    initPopFengpan01();
    initPop01();
    initTipPop01();
    initTipPop02();
    initTipPop03();


    getLotterys('.all_lottery') ; // 获取彩种
    initChoiceObj() ; // 球点击处理
    betActionSubmit() ; // 表单提交
    initNavChoice() ; // 右边nav 切换处理

});



// 此方法在盘面数据加载完成后调用
function initKuang() {
    $('.so-con-right div div p').each(function (i, t) {
        if ($(t).find('span')[0].innerText.length < 3) {
            $(t).attr('class', 'so-con-span-short');
        }
        $(t).show();
    });
    // 重慶時時彩第一球 左字為一個字時
    $('.so-con-right div .first_ball p').each(function (i, t) {
        if ($(t).find('span')[0].innerText.length < 1) {
            $(t).attr('class', 'so-con-span-short');
        }
        $(t).show();
    });
    // 重慶時時彩第二球 左字為一個字時
    $('.so-con-right div .sec_ball p').each(function (i, t) {
        if ($(t).find('span')[0].innerText.length < 1) {
            $(t).attr('class', 'so-con-span-short' );
        }
        $(t).show();
    });
    $('.so-con-right div div p').each(function (i, t) {
        if ($(t).find('span')[0].innerText.length > 6) {
            $(t).attr('class', 'font-ss ');
        }
        $(t).show();
    });
    // 江西11選5 雙面
    $('.so-con-right .jc115 div div p').each(function (i, t) {
        if ($(t).find('span')[0].innerText.length < 3) {
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

//禁止遮罩层以下屏幕滑动
$(document).on("touchmove", function (e) {
    var e = e || event,
        target = e.target || e.srcElement;
    if (e.target.className.indexOf("so-shade") >= 0) { //className為弹窗的蒙层的类名
        e.preventDefault();
    }
})

// 此方法弹出遊戲說明
function initPopWafa() {
    $('.r_play').click(function () {
        $('.so-pop-wanfa').toggle();
        $('.so-shade').toggle();
    });
    $('.so-pop-wanfa a').click(function () {
        $('.so-pop-wanfa').toggle();
        $('.so-shade').hide();
    });
}

// 本彩种暂停销售
function initPop01() {
    $('.so-pop-01-click').click(function () {
        $('.so-pop-01').toggle();
        $('.so-shade').toggle();
    });
    $('.so-pop-01 a').click(function () {
        $('.so-pop-01').toggle();
        $('.so-shade').toggle();
    });
}

// 投注项目未符合最低条件
function initPopFengpan01() {
    $('.so-fengpan-pop-01-click').click(function () {
        $('.so-fengpan-pop-01').toggle();
        $('.so-shade').toggle();
    });
    $('.so-fengpan-pop-01').click(function () {
        $('.so-fengpan-pop-01').toggle();
        $('.so-shade').toggle();
    });
}

// 此期已封盘
function initTipPop01() {
    $('.so-tip-pop-01-click').click(function () {
        $('.so-tip-pop-01').toggle();
        $('.so-shade').toggle();
    });
    $('.so-tip-pop-01').click(function () {
        $('.so-tip-pop-01').toggle();
        $('.so-shade').toggle();
    });
}
// 余额不足
function initTipPop02() {
    $('.so-tip-pop-02-click').click(function () {
        $('.so-tip-pop-02').toggle();
        $('.so-shade').toggle();
    });
    $('.so-tip-pop-02').click(function () {
        $('.so-tip-pop-02').toggle();
        $('.so-shade').toggle();
    });
}
// 请选择投注项目
function initTipPop03() {
    $('.so-tip-pop-03-click').click(function () {
        $('.so-tip-pop-03').toggle();
        $('.so-shade').toggle();
    });
    $('.so-tip-pop-03').click(function () {
        $('.so-tip-pop-03').toggle();
        $('.so-shade').toggle();
    });
}

//禁止iossafari瀏覽器出現頁面雙擊放大
$('body').on('touchend',function(e) { e.preventDefault; });

//切換表格眼睛
$(function () {
    $(".eye").on("click", function () {
        $(".eye").toggleClass("active", 1000);
    });
});

