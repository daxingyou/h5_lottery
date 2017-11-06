<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" />

</template>

<script>
    import Index from '@/components/k3/Index'

    export default {
      name: 'anHuiK3Index',
      components: {
        Index
      },
      data: function() {
        return {
            lotteryID:20,
            moduleName:'安徽快3'
        }
      }

    }
</script>
