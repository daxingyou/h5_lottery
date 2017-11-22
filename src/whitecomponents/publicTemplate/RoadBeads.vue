<template>
<div :id="gameshowid[lotteryid]">
    <div id="pa_con">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="/static/frist/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center lottery_name">{{lotteryName}} 路珠</h2>
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
            <div id="road01" class="tab_container tabBox">
                <div class="hd">
                    <ul class="tab tab01 tab_mid" :class="ulclass[lotteryid]">
                        <!-- pk10 -->
                        <li class="on" data-tab="road01_1" data-val="1" v-if="lotteryid=='8'"><a href="javascript:;">冠亚和大小</a></li>
                        <li data-tab="road01_2" data-val="1" v-if="lotteryid=='8'"><a href="javascript:;">冠亚和单双</a></li>

                        <li class="on" data-tab="road01_1" data-val="1" v-if="lotteryid !='8'"><a href="javascript:;">总和大小</a></li>
                        <!-- 快3 pk10 没有 -->
                        <li data-tab="road01_2" data-val="1" v-if="(lotteryid =='2') || (lotteryid =='4') || (lotteryid =='12') || (lotteryid =='14') ||(lotteryid =='16') || (lotteryid =='18')">
                            <a href="javascript:;">总和单双</a>
                        </li>
                        <!-- 11 选5才有-->
                        <li data-tab="road01_4" data-val="1" class="jxsyxw_tab"  v-if="(lotteryid =='4') || (lotteryid =='16') || (lotteryid =='18')">
                            <a href="javascript:;">总和尾大小</a>
                        </li>
                        <li data-tab="road01_3" data-val="1" v-if="(lotteryid =='2') || (lotteryid =='4') || (lotteryid =='12') || (lotteryid =='14') ||(lotteryid =='16') || (lotteryid =='18')">
                            <a href="javascript:;" >龙 虎</a>
                        </li>

                    </ul>
                </div>
                <div class="bd">
                    <!-- 总和大小 -->
                    <RoadBeadItem id="road01_1" :dataResult="dataResult.top2_size" class="tab_content_out on" v-if="lotteryid=='8'"/>
                    <RoadBeadItem id="road01_1" :dataResult="dataResult.total_size" class="tab_content_out on" v-else />

                    <!-- 总和单双 v-if="!(['6','20','22'].includes(lotteryid))" -->
                    <RoadBeadItem id="road01_2"  :dataResult="dataResult.top2_sd" class="tab_content_out" v-if="lotteryid =='8'"/>
                    <RoadBeadItem id="road01_2" :dataResult="dataResult.total_sd" class="tab_content_out" v-else />

                    <!-- 总和尾大小 11 选5 才有 -->
                    <RoadBeadItem id="road01_4" v-if="!(['2', '6','20','22'].includes(lotteryid))" :dataResult="dataResult.totalEnd_size" class="tab_content_out" />

                    <!-- 龙虎 -->
                    <RoadBeadItem id="road01_3" v-if="!(['6','20','22'].includes(lotteryid))" :dataResult="dataResult.total_lhh" class="tab_content_out" />
                </div>
            </div>
            <div id="road02" class="tab_container tabBox" v-if="(lotteryid =='2') || (lotteryid =='4') || (lotteryid =='8') || (lotteryid =='12') || (lotteryid =='14') ||(lotteryid =='16') || (lotteryid =='18')">
                <div class="hd">
                    <ul class="tab tab02 tab_mid tab_five" v-if="lotteryid == '8'">
                        <li data-tab="road02_1" class="on" data-val="2"><a href="javascript:;">冠军</a></li>
                        <li data-tab="road02_2" data-val="2"><a href="javascript:;">亚军</a></li>
                        <li data-tab="road02_3" data-val="2"><a href="javascript:;">第三名</a></li>
                        <li data-tab="road02_4" data-val="2"><a href="javascript:;">第四名</a></li>
                        <li data-tab="road02_5" data-val="2"><a href="javascript:;">第五名</a></li>
                        <li data-tab="road02_6" data-val="2"><a href="javascript:;">第六名</a></li>
                        <li data-tab="road02_7" data-val="2"><a href="javascript:;">第七名</a></li>
                        <li data-tab="road02_8" data-val="2"><a href="javascript:;">第八名</a></li>
                        <li data-tab="road02_9" data-val="2"><a href="javascript:;">第九名</a></li>
                        <li data-tab="road02_10" data-val="2"><a href="javascript:;">第十名</a></li>
                    </ul>
                    <ul class="tab tab02 tab_mid tab_five" v-else>
                        <li data-tab="road02_1" class="on" data-val="2"><a href="javascript:;">第一球</a></li>
                        <li data-tab="road02_2" data-val="2"><a href="javascript:;">第二球</a></li>
                        <li data-tab="road02_3" data-val="2"><a href="javascript:;">第三球</a></li>
                        <li data-tab="road02_4" data-val="2"><a href="javascript:;">第四球</a></li>
                        <li data-tab="road02_5" data-val="2"><a href="javascript:;">第五球</a></li>
                    </ul>
                </div>
<!-- 
                    this.roadDomAction(data.data.size_1,'road02_1 .dx_size') ;  // 第一球大小 (pk10 冠军)
                    this.roadDomAction(data.data.sd_1,'road02_1 .ds_dx') ;  // 第一球单双 (pk10 冠军)
                    this.roadDomAction(data.data.size_2,'road02_2 .dx_size') ;  // 第二球大小 (pk10 亚军)
                    this.roadDomAction(data.data.sd_2,'road02_2 .ds_dx') ;  // 第二球单双 (pk10 亚军)
                    this.roadDomAction(data.data.size_3,'road02_3 .dx_size') ;  // 第三球大小 (pk10 第三名)
                    this.roadDomAction(data.data.sd_3,'road02_3 .ds_dx') ;  // 第三球单双 (pk10 第三名)

                    this.roadDomAction(data.data.size_4,'road02_4 .dx_size') ;  // 第四球大小
                    this.roadDomAction(data.data.sd_4,'road02_4 .ds_dx') ;  // 第四球单双
                    this.roadDomAction(data.data.size_5,'road02_5 .dx_size') ;  // 第五球大小
                    this.roadDomAction(data.data.sd_5,'road02_5 .ds_dx') ;  // 第五球单双
 -->

                <div class="bd">
                    <div id="road02_1" class="tab_content_out on">
                        <RoadBeadItem :dataResult="dataResult.size_1" class="dx_size" />
                        <RoadBeadItem :dataResult="dataResult.sd_1" class="ds_dx" />
                        <!-- <ul class="tab_content dx_size">
                        </ul>
                        <ul class="tab_content ds_dx">
                        </ul> -->
                    </div>
                    <div id="road02_2" class="tab_content_out">
                        <RoadBeadItem :dataResult="dataResult.size_2" class="dx_size" />
                        <RoadBeadItem :dataResult="dataResult.sd_2" class="ds_dx" />

<!--                         <ul class="tab_content dx_size"></ul>
                        <ul class="tab_content ds_dx"></ul> -->
                    </div>
                    <div id="road02_3" class="tab_content_out">
                        <RoadBeadItem :dataResult="dataResult.size_3" class="dx_size" />
                        <RoadBeadItem :dataResult="dataResult.sd_3" class="ds_dx" />

                        <!-- <ul class="tab_content dx_size">
                        </ul>
                        <ul class="tab_content ds_dx">
                        </ul> -->
                    </div>
                    <div id="road02_4" class="tab_content_out">
                        <RoadBeadItem :dataResult="dataResult.size_4" class="dx_size" />
                        <RoadBeadItem :dataResult="dataResult.sd_4" class="ds_dx" />
<!--                         <ul class="tab_content dx_size">
                        </ul>
                        <ul class="tab_content ds_dx">
                        </ul> -->
                    </div>
                    <div id="road02_5" class="tab_content_out">
                        <RoadBeadItem :dataResult="dataResult.size_5" class="dx_size" />
                        <RoadBeadItem :dataResult="dataResult.sd_5" class="ds_dx" />
                        <!-- <ul class="tab_content dx_size">
                           
                        </ul>
                        <ul class="tab_content ds_dx">
                          
                        </ul> -->
                    </div>

                    <!-- pk10 -->
                    <div id="road02_6" class="tab_content_out" v-if="lotteryid =='8'">
                        <RoadBeadItem :dataResult="dataResult.size_6" class="dx_size" />
                        <RoadBeadItem :dataResult="dataResult.sd_6" class="ds_dx" />
                    </div>
                    <div id="road02_7" class="tab_content_out" v-if="lotteryid =='8'">
                        <RoadBeadItem :dataResult="dataResult.size_7" class="dx_size" />
                        <RoadBeadItem :dataResult="dataResult.sd_7" class="ds_dx" />
                    </div>
                    <div id="road02_8" class="tab_content_out" v-if="lotteryid =='8'">
                        <RoadBeadItem :dataResult="dataResult.size_8" class="dx_size" />
                        <RoadBeadItem :dataResult="dataResult.sd_8" class="ds_dx" />
                    </div>
                    <div id="road02_9" class="tab_content_out" v-if="lotteryid =='8'">
                        <RoadBeadItem :dataResult="dataResult.size_9" class="dx_size" />
                        <RoadBeadItem :dataResult="dataResult.sd_9" class="ds_dx" />
                    </div>
                    <div id="road02_10" class="tab_content_out" v-if="lotteryid =='8'">
                        <RoadBeadItem :dataResult="dataResult.size_10" class="dx_size" />
                        <RoadBeadItem :dataResult="dataResult.sd_10" class="ds_dx" />
                    </div>


                </div>
            </div>
        </div>
        <footer id="pa_foot"></footer>
        <div class="so-shade"></div>

        <InfoDialog ref="infoDialog" text="请您继续投注" />
    </div>
</div>
</template>

<script>
    import Mixin from '@/Mixin'
    // import $ from "jquery";
    import InfoDialog from '@/components/publicTemplate/InfoDialog'
    import RoadBeadItem from '@/components/publicTemplate/RoadBeadItem'

    export default {
        name: 'RoadBeads',
        mixins:[Mixin],
        data :function() {
            return {
                gameshowid:{'8':'pk10'},
                lotteryid:this.getCookie('lt_lotteryid'),
                lotteryName:this.getCookie('lottery_name'),
                dataResult:{},
               // roadbeads:{} ,
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
                ulclass:{'2':'tab_three','12':'tab_three','14':'tab_three','6':'tab_two','20':'tab_two','22':'tab_two'}

            }
        },
        components: {
            RoadBeadItem,
            InfoDialog
        },
    mounted:function() {
        this.loadRoadAction(this.lotteryid,'') ;
        this.setMenuAction() ;
        //scrollTo(0,0); // 回到顶部
        document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
        // 标签切换
        this.roadChangeTab() ;

    },
    methods:{
        /*
        * 路珠数据，路珠页面
        * */
        loadRoadAction:function (lotteryid,maxtime) {
            var senddata ={
                lotteryId : lotteryid ,
                maxUpdateTime: maxtime ,
            }
            $.ajax({
                type: 'get',
                headers: {
                    'Authorization': 'bearer  ' + this.getAccessToken ,
                    // 'sourceType':'2', // 1是pc端，2是h5
                    // 'sideType':'1',  // 1是传统盘，2是双面盘
                },
                url: this.action.forseti + 'api/openNums/loadBead',
                timeout: 600000,
                data: senddata ,
                success: (function(data) {
                    this.dataResult = data.data;
                }).bind(this),
                error: function (data) {  // 错误提示
                    this.$refs.infoDialog.open('您的登录已过期，请重新登录', 'title_tip')
                    // initPopEve(2,'您的登录已过期，请重新登录') ;
                    return false ;

                }
            });
        },
        /*
        * 路珠标签切换
        * */
        roadChangeTab:function () {
            $('#pa_content').on('click','.tab_mid li',function(){
                var tab_id = $(this).attr('data-tab');
                var tab_val = $(this).data('val') ;
                $('ul.tab0'+tab_val+' li').removeClass('on');
                $('#road0'+tab_val+' .tab_content_out').removeClass('on');
                $(this).addClass('on');
                $("#"+tab_id).addClass('on');
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
                $('.lottery_name').html(lottery_name + ' 路珠'); // 彩种名称
                this.loadRoadAction(this.lotteryid,'') ;
                $(".dropdown").slideToggle("fast", () => {
                });
                $('.so-shade').fadeToggle("fast", "linear");

            });
        },

    },

}
</script>
