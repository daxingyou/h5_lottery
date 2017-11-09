<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="../../../static/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">提款</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <form class="withdrawals_area">
                <div class="print_data">
                    <table>
                        <thead>
                        <tr>
                            <th>
                                <li>真实姓名</li>
                            </th>
                            <td>{{userName}}</td>
                        </tr>
                        <tr>
                            <th class="bank_card_num">
                                <li>银行卡号</li>
                            </th>
                            <td>
                                {{bankName}}
                                <br/> {{bankCard}}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <li>余额</li>
                            </th>
                            <td>{{membalance}}</td>
                        </tr>
                        </thead>
                    </table>
                </div>
                <fieldset>
                    <div class="form_g text">
                        <legend>取款金额</legend>
                        <input type="text" v-model="money"  class="money" placeholder="1.00~9999.00">
                        <i class="close close1" @click="ClearInput('close1','money')"></i>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="form_g text">
                        <legend>支付密码</legend>
                        <input type="password" v-model="password" class="password" maxlength="4" placeholder="4位数字密码">
                        <i class="close close2" @click="ClearInput('close1','password')"></i>
                    </div>
                </fieldset>
                <div class="btn btn_blue">
                    <a href="javascript:;" @click="WithdrawalsAction()">確定</a>
                </div>

            </form>
            <!-- <a href="javascript:void(0);" class="ui red label get_m_01">会员_取款-取款银行设定</a><br/><br/>
            <a href="javascript:void(0);" class="ui green label get_m_02">会员_取款稽核-滿足</a><br/><br/>
            <a href="javascript:void(0);" class="ui red label get_m_03">会员_取款-取款稽核-不滿足</a><br/><br/> -->

        </div>
        <FooterNav></FooterNav>
        <AutoCloseDialog ref="autoCloseDialog" text=" " type="" />
    </div>
</template>
<style>

</style>
<script>
import $ from "jquery";
import Mixin from '@/Mixin'
import FooterNav from '@/components/Footer'
import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'

export default {
  name: 'withdrawals',
  mixins:[Mixin],
  components: {
      AutoCloseDialog,
      FooterNav ,
  },
    data: function() {
        return {
             money:'',
             password:'',
             membalance:this.getCookie('membalance'),
             userName:'',
             bankName:'',
             bankCard:''
        }
    },
    created: function() {
        this.getUserInfo();
    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' )  ;


  },
  methods: {
      //清除model数据,cl元素class
      clearVal :function (cl) {

          if(cl=='money'){
              this.money ='';}
          if(cl=='password'){
              this.password='';
          }

      },
      //获取用户银行账户信息
      getUserInfo: function() {
          var _self = this;
          $.ajax({
              type:'get',
              headers: { 'Authorization': 'bearer ' + _self.getAccessToken ,},
              dataType: 'json',
              url: _self.action.forseti + 'api/payment/memberBank',
              data: { },
              success: (res) => {
                  if(res.data.bindType==null||res.data.bindType==2){
                      window.location = '/lobbyTemplate/withdrawals_bind' ;
                  }
                    _self.userName=res.data.realName;
                    _self.bankName=res.data.bankName;
                    _self.bankCard=res.data.bankCard;
//                    console.log( res)
              },
              error: (err) =>{
                  console.log(err)
//                  _self.$refs.autoCloseDialog.open('返回错误') ;
              }
          })
//
      },
      //提款接口
      WithdrawalsAction: function () {
          var _self=this;
          if (_self.money == '' || !_self.checkNumber(_self.money)) {
              _self.$refs.autoCloseDialog.open('请输入正确金额');
                return false
          }
          if(_self.password==''||! _self.checkNumber(_self.password)){
              _self.$refs.autoCloseDialog.open('请输入密码');
                return false
          }
          var Withdrawalsdata = {
              applyAmount: _self.money,//金额
              tradePassword: _self.password, //密码
              remark :'会员提现'
          };
          $.ajax({
              type: 'post',
              headers: { 'Authorization': 'bearer ' + _self.getAccessToken ,},
              dataType: 'json',
              url: _self.action.forseti + 'api/pay/drawOrder',
              data: Withdrawalsdata,
              success: (res) => {
                  _self.$refs.autoCloseDialog.open('提款成功','','icon_check','d_check') ;
                  setTimeout(function(){
                      window.location = '/lobbyTemplate/info' ;
                  },2000)
              },
              error: (err) =>{
                  _self.$refs.autoCloseDialog.open('请输入正确提款信息') ;
              }

          })
      }

  }
}
</script>