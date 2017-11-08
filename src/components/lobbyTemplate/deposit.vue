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
                    <form class="form_deposit">
                        <fieldset>
                            <div class="form_g text money">
                                <legend>充值金額</legend>
                                <input type="tel" placeholder="请输入充值金額">
                                <i class="close"></i>
                            </div>
                        </fieldset>
                        <div class="btn btn_blue money">
                            <a href="javascript:;">確定</a>
                        </div>
                    </form>
                    <div class="step03 pay_way">
                        <ul>
                            <li>
                                <a class="item" href="deposit_webbank_pay.html">
                                    <div class="icon">
                                        <div><i class="i_webbank_pay"></i></div>
                                    </div><span>网银支付</span>
                                </a>
                            </li>
                            <li>
                                <a class="item" href="deposit_scan_qrcoder.html">
                                    <div class="icon">
                                        <div>
                                            <i class="i_scan_qrcode"></i>
                                        </div>
                                    </div>
                                    <span>扫码支付</span>
                                </a>
                            </li>
                            <li>
                                <a class="item" href="deposit_bank_transfer.html">
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
            </div>
        </div>
        <deposit_bank_transfer v-if="false"></deposit_bank_transfer>
    </div>


  <!--  <div class="modal">
        <div class="m_content">
            <h2 class="title noclose"><a></a></h2>
            <div class="content danger">
                <div>
                    <img src="../../../static/images/pop/title_tip.png">
                    <img src="../../../static/images/page/status03.svg">
                </div>
                存款金额超出范围<br/>
                无可选支付方式
            </div>
            <div class="action">

            </div>
        </div>
    </div>-->
    <!--<deposit_bank_transfer></deposit_bank_transfer>-->
</template>

<script>
import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'
import deposit_bank_transfer from '@/components/Footer'

export default {
  name: 'deposit',
  mixins:[Mixin],
  components: {
   // AutoCloseDialog,
      FooterNav ,
      deposit_bank_transfer
  },
    data: function() {
        return {

        }
    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' )  ;

  },
  methods: {

}

}
</script>