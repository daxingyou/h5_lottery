<template>
  

  <!-- <div v-if="show" :class="'so-right '+ (show?'active':'')"> -->
    <div v-if="show" :class="'so-right '+ (show?'active':'')">
        <div>
            <img src="/static/images/top/zoushi.png">
        </div>
        <div class="so-shade" @click="close"></div>
        <div>
        </div>
        <div @click="close">
            <div v-if="show">
                <ul class="right_menu">
                    <li class="r_record">
                        <router-link to="/publicTemplate/betRecord">
                            <p>投注记录</p>
                        </router-link>
                    </li>
                    <li class="r_pastview">
                        <router-link to="/publicTemplate/pastView">
                            <p>近期开奖</p>
                        </router-link>
                    </li>
                    <!--<li class="r_roadbeads" v-if="lotteryid =='8'"> &lt;!&ndash; 北京pk10 &ndash;&gt;
                        <router-link to="/publicTemplate/pk10roadBeads">
                            <p>路珠</p>
                        </router-link>
                    </li>-->
                    <li class="r_roadbeads" >
                        <router-link to="/publicTemplate/roadBeads">
                            <p>路珠</p>
                        </router-link>
                    </li>
                    <li class="r_long">
                        <router-link to="/publicTemplate/dsLong">
                            <p>双面长龙</p>
                        </router-link>
                    </li>
                    <li class="play " @click="play">
                        <!-- <img src="/static/images/right/5.png"> -->
                        <p>玩法说明</p>
                    </li>
                    <li class="r_today">
                        <!-- <img src="/static/images/right/6.png"> -->
                        <p>今日输赢</p>
                        <div :class="'today_payoff '+ (payoff>=0?' win_payoff':'lose_payoff')">({{(payoff>=0?'+':'')}}{{fortMoney(roundAmt(payoff))}})</div>
                    </li>
                </ul>

            </div>
        </div>
    </div>
    

</template>


<script>
import Mixin from '@/Mixin'
import $ from "jquery";

export default {
  name: 'UserMenu',
  mixins:[Mixin],
  props:['el', 'payoff'],
  data :function() {
        return {
            show:false ,
            lotteryid :this.$parent.lotteryID , // 彩种 id
        }
    },
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

}
</script>
<style scoped>
  .so-shade { display: block; z-index: 0; height: 100% !important; }
  .so-right > div:last-child > div { display: block; }
</style>