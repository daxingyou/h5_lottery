<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head">
            <div class="left">
                <a href="../">
                    <img src="../../../static/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">代理申请</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <div class="agent_area">
                <div class="agent">
                    <div class="tabset">
                        <!-- Tab 1 -->
                        <input type="radio" name="tabset" id="tab1" aria-controls="agent" checked>
                        <label for="tab1" class="tab1">代理加盟</label>
                        <!-- Tab 2 -->
                        <input type="radio" name="tabset" id="tab2" aria-controls="commission">
                        <label for="tab2" class="tab2">佣金方案</label>

                        <div class="tab-panels">
                            <section id="agent" class="tab-panel">
                                <p>
                                    如今，网上博彩娱乐已经成为一个极具市场发展前景的热门产业。本公司凭借多年的博彩运营经验，目前已拥有极高的行业知名度和大批忠实用户，具有绝对的品牌优势。合作方式简单，零投资零风险，坐享高额佣金回报。如果您身边有对博彩感兴趣的朋友，请您不要犹豫，赶快加入这个一本万利的行业，充分利用您身边的人脉及网络资源！我们有专业的客服团队全年无休为您提供帮助。
                                </p>
                                <br/>
                                <p>·高佣金（代理佣金），让你轻松月入百万</p>
                                <p>·零风险，高回报，按时出佣</p>
                                <p>·全年度优惠不断，满足各种类型玩家需求</p>
                                <p>·取款快速，实力雄厚资金有保障</p>
                                <p>·营运多年，深受百万玩家信赖</p>
                                <p>·拥有线上赌场执照，信誉保证</p>
                                <p>·多年大力推广，品牌热度十足，代理可坐享广告品牌效应</p>
                            </section>

                        </div>
                    </div>
                    <div class="btn btn_blue">

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'

export default {
  name: 'agent',
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