<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" />
</template>

<script>
    import Index from '@/components/qcssc/Index'

    export default {
      name: 'xjsscIndex',
      components: {
        Index
      },
      data: function() {
        return {
            lotteryID:12,
            moduleName:'天津时时彩'
        }
      }

    }
</script>
