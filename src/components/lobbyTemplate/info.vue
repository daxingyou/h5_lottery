<template>
    <div id="pa_con" class="so-con warp cover_bg">
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
                        <router-link :to="'/lobbyTemplate/info_data'" >
                            <h2 class="ui header center aligned">
                                <div class="portrait">
                                    <!-- <div class="portrait_outline"></div> -->
                                    <div class="user_portrait" style="background-image: url('../../../static/images/left/user.png');"></div>
                                </div>
                            </h2>
                            <div class="user_name">
                                <strong>{{getCookie('username')}}</strong>
                                <div class="purse">
                                    <img src="/static/images/top/sjinbi.png" class="so-top-sum">
                                    <div class="so-in-top-sum">
                                       {{fortMoney(roundAmt(Money), 2)}}
                                    </div>
                                </div>
                            </div>
                        </router-link>
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
                            <router-link to="/lobbyTemplate/acdetial" class="btn_icon">
                                <div class="icon">
                                    <div><i class="info02"></i></div>
                                </div>
                                帐户明细
                            </router-link>
                        </li>
                        <li>
                            <router-link class="btn_icon" :to="'/lobbyTemplate/info_data'">
                                <div class="icon">
                                    <div><i class="info03"></i></div>
                                </div>
                                帐户管理
                            </router-link>
                        </li>
                      <!--  <li>
                            <router-link class="btn_icon" :to="'/lobbyTemplate/notification'">
                                <div class="icon">
                                    <div> <i class="info04"></i></div>
                                </div>
                                个人消息
                            </router-link>
                        </li>-->
                        <li>
                            <a class="btn_icon" href="javascript:;">
                                <div class="icon">
                                    <div><i class="info05"></i></div>
                                </div>
                                联络客服
                            </a>
                        </li>
                        <li>
                            <router-link class="btn_icon" :to="'/lobbyTemplate/notification'">
                                <div class="icon">
                                    <div> <i class="info06"></i></div>
                                </div>
                                欢迎加入
                            </router-link>
                        </li>
                    </ul>

                </div>
            </div>


        </div>

        <FooterNav />

    </div>
</template>
<style>
    .info_top .account >a{
         height:100%;
    }
</style>
<script>
import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'

export default {
  name: 'info',
  mixins:[Mixin],
  components: {
   // AutoCloseDialog,
      FooterNav ,
  },
    data: function() {
        return {
            haslogin:false ,
            Money:'',
            acType:'',
            memberId:''
        }
    },
    created:function () {
        var _self =this ;
        _self.haslogin = this.ifLogined() ;
        if( !_self.haslogin){
            // _self.$refs.autoCloseDialog.open('请先登录！') ;
            window.location = '/login' ;
        }
        _self.getUserInfo();
    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' )  ;

  },
  methods: {
      //获取用户信息
      getUserInfo: function () {
          var _self = this;
          $.ajax({
              type: 'get',
              headers: {'Authorization': 'bearer ' + _self.getAccessToken,},
              dataType: 'json',
              url: _self.action.uaa + 'api/data/member/info',
              data: {},
              success: (res) => {
                  _self.memberId = res.data.memberId;
                  _self.acType = res.data.acType;
                  _self.getBalance(_self.memberId, _self.acType)
              },
              error: () => {

              }
          })
      },
      //获取用户余额
      getBalance: function (id,type) {
          var _self = this;
          console.log(_self.memberId);
          var BaData = {
              memberId:id ,
              acType:type,
          };

          $.ajax({
              type: 'get',
              headers: {'Authorization': 'bearer ' + _self.getAccessToken,},
              dataType: 'json',
              url: _self.action.hermes + 'api/balance/get',
              data: BaData,
              success: (res) => {
                  _self.Money = res.data.balance;
              },
              error: () => {

              }
          })
      }
  }
}
</script>