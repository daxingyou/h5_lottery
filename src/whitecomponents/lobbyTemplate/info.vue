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
                        <a  href="javascript:;" @click="CheckDemoPlay('ZH')">
                            <h2 class="ui header center aligned">
                                <div class="portrait">
                                    <!-- <div class="portrait_outline"></div> -->
                                    <div class="user_portrait" style="background-image: url('../../../static/frist/images/left/user.png');"></div>
                                </div>
                            </h2>
                            <div class="user_name">
                                <strong v-if="!demoName">{{userLogin}}</strong>
                                <strong v-if="demoName">{{getCookie('username')}}</strong>
                                <div class="purse">
                                    <img src="/static/frist/images/top/sjinbi.png" class="so-top-sum">
                                    <div class="so-in-top-sum">
                                       {{fortMoney(roundAmt(Money), 2)}}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="info_mid">
                    <div>
                        <div class="btn btn_blue btn_two">
                            <a  href="javascript:;" @click="CheckDemoPlay('CZ')">充值</a>
                        </div>
                        <div class="btn btn_blue btn_two">
                            <a  href="javascript:;" @click="CheckDemoPlay('TK')" >提款</a>
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
                            <a class="btn_icon "  href="javascript:;" @click="CheckDemoPlay('ZH')">
                                <div class="icon">
                                    <div><i class="info03"></i></div>
                                </div>
                                帐户管理
                            </a>
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
                            <a class="btn_icon" href="javascript:;"  @click="openGame('https://messenger.providesupport.com/messenger/1sppddzqo56sf08wzrnuxiv6yt.html')">
                                <div class="icon">
                                    <div><i class="info05"></i></div>
                                </div>
                                在线客服
                            </a>
                        </li>
                        <li>
                            <router-link class="btn_icon" :to="'/lobbyTemplate/join'">
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
        <Confirm ref="confirm" />
        <!--<AutoCloseDialog ref="autoCloseDialog" text=" " type="" />-->
    </div>
</template>

<style>
    .info_top .account >a{
         height:100%;
    }
</style>
<script>
// import $ from "jquery";
import Mixin from '@/Mixin'
import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'
import Confirm from '@/components/publicTemplate/Confirm'
export default {
  name: 'info',
  mixins:[Mixin],
  components: {
    AutoCloseDialog,
      FooterNav ,
      Confirm
  },
    data: function() {
        return {
            demoName:false,
            haslogin:false ,
            Money:'',
            acType:'',
            memberId:'',
            userLogin:''
        }
    },
    created:function () {
        var _self =this ;
            _self.ShowDemo();
            _self.haslogin = this.ifLogined();
            if (!_self.haslogin) {
                // _self.$refs.autoCloseDialog.open('请先登录！') ;
                _self.$router.push('/login')  ;
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
                  _self.userLogin=res.data.login;
                  _self.getBalance(_self.memberId, _self.acType)
              },
              error: () => {

              }
          })
      },
      //获取用户余额
      getBalance: function (id,type) {
          var _self = this;
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
              error: (e) => {
              _self.errorAction(e) ;
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
          if(cla=='CZ'){
              window.location = '/lobbyTemplate/deposit' ;
          }
          if(cla=='TK'){
              window.location = '/lobbyTemplate/Withdrawals' ;
          }
          if(cla=='ZH'){
              window.location = '/lobbyTemplate/info_data' ;
          }
      },
      //游客显示
      ShowDemo:function () {
          var _self=this;
          var acType=_self.getCookie('acType');
          if(acType==1){
              _self.demoName=false;
          }else{
              _self.demoName=true;
          }
      }
  }
}
</script>