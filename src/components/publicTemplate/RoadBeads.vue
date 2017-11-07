<template>

    <div id="pa_con">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="/static/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center lottery_name">{{lotteryName}} 路珠</h2>
            <div class="right">
                <div class="so-top-zoushi">
                    <img src="/static/images/top/zoushi.png">
                </div>
            </div>
        </header>

        <div id="pa_content">
            <div id="road01" class="tab_container tabBox">
                <div class="hd">
                    <ul :class="'tab tab01 tab_mid ' + (!(['4','16','18'].includes(lotteryID))?'tab_three':'')">
                        <li class="on" data-tab="road01_1" data-val="1"><a href="javascript:;">总和大小</a></li>
                        <li data-tab="road01_2" data-val="1" v-if="!(['6','20','22'].includes(lotteryID))"><a href="javascript:;">总和单双</a></li>
                        <li data-tab="road01_4" data-val="1" class="jxsyxw_tab"  v-if="!(['2','12','14','6','20','22'].includes(lotteryID))"><a href="javascript:;">总和尾大小</a></li>
                        <li data-tab="road01_3" data-val="1"><a href="javascript:;" v-if="!(['6','20','22'].includes(lotteryID))">龙 虎</a></li>
                    </ul>
                </div>
                <div class="bd">
                    <!-- 总和大小 -->
                    <RoadBeadItem id="road01_1" :dataResult="dataResult.total_size" class="tab_content_out on" />

                    <!-- 总和单双 -->
                    <RoadBeadItem id="road01_2" v-if="!(['6','20','22'].includes(lotteryID))" :dataResult="dataResult.total_sd" class="tab_content_out" />

                    <!-- 总和尾大小 11 选5 才有 -->
                    <RoadBeadItem id="road01_4" v-if="!(['2', '6','20','22'].includes(lotteryID))" :dataResult="dataResult.totalEnd_size" class="tab_content_out" />

                    <!-- 龙虎 -->
                    <RoadBeadItem id="road01_3" v-if="!(['6','20','22'].includes(lotteryID))" :dataResult="dataResult.total_lhh" class="tab_content_out" />
                </div>
            </div>
            <div id="road02" class="tab_container tabBox" v-if="!(['6','20','22'].includes(lotteryID))">
                <div class="hd">
                    <ul class="tab tab02 tab_mid tab_five">
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
                </div>
            </div>
        </div>
        <footer id="pa_foot"></footer>
        <div class="so-shade"></div>

        <InfoDialog ref="infoDialog" text="请您继续投注" />
    </div>

</template>

<script>
    import Mixin from '@/Mixin'
    import $ from "jquery";
    import InfoDialog from '@/components/publicTemplate/InfoDialog'
    import RoadBeadItem from '@/components/publicTemplate/RoadBeadItem'

    export default {
        name: 'RoadBeads',
        mixins:[Mixin],
        data :function() {
            return {
                lotteryID:this.getCookie('lt_lotteryid'),
                lotteryName:this.getCookie('lottery_name'),
                dataResult:{},
               // roadbeads:{} ,

            }
        },
        components: {
            RoadBeadItem,
            InfoDialog
        },
    mounted:function() {
        // var lotteryid = this.getCookie('lt_lotteryid') ; // 彩种 id
        // var lotteryname = this.getCookie('lottery_name') ; // 彩种 名称
        // $('.lottery_name').html(lotteryname+' 路珠') ;
        // this.lotteryID = lotteryid;
        this.loadRoadAction(this.lotteryID,'') ;

        // 标签切换
        this.roadChangeTab() ;

        // var lotteryid = getCookie('lt_lotteryid') ; // 彩种 id
        // var lotteryname = getCookie('lottery_name') ; // 彩种 名称
        // $('.lottery_name').html(lotteryname+' 路珠') ;
        // if(lotteryid == '4' || lotteryid == '16' || lotteryid == '18'){ // 江西11选5 广东11选5 山东11选5
        //     $('.jxsyxw_tab').show();
        //     $('.hd ul').removeClass('tab_three');
        // }
        // loadRoadAction(lotteryid,'') ;

        // 标签切换
        // roadChangeTab() ;
        // initRightViewEve() ;
        // initRightViewEve() ;
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
                  // console.log(data.data.size_5) ;
                    this.dataResult = data.data;
                    // this.roadDomAction(data.data.size_1,'road02_1 .dx_size') ;  // 第一球大小 (pk10 冠军)
                    // this.roadDomAction(data.data.sd_1,'road02_1 .ds_dx') ;  // 第一球单双 (pk10 冠军)
                    // this.roadDomAction(data.data.size_2,'road02_2 .dx_size') ;  // 第二球大小 (pk10 亚军)
                    // this.roadDomAction(data.data.sd_2,'road02_2 .ds_dx') ;  // 第二球单双 (pk10 亚军)
                    // this.roadDomAction(data.data.size_3,'road02_3 .dx_size') ;  // 第三球大小 (pk10 第三名)
                    // this.roadDomAction(data.data.sd_3,'road02_3 .ds_dx') ;  // 第三球单双 (pk10 第三名)

                    // switch (lotteryid){
                    //     case '6' :   // 江苏K3
                    //     case '20' :  // 安徽K3
                    //     case '22' :  // 湖北K3
                    //         // this.roadDomAction(data.data.total_size,'road01_1');
                    //         break;
                    //     case '4' :    // 江西11选5
                    //     case '16' :    // 广东11选5 双面盘
                    //     case '18' :    // 山东11选5 双面盘
                    //         this.roadDomAction(data.data.total_size,'road01_1') ;  // 路珠总和大小
                    //         this.roadDomAction(data.data.total_sd,'road01_2') ;  // 路珠总和单双
                    //         this.roadDomAction(data.data.total_lhh,'road01_3') ;  // 路珠龙虎
                    //         this.roadDomAction(data.data.totalEnd_size,'road01_4') ;  // 总和尾大小
                    //         break;
                    //     default :
                    //         this.roadDomAction(data.data.total_size,'road01_1') ;  // 路珠总和大小
                    //         this.roadDomAction(data.data.total_sd,'road01_2') ;  // 路珠总和单双
                    //         this.roadDomAction(data.data.total_lhh,'road01_3') ;  // 路珠龙虎
                    //         this.roadDomAction(data.data.size_4,'road02_4 .dx_size') ;  // 第四球大小
                    //         this.roadDomAction(data.data.sd_4,'road02_4 .ds_dx') ;  // 第四球单双
                    //         this.roadDomAction(data.data.size_5,'road02_5 .dx_size') ;  // 第五球大小
                    //         this.roadDomAction(data.data.sd_5,'road02_5 .ds_dx') ;  // 第五球单双
                    //         break;
                    // }
                }).bind(this),
                error: function (data) {  // 错误提示
                    this.$refs.infoDialog.open('您的登录已过期，请重新登录', 'title_tip')
                    // initPopEve(2,'您的登录已过期，请重新登录') ;
                    return false ;

                }
            });
        },

        /*
        *  路珠总和大小数据处理，resdata 数据，cid 选择器，color 球的颜色
        *  和=蓝mid   龙=紅big  虎=绿tiger  大=紅big   小=绿tiger  单=紅big  双=绿tiger
        * */
        // roadDomAction:function (resdata,cid) {
        //     var ts = '' ;
        //     for(var i=0;i<resdata.length;i++){  // 总和大小
        //         if(resdata[i].length>5){
        //             ts +=' <li class="road road_left">'+
        //                 '<ul>' ;
        //         }else{
        //             ts +=' <li class="road">'+
        //                 '<ul>' ;
        //         }
        //         for(var ii=0;ii<resdata[i].length;ii++){
        //             var rescon = resdata[i][ii] ;
        //             var color = 'mid' ;
        //             switch (rescon) {
        //                 case '和':
        //                     color = 'mid' ;
        //                     break;
        //                 case '龙':
        //                 case '大':
        //                 case '单':
        //                     color = 'big' ;
        //                     break;
        //                 case '虎':
        //                 case '小':
        //                 case '双':
        //                     color = 'tiger' ;
        //                     break;
        //                 default :
        //                     color = 'mid' ;
        //                     break;
        //             }
        //             ts += '<li class="'+color+'">'+resdata[i][ii]+'</li>' ;
        //         }
        //         ts += '</ul>'+
        //             '</li>' ;
        //     }
        //     $('#'+cid).html(ts) ;

        // },


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

}
</script>

<style scoped>
    /*.hd>ul>li { width: 25%; }*/
</style>
