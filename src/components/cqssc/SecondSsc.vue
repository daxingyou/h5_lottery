<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" :moduleplay="moduleplay"/>
</template>

<script>
    import Index from '@/components/cqssc/Index'

    export default {
      name: 'xjsscIndex',
      components: {
        Index
      },
      data: function() {
        return {
            lotteryID:102,
            moduleName:'秒速时时彩',
            moduleplay: '每日00:01-隔日00:00，60秒一期，每天开奖1440期。',
        }
      }

    }
</script>

