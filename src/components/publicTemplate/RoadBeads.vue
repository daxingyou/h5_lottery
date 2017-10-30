<template>

    <div id="pa_con">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="/static/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center lottery_name"> </h2>
            <div class="right">
                <div class="so-top-zoushi">
                    <img src="/static/images/top/zoushi.png">
                </div>
            </div>
        </header>
        <!--right menu  -->
        <div class="so-right">
            <div>
                <img src="/static/images/top/zoushi.png">
            </div>
            <div>
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
            </div>
        </div>
        <div id="pa_content">
            <div id="road01" class="tab_container tabBox">
                <div class="hd">
                    <ul class="tab tab01 tab_mid tab_three">
                        <li class="on" data-tab="road01_1" data-val="1"><a href="javascript:;">总和大小</a></li>
                        <li data-tab="road01_2" data-val="1"><a href="javascript:;">总和单双</a></li>
                        <li data-tab="road01_3" data-val="1"><a href="javascript:;">龙 虎</a></li>
                    </ul>
                </div>
                <div class="bd">
                    <!-- 总和大小 -->
                    <ul id="road01_1" class="tab_content tab_content_out on">
                    </ul>
                    <!-- 总和单双 -->
                    <ul id="road01_2" class="tab_content tab_content_out">
                    </ul>
                    <!-- 龙虎 -->
                    <ul id="road01_3" class="tab_content tab_content_out">
                    </ul>
                </div>
            </div>
            <div id="road02" class="tab_container tabBox">
                <div class="hd">
                    <ul class="tab tab02 tab_mid tab_five">
                        <li data-tab="road02_1" class="on" data-val="2"><a href="javascript:;">第一球</a></li>
                        <li data-tab="road02_2" data-val="2"><a href="javascript:;">第二球</a></li>
                        <li data-tab="road02_3" data-val="2"><a href="javascript:;">第三球</a></li>
                        <li data-tab="road02_4" data-val="2"><a href="javascript:;">第四球</a></li>
                        <li data-tab="road02_5" data-val="2"><a href="javascript:;">第五球</a></li>
                    </ul>
                </div>
                <div class="bd">
                    <div id="road02_1" class="tab_content_out on">
                        <ul class="tab_content dx_size">
                        </ul>
                        <ul class="tab_content ds_dx">
                        </ul>
                    </div>
                    <div id="road02_2" class="tab_content_out">
                        <ul class="tab_content dx_size">

                        </ul>
                        <ul class="tab_content ds_dx">
                        </ul>
                    </div>
                    <div id="road02_3" class="tab_content_out">
                        <ul class="tab_content dx_size">
                        </ul>
                        <ul class="tab_content ds_dx">
                        </ul>
                    </div>
                    <div id="road02_4" class="tab_content_out">
                        <ul class="tab_content dx_size">
                        </ul>
                        <ul class="tab_content ds_dx">
                        </ul>
                    </div>
                    <div id="road02_5" class="tab_content_out">
                        <ul class="tab_content dx_size">
                           
                        </ul>
                        <ul class="tab_content ds_dx">
                          
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <footer id="pa_foot"></footer>
        <div class="so-shade"></div>
        <!--玩法说明-->
        <!-- <div class="so-pop-wanfa modal">
            <div class="m_content">
                <h2>重庆时时彩玩法说明<a></a></h2>
                <div class="content">
                    <div class="playtext">
                        <h3>一、两面玩法</h3>
                        <p>开奖结果万位、仟位、佰位、拾位或个位数
                            字为1、3、5、7、9时为“单”，若为0、2、
                            4、6、8时为“双”，当投注位数单双与开
                            奖结果的位数单双相符时，即为中奖。
                            五字和数单双：加总当期开奖结果五个彩球
                            号码，以其加总值的单双作为开奖依据，当
                            投注之注项与开奖结果相符时，即为中奖。</p>
                        <h3>二、1-5 球玩法说明</h3>
                        <p>开奖结果万位、仟位、佰位、拾位或个位数
                            字为1、2、3、5、7时为“质数”，若为0、
                            4、6、8、9时为“合数”，当投注位数质合
                            与开奖结果的位数质合相符时，即为中奖。
                            ※举例：投注者购买个位质，当期开奖结果
                            如为20957（7为质），则视为中奖。开奖结
                            果万仟位、万佰位、万拾位、万个位、仟佰
                        </p>
                        <h3>三、前中后玩法说明</h3>
                        <p>开奖结果万位、仟位、佰位、拾位或个位数 字为1、2、3、5、7时为“质数”，若为0、 4、6、8、9时为“合数”，当投注位数质</p>
                    </div>
                </div>
                <div class="action">
                    <a class="ok">确定</a>
                </div>
            </div>
        </div>-->

    </div>

</template>



<script>
export default {
    name: 'Index',
    mounted:function() {
        var lotteryid = getCookie('lt_lottid') ; // 彩种 id
        var lotteryname = getCookie('lottery_name') ; // 彩种 名称
        $('.lottery_name').html(lotteryname+' 路珠') ;
        this.loadRoadAction(lotteryid,'') ;

        // 标签切换
        this.roadChangeTab() ;
        // initRightViewEve() ;
    },
    methods:{
        /*
        * 路珠数据，路珠页面
        * */
        loadRoadAction:function(lotteryid,maxtime) {
            var senddata ={
                lotteryId : lotteryid ,
                maxUpdateTime: maxtime ,
            }
            $.ajax({
                type: 'get',
                headers: {
                    'Authorization': 'bearer  ' + getAccessToken(access_token) ,
                    // 'sourceType':'2', // 1是pc端，2是h5
                    // 'sideType':'1',  // 1是传统盘，2是双面盘
                },
                url: action.forseti + 'api/openNums/loadBead',
                timeout: 600000,
                data: senddata ,
                success: (function(data) {
                   // console.log(data.data.total_size) ;
                    this.roadDomAction(data.data.total_size,'road01_1') ;  // 路珠总和大小
                    this.roadDomAction(data.data.total_sd,'road01_2') ;  // 路珠总和单双
                    this.roadDomAction(data.data.total_lhh,'road01_3') ;  // 路珠龙虎
                    this.roadDomAction(data.data.size_1,'road02_1 .dx_size') ;  // 第一球大小
                    this.roadDomAction(data.data.sd_1,'road02_1 .ds_dx') ;  // 第一球单双
                    this.roadDomAction(data.data.size_2,'road02_2 .dx_size') ;  // 第二球大小
                    this.roadDomAction(data.data.sd_2,'road02_2 .ds_dx') ;  // 第二球单双
                    this.roadDomAction(data.data.size_3,'road02_3 .dx_size') ;  // 第三球大小
                    this.roadDomAction(data.data.sd_3,'road02_3 .ds_dx') ;  // 第三球单双
                    this.roadDomAction(data.data.size_4,'road02_4 .dx_size') ;  // 第四球大小
                    this.roadDomAction(data.data.sd_4,'road02_4 .ds_dx') ;  // 第四球单双
                    this.roadDomAction(data.data.size_5,'road02_5 .dx_size') ;  // 第五球大小
                    this.roadDomAction(data.data.sd_5,'road02_5 .ds_dx') ;  // 第五球单双
                }).bind(this),
                error: function (data) {  // 错误提示


                }
            });
        },

        /*
        *  路珠总和大小数据处理，resdata 数据，cid 选择器，color 球的颜色
        *  和=蓝mid   龙=紅big  虎=绿tiger  大=紅big   小=绿tiger  单=紅big  双=绿tiger
        * */
        roadDomAction:function (resdata,cid) {
            var ts = '' ;
            for(var i=0;i<resdata.length;i++){  // 总和大小
                ts +=' <li class="road">'+
                    '<ul>' ;
                for(var ii=0;ii<resdata[i].length;ii++){
                    var rescon = resdata[i][ii] ;
                    var color = 'mid' ;
                    switch (rescon) {
                        case '和':
                            color = 'mid' ;
                            break;
                        case '龙':
                        case '大':
                        case '单':
                            color = 'big' ;
                            break;
                        case '虎':
                        case '小':
                        case '双':
                            color = 'tiger' ;
                            break;
                        default :
                            color = 'mid' ;
                            break;
                    }
                    ts += '<li class="'+color+'">'+resdata[i][ii]+'</li>' ;
                }
                ts += '</ul>'+
                    '</li>' ;
            }
            $('#'+cid).html(ts) ;

        },

        /*
        * 路珠标签切换
        * */
        roadChangeTab:function () {
            $('ul.tab_mid li').click(function(){
                var tab_id = $(this).attr('data-tab');
                var tab_val = $(this).data('val') ;
                $('ul.tab0'+tab_val+' li').removeClass('on');
                $('#road0'+tab_val+' .tab_content_out').removeClass('on');
                $(this).addClass('on');
                $("#"+tab_id).addClass('on');
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
