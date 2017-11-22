<template>
    <div>
        <!--封盘时给foot加上class:close-->
        <!--<div class="so-foot close">-->
        <div class="so-foot">
            <div>
                <p>已选中<span class="bet-select-num">{{betCount}}</span>注</p>
            </div>
            <div>
                <form>
                    <input placeholder="输入金额" type="tel" class="bet-amount" v-model="betAmount">
                    <!--<input type="reset" @click="$parent.resetAction()" value="重置" >-->
                    <a class="submit" href="javascript:;" @click="$parent.resetAction()">重置</a>
                </form>
            </div>
            <div>
                <div class="so-add" @click="startBet($event)">
                    <p>下注</p>
                </div>
            </div>
        </div>
        <div v-if="showList" class="so-shade"></div>
        <div v-if="showList" class="so-pop">
            <h2>下注清单<a @click="closeListDialog"></a></h2>
            <p class="grey_text">请核对您的下注信息</p>
            <div>
                <div class="boxlist bet-go-list">
                    <p :data-id="item.cid" data-type="" v-for="item in betSelectedList">【<span class="each-title">{{item.parentItem && item.parentItem.name}}</span>-<span class="each-content">{{item.name}}</span>】 @ <span class="each-times">{{payoffFormat(item.oddsData.payoff)}}</span> x <span class="each-mon">{{betAmount}}</span></p>
                   <!-- <p>【第一球-单】 @ 1.995 x 10</p>-->
                </div>
            </div>
            <p class="so-pop-sum">
            【总计】总注数：<span class="total-bet-num">{{betCount}}</span> <br/>
            总金额：<span class="total-bet-mon">{{totalAmount}}</span>
            </p>
            <a class="cancle" @click="closeListDialog">取消</a>
            <a class="btn-submit ok" @click="submitAction(lotteryID)">确定</a>
        </div>
        <!--封盘底部遮挡-->
         <!-- <div class="so-fengpan">
            <a>已封盘</a>
        </div>  -->

    </div>
</template>



<script>
import Mixin from '@/Mixin'
// import $ from "jquery";

export default {
    name: 'Bet',
    props:[
        'betSelectedList', 'parentRefs', 
        'lotteryID', 'balance', 'now_pcode', 'now_day', 'next_pcode', 'pk10_now_pcode',
        // 'isCombine',    //是否组合玩法
        'playType',     //玩法类型
        'combineCount', //组合玩法注数
    ],
    mixins:[Mixin],
    data () {
        return {
            betAmount:'', //投注金额
            betGoList:[],
            // shadeStatus:false,
            showList:false ,
            ajaxSubmitAllow :false ,  // 解决重复提交的问题
        }
    },
    computed:{
        betCount:function(){
            if (this.playType == 'combine' || this.playType == 'grouped') {
                return this.combineCount;
            }else{
                return this.betSelectedList.length
            }
        },
        totalAmount:function(){
            if (this.playType == 'grouped'){
                return this.betCount * this.betAmount
            }else if (this.playType == 'combine') {
                return this.betAmount;
            }else{
                return this.betSelectedList.length * this.betAmount
            }
        }
    },
    methods:{
        /*
        * 重置投注页，提交表单后调用 success 1 投注成功
        * */
        resetAction:function(success) {
            this.$emit('betSuccess');
            if(success != '1'){
                this.betAmount = '';
            }
            this.showList = false;
        },

        /*
        * 表单提交，下注接口,lotteryid 彩种id
        * */

        submitAction:function(lotteryid) {
            // var total_mon = Number($('.total-bet-mon').text()) ; // 总投注金额
            const total_mon = this.monAmt(this.totalAmount);
            // 余额不足提示充值
            // if (this.monAmt(total_mon) > this.monAmt(Number(returnMoney($('.so-in-top-sum').eq(0).text())))) {
            if (total_mon > this.balance) {
                this.parentRefs.infoDialog.open('余额不足，请充值后继续进行！', 'title_bet_fail')
                this.showList = false;
                return false;
            }

            if(this.ajaxSubmitAllow){
                return false ;
            }      

            var resdata = {
                'list': [ ],
                'amount': total_mon,  //总金额，此金额=所有注单总金额
                'lotteryId': this.lotteryID ,  //彩种id
                'operType': 0, //下注类型，1下注
                // 'pcode': $('.now-date ').eq(0).text(), //期次20170925013
                'pcode':(this.lotteryID =='8')? this.pk10_now_pcode:this.now_pcode,
                'pdate': this.now_day, //日期20170925
                'remark': '无',//备注，可用于测试
                'source': 'h5', //来源：h5
                'sourceType':'2', // 1是pc端，2是h5

            };
            this.ajaxSubmitAllow = true ;
            this.doSubmitAction(resdata.list) ;
            $.ajax({
                type: 'POST',
                headers: {
                    "Authorization": "bearer  " + this.getAccessToken,
                    // 'sourceType':'2', // 1是pc端，2是h5
                    // 'sideType':'1',  // 1是传统盘，2是双面盘
                },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                url: this.action.forseti + 'api/orders/betOrder',
                timeout: 600000,
                //  data:  $(form).serialize() + "&randomNum=" + randomNum ,
                data: JSON.stringify(resdata),
                success: (data) => {

                    if (data.length <= 0) {
                        return false;
                    }

                    if (data.err == 'SUCCESS') {  //购买成功
                        this.ajaxSubmitAllow = false ;     //解决瞬间提交2次的问题
                        // initTipPop05(true,3) ;
                        // this.parentRefs.autoCloseDialog.open('购买成功')
                        this.parentRefs.betSuccessfulDialog.open('购买成功')
                        this.resetAction('1') ;  // 下注成功不清空金额
                        // getMemberBalance() ; // 更新余额
                        return false;
                    } else {  //购买失败提示
                        this.ajaxSubmitAllow = false ;
                        if(data.data =='' || data.data ==null){ // 平台商不存在
                            this.parentRefs.autoCloseDialog.open(data.msg,'title_bet_fail')
                            // initTipPop05(false,3,data.msg) ;
                        }else{   // 各种错误提示
                            if(data.data.params.ErrInfo !=''){
                                // initTipPop05(false,3,data.data.params.ErrInfo) ;
                                this.parentRefs.autoCloseDialog.open(data.data.params.ErrInfo,'title_bet_fail') ;

                            }
                        }

                        return false ;

                    }
                },
                error: function (e) {  // 错误提示
                    // initTipPop05(false,3,'投注失败，请稍后再试') ;
                    this.parentRefs.autoCloseDialog.open('投注失败，请稍后再试','title_bet_fail')
                    this.ajaxSubmitAllow = false;

                }
            });


        },

        /*
        * 表单提交数据处理
        * */
        doSubmitAction:function(list) {
            if (this.playType == 'combine' || this.playType == 'grouped'){
                list.push({  // 一条数据就是一个方案，一个方案可以有多条下注
                    'betAmount': this.monAmt(Number(this.totalAmount)), //下注金额，元的模式下需要 x100传值，角的模式下 x10
                    'betContent': this.betSelectedList.map((item)=>{ return item.name; }).join(','),      //zuArr.toString(),//下注内容，如1,5,8,3,7
                    'betCount': this.betCount, //注单数
                    'betMode': 0, //下注模式(预留)
                    'chaseCount': 1, //追号期数(含当期),默认1
                    'ifChase': 0 , //是否追号,0不追号，1追号
                    'moneyMode': 'y' ,//付款类型：元y，角j，分f
                    'multiple': Number(this.betAmount),    //Number($('.each-mon').eq(0).text()), //倍数最少为1
                    'payoff': 0, //派彩
                    'playId': this.betSelectedList[0].cid , //玩法
                    'remark': '无'//备注
                });
            }else{
                this.betSelectedList.forEach((item, i)=>{
                    list.push({  // 一条数据就是一个方案，一个方案可以有多条下注
                        'betAmount': this.monAmt(Number(this.betAmount)), //下注金额，元的模式下需要 x100传值，角的模式下 x10
                        'betContent': item.name,     //new_num.toString(),//下注内容，如1,5,8,3,7
                        'betCount':1,         //Number(num_each), //注单数
                        'betMode': 0, //下注模式(预留)
                        'chaseCount': 1, //追号期数(含当期),默认1
                        'ifChase': 0 , //是否追号,0不追号，1追号
                        'moneyMode': 'y' ,//付款类型：元y，角j，分f
                        'multiple': Number(this.betAmount),         //Number(total_each), //倍数最少为1
                        'payoff': 0, //派彩
                        'playId': item.cid,  //play_each, //玩法
                        'remark': '无'//备注
                    });
                });
            }
            return false;
        },

        startBet:function(e){
            var amount = this.betAmount;  // 获取金额
            var nums = this.betSelectedList.length;
            const closet = 4;
            // if(nums<1){ // 没有选择投注项目
            if(this.betCount<1){ // 没有选择投注项目
                this.parentRefs.autoCloseDialog.open('请选择投注项目')
                return false;
            }

            if(!amount || !this.isPositiveNum(amount) || amount =='0'){ // 投注金额不正确  .modal.m08
                this.parentRefs.autoCloseDialog.open('请输入整数的投注金额，金额不能为0','title_bet_fail')
                return false;
            }
            // 注单金额正确
            this.showList = true;
        },
        closeListDialog:function(){
            this.showList = false;
        }
    }
}
</script>

<style scoped>
    .so-pop, .so-shade { display: block; }
</style>