
/* 全局变量定义 */

var action = {
    forseti: 'http://121.58.234.210:19091/forseti/',
    uaa: 'http://121.58.234.210:19091/uaa/',
    hermes: 'http://121.58.234.210:19091/hermes/',
};

var m_lottery_int = {
    c_cqssc_id : 1 ,  // 重庆时时彩 传统盘
    s_cqssc_id : 2 ,  // 重庆时时彩 双面盘
    c_jxyxw_id : 3 ,  // 江西11选5 传统盘
    s_jxyxw_id : 4 ,  // 江西11选5 双面盘
    c_jsks_id : 5 ,  // 江苏快3 传统盘
    s_jsks_id : 6 ,  // 江苏快3 双面盘
    c_bjpk_id : 7 ,  // 北京pk10 传统盘
    s_bjpk_id : 8 ,  // 北京pk10 双面盘
    c_lhc_id : 9 ,  // 六合彩 传统盘
    s_lhc_id : 10 ,  // 六合彩 双面盘
    c_tjssc_id : 11 ,  // 天津时时彩 传统盘
    s_tjssc_id : 12 ,  // 天津时时彩 双面盘
    c_xjssc_id : 13 ,  // 新疆时时彩 传统盘
    s_xjssc_id : 14 ,  // 新疆时时彩 双面盘
    c_gdyxw_id : 15 ,  // 广东11选5 传统盘
    s_gdyxw_id : 16 ,  // 广东11选5 双面盘
    c_sdyxw_id : 17 ,  // 山东11选5 传统盘
    s_sdyxw_id : 18 ,  // 山东11选5 双面盘
    c_ahks_id : 19 ,  // 安徽快3 传统盘
    s_ahks_id : 20 ,  // 安徽快3 双面盘
    c_hbks_id : 21 ,  // 湖北快3 传统盘
    s_hbks_id : 22 ,  // 湖北快3 双面盘
    cqssc_name : '重庆时时彩' ,  // 重庆时时彩
    jxyxw_name : '江西11选5' ,  // 江西11选5
    jsks_name : '江苏快3 ' ,  // 江苏快3
    bjpk_name : '北京PK10' ,  // 北京pk10
    lhc_name : '香港六合彩' ,  // 六合彩
    tjssc_name : '天津时时彩' ,  // 天津时时彩
    xjssc_name : '新疆时时彩' ,  // 天津时时彩
    gdyxw_name : '广东11选5' ,  // 广东11选5
    sdyxw_name : '山东11选5' ,  // 山东11选5
    ahks_name : '安徽快3 ' ,  // 安徽快3
    hbks_name : '湖北快3 ' ,  // 湖北快3

}


/*
 * 解决iOS浏览器touch+click事件延迟，需载入fastclick.js
 * */
$(function() {
    // FastClick.attach(document.body);     已转移至src/component/App.vue
});
