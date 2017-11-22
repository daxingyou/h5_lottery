<template>
    <div id="pa_con"  class="body">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" >
                   <!-- <img src="/static/white/images/back.png" alt="">-->
                </a>
            </div>
            <h2 class="center lottery_name">{{lotteryname}}</h2>
            <div class="right">
                <div class="dropdown_icon"><i class="icon filter"></i>筛选</div>
            </div>
        </header>
        <div class="dropdown" style="display:none;">
            <div class="play_area">
                <div class="sort">
                    <h5>游戏筛选</h5>
                    <ul>
                        <li :class="{'active':lotteryid== list.id}" :data-val="list.id" v-for="list in gamechoose"><a href="javascript:void(0);"> {{list.name}} </a></li>
                    </ul>
                    <div>
                        <div class="btn btn_two round btn_outline"><a href="javascript:;">取消</a></div>
                        <div class="btn btn_two round btn_blue02 btn_submit"><a href="javascript:;">确定</a></div>
                    </div>
                </div>
            </div>
        </div>

        <div id="pa_content">
            <div id="betting_record" class="tab_container tabBox">
                <div class="hd recode-tab"> <!-- 投注记录切换tab -->
                    <ul class="tab tab_mid">
                        <li class="on"><a href="javascript:;" data-filter="" data-val="1">全部</a></li>
                        <li><a href="javascript:;" data-filter="not_open" data-val="2">未开奖</a></li>
                        <li><a href="javascript:;" data-filter="winning" data-val="3">已中奖</a></li>
                        <li><a href="javascript:;" data-filter="not_win" data-val="4">未中奖</a></li>
                    </ul>
                </div>

                <div class="swiper-container" id="swiper1">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="bd">
                                <ul class="tab_content tab_content_1 sliding-box">
                                    <!--列表内容-->
                                </ul>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="bd">
                                <ul class="tab_content tab_content_1 sliding-box">
                                    <!--列表内容-->
                                </ul>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="bd">
                                <ul class="tab_content tab_content_1 sliding-box">
                                    <!--列表内容-->
                                </ul>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="bd">
                                <ul class="tab_content tab_content_1 sliding-box">
                                    <!--列表内容-->
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>

        <footer id="pa_foot"></footer>
        <div class="so-shade"></div>
        <FooterNav />

    </div>

</template>


<script>
    // import $ from "jquery";
    import FooterNav from '@/whitecomponents/Footer'
    import Mixin from '@/Mixin'
   // import 'swiper'
    import '../../static/js/swiper-3.4.2.jquery.min.js'
    import '../../static/white/css/swiper-3.4.2.min.css'
    
    export default {
        name: 'betRecord',
        mixins: [Mixin],
        components: {
            FooterNav
        },
        data: function () {
            return {
                haslogin:false ,
                restr: '', // 网页html缓存
                lock: 0,
                // access_token : this.getCookie('access_token'), // 取token
                lotteryname : '全部 投注记录' ,
                lotteryid : '0' ,
                lastlotteryid : '0' ,
                nowDate: new Date(),
                seadata: {
                    page: 1, // 页数，从1开始
                    pageSize: 10, // 每页行数
                    searchType: 1, // 查询类型，1为投注记录查询，2为追号查询
                    statusType: 1, // 状态：1全部，2未开奖，3已中奖，4未中奖,81异常处理中，5和局
                    lotteryId: this.lotteryid , // 彩种ID
                    sideType: '2' , // 彩票类型：1 官彩，2 双面彩
                    // pdate: this.newpdate,
                },
                gamechoose :[
                    {id:'0','name':'全部'} ,
                    {id:'2','name':'重庆时时彩'} ,
                    {id:'12','name':'天津时时彩'} ,
                    {id:'14','name':'新疆时时彩'} ,
                    {id:'4','name':'江西11选5'} ,
                    {id:'16','name':'广东11选5'} ,
                    {id:'18','name':'山东11选5'} ,
                    {id:'6','name':'江苏快3'} ,
                    {id:'20','name':'安徽快3'} ,
                    {id:'22','name':'湖北快3'} ,
                    {id:'8','name':'北京PK10'} ,
                ],
                tableLock: 0,
                // 投注详情
                touzhuXQ: {},
                soyeScroll:null, 
                mySwiperTrack: null,
               // mySwiperRecode:null ,
                ajaxSubmitAllow:false ,
            }
        },
        created:function () {
            var _self =this ;
            _self.haslogin = this.ifLogined() ;
            if( !_self.haslogin){
                // _self.$refs.autoCloseDialog.open('请先登录！') ;
                _self.$router.push('/login')  ;
            }
        },

        computed:{
            year: function(){
                return this.nowDate.getYear() + 1900;
            },
            mon: function(){
                return (this.nowDate.getMonth() + 1) < 0 ? ('0' + (this.nowDate.getMonth() + 1)) : (this.nowDate.getMonth() + 1);
            },
            day: function(){
                return this.nowDate.getDate() < 10 ? ('0' + this.nowDate.getDate()) : this.nowDate.getDate();
            },
            newpdate: function(){
                return '' + this.year + this.mon + this.day;
            },
        },
        mounted: function () {
            var _self = this ;
            $('html,body').css('overflow-y','scroll' )  ;
            _self.seadata.pdate = this.newpdate;
            _self.setMenuAction();
            _self.initView();
            _self.initDateMeun();
            document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
            var mySwiperRecode = new Swiper('#swiper1', {
                // autoplay: 5000,//可选选项，自动滑动
                onSlideChangeStart: (swiper) => {
                    var index = swiper.activeIndex
                    _self.seadata.statusType = index + 1
                    _self.seadata.page = 1
                    _self.initView()
                    $('#betting_record .recode-tab .tab_mid  li').each((i, t) => {
                        if (i === index) {
                            $(t).addClass('on')
                                .siblings()
                                .removeClass('on');
                        }
                    })
                },
            })


            // 一级标签
            /* (function () {*/
            $('#tabs > div').click((e) => {
                const $src = $(e.currentTarget);
                $src.addClass('active')
                    .siblings()
                    .removeClass('active');
                if ($src.index()) {
                    // 追号
                    $('#betting_record').hide()
                    $('#trace_record').show()
                    this.seadata.searchType = 2;
                    this.seadata.page = 1;// 页数，从1开始
                    // initZhuihao()
                } else {
                    // 投注
                    $('#betting_record').show()
                    $('#trace_record').hide()
                    this.seadata.searchType = 1;
                    this.seadata.page = 1;// 页数，从1开始
                }
                this.restr = '';// 网页html缓存
                this.initView()
            });
            /* })();*/


            // 二级标签
            /*(function () {*/
            $('.tab_mid > li').click((e) => {
                const $src = $(e.currentTarget);
                document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
                $src.addClass('on').siblings().removeClass('on');
                var dateval = $('.tab_content').find('.slide_toggle:first-child').data('val') ;
                this.seadata.pdate = dateval ;  // 切换时默认第一天
                var num = parseInt($src.index(), 10);
                switch (num) {
                    case 0:
                        _self.seadata.statusType = 1
                        if (_self.seadata.searchType === 1) {
                            mySwiperRecode.slideTo(0, 200, false);
                        } else {
                            mySwiperTrack.slideTo(0, 200, false);
                        }
                        break
                    case 1:
                        _self.seadata.statusType = 2
                        if (_self.seadata.searchType === 1) {
                            mySwiperRecode.slideTo(1, 200, false);
                        } else {
                            mySwiperTrack.slideTo(1, 200, false);
                        }
                        break
                    case 2:
                        this.seadata.statusType = 3
                        if (this.seadata.searchType === 1) {
                            mySwiperRecode.slideTo(2, 200, false);
                        } else {
                            mySwiperTrack.slideTo(2, 200, false);
                        }
                        break
                    case 3:
                        this.seadata.statusType = 4
                        if (_self.seadata.searchType === 1) {
                            mySwiperRecode.slideTo(3, 200, false);
                        } else {
                            mySwiperTrack.slideTo(3, 200, false);
                        }
                        break
                }
                _self.seadata.page = 1
                _self.initView()
            });

            // 下拉加载更多
            function soyeScroll (selector) {
                this.selector = selector;
                this.init = (cb) => {
                    var selector = this.selector;
                    var that = this;
                    var arr = selector.split(' ');
                    selector = arr.join('');
                    var doc = '';
                    if (selector.indexOf('.') === 0) {
                        selector = selector.substring(1, selector.length);
                        doc = document.getElementsByClassName(selector);
                        if (doc === null) {
                            console.error('soyeScroll errorMsg: this class is undefined!');
                            return;
                        }
                        doc = doc[doc.length - 1];
                        window.onscroll = () => {
                            var thisClientHeight = document.body.clientHeight;
                            var thisScrollHeight = document.body.scrollHeight;
                            if (thisScrollHeight - 100 <= (thisClientHeight + that.getScrollTop())) {
                                cb();
                            }
                        };
                    } else if (selector.indexOf('#') === 0) {
                        selector = selector.substring(1, selector.length);
                        doc = document.getElementById(selector);
                        if (doc === null) {
                            console.error('soyeScroll errorMsg: this id is undefined!');
                            return;
                        }
                        var thisHeight = doc.style.height;
                        var thisX = doc.getBoundingClientRect().left;
                    }
                };
                this.getScrollTop = () => {
                    var scrollTop = 0;
                    var bodyScrollTop = 0;
                    var documentScrollTop = 0;
                    if (document.body) {
                        bodyScrollTop = document.body.scrollTop;
                    }
                    if (document.documentElement) {
                        documentScrollTop = document.documentElement.scrollTop;
                    }
                    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
                    return scrollTop;
                };
            }

            this.soyeScroll = new soyeScroll('.bet_data');
            this.soyeScroll.init(() => {
                if (this.lock === 0) {
                    this.lock = 1;
                    this.restr = '';
                    this.getBetRecord(); // 投注记录
                }
            });
            
        },
        methods: {
            showMain:function () {
                if (mainView === 0) {
                    $('.body').hide();
                    $('#main').show();
                } else {
                    $('.body').hide();
                    $('#page2').show();
                    mainView = 0;
                }
                window.scrollTo(0, ding);
            },


            /**
             * 投注详情
             */
            showBetDetails:function (that, view) {
                event.stopPropagation();
                ding = document.documentElement.scrollTop
                if (view === 1) {
                    mainView = 1;
                }
                var data = $(that).data('val');

                $('.body').hide();
                $('#page1').show();
                data = JSON.parse(decodeURI(data));
                $('.periods')
                    .html(data.pcode);
                $('.bet_status')
                    .html(data.orderStatusName);
                $('.so-betTime')
                    .html(formatTime(new Date(data.betTime)));

                $('.so-orderId')
                    .html(data.orderId);
                $('.so-betAmount')
                    .html(this.fortMoney(this.roundAmt(data.betAmount), 2));

                $('.so-playName')
                    .html(data.playName);
                $('.so-betContent')
                    .html(data.betContent);
                $('.so-zhongjiang').remove()

            // 如果已经开奖
                if (data.orderStatus !== 1) {
                    data.winNumber = data.winNumber || '1,2,3,4,5';
                    var openNums = data.winNumber.split(',');
                    $('.bet_nlist ul li')
                        .each((i, t) => {
                            $(t)
                                .html(openNums[i]);
                            $(t)
                                .attr('class', 'b_lt_1 hover');
                        });
                    switch (parseInt(data.orderStatus)) {
                        case 32:
                            $('.bet_status')
                                .attr('class', 'bet_status status_green');
                            $('.bet_status')
                                .html('已中奖');
                            var html = '<li class="so-zhongjiang"><span>中奖金额</span><span class="ui_color_yellow">' + this.fortMoney(this.roundAmt(data.payoff), 2) + '</span></li>';
                            $('#page1 .print_data li:nth-child(3)').after(html);

                            break;
                        case 4:
                        case 5:
                        case 6:
                        case 71:
                        case 81:
                            $('.bet_status')
                                .attr('class', 'bet_status status_red');
                            break;
                    }
                }
            },
            getScroll:function () {
                var t, l, w, h;
                if (document.documentElement && document.documentElement.scrollTop) {
                    t = document.documentElement.scrollTop;
                    l = document.documentElement.scrollLeft;
                    w = document.documentElement.scrollWidth;
                    h = document.documentElement.scrollHeight;
                } else if (document.body) {
                    t = document.body.scrollTop;
                    l = document.body.scrollLeft;
                    w = document.body.scrollWidth;
                    h = document.body.scrollHeight;
                }
                return {t: t, l: l, w: w, h: h};
            },


            /**
             * 获取元素的绝对位置
             * @param element
             * @returns {Number|number}
             */
            getElementTop:function (element) {
                var actualTop = element.offsetTop;
                var current = element.offsetParent;
                while (current !== null) {
                    actualTop += current.offsetTop;
                    current = current.offsetParent;
                }
                return actualTop;
            },
            // 日期标签
            initDateMeun:function () {
                var _self =this ;
                $('.tab_content').on('click','.panel_title',function (e) {
                    $('.bet-recode-all').find('li').remove();
                   // var $src = $(this).parent('.slide_toggle ') ;
                    var $src = $(this).parent('.slide_toggle ') ;
                    _self.seadata.page = 1;
                    var hsac = $src.hasClass('active') ;
                    if (!hsac) { // false
                        $src.addClass('active').siblings().removeClass('active');
                        $src.find('ul').show();
                        $src.siblings().find('ul').hide();
                        _self.seadata.pdate = $src.data('val');
                        _self.getBetRecord(); // 投注记录
                        return false ;
                    } else {
                        $src.removeClass('active').find('ul').hide();
                        return false ;
                    }
                }) ;
            },

            //筛选下拉单
            setMenuAction:function () {
                $(".dropdown_icon,.btn_outline").click(() => {
                    $(".dropdown").slideToggle("fast", () => {
                    });
                    $('.so-shade').fadeToggle("fast", "linear");
                });

                var lotterychooseid ;
                $('.play_area').on('click', 'li', (e) => {
                    var $src = $(e.currentTarget);
                    $src.addClass('active').siblings().removeClass('active');
                    var val = $src.data('val');
                    lotterychooseid = val;

                });
                //确定提交
                $('.btn_submit').on('click', (e) => {
                    if(lotterychooseid || lotterychooseid == '0'){
                        this.lotteryid = lotterychooseid ;
                    }
                    this.seadata.page = 1; // 还原页码
                    $('.bet-recode-all').find('li').remove(); // 清空原来的数据
                    var $src = $(e.currentTarget);
                    var lottery_name ;
                    $('.play_area').each(function () {
                        var flag = $(this).find('li').hasClass('active') ;
                        if(flag){
                            lottery_name = $(this).find('li.active').find('a').text() ;
                        }
                    }) ;
                    $('.lottery_name').html(lottery_name + ' 投注记录'); // 彩种名称
                    this.getBetRecord();
                    $(".dropdown").slideToggle("fast", () => {
                    });
                    $('.so-shade').fadeToggle("fast", "linear");

                });
            },
            
            initView:function () {
                $('.tab_content').html('');
                this.nowDate = new Date();
                var restr = '';
                for (var i = 0; i < 3; i++) {
                    var pdate = '' + (this.nowDate.getMonth() + 1) + '月' + this.nowDate.getDate() + '日';
                    var first_li = '';
                    if (i === 0) {
                        first_li = 'first_li';
                    }
                    restr += '<li class="slide_toggle bet_day new_bet_day ' + first_li + '" data-page="1" data-val="' + (this.nowDate.getYear() + 1900).toString().padStart(4, '0') + (this.nowDate.getMonth() + 1).toString().padStart(2, '0') + this.nowDate.getDate().toString().padStart(2, '0') + '">' +
                        '<div class="panel_title"> <strong class="title-data">' + pdate + '</strong><span></span> </div>' +
                        '<ul class="panel bet-recode-all"></ul></li>';
                    this.nowDate.setDate(this.nowDate.getDate() - 1);
                }
                $('.tab_content')
                    .append(restr);
                var DateclassName = '';
                if (this.seadata.searchType === 1) {
                    DateclassName = '.tab_content_1 .slide_toggle'
                } else {
                    DateclassName = '.tab_track_1 .slide_toggle'
                }
                $(DateclassName).each((i, t) => {
                    if ($(t).attr('class')
                            .indexOf('active') < 0 && i % 3 === 0) {
                        $(t).addClass('active')
                            .siblings()
                            .removeClass('active');
                        $(t).find('ul')
                            .show();
                        $(t).siblings()
                            .find('ul')
                            .hide();
                    }
                });
                this.getBetRecord();
               // this.initDateMeun();
            },
            getBetRecord:function () {
                var _self = this ;
                if(_self.ajaxSubmitAllow){ // 解决重复提交问题
                    return false ;
                }
                $('.so-zzjz').remove()
                $('.bet-recode-all')
                    .append('<li style="margin: auto;text-align: center;height: 2rem;display: block;line-height: 2rem;" class="so-zzjz">正在加载...</li>');
                _self.seadata.lotteryId = _self.lotteryid , // 彩种ID
                    _self.ajaxSubmitAllow = true ;
                $.ajax({
                    type: 'post',
                    headers: {
                        "Authorization": "bearer  " + _self.getAccessToken,
                        // 'Authorization': 'bearer ' + access_token,
                    },
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8', // json格式传给后端
                    url: _self.action.forseti + 'api/orders/orderList',
                    data: JSON.stringify(_self.seadata), // json格式
                    success: (res) => {
                        if(res.err =='SUCCESS'){
                            _self.ajaxSubmitAllow = false ;
                            if(_self.lastlotteryid != _self.lotteryid){ // 是否切换，切换需要重置
                                $('.bet-recode-all').html('') ;
                            }
                            $('.so-zzjz').remove();
                            const dataList = res.data.rows;
                            if (dataList.length === 0) {
                                var appstr = '<li style="margin: auto;text-align: center;height: 2rem;display: block;line-height: 2rem;" class="so-zzjz">没有数据了</li>' ;
                                $('.bet-recode-all').append(appstr);
                            } else {
                                _self.lock = 0;
                            }
                            $('.new_bet_day').each((i, t) => {
                                _self.touzhuXQ = dataList;
                                $.each(dataList,  (j, v) => {
                                    if ($(t).data('val') === v.pdate) {
                                        var jsonStr = '';
                                        var li_html = '';
                                        // var pcode = ('' + v.pcode).substring(8, 11);
                                        var pname = v.playName.substring(0, 2) ; // 筛选连码

                                        if(v.lotteryId =='8'){  // 北京pk10
                                            var pcode = ('' + v.issueAlias).substring(0, 11);
                                        }else{
                                            var pcode = ('' + v.pcode).substring(0, 11);
                                        }
                                        var className = 'status00';
                                        var payoff = ''
                                        switch (parseInt(v.orderStatus)) {
                                            case 32: // 已中奖
                                                className = 'status02';
                                                payoff = _self.fortMoney(_self.roundAmt(v.payoff), 2) + '元'
                                                break;
                                            case 4: // 用户撤单
                                            case 5:  // 系统撤单
                                            case 6:  // 中奖停追
                                            case 71: // 存在异常
                                            case 81: // 异常注单
                                                className = 'status04';
                                                break;
                                            case 33: // 和局
                                                className = 'status00';
                                                break;
                                        }
                                        if (_self.seadata.searchType === 1) {
                                            li_html = '<li class="bet_data" data-status="not_open" >' +
                                                '<a href="javascript:;"  data-val="' + encodeURI(JSON.stringify(v)) + '">' +  // 暂时不显示详情 onclick="showBetDetails(this,0)"
                                                '<div class="prd_num"><span>' + pcode + '</span>期</div>' +
                                                '<div class="item"> ' +
                                                '<div class="badge ssc_badge lottery_logo_' + v.lotteryId + '"></div>' +
                                                '<div class="lottery_t ssc">' +
                                                // '<p>' + v.lotteryName + ' - <span>' + v.playName + '</span></p> <strong>' + this.fortMoney(this.roundAmt(v.betAmount), 2) + '</strong> </div>' +
                                                '<p>'+ v.orderId +'</p>'+
                                                '<p>' ;
                                            if(pname =='连码'){
                                                li_html += '<span>' + v.playName + '-'+v.betContent+'</span>' ;
                                            }else{
                                                li_html += '<span>' + v.playName + '</span>' ;
                                            }
                                            li_html +=  '</p> <strong>' + _self.fortMoney(_self.roundAmt(v.betAmount), 2) + '</strong> </div>' +
                                                '<div class="status ' + className + '" >' +
                                                '<span>' + v.orderStatusName + '</span><div>' + payoff + '</div></div>' +
                                                '</div>' +
                                                '</a></li>';
                                            // '<span>' + v.orderStatusName + '</span><div>' + v.pcode + '期</div></div></a></li>';
                                        }
                                        $(t).find('ul')
                                            .append(li_html);
                                    }
                                });
                            });
                            _self.lastlotteryid = _self.lotteryid ;
                            _self.seadata.page++;
                        }

                    },
                    error: () => {
                        _self.ajaxSubmitAllow = false ;
                        // error
                    },
                });
            }



        },

    }
</script>

<style>
    .swiper-container {
            height: 100%;
        }
</style>

