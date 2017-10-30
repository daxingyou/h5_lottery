<template>
  

  <!-- <div v-if="show" :class="'so-right '+ (show?'active':'')"> -->
    <div v-if="show" :class="'so-right '+ (show?'active':'')">
        <div class="so-shade" @click="close"></div>
        <div>
            <!-- <img src="/static/images/top/zoushi.png"> -->
        </div>
        <div @click="close">
            <div v-if="show" >
                <ul>
                    <li>
                        <a href="/publicTemplate/betRecord">
                            <img src="/static/images/right/1.png">
                            <p>投注记录</p>
                        </a>
                    </li>
                    <li>
                        <a href="/publicTemplate/pastView">
                            <img src="/static/images/right/2.png">
                            <p>近期开奖</p>
                        </a>
                    </li>
                    <li>
                        <a href="/publicTemplate/roadBeads">
                            <img src="/static/images/right/3.png">
                            <p>路珠</p>
                        </a>
                    </li>
                    <li>
                        <a href="/publicTemplate/dsLong">
                            <img src="/static/images/right/4.png">
                            <p>双面长龙</p>
                        </a>
                    </li>
                    <li class="play" @click="play">
                        <img src="/static/images/right/5.png">
                        <p>玩法说明</p>
                    </li>
                    <li>
                        <img src="/static/images/right/6.png">
                        <p>今日输赢</p>
                        <div :class="'today_payoff '+ (payoff>=0?' win_payoff':'lose_payoff')">({{(payoff>=0?'+':'-')}}{{fortMoney(roundAmt(payoff))}})</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    

</template>


<script>
import Mixin from '@/Mixin'
export default {
  name: 'UserMenu',
  mixins:[Mixin],
  props:['el', 'payoff'],
  mounted:function() {
    $(this.el).on('click', ()=>{
      this.show = true;
    })

    // $('.so-right').click(function () {
    //     var className = $('.so-right').attr('class') || '';
    //     $('.so-right > div:last-child > div').slideToggle(500, function () {
    //         $('.so-right').attr('class', className.replace('active', 'close'));
    //         $('.so-shade').hide();
    //     });
    // });
    // $('.so-top-zoushi').click(function () {
    //     var className = $('.so-right').attr('class') || '';
    //     if (className.indexOf('close') >= 0) {
    //         $('.so-right').attr('class', className.replace('close', 'active'));
    //     } else {
    //         $('.so-right').attr('class', className + ' active');
    //     }
    //     $('.so-shade').show();
    //     $('.so-right > div:last-child > div').slideToggle(500, function () {
    //     });
    // });

  },
  methods:{
    play:function(e){
        this.$emit('play')
        // debugger;
        // console.log('play0')
    },
    close:function(e){
      this.show = false;
    }
  },
  data () {
    return {
      show:false
    }
  }
}
</script>
<style scoped>
  .so-shade { display: block; z-index: 0; height: 100% !important; }
  .so-right > div:last-child > div { display: block; }
</style>