<template>
    <div v-if="show" class="popup so-pop-xxx so-pop-01 publicDialog">
        <div>
            <h2>提示<a @click="close"></a></h2>
            <img src="/static/images/page/status03.svg">
            <p>{{content}}</p>
            <a @click="close">确定</a>
        </div>
    </div>


</template>


<script>
export default {
  name: 'InfoDialog',
  props:['text'],
  mounted:function(){
    this.content = this.text;
  },
  methods:{
    //打开弹窗
    open:function(text){
        this.content = text;
        this.show = true;
    },
    //关闭弹窗
    close:function(e){
      this.show = false;
    }
  },
  data () {
    return {
        content:'',
        show:false,
        // text:'请设置消息.'
    }
  }
}
</script>
<style scope>
    .publicDialog { display: block; }
</style>