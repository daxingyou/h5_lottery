<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="../../../static/frist/images/back.png" alt="">
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
                        <input type="radio" name="tabset" id="tab1" aria-controls="agent" checked @click="gotoTop">
                        <label for="tab1" class="tab1">代理加盟</label>
                        <!-- Tab 2 -->
                        <input type="radio" name="tabset" id="tab2" aria-controls="commission" @click="gotoTop">
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
                            <section id="commission" class="tab-panel">
                                <table class="data">
                                  
                                        <thead>
                                            <tr>
                                                <th rowspan="2">当月营利</th>
                                                <th rowspan="2">当月最低
                                                    <br/>有效会员</th>
                                                <th colspan="2">
                                                    当月退佣比例
                                                </th>
                                            </tr>
                                            <tr>
                                                <th class="grey">
                                                    真人视频
                                                </th>
                                                <th class="grey">
                                                    电子游艺
                                                </th>
                                            </tr>
                                        </thead>
                                        <tr>
                                            <td>1-5万</td>
                                            <td>5或以上</td>
                                            <td>25%</td>
                                            <td>25%</td>
                                        </tr>
                                        <tr>
                                            <td>5-30万</td>
                                            <td>10或以上</td>
                                            <td>30%</td>
                                            <td>30%</td>
                                        </tr>
                                        <tr>
                                            <td>30万-80万</td>
                                            <td>50或以上</td>
                                            <td>35%</td>
                                            <td>35%</td>
                                        </tr>
                                        <tr>
                                            <td>80万-120万</td>
                                            <td>100或以上</td>
                                            <td>40%</td>
                                            <td>40%</td>
                                        </tr>
                                        <tr>
                                            <td>120万以上</td>
                                            <td>200或以上</td>
                                            <td>50%</td>
                                            <td>50%</td>
                                        </tr>
                                   
                                </table>
                                <p>
                                    佣金以每月第一个礼拜至下月第一个礼拜一前的周日为统计期间，以联盟方案分红公式计算，由于代理部于每个月的第一礼拜三开始与代理确认金额后，在3个工作日内将佣金直接汇入申请代理登记之银行帐号。
                                </p>
                                <h4>代理说明</h4>
                                <p>
                                    合作伙伴佣金=下线会员净输值X当月佣金比例（同时需满足当月最低活跃玩家数） 如果当月有效合作伙伴的下线会员净输值为负数，那幺当月佣金为零，当月盈利有公司负担。 合作伙伴的佣金比例以合作伙伴下线会员净输值与合作伙伴下线有效活跃玩家而定。合作伙伴比例升级必须同时满足合作伙伴下线会员净输值和有效活跃玩家人数两个条件。如果合作伙伴下线会员净输值和有效活跃玩家人数只有其以达到升级标准，那幺将按照低一级的佣金比例发放佣金。如有效活跃玩家人数不足2人将不能获得佣金。
                                </p>
                                <p>
                                    1.）有效会员：在月结区间内，总存款达到500RMB及以上的会员。
                                    <br/> 2.）佣金：真人视讯、电子游艺项目的【派彩】金额扣除相应费用后，乘以相应退佣比例（以扣除相应费用后的净盈利为准）。
                                    <br/> 3.）合作伙伴获得的支付费用，其中优惠和市场费用将会累计并在每月的佣金中扣除。这些费用包括：
                                    <br/> 转账费用-包括所有代理会员的存款和提款费用。
                                    <br/> 行政费用-任何费用支出（为支出或协助代理而产生的促销或营销活动支出）。
                                    <br/> 优惠红利-给予代理会员的现金红利或是折扣。若本月可获得佣金为负数，负盈利及费用将会带到下个月继续累计至可获得佣金为正数即可领取。
                                    <br/>
                                </p>
                                <p>
                                    例如： 联盟体系当月最低活动会员达6人，当月派彩：真人视讯￥200000，电子游艺￥20000。如联盟体系当月产生相应费用统计为￥100000，则当月佣金计算方式为：（￥200000+￥20000）X30%-（相应产生的费用￥100000*30%）=￥36000总退佣金额
                                </p>
                            </section>
                        </div>
                    </div>
                  <!--  <div class="btn btn_blue">
                        <router-link to="/lobbyTemplate/agentApply">立即申请</router-link>
                    </div>-->
                </div>
            </div>
        </div>

    </div>
</template>

<script>
// import $ from "jquery";
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
      //scrollTo(0,0); // 回到顶部
     document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部


  },
  methods: {
  // 回到顶部
      gotoTop:function () {
          //scrollTo(0,0);
          document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
      }
}

}
</script>