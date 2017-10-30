<template>
    <div>
        <!--封盘时给foot加上class:close-->
        <!--<div class="so-foot close">-->
        <div class="so-foot">
            <div>
                <p>已选中<span class="bet-select-num">{{$parent.betSelectedList.length}}</span>注</p>
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
                    <p :data-id="item.cid" data-type="" v-for="item in $parent.betSelectedList">【<span class="each-title">{{item.parentItem && item.parentItem.name}}</span>-<span class="each-content">{{item.name}}</span>】 @ <span class="each-times">{{payoffFormat(item.oddsData.payoff)}}</span> x <span class="each-mon">{{betAmount}}</span></p>' ;
                   <!-- <p>【第一球-单】 @ 1.995 x 10</p>-->
                </div>
            </div>
            <p class="so-pop-sum">【总计】总注数：<span class="total-bet-num">{{$parent.betSelectedList.length}}</span> 总金额：<span class="total-bet-mon">{{$parent.betSelectedList.length*betAmount}}</span></p>
            <a @click="closeListDialog"><img style="width: 2rem;" src="/static/images/pop/hui.png"></a>
            <a class="btn-submit" @click="submitAction(this.lotteryID)"><img style="width: 2rem;" src="/static/images/pop/lan_text.png"></a>
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
    props:['lotteryID'],
    mixins:[Mixin],
    data () {
        return {
            betAmount:0, //投注金额
            betGoList:[],
            // shadeStatus:false,
            showList:false
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
        * 提交表单时，注单处理
        *
        * */
        // doCheckAction:function (e) {
            // var $that = $(e.currentTarget);
            // var bet_num = $('.bet-select-num').text() ; // 总注数
            // var bet_mon = $.trim($('.bet-amount').val()) ; // 投注金额
            // var all_bet_mon = Number(bet_num)*Number(bet_mon) ; // 总投注金额
            // var betstr = '' ;
            // $(".so-con-right p").each(function (i, t) {
            //     // 已选择的注单
            //     if($that.hasClass('active')){
            //         var total_title = $that.parents('.select-li').find('h2').text() ;  // 大标题
            //         var total_con = $that.find('span:nth-child(1)').text() ;  // 投注内容
            //         var total_mon = $that.find('span:nth-child(2)').text() ;  // 投注内容赔率
            //         var total_id = $that.data('id') ;  // 投注内容玩法id
            //         var total_type = $that.data('type') ;  // 投注内容玩法类型，组合是 zu_he
            //         if(total_type){
            //             betstr +='<p data-id="'+total_id+'" data-type="'+total_type+'">【<span class="each-title">'+ total_title +'</span>-<span class="each-content">'+ total_con +'</span>】 @ <span class="each-times">'+ total_mon+'</span> x <span class="each-mon"> '+ bet_mon +'</span></p>' ;
            //         }else{
            //             betstr +='<p data-id="'+total_id+'" >【<span class="each-title">'+ total_title +'</span>-<span class="each-content">'+ total_con +'</span>】 @ <span class="each-times">'+ total_mon+'</span> x <span class="each-mon"> '+ bet_mon +'</span></p>' ;
            //         }


            //     }
            // });
            // $('.bet-go-list').html(betstr) ;

            // // 总注数
            // $('.total-bet-num').text(bet_num) ;
            // // 总金额
            // $('.total-bet-mon').text(all_bet_mon) ;

        // },
        startBet:function(e){
            var amount = this.betAmount;  // 获取金额
            var nums = this.$parent.betSelectedList.length;
            const closet = 4;
            if(nums<1){ // 没有选择投注项目
                this.$parent.$refs.autoCloseDialog.open('请选择投注项目')
                return false;
            }

            if(!amount || !this.isPositiveNum(amount) || amount =='0'){ // 投注金额不正确  .modal.m08
                this.$parent.$refs.autoCloseDialog.open('请输入整数的投注金额，金额不能为0')
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