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
            lotteryID:18,
            moduleName:'山东11选5',
            moduleplay: '每日08:33-22:53，10分钟一期，全天共87期。',
        }
      }

    }
</script>
