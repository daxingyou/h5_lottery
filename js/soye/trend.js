$(function () {
    $('#trendMenu').on('click', function (e) {
        e.stopPropagation();
        $('#trendList').toggle();
        $(this).find('b').toggleClass('cur');
        $(document).on('click', function () {
            $('#trendList').hide();
        })
    })
    $('#trendList dd').on('click', function () {
        $('#trendMenu').html($(this).text() + '<b></b>');
        $(this).addClass('hover').siblings().removeClass('hover');
    })
});

// $(function(){
//     $('.trend_tab_2 li').on('click',function(){
//         var index = $(this).index();
//         $(this).addClass('active').siblings().removeClass('active');
//         // console.log(index);
//         $('.trend_content').stop().animate({ left: (-100*index)+'%'});
//     })
// })

var numMillion = [3, 5, 9, 7, 4, 1, 3, 5, 9, 7, 4, 2, 3, 5, 9, 7, 6, 3, 5, 9, 7, 4, 1, 3, 5, 0, 7, 4, 2, 3]; //萬位開獎號碼
var numThousand = [1, 5, 3, 7, 4, 1, 3, 5, 9, 7, 4, 2, 3, 5, 9, 7, 6, 3, 5, 9, 7, 4, 1, 3, 5, 0, 7, 4, 2, 3]; //千位開獎號碼
var numHundred = [9, 5, 9, 7, 4, 1, 3, 5, 9, 7, 4, 2, 3, 5, 9, 7, 6, 3, 5, 9, 7, 4, 1, 3, 5, 0, 7, 4, 2, 3]; //百位開獎號碼
var numTen = [4, 7, 2, 7, 4, 1, 3, 5, 9, 7, 4, 2, 3, 5, 9, 7, 6, 3, 5, 9, 7, 4, 1, 3, 5, 0, 7, 4, 2, 3]; //十位開獎號碼
var numOne = [7, 5, 9, 7, 4, 1, 3, 5, 9, 7, 4, 2, 3, 5, 9, 7, 6, 3, 5, 9, 7, 4, 1, 3, 5, 0, 7, 4, 2, 3]; //個位開獎號碼

function initOpenNumsFun() {
    access_token = getCookie("access_token");  // 取token
    var pcount = 30
    var lotteryId = 1

    var data = {
        'lotteryId': lotteryId,
        'pcount': pcount
    }
    $.ajax({
        type: 'get',
        headers: {
            "Authorization": "bearer " + access_token,
        },
        dataType: 'json',
        contentType: "application/json; charset=utf-8",  // json格式传给后端
        url: action.forseti + 'api/openNums',
        data: data,  // json格式
        success: function (res) {
            if (res.err == "SUCCESS") {
                var data = res.data;
                numMillion = []
                numThousand = []
                numHundred = []
                numTen = []
                numOne = []
                $.each(data, function (i, e) {
                    var winNumber = e.winNumber || ''
                    winNumber = winNumber.split(',')
                    console.log(i + ':::' + winNumber)
                    numMillion.push(parseInt(winNumber[0]))
                    numThousand.push(parseInt(winNumber[1]))
                    numHundred.push(parseInt(winNumber[2]))
                    numTen.push(parseInt(winNumber[3]))
                    numOne.push(parseInt(winNumber[4]))
                })
                initOpenNumsShow()
            }
        },
        error: function (err) {
            console.log(err.responseText)
        }
    });
}

$(function () {
    $(window).on('resize', function () {
        initOpenNumsFun()
    }).resize();
})

function initOpenNumsShow() {
    var posMillion = '';
    var textMillion = '';
    var posThousand = '';
    var textThousand = '';
    var posHundred = '';
    var textHundred = '';
    var posTen = '';
    var textTen = '';
    var posOne = '';
    var textOne = '';
    var itemW = $('.trend_canvas').width() / 10;
    var itemH = $('.trend_content td').outerHeight(true);
    var row = 30;

    for (var i = 0; i < row; i++) {
        posMillion += (itemW * numMillion[i] + itemW / 2) + ',' + (i * itemH + itemH / 2) + ' ';
        textMillion += '<div style="left:' + (itemW * numMillion[i] + itemW / 2) + 'px; top: ' + (i * itemH + itemH / 2) + 'px">' + numMillion[i] + '</div>';
        posThousand += (itemW * numThousand[i] + itemW / 2) + ',' + (i * itemH + itemH / 2) + ' ';
        textThousand += '<div style="left:' + (itemW * numThousand[i] + itemW / 2) + 'px; top: ' + (i * itemH + itemH / 2) + 'px">' + numThousand[i] + '</div>';
        posHundred += (itemW * numHundred[i] + itemW / 2) + ',' + (i * itemH + itemH / 2) + ' ';
        textHundred += '<div style="left:' + (itemW * numHundred[i] + itemW / 2) + 'px; top: ' + (i * itemH + itemH / 2) + 'px">' + numHundred[i] + '</div>';
        posTen += (itemW * numTen[i] + itemW / 2) + ',' + (i * itemH + itemH / 2) + ' ';
        textTen += '<div style="left:' + (itemW * numTen[i] + itemW / 2) + 'px; top: ' + (i * itemH + itemH / 2) + 'px">' + numTen[i] + '</div>';
        posOne += (itemW * numOne[i] + itemW / 2) + ',' + (i * itemH + itemH / 2) + ' ';
        textOne += '<div style="left:' + (itemW * numOne[i] + itemW / 2) + 'px; top: ' + (i * itemH + itemH / 2) + 'px">' + numOne[i] + '</div>';
    }
    $('#trend_Million').html('<svg width="' + $('.trend_canvas').width() + ' "height="' + row * itemH + '"><polyline points="' + posMillion + '" style="fill:none;stroke:#52acd3;stroke-width:2" /></svg>');
    $('#trend_Million').append(textMillion);
    $('#trend_Thousand').html('<svg width="' + $('.trend_canvas').width() + ' "height="' + row * itemH + '"><polyline points="' + posThousand + '" style="fill:none;stroke:#52acd3;stroke-width:2" /></svg>');
    $('#trend_Thousand').append(textThousand);
    $('#trend_Hundred').html('<svg width="' + $('.trend_canvas').width() + ' "height="' + row * itemH + '"><polyline points="' + posHundred + '" style="fill:none;stroke:#52acd3;stroke-width:2" /></svg>');
    $('#trend_Hundred').append(textHundred);
    $('#trend_Ten').html('<svg width="' + $('.trend_canvas').width() + ' "height="' + row * itemH + '"><polyline points="' + posTen + '" style="fill:none;stroke:#52acd3;stroke-width:2" /></svg>');
    $('#trend_Ten').append(textTen);
    $('#trend_One').html('<svg width="' + $('.trend_canvas').width() + ' "height="' + row * itemH + '"><polyline points="' + posOne + '" style="fill:none;stroke:#52acd3;stroke-width:2" /></svg>');
    $('#trend_One').append(textOne);
}

TouchSlide({
    slideCell: "#trend_content",
});