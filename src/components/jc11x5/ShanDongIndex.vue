<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" />

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
            moduleName:'山东11选5'
        }
      }

    }
</script>
