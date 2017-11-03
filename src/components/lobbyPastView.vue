<template>
    <div id="pa_con">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;">
                </a>
            </div>
            <h2 class="center lottery_name"> 往期开奖</h2>
        </header>

        <!--<div id="pa_content">
            <div id="betting_record" class="tab_container tabBox">
                <div class="bd" :id="cssid[lotteryid]">
                    <ul class="tab_content double-all">
                        <li class="past_view">
                            <ul class="panel">
                                <li class="prod" data-status="not_open" v-for="(list,index) in pastView">
                                    <div class="play_th">
                                        <div class="prd_num"><i class="prd"></i><span>{{list.pcode}}</span> 期</div>
                                        <ul class="double-count" v-if="lotteryid == '8'"> &lt;!&ndash; 上面一排数据 &ndash;&gt;
                                            <li>{{list.doubleData.lh_1}}</li>
                                            <li>{{list.doubleData.lh_2}}</li>
                                            <li>{{list.doubleData.lh_3}}</li>
                                            <li>{{list.doubleData.lh_4}}</li>
                                            <li>{{list.doubleData.lh_5}}</li>
                                            <li>{{list.doubleData.top2_doubler}}</li>
                                            <li>{{list.doubleData.top2_sizer}}</li>
                                            <li>{{list.doubleData.top2_total}}</li>
                                        </ul>
                                        <ul class="double-count" v-else>
                                            <li>{{list.doubleData.doubler}}</li>
                                            <li>{{list.doubleData.longer}}</li>
                                            <li>{{list.doubleData.sizer}}</li>
                                            <li>{{list.doubleData.total}}</li>
                                        </ul>
                                    </div>
                                    <ul class="lo_ball double-numbers" v-if="lotteryid == '8'"> &lt;!&ndash; 北京pk10  &ndash;&gt;
                                        <li v-for="listnum in list.winNumber.split(',')" >
                                            <span class="pk10_ball" :class="'num_'+listnum"></span>
                                        </li>
                                    </ul>
                                    <ul class="lo_ball double-numbers"  v-else>
                                        <li v-for="listnum in list.winNumber.split(',')">{{listnum}}</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>-->
        <div id="pa_content" class="content lobby_past_view">
            <div id="betting_record" class="tab_container tabBox">
                <ul class="tab_content">
                    <li class="past_view">
                        <ul class="panel">
                            <li class="prod cqssc" v-for="(list,index) in pastView">
                                <div class="play_th">
                                    <div class="prd_num"><i class="prd"></i><span>{{list.lotteryName}}</span></div>
                                    <div class="prd_num02">第{{list.pcode}}期</div>
                                    <div class="time">00:00:00</div>
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

        <footer class="bot_nav" id="pa_foot">
            <ul>
                <li class="active"><a class="index" href="/">首页大厅</a></li>
                <li><a class="trend" href="/lobbyPastView">往期开奖</a></li>
                <li><a class="record" href="publicTemplate/betRecord?type=index">投注纪录</a></li>
                <li><a class="member" href="javascript:;">个人中心</a></li>
            </ul>
        </footer>

        <div class="so-shade"></div>


    </div>
</template>



<script>
import Mixin from '@/Mixin'

export default {
  name: 'Index',
  mixins:[Mixin],
    data :function() {
        return {
            pastView:{} ,
            cssid :{'8':'pk10'} ,
            gameHref : {"1":"c_cqssc","2":"cqssc","3":"jxsyxw","4":"jc11x5","8":"pk10","12":"tjssc","14":"xjssc","18":"jc11x5/sd11x5Index", "16":"jc11x5/gd11x5Index" }, // 对应彩种的id

        }
    },
  mounted:function() {
    $('html,body').css('overflow-y','scroll' )  ;
    this.doubleCount('') ;
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
                                console.log('法规的时间')
                                data.data[i].winNumber ='20,20,20,20,20,20,20,20,20,20' ;
                                break;
                            default  :
                                data.data[i].winNumber='-,-,-,-,-' ;
                                break ;
                        }

                    }


                }
                this.pastView = data.data ;

            },
            error: function (data) {  // 错误提示


            }
        });
    },

  }

}
</script>
<style scoped>

</style>
