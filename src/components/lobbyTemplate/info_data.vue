<template>
    <div id="pa_con" class="so-con warp cover_bg">
        <header id="pa_head">
            <div class="left">
                <a href="../">
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
                                <strong>Elsa001EDKoes2</strong>
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
                                    工商银行<br/>
                                    123456123456123456
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <li>开户行</li>
                                </th>
                                <td>北京市朝阳区朝来分行</td>
                            </tr>
                            <tr>
                                <th>
                                    <li>真实姓名</li>
                                </th>
                                <td>大哥</td>
                            </tr>
                            <tr>
                                <th>
                                    <li>手机号码</li>
                                </th>
                                <td>12455323422</td>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="info_personal">
                    <div>个人信息
                        <a class="info_data_modify" href="info_data_modify.html">
                            <i class="icon write"></i>修改</a>
                    </div>
                    <div class="print_data">
                        <table>
                            <thead>
                            <tr>
                                <th>
                                    <li>微信</li>
                                </th>
                                <td>www123</td>
                            </tr>
                            <tr>
                                <th>
                                    <li>QQ</li>
                                </th>
                                <td>2830131</td>
                            </tr>
                            <tr>
                                <th>
                                    <li>电子邮箱</li>
                                </th>
                                <td>tt@qq.com</td>
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
                        <fieldset>
                            <div class="form_g text">
                                <legend>原密碼</legend>
                                <input type="password" placeholder="请输入密码" v-model="changePassword.oldPassword" class="oldPassword" @input="checkUserName(changePassword.oldPassword,'oldPassword','请输入4~15位密码')">
                                <i class="eye"></i>
                            </div>
                            <!--<label class="error-message "></label>-->
                        </fieldset>
                        <fieldset>
                            <div class="form_g text">
                                <legend>新密碼</legend>
                                <input type="password" placeholder="请输入密码" v-model="changePassword.newPassword" class="newPassword" @input="checkUserName(changePassword.newPassword,'newPassword','请输入4~15位密码')">
                                <i class="eye"></i>
                            </div>
                            <!--<label class="error-message "></label>-->
                        </fieldset>
                        <fieldset>
                            <div class="form_g text">
                                <legend>確認密碼</legend>
                                <input type="password" placeholder="请输入密码" v-model="changePassword.newPassword_confirm" class="newPassword_confirm" @input="checkUserName(changePassword.newPassword_confirm,'newPassword_confirm','请输入4~15位密码')">
                                <i class="eye"></i>
                            </div>
                            <!--<label class="error-message "></label>-->
                        </fieldset>
                    </form>
                    <div>
                        <div class="cancel-btn btn btn_two round btn_outlineb"><a href="javascript:;">取消</a></div>
                        <div class="btn btn_two round btn_blue02"><a href="javascript:;"@click=" submitChangePassword()" >确定</a></div>
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
                                <select v-model=" changePayWord.oldPassword1">
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
                                <select v-model=" changePayWord.oldPassword2">
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
                                <select v-model=" changePayWord.oldPassword3">
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
                                <select v-model=" changePayWord.oldPassword4">
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
                            <!--<label class="error-message "></label>-->
                        </fieldset>
                        <fieldset>
                            <div class="form_g password text pay_password">
                                <legend>新密码</legend>
                                <select v-model=" changePayWord.newPassword1">
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
                                <select v-model=" changePayWord.newPassword2">
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
                                <select v-model="  changePayWord.newPassword3">
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
                                <select  v-model="  changePayWord.newPassword4">
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
                            <!--<label class="error-message "></label>-->
                        </fieldset>
                        <fieldset>
                            <div class="form_g password text pay_password">
                                <legend>确认密码</legend>
                                <select v-model=" changePayWord.newPassword_confirm1">
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
                                <select v-model=" changePayWord.newPassword_confirm2">
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
                                <select v-model=" changePayWord.newPassword_confirm3">
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
                                <select v-model=" changePayWord.newPassword_confirm4">
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
            changePassword: {  // 修改登录密码
                        oldPassword:'',
                        newPassword:'',
                        newPassword_confirm:''
                   },
            changePayWord:  {  // 修改支付密码
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
                   }
        }
    },
    created: function() {
//        var _self = this;
//        _self.hasLogin = _self.ifLanded();
//        _self.getUserInfo();
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
      // 获取用户信息
      getUserInfo: function() {
          var _self = this;
//           $.ajax('user/member/detail/get', {}, function(data) {
//              if(data.apistatus == 1){
//                  _self.userId = data.result.account || '';
//              }
            $.ajax({

            })
//
//          }, 'get', function(data) {
//              if (data.apistatus == '0' && data.errorCode == '1000020') {
//
//                  common.toast({
//                      content: '会员未登录！',
//                      time: 1
//                  });
//
//                  setTimeout('common.logOut()', 1000);
//              }
//              if (data.errorCode == '1000003') {
//                  common.toast({
//                      content: '该会员已被停用！',
//                      time: 1
//                  });
//                  setTimeout('common.logOut()', 1000);
//              }
//          });
      },

      //修改登录密码
      submitChangePassword:function () {
             var _self=this;
             if(_self.changePassword.oldPassword==''){
                 return false ;
             }
             if(_self.changePassword.newPassword==''&&_self.changePassword.newPassword==_self.changePassword.oldPassword){
              return false ;
             }
             if(_self.changePassword.newPassword_confirm==''){
              return false ;
             }
             var falg = $('.error-message').hasClass('red') ;  // 验证不通过，不允许提交
             if(falg){
               return false ;
             }
            var ChangePasswordData={
                oldPassword:this.changePassword.oldPassword,
                newPassword:this.changePassword.newPassword
               }
             $.ajax({
                 type:'post',
                 headers: { 'Authorization': 'bearer ' + _self.getAccessToken ,},
                 dataType: 'json',
                 url: _self.action.uaa + 'api/data/member/password',
                 data: ChangePasswordData,
                 success: (res) => {
                     _self.$refs.autoCloseDialog.open('修改成功') ;
                     setTimeout(function(){
                         window.location = '/lobbyTemplate/info_data' ;
                     },2000)
                 },
                 error: (err) =>{
                     _self.$refs.autoCloseDialog.open('请输入正确密码') ;
                 }
             })
      },
      //修改交易密码
      submitChangePayWord : function(){
          var _self=this;
          if(_self. changePayWord.oldPassword1 ==''|| _self. changePayWord.oldPassword2 =='' ||
              _self.changePayWord.oldPassword3 ==''|| _self.changePayWord.oldPassword4==''){
                  _self.$refs.autoCloseDialog.open('请输入原密码') ;
                   return false ;
              }
          if(_self. changePayWord.newPassword1 ==''|| _self. changePayWord.newPassword2 =='' ||
              _self. changePayWord.newPassword3 ==''|| _self.changePayWord.newPassword4==''){
                 _self.$refs.autoCloseDialog.open('请输入新密码') ;
                 return false ;
              }
          if(_self. changePayWord.newPassword_confirm1 ==''|| _self. changePayWord.newPassword_confirm2 =='' ||
              _self. changePayWord.newPassword_confirm3 ==''||  _self.changePayWord.newPassword_confirm4==''){
              _self.$refs.autoCloseDialog.open('请再次输入新密码') ;
              return false ;
              }
           var  ChangePayWordData={
                 oldPassword:_self. changePayWord.oldPassword1+_self. changePayWord.oldPassword2+_self. changePayWord.oldPassword3+_self. changePayWord.oldPassword4,
                 tradePassword:_self. changePayWord.newPassword1+_self. changePayWord.newPassword2+_self. changePayWord.newPassword3+_self. changePayWord.newPassword4
               }
          $.ajax({
              type:'post',
              headers: { 'Authorization': 'bearer ' + _self.getAccessToken ,},
              dataType: 'json',
              url: _self.action.forseti + 'api/pay/passwd',
              data:  ChangePayWordData,
              success: (res) => {
                  _self.$refs.autoCloseDialog.open('修改成功') ;
                  setTimeout(function(){
                      window.location = '/lobbyTemplate/info_data' ;
                  },2000)
              },
              error: (err) =>{
                  _self.$refs.autoCloseDialog.open('请输入正确密码') ;
              }
          })
      }
}

}
</script>