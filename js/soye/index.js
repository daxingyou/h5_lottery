/* eslint-disable default-case,no-fallthrough */
function initSoFun() {
    var html = '';
    $('.radio input')
        .each(function (i, t) {
            if ($(t).attr('checked') == 'checked' && i !== 2) {
                initCount(i);
                radio_start = i;
            } else if ($(t).attr('checked') == 'checked' && i === 2) {
                radio_start = 99;
                $('#lt_selector .nList li').find('i')
                    .remove();
            }
        });
}

function initCount(type) {
// api/priodDataNewly
    var access_token = getCookie('access_token'); // 取token
    var lotteryId = getCookie('lt_lottid') ;
    var methodid = $.lt_method_data.methodid;
    var data = {
        'lotteryId': lotteryId,
        // 'pcount': pcount
    };
    $.ajax({
        type: 'get',
        headers: {
            'Authorization': 'bearer ' + access_token,
        },
        dataType: 'json',
        contentType: 'application/json; charset=utf-8', // json格式传给后端
        url: action.forseti + 'api/priodDataNewly',
        data: data, // json格式
        success: function (res) {
            if (res.err == 'SUCCESS') {
                var data = res.data[2];
                if (type == 0) {
                    data = data.hotData;
                    console.log(data);
                } else if (type == 1) {
                    data = data.lackData;
                }
                switch (methodid) {
                    case 111:
                        initCountFun(data[0], 'lt_place_0');
                        initCountFun(data[1], 'lt_place_1');
                        initCountFun(data[2], 'lt_place_2');
                        initCountFun(data[3], 'lt_place_3');
                        initCountFun(data[4], 'lt_place_4');
                        break;
                    case 211:
                        initCountFun(data[1], 'lt_place_0');
                        initCountFun(data[2], 'lt_place_1');
                        initCountFun(data[3], 'lt_place_2');
                        initCountFun(data[4], 'lt_place_3');
                    case 213:
                        initCountFun(data[1], 'lt_place_0');
                        initCountFun(data[2], 'lt_place_1');
                        initCountFun(data[3], 'lt_place_2');
                        initCountFun(data[4], 'lt_place_3');
                    case 311:
                        initCountFun(data[2], 'lt_place_0');
                        initCountFun(data[3], 'lt_place_1');
                        initCountFun(data[4], 'lt_place_2');
                    case 411:
                        initCountFun(data[2], 'lt_place_0');
                        initCountFun(data[3], 'lt_place_1');
                        initCountFun(data[4], 'lt_place_2');
                    case 511:
                        initCountFun(data[2], 'lt_place_0');
                        initCountFun(data[3], 'lt_place_1');
                        initCountFun(data[4], 'lt_place_2');
                        break;
                }
            }
        },
        error: function (err) {
            console.log(err.responseText);
        },
    });
}

function initCountFun(arr, name) {
    var li_doc = $('[name=' + name + ']');
    li_doc.find('i')
        .remove();
    li_doc.append('<i>0</i>');
    li_doc.css('margin-bottom', '1.5rem');
    li_doc.each(function (i, t) {
        $.each(arr, function (j, u) {
            if (j == i) {
                $(t)
                    .find('i')
                    .html(arr[i]);
            }
        });
    });
}
