<template>
    <div id="pa_con" class="so-con warp bule_bg">
        <header id="pa_head">
            <div class="left">
                <a href="../">
                    <img src="../../../static/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">绑定银行</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <form class="withdrawals_area">
                <fieldset>
                    <div class="form_g text">
                        <legend>真实姓名</legend>
                        <input type="text" name="real-name" v-model="realName" class="realName" placeholder="请输入您的真实姓名"
                               @input="checkrealyName(realName,'realName','请输入您的真实姓名')">
                        <i class="close close1" @click="ClearInput('close1','realName')"></i>
                    </div>
                    <label class=" error-message"></label>
                </fieldset>
                <fieldset>
                    <div class="form_g text">
                        <legend>选择银行</legend>
                        <select name="" v-model="bankName">
                            <option :value="bank.id" v-for="bank in bankList">{{bank.bankName}}</option>
                        </select>
                        <i class="input_select"></i>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="form_g text">
                        <legend>开户行地址</legend>
                        <input type="text" name="phone-number" v-model="bankAdd"  class="bankAdd" placeholder="请输入开户行地址（如:北京市海淀区xx分行"
                        @input="checkBankAdd(bankAdd,'bankAdd','请输入开户行地址（如:北京市海淀区xx分行')">
                        <i class="close close1" @click="ClearInput('close2','bankAdd')"></i>
                    </div>
                    <label class="error-message"></label>
                </fieldset>
                <fieldset>
                    <div class="form_g text">
                        <legend>银行卡号</legend>
                        <input type="text" name="phone-number" v-model="bankNum" class="bankNum" placeholder="请输入取款银行卡号"
                        @input="checkBankNum(bankNum,'bankNum','请输入正确银行卡')">
                        <i class="close close3" @click="ClearInput('close3','bankNum')"></i>
                    </div>
                    <label class="error-message"></label>
                </fieldset>
                <fieldset>
                    <div class="form_g text">
                        <legend>手机号</legend>
                        <input type="text" name="phone-number" v-model="phoneNumber" class="phoneNumber"  placeholder="请输入11位手机号码" maxlength="11"
                        @input="checktelphone(phoneNumber,'phoneNumber','请输入正确手机号码')">
                        <i class="close close4" @click="ClearInput('close4','phoneNumber')"></i>
                    </div>
                    <label class="error-message"></label>
                </fieldset>
                <div class="btn btn_blue bind">
                    <a href="javascript:;" @click="ChangeInfo()">確定</a>
                </div>
            </form>
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
  name: 'withdrawals_bind',
  mixins:[Mixin],
  components: {
      AutoCloseDialog,
      FooterNav ,
  },
    data: function() {
        return {
           realName:'',
           bankName:'',
           bankAdd :'',
           bankNum :'',
           phoneNumber:'',
           bankList:[],
           bankId:'',
           bankCode:''
        }
    },
    created:function (){
        this.getBankList()
    },
    mounted:function() {
      $('html,body').css('overflow-y','scroll' )  ;

  },
  methods: {
      //清除model数据,cl元素class
      clearVal :function (cl) {
          if(cl=='realName'){
              this.realName ='';}
          if(cl=='bankAdd'){
              this.bankAdd='';}
          if(cl=='bankNum'){
              this.bankNum='';}
          if(cl=='phoneNumber'){
              this.phoneNumber='';}
           },
      //获取银行列表
      getBankList:function(){
          var _self=this;
          $.ajax({
              type:'get',
              headers: {"Authorization": "bearer  " + this.getAccessToken },
              url: _self.action.forseti + 'api/payment/banks',
              data:{},
              success: function(res){
                  _self.bankList=res.data;

              },
              error: function (err) {

              }

          })
      },

      //修改银行账户信息
      ChangeInfo : function () {
          var _self=this;
          if(_self.realName==""){
              return false
          }
          if(_self.bankName==""){
              return false
          }
          if(_self.bankAdd==""){
              return false
          }
          if(_self.bankNum==""){
              return false
          }
          if(_self.phoneNumber==""){
              return false
          }
          var bankData={
              bankCode:_self.bankCode,
              bankId:_self.bankId,
              bankCard:_self.bankCard,
              bankAddress:_self.bankAdd,
              mobile:_self.phoneNumber,
              realName:_self.realname
          };
          $.ajax({
              type:'post',
              headers: { 'Authorization': 'bearer ' + _self.getAccessToken ,},
              dataType: 'json',
              url: _self.action.forseti + 'api/payment/memberBank',
              data: bankData,
              success: function(res){


              },
              error: function (err) {

              }
          })
      }

  }
}
</script>