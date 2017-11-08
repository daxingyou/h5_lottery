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
                    <div class="webbank_scan_all" style="display: none ;">
                        <form class="form_deposit">
                            <fieldset>
                                <div class="form_g text money">
                                    <legend>充值金额</legend>
                                    <input type="tel" placeholder=" " v-model="paymount" readonly>
                                    <!--  <i class="close"></i>-->
                                </div>
                            </fieldset>
                        </form>
                        <div class="step03 scan_qrcoder">
                            <h5>支付方式</h5>
                            <ul>
                                <li class="btn_pay wechat_q">
                                    <a href="javascript:;">
                                        <img src="/static/images/info_bank_01.png" alt="">
                                        <span>微信二维码</span>
                                    </a>
                                </li>
                                <li class="btn_pay alipay_q">
                                    <a href="javascript:;">
                                        <img src="/static/images/info_bank_04.png" alt="">
                                        <span>支付宝二维码</span>
                                    </a>
                                </li>
                                <li class="btn_pay alipay">
                                    <a href="javascript:;">
                                        <img src="/static/images/info_bank_07.png" alt="">
                                        <span>支付宝App</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 扫码支付结束  -->

                    <!--  银行转账开始-->
                    <div class="webbank_bank_all" style="display: none ;">
                        <form class="form_deposit">
                            <fieldset>
                                <div class="form_g text money">
                                    <legend>充值金额</legend>
                                    <input type="tel" placeholder=" " v-model="paymount" readonly>
                                    <!--  <i class="close"></i>-->
                                </div>
                            </fieldset>
                        </form>
                        <div class="bank_transfer">
                            <fieldset>
                                <div class="form_g text">
                                    <legend>选择银行</legend>
                                    <select name="">
                                        <option :value="bank.bankCode" v-for="bank in banklist">{{bank.bankName}}</option>

                                    </select>
                                </div>
                                <i class="input_select"></i>

                            </fieldset>

                            <div class="bank_account">
                                <h5 class="push-left-tiny">收款账号</h5>
                                <a class="mini_tip trans_step" href="javascript:;">
                                    <i class="i_help"></i>转账步骤</a>
                                <div class="print_data">
                                    <table class="js-copytextarea">
                                        <thead>
                                        <tr>
                                            <th>
                                                <li>银行名称</li>
                                            </th>
                                            <td>{{userInfo.bankName}}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>收款人</li>
                                            </th>
                                            <td>{{userInfo.realName}}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>开户行</li>
                                            </th>
                                            <td>{{userInfo.bankAddress}}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>银行账号</li>
                                            </th>
                                            <td>{{userInfo.bankCard}}</td>
                                        </tr>
                                        </thead>
                                    </table>
                                    <a class="copy_link js-textareacopybtn copy-text" href="javascript:;"  @click="copyText()"
                                       :data-clipboard-text="'银行名称：'+userInfo.bankName+' 收款人：'+userInfo.realName +' 开户行：'+userInfo.bankAddress +' 银行账号：'+userInfo.bankCard"
                                    >
                                        <i class="icon_copy"></i>复制该信息</a>
                                </div>
                            </div>
                            <fieldset>
                                <div class="form_g text">
                                    <legend for="">存款时间</legend>
                                    <input class="date"  id="paydate" placeholder=" ">
                                    <i class="input_date"></i>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="form_g text">
                                    <legend for="">存款人</legend>
                                    <input type="text" placeholder="请输入存款人姓名">
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="form_g text">
                                    <legend id="bank">存款方式</legend>
                                    <select class="transparent" name="">
                                        <option value="">网银存款</option>
                                        <option value="">支付宝电子支付</option>
                                        <option value="">微信电子支付</option>
                                        <option value="">柜员机现金存款</option>
                                        <option value="">柜员机转帐</option>
                                        <option value="">银行柜台存款</option>
                                        <option value="">其他支付</option>
                                    </select>
                                    <i class="input_select"></i>
                                </div>
                            </fieldset>
                            <div class="btn btn_blue">
                                <a href="deposit_success.html">确定充值</a>
                            </div>
                        </div>
                    </div>
                    <!--  银行转账结束 -->
                </div>
            </div>
        </div>
       <!-- <deposit_bank_transfer v-if="false"></deposit_bank_transfer>-->

        <!--银行转账使用步骤-->
        <div class="modal">
            <div class="m_content">
                <h2 class="title">银行转账使用步骤
                    <a></a>
                </h2>
                <p class="content left">
                    1. 选择您使用的存款银行，底部会出现对应的收款银行卡号；
                    <br/> 2. 记录或复制该收款信息到手机上；
                    <br/> 3. 填写您的存款时间、金额等信息，以及选择您的存款方式；
                    <br/> 4. 前去银行或网银等转账到收款账号，完成后保留凭证；
                    <br/> 5. 等待客服处理您的订单，完成支付；
                    <br/>
                </p>
                <div class="action">
                    <a class="ok">确定</a>
                </div>
            </div>
        </div>

        <FooterNav />

        <AutoCloseDialog ref="autoCloseDialog" text=" " type="" />

    </div>



</template>

<script>
import $ from "jquery";
import Mixin from '@/Mixin'
import Clipboard from 'clipboard'
import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'
// import deposit_bank_transfer from '@/components/lobbyTemplate/deposit_bank_transfer'
// import '../../../static/js/mobiscroll.js'

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
            userInfo: {} ,  // 个人资料
        }
    },
    creeted:function () {
       /* setTimeout(function () {
            var now = new Date(),
                minDate = new Date(now.getFullYear() - 1, now.getMonth()+1, now.getDate(),now.getHours() - 12),
                maxDate = new Date(now.getFullYear() + 1, now.getMonth()+1, now.getDate(),now.getHours() - 12);
            $.mobiscroll.setDefaults({   //日期控件
                theme: 'ios', //皮肤样式 android
                lang: 'zh',
                dateFormat: 'yy/mm/dd',  // 日期格式
                mode: 'scroller', //日期选择模式 mixed
                display: 'bottom',
                min: minDate,
                max: maxDate,
                defaultValue:common.setAmerTime('#paydate'), //时间默认值
                dateWheels: '|yy M d|',
                startYear: 2017, //开始年份
                endYear:2020 //结束年份
            });
            $("#paydate").mobiscroll().datetime({ });


        },500)*/
    },
  mounted:function() {
        $('html,body').css('overflow-y','scroll' )  ;
        this.choosePayMoth() ;
        this.bankTipShow() ;

  },
  methods: {
      // 银行转账步骤提示框
      bankTipShow:function () {
          $('.trans_step').click(function () {
              $('.modal').toggle();
          });
          $('.modal').click(function () {
              $('.modal').toggle();
          });
      },

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
                  $('.paymethods_all').hide() ;
                  $('.webbank_scan_all').show() ;
              }else{  // 银行转账
                  _self.getBankList() ;
                  _self.getBankInfo() ;
                  $('.paymethods_all').hide() ;
                  $('.webbank_bank_all').show() ;
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
                  _self.$refs.autoCloseDialog.open('支付失败') ;
              }
          });

      },
      // 银行转账 个人信息
      getBankInfo:function () {
          var _self = this ;
          $.ajax({
              type: 'get',
              headers: {
                  "Authorization": "bearer  " + this.getAccessToken ,
              },
              url: _self.action.forseti + 'api/payment/memberBank',
              data: { },
              success: function(res){
                _self.userInfo = res.data ;
              },
              error: function (res) {

              }
          });
      },
  // 银行转账提交
      submitBankActtion:function () {

      },

      // 复制资料信息
      copyText:function () {
          var _self = this ;
          var clipboard = new Clipboard('.copy-text') ;
          clipboard.on('success', function (e) {
              _self.$refs.autoCloseDialog.open('复制成功！','','icon_check','d_check') ;
              // 释放内存
              clipboard.destroy() ;
          });
          clipboard.on('error', function (e) {
              _self.$refs.autoCloseDialog.open('浏览器不支持自动复制，请手动复制！') ;
              // 释放内存
              clipboard.destroy() ;
          })  ;
      },

}

}
</script>