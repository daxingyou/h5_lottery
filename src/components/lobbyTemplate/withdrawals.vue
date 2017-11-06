<template>
    <div id="pa_con" class="so-con warp bule_bg">
        <header id="pa_head">
            <div class="left">
                <a href="../">
                    <img src="../../../static/images/back.png" alt="">
                </a>
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
                            <td>大哥</td>
                        </tr>
                        <tr>
                            <th class="bank_card_num">
                                <li>银行卡号</li>
                            </th>
                            <td>
                                工商银行
                                <br/> 123456123456123456
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <li>余额</li>
                            </th>
                            <td>3000.00</td>
                        </tr>
                        </thead>
                    </table>
                </div>
                <fieldset>
                    <div class="form_g text">
                        <legend>取款金额</legend>
                        <input type="number" placeholder="1.00~9999.00">
                        <i class="close"></i>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="form_g text">
                        <legend>支付密码</legend>
                        <input type="password" maxlength="4" placeholder="4位数字密码">
                        <i class="close"></i>
                    </div>
                </fieldset>
                <div class="btn btn_blue">
                    <a href="javascript:;">確定</a>
                </div>

            </form>
            <!-- <a href="javascript:void(0);" class="ui red label get_m_01">会员_取款-取款银行设定</a><br/><br/>
            <a href="javascript:void(0);" class="ui green label get_m_02">会员_取款稽核-滿足</a><br/><br/>
            <a href="javascript:void(0);" class="ui red label get_m_03">会员_取款-取款稽核-不滿足</a><br/><br/> -->

        </div>
        <footer class="bot_nav">
            <ul>
                <li class="active">
                    <a class="index" href="../">首页大厅</a>
                </li>
                <li>
                    <a class="trend" href="lobby_past_view.html">往期开奖</a>
                </li>
                <li>
                    <a class="record" href="publicTemplate/bet_record.html">投注纪录</a>
                </li>
                <li>
                    <a class="member" href="info.html">个人中心</a>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'

export default {
  name: 'Login',
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