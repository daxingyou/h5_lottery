<template>
<div id="pk10">
    <div id="pa_con">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="/static/frist/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">北京PK10 路珠</h2>
            <div class="right">

            </div>
        </header>

        <div id="pa_content">
            <div id="road01" class="tab_container tabBox">
                <div class="hd">
                    <ul class="tab tab01 tab_mid tab_two">
                        <li class="on" data-tab="road01_1" data-val="1"><a href="javascript:;">冠亚和大小</a></li>
                        <li data-tab="road01_2" data-val="1"><a href="javascript:;">冠亚和单双</a></li>
                    </ul>
                </div>
                <div class="bd" >
                    <!-- 冠亚和大小 -->
                    <ul id="road01_1" class="tab_content tab_content_out on">

                    </ul>
                    <ul id="road01_2" class="tab_content tab_content_out">

                    </ul>
                </div>
            </div>
            <div id="road02" class="tab_container tabBox">
                <div class="hd">
                    <ul class="tab tab02 tab_mid tab_five">
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
                </div>
                <div class="bd">
                    <div id="road02_1" class="tab_content_out on">
                        <ul class="tab_content dx_size">
                            <!-- <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="tiger">虎</li>
                                     <li class="tiger">虎</li>
                                     <li class="tiger">虎</li>
                                     <li class="tiger">虎</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="dragon">龙</li>
                                     <li class="dragon">龙</li>
                                     <li class="dragon">龙</li>
                                     <li class="dragon">龙</li>
                                     <li class="dragon">龙</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="mid">和</li>
                                     <li class="mid">和</li>
                                     <li class="mid">和</li>
                                     <li class="mid">和</li>
                                     <li class="mid">和</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="dragon">龙</li>
                                     <li class="mid">和</li>
                                     <li class="big">大</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="dragon">龙</li>
                                     <li class="mid">和</li>
                                     <li class="big">大</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="dragon">龙</li>
                                     <li class="mid">和</li>
                                     <li class="big">大</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="dragon">龙</li>
                                     <li class="mid">和</li>
                                     <li class="big">大</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>-->
                        </ul>
                        <ul class="tab_content ds_dx">
                            <!-- <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="tiger">虎</li>
                                     <li class="tiger">虎</li>
                                     <li class="tiger">虎</li>
                                     <li class="tiger">虎</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="dragon">龙</li>
                                     <li class="dragon">龙</li>
                                     <li class="dragon">龙</li>
                                     <li class="dragon">龙</li>
                                     <li class="dragon">龙</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="mid">和</li>
                                     <li class="mid">和</li>
                                     <li class="mid">和</li>
                                     <li class="mid">和</li>
                                     <li class="mid">和</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="dragon">龙</li>
                                     <li class="mid">和</li>
                                     <li class="big">大</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="dragon">龙</li>
                                     <li class="mid">和</li>
                                     <li class="big">大</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="dragon">龙</li>
                                     <li class="mid">和</li>
                                     <li class="big">大</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="dragon">龙</li>
                                     <li class="mid">和</li>
                                     <li class="big">大</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>-->
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
                    <div id="road02_6" class="tab_content_out">
                        <ul class="tab_content dx_size">

                        </ul>
                        <ul class="tab_content ds_dx">

                        </ul>
                    </div>
                    <div id="road02_7" class="tab_content_out">
                        <ul class="tab_content dx_size">

                        </ul>
                        <ul class="tab_content ds_dx">

                        </ul>
                    </div>
                    <div id="road02_8" class="tab_content_out">
                        <ul class="tab_content dx_size">

                        </ul>
                        <ul class="tab_content ds_dx">

                        </ul>
                    </div>
                    <div id="road02_9" class="tab_content_out">
                        <ul class="tab_content dx_size">

                        </ul>
                        <ul class="tab_content ds_dx">
                            <!-- <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="tiger">虎</li>
                                     <li class="tiger">虎</li>
                                     <li class="tiger">虎</li>
                                     <li class="tiger">虎</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="dragon">龙</li>
                                     <li class="dragon">龙</li>
                                     <li class="dragon">龙</li>
                                     <li class="dragon">龙</li>
                                     <li class="dragon">龙</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="mid">和</li>
                                     <li class="mid">和</li>
                                     <li class="mid">和</li>
                                     <li class="mid">和</li>
                                     <li class="mid">和</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="dragon">龙</li>
                                     <li class="mid">和</li>
                                     <li class="big">大</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                     <li class="big">大</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="dragon">龙</li>
                                     <li class="mid">和</li>
                                     <li class="big">大</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="dragon">龙</li>
                                     <li class="mid">和</li>
                                     <li class="big">大</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>
                             <li class="road">
                                 <ul>
                                     <li class="tiger">虎</li>
                                     <li class="dragon">龙</li>
                                     <li class="mid">和</li>
                                     <li class="big">大</li>
                                     <li class="small">小</li>
                                 </ul>
                             </li>-->
                        </ul>
                    </div>
                    <div id="road02_10" class="tab_content_out">
                        <ul class="tab_content dx_size">
                            <!--  <li class="road">
                                  <ul>
                                      <li class="tiger">虎</li>
                                      <li class="tiger">虎</li>
                                      <li class="tiger">虎</li>
                                      <li class="tiger">虎</li>
                                      <li class="dragon">龙</li>
                                  </ul>
                              </li>
                              <li class="road">
                                  <ul>
                                      <li class="dragon">龙</li>
                                      <li class="dragon">龙</li>
                                      <li class="dragon">龙</li>
                                      <li class="dragon">龙</li>
                                      <li class="dragon">龙</li>
                                  </ul>
                              </li>
                              <li class="road">
                                  <ul>
                                      <li class="mid">和</li>
                                      <li class="mid">和</li>
                                      <li class="mid">和</li>
                                      <li class="mid">和</li>
                                      <li class="mid">和</li>
                                  </ul>
                              </li>
                              <li class="road">
                                  <ul>
                                      <li class="big">大</li>
                                      <li class="big">大</li>
                                      <li class="big">大</li>
                                      <li class="big">大</li>
                                      <li class="big">大</li>
                                  </ul>
                              </li>
                              <li class="road">
                                  <ul>
                                      <li class="small">小</li>
                                      <li class="small">小</li>
                                      <li class="small">小</li>
                                      <li class="small">小</li>
                                      <li class="small">小</li>
                                  </ul>
                              </li>
                              <li class="road">
                                  <ul>
                                      <li class="tiger">虎</li>
                                      <li class="dragon">龙</li>
                                      <li class="mid">和</li>
                                      <li class="big">大</li>
                                      <li class="small">小</li>
                                  </ul>
                              </li>
                              <li class="road">
                                  <ul>
                                      <li class="big">大</li>
                                      <li class="big">大</li>
                                      <li class="big">大</li>
                                      <li class="big">大</li>
                                      <li class="big">大</li>
                                  </ul>
                              </li>
                              <li class="road">
                                  <ul>
                                      <li class="small">小</li>
                                      <li class="small">小</li>
                                      <li class="small">小</li>
                                      <li class="small">小</li>
                                      <li class="small">小</li>
                                  </ul>
                              </li>
                              <li class="road">
                                  <ul>
                                      <li class="tiger">虎</li>
                                      <li class="dragon">龙</li>
                                      <li class="mid">和</li>
                                      <li class="big">大</li>
                                      <li class="small">小</li>
                                  </ul>
                              </li>
                              <li class="road">
                                  <ul>
                                      <li class="tiger">虎</li>
                                      <li class="dragon">龙</li>
                                      <li class="mid">和</li>
                                      <li class="big">大</li>
                                      <li class="small">小</li>
                                  </ul>
                              </li>
                              <li class="road">
                                  <ul>
                                      <li class="tiger">虎</li>
                                      <li class="dragon">龙</li>
                                      <li class="mid">和</li>
                                      <li class="big">大</li>
                                      <li class="small">小</li>
                                  </ul>
                              </li>-->
                        </ul>
                        <ul class="tab_content ds_dx">
                            <!--<li class="road">
                                <ul>
                                    <li class="tiger">虎</li>
                                    <li class="tiger">虎</li>
                                    <li class="tiger">虎</li>
                                    <li class="tiger">虎</li>
                                    <li class="tiger">虎</li>
                                </ul>
                            </li>
                            <li class="road">
                                <ul>
                                    <li class="dragon">龙</li>
                                    <li class="dragon">龙</li>
                                    <li class="dragon">龙</li>
                                    <li class="dragon">龙</li>
                                    <li class="dragon">龙</li>
                                </ul>
                            </li>
                            <li class="road">
                                <ul>
                                    <li class="mid">和</li>
                                    <li class="mid">和</li>
                                    <li class="mid">和</li>
                                    <li class="mid">和</li>
                                    <li class="mid">和</li>
                                </ul>
                            </li>
                            <li class="road">
                                <ul>
                                    <li class="big">大</li>
                                    <li class="big">大</li>
                                    <li class="big">大</li>
                                    <li class="big">大</li>
                                    <li class="big">大</li>
                                </ul>
                            </li>
                            <li class="road">
                                <ul>
                                    <li class="small">小</li>
                                    <li class="small">小</li>
                                    <li class="small">小</li>
                                    <li class="small">小</li>
                                    <li class="small">小</li>
                                </ul>
                            </li>
                            <li class="road">
                                <ul>
                                    <li class="tiger">虎</li>
                                    <li class="dragon">龙</li>
                                    <li class="mid">和</li>
                                    <li class="big">大</li>
                                    <li class="small">小</li>
                                </ul>
                            </li>
                            <li class="road">
                                <ul>
                                    <li class="big">大</li>
                                    <li class="big">大</li>
                                    <li class="big">大</li>
                                    <li class="big">大</li>
                                    <li class="big">大</li>
                                </ul>
                            </li>
                            <li class="road">
                                <ul>
                                    <li class="small">小</li>
                                    <li class="small">小</li>
                                    <li class="small">小</li>
                                    <li class="small">小</li>
                                    <li class="small">小</li>
                                </ul>
                            </li>
                            <li class="road">
                                <ul>
                                    <li class="tiger">虎</li>
                                    <li class="dragon">龙</li>
                                    <li class="mid">和</li>
                                    <li class="big">大</li>
                                    <li class="small">小</li>
                                </ul>
                            </li>
                            <li class="road">
                                <ul>
                                    <li class="tiger">虎</li>
                                    <li class="dragon">龙</li>
                                    <li class="mid">和</li>
                                    <li class="big">大</li>
                                    <li class="small">小</li>
                                </ul>
                            </li>
                            <li class="road">
                                <ul>
                                    <li class="tiger">虎</li>
                                    <li class="dragon">龙</li>
                                    <li class="mid">和</li>
                                    <li class="big">大</li>
                                    <li class="small">小</li>
                                </ul>
                            </li>-->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <footer id="pa_foot"></footer>
        <div class="so-shade"></div>

    </div>
</div>
</template>



<script>
    import "../../../static/frist/css/pk10.css"
    import Mixin from '@/Mixin'
    // import $ from "jquery";
    
    export default {
        name: 'pk10RoadBeads',
        mixins:[Mixin],
        data :function() {
            return {
               // roadbeads:{} ,

            }
        },
    mounted:function() {
        var lotteryid = this.getCookie('lt_lotteryid') ; // 彩种 id
        var lotteryname = this.getCookie('lottery_name') ; // 彩种 名称
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
                    'Authorization': 'bearer  ' + this.getAccessToken ,
                    // 'sourceType':'2', // 1是pc端，2是h5
                    // 'sideType':'1',  // 1是传统盘，2是双面盘
                },
                url: this.action.forseti + 'api/openNums/loadBead',
                timeout: 600000,
                data: senddata ,
                success: (function(data) {
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

                    this.roadDomAction(data.data.top2_size,'road01_1') ;  // (pk10 冠亚和大小)
                    this.roadDomAction(data.data.top2_sd,'road01_2') ;  // (pk10 冠亚和单双)
                    this.roadDomAction(data.data.size_6,'road02_6 .dx_size') ;  // (pk10 第六名)
                    this.roadDomAction(data.data.sd_6,'road02_6 .ds_dx') ;  // (pk10 第六名)
                    this.roadDomAction(data.data.size_7,'road02_7 .dx_size') ;  // (pk10 第七名)
                    this.roadDomAction(data.data.sd_7,'road02_7 .ds_dx') ;  // (pk10 第七名)
                    this.roadDomAction(data.data.size_8,'road02_8 .dx_size') ;  // (pk10 第八名)
                    this.roadDomAction(data.data.sd_8,'road02_8 .ds_dx') ;  // (pk10 第八名)
                    this.roadDomAction(data.data.size_9,'road02_9 .dx_size') ;  // (pk10 第九名)
                    this.roadDomAction(data.data.sd_9,'road02_9 .ds_dx') ;  // (pk10 第九名)
                    this.roadDomAction(data.data.size_10,'road02_10 .dx_size') ;  // (pk10 第十名)
                    this.roadDomAction(data.data.sd_10,'road02_10 .ds_dx') ;  // (pk10 第十名)
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
                if(resdata[i].length>5){
                    ts +=' <li class="road road_left">'+
                        '<ul>' ;
                }else{
                    ts +=' <li class="road">'+
                        '<ul>' ;
                }
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

}
</script>
