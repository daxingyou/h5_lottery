
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
// 格式化时间
function formatTime (date) {
    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minutes = date.getMinutes();
    month = month > 9 ? month : '0' + month;
    day = day > 9 ? day : '0' + day;
    hour = hour > 9 ? hour : '0' + hour;
    minutes = minutes > 9 ? minutes : '0' + minutes;
    return month + '-' + day + ' ' + hour + ':' + minutes;
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

/*
 *  正整数判断，不包含零
 * */

function  isPositiveNum(num) {
    //  var re = /^[0-9]*[1-9][0-9]*|0$/ ;
    var re=/^[0-9]*$/;
    return re.test(num);
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
    forseti: 'http://121.58.234.210:19091/forseti/',
    uaa: 'http://121.58.234.210:19091/uaa/',
};
var now_pcode; // 当前期数
var now_time; // 当前期数销售截止时间
var next_pcode; // 下一期数销售截止时间
var sys_time; // 当前系统时间
var now_day; // 当前日期
// var dataPlay = {}; // 玩法树数据
// var dataPlayAll = {}; // 玩法树数据最终组装
var lotterytype = 0;
var xlen = 1 ; // 江西11选5 二中二、三中三等

$(function () {
    LoginAction();
    setTimeout(function () {
       // getSystemTime(); // 系统时间
        // getLotterys('.game-all', '.game-hot'); // 获取彩种

        getMemberBalance(); // 获取用户余额


    }, 500) ;

    initChoiceObj() ; // 球点击处理
    initPopEve() ; // 表单提交判断

})



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

        $.each(res.data.childrens,function (i,v) { // 遍历数据
           // console.log(v) ;
            $.each(v.childrens,function (j,vv) {
                $(".so-con-right p").each(function (i, t) {
                   var playid = $(this).data('id') ;
                   if(playid == vv.cid){
                       $(this).find('.bet-times').text(vv.oddsData.payoff) ; // 每种玩法赔率
                   }


                });
              //  console.log(vv.cid) ;

            }) ;
        }) ;

        },
        error: function () {

        }
    });
}


// 获取系统时间，lotteryid 彩种id
function getSystemTime(lotteryid) {
    $.ajax({
        type: 'get',
        headers: {
            "Authorization": "bearer  " + getAccessToken(access_token),
        },
        url: action.forseti + 'apis/serverCurrentTime',
        data: {},
        success: function (res) {
            sys_time = formatTimeUnlix(res.data);

            priodDataNewly(lotteryid); // 最近5期开奖，获取系统时间后再调用

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
            $('.so-in-top-sum').text(mom);
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
            if(res.data){
                next_pcode = res.data[0].pcode;  // 下一期数
                now_pcode = res.data[1].pcode;  // 当前期数
                now_time = formatTimeUnlix(res.data[1].endTime);  // 当前期数
                now_day = ( res.data[1].pcode).toString().substr(0, 8);  // 当天日期
                processCode( res.data[1].pcode, res.data[2].pcode, res.data[2].winNumber) ;

                setTimeout(function () {
                    $('.name-lottery').html($.lt_lotteryName); // 当前彩种名称
                    // 倒计时
                    lt_timer(sys_time,now_time) ;

                }, 100)
            }


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


    var timerno = window.setInterval(function () {
        if (lt_time_leave > 0 && (lt_time_leave % 240 == 0 || lt_time_leave == 60 )) {   //每隔4分钟以及最后一分钟重新读取服务器时间
            _getSystemTime();

        }

        if (lt_time_leave <= 0) { // 倒计时结束
            clearInterval(timerno);
            initBetPop01(3) ;
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
    // 拉取期数数据
    var lotteryid = getCookie('lt_lottid') ;
    $.ajax({
        type: 'get',
        headers: {
            "Authorization": "bearer  " + getAccessToken(access_token),
        },
        url: action.forseti + 'api/priodDataNewly',
        data: { lotteryId: lotteryid },
        success: function (res) {  //成功
            console.log('拉取期数成功');
            // 开奖数据处理
            processCode( res.data[1].pcode, res.data[2].pcode, res.data[2].winNumber) ;
            getSystemTime(lotteryid);  // 获取当前系统时间

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

// 本期投注已结束
function initBetPop01(closet) {
        $('.so-bet-end-pop').toggle();
        $('.so-shade').toggle();
    $('.so-bet-end-pop').click(function () {
        $('.so-bet-end-pop').toggle();
        $('.so-shade').toggle();
    });
    setTimeout(function () {
        $('.so-bet-end-pop,.so-shade').hide() ;
    },closet*1000) ; // 自动关闭
}

//  开奖数据处理 ,issue 当前期数，lastissue 上期期数，code 上期开奖号码
function processCode(issue, lastissue,code) {
    $('.last-date').html(lastissue) ;
    $('.now-date').html(issue) ;
    if (!code) {
        code = '-,中,奖,开,-';
    }
    var code_arr = code.split(',');
    var str = '';
    //已开奖期号节点,开奖号码
    for (var i = 0; i < code_arr.length; i++) {
        str +='<li>'+ code_arr[i] +'</li>' ;
    }
    $('.last-open-num ul').html(str) ;

}

//此方法用来控制盘面选择,更新盘面信息后应该重新调用一次
function initChoiceObj() {
    $('.so-con-right').on('click','p',function () {
        var _this =  $(this) ;
        var className = _this.attr("class") || "" ;
        if (className.indexOf("active") >= 0) {
            _this.attr("class", className.replace("active", "")) ;
        } else {
            _this.attr("class", className + " active") ;
        }
        // 已选注数
        var choosed =  $(".so-con-right p.active").length ;

        var pid = _this.parents('ul.tab_content').attr('id') ;
        var paid = '#'+pid ;
        var z_choosed =  $(paid+' p.active').length ; // 二中二，三中三等
        // var ifSp = 0 ;
       // var spArr = [] ; // 二中二，三中三等
        if(pid){ // 二中二，三中三等
            checkNumbers(pid,z_choosed,_this) ;
           // sessionStorage.setItem(pid,paid) ;
            var spchoose = parseInt(z_choosed/xlen)+(choosed-z_choosed) ;
            $('.bet-select-num').text(spchoose) ;

        }else{
            $('.bet-select-num').text(choosed-parseInt(z_choosed/2)) ;
        }

    }) ;

}

/*
* 江西11选5 ,method 玩法，len 长度
* */
function checkNumbers(method,len,self) {
    switch (method) {
        case 'tab_jx_eze': // 二中二
            xlen = 2 ;
        if(len>2){
            initPopFengpan02(3,len-1) ;
            self.removeClass('active') ;
            return false ;
        }
            break;
        case 'tab_jx_szs': // 三中三
            xlen = 3 ;
            if(len>3){
                initPopFengpan02(3,len-1) ;
                self.removeClass('active') ;
                return false ;
            }
            break;
        case 'tab_jx_sizsi': // 四中四
            xlen = 4 ;
            if(len>4){
                initPopFengpan02(3,len-1) ;
                self.removeClass('active') ;
                return false ;
            }
            break;
        case 'tab_jx_wzw': // 五中五
            xlen = 5 ;
            if(len>5){
                initPopFengpan02(3,len-1) ;
                self.removeClass('active') ;
                return false ;
            }
            break;
        case 'tab_jx_lzw': // 六中五
            if(len>6){
                initPopFengpan02(3,len-1) ;
                self.removeClass('active') ;
                return false ;
            }
            break;
        case 'tab_jx_qzw': // 七中五
            if(len>7){
                initPopFengpan02(3,len-1) ;
                self.removeClass('active') ;
                return false ;
            }
            break;
        case 'tab_jx_bzw': // 八中五
            if(len>8){
                initPopFengpan02(3,len-1) ;
                self.removeClass('active') ;
                return false ;
            }
            break;
        case 'tab_jx_qez': // 前二组选

            break;
        case 'tab_jx_qsz': // 前三组选

            break;
        default :

            break;
    }

}



//此方法弹出结算框 ,注单数量，添加按钮
function initPopEve() {
    $(".so-add").click(function () {
        var amount = $('.bet-amount').val() ;  // 获取金额
        var nums = Number($('.bet-select-num').text()) ;  // 获取注数
        if(nums<1){ // 没有选择投注项目
            $('.bet-error-content').html('请选择投注项目') ;
            $(".so-tip-pop-04").toggle() ;
            $(".so-shade").toggle() ;
            return false;
        }

        if(!amount || !isPositiveNum(amount) || amount =='0'){ // 投注金额不正确
            $('.bet-error-content').html('请输入整数的投注金额，金额不能为0') ;
            $(".so-tip-pop-04").toggle() ;
            $(".so-shade").toggle() ;
            return false;
        }
        // 注单金额正确
        $(".so-pop").toggle() ;
        $(".so-shade").toggle() ;

        doCheckAction() ;  // 注单结算

    }) ;

    // 关闭当前窗口
    $(".so-pop a").click(function () {
        $(".so-pop").toggle() ;
        $(".so-shade").toggle() ;
    }) ;

    // 投注金额提示弹窗关闭
    $(".so-tip-pop-04").click(function () {
        $(".so-tip-pop-04").toggle() ;
        $(".so-shade").toggle() ;
    }) ;
}

// 下注弹窗_成功，失败 ,closetime 关闭时间
function initTipPop05(flag,closetime,content) {
    // 成功
    if(flag){
        $('.so-tip-pop-05').toggle();
        $('.so-shade').toggle();
        $('.so-tip-pop-05').click(function () {
            $('.so-tip-pop-05').toggle();
            $('.so-shade').toggle();
        });
    }else{
        // 失败
        $(".so-tip-pop-06").toggle() ;
        $(".so-shade").toggle() ;
        $(".so-tip-pop-06").click(function () {
            $(".so-tip-pop-06").toggle() ;
            $(".so-shade").toggle() ;
        });
        $('.submit-error-content').html(content) ; // 投注失败提示
    }
    setTimeout(function () {
        $('.so-tip-pop-05,.so-shade,.so-tip-pop-06').hide() ;
    },closetime*1000)

}
// 投注项目超过规定数量
function initPopFengpan02(closet,num) {
        $('.so-fengpan-pop-02').toggle();
        $('.so-shade').toggle();

       $('.so-fengpan-pop-02').click(function () {
        $('.so-fengpan-pop-02').toggle();
        $('.so-shade').toggle();
    });
     $('.not-allow-content').text(num) ;
       setTimeout(function () {
           $('.so-fengpan-pop-02,.so-shade').hide() ;
       },closet*1000) ;

}

/*
* 提交表单时，注单处理
*
* */
function doCheckAction() {
    var bet_num = $('.bet-select-num').text() ; // 总注数
    var bet_mon = $.trim($('.bet-amount').val()) ; // 投注金额
    var all_bet_mon = Number(bet_num)*Number(bet_mon) ; // 总投注金额
    var betstr = '' ;
    $(".so-con-right p").each(function (i, t) {
    // 已选择的注单
    if($(this).hasClass('active')){
        var total_title = $(this).parents('.select-li').find('h2').text() ;  // 大标题
        var total_con = $(this).find('span:nth-child(1)').text() ;  // 投注内容
        var total_mon = $(this).find('span:nth-child(2)').text() ;  // 投注内容赔率
        var total_id = $(this).data('id') ;  // 投注内容玩法id
        betstr +='<p data-id="'+total_id+'">【<span class="each-title">'+ total_title +'</span>-<span class="each-content">'+ total_con +'</span>】 @ <span class="each-times">'+ total_mon+'</span> x <span class="each-mon"> '+ bet_mon +'</span></p>' ;

    }
    });
    $('.bet-go-list').html(betstr) ;

    // 总注数
    $('.total-bet-num').text(bet_num) ;
    // 总金额
    $('.total-bet-mon').text(all_bet_mon) ;

}

/*
* 表单提交，下注接口,lotteryid 彩种id
* */

function submitAction(lotteryid) {

    var total_mon = Number($('.total-bet-mon').text()) ; // 总投注金额
    // 余额不足提示充值
    if (monAmt(total_mon) > monAmt(Number(returnMoney($('.so-in-top-sum').eq(0).text())))) {
        initTipPop05(false,3,'您的余额不足<br/>请充值后继续进行！') ;
        return false;
    }

    var resdata = {
        'list': [ ],
        'amount': monAmt(total_mon),  //总金额，此金额=所有注单总金额
        'lotteryId': lotteryid ,  //彩种id
        'operType': 0, //下注类型，1下注
        'pcode': $('.now-date ').eq(0).text(), //期次20170925013
        'pdate': now_day, //日期20170925
        'remark': '无',//备注，可用于测试
        'source': 'h5', //来源：h5
        'sourceType':'2', // 1是pc端，2是h5

    };

    $.each($('.bet-go-list p'), function (i, n) {  // 遍历每笔注单
        var num_each = 1 ;  // 每单注数
      //  var time_each = 1 ;  // 每单倍数
        var total_each = returnMoney($(n).find('.each-mon').text()) ;  // 每单金额
        var play_each = $(n).data('id');  // 每单玩法
       // var play_type = $(n).find('.ui_bet_title').data('type');  // 每单投注模式，元，角，分
        var new_num = $(n).find('.each-content').html() ;  //下注内容

        // 下注以对象的形式传递
        resdata.list.push(
            {  // 一条数据就是一个方案，一个方案可以有多条下注
                'betAmount': monAmt(Number(total_each)), //下注金额，元的模式下需要 x100传值，角的模式下 x10
                'betContent': new_num.toString(),//下注内容，如1,5,8,3,7
                'betCount': Number(num_each), //注单数
                'betMode': 0, //下注模式(预留)
                'chaseCount': 1, //追号期数(含当期),默认1
               // 'chaseWinStop': if_zt ,//是否追中即停，0不追停，1追停
               'ifChase': 0 , //是否追号,0不追号，1追号
                'moneyMode': 'y' ,//付款类型：元y，角j，分f
                'multiple': Number(total_each), //倍数最少为1
                'payoff': 0, //派彩
                'playId': play_each, //玩法
                'remark': '无'//备注
            });

    });
   // $('.so-shade').show() ;
    $.ajax({
        type: 'POST',
        headers: {
            'Authorization': 'bearer  ' + access_token,
            // 'sourceType':'2', // 1是pc端，2是h5
            // 'sideType':'1',  // 1是传统盘，2是双面盘
        },
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: action.forseti + 'api/orders/betOrder',
        timeout: 600000,
        //  data:  $(form).serialize() + "&randomNum=" + randomNum ,
        data: JSON.stringify(resdata),
        success: function (data) {
           // $('.so-shade').hide() ;
            //解决瞬间提交2次的问题
           // ajaxSubmitAllow = true;
            if (data.length <= 0) {
              /*  layer.open({
                    title: '温馨提示',
                    className: 'layer_tip',
                    content: lot_lang.am_s16,
                    btn: '确定'
                });*/

                return false;
            }

            if (data.err == 'SUCCESS') {  //购买成功
                initTipPop05(true,3) ;
                resetAction() ;
                return false;
            } else {  //购买失败提示

                if(data.data =='' || data.data ==null){ // 平台商不存在

                    initTipPop05(false,3,data.msg) ;
                }else{   // 各种错误提示
                    if(data.data.params.ErrInfo !=''){
                        initTipPop05(false,3,data.data.params.ErrInfo) ;

                    }
                }

                return false ;

            }
        },
        error: function (res) {  // 错误提示
            initTipPop05(false,3,'投注失败，请稍后再试') ;
           // ajaxSubmitAllow = true;

        }
    });
    

}

/*
* 重置投注页，提交表单后调用
* */
function resetAction() {
    $(".so-con-right p").each(function (i, t) {
        $(this).removeClass('active') ;
        $('.bet-select-num').text('0') ;
        $('.bet-amount').val('0') ;
    })
}