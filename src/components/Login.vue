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
                            <input type="text" placeholder="请输入帐号" v-model="username" >
                            <i class="close"></i>
                        </div>
                        <label class="red">请输入4~15位帐号</label>
                    </fieldset>
                    <fieldset>
                        <div class="form_g password">
                            <legend></legend>
                            <input type="password" placeholder="请输入密码" v-model="password">
                            <i class="close"></i>
                        </div>
                        <label class="red">请输入4~15位密码</label>
                    </fieldset>
                </form>
                <div class="btn btn_blue">
                    <a href="javascript:;" @click="LoginAction()">登录</a>
                </div>
                <div class="other_link">
                    <a href="reg.html">马上注册</a>
                    <a href="javascript:;">免费试玩</a>
                    <a href="javascript:;">联系客服</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Mixin from '@/Mixin'
export default {
  name: 'Login',
  mixins:[Mixin],
  data: function() {
        return {
            username :'',
            password :'',
        }
    },
  mounted:function() {
        this.username = 'admin' ;

  },
  methods: {
    // 登录接口 moved to 主页/index.vue
    LoginAction:function() {
        if(this.username ==''){
            alert('请输入用户名');
            return false ;
        }
        if(this.password ==''){
            alert('请输入登录密码') ;
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
                window.location = '/' ;
                console.log('login successed.')
            },
            error: function () {

            }
        });
    },
}

}
</script>