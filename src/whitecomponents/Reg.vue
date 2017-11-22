<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head">
            <div class="left">
                <router-link :to="'/'" class="before-add">
                    <img src="static/white/images/back.png" alt="" >
                </router-link>
                <a href="javascript:;"  class="after-add" @click="lastAction()" style="display: none ;">
                    <img src="static/white/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">注册</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <div class="login_area reg">
                <div align="center">为了您的资金安全，请使用真实资料！</div>
                <div class="before-add">
                    <form>
                       <!-- <fieldset>
                            <div class="form_g account">
                                <legend></legend>
                                <input type="text" placeholder="请输入推荐人帐号" v-model="tjrusername" autocomplete="off" class="tjrusername" @input="checkUserName(tjrusername,'tjrusername')">
                                <i class="close close1" @click="ClearInput('close1','tjrusername')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>-->
                        <fieldset>
                            <div class="form_g account" >
                                <legend></legend>
                                <input type="text" placeholder="请输入帐号" v-model="username" autocomplete="off"
                                       class="username" @input="checkUserName(username,'username')" @blur="CheckAccount()">
                                <i class="close close2" @click="ClearInput('close2','username')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset  v-if="show">
                            <div class="form_g password">
                                <legend></legend>
                                <input type="password" placeholder="请输入密码" v-model="password" autocomplete="off" class="password" @input="checkpassword(password,'password')" >
                                <i class="eye active eye1"  @click="showPassword('eye1')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset v-if="!show">
                            <div class="form_g password">
                                <legend></legend>
                                <input type="text" placeholder="请输入密码" v-model="password" autocomplete="off" class="password" @input="checkpassword(password,'password')">
                                <i class="eye act1" @click="showPassword('act1')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset  v-if="showC">
                            <div class="form_g password">
                                <legend></legend>
                                <input type="password" placeholder="请输入确认密码" autocomplete="off" v-model="confirmpassword" class="confirmpassword" @input="checkIsEqual('.confirmpassword')">
                                <i class="eye active eye2" @click="showPassword('eye2')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset  v-if="!showC">
                            <div class="form_g password">
                                <legend></legend>
                                <input type="text" placeholder="请输入确认密码" autocomplete="off"  v-model="confirmpassword" class="confirmpassword" @input="checkIsEqual('.confirmpassword')">
                                <i class="eye " @click="showPassword('act2')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                    </form>
                    <div class="btn btn_blue">
                        <a href="javascript:;" @click="nextAction()">下一步</a>
                    </div>
                </div>
                <div class="after-add" style="display: none;">
                    <fieldset>
                        <div class="form_g account">
                            <legend></legend>
                            <input type="text" placeholder="请输入真实姓名" autocomplete="off" class="realyname" v-model="realyname" @input="checkrealyName(realyname,'realyname')">
                            <i class="close close3" @click="ClearInput('close3','realyname')"></i>
                        </div>
                        <label class="error-message "></label>
                    </fieldset>
                    <fieldset v-if="showB">
                        <div class="form_g password">
                            <legend></legend>
                            <input type="password" placeholder="请输入4位数字支付密码" maxlength="4" v-model="withPassword" class="withPassword" @input="checkNum(withPassword,'withPassword')">
                            <i class="eye active eye3" @click="showPassword('eye3')"></i>
                        </div>
                        <label class="error-message "></label>
                        <!--<div class="form_g password text pay_password">-->
                            <!--<legend>取款密码</legend>-->
                            <!--<div class="select_inline">-->
                            <!--<select autocomplete="off" v-model="withpassword1" class="withpassword1">-->
                                <!--<option>-</option>-->
                                <!--<option>0</option>-->
                                <!--<option>1</option>-->
                                <!--<option>2</option>-->
                                <!--<option>3</option>-->
                                <!--<option>4</option>-->
                                <!--<option>5</option>-->
                                <!--<option>6</option>-->
                                <!--<option>7</option>-->
                                <!--<option>8</option>-->
                                <!--<option>9</option>-->
                            <!--</select>-->
                            <!--</div>-->
                            <!--<div class="select_inline">-->
                            <!--<select  v-model="withpassword2" class="withpassword2">-->
                                <!--<option>-</option>-->
                                <!--<option>0</option>-->
                                <!--<option>1</option>-->
                                <!--<option>2</option>-->
                                <!--<option>3</option>-->
                                <!--<option>4</option>-->
                                <!--<option>5</option>-->
                                <!--<option>6</option>-->
                                <!--<option>7</option>-->
                                <!--<option>8</option>-->
                                <!--<option>9</option>-->
                            <!--</select>-->
                            <!--</div>-->
                            <!--<div class="select_inline">-->
                            <!--<select v-model="withpassword3" class="withpassword3">-->
                                <!--<option>-</option>-->
                                <!--<option>0</option>-->
                                <!--<option>1</option>-->
                                <!--<option>2</option>-->
                                <!--<option>3</option>-->
                                <!--<option>4</option>-->
                                <!--<option>5</option>-->
                                <!--<option>6</option>-->
                                <!--<option>7</option>-->
                                <!--<option>8</option>-->
                                <!--<option>9</option>-->
                            <!--</select>-->
                            <!--</div>-->
                            <!--<div class="select_inline">-->
                            <!--<select v-model="withpassword4" class="withpassword4">-->
                                <!--<option>-</option>-->
                                <!--<option>0</option>-->
                                <!--<option>1</option>-->
                                <!--<option>2</option>-->
                                <!--<option>3</option>-->
                                <!--<option>4</option>-->
                                <!--<option>5</option>-->
                                <!--<option>6</option>-->
                                <!--<option>7</option>-->
                                <!--<option>8</option>-->
                                <!--<option>9</option>-->
                            <!--</select>-->
                            <!--</div>-->
                             <!--<input type="number" maxlength="4" size="1" placeholder="请输入4位数字密码"> -->
                        <!--</div>-->
                        <!-- <label class="red">请输入4~15位帐号</label> -->
                    </fieldset>
                    <fieldset  v-if="!showB">
                        <div class="form_g password">
                            <legend></legend>
                            <input type="text" placeholder="请输入4位数字支付密码" maxlength="4" v-model="withPassword" class="withPassword" @input="checkNum(withPassword,'withPassword')">
                            <i class="eye " @click="showPassword('act3')"></i>
                        </div>
                        <label class="error-message "></label>
                    </fieldset>
                    <fieldset>
                        <div class="form_g phone">
                            <legend></legend>
                            <input type="text" autocomplete="off" maxlength="11" placeholder="请输入手机号码" class="telephone" v-model="telephone" @input="checktelphone(telephone,'telephone')">
                            <i class="close close4" @click="ClearInput('close4','telephone')"></i>
                        </div>
                        <label class="error-message "></label>
                    </fieldset>
                    <fieldset>
                        <div class="form_g password ">
                            <legend></legend>
                            <input type="text" placeholder="请输入验证码" autocomplete="off" maxlength="4"  v-model="yzmcode">
                            <img :src="verImgCode" alt="" @click="switchYzmcode()">
                        </div>
                        <label class="error-message "></label>
                    </fieldset>

                    <div class="btn btn_blue">
                        <a href="javascript:;" @click="registerAction()">注册</a>
                    </div>
                </div>
                <div class="other_link">
                    <span>已有帐号?</span>
                    <a class="text-yellow" href="/login">马上登录</a>
                </div>
            </div>
        </div>
        <AutoCloseDialog ref="autoCloseDialog" text=" " type="" />
    </div>
</template>

<script>
    // import $ from "jquery";
    import Mixin from '@/Mixin'
    import AutoCloseDialog from '@/whitecomponents/publicTemplate/AutoCloseDialog'

    export default {
        name: 'Reg',
        mixins:[Mixin],
        components: {
            AutoCloseDialog,
        },
        data: function() {
            return {
                tjrusername :'',
                username :'',
                password :'',
                confirmpassword :'',
                realyname :'',
                telephone :'',
                yzmcode :'',
                withPassword: '',
                show:true,
                showC:true,
                showB:true,
                verImgCode:'',
                client:'',
                regsubmitflage:false ,
            }
        },
        created:function(){
           this.switchYzmcode() ;
        },
        mounted:function(){
            document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
        },
        methods:{
            //点击显示密码
            showPassword:function(cla){
                  if(cla=="eye1"){
                      this.show=false
                  }else if(cla=="eye2"){
                      this.showC=false
                  }else if(cla=='eye3'){
                      this.showB=false
                  }else if(cla=="act1"){
                      this.show=true;
                  }else if(cla=="act2"){
                      this.showC=true
                  }else if(cla=='act3'){
                      this.showB=true
                  }
                },
            //清除model数据,cl元素class
            clearVal :function (cl) {

                if(cl=='tjrusername'){
                    this.tjrusername ='';}
                if(cl=='username'){
                    this.username ='';
                }

                if(cl=='confirmpassword '){
                    this.confirmpassword ='';
                }
                if(cl=='realyname'){
                    this.realyname ='';
                }
                if(cl=='telephone'){
                    this.telephone ='';
                }

            },
            // 下一步
            nextAction:function () {
                document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
                if(this.username ==''){
                    this.$refs.autoCloseDialog.open('请输入帐号') ;
                    return false ;
                }
                if(this.password ==''){
                    this.$refs.autoCloseDialog.open('请输入用户密码') ;
                    return false ;
                }
                if(this.confirmpassword ==''){
                    this.$refs.autoCloseDialog.open('请输入确认密码') ;
                    return false ;
                }
                if(this.username==this.tjrusername){
                    this.$refs.autoCloseDialog.open('账号不能与推荐人账号相同') ;
                    return false ;
                }else if(this.confirmpassword !== this.password){
                    this.$refs.autoCloseDialog.open('两次密码输入不一致');
                    return false ;
                }
                var falg = $('.error-message').hasClass('red') ;  // 验证不通过，不允许提交
                if(falg){
                    return false ;
                }
                $('.before-add').hide() ;
                $('.after-add').show() ;

            },

            // 返回上一步
            lastAction:function () {
                $('.before-add').show() ;
                $('.after-add').hide() ;
                document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部

            },
            // 注册接口 ，除了推荐人，其他必填
            registerAction:function() {
                var _self=this;
                if(_self.regsubmitflage){
                    return false ;
                }
                if(this.realyname ==''){
                    this.$refs.autoCloseDialog.open('请输入真实姓名') ;
                    return false ;
                }
                if(this.withPassword ==''|| !this.positiveNum(this.withPassword)){
                    this.$refs.autoCloseDialog.open('请输入4位数字支付密码') ;
                    return false ;
                }
                if(this.telephone ==''){
                    this.$refs.autoCloseDialog.open('请输入手机号码') ;
                    return false ;
                }
               if(this.yzmcode ==''){
                    this.$refs.autoCloseDialog.open('请输入验证码') ;
                    return false ;
                }
                var falg = $('.error-message').hasClass('red') ;  // 验证不通过，不允许提交
                if(falg){
                    return false ;
                }
                _self.regsubmitflage = true ;
                var logindata = {
                    acType: '1',   //1真钱玩家，2试玩玩家
                    appid: 'bcappid02',    //平台商id，bcappid01 或 bcappid02
                    curType: 'CNY',  //币种，如：CNY
                    referrals: _self.tjrusername ,   // 推荐人
                    login: _self.username ,   // 帐号
                    method: 'mc',   //方法：mc创建会员
                    oddType: 'a',  //盘口，1位字符，预留
                    password: this.password ,  // 用户登录密码
                    realName: this.realyname ,  // 用户真实姓名
                    mobile: this.telephone , // 手机号码
                    passwordPay: this.withPassword ,   //取款密码
                    code: this.yzmcode ,   // 验证码
                }
                $.ajax({
                    type: 'post',
                    headers: {
                        Authorization: 'Basic d2ViX2FwcDo=',
                        clientId: this.client
                    },
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: this.action.uaa + 'apis/data/member/checkOrCreateMemberBcbaochi',
                    data: JSON.stringify(logindata) ,
                    success: (res) => {
                        if(res.err =='SUCCESS'){ // 注册成功
                            _self.regsubmitflage = false ;
                            _self.$refs.autoCloseDialog.open('注册成功','','icon_check','d_check') ;
                            _self.setCookie("access_token", res.data);  // 把登录token放在cookie里面
                            _self.setCookie("username", _self.username);  // 把登录用户名放在cookie里面
                            setTimeout(function () {
                               // window.location = '/Login' ;
                                window.location = '/' ;
                            },500)
                        }else{ //code 105 验证码无效
                            _self.regsubmitflage = false ;
                              this.switchYzmcode() ; // 更新验证码
                              this.$refs.autoCloseDialog.open(res.cnMsg) ;

                         }

                    },
                    error: function () {
                        _self.regsubmitflage = false ;
                    }
                });
            },
            switchYzmcode:function () {  //获取验证码；
                let _self =this ;
                let url= this.action.uaa + 'apis/member/code/get?time='+ Math.random();
                $.ajax({
                type:"GET",
                url:url,
                success: (data) => {
                 _self.verImgCode = data.data && 'data:image/png;base64,' + data.data.code || '';
                 _self.client = data.data && data.data.clientId || '';
                }
                })  
            },
            checkIsEqual:function (el) {
                if(this.confirmpassword == this.password){
                    $(el).parent('.form_g').next('.error-message').removeClass('red').text('');
                    return
                }else if((this.confirmpassword && !this.positiveEngNum(this.confirmpassword) ) || this.confirmpassword.length<6 || this.confirmpassword.length>20){
                    $(el).parent('.form_g').next('.error-message').addClass('red').text('请输入6~20位英数密码') ;
                }else{
                    $(el).parent('.form_g').next('.error-message').addClass('red').text('两次密码输入不一致') ;
                }
            },
            //自动登录
//            autoLogin :function () {
//                var _self = this ;
//                _self. switchYzmcode()
//                var logindata = {
//                    grant_type: 'password',
//                    username: 'bcappid02|'+_self.username ,
//                    password: _self.password ,
//                    code:_self.code
//                }
//                $.ajax({
//                        type: 'post',
//                        headers: {Authorization: 'Basic d2ViX2FwcDo=',clientId: this.client},
//                        url: this.action.uaa + 'apis/member/login',
//                        data: logindata ,
//                        success: function(res) {
//                        if(res.err == 'SUCCESS'){ // 登录成功
//                            _self.setCookie("access_token", res.data.access_token);  // 把登录token放在cookie里面
//                            _self.setCookie("username", _self.username);  // 把登录用户名放在cookie里面
//                            _self.$refs.autoCloseDialog.open('登录成功','','icon_check','d_check') ;
//                        setTimeout(function () {
//                            window.location = '/' ;
//                        },300)
//                    }else{
//                        _self.$refs.autoCloseDialog.open(res.cnMsg) ;
//                    }
//
//                this.$nextTick(function () {
//
//                })
//            },
//                error: function () {
//
//                }
//            });
//            },
            //验证账户是否存在
            CheckAccount:function () {
                let _self=this;
                let AccData={
                          appid:'bcappid02',
                          login:_self.username
                }
                $.ajax({
                    type: 'post',
                    headers: {Authorization: 'Basic d2ViX2FwcDo='},
                    url: this.action.uaa + 'apis/data/member/check_account',
                    data: AccData ,
                    success:(res)=>{
                        if(res.data==true){
                            _self.$refs.autoCloseDialog.open('用户名重复') ;
                            return false
                        }
                    }
                })
            }

        }


    }
</script>