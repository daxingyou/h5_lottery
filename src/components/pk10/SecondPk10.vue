<template>
    <div class="so-con" id="pk10">
        <!--left siderbar  -->
        <!--用户导航 so-left -->
        <UserNavigation el=".so-menu" ref="navone"/>

        <!--right menu  -->
        <!--right menu
          属性
              el 要绑定到哪个节点上，即点击哪个节点触发
          事件
              play 当用户点击完法说明时触发
      -->
        <UserMenu el=".so-top-zoushi" @play="$refs.playDialog.open()" :payoff="balanceData.payoff" />

        <div class="so-index">
            <div class="so-top-all">
                <div class="so-in-top">
                    <ul>
                        <li class="so-menu">
                            <img src="/static/images/top/icon-menu.png" class="so-top-menu">
                        </li>
                        <li class="left_top_logo">
                            秒速赛车
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
                            <HistoryTerm :previous_pcode="previous_pcode" />

                            <div class="so-m-t-right" v-show="ishwowpriod">
                                <div class="last-open-num">
                                    <ul class="pk10_top_number">
                                        <li v-for="item in winNumber.split(',')"><span class="pk10_ball small_ball" :class="'ball num_'+item"> </span></li>
                                        <!-- <li><span class="pk10_ball small_ball num_10"></span></li> -->

                                    </ul>
                                </div>
                                <div class="last-open-dou">
                                    <ul class="pk10_top_detail">
                                        <li>{{lastTermStatic.top2_total}}</li>
                                        <li>{{lastTermStatic.top2_sizer}}</li>
                                        <li>{{lastTermStatic.top2_doubler}}</li>
                                        <li>{{lastTermStatic.lh_5}}</li>
                                        <li>{{lastTermStatic.lh_4}}</li>
                                        <li>{{lastTermStatic.lh_3}}</li>
                                        <li>{{lastTermStatic.lh_2}}</li>
                                        <li>{{lastTermStatic.lh_1}}</li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                        <CountdownTimer ref="countdownTimer"
                                        @countdownOver="playLottery"
                                        @entertainCountdownOver="entertain"
                                        @spanArrived="lotteryDataFetch"
                                        @visibility="timerBegin"
                                        :lotteryID="lotteryID"
                                        :now_pcode="now_pcode"
                                        :start="sys_time" :end="now_time" :overend="nowover_time" />

                    </div>
                </div>
            </div>
            <div class="so-in-con">
                <div class="so-con-left" id="nav-wrapper">
                    <ul>
                        <li :class="(index == 0 && 'active')" v-for="(kind,index) in kinds" @click="switchTab">
                            <a :href="'#pk10-item'+index">{{kind}}</a>
                        </li>
                      <!--  <li class="active">两面</li>
                        <li>冠亚和值</li>
                        <li>1-5名</li>
                        <li>6-10名</li>-->
                    </ul>
                </div>
                <div class="bule_bg"></div>
                <div  id="content-wrapper">
                      <div class="so-con-right">
                          <div id="scroller"  class="scroller" >
                                <!--以下为盘面不同样式，根据ID+class区分-->
                                <!-- pk10 双面 -->
                                <div id="pk10-item0" class="active pk10_item item_one">
                                    <ul>
                                        <li class="select-li" v-for="item in doubleSideList">
                                            <div class="pk10_panel">
                                                <h2>
                                                    {{item.name}}
                                                </h2>
                                                <div>
                                                    <p :data-id="itemChild.cid"  v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                                        <span :data-val="itemChild.name">{{itemChild.name}}</span>
                                                        <span class="bet-times"> {{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                                    </p>

                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                                <!-- pk10 冠亚和值 -->
                                <div id="pk10-item1" class="pk10_item" style="display:none;">
                                    <ul>
                                        <li class="select-li" v-for="item in oneToFiveList">
                                            <div class="pk10_panel">
                                                <h2>
                                                    {{item.name}}
                                                </h2>
                                                <div>
                                                    <p :data-id="itemChild.cid"  v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                                        <span :data-val="itemChild.name">{{itemChild.name}}</span>
                                                        <span class="bet-times"> {{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                                    </p>

                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <!-- pk10 1-5名-->
                                <div id="pk10-item2" class="pk10_item" style="display:none;">
                                    <ul>
                                        <li class="select-li" v-for="item in frontCenterBackList">
                                            <div class="pk10_panel">
                                                <h2>
                                                    {{item.name}}
                                                </h2>
                                                <div>
                                                    <p :data-id="itemChild.cid"  v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                                        <span class="pk10_num_bg" :data-val="itemChild.name">
                                                            <span class="pk10_ball" :class="'num_0'+itemChild.name" v-if="itemChild.name<10"></span>
                                                            <span class="pk10_ball" :class="'num_'+itemChild.name" v-else></span>
                                                        </span>
                                                        <span class="bet-times"> {{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                                    </p>

                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                                <!-- pk10 6-10名-->
                                <div id="pk10-item3" class="pk10_item" style="display:none;">
                                    <ul>
                                        <li class="select-li" v-for="item in frontLastBackList">
                                            <div class="pk10_panel">
                                                <h2>
                                                    {{item.name}}
                                                </h2>
                                                <div>
                                                    <p :data-id="itemChild.cid"  v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                                        <span class="pk10_num_bg" :data-val="itemChild.name">
                                                            <span class="pk10_ball" :class="'num_0'+itemChild.name" v-if="itemChild.name<10"></span>
                                                            <span class="pk10_ball" :class="'num_'+itemChild.name" v-else></span>
                                                        </span>
                                                        <span class="bet-times"> {{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                                    </p>

                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                          </div>
                </div>
                </div>
                <div class="so-clear"></div>
            </div>
        </div>

        <!--
       下注组件
           属性
               :lotteryID="lotteryID"  彩种id
               :betSelectedList="betSelectedList"  用户选中的赌注
               :parentRefs="$refs"   当前页面的引用
               :balance="balanceData.balance"  帐单值
               :now_pcode="now_pcode"   期次
               :next_pcode="next_pcode"   下期期次
               :now_day="now_day"    日期
           事件
               @betSuccess="resetAction"
       -->
        <Bet :lotteryID="lotteryID" @betSuccess="resetAction('1')" ref="bet"
             :betSelectedList="betSelectedList"
             :parentRefs="$refs"
             :balance="balanceData.balance"
             :now_pcode="now_pcode"
             :pk10_now_pcode="pk10_now_pcode"
             :next_pcode="next_pcode" :now_day="now_day" />

        <!--封盘底部遮挡-->
        <div v-if="entertainStatus" class="so-fengpan">
            <a>已封盘</a>
        </div>
        <!--未开盘底部遮挡-->
        <div v-if="notopen" class="so-fengpan">
            <a>未开盘</a>
        </div>
        <!-- 确认对话框API
                       text  对话框提示内容
                   -->
        <InfoDialog ref="infoDialog" text="请您继续投注" />

        <!--自动关闭（闪屏）对话框API
            属性
                text  对话框提示内容
                type  对话框类型，可以是 static/images/pop/ 目录下任意图片，像title_quantity、title_tip
            方法
                open(text, type)
        -->
        <AutoCloseDialog ref="autoCloseDialog" text="您的余额不足" type="" />

        <BetSuccessfulDialog ref="betSuccessfulDialog" />


    <!--玩法说明对话框
        方法：
            open 打开对话框
            close 关闭对话框
    -->
    <PlayDialog ref="playDialog"  :rewardTime='rewardTime' />


    </div>
  
</template>



<script>
    // import $ from "jquery";
    import "../../../static/frist/css/pk10.css"
    import UserNavigation from '@/components/publicTemplate/UserNavigation'
    import UserMenu from '@/components/publicTemplate/UserMenu'
    import InfoDialog from '@/components/publicTemplate/InfoDialog'
    import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
    import BetSuccessfulDialog from '@/components/publicTemplate/BetSuccessfulDialog'
    import CountdownTimer from '@/components/publicTemplate/CountdownTimer'
    import HistoryTerm from '@/components/publicTemplate/HistoryTerm'

    import Bet from '@/components/publicTemplate/Bet'
    import PlayDialog from '@/components/pk10/PlayDialog'
    import Mixin from '@/Mixin'
export default {
    name: 'pk10Index',
    mixins:[Mixin],
    components: {
        HistoryTerm,
        CountdownTimer,
        BetSuccessfulDialog,
        Bet,
        UserNavigation,
        UserMenu,
        InfoDialog,
        AutoCloseDialog,
        PlayDialog
    },
    data :function() {
        return {
            now_time:'',  // 当前期数销售截止时间
            nowover_time:'',  // 当前期数封盘时间
            next_pcode:'',  // 下一期数
            now_pcode:0,  // 当前期数
            pk10_now_pcode:0,  // 当前期数
            previous_pcode:'',// 上一期期数
            winNumber:'',    // 上期开奖号
            lastTermStatic:'',  // 上期开奖数据统计
            sys_time :'',  // 当前系统时间
            now_day:'',  // 当前日期
            balanceData:{},
            entertainStatus:false,
            notopen:false,
            ishwowpriod:false,
            betSelectedList:[],   //用户选中的注数
            playTreeList:[], //玩法树
            lotteryID: 108 ,
            allLottery:{} ,
            gameHref:{} ,
            kinds:['两面', '冠亚和值', '1-5名','6-10名'],
            rewardTime:'每日09:30-22:00，10 分钟一期，全天共84期。',
            
        }
    },
    created:function(){
        this.getMemberBalance(this.lotteryID).then(()=>{
            this.loadPlayTree(this.lotteryID);  // 玩法树，彩种id 为2
        });
    },
    mounted:function() {
        var lotteryid = this.lotteryID ; // 彩种id
        var lotteryname = '北京PK10' ; // 彩种名称
        this.setCookie('lt_lotteryid',lotteryid) ; // 彩种id
        this.setCookie('lottery_name',lotteryname) ; // 彩种名称
        this.allLottery = this.$refs.navone.getLotterys() ;
        this.gameHref = this.$refs.navone.gameHref ; // 拿子组件的值
        this.initViewHeight() ;
        setTimeout(() => {
            this.timerBegin();
        }, 500) ;

    },
    computed:{
        doubleSideList:function(){ // 两面
            return this.getListByParentID(81000);
        },
        oneToFiveList:function(){ // 冠亚和值
            return this.getListByParentID(82000);
        },
        frontCenterBackList:function(){ // 1-5名
            return this.getListByParentID(83000);
        },
        frontLastBackList:function(){ // 6-10名
            return this.getListByParentID(84000);
        },
    },
    methods:{
        switchTab:function(e){
            var _self = this ;
            const $src = $(e.currentTarget);
            const index = $src.index();
            const $tabs = $('.so-con-right .pk10_item');
            $tabs.hide();
            $tabs.eq(index).show();
            $src.addClass('active').siblings().removeClass('active') ;

            var conth = $tabs.eq(index).height()-300 ;
            $('.so-con-right').css('height',conth+'px') ;
            //  _self.setScroll() ;
           _self.conScroll.refresh() ;

        },
        getListByParentID:function(parentID){
            return this.playTreeList.filter((item,i)=>{
                return item.parentId == parentID;
            });
        },
        //开奖倒计时结束后处理
        playLottery:function(){
           // this.$refs.infoDialog.open('请至下期继续投注', 'title_end')
            this.timerBegin();
        },
        //封盘倒计时结束后处理
        entertain:function(){
            this.$refs.infoDialog.open('请至下期继续投注', 'title_end')
            this.entertainStatus = true;
            this.resetAction();
        },
        lotteryDataFetch:function(){
            const that = this;
            return new Promise((resolve)=>{
                that.getSystemTime().then((sys_time)=>{

                    that.sys_time = that.formatTimeUnlix(sys_time) ;
                    that.priodDataNewly(that.lotteryID, sys_time).then(res=>{
                        that.ishwowpriod = true ;
                        that.next_pcode = res.data[0].pcode;  // 下期期数
                        that.pk10_now_pcode = res.data[1].pcode;  // 当前期数
                        let code = res.data[2].winNumber;
                       // that.previous_pcode = res.data[2].pcode;  // 上期期数
                        var firstpcode = res.data[0].pcode.toString().substr(8, 11) ;
                        if(firstpcode =='001'){  //  白天第一期
                            if(res.data[1].endTime - sys_time >0) { // 凌晨最后一期未结束
                                    that.now_pcode = res.data[1].issueAlias;  // 当前期数
                                    // 当前期数时间
                                    that.now_time = that.formatTimeUnlix(res.data[1].endTime);
                                    // 当前期封盘时间
                                    that.nowover_time = that.formatTimeUnlix(res.data[1].prizeCloseTime);
                                    that.winNumber = res.data[2].winNumber;
                                    that.lastTermStatic = res.data[2].doubleData;    //上期开奖统计
                                    that.previous_pcode = res.data[2].issueAlias;  // 上期期数
                                }else{
                                if( res.data[0].startTime - sys_time >0){  // 未开盘状态
                                    that.notopen = true ;
                                }else{
                                    that.notopen = false ;
                                }
                                that.now_pcode = res.data[0].issueAlias;  // 当前期数
                                // 当前期数时间
                                that.now_time = that.formatTimeUnlix(res.data[0].endTime);
                                // 当前期封盘时间
                                that.nowover_time = that.formatTimeUnlix(res.data[0].prizeCloseTime);
                                that.winNumber = res.data[1].winNumber;
                                that.lastTermStatic = res.data[1].doubleData;    //上期开奖统计
                                that.previous_pcode = res.data[1].issueAlias;  // 上期期数
                            }

                        }else{
                            that.now_pcode = res.data[1].issueAlias;  // 当前期数
                            // 当前期数时间
                            that.now_time = that.formatTimeUnlix(res.data[1].endTime);
                            // 当前期封盘时间
                            that.nowover_time = that.formatTimeUnlix(res.data[1].prizeCloseTime);
                            //code 上期开奖号码
                            if (!code) {
                                // code='20,20,20,20,20,20,20,20,20,20';
                                that.winNumber = res.data[3].winNumber;
                                that.lastTermStatic = res.data[3].doubleData;    //上期开奖统计
                                that.previous_pcode = res.data[3].issueAlias;  // 上期期数
                            }else{
                                that.winNumber = res.data[2].winNumber;
                                that.lastTermStatic = res.data[2].doubleData;    //上期开奖统计
                                that.previous_pcode = res.data[2].issueAlias;  // 上期期数
                            }

                        }

                        if(res.data[1].status >1){ // 异常情况，如提前开盘 2
                            that.entertainStatus = true;
                        }

                        // 当天日期
                        that.now_day = ( res.data[1].pcode).toString().substr(0, 8);

                        resolve();
                        // that.$refs.countdownTimer && that.$refs.countdownTimer.timerInit(that.sys_time, that.now_time, that.nowover_time);
                    });
                });
            })
            
        },

        timerBegin:function(){
            var that = this ;
            that.lotteryDataFetch().then(()=>{
                that.$refs.countdownTimer && that.$refs.countdownTimer.timerInit(that.sys_time, that.now_time, that.nowover_time);
            })
            that.entertainStatus = false;
            that.notopen = false;
        },
        resetAction:function(success){
            this.betSelectedList = [];
            $(".so-con-right p").removeClass('active');
            if(success != '1'){
                this.$refs.bet.betAmount = '' ;
            }
            this.getMemberBalance(this.lotteryID) ; // 更新余额
        },
        //当用户选择球时，保存相应数据
        betSelect:function(e, item, parentItem){
            if (this.entertainStatus || this.notopen){
                return false;
            }
            var $src = $(e.currentTarget);
            if ($src.prop('class').indexOf('active') < 0){
                $src.addClass('active');
                item.parentItem = parentItem;
                this.betSelectedList.push(item);
            }else{
                $src.removeClass('active');
                this.betSelectedList = this.betSelectedList.filter((selected)=>{ return selected.cid != item.cid; });
            }
        },


        // play:function(){
        //     this.$refs.playDialog.open()
        // }

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pk10_item ul li .pk10_panel > div p> .pk10_num_bg:first-child, .pk10_item ul li .pk10_panel > div p.active> .pk10_num_bg:first-child  {
        color: transparent;
    }
</style>
