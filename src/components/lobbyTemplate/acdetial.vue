<template>
    <div id="pa_con">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)" >
                    <img src="../../../static/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">帐户明细</h2>
            <div class="right"></div>
        </header>
        <div id="pa_content">
            <div id="betting_record" class="tab_container tabBox ac_detial_area">
                <div class="hd">
                    <ul class="tab tab_mid">
                        <li class="on"><a href="javascript:;" data-filter="" @click="getList($event, 1)">全部</a></li>
                        <li><a href="javascript:;" data-filter="not_open">资金派送</a></li>
                        <li><a href="javascript:;" data-filter="winning" @click="getList($event, 2)">充值</a></li>
                        <li><a href="javascript:;" data-filter="not_win" @click="getList($event, 3)">提款</a></li>
                    </ul>
                </div>
                <div class="bd">
                    <ul class="tab_content">
                        <li class="slide_toggle bet_day ac_detial">
                            <div class="panel_title">
                                <strong>09月14日</strong><span></span>
                            </div>
                            <ul class="panel" style="display:block;">
                                <li class="bet_data ac_data" data-status="not_open" v-for="item in list">
                                    <a href="ac_detial_data.html">
                                        <div class="prd_num"><span>{{item.tradeTime || '1990/1/1 00:00'}}</span></div>
                                        <div class="item">
                                            <div class="icon">
                                                <div>
                                                    <i :class="'ac ' + (actionTypeConfig[item.actionType] || 'ac01')"></i>
                                                </div>
                                            </div>
                                            <div class="lottery_t ssc">
                                                <p>{{lotteryName || '-'}}<label :class="'sta '+ statusConfig[item.state]">{{item.stateName}}</label></p>
                                                <strong>充值: {{item.tradeAmount || '0.00'}}</strong>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <!-- <li class="bet_data ac_data" data-status="not_open">
                                    <a href="ac_detial_data.html">
                                        <div class="prd_num"><span>2017/07/04 10:22</span></div>
                                        <div class="item">
                                            <div class="icon">
                                                <div>
                                                    <i class="ac ac02"></i>
                                                </div>
                                            </div>
                                            <div class="lottery_t ssc">
                                                <p>人工入款<label class="sta sta02">处理中</label></p>
                                                <strong>提款: 50.00</strong>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li class="bet_data ac_data" data-status="not_open">
                                    <a href="ac_detial_data.html">
                                        <div class="prd_num"><span>2017/07/04 10:22</span></div>
                                        <div class="item">
                                            <div class="icon">
                                                <div>
                                                    <i class="ac ac03"></i>
                                                </div>
                                            </div>
                                            <div class="lottery_t ssc">
                                                <p>派奖<label class="sta sta03">失败</label></p>
                                                <strong>金额: 1.00</strong>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li class="bet_data ac_data" data-status="not_open">
                                    <a href="ac_detial_data.html">
                                        <div class="prd_num"><span>2017/07/04 10:22</span></div>
                                        <div class="item">
                                            <div class="icon">
                                                <div>
                                                    <i class="ac ac02"></i>
                                                </div>
                                            </div>
                                            <div class="lottery_t ssc">
                                                <p>人工入款<label class="sta sta02">处理中</label></p>
                                                <strong>提款: 10.00</strong>
                                            </div>
                                        </div>
                                    </a>
                                </li> -->
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <footer id="pa_foot"></footer>
        <div class="so-shade"></div>


    </div>
</template>

<script>
import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'

export default {
    name: 'acdetial',
    mixins:[Mixin],
    components: {
        // AutoCloseDialog,
        FooterNav ,
    },
    data: function() {
        return {
            actionTypeConfig:{
                '1':'ac03', //派奖
                '2':'ac01', //人工入款
                '3':'', //公司入款
                '4':'ac02', //人工提款
                '5':'', //会员出款
                '':'', //
                '':'', //
            },
            // 派奖,人工入款,公司入款,人工提款,会员出款
            'list':[],
            'statusConfig':{
                '0':'sta02', //'未付款', 
                '1':'sta02',    //'用户取消', 
                '2':'sta03',    //'系统拒绝', 
                '3':'sta03',        //'系统取消', 
                '4':'sta01',        //'系统通过', //(已成功)
                '5':'sta03',    //'异常订单'
                //0-未付款，1-用户取消，2-系统拒绝，3，系统取消，4-系统通过(已成功)，5-异常订单
                // '成功':'sta01', 
                // '处理中':'sta02', 
                // '失败':'sta03', 
            }
        }
    },
    mounted:function() {
        $('html,body').css('overflow-y','scroll' )  ;
        this.getList().then(res=>{
            this.list = res.data.rows;
            console.log(res)
        });
    },
    methods: {
        
        getList:function(e, searchType) {
            return new Promise((resolve, reject)=>{
                $.ajax({
                    type: 'get',
                    headers: {
                        "Authorization": "bearer  " + this.getAccessToken,
                    },
                    url: this.action.forseti + 'api/pay/tradeList',
                    data: {searchType: searchType || 1, page:1, rows:10 }, // 1全部，2充值，3提现
                    success: (res) => {
                        // this.playTreeList = res.data ? res.data.childrens :[];
                        resolve(res);
                    },
                    error: function (e) {
                        if(e.responseJSON.error == 'invalid_token'){  // token 过期
                            _self.clearAllCookie() ;
                            setTimeout(function () {
                                window.location = '/login' ;
                            },300)
                            return false ;
                        }
                        reject(e);
                    }
                });
            });

        },
    }

}
</script>