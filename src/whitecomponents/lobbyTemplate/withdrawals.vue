<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head">
            <div class="left">
                <router-link :to="'/lobbyTemplate/info'">
                    <img src="../../../static/frist/images/back.png" alt="">
                </router-link>
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
                            <td>{{realName}}</td>
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
                            <td>{{fortMoney(roundAmt(memBalance), 2)}}</td>
                        </tr>
                        </thead>
                    </table>
                </div>
                <fieldset>
                    <div class="form_g text">
                        <legend>取款金额</legend>
                        <input type="text" v-model="userMoney"  class="money" placeholder="1.00~9999.00" maxlength="4">
                        <i class="close close1" @click="ClearInput('close1','money')"></i>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="form_g text">
                        <legend>支付密码</legend>
                        <input type="text" v-model="cashPassword" class="password" onfocus="this.type='password'" maxlength="4" placeholder="4位数字密码">
                        <i class="close close2" @click="ClearInput('close1','password')"></i>
                    </div>
                </fieldset>
                <div class="btn btn_blue">
                    <a href="javascript:;" @click="WithdrawalsAction()" >确定</a>
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
// import $ from "jquery";
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
             userMoney:'',
             cashPassword:'',
             memBalance:'',
             realName:'',
             bankName:'',
             bankCard:'',
             bankCode:'',
             bankId:'',
             acType:'',
             memberId:'',
             PaySubmit:false //重复提交

        }
    },
    created: function() {
        this.getUserInfo1();
        this.getUserInfo();
    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' )  ;


  },
  methods: {
      //清除model数据,cl元素class
      clearVal :function (cl) {

          if(cl=='money'){
              this.userMoney ='';}
          if(cl=='password'){
              this.cashPassword='';
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
                  if(res.data.bindType==null||res.data.bindType==1){
                      window.location = '/lobbyTemplate/withdrawals_bind' ;
                  }
                    _self.realName=res.data.realName;
                    _self.bankName=res.data.bankName;
                    _self.bankCard=res.data.bankCard;
                    _self.bankCode=res.data.bankCode;
                    _self.bankId  =res.data.bankId;
              },
              error: (err) =>{

             }
            })

      },
      //获取用户信息
      getUserInfo1: function () {
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
                  _self.memBalance = res.data.balance;
              },
              error: (e) => {
              _self.errorAction(e) ;
              }
          })
      },
      //提款接口
      WithdrawalsAction: function () {
                  var _self=this;
                  if(_self.PaySubmit){
                       return  false;
                  }

                  if(_self.userMoney*100>_self.memBalance){
                      _self.$refs.autoCloseDialog.open('提款余额不足');
                      return
                  }
                  if (_self.userMoney == '' || !_self.positiveNum(_self.userMoney)||_self.userMoney == 0) {
                      _self.$refs.autoCloseDialog.open('请输入正确金额');
                      return false
                  }
                  if(_self.cashPassword==''||! _self.positiveNum(_self.cashPassword)||_self.cashPassword.length!=4){
                      _self.$refs.autoCloseDialog.open('请输入4位数字密码');
                      return false
                  }
                  _self.PaySubmit = true ;
                  var Withdrawalsdata = {
                      applyAmount: _self.userMoney*100,//金额
                      tradePassword: _self.cashPassword, //密码
                      bankCode:_self.bankCode,//银行code
                      bankId:_self.bankId,  //银行Id
                      bankCard:_self.bankCard, //银行卡号
                      realName:_self.realName,//真实姓名
                  };
                  $.ajax({
                      type: 'post',
                      headers: { 'Authorization': 'bearer ' + _self.getAccessToken ,},
                      dataType: 'json',
                      url: _self.action.forseti + 'api/pay/drawOrder',
                      data: Withdrawalsdata,
                      success: (res) => {;
                          //取款密码错误
                          if(res.err=='SUCCESS'){
                              _self.PaySubmit = true
                              _self.$refs.autoCloseDialog.open('提款成功','','icon_check','d_check') ;
                              setTimeout(function(){
                                  window.location = '/lobbyTemplate/info' ;
                              },100)
                          }else {
                              _self.PaySubmit = false ;
                              _self.$refs.autoCloseDialog.open(res.msg) ;
                              return false
                          }

                      },
                      error: (err) =>{
                          _self.PaySubmit = false ;
                          _self.$refs.autoCloseDialog.open('请输入正确提款信息') ;
                      }

                  })

      },

  }
}
</script>