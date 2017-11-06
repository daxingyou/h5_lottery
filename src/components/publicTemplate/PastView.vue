<template>
    <div id="pa_con">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="/static/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center lottery_name"> </h2>
        </header>
        <div id="pa_content">
            <div id="betting_record" class="tab_container tabBox">
                <div class="hd">
                    <ul class="tab tab_mid tab_three">
                        <li class="on" data-val="30" @click="changeTab($event)"><a href="javascript:;" data-filter="" >近30期</a></li>
                        <li  data-val="50"  @click="changeTab($event)"><a href="javascript:;" data-filter="not_open">近50期</a></li>
                        <li data-val="0"  @click="changeTab($event)"><a href="javascript:;" data-filter="winning" >今日数据</a></li>
                    </ul>
                </div>
                <div class="bd" :id="cssid[lotteryid]">
                    <ul class="tab_content double-all">
                        <li class="past_view" v-for="(list,index) in pastView">
                            <ul class="panel">
                                <li class="prod" data-status="not_open" >
                                    <div class="play_th">
                                        <div class="prd_num"><i class="prd"></i><span>{{(lotteryid == '8')?list.issueAlias :list.pcode}}</span> 期</div>
                                        <ul class="double-count" v-if="lotteryid == '8'"> <!-- 上面一排数据 -->
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
                                            <li>{{list.doubleData.total}}</li>
                                            <li>{{list.doubleData.sizer}}</li>
                                            <li>{{list.doubleData.doubler}}</li>
                                            <li v-if="(lotteryid == '4' || lotteryid == '16') || (lotteryid == '18')">{{list.doubleData.sizerEnd}}</li>
                                            <li>{{list.doubleData.longer}}</li>

                                        </ul>
                                    </div>
                                    <!-- 北京pk10  -->
                                  <!--  <ul class="lo_ball double-numbers" v-if="lotteryid == '8'"> -->
                                    <ul  :class="ulclass[list.lotteryId]" v-if="(list.lotteryId == '8') || (list.lotteryId == '6') || (list.lotteryId == '20') || (list.lotteryId == '22')">
                                        <li v-for="listnum in list.winNumber.split(',')" >
                                           <!-- <span class="pk10_ball" :class="'num_'+listnum"></span>-->
                                            <span :class="[spanclass[list.lotteryId],'num_'+listnum]"></span>
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
        </div>
        <footer id="pa_foot"></footer>
        <div class="so-shade"></div>


    </div>
</template>



<script>
import Mixin from '@/Mixin'
import $ from "jquery";
import "../../../static/css/pk10.css"

export default {
  name: 'PastView',
  mixins:[Mixin],
    data :function() {
        return {
            pastView:{} ,
            ulclass :{'8':'lo_ball double-numbers','6':'lo_ball double-numbers','20':'lo_ball double-numbers','22':'lo_ball double-numbers'} ,
            spanclass :{'8':'pk10_ball small_ball','6':'k3_dice','20':'k3_dice','22':'k3_dice'} ,
            lotteryid :this.getCookie('lt_lotteryid') , // 彩种 id
            cssid :{'8':'pk10','6':'k3','20':'k3','22':'k3'} ,
        }
    },
  mounted:function() {
  //  var lotteryid = this.getCookie('lt_lotteryid') ; // 彩种 id
    var lotteryname = this.getCookie('lottery_name') ; // 彩种 名称
    $('.lottery_name').html(lotteryname+' 近期开奖') ;
    // this.changeTab(lotteryid) ;
    this.doubleCount(this.lotteryid,'30','') ;
    $('html,body').css('overflow-y','scroll' )  ;
  },
  methods:{

    /*
    * 近期开奖数据，近期开奖页面
    * */
    doubleCount:function (lotteryid,rows,maxtime) {
        var senddata ={
            lotteryId : lotteryid ,
            pcount: rows ,
            maxUpdateTime: maxtime ,
        }
        $.ajax({
            type: 'get',
            headers: {
                'Authorization': 'bearer  ' + this.getAccessToken ,
                // 'sourceType':'2', // 1是pc端，2是h5
                // 'sideType':'1',  // 1是传统盘，2是双面盘
            },
            url: this.action.forseti + 'api/openNums/doubleCount',
            timeout: 600000,
            data: senddata ,
            success: (data) => {
             // console.log(data.data) ;
               // var str ='';
                for(var i=0;i<data.data.length;i++){
                    if(!data.data[i].winNumber){
                        switch (this.lotteryid){
                            case '8': // 北京pk10
                                data.data[i].winNumber ='20,20,20,20,20,20,20,20,20,20' ;
                                break;
                            default  :
                                data.data[i].winNumber='-,-,-,-,-' ;
                                break ;
                        }

                    }

                  //  var codeArr = data.data[i].winNumber.split(',') ;
                   /* str +='<li class="past_view">'+
                        '<ul class="panel">'+
                       ' <li class="prod" data-status="not_open">'+
                        '<div class="play_th">'+
                        '<div class="prd_num"><i class="prd"></i><span>'+data.data[i].pcode+'</span> 期</div>'+
                        '<ul class="double-count">'+
                       ' <li>'+data.data[i].doubleData.total+'</li>'+
                       ' <li>'+data.data[i].doubleData.sizer+'</li>'+
                       ' <li>'+data.data[i].doubleData.longer+'</li>'+
                       ' <li>'+data.data[i].doubleData.doubler+'</li>'+
                       ' </ul>'+
                       '</div>'+
                       ' <ul class="lo_ball double-numbers">';
                        for (var j = 0; j < codeArr.length; j++) {
                            str += ' <li>'+codeArr[j]+'</li>' ;
                        }

                        str += '</ul>'+
                                '</li>'+
                                '</ul>'+
                                '</li>' ;
                    */
                }
                this.pastView = data.data ;
               // $('.double-all').html(str) ;


            },
            error: function (data) {  // 错误提示


            }
        });
    },
    /*
    * 近期开奖标签切换
    * */
    changeTab:function (e) {
        // $('.tab_three').on('click','li',(e) => {
            var lotteryid = this.getCookie('lt_lotteryid')
            var val = $(e.currentTarget).data('val') ;
            $(e.currentTarget).addClass('on').siblings().removeClass('on') ;
            this.doubleCount(lotteryid,val,'') ;
        // });
    }
  }

}
</script>
