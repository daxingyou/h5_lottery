<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head" class="new_header">
            <div class="left">
                <router-link :to="'/lobbyTemplate/info'">
                    <span class="icon icon_back"></span>
                </router-link>
            </div>
            <h2 class="center title_name">充值</h2>
            <div class="right"></div>
        </header>
        <div class="pa_content">
            <div class="page_box">
                <div class="new_panel">
                    <div class="new_panel_top"></div>
                    <div class="new_panel_center">
                        <div class="deposit_area">
                            <div class="pay_content">
                                <!-- 支付方式 开始-->
                                <div class="paymethods_all">
                                    <form class="form_deposit">
                                        <fieldset>
                                            <div class="form_g text money">
                                                <legend>充值金额</legend>
                                                <input type="tel" placeholder="请输入充值金额" v-model="paymount"   >
                                                <i class="close" @click="clearMoney()"></i>
                                            </div>
                                            <div  v-if = 'showDepositHint' class="depositHint" id="depositHint"> {{ hintContent }}</div>
                                        </fieldset>
                                    </form>
                                    <!--支付方式-->
                                    <div class="step03 pay_way  payWayNet payWayTranster"  v-if = 'netPayShow'>
                                        <ul class="arrow_list_dark">
                                            <li v-for = '(payWay,key) in payWays' >
                                                <a class="item" href="javascript:;" :data-hf="payWay.rsUrl" :data-type='payWay.rsNameId'  :data-val="payWay.flag" @click=" choosePayMoth($event)" >
                                                    <span class="badge">
                                                        <span class="icon_account " :class="'icon_deposit_net'+payWay.rsNameId"></span>
                                                    </span>
                                                    <span>{{ payWay.rsName}}</span>
                                                    <span class="icon icon_arrow_light"></span>
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
                                                <input type="tel" placeholder=" " class="depositmount"  v-model="paymount"    readonly>
                                                <!--  <i class="close"></i>-->
                                            </div>
                                            <!-- <div  v-if = 'showDepositHint' class="depositHint" id="depositHint" > 请输入正确金额</div>  -->
                                        </fieldset>
                                    </form>
                                    <div class="step03 pay_list webbank_pay">
                                        <h5>选择银行</h5>
                                        <ul>
                                            <li class="btn_bank bank01" v-for="list in banklist">
                                                <a href="javascript:;" title="list.bankName" @click="submitOnlinePay(list.bankCode,'1')">
                                                    <!--   <img src="/static/frist/images/info_bank_10.png" alt="">-->
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
                                    <!--<div class="before-scan">-->
                                    <!--<form class="form_deposit">-->
                                    <!--<fieldset>-->
                                    <!--<div class="form_g text money">-->
                                    <!--<legend>充值金额</legend>-->
                                    <!--<input type="tel" placeholder=" " v-model="paymount" readonly>-->
                                    <!--&lt;!&ndash;  <i class="close"></i>&ndash;&gt;-->
                                    <!--</div>-->
                                    <!--</fieldset>-->
                                    <!--</form>-->
                                    <!--<div class="step03 pay_list scan_qrcoder">-->
                                    <!--<h5>支付方式</h5>-->
                                    <!--<ul>-->
                                    <!--<li class="btn_pay wechat_q" v-for="list in banklist">-->
                                    <!--<a href="javascript:;" @click="submitOnlinePay(list.bankCode,'3')">-->
                                    <!--<img v-lazy="list.img" alt="">-->
                                    <!--<span>{{list.bankName}}</span>-->
                                    <!--</a>-->
                                    <!--</li>-->
                                    <!--</ul>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <div class="after-scan" style="display: none;">
                                        <div class="scan_code">
                                            <div class="qrcode_step">
                                                <div class="qrcode qrode_success">
                                                    <!-- <img src="/static/frist/images/qrcode.jpg" alt="">-->
                                                    <img v-lazy="scanImg" alt="">
                                                </div>
                                                <div class="step">
                                                    1.请截屏或长按保存页面上的二维码图片到手机<br/>
                                                    2.打开微信/支付宝/QQ/京东/银联找到“扫一扫”进入<br/>
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
                                                    <span class="icon icon_arrow_down"></span>
                                                </div>
                                            </fieldset>
                                        </div>

                                        <div class="bank_account">
                                            <h5 class="push-left-tiny">收款账号</h5>
                                            <a class="mini_tip trans_step" href="javascript:;">
                                                <span class="icon icon_question"></span>转账步骤</a>
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
                                                    <span class="icon icon_copy"></span>复制该信息</a>
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
                                                    <select class="transparent" name="" v-model="bankval">   <!--1网银存款,2支付宝支付,3微信支付,4柜员机现金存款,5柜员机转账,6银行柜台存款,7其他支付-->
                                                        <option value="">请选择</option>
                                                        <option value="1">网银存款</option>
                                                        <option value="2">支付宝电子支付</option>
                                                        <option value="3">微信电子支付</option>
                                                        <option value="4">柜员机现金存款</option>
                                                        <option value="5">柜员机转帐</option>
                                                        <option value="6">银行柜台存款</option>
                                                        <option value="7">其他支付</option>
                                                    </select>
                                                    <span class="icon icon_arrow_down"></span>
                                                </div>
                                            </fieldset>
                                            <div class="btn btn_blue">
                                                <a class="new_btn bank-underline" href="javascript:;" @click="submitBankAction()"><span class="big">确定充值</span></a>
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
                </div>
            </div>
        </div>
        <!-- <deposit_bank_transfer v-if="false"></deposit_bank_transfer>-->
        <!--充值弹框-->
        <div class="modal" style="display: block">
            <div class="m_content">
                <h2 class="title">★【{{copyTitle}}】※
                    <a></a>
                </h2>
                <div v-html="copyContent"></div>
                <!--<p class="content left">-->
                <!--尊贵的会员您好！-->
                <!--<br/>公司将陆续接入多项支付通道，-->
                <!--<br/>WAP微信扫码、QQ扫码、网银支付、-->
                <!--<br/>（银行转账进行支付，大额无忧！-->
                <!--<br/>首选银行转账，可获得1%存款优惠-->
                <!--<br/>（存1000赠10，次次存次次送）。-->
                <!--</p>-->
                <div class="action">
                    <a class="new_btn"><span>确定</span></a>
                </div>
            </div>
        </div>
        <div class="bModal">
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
                    <a class="new_btn"><span>确定</span></a>
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
    import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
    import FooterNav from '@/components/Footer'
    // import deposit_bank_transfer from '@/components/lobbyTemplate/deposit_bank_transfer'
    // import '../../../static/js/mobiscroll.js'
    // import '../../../static/css/mobiscroll.css'

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
                payWays: {} ,  // 支付方式列表
                bankval: '' ,  // 银行转账方式
                submitpayflag: false ,  // 表单重复提交问题
                submitpayunflag: false ,  // 线下存款表单重复提交问题
                bankInfo: {
                    bankCode: '', // 默认工商银行
                },
                copyTitle:'',
                depositMinMoney:'',
                depositMaxMoney:'',
                copyContent:'',
                showDepositHint:false,
                hintContent:'',
                notNetPayShow:true,
                netPayShow:true,
                href:''

            }
        },
        created:function () {
            this.getPayWayList()
        },
        mounted:function() {

            // this.getLimit()

            var _self = this ;
            $('html,body').css('overflow-y','scroll' )  ;
//            _self.choosePayMoth() ;
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
            _self.getCopyright('3','AT01')
        },
        methods: {

            // 存款检测暂时取消
            // checkDepositMoney:function(paymount){

            //     var ifInCorrect = this.isPositiveNum( paymount )
            //     if(!ifInCorrect){
            //        // $('#depositHint').text('请输入正确的存款金额')
            //        this.hintContent = "请输入正确的存款金额"
            //        this.showDepositHint = true;
            //     }else{
            //        this.showDepositHint = false;
            //         if(   (paymount>=10000 ||paymount<100)&&( Number(paymount)!= 0  ) ){
            //            // $('#depositHint').text('存款金额必须在范围内')
            //            this.hintContent = "存款金额必须在范围内"
            //            this.showDepositHint = true;
            //         }else{
            //             this.showDepositHint = false;

            //         }

            //     }

            //     this.paymount = paymount;

            // },
            // 清空输入金额
            clearMoney:function () {
                this.paymount = ''  ;
            },
            // 银行转账步骤提示框
            bankTipShow:function () {
                $('.modal').click(function () {
                    $('.modal').toggle();
                });
                $('.mini_tip').click(function () {
                    $('.bModal').toggle();
                });
                $('.bModal').click(function () {
                    $('.bModal').toggle();
                });
            },
            // 选择支付方式
            choosePayMoth:function (e) {
                var _self = this ;
                // 转账
//                $('.payWayTranster').on('click','.item',function (e) {
                    if(_self.paymount =='' || !_self.isPositiveNum(_self.paymount)){
                        _self.$refs.autoCloseDialog.open('请输入正确的存款金额') ;
                        return false ;
                    }
                    // if( ( _self.paymount>=10000 ||_self.paymount<100)&&( Number(_self.paymount)!= 0  ) ){
                    //       _self.$refs.autoCloseDialog.open('存款金额必须在范围内') ;
                    //       return false ;
                    // }
                    // 范围暂时取消，只是将限额确定在大于100
                    // if( (_self.paymount<100)||( Number(_self.paymount)!= 0  ) ){
                    //       _self.$refs.autoCloseDialog.open('存款最低金额100元') ;
                    //       return false ;
                    // }
                    var $src = $(e.currentTarget);
                    var type = $src.data('type');
                    var val= $src.data('val')
                    var Href=$src.data('hf')
                   if(val=='0'){

                       if(type == '10'){  // 网银支付
                           _self.getBankList('2') ;
                           $('.paymethods_all').hide() ;
                           $('.webbank_pay_all').show() ;
                       }

                       if(type =='1'||type=='2'||type=='3'||type=='4'||type=='8'){
//                  // 扫码支付
//                    _self.getBankList() ;
//                     $('.paymethods_all').hide() ;
//                      $('.webbank_scan_all').show()
                           _self.onlinePay(type,'3')
                       }
                       if(type=='9'){  // 银行转账
                           _self.getAllBankList() ;
                           _self.getBankInfo() ;
                           $('.paymethods_all').hide() ;
                           $('.webbank_bank_all').show() ;
                       }
                   }
                   if(val=='1'){
                     window.open(Href,'_blank')
                    }
//                }) ;
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
            // 获取支付方式列表
            getPayWayList:function (type) {
                var _self = this ;
                $.ajax({
                    type: 'get',
                    headers: {
                        "Authorization": "bearer  " + this.getAccessToken ,
                    },
                    url: _self.action.forseti + 'api/pay/receiptClient',
                    // data: { type: type},  // 查询类型：1 扫码支付，2 银行卡支付
                    success: function(res){
                        //  console.log(res)
                        // console.log( res.data.splice(0,4) )
//                        res.data = res.data;
//                    console.log(res.data)
                        _self.payWays = res.data;
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
                    url: _self.action.forseti + 'apid/payment/banks',
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
                    // var win = window.open('about:blank') ;
                    var win = _self.openGame() ;
                }
                $.ajax({
                    type: 'post',
                    headers: {
                        "Authorization": "bearer  " + this.getAccessToken ,
                    },
                    url: _self.action.forseti + 'api/pay/onlineOrder',
                    async: false,
                    data: senddata ,
                    success: function(res){ // dataType 1 线上入款 , 3 二维码

                        if (!res.data) {
                            if (res.msg == 'SUCCESS') {
                                _self.$refs.autoCloseDialog.open('充值失败，请联系客服');
                            } else {
                                _self.$refs.autoCloseDialog.open(res.msg);

                            }

                        }

                        if(res.err == 'SUCCESS'){
                            if(type == '1'){ // 线上付款
                                _self.submitpayflag = false ;
                                if(res.data.dataType=='1'){ // 页面html
                                    var loadStr = res.data.html ;
//                               console.log(loadStr) ;
                                    win.document.write(loadStr) ;
                                }else if(res.data.dataType=='2'){ // 链接跳转
                                    var loadurl = res.data.url ;
                                    win.location.href = loadurl ;
                                }

                            }else if(type == '3'){  // 扫码支付


                                if(!res.data){
                                    _self.$refs.autoCloseDialog.open('请重试！') ;
                                    setTimeout(function () {
                                        window.location = '/lobbyTemplate/deposit' ;
                                    },300)
                                    return false ;
                                }else{
                                    setTimeout(function () {
                                        _self.submitpayflag = false ;
                                    },1000) ;

                                    if(res.data.dataType == '3'){ // 返回的是二维码
                                        _self.scanImg = _self.action.forseti+res.data.imageUrl ;
                                        _self.scanid = res.data.orderId ;
                                        _self.scanint = setInterval(function () {
                                            _self.getScanStatus(_self.scanid) ;
                                        },10000) ;
                                        $('.after-scan').show() ;
                                        $('.before-scan').hide() ;
                                    }else if(res.data.dataType == '5'){
                                        // 直接返回的是图片
                                        _self.scanImg = res.data.url ;
                                        _self.scanid = res.data.orderId ;
                                        _self.scanint = setInterval(function () {
                                            _self.getScanStatus(_self.scanid) ;
                                        },10000) ;
                                        $('.before-scan').hide() ;
                                        $('.after-scan').show() ;

                                    }else if(res.data.dataType == '2'){ // 返回链接跳转
                                        var sanurl = res.data.url ;
                                        // window.location.href = sanurl ;
                                        _self.openGame(sanurl) ;
                                    }
                                    document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
                                }

                            }

                        }else{
                            _self.submitpayflag = false ;
                            if(type == '1'){  // 线上入款失败
                                win.close() ;
                            }

                            _self.$refs.autoCloseDialog.open(res.msg);

                            setTimeout(function () {
                                window.location = '/lobbyTemplate/deposit' ;
                            },300)

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
                var pageUrl=window.location.href
                if(pageUrl.indexOf('deposit')==-1){
                    clearInterval(_self.scanint) ;
                    return false
                }
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
                        if(res.data){
                            _self.userInfo = res.data ;
                        }

                    },
                    error: function (e) {
                        _self.errorAction(e) ;
                    }
                });
            },
            //获取限额
            // getLimit:function () {
            //       var _self = this ;
            //       $.ajax({
            //           type: 'get',
            //           headers: {
            //               "Authorization": "bearer  " + this.getAccessToken ,
            //           },
            //           url: _self.action.forseti + 'api/payment/incomeBank',
            //           data: { },
            //           success: function(res){
            //             _self.userInfo = res.data ;
            //           },
            //           error: function (e) {
            //               _self.errorAction(e) ;
            //           }
            //       });
            //   },
            // 银行转账提交
            submitBankAction:function () {
                var _self = this ;
                if( _self.submitpayunflag){
                    return false ;
                }
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
                        if(!res.data){
                            _self.$refs.autoCloseDialog.open(res.msg) ;
                        }
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
            //在线支付
            onlinePay :function (rsNameId,type) {
                var _self=this;
                var senddata ={
                    chargeAmount: _self.paymount*100 , //  入款金额
                    source: '2' , //   来源类型   1,PC, 2,H5
                    rapidType:rsNameId ,  // 支付类型
                    paymentType: '' ,  // 支付方式/银行代码(对应payment_type_id和bank_code)
                    paymentTypeName: '' ,  // 支付名称/银行名称(对应payment_type_name/bank_name)
                    realName:  '' ,  // 真实姓名
                    flowType : '4' ,  // 入款方式 3-银行第三方支付，4-快捷支付
                }
                $.ajax({
                    type: 'post',
                    headers: {
                        "Authorization": "bearer  " + this.getAccessToken ,
                    },
                    url: _self.action.forseti + 'api/pay/rapidOrder',
                    async: false,
                    data: senddata,
                    success: function(res){ // dataType 1 线上入款 , 3 二维码
                        if(res.err == 'SUCCESS'){
                            console.log('seccess')
                            if(type == '1'){ // 线上付款
                                _self.submitpayflag = false ;
                                if(res.data.dataType=='1'){ // 页面html
                                    var loadStr = res.data.html ;
//                               console.log(loadStr) ;
                                    win.document.write(loadStr) ;
                                }else if(res.data.dataType=='2'){ // 链接跳转
                                    $('.paymethods_all').show();
                                    var loadurl = res.data.url ;
                                    win.location.href = loadurl ;
                                }
                            }else if(type == '3'){  // 扫码支付
                                console.log(!res.data + 'chongshi')
                                if(!res.data){
                                    _self.$refs.autoCloseDialog.open('请重试！') ;
                                    setTimeout(function () {
                                        window.location = '/lobbyTemplate/deposit' ;
                                    },300)
                                    return false ;
                                }else{
                                    setTimeout(function () {
                                        _self.submitpayflag = false ;
                                    },1000) ;

                                    if(res.data.dataType == '3'){ // 返回的是二维码
                                        _self.scanImg = _self.action.forseti+res.data.imageUrl ;
                                        _self.scanid = res.data.orderId ;
                                        _self.scanint = setInterval(function () {
                                            _self.getScanStatus(_self.scanid) ;
                                        },1000) ;
                                        $('.paymethods_all').hide();
                                        $('.webbank_scan_all').show() ;
                                        $('.after-scan').show() ;
                                    }else if(res.data.dataType == '5'){
                                        // 直接返回的是图片
                                        _self.scanImg = res.data.url ;
                                        _self.scanid = res.data.orderId ;
                                        _self.scanint = setInterval(function () {
                                            _self.getScanStatus(_self.scanid) ;
                                        },10000) ;
                                        $('.paymethods_all').hide() ;
                                        $('.webbank_scan_all').show() ;
                                        $('.after-scan').show() ;
                                    }else if(res.data.dataType == '2'){ // 返回链接跳转
                                        var sanurl = res.data.url ;
                                        // window.location.href = sanurl ;
                                        _self.openGame(sanurl) ;
//                                  _self.paymount='';
                                    }

                                    document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
                                }

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
                })
            },
        }

    }
</script>

<style type="text/css">
    #depositHint{
        display: block;
        padding-left: 2.444rem;
        color: red;
        font-size: 0.34rem;
        height: 0.6rem;
        line-height: 0.6rem;
        /*background-color: rgba(0, 0, 0, 0.5);*/
        margin-top: 0.185rem;
    }
    .bModal { display: none; position: fixed; top: 0; left: 50%; width: 10rem; margin-left: -5rem; height: 100%; background-color: rgba(0, 0, 0, 0.6); z-index: 1000; }
    .bModal .m_content { position: fixed; z-index: 33; width: 8rem; top: 25%; left: 50%; margin-left: -4rem; padding: 0.3rem 0.5rem 0.7rem; box-sizing: border-box; color: #4b280c; background: url("/static/frist/images/pop/bg_center.png") repeat-y;  background-size: 100%; word-wrap: break-word;}
    .bModal .m_content:before { content: ''; position: absolute; display: block; top: -0.3rem; left: 0; z-index: 33; height: 1.173rem; width: 100%; background: url("/static/frist/images/pop/bg_top.png") no-repeat;  background-size: 100%; }
    .bModal .m_content:after { content: ''; position: absolute; display: block; bottom: -0.3rem; left: 0; z-index: 33; height: 1.173rem; width: 100%; background: url("/static/frist/images/pop/bg_bottom.png") no-repeat;  background-size: 100%; }
    @media (max-width: 359px) {.bModal .m_content { width: 9rem; } }
    .bModal .m_content > *{ position: relative; z-index: 35;}
    .bModal .m_content h2 { background: url('/static/frist/images/pop/title_bg.jpg') no-repeat; background-size: 100% 0.8rem; height: 0.8rem; line-height: 0.8rem; font-size: 0.45rem; font-weight: bold; font-style: italic; text-align: center; color: #4b280c; }
    .bModal .m_content h2 a { width: 0.7467rem; height: 0.7467rem; position: absolute; right: -0.65rem; top: -0.7rem; background: url("/static/frist/images/pop/close.png") no-repeat; background-size: 100%; }
    .bModal .m_content h2.noclose a { display: none;}
    .bModal .m_content .content { text-align: center; line-height: .6rem; font-size: 0.34rem; margin: .5rem auto; }
    .bModal .m_content .danger { color: #b41a17; }
    .bModal .m_content .check { color: #d59559; }
    .bModal .m_content .left { text-align: left; padding: .5rem; }
    .bModal .m_content .action { text-align: center;}
    .bModal .m_content .tip_icon { width: 0.8rem; height:0.8rem; margin: 0.5rem auto 0.3rem;}
    .bModal .m_content .tip_icon img{ width: 100%;}
    /*.bModal > .m_content > .content > div { margin: 0 auto; text-align: center; }*/

    .bModal > .m_content > .content > div > img { height: 1rem; display: block; margin: 0 auto; }

    .bModal > .m_content > .content > div > img:last-child { height: 0.8rem; margin: .2rem auto; }


.arrow_list_dark { position: relative;}
.arrow_list_dark li{ float: left; width: 50%; }
.arrow_list_dark::after{ content: ''; display: table; clear: both;}
.arrow_list_dark .badge{ background: url(/static/frist/images/logo_bg.png) no-repeat;background-size: 100% 100%;width: 1.5rem;height: 1.5rem; margin-right: 0.2rem; }
.arrow_list_dark .icon{ /*float: right;*/ margin-top: 0.45rem; display: none; position: absolute; top: 50%; margin-top: -0.32rem; right: 0;}

.deposit_area { padding: 0 0.3rem; }
.pay_content {  }
.pay_content .step03 { color: #ffc388; margin: 0 auto; text-align: left;}


.pay_content .step03.pay_way { max-width: 100%; }

.pay_content .step03 .bank_account { color: #ffc388; padding-left: .4rem; }

.pay_content .step03 .bank_account .push-left-tiny { margin-left: 1em; }

.pay_content .step03 > h5 { text-align: left; font-size: 0.34rem; margin-bottom: .2rem; }


.pay_content .step03.webbank_pay { padding: .5rem 0; }

.pay_content .step03.webbank_pay label { padding-left: .5rem; margin-bottom: 1rem; display: inline-block; }

.pay_content .step03.webbank_pay > ul { width: 100%; margin: 0 auto; font-size: 0; overflow: hidden; }

/* 选择银行 */
.pay_content .pay_list li {  border-radius: 0.1rem; padding: 0.05rem 0.2rem; background-color: #d59559; margin: .2rem 0; border: 1px solid #d59559; box-sizing: border-box;   width: 49%; margin-right: 2%; display: inline-block; font-size: .34rem; }
.pay_content .pay_list li:nth-child(even){margin-right: 0;}
.pay_content .pay_list li a { display: block; line-height: 3em; text-align: center; color: #4b280c;}
.pay_content .pay_list li a img { width: .5rem; margin-right: 0.1rem; vertical-align: middle; display: inline-block; }



.pay_way > ul > li {  border-top: 1px solid #90573e;   position: relative; }


.pay_way > ul > li > a { color: #ffc388; display: inline-block; width: 100%; padding: 1em 0;}

.pay_way > ul > li > a > div.icon { display: inline-block; margin: 0 1em 0 2.2em; float: left; }

.pay_way > ul > li > a span { vertical-align: -webkit-baseline-middle; vertical-align: -moz-middle-with-baseline; line-height: 1.5rem; float: left; font-size: 0.35rem; }



.icon_account  { display: inline-block; vertical-align: middle; width: 1.5rem;  height: 1.5rem; margin: 0 auto; background-image: url(/static/frist/images/icon_account.png);    background-size: 7.5rem auto; background-position: 0 -4.5rem;}


/*.icon_deposit_net1 {background-image: url(../images/icon_deposit_1.png); background-size: 0.722222rem auto;  background-repeat: no-repeat;    background-position: center center; }*/
/*.icon_deposit_net2 {background-image: url(../images/icon_deposit_2.png); background-size: 0.722222rem auto;  background-repeat: no-repeat;    background-position: center center; }*/
/*.icon_deposit_net3 {background-image: url(../images/icon_deposit_3.png); background-size: 0.722222rem auto;  background-repeat: no-repeat;    background-position: center center; }*/
/*.icon_deposit_net4 {background-image: url(../images/icon_deposit_4.png); background-size: 0.722222rem auto;  background-repeat: no-repeat;    background-position: center center; }*/
/*.icon_deposit_net8 {background-image: url(../images/icon_deposit_5.png); background-size: 1.111111rem auto;  background-repeat: no-repeat;    background-position: center center; }*/

.icon_account.icon_deposit { background-position: 0rem 0; }
.icon_account.icon_withdrawals { background-position: -1.5rem 0; }
.icon_account.icon_promo { background-position: -3rem 0; }
.icon_account.icon_service { background-position: -4.5rem 0; }
.icon_account.icon_info_1 { background-position: 0rem -1.5rem; }
.icon_account.icon_info_2 { background-position: -1.5rem -1.5rem; }
.icon_account.icon_info_3 { background-position: -3rem -1.5rem; }
.icon_account.icon_info_4 { background-position: -4.5rem -1.5rem; }
.icon_account.icon_join_1 { background-position: 0rem -3rem; }
.icon_account.icon_join_2 { background-position: -1.5rem -3rem; }
.icon_account.icon_join_3 { background-position: -3rem -3rem; }
.icon_account.icon_deposit_1 { background-position: 0rem -4.5rem; } /* 网银支付 */
.icon_account.icon_deposit_13 { background-position: 3rem 1.5rem; }
.icon_account.icon_deposit_2 { background-position: -1.5rem -4.5rem; } /* 扫码支付 */
.icon_account.icon_deposit_3 { background-position: -3rem -4.5rem; } /* 银行支付 */
.icon_account.icon_deposit_4 { background-position: -4.5rem -4.5rem; }
.icon_account.icon_deposit_5 { background-position: -3rem -6rem; }
.icon_account.icon_deposit_6 { background-position: -4.5rem -6rem; }
.icon_account.icon_deposit_7 { background-position: -4.5rem -3rem; }
.icon_account.icon_deposit_net1{ background-position: -4.5rem -3rem;} /* 微信支付 */
.icon_account.icon_deposit_net2{ background-position: -4.5rem -4.5rem;} /* 支付宝支付 */
.icon_account.icon_deposit_net3{ background-position: -3rem -6rem;}/* QQ钱包 */
.icon_account.icon_deposit_net4{ background-position: -4.5rem -6rem;}/* 京东支付 */
.icon_account.icon_deposit_net8{ background-position: -6rem -4.5rem;}/* 银联扫码 */
.icon_account.icon_deposit_net9 {background-position: -3rem -4.5rem;} /* 银行转帐 */
.icon_account.icon_deposit_net10 { background-position: 3rem 1.5rem; } /* 网银支付(扫码) */
.icon_account.icon_notice_1 { background-position: 0rem -6rem; } /* 个人消息(未读) */
.icon_account.icon_notice_2 { background-position: -1.5rem -6rem; } /* 个人消息(已读) */
.icon_account.icon_ac01 { background-position: 0rem -7.5rem; }
.icon_account.icon_ac02 { background-position: -1.5rem -7.5rem; }
.icon_account.icon_ac03 { background-position: -3rem -7.5rem; }


</style>