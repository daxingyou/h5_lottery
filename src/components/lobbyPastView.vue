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
                    <li class="past_view">
                        <ul class="panel">
                            <li class="prod cqssc" v-for="(list,index) in pastView">
                                <div class="play_th">
                                    <div class="prd_num"><i class="prd"></i><span>{{list.lotteryName}}</span></div>
                                    <div class="prd_num02">第{{list.pcode}}期</div>
                                    <div class="time">{{timeStr}}</div>
                                </div>


                                <ul class="pk10_top_number" v-if="list.lotteryId == '8'">  <!--  北京pk10 -->
                                    <li v-for="listnum in list.winNumber.split(',')" >
                                        <span class="pk10_ball small_ball" :class="'num_'+listnum"></span>
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
import Mixin from '@/Mixin'
import FooterNav from '@/components/Footer'
 // import CountdownTimer from '@/components/publicTemplate/CountdownTimer'
export default {
  name: 'Index',
  mixins:[Mixin],
  components: {
      FooterNav
  //  CountdownTimer,
 },
    data :function() {
        return {
            now_time:'',  // 当前期数销售截止时间
            now_pcode:0,  // 当前期数
            sys_time :'',  // 当前系统时间
            lt_time_leave :'' , // 倒计时秒数
            timeStr :'' , // 倒计时秒数
           // oDate :'' , // 倒计时秒数
            pastView:{} ,
            pastViewArray :{} ,
            cssid :{'8':'pk10'} ,
            gameHref : {"1":"c_cqssc","2":"cqssc","3":"jxsyxw","4":"jc11x5","8":"pk10","12":"tjssc","14":"xjssc","18":"jc11x5/sd11x5Index", "16":"jc11x5/gd11x5Index" }, // 对应彩种的id

        }
    },
  mounted:function() {
    $('html,body').css('overflow-y','scroll' )  ;

   /*  setTimeout(() => {*/
          this.lobbytimerBegin();
    /*  }, 500) ;*/


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
               // var str ='';
                for(var i=0;i<data.data.length;i++){
                    if(!data.data[i].winNumber || data.data[i].winNumber==''){
                        switch (data.data[i].lotteryId){
                            case '8': // 北京pk10
                                data.data[i].winNumber ='20,20,20,20,20,20,20,20,20,20' ;
                                break;
                            default  :
                                data.data[i].winNumber='-,-,-,-,-' ;
                                break ;
                        }
                    }
                 /*   setTimeout(function () {
                        console.log(this.formatTimeUnlix(data.data[2].endTime)+'打发时间')
                        this.lt_timer(this.sys_time,this.formatTimeUnlix(data.data[2].endTime) ) ;
                    },100)*/

                }
this.pastViewArray = data.data ;



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
              this.doubleCount('') ;
             // console.log(that.sys_time)
          });

      },

      //倒计时处理
  lt_timer:function(start,end) { // start服务器开始时间，end当前期开奖结束时间, num 定时器数量

    if (start == '' || end == '') {
        this.lt_time_leave = 0;
    } else {
        this.lt_time_leave = (this.format(end).getTime() - this.format(start).getTime()) / 1000;//总秒数
    }

    var timerno = window.setInterval(function () {
        console.log( this.lt_time_leave )
       /* if( (lt_time_leave >=420 && lt_time_leave <=540 && lt_time_leave % 10 ==0) || (lt_time_leave >=120 && lt_time_leave <=240 && lt_time_leave % 10 ==0 )){ // 10,秒一次请求开奖数据
            var hasnum = Number($('.last-open-num li:nth-child(1)').data('val')) ; // 判断是否已经拉取期数成功
            if((hasnum >= 0) && (hasnum <20)){

            }else{
                priodDataNewly(getCookie('lt_lotteryid'),'timer') ;
            }
        }*/
        if (this.lt_time_leave <= 0) { // 开奖倒计时结束
            clearInterval(timerno);
           // outTimeSet() ;
            console.log('停止当前期数');
        }

       var oDate = this.diff(this.lt_time_leave--);
        // 开奖倒计时
       this.timeStr = this.fftime(oDate.minute) + ':' + this.fftime(oDate.second);
      //  $('.open-time').html( this.fftime(oDate.minute) + ':' + this.fftime(oDate.second) );

    }, 1000);
},
/*  diff :function(t) {  //根据时间差返回相隔时间
          return t > 0 ? {
              day: Math.floor(t / 86400),
              hour: Math.floor(t % 86400 / 3600),
              minute: Math.floor(t % 3600 / 60),
              second: Math.floor(t % 60)
          } : {day: 0, hour: 0, minute: 0, second: 0};
      },*/

  }

}
</script>
<style scoped>

</style>
