<template>
    <footer class="bot_nav">
        <ul>
            <li :class="menu.path == $route.path && 'active'" v-for="menu in menus">
                <router-link :class="menu.className" :to="menu.path">{{menu.name}}</router-link>
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
            // debugger;
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
