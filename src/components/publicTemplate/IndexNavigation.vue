<template>

    <div v-if="showNavigation" :class="'so-left '+ (showNavigation?'active':'')">
        <div class="so-shade" @click="close"></div>
        <div class="so-left-close" @click="close">
            <img src="../../../static/images/left/left808.png">
        </div>
        <div class="so-left-con">
            <div class="so-l-c-top">
                <div>
                    <img src="../../../static/images/left/user.png">
                </div>
                <div>
                    <p class="user_name" v-if="haslogin">{{getCookie('username')}}</p>
                    <div class="purse"  v-if="haslogin">
                        <img src="../../../static/images/top/sjinbi.png" class="so-top-sum">
                        <div class="so-in-top-sum" >
                            {{ fortMoney(roundAmt(balanceData ? balanceData.balance : 0), 2)}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="so-l-c-con indexside">
                <div>
                    <ul>
                        <li>
                            <router-link v-bind:to="'/lobbyTemplate/deposit'">
                                <div class="icon">
                                    <div>
                                        <i class="index_s index_s01"></i>
                                    </div>
                                </div>
                                充值
                            </router-link>
                        </li>
                        <li>
                            <router-link v-bind:to="'/lobbyTemplate/withdrawals'">
                                <div class="icon">
                                    <div>
                                        <i class="index_s index_s02"></i>
                                    </div>
                                </div>
                                提款
                            </router-link>
                        </li>
                        <li>
                            <router-link v-bind:to="'/lobbyTemplate/acdetial'">
                                <div class="icon">
                                    <div>
                                        <i class="index_s index_s03"></i>
                                    </div>
                                </div>
                                帐户明细
                            </router-link>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <div class="icon">
                                    <div>
                                        <i class="index_s index_s04"></i>
                                    </div>
                                </div>
                                联络客服
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
    import $ from "jquery";
//    import deposit from '@/components/lobbyTemplate/deposit'

    export default {
        name: 'IndexNavigation',
        mixins:[Mixin],
        props:['el'],
//        components: {
//            deposit,
//        },

        data :function() {
            return {
                balanceData:null,
                haslogin :false ,
                showNavigation:false ,
                allLottery:{},
                gameHref : {
                    "1":"c_cqssc",
                    "2":"cqssc","3":"jxsyxw",
                    "4":"jc11x5",     //江西11选5
                    "8":"pk10","12":"tjssc",
                    "14":"xjssc",
                    "18":"jc11x5/sd11x5Index",  //山东11选5
                    "16":"jc11x5/gd11x5Index",  //广东11选5
                    "6":"k3/",  //江苏快3
                    "20":"k3/anHuiK3Index",
                    "22":"k3/huBeiK3Index",

                }, // 对应彩种的id
            }
        },
        created:function () {

        } ,
        mounted:function() {
            this.haslogin = this.ifLogined() ;
            if(this.haslogin){  // 只有登录状态才需要调余额
                this.getMemberBalance() ;
            }
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
                    url: this.action.forseti + 'apis/lotterys',
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
                            "Authorization": "bearer  " + this.getAccessToken,
                        },
                        // dataType:'json',
                        // contentType:"application/json; charset=utf-8",  // json格式传给后端
                        url: this.action.hermes + 'api/balance/get',
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
