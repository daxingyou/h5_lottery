<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" :moduleplay="moduleplay" />

</template>

<script>
    import Index from '@/components/k3/Index'

    export default {
        name: 'miaoSuK3Index',
        components: {
            Index
        },
        data: function() {
            return {
                lotteryID:106,
                moduleName:'秒速快3',
                moduleplay:'每日00:01-隔日00:00，60秒一期，每天开奖1140期',
            }
        }

    }
</script>
