<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" :moduleplay="moduleplay"/>
</template>

<script>
    import Index from '@/components/pk10/Index'

    export default {
        name: 'secondssc',
        components: {
            Index
        },
        data: function() {
            return {
                lotteryID:108,
                moduleName:'秒速赛车',
                moduleplay: '每日00:01-隔日00:00，60秒一期，每天开奖1140期。',
            }
        }

    }
</script>

