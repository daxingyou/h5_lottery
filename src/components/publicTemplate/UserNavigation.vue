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
              <p class="user_name" v-if="haslogin">{{getCookie('username')}}</p>
              <div class="purse"  v-if="haslogin">
                  <img src="/static/images/top/sjinbi.png" class="so-top-sum">
                  <div class="so-in-top-sum" >
                      {{ fortMoney(roundAmt(balanceData.balance), 2)}}
                  </div>
              </div>
          </div>
      </div>
      <div class="so-l-c-con">
          <div>
                <div class="back_home">
                  <router-link v-bind:to="'/'">
                    <span><img src="/static/images/left/icon_home.png"></span>
                        <span>返回竞彩大厅</span>
                  </router-link>
                </div>
              <ul>
                  <li v-for="lottery in allLottery">
                    <router-link v-bind:to="'/'+gameHref[lottery.cid]">
                      <div class="badge">
                           <img :src="lottery.imgUrl" alt="">
                      </div>
                      <p>{{lottery.name}}</p>
                    </router-link>
                      <!-- <a :href="'/'+gameHref[lottery.cid]">
                          <div class="badge">
                               <img :src="lottery.imgUrl" alt="">
                          </div>
                          <p>{{lottery.name}}</p>
                      </a> -->
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
            haslogin :false ,
            showNavigation:false ,
            allLottery:{},
            gameHref : {"1":"c_cqssc","2":"cqssc","3":"jxsyxw","4":"jc11x5"}, // 对应彩种的id
        }
    },
  created:function () {

  } ,
  mounted:function() {
      this.haslogin = this.ifLogined() ;
       if(this.haslogin){  // 只有登录状态才需要调余额
          this.getMemberBalance() ;
       }
      console.log(this.haslogin) ;
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
                  data: { sideType :2 }, // sideType， 1官彩，2双面彩，为空默认为1，即官彩
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
      // 获取用户余额
      getMemberBalance:function (lotteryid) {
          return new Promise((resolve)=>{
              $.ajax({
                  type: 'GET',
                  headers: {
                      "Authorization": "bearer  " + this.getAccessToken(access_token),
                  },
                  // dataType:'json',
                  // contentType:"application/json; charset=utf-8",  // json格式传给后端
                  url: action.hermes + 'api/balance/get',
                  data: { lotteryId: lotteryid },
                  success: (res) => {
                      this.balanceData = res.data;
                      var mom = this.fortMoney(this.roundAmt(res.data.balance), 2);  // 用户余额
                      this.setCookie("membalance", mom);  // 把登录余额放在cookie里面
                      resolve();
                  },
                  error: function () {

                  }
              });

          })
      },

  },

}
</script>
<style scoped>
  .so-shade { display: block; z-index: 0; }
</style>