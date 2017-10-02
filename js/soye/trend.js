/* eslint-disable no-undef,camelcase,eqeqeq,radix */
$(function () {
    $('#trendMenu').on('click', function (e) {
        e.stopPropagation();
        $('#trendList').toggle();
        $(this).find('b')
            .toggleClass('cur');
        $(document).on('click', function () {
            $('#trendList').hide();
        });
    });
    $('#trendList dd').on('click', function () {
        $('#trendMenu').html($(this).text() + '<b></b>');
        $(this).addClass('hover')
            .siblings()
            .removeClass('hover');
        var val = $(this).data('val');
        var trend_content = $('.trend_content li');
        if (val == 0) {
            trend_content.show();
            $(trend_content[0]).trigger('click');
            trend_content.width('20%');
        } else if (val == 1) {
            // 四星
            trend_content.show();
            $(trend_content[0]).hide();
            $(trend_content[1]).trigger('click');
            trend_content.width('25%');
        } else if (val == 2) {
            // 前三
            trend_content.show();
            $(trend_content[3]).hide();
            $(trend_content[4]).hide();
            $(trend_content[0]).trigger('click');
            trend_content.width('33.33%');
        } else if (val == 3) {
            // 中三
            trend_content.show();
            $(trend_content[0]).hide();
            $(trend_content[4]).hide();
            $(trend_content[1]).trigger('click');
            trend_content.width('33.33%');
        } else if (val == 4) {
            // 后三
            trend_content.show();
            $(trend_content[0]).hide();
            $(trend_content[1]).hide();
            $(trend_content[2]).trigger('click');
            trend_content.width('33.33%');
        } else if (val == 5) {
            // 前二
            trend_content.show();
            $(trend_content[2]).hide();
            $(trend_content[3]).hide();
            $(trend_content[4]).hide();
            $(trend_content[0]).trigger('click');
            trend_content.width('50%');
        } else if (val == 6) {
            // 后二
            trend_content.show();
            $(trend_content[0]).hide();
            $(trend_content[1]).hide();
            $(trend_content[2]).hide();
            $(trend_content[3]).trigger('click');
            trend_content.width('50%');
        }
    });
    $('.trend_tab_1 li').click(function () {
        $(this).addClass('active')
            .siblings()
            .removeClass('active');
        pcount = $(this).data('val');
        initOpenNumsFun();
    });
});

// $(function(){
//     $('.trend_tab_2 li').on('click',function(){
//         var index = $(this).index();
//         $(this).addClass('active').siblings().removeClass('active');
//         // console.log(index);
//         $('.trend_content').stop().animate({ left: (-100*index)+'%'});
//     })
// })

var numMillion = [3, 5, 9, 7, 4, 1, 3, 5, 9, 7, 4, 2, 3, 5, 9, 7, 6, 3, 5, 9, 7, 4, 1, 3, 5, 0, 7, 4, 2, 3]; // 萬位開獎號碼
var numThousand = [1, 5, 3, 7, 4, 1, 3, 5, 9, 7, 4, 2, 3, 5, 9, 7, 6, 3, 5, 9, 7, 4, 1, 3, 5, 0, 7, 4, 2, 3]; // 千位開獎號碼
var numHundred = [9, 5, 9, 7, 4, 1, 3, 5, 9, 7, 4, 2, 3, 5, 9, 7, 6, 3, 5, 9, 7, 4, 1, 3, 5, 0, 7, 4, 2, 3]; // 百位開獎號碼
var numTen = [4, 7, 2, 7, 4, 1, 3, 5, 9, 7, 4, 2, 3, 5, 9, 7, 6, 3, 5, 9, 7, 4, 1, 3, 5, 0, 7, 4, 2, 3]; // 十位開獎號碼
var numOne = [7, 5, 9, 7, 4, 1, 3, 5, 9, 7, 4, 2, 3, 5, 9, 7, 6, 3, 5, 9, 7, 4, 1, 3, 5, 0, 7, 4, 2, 3]; // 個位開獎號碼

var pcodeArr = [];
var pcount = 30; // 期数
var lotteryId = 1; // 彩种

$(function () {
    $(window).on('resize', function () {
        initOpenNumsFun();
    })
        .resize();
});

function initOpenNumsFun() {
    access_token = getCookie('access_token'); // 取token


    var data = {
        'lotteryId': lotteryId,
        'pcount': pcount
    };
    $.ajax({
        type: 'get',
        headers: {
            'Authorization': 'bearer ' + access_token
        },
        dataType: 'json',
        contentType: 'application/json; charset=utf-8', // json格式传给后端
        url: action.forseti + 'api/openNums',
        data: data, // json格式
        success: function (res) {
            if (res.err == 'SUCCESS') {
                var data = res.data;
                numMillion = [];
                numThousand = [];
                numHundred = [];
                numTen = [];
                numOne = [];
                var newData = [];
                for (var i = data.length; i > 0; i--) {
                    newData.push(data[i - 1]);
                }
                pcodeArr = [];
                $.each(newData, function (i, e) {
                    var winNumber = e.winNumber || '';
                    winNumber = winNumber.split(',');
                    // console.log(i + ':::' + winNumber)
                    var pcode = e.pcode % 1000;
                    if (pcode < 100 && pcode >= 10) {
                        pcode = '0' + pcode;
                    } else if (pcode < 10) {
                        pcode = '00' + pcode;
                    }
                    pcodeArr.push(pcode);
                    numMillion.push(parseInt(winNumber[0]));
                    numThousand.push(parseInt(winNumber[1]));
                    numHundred.push(parseInt(winNumber[2]));
                    numTen.push(parseInt(winNumber[3]));
                    numOne.push(parseInt(winNumber[4]));
                });
                initTableFun();
            }
        },
        error: function (err) {
            console.log(err.responseText);
        }
    });
}


// 走势图形处理
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
    var row = pcount; // 行数

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

// 表格处理
function initTableFun() {
    var million_html = '<tr>';
    var thousand_html = '<tr>';
    var hundred_html = '<tr>';
    var ten_html = '<tr>';
    var one_html = '<tr>';
    //
    var millionArr = [];
    var thousandArr = [];
    var hundredArr = [];
    var tenArr = [];
    var oneArr = [];
    $.each(pcodeArr, function (i, t) {
        millionArr[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 初始化一行
        millionArr[i][numMillion[i]] = 0; // 开奖号码，给0值

        thousandArr[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 初始化一行
        thousandArr[i][numThousand[i]] = 0; // 开奖号码，给0值

        hundredArr[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 初始化一行
        hundredArr[i][numHundred[i]] = 0; // 开奖号码，给0值

        tenArr[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 初始化一行
        tenArr[i][numTen[i]] = 0; // 开奖号码，给0值

        oneArr[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 初始化一行
        oneArr[i][numOne[i]] = 0; // 开奖号码，给0值
        if (i != 0) { // 除去第一行不处理
            for (var j = 0; j < 10; j++) {
                if (millionArr[i][j] != 0) { // 如果本行的数不等于0
                    // 本行+1
                    millionArr[i][j] = millionArr[i - 1][j] + 1;
                }
                if (thousandArr[i][j] != 0) { // 如果本行的数不等于0
                    // 本行+1
                    thousandArr[i][j] = thousandArr[i - 1][j] + 1;
                }
                if (hundredArr[i][j] != 0) { // 如果本行的数不等于0
                    // 本行+1
                    hundredArr[i][j] = hundredArr[i - 1][j] + 1;
                }
                if (tenArr[i][j] != 0) { // 如果本行的数不等于0
                    // 本行+1
                    tenArr[i][j] = tenArr[i - 1][j] + 1;
                }
                if (oneArr[i][j] != 0) { // 如果本行的数不等于0
                    // 本行+1
                    oneArr[i][j] = oneArr[i - 1][j] + 1;
                }
            }
        }
    });
    // 万位html处理
    $.each(pcodeArr, function (i, t) {
        million_html += '<td>' + t + '期</td>';
        thousand_html += '<td>' + t + '期</td>';
        hundred_html += '<td>' + t + '期</td>';
        ten_html += '<td>' + t + '期</td>';
        one_html += '<td>' + t + '期</td>';

        // numMillion.push(parseInt(winNumber[0]))
        // numThousand.push(parseInt(winNumber[1]))
        // numHundred.push(parseInt(winNumber[2]))
        // numTen.push(parseInt(winNumber[3]))
        // numOne.push(parseInt(winNumber[4]))
        $.each(millionArr[i], function (j, u) {
            million_html += '<td>' + u + '</td>';
        });
        $.each(thousandArr[i], function (j, u) {
            thousand_html += '<td>' + u + '</td>';
        });
        $.each(hundredArr[i], function (j, u) {
            hundred_html += '<td>' + u + '</td>';
        });
        $.each(tenArr[i], function (j, u) {
            ten_html += '<td>' + u + '</td>';
        });
        $.each(oneArr[i], function (j, u) {
            one_html += '<td>' + u + '</td>';
        });
        million_html += '</tr>';
        thousand_html += '</tr>';
        hundred_html += '</tr>';
        ten_html += '</tr>';
        one_html += '</tr>';
    });
    $('.so-zs-0').html('');
    $('.so-zs-1').html('');
    $('.so-zs-2').html('');
    $('.so-zs-3').html('');
    $('.so-zs-4').html('');
    $('.so-zs-0').html(million_html);
    $('.so-zs-1').html(thousand_html);
    $('.so-zs-2').html(hundred_html);
    $('.so-zs-3').html(ten_html);
    $('.so-zs-4').html(one_html);
    initOpenNumsShow();
}

TouchSlide({
    slideCell: '#trend_content'
});
