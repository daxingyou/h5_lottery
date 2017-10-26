<template>
    <div class="popup so-pop-xxx so-pop-01 publicDialog">
        <div>
            <h2>提示<a @click="$emit('close')"></a></h2>
            <img src="/static/images/page/status03.svg">
            <p>{{text}}</p>
            <a @click="$emit('close')">确定</a>
        </div>
    </div>


</template>


<script>
export default {
  name: 'InfoDialog',
  props:['text'],
  mounted:function() {
  },
  data () {
    return {
        // show:true,
        // text:'请设置消息.'
    }
  }
}
</script>
<style scope>
    .publicDialog { display: block; }
</style>