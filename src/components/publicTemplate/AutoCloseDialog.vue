<template>
    <div class="popup so-tip-pop so-tip-pop-01 publicDialog" @click="$emit('close')">
        <div>
            <img :src="'/static/images/pop/'+ (type||'title_tip') +'.png'">
            <img src="/static/images/page/status03.svg">
            <p>{{text}}</p>
        </div>
    </div>

</template>


<script>
export default {
  name: 'AutoCloseDialog',
  props:['text', 'type', 'delay'],
  mounted:function() {
    setTimeout((function() {
      this.$emit('close');
    }).bind(this),this.delay);
  },
  data () {
    return {
    }
  }
}
</script>
<style scope>
    .publicDialog { display: block; }
</style>