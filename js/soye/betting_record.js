access_token = getCookie('access_token'); // 取token
var membalance = getCookie('membalance');


var nowDate = new Date();
var seadata = {
    page: 1, // 页数，从1开始
    pageSize: 10, // 每页行数
    searchType: 1, // 查询类型，1为投注记录查询，2为追号查询
    statusType: 1, // 状态：1全部，2未开奖，3已中奖，4未中奖,81异常处理中
    lotteryId: getCookie('lt_lottid'), // 彩种ID
    pdate: '' + (nowDate.getYear() + 1900) + (nowDate.getMonth() + 1) + nowDate.getDate(),
};


initView();

function initView() {
    $('.tab_content').html('');
    var nowDate = new Date();
    var restr = '';
    for (var i = 0; i < 3; i++) {
        pdate = '' + (nowDate.getMonth() + 1) + '月' + nowDate.getDate() + '日';
        restr += '<li class="slide_toggle bet_day new_bet_day" data-val="' + (nowDate.getYear() + 1900) + (nowDate.getMonth() + 1) + nowDate.getDate() + '">' +
            '<div class="panel_title"> <strong class="title-data">' + pdate + '</strong><span></span> </div>' +
            '<ul class="panel bet-recode-all"></ul></li>';
        nowDate.setDate(nowDate.getDate() - 1);
    }
    $('.tab_content')
        .append(restr);
    $('.new_bet_day').on('click', function () {
        seadata.pdate = $(this).data('val');
        getBetRecord();
    });
}

function getBetRecord() {
    $.ajax({
        type: 'post',
        headers: {
            'Authorization': 'bearer ' + access_token,
        },
        dataType: 'json',
        contentType: 'application/json; charset=utf-8', // json格式传给后端
        url: action.forseti + 'api/orders/orderList',
        data: JSON.stringify(seadata), // json格式
        success: function (res) {
            $('.so-zzjz').hide();
            var data = res.data.rows;
            console.log(seadata.pdate + '[' + seadata.page + ']');
            $('.new_bet_day').each(function (i, t) {
                $.each(data, function (j, v) {
                    if ($(t).data('val') === v.pdate) {
                        var jsonStr = '';
                        var li_html = '';
                        if (seadata.searchType === 1) {
                            jsonStr = encodeURI('betting_record_dt01.html?data=' + JSON.stringify(v));
                            li_html = '<li class="bet_data" data-status="not_open">' +
                                '<a href="' + jsonStr + '">' +
                                '<div class="badge ssc_badge"></div>' +
                                '<div class="lottery_t ssc">' +
                                '<p>' + v.lotteryName + ' - <span>' + v.playName + '</span></p> <strong>' + roundAmt(v.betAmount) + '</strong> </div>' +
                                '<div class="status status0"' + v.orderStatus + '>' +
                                '<span>' + v.orderStatusName + '</span><div>' + v.pcode + '期</div></div></a></li>';
                        } else {
                            jsonStr = encodeURI('trace_record_dt01.html?data=' + JSON.stringify(v));
                            li_html += '<li class="bet_data" data-status="not_open">' +
                                '<a href="' + jsonStr + '">' +
                                '<div class="badge ssc_badge"></div>' +
                                '<div class="lottery_t ssc">' +
                                '<p>' + v.lotteryName + ' - <span>' + v.playName + '</span></p> <strong>' + roundAmt(v.betAmount) + '</strong> </div>' +
                                '<div class="status status0"' + v.orderStatus + '>' +
                                '<span>' + v.chaseStatusName + '</span>' +
                                '<div>' + v.pcode + '期</div></div></a></li>';
                        }

                        /*
                         注单状态OrderStatus
                         bet_success(1, "等待开奖"),
                         prize_no_win(31, "未中奖"),
                         prize_win(32, "已派彩"),
                         withdrawals(4, "用户撤单"),
                         system_withdrawals(5, "系统撤单"),
                         prize_win_stop_chase(6, "中奖停追"),
                         exception(71, "存在异常"),
                         exception_deal(81, "异常处理中");
                         chaseStatusName
                         追号状态
                         追号详情：进行中，已完成，已取消
                         追号记录：进行中，已终止，已结束
                         */
                        if (seadata.statusType === 1) {
                            $(t).find('ul')
                                .append(li_html);
                        } else if (v.orderStatus === 1 && seadata.statusType === 2) {
                            $(t).find('ul')
                                .append(li_html);
                        } else if (v.orderStatus === 32 && seadata.statusType === 3) {
                            $(t).find('ul')
                                .append(li_html);
                        } else if (v.orderStatus === 31 && seadata.statusType === 4) {
                            $(t).find('ul')
                                .append(li_html);
                        }
                    }
                });
            });
            seadata.page++;
        },
        error: function () {

        },
    });
}


$('.so-membalance')
    .html(membalance);
var membalance = getCookie('membalance');
$('.so-user')
    .html(membalance);
TouchSlide({
    slideCell: '#betting_record',
});
TouchSlide({
    slideCell: '#trace_record',
});
// 菜单处理
var index = 0;
$('#tabs .item')
    .on('click', function () {
        $(this)
            .addClass('active')
            .siblings()
            .removeClass('active');

        index = $(this)
            .index();
        if (index == 1) {
            seadata.searchType = 2;
            seadata.page = 1;// 页数，从1开始
            restr = '';// 网页html缓存
        } else {
            seadata.searchType = 1;
            seadata.page = 1;// 页数，从1开始
            restr = '';// 网页html缓存

        }
        $('.tab_content')
            .html('')
            .ready(function () {
                initView(); // 投注记录
            });
        $('.tab_container')
            .eq(index)
            .stop(true, true)
            .fadeIn()
            .siblings()
            .stop(true, true)
            .fadeOut();
    })
    .eq(index)
    .click();

$('.tempWrap')
    .on('click', '.slide_toggle', function () {
        $(this)
            .find('.panel')
            .stop(true, true)
            .slideToggle(200);
        $(this)
            .toggleClass('active')
            .siblings()
            .removeClass('active')
            .find('.panel')
            .stop(true, true)
            .slideUp(200);
    });
//  $('.tab_content .slide_toggle:first-child').click();

$('.recode-tab')
    .on('click', 'a', function () {
        var val = $(this)
            .data('val');
        seadata.statusType = parseInt($(this).data('val'), 10);
        seadata.page = 1;// 页数，从1开始
        restr = '';// 网页html缓存
        $('.tab_content')
            .html('')
            .ready(function () {
                initView(); // 投注记录
            });
    });
$('.track-tab')
    .on('click', 'a', function () {
        var val = $(this)
            .data('val');
        seadata.statusType = parseInt($(this).data('val'), 10);
        seadata.page = 1;// 页数，从1开始
        restr = '';// 网页html缓存
        $('.tab_content')
            .html('')
            .ready(function () {
                initView(); // 投注记录
            });
    });


// 下拉加载
// var pageSize = 10;// 每页行数
// var page = 1;// 页数，从1开始
var restr = '';// 网页html缓存
var lock = 0;
var soyeScroll = new soyeScroll('.bet_data');
soyeScroll.init(function () {
    if (lock === 0) {
        lock = 1;
        $('.bet-recode-all')
            .append('<li style="margin: auto;text-align: center;height: 2rem;display: block;" class="so-zzjz">正在加载...</li>');
        if (index == 1) {
            seadata.searchType = 2;
            restr = '';
            getBetRecord(); // 投注记录
        } else {
            seadata.searchType = 1;
            restr = '';
            getBetRecord(); // 投注记录
        }
    }
});
