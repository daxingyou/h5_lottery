window.onload = function () {
    initViewHeight()
    initKuang()
    initNavChang()
}

/**
 此方法在盘面数据加载完成后调用
 */
function initKuang() {

    $(".so-con-right div div p").each(function (i, t) {
        if ($(t).find('span')[0].innerText.length < 3) {
            var className = $(t).attr('class');
            $(t).attr('class', 'so-con-span-short ' + className);
        }
        $(t).show()
    })
}

/**
 * 此方法用来初始化页面高度
 */
function initViewHeight() {
    var viewHeight = $(window).height();
    var topHeight = $(".so-in-top").height();
    var mainHeight = $(".so-in-main").height();
    var rightConHeight = 0;
    rightConHeight = viewHeight - topHeight - mainHeight;
    $(".so-con-right").height(rightConHeight + "px");
}

/**
 * 此方法用来控制点击左边nav切换盘面
 */
function initNavChang() {
    $(".so-con-left li").each(function (i, t) {
        $(t).click(function () {
            $(".so-con-right > div").hide();
            $(".so-con-left li").attr("class", "")
            $(this).attr("class", "active")
            $("#so-item" + i).show();
        })
    })
}