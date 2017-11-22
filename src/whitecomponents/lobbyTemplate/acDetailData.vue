
<template>
    <div id="pa_con" class="so-con warp bule_bg">
        <header id="pa_head">
            <div class="left">
                <a href="#" @click.prevent="goBack">
                    <img src="/static/frist/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">{{parentData.moneyType[model.chargeType] || '-'}}详情</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <div class="deposit_area">
                <div class="pay_content">
                    <div class="success">
                        <div class="bank_account deposit_success">
                            <div class="print_data">
                                <table>
                                    <thead>
                                        <tr>
                                            <th> 
                                                <li>时间</li>
                                            </th>
                                           <!-- <td>{{(model && dateFormat(model.createTime, 'yyyy/mm/dd HH:mm')) || '1990/1/1 00:00'}}/td>-->
                                            <td>{{ model && formatTimeUnlix(model.createTime,'0') }} </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>编号</li>
                                            </th>
                                            <td>{{model.orderNo || '0'}}<!-- 123456123456123456 --></td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>帐变方式</li>
                                            </th>
                                            <td>{{(parentData.tradeTypeConfig[model.tradeType] && parentData.tradeTypeConfig[model.tradeType].name) || '-'}}<!-- 重庆时时彩 --></td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>状态</li>
                                            </th>
                                            <td>
                                                <!-- class="sta sta03" -->
                                                <label  :class="'sta '+ (parentData.statusConfig[model.state] && parentData.statusConfig[model.state].class)">{{parentData.statusConfig[model.state].name}}<!-- 失败 --></label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>交易金额</li>
                                            </th>
                                            <td class="text-yellow">{{formatNumber(roundAmt(model.tradeAmount))}}<!-- 100.00 --></td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>账户余额</li>
                                            </th>
                                            <td class="text-yellow">{{formatNumber(roundAmt(model.balance))}}<!-- 666.00 --></td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <li>备注</li>
                                            </th>
                                            <td>{{model.remark || '-'}}<!-- - --></td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        <FooterNav />
    </div>
</template>

<script>
// import $ from "jquery";
import Mixin from '@/Mixin'
import FooterNav from '@/components/Footer'

export default {
    name: 'acDetialData',
    mixins:[Mixin],
    components: {
        FooterNav ,
    },
    data: function() {
        return {
            parentData:{},
            model:{}, 
        }
    },

    created:function() {
        this.parentData = this.$route.params.data;
        this.model = this.$route.params.model;
     
    }, 
    methods:{
        
    }

}
</script>

