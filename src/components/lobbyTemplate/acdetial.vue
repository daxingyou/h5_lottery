<template>
    <div id="pa_con">
        <header id="pa_head">
            <div class="left">
                <router-link to="/lobbyTemplate/info" >
                    <img src="../../../static/images/back.png" alt="">
                </router-link>
            </div>
            <h2 class="center">帐户明细</h2>
            <div class="right"></div>
        </header>
        <div id="pa_content">
            <div id="betting_record" class="tab_container tabBox ac_detial_area">
                <div class="hd">
                    <ul class="tab tab_mid">
                        <li :class="tab.active?'on':''" @click="selectTab($event, tab)" v-for="(tab,index) in tabs"><a href="javascript:;">{{tab.title}}</a></li>
                    </ul>
                </div>
                <div class="bd">
                    <ul class="tab_content">
                        <li :class="(day.active?'active ':'')+' slide_toggle bet_day ac_detial'" v-for="(day,index) in activeTab.days">
                            <div class="panel_title" @click="selectDayTab($event, day)">
                                <strong>{{day.pdate}}<!-- 09月14日 --></strong><span></span>
                            </div>
                            <ul class="panel">
                                <li class="bet_data ac_data" data-status="not_open" v-for="item in day.list">
                                    <router-link :to="{ name:'acDetailData', params:{ model:item, data:$data} }">
                                        <div class="prd_num"><span>{{item.createTime || '1990/1/1 00:00'}}</span></div>
                                        <div class="item">
                                            <div class="icon">
                                                <div>
                                                    <i :class="'ac ' + (tradeTypeConfigItemGet(item).class || 'ac01')"></i>
                                                </div>
                                            </div>
                                            <div class="lottery_t ssc">
                                                <p>{{tradeTypeConfigItemGet(item).name || '-'}}<label :class="'sta '+ (statusConfig[item.state] && statusConfig[item.state].class)">{{(statusConfig[item.state] && statusConfig[item.state].name)}}</label></p>
                                                <strong>充值: {{(item && formatNumber(roundAmt(item.tradeAmount))) || '0.00'}}</strong>
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                                
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
import FooterNav from '@/components/Footer'

export default {
    name: 'acdetial',
    mixins:[Mixin],
    components: {
        FooterNav ,
    },
    data: function() {
        return {
            // tabs:,
            tradeTypeConfig:{ 
                '1':{ name:'公司入款', class:'ac03' }, 
                '3':{ name:'线上入款', class:''}, 
                '5':{ name:'人工入款', class:'ac01'}, 
                '7':{ name:'会员出款', class:'ac03'}, 
                '8':{ name:'人工提款', class:'ac02'} 
            }, 
            actionTypeConfig:{
                '1':{ class:'ac03', name:'派奖' }, 
                '2':{ class:'ac01', name:'人工入款' }, 
                '3':{ class:'ac03', name:'公司入款' }, 
                '4':{ class:'ac02', name:'人工提款' }, 
                '5':{ class:'ac03', name:'会员出款' }, 
            },
            activeTab:{ value:1, days:[] }, //当前选项卡
            statusConfig:{ 
                '0':{ name:'未付款',class:'sta02'}, 
                '2':{name:'已取消',class:'sta02'}, 
                '3':{name:'已拒绝',class:'sta03'}, 
                '4':{name:'已通过',class:'sta01'}, 
                '5':{name:'已锁定',class:'sta03'} 
            }
            // statusConfig:{ '1':'公司入款', '3':'线上入款', '5':'人工入款', '7':'会员出款', '8':'人工提款' }

            // {
            //     '0':'sta02', //'未付款', 
            //     '1':'sta02',    //'用户取消', 
            //     '2':'sta03',    //'系统拒绝', 
            //     '3':'sta03',        //'系统取消', 
            //     '4':'sta01',        //'系统通过', //(已成功)
            //     '5':'sta03',    //'异常订单'
            //     //0-未付款，1-用户取消，2-系统拒绝，3，系统取消，4-系统通过(已成功)，5-异常订单
            //     // '成功':'sta01', 
            //     // '处理中':'sta02', 
            //     // '失败':'sta03', 
            // }
        }
    },
    computed:{
        tabs:function(){
            return this.$parent.$data.acDetail.tabs;
            // return [
            //     { title:'全部', value:'1', days:[], active:true },
            //     { title:'资金派送', value:'', days:[], active:false },
            //     { title:'充值', value:'2', days:[], active:false },
            //     { title:'提款', value:'3', days:[], active:false },
            // ]
        }
    },
    mounted:function() {
        //1 为全部选项卡的值
        let tab = this.tabs[0]
        this.loadTab(tab);
    },
    methods: {
        tradeTypeConfigItemGet:function(item){
            return this.tradeTypeConfig[item.tradeType] || {};
        },
        loadTab:function(tab){
            tab.days.length<=0 && this.getDays(tab.value).then(res=>{
                if (!res.data){
                    tab.days = [];
                    return false;
                }
                tab.days = res.data.map((item,index)=>{ 
                    if (index == 0){
                        item.active = true; 
                    }else{
                        item.active = false; 
                    }
                    item.list = []; 
                    return item;
                });
                const day = tab.days[0];
                this.getList(tab.value, day.pdate).then(res=>{
                    day.list = res.data;
                });
            });
            this.activeTab = tab;
        },
        selectDayTab:function(e, day){
            if (day.active){
                day.active = false
            }else{
                this.activeTab.days.forEach(item=>{item.active=false});
                day.active = true;
            }
            day.list.length<=0 && this.getList(this.activeTab.value, day.pdate).then(res=>{
                day.list = res.data;
            });
        },
        selectTab:function(e, tab){
            if (tab.active){
                return false;
            }
            this.tabs.forEach(item=>{item.active=false});
            tab.active = true;
            this.loadTab(tab);
        },
        getDays:function(searchType){
            return new Promise((resolve, reject)=>{
                this.ajax({
                    url: this.action.forseti + 'api/pay/tradeDayList',
                    data: {searchType: searchType || 1, page:1, rows:10 }, // 1全部，2充值，3提现
                    success: (res) => {
                        resolve(res);
                    }
                });
            });
        },
        getList:function(searchType, pdate) {
            return new Promise((resolve, reject)=>{
                this.ajax({
                    url: this.action.forseti + 'api/pay/tradeList',
                    data: {searchType: searchType || 1, pdate:pdate, page:1, rows:10 }, // 1全部，2充值，3提现
                    success: (res) => {
                        resolve(res);
                    },
                });
            });

        },
    }

}
</script>
<style>
    .bet_day.active .panel { display: block;  }
</style>