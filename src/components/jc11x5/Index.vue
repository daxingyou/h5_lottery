<template>
    <div class="so-con">
        <!--left siderbar  -->
        <!--用户导航 so-left -->
        <UserNavigation el=".so-menu" ref="navone"/>
        <!--right menu  -->
        <UserMenu el=".so-top-zoushi" @play="$refs.playDialog.open()" :payoff="balanceData.payoff" />
        
        <div class="so-index">
            <div class="so-in-top">
                <ul>
                    <li class="so-menu">
                        <img src="/static/images/top/icon-menu.png" class="so-top-menu">
                    </li>
                    <li>
                        <img src="/static/images/top/logo_jc11x5.png" class="so-top-logo">
                    </li>
                    <li class="purse">
                        <img src="/static/images/top/sjinbi.png" class="so-top-sum">
                        <div class="so-in-top-sum">
                            {{ fortMoney(roundAmt(balanceData.balance), 2)}}
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
                                第 <span class="last-date">{{previous_pcode}}</span> 期
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
                                    <li v-for="item in winNumber.split(',')">{{item}}</li>
                                </ul>
                            </div>
                            <div class="last-open-dou">
                                <ul>
                                    <li>{{lastTermStatic.total}}</li>
                                    <li>{{lastTermStatic.sizer}}</li>
                                    <li>{{lastTermStatic.longer}}</li>
                                    <li>{{lastTermStatic.doubler}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <CountdownTimer ref="countdownTimer" v-if="now_time && nowover_time" 
                        @countdownOver="playLottery"
                        @entertainCountdownOver="entertain"
                        :now_pcode="now_pcode" :lotteryID="lotteryID"
                        :start="sys_time" :end="now_time" :overend="nowover_time" />

                    <!-- <div class="so-main-down">
                        <ul>
                            <li>
                                <p>
                                    第 <span class="now-date"> </span> 期
                                </p>
                            </li>
                            <li>
                                <i></i>
                                <span>封盘</span>
                                <a class="close-time">00:00</a>
                            </li>
                            <li>
                                <i></i>
                                <span>开奖</span>
                                <a class="open-time">00:00</a>
                            </li>
                        </ul>
                    </div> -->
                </div>
            </div>
            <div class="so-in-con">
                <div class="so-con-left">
                    <ul>
                        <li :class="(index == 0 && 'active') + (index==2 ? ' reset_bet' : '')" v-for="(kind,index) in kinds" @click="switchTab">{{kind}}</li>
                        <!-- <li class="active " data-val="1">两面</li>
                        <li class="" data-val="1">1-5球</li>
                        <li class="reset_bet" data-val="2">连码</li> -->
                    </ul>
                </div>
                <div class="so-con-right bule_bg">
                    <!--以下为盘面不同样式，根据ID+class区分-->
                    <!-- jc115 双面 -->
                    <div id="so-item0" class="active jc115">
                        <ul>
                            <li class="select-li" v-for="item in doubleSideList">
                                <div>
                                    <h2>
                                        {{item.name}}
                                    </h2>
                                    <div>
                                         <!-- :data-id="itemChild.cid" -->
                                        <p v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                            <span>{{itemChild.name}}</span>
                                            <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                    <!-- jc115 1-5球 -->
                    <div id="so-item1" class="jc115" style="display:none;">
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
                    <!-- jc115 连码 -->
                    <div id="so-item2" class="jc115 tab_container tabBox" style="display:none;">
                        <div class="hd jx11_tab">
                            <ul class="tab tab_mid tab_two">
                                <li :class="(index==0 && 'on')" :data-tab="index" v-for="(kind,index) in continuedNumberList" @click="subTabChange($event, kind, index)"><a href="javascript:;">{{kind.name}}</a></li>
                                
                                <!-- <li class="on" data-tab="1"><a href="javascript:;">一中一</a></li>
                                <li data-tab="2"><a href="javascript:;">二中二</a></li>
                                <li data-tab="3"><a href="javascript:;">三中三</a></li>
                                <li data-tab="4"><a href="javascript:;">四中四</a></li>
                                <li data-tab="5"><a href="javascript:;">五中五</a></li>
                                <li data-tab="6"><a href="javascript:;">六中五</a></li>
                                <li data-tab="7"><a href="javascript:;">七中五</a></li>
                                <li data-tab="8"><a href="javascript:;">八中五</a></li>
                                <li data-tab="9"><a href="javascript:;">前二组选</a></li>
                                <li data-tab="10"><a href="javascript:;">前三组选</a></li> -->
                            </ul>
                        </div>
                        <div class="bd">
                            <ul :class="'tab_content tab_content_'+ (index+1) + (index==0 ? ' show' : '')" v-for="(kind,index) in continuedNumberList">
                                <li class="select-li">
                                    <div>
                                        <h2>{{kind.name}}</h2>
                                        <div>
                                            <BallItem v-for="subItem in continueNumberSubList" :text="++subItem" :payoff="kind.childrens[0].oddsData.payoff" @selected="continueNumberSelect($event, subItem, kind)" />
                                            <!-- 
                                            <p v-for="subItem in continueNumberSubList">
                                                <span>{{++subItem}}</span>
                                                <span class="bet-times">{{payoffFormat(kind.childrens[0].oddsData.payoff)}}</span>
                                            </p> -->

                                            <!-- <p data-id="42602">
                                                <span>02</span>
                                                <span class="bet-times"> </span>
                                            </p>
                                            <p data-id="42603">
                                                <span>03</span>
                                                <span class="bet-times"> </span>
                                            </p>
                                            <p data-id="42604">
                                                <span>04</span>
                                                <span class="bet-times"> </span>
                                            </p>
                                            <p data-id="42605">
                                                <span>05</span>
                                                <span class="bet-times"> </span>
                                            </p>
                                            <p data-id="42606">
                                                <span>06</span>
                                                <span class="bet-times"> </span>
                                            </p>
                                            <p data-id="42607">
                                                <span>07</span>
                                                <span class="bet-times"> </span>
                                            </p>
                                            <p  data-id="42608">
                                                <span>08</span>
                                                <span class="bet-times"> </span>
                                            </p>
                                            <p data-id="42609">
                                                <span>09</span>
                                                <span class="bet-times"> </span>
                                            </p>
                                            <p data-id="42610">
                                                <span>10</span>
                                                <span class="bet-times"> </span>
                                            </p>
                                            <p data-id="42611">
                                                <span>11</span>
                                                <span class="bet-times"> </span>
                                            </p> -->
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div class="so-clear"></div>
            </div>
        </div>
        <!--封盘时给foot加上class:close-->
        <!--<div class="so-foot close">-->
        <div class="so-foot">
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
                <div  class="boxlist bet-go-list">

                </div>
            </div>
            <p class="so-pop-sum">【总计】总注数：<span class="total-bet-num"> </span> 总金额：<span class="total-bet-mon"> </span></p>
            <a><img style="width: 2rem;" src="/static/images/pop/hui.png"></a>
            <a class="btn-submit"><img style="width: 2rem;" src="/static/images/pop/lan_text.png"></a>
        </div>

        <!--玩法说明-->
        <div class="so-pop-wanfa modal">
            <div class="m_content">
                <h2>江西11选5游戏玩法<a></a></h2>
                <div class="content">
                    <div class="playtext">
                        <h3>一、两面玩法</h3>
                        <p>总和大小: 所有开奖号码数字加总值大于等于31为和大；总和值小于等于29为和小；若总和值等于30为和 (不计算输赢)。</p>
                        <p>总和单双: 所有开奖号码数字加总值为单数叫和单，如11、31；加总值为双数叫和双，如42、30。</p>
                        <p>总和尾数大小: 所有开奖号码数字加总值的尾数，大于或等于5为尾大，小于或等于4为尾小。</p>
                        <p>龙：第一球开奖号码大于第五球开奖号码，如第一球开出10，第五球开出07。</p>
                        <p>虎：第一球开奖号码小于第五球开奖号码，如第一球开出03，第五球开出07。</p>
                        <p></p>
                        <h3>二、第一球～第五球玩法</h3>
                        <p>第一球～第五球：如现场滚球第一个开奖号码为10号，投注第一球为10号则视为中奖，其它号码视为不中奖</p>
                        <h3>三、连码玩法</h3>
                        <p>一中一: 投注1个号码与当期开奖的5个号码中任1个号码相同，视为中奖。</p>
                        <p>二中二: 投注2个号码与当期开奖的5个号码中任2个号码相同(顺序不限)，视为中奖。</p>
                        <p>三中三: 投注3个号码与当期开奖的5个号码中任3个号码相同(顺序不限)，视为中奖。</p>
                        <p>四中四: 投注4个号码与当期开奖的5个号码中任4个号码相同(顺序不限)，视为中奖。</p>
                        <p>五中五: 投注5个号码与当期开奖的5个号码中5个号码相同(顺序不限)，视为中奖。</p>
                        <p>六中五: 投注6个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</p>
                        <p>七中五: 投注7个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</p>
                        <p>八中五: 投注8个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</p>
                        <p>前二组选: 投注的2个号码与当期开出的5个号码中的前2个号码相同(顺序不限)，视为中奖。</p>
                        <p>前三组选: 投注的3个号码与当期开出的5个号码中的前3个号码相同(顺序不限)，视为中奖。</p>
                    </div>
                </div>
                <div class="action">
                    <a class="ok">确定</a>
                </div>
            </div>
        </div>

        <!--封盘底部遮挡-->
        <div class="so-fengpan"  style="display: none;">
            <a>已封盘</a>
        </div>

        <!--请输入投注金额-->
        <div class="modal m08">
            <div class="m_content">
                <h2 class="noclose"><a></a></h2>
                <div class="content danger">
                    <div>
                        <img src="/static/images/pop/title_tip.png">
                        <img src="/static/images/page/status03.svg">
                    </div >
                    <span class="bet-error-content"> 请输入整数的投注金额，金额不能为0 </span>
                </div>
            </div>
        </div>
        <!--本期投注已结束-->
        <div class="modal m12">
            <div class="m_content">
                <h2 class="noclose"><a></a></h2>
                <div class="content danger">
                    <div>
                        <img src="/static/images/pop/title_end.png">
                        <img src="/static/images/page/status03.svg">
                    </div>
                    <span>请至下期继续投注</span>
                </div>
            </div>
        </div>
        <!--下注弹窗_成功-->
        <div class="modal m09">
            <div class="m_content">
                <img class="bet_ok" src="/static/images/pop/ok_light.png">
                <h2 class="noclose"><a></a></h2>
                <div class="content check">
                    <div>
                        <img src="/static/images/pop/title_bet_ok.png">
                        <img src="/static/images/icon_check.svg">
                    </div>
                    您已成功支付<br/>请随时关注开奖信息！
                </div>
            </div>
        </div>
        <!--下注弹窗_失败-->
        <div class="modal m10">
            <div class="m_content">
                <h2 class="noclose"><a></a></h2>
                <div class="content danger">
                    <div>
                        <img src="/static/images/pop/title_bet_fail.png">
                        <img src="/static/images/page/status03.svg">
                    </div>
                    <span class="submit-error-content"> 您的余额不足 <br/>请充值后继续进行！</span>
                </div>
            </div>
        </div>


        <!--投注项目超过规定数量-->
        <div class="popup so-fengpan-pop so-fengpan-pop-02">
            <div>
                <img src="/static/images/pop/title_quantity.png">
                <img src="/static/images/page/status03.svg">
                <p>不允许超过<span class="not-allow-content">2</span>个选项</p>
            </div>
        </div>

        <PlayDialog ref="playDialog" />
  </div>


</template>



<script>
    import UserNavigation from '@/components/publicTemplate/UserNavigation'
    import UserMenu from '@/components/publicTemplate/UserMenu'
    import InfoDialog from '@/components/publicTemplate/InfoDialog'
    import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
    import BetSuccessfulDialog from '@/components/publicTemplate/BetSuccessfulDialog'
    import CountdownTimer from '@/components/publicTemplate/CountdownTimer'
    import BallItem from '@/components/publicTemplate/BallItem'

    import Bet from '@/components/publicTemplate/Bet'
    import PlayDialog from '@/components/cqssc/PlayDialog'
    import Mixin from '@/Mixin'

    export default {
      name: 'jc11x5Index',
      mixins:[Mixin],
      components: {
        BallItem,
        CountdownTimer,
        BetSuccessfulDialog,
        Bet,
        UserNavigation,
        UserMenu,
        InfoDialog,
        AutoCloseDialog,
        PlayDialog
      },
      data: function() {
        return {
            now_pcode:0,  // 当前期数
            previous_pcode:'',//上一期期数
            winNumber:'',    //上期开奖号
            lastTermStatic:'',  //上期开奖数据统计
            entertainStatus:false,

            now_time:'',  // 当前期数销售截止时间
            nowover_time:'',  // 当前期数封盘时间
            next_pcode:'',  // 下一期数销售截止时间
            sys_time:'',  // 当前系统时间
            now_day:'',  // 当前日期
            balanceData:{},

            betSelectedList:[],   //用户选中的注数
            playTreeList:[], //玩法树
            lotteryID:4,
            allLottery:{} ,
            gameHref:{} ,
            kinds:['两面', '1-5球', '连码'],
            continueNumberSubList:[...Array(11).keys()],
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
            this.setCookie('lt_lotteryid',lotteryid) ; // 彩种id
            this.setCookie('lottery_name',lotteryname) ; // 彩种名称
            this.allLottery = this.$refs.navone.getLotterys() ;
            this.gameHref = this.$refs.navone.gameHref ; // 拿子组件的值

            setTimeout(() => {
                this.timerBegin();
            }, 500) ;
            this.initViewHeight();
          },
          computed:{
            doubleSideList:function(){
                return this.getListByParentID(41000); 
            },
            oneToFiveList:function(){
                return this.getListByParentID(42000); 
            },
            continuedNumberList:function(){
                return this.getListByParentID(43000);
            },
          },
          methods:{
            subTabChange:function(e, kind,index){
                var $src = $(e.currentTarget);
                $src.addClass('on').siblings().removeClass('on');
                $src.closest('.tab_container').find('.bd ul').eq(index).addClass('show')
                    .siblings().removeClass('show');

                // $('ul.tab_mid li').click(function(){
                //     var tab_id = $(this).attr('data-tab');
                //     var tab_val = $(this).data('val') ;
                //     $('ul.tab0'+tab_val+' li').removeClass('on');
                //     $('#road0'+tab_val+' .tab_content_out').removeClass('on');
                //     $(this).addClass('on');
                //     $("#"+tab_id).addClass('on');
                // });
            },
            checkNumbers:function (method,len,self,xslen) {
                /*
                * 江西11选5 ,method 玩法，len 长度，xslen特殊玩法
                * */
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

            },
            switchTab:function(e){
                const $src = $(e.currentTarget);
                const index = $src.index();
                const $tabs = $('.so-con-right > div');
                $tabs.hide();
                $tabs.eq(index).show();
                $src.addClass('active').siblings().removeClass('active')
            },
            getListByParentID:function(parentID){
                return this.playTreeList.filter((item,i)=>{
                    return item.parentId == parentID;
                });
            },
            //开奖倒计时结束后处理
            playLottery:function(){
                this.$refs.infoDialog.open('请至下期继续投注', 'title_end')
                this.timerBegin();
            },
            //封盘倒计时结束后处理
            entertain:function(){
                this.entertainStatus = true;
                this.resetAction();
            },
            timerBegin:function(){
                var that = this;
                that.getSystemTime().then(sys_time=>{
                    // sys_time = '2017-10-30 19:41:32';
                    // sys_time = '2017-10-30 19:39:10';
                    that.sys_time = sys_time;
                    that.priodDataNewly(that.lotteryID, sys_time).then(res=>{
                        that.next_pcode = res.data[0].pcode;  // 下期期数
                        that.now_pcode = res.data[1].pcode;  // 当前期数
                        that.previous_pcode = res.data[2].pcode;  // 上期期数
                        // 当前期数时间
                        that.now_time = that.formatTimeUnlix(res.data[1].endTime);  
                        // 当前期封盘时间
                        that.nowover_time = that.formatTimeUnlix(res.data[1].prizeCloseTime);  
                        // 当天日期
                        that.now_day = ( res.data[1].pcode).toString().substr(0, 8);  
                        let code = res.data[2].winNumber;
                        //code 上期开奖号码
                        if (!code) {
                            code = '-,开,奖,中,-';
                        }
                        that.winNumber = code;
                        //上期开奖统计
                        that.lastTermStatic = res.data[2].doubleData;

                        // :now_pcode="now_pcode" 
                        // :start="sys_time" :end="now_time" :overend="nowover_time"
                        that.$refs.countdownTimer && that.$refs.countdownTimer.timerInit(that.sys_time, that.now_time, that.nowover_time);
                    });
                }); 
                that.entertainStatus = false;
            },
            resetAction:function(){
                this.betSelectedList = [];
                $(".so-con-right p").removeClass('active');
                this.getMemberBalance() ; // 更新余额
            },
            //当用户选择球时（连码），保存相应数据
            continueNumberSelect:function(e, item, parentItem, p0, p1){
                this.betSelectedList.push(item);
            },
            //当用户选择球时，保存相应数据
            betSelect:function(e, item, parentItem){
                // if (this.entertainStatus){
                //     return false;
                // }
                var $src = $(e.currentTarget);
                if ($src.prop('class').indexOf('active') < 0){
                    $src.addClass('active');
                    item.parentItem = parentItem;
                    this.betSelectedList.push(item);
                }else{
                    $src.removeClass('active');
                    this.betSelectedList = this.betSelectedList.filter((selected)=>{ return selected.cid != item.cid; });
                }
            }

          }

    }
</script>
<style scoped>

    .show { display: block !important; }
    .bd .tab_content { display: none; }
    .tab_content:nth-child(n+2){ display: none; }
    #so-item0 ul li > div > div p, #so-item0.jc115 ul li ul li > div > div p {
        display: block;
    }
    #so-item1.jc115 ul li > div > div p {
        display: block;
    }
</style>
