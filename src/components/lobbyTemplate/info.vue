<template>
    <div id="pa_con" class="so-con warp bule_bg">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;">

                </a>
            </div>
            <h2 class="center">个人中心</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <div class="info_area">
                <div class="info_top">
                    <div class="account">
                        <a href="info_data.html">
                            <h2 class="ui header center aligned">
                                <div class="portrait">
                                    <!-- <div class="portrait_outline"></div> -->
                                    <div class="user_portrait" style="background-image: url('../../../static/images/left/user.png');"></div>
                                </div>
                            </h2>
                            <div class="user_name">
                                <strong>Elsa001EDKoes2</strong>
                                <div class="purse">
                                    <img src="/static/images/top/sjinbi.png" class="so-top-sum">
                                    <div class="so-in-top-sum">
                                        123456789
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="info_mid">
                    <div>
                        <div class="btn btn_blue btn_two">
                            <router-link v-bind:to="'/lobbyTemplate/deposit'">充值</router-link>
                        </div>
                        <div class="btn btn_blue btn_two">
                            <router-link v-bind:to="'/lobbyTemplate/withdrawals'">提款</router-link>
                        </div>
                    </div>
                </div>
                <div class="info_bot">
                    <ul>
             <!--           <li>
                            <a class="btn_icon" href="./analysis">
                                <div class="icon">
                                    <div>
                                        <i class="info01"></i>
                                    </div>
                                </div>
                                盈亏分析
                            </a>
                        </li>-->
                        <li>
                            <a class="btn_icon" href="./acdetial">
                                <div class="icon">
                                    <div><i class="info02"></i></div>
                                </div>
                                帐户明细
                            </a>
                        </li>
                        <li>
                            <a class="btn_icon" href="info_data.html">
                                <div class="icon">
                                    <div><i class="info03"></i></div>
                                </div>
                                帐户管理
                            </a>
                        </li>
                        <li>
                            <a class="btn_icon" href="notification.html">
                                <div class="icon">
                                    <div> <i class="info04"></i></div>
                                </div>
                                个人消息
                            </a>
                        </li>
                        <li>
                            <a class="btn_icon" href="javascript:;">
                                <div class="icon">
                                    <div><i class="info05"></i></div>
                                </div>
                                联络客服
                            </a>
                        </li>
                        <li>
                            <a class="btn_icon" href="join.html">
                                <div class="icon">
                                    <div> <i class="info06"></i></div>
                                </div>
                                欢迎加入
                            </a>
                        </li>
                    </ul>

                </div>
            </div>


        </div>

        <FooterNav />

    </div>
</template>

<script>
import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'

export default {
  name: 'Login',
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