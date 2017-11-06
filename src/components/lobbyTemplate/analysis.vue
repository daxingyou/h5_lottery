<template>
    <div id="pa_con" class="so-con warp bule_bg">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;">

                </a>
            </div>
            <h2 class="center">个人中心</h2>
            <div class="right"></div>
        </header>


        <FooterNav />

    </div>
</template>

<script>
import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'

export default {
  name: 'Login',
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