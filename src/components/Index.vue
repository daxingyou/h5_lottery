<template>
  <div id="pa_con" class="so-con warp ">
      <!--left siderbar  -->
      <!--用户导航 so-left -->
      <!--<UserNavigation el=".btn_leftside" ref="navone" > </UserNavigation>-->
      <IndexNavigation el=".btn_leftside" ref="navone" > </IndexNavigation>
      <header id="pa_head" class="index_nav_top">
          <div class="left index_side">
              <a class="btn_leftside" href="javascript:;">
                  <img src="static/images/nav.png" alt="">
              </a>
          </div>
          <h2 class="center logo"><img src="static/images/nav_top_logo.png" alt="宝池彩票"></h2>
          <div class="right">
              <router-link to="/login" v-show="!haslogin">登录</router-link>
              <router-link to="/reg" v-show="!haslogin" >注册</router-link>
              <a href="javascript:;" v-show="!haslogin" >试玩</a>
              <router-link class="login" to="/lobbyTemplate/info" v-show="haslogin" ><i></i><b></b></router-link> <!-- 普通用户 -->
              <a class="guset" href="javascript:;" style="display: none"><i></i>游客</a>  <!--  试玩帐号 -->
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
                <!--  <ul>
                      <li><a href="javascript:;"><img src="static/images/banner.jpg" /></a></li>
                  </ul>
                  <ul>
                      <li><a href="javascript:;"><img src="static/images/banner.jpg" /></a></li>
                  </ul>-->
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
                          <ul >
                              <li>
                                  <div class="marquee-wrap" style="width:80%;"><vue-marquee content='' class="two"  :showtwo="false" ></vue-marquee></div>

                              </li>


                          </ul>
                      </div>
                  </div>
              </div>

          </div>
      </div>
      <div id="index_content" class="content">
          <section class="hotgame_area">
              <h3><img src="static/images/title_hotgame.png" alt="热门游戏"></h3>
              <ul>

                 <!-- <li v-for="lottery in allLottery" v-if="lottery.ifHot==1">-->
                  <li v-for="lottery in allLottery">

                    <router-link class="to_lottery" v-bind:to="'/'+gameHref[lottery.cid]">
                      <div :class="'badge'">
                        <img v-lazy="lottery.imgUrl">
                      </div>
                    </router-link>
                    <p>{{lottery.name}}</p>

                  </li>

              </ul>
          </section>
          <section class="cooper_area">
              <div class="cooper">
                  <h3><img src="static/images/title_cooperation.png" alt="合作加盟"></h3>
                  <ul>
                      <li><div class="icon"><a class="icon_intro" href="javascript:;"></a></div></li>
                      <li><div class="icon"><router-link class="icon_agent" v-bind:to="'/lobbyTemplate/agent'"></router-link></div></li>
                      <li><div class="icon"><a class="icon_about" href="javascript:;"></a></div></li>
                  </ul>
              </div>
          </section>
      </div>
      <FooterNav />
  </div>
</template>

<script>
import $ from 'jquery'
import '../../static/js/touchslide.1.1.js'
import Mixin from '@/Mixin'
//import UserNavigation from '@/components/publicTemplate/UserNavigation'
import IndexNavigation from '@/components/publicTemplate/IndexNavigation'
import FooterNav from '@/components/Footer'
import VueMarquee from 'vue-marquee-ho';
/*import Css from '../../node_modules/vue-marquee-ho/dist/vue-marquee.min.css'*/
import Css from '../../static/css/vue-marquee.min.css'

export default {
  name: 'Index',
  mixins:[Mixin],
  components: {
    // TouchSlide,
      FooterNav ,
    IndexNavigation,
//    UserNavigation,
     "vue-marquee": VueMarquee

  },
  data :function() {
        return {
            haslogin:false ,
            balanceData:{},
            allLottery:{} ,
            gameHref:{} ,
            bulletins:[],
            banner:[
                {'url':'http://admin.baochiapi.com/photo/pic/T1itJTBXJT1RCvBVdK/0'},
                {'url':'http://admin.baochiapi.com/photo/pic/T1XtETBybT1RCvBVdK/0'},
                {'url':'http://admin.baochiapi.com/photo/pic/T1vyJTBXxT1RCvBVdK/0'},
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

    TouchSlide({
      slideCell: "#focus",
      autoPlay:true,
    });
     this.getBulletinsContent ()
      // $("#marquee_snp").slide({ // 文本滚动
      //     mainCell: ".bd ul",
      //     autoPage: true,
      //     effect: "leftMarquee",
      //     autoPlay: true,
      //     vis: 1,
      //     interTime: 50
      // });







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
                      window.location = '/' ;
                  }

                  // console.log(res) ;
                  this.$nextTick(function () {

                  })
              },
              error: function () {

              }
          });
      },

      getBulletinsContent :function () {
          let  self=this ;
          $.ajax({
              type:"GET",
              url:this.action.forseti + 'apis/cms/bulletins',
              data:{
                  sideType:"2"
              },
              success: (result) => {
                  console.log(result.data)
                  for(let i=0;i<result.data.length;i++){
                      console.log(result.data[i].content)
                      self.bulletins.push(result.data[i].content);
                  }
                 console.log(self.bulletins)

              }
          })
      }
  },

}
</script>

<style scoped>
  .to_lottery { display: block; position: relative; z-index: 7; }
  .marquee-box {
      height: 50px;
      line-height: 50px;
      color: #000;
      font-size: 24px;
      background-size: 24px 24px;
  }
  .marquee-content{
      overflow: hidden;
      width:100%
  }
  .marquee-content p{
      display: inline-block;
      white-space: nowrap;
      margin: 0;
      font-size: 0;
  }
  .marquee-content span{
      display: inline-block;
      white-space: nowrap;
      padding-right: 40px;
      font-size: 14px;
  }

  .quick{
      -webkit-animation: marquee 5s linear infinite;
      animation: marquee 5s linear infinite;
  }
  .middle{
      -webkit-animation: marquee 20s linear infinite;
      animation: marquee 20s linear infinite;
  }
  .slow{
      -webkit-animation: marquee 25s linear infinite;
      animation: marquee 25s linear infinite;
  }
  @-webkit-keyframes marquee {
      0%  { -webkit-transform: translate3d(0,0,0); }
      100% { -webkit-transform: translate3d(-50%,0,0); }
  }
  @keyframes marquee {
      0%  { transform: translateX(0); }
      100% { transform: translateX(-50%);}
  }
  /* .hotgame_area ul a {
    position: relative;
    display: inline-block;
    z-index: 7;
  } */
  /* #pa_head > .left a.btn_leftside{
      margin-left:.6rem;
  } */
  /* #pa_head > .center.logo{
      margin-left: .6rem;
  } */

</style>
