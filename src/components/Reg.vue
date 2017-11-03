<template>
    <div id="pa_con" class="so-con warp bule_bg">
        <header id="pa_head">
            <div class="left">
                <a href="/">
                    <img src="static/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">注册</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <div class="login_area reg">
                <div align="center">为了您的资金安全，请使用真实资料！</div>
                <form>
                    <fieldset>
                        <div class="form_g account">
                            <legend></legend>
                            <input type="text" placeholder="请输入推荐人帐号" v-model="tjrusername" class="tjrusername" @input="checkUserName(tjrusername,'tjrusername','请输入4~15位帐号')">
                            <i class="close"></i>
                        </div>
                        <label class="error-message "></label>
                    </fieldset>
                    <fieldset>
                        <div class="form_g account" >
                            <legend></legend>
                            <input type="text" placeholder="请输入帐号" v-model="username" class="username" @input="checkUserName(username,'username','请输入4~15位帐号')">
                            <i class="close"></i>
                        </div>
                        <label class="error-message "></label>
                    </fieldset>
                    <fieldset>
                        <div class="form_g password">
                            <legend></legend>
                            <input type="password" placeholder="请输入密码" v-model="password" class="password" @input="checkUserName(password,'password','请输入4~15位密码')">
                            <i class="eye"></i>
                        </div>
                        <label class="error-message "></label>
                    </fieldset>
                    <fieldset>
                        <div class="form_g password">
                            <legend></legend>
                            <input type="password" placeholder="请输入确认密码" v-model="confirmpassword" class="confirmpassword" @input="checkUserName(confirmpassword,'confirmpassword','请输入4~15位密码')">
                            <i class="eye active"></i>
                        </div>
                        <label class="error-message "></label>
                    </fieldset>
                </form>
                <div class="btn btn_blue">
                    <a href="javascript:;" @click="nextAction()">下一步</a>
                </div>
                <div class="other_link">
                    <span>已有帐号?</span>
                    <a class="text-yellow" href="login.html">马上登录</a>
                </div>
            </div>
        </div>
        <AutoCloseDialog ref="autoCloseDialog" text="您的余额不足" type="" />
    </div>
</template>

<script>
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
            withpassword :'',
        }
    },
methods:{
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
    },

    // 注册接口
    registerAction:function() {
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
            grant_type: 'password',
            oddType: 'a',  //盘口，1位字符，预留
            password: this.password ,
            passwordPay: this.withpassword   //取款密码
        }
        $.ajax({
            type: 'post',
            headers: {Authorization: 'Basic d2ViX2FwcDo='},
            url: this.action.uaa + '/apis/member/checkOrCreateMemberBcbaochi',
            data: logindata ,
            success: (res) => {

            this.setCookie("access_token", res.access_token);  // 把登录token放在cookie里面
            this.setCookie("username", this.username);  // 把登录用户名放在cookie里面
            this.$refs.autoCloseDialog.open('注册成功') ;
            window.location = '/' ;

        },
        error: function () {

        }
    });
    },
}


}
</script>