
<template>
    <!--<p @click="betSelect($event)">-->
    <p @click="betSelect($event)">
        <span>{{model.name}}</span>
        <span class="bet-times">{{payoffFormat(model.oddsData.payoff)}}</span>
    </p>
</template>

<script>
    import Mixin from '@/Mixin'
    // import $ from "jquery";
    
    export default {
        name: 'BallItem',
        mixins:[Mixin],
        props:['model'],
          methods:{
            //当用户选择球时，保存相应数据
            betSelect:function(e){
                if(this.$parent.entertainStatus || this.$parent.notopen){ // 封盘不可点击
                    return false ;
                }
                var $src = $(e.currentTarget);
                if ($src.prop('class').indexOf('active') < 0){
                    // const result = this.$emit('selected', e, this.model);
                    const result = this.$emit('selected', e, this.model, function(result){
                        if (!result){
                            setTimeout(function(){
                                $src.removeClass('active');
                            },200)
                        } 
                    });
                    $src.addClass('active');
                }else{
                    $src.removeClass('active');
                    this.$emit('unSelected', e, this.model);
                }
            }

          }

    }
</script>
