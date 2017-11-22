<template>
    <div id="pa_con" class="so-con warp bule_bg">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="../../../static/frist/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">代理注册</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <div class="formlist_area">
                <form>
                    <fieldset>
                        <div class="form_g account">
                            <legend></legend>
                            <input type="text" v-model="refereeNum"  placeholder="请输入推荐人帐号">
                            <i class="close cs1" @click=" ClearInput('cs1','reNum')"></i>
                        </div>
                        <!-- <label class="red">请输入4~15位帐号</label> -->
                    </fieldset>
                    <fieldset>
                        <div class="form_g text">
                            <legend>选择银行</legend>
                            <select name="" >
                                <option :value="banks.id" :data-code="banks.bankCode" v-for="banks in bankList">{{banks.bankName}}</option>
                            </select>
                            <i class="input_select"></i>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form_g account">
                            <legend></legend>
                            <input type="text" v-model="userNumber" placeholder="请输入帐号">
                            <i class="close cs2" @click=" ClearInput('cs2','userNum')"></i>
                        </div>
                         <label class="red"></label>
                    </fieldset>
                    <fieldset v-if="showPd">
                        <div class="form_g password">
                            <legend></legend>
                            <input type="password" v-model="userPd" placeholder="请输入密码">
                            <i class="eye active eye1" @click="show('eye1')"></i>
                        </div>
                         <label class="red"></label>
                    </fieldset>
                    <fieldset v-if="!showPd">
                        <div class="form_g password">
                            <legend></legend>
                            <input type="text" v-model="userPd" placeholder="请输入密码">
                            <i class="eye " @click="show('act')"></i>
                        </div>
                         <label class="red"></label>
                    </fieldset>
                    <fieldset>
                        <div class="form_g password">
                            <legend></legend>
                            <input type="text" v-model="identifyCode" class="identifyCode" placeholder="请输入验证码" maxlength="4">
                            <img :src="verImgCode" alt="" @click="switchYzmcode()">
                        </div>
                         <label class="red"></label>
                    </fieldset>
                </form>
                <div class="agent_check">
                    <input type="checkbox" id="cbox1" value="first_checkbox" checked>
                    我已届满合法博彩年龄，且已阅读并同意<a class="agent_modal" href="javascript:;" @click="show('ag')">《代理注册协议》
                </a>
                </div>
                <div class="btn btn_blue">
                    <a href="agent_apply.html">立即申请</a>
                </div>
            </div>
        </div>
        <div id="agent_modal"  class="so-pop-wanfa modal" v-if="!showModel">
           <div class="m_content">
              <h2>代理注册协议<a href="javascript:;" @click="show('h2')"></a></h2>
               <div class="content">
                  <div class="playtext">
                     <h3>一. 注册规约</h3>
                     <p>1. 为有效防止非诚信合作商滥用本网站所提供的代理优惠制度，公司审查部门将严格审核每位代理商注册时提供的个人资料（包括姓名，邮件及电话等）若经审核发现代理商有任何不良营利企图，或与其他代理商、会员进行合谋套利等不诚信行为，本网站将关闭该合作代理商之账户并收回该代理商的所有佣金与优惠。</p>
                     <p>2. 同一IP/同一姓名/同一收款账号的会员只能是一个合作商的下线，合作商自已不能成为自已及其他合作商的下线会员。同一IP/同一姓名/同一收款账号只能申请一个合作伙伴账号。</p>
                     <h3>二、权责条款</h3>
                     <strong>1.合作伙伴的权利和义务</strong>
                     <p>1.1. 合作伙伴需尽其责任积极销售及推广本网站以求双方利润最大化。合作伙伴必须在不违反法律的前提下，进行正面宣传、销售及推广本网站。由此产生的宣传、销售及推广时所产生的费用需由合作伙伴自行承担。</p>
                     <p>1.2. 合作伙伴不得私自转载、公开、分发包括主页、域名、logo、报表、游戏画面、图文等在内的相关资料。另外，在推广时，合作伙伴要保障本网站的利益，任何有损公司声誉的行为，一经发现立即终止合作关系。</p>
                     <strong>2.本网站对合作伙伴的权利与义务</strong>
                     <p> 2.1. 本网站的客服代表将会协助合作伙伴给下线办理开户业务并观察其投注状况。代理商及会员皆须同意并遵守本网站的会员条例、政策及操作进程。合作伙伴可随时登录管理后台了解其下线会员的账户报表。</p>
                     <p>2.2. 本网站保留所有对合作代理商或会员之账户加以拒绝或冻结的权利。</p>
                     <p>2.3. 在某些情况下经过认真审查本网站保留单方面修改合作协议上的任何条款的权利，本网站会在网站刊登修改情况告知合作伙伴。修改内容可能包括：佣金范围、付款进程、及其它条例。如合作伙伴对于修改表示反对，合作伙伴可终止合约。修改后合作伙伴不作任何异议，便视作默认接受和对新协议表示认可。</p>
                  </div>
                </div>
            </div>
         </div>
      </div>

</template>
<style>
    .modal.so-pop-wanfa{
        display: block;
    }
</style>
<script>
// import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'


export default {
  name: 'agent',
  mixins:[Mixin],
  components: {
   // AutoCloseDialog
  },
    data: function() {
          return {
           showModel :  true,
           showPd:true,
           bankList:'',
           refereeNum:'',//推荐人账号
           userNumber:'',//用户帐号
           userPd:'',//用户密码
           identifyCode:'',//验证码;
           verImgCode  :'',
           client:''
          }
    },
    created:function () {
      var _self=this;
      _self.getBankList();
      _self.switchYzmcode();
    },
    mounted:function() {

    },
    methods: {
      //清除model数据,cl元素class
       clearVal :function (cl) {
            if(cl=='reNum'){
                this.refereeNum='';
            }
            if(cl=='userNum'){
                this. userNumber='';
            }
            },
      //点击显示隐藏
       show:function(cla){
       var _self=this
       if(cla=='eye1'){
           _self.showPd=false
       }else if(cla=='act'){
           _self.showPd=true
       }else if(cla=='ag'){
           _self.showModel=false
       }else if(cla=='h2'){
           _self.showModel=true
       }
       },
      //获取银行列表
       getBankList:function(){
          var _self=this;
          $.ajax({
              type:'get',
//              headers: {"Authorization": "bearer  " + this.getAccessToken },
              url: _self.action.forseti + 'apis/payment/banks',
              data:{},
              success: function(res){
                  _self.bankList=res.data;
              },
              error: function (err) {

              }
          })
      },
      //获取验证码
       switchYzmcode:function () {
            let _self =this ;
            let url= _self.action.uaa + 'apis/member/code/get?time='+ Math.random();
            $.ajax({
                type:"GET",
                url:url,
                success: (data) => {
                    _self.verImgCode = data.data && 'data:image/png;base64,' + data.data.code || '';
                    _self.client = data.data && data.data.clientId || '';
                }
            })
        },
     }

}
</script>