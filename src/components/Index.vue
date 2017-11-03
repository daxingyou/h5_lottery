<template>
  <div id="pa_con" class="so-con warp bule_bg">
      <!--left siderbar  -->
      <!--用户导航 so-left -->
      <UserNavigation el=".btn_leftside" ref="navone" > </UserNavigation>

      <header id="pa_head" class="index_nav_top">
          <div class="left index_side">
              <a class="btn_leftside" href="javascript:;">
                  <img src="static/images/nav.png" alt="">
              </a>
          </div>
          <h2 class="center logo"><img src="static/images/nav_top_logo.png" alt="宝池彩票"></h2>
          <div class="right">
              <a href="/login"  >登录</a> <!-- v-show="!haslogin" -->
              <a href="/reg">注册</a>
              <a href="javascript:;">试玩</a>
          </div>
      </header>
      <div class="news">
          <div id="focus" class="focus">
              <div class="bd">
                  <ul>
                      <li><a href="javascript:;"><img src="static/images/banner.jpg" /></a></li>
                  </ul>
                  <ul>
                      <li><a href="javascript:;"><img src="static/images/banner.jpg" /></a></li>
                  </ul>
                  <ul>
                      <li><a href="javascript:;"><img src="static/images/banner.jpg" /></a></li>
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
                          <ul>
                              <li><a href="javascript:;">01大厅最新消息最新消息最新消息</a></li>
                              <li><a href="javascript:;">02大厅最新消息最新消息最新消息</a></li>
                              <li><a href="javascript:;">03大厅最新消息最新消息最新消息</a></li>
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
                   <!-- @click="go(gameHref[lottery.cid])" -->
                   <!-- <li>
                        <div class="badge cqssc">
                        </div>
                        <p>重庆时时彩</p>
                    </li> -->
                  <li v-for="lottery in allLottery" v-if="lottery.ifHot==1">

                    <!-- <a class="to_lottery" href="web_cqssc/index.html"> 
                      <div class="badge">
                        <img src="http://admin.baochiapi.com/photo/pic/T19RJTBXCT1RCvBVdK/0" alt="">
                      </div>
                    </a> -->


                    <router-link class="to_lottery" v-bind:to="'/'+gameHref[lottery.cid]">
                      <div :class="'badge'">
                        <img :src="lottery.imgUrl">
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
                      <li><a class="icon_intro" href="javascript:;"></a></li>
                      <li><a class="icon_agent" href="javascript:;"></a></li>
                      <li><a class="icon_about" href="javascript:;"></a></li>
                  </ul>
              </div>
          </section>
      </div>
      <footer class="bot_nav">
          <ul>
              <li class="active"><a class="index" href="/">首页大厅</a></li>
              <li><a class="trend" href="/lobbyPastView">往期开奖</a></li>
              <li><a class="record" href="publicTemplate/betRecord?type=index">投注纪录</a></li>
              <li><a class="member" href="javascript:;">个人中心</a></li>
          </ul>
      </footer>
  </div>

  
</template>



<script>
import Mixin from '@/Mixin'
import UserNavigation from '@/components/publicTemplate/UserNavigation'
export default {
  name: 'Index',
  mixins:[Mixin],
  components: {
        UserNavigation,
    },
  data :function() {
        return {
            haslogin:true ,
            balanceData:{},
            allLottery:{} ,
            gameHref:{} ,

        }
    },
    created:function () {

    },
  mounted:function() {
    this.allLottery = this.$refs.navone.getLotterys() ;
    this.gameHref = this.$refs.navone.gameHref ; // 拿子组件的值
    this.haslogin = this.$refs.navone.haslogin ; // 拿子组件的值

    $(()=>{
      TouchSlide({
          slideCell: "#focus",
          autoPlay:true,
      });
      // $("#marquee_snp").slide({ // 文本滚动
      //     mainCell: ".bd ul",
      //     autoPage: true,
      //     effect: "leftMarquee",
      //     autoPlay: true,
      //     vis: 1,
      //     interTime: 50
      // });
      
    })


  },
  methods:{
      // 链接跳转
    go:function(url){
      window.location = url;
    }
  },

}
</script>

<style scoped>
  .hotgame_area ul a {
    position: relative;
    display: inline-block;
    z-index: 7;
  }
  #pa_head > .left a.btn_leftside{
      margin-left:.6rem;
  }
  #pa_head > .center.logo{
      margin-left: .6rem;
  }
</style>
