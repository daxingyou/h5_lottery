<template>
    <div v-if="show" class="modal m14">
        <div class="m_content">
            <h2>提示<a href="javascript:;" @click="close()"></a></h2>
            <div class="content danger">
                <div>
                    <img src="../../../static/frist/images/page/status03.svg">
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
        z-index: 1000;
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
            this.loginOut('test');
            setTimeout(function(){
                window.location = '/reg' ;
            },500) ;
        },

    }
}
</script>

<style scoped>
</style>