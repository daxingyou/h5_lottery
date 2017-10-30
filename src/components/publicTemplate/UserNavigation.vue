<template>

    <div v-if="showNavigation" :class="'so-left '+ (showNavigation?'active':'')">
    <div class="so-shade"></div>
    <div class="so-left-close" @click="close">
        <img src="/static/images/left/left808.png">
    </div>
    <div class="so-left-con">
      <div class="so-l-c-top">
          <div>
              <img src="/static/images/left/user.png">
          </div>
           <div>
              <p class="user_name">{{getCookie('username')}}</p>
              <div class="purse">
                  <img src="/static/images/top/sjinbi.png" class="so-top-sum">
                  <div class="so-in-top-sum">
                      {{ fortMoney(roundAmt($parent.balanceData.balance), 2)}}
                  </div>
              </div>
          </div>
      </div>
      <div class="so-l-c-con">
          <div>
              <ul>
                  <li v-for="lottery in allLottery">
                      <a :href="'/'+gameHref[lottery.cid]">
                          <div class="badge">
                               <img :src="lottery.imgUrl" alt="">
                          </div>
                          <p>{{lottery.name}}</p>
                      </a>
                  </li>

              </ul>
          </div>
      </div>
    </div>

  </div>

</template>


<script>
import Mixin from '@/Mixin'
export default {
  name: 'InfoDialog',
  mixins:[Mixin],
  props:['el'],

 data :function() {
        return {
            showNavigation:false ,
            allLottery:{},
            gameHref : {"1":"c_cqssc","2":"cqssc","3":"jxsyxw","4":"jxsyxw"}, // 对应彩种的id
        }
    },
  created:function () {

  } ,
  mounted:function() {

     $(this.el).on('click', ()=>{
      this.showNavigation = true;
    }) ;


  },
  methods:{
      // 关闭侧滑栏
    close:function(e){
      this.showNavigation = false;
    },
      // 获取彩种
      getLotterys:function() {
         /* return new Promise((resolve)=>{*/
         var resdata  ;
              $.ajax({
                  type: 'GET',
                  async:false,
                  url: action.forseti + 'apis/lotterys',
                  data: {},
                  dataType: 'json',
                  success:(res)=> {
                      this.allLottery = res && res.data ;  // 全部彩种,通过 v.cid 跳转到每个彩种
                      resdata = res.data ;


                  },
                  error: function () {

                  }

              });
              return resdata ;

         /* })*/
      },

  },

}
</script>
<style scoped>
  .so-shade { display: block; z-index: 0; }
</style>