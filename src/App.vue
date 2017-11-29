<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
    <AutoCloseDialog ref="autoCloseDialog" text=" " type="" />
  </div>
</template>

<script>
// import FastClick from 'fastclick'
//import $ from "jquery";
import '../static/frist/css/page.css'
import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
const FastClick = require('fastclick');

export default {
  name: 'app',
  components: {
        AutoCloseDialog,
    },
  data:function(){
    return {
        //帐户明细
        acDetail:{ 
            tabs:[
                { title:'全部', value:'1', days:[], active:true },
              /*  { title:'资金派送', value:'4', days:[], active:false },*/
                { title:'充值', value:'2', days:[], active:false },
                { title:'提款', value:'3', days:[], active:false },
            ] 
        },
        navScroll:{}, // 左侧选单
        conScroll:{}, // 右侧选单
    }
  },

  mounted:function(){
      var  _self = this ;
      FastClick.attach(document.body);
      document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部

      window.onload=function () { // ios 禁止用户双击放大，缩放等
          document.addEventListener('touchstart',function (event) {
              if(event.touches.length>1){
                  event.preventDefault();
              }
          })
          var lastTouchEnd=0;
          document.addEventListener('touchend',function (event) {
              var now=(new Date()).getTime();
              if(now-lastTouchEnd<=300){
                  event.preventDefault();
              }
              lastTouchEnd=now;
          },false)
      }
      // $('html, body').height($(window).height()); // 防止浏览器全屏显示
      // 强制横屏提示
      _self.PandhP()
  },
  methods: {
      //判断是否横屏
      PandhP : function () {
          var _self=this
          $(window).on('orientationchange',function(){

               var orientation=window.orientation;
               console.log(orientation)
               if(orientation==90||orientation==-90){
                   _self.$refs.autoCloseDialog.open('请禁止横屏浏览') ;
               }
          });
      }
    }

}
</script>
<style scoped>

</style>
