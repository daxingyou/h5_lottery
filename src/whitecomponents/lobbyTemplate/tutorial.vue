<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)" >
                    <img src="../../../static/frist/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">新手教程</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <div class="about_area">
                <p> 本公司的客服中心全年无休，提供1周7天、每天24小时的优质服务。</p>
                <p>如果您有任何疑问或者需要，可以透过下列任一方式与客服人员联系，享受最实时的服务</p>
                <p>A.点击页面上的"联系客服"链接，即可进入在线客服系统与客服人员联系；</p>
                <p>B.还可登录之后，点击您的头像或名字进入个人中心，在消息公告频道里选择站点消息，然后选择发送消息即可向客服反馈您的问题。</p>
            </div>
        </div>

        <FooterNav />

    </div>
</template>

<script>
// import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'

export default {
  name: 'about',
  mixins:[Mixin],
  components: {
   // AutoCloseDialog,
      FooterNav ,
  },
    data: function() {
        return {

        }
    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' )  ;
      //scrollTo(0,0); // 回到顶部
      document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
  },
  methods: {

}

}
</script>