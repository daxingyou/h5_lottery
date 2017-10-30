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
                            <input type="text" placeholder="请输入帐号">
                            <i class="close"></i>
                        </div>
                        <label class="red">请输入4~15位帐号</label>
                    </fieldset>
                    <fieldset>
                        <div class="form_g password">
                            <legend></legend>
                            <input type="password" placeholder="请输入密码">
                            <i class="close"></i>
                        </div>
                        <label class="red">请输入4~15位密码</label>
                    </fieldset>
                </form>
                <div class="btn btn_blue">
                    <a href="javascript:;">登录</a>
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
export default {
  name: 'Login',
  data: function() {
        return {

        }
    },
  mounted:function() {
    
  },


}
</script>