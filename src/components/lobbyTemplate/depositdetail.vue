<template>
    <!-- 线上支付 网银支付  -->
    <div id="pa_con" class="so-con warp bule_bg">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="/static/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">充值</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <div class="deposit_area">
                <div class="pay_content">
                    <form class="form_deposit">
                        <fieldset>
                            <div class="form_g text money">
                                <legend>充值金額</legend>
                                <input type="tel" placeholder="请输入充值金額">
                                <i class="close"></i>
                            </div>
                        </fieldset>
                        <!-- <div class="btn btn_blue">
                            <a href="javascript:;">確定</a>
                        </div> -->
                    </form>
                    <div class="step03 webbank_pay">
                        <h5>选择银行</h5>
                        <ul>
                            <li class="btn_bank bank01">
                                <a href="#" title="中国工商银行">
                                    <img src="/static/images/info_bank_10.png" alt="">
                                    <span>中国工商银行</span>
                                </a>
                            </li>
                            <li class="btn_bank bank02">
                                <a href="#" title="中国农业银行">
                                    <img src="/static/images/info_bank_13.png" alt="">
                                    <span>中国农业银行</span>
                                </a>
                            </li>
                            <li class="btn_bank bank03">
                                <a href="#" title="建设银行">
                                    <img src="/static/images/info_bank_16.png" alt="">
                                    <span>建设银行</span>
                                </a>
                            </li>
                            <li class="btn_bank bank04">
                                <a href="#" title="交通银行">
                                    <img src="/static/images/info_bank_19.png" alt="">
                                    <span>交通银行</span>
                                </a>
                            </li>
                            <li class="btn_bank bank05">
                                <a href="#" title="中国银行">
                                    <img src="/static/images/info_bank_22.png" alt="">
                                    <span>中国银行</span>
                                </a>
                            </li>
                            <li class="btn_bank bank06">
                                <a href="#" title="招商银行">
                                    <img src="/static/images/info_bank_25.png" alt="">
                                    <span>招商银行</span>
                                </a>
                            </li>
                            <li class="btn_bank bank07">
                                <a href="#" title="中信银行">
                                    <img src="/static/images/info_bank_28.png" alt="">
                                    <span>中信银行</span>
                                </a>
                            </li>
                            <li class="btn_bank bank08">
                                <a href="#" title="光大银行">
                                    <img src="/static/images/info_bank_31.png" alt="">
                                    <span>光大银行</span>
                                </a>
                            </li>
                        </ul>
                    </div>
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
import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
 import FooterNav from '@/components/Footer'
// import deposit_bank_transfer from '@/components/Footer'

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
           paytype : ''
        }
    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' )  ;
      this.paytype =this.getStrParam.type
console.log(this.paytype+'发火的')

  },
  methods: {

}

}
</script>