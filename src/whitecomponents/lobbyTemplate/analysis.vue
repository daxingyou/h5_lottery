<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)" >
                    <img src="../../../static/white/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">个人中心</h2>
            <div class="right"></div>
        </header>


        <FooterNav />

    </div>
</template>

<script>
// import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/whitecomponents/publicTemplate/AutoCloseDialog'
import FooterNav from '@/whitecomponents/Footer'

export default {
  name: 'analysis',
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