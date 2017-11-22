<template>

    <div id="pa_con" class="so-con warp ">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="/static/frist/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">个人中心</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <div class="message_area">
                <div class="item">
                    <div class="icon">
                        <div>
                            <i class="i_mail_status"></i>
                        </div>
                    </div>
                    <div class="content msgc">
                        <div class="description date">2017/07/21</div>
                        <a class="text">亲爱的用户，您的取款审核已通过，请留 意银行账户余额变动！
                        </a>
                    </div>
                </div>
                <div class="item read">
                    <div class="icon">
                        <div>
                            <i class="i_mail_status"></i>
                        </div>
                    </div>
                    <div class="content msgc">
                        <div class="description date">2017/07/21</div>
                        <a class="text">亲爱的用户，您的取款审核已通过，请留 意银行账户余额变动！
                        </a>
                    </div>
                </div>
                <div class="item">
                    <div class="icon">
                        <div>
                            <i class="i_mail_status"></i>
                        </div>
                    </div>
                    <div class="content msgc">
                        <div class="description date">2017/07/21</div>
                        <a class="text">亲爱的用户，您的取款审核已通过，请留 意银行账户余额变动！
                        </a>
                    </div>
                </div>
            </div>

        </div>
        <!--<footer class="bot_nav">-->
            <!--<ul>-->
                <!--<li class="active">-->
                    <!--<a class="index" href="../">首页大厅</a>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<a class="trend" href="lobby_past_view.html">往期开奖</a>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<a class="record" href="publicTemplate/bet_record.html">投注纪录</a>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<a class="member" href="info.html">个人中心</a>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</footer>-->
        <FooterNav></FooterNav>
    </div>

    <!-- 個人消息彈出視窗 -->
    <!--<div class="modal msg">-->
        <!--<div class="m_content">-->
            <!--<h2 class="noclose"><a></a></h2>-->
            <!--<div class="content check">-->
                <!--<div>-->
                    <!--<img src="../../../static/frist/images/pop/title_public.png">-->
                    <!--<img src="../../../static/frist/images/icon_check.svg">-->
                <!--</div>-->
                <!--恭喜 ! 您已注册成功 , 祝您游戏愉快！-->
            <!--</div>-->
            <!--<div class="action">-->
                <!--<a class="ok">确定</a>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->

</template>

<script>
// import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'

export default {
  name: 'notification',
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

  },
  methods: {

}

}
</script>