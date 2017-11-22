<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="../../../static/white/images/back.png" alt="">
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
                                    <i class="close" @click="clearMoney()"></i>
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
                                    <a href="javascript:;" title="list.bankName" @click="submitOnlinePay(list.bankCode,'1')">
                                     <!--   <img src="/static/white/images/info_bank_10.png" alt="">-->
                                        <img v-lazy="list.img" alt="">
                                        <span>{{list.bankName}}</span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!-- 网银支付结束 -->
                    <!-- 扫码支付开始  -->
                    <div class="webbank_scan_all" style="display: none ;">
                        <div class="before-scan">
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
                                    <li class="btn_pay wechat_q" v-for="list in banklist">
                                        <a href="javascript:;" @click="submitOnlinePay(list.bankCode,'3')">
                                            <img v-lazy="list.img" alt="">
                                            <span>{{list.bankName}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="after-scan" style="display: none;">
                            <div class="scan_code">
                                <div class="qrcode_step">
                                    <div class="qrcode qrode_success">
                                       <!-- <img src="/static/white/images/qrcode.jpg" alt="">-->
                                        <img v-lazy="scanImg" alt="">
                                    </div>
                                    <div class="step">
                                        1.请截屏或长按保存页面上的二维码图片到手机<br/>
                                        2.打开微信/支付宝找到“扫一扫”进入<br/>
                                        3.进入后点击右上角从"相册选取"选择最新的二维码图片<br/>
                                        4.完成支付后回到网站内检查余额<br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 扫码支付结束  -->

                    <!--  银行转账开始-->
                    <div class="webbank_bank_all" style="display: none ;">
                        <div class="before_pay">
                            <form class="form_deposit">
                                <fieldset>
                                    <div class="form_g text money">
                                        <legend>充值金额</legend>
                                        <input type="tel" placeholder=" " v-model="paymount" readonly>
                                        <!--  <i class="close"></i>-->
                                    </div>
                                </fieldset>
                            </form>
                        </div>

                        <div class="bank_transfer">
                            <div class="before_pay">
                                <fieldset>
                                    <div class="form_g text">
                                        <legend>选择银行</legend>
                                        <select name="" v-model="bankInfo.bankCode">
                                            <option value="" >请选择</option>
                                            <option :value="bank.bankCode" v-for="bank in allbanklist">{{bank.bankName}}</option>
                                        </select>
                                    </div>
                                    <i class="input_select"></i>
                                </fieldset>
                            </div>

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
                                            <td>{{userInfo.cardOwnerName}}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>开户行</li>
                                            </th>
                                            <td>{{userInfo.registerBankInfo}}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>银行账号</li>
                                            </th>
                                            <td>{{userInfo.cardNo}}</td>
                                        </tr>
                                        </thead>
                                    </table>
                                    <a class="copy_link js-textareacopybtn copy-text" href="javascript:;"  @click="copyText()"
                                       :data-clipboard-text="'银行名称：'+userInfo.bankName+' 收款人：'+userInfo.cardOwnerName +' 开户行：'+userInfo.registerBankInfo +' 银行账号：'+userInfo.cardNo"
                                    >
                                        <i class="icon_copy"></i>复制该信息</a>
                                </div>
                            </div>
                            <div class="before_pay">
                                <fieldset>
                                    <div class="form_g text">
                                        <legend for="">存款时间</legend>
                                        <input type="text" class="date"  id="paydate" readonly>
                                        <i class="input_date"></i>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div class="form_g text">
                                        <legend for="">存款人</legend>
                                        <input type="text" placeholder="请输入存款人姓名" v-model="banksavename">
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div class="form_g text">
                                        <legend id="bank">存款方式</legend>
                                        <select class="transparent" name="" v-model="bankval">   1网银存款,2支付宝支付,3微信支付,4柜员机现金存款,5柜员机转账,6银行柜台存款,7其他支付
                                            <option value="">请选择</option>
                                            <option value="1">网银存款</option>
                                            <option value="2">支付宝电子支付</option>
                                            <option value="3">微信电子支付</option>
                                            <option value="4">柜员机现金存款</option>
                                            <option value="5">柜员机转帐</option>
                                            <option value="6">银行柜台存款</option>
                                            <option value="7">其他支付</option>
                                        </select>
                                        <i class="input_select"></i>
                                    </div>
                                </fieldset>
                                <div class="btn btn_blue">
                                    <a class="bank-underline" href="javascript:;" @click="submitBankAction()">确定充值</a>
                                </div>
                            </div>
                            <!-- 提交存款成功后 -->
                            <div class="after_pay bank_account" style="display: none ;">
                                <h5>您的存款信息</h5>
                                <div class="print_data">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>
                                                <li>存款时间</li>
                                            </th>
                                            <td class="bank-save-time"> </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>存款金额</li>
                                            </th>
                                            <td>{{paymount}}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>存款人</li>
                                            </th>
                                            <td>{{banksavename}}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>存款方式</li>
                                            </th>
                                            <td class="bank-save-type"> </td>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
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

// // import $ from "jquery";
import Mixin from '@/Mixin'
import Clipboard from 'clipboard'
import AutoCloseDialog from '@/whitecomponents/publicTemplate/AutoCloseDialog'
import FooterNav from '@/whitecomponents/Footer'
// import deposit_bank_transfer from '@/whitecomponents/lobbyTemplate/deposit_bank_transfer'
 // import '../../../static/js/mobiscroll.js'
 // import '../../../static/white/css/mobiscroll.css'

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
            banklist: {} ,  // 配置的银行列表
            allbanklist: {} ,  // 所有银行列表
            userInfo: {} ,  // 收款帐号个人资料
            banksavename: '' ,  // 银行转账存款人
            scanImg: '' ,  // 扫码支付二维码
            scanid: '' ,  // 扫码支付订单二维码
            scanint: {} ,  // 扫码支付定时器
            bankval: '' ,  // 银行转账方式
            submitpayflag: false ,  // 表单重复提交问题
            submitpayunflag: false ,  // 线下存款表单重复提交问题
            bankInfo: {
                bankCode: '', // 默认工商银行
            },
        }
    },
    creeted:function () {


    },
  mounted:function() {
      var _self = this ;
        $('html,body').css('overflow-y','scroll' )  ;
      _self.choosePayMoth() ;
      _self.bankTipShow() ;
      setTimeout(function () {
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
              defaultValue:_self.setAmerTime('#paydate'), //时间默认值
              dateWheels: '|yy M d|',
              startYear: 2017, //开始年份
              endYear:2020 //结束年份
          });
          $("#paydate").mobiscroll().datetime({ });


      },500)

  },
  methods: {
      // 清空输入金额
      clearMoney:function () {
        this.paymount = ''  ;
      },
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
                  _self.getBankList('2') ;
                  $('.paymethods_all').hide() ;
                  $('.webbank_pay_all').show() ;
              }else if(val =='2'){  // 扫码支付
                  _self.getBankList('1') ;
                  $('.paymethods_all').hide() ;
                  $('.webbank_scan_all').show() ;
              }else{  // 银行转账
                  _self.getAllBankList() ;
                  _self.getBankInfo() ;
                  $('.paymethods_all').hide() ;
                  $('.webbank_bank_all').show() ;
              }

          }) ;

      },
      // 获取银行列表
      getBankList:function (type) {
          var _self = this ;
          $.ajax({
              type: 'get',
              headers: {
                  "Authorization": "bearer  " + this.getAccessToken ,
              },
              url: _self.action.forseti + 'api/payment/thirdBanks',
              data: { type: type},  // 查询类型：1 扫码支付，2 银行卡支付
              success: function(res){
                  for(var i=0;i<res.data.length;i++){
                      res.data[i].img = _self.action.picurl+res.data[i].img+'/0' ;
                  }
                _self.banklist = res.data ;
              },
              error: function (e) {
                  _self.errorAction(e) ;
              }
          });
      },
      // 获取所有银行列表
      getAllBankList:function () {
          var _self = this ;
          $.ajax({
              type: 'get',
             /* headers: {
                  "Authorization": "bearer  " + this.getAccessToken ,
              },*/
              url: _self.action.forseti + 'apis/payment/banks',
              data: { },
              success: function(res){
                  _self.allbanklist = res.data ;
              },
              error: function (e) {
                  _self.errorAction(e) ;
              }
          });
      },
      // 网银支付确定提交 type 1 线上入款 ，3 二维码
      submitOnlinePay:function (code,type) {
          var _self = this ;
          if(_self.submitpayflag){
              return false ;
          }
          var senddata ={
              chargeAmount: _self.paymount*100 , //  入款金额
              source: '2' , //   来源类型   1,PC, 2,H5
              thirdPayCode: code ,  // 银行代码
              paymentType: '' ,  // 支付方式/银行代码(对应payment_type_id和bank_code)
              paymentTypeName: '' ,  // 支付名称/银行名称(对应payment_type_name/bank_name)
              realName : '' ,  // 真实姓名
              flowType : '4' ,  // 入款方式 3-银行第三方支付，4-快捷支付
          }
          _self.submitpayflag = true ;
          if(type == '1'){ // 线上付款
              var win = window.open('about:blank') ;
          }
          $.ajax({
              type: 'post',
              headers: {
                  "Authorization": "bearer  " + this.getAccessToken ,
              },
              url: _self.action.forseti + 'api/pay/onlineOrder',
              data: senddata ,
              success: function(res){ // dataType 1 线上入款 , 3 二维码
                  if(res.err == 'SUCCESS'){
                      _self.submitpayflag = false ;
                      if(type == '1'){ // 线上付款
                          var loadurl = res.data.url ;
                          win.location.href = loadurl ;
                      }else if(type == '3'){  // 扫码支付
                          _self.scanImg = _self.action.forseti+res.data.imageUrl ;
                          _self.scanid = res.data.orderId ;
                          _self.scanint = setInterval(function () {
                              _self.getScanStatus(_self.scanid) ;
                          },10000) ;
                          $('.after-scan').show() ;
                          $('.before-scan').hide() ;
                          //scrollTo(0,0);
                          document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
                      }

                  }else{
                      _self.submitpayflag = false ;
                      if(type == '1'){  // 线上入款失败
                          win.close() ;
                      }
                      _self.$refs.autoCloseDialog.open(res.msg) ;
                  }

              },
              error: function (res) {
                  _self.submitpayflag = false ;
                  win.close() ;
                  _self.$refs.autoCloseDialog.open('支付失败') ;
              }
          });

      },
      // 扫码支付轮询接口
      getScanStatus:function (id) {
          var _self = this ;
          $.ajax({
              type: 'get',
              headers: {
                  "Authorization": "bearer  " + _self.getAccessToken ,
              },
              url: _self.action.forseti + 'api/pay/checkPayStatus',
              data: { orderId: id ,} ,
              success: function(res){ // dataType 1 线上入款 , 3 二维码
                  if(res.err == 'SUCCESS'){
                    if(res.data == true){ // 支付成功
                        clearInterval(_self.scanint) ;
                        _self.$refs.autoCloseDialog.open('支付成功！','','icon_check','d_check') ;
                        setTimeout(function () {
                           // window.location.reload() ;
                            _self.$router.go('/lobbyTemplate/deposit') ;
                        },2000)

                    }

                  }

              },
              error: function (res) {

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
              url: _self.action.forseti + 'api/payment/incomeBank',
              data: { },
              success: function(res){
                _self.userInfo = res.data ;
              },
              error: function (e) {
                  _self.errorAction(e) ;
              }
          });
      },
  // 银行转账提交
      submitBankAction:function () {
          var _self = this ;
          if( _self.submitpayunflag){
              console.log('发货的')
              return false ;
          }
          console.log('和积分抵扣')

          if(!_self.bankInfo.bankCode){
              _self.$refs.autoCloseDialog.open('请选择存款银行！') ;
              return false ;
          }
          if(!_self.banksavename || !this.trueName(_self.banksavename)){
              _self.$refs.autoCloseDialog.open('请输入正确的存款人姓名！') ;
              return false ;
          }
          if(!_self.bankval){
              _self.$refs.autoCloseDialog.open('请选择存款方式！') ;
              return false ;
          }
          _self.submitpayunflag = true ;
          var userInfo = _self.userInfo ;
          var senddata ={
              chargeAmount: _self.paymount*100 , //  入款金额
              source: '2' , //  来源类型   1,PC, 2,H5
              payMethod : _self.bankval ,  // 存款方式 1网银存款,2支付宝支付,3微信支付,4柜员机现金存款,5柜员机转账,6银行柜台存款,7其他支付
              depositorName : _self.banksavename ,  // 存款人真实姓名
              realName : _self.banksavename ,  // 存款人姓名
              depositorBankCode : _self.bankInfo.bankCode ,  // 存款人银行代码
              cardNo: userInfo.cardNo , // 收款人 存入银行账号/快充账户
              bankCode: userInfo.bankCode ,  // 收款人银行代码
              registerBankInfo : userInfo.registerBankInfo ,  // 收款人开户行
              cardOwnerName : userInfo.cardOwnerName ,  // 收款人名字
              flowType : '1' ,  // 入款方式 1-公司转账，2-钱包快充
          }

          $.ajax({
              type: 'post',
              headers: {
                  "Authorization": "bearer  " + this.getAccessToken ,
              },
              url: _self.action.forseti + 'api/pay/offlineOrder',
              data: senddata ,
              success: function(res){
                  if(res.err == 'SUCCESS'){
                      _self.submitpayunflag = false ;
                      _self.$refs.autoCloseDialog.open('存款申请已提交，请牢记以下信息','','icon_check','d_check') ;
                      $('.after_pay').show() ;
                      $('.before_pay').hide() ;
                      scrollTo(0,0);
                  }

                  _self.$nextTick(function () { // 支付成功后
                      $('.bank-save-time').text($('#paydate').val()) ;
                      $('.bank-save-type').text($('.transparent').find('option:selected').text()) ;

                  });

              },
              error: function (res) {
                  _self.submitpayunflag = false ;
                  _self.$refs.autoCloseDialog.open('存款失败') ;
              }
          });


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