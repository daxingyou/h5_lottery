<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" :moduleplay="moduleplay"/>

</template>

<script>
    import Index from '@/components/jc11x5/Index'

    export default {
      name: 'jc11x5Index',
      components: {
        Index
      },
      data: function() {
        return {
            lotteryID:16,
            moduleName:'广东11选5',
            moduleplay: '每日09:00-23:00，10分钟一期，全天共84期。',
        }
      }

    }
</script>
