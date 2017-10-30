<template>
  <div id="pa_con" class="so-con warp bule_bg">
      <!--left siderbar  -->
      <div class="so-left">
          <div class="so-left-close">
              <img src="static/images/left/left808.png">
          </div>
          <div class="so-left-con">
              <div class="so-l-c-top">
                  <div>
                      <img src="static/images/left/user.png">
                  </div>
                      <div>
                      <p>KWHRBFHQEWBH</p>
                      <div class="purse">
                          <img src="static/images/top/sjinbi.png" class="so-top-sum">
                          <div class="so-in-top-sum">
                              821406.00
                          </div>
                      </div>
                  </div>
              </div>
              <div class="so-l-c-con">
                  <div>
                      <ul>
                          <li>
                              <div class="badge">
                                      <img src="static/images/logo_hljssc.svg" alt="">
                              </div>
                              <p>黑龙江时时彩</p>
                          </li>
                          <li>
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
                          <li>
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
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      <header id="pa_head" class="index_nav_top">
          <div class="left">
              <a class="btn_leftside" href="javascript:;">
                  <img src="static/images/nav.png" alt="">
              </a>
          </div>
          <h2 class="center logo"><img src="static/images/nav_top_logo.png" alt="宝池彩票"></h2>
          <div class="right">
              <a href="/login">登录</a>
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
                  <li>
                      <div class="badge">
                          <img src="static/images/logo_hljssc.svg">
                      </div>
                      <p>黑龙江时时彩</p>
                  </li>
                  <li>
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
export default {
  name: 'Index',
  mixins:[Mixin],
  mounted:function() {
    this.LoginAction();
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
    // 登录接口 moved to 主页/index.vue
    LoginAction:function() {
        $.ajax({
            type: 'post',
            headers: {Authorization: 'Basic d2ViX2FwcDo='},
            url: action.uaa + 'oauth/token',
            data: {grant_type: 'password', username: 'bcappid02|admin', password: 'admin'},
            success: (res) => {
                // this.access_token = res.access_token;
                this.setCookie("access_token", res.access_token);  // 把登录token放在cookie里面
                this.setCookie("username", "bcappid02|admin");  // 把登录用户名放在cookie里面
                console.log('login successed.')
            },
            error: function () {

            }
        });
    },
    go:function(url){
      window.location = url;
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
-->
