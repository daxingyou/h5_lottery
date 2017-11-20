<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />

  </div>
</template>

<script>
// import FastClick from 'fastclick'
import '../static/css/page.css'
const FastClick = require('fastclick');

export default {
  name: 'app', 
  data:function(){
    return {
        //帐户明细
        acDetail:{ 
            tabs:[
                { title:'全部', value:'1', days:[], active:true },
                { title:'资金派送', value:'4', days:[], active:false },
                { title:'充值', value:'2', days:[], active:false },
                { title:'提款', value:'3', days:[], active:false },
            ] 
        }
    }
  },
  mounted:function(){
    FastClick.attach(document.body);
      document.documentElement.scrollTop = document.body.scrollTop=0;
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
   /* setTimeout(function () {
        $('.so-con-right').css('height','100%') ;
    },500)*/


  },

}
</script>
<style scoped>

</style>
