<template>
    <div class="so-con">
        <!--left siderbar  -->
        <!--用户导航 so-left -->
        <UserNavigation el=".so-menu" ref="navone"/>
        <!--right menu  -->
        <UserMenu el=".so-top-zoushi" @play="$refs.playDialog.open()" :payoff="balanceData.payoff" />
        
        <div class="so-index" >
            <div class="so-top-all">
                <div class="so-in-top">
                    <ul>
                        <li class="so-menu">
                            <img src="/static/white/images/top/icon-menu.png" class="so-top-menu">
                        </li>
                        <li class="left_top_logo">
                            {{moduleName || '江西11选5'}}
                        </li>
                        <li class="purse">
                            <img src="/static/white/images/top/sjinbi.png" class="so-top-sum">
                            <div class="so-in-top-sum">
                                {{ fortMoney(roundAmt(balanceData.balance), 2)}}
                            </div>
                        </li>
                        <li class="so-top-zoushi">
                            <img src="/static/white/images/top/zoushi.png">
                        </li>
                    </ul>
                </div>
                <div class="so-in-main">
                    <div>
                        <div class="so-main-top">
                            <HistoryTerm :previous_pcode="previous_pcode" />

                            <div class="so-m-t-right" v-show="ishwowpriod">
                                <div class="last-open-num">
                                    <ul>
                                        <li v-for="item in winNumber.split(',')">{{item}}</li>
                                    </ul>
                                </div>
                                <div class="last-open-dou">
                                    <ul>
                                        <li>{{lastTermStatic.total}}</li>
                                        <li>{{lastTermStatic.sizer}}</li>
                                        <li>{{lastTermStatic.doubler}}</li>
                                        <li>{{lastTermStatic.sizerEnd}}</li>
                                        <li>{{lastTermStatic.longer}}</li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!--
                        计数器插件
                            事件
                                @countdownOver="playLottery"    倒计时结束时
                                @entertainCountdownOver="entertain"     封盘倒计时结束时
                                @spanArrived="lotteryDataFetch"     倒计时达到预定时间间隔时
                            属性
                                :now_pcode="now_pcode"
                                :lotteryID="lotteryID"
                                :start="sys_time" :end="now_time" :overend="nowover_time"
                        -->
                        <CountdownTimer ref="countdownTimer"
                            @countdownOver="playLottery"
                            @entertainCountdownOver="entertain"
                            @spanArrived="lotteryDataFetch"
                            @visibility="timerBegin"
                            :now_pcode="now_pcode" :lotteryID="lotteryID"
                            :start="sys_time" :end="now_time" :overend="nowover_time" />

                    </div>
                </div>
            </div>
            <div class="so-in-con">
                    <div class="so-con-left " id="nav-wrapper">
                        <ul>
                            <li :data-type="(index==2?'lineplay':'nomalplay')" :class="(index == 0 && 'active') + (index==2 ? ' reset_bet' : '')" v-for="(kind,index) in kinds" @click="switchTab">
                                <a :href="'#so-item'+index">{{kind}}</a>
                            </li>

                        </ul>
                    </div>
                <div class="bule_bg" > </div>
                <div  id="content-wrapper">
                    <div class="so-con-right " >  <!-- bule_bg -->
                         <div id="scroller"  class="scroller" >
                           <div class="content-all">
                              <!--以下为盘面不同样式，根据ID+class区分-->
                               <!-- jc115 双面 -->
                               <div id="so-item0" class="active jc115 item_one" >
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
                                   <div class="bottom-item0"></div>
                               </div>
                               <!-- jc115 1-5球 -->
                               <div id="so-item1" class="jc115"  >
                                   <ul>
                                       <li class="select-li" v-for="item in oneToFiveList">
                                           <div>
                                               <h2>
                                                   {{item.name}}
                                               </h2>
                                               <div>
                                                   <p :data-id="itemChild.cid" v-for="itemChild in item.childrens">
                                                       <span @click="OFSelect($event, itemChild, item)">{{itemChild.name}}</span>
                                                       <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                                   </p>
                                               </div>
                                           </div>
                                       </li>


                                   </ul>
                               </div>
                               <!-- jc115 连码 -->
                               <div id="so-item2" class="jc115 tab_container tabBox"  >
                                   <div class="bd">
                                       <ul :class="'tab_content tab_content_'+ (index+1) + (index==0 ? ' show' : '')" v-for="(kind,index) in continuedNumberList">
                                           <li class="select-li">
                                               <div>
                                                   <h2>{{kind.name}}</h2>
                                                   <div>
                                                       <BallItem :key="index" v-for="(subItem,index) in continueNumberSubList"
                                                                 :model="{ cid:kind.childrens[0].cid, name:++subItem, oddsData:{payoff:kind.childrens[0].oddsData.payoff}, parentItem:kind }"
                                                                 @selected="continueNumberSelect"
                                                                 @unSelected="continueNumberUnSelect"
                                                       />

                                                   </div>
                                               </div>
                                           </li>
                                       </ul>

                                   </div>
                               </div>
                           </div>
                        </div>
                   </div>
                </div>
                <div class="hd jx11_tab" >
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
                :playType="playType"    normal标准；combine连码；grouped组选
                --:isCombine="isCombine"  是否组合玩法
                :combineCount="combineCount"    组合玩法对应的注数
                --:isGrouped="isGrouped"          是否是前2 或 前3组选
                :balance="balanceData.balance"  帐单值
                :now_pcode="now_pcode"   期次
                :next_pcode="next_pcode"   下期期次
                :now_day="now_day"    日期
            事件
                @betSuccess="resetAction" 

                :isCombine="isCombine" :isGrouped="isGrouped"
        -->
        <Bet :lotteryID="lotteryID" @betSuccess="resetAction('1')" ref="bet"
            :betSelectedList="betSelectedList"
            :parentRefs="$refs"
            :playType="playType"
            :combineCount="combineCount" 
            
            :balance="balanceData.balance" :now_pcode="now_pcode" :next_pcode="next_pcode" :now_day="now_day" />

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
                type  对话框类型，可以是 static/white/images/pop/ 目录下任意图片，像title_quantity、title_tip
            方法
                open(text, type)
        -->
        <AutoCloseDialog ref="autoCloseDialog" text="您的余额不足" type="" />

        <BetSuccessfulDialog ref="betSuccessfulDialog" />

        <!--玩法说明-->
        <PlayDialog ref="playDialog" :moduleName="moduleName" :moduleplay="moduleplay" />
  </div>


</template>



<script>
    // import $ from "jquery";
    import UserNavigation from '@/whitecomponents/publicTemplate/UserNavigation'
    import UserMenu from '@/whitecomponents/publicTemplate/UserMenu'
    import InfoDialog from '@/whitecomponents/publicTemplate/InfoDialog'
    import AutoCloseDialog from '@/whitecomponents/publicTemplate/AutoCloseDialog'
    import BetSuccessfulDialog from '@/whitecomponents/publicTemplate/BetSuccessfulDialog'
    import CountdownTimer from '@/whitecomponents/publicTemplate/CountdownTimer'
    import HistoryTerm from '@/whitecomponents/publicTemplate/HistoryTerm'

    import BallItem from '@/whitecomponents/publicTemplate/BallItem'
    import Bet from '@/whitecomponents/publicTemplate/Bet'
    import PlayDialog from '@/whitecomponents/jc11x5/PlayDialog'
    import Mixin from '@/Mixin'

    export default {
      name: 'jc11x5Index',
      mixins:[Mixin],
      components: {
        HistoryTerm,
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
      props:['moduleName', 'moduleLotteryID','moduleplay'],
      data: function() {
        return {
            now_pcode:0,  // 当前期数
            previous_pcode:'',//上一期期数
            winNumber:'',    //上期开奖号
            lastTermStatic:'',  //上期开奖数据统计
            entertainStatus:false,
            notopen:false,
            ishwowpriod :false,
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
            playType:'normal', 
            lasttyple:'nomalplay', // 上次的玩法类型
            // isCombine:false, //是否组合玩法
            // isGrouped:false, //是否是前2或前3组选
            combineCount:0, //组合玩法注数
            kinds:['两面', '1-5球', '连码'],
           // continueNumberSubList:[...Array(11).keys()],
            continueNumberSubList: Array.from({length:11}, (v,k) => k) ,
            selectRules:{
                '42600':{ max:1}, 
                '43100':{ max:2}, 
                '43200':{ max:3}, 
                '43300':{ max:4}, 
                '43400':{ max:5}, 
                '43500':{ max:6}, 
                '43600':{ max:7}, 
                '43700':{ max:8}, 
                '43800':{
                    max:5, fun:function(xslen){
                        return  parseInt(xslen*((xslen-1)/2));
                    }
                }, 
                '43900':{
                    max:5, fun:function(xslen){
                        return  parseInt(xslen*((xslen-1))*(xslen-2)/6)
                    }
                }, 
            }
        }
      },
      created:function(){

        if (this.moduleLotteryID) {
            this.lotteryID = this.moduleLotteryID;
        } 
        this.getMemberBalance(this.lotteryID).then(()=>{

        });
          this.loadPlayTree(this.lotteryID);  // 玩法树，彩种id 为2

      },
        mounted:function() {
            var lotteryid = this.lotteryID ; // 彩种id
            var lotteryname = this.moduleName || '江西11选5' ; // 彩种名称
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

            betCountStat:function(xslen, xlen){
                return  xslen*((xslen-1)/xlen);
            },
            subTabChange:function(e, kind,index){
                var $src = $(e.currentTarget);
                $src.addClass('on').siblings().removeClass('on');
                $src.closest('.so-in-con').find('.bd ul').eq(index).addClass('show')
                    .siblings().removeClass('show');
                //清除选中的球
                this.betSelectedList = [];
                this.combineCount = 0;
                if ([43800, 43900].includes(kind.cid)){
                    this.playType = 'grouped'   //设置为组选玩法
                }else{
                    this.playType = 'combine'   //设置为普通连码玩法
                }
                $('.bd ul li p').removeClass('active');
            },
            switchTab:function(e){
                var _self = this ;
                const $src = $(e.currentTarget);
                const index = $src.index();
                const $tabs = $('.so-con-right .jc115');
                $tabs.hide();
                $tabs.eq(index).show();
               if(index=='2'){
                   $('.jx11_tab').show()
               }else {
                   $('.jx11_tab').hide()
               }
                $src.addClass('active').siblings().removeClass('active');
                if( this.lasttyple !=$src.data('type') ){
                    this.betSelectedList = [];
                }
                var conth = $tabs.eq(index).height()-300 ;
//                console.log(conth) ;
                $('.so-con-right').css('height',conth+'px') ;
                //  _self.setScroll() ;
               _self.conScroll.refresh() ;

               // console.log($src.data('type'))
                //清除选中的球
                if ($src.prop('class').indexOf('reset_bet')>=0){
                    $('#so-item0 ul li p, #so-item1 ul li p').removeClass('active');
                    this.playType = 'combine';  //设置为连码玩法
                }else{
                    $('#so-item2 ul li p').removeClass('active');
                    this.playType = 'normal';   //设置为普通玩法
                }
                this.lasttyple = $src.data('type') ;

                this.isGrouped = false; //取消组选
            },
            getListByParentID:function(parentID){
                return this.playTreeList.filter((item,i)=>{
                    return item.parentId == parentID;
                });
            },
            //开奖倒计时结束后处理
            playLottery:function(){
               // this.$refs.infoDialog.open('请至下期继续投注', 'title_end') ;
                this.timerBegin();
            },
            //封盘倒计时结束后处理
            entertain:function(){
                this.$refs.infoDialog.open('请至下期继续投注', 'title_end') ;
                this.entertainStatus = true;
                this.resetAction();
            },
            //获取开奖更据
            lotteryDataFetch:function(){
                const that = this;
                return new Promise((resolve)=>{
                    that.getSystemTime().then(sys_time=>{
                        // sys_time = '2017-10-30 19:39:10';    //5秒后封盘所需时间，然后5秒后开奖
                        // sys_time = '2017-10-30 19:39:16';   //封盘状态所需时间，5秒后开奖 
                        that.sys_time = that.formatTimeUnlix(sys_time) ;
                        that.priodDataNewly(that.lotteryID, sys_time).then(res=>{
                            that.ishwowpriod = true ;
                            that.next_pcode = res.data[0].pcode;  // 下期期数
                            let code = res.data[2].winNumber;
                            var firstpcode = res.data[0].pcode.toString().substr(8, 11) ;
                            if(firstpcode =='001'){  //  白天第一期
                                if(res.data[1].endTime - sys_time >0) { // 凌晨最后一期未结束
                                    that.now_pcode = res.data[1].pcode;  // 当前期数
                                    // 当前期数时间
                                    that.now_time = that.formatTimeUnlix(res.data[1].endTime);
                                    // 当前期封盘时间
                                    that.nowover_time = that.formatTimeUnlix(res.data[1].prizeCloseTime);
                                    that.winNumber = res.data[2].winNumber;
                                    that.lastTermStatic = res.data[2].doubleData;    //上期开奖统计
                                    that.previous_pcode = res.data[2].pcode;  // 上期期数
                                }else {
                                    if( res.data[0].startTime - sys_time >0){  // 未开盘状态
                                        that.notopen = true ;
                                    }else{
                                        that.notopen = false ;
                                    }
                                    that.now_pcode = res.data[0].pcode;  // 当前期数
                                    // 当前期数时间
                                    that.now_time = that.formatTimeUnlix(res.data[0].endTime);
                                    // 当前期封盘时间
                                    that.nowover_time = that.formatTimeUnlix(res.data[0].prizeCloseTime);
                                    that.winNumber = res.data[1].winNumber;
                                    that.lastTermStatic = res.data[1].doubleData;    //上期开奖统计
                                    that.previous_pcode = res.data[1].pcode;  // 上期期数
                                }

                            }else{
                                that.now_pcode = res.data[1].pcode;  // 当前期数
                                // 当前期数时间
                                that.now_time = that.formatTimeUnlix(res.data[1].endTime);
                                // 当前期封盘时间
                                that.nowover_time = that.formatTimeUnlix(res.data[1].prizeCloseTime);
                                //code 上期开奖号码
                                if (!code) {
                                    // code = '-,-,-,-,-';
                                    that.winNumber = res.data[3].winNumber;
                                    that.lastTermStatic = res.data[3].doubleData;    //上期开奖统计
                                    that.previous_pcode = res.data[3].pcode;  // 上期期数
                                }else{
                                    that.winNumber = res.data[2].winNumber;
                                    that.lastTermStatic = res.data[2].doubleData;    //上期开奖统计
                                    that.previous_pcode = res.data[2].pcode;  // 上期期数
                                }
                            }
                            if(res.data[1].status >1){ // 异常情况，如提前开盘 2
                                that.entertainStatus = true;
                            }

                            // 当天日期
                            that.now_day = ( res.data[1].pcode).toString().substr(0, 8);

                            resolve();
                        });
                    }); 
                })
                
            },
            timerBegin:function(){
                var that = this;
                this.lotteryDataFetch().then(()=>{
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
            combineCountCaculate:function(item){
                const rule = this.selectRules[item.parentItem.cid];
                if (rule){
                    if (rule.fun){
                        this.combineCount = rule.fun(this.betSelectedList.length);
                    }else{
                        if (this.betSelectedList.length == rule.max){
                            this.combineCount = 1;  //用户点击足够多的球后，设置组合玩法注数为1
                        }else{
                            this.combineCount = 0;
                        }
                    }
                    
                }
            },
            //当用户选择球时（连码），保存相应数据
            continueNumberSelect:function(e, item, callback){
                if (this.entertainStatus || this.notopen){  // 封盘时，不能选择
                    return false;
                }else{
                    const rule = this.selectRules[item.parentItem.cid];
                    const max = rule.max;
                    if (this.betSelectedList.length < max){
                        this.betSelectedList.push(item);
                    }else{
                        callback(false);
                        // 请选择1个选项
                        this.$refs.infoDialog.open('请选择'+max+'个选项', 'title_quantity');
                    }
                    this.combineCountCaculate(item);
                }

                
            },
            //当用户取消选择球时（连码），保存相应数据
            continueNumberUnSelect:function(e, item, parentItem){
                const rule = this.selectRules[item.parentItem.cid];
                this.betSelectedList = this.betSelectedList.filter((selected)=>{ return selected.name != item.name; });
                if (this.betSelectedList.length == rule.max){
                    this.combineCount = 1;  //用户点击足够多的球后，设置组合玩法注数为1
                }else{
                    this.combineCount = 0;
                }
                this.combineCountCaculate(item);
            },
            //当用户选择球时（普通），保存相应数据
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
              //用户选择1-5球时，保存相应数据
            OFSelect:function(e, item, parentItem){
                  if (this.entertainStatus || this.notopen){
                      return false;
                  }
                  var $src = $(e.currentTarget);
                  if ($src.parent('p').prop('class').indexOf('active') < 0){
                      $src.parent('p').addClass('active');
                      item.parentItem = parentItem;
                      this.betSelectedList.push(item);
                  }else{
                      $src.parent('p').removeClass('active');
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
    .content-all .tab_container{
       margin-top: 1.4rem;
   }
    #so-item0 ul li > div > div p, #so-item0.jc115 ul li ul li > div > div p {
        display: block;
    }
    #so-item1.jc115 ul li > div > div p {
        display: block;
    }
   /* #wrapper{
      !*  z-index: 1; touch-action: none;*!
        top: 0;
        bottom: 20px;
        left: 0;
        width: 100%;
        position: absolute;
    }*/

   /* #wrapper { position:absolute;top:0 ; bottom: 0 ;left:0;width:100%}*/

   #so-item1,#so-item2 { display: none ;}
</style>
