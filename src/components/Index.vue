<template>
  <div id="pa_con" class="so-con warp bule_bg">
      <!--left siderbar  -->
      <!--用户导航 so-left -->
      <UserNavigation el=".btn_leftside" ref="navone" > </UserNavigation>

      <header id="pa_head" class="index_nav_top">
          <div class="left">
              <a class="btn_leftside" href="javascript:;">
                  <img src="static/images/nav.png" alt="">
              </a>
          </div>
          <h2 class="center logo"><img src="static/images/nav_top_logo.png" alt="宝池彩票"></h2>
          <div class="right">
              <a href="/login" v-show="!haslogin">登录</a>
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
          <div id="marquee_snp" class="marquee">
              <div class="speaker">
                  <img src="static/images/news.png" alt="">
              </div>
              <div class="bd">
                  <ul>
                      <li><a href="javascript:;">01大厅最新消息最新消息最新消息</a></li>
                      <!-- <li><a href="javascript:;">02大厅最新消息最新消息最新消息</a></li>
                      <li><a href="javascript:;">03大厅最新消息最新消息最新消息</a></li> -->
                  </ul>
              </div>
          </div>
      </div>
      <div id="index_content" class="content">
          <section class="hotgame_area">
              <h3><img src="static/images/title_hotgame.png" alt="热门游戏"></h3>
              <ul>
                  <li v-for="lottery in allLottery" v-if="lottery.ifHot==1" @click="go(gameHref[lottery.cid])">
                      <div >
                          <img :src="lottery.imgUrl">
                      </div>
                      <p>{{lottery.name}}</p>
                  </li>
                <!--  <li>
                      <div class="badge">
                          <img src="static/images/logo_xjssc.svg">
                      </div>
                      <p>新疆时时彩</p>
                  </li>
                  <li>
                      <div class="badge">
                          <img src="static/images/logo_tjssc.svg">
                      </div>
                      <p>天津时时彩</p>
                  </li>
                  <li @click="go('/cqssc/')">
                      <div class="badge">
                          <img src="static/images/logo_cqssc.svg">
                      </div>
                      <p>重庆时时彩</p>
                  </li>
                  <li>
                      <div class="badge">
                          <img src="static/images/logo_gd11x5.svg">
                      </div>
                      <p>广东11选5</p>
                  </li>
                  <li>
                      <div class="badge">
                          <img src="static/images/logo_sd11x5.svg">
                      </div>
                      <p>山东11选5</p>
                  </li>
                  <li>
                      <div class="badge">
                          <img src="static/images/logo_sixlottery.svg">
                      </div>
                      <p>六合彩</p>
                  </li>
                  <li>
                      <div class="badge">
                          <img src="static/images/logo_jxk3.svg">
                      </div>
                      <p>江苏快3</p>
                  </li>-->
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
              <li class="active"><a class="index" href="javascript:;">首页大厅</a></li>
              <li><a class="trend" href="javascript:;">开奖走势</a></li>
              <li><a class="record" href="javascript:;">投注纪录</a></li>
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
