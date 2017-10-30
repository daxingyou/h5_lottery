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
                <div class="bd">
                    <ul class="tab_content double-all">
                        <li class="past_view">
                            <ul class="panel">
                                <li class="prod" data-status="not_open" v-for="(list,index) in pastView">
                                    <div class="play_th">
                                        <div class="prd_num"><i class="prd"></i><span>{{list.pcode}}</span> 期</div>
                                        <ul class="double-count">
                                            <li>{{list.doubleData.doubler}}</li>
                                            <li>{{list.doubleData.longer}}</li>
                                            <li>{{list.doubleData.sizer}}</li>
                                            <li>{{list.doubleData.total}}</li>
                                        </ul>
                                    </div>
                                    <ul class="lo_ball double-numbers">
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

export default {
  name: 'Index',
  mixins:[Mixin],
    data :function() {
        return {
            pastView:{} ,

        }
    },
  mounted:function() {
    var lotteryid = this.getCookie('lt_lottid') ; // 彩种 id
    var lotteryname = this.getCookie('lottery_name') ; // 彩种 名称
    $('.lottery_name').html(lotteryname+' 近期开奖') ;
    // this.changeTab(lotteryid) ;
    this.doubleCount(lotteryid,'30','') ;
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
                'Authorization': 'bearer  ' + this.getAccessToken(access_token) ,
                // 'sourceType':'2', // 1是pc端，2是h5
                // 'sideType':'1',  // 1是传统盘，2是双面盘
            },
            url: action.forseti + 'api/openNums/doubleCount',
            timeout: 600000,
            data: senddata ,
            success: (data) => {
             // console.log(data.data) ;
               // var str ='';
                for(var i=0;i<data.data.length;i++){
                    if(!data.data[i].winNumber){
                        data.data[i].winNumber='-,-,-,-,-' ;
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
            var lotteryid = this.getCookie('lt_lottid')
            var val = $(e.currentTarget).data('val') ;
            $(e.currentTarget).addClass('on').siblings().removeClass('on') ;
            this.doubleCount(lotteryid,val,'') ;
        // });
    }
  }

}
</script>
