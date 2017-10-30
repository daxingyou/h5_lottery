<template>
    <div>
      <div class="so-con">
        <!--left siderbar  -->

        <!--用户导航 so-left -->
        <UserNavigation el=".so-menu" />
        
        <!--right menu  
            属性
                el 要绑定到哪个节点上，即点击哪个节点触发
            事件
                play 当用户点击完法说明时触发
        -->
        <UserMenu el=".so-top-zoushi" @play="play" :payoff="balanceData.payoff" />

        <div class="so-index">
            <div class="so-in-top">
                <ul>
                    <li class="so-menu">
                          <img src="/static/images/top/icon-menu.png" class="so-top-menu">
                      </li>

                    <li>
                        <img src="/static/images/top/logo_cqssc.png" class="so-top-logo" @click="showDialog">
                    </li>
                    <li class="purse">
                        <img src="/static/images/top/sjinbi.png" class="so-top-sum">
                        <div class="so-in-top-sum">
                            {{ formatMoney(balanceData.balance)}}
                        </div>
                    </li>
                    <li class="so-top-zoushi">
                        <img src="/static/images/top/zoushi.png">
                    </li>
                </ul>
            </div>
            <div class="so-in-main">
                <div>
                    <div class="so-main-top">
                        <div class="so-m-t-left">
                            <div>
                                第 <span class="last-date"> </span> 期 <!-- 上期 -->
                            </div>
                            <div>
                                 <a href="/publicTemplate/pastView">
                                    <p>
                                        查看往期
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div class="so-m-t-right">
                            <div class="last-open-num">
                                <ul>
                                   <!-- <li>8</li>
                                    <li>7</li>
                                    <li>6</li>
                                    <li>5</li>
                                    <li>9</li>-->
                                </ul>
                            </div>
                            <div class="last-open-dou">
                                <ul>
                                  <!--  <li>21</li>
                                    <li>小</li>
                                    <li>单</li>
                                    <li>龙</li>-->
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="so-main-down">
                        <ul>
                            <li>
                                <p>
                                    第 <span class="now-date"> </span> 期  <!-- 当前期 -->
                                </p>
                            </li>
                            <li>
                                <i></i>
                                <span>封盘</span>
                                <a class="close-time">00:00</a>
                            </li>
                            <li>
                                <i></i>
                                <span >开奖</span>
                                <a class="open-time">00:00</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="so-in-con">
                <div class="so-con-left">
                    <ul>
                        <li class="active">两面</li>
                        <li>1-5球</li>
                        <li>前中后</li>
                    </ul>
                </div>
                <div class="so-con-right bule_bg">
                    <!--以下为盘面不同样式，根据ID区分-->
                    <div id="so-item0" class="active">
                        <!--总和&龙虎-->
                        <ul>
                            <li class="select-li" v-for="item in doubleSideList.filter((temp)=>{return temp.cid==21600})">
                                <div>
                                    <h2>
                                        {{item.name}}
                                    </h2>
                                    <div>
                                        <p :data-id="itemChild.cid" :class="([21605,21606,21607].includes(itemChild.cid) && 'so-con-span-short')" v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                            <span>{{itemChild.name}}</span>
                                            <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li :class="'select-li' + ({'0':' first_ball', '1':' sec_ball'}[index] || ' sec_ball')" v-for="(item,index) in doubleSideList.filter((temp)=>{return temp.cid<21600})">
                                <div>
                                    <h2>
                                        {{item.name}}
                                    </h2>
                                    <div>
                                        <p :data-id="itemChild.cid" v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                            <span>{{itemChild.name}}</span>
                                            <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div id="so-item1" style="display:none;">
                        <ul>
                            <li class="select-li" v-for="item in oneToFiveList">
                                <div>
                                    <h2>
                                        {{item.name}}
                                    </h2>
                                    <div>
                                        <p :data-id="itemChild.cid" v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                            <span>{{itemChild.name}}</span>
                                            <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                    <div id="so-item2"  style="display:none;">
                        <ul>
                            <li class="select-li" v-for="item in frontCenterBackList">
                                <div>
                                    <h2>
                                        {{item.name}}
                                    </h2>
                                    <div>
                                        <p :data-id="itemChild.cid" v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                            <span>{{itemChild.name}}</span>
                                            <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="so-clear"></div>
            </div>
        </div>
        <Bet lotteryID="2" />
        <!--封盘时给foot加上class:close-->
        <!--<div class="so-foot close">-->
        <!-- <div class="so-foot">
            <div>
                <p>已选中<span class="bet-select-num">0</span>注</p>
            </div>
            <div>
                <form>
                    <input placeholder="输入金额" type="number" class="bet-amount">
                    <input type="reset" value="重置">
                </form>
            </div>
            <div>
                <div class="so-add">
                    <img src="/static/images/foot/foot-jia.png">
                    <p>下注</p>
                </div>
            </div>
        </div>
        <div class="so-shade"></div>
        <div class="so-pop">
            <h2>下注清单<a></a></h2>
            <p class="grey_text">请核对您的下注信息</p>
            <div>
                <div class="boxlist bet-go-list">
                    <p>【第一球-单】 @ 1.995 x 10</p>
                    <p>【第一球-单】 @ 1.995 x 10</p>
                    <p>【第一球-单】 @ 1.995 x 10</p>
                    <p>【第一球-单】 @ 1.995 x 10</p>
                    <p>【第一球-单】 @ 1.995 x 10</p>
                    <p>【第一球-单】 @ 1.995 x 10</p>
                    <p>【第一球-单】 @ 1.995 x 10</p>
                    <p>【第一球-单】 @ 1.995 x 10</p>
                    <p>【第一球-单】 @ 1.995 x 10</p>
                </div>
            </div>
            <p class="so-pop-sum">【总计】总注数：<span class="total-bet-num"> </span> 总金额：<span class="total-bet-mon"> </span></p>
            <a><img style="width: 2rem;" src="/static/images/pop/hui.png"></a>
            <a class="btn-submit"><img style="width: 2rem;" src="/static/images/pop/lan_text.png"></a>
        </div> -->

        <!--封盘底部遮挡-->
         <!-- <div class="so-fengpan">
            <a>已封盘</a>
        </div>  -->

        <!--请输入投注金额-->
        <div class="popup so-tip-pop so-tip-pop-04">
            <div>
                <img src="/static/images/pop/title_tip.png">
                <img src="/static/images/page/status03.svg">
                <p class="bet-error-content">请输入投注金额</p>
            </div>
        </div>
        <!--本期投注已结束-->
        <div class="popup so-fengpan-pop so-bet-end-pop">
            <div>
                <img src="/static/images/pop/title_end.png">
                <img src="/static/images/page/status03.svg">
                <p>请至下期继续投注</p>
            </div>
        </div>

        <!--下注弹窗_成功-->
        <div class="popup so-tip-pop so-tip-pop-05 bet_ok_area">
            <img class=" bet_ok" src="/static/images/pop/ok_light.png">
            <div>
                <img src="/static/images/pop/title_bet_ok.png">
                <img src="/static/images/pop/icon_check.png">
                <p>您已成功支付<br/>请随时关注开奖信息！</p>
            </div>
        </div>
        <!--下注弹窗_失敗-->
        <div class="popup so-tip-pop so-tip-pop-06">
            <div>
                <img src="/static/images/pop/title_bet_fail.png">
                <img src="/static/images/page/status03.svg">
                <p class="submit-error-content">您的余额不足 <br/>请充值后继续进行！</p>
            </div>
        </div>

        <!-- 确认对话框API
            text  对话框提示内容
        -->
        <InfoDialog ref="infoDialog" text="请您继续投注111" />

        <!--自动关闭（闪屏）对话框API
            属性
                text  对话框提示内容
                type  对话框类型，可以是 static/images/pop/ 目录下任意图片，像title_quantity、title_tip
            方法
                open(text, type)
        -->
        <AutoCloseDialog ref="autoCloseDialog" text="您的余额不足" type="" />

      </div>
        
        <!--玩法说明对话框
            方法：
                open 打开对话框
                close 关闭对话框
        -->
        <PlayDialog ref="playDialog" />
    </div>
  
</template>



<script>
// import common  from '@/components/common'
import UserNavigation from '@/components/publicTemplate/UserNavigation'
import UserMenu from '@/components/publicTemplate/UserMenu'
import InfoDialog from '@/components/publicTemplate/InfoDialog'
import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import Bet from '@/components/publicTemplate/Bet'
import PlayDialog from '@/components/cqssc/PlayDialog'
import Mixin from '@/Mixin'

export default {
  name: 'Index',
  mixins:[Mixin],
  data () {
    return {
        
        now_pcode:0,  // 当前期数
        now_time:'',  // 当前期数销售截止时间
        nowover_time:'',  // 当前期数封盘时间
        next_pcode:'',  // 下一期数销售截止时间
        sys_time:'',  // 当前系统时间
        now_day:'',  // 当前日期
        balanceData:{},

        betSelectedList:[],   //用户选中的注数
        playTreeList:[], //玩法树
        lotteryID:2
    }
  }, 
  created:function(){
    this.getMemberBalance().then(()=>{
        this.loadPlayTree(this.lotteryID);  // 玩法树，彩种id 为2
    });
  },
  mounted:function() {
    var lotteryid = this.lotteryID ; // 彩种id
    var lotteryname = '重庆时时彩' ; // 彩种名称
    this.setCookie('lt_lottid',lotteryid) ; // 彩种id
    this.setCookie('lottery_name',lotteryname) ; // 彩种名称
    setTimeout(() => {
        // 系统时间
        this.getSystemTime(lotteryid).then((sys_time)=>{
            this.priodDataNewly(lotteryid, sys_time)
        }); 
 
    }, 500) ;

  },
  computed:{
    doubleSideList:function(){
        return this.playTreeList.filter((item,i)=>{
            return item.parentId == 21000;
        });
    },
    oneToFiveList:function(){
        return this.playTreeList.filter((item,i)=>{
            return item.parentId == 22000;
        });
    },
    frontCenterBackList:function(){
        return this.playTreeList.filter((item,i)=>{
            return item.parentId == 23000;
        });
    },
  },
  methods:{

    //当用户选择球时，保存相应数据
    betSelect:function(e, item, parentItem){
        var $src = $(e.currentTarget);
            if ($src.prop('class').indexOf('active') < 0){
                $src.addClass('active');
                item.parentItem = parentItem;
                this.betSelectedList.push(item);
            }else{
                $src.removeClass('active');
                this.betSelectedList = this.betSelectedList.filter((selected)=>{ return selected.cid != item.cid; });
            }
            
            console.log(this.betSelectedList)

    },
    //响应Bet组件的开始下注动作，这是一个回调函数
    // startBet:function(){
        // return '111';
        // var $that = $(e.currentTarget);
        // var bet_num = $('.bet-select-num').text() ; // 总注数
        // const bet_num = this.betSelectedNum;
        // var bet_mon = $.trim($('.bet-amount').val()) ; // 投注金额，在bet模块取
        // var all_bet_mon = Number(bet_num)*Number(bet_mon) ; // 总投注金额，在bet模块计算

        // var betstr = '' ;
        // $(".so-con-right p").each(function (i, t) {
        //     // 已选择的注单
        //     if($that.hasClass('active')){
        //         var total_title = $that.parents('.select-li').find('h2').text() ;  // 大标题
        //         var total_con = $that.find('span:nth-child(1)').text() ;  // 投注内容
        //         var total_mon = $that.find('span:nth-child(2)').text() ;  // 投注内容赔率
        //         var total_id = $that.data('id') ;  // 投注内容玩法id
        //         var total_type = $that.data('type') ;  // 投注内容玩法类型，组合是 zu_he
        //         if(total_type){
        //             betstr +='<p data-id="'+total_id+'" data-type="'+total_type+'">【<span class="each-title">'+ total_title +'</span>-<span class="each-content">'+ total_con +'</span>】 @ <span class="each-times">'+ total_mon+'</span> x <span class="each-mon"> '+ bet_mon +'</span></p>' ;
        //         }else{
        //             betstr +='<p data-id="'+total_id+'" >【<span class="each-title">'+ total_title +'</span>-<span class="each-content">'+ total_con +'</span>】 @ <span class="each-times">'+ total_mon+'</span> x <span class="each-mon"> '+ bet_mon +'</span></p>' ;
        //         }


        //     }
        // });
        // $('.bet-go-list').html(betstr) ;

        // // 总注数
        // $('.total-bet-num').text(bet_num) ;
        // // 总金额
        // $('.total-bet-mon').text(all_bet_mon) ;
    // },
    
    // 玩法树
    loadPlayTree:function(gameid) {
        return new Promise((resolve, reject)=>{
            $.ajax({
                type: 'get',
                headers: {
                    "Authorization": "bearer  " + this.getAccessToken(access_token),
                },
                url: action.forseti + 'api/playsTree',
                data: {lotteryId: gameid,}, // 当前彩种id
                success: (res) => {
                    this.playTreeList = res.data.childrens;
                    resolve(this.playTreeList);

                    // $.each(res.data.childrens,function (i,v) { // 遍历数据
                    //    // console.log(v) ;
                    //     $.each(v.childrens,function (j,vv) {
                    //         $(".so-con-right p").each(function (i, t) {
                    //            var playid = $(this).data('id') ;
                    //            if(playid == vv.cid){
                    //                $(this).find('.bet-times').text((Number(vv.oddsData.payoff)/10000).toFixed(3)) ; // 每种玩法赔率
                    //            }
                    //         });

                    //     }) ;
                    // }) ;

                },
                error: function () {

                }
            });
        });
        
    },
    // 最新开奖期数
    priodDataNewly:function(gameid, sys_time) {
        $.ajax({
            type: 'get',
            headers: {
                "Authorization": "bearer  " + this.getAccessToken(access_token),
            },
            url: action.forseti + 'api/priodDataNewly',
            data: {lotteryId: gameid,},
            success: (res) => {
                if(res.data){
                    this.next_pcode = res.data[0].pcode;  // 下一期数
                    this.now_pcode = res.data[1].pcode;  // 当前期数
                    this.now_time = this.formatTimeUnlix(res.data[1].endTime);  // 当前期数时间
                    this.nowover_time = this.formatTimeUnlix(res.data[1].prizeCloseTime);  // 当前期封盘时间
                    this.now_day = ( res.data[1].pcode).toString().substr(0, 8);  // 当天日期
                    this.processCode( res.data[1].pcode, res.data[2].pcode, res.data[2].winNumber,res.data[2].doubleData) ;

                    setTimeout(() => {
                        // 倒计时
                        this.lt_timer(sys_time,this.now_time,this.nowover_time) ;
                        $('.so-fengpan').hide() ; // 隐藏封盘容器
                    }, 100)
                }


            },
            error: function () {

            }
        });
    },
    //倒计时处理
    lt_timer:function(start, end,overend) { // start服务器开始时间，end当前期开奖结束时间，overend 封盘结束时间
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
                    'Authorization': 'bearer  ' + access_token
                },
                timeout: 30000,
                data: {} ,
                success: (data) => { //成功
                    // console.log(data) ;
                   // sys_time = this.formatTimeUnlix(data.data); // 更新系统时间
                    lt_time_leave = (format(this.now_time).getTime() - format(this.formatTimeUnlix(data.data)).getTime()) / 1000 ;
                    lt_time_leave_over = (format(this.nowover_time).getTime() - format(this.formatTimeUnlix(data.data)).getTime()) / 1000 ;

                }
            });
        }

        var timerno = window.setInterval(() => {
            if (lt_time_leave > 0 && (lt_time_leave % 240 == 0 || lt_time_leave == 60 )) {   //每隔4分钟以及最后一分钟重新读取服务器时间
                _getSystemTime();

            }

            if (lt_time_leave <= 0) { // 开奖倒计时结束
                clearInterval(timerno);
                this.initBetPop01(3) ;
                this.outTimeSet() ;
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
                this.resetAction() ;  //重置已选注单
            }else{
                // 封盘倒计时
                $('.close-time').html( fftime(over_oDate.minute) + ':' + fftime(over_oDate.second) );
            }


        }, 1000);
    },
    //  开奖数据处理 ,issue 当前期数，lastissue 上期期数，code 上期开奖号码，double 上期开奖统计 
    processCode:function(issue, lastissue,code,double) {
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
        var dstr ='';
        dstr +='<li>'+double.total+'</li>' ;
        dstr +='<li>'+double.sizer+'</li>' ;
        dstr +='<li>'+double.longer+'</li>' ;
        dstr +='<li>'+double.doubler+'</li>' ;
        $('.last-open-dou ul').html(dstr) ;

    },

    // 倒计时结束后处理
    outTimeSet:function() {
        // 拉取期数数据
        var lotteryid = this.getCookie('lt_lotteryid') ;
        $.ajax({
            type: 'get',
            headers: {
                "Authorization": "bearer  " + this.getAccessToken(access_token),
            },
            url: action.forseti + 'api/priodDataNewly',
            data: { lotteryId: lotteryid },
            success: (res) => {  //成功
                console.log('拉取期数成功');
                // 开奖数据处理
                this.processCode( res.data[1].pcode, res.data[2].pcode, res.data[2].winNumber,res.data[2].doubleData) ;
                this.getSystemTime(lotteryid);  // 获取当前系统时间

                if (res == 'empty') {   //未到销售时间
                    return false;
                }

            },
            error: function () {  //失败

                return false;
            }
        });
    },

    // 本期投注已结束
    initBetPop01:function(closet) {
            $('.so-bet-end-pop').toggle();
            $('.so-shade').toggle();
        $('.so-bet-end-pop').click(function () {
            $('.so-bet-end-pop').toggle();
            $('.so-shade').toggle();
        });
        setTimeout(() => {
            $('.so-bet-end-pop,.so-shade').hide() ;
        },closet*1000) ; // 自动关闭
    },


    /*
    * 重置投注页，提交表单后调用
    * */
    resetAction:function() {
        $(".so-con-right p").each(function (i, t) {
            $(this).removeClass('active') ;
            $('.bet-select-num').text('0') ;
            $('.bet-amount').val('') ;
        })
    },

    //此方法用来控制盘面选择,更新盘面信息后应该重新调用一次 moved to /src/components/qcss/Index.vue，如果其它地方需要，请根据实际情况拷贝复本
    // initChoiceObj:function() {
    //     $('.so-con-right').on('click','p',function () {
    //         var _this =  $(this) ;
    //         var className = _this.attr("class") || "" ;
    //         if (className.indexOf("active") >= 0) {
    //             _this.attr("class", className.replace("active", "")) ;
    //         } else {
    //             _this.attr("class", className + " active") ;
    //         }
    //         // 已选注数
    //         var choosed =  $(".so-con-right p.active").length ;

    //         var pid = _this.parents('ul.tab_content').attr('id') ;
    //         var paid = '#'+pid ;
    //         var z_choosed =  $(paid+' p.active').length ; // 二中二，三中三等
    //         // var ifSp = 0 ;
    //        // var spArr = [] ; // 二中二，三中三等
    //         if(pid){ // 二中二，三中三等
    //             checkNumbers(pid,z_choosed,_this) ;
    //            // sessionStorage.setItem(pid,paid) ;
    //             var spchoose = parseInt(z_choosed/xlen)+(choosed-z_choosed) ;
    //             $('.bet-select-num').text(spchoose) ;

    //         }else{
    //             $('.bet-select-num').text(choosed-parseInt(z_choosed/2)) ;
    //         }

    //     }) ;

    // },
    showDialog:function(){
        this.$refs.infoDialog.open();
    },
    formatMoney:function(val){
        return this.fortMoney(this.roundAmt(val), 2);
    },
    // 获取用户余额
    getMemberBalance:function (lotteryid) {
        return new Promise((resolve)=>{
            $.ajax({
                type: 'GET',
                headers: {
                    "Authorization": "bearer  " + this.getAccessToken(access_token),
                },
                // dataType:'json',
                // contentType:"application/json; charset=utf-8",  // json格式传给后端
                url: action.hermes + 'api/balance/get',
                data: { lotteryId: lotteryid },
                success: (res) => {
                    this.balanceData = res.data;
                    var mom = this.fortMoney(this.roundAmt(res.data.balance), 2);  // 用户余额
                    this.setCookie("membalance", mom);  // 把登录余额放在cookie里面
                    resolve();
                },
                error: function () {

                }
            });
            
        })
    },
    play:function(){
        this.$refs.playDialog.open()
    }
  },
  components: {
    Bet,
    UserNavigation,
    UserMenu,
    InfoDialog, 
    AutoCloseDialog,
    PlayDialog
  }
}
</script>

<style scoped>
    #so-item0 ul li > div > div p, #so-item0.jc115 ul li ul li > div > div p {
        display: block;
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
-->
