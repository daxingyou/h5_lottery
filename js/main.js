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
	'lot_1':'/lottery/cqssc',
	'lot_101':'/lottery/cqxy28',
	'lot_106':'/lottery/xjxy28'
	};
/* 全局变量定义 */
var access_token =" ";
var action = {
    forseti: 'http://192.168.0.225:8088/forseti/' ,
    uaa: 'http://192.168.0.225:8088/uaa/',
}

/*
*获取地址栏参数
*/
function getUrlPar(strName) {
    var svalue = location.search.match(new RegExp("[\?\&]" + strName + "=([^\&]*)(\&?)", "i"));
    return svalue ? svalue[1] : svalue;
}
//退出提示
function loginout(){
    $.confirm('确定要退出吗？',function (data){
        if(typeof data){
        	var isclient = !!getCookie("isclient") && getCookie("kernel") == 2,
        	    isChrome = getCookie('ischrome'),
        		cUrl = location.href;
        	if(isclient){
    				if(cUrl.indexOf("#") === -1){
    					document.location = cUrl+"#airActions=out&out";
    				}else{
    					document.location = cUrl+"airActions=out&out";
    				}
    				setTimeout(function(){
    					document.location.hash = "";
    				},500);
  			}else{
          		airActionwie('out','out');
  			}
  			setCookie('hidePN',false);
  			setCookie('hidePml',false);
  			setCookie('downShow','show');
  			setCookie('lastChatId','xxm');

  			if(isChrome == '1'){
				cefonwebmsg(JSON.stringify({type:'signOut'}));
			}	
			if(cUrl.indexOf('chat') > -1){
                $.get('/chat?action=setonlinestatus',{status:0},function(data,jqXHR){
					data = $.parseJSON(data);
					if(data.status == 'ok'){
                        window.location.href='/user/logout';
					}
				});   	
			}else{
				if(Intercom.supported){
					var intercom = new Intercom();
  					intercom.emit('closepop',{message:'all'});
				}
                window.location.href='/user/logout';
			}
        }
    })
}
function wie(namesg){
// alert(namesg)
}
//用户名验证(由0-9,a-z,A-Z组成的6~16个字符组成)增加连续性四位字母检测、排除数字其他johnsonle
function validateUserName( str ) {
    var partern = /(.)\1{3,}/;
    if( partern.exec(str)){
        return false;
    }
	var patrn = /^[0-9a-zA-Z]{6,16}$/;
    if( patrn.exec(str) ){
		return true;
	} else {
		return false;
	}
}
//消息修改
function messageTip(){
    var $objmsg=$("#userMessage span");
    var num=parseInt($objmsg.html())<=0?0:parseInt($objmsg.html())-1;
    $objmsg.html(num);
}
function setCookie(name,value,expire,path) {
	var curdate=new Date();
	var cookie=name+"="+encodeURIComponent(value)+"; ";
	if(expire!=undefined||expire==0){
		if(expire==-1){
			expire=366*86400*1000;//保存一年
		}else{
			expire=parseInt(expire);
		}
		curdate.setTime(curdate.getTime()+expire);
		cookie+="expires="+curdate.toUTCString()+"; ";
	}
	path = path || "/";
	cookie += "path=" + path;
	document.cookie=cookie;
}

function getCookie(name) {
    var re = "(?:; )?" + encodeURIComponent(name) + "=([^;]*);?";
    re = new RegExp(re);
    if (re.test(document.cookie)) {
        return decodeURIComponent(RegExp.$1);
    }
    return '';
}

function chagetheme(){
	setCookie('skins','sincai');
}

//密码验证(6－16位数字和字母，不能只是数字，或者只是字母，不能连续三位相同)
function validateUserPss(str) {
	var patrn = /^[0-9a-zA-Z]{6,16}$/;
	if( !patrn.exec(str) ) {
		return false;
	}
	patrn = /^\d+$/;
	if( patrn.exec(str) ) {
		return false;
	}
	patrn = /^[a-zA-Z]+$/;
	if( patrn.exec(str) ) {
		return false;
	}
	patrn = /(.)\1{2,}/;
	if( patrn.exec(str) ) {
		return false;
	}
	return true;
}

//日期输入验证
// str : 要验证的日期字符串[格式包括 Y-M-D|Y/M/D|YMD [H[:I][:S]]]
function validateInputDate(str) {
	str = $.trim(str);
	if( str == "" || str == null ) {
		return true;
	}
	var tempArr = str.split(" ");
	var dateArr = new Array();
	var timeArr = new Array();
	if( tempArr[0].indexOf("-") != -1 ) {
	    //2009-06-12
		dateArr = tempArr[0].split("-");
	} else if( tempArr[0].indexOf("/") != -1 ) {
	    //2009/06/12
		dateArr = tempArr[0].split("/");
	} else {
	    // 20090612
		if( tempArr[0].toString().length < 8 ) {
			return false;
		}
		dateArr[0] = tempArr[0].substring(0,4);
		dateArr[1] = tempArr[0].substring(4,6);
		dateArr[2] = tempArr[0].substring(6,8);
	}

	if( tempArr[1] == undefined || tempArr[1] == null ){
		tempArr[1] = "00:00:00";
	}

    if( tempArr[1].indexOf(":") != -1 ) {
		timeArr = tempArr[1].split(":");
	}

    if( dateArr[2] != undefined && ( dateArr[0] == "" || dateArr[1] == "" ) ) {
		return false;
	}

    if( dateArr[1] != undefined && dateArr[0] == "" ) {
		return false;
	}

	if( timeArr[2] != undefined && ( timeArr[0] == "" || timeArr[1] == "" ) ) {
		return false;
	}

    if( timeArr[1] != undefined && timeArr[0] == "" ) {
		return false;
	}
	dateArr[0]  = (dateArr[0]==undefined || dateArr[0] == "") ? 1970 : dateArr[0];
	dateArr[1]  = (dateArr[1]==undefined || dateArr[1] == "") ? 0 : (dateArr[1]-1);
	dateArr[2]  = (dateArr[2]==undefined || dateArr[2] == "") ? 0 : dateArr[2];
	timeArr[0]  = (timeArr[0]==undefined || timeArr[0] == "") ? 0 : timeArr[0];
	timeArr[1]  = (timeArr[1]==undefined || timeArr[1] == "") ? 0 : timeArr[1];
	timeArr[2]  = (timeArr[2]==undefined || timeArr[2] == "") ? 0 : timeArr[2];
	var newDate = new Date(dateArr[0],dateArr[1],dateArr[2],timeArr[0],timeArr[1],timeArr[2]);
	if(
	   newDate.getFullYear()==dateArr[0] && newDate.getMonth()==dateArr[1] && newDate.getDate()==dateArr[2]
	   && newDate.getHours()==timeArr[0] && newDate.getMinutes()==timeArr[1] && newDate.getSeconds()==timeArr[2]
	) {
		return true;
	} else {
		return false;
	}
	return true;
}

function srip2tInit() {

	if(sriptSetInterval1) clearInterval(sriptSetInterval1);

	$("#newsList li:odd").addClass("odd"); // 奇
    $("#newsList li:even").addClass("even"); // 偶

    $(".formTable tr:odd").addClass("odd"); // 奇
    $(".formTable tr:even").addClass("even"); // 偶

    $(".grayTable tr th:first-child").css("borderLeft","1px solid #D5D8DE");
    $(".grayTable tr td:first-child").css("borderLeft","1px solid #EFEFEF");
    $(".grayTable tr td:last-child").css("borderRight","1px solid #EFEFEF");

	$("#checkAll").click(function(){
		if(this.checked) $('input[type=checkbox][name=items]').attr("checked", true );
		else $('input[type=checkbox][name=items]').attr("checked", false );
	});
	var tyAll = false;
    $("#tyAll1").click(function(){
        $('input[type=checkbox][name=tyAll]').attr("checked", true );
		var value = $("#tyText1").val();
        $('input[type=text][name=tyText1]').val(value);
		tyAll = true;
	});
    $("#tyAll2").click(function(){
        $('input[type=checkbox][name=tyAll]').attr("checked", true );
		var value = $("#tyText2").val();
        $('input[type=text][name=tyText2]').val(value);
		tyAll = true;
	});
    $("#tyText1").keyup(function () {
		if(tyAll) {
			var value = $(this).val();
            $('input[type=text][name=tyText1]').val(value);
		}

    }).keyup();
    $("#tyText2").keyup(function () {
		if(tyAll) {
			var value = $(this).val();
            $('input[type=text][name=tyText2]').val(value);
		}
    }).keyup();

    $("#setDetail").click(function(){
		var allbacksetHeight = parseInt($("#allbackset").css("height"))
		if(allbacksetHeight==0) {
            $(this).val("收起详细");
            $('#allbackset').animate({height: '430px'}, 500, function() {});
		}
		else  {
            $(this).val("详细设置");
            $('#allbackset').animate({height: '0px'}, 500, function() {});
		}
	});

    $("#starttime").dynDateTime({
		ifFormat: "%Y-%m-%d %H:%M:00",
		daFormat: "%l;%M %p, %e %m,  %Y",
		align: "Br",
		electric: true,
		singleClick: false,
		button: ".next()", //next sibling
		onUpdate:function(){
			$("#starttime").change();
		},
		showOthers: true,
		weekNumbers: true,
		showsTime: true
	});
    $("#starttime").change(function(){
		if(! validateInputDate($("#starttime").val()) )
		{
            $("#starttime").val('');
            $.alert("时间格式不正确,正确的格式为:2009-06-10 10:59");
		}
		if($("#endtime").val()!="")
		{
			if($("#starttime").val()>$("#endtime").val())
			{
                $("#starttime").val("");
                $.alert("输入的时间不符合逻辑");
			}
		}
	});
    $("#endtime").dynDateTime({
		ifFormat: "%Y-%m-%d %H:%M:00",
		daFormat: "%l;%M %p, %e %m,  %Y",
		align: "Br",
		electric: true,
		singleClick: false,
		button: ".next()", //next sibling
		onUpdate:function(){
            $("#endtime").change();
		},
		showOthers: true,
		weekNumbers: true,
		showsTime: true
	});
    $("#endtime").change(function(){
		if(! validateInputDate($("#endtime").val()) )
		{
            $("#endtime").val('');
            $.alert("时间格式不正确,正确的格式为:2009-06-10 10:59");
		}
		if($("#starttime").val()!="")
		{
			if($("#starttime").val()>$("#endtime").val())
			{
                $("#endtime").val("");
                $.alert("输入的时间不符合逻辑");
			}
		}
	});
}


//密码验证(6－16位数字和字母，不能只是数字，或者只是字母，不能连续三位相同)
function validateUserPss( str ) {
	var patrn = /^[0-9a-zA-Z]{6,16}$/g;
	if( !patrn.exec(str) ) {
		return false;
	}
	patrn = /^\d+$/g;
	if( patrn.exec(str) ) {
		return false;
	}
	patrn = /^[a-zA-Z]+$/g;
	if( patrn.exec(str) ) {
		return false;
	}

	return true;
}
function changeAddress(obj,trl) {
	if(trl=='emaildeposit'){
		if(obj=='icbcChongzhi'){
            $("#siderbar li:nth-child(1)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 充值提现 <span class="st"> > </span> 工行充值');
		}else if(obj=='abcChongzhi'){
            $("#siderbar li:nth-child(2)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 充值提现 <span class="st"> > </span> 农行充值');
		}else if(obj=='ccbChongzhi'){
            $("#siderbar li:nth-child(3)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 充值提现 <span class="st"> > </span> 建行充值');
		}else if(obj=='tenpaychongzhi'){
            $("#siderbar li:nth-child(4)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 充值提现 <span class="st"> > </span> 财付通充值');
		}else if(obj=='platwithdraw'){
            $("#siderbar li:nth-child(5)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 充值提现 <span class="st"> > </span> 我要提现');
		}
	}
	else if(trl=='userCenter'){
		if(obj=='userset'){
            $("#siderbar li:nth-child(1)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 频道设定');
		}else if(obj=='changeloginpass'){
            $("#siderbar li:nth-child(2)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 修改密码');
		}else if(obj=='changename'){
            $("#siderbar li:nth-child(3)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 修改昵称');
		}else if(obj=='emailbind'){
            $("#siderbar li:nth-child(4)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 邮箱绑定');
		}else if(obj=='userbankinfo'){
            $("#siderbar li:nth-child(5)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 卡号绑定');
		}else if(obj=='myEmails'){
            $("#siderbar li:nth-child(6)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 我的消息');
		}else if(obj=='userlist'){
            $("#siderbar li:nth-child(7)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表');
		}else if(obj=='userlist_yhxx'){
            $("#siderbar li:nth-child(7)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 用户信息');
		}else if(obj=='userlist_td'){
            $("#siderbar li:nth-child(7)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 团队');
		}else if(obj=='userlist_cz'){
            $("#siderbar li:nth-child(7)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 彩种设置');
		}else if(obj=='userlist_yxzb'){
            $("#siderbar li:nth-child(7)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 游戏账变');
		}else if(obj=='userlist_czjl'){
            $("#siderbar li:nth-child(7)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 充值记录');
		}else if(obj=='userlist_dj'){
            $("#siderbar li:nth-child(7)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 冻结');
		}else if(obj=='userlist_cz'){
            $("#siderbar li:nth-child(7)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 充值');
		}else if(obj=='openadmin'){
            $("#siderbar li:nth-child(8)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 开户管理');
		}else if(obj=='adduser'){
            $("#siderbar li:nth-child(9)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 增加用户');
		}
	}
	else if(trl=='gameinfo'){
		if(obj=='gamelist'){
            $("#siderbar li:nth-child(1)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 游戏记录 <span class="st"> > </span> 购彩查询');
		}else if(obj=='task'){
            $("#siderbar li:nth-child(2)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 游戏记录 <span class="st"> > </span> 追号查询');
		}
	}
	else if(trl=='report'){
		if(obj=='checkbalance'){
            $("#siderbar li:nth-child(1)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 报表管理 <span class="st"> > </span> 余额查询');
		}else if(obj=='bankreport'){
            $("#siderbar li:nth-child(2)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 报表管理 <span class="st"> > </span> 充提记录');
		}else if(obj=='orders'){
            $("#siderbar li:nth-child(3)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 报表管理 <span class="st"> > </span> 游戏账变');
		}else if(obj=='userpoint'){
            $("#siderbar li:nth-child(4)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 报表管理 <span class="st"> > </span> 返点总额');
		}else if(obj=='list'){
            $("#siderbar li:nth-child(5)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 报表管理 <span class="st"> > </span> 报表查询');
		}
	}
	else if(trl=='help'){
		if(obj=='noticelist'){
            $("#siderbar li:nth-child(1)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 新手指南 <span class="st"> > </span> 公告列表');
		}else if(obj=='noticeDetail'){
            $("#siderbar li:nth-child(1)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 新手指南 <span class="st"> > </span> 公告列表 <span class="st"> > </span> 详细');
		}else if(obj=='playinfo'){
            $("#siderbar li:nth-child(2)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 新手指南 <span class="st"> > </span> 玩法介绍');
		}else if(obj=='answer'){
            $("#siderbar li:nth-child(3)").addClass("current");
            $("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 新手指南 <span class="st"> > </span> 常见问题');
		}
	}
}
//呢称验证
function validateNickName( str )
{
	var patrn = /^.{2,10}$/g;
	if( patrn.exec(str) ) {
		return true;
	} else {
		return false;
	}
}
/*function siderbarInit(obj,trl,tag) {//it's menu'list method'
	if(trl=='emaildeposit'){

		$("#siderbar .title").html('充值提现');
		$("#mainContent .topName").html('充值提现');
		$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 充值提现');
		$("#siderbar .list") .html("<li><a href=javascript:void(0) onclick=ListClick('chongzhi','emaildeposit','mdeposit') id=mdeposit>工行充值</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('chongzhi','emaildeposit','abc') id=abc>农行充值</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('chongzhi','emaildeposit','ccb') id=ccb>建行充值</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('chongzhi','emaildeposit','tenpay') id=tenpay>财付通充值</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('platwithdraw','security','platwithdraw') id=platwithdraw>我要提现</a></li>");
		if(tag=='mdeposit'){
			$("#siderbar li:nth-child(1)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 充值提现 <span class="st"> > </span> 工行充值');
		}else if(tag=='abc'){
			$("#siderbar li:nth-child(2)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 充值提现 <span class="st"> > </span> 农行充值');
		}else if(tag=='ccb'){
			$("#siderbar li:nth-child(3)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 充值提现 <span class="st"> > </span> 建行充值');
		}else if(tag=='tenpay'){
			$("#siderbar li:nth-child(4)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 充值提现 <span class="st"> > </span> 财付通充值');
		}else if(tag=='platwithdraw'){
			$("#siderbar li:nth-child(5)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 充值提现 <span class="st"> > </span> 我要提现');
		}
	}
	else if(trl=='user'){

		$("#siderbar .title").html('账户信息');
		$("#mainContent .topName").html('账户信息');
		$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息');
		$("#siderbar .list") .html("<li><a href=javascript:void(0) onclick=ListClick('userset','user','userset') id=userset>频道设定</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('changeloginpass','user','changeloginpass') id=changeloginpass>修改密码</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('changename','user','changename') id=changename>修改昵称</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('emailbind','user','emailbind') id=emailbind>邮箱绑定</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('userbankinfo','user','userbankinfo') id=userbankinfo>卡号绑定</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('myEmails','userCenter') id=myEmails>我的消息</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('userlist','userCenter') id=userlist>用户列表</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('openadmin','userCenter') id=openadmin>开户管理</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('adduser','userCenter') id=adduser>增加用户</a></li>");

		if(obj=='userset'){
			$("#siderbar li:nth-child(1)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 频道设定');
		}else if(obj=='changeloginpass'){
			$("#siderbar li:nth-child(2)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 修改密码');
		}else if(obj=='changename'){
			$("#siderbar li:nth-child(3)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 修改昵称');
		}else if(obj=='emailbind'){
			$("#siderbar li:nth-child(4)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 邮箱绑定');
		}else if(obj=='userbankinfo'){
			$("#siderbar li:nth-child(5)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 卡号绑定');
		}else if(obj=='myEmails'){
			$("#siderbar li:nth-child(6)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 我的消息');
		}else if(obj=='userlist'){
			$("#siderbar li:nth-child(7)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表');
		}else if(obj=='userlist_yhxx'){
			$("#siderbar li:nth-child(7)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 用户信息');
		}else if(obj=='userlist_td'){
			$("#siderbar li:nth-child(7)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 团队');
		}else if(obj=='userlist_cz'){
			$("#siderbar li:nth-child(7)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 彩种');
		}else if(obj=='userlist_yxzb'){
			$("#siderbar li:nth-child(7)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 游戏账变');
		}else if(obj=='userlist_czjl'){
			$("#siderbar li:nth-child(7)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 充值记录');
		}else if(obj=='userlist_dj'){
			$("#siderbar li:nth-child(7)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 冻结');
		}else if(obj=='userlist_cz'){
			$("#siderbar li:nth-child(7)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 用户列表 <span class="st"> > </span> 充值');
		}else if(obj=='openadmin'){
			$("#siderbar li:nth-child(8)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 开户管理');
		}else if(obj=='adduser'){
			$("#siderbar li:nth-child(9)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 账户信息 <span class="st"> > </span> 增加用户');
		}
	}
	else if(trl=='gameinfo'){
		$("#siderbar .title").html('游戏记录');
		$("#mainContent .topName").html('游戏记录');
		$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 游戏记录');
		$("#siderbar .list") .html("<li><a href=javascript:void(0) onclick=ListClick('gamelist','gameinfo') id=gamelist>购彩查询</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('task','gameinfo') id=task>追号查询</a></li>");
		if(obj=='gamelist'){
			$("#siderbar li:nth-child(1)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 游戏记录 <span class="st"> > </span> 购彩查询');
		}else if(obj=='task'){
			$("#siderbar li:nth-child(2)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 游戏记录 <span class="st"> > </span> 追号查询');
		}
	}
	else if(trl=='report'){
		$("#siderbar .title").html('报表管理');
		$("#mainContent .topName").html('报表管理');
		$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 报表管理');
		$("#siderbar .list") .html("<li><a href=javascript:void(0) onclick=ListClick('checkbalance','report') id=checkbalance>余额查询</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('bankreport','report') id=bankreport>充提记录</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('orders','report') id=orders>游戏账变</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('userpoint','report') id=userpoint>返点总额</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('list','report') id=list>报表查询</a></li>");
		if(obj=='checkbalance'){
			$("#siderbar li:nth-child(1)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 报表管理 <span class="st"> > </span> 余额查询');
		}else if(obj=='bankreport'){
			$("#siderbar li:nth-child(2)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 报表管理 <span class="st"> > </span> 充提记录');
		}else if(obj=='orders'){
			$("#siderbar li:nth-child(3)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 报表管理 <span class="st"> > </span> 游戏账变');
		}else if(obj=='userpoint'){
			$("#siderbar li:nth-child(4)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 报表管理 <span class="st"> > </span> 返点总额');
		}else if(obj=='list'){
			$("#siderbar li:nth-child(5)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 报表管理 <span class="st"> > </span> 报表查询');
		}
	}
	else if(trl=='help'){
		$("#siderbar .title").html('新手指南');
		$("#mainContent .topName").html('新手指南');
		$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 新手指南');
		$("#siderbar .list") .html("<li><a href=javascript:void(0) onclick=ListClick('noticelist','help') id=noticelist>公告列表</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('playinfo','help') id=playinfo>玩法介绍</a></li>");
		$("#siderbar .list") .append("<li><a href=javascript:void(0) onclick=ListClick('answer','help') id=answer>常见问题</a></li>");
		if(obj=='noticelist'){
			$("#siderbar li:nth-child(1)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 新手指南 <span class="st"> > </span> 公告列表');
		}else if(obj=='noticeDetail'){
			$("#siderbar li:nth-child(1)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 新手指南 <span class="st"> > </span> 公告列表 <span class="st"> > </span> 详细');
		}else if(obj=='playinfo'){
			$("#siderbar li:nth-child(2)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 新手指南 <span class="st"> > </span> 玩法介绍');
		}else if(obj=='answer'){
			$("#siderbar li:nth-child(3)").addClass("current");
			$("#address").html('<span class="st">·</span>首页 <span class="st"> > </span> 新手指南 <span class="st"> > </span> 常见问题');
		}
	}
}*/

var temp = getUrlPar("tag");
function ListClick(obj,trl,tag) {
	$("#"+tag).parents("#siderbar").find("li").removeClass("current");
	$("#"+tag).parent().addClass("current");

	if(tag!=temp) {
		// siderbarInit(obj,trl,tag);
	} else {
		changeAddress(obj,trl,tag);
	}
	temp = tag;
	if(tag) {
		var tagurl= '&tag='+tag;
	}

	$("#contentBox").each(function(){
		var spanTemp = $(this);
		spanTemp.html('<div align=center><img src="images/mbo2012/loadingAnimation.gif"><br><br>正在载入......</div>');
		$.ajax({
			type:"POST",
			//url: "mainContent.html",
			url: "?controller="+trl+"&action="+obj+"&ajax=1"+tagurl,
			timeout:30000,
			dataType: "html",
			success:function(data)
			{
				var msgHtml  = data;

			//	var msgHtml  = $(data).filter('#'+obj).html();
			//	sriptSetInterval1 = setInterval('sriptInit()',100)

				if(!data) msgHtml = $(data).filter('#errorBox').html();
				spanTemp.empty();
				spanTemp.html(msgHtml);
				clearTimeout();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				$.alert("请求超时请重试");
			}
		});
	});
}

function nochecksercuity(checkid){
	$("#contentBox").each(function(){
		var spanTemp = $(this);
		spanTemp.html('<div align=center><img src="images/mbo2012/loadingAnimation.gif"><br><br>正在载入......</div>');
		$.ajax({
			type:"POST",
			//url: "mainContent.html",
			url: "?controller=security&action=platwithdraw&check="+checkid,
			timeout:30000,
			dataType: "html",
			success:function(data)
			{

				var msgHtml  = data;

			//	var msgHtml  = $(data).filter('#'+obj).html();
			//	sriptSetInterval1 = setInterval('sriptInit()',100)

				if(!data) msgHtml = $(data).filter('#errorBox').html();
				spanTemp.empty();
				spanTemp.html(msgHtml);
				clearTimeout();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				$.alert("请求超时请重试");
			}
		});
	});
}

//onkeyup:根据用户输入的资金做检测并自动转换中文大写金额(用于充值和提现)
//obj:检测对象元素，chineseid:要显示中文大小写金额的ID，maxnum：最大能输入金额
function checkWithdraw(obj,chineseid,maxnum) {
	obj.value = formatFloat(obj.value);
	if( parseFloat(obj.value) > parseFloat(maxnum) ) {
		alert("输入金额超出了可用余额");
		obj.value = maxnum;
	}
	$("#"+chineseid).html( changeMoneyToChinese(obj.value) );
}

function postdata(data,contr,act,formobj) {
	var acount,postdata ="";
	acount = data.length;

	for(var i=0;i<acount;i++) {
		postdata+=data[i]+"="+formobj.elements[data[i]].value+"&";
	}

	$.ajax({
		type:"POST",
		url: "?controller="+contr+"&action="+act+"&ajax=1",
		processData: false,
		data: postdata,
		success: function(data) {
			$("#contentBox").html(data);
		}
	});
}

function checkemailWithdraw( obj,chineseid,maxnum ){
	obj.value = formatFloat(obj.value);
	if( parseFloat(obj.value) > parseFloat(maxnum) ){
		$.alert("您的充值金额已经超出规定限额");
		obj.value = maxnum;
	}
	$("#"+chineseid).html( changeMoneyToChinese(obj.value) );
}

//格式化浮点数形式(只能输入正浮点数，且小数点后只能跟四位,总体数值不能大于999999999999999共15位:数值999兆)
function formatFloat( num ) {
	num = num.replace(/^[^\d]/g,'');
	num = num.replace(/[^\d.]/g,'');
	num = num.replace(/\.{2,}/g,'.');
	num = num.replace(/^[0].*/g,'');
	num = num.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	if( num.indexOf(".") != -1 ) {
		var data = num.split('.');
		num = (data[0].substr(0,15))+'.'+(data[1].substr(0,2));
	} else {
		num = num.substr(0,15);
	}
	return num;
}

function show_no(id) {
	$("#code_"+id).show("slow");
}

function show_nocode(id) {
	$("#ncode_"+id).show("slow");
}

function close_no(id) {
	$("#code_"+id).hide("slow");
}

function nclose_no(id) {
	$("#ncode_"+id).hide("slow");
}

//自动转换数字金额为大小写中文字符,返回大小写中文字符串，最大处理到999兆
function changeMoneyToChinese( money ) {
	var cnNums	= new Array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖");	//汉字的数字
	var cnIntRadice = new Array("","拾","佰","仟");	//基本单位
	var cnIntUnits = new Array("","万","亿","兆");	//对应整数部分扩展单位
	var cnDecUnits = new Array("角","分","毫","厘");	//对应小数部分单位
	var cnInteger = "整";	//整数金额时后面跟的字符
	var cnIntLast = "元";	//整型完以后的单位
	var maxNum = 999999999999999.9999;	//最大处理的数字

	var IntegerNum;		//金额整数部分
	var DecimalNum;		//金额小数部分
	var ChineseStr="";	//输出的中文金额字符串
	var parts;		//分离金额后用的数组，预定义

	if( money == "" ){
		return "";
	}

	money = parseFloat(money);
	//alert(money);
	if( money >= maxNum ){
		$.alert('超出最大处理数字');
		return "";
	}
	if( money == 0 ){
		ChineseStr = cnNums[0]+cnIntLast+cnInteger;
		//document.getElementById("show").value=ChineseStr;
		return ChineseStr;
	}
	money = money.toString(); //转换为字符串
	if( money.indexOf(".") == -1 ){
		IntegerNum = money;
		DecimalNum = '';
	}else{
		parts = money.split(".");
		IntegerNum = parts[0];
		DecimalNum = parts[1].substr(0,4);
	}
	if( parseInt(IntegerNum,10) > 0 ){//获取整型部分转换
		zeroCount = 0;
		IntLen = IntegerNum.length;
		for( i=0;i<IntLen;i++ ){
			n = IntegerNum.substr(i,1);
			p = IntLen - i - 1;
			q = p / 4;
            m = p % 4;
			if( n == "0" ){
				zeroCount++;
			}else{
				if( zeroCount > 0 ){
					ChineseStr += cnNums[0];
				}
				zeroCount = 0;	//归零
				ChineseStr += cnNums[parseInt(n)]+cnIntRadice[m];
			}
			if( m==0 && zeroCount<4 ){
				ChineseStr += cnIntUnits[q];
			}
		}
		ChineseStr += cnIntLast;
	//整型部分处理完毕
	}
	if( DecimalNum!= '' ) {//小数部分
		decLen = DecimalNum.length;
		for( i=0; i<decLen; i++ ) {
			n = DecimalNum.substr(i,1);
			if( n != '0' ) {
				ChineseStr += cnNums[Number(n)]+cnDecUnits[i];
			}
		}
	}
	if( ChineseStr == '' ) {
		ChineseStr += cnNums[0]+cnIntLast+cnInteger;
	} else if( DecimalNum == '' ) {
		ChineseStr += cnInteger;
	}
	return ChineseStr;
}

function moneyFormat(num) {
	var sign = Number(num) < 0 ? "-" : "";
    num = num.toString();
	if( num.indexOf(".") == -1 ) {
		num = "" + num + ".0000";
	}
	var data = num.split('.');
	data[0] = data[0].toString().replace(/[^\d]/g,"").substr(0,15);
	data[0] = Number(data[0]).toString();
	var newnum = [];
	for( var i=data[0].length; i>0; i-=3 ) {
		newnum.unshift(data[0].substring(i,i-3));
	}
	data[0] = newnum.join(",");
	data[1] = data[1].toString().substr(0,4);
	return sign+""+data[0] + "." + data[1];
}


function autoAlertPrize() {//checkgetprize();
	alt=setTimeout('autoAlertPrize()',20000);
}


function jjtc(){
	$.alert('即将推出，敬请期待');
}

function checkgetprize() {
	$.ajax({
		type : 'POST',
		url  : './?controller=default&action=checkgetprize',
		timeout : 10000,
		success : function(data){
			if( data == "error" ){
				return false;
			}else{
				$.alert(data);
				return true;
			}
		}
	});
}

//20130425 Tomcat 添加针对返点数值输入的检查---
function clearNoNum(obj){
    var myregexp = /\d+\.?\d?/;
    var match = myregexp.exec(obj.value);
    if (match != null) {
        obj.value = match[0];
    } else {
        obj.value = "";
    }
}

function checkNum(obj) {
    //为了去除最后一个.
    obj.value = obj.value.replace(/\.$/g,".0");
}

function cIsclient(sUrl){
    openweb(sUrl);
};



function isclient(Csurl){
    if(getCookie('isclient')){
        cIsclient(Csurl);
    }else{
        window.open(Csurl,'在线客服','width=590,height=550');
    }
};

//用于Air的方法
function airActionwie(uname,nicename){
	// alert(nicename);
}

function backpage() {
  window.history.back();
}

function checkbackspace(flag) {
	if(getCookie('isclient')){
		top.backpage();
	} else {
		window.history.back();
	}
}

function backtospace() {

	if(getCookie('isclient')){
		$("#mainFrame",parent.document).attr("src",document.referrer)
	}else{
		window.open(document.referrer,'_self');
	}
}

//判断是否IE浏览器
function fnCheckIe(){
	var broswer = navigator.userAgent;
	var ver = parseInt(broswer.substr(broswer.indexOf("MSIE")+5,3));
	if(ver <= 8){
		return true;
	}else{
		return false;
	}
}

$(function(){
	var moveIn = false;
	var moveSeeIn = false;

	$(document).on('mouseover','.task_div',function(){
		moveIn = true;
	});

	$(document).on('mouseout','.task_div',function(){
		moveIn = false;
	});

	$(document).on('mouseover','.seeMore',function(){
		moveSeeIn = true;
	});

	$(document).on('mouseout','.seeMore',function(){
		moveSeeIn = false;
	});

	$(document).click(function(){
		if(!moveIn){
			$('.task_div').hide('slow');
		}

		if(!moveSeeIn){
			$('.seeMore').hide();
		}
	});

	$(document).on("click",".seeMore",function(){
		if(moveIn){
			$('.task_div').hide('slow');
		}

		if(moveSeeIn){
			$('.seeMore').hide();
		}
	});

})

jQuery.extend( jQuery.easing,  {
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    }
});


// 获取当前时间

function setAmerTime(el) {
    var today = new Date();
    today.setHours(today.getHours());
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    var h = today.getHours();
    var mm = today.getMinutes();
    var s = today.getSeconds();
    m =  checkTime(m);
    d = checkTime(d);
    h = checkTime(h);
    mm = checkTime(mm);
    s = checkTime(s);
    if(el =='#paydate'){
        $(el).val(y+"/"+m+"/"+d+" "+h+":"+mm); // 只到分
    }else{
        $(el).val(y+"/"+m+"/"+d+" "+h+":"+mm+":"+s);
    }
    return ( y+"-"+m+"-"+d+" "+h+":"+mm+":"+s) ;

}
/**
 * 1位数补0为2位数
 * @param i
 * @returns {*}
 */
function checkTime(i) {
    if (i<10)
    {i="0" + i}
    return i
}

//时间戳转换
function formatTimeUnlix(v){
    if(v==null){
        return '';
    }
	 var date=new Date(v);
	 var year=date.getFullYear();
	 var month=(date.getMonth()+1<10)?"0"+(date.getMonth()+1):(date.getMonth()+1);
	 var day=(date.getDate()<10)?"0"+date.getDate():date.getDate();
	 var hours=(date.getHours()<10)?"0"+date.getHours():date.getHours();
	 var minutes=(date.getMinutes()<10)?"0"+date.getMinutes():date.getMinutes();
	 var seconds=(date.getSeconds()<10)?"0"+date.getSeconds():date.getSeconds();
	 return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
}

// 格式化时间
function formatTime(date){
	var year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours(),
		minutes = date.getMinutes();
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;
	hour = hour > 9 ? hour : '0' + hour;
	minutes = minutes > 9 ? minutes : '0' + minutes;
	return month + '-' + day + ' ' + hour + ':' + minutes;
}


function xxmPush(show,data,type){
	var $tip = $('.public-number .tips'),$info = $('.public-number .other-info');
	var title,xxmtime,content,xxmMessages_new;
	if(type === '公告'){
		id = data.id;
		title = '【公告】'+data.title;
		orgTime = data.sendtime;
		xxmtime = String(data.sendtime).substring(5,16);
		content = data.content;
	}else if(type === '站内信'){
		id = null;
		title = '【站内信】'+data.message.title;
		orgTime = data.message.time;
		xxmtime = String(data.message.time).substring(5,16);
		content = '【站内信】'+data.message.content;
	}else if(type === '中奖提示'){
		id = null;
		title = '【中奖提示】您投注的'+data.lottery+'第'+data.issue+'期中奖啦！中奖金额'+data.bonus+'元<a href="/?controller=report&action=main" target="_blank">查看详情</a>';
		orgTime = formatTime(new Date());
		xxmtime = formatTime(new Date());
		content = title;
	}
	$('#xxm-newmsg').text(title);
	$('#xxm-time').text(xxmtime);
	if(show){
		if(type === '公告'){
			var msg = '<dd class="xxm"><div class="avatar"><img src="../images/chatting/xxm.png"></div><span class="content"><h2>'+title+'</h2>'+content+'</span><span class="time">'+xxmtime+'</span></dd>';
		}else if(type === '站内信'){
			var msg = '<dd class="xxm"><div class="avatar"><img src="../images/chatting/xxm.png"></div><span class="content">'+content+'</span><span class="time">'+xxmtime+'</span></dd>';
		}else{
			var msg = '<dd class="xxm"><div class="avatar"><img src="../images/chatting/xxm.png"></div><span class="content">'+content+'</span><span class="time">'+xxmtime+'</span></dd>';
		}	
		$('.messages-area dl').append(msg);
		$('.messages-area dl')[0].scrollTop = $('.messages-area dl')[0].scrollHeight;
	}else{
		if($tip.length <= 0){
    		var tipHtml = '<span class="tips">1</span>';
    		$info.append(tipHtml);
    	}else{
    		num = parseInt($tip.text());		           
    		num = num + 1;
    		$tip.text(num);
    	}
    	countUnreadMsgs();
	}

	//保存到localstorage
	var curMessage = {
		id:id,
		title:title,
		content:content,
		orgTime:orgTime,
		time:xxmtime,
		type:'text_message',
		msgtype:type
	};
	xxmMessages_new = getStore($.curUserid);
	if(!xxmMessages_new || xxmMessages_new.length === 0){
		setStore($.curUserid,[curMessage]);
	}else{
	
		xxmMessages_new.push(curMessage);
		setStore($.curUserid,xxmMessages_new);
	}

	//与chrome交互函数
	var isChrome = getCookie('ischrome');
	if(isChrome == '1'){
		data.type = type;
		cefonwebmsg(JSON.stringify(data));
	}	
}

function statusConvert(status){
	var className;
	switch(+status){
		case 0:
			className = 'offline';
		break;
		case 1:
			className = 'online';
		break;
		case 2:
			className = 'busy';
		break;
	}
	return className;
}

function HTMLEncode(text) 
{  
	var emojiConvert = text.replace(/\\"/g,'"');
	emojiConvert = text.replace(/<img src=\\"\/images\/nsc\/chatting\/arclist\/(\d+)\.gif\\" border=\\"0\\" \/>/g,'[em_$1]');
	output = emojiConvert;
    return output; 
} 

function HTMLDecode(text) 
{ 
	output = text.replace(/\\"/g,'"').replace(/\\(')/g,'$1');
    return output; 
} 

//封装过期控制代码
function setStore(key,value){
    //var curTime = new Date().getTime();
    localStorage.setItem(key,JSON.stringify(value));
}
function getStore(key,exp){
    var data = localStorage.getItem(key);
    var dataObj = JSON.parse(data),dataJson = [];
    var exp = 1000*60*60*24*7;
    if(!data) return null;
    $.each(dataObj,function(i,v){
    	if(typeof v === 'object'){
    		var date = new Date(),year = date.getFullYear();
	    	v.orgTime = v.orgTime.length > 14 ? v.orgTime : year + '-' + v.orgTime;
	    	v.orgTime = v.orgTime.replace(/-/g,'/');
	    	if(date.getTime() - new Date(v.orgTime).getTime() <= exp){
	    		dataJson.push(v);
	    	}
    	}  	
    });
    return dataJson;
}
function removeStore(key){
	localStorage.removeItem(key);
}

function countUnreadMsgs(){
	var $msgContainer = $('#contact-lists dl');
	var msgTotal = 0,msgArr = [];
	$msgContainer.each(function(index,value){
		var $tip = $(value).find('.tips');
		var _len = $tip.length,_time,_count = 0,lastType = 'msg',uObj = {};
		if(_len > 0){
			if(index === 0){
				lastType = $(value).find('#xxm-newmsg').text()
					.replace(/^\s|\s$/g,'')
					.match(/\【(.*)\】/)[1];
				_time = $(value).find('#xxm-time').text();
			}else{
				_time = $(value).find('dd').eq(0).find('.time').text();
			}
			$tip.each(function(i,v){
				var num = +$(v).text();
				_count += num;
			});
			uObj.type = '未读消息';
			uObj.lastType = lastType;
			uObj.count = _count;
			uObj.time = _time;
			msgArr.push(uObj);
			msgTotal += _count;
		}
	});
	var isChrome = getCookie('ischrome');
	var intercom = new Intercom();
	if(msgArr.length > 0){
		msgArr = msgArr.sort(function(a,b){
			var year = new Date().getFullYear();
			var atime = year + '-' + a.time,
				btime = year + '-' + b.time;
			return Date.parse(btime) - Date.parse(atime)
		});
		//console.log(msgArr);
		msgArr[0].totalMsgNums = msgTotal;
		if(isChrome == '1'){
			cefonwebmsg(JSON.stringify(msgArr[0]));
		}else{
			//web端消息提醒
			intercom.emit('msg', {message: msgArr[0]});
		}
	}else{
		if(isChrome == '1'){
			cefonwebmsg(JSON.stringify({
				type:'未读消息',
				totalMsgNums:0
			}));
		}else{
			//web端消息提醒
			intercom.emit('msg', {message: {
				type:'未读消息',
				totalMsgNums:0
			}});
		}
	}
}

function refreshLotteryHistory(){
	$('.sq_refresh').unbind().live('click',function(e){
		e.preventDefault();
		var $this = $(this),v = Math.random();
		if($this.hasClass('disabled'))return;
		$('#close_bet-record_tc').append('<div class="tip-msg">刷新中...</div>');
	    $.getJSON('/index.php?controller=gameinfo&action=gamelistbyself&v=' + v, function(res) {
	        $('#close_bet-record_tc').html(res);
	        $('.sq_refresh').text('5s').addClass('disabled');
	        var sec = 5,_timer;
	        _timer = setInterval(function(){
	        	sec--;
	        	$('.sq_refresh').text(sec+'s');
	        	if(sec >= 1){
	        		setInterval(_timer,1000);
	        	}else{
	        		clearInterval(_timer);
	        		$('.sq_refresh').html('<i></i>刷新').removeClass('disabled');
	        	}	        	
	        },1000);
	    });
	});	
}

// 序列化表单转成json格式

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var DataDeal = {
//将从form中通过$('#form').serialize()获取的值转成json
    formToJson: function (data) {
        data=data.replace(/&/g,"\",\"");
        data=data.replace(/=/g,"\":\"");
        data="{\""+data+"\"}";
        return data;
    },
};

//金额转换,分转成元
function roundAmt(v) {
    return isNaN(v) ? "0.00" : (v/100).toFixed(2);
}
