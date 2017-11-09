<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <img src="static/images/back.png" alt="">
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
                        <fieldset>
                            <div class="form_g account">
                                <legend></legend>
                                <input type="text" placeholder="请输入推荐人帐号" v-model="tjrusername" class="tjrusername" @input="checkUserName(tjrusername,'tjrusername','请输入4~15位英数帐号')">
                                <i class="close close1" @click="ClearInput('close1','tjrusername')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset>
                            <div class="form_g account" >
                                <legend></legend>
                                <input type="text" placeholder="请输入帐号" v-model="username" class="username" @input="checkUserName(username,'username','请输入4~15位英数帐号')">
                                <i class="close close2" @click="ClearInput('close2','username')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset  v-if="show">
                            <div class="form_g password">
                                <legend></legend>
                                <input type="password" placeholder="请输入密码" v-model="password" class="password" @input="checkUserName(password,'password','请输入6~20位英数密码')" >
                                <i class="eye"  @click="showPassword()"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset v-if="!show">
                            <div class="form_g password">
                                <legend></legend>
                                <input type="text" placeholder="请输入密码" v-model="password" class="password" @input="checkUserName(password,'password','请输入6~20位英数密码')">
                                <i class="eye active" @click="showPassword()"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset  v-if="show">
                            <div class="form_g password">
                                <legend></legend>
                                <input type="password" placeholder="请输入确认密码" v-model="confirmpassword" class="confirmpassword" @input="checkUserName(confirmpassword,'confirmpassword','请输入6~20位英数密码')">
                                <i class="eye " @click="showPassword()"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset  v-if="!show">
                            <div class="form_g password">
                                <legend></legend>
                                <input type="text" placeholder="请输入确认密码" v-model="confirmpassword" class="confirmpassword" @input="checkUserName(confirmpassword,'confirmpassword','请输入6~20位英数密码')">
                                <i class="eye active" @click="showPassword()"></i>
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
                            <input type="text" placeholder="请输入真实姓名" class="realyname" v-model="realyname" @input="checkrealyName(realyname,'realyname','请输入真实姓名')">
                            <i class="close close3" @click="ClearInput('close3','realyname')"></i>
                        </div>
                        <label class="error-message "></label>
                    </fieldset>
                    <fieldset>
                        <div class="form_g password text pay_password">
                            <legend>取款密码</legend>
                            <select v-model="withpassword1" class="withpassword1">
                               <!-- <option>_</option>-->
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                            </select>
                            <select v-model="withpassword2" class="withpassword2">
                               <!-- <option>_</option>-->
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                            </select>
                            <select v-model="withpassword3" class="withpassword3">
                               <!-- <option>_</option>-->
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                            </select>
                            <select v-model="withpassword4" class="withpassword4">
                               <!-- <option>_</option>-->
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                            </select>
                            <!-- <input type="text" maxlength="1" size="1" placeholder="_"> -->
                        </div>
                        <!-- <label class="red">请输入4~15位帐号</label> -->
                    </fieldset>
                    <fieldset>
                        <div class="form_g phone">
                            <legend></legend>
                            <input type="text" placeholder="请输入手机号码" class="telephone" v-model="telephone" @input="checktelphone(telephone,'telephone','请输入正确的手机号码')">
                            <i class="close close4" @click="ClearInput('close4','telephone')"></i>
                        </div>
                        <label class="error-message "></label>
                    </fieldset>
                    <fieldset>
                        <div class="form_g password ">
                            <legend></legend>
                            <input type="password" placeholder="请输入验证码" v-model="yzmcode">
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
    import $ from "jquery";
    import Mixin from '@/Mixin'
    import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'

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
                withpassword1: '',
                withpassword2: '',
                withpassword3: '',
                withpassword4: '',
                show:true,
                showC:true,
                verImgCode:'',
            }
        },
        created:function(){
           this.switchYzmcode() ;
        },
        methods:{
            //点击显示密码
            showPassword:function(){
                 if(this.show){
                       this.show=false;
                   }else{
                       this.show=true
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

            // 注册接口 ，除了推荐人，其他必填
            registerAction:function() {
                if(this.realyname ==''){
                    this.$refs.autoCloseDialog.open('请输入真实姓名') ;
                    return false ;
                }
                if(this.withpassword1 ==''|| this.withpassword2 =='' || this.withpassword3 ==''|| this.withpassword4 ==''){
                    this.$refs.autoCloseDialog.open('请输入取款密码') ;
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
                var logindata = {
                    acType: '1',   //1真钱玩家，2试玩玩家
                    appid: 'bcappid02',    //平台商id，bcappid01 或 bcappid02
                    curType: 'CNY',  //币种，如：CNY
                    referrals: this.tjrusername ,   // 推荐人
                    login: this.username ,   // 帐号
                    method: 'mc',   //方法：mc创建会员
                    oddType: 'a',  //盘口，1位字符，预留
                    password: this.password ,  // 用户登录密码
                    realName: this.realyname ,  // 用户真实姓名
                    mobile: this.telephone , // 手机号码
                    passwordPay: this.withpassword1+this.withpassword2+this.withpassword3+this.withpassword4   //取款密码
                }
                $.ajax({
                    type: 'post',
                    headers: {Authorization: 'Basic d2ViX2FwcDo='},
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: this.action.uaa + 'apis/data/member/checkOrCreateMemberBcbaochi',
                    data: JSON.stringify(logindata) ,
                    success: (res) => {

                       // this.setCookie("access_token", res.access_token);  // 把登录token放在cookie里面
                       // this.setCookie("username", this.username);  // 把登录用户名放在cookie里面

                        this.$refs.autoCloseDialog.open('注册成功，请登录','','icon_check','d_check') ;
                        setTimeout(function(){
                            window.location = '/login' ;
                        },200)


                    },
                    error: function () {

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
                }
                })  
            }

        }


    }
</script>