<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)" >
                    <img src="../../../static/white/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">关于我们</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <div class="about_area">
                <p>
                    宝池彩票注册在菲律宾马尼拉，持有菲律宾政府卡格扬经济特区 First Cagayan leisure and Resort Corporation颁发的体育博彩与线上赌场执照，接受菲律宾政府和卡格扬经济特区CEZA授权和监管，我们一切博彩营业行为皆遵从菲律宾政府博彩条约。在竞争日益激烈的网络博彩市场中，我们不断地求新求变，寻找最新的创意，秉持最好的服务。向客户提供高品质的服务、先进的产品、丰富的娱乐体验，是我们新葡京娱乐场永恒的宗旨。
                </p>
                <p>
                    我们思您所想，提供高标准全方位的个人隐私保密措施以及高强度的资金安全体系。玩家网上支付和所有银行交易将由国际金融机构通过高标准的安全和机密的网络端口（SSL 128 bit encryption Standard）中进行。进入玩家帐户数据也必须有玩家唯一的登录ID和密码，确保客户的资金安全有保障。同时也采用最先进的加密措施来保证玩家的游戏安全，7×24小时的后台检测和监控，确保我们可以提供一个完全公正和安全的网络游戏空间。客户在本平台的所有活动均严格保密，我们绝不会向第三方（包括相关单位）透露客户数据。
                </p>


                <p>我们向您承诺：</p>

                <h5>以诚信为本</h5>

                <p>
                    作为国际专业的网上博彩游戏运营商，我们承诺，为每一位客户提供最安全、最公平的博彩游戏，以及全方位的服务。
                    <br/> 提供最多样化与最真实的彩票游戏。 各式彩票游戏，是依官方赛果产生的游戏结果，让玩家在活泼的投注界面，享受最真实的娱乐。
                    <br/> 本公司所有的游戏皆有共同的优点: 无须下载、界面操作简易、功能齐全、画面精致、游戏秉持公平、公正、公开!
                    <br/>
                </p>

                <h5>提供优质的客户服务</h5>

                <p>
                    我们有以最高标准选拔、最严格训练的客服团队，向您提供365天×24小时实时在线的客户服务。每位玩家的咨询，都将以专业、亲切的态度解答，在帮您解决问题的同时带给您宾至如归的体验!提供多渠道的与客户的互动交流，了解客户的需求，随时关注客户的意见及建议；举办更多的优惠及促销活动，给客户提供更多的回馈及惊喜。
                </p>

                <h5>高效安全的存取款</h5>

                <p>
                    我们提供各种安全简便的存款及取款选择给我们的会员。我们一直坚持&ldquo;了解我们的会员（KYC）&rdquo;和 反洗钱(AML)的原则，并与第三方的财务管理当局合作以确保最大范围的遵从相关的法律法规。
                    <br/> 我们对我们所创建的公司深感自豪，并希望所有的用户能够在一个安全愉快的环境下享受我们精心设计的产品和服务并能够从中获利。 我们提供最迅捷最安全的取款方式，会员365天×24小时均可申请取款。
                    <br/>
                </p>

                <h5>让您成为大赢家</h5>

                <p>将不间断的推出各式各样有利新老会员的优惠，天天送惊喜、周周有回馈，月月大放送，让您成为大赢家。</p>

                <h5>积极参与慈善公益</h5>

                <p>
                    我们在尽心为每一位会员服务的同时，也肩负着对社会、对慈善公益的责任。取之于社会，用之于社会也是我们一直秉承的宗旨之一。我们积极参加各种捐款活动，也将永不磨灭的针对社会的需要作出更多的产生。本公司提倡有节制的赌博。我们建议阁下遵守以下一些基本规则：禁止未满18岁的人士参与赌博游戏。在加入游戏之前，请您确定您已年满18周岁。
                </p>
            </div>


        </div>

        <FooterNav />

    </div>
</template>

<script>
// import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/whitecomponents/publicTemplate/AutoCloseDialog'
import FooterNav from '@/whitecomponents/Footer'

export default {
  name: 'about',
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
      document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
      //scrollTo(0,0); // 回到顶部
  },
  methods: {

}

}
</script>