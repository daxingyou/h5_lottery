<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" :moduleplay="moduleplay" />

</template>

<script>
    import Index from '@/whitecomponents/k3/Index'

    export default {
      name: 'huBeiK3Index',
      components: {
        Index
      },
      data: function() {
        return {
            lotteryID:22,
            moduleName:' 湖北快3',
            moduleplay:'每日09:00-22:00，10分钟一期，每天开奖78期。',
        }
      }

    }
</script>
