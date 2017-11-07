<template>
    <div class="so-con" id="k3">
        <!--left siderbar  -->
        <!--用户导航 so-left -->
        <UserNavigation el=".so-menu" ref="navone"/>
        <!--right menu  -->
        <UserMenu el=".so-top-zoushi" @play="$refs.playDialog.open()" :payoff="balanceData.payoff" />
        
        <div class="so-index">
            <MenuBar :moduleName="moduleName" :balance="balanceData.balance" />

            <div class="so-in-main">
                <div>
                    <div class="so-main-top">
                        <HistoryTerm :previous_pcode="previous_pcode" />

                        <div class="so-m-t-right">
                            <div class="last-open-num">
                                <ul class="k3_top_number">
                                    <li v-for="item in (winNumber || '20, 20, 20').split(',')"><span :class="'k3_dice num_'+ item"></span></li> 
                                </ul>
                            </div>
                            <div class="last-open-k3dou">
                                <ul class="k3_top_detail">
                                    <li>{{lastTermStatic.sizer}}</li>
                                    <li>{{lastTermStatic.total}}</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <CountdownTimer ref="countdownTimer" v-if="now_time && nowover_time" 
                        @countdownOver="playLottery"
                        @entertainCountdownOver="entertain"
                        :now_pcode="now_pcode" :lotteryID="lotteryID"
                        :start="sys_time" :end="now_time" :overend="nowover_time" />
                </div>
            </div>
            <div class="so-in-con">
                <div class="so-con-left">
                    <ul>
                        <li :class="(index == 0 && 'active')" v-for="(kind,index) in kinds" @click="switchTab">{{kind}}</li>
                    </ul>
                </div>
                <div class="so-con-right bule_bg">
                    <!--以下为盘面不同样式，根据ID+class区分-->
                    <!-- k3 单骰 -->
                    <div id="k3-item0" class="active k3_item">
                        <ul>
                            <li class="select-li" v-for="item in singleDiceList">
                                <div class="k3_panel">
                                    <h2>
                                        {{item.name}}
                                    </h2>
                                    <div>
                                        <p v-for="(itemChild,index) in item.childrens" @click="betSelect($event, itemChild, item)">
                                            <span><span :class="'k3_dice num_' + (index+1)"></span></span>
                                            <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- k3 不同号 -->
                    <div id="k3-item1" class="k3_item" style="display:none;">
                        <ul>
                            <li class="select-li" v-for="item in doubleDifferenceList">
                                <div class="k3_panel">
                                    <h2>
                                        {{item.name}}
                                    </h2>
                                    <div>
                                        <p v-for="(itemChild,index) in item.childrens" @click="betSelect($event, itemChild, item)">
                                            <span><span :class="'k3_dice small_dice num_'+ itemChild.name.split('')[0]"></span><span :class="'k3_dice small_dice num_'+ itemChild.name.split('')[1]"></span></span>
                                            <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- k3 同号-->
                    <div id="k3-item2" class="k3_item" style="display:none;">
                        <ul>
                            <li class="select-li" v-for="item in sameNumberList">
                                <div class="k3_panel">
                                    <h2>
                                        {{item.name}}
                                    </h2>
                                    <div>
                                        <p v-for="(itemChild,index) in item.childrens" @click="betSelect($event, itemChild, item)" :class="item.cid == 63100 && 'so-con-span-short'">
                                            <span v-if="itemChild.cid!=63107"><span :class="'k3_dice small_dice num_'+ itemChild.name.split('')[0]"></span><span :class="'k3_dice small_dice num_'+ itemChild.name.split('')[1]"></span><span v-if="(item.cid == 63100)" :class="'k3_dice small_dice num_'+ itemChild.name.split('')[2]"></span></span>
                                            <span v-if="itemChild.cid==63107">{{itemChild.name}}</span>
                                            <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                    <!-- k3 总和-->
                    <div id="k3-item3" class="k3_item" style="display:none;">
                        <ul>
                            <li class="select-li" v-for="item in harmoniousList">
                                <div class="k3_panel">
                                    <h2>
                                        {{item.name}}
                                    </h2>
                                    <div>
                                        <p v-for="(itemChild,index) in item.childrens" @click="betSelect($event, itemChild, item)">
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
        <!--封盘时给foot加上class:close-->
        <!--<div class="so-foot close">-->


        <!--
        下注组件
            属性
                :lotteryID="lotteryID"  彩种id
                :betSelectedList="betSelectedList"  用户选中的赌注
                :parentRefs="$refs"   当前页面的引用
                :isCombine="isCombine"  是否组合玩法
                :combineCount="combineCount"    组合玩法对应的注数
                :balance="balanceData.balance"  帐单值
                :now_pcode="now_pcode"   期次
                :next_pcode="next_pcode"   下期期次
                :now_day="now_day"    日期
            事件
                @betSuccess="resetAction" 
        -->
        <Bet :lotteryID="lotteryID" @betSuccess="resetAction" ref="bet"
            :betSelectedList="betSelectedList"
            :parentRefs="$refs"
            :balance="balanceData.balance" :now_pcode="now_pcode" :next_pcode="next_pcode" :now_day="now_day" />

        <!--封盘底部遮挡-->
        <div v-if="entertainStatus" class="so-fengpan">
            <a>已封盘</a>
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

        <!--玩法说明-->
        <PlayDialog ref="playDialog" />
  </div>


</template>



<script>
    import $ from "jquery";
    import UserNavigation from '@/components/publicTemplate/UserNavigation'
    import UserMenu from '@/components/publicTemplate/UserMenu'
    import MenuBar from '@/components/publicTemplate/MenuBar'

    import InfoDialog from '@/components/publicTemplate/InfoDialog'
    import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
    import BetSuccessfulDialog from '@/components/publicTemplate/BetSuccessfulDialog'
    import CountdownTimer from '@/components/publicTemplate/CountdownTimer'
    import HistoryTerm from '@/components/publicTemplate/HistoryTerm'
    import BallItem from '@/components/publicTemplate/BallItem'

    import Bet from '@/components/publicTemplate/Bet'
    import PlayDialog from '@/components/k3/PlayDialog'
    import Mixin from '@/Mixin'
    import '../../../static/css/k3.css'

    export default {
      name: 'k3Index',
      mixins:[Mixin],
      components: {
        HistoryTerm,
        MenuBar, 
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
      props:['moduleName', 'moduleLotteryID'],
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
            lotteryID:6,
            allLottery:{} ,
            gameHref:{} ,
            kinds:['单骰', '不同号', '同号', '总和'],
        }
      },
      created:function(){
        if (this.moduleLotteryID) {
            this.lotteryID = this.moduleLotteryID;
        } 
        this.getMemberBalance().then(()=>{
            this.loadPlayTree(this.lotteryID);  // 玩法树，彩种id 为2
        });
      },
        mounted:function() {
            var lotteryid = this.lotteryID ; // 彩种id
            var lotteryname = this.moduleName || '江苏快3' ; // 彩种名称
            this.setCookie('lt_lotteryid',lotteryid) ; // 彩种id
            this.setCookie('lottery_name',lotteryname) ; // 彩种名称
            this.allLottery = this.$refs.navone.getLotterys() ;
            this.gameHref = this.$refs.navone.gameHref ; // 拿子组件的值

            setTimeout(() => {
                this.timerBegin();
            }, 500) ;
            this.initViewHeight();
            // $('body').attr('id', 'k3')
          },
          computed:{
            singleDiceList:function(){
                return this.getListByParentID(61000); 
            },
            doubleDifferenceList:function(){
                return this.getListByParentID(62000); 
            },
            sameNumberList:function(){
                return this.getListByParentID(63000); 
            },
            harmoniousList:function(){
                return this.getListByParentID(64000); 
            },
          },
          methods:{

            betCountStat:function(xslen, xlen){
                return  xslen*((xslen-1)/xlen);
            },
            
            switchTab:function(e){
                const $src = $(e.currentTarget);
                const index = $src.index();
                const $tabs = $('.so-con-right > div');
                $tabs.hide();
                $tabs.eq(index).show();
                $src.addClass('active').siblings().removeClass('active');
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
                            code = '20, 20, 20';
                        }
                        that.winNumber = code;
                        //上期开奖统计
                        that.lastTermStatic = res.data[2].doubleData;

                        that.$refs.countdownTimer && that.$refs.countdownTimer.timerInit(that.sys_time, that.now_time, that.nowover_time);
                    });
                }); 
                that.entertainStatus = false;
            },
            resetAction:function(){
                this.betSelectedList = [];
                $(".so-con-right p").removeClass('active');
                this.$refs.bet.betAmount = '' ;
                this.getMemberBalance() ; // 更新余额
            },
            //当用户选择球时（普通），保存相应数据
            betSelect:function(e, item, parentItem){
                if (this.entertainStatus){
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
