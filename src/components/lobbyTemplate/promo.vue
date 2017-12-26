<template>
    <div id="pa_con" class="so-con warp bule_bg">
        <header id="pa_head">
            <div class="left">
                 <router-link :to="'/'">
                    <img src="../../../static/frist/images/back.png" alt="">
                </router-link>
            </div>
            <h2 class="center">优惠活动</h2>
            <div class="right"></div>
        </header>

         <div class="pa_content">
            <div class="promo_area">
                <ul class="promo_list" v-for="list in banner" @click="setClass($event,list.cid)" >
                    <li>
                        <h3>{{list.title}}</h3>
                        <img :src="list.titlePic">
                        <div class="promo_detail" v-html="content"></div>
                        <p class="btn_detail"><a href="javascript:;"><span>查看详情</span></a></p>
                        
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
<style>

</style>
<script>
// import $ from "jquery";
import Mixin from '@/Mixin'


export default {
  name: 'promo',
  mixins:[Mixin],
  components: {

  },
  data: function() {
        return {
            banner:[],
            cid:'',
            content:'',
            title:'' ,
            titlePic:''
        }
    },
  created: function() {
    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' );
      document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部

      this.getActivity();
     // this.setCid();
  },
  methods: {
      //获得优惠活动接口
      getActivity : function () {
          var _self=this;
          $.ajax({
              type:'get',
              url: _self.action.forseti + 'apid/cms/activity',
              data:{},
              success:(res)=>{
                 if(res.data.rows){
                     var len=res.data.rows.length;
                     var listWe=[];
                     for(var i=0;i<len;i++){
                         res.data.rows[i].titlePic=_self.action.picurl+ res.data.rows[i].titlePic+'/0';

                     }
                     _self.banner=res.data.rows;
                 }
              },
              err:(res)=>{

              }
          })
      },
      //选取详情传递cid;
//      setCid:function (e) {
//              var $src = $(e.currentTarget);
//              var val = $src.data('val');
//              if(val){
//              localStorage.setItem('Cid',val);
//              window.location = '/lobbyTemplate/promo_content' ;
//             }
//      },
      setClass:function (e,cid) {
          var $src = $(e.currentTarget);
          $src.toggleClass('active')
              .siblings()
              .removeClass('active');
          this.getContent(cid)
      },
      getContent:function (cid) {
          var _self=this;
          $.ajax({
              type:'get',
              url: _self.action.forseti + 'apid/cms/activityInfo',
              data:{cid:cid},
              success:(res)=>{
                  if(res){
                      _self.titlePic=_self.action.picurl+ res.data.titlePic+'/0';
                      _self.title=res.data.title;
                      _self.content=res.data.content;
                  }
              }
          })
      }
  }
}
</script>
<style scoped>

    #propBack {
        display: inline-block;
        padding-right: 1rem;
    }

.promo_area { text-align: left; width: 9.4rem; margin: 0 auto; padding: 0.3rem; font-size: .34rem; line-height: 1.7em; }
.promo_area > ul .promo_detail{ display: none;}
.promo_area > ul.active .promo_detail{ display: block;}
.promo_area > ul.active .btn_detail{ display: none;}
.promo_area .promo_list li { background:url('/static/frist/images/promo_panel_center.png') no-repeat; background-size: 100% 100%; position: relative; margin: 0.2rem 0 0.7rem;}
.promo_area .promo_list li:before{content: ''; display: block; background:url('/static/frist/images/promo_panel_top.png') no-repeat; background-size: 100% 100%; position: absolute; top:-0.2rem; left: 0; right: 0; height:0.2rem;}
.promo_area .promo_list li:after{content: ''; display: block; background:url('/static/frist/images/promo_panel_bottom.png') no-repeat; background-size: 100% 100%; position: absolute; bottom:-0.2rem; left: 0; right: 0; height:0.2rem;}
.promo_area .promo_list li img{ border-radius: 0; margin: 0 0.3rem; width: calc(100% - 0.6rem); border:none;max-height: 1.8rem; position: relative; z-index: 10;}
.promo_area .promo_list li h3 { padding: 0rem .3rem ;  /*font-size: 0.4rem;*/font-size: 0.34rem; text-align: left; line-height: 0.7rem; color:#4b280c;/*border-bottom:1px solid #e4ccaa;*/ }
.promo_area .promo_list li p.btn_detail { border-top: 1px solid rgba(22, 22, 22, 0.58); padding: 0.1rem 0 0; margin: 0.25rem 0.3rem; }
.promo_area .promo_list li a { color: #4b280c; }
.promo_area li { margin-bottom: 0.3rem; }
.promo_area .promo_detail { padding: 0.3rem; }
.promo_area img { display: block; width: calc( 100% - 2px); border: 1px solid transparent;border-radius: .2rem }
/*.promo_area p { margin: .2rem 0;}*/
.promo_area h3 { margin: .2rem 0 0.3rem; color: #4b280c; font-size: 0.43rem; }
.promo_area strong { color: #980110; }


</style>