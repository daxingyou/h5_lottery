/* eslint-disable no-undef */
$(function () {
    access_token = getCookie('access_token'); // 取token
    var pcount = 30;
    var lotteryId = 1;

    var data = {
        'lotteryId': lotteryId,
        'pcount': pcount
    };
    // trend_tab_1
    $('.trend_tab_1 li').each(function (i, t) {
        $(t).click(function () {
            $('.trend_tab_1 li').attr('class', '');
            $(this).attr('class', 'active');
            data.pcount = $(this).attr('data-val');
            initopenNumsFun();
        });
    });
    initopenNumsFun();

    function initopenNumsFun() {

        $.ajax({
            type: 'get',
            headers: {
                'Authorization': 'bearer ' + access_token
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8', // json格式传给后端
            url: action.forseti + 'api/openNums/bigDoubleCount',
            data: data, // json格式
            success: function (res) {
                if (res.err == 'SUCCESS') {
                    var data = res.data;
                    console.log(data);
                    var tr_html = '';
                    $.each(data, function (i, e) {
                        e.pcode = e.pcode % 1000;
                        if (e.pcode < 100 && e.pcode >= 10) {
                            e.pcode = '0' + e.pcode;
                        } else if (e.pcode < 10) {
                            e.pcode = '00' + e.pcode;
                        }
                        e.winNumber = e.winNumber || '';
                        e.winNumber = e.winNumber.split(',');
                        tr_html += '<tr><td>' + e.pcode + '期</td><td><i>' + e.winNumber[0] + '</i><i>' + e.winNumber[1] + '</i><i>' + e.winNumber[2] + '</i><i>' + e.winNumber[3] + '</i><i>' + e.winNumber[4] + '</i></td>';
                        $.each(e.countMap, function (i, t) {
                            if (i != 2) {
                                tr_html += '<td>' + t + '</td>';
                            }
                        });
                        tr_html += '</tr>';
                    });
                    $('.so-bigDoubleCount').html(tr_html);
                }
            },
            error: function (err) {
                console.log(err.responseText);
            }
        });
    }
});

