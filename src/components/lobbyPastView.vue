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
                                    <div class="prd_num02">第{{list.pcode}}期</div>
                                   <!-- <div class="time timerset" :data-time=" (format(formatTimeUnlix(list.endTime)).getTime() - format(formatTimeUnlix(sys_time)).getTime()) / 1000 ">-->
                                    <div class="time timerset" >
                                       <!-- {{ (format(formatTimeUnlix(list.endTime)).getTime() - format(formatTimeUnlix(sys_time)).getTime()) / 1000 }}-->
                                        {{ formatTime((format(formatTimeUnlix(list.endTime)).getTime() - format(formatTimeUnlix(sys_time)).getTime())/1000 ,0) }}
                                    </div>

                                </div>


                                <ul class="pk10_top_number" v-if="list.lotteryId == '8'">  <!--  北京pk10 -->
                                    <li v-for="listnum in list.winNumber.split(',')" >
                                        <span class="pk10_ball small_ball" :class="'num_'+listnum"></span>
                                    </li>
                                </ul>
                                <ul class="k3dice_top" v-else-if="list.lotteryId == '6'">  <!--  江蘇快3 -->
                                    <li v-for="listnum in list.winNumber.split(',')" >
                                        <span class="k3_dice" :class="'num_'+listnum"></span>
                                    </li>
                                </ul>
                                <ul class="lo_ball" v-else>
                                    <li v-for="listnum in list.winNumber.split(',')">{{listnum}}</li>
                                </ul>



                                <div class="function_btn">
                                    <a class="bell btn btn_outline" href="javascript:;"><i></i>往期开奖</a>
                                    <a class="check btn btn_blue" :href="'/'+gameHref[list.lotteryId]"><i></i>立即投注</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                  <!--  <li class="past_view">
                        <ul class="panel">
                            <li class="prod pk10">
                                <div class="play_th">
                                    <div class="prd_num"><i class="prd"></i><span>北京PK10</span></div>
                                    <div class="prd_num02">第20170914057期</div>
                                    <div class="time">00:00:00</div>
                                </div>
                                <ul class="pk10_top_number">
                                    <li><span class="pk10_ball small_ball num_10"></span></li>
                                    <li><span class="pk10_ball small_ball num_2"></span></li>
                                    <li><span class="pk10_ball small_ball num_1"></span></li>
                                    <li><span class="pk10_ball small_ball num_9"></span></li>
                                    <li><span class="pk10_ball small_ball num_3"></span></li>
                                    <li><span class="pk10_ball small_ball num_4"></span></li>
                                    <li><span class="pk10_ball small_ball num_8"></span></li>
                                    <li><span class="pk10_ball small_ball num_7"></span></li>
                                    <li><span class="pk10_ball small_ball num_5"></span></li>
                                    <li><span class="pk10_ball small_ball num_6"></span></li>
                                </ul>
                                <div class="function_btn">
                                    <a class="bell btn btn_outline" href="javascript:;"><i></i>往期开奖</a>
                                    <a class="check btn btn_blue" href="javascript:;"><i></i>立即投注</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li class="past_view">
                        <ul class="panel">
                            <li class="prod hksixlo">
                                <div class="play_th">
                                    <div class="prd_num"><i class="prd"></i><span>香港六合彩</span></div>
                                    <div class="prd_num02">第20170914057期</div>
                                    <div class="time">00:00:00</div>
                                </div>
                                <ul class="lo_ball sixball">
                                    <li>06</li>
                                    <li>07</li>
                                    <li>03</li>
                                    <li>05</li>
                                    <li>02</li>
                                    <li>01</li>
                                    <li>45</li>
                                </ul>
                                <div class="function_btn">
                                    <a class="bell btn btn_outline" href="javascript:;"><i></i>往期开奖</a>
                                    <a class="check btn btn_blue" href="javascript:;"><i></i>立即投注</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li class="past_view">
                        <ul class="panel">
                            <li class="prod jc11x5">
                                <div class="play_th">
                                    <div class="prd_num"><i class="prd"></i><span>江西11选5</span></div>
                                    <div class="prd_num02">第20170914057期</div>
                                    <div class="time">00:00:00</div>
                                </div>
                                <ul class="lo_ball">
                                    <li>06</li>
                                    <li>07</li>
                                    <li>03</li>
                                    <li>05</li>
                                    <li>02</li>
                                </ul>
                                <div class="function_btn">
                                    <a class="bell btn btn_outline" href="javascript:;"><i></i>往期开奖</a>
                                    <a class="check btn btn_blue" href="javascript:;"><i></i>立即投注</a>
                                </div>
                            </li>
                        </ul>
                    </li>-->
                </ul>
            </div>
        </div>

        <FooterNav />

        <div class="so-shade"></div>


    </div>
</template>



<script>
import $ from "jquery";
import Mixin from '@/Mixin'
import FooterNav from '@/components/Footer'

export default {
  name: 'Index',
  mixins:[Mixin],
  components: {
      FooterNav
  //  CountdownTimer,
 },
    data :function() {
        return {
            gametimerInt:'' ,
            now_time:'',  // 当前期数销售截止时间
            sys_time :'',  // 当前系统时间
            pastView:{} ,
           // pastViewArray :{} ,
            cssid :{'8':'pk10'} ,
            cssid :{'6':'k3'} ,
            gameHref : {"1":"c_cqssc","2":"cqssc","3":"jxsyxw","4":"jc11x5","6":"jsks","8":"pk10","12":"tjssc","14":"xjssc","18":"jc11x5/sd11x5Index", "16":"jc11x5/gd11x5Index" }, // 对应彩种的id

        }
    },
  mounted:function() {
      var that = this ;
     $('html,body').css('overflow-y','scroll' )  ;
      that.lobbytimerBegin();

      setTimeout(function(){
          that.gameTimer() ;

      },200)

  },
  methods:{
    /*
    * 近期开奖数据，近期开奖页面
    * */
    doubleCount:function (maxtime) {
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
             // console.log(data.data) ;
                for(var i=0;i<data.data.length;i++){
                    if(!data.data[i].winNumber || data.data[i].winNumber==''){
                        switch (data.data[i].lotteryId){
                            case '8': // 北京pk10
                                data.data[i].winNumber ='20,20,20,20,20,20,20,20,20,20' ;
                                break;
                            case '6' :   // 江苏K3
                            case '20' :  // 安徽K3
                            case '22' :  // 湖北K3
                                data.data[i].winNumber ='20,20,20' ;
                                break;
                            default  :
                                data.data[i].winNumber='-,-,-,-,-' ;
                                break ;
                        }
                    }
                   // clearInterval(this.gametimerInt) ;
                    $('.timerset').eq(i).attr('data-time',(this.format(this.formatTimeUnlix(data.data[i].endTime)).getTime() - this.format(this.formatTimeUnlix(this.sys_time)).getTime()) / 1000) ;
                }

                this.pastView = data.data ;

            },
            error: function (data) {  // 错误提示


            }
        });
    },

      lobbytimerBegin:function(){
          var that = this;
          that.getSystemTime().then(sys_time=>{
              that.sys_time = sys_time;
              that.doubleCount('') ;
             // console.log(that.sys_time)

          });


      },

 // 定时器，倒计时处理
      gameTimer:function () {
              //倒计时定时器
         // console.log('666等会')
              var that = this ;
              this.gametimerInt = setInterval(function() {
                  var $obj_nav_span = $(".timerset");
                  for (var i = 0; i < $obj_nav_span.length; i++) {
                      var _times = "";
                      if ($obj_nav_span.eq(i).html() == "") {
                          $obj_nav_span.eq(i).html($obj_nav_span.eq(i).attr("data-time"));
                      }
                      if (parseInt(that.formatTime($obj_nav_span.eq(i).html(), 1)) > 0) {
                          console.log('呵呵') ;
                          _times = parseInt(that.formatTime($obj_nav_span.eq(i).html(), 1)) - 1;
                      } else { // 当前倒计时结束
                          that.lobbytimerBegin() ;
                          console.log('哈哈哈') ;
                         _times = $obj_nav_span.eq(i).attr("data-time");

                      }
                      $obj_nav_span.eq(i).html(that.formatTime(_times, 0));
                  }
              }, 1000);


      },
       formatTime:function(second, type) {
        var bk;
        if (type == 0) {
            var h = parseInt(second / 3600);
            var f = parseInt(second % 3600 / 60);
            var s = parseInt(second % 60);
            bk = h + ":" + (f < 10 ? "0" + f : f) + ":" + (s < 10 ? "0" + s : s)
        } else {
            bk = second.split(":");
            bk = parseInt(bk[0] * 3600) + parseInt(bk[1] * 60) + parseInt(bk[2])
        }
    return bk
}


  }

}
</script>
<style scoped>

</style>
