<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" :moduleplay="moduleplay"/>

</template>

<script>
    import Index from '@/components/jc11x5/Index'

    export default {
        name: 'MS11x5Index',
        components: {
            Index
        },
        data: function() {
            return {
                lotteryID:104,
                moduleName:'秒速11选5',
                moduleplay: '每日00:01-隔日00:00，60秒一期，每天开奖1140期。',
            }
        }

    }
</script>