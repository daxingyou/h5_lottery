<template>
    <footer class="bot_nav">
        <ul>
            <li :class="menu.path == $route.path && 'active'" v-for="menu in menus">
                <router-link :class="menu.className" :to="menu.path">
                    <span class="Footer-icon"></span>
                    <span class="Footer-font">{{menu.name}}</span>
                </router-link>
            </li>

            <!-- <li><a class="trend" href="/lobbyPastView">往期开奖</a></li>
            <li><a class="record" href="publicTemplate/betRecord?type=index">投注纪录</a></li>
            <li><a class="member" href="javascript:;">个人中心</a></li> -->
        </ul>
      </footer>
</template>

<script>
    import Mixin from '@/Mixin'

    export default {
        name: 'FooterNav',
        mixins:[Mixin],
        mounted:function(){
            scrollTo(0,0); // 解决投注记录页面重复加载问题
            document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
        },
        data :function() {
            return {
                menus:[
                    { name:'首页大厅', className:'index', path:'/'},
                    { name:'往期开奖', className:'trend', path:'/lobbyPastView'},
                    { name:'投注纪录', className:'record', path:'/lobbyBetRecord'},
                    { name:'个人中心', className:'member', path:'/lobbyTemplate/info'},
                ]
            }
        },
    }
</script>
