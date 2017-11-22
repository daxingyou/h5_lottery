<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" :moduleplay="moduleplay"/>

</template>

<script>
    import Index from '@/whitecomponents/k3/Index'

    export default {
      name: 'anHuiK3Index',
      components: {
        Index
      },
      data: function() {
        return {
            lotteryID:20,
            moduleName:'安徽快3',
            moduleplay:'每日08:40-22:00，10分钟一期，每天开奖80期。',
        }
      }

    }
</script>
