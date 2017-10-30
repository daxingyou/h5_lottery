<template>
  

  <div v-if="showNavigation" :class="'so-left '+ (showNavigation?'active':'')">
    <div class="so-shade"></div>
    <div class="so-left-close" @click="close">
        <img src="/static/images/left/left808.png">
    </div>
    <div class="so-left-con">
      <div class="so-l-c-top">
          <div>
              <img src="/static/images/left/user.png">
          </div>
           <div>
              <p class="user_name">{{getCookie('username')}}</p>
              <div class="purse">
                  <img src="/static/images/top/sjinbi.png" class="so-top-sum">
                  <div class="so-in-top-sum">

                  </div>
              </div>
              <!-- <p>87348.00</p> -->
          </div>
      </div>
      <div class="so-l-c-con">
          <div>
              <ul>
                  <li>
                      <div class="badge">
                           <img src="/static/images/logo_hljssc.svg" alt="">
                      </div>
                      <!-- <img src="/static/images/left/ball.png"> -->
                      <p>黑龙江时时彩</p>
                  </li>
                  <li>
                      <div class="badge">
                           <img src="/static/images/logo_xjssc.svg">
                      </div>
                      <p>新疆时时彩</p>
                  </li>
                  <li>
                      <div class="badge">
                           <img src="/static/images/logo_tjssc.svg">
                      </div>
                      <p>天津时时彩</p>
                  </li>
                  <li>
                      <div class="badge">
                           <img src="/static/images/logo_jc11x5.svg">
                      </div>
                      <p>江西11选5</p>
                  </li>
                  <li>
                      <div class="badge">
                           <img src="/static/images/logo_gd11x5.svg">
                      </div>
                      <p>广东11选5</p>
                  </li>
                  <li>
                      <div class="badge">
                           <img src="/static/images/logo_sd11x5.svg">
                      </div>
                      <p>山东11选5</p>
                  </li>
                  <li>
                      <div class="badge">
                           <img src="/static/images/logo_sixlottery.svg">
                      </div>
                      <p>六合彩</p>
                  </li>
                  <li>
                      <div class="badge">
                           <img src="/static/images/logo_jxk3.svg">
                      </div>
                      <p>江苏快3</p>
                  </li>
                  <!-- <li>
                       <img src="/static/images/left/ball.png">
                      <p>黑龙江时时彩</p>
                  </li>  -->
              </ul>
          </div>
      </div>
    </div>

  </div>

</template>


<script>
import Mixin from '@/Mixin'
export default {
  name: 'InfoDialog',
  mixins:[Mixin],
  props:['el'],
  mounted:function() {
    $(this.el).on('click', ()=>{
      this.showNavigation = true;
    })
    // $('.so-left-close').click(function () {
    //     var className = $('.so-left').attr('class') || '';
    //     $('.so-left').attr('class', className.replace('active', 'close'));
    //     $('.so-shade').hide();// .fadeOut(2000)
    // });
    // $('.so-menu').click(function () {
    //     var className = $('.so-left').attr('class') || '';
    //     if (className.indexOf('close') >= 0) {
    //         $('.so-left').attr('class', className.replace('close', 'active'));
    //     } else {
    //         $('.so-left').attr('class', className + ' active');
    //     }
    //     $('.so-shade').show();
    // });
  },
  methods:{
    close:function(e){
      this.showNavigation = false;
    }
  },
  data () {
    return {
      showNavigation:false
    }
  }
}
</script>
<style scoped>
  .so-shade { display: block; z-index: 0; }
</style>