$(function () {
    access_token = getCookie("access_token");  // 取token

    getBetRecord(1, 1, 1); // 投注记录

    TouchSlide({
        slideCell: "#betting_record",
    });
    TouchSlide({
        slideCell: "#trace_record",
    });


    // 菜单处理
    var index = 0;
    $('#tabs .item').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');

        var index = $(this).index();
        if (index == 1) {
            getBetRecord(1, 2, 1); // 追号记录
        } else {
            getBetRecord(1, 1, 1); // 投注记录
        }
        $('.tab_container').eq(index).stop(true, true).fadeIn().siblings().stop(true, true).fadeOut();
    }).eq(index).click();

    $('.tempWrap').on('click', '.slide_toggle', function () {
        $(this).find('.panel').stop(true, true).slideToggle(200);
        $(this).toggleClass('active').siblings().removeClass('active').find('.panel').stop(true, true).slideUp(200);
    });
    //  $('.tab_content .slide_toggle:first-child').click();


    /*  获取投注记录
    * orderStatus,注单状态，1等待开奖,31未中奖,32已派彩,4用户撤单,5系统撤单,6中奖停追,71存在异常
    * */
    function getBetRecord(page, type, status) {
        $('.tab_content_' + status).html("");
        $('.tab_track_' + status).html("");
        var seadata = {
            "page": page,   //页数，从1开始
            "pageSize": 200,  //每页行数
            "searchType": type, //查询类型，1为投注记录查询，2为追号查询
            "statusType": status,  //状态：1全部，2未开奖，3已中奖，4未中奖,81异常处理中
            lotteryId: 1, //彩种ID
        }
        $.ajax({
            type: 'post',
            headers: {
                "Authorization": "bearer " + access_token,
            },
            dataType: 'json',
            contentType: "application/json; charset=utf-8",  // json格式传给后端
            url: action.forseti + 'api/orders/orderList',
            data: JSON.stringify(seadata),  // json格式
            success: function (res) {

                //  var mon = res.data.rows[0].pcode.toString().substring(4,6) ;  // 月份
                //  var day = res.data.rows[0].pcode.toString().substring(6,8) ;  // 月份
                //  $('.title-data').text(mon+'月'+day+'日') ;

                var daysArr = {}; // 帅选相同日期数组
                if (res.data == null) {
                    return
                }
                $.each(res.data.rows, function (i, v) {
                    v.pcode = v.pcode.toString().substring(0, 8); // 截取日期前面6位
                    daysArr[v.pcode] = daysArr[v.pcode] || [];
                    daysArr[v.pcode].push(v);

                });
                console.log(daysArr);
                var restr = '';
                var li_html = ''
                //   $('.bet-recode-all').append(str) ;
                if (type == 1) {
                    $.each(daysArr, function (j, m) {
                        restr += '<li class="slide_toggle bet_day ">' +
                            '<div class="panel_title"> <strong class="title-data">' + j.toString().substring(4, 6) + '月' + j.toString().substring(6, 8) + '日 </strong><span></span> </div>' +
                            '<ul class="panel bet-recode-all">';
                        $.each(m, function (i, v) {
                            var statusStr = '';
                            if (status == 1) {
                                statusStr = '全部'
                            } else if (status == 2) {
                                statusStr = '等待开奖'
                            } else if (status == 3) {
                                statusStr = '已派彩'
                            } else if (status == 4) {
                                statusStr = '未中奖'
                            }
                            if (statusStr == v.orderStatusName || statusStr == '全部') {
                                var jsonStr = encodeURI("betting_record_dt01.html?data=" + JSON.stringify(v));
                                li_html += '<li class="bet_data" data-status="not_open">' +
                                    '<a href="' + jsonStr + '">' +
                                    '<div class="badge ssc_badge"></div>' +
                                    '<div class="lottery_t ssc">' +
                                    '<p>' + v.lotteryName + ' - <span>' + v.playName + '</span></p> <strong>' + roundAmt(v.betAmount) + '</strong> </div>' +
                                    '<div class="status status0"' + v.orderStatus + '>' +
                                    '<span>' + v.orderStatusName + '</span>' +
                                    '<div></div>' +
                                    '</div>' +
                                    ' </a>' +
                                    '</li>';
                            }

                        });
                        restr += li_html;
                        restr += '</ul></li>';
                        if (li_html == "") {
                            restr = ""
                        }
                    });
                    $('.tab_content_' + status).html(restr);
                } else if (type == 2) {
                    $.each(daysArr, function (j, m) {
                        restr += '<li class="slide_toggle bet_day ">' +
                            '<div class="panel_title"> <strong class="title-data">' + j.toString().substring(4, 6) + '月' + j.toString().substring(6, 8) + '日 </strong><span></span> </div>' +
                            '<ul class="panel bet-recode-all">';
                        $.each(m, function (i, v) {
                            var statusStr = '';
                            if (status == 1) {
                                statusStr = '全部'
                            } else if (status == 2) {
                                statusStr = '进行中'
                            } else if (status == 3) {
                                statusStr = '已结束'
                            } else if (status == 4) {
                                statusStr = '已终止'
                            }
                            if (statusStr == v.chaseStatusName || statusStr == '全部') {
                                li_html += '<li class="bet_data" data-status="not_open">' +
                                    '<a href="trace_record_dt01.html">' +
                                    '<div class="badge ssc_badge"></div>' +
                                    '<div class="lottery_t ssc">' +
                                    '<p>' + v.lotteryName + ' - <span>' + v.playName + '</span></p> <strong>' + roundAmt(v.betAmount) + '</strong> </div>' +
                                    '<div class="status status0"' + v.orderStatus + '>' +
                                    '<span>' + v.chaseStatusName + '</span>' +
                                    '<div></div>' +
                                    '</div>' +
                                    ' </a>' +
                                    '</li>';
                            }
                        });
                        restr += li_html;
                        restr += '</ul></li>';
                        if (li_html == "") {
                            restr = ""
                        }
                    });
                    $('.tab_track_' + status).html(restr);
                }


            },
            error: function () {

            }
        });
    }

    // 投注记录切换标签
    function recodeChange() {
        $('.recode-tab').on('click', 'a', function () {
            var val = $(this).data('val');
            getBetRecord(1, 1, val)

        });
        $('.track-tab').on('click', 'a', function () {
            var val = $(this).data('val');
            getBetRecord(1, 2, val)

        });
    }

    recodeChange();


})