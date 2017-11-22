<template>
    <div id="pa_con">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="/static/white/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center lottery_name"> </h2>
            <div class="right">
                <div class="dropdown_icon"><i class="icon filter"></i>筛选</div>
            </div>
        </header>
        <div class="dropdown" style="display:none;">
            <div class="play_area">
                <div class="sort">
                    <h5>游戏筛选</h5>
                    <ul>
                        <li :class="{'active':lotteryid== list.id}" :data-val="list.id" v-for="list in gamechoose"><a href="javascript:void(0);"> {{list.name}} </a></li>

                    </ul>
                    <div>
                        <div class="btn btn_two round btn_outline"><a href="javascript:;">取消</a></div>
                        <div class="btn btn_two round btn_blue02 btn_submit"><a href="javascript:;">确定</a></div>
                    </div>
                </div>
            </div>
        </div>
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
                        <li class="past_view" v-for="(list,index) in pastView" v-if="list.winNumber !=''"> <!--  没有开奖号码不显示  -->
                            <ul class="panel">
                                <li class="prod" data-status="not_open" >
                                    <div class="play_th">
                                        <div class="prd_num">
                                            <i class="prd"></i>
                                            <span>{{(lotteryid == '8')? list.issueAlias:list.pcode}}</span>
                                           <span>期</span>
                                        </div>
                                        <ul class="double-count" v-if="lotteryid == '8'"> <!-- 上面一排数据 -->
                                            <li>{{list.doubleData.top2_total}}</li>
                                            <li>{{list.doubleData.top2_sizer}}</li>
                                            <li>{{list.doubleData.top2_doubler}}</li>
                                            <li>{{list.doubleData.lh_1}}</li>
                                            <li>{{list.doubleData.lh_2}}</li>
                                            <li>{{list.doubleData.lh_3}}</li>
                                            <li>{{list.doubleData.lh_4}}</li>
                                            <li>{{list.doubleData.lh_5}}</li>

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
// import $ from "jquery";
import "../../../static/white/css/pk10.css"

export default {
  name: 'PastView',
  mixins:[Mixin],
    data :function() {
        return {
            pastView:{} ,
            ulclass :{'8':'lo_ball double-numbers','6':'lo_ball double-numbers','20':'lo_ball double-numbers','22':'lo_ball double-numbers'} ,
            spanclass :{'8':'pk10_ball small_ball','6':'k3_dice','20':'k3_dice','22':'k3_dice'} ,
            lotteryid :this.getCookie('lt_lotteryid') , // 彩种 id
            count :'30' , // 每次请求数量
            cssid :{'8':'pk10','6':'k3','20':'k3','22':'k3'} ,
            gamechoose :[
                {id:'2','name':'重庆时时彩'} ,
                {id:'12','name':'天津时时彩'} ,
                {id:'14','name':'新疆时时彩'} ,
                {id:'4','name':'江西11选5'} ,
                {id:'16','name':'广东11选5'} ,
                {id:'18','name':'山东11选5'} ,
                {id:'6','name':'江苏快3'} ,
                {id:'20','name':'安徽快3'} ,
                {id:'22','name':'湖北快3'} ,
                {id:'8','name':'北京PK10'} ,
            ],
        }
    },
  mounted:function() {
this.setMenuAction() ;
    var lotteryname = this.getCookie('lottery_name') ; // 彩种 名称
    $('.lottery_name').html(lotteryname+' 往期开奖') ;
    //scrollTo(0,0); // 回到顶部
      document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
    this.doubleCount(this.lotteryid,this.count,'') ;
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
               /* for(var i=0;i<data.data.length;i++){
                    if(!data.data[i].winNumber){
                        switch (this.lotteryid.toString()){
                            case '8': // 北京pk10
                                data.data[i].winNumber ='20,20,20,20,20,20,20,20,20,20' ;
                                break;
                            case '6': // 江苏快 3
                            case '20': // 快 3
                            case '22': // 快 3
                                data.data[i].winNumber ='20,20,20' ;
                                break;
                            default  :
                                data.data[i].winNumber='-,-,-,-,-' ;
                                break ;
                        }

                    }

                }*/
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
            this.count = $(e.currentTarget).data('val') ;
            $(e.currentTarget).addClass('on').siblings().removeClass('on') ;
            this.doubleCount(this.lotteryid,this.count,'') ;
           document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部

    },

      //筛选下拉单
      setMenuAction:function () {
          $(".dropdown_icon,.btn_outline").click(() => {
              $(".dropdown").slideToggle("fast", () => {
              });
              $('.so-shade').fadeToggle("fast", "linear");
          });

          var lotterychooseid ;
          $('.play_area').on('click', 'li', (e) => {
              var $src = $(e.currentTarget);
              $src.addClass('active').siblings().removeClass('active');
              var val = $src.data('val');
              lotterychooseid = val;

          });
          //确定提交
          $('.btn_submit').on('click', (e) => {
              if(lotterychooseid || lotterychooseid == '0'){
                  this.lotteryid = lotterychooseid ;
              }
              var $src = $(e.currentTarget);
              var lottery_name ;
              $('.play_area').each(function () {
                  var flag = $(this).find('li').hasClass('active') ;
                  if(flag){
                      lottery_name = $(this).find('li.active').find('a').text()
                  }
              }) ;
              $('.lottery_name').html(lottery_name + ' 近期开奖'); // 彩种名称
              this.doubleCount(this.lotteryid,this.count) ;
              $(".dropdown").slideToggle("fast", () => {
              });
              $('.so-shade').fadeToggle("fast", "linear");

          });
      },

  }

}
</script>
