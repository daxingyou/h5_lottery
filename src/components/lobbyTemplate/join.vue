<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head">
            <div class="left">
                <a href="../">
                    <img src="../../../static/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">欢迎加入</h2>
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
                                    <img src="../../../static/images/top/sjinbi.png" class="so-top-sum">
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
                        <li>
                            <a class="btn_icon" href="/lobbyTemplate/agent">
                                <div class="icon">
                                    <div>
                                        <i class="info07"></i>
                                    </div>
                                </div>
                                代理加盟
                            </a>
                        </li>
                        <li>
                            <a class="btn_icon" href="/lobbyTemplate/tutorial">
                                <div class="icon">
                                    <div><i class="info08"></i></div>
                                </div>
                                新手教程
                            </a>
                        </li>
                        <li>
                            <a class="btn_icon" href="/lobbyTemplate/about">
                                <div class="icon">
                                    <div><i class="info09"></i></div>
                                </div>
                                关于我们
                            </a>
                        </li>
                    </ul>

                </div>
            </div>


        </div>

        <FooterNav></FooterNav>
    </div>
</template>

<script>
import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'

export default {
  name: 'join',
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