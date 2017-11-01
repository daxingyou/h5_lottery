<template>
    <div>
        <!--封盘时给foot加上class:close-->
        <!--<div class="so-foot close">-->
        <div class="so-foot">
            <div>
                <p>已选中<span class="bet-select-num">{{betSelectedList && betSelectedList.length}}</span>注</p>
            </div>
            <!-- <div>
                <input placeholder="输入金额" type="number">
                <a>重置</a>
            </div> -->
            <div>
                <form>
                    <input placeholder="输入金额" type="number" class="bet-amount" v-model="betAmount">
                    <input type="reset" value="重置">
                </form>
            </div>
            <div>
                <div class="so-add" @click="startBet($event)">
                    <img src="/static/images/foot/foot-jia.png">
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
            <p class="so-pop-sum">【总计】总注数：<span class="total-bet-num">{{betSelectedList.length}}</span> 总金额：<span class="total-bet-mon">{{totalAmount}}</span></p>
            <a @click="closeListDialog"><img style="width: 2rem;" src="/static/images/pop/hui.png"></a>
            <a class="btn-submit" @click="submitAction(lotteryID)"><img style="width: 2rem;" src="/static/images/pop/lan_text.png"></a>
        </div>
        <!--封盘底部遮挡-->
         <!-- <div class="so-fengpan">
            <a>已封盘</a>
        </div>  -->

        <!--请输入投注金额-->
        <div class="popup so-tip-pop so-tip-pop-04">
            <div>
                <img src="/static/images/pop/title_tip.png">
                <img src="/static/images/page/status03.svg">
                <p class="bet-error-content">请输入投注金额</p>
            </div>
        </div>
        <!--本期投注已结束-->
        <div class="popup so-fengpan-pop so-bet-end-pop">
            <div>
                <img src="/static/images/pop/title_end.png">
                <img src="/static/images/page/status03.svg">
                <p>请至下期继续投注</p>
            </div>
        </div>

        <!--下注弹窗_成功-->
        <div class="popup so-tip-pop so-tip-pop-05 bet_ok_area">
            <img class=" bet_ok" src="/static/images/pop/ok_light.png">
            <div>
                <img src="/static/images/pop/title_bet_ok.png">
                <img src="/static/images/pop/icon_check.png">
                <p>您已成功支付<br/>请随时关注开奖信息！</p>
            </div>
        </div>
        <!--下注弹窗_失敗-->
        <div class="popup so-tip-pop so-tip-pop-06">
            <div>
                <img src="/static/images/pop/title_bet_fail.png">
                <img src="/static/images/page/status03.svg">
                <p class="submit-error-content">您的余额不足 <br/>请充值后继续进行！</p>
            </div>
        </div>
    </div>
</template>



<script>
import Mixin from '@/Mixin'

export default {
    name: 'Index',
    props:['betSelectedList', 'parentRefs',
        'lotteryID', 'balance', 'now_pcode', 'now_day', 'next_pcode'],
    mixins:[Mixin],
    data () {
        return {
            betAmount:'', //投注金额
            betGoList:[],
            // shadeStatus:false,
            showList:false
        }
    },
    computed:{
        totalAmount:function(){
            return this.betSelectedList.length * this.betAmount
        }
    },
    mounted:function() {
        // // 确认提交注单
        // $('.btn-submit').on('click',function () {
        //     submitAction(lotteryid) ;
        // }) ;
    },
    methods:{
        /*
        * 重置投注页，提交表单后调用
        * */
        resetAction:function() {
            this.$emit('betSuccess');
            this.betAmount = '';
            this.showList = false;
            // $(".so-con-right p").each(function (i, t) {
            //     $(this).removeClass('active') ;
            //     $('.bet-select-num').text('0') ;
            //     $('.bet-amount').val('') ;
            // })
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
                // initTipPop05(false,3,'您的余额不足<br/>请充值后继续进行！') ;
                console.log('您的余额不足<br/>请充值后继续进行！')
                return false;
            }
            var resdata = {
                'list': [ ],
                'amount': total_mon,  //总金额，此金额=所有注单总金额
                'lotteryId': this.lotteryID ,  //彩种id
                'operType': 0, //下注类型，1下注
                // 'pcode': $('.now-date ').eq(0).text(), //期次20170925013
                'pcode':this.now_pcode,
                'pdate': this.now_day, //日期20170925
                'remark': '无',//备注，可用于测试
                'source': 'h5', //来源：h5
                'sourceType':'2', // 1是pc端，2是h5

            };
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

                    //解决瞬间提交2次的问题
                   // ajaxSubmitAllow = true;
                    if (data.length <= 0) {
                        return false;
                    }

                    if (data.err == 'SUCCESS') {  //购买成功
                        // initTipPop05(true,3) ;
                        // this.parentRefs.autoCloseDialog.open('购买成功')
                        this.parentRefs.betSuccessfulDialog.open('购买成功')
                        this.resetAction() ;
                        // getMemberBalance() ; // 更新余额
                        return false;
                    } else {  //购买失败提示

                        if(data.data =='' || data.data ==null){ // 平台商不存在
                            this.parentRefs.autoCloseDialog.open(data.msg)
                            // initTipPop05(false,3,data.msg) ;
                        }else{   // 各种错误提示
                            if(data.data.params.ErrInfo !=''){
                                // initTipPop05(false,3,data.data.params.ErrInfo) ;
                                this.parentRefs.autoCloseDialog.open(data.data.params.ErrInfo)

                            }
                        }

                        return false ;

                    }
                },
                error: function (res) {  // 错误提示
                    // initTipPop05(false,3,'投注失败，请稍后再试') ;
                    this.parentRefs.autoCloseDialog.open('投注失败，请稍后再试')
                   // ajaxSubmitAllow = true;

                }
            });
            

        },

        /*
        * 表单提交数据处理
        * */
        doSubmitAction:function(list) {
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
            return false;
            

            //-----------------

        //     var zuArr = [] ;
        //     var gametype ;
        //     var zu_play ;
        //     $.each($('.bet-go-list p'), function (i, n) {  // 遍历每笔注单
        //         var num_each = 1 ;  // 每单注数
        //         var total_each = returnMoney($(n).find('.each-mon').text()) ;  // 每单金额
        //         var play_each = $(n).data('id');  // 每单玩法
        //         var play_type = $(n).data('type');  // 每单玩法类型
        //         var new_num = $(n).find('.each-content').html() ;  //下注内容
        //         gametype = play_type ; // 组合玩法
        //         zu_play = play_each ; // 组合玩法
        //         zuArr.push(new_num) ;  // 组合玩法
        //         if(!gametype){
        //             // 下注以对象的形式传递
        //             list.push(
        //                 {  // 一条数据就是一个方案，一个方案可以有多条下注
        //                     'betAmount': this.monAmt(Number(total_each)), //下注金额，元的模式下需要 x100传值，角的模式下 x10
        //                     'betContent': new_num.toString(),//下注内容，如1,5,8,3,7
        //                     'betCount': Number(num_each), //注单数
        //                     'betMode': 0, //下注模式(预留)
        //                     'chaseCount': 1, //追号期数(含当期),默认1
        //                     'ifChase': 0 , //是否追号,0不追号，1追号
        //                     'moneyMode': 'y' ,//付款类型：元y，角j，分f
        //                     'multiple': Number(total_each), //倍数最少为1
        //                     'payoff': 0, //派彩
        //                     'playId': play_each, //玩法
        //                     'remark': '无'//备注
        //                 });
        //         }

        //     });
        //     if(gametype =='zu_he'){
        //         list.push(
        //             {  // 一条数据就是一个方案，一个方案可以有多条下注
        //                 'betAmount': this.monAmt(Number($('.total-bet-mon').text())), //下注金额，元的模式下需要 x100传值，角的模式下 x10
        //                 'betContent': zuArr.toString(),//下注内容，如1,5,8,3,7
        //                 'betCount': Number($('.total-bet-num').text()), //注单数
        //                 'betMode': 0, //下注模式(预留)
        //                 'chaseCount': 1, //追号期数(含当期),默认1
        //                 'ifChase': 0 , //是否追号,0不追号，1追号
        //                 'moneyMode': 'y' ,//付款类型：元y，角j，分f
        //                 'multiple': Number($('.each-mon').eq(0).text()), //倍数最少为1
        //                 'payoff': 0, //派彩
        //                 'playId': zu_play , //玩法
        //                 'remark': '无'//备注
        //             });
        //     }

        },

        startBet:function(e){
            var amount = this.betAmount;  // 获取金额
            var nums = this.betSelectedList.length;
            const closet = 4;
            if(nums<1){ // 没有选择投注项目
                this.parentRefs.autoCloseDialog.open('请选择投注项目')
                return false;
            }

            if(!amount || !this.isPositiveNum(amount) || amount =='0'){ // 投注金额不正确  .modal.m08
                this.parentRefs.autoCloseDialog.open('请输入整数的投注金额，金额不能为0')
                return false;
            }
            // 注单金额正确
            this.showList = true;
        },
        closeListDialog:function(){
            this.showList = false;
        },
        //此方法弹出结算框 ,注单数量，添加按钮
        // initPopEve:function(closet) {
        //     // 投注金额提示弹窗关闭
        //     $(".modal.m08").click(function () {
        //         $(".modal.m08").toggle() ;
        //         $(".so-shade").toggle() ;
        //     }) ;

        // }
    }
}
</script>

<style scoped>
    .so-pop, .so-shade { display: block; }
</style>