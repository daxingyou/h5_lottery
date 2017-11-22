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
            moduleName:'马得时时彩分分彩',
            moduleplay: '每日09:30-22:00，10分钟一期，每天开奖84期。',
        }
      }

    }
</script>

