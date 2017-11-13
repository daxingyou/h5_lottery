
import $ from "jquery";
import DateFormat from "dateformat";

//mixin.js
var MyMixin = {
    data:function(){
        return {
            action:{
                forseti: 'http://121.58.234.210:19091/forseti/',
                uaa: 'http://121.58.234.210:19091/uaa/',
                hermes: 'http://121.58.234.210:19091/hermes/',
                picurl: 'http://admin.baochiapi.com/photo/pic/',  // 图片地址
            },
            playTreeList:[], //玩法树
            testPriodDataNewlyData:{
              "data" : [ {
                "version" : 0,
                "cid" : 22225,
                "lotteryId" : 2,
                "pcode" : 20171030083,
                "startTime" : 1509363600000,
                "endTime" : 1509364200000,
                "status" : 0,
                "pdate" : 20171030,
                "prizeCloseTime" : 1509364155000,
                "nextInterval" : 600,
                "doubleData" : {
                  "doubler" : "-",
                  "longer" : "-",
                  "sizer" : "-",
                  "total" : "-"
                }
              }, {
                "version" : 0,
                "cid" : 22224,
                "lotteryId" : 2,
                "pcode" : 20171030082,
                "startTime" : 1509363000000,
                "endTime" : 1509363559999,      //1509363700000
                "status" : 0,
                "pdate" : 20171030,
                "prizeCloseTime" : 1509363555000,
                "nextInterval" : 600,
                "doubleData" : {
                  "doubler" : "-",
                  "longer" : "-",
                  "sizer" : "-",
                  "total" : "-"
                }
              }, {
                "version" : 0,
                "cid" : 22223,
                "lotteryId" : 2,
                "pcode" : 20171030081,
                "startTime" : 1509362400000,
                "endTime" : 1509363000000,
                "status" : 0,
                "pdate" : 20171030,
                "prizeCloseTime" : 1509362955000,
                "nextInterval" : 600,
                "winNumber" : "3,9,5,0,2",
                "doubleData" : {
                  "doubler" : "单",
                  "longer" : "虎",
                  "sizer" : "小",
                  "total" : "19"
                }
              } ],
              "err" : "SUCCESS",
              "msg" : "",
              "maxUpdateTime" : 1509363282484
            }
        }
    },
    computed:{
        // token 处理
        getAccessToken:function() {
            return this.getCookie("access_token");
        },
    },
    // getAccessToken   methods:{

    methods:{
        dateFormat:function(p0, p1, p2) {
            return DateFormat(...arguments);
        },
        ajax:function(userConfig){
            let config = {
                type: 'get',
                headers: {
                    "Authorization": "bearer  " + this.getAccessToken,
                },
                error: function (e) {
                    if(e.responseJSON.error == 'invalid_token'){  // token 过期
                        this.clearAllCookie() ;
                        setTimeout(function () {
                            window.location = '/login' ;
                        },300)
                        return false ;
                    }
                    reject(e);
                }
            }
            config = Object.assign(config, userConfig);
            $.ajax(config);
            // Object.assign()
            // $.ajax({
            //     type: 'get',
            //     headers: {
            //         "Authorization": "bearer  " + this.getAccessToken,
            //     },
            //     url: this.action.forseti + 'api/priodDataNewly',
            //     data: { lotteryId: lotteryid },
            //     success: (res) => {  //成功
            //         console.log('拉取期数成功');
            //         // 开奖数据处理
            //         this.processCode(
            //             res.data[1].pcode,
            //             res.data[2].pcode,
            //             res.data[2].winNumber,
            //             res.data[2].doubleData
            //         ) ;
            //         this.getSystemTime(lotteryid);  // 获取当前系统时间

            //         if (res == 'empty') {   //未到销售时间
            //             return false;
            //         }

            //     },
            //     error: function () {  //失败

            //         return false;
            //     }
            // });
        },



        // 玩法树
        loadPlayTree:function(gameid) {
            var _slef = this ;
            return new Promise((resolve, reject)=>{
                $.ajax({
                    type: 'get',
                    headers: {
                        "Authorization": "bearer  " + this.getAccessToken,
                    },
                    url: this.action.forseti + 'api/playsTree',
                    data: {lotteryId: gameid,}, // 当前彩种id
                    success: (res) => {
                        this.playTreeList = res.data ? res.data.childrens :[];
                        resolve(this.playTreeList);
                    },
                    error: function (e) {
                        if(e.responseJSON.error == 'invalid_token'){  // token 过期
                            _self.clearAllCookie() ;
                            setTimeout(function () {
                                window.location = '/login' ;
                            },300)
                            return false ;
                        }
                        reject(e);
                    }
                });
            });

        },

        // 最新开奖期数
        priodDataNewly:function(gameid, sys_time) {
            var _self = this ;
            return new Promise((resolve, reject)=>{
                // const res = this.testPriodDataNewlyData;
                $.ajax({
                    type: 'get',
                    headers: {
                        "Authorization": "bearer  " + _self.getAccessToken,
                    },
                    url: this.action.forseti + 'api/priodDataNewly',
                    data: {lotteryId: gameid,},
                    success: (function(res) {
                        if(res.data){
                            setTimeout(()=>{
                                resolve(res);

                            },500)

                        }
                    }).bind(this),
                    error: function (e) {
                        if(e.responseJSON.error == 'invalid_token'){  // token 过期
                            _self.clearAllCookie() ;
                            setTimeout(function () {
                                window.location = '/login' ;
                            },300)
                            return false ;
                        }
                        reject(e);
                    }
                });
            });

        },


        // 获取用户余额
        getMemberBalance:function (lotteryid) {
            var _self = this ;
            return new Promise((resolve, reject)=>{
                $.ajax({
                    type: 'GET',
                    headers: {
                        "Authorization": "bearer  " + this.getAccessToken,
                    },
                    // dataType:'json',
                    // contentType:"application/json; charset=utf-8",  // json格式传给后端
                    url: this.action.hermes + 'api/balance/get',
                    data: { lotteryId: lotteryid },
                    success: (res) => {
                        this.balanceData = res.data;
                        var mom = this.fortMoney(this.roundAmt(res.data.balance), 2);  // 用户余额
                        this.setCookie("membalance", mom);  // 把登录余额放在cookie里面
                        resolve();
                    },
                    error: function (e) {
                        console.log(e)
                        if(e.responseJSON.error == 'invalid_token'){  // token 过期
                            _self.clearAllCookie() ;
                            setTimeout(function () {
                                window.location = '/login' ;
                            },300)
                            return false ;
                        }
                        reject(e);
                    }
                });

            })
        },

        /* 获取系统时间，lotteryid 彩种id moved to /src/Maxin.js
            调用方式
                this.getSystemTime().then((sys_time)=>{
                    //代码
                })
        */
        getSystemTime:function(nochange) {
            var _self = this ;
            return new Promise((resolve, reject)=>{
                $.ajax({
                    type: 'get',
                    headers: {
                        "Authorization": "bearer  " + _self.getAccessToken,
                    },
                    url: this.action.forseti + 'apis/serverCurrentTime',
                    data: {},
                    success: (res) => {
                        if(nochange =='0'){
                            var sys_time = res.data;
                        }else{
                            var sys_time = _self.formatTimeUnlix(res.data);
                        }

                        resolve(sys_time);
                    },
                    error: function (e) {
                        if(e.responseJSON.error == 'invalid_token'){  // token 过期
                            _self.clearAllCookie() ;
                            setTimeout(function () {
                                window.location = '/login' ;
                            },300)
                            return false ;
                        }
                        reject(e);
                    }
                });

            })
        },

        // 此方法用来初始化页面高度
        initViewHeight :function() {
            var viewHeight = $(window).height();
            var topHeight = $('.so-in-top').height();
            var mainHeight = $('.so-in-main').height();
            var rightConHeight = 0;
            var leftConHeight = 0;
            rightConHeight = viewHeight - topHeight - mainHeight;
            $('.so-con-right').height(rightConHeight + 'px');
            // 六合彩左側選單高度
            leftConHeight = viewHeight - topHeight - mainHeight;
            $('.so-con-left').height(leftConHeight + 'px');
            // 左边菜单玩法框高度初始化
            var leftTopHeight = $('.so-l-c-top').height();
            $('.so-l-c-con').height((viewHeight - leftTopHeight) + 'px');
        },


        //格式化赔率
        payoffFormat:function(val){
            return (Number(val)/10000).toFixed(3);
        },
        // 美东时间设置
        setAmerTime :function (el) {
            var today = new Date();
          //  today.setHours(today.getHours() - 12);  // 不需要转成美东时间
            var y = today.getFullYear();
            var m = today.getMonth() + 1;
            var d = today.getDate();
            var h = today.getHours();
            var mm = today.getMinutes();
            var s = today.getSeconds();
            m =  this.checkTime(m);
            d = this.checkTime(d);
            h = this.checkTime(h);
            mm = this.checkTime(mm);
            s = this.checkTime(s);
            if(el =='#paydate'){
                $(el).val(y+"/"+m+"/"+d+" "+h+":"+mm); // 只到分
            }else{
                $(el).val(y+"/"+m+"/"+d+" "+h+":"+mm+":"+s);
            }

       },
        /**
         * 1位数补0为2位数
         * @param i
         * @returns {*}
         */
         checkTime:function(i) {
            if (i<10)
            {i="0" + i}
            return i
        } ,
        // 时间戳转换
        formatTimeUnlix:function (v) {
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
        },
        // 倒计时处理
        formatTime:function(second, type) {
            var bk;
            if (type == 0) {
                var h = parseInt(second / 3600);
               // var h = Math.floor(second / 3600);
                var f = parseInt(second % 3600 / 60);
               // var f = Math.floor((second - (h * 60 * 60)) / 60);
                var s = parseInt(second % 60);
              //  var s = (second - (h * 60 * 60) - (f * 60));
              // second --;
              bk = '0'+h + ":" + (f < 10 ? "0" + f : f) + ":" + (s < 10 ? "0" + s : s)
              // bk = h + ":" + (f < 10 ? "0" + f : f) + ":" + (s < 10 ? "0" + s : s)
            } else {
                bk = second.split(":");
                bk = parseInt(bk[0] * 3600) + parseInt(bk[1] * 60) + parseInt(bk[2])
            }
            return bk
        },
        fftime:function (n) {
            return Number(n) < 10 ? '' + 0 + Number(n) : Number(n);
        },

        format:function(dateStr) {  //格式化时间
           return new Date(dateStr.replace(/[\-\u4e00-\u9fa5]/g, '/'));
        },
        diff:function (t) {  //根据时间差返回相隔时间
            return t > 0 ? {
                day: Math.floor(t / 86400),
                hour: Math.floor(t % 86400 / 3600),
                minute: Math.floor(t % 3600 / 60),
                second: Math.floor(t % 60)
            } : {day: 0, hour: 0, minute: 0, second: 0};
        },

        /*
         * 数字转千分位
         * */
        formatNumber:function (num) {
            return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        },

        /*
         * 还原金额，去除逗号
         * */
        returnMoney:function(s) {
            return parseFloat(s.replace(/[^\d\.-]/g, ""));
        },


        /**
         * 解析URL参数
         */
        getStrParam :function() {
            var url = location.search; //获取url中"?"符后的字串
            var param = {};
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    param[strs[i].split("=")[0]]= decodeURIComponent(strs[i].split("=")[1]);
                }
            }
            return param;
        },
        // 打开新窗口
        openGame: function(url) {
            if (url) {
                return window.open(url,  "_blank", 'toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no, depended=no, width=600, height=800');
            }
           // return window.open('', 'game', 'width=1200, height=800');
            return window.open(url,  "_blank", 'toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no, depended=no, width=600, height=800') ;
        },
        // 设置cookie
        setCookie :function(name, value, expire, path) {
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
        },

        // 获取cookie
        getCookie :function(name) {
            var re = '(?:; )?' + encodeURIComponent(name) + '=([^;]*);?';
            re = new RegExp(re);
            if (re.test(document.cookie)) {
                return decodeURIComponent(RegExp.$1);
            }
            return '';
        },
        //清除所有cookie函数
         clearAllCookie:function() {
            var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
            if(keys) {
                for(var i = keys.length; i--;)
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            }
        },
        getName:function(){
            return this.name;
        },
        // 金额转换,分转成元
        roundAmt:function(v) {
            return isNaN(v) ? '0.00' : (v / 100).toFixed(2);
        },

        // 金额转换，支持实数, 元转成分
        monAmt :function(v) {
            return /^[-+]?\d+(\.\d*)?$/.test(v) ? v * 100 : '';
        },

        /*
         * 数字转换，显示千位符，s 要转换的数字，n 保留n位小数
         * */
        fortMoney:function (s, n) {
            n = n > 0 && n <= 20 ? n : 2;
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
            let t = "";
            for(let i = 0; i < l.length; i ++ ){
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        },
         ifLogined: function() { // 判断是否登录
            if (this.getCookie('username') && this.getCookie('access_token')) {
                return /\S/g.test(this.getCookie('username')) && /\S/g.test(this.getCookie('access_token'));
            } else {
                return false;
            }
        },
        /*
         *  正整数判断，不包含零
         * */

        isPositiveNum:function(num) {
            //  var re = /^[0-9]*[1-9][0-9]*|0$/ ;
            var re=/^[0-9]*$/;
            return re.test(num);
        },

        positiveNum :function(num) { // 验证数字，正整数判断，包含零
            //  var re = /^[0-9]*[1-9][0-9]*$/;
            var re = /^[0-9]*$/;
            return re.test(num);
        },

        positiveEngNum:function (val) { // 验证英文与数字或者下划线，帐号验证和密码验证
            var re = /^[A-Za-z0-9|_|]+$/;
            return re.test(val);
        },
        trueName :function(val) { // 验证真实姓名，中文字符
            var re = /^[\u4e00-\u9fa5]+$/;
            return re.test(val);
        },
        phoneNum :function(num) { // 验证手机号码
            var re = /^1[3|4|5|7|8|][0-9]{9}$/;
            return re.test(num);
        },
        checkEmail:function (val) { // 验证邮箱
            var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            return re.test(val);
        },
        checkWechat :function(val) { // 验证微信
            var re = /^[a-zA-Z\d_]{5,}$/;
            return re.test(val);
        },
        checkqq :function(val) { // 验证qq
            var re = /^[1-9][0-9]{4,}$/;
            return re.test(val);
        },
        // 用户名，验证 ，val输入框值，el 输入框class content 提示内容
        checkUserName:function (val,el) {
            var content = '请输入4~15位英数帐号' ;
            if( (val && !this.positiveEngNum(val) ) || val.length<4 || val.length>15 ){
                $('.'+el).parent('.form_g').next('.error-message').addClass('red').text(content) ;
            }else{
                $('.'+el).parent('.form_g').next('.error-message').removeClass('red').text('') ;
            }
            if(val ==''){
                $('.'+el).parent('.form_g').next('.error-message').removeClass('red').text('') ;
            }
        },
        // 密码
        checkpassword:function (val,el) {
            var content = '请输入6~20位英数密码' ;
            if( (val && !this.positiveEngNum(val) ) || val.length<6 || val.length>20 ){
                $('.'+el).parent('.form_g').next('.error-message').addClass('red').text(content) ;
            }else{
                $('.'+el).parent('.form_g').next('.error-message').removeClass('red').text('') ;
            }
            if(val ==''){
                $('.'+el).parent('.form_g').next('.error-message').removeClass('red').text('') ;
            }
        },
        // 真实姓名 验证，val输入框值，el 输入框class content 提示内容
        checkrealyName:function (val,el) {
            var content = '请输入真实姓名' ;
            if( (val && !this.trueName(val) ) || val.length<2 || val.length>8 ){
                $('.'+el).parent('.form_g').next('.error-message').addClass('red').text(content) ;
            }else{
                $('.'+el).parent('.form_g').next('.error-message').removeClass('red').text('') ;
            }
            if(val ==''){
                $('.'+el).parent('.form_g').next('.error-message').removeClass('red').text('') ;
            }

        },
        //电话号码 验证，val输入框值，el 输入框class content 提示内容
        checktelphone :function(val,el) {
            var content= '请输入正确的手机号码' ;
            if( (val && !this.phoneNum(val) ) || val.length != 11){
                $('.'+el).parent('.form_g').next('.error-message').addClass('red').text(content) ;
            }else{
                $('.'+el).parent('.form_g').next('.error-message').removeClass('red').text('') ;
            }
            if(val ==''){
                $('.'+el).parent('.form_g').next('.error-message').removeClass('red').text('') ;
            }
        },
        //验证开户行地址
        checkBankAdd  :function(val,el){
           var content = '请输入开户行地址（如:北京市海淀区xx分行' ;
             if(val==''){
                 $('.'+el).parent('.form_g').next('.error-message').addClass('red').text(content) ;
             }else{
                 $('.'+el).parent('.form_g').next('.error-message').removeClass('red').text('') ;
             }
             },
         //验证银行卡号
        checkBankNum: function (val,el) {
            var content = '请输入正确银行卡' ;
            if(val &&!this.positiveNum(val)||val.length<=15||val.length>20){
                $('.'+el).parent('.form_g').next('.error-message').addClass('red').text(content) ;
            }
            else{
                $('.'+el).parent('.form_g').next('.error-message').removeClass('red').text('') ;
            }
            if(val ==''){
                $('.'+el).parent('.form_g').next('.error-message').removeClass('red').text('') ;
            }
        },
        // 输入框清除数据,el当前元素class,cl是input的class
        ClearInput:function(el,cl){
               $('.'+el).prev().val('');
              this.clearVal(cl)
        },
    }
};
export default MyMixin;