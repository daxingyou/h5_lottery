<template>
    <div id="pa_con" class="so-con warp cover_bg">
        <header id="pa_head">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)" >
                    <img src="../../../static/images/back.png" alt="">
                </a>
            </div>
            <h2 class="center">帐户管理</h2>
            <div class="right"></div>
        </header>
        <div class="content">
            <div class="info_area">
                <div class="info_top">
                    <div class="account">
                        <!--<a href="info_data.html">-->
                            <h2 class="ui header center aligned">
                                <div class="portrait">
                                    <!-- <div class="portrait_outline"></div> -->
                                    <div class="user_portrait" style="background-image: url('../../../static/images/left/user.png');"></div>
                                </div>
                            </h2>
                            <div class="user_name">
                                <strong>{{loginName}}</strong>
                                <div class="purse">
                                    <img src="../../../static/images/top/sjinbi.png" class="so-top-sum">
                                    <div class="so-in-top-sum">
                                        123456789
                                    </div>
                                </div>
                            </div>
                        <!--</a>-->
                    </div>
                </div>
                <div class="info_mid">
                    <div>
                        <div class="btn btn_blue btn_two lgps filter_1">
                            <a>修改登录密码</a>
                        </div>
                        <div class="btn btn_blue btn_two pps filter_2">
                            <a>修改支付密码</a>
                        </div>
                    </div>
                </div>
                <div class="info_account">
                    <div>帐号安全</div>
                    <div class="print_data">
                        <table>
                            <thead>
                            <tr>
                                <th class="bank_card_num">
                                    <li>银行卡号</li>
                                </th>
                                <td>
                                    {{bankName}}<br/>
                                    {{bankCard}}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <li>开户行</li>
                                </th>
                                <td>{{bankAdd}}</td>
                            </tr>
                            <tr>
                                <th>
                                    <li>真实姓名</li>
                                </th>
                                <td>{{realName}}</td>
                            </tr>
                            <tr>
                                <th>
                                    <li>手机号码</li>
                                </th>
                                <td>{{mobilePhone}}</td>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="info_personal">
                    <div>个人信息
                        <a class="info_data_modify edit-btn"  v-if="showDetail" @click="editDetails()"><i class="icon write"></i>修改</a>
                        <a class="save save-btn"  v-if="!showDetail" @click="saveEdit()"><i class="i_save"></i><span>保存</span></a>
                    </div>
                    <div class="print_data">
                        <table>
                            <thead>
                            <tr>
                                <th>
                                    <li>微信</li>
                                </th>
                                <td v-if="!showDetail" class="before-edit">
                                    <input type="text" placeholder="请输入微信号" v-model="weChat">
                                    <!--<span class=" erro_text" >微信格式错误</span>-->
                                </td>
                                <td  v-if="showDetail" class="after-edit">{{weChat}}</td>
                            </tr>
                            <tr>
                                <th>
                                    <li>QQ</li>
                                </th>
                                <td v-if="!showDetail" class="before-edit">
                                    <input  type="text"  placeholder="请输入QQ号" v-model="qq">
                                    <!--<span>qq格式错误</span>-->
                                </td>
                                <td v-if="showDetail" class="after-edit">{{qq}}</td>
                            </tr>
                            <tr>
                                <th>
                                    <li>电子邮箱</li>
                                </th>
                                <td class="before-edit" v-if="!showDetail">
                                    <input  type="text"  placeholder="请输入邮箱地址" v-model="email">
                                    <!--<span class="errormsg erro_text" v-show="changeDetail.emailVali">邮箱格式错误</span>-->
                                </td>
                                <td v-if="showDetail" class="after-edit">{{email}}</td>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>

        </div>
        <FooterNav></FooterNav>
        <!-- 登陸密碼 -->
        <div class="dropdown02 filter_dropdown_1 filter_dropdown" style="display:none;">
            <div class="play_area">
                <div class="password_area">
                    <form>
                        <fieldset v-if="show" >
                            <div class="form_g text">
                                <legend>原密码</legend>
                                <input type="password"  placeholder="请输入密码" v-model="oldPassword" class="oldPassword" @input="checkpassword(oldPassword,'oldPassword')">
                                <i class="eye eye1" @click="showPassword('eye1')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset v-if="!show" >
                            <div class="form_g text">
                                <legend>原密码</legend>
                                <input type="text"  placeholder="请输入密码"  v-model="oldPassword" class="oldPassword" @input="checkpassword(oldPassword,'oldPassword')">
                                <i class="eye active  act1" @click="showPassword('act1')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset v-if="showC" >
                            <div class="form_g text">
                                <legend>新密码</legend>
                                <input type="password" placeholder="请输入新密码" v-model="newPassword"  class="newPassword" @input="checkpassword(newPassword,'newPassword')">
                                <i class="eye eye2" @click="showPassword('eye2')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset v-if="!showC" >
                            <div class="form_g text">
                                <legend>新密码</legend>
                                <input type="text" placeholder="请输入新密码" v-model="newPassword"  class="newPassword" @input="checkpassword(newPassword,'newPassword')">
                                <i class="eye active act2" @click="showPassword('act2')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset v-if="showB" >
                            <div class="form_g text">
                                <legend>确认密码</legend>
                                <input type="password" placeholder="请再次输入新密码" v-model="newPassword_confirm"  class="newPassword_confirm" @input="checkpassword(newPassword_confirm,'newPassword_confirm')">
                                <i class="eye eye3" @click="showPassword('eye3')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                        <fieldset v-if="!showB" >
                            <div class="form_g text">
                                <legend>确认密码</legend>
                                <input type="text" placeholder="请再次输入新密码" v-model="newPassword_confirm"  class="newPassword_confirm" @input="checkpassword(newPassword_confirm,'newPassword_confirm')">
                                <i class="eye active act3" @click="showPassword('act3')"></i>
                            </div>
                            <label class="error-message "></label>
                        </fieldset>
                    </form>
                    <div>
                        <div class="cancel-btn btn btn_two round btn_outlineb"><a href="javascript:;">取消</a></div>
                        <div class="btn btn_two round btn_blue02"><a href="javascript:;"@click="submitChangePassword()" >确定</a></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 支付密碼 -->
        <div class="dropdown filter_dropdown_2  filter_dropdown" style="display:none;">
            <div class="play_area">
                <div class="password_area">
                    <form>
                        <fieldset>
                            <div class="form_g password text pay_password">
                                <legend>原密码</legend>
                                <div class="select_inline">
                                <select v-model="oldPassword1">
                                    <option>-</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                                </div>
                                <div class="select_inline">
                                <select v-model="oldPassword2">
                                    <option>-</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                                </div>
                                <div class="select_inline">
                                <select v-model=" oldPassword3">
                                    <option>-</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                                </div>
                                <div class="select_inline">
                                <select v-model=" oldPassword4">
                                    <option>-</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                                </div>
                            </div>
                            <!--<label class="error-message "></label>-->
                        </fieldset>
                        <fieldset>
                            <div class="form_g password text pay_password">
                                <legend>新密码</legend>
                                <div class="select_inline">
                                <select v-model=" newPassword1">
                                    <option>-</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                                </div>
                                <div class="select_inline">
                                <select v-model="newPassword2">
                                    <option>-</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                                </div>
                                <div class="select_inline">
                                <select v-model=" newPassword3">
                                    <option>-</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                                </div>
                                <div class="select_inline">
                                <select  v-model=" newPassword4">
                                    <option>-</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                                </div>
                            </div>
                            <!--<label class="error-message "></label>-->
                        </fieldset>
                        <fieldset>
                            <div class="form_g password text pay_password">
                                <legend>确认密码</legend>
                                <div class="select_inline">
                                <select v-model=" newPassword_confirm1">
                                    <option>-</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                                </div>
                                <div class="select_inline">
                                <select v-model=" newPassword_confirm2">
                                    <option>-</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                                </div>
                                <div class="select_inline">
                                <select v-model="newPassword_confirm3">
                                    <option>-</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                                </div>
                                <div class="select_inline">
                                <select v-model=" newPassword_confirm4">
                                    <option>-</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                                </div>
                            </div>
                            <!--<label class="error-message "></label>-->
                        </fieldset>
                    </form>
                    <div>
                        <div class="btn btn_two round btn_outline cancel-btn"><a href="javascript:;">取消</a></div>
                        <div class="btn btn_two round btn_blue02"><a href="javascript:;"@click="submitChangePayWord()">确定</a></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="so-shade"></div>
        <AutoCloseDialog ref="autoCloseDialog" text=" " type="" />
    </div>
</template>

<script>
import $ from "jquery";
import Mixin from '@/Mixin'
import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'

export default {
  name: 'info_data',
  mixins:[Mixin],
  components: {
      AutoCloseDialog,
      FooterNav ,
  },
    data: function() {
        return {
             // 修改登录密码
            oldPassword:'',
            newPassword:'',
            newPassword_confirm:'',
            // 修改支付密码
            oldPassword1:'',
            oldPassword2:'',
            oldPassword3:'',
            oldPassword4:'',
            newPassword1:'',
            newPassword2:'',
            newPassword3:'',
            newPassword4:'',
            newPassword_confirm1:'',
            newPassword_confirm2:'',
            newPassword_confirm3:'',
            newPassword_confirm4:'',
           //客户个人信息
            loginName:'',
            weChat:'',
            qq:'',
            email:'',
            //用户银行信息
            realName:'',
            bankCard:'',
            bankName:'',
            bankAdd:'',
            mobilePhone:'',
            // 修改资料,
            showDetail:true,
            show:true,
            showC:true,
            showB:true
        }
    },
    created: function() {
        var _self = this;
//        _self.hasLogin = _self.ifLanded();
        _self.getUserBankInfo();
        _self.getUserInfo();
    },
    mounted:function() {
      $('html,body').css('overflow-y','scroll' );
        $('.purse').hide() ;
        $('.filter_1').on('click',function () {
            $('.filter_dropdown_1 ').show() ;
        });
        $('.filter_2').on('click',function () {
            $('.filter_dropdown_2 ').show() ;
        });
        $('.cancel-btn').on('click',function () { /* .confirm-btn */
            $('.filter_dropdown ').hide() ;
        }) ;
  },
    methods: {
        // 获取用户银行信息
        getUserBankInfo: function() {
          var _self = this;
            $.ajax({
              type:'get',
              headers: { 'Authorization': 'bearer ' + _self.getAccessToken ,},
              dataType: 'json',
              url: _self.action.forseti + 'api/payment/memberBank',
              data: { },
              success: (res) => {

                   _self.realName=res.data.realName;
                   _self.bankCard=res.data.bankCard;
                   _self.bankName=res.data.bankName;
                   _self.bankAdd =res.data.bankAddress;
                   _self.mobilePhone =res.data.mobile
              },
              error: (err) =>{
              }
          })
//
      },
        //获取用户个人信息
        getUserInfo :function () {
            var _self=this;
            $.ajax({
                type: 'get',
                headers: {'Authorization': 'bearer ' + _self.getAccessToken,},
                dataType: 'json',
                url: _self.action.uaa + 'api/data/member/info',
                data: {},
                success: (res) => {
                    _self.loginName=res.data.login;
                    _self.weChat  = res.data.wechat;
                    _self.qq      = res.data.qq;
                    _self.email   = res.data.email
                },
                error: ()=>{

                }
            })
        },
        //修改登录密码
        submitChangePassword:function (){
            var _self=this;
             if(_self.oldPassword==''){
                 return false ;
             }
             if(_self.newPassword==''||_self.newPassword==_self.oldPassword){
                 _self.$refs.autoCloseDialog.open('原密码和新密码不能相同')
                 return false ;
             }
             if(_self.newPassword_confirm==''||_self.newPassword!=_self.newPassword_confirm){
                 _self.$refs.autoCloseDialog.open('两次新密码输入不一致')
              return false ;
             }
             var falg = $('.error-message').hasClass('red') ;  // 验证不通过，不允许提交
             if(falg){
               return false ;
             }
            var ChangePasswordData={
                oldPassword:_self.oldPassword,
                newPassword:_self.newPassword
               }
             $.ajax({
                 type:'post',
                 headers: { 'Authorization': 'bearer ' + _self.getAccessToken ,},
                 dataType: 'json',
                 url: _self.action.uaa + 'api/data/member/password',
                 data: ChangePasswordData,
                 success: (res) => {
                     if(res.err=='PASSWORD_INVALID'){
                         _self.$refs.autoCloseDialog.open('原密码输入错误')
                         return
                     }
                     _self.$refs.autoCloseDialog.open('修改成功','','icon_check','d_check') ;
                     setTimeout(function(){
                         window.location = '/lobbyTemplate/info_data' ;
                     },2000)
                 },
                 error: (err) =>{
                     _self.$refs.autoCloseDialog.open('请输入正确密码','','icon_check','d_check') ;
                 }
             })
      },
        //修改交易密码
        submitChangePayWord : function(){
          var _self=this;
            var oldWord=_self.oldPassword1+_self.oldPassword2+_self.oldPassword3+_self.oldPassword4;
            var newWord=_self.newPassword1+_self.newPassword2+_self.newPassword3+_self.newPassword4;
            var newWordC=_self.newPassword_confirm1+_self.newPassword_confirm2+_self.newPassword_confirm3+_self.newPassword_confirm4;
            if(_self.oldPassword1 ==''|| _self.oldPassword2 =='' ||
            _self.oldPassword3 ==''|| _self.oldPassword4==''||
                _self.oldPassword1 =='-'|| _self.oldPassword2 =='-' ||
                _self.oldPassword3 =='-'|| _self.oldPassword4=='-'){
                  _self.$refs.autoCloseDialog.open('请输入原密码') ;
                   return false ;
              }else if(oldWord==newWord){
                _self.$refs.autoCloseDialog.open('原密码和新密码不能相同') ;
                return false ;
            }
           if(_self.newPassword1 ==''|| _self. newPassword2 =='' ||
              _self.newPassword3 ==''|| _self.newPassword4==''||
               _self.newPassword1 =='-'|| _self. newPassword2 =='-' ||
               _self.newPassword3 =='-'|| _self.newPassword4=='-'){
                 _self.$refs.autoCloseDialog.open('请输入新密码') ;
                 return false ;
              }
           if(_self.newPassword_confirm1 ==''|| _self.newPassword_confirm2 =='' ||
              _self.newPassword_confirm3 ==''||_self.newPassword_confirm4==''||
               _self.newPassword_confirm1 =='-'|| _self.newPassword_confirm2 =='-' ||
               _self.newPassword_confirm3 =='-'||_self.newPassword_confirm4=='-'){
              _self.$refs.autoCloseDialog.open('请再次输入新密码') ;
                  return false ;
              }else if(newWord!=newWordC){
               _self.$refs.autoCloseDialog.open('请确认新密码是否一致') ;
                  return false ;
              }
            var  ChangePayWordData={
                 oldPassword:_self.oldPassword1+_self.oldPassword2+_self.oldPassword3+_self.oldPassword4,
                 tradePassword:_self.newPassword1+_self.newPassword2+_self.newPassword3+_self.newPassword4
               }
          $.ajax({
              type:'post',
              headers: { 'Authorization': 'bearer ' + _self.getAccessToken ,},
              dataType: 'json',
              url: _self.action.forseti + 'api/pay/passwd',
              data:  ChangePayWordData,
              success: (res) => {
                  if(res.msg=='原密码错误'){
                      _self.$refs.autoCloseDialog.open('原密码输入错误') ;
                      return false ;
                  }
                  if(res.err=='parameter error'||res.msg=='参数错误'){
                      _self.$refs.autoCloseDialog.open('修改失败，请重新操作') ;
                      return false ;
                  }
                  _self.$refs.autoCloseDialog.open('修改成功','','icon_check','d_check') ;
                  setTimeout(function(){
                      window.location = '/lobbyTemplate/info_data' ;
                  },2000)
              },
              error: (err) =>{
                  _self.$refs.autoCloseDialog.open('请输入正确密码') ;
              }
          })
      },
        //修改个人资料
        editDetails:function () {
            var _self=this;
            _self.showDetail=false

       } ,
        saveEdit :function () {
          var _self=this;
          if(_self.weChat==''||!_self.checkWechat(_self.weChat)){
               _self.$refs.autoCloseDialog.open('请输入正确微信号') ;
                return false
           }
          if(_self.qq==''||!_self.checkqq(_self.qq)){
               _self.$refs.autoCloseDialog.open('请输入正确QQ号') ;
               return false
          }
          if(_self.email==''||!_self.checkEmail(_self.email)){
              _self.$refs.autoCloseDialog.open('请输入正确的邮箱地址') ;
              return false
          }
          var EditData={
               wechat:_self.weChat,
               qq    :_self.qq,
               email :_self.email
          }
          $.ajax({
              type: 'post',
              headers: { 'Authorization': 'bearer ' + _self.getAccessToken ,},
              dataType: 'json',
              url: _self.action.uaa + 'api/data/member/chgInfo',
              data: EditData,
              success: (res) => {
                   if(res.err=='INPUT_ERR'){
                       _self.$refs.autoCloseDialog.open('请输入正确信息') ;
                       return
                   }
                  _self.$refs.autoCloseDialog.open('修改成功','','icon_check','d_check') ;
                  setTimeout(function(){
                      window.location = '/lobbyTemplate/info_data' ;
                  },2000)

              },
              error: (err) =>{
                  _self.$refs.autoCloseDialog.open('请输入正确提款信息') ;
              }
          })
      },
        //点击显示密码
        showPassword :function(cla) {
            if(cla=="eye1"){
                this.show=false
            }else if(cla=="eye2"){
                this.showC=false
            }else if(cla=="eye3"){
                this.showB=false
            }else if(cla=="act1"){
                this.show=true;
            }else if(cla=="act2"){
                this.showC=true
            }else if(cla=="act3"){
                this.showB=true
            }
        }
}

}
</script>