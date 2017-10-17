

/*
 *  时时彩
 * */

var now_pcode  ; // 当前期数
var now_time  ; // 当前期数销售截止时间
var next_pcode  ; // 下一期数销售截止时间
var sys_time  ; // 当前系统时间
var now_day  ; // 当前日期
var dataPlay ={} ; // 玩法树数据
var dataPlayAll ={} ; // 玩法树数据最终组装
var lotterytype = 0;

var data_label = [
    {
        isnew:"0",
        isdefault:"1",
        title:"五星",
        childrens:[],
        label:[
            {
                gtitle:'五星直选',
                cid:11,
                label:[
                {"methoddesc":"从个、十、百、千、万位各选一个号码组成一注。",
                "methodhelp":"从万位、千位、百位、十位、个位中选择一个5位数号码组成一注，所选号码与开奖号码全部相同，且顺序一致，即为中奖。",
                "methodexample":"投注方案：23456；<br />开奖号码：23456，<br />即中五星直选",
                "selectarea":{
                    "type"   : "digital",
                    "layout" : [
                        {"title":"万位", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1},
                        {"title":"千位", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1},
                        {"title":"百位", "no":"0|1|2|3|4|5|6|7|8|9", "place":2, "cols":1},
                        {"title":"十位", "no":"0|1|2|3|4|5|6|7|8|9", "place":3, "cols":1},
                        {"title":"个位", "no":"0|1|2|3|4|5|6|7|8|9", "place":4, "cols":1}
                    ],
                    "noBigIndex" : 5,
                    "isButton"   : true
                },
                "show_str" : "X,X,X,X,X",
                "code_sp" : "",
                "ifrandom" : 1, // 机选
                "randomcos" : 5,  // 机选
                "randomcosvalue" : "1|1|1|1|1",  // 机选
                methodid : 111 ,
                name:'复式',
              /*  prize:{1:'180000.00'},
                nfdprize:{levs:'194000',defaultprize:180000.00,userdiffpoint:7},*/
                modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
                menuid:2180,
                desc:'复式',maxcodecount:0
            },{"methoddesc":"手动输入号码，至少输入1个五位数号码组成一注。",
                "methodhelp":"手动输入一个5位数号码组成一注，所选号码的万位、千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。",
                "methodexample":"投注方案：23456； 开奖号码：23456，即中五星直选一等奖",
                "selectarea":{"type":"input","singletypetips":"三星123,234 五星12345"},
                "show_str" : "X",
                "code_sp" : " ",
                methodid : 112 ,
                name:'单式',
              /*  prize:{1:'180000.00'},
                nfdprize:{levs:'194000',defaultprize:180000.00,userdiffpoint:7},*/
                modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
                menuid:2181,
                desc:'单式',maxcodecount:0
            },
          /*  {"methoddesc":"从个、十、百、千、万位各选一个号码组成五注。",
                "methodhelp":"从万位、千位、百位、十位、个位中至少各选一个号码组成1-5星的组合，共五注，所选号码的个位与开奖号码相同，则中1个5等奖；所选号码的个位、十位与开奖号码相同，则中1个5等奖以及1个4等奖，依此类推，最高可中5个奖。",
                "methodexample":"五星组合示例，如购买：1+2+3+4+5，该票共10元，由以下5注：（12345）五星、1（2345）四星、12（345）三星、123（45）二星、1234（5）一星构成。开奖号码12345，即五星、四星、三星、二星、一星的一等奖各1注。",
                "selectarea":{
                    "type"   : "digital",
                    "layout" : [
                        {"title":"万位", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1},
                        {"title":"千位", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1},
                        {"title":"百位", "no":"0|1|2|3|4|5|6|7|8|9", "place":2, "cols":1},
                        {"title":"十位", "no":"0|1|2|3|4|5|6|7|8|9", "place":3, "cols":1},
                        {"title":"个位", "no":"0|1|2|3|4|5|6|7|8|9", "place":4, "cols":1}
                    ],
                    "noBigIndex" : 5,
                    "isButton"   : true
                },
                "show_str" : "X,X,X,X,X",
                "code_sp" : "",
                methodid : 113,
                name:'组合',
              /!*  prize:{1:'180000.00',2:'18000.00',3:'1800.00',4:'180.00',5:'18.00'},
                nfdprize:{},*!/
                modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
                menuid:2182,
                desc:'组合',maxcodecount:0
            }*/
            ]},
            {
             gtitle:'五星组选',
             cid:12,
             label:[{"methoddesc":"从0-9中选择5个号码组成一注。",
            "methodhelp":"从0-9中任意选择5个号码组成一注，所选号码与开奖号码的万位、千位、百位、十位、个位相同，顺序不限，即为中奖。",
            "methodexample":"投注方案：02568，开奖号码的五个数字只要包含0、2、5、6、8，即可中五星组选120一等奖。",
            "selectarea":{
                "type"   : "digital",
                "layout" : [
                    {"title":"", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1, "minchosen":5}
                ],
                "noBigIndex" : 5,
                "isButton"   : true
            },
            "show_str" : "X",
            "code_sp" : ",",
            "ifrandom" : 1, // 机选
            "randomcos" : 5,  // 机选
            "randomcosvalue" : "1|1|1|1|1",  // 机选
            methodid : 121,
            name:'组选120',
          /*  prize:{1:'1500.00'},
            nfdprize:{levs:'1616',defaultprize:1500.00,userdiffpoint:7},*/
            modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
            menuid:2193,
            desc:'组选120',maxcodecount:0
        },{"methoddesc":"从“二重号”选择一个号码，“单号”中选择三个号码组成一注。",
            "methodhelp":"选择1个二重号码和3个单号号码组成一注，所选的单号号码与开奖号码相同，且所选二重号码在开奖号码中出现了2次，即为中奖。",
            "methodexample":"投注方案：二重号：8，单号：0、2、5，只要开奖的5个数字包括 0、2、5、8、8，即可中五星组选60一等奖。",
            "selectarea":{
                "type"   : "digital",
                "layout" : [
                    {"title":"二重号", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1, "minchosen": 1},
                    {"title":"单　号", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1, "minchosen": 3}
                ],
                "noBigIndex" : 5,
                "isButton"   : true
            },
            "show_str" : "X,X",
            "code_sp" : "",
            methodid : 122,
            name:'组选60 ',
           /* prize:{2:'3000.00'},
            nfdprize:{levs:'3233',defaultprize:3000.00,userdiffpoint:7},*/
            modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
            menuid:2194,
            desc:'组选60 ',maxcodecount:0
        },{"methoddesc":"从“二重号”选择两个号码，“单号”中选择一个号码组成一注。",
            "methodhelp":"选择2个二重号和1个单号号码组成一注，所选的单号号码与开奖号码相同，且所选的2个二重号码分别在开奖号码中出现了2次，即为中奖。",
            "methodexample":"投注方案：二重号：2、8，单号：0，只要开奖的5个数字包括 0、2、2、8、8，即可中五星组选30一等奖。",
            "selectarea":{
                "type"   : "digital",
                "layout" : [
                    {"title":"二重号", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1, "minchosen": 2},
                    {"title":"单　号", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1, "minchosen": 1}
                ],
                "noBigIndex" : 5,
                "isButton"   : true
            },
            "show_str" : "X,X",
            "code_sp" : "",
            methodid : 123,
            name:'组选30',
          /*  prize:{3:'6000.00'},
            nfdprize:{levs:'6466',defaultprize:6000.00,userdiffpoint:7},*/
            modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
            menuid:2195,
            desc:'组选30',maxcodecount:0
        },{"methoddesc":"从“三重号”选择一个号码，“单号”中选择两个号码组成一注。",
            "methodhelp":"选择1个三重号码和2个单号号码组成一注，所选的单号号码与开奖号码相同，且所选三重号码在开奖号码中出现了3次，即为中奖。",
            "methodexample":"投注方案：三重号：8，单号：0、2，只要开奖的5个数字包括 0、2、8、8、8，即可中五星组选20一等奖。",
            "selectarea":{
                "type"   : "digital",
                "layout" : [
                    {"title":"三重号", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1, "minchosen": 1},
                    {"title":"单　号", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1, "minchosen": 2}
                ],
                "noBigIndex" : 5,
                "isButton"   : true
            },
            "show_str" : "X,X",
            "code_sp" : "",
            methodid : 124,
            name:'组选20',
           /* prize:{4:'9000.00'},
            nfdprize:{levs:'9700',defaultprize:9000.00,userdiffpoint:7},*/
            modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
            menuid:2196,
            desc:'组选20',maxcodecount:0
        },{"methoddesc":"从“三重号”选择一个号码，“二重号”中选择一个号码组成一注。",
            "methodhelp":"选择1个三重号码和1个二重号码，所选三重号码在开奖号码中出现3次，并且所选二重号码在开奖号码中出现了2次，即为中奖。",
            "methodexample":"投注方案：三重号：8，二重号：2，只要开奖的5个数字包括 2、2、8、8、8，即可中五星组选10一等奖。",
            "selectarea":{
                "type"   : "digital",
                "layout" : [
                    {"title":"三重号", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1, "minchosen": 1},
                    {"title":"二重号", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1, "minchosen": 1}
                ],
                "noBigIndex" : 5,
                "isButton"   : true
            },
            "show_str" : "X,X",
            "code_sp" : "",
            methodid : 125,
            name:'组选10',
          /*  prize:{5:'18000.00'},
            nfdprize:{levs:'19400',defaultprize:18000.00,userdiffpoint:7},*/
            modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
            menuid:2197,
            desc:'组选10',maxcodecount:0
        },{"methoddesc":"从“四重号”选择一个号码，“单号”中选择一个号码组成一注。",
            "methodhelp":"选择1个四重号码和1个单号号码组成一注，所选的单号号码与开奖号码相同，且所选四重号码在开奖号码中出现了4次，即为中奖。",
            "methodexample":"投注方案：四重号：8，单号：2，只要开奖的5个数字包括 2、8、8、8、8，即可中五星组选5一等奖。",
            "selectarea":{
                "type"   : "digital",
                "layout" : [
                    {"title":"四重号", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1, "minchosen": 1},
                    {"title":"单　号", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1, "minchosen": 1}
                ],
                "noBigIndex" : 5,
                "isButton"   : true
            },
            "show_str" : "X,X",
            "code_sp" : "",
            methodid : 126,
            name:'组选5',
           /* prize:{6:'36000.00'},
            nfdprize:{levs:'38800',defaultprize:36000.00,userdiffpoint:7},*/
            modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
            menuid:2198,
            desc:'组选5',maxcodecount:0
        }]}]},
    {
        isnew:"0",
        isdefault:"0",
        title:"四星",
        childrens:[],
        label:[
            {
        gtitle:'四星直选',
        cid:21,
        label:[
            {"methoddesc":"从千位、百位、十位、个位中选择一个4位数号码组成一注",
        "methodhelp":"从千位、百位、十位、个位中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。",
        "methodexample":"投注方案：3456；开奖号码：*3456，即中四星直选。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"千位", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1},
                {"title":"百位", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1},
                {"title":"十位", "no":"0|1|2|3|4|5|6|7|8|9", "place":2, "cols":1},
                {"title":"个位", "no":"0|1|2|3|4|5|6|7|8|9", "place":3, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "-,X,X,X,X",
        "code_sp" : "",
        "ifrandom" : 1, // 机选
        "randomcos" : 4,  // 机选
        "randomcosvalue" : "1|1|1|1",  // 机选
        methodid : 211,
        name:'复式',
      /*  prize:{1:'18000.00'},
        nfdprize:{levs:'19400',defaultprize:18000.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2184,
        desc:'复式',maxcodecount:0
    },{"methoddesc":"手动输入号码，至少输入1个四位数号码组成一注。",
        "methodhelp":"手动输入一个4位数号码组成一注，所选号码的千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。",
        "methodexample":"投注方案：3456； 开奖号码：3456，即中四星直选一等奖",
        "selectarea":{"type":"input","singletypetips":"三星123,234 五星12345"},
        "show_str" : "X",
        "code_sp" : " ",
        methodid : 212,
        name:'单式',
      /*  prize:{1:'18000.00'},
        nfdprize:{levs:'19400',defaultprize:18000.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2185,
        desc:'单式',maxcodecount:0
    },{"methoddesc":"在千位，百位，十位，个位任意位置上任意选择1个或1个以上号码。",
        "methodhelp":"从千位、百位、十位、个位任意位置上至少选择1个以上号码，所选号码与相同位置上的开奖号码一致，即为中奖。",
        "methodexample":"投注方案：5+6+7+8,开奖号码：*5678即可中四星、三星、二星、一星各1注。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [

                {"title":"千位", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1},
                {"title":"百位", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1},
                {"title":"十位", "no":"0|1|2|3|4|5|6|7|8|9", "place":2, "cols":1},
                {"title":"个位", "no":"0|1|2|3|4|5|6|7|8|9", "place":3, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "-,X,X,X,X",
        "code_sp" : "",
        methodid : 213,
        name:'组合',
       /* prize:{1:'18000.00',2:'1800.00',3:'180.00',4:'18.00'},
        nfdprize:{},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2186,
        desc:'组合',maxcodecount:0
    }]},{
            gtitle:'四星组选',
            cid:22 ,
           label:[{"methoddesc":"从0-9中选择4个号码组成一注。",
        "methodhelp":"从0-9中任意选择4个号码组成一注，所选号码与开奖号码的千位、百位、十位、个位相同，且顺序不限，即为中奖。",
        "methodexample":"投注方案：0568，开奖号码的四个数字只要包含0、5、6、8，即可中四星组选24一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1, "minchosen":4}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 221 ,
        name:'组选24',
       /* prize:{1:'750.00'},
        nfdprize:{levs:'808',defaultprize:750.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2188,
        desc:'组选24',maxcodecount:0
    },{"methoddesc":"从“二重号”选择一个号码，“单号”中选择两个号码组成一注。",
        "methodhelp":"选择1个二重号码和2个单号号码组成一注，所选单号号码与开奖号码相同，且所选二重号码在开奖号码中出现了2次，即为中奖。",
        "methodexample":"投注方案：二重号：8，单号：0、6，只要开奖的四个数字包括 0、6、8、8，即可中四星组选12一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"二重号", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1, "minchosen":1},
                {"title":"单　号", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1, "minchosen":2}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X,X",
        "code_sp" : "",
        methodid : 222,
        name:'组选12',
       /* prize:{2:'1500.00'},
        nfdprize:{levs:'1616',defaultprize:1500.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2189,
        desc:'组选12',maxcodecount:0
    },{"methoddesc":"从“二重号”选择两个号码组成一注。",
        "methodhelp":"选择2个二重号码组成一注，所选的2个二重号码在开奖号码中分别出现了2次，即为中奖。",
        "methodexample":"投注方案：二重号：2、8，开奖号码的后4个数字必须包含两个对子号2和8（例如2882），顺序不限，即可中四星组选6。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"二重号", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1, "minchosen":2}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 223,
        name:'组选6',
       /* prize:{3:'3000.00'},
        nfdprize:{levs:'3233',defaultprize:3000.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2190,
        desc:'组选6',maxcodecount:0
    },{"methoddesc":"从“三重号”选择一个号码，“单号”中选择一个号码组成一注。",
        "methodhelp":"选择1个三重号码和1个单号号码组成一注，所选单号号码与开奖号码相同，且所选三重号码在开奖号码中出现了3次，即为中奖。",
        "methodexample":"投注方案：三重号：8，单号：2，只要开奖的四个数字从小到大排列为 2、8、8、8，即可中四星组选4。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"三重号", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1, "minchosen":1},{"title":"单　号", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1, "minchosen":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X,X",
        "code_sp" : "",
        methodid : 224,
        name:'组选4',
       /* prize:{4:'4500.00'},
        nfdprize:{levs:'4850',defaultprize:4500.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2191,
        desc:'组选4',maxcodecount:0
    }]}]},
    {
        isnew:"0",
        isdefault:"0", // 展示默认玩法，1表示默认展示
        title:"后三",
        childrens:[],
        label:[
        {gtitle:'后三直选',
        cid:51,
        label:[{"methoddesc":"从个、十、百位各选一个号码组成一注。",
        "methodhelp":"从百位、十位、个位中选择一个3位数号码组成一注，所选号码与开奖号码后3位相同，且顺序一致，即为中奖。",
        "methodexample":"投注方案：345；<br />开奖号码：345，<br />即中后三直选一等奖",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"百位", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1},
                {"title":"十位", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1},
                {"title":"个位", "no":"0|1|2|3|4|5|6|7|8|9", "place":2, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "-,-,X,X,X",
        "code_sp" : "",
        "ifrandom" : 1, // 机选
        "randomcos" : 3,  // 机选
        "randomcosvalue" : "1|1|1",  // 机选
        methodid : 511 ,
        name:'复式',
      /*  prize:{1:'1800.00'},
        nfdprize:{levs:'1940',defaultprize:1800.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:56,
        desc:'复式',maxcodecount:0
    },{"methoddesc":"手动输入号码，至少输入1个三位数号码组成一注。",
        "methodhelp":"手动输入一个3位数号码组成一注，所选号码的百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。",
        "methodexample":"投注方案：345； 开奖号码：345，即中后三直选一等奖",
        "selectarea":{"type":"input"},
        "show_str" : "X",
        "code_sp" : " ",
        methodid : 512,
        name:'单式',
        /*prize:{1:'1800.00'},
        nfdprize:{levs:'1940',defaultprize:1800.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:57,
        desc:'单式',maxcodecount:0
    },{"methoddesc":"从0-27中任意选择1个或1个以上号码",
        "methodhelp":"所选数值等于开奖号码的百位、十位、个位三个数字相加之和，即为中奖。",
        "methodexample":"投注方案：和值1；开奖号码后三位：001,010,100,即中后三直选一等奖",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"直选和值", "no":"0|1|2|3|4|5|6|7|8|9|10|11|12|13", "place":0, "cols":1},
                {"title":"", "no":"14|15|16|17|18|19|20|21|22|23|24|25|26|27", "place":0, "cols":1}
            ],
            "isButton"   : false
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 513,
        name:'直选和值',
       /* prize:{1:'1800.00'},
        nfdprize:{levs:'1940',defaultprize:1800.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:58,
        desc:'直选和值',maxcodecount:0
    }]},{
            gtitle:'后三组选',
            cid:52,
            label:[{"methoddesc":"从0-9中任意选择2个或2个以上号码。",
        "methodhelp":"从0-9中选择2个数字组成两注，所选号码与开奖号码的百位、十位、个位相同，且顺序不限，即为中奖。",
        "methodexample":"投注方案：5,8,8；开奖号码后三位：1个5，2个8 (顺序不限)，即中后三组选三一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"组三", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 522,
        name:'组三',
       /* prize:{1:'600.00'},
        nfdprize:{levs:'646',defaultprize:600.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:65,
        desc:'组三',maxcodecount:0
    },{"methoddesc":"从0-9中任意选择3个或3个以上号码。",
        "methodhelp":"从0-9中任意选择3个号码组成一注，所选号码与开奖号码的百位、十位、个位相同，顺序不限，即为中奖。",
        "methodexample":"投注方案：2,5,8；开奖号码后三位：1个2、1个5、1个8 (顺序不限)，即中后三组选六一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"组六", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 523,
        name:'组六',
      /*  prize:{2:'300.00'},
        nfdprize:{levs:'323',defaultprize:300.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:66,
        desc:'组六',maxcodecount:0
    },{"methoddesc":"手动输入号码，至少输入1个三位数号码。",
        "methodhelp":"键盘手动输入购买号码，3个数字为一注，开奖号码的百位、十位、个位符合后三组三或组六均为中奖。",
        "methodexample":"投注方案：分別投注(0,0,1),以及(1,2,3)，开奖号码后三位包括：(1)0,0,1，顺序不限，即中得组三一等奖；或者(2)1,2,3，顺序不限，即中得组六一等奖。",
        "selectarea":{"type":"input"},
        "show_str" : "X",
        "code_sp" : " ",
        methodid : 524,
        name:'混合组选',
       /* prize:{1:'600.00',2:'300.00'},
        nfdprize:{},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:67,
        desc:'混合组选',maxcodecount:0
    },{"methoddesc":"从1-26中选择1个号码。",
        "methodhelp":"所选数值等于开奖号码百位、十位、个位三个数字相加之和，即为中奖。",
        "methodexample":"投注方案：和值3；开奖号码后三位：(1)开出003号码，顺序不限，即中后三组选三一等奖；(2)开出012号码，顺序不限，即中后三组选六一等奖",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"组选和值", "no":"1|2|3|4|5|6|7|8|9|10|11|12|13", "place":0, "cols":1},
                {"title":"", "no":"14|15|16|17|18|19|20|21|22|23|24|25|26", "place":0, "cols":1}
            ],
            "isButton"   : false
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 525,
        name:'组选和值',
       /* prize:{1:'600.00',2:'300.00'},
        nfdprize:{},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:68,
        desc:'组选和值',maxcodecount:0
    }]}]},
    {
        isnew:"0",
        isdefault:"0",
        title:"前三",
        childrens:[],
        label:[
            {
            gtitle:'前三直选',
            cid:31,
            label:[{"methoddesc":"从万、千、百位各选一个号码组成一注。",
        "methodhelp":"从万位、千位、百位中选择一个3位数号码组成一注，所选号码与开奖号码的前3位相同，且顺序一致，即为中奖。",
        "methodexample":"投注方案：345； 开奖号码：345，即中前三直选一等奖",
        "selectarea":{"type":"digital","layout":[{"title":"万位", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1},{"title":"千位", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1},{"title":"百位", "no":"0|1|2|3|4|5|6|7|8|9", "place":2, "cols":1}],"noBigIndex":5,"isButton":true},
        "show_str" : "X,X,X,-,-",
        "code_sp"  : "",
        "ifrandom" : 1, // 机选
        "randomcos" : 3,  // 机选
        "randomcosvalue" : "1|1|1",  // 机选
        methodid : 311,
        name:'复式',
       /* prize:{1:'1800.00'},
        nfdprize:{levs:'1940',defaultprize:1800.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:52,
        desc:'复式',maxcodecount:0
    },{"methoddesc":"手动输入号码，至少输入1个三位数号码组成一注。",
        "methodhelp":"手动输入一个3位数号码组成一注，所选号码的万位、千位、百位与开奖号码相同，且顺序一致，即为中奖。",
        "methodexample":"投注方案：345； 开奖号码：345，即中前三直选一等奖",
        "selectarea":{"type":"input"},
        "show_str" : "X",
        "code_sp" : " ",
        methodid : 312,
        name:'单式',
      /*  prize:{1:'1800.00'},
        nfdprize:{levs:'1940',defaultprize:1800.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:53,
        desc:'单式',maxcodecount:0
    },{"methoddesc":"从0-27中任意选择1个或1个以上号码",
        "methodhelp":"所选数值等于开奖号码的万位、千位、百位三个数字相加之和，即为中奖。",
        "methodexample":"投注方案：和值1；开奖号码前三位：001,010,100,即中前三直选一等奖",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"直选和值", "no":"0|1|2|3|4|5|6|7|8|9|10|11|12|13", "place":0, "cols":1},
                {"title":"", "no":"14|15|16|17|18|19|20|21|22|23|24|25|26|27", "place":0, "cols":1}
            ],
            "isButton"   : false
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 313,
        name:'直选和值',
      /*  prize:{1:'1800.00'},
        nfdprize:{levs:'1940',defaultprize:1800.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:54,
        desc:'直选和值',maxcodecount:0
    }]},{
            gtitle:'前三组选',
            cid:32,
            label:[{"methoddesc":"从0-9中任意选择2个或2个以上号码。",
        "methodhelp":"从0-9中选择2个数字组成两注，所选号码与开奖号码的万位、千位、百位相同，且顺序不限，即为中奖。",
        "methodexample":"投注方案：5,8,8；开奖号码前三位：1个5，2个8 (顺序不限)，即中前三组选三一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"组三", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 321,
        name:'组三',
      /*  prize:{1:'600.00'},
        nfdprize:{levs:'646',defaultprize:600.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:60,
        desc:'组三',maxcodecount:0
    },{"methoddesc":"从0-9中任意选择3个或3个以上号码。",
        "methodhelp":"从0-9中任意选择3个号码组成一注，所选号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。",
        "methodexample":"投注方案：2,5,8；开奖号码前三位：1个2、1个5、1个8 (顺序不限)，即中前三组选六一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"组六", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 322,
        name:'组六',
      /*  prize:{2:'300.00'},
        nfdprize:{levs:'323',defaultprize:300.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:61,
        desc:'组六',maxcodecount:0
    },{"methoddesc":"手动输入号码，至少输入1个三位数号码。",
        "methodhelp":"键盘手动输入购买号码，3个数字为一注，开奖号码的万位、千位、百位符合前三组三或组六均为中奖。",
        "methodexample":"投注方案：分別投注(0,0,1),以及(1,2,3)，开奖号码前三位包括：(1)0,0,1，顺序不限，即中得组三一等奖；或者(2)1,2,3，顺序不限，即中得组六一等奖。",
        "selectarea":{"type":"input"},
        "show_str" : "X",
        "code_sp" : " ",
        methodid : 323,
        name:'混合组选',
       /* prize:{1:'600.00',2:'300.00'},
        nfdprize:{},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:62,
        desc:'混合组选',maxcodecount:0
    },{"methoddesc":"从1-26中任意选择1个以上号码。",
        "methodhelp":"所选数值等于开奖号码万位、千位、百位三个数字相加之和，即为中奖。",
        "methodexample":"投注方案：和值3；<br />开奖号码前三位：<br />(1)开出003号码，顺序不限，即中前三组选三一等奖；<br />(2)开出012号码，顺序不限，即中前三组选六一等奖",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"组选和值", "no":"1|2|3|4|5|6|7|8|9|10|11|12|13", "place":0, "cols":1},
                {"title":"", "no":"14|15|16|17|18|19|20|21|22|23|24|25|26", "place":0, "cols":1}
            ],
            "isButton"   : false
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 324,
        name:'组选和值',
      /*  prize:{1:'600.00',2:'300.00'},
        nfdprize:{},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:63,
        desc:'组选和值',maxcodecount:0
    }]}]},
    {
        isnew:"0",
        isdefault:"0",
        title:"中三",
        childrens:[],
        label:[
            {gtitle:'中三直选',
        cid:41,
        label:[{"methoddesc":"从千、百、十位各选一个号码组成一注。",
        "methodhelp":"从千位、百位、十位中选择一个3位数号码组成一注，所选号码与开奖号码的中间3位相同，且顺序一致，即为中奖。",
        "methodexample":"投注方案：456； 开奖号码：3456，即中中三直选一等奖",
        "selectarea":{"type":"digital","layout":[{"title":"千位", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1},{"title":"百位", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1},{"title":"十位", "no":"0|1|2|3|4|5|6|7|8|9", "place":2, "cols":1}],"noBigIndex":5,"isButton":true},
        "show_str" : "-,X,X,X,-",
        "code_sp"  : "",
        "ifrandom" : 1, // 机选
        "randomcos" : 3,  // 机选
        "randomcosvalue" : "1|1|1",  // 机选
        methodid : 411,
        name:'复式',
       /* prize:{1:'1800.00'},
        nfdprize:{levs:'1940',defaultprize:1800.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2227,
        desc:'复式',maxcodecount:0
    },{"methoddesc":"手动输入号码，至少输入1个三位数号码组成一注。",
        "methodhelp":"手动输入一个3位数号码组成一注，所选号码的千位、百位、十位与开奖号码相同，且顺序一致，即为中奖。",
        "methodexample":"投注方案：345； 开奖号码：2345，即中中三直选一等奖",
        "selectarea":{"type":"input"},
        "show_str" : "X",
        "code_sp" : " ",
        methodid : 412,
        name:'单式',
       /* prize:{1:'1800.00'},
        nfdprize:{levs:'1940',defaultprize:1800.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2228,
        desc:'单式',maxcodecount:0
    },{"methoddesc":"从0-27中任意选择1个或1个以上号码",
        "methodhelp":"所选数值等于开奖号码的千位、百位、十位三个数字相加之和，即为中奖。",
        "methodexample":"投注方案：和值1；开奖号码中间三位：01001,00010,00100,即中中三直选一等奖",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"直选和值", "no":"0|1|2|3|4|5|6|7|8|9|10|11|12|13", "place":0, "cols":1},
                {"title":"", "no":"14|15|16|17|18|19|20|21|22|23|24|25|26|27", "place":0, "cols":1}
            ],
            "isButton"   : false
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 413,
        name:'直选和值',
      /*  prize:{1:'1800.00'},
        nfdprize:{levs:'1940',defaultprize:1800.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2229,
        desc:'直选和值',maxcodecount:0
    }]},{
            gtitle:'中三组选',
            cid:42,
            label:[{"methoddesc":"从0-9中任意选择2个或2个以上号码。",
        "methodhelp":"从0-9中选择2个数字组成两注，所选号码与开奖号码的千位、百位、十位相同，且顺序不限，即为中奖。",
        "methodexample":"投注方案：5,8,8；开奖号码中间三位：1个5，2个8 (顺序不限)，即中中三组选三一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"组三", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 421,
        name:'组三',
       /* prize:{1:'600.00'},
        nfdprize:{levs:'646',defaultprize:600.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2231,
        desc:'组三',maxcodecount:0
    },{"methoddesc":"从0-9中任意选择3个或3个以上号码。",
        "methodhelp":"从0-9中任意选择3个号码组成一注，所选号码与开奖号码的千位、百位、十位相同，顺序不限，即为中奖。",
        "methodexample":"投注方案：2,5,8；开奖号码中间三位：1个2、1个5、1个8 (顺序不限)，即中中三组选六一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"组六", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 422,
        name:'组六',
      /*  prize:{2:'300.00'},
        nfdprize:{levs:'323',defaultprize:300.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2232,
        desc:'组六',maxcodecount:0
    },{"methoddesc":"手动输入号码，至少输入1个三位数号码。",
        "methodhelp":"键盘手动输入购买号码，3个数字为一注，开奖号码的千位、百位、十位符合中三组三或组六均为中奖。",
        "methodexample":"投注方案：分別投注(0,0,1),以及(1,2,3)，开奖号码中间三位包括：(1)0,0,1，顺序不限，即中得组三一等奖；或者(2)1,2,3，顺序不限，即中得组六一等奖。",
        "selectarea":{"type":"input"},
        "show_str" : "X",
        "code_sp" : " ",
        methodid : 423,
        name:'混合组选',
      /*  prize:{1:'600.00',2:'300.00'},
        nfdprize:{},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2233,
        desc:'混合组选',maxcodecount:0
    },{"methoddesc":"从0-9中选择1个号码。",
        "methodhelp":"所选数值等于开奖号码千位、百位、十位三个数字相加之和，即为中奖。",
        "methodexample":"投注方案：和值3；开奖号码中间三位：(1)开出003号码，顺序不限，即中中三组选三一等奖；(2)开出012号码，顺序不限，即中中三组选六一等奖",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"组选和值", "no":"1|2|3|4|5|6|7|8|9|10|11|12|13", "place":0, "cols":1},
                {"title":"", "no":"14|15|16|17|18|19|20|21|22|23|24|25|26", "place":0, "cols":1}
            ],
            "isButton"   : false
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 424,
        name:'组选和值',
       /* prize:{1:'600.00',2:'300.00'},
        nfdprize:{},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2234,
        desc:'组选和值',maxcodecount:0
    }]}]},
    {
        isnew:"0",
        isdefault:"0",
        title:"二星",
        childrens:[],
        label:[
            {gtitle:'二星直选',
            cid:61,
            label:[{"methoddesc":"从十、个位各选一个号码组成一注。",
        "methodhelp":"从十位、个位中选择一个2位数号码组成一注，所选号码与开奖号码的十位、个位相同，且顺序一致，即为中奖。",
        "methodexample":"投注方案：58；开奖号码后二位：58，即中后二直选一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"十位", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1},
                {"title":"个位", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "-,-,-,X,X",
        "code_sp" : "",
        "ifrandom" : 1,
        "randomcos" : 2,
        "randomcosvalue" : "1|1",
        methodid : 611,
        name:'后二直选(复式)',
       /* prize:{1:'180.00'},
        nfdprize:{levs:'194',defaultprize:180.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:75,
        desc:'后二(复式)',maxcodecount:0
    },{"methoddesc":"手动输入号码，至少输入1个两位数号码。",
        "methodhelp":"手动输入一个2位数号码组成一注，所选号码的十位、个位与开奖号码相同，且顺序一致，即为中奖。",
        "methodexample":"投注方案：58；开奖号码后二位：58，即中后二直选一等奖。",
        "selectarea":{"type":"input"},
        "show_str" : "X",
        "code_sp" : " ",
        methodid : 612,
        name:'后二直选(单式)',
       /* prize:{1:'180.00'},
        nfdprize:{levs:'194',defaultprize:180.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:446,
        desc:'后二(单式)',maxcodecount:0
    },{"methoddesc":"从万、千位各选一个号码组成一注。",
        "methodhelp":"从万位、千位中选择一个2位数号码组成一注，所选号码与开奖号码的前2位相同，且顺序一致，即为中奖。",
        "methodexample":"投注方案：58；开奖号码前二位：58，即中前二直选一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"万位", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1},
                {"title":"千位", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X,X,-,-,-",
        "code_sp" : "",
        "ifrandom" : 1,
        "randomcos" : 2,
        "randomcosvalue" : "1|1",
        methodid : 614,
        name:'前二直选(复式)',
       /* prize:{1:'180.00'},
        nfdprize:{levs:'194',defaultprize:180.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:73,
        desc:'前二(复式)',maxcodecount:0
    },{"methoddesc":"手动输入号码，至少输入1个两位数号码。",
        "methodhelp":"手动输入一个2位数号码组成一注，所选号码的万位、千位与开奖号码相同，且顺序一致，即为中奖。",
        "methodexample":"投注方案：58；开奖号码前二位：58，即中前二直选一等奖。",
        "selectarea":{"type":"input"},
        "show_str" : "X",
        "code_sp" : " ",
        methodid : 615,
        name:'前二直选(单式)',
       /* prize:{1:'180.00'},
        nfdprize:{levs:'194',defaultprize:180.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:445,
        desc:'前二(单式)',maxcodecount:0
    },{"methoddesc":"从0-18中任意选择1个或1个以上的和值号码。",
        "methodhelp":"所选数值等于开奖号码的十位、个位二个数字相加之和，即为中奖。",
        "methodexample":"投注方案：和值1；开奖号码后二位：01,10，即中后二直选。",
        "selectarea":{
            "type" : "digital",
            "layout" : [ {"title":"", "no":"0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton" : false
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 613,
        name:'后二直选和值',
       /* prize:{1:'180.00'},
        nfdprize:{levs:'194',defaultprize:180.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2215,
        desc:'后二和值',maxcodecount:0
    },{"methoddesc":"从0-18中任意选择1个或1个以上的和值号码。",
        "methodhelp":"所选数值等于开奖号码的万位、千位二个数字相加之和，即为中奖。",
        "methodexample":"投注方案：和值1；开奖号码前二位：01,10，即中前二直选。",
        "selectarea":{
            "type" : "digital",
            "layout" : [ {"title":"", "no":"0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton" : false
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 616,
        name:'前二直选和值',
      /*  prize:{1:'180.00'},
        nfdprize:{levs:'194',defaultprize:180.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2216,
        desc:'前二和值',maxcodecount:0
    }]},{
            gtitle:'二星组选',
            cid:62,
            label:[{"methoddesc":"从0-9中任意选择2个或2个以上号码。",
        "methodhelp":"从0-9中选2个号码组成一注，所选号码与开奖号码的十位、个位相同，顺序不限，即中奖。",
        "methodexample":"投注方案：5,8；开奖号码后二位：1个5，1个8 (顺序不限)，即中后二组选一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"组选", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 621,
        name:'后二组选(复式)',
       /* prize:{1:'90.00'},
        nfdprize:{levs:'97',defaultprize:90.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:442,
        desc:'后二(复式)',maxcodecount:0
    },{"methoddesc":"手动输入号码，至少输入1个两位数号码。",
        "methodhelp":"手动输入一个2位数号码组成一注，所选号码的十位、个位与开奖号码相同，顺序不限，即为中奖。",
        "methodexample":"投注方案：5,8；开奖号码后二位：1个5，1个8 (顺序不限)，即中后二组选一等奖。",
        "selectarea":{"type":"input"},
        "show_str" : "X",
        "code_sp" : " ",
        methodid : 622,
        name:'后二组选(单式)',
      /*  prize:{1:'90.00'},
        nfdprize:{levs:'97',defaultprize:90.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:448,
        desc:'后二(单式)',maxcodecount:0
    },{"methoddesc":"从0-9中任意选择2个或2个以上号码。",
        "methodhelp":"从0-9中选2个号码组成一注，所选号码与开奖号码的万位、千位相同，顺序不限，即中奖。",
        "methodexample":"投注方案：5,8；开奖号码前二位：1个5，1个8 (顺序不限)，即中前二组选一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"组选", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 624,
        name:'前二组选(复式)',
       /* prize:{1:'90.00'},
        nfdprize:{levs:'97',defaultprize:90.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:439,
        desc:'前二(复式)',maxcodecount:0
    },{"methoddesc":"手动输入号码，至少输入1个两位数号码。",
        "methodhelp":"手动输入一个2位数号码组成一注，所选号码的万位、千位与开奖号码相同，顺序不限，即为中奖。",
        "methodexample":"投注方案：5,8；开奖号码前二位：1个5，1个8 (顺序不限)，即中前二组选一等奖。",
        "selectarea":{"type":"input"},
        "show_str" : "X",
        "code_sp" : " ",
        methodid : 625,
        name:'前二组选(单式)',
     /*   prize:{1:'90.00'},
        nfdprize:{levs:'97',defaultprize:90.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:447,
        desc:'前二(单式)',maxcodecount:0
    },{"methoddesc":"从1-17中任意选择1个或1个以上的和值号码。",
        "methodhelp":"所选数值等于开奖号码的十位、个位二个数字相加之和（不含对子号），即为中奖。",
        "methodexample":"投注方案：和值1；开奖号码后二位：10或01(顺序不限，不含对子号)，即中后二组选。",
        "selectarea":{
            "type" : "digital",
            "layout" : [ {"title":"", "no":"1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton" : false
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 623,
        name:'后二组选和值',
       /* prize:{1:'90.00'},
        nfdprize:{levs:'97',defaultprize:90.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2218,
        desc:'后二和值',maxcodecount:0
    },{"methoddesc":"从1-17中任意选择1个或1个以上号码",
        "methodhelp":"所选数值等于开奖号码的万位、千位二个数字相加之和（不含对子号），即为中奖。",
        "methodexample":"投注方案：和值1；开奖号码前二位：10或01 (顺序不限，不含对子号)，即中前二组选。",
        "selectarea":{
            "type" : "digital",
            "layout" : [ {"title":"", "no":"1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton" : false
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 626,
        name:'前二组选和值',
       /* prize:{1:'90.00'},
        nfdprize:{levs:'97',defaultprize:90.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2217,
        desc:'前二和值',maxcodecount:0
    }]}]},
    {
        isnew:"0",
        isdefault:"0",
        title:"定位胆",
        childrens:[],
        label:[
            {gtitle:'定位胆',
            cid:71,
            label:[{"methoddesc":"在万位，千位，百位，十位，个位任意位置上任意选择1个或1个以上号码。",
        "methodhelp":"从万位、千位、百位、十位、个位任意位置上至少选择1个以上号码，所选号码与相同位置上的开奖号码一致，即为中奖。",
        "methodexample":"投注方案：1；开奖号码万位：1，即中定位胆万位一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"万位", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1},
                {"title":"千位", "no":"0|1|2|3|4|5|6|7|8|9", "place":1, "cols":1},
                {"title":"百位", "no":"0|1|2|3|4|5|6|7|8|9", "place":2, "cols":1},
                {"title":"十位", "no":"0|1|2|3|4|5|6|7|8|9", "place":3, "cols":1},
                {"title":"个位", "no":"0|1|2|3|4|5|6|7|8|9", "place":4, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X,X,X,X,X",
        "code_sp" : "",
        methodid : 711,
        name:'定位胆',
       /* prize:{1:'18.00'},
        nfdprize:{levs:'19.4',defaultprize:18.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:78,
        desc:'定位胆',maxcodecount:0
    }]}]},
    {
        isnew:"0",
        isdefault:"0",
        title:"不定位",
        childrens:[],
        label:[
            {
            gtitle:'三星不定胆',
            cid:81,
            label:[{"methoddesc":"从0-9中任意选择1个以上号码。",
        "methodhelp":"从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。",
        "methodexample":"投注方案：1；开奖号码后三位：至少出现1个1，即中后三一码不定位一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"不定胆", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 811,
        name:'后三一码不定胆',
       /* prize:{1:'6.60'},
        nfdprize:{levs:'7.1',defaultprize:6.60,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:451,
        desc:'后三一码不定胆',maxcodecount:0
    },{"methoddesc":"从0-9中任意选择2个以上号码。",
        "methodhelp":"从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的百位、十位、个位中同时包含所选的2个号码，即为中奖。",
        "methodexample":"投注方案：1,2；开奖号码后三位：至少出现1和2各1个，即中后三二码不定位一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"不定胆", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 812,
        name:'后三二码不定胆',
      /*  prize:{1:'33.00'},
        nfdprize:{levs:'35.9',defaultprize:33.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:452,
        desc:'后三二码不定胆',maxcodecount:0
    },{"methoddesc":"从0-9中任意选择1个以上号码。",
        "methodhelp":"从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。",
        "methodexample":"投注方案：1；开奖号码前三位：至少出现1个1，即中前三一码不定位一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"不定胆", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 813,  // 没有找到相应的玩法数据 2017 0930
        name:'前三一码不定胆',
       /* prize:{1:'6.60'},
        nfdprize:{levs:'7.1',defaultprize:6.60,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:70,
        desc:'前三一码不定胆',maxcodecount:0
    },{"methoddesc":"从0-9中任意选择2个以上号码。",
        "methodhelp":"从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位中同时包含所选的2个号码，即为中奖。",
        "methodexample":"投注方案：1,2；开奖号码前三位：至少出现1和2各1个，即中前三二码不定位一等奖。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"不定胆", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 814,
        name:'前三二码不定胆',
       /* prize:{1:'33.00'},
        nfdprize:{levs:'35.9',defaultprize:33.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:71,
        desc:'前三二码不定胆',maxcodecount:0
    }]}]},
    {
        isnew:"0",
        isdefault:"0",
        title:"大小单双",
        childrens:[],
        label:[
            {gtitle:'大小单双',
            cid:91,
            label:[{"methoddesc":"从总和的“大、小、单、双”中至少选一个成一注。",
        "methodhelp":"对个位至万位的总和的“大（23以上，包括23）小（22以下，包括22））、单（奇数）双（偶数）”形态进行购买，所选号码的位形态与开奖号码的形态相同，即为中奖。",
        "methodexample":"投注方案:大，开奖号码67895(6+7+8+9+5=35)，即中比大小一等奖。投注方案:单，开奖号码12345(1+2+3+4+5=15)，即中比单双一等奖。",
        "selectarea":{
            "type":"dxds",
            "layout": [{"title":"总和", "no":"大|小|单|双", "place":0, "cols":1}]
        },
        "show_str" : "X",
        "code_sp" : "",
        methodid : 913,
        name:'总和',
      /*  prize:{1:'3.60'},
        nfdprize:{levs:'3.88',defaultprize:3.60,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:322379,
        desc:'总和大小单双',maxcodecount:0
    },{"methoddesc":"从十位、个位中的“大、小、单、双”中至少各选一个组成一注。",
        "methodhelp":"对十位和个位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。",
        "methodexample":"投注方案：大单；开奖号码十位与个位：大单，即中后二大小单双一等奖。",
        "selectarea":{
            "type":"dxds",
            "layout": [{"title":"十位", "no":"大|小|单|双", "place":0, "cols":1},
                {"title":"个位", "no":"大|小|单|双", "place":1, "cols":1}]
        },
        "show_str" : "X,X",
        "code_sp" : "",
        methodid : 911,
        name:'后二',
       /* prize:{1:'7.20'},
        nfdprize:{levs:'7.7',defaultprize:7.20,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:81,
        desc:'后二大小单双',maxcodecount:0
    },{"methoddesc":"从万位、千位中的“大、小、单、双”中至少各选一个组成一注。",
        "methodhelp":"对百位、十位和个位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。",
        "methodexample":"投注方案：小双；开奖号码万位与千位：小双，即中前二大小单双一等奖。",
        "selectarea":{
            "type":"dxds",
            "layout": [{"title":"万位", "no":"大|小|单|双", "place":0, "cols":1},
                {"title":"千位", "no":"大|小|单|双", "place":1, "cols":1}]
        },
        "show_str" : "X,X",
        "code_sp" : "",
        methodid : 912,
        name:'前二',
       /* prize:{1:'7.20'},
        nfdprize:{levs:'7.7',defaultprize:7.20,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:80,
        desc:'前二大小单双',maxcodecount:0
    }]}]},
    {
        isnew:"0",
        isdefault:"0",
        title:"趣味",
        childrens:[],
        label:[
            {gtitle:'特殊',
            cid:100 ,
            label:[{"methoddesc":"从0-9中任意选择1个以上号码。",
        "methodhelp":"从0-9中任意选择1个号码组成一注，只要开奖号码的万位、千位、百位、十位、个位中包含所选号码，即为中奖。",
        "methodexample":"投注方案：8；开奖号码：至少出现1个8，即中一帆风顺。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 101,
        name:'一帆风顺',
       /* prize:{1:'4.30'},
        nfdprize:{levs:'4.6',defaultprize:4.30,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2220,
        desc:'一帆风顺',maxcodecount:0
    },{"methoddesc":"从0-9中任意选择1个以上的二重号码。",
        "methodhelp":"从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现2次，即为中奖。",
        "methodexample":"投注方案：8；开奖号码：至少出现2个8，即中好事成双。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 102,
        name:'好事成双',
      /*  prize:{2:'22.00'},
        nfdprize:{levs:'23.7',defaultprize:22.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2221,
        desc:'好事成双',maxcodecount:0
    },{"methoddesc":"从0-9中任意选择1个以上的三重号码。",
        "methodhelp":"从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现3次，即为中奖。",
        "methodexample":"投注方案：8；开奖号码：至少出现3个8，即中三星报喜。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 103,
        name:'三星报喜',
       /* prize:{3:'210.00'},
        nfdprize:{levs:'226.3',defaultprize:210.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2222,
        desc:'三星报喜',maxcodecount:0
    },{"methoddesc":"从0-9中任意选择1个以上的四重号码。",
        "methodhelp":"从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现4次，即为中奖。",
        "methodexample":"投注方案：8；开奖号码：至少出现4个8，即中四季发财。",
        "selectarea":{
            "type"   : "digital",
            "layout" : [
                {"title":"", "no":"0|1|2|3|4|5|6|7|8|9", "place":0, "cols":1}
            ],
            "noBigIndex" : 5,
            "isButton"   : true
        },
        "show_str" : "X",
        "code_sp" : ",",
        methodid : 104,
        name:'四季发财',
      /*  prize:{4:'3900.00'},
        nfdprize:{levs:'4203',defaultprize:3900.00,userdiffpoint:7},*/
        modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
        menuid:2223,
        desc:'四季发财',maxcodecount:0
    }]}]},
    /* 以下游戏目前没有 */
    /* {
     isnew:"0",isdefault:"0",title:"任选二", label:[{gtitle:'任二直选', label:[{methoddesc:'从万位、千位、百位、十位、个位中至少两位上各选1个号码组成1注',
     methodhelp:'从任意两个以上的位置中选择一个号码，所选号码与开奖号码对应位置出现的号码相同，且顺序一致，即为中奖。',
     methodexample:'投注方案：万位1，百位2；<br />开奖号码：13245，<br />即中任选二直选一等奖',
     selectarea:{
     type : 'digital',
     layout : [
     {title:'万位', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1},
     {title:'千位', no:'0|1|2|3|4|5|6|7|8|9', place:1, cols:1},
     {title:'百位', no:'0|1|2|3|4|5|6|7|8|9', place:2, cols:1},
     {title:'十位', no:'0|1|2|3|4|5|6|7|8|9', place:3, cols:1},
     {title:'个位', no:'0|1|2|3|4|5|6|7|8|9', place:4, cols:1}
     ],
     noBigIndex : 5,
     isButton : true
     },
     show_str : 'X,X,X,X,X',
     code_sp : '',
     methodid : 1010101,
     name:'直选复式',
     prize:{1:'180.00'},
     nfdprize:{levs:'194',defaultprize:180.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101101,
     desc:'直选复式',maxcodecount:0
     },{methoddesc : '从万位、千位、百位、十位、个位中至少选择两个位置,至少手动输入一个两位数的号码构成一注。',
     methodhelp : '从万位、千位、百位、十位、个位中至少选择两个位置,至少手动输入一个两位数的号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序一致，即为中奖。',
     methodexample : '投注方案：位置选择万位、百位，输入号码58,开奖号码：51812，即中任二直选(单式)。',
     selectarea : {
     type : 'input',
     'selPosition' : 'true'
     },
     show_str : 'X',
     code_sp : ',',
     "defaultposition":"00011",
     methodid : 1010111,
     name:'直选单式',
     prize:{1:'180.00'},
     nfdprize:{levs:'194',defaultprize:180.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101102,
     desc:'直选单式',maxcodecount:0
     },{methoddesc : '从万位、千位、百位、十位、个位中至少选择两个位置,至少选择一个和值号码构成一注。',
     methodhelp : '从万位、千位、百位、十位、个位中至少选择两个位置,至少选择一个和值号码构成一注，所选号码与开奖号码的和值相同，即为中奖。',
     methodexample : '投注方案：位置选择万位、百位，选择和值号码13<br>开奖号码：51812，即中任二直选(单式)。',
     selectarea : {
     type : 'digital',
     layout : [{
     title : '和值',
     no : '0|1|2|3|4|5|6|7|8|9',
     place : 0,
     cols : 1
     }, {
     title : '',
     no : '10|11|12|13|14|15|16|17|18',
     place : 0,
     cols : 1
     }
     ],
     isButton : false,
     'selPosition' : 'true'
     },
     show_str : 'X',
     code_sp : ',',
     "defaultposition":"00011",
     methodid : 1010121,
     name:'直选和值',
     prize:{1:'180.00'},
     nfdprize:{levs:'194',defaultprize:180.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101103,
     desc:'直选和值',maxcodecount:0
     }]},{gtitle:'任二组选', label:[{methoddesc:'从0-9中任意选择2个或2个以上号码。',
     methodhelp:'从0-9中选2个号码组成一注，所选号码出现在开奖号的对应位上，顺序不限，即中奖。',
     methodexample:'投注方案：万位5,百8；开奖号码位5*8**或者8*5** (顺序不限)，即中任选二组选一等奖。',
     selectarea:{
     type : 'digital',
     layout : [
     {title:'组选', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton : true,
     'selPosition': 'true'
     },
     show_str : 'X',
     code_sp : ',',
     "defaultposition":"00011",
     methodid : 1010201,
     name:'组选复式',
     prize:{1:'90.00'},
     nfdprize:{levs:'97',defaultprize:90.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101201,
     desc:'组选复式',maxcodecount:0
     },{methoddesc : '从万位、千位、百位、十位、个位中至少选择两个位置,至少手动输入一个两位数的号码构成一注。',
     methodhelp : '从万位、千位、百位、十位、个位中至少选择两个位置,至少手动输入一个两位数的号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。',
     methodexample : '投注方案：位置选择万位、百位，输入号码85<br>开奖号码：51812或者81512，即中任二组选(单式)。',
     selectarea : {
     type : 'input',
     'selPosition' : 'true'
     },
     show_str : 'X',
     code_sp : ',',
     "defaultposition":"00011",
     methodid : 1010211,
     name:'组选单式',
     prize:{1:'90.00'},
     nfdprize:{levs:'97',defaultprize:90.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101202,
     desc:'组选单式',maxcodecount:0
     },{methoddesc : '从万位、千位、百位、十位、个位中至少选择两个位置,至少选择一个和值号码构成一注。',
     methodhelp : '从万位、千位、百位、十位、个位中至少选择两个位置,至少选择一个和值号码构成一注，所选号码与开奖号码的和值相同，即为中奖。',
     methodexample : '投注方案：位置选择万位、百位，选择和值号码13<br>开奖号码：51812，即中任二组选和值。',
     selectarea : {
     type : 'digital',
     layout : [

     {title:'和值',no:'1|2|3|4|5|6|7|8|9',place:0,cols:1},
     {title:'',no:'10|11|12|13|14|15|16|17',place:0,cols:1}
     ],
     noBigIndex : 5,
     'selPosition' : 'true',
     isButton : false
     },
     show_str : 'X',
     code_sp : ',',
     "defaultposition":"00011",
     methodid : 1010221,
     name:'组选和值',
     prize:{1:'90.00'},
     nfdprize:{levs:'97',defaultprize:90.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101203,
     desc:'组选和值',maxcodecount:0
     }]}]},
     {
     isnew:"0",isdefault:"0",title:"任选三", label:[{gtitle:'任三直选', label:[{"methoddesc":"从万位、千位、百位、十位、个位中至少三位上各选1个号码组成一注。",
     "methodhelp":"从万位、千位、百位、十位、个位中至少三位上各选1个号码组成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序一致，即为中奖。",
     "methodexample":"投注方案：万位5，百8,个位2<br/>开奖号码：51812，即中任三直选。",
     "selectarea":{
     "type":"digital",
     "layout":[
     { "title": "万位", "no": "0|1|2|3|4|5|6|7|8|9", "place": 0, "cols": 1},
     { "title": "千位", "no": "0|1|2|3|4|5|6|7|8|9", "place": 1, "cols": 1},
     { "title": "百位", "no": "0|1|2|3|4|5|6|7|8|9", "place": 2, "cols": 1},
     { "title": "十位", "no": "0|1|2|3|4|5|6|7|8|9", "place": 3, "cols": 1},
     { "title": "个位", "no": "0|1|2|3|4|5|6|7|8|9", "place": 4, "cols": 1}
     ],
     "noBigIndex": 5,
     "isButton": true
     },
     "show_str": "X,X,X,X,X",
     "code_sp": "",
     methodid : 1010301,
     name:'直选复式',
     prize:{1:'1800.00'},
     nfdprize:{levs:'1940',defaultprize:1800.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101301,
     desc:'直选复式',maxcodecount:0
     },{"methoddesc": "从万位、千位、百位、十位、个位中至少选择三个位置,至少手动输入一个三位数的号码构成一注。",
     "methodhelp": "从万位、千位、百位、十位、个位中至少选择三个位置,至少手动输入一个三位数的号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序一致，即为中奖。",
     "methodexample": "投注方案：位置选择万位、百位,个位，输入号码582<br>开奖号码：51812，即中任三直选(单式)。",
     "selectarea":{ "type":"input","selPosition": "true"},
     "show_str":"X",
     "code_sp":" ",
     "defaultposition":"00111",
     methodid : 1010311,
     name:'直选单式',
     prize:{1:'1800.00'},
     nfdprize:{levs:'1940',defaultprize:1800.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101302,
     desc:'直选单式',maxcodecount:0
     },{"methoddesc": "从万位、千位、百位、十位、个位中至少选择三个位置,至少选择一个和值号码构成一注。",
     "methodhelp": "从万位、千位、百位、十位、个位中至少选择三个位置,至少选择一个和值号码构成一注，所选号码与开奖号码的和值相同，即为中奖。",
     "methodexample": "投注方案：位置选择万位、百位、个位，选择和值号码15<br>开奖号码：51812，即中任二直选(单式)。",
     "selectarea": {
     "type": "digital",
     "layout": [
     { "title": "和值", "no": "0|1|2|3|4|5|6|7|8|9|10|11|12|13", "place": 0, "cols": 1 },
     { "title": "", "no": "14|15|16|17|18|19|20|21|22|23|24|25|26|27", "place": 0, "cols": 1 }
     ],
     "isButton": false,
     "selPosition": "true"
     },
     "show_str": "X",
     "code_sp": ",",
     "defaultposition": "00111",
     methodid : 1010321,
     name:'直选和值',
     prize:{1:'1800.00'},
     nfdprize:{levs:'1940',defaultprize:1800.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101303,
     desc:'直选和值',maxcodecount:0
     }]},{gtitle:'任三组选', label:[{"methoddesc": "从万位、千位、百位、十位、个位中至少选择三个位置,号码区至少选择两个号码构成一注。",
     "methodhelp": "从万位、千位、百位、十位、个位中至少选择三个位置,号码区至少选择两个号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。",
     "methodexample": "投注方案：选择位置万位、十位、个位,选择号码12<br>开奖号码：11812，即中任三组三。",
     "selectarea": {
     "type": "digital",
     "layout": [
     { "title": "组三", "no": "0|1|2|3|4|5|6|7|8|9", "place": 0, "cols": 1 }
     ],
     "noBigIndex": 5,
     "isButton": true,
     "selPosition": "true"
     },
     "show_str": "X",
     "code_sp": "",
     "defaultposition": "00111",
     methodid : 1010401,
     name:'组三',
     prize:{1:'600.00'},
     nfdprize:{levs:'646',defaultprize:600.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101401,
     desc:'组三',maxcodecount:0
     },{"methoddesc": "从万位、千位、百位、十位、个位中至少选择三个位置,号码区至少选择三个号码构成一注。",
     "methodhelp": "从万位、千位、百位、十位、个位中至少选择三个位置,号码区至少选择三个号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。",
     "methodexample": "投注方案：选择位置万位、十位、个位,选择号码512<br>开奖号码：51812，即中任三组六。",
     "selectarea": {
     "type": "digital",
     "layout": [
     { "title": "组六", "no": "0|1|2|3|4|5|6|7|8|9", "place": 0, "cols": 1 }
     ],
     "noBigIndex": 5,
     "isButton": true,
     "selPosition": "true"
     },
     "show_str": "X",
     "code_sp": "",
     "defaultposition": "00111",
     methodid : 1010411,
     name:'组六',
     prize:{2:'300.00'},
     nfdprize:{levs:'323',defaultprize:300.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101402,
     desc:'组六',maxcodecount:0
     },{            "methoddesc": "从万位、千位、百位、十位、个位中至少选择三个位置,手动至少输入三个号码构成一注(不包含豹子号)。",
     "methodhelp": "从万位、千位、百位、十位、个位中至少选择三个位置,手动至少输入三个号码构成一注(不包含豹子号)，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。",
     "methodexample": "投注方案：选择位置万位、十位、个位,输入号码512<br>开奖号码：51812，即中任三混合组选。",
     "selectarea": { "type": "input", "selPosition": "true" },
     "show_str": "X",
     "code_sp": " ",
     "defaultposition": "00111",
     methodid : 1010421,
     name:'混合组选',
     prize:{1:'600.00',2:'300.00'},
     nfdprize:{},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101403,
     desc:'混合组选',maxcodecount:0
     },{"methoddesc": "从万位、千位、百位、十位、个位中至少选择三个位置,至少选择一个和值号码构成一注。",
     "methodhelp": "从万位、千位、百位、十位、个位中至少选择两个位置,至少选择一个和值号码构成一注，所选号码与开奖号码的和值(不包含豹子号)相同，即为中奖。",
     "methodexample": "投注方案：选择位置万位、十位、个位,选择和值号码8<br>开奖号码：51812，即中任三组选和值。",
     "selectarea": {
     "type": "digital",
     "layout": [
     { "title": "和值", "no": "1|2|3|4|5|6|7|8|9|10|11|12|13", "place": 0, "cols": 1 },
     { "title": "", "no": "14|15|16|17|18|19|20|21|22|23|24|25|26", "place": 0, "cols": 1 }
     ],
     "noBigIndex": 5,
     "isButton": false,
     "selPosition": "true"
     },
     "show_str": "X",
     "code_sp": ",",
     "defaultposition": "00111",
     methodid : 1010431,
     name:'组选和值',
     prize:{1:'600.00',2:'300.00'},
     nfdprize:{},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101404,
     desc:'组选和值',maxcodecount:0
     }]}]},
     {
     isnew:"0",isdefault:"0",title:"任选四", label:[{gtitle:'任四直选', label:[{"methoddesc":"从万位、千位、百位、十位、个位中至少四位上各选1个号码组成一注。",
     "methodhelp":"从万位、千位、百位、十位、个位中至少四位上各选1个号码组成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序一致，即为中奖。",
     "methodexample":"投注方案：万位5，千位1,百位8,十位1<br>开奖号码：51812，即中任四直选。",
     "selectarea": {
     "type":"digital",
     "layout": [
     { "title": "万位", "no": "0|1|2|3|4|5|6|7|8|9", "place": 0, "cols": 1},
     { "title": "千位", "no": "0|1|2|3|4|5|6|7|8|9", "place": 1, "cols": 1},
     { "title": "百位", "no": "0|1|2|3|4|5|6|7|8|9", "place": 2, "cols": 1},
     { "title": "十位", "no": "0|1|2|3|4|5|6|7|8|9", "place": 3, "cols": 1},
     { "title": "个位", "no": "0|1|2|3|4|5|6|7|8|9", "place": 4, "cols": 1}
     ],
     "noBigIndex":5,
     "isButton":true
     },
     "show_str": "X,X,X,X,X",
     "code_sp": "",
     methodid : 1010501,
     name:'直选复式',
     prize:{1:'18000.00'},
     nfdprize:{levs:'19400',defaultprize:18000.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101501,
     desc:'直选复式',maxcodecount:0
     },{"methoddesc": "从万位、千位、百位、十位、个位中至少选择四个位置,至少手动输入一个四位数的号码构成一注。",
     "methodhelp": "从万位、千位、百位、十位、个位中至少选择四个位置,至少手动输入一个四位数的号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序一致，即为中奖。",
     "methodexample": "投注方案：选择万位、千位、百位、十位，输入号码5181<br>开奖号码：51812，即中任四直选(单式)。",
     "selectarea": {
     "type": "input",
     "selPosition": "true"
     },
     "show_str": "X",
     "code_sp": "",
     "defaultposition": "01111",
     methodid : 1010506,
     name:'直选单式',
     prize:{1:'18000.00'},
     nfdprize:{levs:'19400',defaultprize:18000.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101502,
     desc:'直选单式',maxcodecount:0
     }]},{gtitle:'任四组选', label:[{"methoddesc": "从万位、千位、百位、十位、个位中至少选择四个位置,号码区至少选择四个号码构成一注。",
     "methodhelp": "从万位、千位、百位、十位、个位中至少选择四个位置,号码区至少选择四个号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。",
     "methodexample": "投注方案：位置选择千位、百位、十位、个位,号码选择0568<br>开奖号码：10568(指定位置号码顺序不限)，即可中任四组选24。",
     "selectarea": {
     "type": "digital",
     "layout": [{"title": "组选24","no": "0|1|2|3|4|5|6|7|8|9","place": 0,"cols": 1,"minchosen": 4}],
     "noBigIndex": 5,
     "isButton": true,
     "selPosition": "true"
     },
     "show_str": "X",
     "code_sp": ",",
     "defaultposition": "01111",
     methodid : 1010601,
     name:'组选24',
     prize:{1:'750.00'},
     nfdprize:{levs:'808',defaultprize:750.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101601,
     desc:'组选24',maxcodecount:0
     },{"methoddesc": "从万位、千位、百位、十位、个位中至少选择四个位置,从“二重号”选择一个号码，“单号”中选择两个号码组成一注。",
     "methodhelp": "从万位、千位、百位、十位、个位中至少选择四个位置,从“二重号”选择一个号码，“单号”中选择两个号码组成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。",
     "methodexample": "投注方案：位置选择千位、百位、十位、个位,二重号：8；单号：06<br>开奖号码：10688(指定位置号码顺序不限)，即可中任四组选12。",
     "selectarea": {
     "type": "digital",
     "layout": [
     {"title": "二重号","no": "0|1|2|3|4|5|6|7|8|9","place": 0,"cols": 1,"minchosen": 1},
     {"title": "单　号","no": "0|1|2|3|4|5|6|7|8|9","place": 1,"cols": 1,"minchosen": 2}
     ],
     "noBigIndex": 5,
     "isButton": true,
     "selPosition": "true"
     },
     "show_str": "X,X",
     "code_sp": "",
     "defaultposition": "01111",
     methodid : 1010606,
     name:'组选12',
     prize:{2:'1500.00'},
     nfdprize:{levs:'1616',defaultprize:1500.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101602,
     desc:'组选12',maxcodecount:0
     },{"methoddesc": "从万位、千位、百位、十位、个位中至少选择四个位置,从“二重号”中选择两个号码组成一注。",
     "methodhelp": "从万位、千位、百位、十位、个位中至少选择四个位置,从“二重号”中选择两个号码组成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。",
     "methodexample": "投注方案：位置选择千位、百位、十位、个位,二重号：28<br>开奖号码：12288(指定位置号码顺序不限)，即可中任四组选6。",
     "selectarea": {
     "type": "digital",
     "layout": [
     {"title": "二重号","no": "0|1|2|3|4|5|6|7|8|9","place": 0,"cols": 1,"minchosen": 2}
     ],
     "noBigIndex": 5,
     "isButton": true,
     "selPosition": "true"
     },
     "show_str": "X",
     "code_sp": ",",
     "defaultposition": "01111",
     methodid : 1010611,
     name:'组选6',
     prize:{3:'3000.00'},
     nfdprize:{levs:'3233',defaultprize:3000.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101603,
     desc:'组选6',maxcodecount:0
     },{"methoddesc": "从万、千、百、十、个位中至少选择四位，从“三重号”中选择一个号码，“单号”中选择一个号码组成一注。",
     "methodhelp": "从万位、千位、百位、十位、个位中至少选择四个位置,从“三重号”中选择一个号码，“单号”中选择一个号码组成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。",
     "methodexample": "投注方案：位置选择千位、百位、十位、个位,三重号：8；单号：2<br>开奖号码：18828(指定位置号码顺序不限)，即可中任四组选4。",
     "selectarea": {
     "type": "digital",
     "layout": [
     { "title": "三重号", "no": "0|1|2|3|4|5|6|7|8|9", "place": 0, "cols": 1, "minchosen": 1},
     { "title": "单　号", "no": "0|1|2|3|4|5|6|7|8|9", "place": 1, "cols": 1, "minchosen": 1}
     ],
     "noBigIndex": 5,
     "isButton": true,
     "selPosition": "true"
     },
     "show_str": "X,X",
     "code_sp": "",
     "defaultposition": "01111",
     methodid : 1010616,
     name:'组选4',
     prize:{4:'4500.00'},
     nfdprize:{levs:'4850',defaultprize:4500.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:101604,
     desc:'组选4',maxcodecount:0
     }]}]},
     {
     isnew:"0",isdefault:"0",title:"直选跨度", label:[{gtitle:'二码跨度', label:[{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'所选数值等于开奖号码的前两位最大与最小数字相减之差，即为中奖。',
     methodexample:'投注跨度号码2，开奖：1.3.x.x.x（不限顺序），【3-1=2】即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'前二跨度', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150770,
     name:'前二跨度',
     prize:{1:'180.00'},
     nfdprize:{levs:'194.0',defaultprize:180.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:322382,
     desc:'前二跨度',maxcodecount:0
     },{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'所选数值等于开奖号码的后两位最大与最小数字相减之差，即为中奖。',
     methodexample:'投注跨度号码1，开奖：x.x.x.4.3（不限顺序），【4-3=1】即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'后二跨度', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150771,
     name:'后二跨度',
     prize:{1:'180.00'},
     nfdprize:{levs:'194.0',defaultprize:180.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:322383,
     desc:'后二跨度',maxcodecount:0
     }]},{gtitle:'三码跨度', label:[{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'所选数值等于开奖号码的前三位最大与最小数字相减之差，即为中奖。',
     methodexample:'投注跨度号码2，开奖：1.3.2.x.x（不限顺序），【3-1=2】即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'前三跨度', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150772,
     name:'前三跨度',
     prize:{1:'1800.00'},
     nfdprize:{levs:'1940.00',defaultprize:1800.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:322384,
     desc:'前三跨度',maxcodecount:0
     },{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'所选数值等于开奖号码的中三位最大与最小数字相减之差，即为中奖。',
     methodexample:'投注跨度号码2，开奖；x.3.2.4.x（不限顺序），【4-2=2】即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'中三跨度', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150773,
     name:'中三跨度',
     prize:{1:'1800.00'},
     nfdprize:{levs:'1940.00',defaultprize:1800.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:322385,
     desc:'中三跨度',maxcodecount:0
     },{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'所选数值等于开奖号码的后三位最大与最小数字相减之差，即为中奖。',
     methodexample:'投注跨度号码3，开奖；x.x.2.4.5（不限顺序），【5-2=3】即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'后三跨度', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150774,
     name:'后三跨度',
     prize:{1:'1800.00'},
     nfdprize:{levs:'1940.00',defaultprize:1800.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:322386,
     desc:'后三跨度',maxcodecount:0
     }]}]},
     {
     isnew:"0",isdefault:"0",title:"组选包胆", label:[{gtitle:'组选包胆', label:[{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'从0-9中任意选择1个包胆号码，开奖号码的前三位中任意1位与所选包胆号码相同(不含豹子号)，即为中奖。',
     methodexample:'投注包胆号码3：开奖号码前三位：(1)出现3xx或者33x，即中前三组三，(2)出现3xy，即中前三组六。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'组选包胆', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150775,
     name:'前三包胆',
     prize:{1:'600.00',2:'300.00'},
     nfdprize:{},
     modes:[{modeid:1,name:'元',rate:1}],
     menuid:322388,
     desc:'前三包胆',maxcodecount:0
     },{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'从0-9中任意选择1个包胆号码，开奖号码的中三位中任意1位与所选包胆号码相同(不含豹子号)，即为中奖。',
     methodexample:'投注包胆号码3：开奖号码中三位：(1)出现3xx或者33x，即中中三组三，(2)出现3xy，即中中三组六。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'组选包胆', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150776,
     name:'中三包胆',
     prize:{1:'600.00',2:'300.00'},
     nfdprize:{},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:322389,
     desc:'中三包胆',maxcodecount:0
     },{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'从0-9中任意选择1个包胆号码，开奖号码的后三位中任意1位与所选包胆号码相同(不含豹子号)，即为中奖。',
     methodexample:'投注包胆号码3：开奖号码后三位：(1)出现3xx或者33x，即中后三组三，(2)出现3xy，即中后三组六。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'组选包胆', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150777,
     name:'后三包胆',
     prize:{1:'600.00',2:'300.00'},
     nfdprize:{},
     modes:[{modeid:1,name:'元',rate:1}],
     menuid:322390,
     desc:'后三包胆',maxcodecount:0
     }]}]},
     {
     isnew:"0",isdefault:"0",title:"和值尾数", label:[{gtitle:'和值尾数', label:[{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'从0-9中任意选择1个和值尾数号码，开奖号码的前三位和值尾数与投注号码相同，即为中奖。',
     methodexample:'投注和值尾数8，开奖9.3.6.x.x，【9+3+6=18】和值尾数为8，即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'和值尾数', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150780,
     name:'前三和值尾数',
     prize:{1:'18.00'},
     nfdprize:{levs:'19.40',defaultprize:18.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1}],
     menuid:322392,
     desc:'前三和值尾数',maxcodecount:0
     },{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'从0-9中任意选择1个和值尾数号码，开奖号码的中三位和值尾数与投注号码相同，即为中奖。',
     methodexample:'投注和值尾数8，开奖x.9.3.6.x，【9+3+6=18】和值尾数为8，即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'和值尾数', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150781,
     name:'中三和值尾数',
     prize:{1:'18.00'},
     nfdprize:{levs:'19.40',defaultprize:18.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1}],
     menuid:322393,
     desc:'中三和值尾数',maxcodecount:0
     },{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'从0-9中任意选择1个和值尾数号码，开奖号码的后三位和值尾数与投注号码相同，即为中奖。',
     methodexample:'投注和值尾数8，开奖x.x.9.3.6，【9+3+6=18】和值尾数为8，即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'和值尾数', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150782,
     name:'后三和值尾数',
     prize:{1:'18.00'},
     nfdprize:{levs:'19.40',defaultprize:18.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1}],
     menuid:322394,
     desc:'后三和值尾数',maxcodecount:0
     }]}]},
     {
     isnew:"0",isdefault:"0",title:"龙虎斗", label:[{gtitle:'龙虎', label:[{"methoddesc":"青龙【万位】 PK 白虎【个位】，从龙虎的“龙、虎、和”中至少选一个成一注。",
     "methodhelp":"从龙虎中任意选择1个龙、虎、和，开奖号码的万位比个位号码大，中龙，反之中虎，相等中和。",
     "methodexample":"投注【青龙】，开奖号码的万位比个位号码大，即为中奖，反之则为不中奖。",
     "selectarea":{
     "type":"dxds",
     "layout": [{"title":"龙虎", "no":"龙|虎|和", "place":0, "cols":1}]
     },
     "show_str" : "X",
     "code_sp" : "",
     methodid : 6150784,
     name:'龙虎斗',
     prize:{1:'4.00',2:'18.00'},
     nfdprize:{},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:322396,
     desc:'龙虎斗',maxcodecount:0
     },{"methoddesc":"玄武【千位】 PK 麒麟【十位】，从玄麟的“玄、麟、和”中至少选一个成一注。",
     "methodhelp":"从玄麟中任意选择1个玄、麟、和，开奖号码千位比十位号码大，中玄武，反之中麒麟，相等中和。",
     "methodexample":"投注【玄武】，开奖号码千位比十位号码大，即为中奖，反之则为不中奖。",
     "selectarea":{
     "type":"dxds",
     "layout": [{"title":"玄麟", "no":"玄|麟|和", "place":0, "cols":1}]
     },
     "show_str" : "X",
     "code_sp" : "",
     methodid : 6150785,
     name:'玄麟斗',
     prize:{1:'4.00',2:'18.00'},
     nfdprize:{},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:322397,
     desc:'玄麟斗',maxcodecount:0
     }]}]},
     {
     isnew:"0",isdefault:"0",title:"百家乐", label:[{gtitle:'百家乐', label:[{"methoddesc":"[庄]万位+千位 VS [闲]十位+个位，从庄闲的“庄、闲”中至少选一个成一注。",
     "methodhelp":"从庄闲中任意选择1个庄、闲，开奖号码万位+千位之和比十位+个位之和大，中庄，反之中闲，如开出和则不会退还庄闲下注金额。",
     "methodexample":"投注【闲】，开奖号码为32698【3+2=5】vs【9+8=7】 闲赢。",
     "selectarea":{
     "type":"dxds",
     "layout": [{"title":"庄闲", "no":"庄|闲", "place":0, "cols":1}]
     },
     "show_str" : "X",
     "code_sp" : "",
     methodid : 6150789,
     name:'庄闲',
     prize:{1:'4.00'},
     nfdprize:{levs:'4.31',defaultprize:4.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:322399,
     desc:'庄闲',maxcodecount:0
     },{"methoddesc":"[庄]万位+千位 VS [闲]十位+个位，从和的“和”中选一个成一注。",
     "methodhelp":"从平中任意选择1个和，开奖号码万位+千位之和比十位+个位之和相等，中和。",
     "methodexample":"投注【和】，开奖号码为32614【3+2=5】vs【1+4=5】 和赢。",
     "selectarea":{
     "type":"dxds",
     "layout": [{"title":"和", "no":"和", "place":0, "cols":1}]
     },
     "show_str" : "X",
     "code_sp" : "",
     methodid : 6150790,
     name:'和',
     prize:{2:'18.00'},
     nfdprize:{levs:'19.40',defaultprize:18.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:322400,
     desc:'和',maxcodecount:0
     },{
     "methoddesc":"[庄]万位=千位相同或[闲]十位=个位相同，从对子的“庄、闲”中选一个成一注。",
     "methodhelp":"从对子中任意选择1个庄或闲，开奖号码[庄]万位=千位相同，中庄对子，[闲]十位=个位相同，中闲对子。",
     "methodexample":"投注【庄】，开奖号码为33614，庄对子赢。",
     "selectarea":{
     "type":"dxds",
     "layout": [{"title":"对子", "no":"庄|闲", "place":0, "cols":1}]
     },
     "show_str" : "X",
     "code_sp" : "",
     methodid : 6150791,
     name:'对子',
     prize:{3:'18.00'},
     nfdprize:{levs:'19.40',defaultprize:18.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:322401,
     desc:'对子',maxcodecount:0
     },{"methoddesc":"[庄]万位=千位=百位相同或[闲]百位=十位=个位相同，从豹子的“庄、闲”中选一个成一注。",
     "methodhelp":"从豹子中任意选择1个庄或闲，开奖号码[庄]万位=千位=百位相同，中庄豹子，[闲]百位=十位=个位相同，中闲豹子。",
     "methodexample":"投注【庄】，开奖号码为33314，庄豹子赢。",
     "selectarea":{
     "type":"dxds",
     "layout": [{"title":"豹子", "no":"庄|闲", "place":0, "cols":1}]
     },
     "show_str" : "X",
     "code_sp" : "",
     methodid : 6150792,
     name:'豹子',
     prize:{4:'180.00'},
     nfdprize:{levs:'194.00',defaultprize:180.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1},{modeid:2,name:'角',rate:0.1},{modeid:3,name:'分',rate:0.01}],
     menuid:322402,
     desc:'豹子',maxcodecount:0
     },{"methoddesc":"[庄]万位+千位=8点或者9点，[闲]十位+个位=8点或者9点，从天王的“庄、闲”中选一个成一注。",
     "methodhelp":"从天王中任意选择1个庄或闲，开奖号码[庄]万位+千位=8点或者9点，中庄天王，[闲]十位+个位=8点或者9点，中闲天王。",
     "methodexample":"投注【庄】，开奖号码为35314，3+5=8中庄天王。",
     "selectarea":{
     "type":"dxds",
     "layout": [{"title":"天王", "no":"庄|闲", "place":0, "cols":1}]
     },
     "show_str" : "X",
     "code_sp" : "",
     methodid : 6150793,
     name:'天王',
     prize:{5:'9.00'},
     nfdprize:{levs:'9.70',defaultprize:9.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1}],
     menuid:322403,
     desc:'天王',maxcodecount:0
     }]}]},
     {
     isnew:"0",isdefault:"0",title:"全5中1", label:[{gtitle:'全5中1', label:[{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'开奖号码为五重号，开奖号码里包含所选号码即为中奖。',
     methodexample:'投注号码9，开奖号码：99999，即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'组选1', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',

     methodid : 6150795,
     name:'组选1',
     prize:{1:'180000.00'},
     nfdprize:{levs:'194000.00',defaultprize:180000.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1}],
     menuid:322405,
     desc:'组选1',maxcodecount:0
     },{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'开奖号码为四重号加单号，顺序不限，开奖号码里包含所选号码即为中奖。',
     methodexample:'投注号码9，开奖号码：9999x， 9xxxx，即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'组选5', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150796,
     name:'组选5',
     prize:{2:'2000.00'},
     nfdprize:{levs:'2155.56',defaultprize:2000.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1}],
     menuid:322406,
     desc:'组选5',maxcodecount:0
     },{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'开奖号码为三重号加二重号，顺序不限，开奖号码里包含所选号码即为中奖。',
     methodexample:'投注号码9，开奖号码：999xx，99xxx，即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'组选10', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150797,
     name:'组选10',
     prize:{3:'1000.00'},
     nfdprize:{levs:'1077.78',defaultprize:1000.00,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1}],
     menuid:322408,
     desc:'组选10',maxcodecount:0
     },{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'开奖号码为三重号加两个单号，顺序不限，开奖号码里包含所选号码即为中奖。',
     methodexample:'投注号码9，开奖号码：999xy， yx999，9xyyy，即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'组选20', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150798,
     name:'组选20',
     prize:{4:'83.33'},
     nfdprize:{levs:'89.81',defaultprize:83.33,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1}],
     menuid:322409,
     desc:'组选20',maxcodecount:0
     },{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'开奖号码为二重号加二重号加单号 ，顺序不限，开奖号码里包含所选号码即为中奖。',
     methodexample:'投注号码9，开奖号码：xxyy9，9xxyy，即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'组选30', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150799,
     name:'组选30',
     prize:{5:'55.56'},
     nfdprize:{levs:'59.88',defaultprize:55.56,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1}],
     menuid:322410,
     desc:'组选30',maxcodecount:0
     },{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'开奖号码为二重号加三个单号，顺序不限，开奖号码里包含所选号码即为中奖。',
     methodexample:'投注号码9，开奖号码：99xyz，xyz99，即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'组选60', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',
     methodid : 6150800,
     name:'组选60',
     prize:{6:'8.93'},
     nfdprize:{levs:'9.62',defaultprize:8.93,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1}],
     menuid:322411,
     desc:'组选60',maxcodecount:0
     },{methoddesc:'从0-9中任意选择1个或1个以上号码。',
     methodhelp:'开奖号码为不重复的五个单号，开奖号码里包含所选号码即为中奖。',
     methodexample:'投注号码9，开奖号码：xyzn9，9xyzn，即为中奖。',
     selectarea:{
     type   : 'digital',
     layout : [
     {title:'组选120', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1}
     ],
     noBigIndex : 5,
     isButton   : true
     },
     show_str : 'X',
     code_sp : ',',

     methodid : 6150801,
     name:'组选120',
     prize:{7:'11.90'},
     nfdprize:{levs:'12.83',defaultprize:11.90,userdiffpoint:7},
     modes:[{modeid:1,name:'元',rate:1}],
     menuid:322412,
     desc:'组选120',maxcodecount:0
     }]}]}	,*/
];

// 改变默认玩法，从session 里面取值
function setTypePlay() {
    $.each(data_label,function (n,m) {
        m.isdefault = '0' ;  // 还原默认玩法
        if(m.title ==  sessionStorage.getItem('typename')){  // 匹配上次设置的玩法
            m.isdefault = '1' ;
        }
    }) ;
}
setTypePlay() ;


// 登录接口
function LoginAction() {
    $.ajax({
        type: 'post',
        headers:{ Authorization: 'Basic d2ViX2FwcDo=' } ,
        url : action.uaa+'oauth/token' ,
        // data: { grant_type :'password',username :'mgappid01|frank456',password :'frank456' } ,
        data: { grant_type :'password',username :'mgappid01|admin',password :'admin' } ,
        success: function(res){
            access_token = res.access_token ;
            setCookie("access_token",res.access_token);  // 把登录token放在cookie里面
        },
        error: function() {

        }
    });
}

// 获取彩种
function getLotterys(all,hot) {

    $.ajax({
        type: 'GET',
        url : action.forseti+'apis/lotterys',
        data: {} ,
        dataType:'json',
        success: function(res){
            var allstr ='' ;  // 全部彩种
            var hotstr ='' ;  // 热门彩种

            $.each(res.data,function (i,v) { // 通过 v.cid 跳转到每个彩种
                allstr +='<a href="javascript:;">'+
                    '<div class="menu_logo"><img src="'+v.imgUrl+'"></div>'+
                    ' <div class="menu_name">'+
                    ' <h2>'+v.name+'</h2>'+
                    ' <span>'+v.periodDesc+'</span>'+
                    '</div> </a>' ;
                if(v.ifHot == '1'){
                    hotstr +='<a href="javascript:;">'+
                        '<div class="menu_logo"><img src="'+v.imgUrl+'"></div>'+
                        ' <div class="menu_name">'+
                        ' <h2>'+v.name+'</h2>'+
                        ' <span>'+v.periodDesc+'</span>'+
                        '</div> </a>' ;
                }

            });

            $(all).html(allstr) ;
            $(hot).html(hotstr) ;

        },
        error: function() {

        }
    });
}

// 玩法树
function getPlayTree(gameid) {
    $.ajax({
        type: 'get',
        headers: {
            "Authorization": "bearer  "+access_token,
        },
        url : action.forseti+'api/playsTree' ,
        data: { lotteryId:gameid,} , // 当前彩种id
        success: function(res){
           // dataPlay = res.data.childrens ;

            $.each(res.data.childrens, function (i, v) { // 组装数组
                // v.pcodeStr = v.pcode.toString().substring(0, 8); // 截取前面6位
                dataPlay[v.name] = dataPlay[v.name] || [];
                dataPlay[v.name].push(v);

            });
           // console.log(dataPlay)
            $.each(dataPlay, function (i, v) { // 组装最终数组
               // console.log(i.substring(0, 2)) ;
                // console.log(v[0].status) ;
                if(i.length>3){  // 除了不定位等
                    dataPlayAll[i.substring(0, 2)] =  dataPlayAll[i.substring(0, 2)] || [] ;
                    dataPlayAll[i.substring(0, 2)].push(v[0]) ;
                }else{  // 名字位数小于4，定位胆，不定位，趣味等
                    dataPlayAll[i.substring(0, 3)] =  dataPlayAll[i.substring(0, 3)] || [] ;
                    dataPlayAll[i.substring(0, 3)].push(v[0]) ;
                }

            });

            $.each(dataPlayAll, function (i, v) {
                // console.log(v)
                    $.each(v, function (j, m) {
                     // console.log(m.childrens)
                        $.each(data_label, function (ii, vv) { // 添加 childrens 数组进去
                             if(i == vv.title){
                                 vv.childrens.push(m.childrens)  ;
                              }
                            // console.log(vv.title)

                        });
                    });
            });

            console.log(data_label)
            console.log(dataPlayAll) ;
           // console.log(data_label) ;

        },
        error: function() {

        }
    });
}


// 获取系统时间
function getSystemTime() {
    $.ajax({
        type: 'get',
        headers: {
            "Authorization": "bearer  "+access_token,
        },
        url : action.forseti+'apis/serverCurrentTime' ,
        data: {} ,
        success: function(res){
            sys_time = formatTimeUnlix(res.data) ;
            priodDataNewly(1) ; // 最近5期开奖，获取系统时间后再调用
        },
        error: function() {

        }
    });
}

// 获取用户余额
function getMemberBalance() {
    $.ajax({
        type: 'GET',
        headers: {
            "Authorization": "bearer  "+access_token,
        },
        // dataType:'json',
        // contentType:"application/json; charset=utf-8",  // json格式传给后端
        url : action.uaa+'/api/data/member/getMemberBalance' ,
        data: {} ,
        success: function(res){
            var mom = roundAmt(res.data.amount) ;
            $('.membalance').text(mom) ;
            setCookie("membalance",mom);  // 把登录余额放在cookie里面
        },
        error: function() {

        }
    });
}


/*$(function(){*/
        LoginAction() ;

        setTimeout(function () {
            getSystemTime() ; // 系统时间
            gamePlay() ;
            shopCar() ;
            helpChoose() ;
            getLotterys('.game-all','.game-hot') ; // 获取彩种
            getPlayTree(1) ;  // 玩法
            getMemberBalance() ; // 获取用户余额

        },500)


        var riable=0;
        // 玩法菜单选择
        function gamePlay() {
            $(".nfdprize_text").click(function(){
                if(riable==0){
                    riable=1;
                    $(".m-lott-methodBox .nfdprize_text b").addClass('cur')
                }else{
                    riable =0;
                    $(".m-lott-methodBox .nfdprize_text b").removeClass('cur')
                }
                $(".m-lott-methodBox-list").toggle();
            });
            $('.ui_playlist_cover').click(function(){
                $(".nfdprize_text").click();
            })
        }

// 购物车动画
        function shopCar() {
            $('#ui_cart').on('click',function(){
                $($.lt_id_data.id_sel_insert).click() ; // 购物车也可以添加投注
                $('#ui_bet').stop(true,true).animate({left: 0},300,function(){
                    $('#body').addClass('bet_cart');

                });
            })
            $('#bet_back').on('click',function(){
                var z_times = $($.lt_id_data.id_add_times).val().replace(/[^0-9]/g, '').substring(0, 5); // 追号倍数
                var z_dates = $($.lt_id_data.id_add_date).val().replace(/[^0-9]/g, '').substring(0, 5); // 追号期数
                var id_sel_num = $($.lt_id_data.id_cf_num).html() ;//添加投注 已选注数

                if((z_times>1 && id_sel_num >0 ) || (z_dates>1 && id_sel_num>0)){ // 如果已经有追号方案，返回的时候清空之前的方案
                    layer.open({
                        content: lot_lang.am_s41,
                        btn: ['确定','取消'],
                        yes: function (index) {
                            for(var i= 0;i<z_times;i++){  // 还原倍数
                                $('.multipleBox').find('.less_bei').click() ;
                            }
                            for(var i= 0;i<z_dates;i++){   // 还原期数
                                $('.multipleBox').find('.less_bei').click() ;
                            }
                            $('#body').removeClass('bet_cart');
                            $('#ui_bet').stop(true,true).animate({left: '100%'},300);

                            layer.close(index);
                        }
                    });
                }else{
                    $('#body').removeClass('bet_cart');
                    $('#ui_bet').stop(true,true).animate({left: '100%'},300);

                }

            });

        }
// 助手选单
        function helpChoose() {
            $('.ui_help').on('click','.ui_btn_help',function(){
                $(this).parent('.ui_help').find('ul').stop().fadeIn(200);
                $(this).append('<div class="ui_cover"></div>');
                $('.ui_help').find('ul').on('click',function(){
                    $('.ui_cover').remove();
                    $(this).hide();
                });
                $('.ui_cover').on('click',function(){
                    $('.ui_cover').remove();
                    $('.ui_help').find('ul').hide();
                })
            });
        }

    // 最新开奖期数
    function priodDataNewly(gameid) {
        $.ajax({
            type: 'get',
            headers: {
                "Authorization": "bearer  "+access_token,
            },
            url : action.forseti+'api/priodDataNewly' ,
            data: { lotteryId:gameid ,} ,
            success: function(res){

                next_pcode = res.data[0].pcode ;  // 下一期数
                now_pcode = res.data[1].pcode ;  // 当前期数
                now_time = formatTimeUnlix(res.data[1].endTime) ;  // 当前期数
                now_day =( res.data[1].pcode).toString().substr(0,8) ;  // 当天日期

                for(var i=2;i<res.data.length;i++){
                    processCode(res.data[i].pcode,res.data[i].winNumber);
                }
                setTimeout(function () {
                    initFrame() ;
                    setCookie("lt_lottid",$.lt_lottid);  // 把彩票 lottery 放在cookie里面

                },100)

            },
            error: function() {

            }
        });
    }


    // 初始化方法
    var initFrame = function(){
        $.gameInit({
            data_label: data_label,  // 玩法集合
           /// data_label: dataPlay,  // 玩法集合,2017/10
            cur_issue : {issue: now_pcode,endtime:now_time},
            servertime: sys_time ,  // 系统时间   setAmerTime()
            lotteryId : parseInt(1,10), // 当前彩种id
            lotteryName : '重庆时时彩', // 当前彩种名称
            issues    : {  //所有的可追号期数集合
                today:[
                  /*  {issue:'20170817-087',endtime:'2017-08-17 20:29:05'},
                    {issue:'20170817-088',endtime:'2017-08-17 20:39:05'},
                    {issue:'20170817-089',endtime:'2017-08-17 20:49:05'},
                    {issue:'20170817-120',endtime:'2017-08-17 23:59:30'}*/
                ],
                tomorrow: [
                  /*  {issue:'20170818-118',endtime:'2017-08-18 23:49:30'},
                    {issue:'20170818-119',endtime:'2017-08-18 23:54:30'},
                    {issue:'20170818-120',endtime:'2017-08-18 23:59:30'}*/
                ]

            },

            ajaxurl : action.forseti+'api/priodDataNewly' ,   // 获取最近五期的开奖号码
            ontimeout : function(){  // 时间结束后执行的函数
               /* $.ajax({
                    type: 'POST',
                    url : './?controller=game&action=play&curmid=50',
                    data: "lotteryId=1&flag=gethistory",
                    success: function(data){
                        if( data == 'empty'){
                            return;
                        }
                        eval("data="+data);
                        processCode(data[0].issue,data[0].code);
                    }
                });*/
            },
            onfinishbuy : function(){
               /* $.ajax({
                    type: 'POST',
                    url : './?controller=game&action=play&curmid=50',
                    data: "lotteryId=1&flag=getprojects",
                    success: function(data){
                        var partn = /<script.*>.*<\/script>/;
                        if( data == 'empty' && partn.test(data) ){
                            return;
                        }
                        eval("data="+data);
                        $(".history_pro","#history_project").remove();
                        var html = '';
                        var selectedcss = '';
                        $.each(data,function(i,n){
                            html += '<tr class="history_pro">';
                            if( i%2 == 0 ){
                                selectedcss = ' class="odd"  align="center"';
                            }else{
                                selectedcss = '  align="center"';
                            }
                            html += '<td'+selectedcss+' height="30"><a href="/gameinfo/gamedetail/'+n.projectid+'" target="_blank" title="查看注单详情" class="projectidarea">'+n.projectid+'</a></td>';
                            html += '<td'+selectedcss+'>'+n.writetime+'</td>';
                            html += '<td'+selectedcss+'>'+n.methodname+'</td>';
                            html += '<td'+selectedcss+'>'+n.issue+'</td>';
                            html += '<td'+selectedcss+'>'+n.modes+'</td>';
                            if( n.code.length>20 ){
                                html += '<td'+selectedcss+'><span class="project_more">号码详情</span><div style="display:none;">'+n.code+'</div></td>';
                            }else{
                                html += '<td'+selectedcss+'>'+n.code+'</td>';
                            }
                            html += '<td'+selectedcss+'>'+n.multiple+'</td>';
                            html += '<td'+selectedcss+'>'+moneyFormat(n.totalprice)+'</td>';
                            html += '<td'+selectedcss+'>'+(parseInt(n.taskid,10)>0 ? "是" : "否")+'</td>';
                            html += '</tr>';
                        });
                        $(html).insertAfter("#project_title");
                    }
                });*/
            }
        });
        //$.gameInit结束


        //轮询推送控制,获取历史奖期
       /* var getHistoryTimer = null;
        var pushModule = $.parseJSON("{\"push_issuetime\":\"1\",\"push_issuecode\":\"1\",\"push_notice\":\"1\",\"push_usermessage\":\"1\",\"push_userbalance\":\"1\",\"push_userwonprize\":\"1\"}");
        $.extend({
            getHistoryFun : function(pushServiceObj,pushModule,hdata){
                if(typeof pushServiceObj == "object"){
                    var timedelay = 30000;
                    if(sidebar_hover == "hn1fc"){
                        timedelay = 10000;
                    }
                    if(pushServiceObj.pushStatus == "1" && pushModule.push_issuecode == "1"){//如果开启了推送
                        if(getHistoryTimer !== null){
                            window.clearTimeout(getHistoryTimer);
                        }
                        if(hdata != null){
                            processCode(hdata["issue"],hdata["code"],hdata["iscurent"]);
                        }
                    }else{//轮询过程
                        var currentissue = $('.no_old').html();
                        $.ajax({
                            type: 'POST',
                            url : './?controller=game&action=play&curmid=50',
                            data: "lotteryId=1&flag=gethistory&currentissue="+currentissue,
                            success: function(data){
                                if( data == 'empty' ){
                                    return;
                                }
                                eval("data="+data);
                                processCode(data[0].issue,data[0].code,data.iscurent);
                            }
                        });
                        getHistoryTimer = setTimeout($.getHistoryFun,timedelay,pushServiceObj,pushModule,hdata);

                    }
                }
            }
        });

        $.getHistoryFun(pushServiceObj,pushModule,null);*/
    }

// $(document).ready(initFrame) ;


/*});*/




// var isInit = true;
/*var runData = {
    initRank:[[150,210,3],[40,100,2],[100,160,1],[0,70,2],[10,80,3],[100,170,1],[180,250,3],[110,180,1],[10,80,2],[70,140,3]],
    //initRank:[[250,310,1.2],[140,200,1.5],[200,260,1.2],[100,170,1.5],[110,180,1],[200,270,1.2],[280,350,2],[210,280,1.7],[110,180,2],[170,240,1]],
    codes:[],
    spurt:false,//冲刺
    completed:false,//完成排名
    finished:false,//是否结束
    isBegin:false,//是否开始
    hasPushed:false,//有没有推送结果
    stop:false,//控制动画停止
    isInitialize:false,//是否初始化了
    isGroundStopped:false
}*/


// 近期开奖处理
function processCode(issue,code,iscurent){
    if(!code){
        code='-,-,-,-,-';
    }
    var code_arr = code.split(',');

    var finishIssueCodeHtml = '<li><span class="issue">第' + issue + '期</span><span class="num"> ' ;
    //已开奖期号节点,开奖号码
    var recentCon = $(".recentCon ul") ;
    for(var i=0;i<code_arr.length;i++){
        finishIssueCodeHtml += '<i>' + code_arr[i] + '</i>';
    }
    finishIssueCodeHtml +='</span></li>';

    var str = "";
    $.each(code_arr,function(i,n){
        if(i == code_arr.length - 1){
            str += n;
        }else{
            str += n + " ";
        }

    });

    recentCon.find("li").removeClass("hover");
    recentCon.prepend(finishIssueCodeHtml);
    if(recentCon.find('li').length>5){
      // recentCon.find('li:nth-last-child(n+7)').remove() ;
        recentCon.find('li:nth-child(n+6)').remove() ;
    }

}

/*function processCode(issue,code,iscurent){
    if(sidebar_hover === "pk10"||sidebar_hover === "jssm"){//如果是pk10
        var code_arr = code.split(' ');
    }else{
        var code_arr = code.split(',');
    }
    var _html = "";
    $('.no_old').html(issue);

    var finishIssueCodeHtml,codefilter = '';
    //已开期号节点,开奖号码
    var recentCon = $(".recentCon ul"),
        lastIssue = recentCon.find("li:first").find("span:first").text().replace("期","");
    if(sidebar_hover === "pk10"||sidebar_hover === "jssm"){//如果是pk10
        var str = "";
        $.each(code_arr,function(i,n){
            if(i == code_arr.length - 1){
                str += n;
            }else{
                str += n + " ";
            }

        });
        finishIssueCodeHtml = '<li data="' + str + '" class="hover"><span class="issue_k8">' + issue + '期</span><span class="num_k8">' + str + '</span></li>';

    }else{
        finishIssueCodeHtml = '<li class="hover"><span class="issue">' + issue + '期</span><span class="num">' + code + '</span></li>';
    }
    $('.lottery_history_issue span').html(issue);
    if(iscurent == 2){
        //console.log(lastIssue);
        if(issue != lastIssue && sidebar_hover != "jssm"){
            recentCon.find("li").removeClass("hover");
            recentCon.prepend(finishIssueCodeHtml);
        }
        /!*新号码产生的动画*!/
        if(sidebar_hover === "pk10" ){//如果是pk10
            setTimeout(function(){
                $("#num li").each(function(index){
                    var num = $(this);
                    num.removeClass().addClass("car" + code_arr[index]).hide();
                    window.setTimeout(function(){
                        num.fadeIn();
                    },100+index*200);
                });

            },2500);

            runData.hasPushed = true;
            runData.codes = code_arr;
            fnOpenAwards(code_arr);
        }else if(sidebar_hover === "jssm"){//如果是竞速
            setTimeout(function(){
                $("#num li").each(function(index){
                    var num = $(this);
                    num.removeClass().addClass("horse" + code_arr[index]).hide();
                    window.setTimeout(function(){
                        num.fadeIn();
                    },100+index*200);
                });
                if(issue != lastIssue){
                    recentCon.find("li").removeClass("hover");
                    recentCon.prepend(finishIssueCodeHtml);
                }
            },2500);

            runData.hasPushed = true;
            runData.codes = code_arr;
            fnOpenAwardsJs(code_arr);
        }else{
            $("#num li").each(function(index){
                var num = $(this).children('span');
                setTimeout(function(){
                    num.animate({top: "39px"},100, function() {
                        num.html('<p>9</p><p>7</p><p>4</p><p>2</p><p>1</p>');
                        num.css("top","-195px");
                        num.animate({top: "39px"}, 600, function(){
                            num.html(code_arr[index])
                            num.css("top","-39px");
                            num.animate({top: "0px"}, 100)
                        });
                    });
                }, 400+index*300);
            });
        }
    }

    if(isInit){
        if(sidebar_hover === "pk10"){//如果是pk10
            $.each(code_arr,function(index,value){
                _html += "<li class='car00'><span></span></li>";
            })
            $("#num").addClass("pk10_ul").empty().html(_html);

            /!*入场*!/
            $("#num li").each(function(index){
                var num = $(this);
                num.removeClass().addClass("car" + code_arr[index]).hide();
                window.setTimeout(function(){
                    num.fadeIn();
                },100+index*200);
            });

            //动画区开奖结果
            $(".rank-number li").each(function(index){
                var num = $(this);
                if(index !== 10){
                    num.removeClass().addClass("rank" + code_arr[index]);
                }
                $("#top"+(index+1)).attr("class","cars" + code_arr[index]);
            });
        }else if(sidebar_hover === "jssm"){//如果是急速赛马
            $.each(code_arr,function(index,value){
                _html += "<li class='horse00'><span></span></li>";
            })
            $("#num").addClass("horse_ul").empty().html(_html);

            /!*入场*!/
            $("#num li").each(function(index){
                var num = $(this);
                num.removeClass().addClass("horse" + code_arr[index]).hide();
                window.setTimeout(function(){
                    num.fadeIn();
                },100+index*200);
            });

            //动画区开奖结果
            $(".rank-number li").each(function(index){
                var num = $(this);
                if(index !== 10){
                    num.removeClass().addClass("rank" + code_arr[index]);
                }
                $("#top"+(index+1)).attr("class","horses" + code_arr[index]);
            });

        }else{
            $.each(code_arr,function(index,value){
                _html += "<li><span>-</span></li>";
            })
            $("#num").empty().html(_html);
            // .css({'width': 50*code_arr.length + "px"});

            /!*入场*!/
            $("#num li").each(function(index){
                var num = $(this);
                num.animate({
                    top:"50px"
                },100+index*50,function(){
                    num.html('<span>' + code_arr[index] + '</span>');
                    num.css("top","-50px");
                    num.animate({
                        top:"0"
                    },1000+index*200,"easeOutBounce");
                });
            });
        }
        isInit = false;
    }

    //最多显示10个
    var finishIssueCodeHtml_num = $(".recentCon ul li").length;
    if(finishIssueCodeHtml_num > 10){
        for(var i=0;i<finishIssueCodeHtml_num-10;i++){
            $(".recentCon ul li:last").remove();
        }
    }
}*/

/*function showAll(){
    $("span.more").live("click",function(event){
        var index = $("span.more").index($(this));
        var li = $(this).parent().parent("li");
        var data = li.attr("data");
        var arr = data.split(" ");
        var html = "";
        $.each(arr,function(i,n){
            html += "<span>" + n + "</span>"
        });
        $(".seeMore").html(html).css({"top" : index*29 + 62 + "px"}).show();
        event.stopPropagation();
        event.preventDefault();
    });
}*/
//pk10开奖
/*function fnOpenAwards(codes){
    setTimeout(function(){
        runData.completed = true;
        setTimeout(function(){
            $(".cars-area .wheel").hide();
            $(".cars-area li b").fadeIn();
        },1500);
    },3000);

    setTimeout(function(){
        $(".an-results").addClass("active");
        $(".an-results .ani-elem1").addClass("active");
        $(".an-results .ani-elem2").addClass("active");
        setTimeout(function(){
            runData.finished = true;
            runData.isInitialize = false;

            //开奖结果矫正
            $(".rank-number li").each(function(index){
                var num = $(this);
                if(index !== 10){
                    num.removeClass().addClass("rank" + codes[index]);
                }
                $("#top"+(index+1)).attr("class","cars" + codes[index]);

            });
        },2000);
    },2000);

    setTimeout(function(){
        //runData.isGroundStopped = true;
        $(".end-point").velocity({"left":"82px"},1000,function(){
            runData.isGroundStopped = true;
        });
    },500);
}*/
//急速赛马开奖
/*function fnOpenAwardsJs(codes){
    setTimeout(function(){
        runData.completed = true;
    },1800);

    setTimeout(function(){
        $(".an-results").addClass("active");
        $(".an-results .ani-elem1").addClass("active");
        $(".an-results .ani-elem2").addClass("active");

        //开奖结果矫正
        $(".rank-number li").each(function(index){
            var num = $(this);
            if(index !== 10){
                num.removeClass().addClass("rank" + codes[index]);
            }
            $("#top"+(index+1)).attr("class","horses" + codes[index]);
        });
        setTimeout(function(){
            runData.finished = true;
            runData.isInitialize = false;
            $(".end-point").css("right",-150);
        },700);
    },3000);

    setTimeout(function(){
        //runData.isGroundStopped = true;
        $(".end-point").velocity({"right":"82px"},1000,function(){
            runData.isGroundStopped = true;
        });
    },1000);
}*/
//清空追号方案
var cleanTraceIssue =function(){
    $("input[name^='lt_trace_issues']",$($.lt_id_data.id_tra_issues)).attr("checked",false);
    $("input[name^='lt_trace_times_']",$($.lt_id_data.id_tra_issues)).val(0).attr("disabled",true);
    $("span[id^='lt_trace_money_']",$($.lt_id_data.id_tra_issues)).html('0.00');
    $("td",$($.lt_id_data.id_tra_issues)).removeClass("selected");
    $('#lt_trace_hmoney').html(0);
    $('#lt_trace_money').val(0);
    $('#lt_trace_count').html(0);
    $.lt_trace_issue = 0;
    $.lt_trace_money = 0;
};