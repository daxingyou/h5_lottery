<template>
    <div id="pa_con" class="so-con warp bule_bg">
        <header id="pa_head">
            <div class="left">
                <a href="deposit.html">
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
                        <!-- <div class="btn btn_blue">
                            <a href="javascript:;">確定</a>
                        </div> -->
                    </form>
                    <div class="bank_transfer">
                        <fieldset>
                            <div class="form_g text">
                                <legend>选择银行</legend>
                                <select name="">
                                    <option value="">中国工商银行</option>
                                    <option value="">农业银行</option>
                                    <option value="">建设银行</option>
                                    <option value="">招商银行</option>
                                    <option value="">中信银行</option>
                                    <option value="">光大银行</option>
                                    <option value="">中国工商银行</option>
                                    <option value="">农业银行</option>
                                    <option value="">建设银行</option>
                                    <option value="">招商银行</option>
                                    <option value="">中信银行</option>
                                    <option value="">光大银行</option>
                                    <option value="">中国工商银行</option>
                                    <option value="">农业银行</option>
                                    <option value="">建设银行</option>
                                    <option value="">招商银行</option>
                                    <option value="">中信银行</option>
                                    <option value="">光大银行</option>
                                    <option value="">中国工商银行</option>
                                    <option value="">农业银行</option>
                                    <option value="">建设银行</option>
                                    <option value="">招商银行</option>
                                    <option value="">中信银行</option>
                                    <option value="">光大银行</option>
                                </select>
                            </div>
                            <i class="input_select"></i>

                        </fieldset>

                        <div class="bank_account">
                            <h5 class="push-left-tiny">收款账号</h5>
                            <a class="mini_tip trans_step" href="javascript:;">
                                <i class="i_help"></i>转帐步骤</a>
                            <div class="print_data">
                                <table class="js-copytextarea">
                                    <thead>
                                    <tr>
                                        <th>
                                            <li>银行名称</li>
                                        </th>
                                        <td>中国工商银行</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <li>收款人</li>
                                        </th>
                                        <td>黄岩</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <li>开户行</li>
                                        </th>
                                        <td>北京市朝阳区朝来分行</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <li>银行账号</li>
                                        </th>
                                        <td>123456123456123456</td>
                                    </tr>
                                    </thead>
                                </table>
                                <a class="copy_link js-textareacopybtn" href="javascript:;">
                                    <i class="icon_copy"></i>复制该信息</a>
                            </div>
                        </div>
                        <fieldset>
                            <div class="form_g text">
                                <legend for="">存款时间</legend>
                                <input class="date" type="date" placeholder="2017/12/11 20:12">
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
            </div>

        </div>
        <FooterNav></FooterNav>
    </div>
</template>

<script>
import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/lobbyTemplate/deposit_bank_transfer'

export default {
  name: 'deposit_bank_transfer',
  mixins:[Mixin],
  components: {
   // AutoCloseDialog,
      FooterNav ,
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