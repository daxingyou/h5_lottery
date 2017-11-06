<template>
    <div id="pa_con">
        <header id="pa_head">
            <div class="left">
                <a href="../">
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
                        <li class="on"><a href="javascript:;" data-filter="">全部</a></li>
                        <li><a href="javascript:;" data-filter="not_open">资金派送</a></li>
                        <li><a href="javascript:;" data-filter="winning">充值</a></li>
                        <li><a href="javascript:;" data-filter="not_win">提款</a></li>
                    </ul>
                </div>
                <div class="bd">
                    <ul class="tab_content">
                        <li class="slide_toggle bet_day ac_detial">
                            <div class="panel_title">
                                <strong>09月14日</strong><span></span>
                            </div>
                            <ul class="panel">
                                <li class="bet_data ac_data" data-status="not_open">
                                    <a href="ac_detial_data.html">
                                        <div class="prd_num"><span>2017/07/04 10:22</span></div>
                                        <div class="item">
                                            <div class="icon">
                                                <div>
                                                    <i class="ac ac01"></i>
                                                </div>
                                            </div>
                                            <div class="lottery_t ssc">
                                                <p>人工入款<label class="sta sta01">成功</label></p>
                                                <strong>充值: 30.00</strong>
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
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'

export default {
  name: 'Login',
  mixins:[Mixin],
  components: {
   // AutoCloseDialog,
      FooterNav ,
  },
    data: function() {
        return {

        }
    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' )  ;

  },
  methods: {

}

}
</script>