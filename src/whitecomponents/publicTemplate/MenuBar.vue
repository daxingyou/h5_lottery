<template>
    <div class="so-in-top">
        <ul>
            <li class="so-menu">
                <img src="/static/white/images/top/icon-menu.png" class="so-top-menu">
            </li>
            <li class="left_top_logo">
                {{moduleName || '江苏快3'}}
            </li>
            <li class="purse">
                <img src="/static/white/images/top/sjinbi.png" class="so-top-sum">
                <div class="so-in-top-sum">
                    {{ fortMoney(roundAmt(balance), 2)}}
                </div>
            </li>
            <li class="so-top-zoushi">
                <img src="/static/white/images/top/zoushi.png">
            </li>
        </ul>
    </div>
</template>


<script>
    import Mixin from '@/Mixin'
    export default {
        name: 'menuBar',
        mixins:[Mixin],
        props:['moduleName', 'balance'],
        data: function() {
            return {
            }
        }

    }
</script>