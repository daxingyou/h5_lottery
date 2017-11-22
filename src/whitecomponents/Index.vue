<template>
     <div id="pa_con" class="so-con warp ">
      <!--left siderbar  -->
      <!--用户导航 so-left -->
      <UserNavigation el=".more-games" ref="navone" > </UserNavigation>
      <IndexNavigation el=".btn_leftside" ref="navtwo" > </IndexNavigation>
      <header id="pa_head" class="index_nav_top">
             <div class="left index_side">
                 <a class="btn_leftside" href="javascript:;" v-show="haslogin">
                     <img src="static/white/images/nav.png" alt="">
                 </a>
             </div>
             <h2 class="center logo" v-bind:class="[haslogin ? '' : 'logo_left']"><img src="static/white/images/nav_top_logo.png" alt="宝池彩票"></h2>
             <div class="right">
                 <router-link to="/login" v-show="!haslogin">登录</router-link>
                 <router-link to="/reg" v-show="!haslogin" >注册</router-link>
                 <a href="javascript:;" v-show="!haslogin"  @click="demoPlay()">试玩</a>
                 <!-- <router-link class="login" to="/lobbyTemplate/info" v-show="haslogin" ><i></i><b></b></router-link>--> <!-- 普通用户 -->
                 <a class="guset" href="javascript:;" v-show="haslogin && logintype=='2'" @click="CheckDemoPlay()"><i></i>游客</a>  <!--  试玩帐号 -->
                 <span class="memberaccount" v-show="haslogin && logintype=='1'">{{getCookie('username')}}</span>
                 <a href="javascript:;" v-show="haslogin" @click="loginOut()">退出</a>
             </div>
         </header>
      <div class="news">
          <div id="focus" class="focus">
              <div class="bd">
                  <ul v-for="list in banner">
                      <li>
                          <a href="javascript:;">
                          <img :src="list.url" />
                          </a>
                      </li>
                  </ul>

              </div>
              <div class="hd">
                  <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                  </ul>
              </div>

          </div>
          <div class="marquee">
              <div class="news_title">
                  <i data-v-1f83ba94="" class="icon-notification"></i>
                  <span>最新消息 : </span>
              </div>
              <div id="marquee_snp" class="bd news_text slideText">
                  <div class="sys-notice">
                      <div class="bd">

                               <!-- <marquee scrollamount="3"> &lt;!&ndash;{{bulletins}}&ndash;&gt; 123,新增公告Adam测试2新增公告Adam测试新增公告3Adam测试新增公告4Adam测试新增公告5Adam测试6新增公告Adam测试 </marquee>-->
                              <!--  <marquee align="left" behavior="scroll" direction="left" hspace="0" vspace="0" loop="-1" scrollamount="2" scrolldelay="30">
                                    {{bulletins}}
                                </marquee>-->

                                 <!-- <div >
                                      <vue-marquee :content="bulletins" class="two"  :showtwo="false" >
                                      </vue-marquee>
                                      <vue-marquee content=" 00" class="two"  :showtwo="false" >
                                      </vue-marquee>
                                  </div>-->
                                 <!-- <div class="marquee-wrap" style="width:80%;">
                                      <vue-marquee content="发动机咖啡大家开个会尽快发货更好的非结构化健康法规尽快发货股份共计花费对符合国家开发和国家开发" class="two"  :showtwo="false" >

                                      </vue-marquee>
                                  </div>-->


                      </div>
                  </div>
              </div>

          </div>
      </div>
    <!--20171116 新增會員連結區塊-->
    <section class="account_area">
        <ul>
            <li>
                <a href="javascript:;" @click="CheckDemoPlay('CZ')">
                    <div class="icon">
                        <span class="icon_deposit"></span>
                    </div>
                    <p>充值</p>
                </a>
            </li>
            <li>
                <a href="javascript:;" @click="CheckDemoPlay('TK')">
                    <div class="icon">
                        <span class="icon_withdrawals"></span>
                    </div>
                    <p>提款</p>
                </a>
            </li>
            <li>
              <!--  <router-link to="/lobbyTemplate/promo">-->
                <a href="javascript:;"  @click="Continued()">
                    <div class="icon">
                        <span class="icon_promo"></span>
                    </div>
                    <p>优惠活动</p>
                </a>
            </li>
            <li>
                <a href="javascript:;"  @click="openGame('https://messenger.providesupport.com/messenger/1sppddzqo56sf08wzrnuxiv6yt.html')">
                    <div class="icon">
                        <span class="icon_service"></span>
                    </div>
                    <p>在线客服</p>
                </a>
            </li>
        </ul>
    </section>
    <!--end 20171116 新增會員連結區塊-->

      <div id="index_content" class="content">
          <section class="hotgame_area">
              <h3><img src="static/white/images/title_hotgame.png" alt="热门游戏"></h3>
              <ul>

                 <!-- <li v-for="lottery in allLottery" v-if="lottery.ifHot==1">-->
                  <li v-for="(lottery,index) in allLottery" v-if="index<7"> <!-- 只展示前面7个 -->
                    <a class="to_lottery" :href="'/'+gameHref[lottery.cid]" v-if="haslogin">
                      <div :class="'badge'">
                       <!-- <img v-lazy="lottery.imgUrl">-->
                          <img v-lazy="'static/white/images/lotteryicon/cp'+lottery.cid+'.png'">
                      </div>
                    </a>
                      <a class="to_lottery" @click="gotoGame(haslogin)"  v-else>
                          <div :class="'badge'">
                            <!--  <img v-lazy="lottery.imgUrl">-->
                              <img v-lazy="'static/white/images/lotteryicon/cp'+lottery.cid+'.png'">
                          </div>
                      </a>
                    <p>{{lottery.name}}</p>

                  </li>
                    <!--20171116 新增選單-->
                    <li>
                        <a href="javascript:;" class="more-games">
                            <div class="badge">
                                <img src="/static/white/images/logo/more.png" lazy="loaded">
                            </div>
                        </a>
                        <p>更多游戏</p>
                    </li>
                    <li >
                        <a href="javascript:;" @click="Continued()">
                            <div class="badge">
                                <img src="/static/white/images/logo/download.png" lazy="loaded">
                            </div>
                        </a>
                        <p>APP下载</p>
                    </li>
                    <!--end 20171116 新增選單-->
              </ul>
          </section>
          <!--20171116 新增優惠活動-->
          <section class="promoindex_area">
              <h3>
                  <img src="static/white/images/title_promos.png" alt="优惠活动">
                  <a  @click="Continued()" style="float: right;">更多</a>
              </h3>
              <a  @click="Continued()">
                  <img src="/static/white/images/banner/promo-1.jpg">
              </a>
          </section>
          <!--end 20171116 新增優惠活動-->
          <section class="cooper_area">
              <div class="cooper">
                  <h3><img src="static/white/images/title_cooperation.png" alt="合作加盟"></h3>
                  <ul>
                      <li>
                          <div class="icon">
                          <router-link class="icon_intro" to="/lobbyTemplate/tutorial"></router-link>
                      </div>
                      </li>
                      <li><div class="icon"><router-link class="icon_agent" v-bind:to="'/lobbyTemplate/agent'"></router-link></div></li>
                      <li><div class="icon">
                          <router-link class="icon_about" to="/lobbyTemplate/about"></router-link></div>
                      </li>
                  </ul>
              </div>
          </section>

      </div>
      <Confirm ref="confirm" />
      <FooterNav />
      <AutoCloseDialog ref="autoCloseDialog" text=" " type="" />
  </div>
</template>

<script>
// import $ from "jquery"
import '../../static/js/touchslide.1.1.js'
import Mixin from '@/Mixin'
import IndexNavigation from '@/whitecomponents/publicTemplate/IndexNavigation'
import UserNavigation from '@/whitecomponents/publicTemplate/UserNavigation'
import FooterNav from '@/whitecomponents/Footer'

import AutoCloseDialog from '@/whitecomponents/publicTemplate/AutoCloseDialog'
import Confirm from '@/whitecomponents/publicTemplate/Confirm'

export default {
  name: 'Index',
  mixins:[Mixin],
  components: {
      FooterNav ,
      IndexNavigation,
      UserNavigation ,
      AutoCloseDialog,
      Confirm
  },
  data :function() {
        return {
            haslogin:false ,
            logintype: this.getCookie('acType') || 1 ,
            balanceData:{ },
            allLottery:{} ,
            gameHref:{} ,
            bulletins:'',
            banner:[
                {'url':'http://admin.baochiapi.com/photo/pic/T1uRxTByJT1RCvBVdK/0'},
                {'url':'http://admin.baochiapi.com/photo/pic/T15tETByAT1RCvBVdK/0'},
                {'url':'http://admin.baochiapi.com/photo/pic/T1kyhTByDT1RCvBVdK/0'},
            ] ,

        }
    },
    created:function () {

    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' )  ;
      this.allLottery = this.$refs.navone.getLotterys() ;
      this.gameHref = this.$refs.navone.gameHref ; // 拿子组件的值
      this.haslogin = this.$refs.navone.haslogin ; // 拿子组件的值
     if(this.haslogin){  // 只有登录状态才需要调余额
          this.getMemberBalance() ;
      }

    TouchSlide({
      slideCell: "#focus",
      autoPlay:true,
    });
     this.getBulletinsContent ();
      /* $("#marquee_snp").slide({ // 文本滚动
           mainCell: ".bd ul",
           autoPage: true,
           effect: "leftMarquee",
           autoPlay: true,
           vis: 1,
           interTime: 50
       });*/

  },
  methods:{
  // 退出函数
      loginOut:function () {
          var _self = this ;
          $.ajax({
              type: 'get',
             // headers: {Authorization: 'Basic d2ViX2FwcDo='},
              url: this.action.uaa + 'oauth/logout',
              data: {} ,
              success: (res) => {
                  if(res.err == 'SUCCESS'){
                      _self.clearAllCookie() ; // 清除全部 cookie
                      this.$refs.autoCloseDialog.open('用户已退出','','icon_check','d_check') ;
                      setTimeout(function () {
                          window.location = '/' ;
                      },500)

                  }
                  this.$nextTick(function () {

                  })
              },
              error: function () {

              }
          });
      },

      getBulletinsContent :function () {
          let  self=this ;
          let bulletinsArr=[];
          $.ajax({
              type:"GET",
              url:this.action.forseti + 'apis/cms/bulletins',
              data:{
                  sideType:"2",
                  appid:"bcappid02",
              },
              success: (result) => {
                  for(let i=0;i<result.data.length;i++){
                      bulletinsArr.push('&nbsp;&nbsp;'+result.data[i].content+'&nbsp;&nbsp;');
                  }
                  self.bulletins=bulletinsArr.toString();
                  var str = '<marquee align="left" behavior="scroll" direction="left" hspace="0" vspace="0" loop="-1" scrollamount="2" scrolldelay="30">'+
                            self.bulletins+ '</marquee>' ;
                  $('.sys-notice>.bd').html(str)
              }
          })
      },
     //试玩
      demoPlay :function () {
           var _self=this;
           $.ajax({
               type: 'post',
               headers: {Authorization: 'Basic d2ViX2FwcDo='},
               url: _self.action.uaa + 'apis/member/testLogin',
               data:{},
               success:(res)=>{
                   if(res.err == 'SUCCESS'){ // 登录成功
                       _self.setCookie("access_token", res.data.access_token);  // 把登录token放在cookie里面
                       _self.setCookie("username", res.data.username);  // 把登录用户名放在cookie里面
                       _self.setCookie('acType',res.data.acType);   //把玩家类型放在cookie里面
                       _self.$refs.autoCloseDialog.open('登录成功','','icon_check','d_check') ;
                       setTimeout(function () {
                           window.location = '/' ;
                       },1000)
                   }else{
                       this.$refs.autoCloseDialog.open(res.cnMsg) ;
                   }
               }
            })
       },
      //判断是否为游客,
      CheckDemoPlay:function (cla) {
          var _self =this;
          var acType=_self.getCookie('acType');
          if(acType==2){
              _self.$refs.confirm.open();
              return
          }
          if(!this.haslogin){
              this.$refs.autoCloseDialog.open('登录后才可以操作')
              setTimeout(function () {
                  window.location = '/Login' ;
              },1000)
              return
          }
          if(cla=='CZ'){
              window.location = '/lobbyTemplate/deposit' ;
          }
          if(cla=='TK'){
              window.location = '/lobbyTemplate/Withdrawals' ;
          }
      },
      // 敬请期待
        Continued:function () {
            this.$refs.autoCloseDialog.open('敬请期待！') ;
        }

  },

}
</script>

<style scoped>
  .to_lottery { display: block; position: relative; z-index: 7; }
  .memberaccount{ display: inline-block;font-size: 0.35rem;position: absolute;right: 1.8rem;top: .53rem; }
</style>
