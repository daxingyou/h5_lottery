
<template>
    <div v-if="show" class="modal m09 publicDialog" @click="close">
        <div class="m_content">
            <img class="bet_ok" src="/static/frist/images/pop/ok_light.png">
            <h2 class="noclose"><a></a></h2>
            <div class="content check">
                <div>
                    <img src="/static/frist/images/pop/title_bet_ok.png">
                    <img src="/static/frist/images/icon_check.svg">
                </div>
                您已成功支付<br/>请随时关注开奖信息！
                
            </div>
        </div>
    </div>

</template>


<script>
export default {
  name: 'BetSuccessfulDialog',
  data () {
    return {
      show:false,
    }
  },
  methods:{
    //打开弹窗
    open:function(){
      this.show = true;
      setTimeout(() => this.show = false, 3000);
    },
    //关闭弹窗
    close:function(e){
      this.show = false;
    }
  }
}
</script>
<style scope>
    /* .publicDialog { display: block; } */
</style>


