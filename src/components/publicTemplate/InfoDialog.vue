<template>
  <div v-if="show" class="modal m12 publicDialog" @click="close">
      <div class="m_content">
          <h2 class="noclose"><a></a></h2>
          <div class="content danger">
              <div>
                  <img src="/static/images/pop/title_end.png">
                  <img src="/static/images/page/status03.svg">
              </div>
              {{content}}
          </div>
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