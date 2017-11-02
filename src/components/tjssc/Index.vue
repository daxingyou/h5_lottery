<template>
    <div>
      <div class="so-con">
        <!--left siderbar  -->

        <!--用户导航 so-left -->
        <UserNavigation el=".so-menu" ref="navone"/>
        
        <!--right menu  
            属性
                el 要绑定到哪个节点上，即点击哪个节点触发
            事件
                play 当用户点击完法说明时触发
        -->
        <UserMenu el=".so-top-zoushi" @play="$refs.playDialog.open()" :payoff="balanceData.payoff" />

        <div class="so-index">
            <div class="so-in-top">
                <ul>
                    <li class="so-menu">
                          <img src="/static/images/top/icon-menu.png" class="so-top-menu">
                      </li>

                    <li>
                        <img src="/static/images/top/logo_cqssc.png" class="so-top-logo" />
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
                                第 <span class="last-date">{{previous_pcode}}</span> 期 <!-- 上期 -->
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

                </div>
            </div>
            <div class="so-in-con">
                <div class="so-con-left">
                    <ul>
                        <li :class="(index == 0 && 'active')" v-for="(kind,index) in kinds" @click="switchTab">{{kind}}</li>
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
        <Bet :lotteryID="lotteryID" @betSuccess="resetAction" 
            :betSelectedList="betSelectedList"
            :parentRefs="$refs"
            :balance="balanceData.balance" :now_pcode="now_pcode" :next_pcode="next_pcode" :now_day="now_day" />

        <!--封盘底部遮挡-->
        <div v-if="entertainStatus" class="so-fengpan">
            <a>已封盘</a>
        </div> 

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
import BetSuccessfulDialog from '@/components/publicTemplate/BetSuccessfulDialog'
import CountdownTimer from '@/components/publicTemplate/CountdownTimer'

import Bet from '@/components/publicTemplate/Bet'
import PlayDialog from '@/components/cqssc/PlayDialog'
import Mixin from '@/Mixin'

export default {
  name: 'Index',
  mixins:[Mixin],
  components: {
    CountdownTimer,
    BetSuccessfulDialog,
    Bet,
    UserNavigation,
    UserMenu,
    InfoDialog, 
    AutoCloseDialog,
    PlayDialog
  }, 
  data:function () {
    return {
        now_time:'',  // 当前期数销售截止时间
        nowover_time:'',  // 当前期数封盘时间
        next_pcode:'',  // 下一期数
        now_pcode:0,  // 当前期数
        previous_pcode:'',//上一期期数
        winNumber:'',    //上期开奖号
        lastTermStatic:'',  //上期开奖数据统计
        sys_time :'',  // 当前系统时间
        now_day:'',  // 当前日期
        balanceData:{},
        entertainStatus:false,
        betSelectedList:[],   //用户选中的注数
        // playTreeList:[], //玩法树
        lotteryID: 12 ,
        allLottery:{} ,
        gameHref:{} ,
        kinds:['两面', '1-5球', '前中后'],

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
    this.initViewHeight() ;
    setTimeout(() => {
        this.timerBegin();
    }, 500) ;

  },
  computed:{
    doubleSideList:function(){
        return this.getListByParentID(21000); 
    },
    oneToFiveList:function(){
        return this.getListByParentID(22000); 
    },
    frontCenterBackList:function(){
        return this.getListByParentID(23000);
    },
  },
  methods:{
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
    #so-item0 ul li > div > div p, #so-item0.jc115 ul li ul li > div > div p {
        display: block;
    }
</style>
