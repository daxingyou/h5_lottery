
/**
 * 显示主页面
 */
var mainView = 0;

$(function () {
    var access_token = getCookie('access_token'); // 取token
    var lotteryname = getCookie('lottery_name');
    var lotteryid = getCookie('lt_lottid');
    $('.lottery_name').html(lotteryname+' 投注记录'); // 彩种名称

    var nowDate = new Date();
    var seadata = {
        page: 1, // 页数，从1开始
        pageSize: 10, // 每页行数
        searchType: 1, // 查询类型，1为投注记录查询，2为追号查询
        statusType: 1, // 状态：1全部，2未开奖，3已中奖，4未中奖,81异常处理中
        lotteryId: lotteryid , // 彩种ID
        pdate: '' + (nowDate.getYear() + 1900) + (nowDate.getMonth() + 1) + nowDate.getDate(),
    };

// 标签切换锁
    tableLock = 0;

// 投注详情
    var touzhuXQ = {};
// 追号详情
   // var zhuihaoXQ = {};

    initView();


// 下拉加载更多
    function soyeScroll(selector) {
        this.selector = selector;
        this.init = function (cb) {
            var selector = this.selector;
            var that = this;
            var arr = selector.split(' ');
            selector = arr.join('');
            var doc = '';
            if (selector.indexOf('.') === 0) {
                selector = selector.substring(1, selector.length);
                doc = document.getElementsByClassName(selector);
                if (doc === null) {
                    console.error('soyeScroll errorMsg: this class is undefined!');
                    return;
                }
                doc = doc[doc.length - 1];
               // console.log(thisHeight + ':' + thisX);
                window.onscroll = function () {
                    var thisClientHeight = document.body.clientHeight;
                    var thisScrollHeight = document.body.scrollHeight;
                   // console.log(thisScrollHeight + ':' + (thisClientHeight + that.getScrollTop()));
                    if (thisScrollHeight - 100 <= (thisClientHeight + that.getScrollTop())) {
                        cb();
                    }
                };
            } else if (selector.indexOf('#') === 0) {
                selector = selector.substring(1, selector.length);
                doc = document.getElementById(selector);
                if (doc === null) {
                    console.error('soyeScroll errorMsg: this id is undefined!');
                    return;
                }
                var thisHeight = doc.style.height;
                var thisX = doc.getBoundingClientRect().left;
               // console.log(thisHeight + ':' + thisX);
            }
        };
        this.getScrollTop = function () {
            var scrollTop = 0;
            var bodyScrollTop = 0;
            var documentScrollTop = 0;
            if (document.body) {
                bodyScrollTop = document.body.scrollTop;
            }
            if (document.documentElement) {
                documentScrollTop = document.documentElement.scrollTop;
            }
            scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
            return scrollTop;
        };
    }



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
        var DateclassName = '';
        if (seadata.searchType === 1) {
            DateclassName = '.tab_content_1 .slide_toggle'
        } else {
            DateclassName = '.tab_track_1 .slide_toggle'
        }
        $(DateclassName).each(function (i, t) {
            if ($(t).attr('class')
                    .indexOf('active') < 0 && i % 3 === 0) {
                $(t).addClass('active')
                    .siblings()
                    .removeClass('active');
                $(t).find('ul')
                    .show();
                $(t).siblings()
                    .find('ul')
                    .hide();
            }
        });
        getBetRecord();
        initDateMeun();
    }

    function getBetRecord() {
        $('.so-zzjz').remove()
        $('.bet-recode-all')
            .append('<li style="margin: auto;text-align: center;height: 2rem;display: block;line-height: 2rem;" class="so-zzjz">正在加载...</li>');
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
                $('.so-zzjz').remove();
                var data = res.data.rows;
                if (data.length === 0) {
                    $('.bet-recode-all')
                        .append('<li style="margin: auto;text-align: center;height: 2rem;display: block;line-height: 2rem;" class="so-zzjz">没有数据了</li>');
                } else {
                    lock = 0;
                }
               // console.log(seadata.pdate + '[' + seadata.page + ']');
                $('.new_bet_day').each(function (i, t) {
                    touzhuXQ = data;
                    $.each(data, function (j, v) {
                        if ($(t).data('val') === v.pdate) {
                            var jsonStr = '';
                            var li_html = '';
                           // var pcode = ('' + v.pcode).substring(8, 11);
                            var pcode = ('' + v.pcode).substring(0, 11);
                            var className = 'status0';
                            var payoff = ''
                            switch (parseInt(v.orderStatus)) {
                                case 32:
                                    className = 'status02';
                                    payoff = fortMoney(roundAmt(v.payoff), 2) + '元'
                                    break;
                                case 4:
                                case 5:
                                case 6:
                                case 71:
                                case 81:
                                    className = 'status04';
                                    break;
                                case 33: // 和局
                                    className = 'status00';
                                    break;
                            }
                            if (seadata.searchType === 1) {
                                li_html = '<li class="bet_data" data-status="not_open">' +
                                    '<a href="javascript:;"  data-val="' + encodeURI(JSON.stringify(v)) + '">' +  // 暂时不显示详情 onclick="showBetDetails(this,0)"
                                    '<div class="prd_num"><span>' + pcode + '</span>期</div>'+
                                    '<div class="item"> '+
                                    '<div class="badge ssc_badge lottery_logo_'+lotteryid+'"></div>' +
                                    '<div class="lottery_t ssc">' +
                                    '<p>' + v.lotteryName + ' - <span>' + v.playName + '</span></p> <strong>' + fortMoney(roundAmt(v.betAmount), 2) + '</strong> </div>' +
                                    '<div class="status ' + className + '" >' +
                                    '<span>' + v.orderStatusName + '</span><div>' + payoff + '</div></div>' +
                                    '</div>'+
                                    '</a></li>';
                                // '<span>' + v.orderStatusName + '</span><div>' + v.pcode + '期</div></div></a></li>';
                            } /*else {  // 追号
                                li_html += '<li class="bet_data" data-status="not_open">' +
                                    '<a href="javascript:;" onClick="zhuihao(this)" data-val="' + encodeURI(JSON.stringify(v)) + '">' +
                                    '<div class="prd_num"><span>' + pcode + '</span>期</div>'+
                                    '<div class="item"> '+
                                    '<div class="badge ssc_badge"></div>' +
                                    '<div class="lottery_t ssc">' +
                                    '<p>' + v.lotteryName + ' - <span>' + v.playName + '</span></p> <strong>' + fortMoney(roundAmt(v.betAmount), 2) + '</strong> </div>' +
                                    '<div class="status status0"' + v.orderStatus + '>' +
                                    '<span>' + v.chaseStatusName + '</span>' +
                                    // '<div>' + v.pcode + '期</div></div></a></li>';
                                    '<div style="color: #ffc85d">总' + v.chaseCount + '期</div></div>' +
                                    '</div>'+
                                    '</a></li>';
                            }*/
                            $(t).find('ul')
                                .append(li_html);
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

// 一级标签
   /* (function () {*/
        $('#tabs > div').click(function () {
            $(this).addClass('active')
                .siblings()
                .removeClass('active');
            if ($(this).index()) {
                // 追号
                $('#betting_record').hide()
                $('#trace_record').show()
                seadata.searchType = 2;
                seadata.page = 1;// 页数，从1开始
               // initZhuihao()
            } else {
                // 投注
                $('#betting_record').show()
                $('#trace_record').hide()
                seadata.searchType = 1;
                seadata.page = 1;// 页数，从1开始
            }
            restr = '';// 网页html缓存
            initView()
        });
   /* })();*/


// 二级标签
    /*(function () {*/
        $('.tab_mid > li').click(function () {
            $(this).addClass('on')
                .siblings()
                .removeClass('on');
            var num = parseInt($(this).index(), 10);
            switch (num) {
                case 0:
                    seadata.statusType = 1
                    if (seadata.searchType === 1) {
                        mySwiperRecode.slideTo(0, 200, false);
                    } else {
                        mySwiperTrack.slideTo(0, 200, false);
                    }
                    break
                case 1:
                    seadata.statusType = 2
                    if (seadata.searchType === 1) {
                        mySwiperRecode.slideTo(1, 200, false);
                    } else {
                        mySwiperTrack.slideTo(1, 200, false);
                    }
                    break
                case 2:
                    seadata.statusType = 3
                    if (seadata.searchType === 1) {
                        mySwiperRecode.slideTo(2, 200, false);
                    } else {
                        mySwiperTrack.slideTo(2, 200, false);
                    }
                    break
                case 3:
                    seadata.statusType = 4
                    if (seadata.searchType === 1) {
                        mySwiperRecode.slideTo(3, 200, false);
                    } else {
                        mySwiperTrack.slideTo(3, 200, false);
                    }
                    break
            }
            seadata.page = 1
            initView()
        });
   /* })();*/

// 日期标签
    function initDateMeun() {
        $('.tab_content .slide_toggle').each(function (i, t) {
            $(t).unbind('click');
            $(t).click(function () {
                seadata.page = 1;
                if ($(this).attr('class')
                        .indexOf('active') < 0) {
                    $(this).addClass('active')
                        .siblings()
                        .removeClass('active');
                    $(this).find('ul')
                        .show();
                    $(this).siblings()
                        .find('ul')
                        .hide();
                    seadata.pdate = $(this).data('val');
                    getBetRecord(); // 投注记录
                } else {
                    $(this).removeClass('active');
                    $(this).find('ul')
                        .hide();
                }
            });
        });
    }


// 下拉加载

    var restr = '';// 网页html缓存
    var lock = 0;
    var soyeScroll = new soyeScroll('.bet_data');
    soyeScroll.init(function () {
        if (lock === 0) {
            lock = 1;
            restr = '';
            getBetRecord(); // 投注记录
        }
    });

    var ding = 0;

    function getScroll() {
        var t, l, w, h;
        if (document.documentElement && document.documentElement.scrollTop) {
            t = document.documentElement.scrollTop;
            l = document.documentElement.scrollLeft;
            w = document.documentElement.scrollWidth;
            h = document.documentElement.scrollHeight;
        } else if (document.body) {
            t = document.body.scrollTop;
            l = document.body.scrollLeft;
            w = document.body.scrollWidth;
            h = document.body.scrollHeight;
        }
        return {t: t, l: l, w: w, h: h};
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

    var mySwiperRecode = new Swiper('#swiper1', {
        // autoplay: 5000,//可选选项，自动滑动
        onSlideChangeStart: function (swiper) {
            var index = swiper.activeIndex
            seadata.statusType = index + 1
            seadata.page = 1
            initView()
            $('#betting_record .recode-tab .tab_mid  li').each(function (i, t) {
                if (i === index) {
                    $(t).addClass('on')
                        .siblings()
                        .removeClass('on');
                }
            })
        },
    })
    var mySwiperTrack = null;

/*    function initZhuihao() {
        mySwiperTrack = new Swiper('#swiper2', {
            onSlideChangeStart: function (swiper) {
                var index = swiper.activeIndex
                seadata.statusType = index + 1
                seadata.page = 1
                initView()
                $('#trace_record .track-tab .tab_mid  li').each(function (i, t) {
                    if (i === index) {
                        $(t).addClass('on')
                            .siblings()
                            .removeClass('on');
                    }
                })
            },
        })
    }*/


}) ;


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
}


/**
 * 投注详情
 */
function showBetDetails(that, view) {
    event.stopPropagation();
    ding = document.documentElement.scrollTop
    if (view === 1) {
        mainView = 1;
    }
    var data = $(that).data('val');

    $('.body').hide();
    $('#page1').show();
    data = JSON.parse(decodeURI(data));
    // console.log(data);
    $('.periods')
        .html(data.pcode);
    $('.bet_status')
        .html(data.orderStatusName);
    $('.so-betTime')
        .html(formatTime(new Date(data.betTime)));

    $('.so-orderId')
        .html(data.orderId);
    $('.so-betAmount')
        .html(fortMoney(roundAmt(data.betAmount), 2));

    $('.so-playName')
        .html(data.playName);
    $('.so-betContent')
        .html(data.betContent);
    $('.so-zhongjiang').remove()

// 如果已经开奖
    if (data.orderStatus !== 1) {
        data.winNumber = data.winNumber || '1,2,3,4,5';
        var openNums = data.winNumber.split(',');
        $('.bet_nlist ul li')
            .each(function (i, t) {
                $(t)
                    .html(openNums[i]);
                $(t)
                    .attr('class', 'b_lt_1 hover');
            });
        switch (parseInt(data.orderStatus)) {
            case 32:
                $('.bet_status')
                    .attr('class', 'bet_status status_green');
                $('.bet_status')
                    .html('已中奖');
                var html = '<li class="so-zhongjiang"><span>中奖金额</span><span class="ui_color_yellow">' + fortMoney(roundAmt(data.payoff), 2) + '</span></li>';
                $('#page1 .print_data li:nth-child(3)').after(html);

                break;
            case 4:
            case 5:
            case 6:
            case 71:
            case 81:
                $('.bet_status')
                    .attr('class', 'bet_status status_red');
                break;
        }
    }
}

/**
 * 追号详情
 */
/*function zhuihao(that) {
    event.stopPropagation();
    ding = document.documentElement.scrollTop
    var data = $(that).data('val');
    $('.body').hide();
    $('#page2').show();
    data = JSON.parse(decodeURI(data));
    chaseOrderDetailFun(data.lotteryId, data.parentOrderId, function (list) {
        $('#page2 .lottery_t')
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


        $('#page2 .tr_status')
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
            li_html += '<li><a href="javascript:;" onclick="showBetDetails(this,1)" data-val="' + encodeURI(JSON.stringify(e)) + '"><div class="tra_info"><p>第 <span class="period">' + e.pcode + '</span> 期</p><span class="ui_color_yellow">' + fortMoney(roundAmt(e.betAmount), 2) + ' 元</span></div><div class="t_l_sta01">' + e.chaseStatusName + '</div></a></li>';
        });
        li_html += '</ul>';
        $('#page2 .tra_list')
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
}*/
