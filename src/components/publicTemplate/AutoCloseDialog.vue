<template>
    <div v-if="show" class="popup so-tip-pop so-tip-pop-01 publicDialog" @click="close">
        <div>
            <img :src="'/static/images/pop/'+ (typeStr ||'title_tip') +'.png'">
            <img src="/static/images/page/status03.svg">
            <p>{{content}}</p>
        </div>
    </div>

</template>


<script>
export default {
  name: 'AutoCloseDialog',
  props:['text', 'type'],
  data () {
    return {
      delay:2000,
      show:false,
      content:'',
      typeStr:'',
    }
  },
  mounted:function() {
    this.typeStr = this.type;
  },
  methods:{
    //打开弹窗
    open:function(text, title_tip){
      this.content = text;
      this.typeStr = title_tip;
      this.show = true;
      setTimeout(() => this.show = false, this.delay);
    },
    //关闭弹窗
    close:function(e){
      this.show = false;
    }
  }
}
</script>
<style scope>
    .publicDialog { display: block;
                    position: fixed;
                    z-index: 1000;
                  }
    /* .so-tip-pop > div{
                    border:none;
                    width: 8.5rem;
                    height: 5rem;
                  } */
    /* .so-tip-pop img{
                    width: 6.5rem;
                    margin-top: 1rem;
    } */
    /* .so-tip-pop img:nth-child(2){
                    max-width: 1rem;
                    margin-top:-.3rem;
                  } */

</style>