function initSoFun() {
    var html = '';
    $('.radio input').each(function (i, t) {
        console.log();
        if ($(t).attr('checked') == 'checked') {
            initCount();
        }
    });
}

function initCount() {
// api/priodDataNewly
    access_token = getCookie('access_token'); // 取token
    lotteryId = 1;

    var data = {
        'lotteryId': lotteryId
        // 'pcount': pcount
    };
    $.ajax({
        type: 'get',
        headers: {
            'Authorization': 'bearer ' + access_token
        },
        dataType: 'json',
        contentType: 'application/json; charset=utf-8', // json格式传给后端
        url: action.forseti + 'api/priodDataNewly',
        data: data, // json格式
        success: function (res) {
            if (res.err == 'SUCCESS') {
                var data = res.data;

            }
        },
        error: function (err) {
            console.log(err.responseText);
        }
    });
}
