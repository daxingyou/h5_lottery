<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
// import FastClick from 'fastclick'
const FastClick = require('fastclick');

export default {
  name: 'app', 
  mounted:function(){
    FastClick.attach(document.body);
  }
}
</script>
