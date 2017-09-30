;(function(win){
            var doc = win.document;
            var docEl = doc.documentElement;
            var tid,rem,initialFontSize = 24,initialWidth = 640;
            refreshRem();
            win.addEventListener('resize', function() {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
                // fnCheckMobile();
            }, false);

            win.addEventListener('pageshow',function(e){
                if(e.persisted){
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, 300);
                    // fnCheckMobile();
                }
            }, false);

            function refreshRem(){
                var width = docEl.getBoundingClientRect().width,
                    height = docEl.getBoundingClientRect().height;
                var orientation = width>height?"landscape":"portrait";
                if(orientation === "landscape"){
                    rem = height*initialFontSize/initialWidth;
                }else{
                    if(width > 540)width = 540;
                    rem = width*initialFontSize/initialWidth;
                }
                if( rem > 14){
                    docEl.style.fontSize = Math.floor(rem) + 'px';
                }
            }

})(window);

var LOTTERY_URL_INFO = {
    'lot_28':'/lottery/xg1d5fc',
    'lot_27':'/lottery/rd2fc',
    'lot_26':'/lottery/rd1fc',
    'lot_25':'/lottery/jssm',
    'lot_24':'/lottery/pk10',
    'lot_23':'/mmc/lottery/mmc',
    'lot_20':'/lottery/xglhc',
    'lot_19':'/lottery/hn1fc',
    'lot_15':'/lottery/jsk3',
    'lot_14':'/lottery/hn5fc',
    'lot_13':'/lottery/tjssc',
    'lot_12':'/lottery/pl3',
    'lot_11':'/lottery/3dfc',
    'lot_9':'/lottery/bjkl8',
    'lot_8':'/lottery/gd11x5',
    'lot_7':'/lottery/jx11x5',
    'lot_6':'/lottery/xjssc',
    'lot_5':'/lottery/sd11x5',
    'lot_1':'/lottery/cqssc'
    };
// 报表地址列表
var PAGTITLE_LISTS = {
"controller=user&action=team":"团队余额",
"controller=gameinfo&action=chargemention":"账变报表",
"controller=gameinfo&action=ptgamelist":"PT盈亏",
"controller=gameinfo&action=ptbets":"PT投注记录",
"controller=gameinfo&action=ptgroupdaily":"PT日结",
"controller=gameinfo&action=bbingamelist":"BBIN盈亏",
"controller=gameinfo&action=bbinbets":"BBIN投注记录",
"controller=gameinfo&action=bbingroupdaily":"BBIN日结",
"controller=gameinfo&action=profitlosslottery":"彩票盈亏",
"controller=gameinfo&action=lotteryaccountchanged":"彩票账变",
"controller=gameinfo&action=historyteamlottery":"历史盈亏",
"controller=gameinfo&action=newgamelist":"彩票投注",
"controller=gameinfo&action=teamhistoryall":"团队日结",
"controller=gameinfo&action=itembankreport":"充提记录",
"controller=user&action=list":"用户列表",
"controller=user&action=team":"我的团队",
"controller=user&action=distribute":"开户管理",
"controller=user&action=adduser":"增加用户",
"controller=report&action=checkbalance":"余额查询",
"controller=report&action=userpoint":"返点总额",
"controller=report&action=fundreport":"转账报表",
"controller=report&action=selfbankreport":"账变报表",
"controller=report&action=ptprofitlossbyself":"PT盈亏",
"controller=report&action=ptpersonalbets":"PT投注",
"controller=report&action=ptdaily":"PT日结",
"controller=report&action=bbindaily":"BBIN日结",
"controller=report&action=bbinpersonalbets":"BBIN投注",
"controller=report&action=bbinprofitlossbyself":"BBIN盈亏",
"controller=report&action=bankreport":"充提记录",
"controller=report&action=profitlosslotterybyself":"彩票盈亏",
"controller=report&action=selforders":"彩票账变",
"controller=report&action=traceinfo":"追号记录",
"controller=gameinfo&action=gamelistbyself":"彩票投注",
"controller=report&action=historylist":"彩票日结",
"controller=report&action=historypersonreport":"日结总览",
"controller=report&action=historylist":"历史报表查询",
"controller=user&action=bindsequestion":"密保设定",
"controller=user&action=changeloginpass":"密码修改",
"controller=user&action=messages":"消息管理",
"controller=user&action=changename":"完善资料",
"controller=user&action=userbankinfo":"绑定卡号",
"controller=user&action=userset":"彩种信息",
"controller=user&action=adduser":"注册管理",
"controller=user&action=list":"用户列表",
"controller=user&action=marketing":"推广设定",
"controller=user&action=marketinglink":"链接管理",
"controller=user&action=marketeraccess":"域名列表",
"controller=help&action=noticelist":"系统公告"
}
// 导航列表  新增彩种需要在这里添加地址
var MENU_LISTS ={
    "nav=24xsc&flaglot=hnquick5":"河内五分彩",
    "nav=ffc&flaglot=cq_ffc":"河内一分彩",
    "nav=ssc&flaglot=cq_ssc":"重庆时时彩",
    "nav=tjssc&flaglot=tj_ssc":"天津时时彩",
    "nav=k3&curmid=2396&flaglot=jsk3":"江苏快三",
    "nav=pk10&flaglot=pk10":"北京PK10",
    "nav=jssm&flaglot=jssm#cg":"急速赛马",
    "nav=11y&flaglot=gd_11x5":"广东11选5",
    "nav=11y&curmid=256&flaglot=jx_11x5":"江西11选5",
    "nav=11y&curmid=174&flaglot=sd_11x5":"山东11选5",
    "nav=lhc&flaglot=xglhc":"香港六合彩",
    "nav=dipin&flaglot=3dfc":"3D福彩",
    "nav=dipin&curmid=615&flaglot=pl3":"排列三",
    "nav=klc&flaglot=bjkl8":"北京快乐8",
    "nav=rd1ffc&flaglot=rd1_ffc":"瑞典一分彩",
    "nav=rd2ffc&flaglot=rd2_ffc":"瑞典二分彩"
}
// 报表详情页 title
function PAGTITLE_LISTS_URL() {
    var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            var on_strs = strs[0]+'&'+strs[1];
            theRequest =on_strs;
        }
    return theRequest;
}
function GetVal(ab){
    var key = ab;
    if(PAGTITLE_LISTS[key] !=undefined){
          $("#user_logo_btn").html(PAGTITLE_LISTS[key])
    }
    if(key == "controller=help&action=noticelist"){
        $("#user_back_home").html('返回大厅').attr("href","/index.php")
    }
}

var Request2 = new Object();
Request2 = PAGTITLE_LISTS_URL();
//优惠活动 返回
if(Request2 == 'controller=help&action=noticelist'){
  $("#m-ueser-return").attr("href","#")  
}
GetVal(Request2);

//  查看投注记录 后退到对应的页面
function PAGTITLE_LISTS_URL2(url) {
    //var url = document.referrer; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(url.indexOf("?")+1);
            theRequest =str;
        }
    return theRequest;
}

$('.m_see_more').click(function(){
    var new_url = window.location.href
    setCookie("touzhu",new_url)
})
 // iframe 弹窗 控制变量
function GetVal2(ab){
    var key = ab;
       //更换地址后 返回投注
    var  _betUrl= document.referrer.split('/');
    if(_betUrl[3] == 'lottery' || _betUrl[3] == 'mmc'){
        $("#user_back_home").text("返回投注")
        $("#user_back_home").attr("href",getCookie("touzhu"))
    }


    if(MENU_LISTS[key] !=undefined){
        var up_url = document.referrer; //获取url中"?"符后的字串
        setCookie("touzhu",up_url)
        $("#user_back_home").text("返回投注")
    }
/*    if(key == "controller=user&action=usercenter"){
        var up_url = document.referrer; //获取url中"?"符后的字串
        setCookie("touzhu",up_url)
    }*/

    if(Request2 == 'controller=gameinfo&action=gamelistbyself'){
    	var ckUrl = PAGTITLE_LISTS_URL2(getCookie("touzhu"));
        $("#user_back_home").attr("href",getCookie("touzhu"))
        if(ckUrl == "nav=mmc&flaglot=xc_mmc" ){
             $("#user_back_home").text("返回投注")
        }
       /* if(ckUrl == "controller=user&action=usercenter" ){
             $("#user_back_home").text("用户中心")
        }*/

    }

    if(Request2 == 'controller=gameinfo&action=newgamedetail'){
        $(".yhlb_back2").show()
    }else{
        $(".yhlb_back2").hide()
    }
}
var Request3 = new Object();
Request3 = PAGTITLE_LISTS_URL2(document.referrer);
GetVal2(Request3)
// 弹窗 iframe
$(function(){
    $("#m_dd_more").live('click',function(){
        var _this = $(this);
        var aa = $(this).attr('data');
        var if_html = '<iframe id="my_dd_iframe" scrolling="no" src="'+aa+'"></iframe>'
        layer.open({
            className:'popou-dd-list',
            content:if_html,
            anim:'up',
            btn:'',
            style: 'position:fixed; left:0; top:0; width:100%; height:90%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;-webkit-overflow-scrolling:touch;'
        });
       $("#my_dd_iframe").load(function(){
            $("#my_dd_iframe").contents().find("header, .height_top_3rem").css("display","none");
            if(_this.parent(".msgCheck")){
                _this.siblings("em").addClass("Check").text("已查看");
            }
       })
    });
});
// 报表详情页 title
    document.addEventListener("DOMContentLoaded", function(){
        (function(){
            var _btn  = document.querySelector(".btn-slide-bar"),
                _body = document.querySelector("#body");
                _tbody = document.querySelector(".shady")
                var b = 1;
                _btn.onclick = function(){
                    b = 2;
                    var docH = $(window).height();
                    var navH = $(".header").height();
                    var centH = docH;
                    $(".wraper-page").height(centH);
                    $(".wraper-page").css('overflow','hidden');
                    $(".home_b").css('display','block');
                    $(".slide-bar").css('display','block');
                    _body.classList.toggle("active");
                    $(".shady").fadeIn();

                    $("body").css('overflow','hidden');
                }
                _tbody.onclick = function(){
                    if(b==2){
                        b=1;
                        $(".wraper-page").css({'overflow':'visible','height':''});
                        _body.classList.toggle("active");
                        
                        $(".shady").fadeOut(300,function(){
                            $(".slide-bar").css('display','none');
                            $(".home_b").css('display','none');
                             $("body").css('overflow','visible')
                        });
                    }
                }
        })(window)
    },false);

//添加投注跳到下面
// $(window).scroll(function(){
//     if($(window).scrollTop()>150){
//         $('.m_f_top').fadeIn(0)
//     }else{
//         $('.m_f_top').fadeOut(0)
//     }
// })
$('.m_f_top').click(function(){
    $('body').animate({scrollTop:0},300);
});
//菜单折叠 
    $(function(){
        var h3 = $(".tree_box").find("h3");
        var tree_one = $(".tree_box").find(".tree_one");
        var h4 = $(".tree_one").find("h4");
        var tree_two = $(".tree_one").find(".tree_two");
            h3.each(function(i){
                $(this).click(function(){
                    tree_one.eq(i).slideToggle(100,function(){
                    });
                    $(this).children("i").toggleClass("lnstruction-up");
                    tree_one.eq(i).parent().siblings().find(".tree_one").slideUp(100);
                })
            })
            h4.each(function(i){
                $(this).click(function(){
                    tree_two.eq(i).slideToggle(200,function(){
                    });
                    tree_two.eq(i).parent().siblings().find(".tree_two").slideUp();
                })
            })
    });
    //计算盒子高度 
//返回上一页
//隐藏金额
        (function(){
            var $refresh = $(".ic-refresh"),$showMoney = $(".show-money"),$hideMoney = $(".hide-money");
                $hide = $(".ic-unlook");
            var cvis = getCookie("hide");
            if(cvis === "true"){
                $showMoney.hide();
                $hideMoney.show();
                $refresh.css("display","none");
                $hide.addClass("hide");
                $hide.attr("title","显示余额");
            }else{
                $refresh.css("display","inline-block");
                $hide.attr("title","隐藏余额");
                $showMoney.show();
                $hideMoney.hide();
            }
            $hide.on("click",function(){ 
                var vis = $showMoney.css("display");
                if(vis == "none"){
                    setCookie("hide","false");
                    $showMoney.show();
                    $hideMoney.hide();
                    $refresh.css("display","inline-block");
                    $hide.removeClass("hide");
                    $hide.attr("title","隐藏余额");        
                }else{
                    setCookie("hide","true");
                    $showMoney.hide();
                    $hideMoney.show();  
                    $refresh.css("display","none");
                    $hide.addClass("hide");
                    $hide.attr("title","显示余额");
                }
            });
            var pormpt = getCookie("sex")
            if(pormpt == "true"){
                $(".m-prompt").hide(0);
            }else{
               $(".m-prompt").show(0);
            }
            $(".m-prompt a").on("click",function(){
                setCookie("sex","true");
                $(".m-prompt").hide();
            })
        })();
        //用户名长度限制
        (function(){
            var $uname = $(".username");
            var name = $uname.text().replace(/\s/g,"")
                ,len = name.length;
            if(len >8){
                name = name.substr(0,8)+"...";
                $uname.text(name);
            }
        })();
        //首页信息弹窗  暂时不写在这里 写在首页
        // loadNotice();
        // function loadNotice(){
        //     getNotice('./?controller=help&action=noticelist&pageSize=6&is_alert=1&first=1');
        //     }
        //     function getNotice(url){
        //     $.getJSON(url,function(res){
        //         if (res.isRead == false) {
        //             //?controller=help&action=notice&nid='+res.notice.id;
        //             $(".notice").layer({height:"567","subUrl":"?controller=help&action=noticelist&nid="+res.notice.id,"scale":false});
        //         };
        //     })
        // }
//谷歌统计
  (function() { 
    var _gaq = _gaq || []; 
    _gaq.push(['_setAccount', 'UA-34470891-1']); 
    _gaq.push(['_setCustomVar',1,'version','3.0',1]);
    _gaq.push(['_trackPageview']); 
    var ga = document.createElement('script'); 
    ga.type = 'text/javascript'; 
    ga.async = true; 
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; 
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); 
  })(); 
  //谷歌统计

// 新彩种未上线调用弹层

	function comingsoon(){
		layer.open({
			content:'即将上线，敬请期待',
			btn:['确定']

		})
	}
//倒序  彩票走势图 倒序
(function($) {
    $.extend({
        reverseChild : function(obj, child) { 
            var childObj = $(obj).find(child);
            var total = childObj.length; 
            // console.debug(childObj);
            childObj.each(function(i) {
                // console.debug(childObj.eq((total-1)-i));
                $(obj).append(childObj.eq((total-1)-i)); 
                
            }); 

            //console.log(childObj.html()); 
        }
    });
})(jQuery);
//开奖历史显示多少条数
function maskList() {
    $.reverseChild("#chartsTable", 'tr');
    $.reverseChild("#codeTable", 'tr');
    $("#codeTable").show();
    $("#chartsTable").show();
}
$(function() { 
    maskList();
}());
$(function(){
    var  tr_length = $("tbody tr").length;
    $(".secondary_tabs li").eq(0).addClass("hover");
    for (var i = 0; i <= tr_length-1; i++) {
        if(i<30){
                $("#chartsTable tr").eq(i).show();
            }else{
                $("#chartsTable tr").eq(i).hide()
        }
    }
    $(".secondary_tabs li").click(function(){
        var num_data = $(this).attr("data"); 
        $(this).addClass("hover").siblings().removeClass("hover");
        for (var i = 0; i <= tr_length-1; i++) {
            if(i<num_data){
                $("#chartsTable tr").eq(i).show();
            }else{
                $("#chartsTable tr").eq(i).hide()
            }
        };
    });
}())
$(function(){
    //切换近期开奖
      $('#m_recen_v').click(function(e){
        var e = window.event || arguments.callee.caller.arguments[0];
          $('#m_vi_recLott').toggle();
          $(document).on('click',function(){
            $('#m_vi_recLott').hide();
          });
          e.stopPropagation();

  });
//   $('#m_vi_recLott').on('click',function(e){
//     e.stopPropagation();
//   });

    $(".m_jqkj_close").click(function(){
        $('#m_vi_recLott').hide();
    });
}())
$(function(){
     //后退 back
      $('.m-return , .m-ueser-return').click(function(){
        var backUrl = document.referrer;
        document.location.href = backUrl;
    });

});

function laye_close(){  //关闭弹窗
    layer.closeAll();
}         
   
    var url = location.search; //获取url中"?"符后的字串
// 充值界面的 后退判断
    function GetRequest_C() {
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
    $(function(){
          var RequestUrl = new Object();
          RequestUrl= GetRequest_C();
         //后退 back
          var backUrl = document.referrer;
          // 点击设置COOKI
          $(".withraw").click(function(){
            setCookie("tx_url","/index.php")
          })
       /*   $(".m_user_tixian").click(function(){
            setCookie("tx_url","/?controller=user&action=usercenter")
          })*/
          $('.m-chongzi-return').click(function(){

          if(RequestUrl.action=='main' && RequestUrl.controller =='emaildeposit'){
            document.location.href = getCookie("url");
          }else{
            var backUrl = document.referrer;
            // document.location.href = backUrl;
             history.back();
          }
           if(RequestUrl.action=='platwithdraw' && RequestUrl.controller =='security'){
                    document.location.href = getCookie("tx_url");
            }
        });

    })
// 近期开奖关闭按钮
// 移动端从后台切换过来 从新刷新页面
var lastTime = +new Date;
setInterval(function(){
    if(Math.abs(+new Date - lastTime)>1000*60){
        window.location.reload();
    }
    lastTime = + new Date;
},1000)  
// 报表页 页码

$(function(){
    $(".pageinfo").addClass('page');
    $(".paging").addClass('page');
    var page_html =  $(".list_page #tPages").html();
    // if(page_html !=null){
        var page_length  =  $(".page strong").length;
        var pageifo_length = $(".page a").length;
        $(".list_page .page").html(page_html);
        $(".list_page .pageinfo").html(page_html);
        if(pageifo_length+page_length == 1 ){
            $(".page").hide();
            $(".page").hide();
        }
    // }
    $(".list_page .user_page_text").hide();
    var pading_leng = $(".paging a");
    if(pading_leng.length>0){
     $(".paging").contents()[0].remove()
    }
    if(pading_leng.length == 1){
        $(".paging").hide();
    }


// 链接管理复制
    $("#copy_btn").live("click",function(){
        var list_url = $(this).siblings(".link-txt").find("em").html();
        layer.open({
            content:"<p>长按链接选择拷贝</p>" + '<a class="link_id" href="'+list_url+'">'+ list_url +'</a>',
            btn:"确定"
        });
        $(".link_id").live("click",function(event){
            event.preventDefault();
            return false;
        })
    })
});
// 查看投注记录
//消息多余99 条显示 99条
$(function(){
    var text = $(".ui_msgnum").text();
    if(text > 99){
         $(".ui_msgnum").text('99');
    }
})

$(function(){
    var isPnChecked = getCookie('hidePN');
    if(isPnChecked == 'true'){
        $('.prize-notification span').removeClass().addClass("uncheck");
    }else{
        $('.prize-notification span').removeClass().addClass("check");
    }
    $('.prize-winning .close-btn').click(function(){
        $('.prize-winning').fadeOut();
    });
    $('.non-notification').click(function(){
        setCookie('hidePN',true);
    });
    $('.pw-checkbox label').click(function(){
        $('.non-notification').trigger('click');
    });

    $('.push-prize .close').click(function(){
        $('.push-prize').fadeOut();
        setCookie('hidePml',true);
    });

    $('.prize-notification span').click(function(){
        var $this = $(this);
        if($this.hasClass('uncheck')){
            $this.removeClass().addClass("check");
            setCookie('hidePN',false);
        }else{
            $this.removeClass().addClass("uncheck");
            setCookie('hidePN',true);
        }
    });
    $('.prize-notification b').click(function(){
        $('.prize-notification span').trigger('click');
    });
});

//判断是否为手机APP,并修改样式
var isphoneGap = function(isPhoneGap){ };
var isPhoneCookie = getCookie("isPhoneGap");
$(function(){ 
	if(isPhoneCookie){
		$('body').css('overflow','visible');
		$('.swiper-container, .conpt_icon, .noActivity').css('display','none');
	}
	$('.rewards').click(function(){ 
		var url = $(this).attr('url');
		if(isPhoneCookie){
        	plus.runtime.openURL(url);
		}
   		else{ 
        	window.open(url);
   		}
	})
})
