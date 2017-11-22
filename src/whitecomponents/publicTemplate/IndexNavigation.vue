<template>

    <div v-if="showNavigation" :class="'so-left '+ (showNavigation?'active':'')">
        <div class="so-shade" @click="close"></div>
        <div class="so-left-close" @click="close">
            <img src="../../../static/frist/images/left/left808.png">
        </div>
        <div class="so-left-con" >
            <div class="so-l-c-top">
                <div>
                    <img src="../../../static/frist/images/left/user.png">
                </div>
                <div>
                    <p class="user_name" v-if="haslogin">{{getCookie('username')}}</p>
                    <div class="purse"  v-if="haslogin">
                        <img src="../../../static/frist/images/top/sjinbi.png" class="so-top-sum">
                        <div class="so-in-top-sum" >
                            {{ fortMoney(roundAmt($parent.balanceData ? $parent.balanceData.balance : 0), 2)}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="so-l-c-con indexside">
                <div>
                    <ul>
                        <li @click="CheckDemoPlay('CZ')">
                            <a>
                                <div class="icon">
                                    <div>
                                        <i class="index_s index_s01"></i>
                                    </div>
                                </div>
                                充值
                            </a>
                        </li>
                        <li @click="CheckDemoPlay('TK')">
                            <a>
                                <div class="icon">
                                    <div>
                                        <i class="index_s index_s02"></i>
                                    </div>
                                </div>
                                提款
                            </a>
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
                            <a href="javascript:;" @click="openGame('https://messenger.providesupport.com/messenger/1sppddzqo56sf08wzrnuxiv6yt.html')">
                                <div class="icon">
                                    <div>
                                        <i class="index_s index_s04"></i>
                                    </div>
                                </div>
                                在线客服
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Confirm ref="confirm" />
        <AutoCloseDialog ref="autoCloseDialog" text=" " type="" />
    </div>

</template>


<script>
    import Mixin from '@/Mixin'
    // import $ from "jquery";
//    import deposit from '@/components/lobbyTemplate/deposit'
    import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
    import Confirm from '@/components/publicTemplate/Confirm'
    export default {
        name: 'IndexNavigation',
        mixins:[Mixin],
        props:['el'],
        components: {
//            deposit,
        AutoCloseDialog,
            Confirm
        },

        data :function() {
            return {
                balanceData:'',
                haslogin :false ,
                showNavigation:false ,
                allLottery:{},
            }
        },
        created:function () {
            this.haslogin = this.ifLogined() ;

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

            //判断是否为游客,cla为class
            CheckDemoPlay:function (cla) {
                var _self =this;
                var acType=_self.getCookie('acType');
                if(acType==2){
                    _self.$refs.confirm.open();
                    return
                }
                if(cla=='CZ'){
                    window.location = '/lobbyTemplate/deposit' ;
                }
                if(cla=='TK'){
                    window.location = '/lobbyTemplate/Withdrawals' ;
                }
            }
        },

    }
</script>
<style scoped>
.so-shade {
    display: block;
    z-index: 0;
}
</style>