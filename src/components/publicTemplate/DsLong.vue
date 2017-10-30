<template>
    <div id="pa_con">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="/static/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center lottery_name"> </h2>
          <!--  <div class="right">
                <div class="so-top-zoushi">
                    <img src="/static/images/top/zoushi.png">
                </div>
            </div>-->
        </header>
        <!--right menu  -->
        <div class="so-right">
            <div>
                <img src="/static/images/top/zoushi.png">
            </div>
           <!-- <div>
                <div>
                    <ul>
                        <li>
                            <a href="bet_record.html">
                                <img src="/static/images/right/1.png">
                                <p>投注记录</p>
                            </a>
                        </li>
                        <li>
                            <a href="past_view.html">
                                <img src="/static/images/right/2.png">
                                <p>近期开奖</p>
                            </a>
                        </li>
                        <li>
                            <a href="road_beads.html">
                                <img src="/static/images/right/3.png">
                                <p>路珠</p>
                            </a>
                        </li>
                        <li>
                            <a href="ds_long.html">
                                <img src="/static/images/right/4.png">
                                <p>双面长龙</p>
                            </a>
                        </li>
                        <li class="play">
                            <img src="/static/images/right/5.png">
                            <p>玩法说明</p>
                        </li>
                        <li>
                            <img src="/static/images/right/6.png">
                            <p>今日输赢</p>
                            <div class="so-color">(+11.65)</div>
                        </li>
                    </ul>
                </div>
            </div>-->
        </div>
        <div id="pa_content">
            <div id="betting_record" class="tab_container tabBox">
                <div class="hd">
                    <ul class="tab tab_mid tab_two">
                        <li class="on"><a href="javascript:;" data-filter="">连续开奖</a></li>
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
export default {
  name: 'Index',
  mounted:function() {
    var lotteryid = getCookie('lt_lottid') ; // 彩种 id
    var lotteryname = getCookie('lottery_name') ; // 彩种 名称
    $('.lottery_name').html(lotteryname+' 双面长龙') ;
    this.loadDoubleLong(lotteryid,'','open','clong_open') ; // 连续开奖
    this.loadDoubleLong(lotteryid,'','unopen','clong_notopen') ; // 连续未开奖
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
                'Authorization': 'bearer  ' + getAccessToken(access_token) ,
                // 'sourceType':'2', // 1是pc端，2是h5
                // 'sideType':'1',  // 1是传统盘，2是双面盘
            },
            url: action.forseti + 'api/openNums/doubleLong',
            timeout: 600000,
            data: senddata ,
            success: (function (data) {
             // console.log(data.data) ;
                var str = '' ;
                for(var i=0;i<data.data.length;i++){
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
                             '<div class="periods text-red">'+ data.data[i].count +'期</div>'+
                            '</li>' ;
                }
                $('.'+cla).html(str) ;

            }).bind(this),
            error: function (data) {  // 错误提示


            }
        });
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
