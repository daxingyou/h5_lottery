$(function () {
    var pcount = 30
    var lotteryId = 1

    var data = {
        'lotteryId': lotteryId,
        'pcount': pcount
    }
    // trend_tab_1
    $('.trend_tab_1 li').each(function (i, t) {
        $(t).click(function () {
            $('.trend_tab_1 li').attr('class', '')
            $(this).attr('class', 'active')
            pcount = $(this).attr('data-val')
            initopenNumsFun()
        })
    })
    initopenNumsFun()

    function initopenNumsFun() {

        $.ajax({
            type: 'get',
            headers: {
                "Authorization": "bearer " + access_token,
            },
            dataType: 'json',
            contentType: "application/json; charset=utf-8",  // json格式传给后端
            url: action.forseti + 'api/openNums/bigDoubleCout',
            data: JSON.stringify(data),  // json格式
            success: function (res) {
                if (res.err == "SUCCESS") {
                    var data = res.data;
                }
            },
            error: function (err) {
                console.log(err.responseText)
            }
        });
    }
})

