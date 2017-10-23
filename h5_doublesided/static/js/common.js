
/*
* 公用方法开始
* */

// 设置cookie
function setCookie (name, value, expire, path) {
    var curdate = new Date();
    var cookie = name + '=' + encodeURIComponent(value) + '; ';
    if (expire != undefined || expire == 0) {
        if (expire == -1) {
            expire = 366 * 86400 * 1000;// 保存一年
        } else {
            expire = parseInt(expire);
        }
        curdate.setTime(curdate.getTime() + expire);
        cookie += 'expires=' + curdate.toUTCString() + '; ';
    }
    path = path || '/';
    cookie += 'path=' + path;
    document.cookie = cookie;
}

// 获取cookie
function getCookie (name) {
    var re = '(?:; )?' + encodeURIComponent(name) + '=([^;]*);?';
    re = new RegExp(re);
    if (re.test(document.cookie)) {
        return decodeURIComponent(RegExp.$1);
    }
    return '';
}

// 时间戳转换
function formatTimeUnlix (v) {
    if (v == null) {
        return '';
    }
    var date = new Date(v);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
    var hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    var minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    var seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}

// 金额转换,分转成元
function roundAmt (v) {
    return isNaN(v) ? '0.00' : (v / 100).toFixed(2);
}

// 金额转换，支持实数, 元转成分
function monAmt (v) {
    return /^[-+]?\d+(\.\d*)?$/.test(v) ? v * 100 : '';
}

/*
 * 数字转换，显示千位符，s 要转换的数字，n 保留n位小数
 * */
function fortMoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    t = "";
    for(i = 0; i < l.length; i ++ ){
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}
/*
 * 数字转千分位
 * */
function formatNumber (num) {
    return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

/*
 * 还原金额，去除逗号
 * */
function returnMoney(s) {
    return parseFloat(s.replace(/[^\d\.-]/g, ""));
}




/**
 * 解析URL参数
 */
function getStrParam () {
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



/*
* 公用方法结束
* */


/* 全局变量定义 */
var access_token = ' ';
var action = {
    forseti: 'http://122.53.134.66:19091/forseti/',
    uaa: 'http://122.53.134.66:19091/uaa/',
};
var now_pcode; // 当前期数
var now_time; // 当前期数销售截止时间
var next_pcode; // 下一期数销售截止时间
var sys_time; // 当前系统时间
var now_day; // 当前日期
// var dataPlay = {}; // 玩法树数据
// var dataPlayAll = {}; // 玩法树数据最终组装
var lotterytype = 0;



LoginAction();

setTimeout(function () {

    getSystemTime(); // 系统时间
    // getLotterys('.game-all', '.game-hot'); // 获取彩种
    getPlayTree(1);  // 玩法
    getMemberBalance(); // 获取用户余额


}, 500) ;

// token 处理
function getAccessToken(access_token) {
    if (access_token && access_token.length > 10) {
        // console.log(access_token)
        return access_token;
    } else {
        console.log('从cookie');
        var tmp = getCookie("access_token");
        return tmp;
    }

}


// 登录接口
function LoginAction() {
    $.ajax({
        type: 'post',
        headers: {Authorization: 'Basic d2ViX2FwcDo='},
        url: action.uaa + 'oauth/token',
        // data: { grant_type :'password',username :'mgappid01|frank456',password :'frank456' } ,
        data: {grant_type: 'password', username: 'mgappid01|admin', password: 'admin'},
        success: function (res) {
            access_token = res.access_token;
            setCookie("access_token", res.access_token);  // 把登录token放在cookie里面
            setCookie("username", "mgappid01|admin");  // 把登录用户名放在cookie里面
        },
        error: function () {

        }
    });
}

// 获取彩种
function getLotterys(all, hot) {
    $.ajax({
        type: 'GET',
        url: action.forseti + 'apis/lotterys',
        data: {},
        dataType: 'json',
        success: function (res) {
            var allstr = '';  // 全部彩种
            var hotstr = '';  // 热门彩种

            $.each(res.data, function (i, v) { // 通过 v.cid 跳转到每个彩种
                allstr += '<a href="javascript:;">' +
                    '<div class="menu_logo"><img src="' + v.imgUrl + '"></div>' +
                    ' <div class="menu_name">' +
                    ' <h2>' + v.name + '</h2>' +
                    ' <span>' + v.periodDesc + '</span>' +
                    '</div> </a>';
                if (v.ifHot == '1') {
                    hotstr += '<a href="javascript:;">' +
                        '<div class="menu_logo"><img src="' + v.imgUrl + '"></div>' +
                        ' <div class="menu_name">' +
                        ' <h2>' + v.name + '</h2>' +
                        ' <span>' + v.periodDesc + '</span>' +
                        '</div> </a>';
                }

            });

            $(all).html(allstr);
            $(hot).html(hotstr);

        },
        error: function () {

        }
    });
}

// 玩法树
function getPlayTree(gameid) {
    $.ajax({
        type: 'get',
        headers: {
            "Authorization": "bearer  " + getAccessToken(access_token),
        },
        url: action.forseti + 'api/playsTree',
        data: {lotteryId: gameid,}, // 当前彩种id
        success: function (res) {


        },
        error: function () {

        }
    });
}


// 获取系统时间
function getSystemTime() {
    $.ajax({
        type: 'get',
        headers: {
            "Authorization": "bearer  " + getAccessToken(access_token),
        },
        url: action.forseti + 'apis/serverCurrentTime',
        data: {},
        success: function (res) {
            sys_time = formatTimeUnlix(res.data);

            priodDataNewly(1); // 最近5期开奖，获取系统时间后再调用

        },
        error: function () {

        }
    });
}

// 获取用户余额
function getMemberBalance() {
    $.ajax({
        type: 'GET',
        headers: {
            "Authorization": "bearer  " + getAccessToken(access_token),
        },
        // dataType:'json',
        // contentType:"application/json; charset=utf-8",  // json格式传给后端
        url: action.uaa + '/api/data/member/getMemberBalance',
        data: {},
        success: function (res) {
            // var mom = roundAmt(res.data.amount) ;
            var mom = fortMoney(roundAmt(res.data.amount), 2);
            $('.membalance').text(mom);
            $('.user_name').text(getCookie('username'));
            setCookie("membalance", mom);  // 把登录余额放在cookie里面
            // console.log(returnMoney(mom))
        },
        error: function () {

        }
    });
}
// 最新开奖期数
function priodDataNewly(gameid) {
    $.ajax({
        type: 'get',
        headers: {
            "Authorization": "bearer  " + getAccessToken(access_token),
        },
        url: action.forseti + 'api/priodDataNewly',
        data: {lotteryId: gameid,},
        success: function (res) {

            next_pcode = res.data[0].pcode;  // 下一期数
            now_pcode = res.data[1].pcode;  // 当前期数
            now_time = formatTimeUnlix(res.data[1].endTime);  // 当前期数
            now_day = ( res.data[1].pcode).toString().substr(0, 8);  // 当天日期
            processCode( res.data[1].pcode, res.data[2].pcode, res.data[2].winNumber) ;

            setTimeout(function () {
                setCookie("lt_lottid",1);  // 把彩票 lottery id 放在cookie里面
                $('.name-lottery').html($.lt_lotteryName); // 当前彩种名称
                // 倒计时
                lt_timer(sys_time,now_time) ;

            }, 100)

        },
        error: function () {

        }
    });
}
//倒计时处理
function lt_timer(start, end) { //服务器开始时间，服务器结束时间
    var lt_time_leave ;
    if (start == '' || end == '') {
       lt_time_leave = 0;
    } else {
       lt_time_leave = (format(end).getTime() - format(start).getTime()) / 1000;//总秒数
    }

    function fftime(n) {
        return Number(n) < 10 ? '' + 0 + Number(n) : Number(n);
    }

    function format(dateStr) {//格式化时间
        return new Date(dateStr.replace(/[\-\u4e00-\u9fa5]/g, '/'));
    }

    function diff(t) {//根据时间差返回相隔时间
        return t > 0 ? {
            day: Math.floor(t / 86400),
            hour: Math.floor(t % 86400 / 3600),
            minute: Math.floor(t % 3600 / 60),
            second: Math.floor(t % 60)
        } : {day: 0, hour: 0, minute: 0, second: 0};
    }
    function _getSystemTime() { // 获取系统时间
        $.ajax({
            type: 'get',
            url: action.forseti + 'apis/serverCurrentTime',
            headers: {
                'Authorization': 'bearer  ' + access_token
            },
            timeout: 30000,
            data: {} ,
            success: function (data) { //成功
                // console.log(data) ;
               // sys_time = formatTimeUnlix(data.data); // 更新系统时间
                lt_time_leave = (format(now_time).getTime() - format(formatTimeUnlix(data.data)).getTime()) / 1000 ;

            }
        });
    }

    /* function formatDate(date, format) {
     if (!date) {
     return;
     }
     if (!format) {
     format = "yyyy-MM-dd";
     }
     switch (typeof date) {
     case "string":
     var da = date.replace("年", "-").replace("月", "-").replace("日", "").replace(/-/g, "/").split(/\/|\:|\ /);
     date = new Date(da[0],da[1] - 1,da[2],da[3],da[4],da[5]);
     break;
     case "number":
     date = new Date(date);
     break;
     }
     if (!date instanceof Date) {
     return;
     }
     var dict = {
     "yyyy": date.getFullYear(),
     "M": date.getMonth() + 1,
     "d": date.getDate(),
     "H": date.getHours(),
     "m": date.getMinutes(),
     "s": date.getSeconds(),
     "MM": ("" + (date.getMonth() + 101)).substr(1),
     "dd": ("" + (date.getDate() + 100)).substr(1),
     "HH": ("" + (date.getHours() + 100)).substr(1),
     "mm": ("" + (date.getMinutes() + 100)).substr(1),
     "ss": ("" + (date.getSeconds() + 100)).substr(1)
     };
     return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
     return dict[arguments[0]];
     });
     }
     function formatTimer(seconds) {
     var day = Math.floor(seconds / (3600 * 24));
     var remain = seconds % (3600 * 24);
     var timezoneOffset = (new Date()).getTimezoneOffset();
     return (day > 0 ? (day + "天") : "") + " " + formatDate(remain * 1000 + timezoneOffset * 60 * 1000, "HH:mm:ss");
     }*/
    /*  var timer = window.setInterval(function() {
     $.lt_time_leave-- ;
     console.log($.lt_time_leave)
     if ($.lt_time_leave <= 0) {
     window.clearInterval(timer);
     /!* MainJS.dataCache[_this.resultCacheKey] = null;
     _this.refreshModule();*!/
     } else {
     console.log('电风扇')
     // $(me).html('' + (oDate.day > 0 ? oDate.day + (lot_lang.dec_s21) + ' ' : '') + '<div class="hour">' + fftime(oDate.hour) + ':</div><div class="min">' + fftime(oDate.minute) + ':</div><div class="sec">' + fftime(oDate.second) + '</div>');
     $(".m-n-countdown").text(formatTimer($.lt_time_leave));
     }
     }, 1000);*/
    /*  window.addEventListener('pageshow', function(event) {
     alert('合适的');

     })*/

    var timerno = window.setInterval(function () {
        if (lt_time_leave > 0 && (lt_time_leave % 240 == 0 || lt_time_leave == 60 )) {   //每隔4分钟以及最后一分钟重新读取服务器时间
            _getSystemTime();

        }

        if (lt_time_leave <= 0) { //结束
            clearInterval(timerno);
            outTimeSet() ;
            console.log('停止当前期数');
        }

        var oDate = diff(lt_time_leave--);
        // 开奖倒计时
        $('.open-time').html( fftime(oDate.minute) + ':' + fftime(oDate.second) );
        // 封盘倒计时
        $('.close-time').html( fftime(oDate.minute) + ':' + fftime(oDate.second) );

    }, 1000);
};

// 倒计时结束后处理
function outTimeSet() {
    $.ajax({
        type: 'get',
        url: $.lt_ajaxurl,
        headers: {
            'Authorization': 'bearer  ' + access_token
        },
        data: getCookie('lt_lottid'),
        success: function (res) {  //成功
            console.log('拉取期数成功');
            // 开奖数据处理
            processCode( res.data[1].pcode, res.data[2].pcode, res.data[2].winNumber) ;
            getSystemTime();  // 获取当前系统时间

            if (res.length <= 0) {  // 获取数据失败
              /*  layer.open({
                    title: '温馨提示',
                    className: 'layer_tip',
                    content: lot_lang.am_s16,
                    btn: '确定'
                });*/
                return false;
            }

            if (res == 'empty') { 	//未到销售时间
              /*  layer.open({
                    content: lot_lang.am_s18,
                    btn: '确定'
                });*/
                return false;
            }

        },
        error: function () {  //失败
          /*  layer.open({
                title: '温馨提示',
                className: 'layer_tip',
                content: lot_lang.am_s16,
                btn: ['确定'],
                yes: function (index) {
                   // cleanTraceIssue();
                    layer.close(index);
                }
            });
            */
            return false;
        }
    });
}

//  开奖数据处理 ,issue 当前期数，lastissue 上期期数，code 上期开奖号码
function processCode(issue, lastissue,code) {
    $('.last-date').html(lastissue) ;
    $('.now-date').html(issue) ;
    if (!code) {
        code = '-,开,奖,中,-';
    }
    var code_arr = code.split(',');
    var str = '';
    //已开奖期号节点,开奖号码
    for (var i = 0; i < code_arr.length; i++) {
        str +='<li>'+ code_arr[i] +'</li>' ;
    }
    $('.last-open-num ul').html(str) ;

}
