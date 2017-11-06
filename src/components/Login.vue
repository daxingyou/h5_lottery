<template>
    <div id="pa_con" class="so-con warp bule_bg">
        <header id="pa_head" class="login">
            <img src="static/images/login_logo.png" alt="">
        </header>
        <div class="content">
            <div class="login_area">
                <form>
                    <fieldset>
                        <div class="form_g account">
                            <legend></legend>
                            <input type="text" placeholder="请输入帐号" v-model="username" class="user-name" @input="checkUserName(username,'user-name','请输入4~15位帐号')" >
                            <i class="close close1" @click="ClearInput('close1')"></i>
                        </div>
                        <label class="error-message "></label>
                    </fieldset>
                    <fieldset>
                        <div class="form_g password">
                            <legend></legend>
                            <input type="password" placeholder="请输入密码" v-model="password" class="pass-word"  @input="checkUserName(password,'pass-word','请输入4~15位密码')">
                            <i class="close close2" @click="ClearInput('close2')"></i>
                        </div>
                        <label class="error-message"> </label>
                    </fieldset>
                </form>
                <div class="btn btn_blue">
                    <a href="javascript:;" @click="LoginAction()">登录</a>
                </div>
                <div class="other_link">
                    <a href="/reg">马上注册</a>
                    <a href="javascript:;">免费试玩</a>
                    <a href="javascript:;">联系客服</a>
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
  name: 'Login',
  mixins:[Mixin],
  components: {
    AutoCloseDialog,
  },
    data: function() {
        return {
            username :'',
            password :'',
        }
    },
  mounted:function() {
       // this.username = 'admin' ;

  },
  methods: {
    // 登录接口 moved to 主页/index.vue
    LoginAction:function() {
        if(this.username ==''){
            this.$refs.autoCloseDialog.open('请输入用户名') ;
            return false ;
        }
        if(this.password ==''){
            this.$refs.autoCloseDialog.open('请输入登录密码') ;
            return false ;
        }
        var falg = $('.error-message').hasClass('red') ;  // 验证不通过，不允许提交
        if(falg){
            return false ;

        }
        var logindata = {  // grant_type: 'password', username: 'bcappid02|admin', password: 'admin'
            grant_type: 'password',
            username: 'bcappid02|'+this.username ,
            password: this.password
        }
        $.ajax({
            type: 'post',
            headers: {Authorization: 'Basic d2ViX2FwcDo='},
            url: this.action.uaa + 'oauth/token',
            data: logindata ,
            success: (res) => {
                this.setCookie("access_token", res.access_token);  // 把登录token放在cookie里面
                this.setCookie("username", this.username);  // 把登录用户名放在cookie里面
                this.$refs.autoCloseDialog.open('登录成功') ;
               setTimeout(function () {
                   window.location = '/' ;
               },200)
            },
            error: function () {

            }
        });
    },
}

}
</script>