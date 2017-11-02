<template>
    
    <div v-if="show" class="so-pop-wanfa modal publicDialog">
        <div class="m_content">
            <h2>重庆时时彩玩法说明<a @click="close"></a></h2>
            <div class="content">
                <div class="playtext">
                    <h3>一、两面玩法</h3>
                    <p>开奖结果万位、仟位、佰位、拾位或个位数
                        字为1、3、5、7、9时为“单”，若为0、2、
                        4、6、8时为“双”，当投注位数单双与开
                        奖结果的位数单双相符时，即为中奖。
                        五字和数单双：加总当期开奖结果五个彩球
                        号码，以其加总值的单双作为开奖依据，当
                        投注之注项与开奖结果相符时，即为中奖。</p>
                    <h3>二、1-5 球玩法说明</h3>
                    <p>开奖结果万位、仟位、佰位、拾位或个位数
                        字为1、2、3、5、7时为“质数”，若为0、
                        4、6、8、9时为“合数”，当投注位数质合
                        与开奖结果的位数质合相符时，即为中奖。
                        ※举例：投注者购买个位质，当期开奖结果
                        如为20957（7为质），则视为中奖。开奖结
                        果万仟位、万佰位、万拾位、万个位、仟佰
                    </p>
                    <h3>三、前中后玩法说明</h3>
                    <p>开奖结果万位、仟位、佰位、拾位或个位数 字为1、2、3、5、7时为“质数”，若为0、 4、6、8、9时为“合数”，当投注位数质</p>
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
  props:[],
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
        show:false
    }
  }
}
</script>
<style scope>
    .publicDialog { display: block !important; }
</style>
