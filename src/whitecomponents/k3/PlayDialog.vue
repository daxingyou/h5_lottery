<template>
    <div v-if="show" class="so-pop-wanfa modal publicDialog">
        <div class="m_content">
            <h2>{{moduleName || '江苏快3'}}游戏玩法<a @click="close"></a></h2>
            <div class="content">
                <div class="playtext">
                    <h3> 一、开奖与结束时间</h3>
                    <p>{{moduleplay || '每日08:40-22:10，10分钟一期，每天开奖82期。'}}</p>
                    <h3>二、单骰玩法</h3>
                    <p>选择1个号码，所选号码在开奖号码中出现，即中奖。</p>
                    <h3>三、不同号玩法</h3>
                    <p>从1～6中任选2个或多个号码，所选号码与开奖号码任意2个号码相同，即中奖。</p>
                    <h3>四、同号玩法</h3>
                    <h4>二同号</h4>
                    <p>从11～66中任选1个或多个号码，选号与奖号（包含11～66，不限顺序）相同（不含豹子号），即中奖。</p>
                    <h4>三同号</h4>
                    <p>对相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖。</p>
                    <p>全骰：对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意三个相同号码开出即中奖。</p>
                    <h3>五、总和玩法</h3>
                    <p>至少选择1个和值（3个号码之和）进行投注，所选和值与开奖的3个号码的和值相同即中奖。（不含豹子号）</p>
                    <p>&nbsp;</p>
                    <p>大：三粒骰子之点数总和由11点至17点。</p>
                    <p>小：三粒骰子之点数总和由4点至10点。</p>
                    <p>※若三粒骰子平面点数相同，通吃「大」、「小」各注。</p>
                </div>
            </div>
            <div class="action">
                <a class="ok" @click="close">确定</a>
            </div>
        </div>
    </div>

</template>


<script>
export default {
  name: 'InfoDialog',
  props:['moduleName', 'moduleplay'],
  methods:{
    //打开弹窗
    open:function(e){
        this.show = true;
    },
    //关闭弹窗
    close:function(e){
      this.show = false;
    }
  },
  //程序加载完闭时
  mounted:function() {
  },
  data () {
    return {
        show:false,


    }
  },
    created:function(){


    },
}
</script>
<style scope>
    /* .publicDialog { display: block !important; } */
</style>
