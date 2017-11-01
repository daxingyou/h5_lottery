
<template>
    <div class="so-main-down">
        <ul>
            <li>
                <p>
                    <!-- id 8 -->
                    第 <span class="now-date">{{(lotteryID==8)?now_pcode.toString().substr(4, 8):now_pcode}}</span> 期  
                </p>
            </li>
            <li>
                <i></i>
                <span>封盘</span>
                <a class="close-time">
                    {{(lt_time_leave_over <= 0) ? '已封盘' : overTimeSpanStr}}
                     
                    <!-- 00:00 --></a>
                    
            </li>
            <li>
                <i></i>
                <span >开奖</span>
                <a class="open-time">{{timeSpanStr}}</a>
            </li>
        </ul>
    </div>
</template>


<script>
import Mixin from '@/Mixin'

export default {
    name: 'CountdownTimer',
    mixins:[Mixin],
    // start服务器开始时间，end当前期开奖结束时间，overend 封盘结束时间
    props:['start', 'end', 'overend', 'now_pcode', 'lotteryID'],
    data () {
        return {
            timer:null,
            lt_time_leave:0, 
            lt_time_leave_over:0, 
            timeSpanStr:'',
            overTimeSpanStr:'',
            // countdownOver:false, 
            // entertainCountdownOver:false
        }
    },
    created:function(){

    },
    mounted:function() {
        this.timerInit();
    },
    beforeDestroy:function(){
        clearInterval(this.timer);
    },
    methods:{
        timerInit:function(start, end, overend){
            const format = this.format;
            const theStart = start ? start : this.start;
            const theEnd = end ? end : this.end;
            const theOverend = overend ? overend : this.overend;
            this.lt_time_leave = (this.format(theEnd).getTime() - this.format(theStart).getTime()) / 1000;//总秒数
            this.lt_time_leave_over = (this.format(theOverend).getTime() - this.format(theStart).getTime()) / 1000;//总秒数

            this.timer = window.setInterval((function() {
                // if (this.lt_time_leave > 0 && (this.lt_time_leave % 240 == 0 || this.lt_time_leave == 60 )) {   //每隔4分钟以及最后一分钟重新读取服务器时间
                //     this.getSystemTime().then((systemTime)=>{
                //         this.lt_time_leave = (this.format(this.now_time).getTime() - this.format(this.formatTimeUnlix(data.data)).getTime()) / 1000 ;
                //         this.lt_time_leave_over = (this.format(this.nowover_time).getTime() - this.format(this.formatTimeUnlix(data.data)).getTime()) / 1000 ;
                //     });
                // }

                // 开奖倒计时结束
                if (this.lt_time_leave == 0) { 
                    clearInterval(this.timer);
                    this.$emit('countdownOver');
                }

                // 封盘倒计时结束
                if(this.lt_time_leave_over == 0){ 
                    this.$emit('entertainCountdownOver');
                }

                var oDate = this.diff(this.lt_time_leave--);
                var over_oDate = this.diff(this.lt_time_leave_over--);
                this.timeSpanStr = this.fftime(oDate.minute) + ':' + this.fftime(oDate.second);
                this.overTimeSpanStr = this.fftime(over_oDate.minute) + ':' + this.fftime(over_oDate.second);

            }).bind(this), 1000);
        },
        fftime:function (n) {
            return Number(n) < 10 ? '' + 0 + Number(n) : Number(n);
        },

        format:function(dateStr) {//格式化时间
            return new Date(dateStr.replace(/[\-\u4e00-\u9fa5]/g, '/'));
        }, 
        diff:function(t) {//根据时间差返回相隔时间
            return t > 0 ? {
                day: Math.floor(t / 86400),
                hour: Math.floor(t % 86400 / 3600),
                minute: Math.floor(t % 3600 / 60),
                second: Math.floor(t % 60)
            } : {day: 0, hour: 0, minute: 0, second: 0};
        }
    }
}
</script>
