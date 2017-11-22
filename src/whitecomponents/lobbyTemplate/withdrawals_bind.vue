<template>
    <div id="pa_con" class="so-con warp bule_bg">
        <header id="pa_head">
            <div class="left">
                <router-link :to="'/lobbyTemplate/info'">
                    <img src="../../../static/frist/images/back.png" alt="">
                </router-link>
            </div>
            <h2 class="center">开户行</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <form class="withdrawals_area">
                <fieldset>
                    <div class="form_g text">
                        <legend>真实姓名</legend>
                        <input type="text" name="real-name" v-model="realName" class="realName"   placeholder="请输入您的真实姓名"
                               @input="checkrealyName(realName,'realName')">
                        <i class="close close1" ></i>
                    </div>
                    <label class=" error-message"></label>
                </fieldset>
                <fieldset>
                    <div class="form_g text">
                        <legend>选择银行</legend>
                        <select name="" v-model="bankId" class="bankselect">
                            <option :value="bank.id" v-for="bank in bankList" :data-code="bank.bankCode" >{{bank.bankName}}</option>
                        </select>
                        <i class="input_select"></i>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="form_g text">
                        <legend>开户行</legend>
                        <input type="text" name="phone-number" v-model="bankAdd"  class="bankAdd" placeholder="如:北京市海淀区中关村支行"
                        @input="checkBankAdd(bankAdd,'bankAdd')">
                        <i class="close close1" @click="ClearInput('close2','bankAdd')"></i>
                    </div>
                    <label class="error-message"></label>
                </fieldset>
                <fieldset>
                    <div class="form_g text">
                        <legend>银行卡号</legend>
                        <input type="text" name="phone-number" v-model="bankNum" class="bankNum" placeholder="请输入取款银行卡号"
                        @input="checkBankNum(bankNum,'bankNum')">
                        <i class="close close3" @click="ClearInput('close3','bankNum')"></i>
                    </div>
                    <label class="error-message"></label>
                </fieldset>
                <fieldset>
                    <div class="form_g text">
                        <legend>手机号</legend>
                        <input type="text" name="phone-number" v-model="phoneNumber" class="phoneNumber"  placeholder="请输入11位手机号码" maxlength="11"
                        @input="checktelphone(phoneNumber,'phoneNumber')">
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
// import $ from "jquery";
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
           bankId:'',
           bankAdd :'',
           bankNum :'',
           phoneNumber:'',
           bankList:{},
           bankCode:'',
        }
    },
    created:function (){
        this.getBankList();
        this.getUserInfo()
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
      //获取用户银行信息
      getUserInfo:function () {
        var _self=this;
        $.ajax({
            type:'get',
            headers: {"Authorization": "bearer  " + this.getAccessToken },
            url: _self.action.forseti + 'api/payment/memberBank',
            data:{},
            success: function(res){
                _self.phoneNumber=res.data.mobile;
                _self.realName=res.data.realName
            },
            error: function (err) {

            }
        })
      },
      //获取银行列表
      getBankList:function(){
          var _self=this;
          $.ajax({
              type:'get',
//              headers: {"Authorization": "bearer  " + this.getAccessToken },
              url: _self.action.forseti + 'apis/payment/banks',
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
              _self.$refs.autoCloseDialog.open('请按提示填写信息') ;
              return false
          }
          if(_self.bankId==""){
              _self.$refs.autoCloseDialog.open('请按提示填写信息') ;
              return false
          }
          if(_self.bankAdd==""){
              _self.$refs.autoCloseDialog.open('请按提示填写信息') ;
              return false
          }
          if(_self.bankNum==""){
              _self.$refs.autoCloseDialog.open('请按提示填写信息') ;
              return false
          }
          if(_self.phoneNumber==""){
              _self.$refs.autoCloseDialog.open('请按提示填写信息') ;
              return false
          }
          //获取选中值Code
          _self.bankCode=$('.bankselect').find("option:selected").data('code') ;
          var bankData={
              bankCode:_self.bankCode,
              bankId:_self.bankId,
              bankCard:_self.bankNum,
              bankAddress:_self.bankAdd,
              mobile:_self.phoneNumber,
              realName:_self.realName
          };
          var falg = $('.error-message').hasClass('red') ;  // 验证不通过，不允许提交
          if(falg){
              return false ;
          }
          $.ajax({
              type:'post',
              headers: { 'Authorization': 'bearer ' + _self.getAccessToken ,},
              dataType: 'json',
              url: _self.action.forseti + 'api/payment/memberBank',
              data: bankData,
              success: function(res){
                  if(res.err=='SUCCESS'){
                      _self.$refs.autoCloseDialog.open('修改成功','','icon_check','d_check') ;
                      setTimeout(function(){
                          window.location = '/lobbyTemplate/withdrawals' ;
                      },2000)
                  }else {
                      _self.$refs.autoCloseDialog.open(res.msg) ;
                      return false
                  }
              },
              error: function (err) {
                  _self.$refs.autoCloseDialog.open('绑定失败') ;
              }
          })
      }

  }
}
</script>