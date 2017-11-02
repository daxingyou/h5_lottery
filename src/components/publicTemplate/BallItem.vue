
<template>
    <p @click="betSelect($event)">
        <span>{{text}}</span>
        <span class="bet-times">{{payoffFormat(payoff)}}</span>
    </p>
</template>



<script>
    import Mixin from '@/Mixin'

    export default {
        name: 'jc11x5Index',
        mixins:[Mixin],
        props:['text', 'payoff'],
        // data: function() {
        //     return {
        //     }
        // },
          methods:{
            // subTabChange:function(e, kind,index){
            //     var $src = $(e.currentTarget);
            //     $src.addClass('on').siblings().removeClass('on');
            //     $src.closest('.tab_container').find('.bd ul').eq(index).addClass('show')
            //         .siblings().removeClass('show');

            // },
            //当用户选择球时，保存相应数据
            betSelect:function(e){
                var $src = $(e.currentTarget);
                if ($src.prop('class').indexOf('active') < 0){
                    $src.addClass('active');
                    this.$emit('selected', e, true);
                    // item.parentItem = parentItem;
                    // this.betSelectedList.push(item);
                }else{
                    $src.removeClass('active');
                    this.$emit('selected', e, false);
                    // this.betSelectedList = this.betSelectedList.filter((selected)=>{ return selected.cid != item.cid; });
                }
            }

          }

    }
</script>
