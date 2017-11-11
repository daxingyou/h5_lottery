<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" />

</template>

<script>
    import Index from '@/components/k3/Index'

    export default {
      name: 'huBeiK3Index',
      components: {
        Index
      },
      data: function() {
        return {
            lotteryID:22,
            moduleName:' 湖北快3'
        }
      }

    }
</script>
