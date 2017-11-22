<template>
    <div v-if="show" class="modal m14">
        <div class="m_content">
            <h2>提示<a href="javascript:;" @click="close()"></a></h2>
            <div class="content danger">
                <div>
                    <img src="../../../static/white/images/page/status03.svg">
                </div>游客不能访问该功能，是否注册会员？
            </div>
            <div class="action">
                <a class="cancle" href="javascript:;" @click="close()">取消</a><a class="ok" href="javascript:;"  @click="goReg()">确定</a>
            </div>
        </div>
    </div>
</template>

<style>
    .modal{
        display: block;
    }
</style>

<script>
import Mixin from '@/Mixin'
// import $ from "jquery";

export default {
    name: 'Confirm',
    mixins:[Mixin],
    data () {
        return {
            show:false,
        }
    },
    methods:{
       open:function () {
           this.show=true
       },
        //关闭弹窗
        close:function(e){
            this.show = false;
        },
        goReg:function () {
            this.loginOut();
            setTimeout(function(){
                window.location = '/reg' ;
            },1000)
        },
        // 退出函数
        loginOut:function () {
            var _self = this ;
            $.ajax({
                type: 'get',
                // headers: {Authorization: 'Basic d2ViX2FwcDo='},
                url: this.action.uaa + 'oauth/logout',
                data: {} ,
                success: (res) => {
                    if(res.err == 'SUCCESS'){
                        _self.clearAllCookie() ; // 清除全部 cookie
                        this.$refs.autoCloseDialog.open('用户已退出','','icon_check','d_check') ;
                        setTimeout(function () {
                            window.location = '/' ;
                        },300)

                    }
                    this.$nextTick(function () {

                    })
                },
                error: function () {

                }
            });
        },
    }
}
</script>

<style scoped>
</style>