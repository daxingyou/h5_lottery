
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
//清除所有cookie函数
function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    console.log(keys)
    if(keys) {
        for(var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
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


var access_token = ' ';
var now_pcode; // 当前期数
var now_time; // 当前期数销售截止时间
var nowover_time; // 当前期数封盘时间
var next_pcode; // 下一期数销售截止时间
var sys_time; // 当前系统时间
var now_day; // 当前日期

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

// 判断用户是否登录
function ifLogined() { // 判断是否登录
    if (this.getCookie('username') && this.getCookie('access_token')) {
        return /\S/g.test(this.getCookie('username')) && /\S/g.test(this.getCookie('access_token'));
    } else {
        return false;
    }
}

// 获取彩种
function getLotterys(all) {

    $.ajax({
        type: 'GET',
        url: action.forseti + 'apis/lotterys',
        data: { sideType :2 }, // sideType， 1官彩，2双面彩，为空默认为1，即官彩
        dataType: 'json',
        success: function (res) {
            var allstr = '';  // 全部彩种

            $.each(res.data, function (i, v) { // 通过 v.cid 跳转到每个彩种
                var lotteryid = v.cid.toString() ;  // 要转换字符串
                var hrefUrl = '' ;
                switch (lotteryid) {
                    case '1':  // 重庆时时彩传统盘
                       // hrefUrl = '../web_cqssc' ;
                        hrefUrl = 'web_cqssc/index.html' ;
                        break;
                    case '2':  // 重庆时时彩双面盘
                        hrefUrl = 'web_cqssc/index.html' ;
                        break;
                    case '3':  // 江西11选5传统盘
                        hrefUrl = 'web_jc11x5/index.html' ;
                        break;
                    case '4':  // 江西11选5双面盘
                        hrefUrl = 'web_jc11x5/index.html' ;
                        break;
                    case '6' : // 江苏K3双面盘
                        hrefUrl = 'web_k3/index.html';
                        break;
                    case '7':  // 北京pk10传统盘
                        hrefUrl = 'web_pk10/index.html' ;
                        break;
                    case '8':  // 北京pk10双面盘
                        hrefUrl = 'web_pk10/index.html' ;
                        break;
                    case '12':  // 天津时时彩双面盘
                        hrefUrl = 'web_tjssc/index.html' ;
                        break;
                    case '14':  // 新疆时时彩双面盘
                        hrefUrl = 'web_xjssc/index.html' ;
                        break;
                    case '16':  // 广东11选5双面盘
                        hrefUrl = 'web_gd11x5/index.html' ;
                        break;
                    case '18':  // 山东11选5双面盘
                        hrefUrl = 'web_sd11x5/index.html' ;
                        break;
                    case '20':  // 安徽 K3 双面盘
                        hrefUrl = 'web_ahk3/index.html' ;
                        break;
                    case '22':  // 河北 K3 双面盘
                        hrefUrl = 'web_hbk3/index.html' ;
                        break;
                    default:
                        hrefUrl = '' ;
                        break ;
                }
                allstr += ' <li >' ;
                        if(all =='.lobby_all_lottery'){  // 大厅首页情况下 跳转
                            allstr += ' <a class="to_lottery" href="'+hrefUrl+'"> ' +
                                 '<div class="badge">'+
                                '<img src="'+v.imgUrl+'" alt="">' ;
                        }else{  // 各彩种 跳转
                            allstr += ' <a class="to_lottery" href="../'+hrefUrl+'"> '+
                                '<div class="badge">'+
                                '<img src="'+v.imgUrl+'" alt="">' ;
                        }

                     allstr += '</div>'+
                               '</a> '+
                               '<p>'+ v.name +'</p>'+
                               '</li>' ;
            });

            $(all).html(allstr);

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
                       $(this).find('.bet-times').text((Number(vv.oddsData.payoff)/10000).toFixed(3)) ; // 每种玩法赔率
                   }


                });
              //  console.log(vv.cid) ;

            }) ;
        }) ;

        },
        error: function () {
            initPopEve(2,'您的登录已过期，请重新登录') ;
            return false ;
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
        error: function (res) {
            initPopEve(2,'您的登录已过期，请重新登录') ;
            return false ;
        }
    });
}

// 获取用户余额
function getMemberBalance(lotteryid) {
    $.ajax({
        type: 'GET',
        headers: {
            "Authorization": "bearer  " + getAccessToken(access_token),
        },
        // dataType:'json',
        // contentType:"application/json; charset=utf-8",  // json格式传给后端
        url: action.hermes + 'api/balance/get',
        data: { lotteryId: lotteryid },
        success: function (res) {
            var mom = fortMoney(roundAmt(res.data.balance), 2);  // 用户余额
            var todaymom = fortMoney(roundAmt((res.data.payoff).toString().replace(/-/g,'')), 2);  // 今日输赢
           // var todaymom = fortMoney(roundAmt(res.data.payoff), 2);  // 今日输赢
            if(Number(res.data.payoff)>= 0){  // 今日输赢
                $('.today_payoff').addClass('win_payoff').html('(\+'+todaymom+'\)');
            }else{
                $('.today_payoff').addClass('lose_payoff').html('(\-'+todaymom+'\)');
            }
            $('.so-in-top-sum').text(mom); // 用户余额
            $('.user_name').text(getCookie('username'));
            setCookie("membalance", mom);  // 把登录余额放在cookie里面
            // console.log(returnMoney(mom))
        },
        error: function () {
            initPopEve(2,'您的登录已过期，请重新登录') ;
            return false ;
        }
    });
}
// 最新开奖期数 ，timer 倒计时 参数
function priodDataNewly(gameid,timer) {
    $.ajax({
        type: 'get',
        headers: {
            "Authorization": "bearer  " + getAccessToken(access_token),
        },
        url: action.forseti + 'api/priodDataNewly',
        data: {lotteryId: gameid,},
        success: function (res) {
            if(res.data){
                if(timer =='timer'){
                    processCode( res.data[1].pcode, res.data[2].pcode, res.data[2].winNumber,res.data[2].doubleData) ;
                }else{
                    next_pcode = res.data[0].pcode;  // 下一期数
                    now_pcode = res.data[1].pcode;  // 当前期数
                    now_time = formatTimeUnlix(res.data[1].endTime);  // 当前期数时间
                    nowover_time = formatTimeUnlix(res.data[1].prizeCloseTime);  // 当前期封盘时间
                    now_day = ( res.data[1].pcode).toString().substr(0, 8);  // 当天日期
                    processCode( res.data[1].pcode, res.data[2].pcode, res.data[2].winNumber,res.data[2].doubleData) ;

                    setTimeout(function () {
                        // 倒计时
                        lt_timer(sys_time,now_time,nowover_time) ;
                        $('.so-fengpan').hide() ; // 隐藏封盘容器
                    }, 100)
                }

            }


        },
        error: function () {
            initPopEve(2,'您的登录已过期，请重新登录') ;
            return false ;
        }
    });
}
//倒计时处理
function lt_timer(start, end,overend) { // start服务器开始时间，end当前期开奖结束时间，overend 封盘结束时间
    var lt_time_leave ;
    var lt_time_leave_over ;
    if (start == '' || end == '') {
       lt_time_leave = 0;
       lt_time_leave_over = 0;
    } else {
       lt_time_leave = (format(end).getTime() - format(start).getTime()) / 1000;//总秒数
       lt_time_leave_over = (format(overend).getTime() - format(start).getTime()) / 1000;//总秒数
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
                'Authorization': 'bearer  ' + getAccessToken(access_token) ,
            },
            timeout: 30000,
            data: {} ,
            success: function (data) { //成功
                // console.log(data) ;
               // sys_time = formatTimeUnlix(data.data); // 更新系统时间
                lt_time_leave = (format(now_time).getTime() - format(formatTimeUnlix(data.data)).getTime()) / 1000 ;
                lt_time_leave_over = (format(nowover_time).getTime() - format(formatTimeUnlix(data.data)).getTime()) / 1000 ;

            },
            error:function () {
                initPopEve(2,'您的登录已过期，请重新登录') ;
                return false ;
            }

        });
    }

    var timerno = window.setInterval(function () {
        if (lt_time_leave > 0 && (lt_time_leave % 240 == 0 || lt_time_leave == 60 )) {   //每隔4分钟以及最后一分钟重新读取服务器时间
            _getSystemTime();
        }

        if( (lt_time_leave >=420 && lt_time_leave <=540 && lt_time_leave % 10 ==0) || (lt_time_leave >=120 && lt_time_leave <=240 && lt_time_leave % 10 ==0 )){ // 10,秒一次请求开奖数据
            var hasnum = Number($('.last-open-num li:nth-child(1)').data('val')) ; // 判断是否已经拉取期数成功
            if((hasnum >= 0) && (hasnum <20)){

            }else{
                priodDataNewly(getCookie('lt_lotteryid'),'timer') ;
            }

        }
        if (lt_time_leave <= 0) { // 开奖倒计时结束
            clearInterval(timerno);
            initBetPop01(3) ;
            outTimeSet() ;
            $('.so-fengpan').hide() ; // 隐藏封盘容器
            console.log('停止当前期数');
        }

        var oDate = diff(lt_time_leave--);
        var over_oDate = diff(lt_time_leave_over--);

        // 开奖倒计时
        $('.open-time').html( fftime(oDate.minute) + ':' + fftime(oDate.second) );
        if(lt_time_leave_over <= 0){ // 封盘倒计时结束
            $('.close-time').html('已封盘') ;
            $('.so-fengpan').show() ;
           // resetAction() ;  //重置已选注单
        }else{
            // 封盘倒计时
            $('.close-time').html( fftime(over_oDate.minute) + ':' + fftime(over_oDate.second) );
        }


    }, 1000);
};

// 倒计时结束后处理
function outTimeSet() {
    // 拉取期数数据
    var lotteryid = getCookie('lt_lotteryid') ;
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
            processCode( res.data[1].pcode, res.data[2].pcode, res.data[2].winNumber,res.data[2].doubleData) ;
            getSystemTime(lotteryid);  // 获取当前系统时间

            if (res == 'empty') { 	//未到销售时间
                return false;
            }

        },
        error: function () {  //失败
            initPopEve(2,'您的登录已过期，请重新登录') ;
            return false ;
        }
    });
}

// 本期投注已结束，转至下期提示
function initBetPop01(closet) {
        $('.modal.m12').toggle();
        $('.so-shade').toggle();
    $('.modal.m12').click(function () {
        $('.modal.m12').toggle();
        $('.so-shade').toggle();
    });
    setTimeout(function () {
        $('.modal.m12 ,.so-shade').hide() ;
    },closet*1000) ; // 自动关闭
}

//  开奖数据处理 ,issue 当前期数，lastissue 上期期数，code 上期开奖号码，double 上期开奖统计
function processCode(issue, lastissue,code,double) {
    var lotteryid = getCookie('lt_lotteryid') ;
    if (!code) {
        switch (lotteryid) {
            case  '8': // 北京pk10
            code='20,20,20,20,20,20,20,20,20,20';
            break;
            case  '6': // 江苏快三
            case  '20': // 安徽快三
            case  '22': // 湖北快三
            code ='20,20,20';
            break;
            default :
            code='-,开,奖,中,-';
            break;
        }

    }
    if(code){
        var code_arr = code.split(',');
    }
    var str = '';
    var dstr ='';
    var kdstr='';
    //已开奖期号节点,开奖号码
    if(lotteryid =='8'||lotteryid =='6' || lotteryid =='20' || lotteryid =='22'){  // 北京pk10   <li><span class="pk10_ball small_ball num_10"></span></li>
        //北京PK10期数
        if(lotteryid =='8'){
            $('.last-date').html(lastissue.toString().substr(4, 8));
            $('.now-date').html(issue.toString().substr(4, 8)).attr('data-date',issue);
        }else{//江苏快3期数
            $('.last-date').html(lastissue.toString());
            $('.now-date').html(issue.toString()).attr('data-date',issue);
        }

        for (var i = 0; i < code_arr.length; i++) {
            switch (lotteryid) {
                case  '8': // 北京pk10
                    str += '<li data-val="' + code_arr[i] + '"><span class="pk10_ball small_ball num_' + code_arr[i] + '"></span></li>';
                    break;
                case  '6': // 江苏快三
                case  '20': // 安徽快三
                case  '22': // 湖北快三
                    str += '<li data-val="' + code_arr[i] + '"><span class="k3_dice num_' + code_arr[i] + '"></span></li>';
                    break;
                default :

                    break;
            }

        }
        dstr +='<li>'+double.lh_1+'</li>' ;
        dstr +='<li>'+double.lh_2+'</li>' ;
        dstr +='<li>'+double.lh_3+'</li>' ;
        dstr +='<li>'+double.lh_4+'</li>' ;
        dstr +='<li>'+double.lh_5+'</li>' ;
        dstr +='<li>'+double.top2_doubler+'</li>' ;
        dstr +='<li>'+double.top2_sizer+'</li>' ;
        dstr +='<li>'+double.top2_total+'</li>' ;

        kdstr +='<li>'+double.sizer+'</li>';
        kdstr += '<li>'+ double.total + '</li>';
     }else{
        $('.last-date').html(lastissue) ;
        $('.now-date').html(issue).attr('data-date',issue) ;
        for (var i = 0; i < code_arr.length; i++) {
            str +='<li data-val="'+code_arr[i] +'">'+ code_arr[i] +'</li>' ;
        }
            dstr += '<li>' + double.doubler + '</li>';
            dstr += '<li>' + double.longer + '</li>';
            dstr += '<li>' + double.sizer + '</li>';
            dstr += '<li>' + double.total + '</li>';

    }
    $('.last-open-num ul').html(str) ;
    $('.last-open-dou ul').html(dstr) ;
    $('.last-open-k3dou ul').html(kdstr);


}

//此方法用来控制盘面选择,更新盘面信息后应该重新调用一次，选球处理
function initChoiceObj() {
    $('.so-con-right').on('click','p',function () {
       /* var display = $('.so-fengpan').css('display') ; // 封盘状态 ，改成可以点击
        if(display == 'block' || display =='inline-block'){ // 判断是否处于封盘状态
            return false ;
        }*/
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
        var z_choosed =  $(paid+' p.active').length ; // 二中二，三中三等特殊处理

        checkNumbers(pid,choosed,_this,z_choosed) ;

    }) ;

}

// 此方法用来控制点击左边nav切换盘面
function initNavChoice() {
    var ifval = '1' ; // 默认 1
    $('.so-con-left li').each(function (i, t) {
        $(t).click(function () {
            var val = $(this).data('val') ;
            if(val != ifval ){   // 江西11选5切换时，需要重置投注
                resetAction() ;
            }
            ifval = val ;
            $('.so-con-right > div').hide();
            $('.so-con-left li').removeClass('active');
            $(this).addClass('active');
            $('#so-item' + i).show();
        })
    }).eq(0).click();

    //PK10、快3 点击左边nav切换盘面
    $('.so-con-left li').on('click',function(){
        var i = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('#pk10-item' + i).show().siblings().hide();
        $('#k3-item' + i).show().siblings().hide();
    }).eq(0).click();
}

/*
* 江西11选5 ,method 玩法，len 长度，xslen特殊玩法
* */
function checkNumbers(method,len,self,xslen) {
    switch (method) {
        case 'tab_jx_eze': // 二中二
            var xlen = 2 ;
            var spchoose = parseInt(xslen/xlen) ;
            $('.bet-select-num').text(spchoose) ;
        if(xslen>2){
            initPopFengpan02(2,len-1) ;
            self.click() ;
            return false ;
        }
            break;
        case 'tab_jx_szs': // 三中三
            var xlen = 3 ;
            var spchoose = parseInt(xslen/xlen) ;
            $('.bet-select-num').text(spchoose) ;
            if(xslen>3){
                initPopFengpan02(2,len-1) ;
                self.click() ;
                return false ;
            }
            break;
        case 'tab_jx_sizsi': // 四中四
            var xlen = 4 ;
            var spchoose = parseInt(xslen/xlen) ;
            $('.bet-select-num').text(spchoose) ;
            if(xslen>4){
                initPopFengpan02(2,len-1) ;
                self.click() ;
                return false ;
            }
            break;
        case 'tab_jx_wzw': // 五中五
            var xlen = 5 ;
            var spchoose = parseInt(xslen/xlen) ;
            $('.bet-select-num').text(spchoose) ;
            if(xslen>5){
                initPopFengpan02(2,len-1) ;
                self.click() ;
                return false ;
            }
            break;
        case 'tab_jx_lzw': // 六中五
            var xlen = 6 ;
            var spchoose = parseInt(xslen/xlen) ;
            $('.bet-select-num').text(spchoose) ;
            if(xslen>6){
                initPopFengpan02(2,len-1) ;
                self.click() ;
                return false ;
            }
            break;
        case 'tab_jx_qzw': // 七中五
            var xlen = 7 ;
            var spchoose = parseInt(xslen/xlen) ;
            $('.bet-select-num').text(spchoose) ;
            if(xslen>7){
                initPopFengpan02(2,len-1) ;
                self.click() ;
                return false ;
            }
            break;
        case 'tab_jx_bzw': // 八中五
            var xlen = 8 ;
            var spchoose = parseInt(xslen/xlen) ;
            $('.bet-select-num').text(spchoose) ;
            if(xslen>8){
                initPopFengpan02(2,len-1) ;
                self.click() ;
                return false ;
            }
            break;
        case 'tab_jx_qez': // 前二组选 ，公式 n*(n-1)/2
            var xlen = 2 ;
            var spchoose = parseInt(xslen*((xslen-1))/xlen) ;
            $('.bet-select-num').text(spchoose) ;
            if(xslen>5){
                initPopFengpan02(2,len-1) ;
                self.click() ;
                return false ;
            }
            break;
        case 'tab_jx_qsz': // 前三组选 ，公式 n*(n-1)*(n-2)/3*2*1
            var xlen = 6 ;
            var spchoose = parseInt(xslen*((xslen-1))*(xslen-2)/xlen) ;
            $('.bet-select-num').text(spchoose) ;
            if(xslen>5){
                initPopFengpan02(2,len-1) ;
                self.click() ;
                return false ;
            }
            break;
        default :
            $('.bet-select-num').text(len) ;
            break;
    }

}



//此方法弹出结算框 ,注单数量，添加按钮  moved to /src/components/publicTemplate/bet.vue
function initPopEve(closet,content) {
    $('.bet-error-content').html(content) ;
    $(".modal.m08").toggle() ;
    $(".so-shade").toggle() ;
    var settime = setTimeout(function () {
        $(".so-shade,.modal.m08").hide() ;
    },closet*1000) ;
    // 投注金额提示弹窗关闭
    $(".modal.m08").click(function () {
        $(".modal.m08").toggle() ;
        $(".so-shade").toggle() ;
    }) ;
}

// 触发下注按钮
function betActionSubmit() {
    $(".so-add").click(function () {
        var amount = $('.bet-amount').val() ;  // 获取金额
        var nums = Number($('.bet-select-num').text()) ;  // 获取注数
        if(nums<1){ // 没有选择投注项目
            initPopEve(2,'请选择投注项目') ;
            return false;
        }
        if(!amount || !isPositiveNum(amount) || amount =='0'){ // 投注金额不正确  .modal.m08
            initPopEve(2,'请输入整数的投注金额，金额不能为0') ;
            return false;
        }
        $(".so-pop").toggle() ;
        $(".so-shade").toggle() ;
        // 关闭当前窗口
        $(".so-pop a").click(function () {
            $(".so-pop").hide() ;
            $(".so-shade").hide() ;
        }) ;

        doCheckAction() ;  // 注单结算
    })

}

// 下注弹窗_成功，失败 ,closetime 关闭时间
function initTipPop05(flag,closetime,content) {
    // 成功
    if(flag){
        $('.modal.m09').toggle();
        $('.so-shade').toggle();
        $('.modal.m09').click(function () {
            $('.modal.m09').toggle();
            $('.so-shade').toggle();
        });
    }else{
        // 失败
        $(".modal.m10").toggle() ;
        $(".so-shade").toggle() ;
        $(".modal.m10").click(function () {
            $(".modal.m10").toggle() ;
            $(".so-shade").toggle() ;
        });
        $('.submit-error-content').html(content) ; // 投注失败提示
    }
    setTimeout(function () {
        $('.modal.m09,.so-shade, .modal.m10').hide() ;
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

// 此方法用来初始化右菜单的呼出和关闭的点击事件
function initRightViewEve() {
    $('.so-right').click(function () {
        var className = $('.so-right').attr('class') || '';
        $('.so-right > div:last-child > div').toggle(0, function () {
            $('.so-right').attr('class', className.replace('active', 'close'));
            $('.so-shade').hide();
        });
    });
    $('.so-top-zoushi').click(function () {
        var className = $('.so-right').attr('class') || '';
        if (className.indexOf('close') >= 0) {
            $('.so-right').attr('class', className.replace('close', 'active'));
        } else {
            $('.so-right').attr('class', className + ' active');
        }
        $('.so-shade, .so-right > div:last-child > div').show();
     /*   $('.so-right > div:last-child > div').slideToggle(500, function () {
        });*/

    });

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
    var lottery = getCookie('lt_lotteryid') ;//获取江苏快3 ID
    $(".so-con-right p").each(function (i, t) {
    // 已选择的注单
    if($(this).hasClass('active')){
        var total_title = $(this).parents('.select-li').find('h2').text() ;  // 大标题
        //江苏快3
        if(lottery == '6' || lottery == '20' || lottery == '22'){//判断江苏k3
            var total_con = $(this).find('span:nth-child(1)').data('val') ;  // 投注内容
        }else{
            var total_con = $(this).find('span:nth-child(1)').text() ;  // 投注内容
        }

        var total_mon = $(this).find('span:nth-child(2)').text() ;  // 投注内容赔率
        var total_id = $(this).data('id') ;  // 投注内容玩法id
        var total_type = $(this).data('type') ;  // 投注内容玩法类型，组合是 zu_he
        if(total_type){
            betstr +='<p data-id="'+total_id+'" data-type="'+total_type+'">【<span class="each-title">'+ total_title +'</span>-<span class="each-content">'+ total_con +'</span>】 @ <span class="each-times">'+ total_mon+'</span> x <span class="each-mon"> '+ bet_mon +'</span></p>' ;
        }else{
            betstr +='<p data-id="'+total_id+'" >【<span class="each-title">'+ total_title +'</span>-<span class="each-content">'+ total_con +'</span>】 @ <span class="each-times">'+ total_mon+'</span> x <span class="each-mon"> '+ bet_mon +'</span></p>' ;
        }


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
        'pcode': $('.now-date ').eq(0).data('date'), //期次20170925013
        'pdate': now_day, //日期20170925
        'remark': '无',//备注，可用于测试
        'source': 'h5', //来源：h5
        'sourceType':'2', // 1是pc端，2是h5

    };
    doSubmitAction(resdata.list) ;
   /* $.each($('.bet-go-list p'), function (i, n) {  // 遍历每笔注单
        var num_each = 1 ;  // 每单注数
        var total_each = returnMoney($(n).find('.each-mon').text()) ;  // 每单金额
        var play_each = $(n).data('id');  // 每单玩法
        var new_num = $(n).find('.each-content').html() ;  //下注内容

        // 下注以对象的形式传递
        resdata.list.push(
            {  // 一条数据就是一个方案，一个方案可以有多条下注
                'betAmount': monAmt(Number(total_each)), //下注金额，元的模式下需要 x100传值，角的模式下 x10
                'betContent': new_num.toString(),//下注内容，如1,5,8,3,7
                'betCount': Number(num_each), //注单数
                'betMode': 0, //下注模式(预留)
                'chaseCount': 1, //追号期数(含当期),默认1
               'ifChase': 0 , //是否追号,0不追号，1追号
                'moneyMode': 'y' ,//付款类型：元y，角j，分f
                'multiple': Number(total_each), //倍数最少为1
                'payoff': 0, //派彩
                'playId': play_each, //玩法
                'remark': '无'//备注
            });

    });*/

    $.ajax({
        type: 'POST',
        headers: {
            'Authorization': 'bearer  ' + getAccessToken(access_token) ,
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

            //解决瞬间提交2次的问题
           // ajaxSubmitAllow = true;
            if (data.length <= 0) {
                return false;
            }

            if (data.err == 'SUCCESS') {  //购买成功
                initTipPop05(true,3) ;
                resetAction() ;
                getMemberBalance() ; // 更新余额
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
            return false ;
        }
    });
    

}

/*
* 表单提交数据处理
* */
function doSubmitAction(list) {
    var zuArr = [] ;
    var gametype ;
    var zu_play ;
    $.each($('.bet-go-list p'), function (i, n) {  // 遍历每笔注单
        var num_each = 1 ;  // 每单注数
        var total_each = returnMoney($(n).find('.each-mon').text()) ;  // 每单金额
        var play_each = $(n).data('id');  // 每单玩法
        var play_type = $(n).data('type');  // 每单玩法类型
        var new_num = $(n).find('.each-content').html() ;  //下注内容
        gametype = play_type ; // 组合玩法
        zu_play = play_each ; // 组合玩法
        zuArr.push(new_num) ;  // 组合玩法
        if(!gametype){
            // 下注以对象的形式传递
            list.push(
                {  // 一条数据就是一个方案，一个方案可以有多条下注
                    'betAmount': monAmt(Number(total_each)), //下注金额，元的模式下需要 x100传值，角的模式下 x10
                    'betContent': new_num.toString(),//下注内容，如1,5,8,3,7
                    'betCount': Number(num_each), //注单数
                    'betMode': 0, //下注模式(预留)
                    'chaseCount': 1, //追号期数(含当期),默认1
                    'ifChase': 0 , //是否追号,0不追号，1追号
                    'moneyMode': 'y' ,//付款类型：元y，角j，分f
                    'multiple': Number(total_each), //倍数最少为1
                    'payoff': 0, //派彩
                    'playId': play_each, //玩法
                    'remark': '无'//备注
                });
        }

    });
    if(gametype =='zu_he'){
        list.push(
            {  // 一条数据就是一个方案，一个方案可以有多条下注
                'betAmount': monAmt(Number($('.total-bet-mon').text())), //下注金额，元的模式下需要 x100传值，角的模式下 x10
                'betContent': zuArr.toString(),//下注内容，如1,5,8,3,7
                'betCount': Number($('.total-bet-num').text()), //注单数
                'betMode': 0, //下注模式(预留)
                'chaseCount': 1, //追号期数(含当期),默认1
                'ifChase': 0 , //是否追号,0不追号，1追号
                'moneyMode': 'y' ,//付款类型：元y，角j，分f
                'multiple': Number($('.each-mon').eq(0).text()), //倍数最少为1
                'payoff': 0, //派彩
                'playId': zu_play , //玩法
                'remark': '无'//备注
            });
    }

}

/*
* 重置投注页，提交表单后调用
* */
function resetAction() {
    $(".so-con-right p").each(function (i, t) {
        $(this).removeClass('active') ;
        $('.bet-select-num').text('0') ;
        $('.bet-amount').val('') ;
    })
}

/*
* 近期开奖标签切换
* */

function changeTab(lotteryid) {
    $('.tab_three').on('click','li',function () {
        var val = $(this).data('val') ;
            $(this).addClass('on').siblings().removeClass('on') ;

           doubleCount(lotteryid,val,'') ;
    });
}

/*
* 近期开奖数据，近期开奖页面
* */

function doubleCount(lotteryid,rows,maxtime) {
    var senddata ={
        lotteryId : lotteryid ,
        pcount: rows ,
        maxUpdateTime: maxtime ,
    }
    $.ajax({
        type: 'get',
        headers: {
            'Authorization': 'bearer  ' + getAccessToken(access_token) ,
            // 'sourceType':'2', // 1是pc端，2是h5
            // 'sideType':'1',  // 1是传统盘，2是双面盘
        },
        url: action.forseti + 'api/openNums/doubleCount',
        timeout: 600000,
        data: senddata ,
        success: function (data) {
         // console.log(data.data) ;
            var str ='';
            for(var i=0;i<data.data.length;i++){

                if(!data.data[i].winNumber){

                    switch (lotteryid){
                        // 北京PK10
                        case '8' :
                        data.data[i].winNumber ='20,20,20,20,20,20,20,20,20,20' ;
                        break;
                        case '6' :   // 江苏K3
                        case '20' :  // 安徽K3
                        case '22' :  // 湖北K3
                        data.data[i].winNumber ='20,20,20' ;
                        break;
                        default :
                        data.data[i].winNumber='-,-,-,-,-' ;
                        break;
                    }

                }
                var codeArr = data.data[i].winNumber.split(',') ;
                str +='<li class="past_view">'+
                    '<ul class="panel">'+
                   ' <li class="prod" data-status="not_open">'+
                    '<div class="play_th">'+
                    '<div class="prd_num"><i class="prd"></i><span>'+data.data[i].pcode+'</span> 期</div>'+
                    '<ul class="double-count">' ;
                if(lotteryid == '8') {  // 北京pk10
                   str += ' <li>'+data.data[i].doubleData.lh_1+'</li>'+
                    ' <li>'+data.data[i].doubleData.lh_2+'</li>'+
                    ' <li>'+data.data[i].doubleData.lh_3+'</li>'+
                    ' <li>'+data.data[i].doubleData.lh_4+'</li>' +
                    ' <li>'+data.data[i].doubleData.lh_5+'</li>' +
                    ' <li>'+data.data[i].doubleData.top2_doubler+'</li>' +
                    ' <li>'+data.data[i].doubleData.top2_sizer+'</li>' +
                    ' <li>'+data.data[i].doubleData.top2_total+'</li>' ;
                }else{
                   str += ' <li>'+data.data[i].doubleData.doubler+'</li>'+
                    ' <li>'+data.data[i].doubleData.longer+'</li>'+
                    ' <li>'+data.data[i].doubleData.sizer+'</li>'+
                    ' <li>'+data.data[i].doubleData.total+'</li>' ;
                }

                   str +=' </ul>'+
                   '</div>'+
                   ' <ul class="lo_ball double-numbers">';
                    for (var j = 0; j < codeArr.length; j++) {
                        switch (lotteryid){
                            case '8' : // 北京PK10
                                str += ' <li><span class="pk10_ball num_'+codeArr[j]+'"></span></li>' ;
                                break;
                            case '6' :   // 江苏K3
                            case '20' :  // 安徽K3
                            case '22' :  // 湖北K3
                                str += ' <li><span class="k3_dice num_'+codeArr[j]+'"></span></li>' ;
                                break;
                            default :
                                str += ' <li>'+codeArr[j]+'</li>' ;
                                break;
                        }

                    }

                    str += '</ul>'+
                            '</li>'+
                            '</ul>'+
                            '</li>' ;
            }
          $('.double-all').html(str) ;

        },
        error: function (data) {  // 错误提示
            initPopEve(2,'您的登录已过期，请重新登录') ;
            return false ;

        }
    });
}

/*
* 路珠数据，路珠页面
* */
function loadRoadAction(lotteryid,maxtime) {
    var senddata ={
        lotteryId : lotteryid ,
        maxUpdateTime: maxtime ,
    }
    $.ajax({
        type: 'get',
        headers: {
            'Authorization': 'bearer  ' + getAccessToken(access_token) ,
            // 'sourceType':'2', // 1是pc端，2是h5
            // 'sideType':'1',  // 1是传统盘，2是双面盘
        },
        url: action.forseti + 'api/openNums/loadBead',
        timeout: 600000,
        data: senddata ,
        success: function (data) {
          // console.log(data.data.size_5) ;

            roadDomAction(data.data.size_1,'road02_1 .dx_size') ;  // 第一球大小 (pk10 冠军)
            roadDomAction(data.data.sd_1,'road02_1 .ds_dx') ;  // 第一球单双 (pk10 冠军)
            roadDomAction(data.data.size_2,'road02_2 .dx_size') ;  // 第二球大小 (pk10 亚军)
            roadDomAction(data.data.sd_2,'road02_2 .ds_dx') ;  // 第二球单双 (pk10 亚军)
            roadDomAction(data.data.size_3,'road02_3 .dx_size') ;  // 第三球大小 (pk10 第三名)
            roadDomAction(data.data.sd_3,'road02_3 .ds_dx') ;  // 第三球单双 (pk10 第三名)

            switch (lotteryid){
                case '8' : // 北京PK10
                    roadDomAction(data.data.top2_size,'road01_1') ;  // (pk10 冠亚和大小)
                    roadDomAction(data.data.top2_sd,'road01_2') ;  // (pk10 冠亚和单双)
                    roadDomAction(data.data.size_6,'road02_6 .dx_size') ;  // (pk10 第六名)
                    roadDomAction(data.data.sd_6,'road02_6 .ds_dx') ;  // (pk10 第六名)
                    roadDomAction(data.data.size_7,'road02_7 .dx_size') ;  // (pk10 第七名)
                    roadDomAction(data.data.sd_7,'road02_7 .ds_dx') ;  // (pk10 第七名)
                    roadDomAction(data.data.size_8,'road02_8 .dx_size') ;  // (pk10 第八名)
                    roadDomAction(data.data.sd_8,'road02_8 .ds_dx') ;  // (pk10 第八名)
                    roadDomAction(data.data.size_9,'road02_9 .dx_size') ;  // (pk10 第九名)
                    roadDomAction(data.data.sd_9,'road02_9 .ds_dx') ;  // (pk10 第九名)
                    roadDomAction(data.data.size_10,'road02_10 .dx_size') ;  // (pk10 第十名)
                    roadDomAction(data.data.sd_10,'road02_10 .ds_dx') ;  // (pk10 第十名)
                    break;
                case '6' :   // 江苏K3
                case '20' :  // 安徽K3
                case '22' :  // 湖北K3
                    roadDomAction(data.data.total_size,'road01_1');
                    break;
                case '4' :    // 江西11选5
                case '16' :    // 广东11选5 双面盘
                case '18' :    // 山东11选5 双面盘
                    roadDomAction(data.data.total_size,'road01_1') ;  // 路珠总和大小
                    roadDomAction(data.data.total_sd,'road01_2') ;  // 路珠总和单双
                    roadDomAction(data.data.total_lhh,'road01_3') ;  // 路珠龙虎
                    roadDomAction(data.data.totalEnd_size,'road01_4') ;  // 总和尾大小
                    break;
                default :
                    roadDomAction(data.data.total_size,'road01_1') ;  // 路珠总和大小
                    roadDomAction(data.data.total_sd,'road01_2') ;  // 路珠总和单双
                    roadDomAction(data.data.total_lhh,'road01_3') ;  // 路珠龙虎
                    roadDomAction(data.data.size_4,'road02_4 .dx_size') ;  // 第四球大小
                    roadDomAction(data.data.sd_4,'road02_4 .ds_dx') ;  // 第四球单双
                    roadDomAction(data.data.size_5,'road02_5 .dx_size') ;  // 第五球大小
                    roadDomAction(data.data.sd_5,'road02_5 .ds_dx') ;  // 第五球单双
                    break;
            }


        },
        error: function (data) {  // 错误提示
            initPopEve(2,'您的登录已过期，请重新登录') ;
            return false ;

        }
    });
}

/*
*  路珠总和大小数据处理，resdata 数据，cid 选择器，color 球的颜色
*  和=蓝mid   龙=紅big  虎=绿tiger  大=紅big   小=绿tiger  单=紅big  双=绿tiger
* */
function roadDomAction(resdata,cid) {
    var ts = '' ;
    for(var i=0;i<resdata.length;i++){  // 总和大小
        ts +=' <li class="road">'+
            '<ul>' ;
        for(var ii=0;ii<resdata[i].length;ii++){
            var rescon = resdata[i][ii] ;
            var color = 'mid' ;
            switch (rescon) {
                case '和':
                    color = 'mid' ;
                    break;
                case '龙':
                case '大':
                case '单':
                    color = 'big' ;
                    break;
                case '虎':
                case '小':
                case '双':
                    color = 'tiger' ;
                    break;
                default :
                    color = 'mid' ;
                    break;
            }
            ts += '<li class="'+color+'">'+resdata[i][ii]+'</li>' ;
        }
        ts += '</ul>'+
            '</li>' ;
    }
    $('#'+cid).html(ts) ;

}

/*
* 路珠标签切换
* */
function roadChangeTab() {
    $('ul.tab_mid li').click(function(){
        var tab_id = $(this).attr('data-tab');
        var tab_val = $(this).data('val') ;
        $('ul.tab0'+tab_val+' li').removeClass('on');
        $('#road0'+tab_val+' .tab_content_out').removeClass('on');
        $(this).addClass('on');
        $("#"+tab_id).addClass('on');
    });
}


/*
*  双面长龙数据，双面长龙页面 openType open连续开奖，unopen连续未开
* */
function loadDoubleLong(lotteryid,maxtime,openty,cla) {
    var senddata ={
        lotteryId : lotteryid ,
        maxUpdateTime: maxtime ,
        openType:openty,
    }
    $.ajax({
        type: 'get',
        headers: {
            'Authorization': 'bearer  ' + getAccessToken(access_token) ,
            // 'sourceType':'2', // 1是pc端，2是h5
            // 'sideType':'1',  // 1是传统盘，2是双面盘
        },
        url: action.forseti + 'api/openNums/doubleLong',
        timeout: 600000,
        data: senddata ,
        success: function (data) {
         console.log(data.data) ;
            var str = '' ;
            for(var i=0;i<data.data.length;i++){
                str +=' <li class="prod" data-status="not_open">'+
                        '<i class="prd"></i>'+
                        '<div>'+ data.data[i].groupName +'</div>';
                        if(Number(data.data[i].playName) >=0 ){
                            str +=  '<ul class="lo_ball">' ;
                            switch (lotteryid) {
                                case '8':
                                    str += '<li><span class="pk10_ball num_'+ data.data[i].playName +'"></span></li>';
                                    break;
                                case '6' :   // 江苏K3
                                case '20' :  // 安徽K3
                                case '22' :  // 湖北K3
                                    str +='<li><span class="k3_dice num_'+ data.data[i].playName +'"></span></li>';
                                    break;

                                default :

                                    break;
                            }

                        }else{
                            if(lotteryid == '8') { // 北京pk 10
                                str +=  '<ul class="lo_ball">' ;
                            }else{
                                str +=  '<ul class="lo_ball no_open">' ;
                            }
                            str += '<li>'+ data.data[i].playName +'</li>';
                        }

                       str += '</ul>'+
                         '<div class="periods text-red">'+ data.data[i].count +'期</div>'+
                        '</li>' ;
            }
            $('.'+cla).html(str) ;

        },
        error: function (data) {  // 错误提示
            initPopEve(2,'您的登录已过期，请重新登录') ;
            return false ;

        }
    });
}

