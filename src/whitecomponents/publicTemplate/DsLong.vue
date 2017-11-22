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
                    <ul class="tab tab_mid tab_two">
                        <li class="on"><a href="javascript:;" data-filter="open">连续开奖</a></li>
                        <li><a href="javascript:;" data-filter="not_open">连续未开</a></li>
                    </ul>
                </div>
                <div class="bd">
                    <ul class="tab_content">
                        <li class="ds_long">
                            <ul class="panel clong_open">
                               <!-- <li class="prod" data-status="not_open">
                                    <i class="prd"></i>
                                    <div>1-5球_第二球</div>
                                    <ul class="lo_ball">
                                        <li>9</li>
                                    </ul>
                                    <div class="periods text-red">7期</div>
                                </li>
                                <li class="prod" data-status="not_open">
                                    <i class="prd"></i>
                                    <div>1-5球_第二球</div>
                                    <ul class="lo_ball">
                                        <li>9</li>
                                    </ul>
                                    <div class="periods text-red">7期</div>
                                </li>
                                <li class="prod" data-status="not_open">
                                    <i class="prd"></i>
                                    <div>1-5球_第二球</div>
                                    <ul class="lo_ball">
                                        <li>9</li>
                                    </ul>
                                    <div class="periods text-yellow">6期</div>
                                </li>
                                <li class="prod" data-status="not_open">
                                    <i class="prd"></i>
                                    <div>1-5球_第二球</div>
                                    <ul class="lo_ball">
                                        <li>5</li>
                                    </ul>
                                    <div class="periods text-white">5期</div>
                                </li>
                                <li class="prod" data-status="not_open">
                                    <i class="prd"></i>
                                    <div>1-5球_第二球</div>
                                    <ul class="lo_ball">
                                        <li>7</li>
                                    </ul>
                                    <div class="periods text-l-yellow">4期</div>
                                </li>
                                <li class="prod" data-status="not_open">
                                    <i class="prd"></i>
                                    <div>1-5球_第二球</div>
                                    <ul class="lo_ball">
                                        <li>8</li>
                                    </ul>
                                    <div class="periods text-green">3期</div>
                                </li>
                                <li class="prod" data-status="not_open">
                                    <i class="prd"></i>
                                    <div>1-5球_第二球</div>
                                    <ul class="lo_ball">
                                        <li>2</li>
                                    </ul>
                                    <div class="periods text-green">3期</div>
                                </li>
                                <li class="prod" data-status="not_open">
                                    <i class="prd"></i>
                                    <div>1-5球_第二球</div>
                                    <ul class="lo_ball">
                                        <li>5</li>
                                    </ul>
                                    <div class="periods text-green">3期</div>
                                </li>-->
                            </ul>
                        </li>
                    </ul>
                    <ul class="tab_content">
                        <li class="ds_long">
                            <ul class="panel clong_notopen">
                                <!--<li class="prod" data-status="not_open"> <i class="prd"></i>
                                    <div>两面_总和&龙虎</div>
                                    <ul class="lo_ball no_open">
                                        <li>9</li>
                                    </ul>
                                    <div class="periods text-red">7期</div>
                                </li>
                                <li class="prod" data-status="not_open"> <i class="prd"></i>
                                    <div>两面_总和&龙虎</div>
                                    <ul class="lo_ball no_open">
                                        <li>9</li>
                                    </ul>
                                    <div class="periods text-red">7期</div>
                                </li>
                                <li class="prod" data-status="not_open"> <i class="prd"></i>
                                    <div>两面_总和&龙虎</div>
                                    <ul class="lo_ball no_open">
                                        <li>对子</li>
                                    </ul>
                                    <div class="periods text-yellow">6期</div>
                                </li>
                                <li class="prod" data-status="not_open"> <i class="prd"></i>
                                    <div>1-5球_第二球</div>
                                    <ul class="lo_ball">
                                        <li>5</li>
                                    </ul>
                                    <div class="periods text-white">5期</div>
                                </li>
                                <li class="prod" data-status="not_open"> <i class="prd"></i>
                                    <div>1-5球_第二球</div>
                                    <ul class="lo_ball">
                                        <li>7</li>
                                    </ul>
                                    <div class="periods text-l-yellow">4期</div>
                                </li>
                                <li class="prod" data-status="not_open"> <i class="prd"></i>
                                    <div>1-5球_第二球</div>
                                    <ul class="lo_ball">
                                        <li>8</li>
                                    </ul>
                                    <div class="periods text-green">3期</div>
                                </li>
                                <li class="prod" data-status="not_open"> <i class="prd"></i>
                                    <div>1-5球_第二球</div>
                                    <ul class="lo_ball">
                                        <li>2</li>
                                    </ul>
                                    <div class="periods text-green">3期</div>
                                </li>
                                <li class="prod" data-status="not_open"> <i class="prd"></i>
                                    <div>1-5球_第二球</div>
                                    <ul class="lo_ball">
                                        <li>5</li>
                                    </ul>
                                    <div class="periods text-green">3期</div>
                                </li>-->
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
    
export default {
    name: 'dslong',
    mixins:[Mixin],
    data :function() {
        return {
            lotteryid :this.getCookie('lt_lotteryid'),
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
    var lotteryname = this.getCookie('lottery_name') ; // 彩种 名称
    $('.lottery_name').html(lotteryname+' 双面长龙') ;
    //scrollTo(0,0); // 回到顶部
      document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
    this.setMenuAction() ;
    this.loadDoubleLong(this.lotteryid,'','open','clong_open') ; // 连续开奖
    this.loadDoubleLong(this.lotteryid,'','unopen','clong_notopen') ; // 连续未开奖
     TouchSlide({
          slideCell: "#betting_record",
      });
  },
  methods:{

    /*
    *  双面长龙数据，双面长龙页面 openType open连续开奖，unopen连续未开
    * */
    loadDoubleLong:function (lotteryid,maxtime,openty,cla) {
        var senddata ={
            lotteryId : lotteryid ,
            maxUpdateTime: maxtime ,
            openType:openty,
        }
        $.ajax({
            type: 'get',
            headers: {
                'Authorization': 'bearer  ' + this.getAccessToken ,
                // 'sourceType':'2', // 1是pc端，2是h5
                // 'sideType':'1',  // 1是传统盘，2是双面盘
            },
            url: this.action.forseti + 'api/openNums/doubleLong',
            timeout: 600000,
            data: senddata ,
            success: (function (data) {
                var str = '' ;
                for(var i=0;i<data.data.length;i++){
                    var textcolor = 'text-red' ;
                    switch (data.data[i].count.toString()){
                        case '3':
                             textcolor = 'text-green' ;
                             break;
                        case '4':
                            textcolor = 'text-yellow' ;
                            break;
                        case '5':
                            textcolor = 'text-white' ;
                            break;
                        case '6':
                            textcolor = 'text-yellow' ;
                            break;
                        default :
                            textcolor = 'text-red' ;
                            break ;
                    }
                    str +=' <li class="prod" data-status="not_open">'+
                            '<i class="prd"></i>'+
                            '<div>'+ data.data[i].groupName +'</div>';
                            if(Number(data.data[i].playName) >=0 ){
                                 str +=  '<ul class="lo_ball">' ;
                            }else{
                                str +=  '<ul class="lo_ball no_open">' ;
                            }
                            str += '<li>'+ data.data[i].playName +'</li>'+
                            '</ul>'+
                             '<div class="periods '+textcolor+'">'+ data.data[i].count +'期</div>'+
                            '</li>' ;
                }
                $('.'+cla).html(str) ;

            }).bind(this),
            error: function (data) {  // 错误提示


            }
        });
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
              $('.lottery_name').html(lottery_name + ' 双面长龙'); // 彩种名称
              this.loadDoubleLong(this.lotteryid,'','open','clong_open') ; // 连续开奖
              this.loadDoubleLong(this.lotteryid,'','unopen','clong_notopen') ; // 连续未开奖

              $(".dropdown").slideToggle("fast", () => {
              });
              $('.so-shade').fadeToggle("fast", "linear");

          });
      },


  },

}
</script>
