<template>
    <div id="pa_con" class="so-con warp bule_bg">
        <header id="pa_head">
            <div class="left">
                <a href="/" @click.prevent="goBack">
                    <img src="../../../static/frist/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">优惠活动</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <div class="promo_area">
                <ul>
                    <li>
                        <img src="../../../static/frist/images/banner/promo-1.jpg">
                        <div class="promo_detail">
                            <h3>更多热门彩种 即将上线</h3>
                            <p><strong>活动详情</strong></p>
                            <p>澳门金沙赌场将不定期派发神秘彩金给在澳门金沙赌场注册过的会员，彩金不设门槛、不限金额，无需申请，随机派发；</p>
                            <p>只要您在澳门金沙赌场注册过账号，只要您曾经登录过澳澳门金沙赌场，并且填写好真实姓名以及绑定好银行账号，都有可能收到我们为您随机派发的神秘彩金；</p>
                            <p>即使您不曾在澳门金沙赌场存款游戏过，也有可能收到我们为您带来的意外惊喜；</p>
                            <p><strong>活动详情</strong></p>
                            <p>神秘彩金无需申请，直接划入会员账号或绑定的银行账号；</p>
                            <p>彩金发放纯属随机，还望会员们能够继续支持澳门金沙赌场，也许，您就是下一个幸运儿！</p>
                            <p>注：凡是有获得（神秘彩金，随机派发）的会员，我们将会在彩金存入会员账号或绑定的银行账号后通过会员中心的“个人信息”进行通知；</p>
                            <p><strong>活动规则</strong></p>
                            <p>1.该活动仅为娱乐玩家服务，若任何个人/团体/组织以不诚实的方式骗取获得优惠彩金，本公司将保留冻结、取消其账户及账户结余的权利；</p>
                            <p>2.澳门金沙赌场保留更改、结束、取消该优惠的权利。</p>
                        </div>
                    </li>
                </ul>
            </div>


        </div>

    </div>
</template>
<style>

</style>
<script>
 // import $ from "jquery";
import Mixin from '@/Mixin'


export default {
  name: 'promo_content',
  mixins:[Mixin],
  components: {

  },
  data: function() {
        return {

        }
    },
  created: function() {
    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' );
  },
  methods: {



  }
}
</script>