<template>
    <div id="pa_con">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;">
                </a>
            </div>
            <h2 class="center lottery_name"> 往期开奖</h2>
        </header>

        <div id="pa_content" class="content lobby_past_view">
            <div id="betting_record" class="tab_container tabBox">
                <ul class="tab_content">
                    <li class="past_view" v-for="(list,index) in pastView">
                        <ul class="panel">
                            <li class="prod cqssc" >
                                <div class="play_th">
                                    <div class="prd_num"><i class="prd"></i><span>{{list.lotteryName}}</span></div>
                                    <div class="prd_num02">第{{(list.lotteryId == '8' || list.lotteryId == '108')?list.issueAlias :list.pcode}}期</div>
                                   <!-- <div class="time timerset" :data-time=" (format(formatTimeUnlix(list.endTime)).getTime() - format(formatTimeUnlix(sys_time)).getTime()) / 1000 ">-->
                                    <div class="time timerset endtime" :data-time="0" v-if="(list.endTime > sys_time)">
                                       <!-- {{ (format(formatTimeUnlix(list.endTime)).getTime() - format(formatTimeUnlix(sys_time)).getTime()) / 1000 }}-->
                                        <!--{{setTimerAction(list.endTime,sys_time) }}-->
                                        {{ formatTime((format(formatTimeUnlix(list.endTime,0)).getTime() - format(formatTimeUnlix(sys_time),0).getTime())/1000 ,0)}}
                                    </div>
                                    <div class="time timerset nextendtime"  v-else>
                                        {{ formatTime((format(formatTimeUnlix(list.nextEndTime,0)).getTime() - format(formatTimeUnlix(sys_time),0).getTime())/1000 ,0)}}
                                    </div>
                                </div>
                                <!--  北京pk10  秒速赛车 江苏快3 -->
                                <ul :class="ulclass[list.lotteryId]" v-if="(list.lotteryId == '8') || (list.lotteryId == '108') || (list.lotteryId == '6') || (list.lotteryId == '106') || (list.lotteryId == '20') || (list.lotteryId == '22')">
                                    <li v-for="listnum in list.winNumber.split(',')" >
                                       <!-- <span class="pk10_ball small_ball" :class="'num_'+listnum"></span>-->
                                        <span :class="[spanclass[list.lotteryId],'num_'+listnum]"></span>
                                    </li>
                                </ul>

                                <ul class="lo_ball" v-else>
                                    <li v-for="listnum in list.winNumber.split(',')">{{listnum}}</li>
                                </ul>

                                <div class="function_btn">
                                    <router-link class="bell btn btn_outline" to="publicTemplate/pastView" @click.native="setActionToView(list.lotteryId,gameName[list.lotteryId])"><i></i>往期开奖</router-link>
                                   <!-- <a class="bell btn btn_outline" href="publicTemplate/pastView" @click="setActionToView(list.lotteryId,gameName[list.lotteryId])"><i></i>往期开奖</a>-->
                                    <router-link class="check btn btn_blue" :to="'/'+gameHref[list.lotteryId]"><i></i>立即投注</router-link>
                                </div>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>

        <FooterNav />

        <div class="so-shade"></div>
        <AutoCloseDialog ref="autoCloseDialog" text=" " type="" />

    </div>
</template>



<script>
// import $ from "jquery";
import Mixin from '@/Mixin'
import FooterNav from '@/components/Footer'
import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'

export default {
  name: 'Index',
  mixins:[Mixin],
  components: {
      FooterNav,
      AutoCloseDialog,
 },
    data :function() {
        return {
            haslogin:false ,
            hasaction:false , // 阻止重复提交
            gametimerInt:'' ,
            now_time:'',  // 当前期数销售截止时间
            sys_time :'',  // 当前系统时间
            pastView:{} ,
           // pastViewArray :{} ,
            cssid :{'8':'pk10','108':'pk10','6':'k3','106':'k3'} ,
            ulclass :{'8':'pk10_top_number','108':'pk10_top_number','6':'k3dice_top','106':'k3dice_top','20':'k3dice_top','22':'k3dice_top'} ,
            spanclass :{'8':'pk10_ball small_ball','108':'pk10_ball small_ball','6':'k3_dice','106':'k3_dice','20':'k3_dice','22':'k3_dice'} ,
            gameHref : {
                "2":"cqssc",
                "12":"cqssc/tianJinIndex",
                "14":"cqssc/xinJiangIndex",
                "102":"cqssc/SecondSsc",
                "4":"jc11x5",     //江西11选5
                "18":"jc11x5/sd11x5Index",  //山东11选5
                "104":"jc11x5/MiaoSuIndex",  // 秒速11选5
                "16":"jc11x5/gd11x5Index",  //广东11选5
                "8":"pk10",
                "108":"SecondPk10",  // 秒速 赛车
                "6":"k3/",  //江苏快3
                "20":"k3/anHuiK3Index",
                "22":"k3/huBeiK3Index",
                "106":"k3/MiaoSuIndex",  // 秒速k3

            }, // 对应彩种的id
            gameName : {
                "2":"重庆时时彩",
                "12":"天津时时彩",
                "14":"新疆时时彩",
                "102":"秒速时时彩",
                "4":"江西11选5",     //江西11选5
                "18":"山东11选5",  //山东11选5
                "16":"广东11选5",  //广东11选5
                "104":"秒速11选5",  //秒速11选5
                "8":"北京PK10",
                "108":"秒速赛车",
                "6":"江苏快3",  // 江苏快3
                "20":"安徽快3",
                "22":"湖北快3",
                "106":"秒速快3",

            }, // 对应彩种的名称

        }
    },
    beforeDestroy:function(){
      clearInterval(this.gametimerInt) ;
   },
    created:function () {
        var _self = this ;
        _self.haslogin = this.ifLogined() ;
        if( !_self.haslogin){
            _self.$router.push('/login')  ;
        }
    },
  mounted:function() {
      var _self = this ;
      $('html,body').css('overflow-y','scroll' )  ;
      document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部

      _self.lobbytimerBegin();
      setTimeout(function(){
          _self.gameTimer() ;
      },200)

  },
  methods:{
      /*
       * 跳转往期开奖处理
       *  */
      setActionToView:function (lotteryid,name) {
          this.setCookie('lt_lotteryid',lotteryid) ; // 彩种 id 设置
          this.setCookie('lottery_name',name) ;
      },

      /*
      * 近期开奖数据，近期开奖页面
      * */
    doubleCount:function (maxtime) {
        var _self = this ;
        var senddata ={
            sideType: '2' , // 1官彩，2双面彩
            maxUpdateTime: maxtime , // 最近修改时间，如果近期时间内没修改则不返回数据
        }
        $.ajax({
            type: 'get',
            headers: {
                'Authorization': 'bearer  ' + this.getAccessToken ,
                // 'sourceType':'2', // 1是pc端，2是h5
                // 'sideType':'1',  // 1是传统盘，2是双面盘
            },
            url: this.action.forseti + 'api/priodDataNewlys',
            timeout: 600000,
            data: senddata ,
            success: (data) => {
                for(var i=0;i<data.data.length;i++){
                    if(!data.data[i].winNumber || data.data[i].winNumber==''){
                        switch (data.data[i].lotteryId){
                            case '8': // 北京pk10
                            case '108': // 秒速赛车
                                data.data[i].winNumber ='20,20,20,20,20,20,20,20,20,20' ;
                                break;
                            case '6' :   // 江苏K3
                            case '20' :  // 安徽K3
                            case '22' :  // 湖北K3
                            case '106' :  // 秒速k3
                                data.data[i].winNumber ='20,20,20' ;
                                break;
                            default  :
                                data.data[i].winNumber='-,-,-,-,-' ;
                                break ;
                        }
                    }
                    if(data.data[i].endTime > this.sys_time){ // 如果当前期结束时间大于系统时间
                        console.log('结束时间大')
                        $('.timerset').eq(i).attr('data-time',(this.format(this.formatTimeUnlix(data.data[i].endTime,0)).getTime() - this.format(this.formatTimeUnlix(this.sys_time,0)).getTime()) / 1000) ;
                    }else{
                        console.log('结束时间小')
                        $('.timerset').eq(i).attr('data-time',(this.format(this.formatTimeUnlix(data.data[i].nextEndTime,0)).getTime() - this.format(this.formatTimeUnlix(this.sys_time,0)).getTime()) / 1000) ;
                    }

                }

                this.pastView = data.data ;

            },
            error: function (e) {  // 错误提示
                _self.errorAction(e) ;
            }
        });
    },

      lobbytimerBegin:function(){
          var _self = this;
          if(_self.hasaction){
              return false ;
          }
          _self.hasaction = true ;
          _self.getSystemTime('0').then(sys_time=>{
              _self.sys_time = sys_time ;
              _self.doubleCount('') ;
              setTimeout(function () {
                  _self.hasaction = false ;
              },1000)
          });


      },

 // 定时器，倒计时处理
      gameTimer:function () {
              //倒计时定时器
              var that = this ;
              this.gametimerInt = window.setInterval(function() {
                  var $obj_nav_span = $(".timerset");
                  for (var i = 0; i < $obj_nav_span.length; i++) {
                      var _times = "";
                      if ($obj_nav_span.eq(i).html() == "") {
                          $obj_nav_span.eq(i).html($obj_nav_span.eq(i).attr("data-time"));
                      }
                      if (parseInt(that.formatTime($obj_nav_span.eq(i).html(), 1)) > 0) {
                          _times = parseInt(that.formatTime($obj_nav_span.eq(i).html(), 1)) - 1;
                      } else { // 当前倒计时结束
                          that.lobbytimerBegin() ;
                         _times = $obj_nav_span.eq(i).attr("data-time");

                      }
                      $obj_nav_span.eq(i).html(that.formatTime(_times, 0));
                  }
              }, 1000);

      },

  }

}
</script>
<style scoped>
    .play_th .prd_num{ width: 4.5rem; }
    #pa_content.lobby_past_view .play_th .prd_num > i {
        margin-left: -0.3rem;
    }
</style>
