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
            lotteryID:14,
            moduleName:'新疆时时彩',
            moduleplay: '每日10:00-隔日02:00，10分钟一期，每天开奖84期。',
        }
      }

    }
</script>
