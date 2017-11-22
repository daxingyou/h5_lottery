<template>
    <ul class="tab_content">
        <li :class="'road '+ (roads.length >5 ? 'road_left':'')" v-for="roads in dataResult">
            <ul>
                <li :class="type[road]" v-for="road in roads">{{road}}</li>
            </ul>
        </li>
    </ul>

</template>

<script>
    // id="road01_1" 

    import Mixin from '@/Mixin'

    export default {
        name: 'RoadBeadItem',
        mixins:[Mixin],
        props:['dataResult'],
        data :function() {
            return {
                type:{ '和':'mid', '龙':'big', '大':'big', '单':'big', '虎':'tiger', '小':'tiger', '双':'tiger' }, 
            }
        },
        mounted:function() {
        },
        methods:{
        },

    }
</script>
