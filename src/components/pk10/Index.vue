<template>
    <div class="so-con" id="pk10">
        <!--left siderbar  -->
        <!--用户导航 so-left -->
        <UserNavigation el=".so-menu" ref="navone"/>

        <!--right menu  -->
        <!--right menu
          属性
              el 要绑定到哪个节点上，即点击哪个节点触发
          事件
              play 当用户点击完法说明时触发
      -->
        <UserMenu el=".so-top-zoushi" @play="$refs.playDialog.open()" :payoff="balanceData.payoff" />

        <div class="so-index">
            <div class="so-in-top">
                <ul>
                    <li class="so-menu">
                        <img src="/static/images/top/icon-menu.png" class="so-top-menu">
                    </li>
                    <li>
                        <img src="/static/images/top/logo_bjpk10.png" class="so-top-logo">
                    </li>
                    <li class="purse">
                        <img src="/static/images/top/sjinbi.png" class="so-top-sum">
                        <div class="so-in-top-sum">
                            {{ fortMoney(roundAmt(balanceData.balance), 2)}}
                        </div>
                    </li>
                    <li class="so-top-zoushi">
                        <img src="/static/images/top/zoushi.png">
                    </li>
                </ul>
            </div>
            <div class="so-in-main">
                <div>
                    <div class="so-main-top">
                        <div class="so-m-t-left">
                            <div>
                                第<span class="last-date"> {{previous_pcode.toString().substr(4, 8)}}</span> 期
                            </div>
                            <div>
                                <a href="/publicTemplate/pastView">
                                    <p>
                                        查看往期
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div class="so-m-t-right">
                            <div class="last-open-num">
                                <ul class="pk10_top_number">
                                    <li v-for="item in winNumber.split(',')"><span class="pk10_ball small_ball" :class="'ball num_'+item"> </span></li>
                                    <!-- <li><span class="pk10_ball small_ball num_10"></span></li> -->

                                </ul>
                            </div>
                            <div class="last-open-dou">
                                <ul class="pk10_top_detail">
                                    <li>{{lastTermStatic.lh_1}}</li>
                                    <li>{{lastTermStatic.lh_2}}</li>
                                    <li>{{lastTermStatic.lh_3}}</li>
                                    <li>{{lastTermStatic.lh_4}}</li>
                                    <li>{{lastTermStatic.lh_5}}</li>
                                    <li>{{lastTermStatic.top2_doubler}}</li>
                                    <li>{{lastTermStatic.top2_sizer}}</li>
                                    <li>{{lastTermStatic.top2_total}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                  <!--  <div class="so-main-down">
                        <ul>
                            <li>
                                <p>
                                    <span class="now-date"> </span> 期
                                </p>
                            </li>
                            <li>
                                <i></i>
                                <span>封盘</span>
                                <a class="close-time">00:00</a>
                            </li>
                            <li>
                                <i></i>
                                <span>开奖</span>
                                <a class="open-time">00:00</a>
                            </li>
                        </ul>
                    </div>-->
                    <CountdownTimer ref="countdownTimer" v-if="now_time && nowover_time"
                                    @countdownOver="playLottery"
                                    @entertainCountdownOver="entertain"
                                    :lotteryID="lotteryID"
                                    :now_pcode="now_pcode"
                                    :start="sys_time" :end="now_time" :overend="nowover_time" />

                </div>
            </div>
            <div class="so-in-con">
                <div class="so-con-left">
                    <ul>
                        <li class="active">两面</li>
                        <li>冠亚和值</li>
                        <li>1-5名</li>
                        <li>6-10名</li>
                    </ul>
                </div>
                <div class="so-con-right bule_bg">
                    <!--以下为盘面不同样式，根据ID+class区分-->
                    <!-- pk10 双面 -->
                    <div id="pk10-item0" class="active pk10_item">
                        <ul>
                            <li class="select-li" v-for="item in doubleSideList">
                                <div class="pk10_panel">
                                    <h2>
                                        {{item.name}}
                                    </h2>
                                    <div>
                                        <p :data-id="itemChild.cid"  v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                            <span :data-val="itemChild.name">{{itemChild.name}}</span>
                                            <span class="bet-times"> {{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                        </p>
                                 <!--       <p data-id="82502">
                                            <span>冠亚小</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82503">
                                            <span>冠亚单</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82504">
                                            <span>冠亚双</span>
                                            <span class="bet-times"> </span>
                                        </p>-->
                                    </div>
                                </div>
                            </li>
                           <!-- <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        冠军
                                    </h2>
                                    <div>
                                        <p data-id="81101">
                                            <span>大</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81102">
                                            <span>小</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81103">
                                            <span>单</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81104">
                                            <span>双</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81105">
                                            <span>龙</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81106">
                                            <span>虎</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        亚军
                                    </h2>
                                    <div>
                                        <p data-id="81201">
                                            <span>大</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81202">
                                            <span>小</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81203">
                                            <span>单</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81204">
                                            <span>双</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81205">
                                            <span>龙</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81206">
                                            <span>虎</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第三名
                                    </h2>
                                    <div>
                                        <p data-id="81301">
                                            <span>大</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81302">
                                            <span>小</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81303">
                                            <span>单</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81304">
                                            <span>双</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81305">
                                            <span>龙</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81306">
                                            <span>虎</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第四名
                                    </h2>
                                    <div>
                                        <p data-id="81401">
                                            <span>大</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81402">
                                            <span>小</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81403">
                                            <span>单</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81404">
                                            <span>双</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81405">
                                            <span>龙</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81406">
                                            <span>虎</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第五名
                                    </h2>
                                    <div>
                                        <p data-id="81501">
                                            <span>大</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81502">
                                            <span>小</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81503">
                                            <span>单</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81504">
                                            <span>双</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81505">
                                            <span>龙</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81506">
                                            <span>虎</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第六名
                                    </h2>
                                    <div>
                                        <p data-id="81601">
                                            <span>大</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81602">
                                            <span>小</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81603">
                                            <span>单</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81604">
                                            <span>双</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第七名
                                    </h2>
                                    <div>
                                        <p data-id="81701	">
                                            <span>大</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="817012">
                                            <span>小</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="817013">
                                            <span>单</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="817014">
                                            <span>双</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第八名
                                    </h2>
                                    <div>
                                        <p data-id="81801">
                                            <span>大</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81802">
                                            <span>小</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81803">
                                            <span>单</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81804">
                                            <span>双</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第九名
                                    </h2>
                                    <div>
                                        <p data-id="81901">
                                            <span>大</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81902">
                                            <span>小</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81903">
                                            <span>单</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="81904">
                                            <span>双</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第十名
                                    </h2>
                                    <div>
                                        <p data-id="82401">
                                            <span>大</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82402">
                                            <span>小</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82403">
                                            <span>单</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82404">
                                            <span>双</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>-->
                        </ul>
                    </div>
                    <!-- pk10 冠亚和值 -->
                    <div id="pk10-item1" class="pk10_item" style="display:none;">
                        <ul>
                            <li class="select-li" v-for="item in oneToFiveList">
                                <div class="pk10_panel">
                                    <h2>
                                        {{item.name}}
                                    </h2>
                                    <div>
                                        <p :data-id="itemChild.cid"  v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                            <span :data-val="itemChild.name">{{itemChild.name}}</span>
                                            <span class="bet-times"> {{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                        </p>
                                      <!--  <p data-id="82102">
                                            <span>4</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82103">
                                            <span>5</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82104">
                                            <span>6</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82105">
                                            <span>7</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82106">
                                            <span>8</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82107">
                                            <span>9</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82108">
                                            <span>10</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82109">
                                            <span>11</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82110">
                                            <span>12</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82111">
                                            <span>13</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82112">
                                            <span>14</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82113">
                                            <span>15</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82114">
                                            <span>16</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82115">
                                            <span>17</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82116">
                                            <span>18</span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="82117">
                                            <span>19</span>
                                            <span class="bet-times"> </span>
                                        </p>-->
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- pk10 1-5名-->
                    <div id="pk10-item2" class="pk10_item" style="display:none;">
                        <ul>
                            <li class="select-li" v-for="item in frontCenterBackList">
                                <div class="pk10_panel">
                                    <h2>
                                        {{item.name}}
                                    </h2>
                                    <div>
                                        <p :data-id="itemChild.cid"  v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                            <span class="pk10_num_bg" :data-val="itemChild.name">
                                                <span class="pk10_ball" :class="'num_0'+itemChild.name" v-if="itemChild.name<10"></span>
                                                <span class="pk10_ball" :class="'num_'+itemChild.name" v-else></span>
                                            </span>
                                            <span class="bet-times"> {{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                        </p>
                                      <!--  <p data-id="83102">
                                            <span class="pk10_num_bg">2<span class="pk10_ball num_02"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83103">
                                            <span class="pk10_num_bg">3<span class="pk10_ball num_03"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83104">
                                            <span class="pk10_num_bg">4<span class="pk10_ball num_04"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83105">
                                            <span class="pk10_num_bg">5<span class="pk10_ball num_05"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83106">
                                            <span class="pk10_num_bg">6<span class="pk10_ball num_06"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83107">
                                            <span class="pk10_num_bg">7<span class="pk10_ball num_07"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83108">
                                            <span class="pk10_num_bg">8<span class="pk10_ball num_08"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83109">
                                            <span class="pk10_num_bg">9<span class="pk10_ball num_09"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83110">
                                            <span class="pk10_num_bg">10<span class="pk10_ball num_10"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>-->
                                    </div>
                                </div>
                            </li>
                          <!--  <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        亚军
                                    </h2>
                                    <div>
                                        <p data-id="83201">
                                            <span class="pk10_num_bg">1<span class="pk10_ball num_01"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83202">
                                            <span class="pk10_num_bg">2<span class="pk10_ball num_02"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83203">
                                            <span class="pk10_num_bg">3<span class="pk10_ball num_03"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83204">
                                            <span class="pk10_num_bg">4<span class="pk10_ball num_04"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83205">
                                            <span class="pk10_num_bg">5<span class="pk10_ball num_05"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83206">
                                            <span class="pk10_num_bg">6<span class="pk10_ball num_06"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83207">
                                            <span class="pk10_num_bg">7<span class="pk10_ball num_07"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83208">
                                            <span class="pk10_num_bg">8<span class="pk10_ball num_08"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83209">
                                            <span class="pk10_num_bg">9<span class="pk10_ball num_09"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83210	">
                                            <span class="pk10_num_bg">10<span class="pk10_ball num_10"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第三名
                                    </h2>
                                    <div>
                                        <p data-id="83301">
                                            <span class="pk10_num_bg">1<span class="pk10_ball num_01"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83302">
                                            <span class="pk10_num_bg">2<span class="pk10_ball num_02"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83303">
                                            <span class="pk10_num_bg">3<span class="pk10_ball num_03"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83304">
                                            <span class="pk10_num_bg">4<span class="pk10_ball num_04"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83305">
                                            <span class="pk10_num_bg">5<span class="pk10_ball num_05"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83306">
                                            <span class="pk10_num_bg">6<span class="pk10_ball num_06"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83307">
                                            <span class="pk10_num_bg">7<span class="pk10_ball num_07"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83308">
                                            <span class="pk10_num_bg">8<span class="pk10_ball num_08"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83309">
                                            <span class="pk10_num_bg">9<span class="pk10_ball num_09"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83310	">
                                            <span class="pk10_num_bg">10<span class="pk10_ball num_10"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第四名
                                    </h2>
                                    <div>
                                        <p data-id="83401">
                                            <span class="pk10_num_bg">1<span class="pk10_ball num_01"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83402">
                                            <span class="pk10_num_bg">2<span class="pk10_ball num_02"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83403">
                                            <span class="pk10_num_bg">3<span class="pk10_ball num_03"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83404">
                                            <span class="pk10_num_bg">4<span class="pk10_ball num_04"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83405">
                                            <span class="pk10_num_bg">5<span class="pk10_ball num_05"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83406">
                                            <span class="pk10_num_bg">6<span class="pk10_ball num_06"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83407">
                                            <span class="pk10_num_bg">7<span class="pk10_ball num_07"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83408">
                                            <span class="pk10_num_bg">8<span class="pk10_ball num_08"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83409">
                                            <span class="pk10_num_bg">9<span class="pk10_ball num_09"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83410">
                                            <span class="pk10_num_bg">10<span class="pk10_ball num_10"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第五名
                                    </h2>
                                    <div>
                                        <p data-id="83501">
                                            <span class="pk10_num_bg">1<span class="pk10_ball num_01"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83502">
                                            <span class="pk10_num_bg">2<span class="pk10_ball num_02"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83503">
                                            <span class="pk10_num_bg">3<span class="pk10_ball num_03"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83504">
                                            <span class="pk10_num_bg">4<span class="pk10_ball num_04"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83505">
                                            <span class="pk10_num_bg">5<span class="pk10_ball num_05"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83506">
                                            <span class="pk10_num_bg">6<span class="pk10_ball num_06"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83507">
                                            <span class="pk10_num_bg">7<span class="pk10_ball num_07"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83508">
                                            <span class="pk10_num_bg">8<span class="pk10_ball num_08"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83509">
                                            <span class="pk10_num_bg">9<span class="pk10_ball num_09"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="83510">
                                            <span class="pk10_num_bg">10<span class="pk10_ball num_10"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>-->
                        </ul>
                    </div>
                    <!-- pk10 6-10名-->
                    <div id="pk10-item3" class="pk10_item" style="display:none;">
                        <ul>
                            <li class="select-li" v-for="item in frontLastBackList">
                                <div class="pk10_panel">
                                    <h2>
                                        {{item.name}}
                                    </h2>
                                    <div>
                                        <p :data-id="itemChild.cid"  v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                            <span class="pk10_num_bg" :data-val="itemChild.name">
                                                <span class="pk10_ball" :class="'num_0'+itemChild.name" v-if="itemChild.name<10"></span>
                                                <span class="pk10_ball" :class="'num_'+itemChild.name" v-else></span>
                                            </span>
                                            <span class="bet-times"> {{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                        </p>
                                       <!-- <p data-id="84102">
                                            <span class="pk10_num_bg">2<span class="pk10_ball num_02"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84103">
                                            <span class="pk10_num_bg">3<span class="pk10_ball num_03"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84104">
                                            <span class="pk10_num_bg">4<span class="pk10_ball num_04"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84105">
                                            <span class="pk10_num_bg">5<span class="pk10_ball num_05"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84106">
                                            <span class="pk10_num_bg">6<span class="pk10_ball num_06"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84107">
                                            <span class="pk10_num_bg">7<span class="pk10_ball num_07"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84108">
                                            <span class="pk10_num_bg">8<span class="pk10_ball num_08"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84109">
                                            <span class="pk10_num_bg">9<span class="pk10_ball num_09"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84110">
                                            <span class="pk10_num_bg">10<span class="pk10_ball num_10"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>-->
                                    </div>
                                </div>
                            </li>
                           <!-- <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第七名
                                    </h2>
                                    <div>
                                        <p data-id="84201">
                                            <span class="pk10_num_bg">1<span class="pk10_ball num_01"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84202">
                                            <span class="pk10_num_bg">2<span class="pk10_ball num_02"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84203">
                                            <span class="pk10_num_bg">3<span class="pk10_ball num_03"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84204">
                                            <span class="pk10_num_bg">4<span class="pk10_ball num_04"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84205">
                                            <span class="pk10_num_bg">5<span class="pk10_ball num_05"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84206">
                                            <span class="pk10_num_bg">6<span class="pk10_ball num_06"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84207">
                                            <span class="pk10_num_bg">7<span class="pk10_ball num_07"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84208">
                                            <span class="pk10_num_bg">8<span class="pk10_ball num_08"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84209">
                                            <span class="pk10_num_bg">9<span class="pk10_ball num_09"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84210">
                                            <span class="pk10_num_bg">10<span class="pk10_ball num_10"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第八名
                                    </h2>
                                    <div>
                                        <p data-id="84301">
                                            <span class="pk10_num_bg">1<span class="pk10_ball num_01"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84302">
                                            <span class="pk10_num_bg">2<span class="pk10_ball num_02"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84303">
                                            <span class="pk10_num_bg">3<span class="pk10_ball num_03"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84304">
                                            <span class="pk10_num_bg">4<span class="pk10_ball num_04"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84305">
                                            <span class="pk10_num_bg">5<span class="pk10_ball num_05"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84306">
                                            <span class="pk10_num_bg">6<span class="pk10_ball num_06"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84307">
                                            <span class="pk10_num_bg">7<span class="pk10_ball num_07"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84308">
                                            <span class="pk10_num_bg">8<span class="pk10_ball num_08"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84309">
                                            <span class="pk10_num_bg">9<span class="pk10_ball num_09"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84310">
                                            <span class="pk10_num_bg">10<span class="pk10_ball num_10"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第九名
                                    </h2>
                                    <div>
                                        <p data-id="84401">
                                            <span class="pk10_num_bg">1<span class="pk10_ball num_01"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84402">
                                            <span class="pk10_num_bg">2<span class="pk10_ball num_02"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84403">
                                            <span class="pk10_num_bg">3<span class="pk10_ball num_03"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84404">
                                            <span class="pk10_num_bg">4<span class="pk10_ball num_04"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84405">
                                            <span class="pk10_num_bg">5<span class="pk10_ball num_05"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84406">
                                            <span class="pk10_num_bg">6<span class="pk10_ball num_06"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84407">
                                            <span class="pk10_num_bg">7<span class="pk10_ball num_07"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84408">
                                            <span class="pk10_num_bg">8<span class="pk10_ball num_08"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84409">
                                            <span class="pk10_num_bg"> 9<span class="pk10_ball num_09"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84410">
                                            <span class="pk10_num_bg">10<span class="pk10_ball num_10"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="select-li">
                                <div class="pk10_panel">
                                    <h2>
                                        第十名
                                    </h2>
                                    <div>
                                        <p data-id="84501">
                                            <span class="pk10_num_bg">1<span class="pk10_ball num_01"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84502">
                                            <span class="pk10_num_bg">2<span class="pk10_ball num_02"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84503">
                                            <span class="pk10_num_bg">3<span class="pk10_ball num_03"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84504">
                                            <span class="pk10_num_bg">4<span class="pk10_ball num_04"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84505">
                                            <span class="pk10_num_bg">5<span class="pk10_ball num_05"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84506">
                                            <span class="pk10_num_bg">6<span class="pk10_ball num_06"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84507">
                                            <span class="pk10_num_bg">7<span class="pk10_ball num_07"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84508">
                                            <span class="pk10_num_bg">8<span class="pk10_ball num_08"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84509">
                                            <span class="pk10_num_bg">9<span class="pk10_ball num_09"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                        <p data-id="84510">
                                            <span class="pk10_num_bg">10<span class="pk10_ball num_10"></span></span>
                                            <span class="bet-times"> </span>
                                        </p>
                                    </div>
                                </div>
                            </li>-->
                        </ul>
                    </div>
                </div>
                <div class="so-clear"></div>
            </div>
        </div>

        <!--
       下注组件
           属性
               :lotteryID="lotteryID"  彩种id
               :betSelectedList="betSelectedList"  用户选中的赌注
               :parentRefs="$refs"   当前页面的引用
               :balance="balanceData.balance"  帐单值
               :now_pcode="now_pcode"   期次
               :next_pcode="next_pcode"   下期期次
               :now_day="now_day"    日期
           事件
               @betSuccess="resetAction"
       -->
        <Bet :lotteryID="lotteryID" @betSuccess="resetAction"
             :betSelectedList="betSelectedList"
             :parentRefs="$refs"
             :balance="balanceData.balance" :now_pcode="now_pcode" :next_pcode="next_pcode" :now_day="now_day" />

        <!--封盘底部遮挡-->
        <div v-if="entertainStatus" class="so-fengpan">
            <a>已封盘</a>
        </div>

        <!--玩法说明-->
        <div class="so-pop-wanfa modal">
            <div class="m_content">
                <h2>北京PK10游戏玩法<a></a></h2>
                <div class="content">
                    <div class="playtext">
                        <h3>一、两面玩法</h3>
                        <h4>冠亚和：冠军车号＋亚军车号＝冠亚和值（为3~19)</h4>
                        <p>冠亚和大：“冠亚和值”大于或等于12时投注“大”的注单视为中奖，其余视为不中奖。</p>
                        <p>冠亚和小：“冠亚和值”小于或等于11时投注“小”的注单视为中奖，其余视为不中奖。</p>
                        <p>冠亚和单：“冠亚和值”为单视为投注“单”的注单视为中奖，其余视为不中奖。</p>
                        <p>冠亚和双：“冠亚和值”为双视为投注“双”的注单视为中奖，其余视为不中奖。</p>
                        <h4>冠军～第十名</h4>
                        <p>大、小：开出之号码大于或等于6为大，小于或等于5为小。</p>
                        <p>单、双：号码为双数叫双，如4、8；号码为单数叫单，如5、9。</p>
                        <h4>冠军～第五名 龙虎</h4>
                        <p>冠军 龙/虎：“第一名”车号大于“第十名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>
                        <p>亚军 龙/虎：“第二名”车号大于“第九名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>
                        <p>第三名 龙/虎：“第三名”车号大于“第八名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>
                        <p>第四名 龙/虎：“第四名”车号大于“第七名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>
                        <p>第五名 龙/虎：“第五名”车号大于“第六名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</p>
                        <h3>二、冠亚和值玩法</h3>
                        <p>冠亚和值：“冠亚和值”可能出现的结果为3～19， 投中对应“冠亚和值”数字的视为中奖，其余视为不中奖。</p>
                        <h3>三、1-5名玩法</h3>
                        <h4>冠军～第五名</h4>
                        <p>车号指定：每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。</p>
                        <h3>四、6-10名玩法</h3>
                        <h4>第六名～第十名</h4>
                        <p>车号指定：每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。</p>
                    </div>
                </div>
                <div class="action">
                    <a class="ok">确定</a>
                </div>
            </div>
        </div>


        <!--请输入投注金额-->
        <div class="modal m08">
            <div class="m_content">
                <h2 class="noclose"><a></a></h2>
                <div class="content danger">
                    <div>
                        <img src="/static/images/pop/title_tip.png">
                        <img src="/static/images/page/status03.svg">
                    </div >
                    <span class="bet-error-content"> 请输入整数的投注金额，金额不能为0 </span>
                </div>
            </div>
        </div>
        <!--本期投注已结束-->
        <div class="modal m12">
            <div class="m_content">
                <h2 class="noclose"><a></a></h2>
                <div class="content danger">
                    <div>
                        <img src="/static/images/pop/title_end.png">
                        <img src="/static/images/page/status03.svg">
                    </div>
                    请至下期继续投注
                </div>
            </div>
        </div>
        <!--下注弹窗_成功-->
        <div class="modal m09">
            <div class="m_content">
                <img class="bet_ok" src="/static/images/pop/ok_light.png">
                <h2 class="noclose"><a></a></h2>
                <div class="content check">
                    <div>
                        <img src="/static/images/pop/title_bet_ok.png">
                        <img src="/static/images/icon_check.svg">
                    </div>
                    您已成功支付<br/>请随时关注开奖信息！
                </div>
            </div>
        </div>
        <!--下注弹窗_失败-->
        <div class="modal m10">
            <div class="m_content">
                <h2 class="noclose"><a></a></h2>
                <div class="content danger">
                    <div>
                        <img src="/static/images/pop/title_bet_fail.png">
                        <img src="/static/images/page/status03.svg">
                    </div>
                    <span class="submit-error-content">您的余额不足 <br/>请充值后继续进行！</span>
                </div>
            </div>
        </div>
        <!-- 确认对话框API
                       text  对话框提示内容
                   -->
        <InfoDialog ref="infoDialog" text="请您继续投注" />

        <!--自动关闭（闪屏）对话框API
            属性
                text  对话框提示内容
                type  对话框类型，可以是 static/images/pop/ 目录下任意图片，像title_quantity、title_tip
            方法
                open(text, type)
        -->
        <AutoCloseDialog ref="autoCloseDialog" text="您的余额不足" type="" />

        <BetSuccessfulDialog ref="betSuccessfulDialog" />


    <!--玩法说明对话框
        方法：
            open 打开对话框
            close 关闭对话框
    -->
    <PlayDialog ref="playDialog" />


    </div>
  
</template>



<script>
    import "../../../static/css/pk10.css"
    import UserNavigation from '@/components/publicTemplate/UserNavigation'
    import UserMenu from '@/components/publicTemplate/UserMenu'
    import InfoDialog from '@/components/publicTemplate/InfoDialog'
    import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
    import BetSuccessfulDialog from '@/components/publicTemplate/BetSuccessfulDialog'
    import CountdownTimer from '@/components/publicTemplate/CountdownTimer'

    import Bet from '@/components/publicTemplate/Bet'
    import PlayDialog from '@/components/cqssc/PlayDialog'
    import Mixin from '@/Mixin'
export default {
    name: 'pk10Index',
    mixins:[Mixin],
    components: {
        CountdownTimer,
        BetSuccessfulDialog,
        Bet,
        UserNavigation,
        UserMenu,
        InfoDialog,
        AutoCloseDialog,
        PlayDialog
    },
    data :function() {
        return {
            now_time:'',  // 当前期数销售截止时间
            nowover_time:'',  // 当前期数封盘时间
            next_pcode:'',  // 下一期数
            now_pcode:0,  // 当前期数
            previous_pcode:'',//上一期期数
            winNumber:'',    //上期开奖号
            lastTermStatic:'',  //上期开奖数据统计
            sys_time :'',  // 当前系统时间
            now_day:'',  // 当前日期
            balanceData:{},
            entertainStatus:false,
            betSelectedList:[],   //用户选中的注数
            playTreeList:[], //玩法树
            lotteryID:8 ,
            allLottery:{} ,
            gameHref:{} ,
            kinds:['两面', '冠亚和值', '1-5名','6-10名'],
        }
    },
    created:function(){
        this.getMemberBalance().then(()=>{
            this.loadPlayTree(this.lotteryID);  // 玩法树，彩种id 为2
        });
    },
    mounted:function() {
        var lotteryid = this.lotteryID ; // 彩种id
        var lotteryname = '北京PK10' ; // 彩种名称
        this.setCookie('lt_lotteryid',lotteryid) ; // 彩种id
        this.setCookie('lottery_name',lotteryname) ; // 彩种名称
        this.allLottery = this.$refs.navone.getLotterys() ;
        this.gameHref = this.$refs.navone.gameHref ; // 拿子组件的值

        setTimeout(() => {
            this.timerBegin();
        }, 500) ;

    },
    computed:{
        doubleSideList:function(){ // 两面
            return this.getListByParentID(81000);
        },
        oneToFiveList:function(){ // 冠亚和值
            return this.getListByParentID(82000);
        },
        frontCenterBackList:function(){ // 1-5名
            return this.getListByParentID(83000);
        },
        frontLastBackList:function(){ // 6-10名
            return this.getListByParentID(84000);
        },
    },
    methods:{
        switchTab:function(e){
            const $src = $(e.currentTarget);
            const index = $src.index();
            const $tabs = $('.so-con-right > div');
            $tabs.hide();
            $tabs.eq(index).show();
            $src.addClass('active').siblings().removeClass('active')
        },
        getListByParentID:function(parentID){
            return this.playTreeList.filter((item,i)=>{
                return item.parentId == parentID;
            });
        },
        //开奖倒计时结束后处理
        playLottery:function(){
            this.$refs.infoDialog.open('请至下期继续投注', 'title_end')
            this.timerBegin();
        },
        //封盘倒计时结束后处理
        entertain:function(){
            this.entertainStatus = true;
            this.resetAction();
        },
        timerBegin:function(){
            this.getSystemTime().then((sys_time)=>{
                this.sys_time = sys_time;
                this.priodDataNewly(this.lotteryID, sys_time).then(res=>{
                    this.next_pcode = res.data[0].pcode;  // 下期期数
                    this.now_pcode = res.data[1].pcode;  // 当前期数
                    this.previous_pcode = res.data[2].pcode;  // 上期期数
                    // 当前期数时间
                    this.now_time = this.formatTimeUnlix(res.data[1].endTime);
                    // 当前期封盘时间
                    this.nowover_time = this.formatTimeUnlix(res.data[1].prizeCloseTime);
                    // 当天日期
                    this.now_day = ( res.data[1].pcode).toString().substr(0, 8);
                    let code = res.data[2].winNumber;
                    //code 上期开奖号码
                    if (!code) {
                        code='20,20,20,20,20,20,20,20,20,20';
                    }
                    this.winNumber = code;
                    //上期开奖统计
                    this.lastTermStatic = res.data[2].doubleData;

                    // this.processCode( res.data[1].pcode, res.data[2].pcode, res.data[2].winNumber,res.data[2].doubleData) ;
                    this.$refs.countdownTimer && this.$refs.countdownTimer.timerInit();
                });
            });
            this.entertainStatus = false;
        },
        resetAction:function(){
            this.betSelectedList = [];
            $(".so-con-right p").removeClass('active');
            this.getMemberBalance() ; // 更新余额
        },
        //当用户选择球时，保存相应数据
        betSelect:function(e, item, parentItem){
            // if (this.entertainStatus){
            //     return false;
            // }
            var $src = $(e.currentTarget);
            if ($src.prop('class').indexOf('active') < 0){
                $src.addClass('active');
                item.parentItem = parentItem;
                this.betSelectedList.push(item);
            }else{
                $src.removeClass('active');
                this.betSelectedList = this.betSelectedList.filter((selected)=>{ return selected.cid != item.cid; });
            }
        },


        // play:function(){
        //     this.$refs.playDialog.open()
        // }

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pk10_item ul li .pk10_panel > div p> .pk10_num_bg:first-child, .pk10_item ul li .pk10_panel > div p.active> .pk10_num_bg:first-child  {
        color: transparent;
    }
</style>
