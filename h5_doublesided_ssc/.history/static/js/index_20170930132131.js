window.onload = function () {
    initViewHeight()
    initKuang()
    initNavChoice()
    initChoiceObj()
    initLeftViewEve()
    initRightViewEve()
    initPopEve()
    initPopWafa()
    initPopFengpan01()
    initPopFengpan02()
    initPop01()
    initTipPop01()
    initTipPop02()
    initTipPop03()
    initTipPop04()
    initTipPop05()
    initTipPop06()

}

//此方法在盘面数据加载完成后调用
function initKuang() {

    $(".so-con-right div div p").each(function (i, t) {
        if ($(t).find('span')[0].innerText.length < 3) {
            var className = $(t).attr('class');
            $(t).attr('class', 'so-con-span-short ' + className);
        }
        $(t).show()
    })
}

// 此方法用来初始化页面高度
function initViewHeight() {
    var viewHeight = $(window).height();
    var topHeight = $(".so-in-top").height();
    var mainHeight = $(".so-in-main").height();
    var rightConHeight = 0;
    rightConHeight = viewHeight - topHeight - mainHeight;
    $(".so-con-right").height(rightConHeight + "px");
    //左边菜单玩法框高度初始化
    var leftTopHeight = $(".so-l-c-top").height();
    $(".so-l-c-con").height((viewHeight - leftTopHeight) + "px")
}

//此方法用来控制点击左边nav切换盘面
function initNavChoice() {
    $(".so-con-left li").each(function (i, t) {
        $(t).click(function () {
            $(".so-con-right > div").hide();
            $(".so-con-left li").attr("class", "")
            $(this).attr("class", "active")
            $("#so-item" + i).show();
        })
    })
}

//此方法用来控制盘面选择,更新盘面信息后应该重新调用一次
function initChoiceObj() {
    $(".so-con-right p").each(function (i, t) {
        $(t).click(function () {
            var className = $(this).attr("class") || ""
            if (className.indexOf("active") >= 0) {
                $(this).attr("class", className.replace("active", ""))
            } else {
                $(this).attr("class", className + " active")
            }
        })
    })
}

//此方法用来初始化左侧边栏的呼出和关闭的点击事件
function initLeftViewEve() {
    $(".so-left-close").click(function () {
        var className = $(".so-left").attr("class") || ""
        $(".so-left").attr("class", className.replace("active", "close"))
        $(".so-shade").hide()
    })
    $(".so-menu").click(function () {
        var className = $(".so-left").attr("class") || ""
        if (className.indexOf("close") >= 0) {
            $(".so-left").attr("class", className.replace("close", "active"))
        } else {
            $(".so-left").attr("class", className + " active")
        }
        $(".so-shade").show()
    })
}

//此方法用来初始化右菜单的呼出和关闭的点击事件
function initRightViewEve() {
    $(".so-right").click(function () {
        var className = $(".so-right").attr("class") || ""
        $(".so-right > div:last-child > div").slideToggle(500, function () {
            $(".so-right").attr("class", className.replace("active", "close"))
            $(".so-shade").hide()
        })
    })
    $(".so-top-zoushi").click(function () {
        var className = $(".so-right").attr("class") || ""
        if (className.indexOf("close") >= 0) {
            $(".so-right").attr("class", className.replace("close", "active"))
        } else {
            $(".so-right").attr("class", className + " active")
        }
        $(".so-shade").show()
        $(".so-right > div:last-child > div").slideToggle(500, function () {
        })
    })
}

//此方法弹出结算框
function initPopEve() {
    $(".so-add").click(function () {
        $(".so-pop").toggle()
        $(".so-shade").toggle()
    })
    $(".so-pop a").click(function () {
        $(".so-pop").toggle()
        $(".so-shade").toggle()
    })
}
//此方法弹出遊戲說明
function initPopWafa() {
    $(".play").click(function () {
        $(".so-pop-wanfa").toggle()
        $(".so-shade").toggle()
    })
    $(".so-pop-wanfa a").click(function () {
        $(".so-pop-wanfa").toggle()
        $(".so-shade").hide()
    })
}

//demo dialog
//本彩种暂停销售
function initPop01() {
    $(".so-pop-01-click").click(function () {
        $(".so-pop-01").toggle()
        $(".so-shade").toggle()
    })
    $(".so-pop-01 a").click(function () {
        $(".so-pop-01").toggle()
        $(".so-shade").toggle()
    })
}
//投注项目未符合最低条件
function initPopFengpan01() {
    $(".so-fengpan-pop-01-click").click(function () {
        $(".so-fengpan-pop-01").toggle()
        $(".so-shade").toggle()
    })
    $(".so-fengpan-pop-01").click(function () {
        $(".so-fengpan-pop-01").toggle()
        $(".so-shade").toggle()
    })
}
//投注项目超过规定数量
function initPopFengpan02() {
    $(".so-fengpan-pop-02-click").click(function () {
        $(".so-fengpan-pop-02").toggle()
        $(".so-shade").toggle()
    })
    $(".so-fengpan-pop-02").click(function () {
        $(".so-fengpan-pop-02").toggle()
        $(".so-shade").toggle()
    })
}

//此期已封盘
function initTipPop01() {
    $(".so-tip-pop-01-click").click(function () {
        $(".so-tip-pop-01").toggle()
        $(".so-shade").toggle()
    })
    $(".so-tip-pop-01").click(function () {
        $(".so-tip-pop-01").toggle()
        $(".so-shade").toggle()
    })
}
//余额不足
function initTipPop02() {
    $(".so-tip-pop-02-click").click(function () {
        $(".so-tip-pop-02").toggle()
        $(".so-shade").toggle()
    })
    $(".so-tip-pop-02").click(function () {
        $(".so-tip-pop-02").toggle()
        $(".so-shade").toggle()
    })
}
//请选择投注项目
function initTipPop03() {
    $(".so-tip-pop-03-click").click(function () {
        $(".so-tip-pop-03").toggle()
        $(".so-shade").toggle()
    })
    $(".so-tip-pop-03").click(function () {
        $(".so-tip-pop-03").toggle()
        $(".so-shade").toggle()
    })
}