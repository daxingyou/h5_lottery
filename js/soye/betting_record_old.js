/* eslint-disable new-cap,indent */
access_token = getCookie('access_token'); // 取token
var membalance = getCookie('membalance');
var username = getCookie('username') ;

$('.user_name').text(username) ;
var nowDate = new Date();
var seadata = {
    page: 1, // 页数，从1开始
    pageSize: 10, // 每页行数
    searchType: 1, // 查询类型，1为投注记录查询，2为追号查询
    statusType: 1, // 状态：1全部，2未开奖，3已中奖，4未中奖,81异常处理中
    lotteryId: getCookie('lt_lottid'), // 彩种ID
    pdate: '' + (nowDate.getYear() + 1900) + (nowDate.getMonth() + 1) + nowDate.getDate(),
};

// 标签切换锁
tableLock = 0;
// 投注详情
var touzhuXQ = {};
// 追号详情
var zhuihaoXQ = {};

// initView();


function initView() {
    $('.tab_content').html('');
    var nowDate = new Date();
    var restr = '';
    for (var i = 0; i < 3; i++) {
        pdate = '' + (nowDate.getMonth() + 1) + '月' + nowDate.getDate() + '日';
        var first_li = '';
        if (i === 0) {
            first_li = 'first_li';
        }
        restr += '<li class="slide_toggle bet_day new_bet_day ' + first_li + '" data-page="1" data-val="' + (nowDate.getYear() + 1900) + (nowDate.getMonth() + 1) + nowDate.getDate() + '">' +
            '<div class="panel_title"> <strong class="title-data">' + pdate + '</strong><span></span> </div>' +
            '<ul class="panel bet-recode-all"></ul></li>';
        nowDate.setDate(nowDate.getDate() - 1);
    }
    $('.tab_content')
        .append(restr);
    $('.new_bet_day').on('click', function () {
        seadata.pdate = $(this).data('val');
        seadata.page = 1;
        getBetRecord();
        // $(this).attr('data-page', $(this).data('page') + 1);
    });
    $('.first_li').each(function (i, t) {
        if ($(t).attr('class')
                .indexOf('active') >= 0 || i === 0 || i === 4) {
            $(t).trigger('click');
        }
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
                touzhuXQ = data;
                $.each(data, function (j, v) {
                    if ($(t).data('val') === v.pdate) {
                        var jsonStr = '';
                        var li_html = '';
                        var pcode = ('' + v.pcode).substring(8, 11);
                        if (seadata.searchType === 1) {
                            li_html = '<li class="bet_data" data-status="not_open">' +
                                '<a href="javascript:;" onClick="touzhu(this,0)" data-val="' + encodeURI(JSON.stringify(v)) + '">' +
                                '<div class="badge ssc_badge"></div>' +
                                '<div class="lottery_t ssc">' +
                                '<p>' + v.lotteryName + ' - <span>' + v.playName + '</span></p> <span style="margin-right: 10px">第' + pcode + '期</span><strong>' + roundAmt(v.betAmount) + '</strong> </div>' +
                                '<div class="status status0"' + v.orderStatus + '>' +
                                '<span>' + v.orderStatusName + '</span><div></div></div></a></li>';
                            // '<span>' + v.orderStatusName + '</span><div>' + v.pcode + '期</div></div></a></li>';
                        } else {
                            li_html += '<li class="bet_data" data-status="not_open">' +
                                '<a href="javascript:;" onClick="zhuihao(this)" data-val="' + encodeURI(JSON.stringify(v)) + '">' +
                                '<div class="badge ssc_badge"></div>' +
                                '<div class="lottery_t ssc">' +
                                '<p>' + v.lotteryName + ' - <span>' + v.playName + '</span></p> <span style="margin-right: 10px">第' + pcode + '期</span><strong>' + roundAmt(v.betAmount) + '</strong> </div>' +
                                '<div class="status status0"' + v.orderStatus + '>' +
                                '<span>' + v.chaseStatusName + '</span>' +
                                // '<div>' + v.pcode + '期</div></div></a></li>';
                                '<div style="color: #ffc85d">总' + v.chaseCount + '期</div></div></a></li>';
                        }
                        $(t).find('ul')
                            .append(li_html);
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
                        // if (seadata.statusType === 1) {
                        // $(t).find('ul')
                        // .append(li_html);
                        // } else if (v.orderStatus === 1 && seadata.statusType === 2) {
                        //     $(t).find('ul')
                        //         .append(li_html);
                        // } else if (v.orderStatus === 32 && seadata.statusType === 3) {
                        //     $(t).find('ul')
                        //         .append(li_html);
                        // } else if (v.orderStatus === 31 && seadata.statusType === 4) {
                        //     $(t).find('ul')
                        //         .append(li_html);
                        // }
                    }
                });
            });
            seadata.page++;
        },
        error: function () {
            // error
        },
    });
}


$('.so-membalance')
    .html(membalance);
var membalance = getCookie('membalance');

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
                if (tableLock !== val) {
                    tableLock = val;
                    $('.first_li').each(function (i, t) {
                        if ($(t).attr('class')
                                .indexOf('active') < 0 && val == (i + 1)) {
                            $(t).trigger('click');
                        }
                    });
                }
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
                if (tableLock !== val) {
                    tableLock = val;
                    $('.first_li').each(function (i, t) {
                        if ($(t).attr('class')
                                .indexOf('active') < 0 && val + 4 == (i + 1)) {
                            $(t).trigger('click');
                        }
                    });
                }
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

/**
 * 显示主页面
 */
var mainView = 0;
var ding = 0;

function showMain() {
    if (mainView === 0) {
        $('.body').hide();
        $('#main').show();
    } else {
        $('.body').hide();
        $('#page2').show();
        mainView = 0;
    }
    window.scrollTo(0, ding);
    // console.log(ding);
}

/**
 * 投注详情
 */
function touzhu(that, view) {
    $('#ding').attr('id', '');
    $(that).attr('id', 'ding');
    ding = getElementTop(document.getElementById('ding'));
    if (view === 1) {
        mainView = 1;
    }
    var access_token = getCookie('access_token'); // 取token

    // var data = getStrParam('data');
    var data = $(that).data('val');

    $('.body').hide();
    $('#page1').show();
    data = JSON.parse(decodeURI(data));
    console.log(data);
    $('.periods')
        .html(data.pcode);
    $('.bet_status')
        .html(data.orderStatusName);
    $('.so-betTime')
        .html(formatTime(new Date(data.betTime)));

    console.log(data.betTime);
    console.log(new Date(data.betTime).toDateString());
    $('.so-orderId')
        .html(data.orderId);
    $('.so-betAmount')
        .html(roundAmt(data.betAmount));

// 金额转换,分转成元
    function roundAmt(v) {
        return isNaN(v) ? '0.00' : (v / 100).toFixed(2);
    }

    $('.so-playName')
        .html(data.playName);
    $('.so-betContent')
        .html(data.betContent);

// 如果已经开奖
    if (data.orderStatusName != '等待开奖') {
        data.winNumber = data.winNumber || '1,2,3,4,5';
        var openNums = data.winNumber.split(',');
        $('.bet_nlist ul li')
            .each(function (i, t) {
                $(t)
                    .html(openNums[i]);
                $(t)
                    .attr('class', 'b_lt_1 hover');
            });
        if (data.orderStatusName == '已派彩') {
            $('.bet_status')
                .attr('class', 'bet_status status_green');
            $('.bet_status')
                .html('已中奖');
            var html = '<li><span>中奖金额</span><span class="ui_color_yellow">' + roundAmt(data.payoff) + '</span></li>';
            $('#page1 .print_data li:nth-child(3)').after(html);
        }
        if (data.orderStatusName == '系统撤单') {
            $('.bet_status')
                .attr('class', 'bet_status status_red');
        }
        if (data.orderStatusName == '暂缓派奖') {
            $('.bet_status')
                .attr('class', 'bet_status status_red');
        }
        if (data.orderStatusName == '会员撤单') {
            $('.bet_status')
                .attr('class', 'bet_status status_red');
        }
    }

//    //开奖数据查询
//    function openNumsFun(lotteryId, pcount) {
//        var data = {
//            lotteryId: lotteryId,
//            pcount: pcount,
//        }
//        $.ajax({
//            type: 'post',
//            headers: {
//                "Authorization": "bearer " + access_token,
//            },
//            dataType: 'json',
//            contentType: "application/json; charset=utf-8",  // json格式传给后端
//            url: action.forseti + 'api/openNums',
//            data: JSON.stringify(data),  // json格式
//            success: function (res) {
//                if (res.code == 200) {
//                    return
//                }
//            },
//            error: function (err) {
//                console.log(err.responseText)
//            }
//        });
//    }

    /**
     * 解析URL参数
     */
    function getStrParam() {
        var url = location.search; // 获取url中"?"符后的字串
        var param = {};
        if (url.indexOf('?') != -1) {
            var str = url.substr(1);
            strs = str.split('&');
            for (var i = 0; i < strs.length; i++) {
                param[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
            }
        }
        return param;
    }

}

/**
 * 追号详情
 */
function zhuihao(that) {
    $('#ding').attr('id', '');
    $(that).attr('id', 'ding');
    ding = getElementTop(document.getElementById('ding'));
    var access_token = getCookie('access_token'); // 取token
    var data = $(that).data('val');
    $('.body').hide();
    $('#page2').show();
    data = JSON.parse(decodeURI(data));
    chaseOrderDetailFun(data.lotteryId, data.parentOrderId, function (list) {
        $('.lottery_t')
            .html('<p>' + data.lotteryName + ' - <span>' + data.playName + '</span></p><p class="tra_info">' +
                //                '<span>已追<span class="ui_color_yellow">' + data.chaseSeq  + '</span>期</span>' +
                '<span>总<span class="ui_color_yellow">' + data.chaseCount + '</span>期</span>' +
                '</p>');
        if (data.chaseWinStop == 1) {
            data.chaseWinStop = '追中即停';
        } else {
            data.chaseWinStop = '不停止';
        }

        $('#page2 .print_data')
            .html('<ul><li><span>投注时间</span> <span>' + (new Date(data.betTime)).format('yyyy-MM-dd hh:mm:ss') + '</span></li><li><span>追号方案</span> <span>' + data.parentOrderId + '</span></li><li><span>追号条件</span> <span>' + data.chaseWinStop + '</span> </li></ul>');


        $('.tr_status')
            .html(data.chaseStatusName);
        if (data.chaseStatusName == '进行中') {
            $('.tr_status')
                .attr('class', 'tr_status status01');
        } else if (data.chaseStatusName == '已终止') {
            $('.tr_status')
                .attr('class', 'tr_status status02');

        } else if (data.chaseStatusName == '已结束') {
            $('.tr_status')
                .attr('class', 'tr_status status03');

        }
        var li_html = '<ul>';
        $.each(list, function (i, e) {
            console.log(list[i]);
            // var jsonStr = encodeURI('betting_record_dt01.html?data=' + JSON.stringify(e));
            li_html += '<li><a href="javascript:;" onClick="touzhu(this,1)" data-val="' + encodeURI(JSON.stringify(e)) + '"><div class="tra_info"><p>第 <span class="period">' + e.pcode + '</span> 期</p><span class="ui_color_yellow">' + roundAmt(e.betAmount) + ' 元</span></div><div class="t_l_sta01">' + e.chaseStatusName + '</div></a></li>';
        });
        li_html += '</ul>';
        $('.tra_list')
            .html(li_html);

    });


// 追号数据查询
    function chaseOrderDetailFun(lotteryId, parentOrderId, cb) {
        var data = {
            lotteryId: lotteryId,
            parentOrderId: parentOrderId,
        };
        $.ajax({
            type: 'get',
            headers: {
                'Authorization': 'bearer ' + access_token,
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8', // json格式传给后端
            url: action.forseti + 'api/orders/chaseOrderDetail',
            data: data, // json格式
            success: function (res) {
                if (res.err == 'SUCCESS') {
                    var data = res.data;
                    cb(data);

                }
            },
            error: function (err) {
                console.log(err.responseText);
            },
        });
    }

}


/**
 * 获取元素的绝对位置
 * @param element
 * @returns {Number|number}
 */
function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
