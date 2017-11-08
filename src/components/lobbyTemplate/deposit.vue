<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="../../../static/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">充值</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <div class="deposit_area">
                <div class="pay_content">
                    <!-- 支付方式 开始-->
                    <div class="paymethods_all">
                        <form class="form_deposit">
                            <fieldset>
                                <div class="form_g text money">
                                    <legend>充值金额</legend>
                                    <input type="tel" placeholder="请输入充值金额" v-model="paymount">
                                    <i class="close"></i>
                                </div>
                            </fieldset>
                        </form>

                        <div class="step03 pay_way">
                            <ul>
                                <li>
                                    <a class="item" href="javascript:;" data-type="1">
                                        <div class="icon">
                                            <div><i class="i_webbank_pay"></i></div>
                                        </div><span>网银支付</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="item" href="javascript:;" data-type="2">
                                        <div class="icon">
                                            <div>
                                                <i class="i_scan_qrcode"></i>
                                            </div>
                                        </div>
                                        <span>扫码支付</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="item" href="javascript:;" data-type="3">
                                        <div class="icon">
                                            <div>
                                                <i class="i_bank_transfer"></i>
                                            </div>
                                        </div>
                                        <span>银行转账</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 支付方式 结束-->

                    <!-- 网银支付开始 -->
                    <div class="webbank_pay_all" style="display: none ;">
                        <form class="form_deposit">
                            <fieldset>
                                <div class="form_g text money">
                                    <legend>充值金额</legend>
                                    <input type="tel" placeholder=" " v-model="paymount" readonly>
                                  <!--  <i class="close"></i>-->
                                </div>
                            </fieldset>
                        </form>
                        <div class="step03 webbank_pay">
                            <h5>选择银行</h5>
                            <ul>
                                <li class="btn_bank bank01" v-for="list in banklist">
                                    <a href="javascript:;" title="list.bankName" @click="submitOnlinePay(list.code,list.id)">
                                     <!--   <img src="/static/images/info_bank_10.png" alt="">-->
                                        <img v-lazy="list.bankPic" alt="">
                                        <span>{{list.bankName}}</span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!-- 网银支付结束 -->
                    <!-- 扫码支付开始  -->

                    <!-- 扫码支付结束  -->

                </div>
            </div>
        </div>
       <!-- <deposit_bank_transfer v-if="false"></deposit_bank_transfer>-->
        <FooterNav />

        <AutoCloseDialog ref="autoCloseDialog" text=" " type="" />

    </div>



</template>

<script>
import $ from "jquery";
import Mixin from '@/Mixin'
 import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'
// import deposit_bank_transfer from '@/components/lobbyTemplate/deposit_bank_transfer'

export default {
  name: 'deposit',
  mixins:[Mixin],
  components: {
      AutoCloseDialog,
      FooterNav ,
     // deposit_bank_transfer
  },
    data: function() {
        return {
            paymount: '' ,  // 充值金额
            banklist: {} ,  // 充值金额
        }
    },
  mounted:function() {
        $('html,body').css('overflow-y','scroll' )  ;
        this.choosePayMoth() ;
  },
  methods: {
   // 金额验证
    /*  checkAmount:function () {
        if(this.paymount =='' || !this.isPositiveNum(this.paymount)){
            this.$refs.autoCloseDialog.open('请输入正确的存款金额') ;
            return false ;
        }
      },*/
      // 选择支付方式
      choosePayMoth:function () {
          var _self = this ;
          $('.pay_way').on('click','.item',function (e) {
              if(_self.paymount =='' || !_self.isPositiveNum(_self.paymount)){
                  _self.$refs.autoCloseDialog.open('请输入正确的存款金额') ;
                  return false ;
              }
              var $src = $(e.currentTarget);
              var val = $src.data('type');
              if(val == '1'){  // 网银支付
                  _self.getBankList() ;
                  $('.paymethods_all').hide() ;
                  $('.webbank_pay_all').show() ;
              }else if(val =='2'){  // 扫码支付

              }else{  // 银行转账

              }

          }) ;

      },
      // 获取银行列表
      getBankList:function () {
          var _self = this ;
          $.ajax({
              type: 'get',
              headers: {
                  "Authorization": "bearer  " + this.getAccessToken ,
              },
              url: _self.action.forseti + 'api/payment/banks',
              data: { },
              success: function(res){
                  for(var i=0;i<res.data.length;i++){
                      res.data[i].bankPic = _self.action.picurl+res.data[i].bankPic+'/0' ;
                  }
                _self.banklist = res.data ;
              },
              error: function (res) {

              }
          });
      },
      // 网银支付确定提交
      submitOnlinePay:function (code,bankid) {
          var _self = this ;
          var senddata ={
              chargeAmount: _self.paymount*100 , //  入款金额
              source: '2' , //   来源类型   1,PC, 2,H5
              bankCode: code ,  // 银行代码
              bankId : bankid ,  // 银行id
          }
          $.ajax({
              type: 'post',
              headers: {
                  "Authorization": "bearer  " + this.getAccessToken ,
              },
              url: _self.action.forseti + 'api/pay/onlineOrder',
              data: senddata ,
              success: function(res){
                  _self.$refs.autoCloseDialog.open('支付成功','','icon_check','d_check') ;
                  setTimeout(function () {
                      window.location = 'info' ;
                  },200)
              },
              error: function (res) {

              }
          });



      },
      
      
}

}
</script>