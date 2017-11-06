<template>
    <div id="pa_con" class="so-con warp bule_bg">
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
                        <a href="info_data.html">
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
                        </a>
                    </div>
                </div>
                <div class="info_mid">
                    <div>
                        <div class="btn btn_blue btn_two lgps">
                            <a>修改登录密码</a>
                        </div>
                        <div class="btn btn_blue btn_two pps">
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
        <!--<footer class="bot_nav">-->
            <!--<ul>-->
                <!--<li class="active">-->
                    <!--<a class="index" href="../">首页大厅</a>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<a class="trend" href="lobby_past_view.html">往期开奖</a>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<a class="record" href="publicTemplate/bet_record.html">投注纪录</a>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<a class="member" href="info.html">个人中心</a>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</footer>-->
        <div class="dropdown" style="display:none;">
            <div class="play_area">
                <div class="password_area">
                    <form>
                        <fieldset>
                            <div class="form_g password text pay_password">
                                <legend>原密码</legend>
                                <select>
                                    <option>_</option>
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
                                <select>
                                    <option>_</option>
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
                                <select>
                                    <option>_</option>
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
                                <select>
                                    <option>_</option>
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
                            <label class="red">原密码错误，请重新输入</label>
                        </fieldset>
                        <fieldset>
                            <div class="form_g password text pay_password">
                                <legend>新密码</legend>
                                <select>
                                    <option>_</option>
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
                                <select>
                                    <option>_</option>
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
                                <select>
                                    <option>_</option>
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
                                <select>
                                    <option>_</option>
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
                            <label class="red">两次密码输入不一致</label>
                        </fieldset>
                        <fieldset>
                            <div class="form_g password text pay_password">
                                <legend>确认密码</legend>
                                <select>
                                    <option>_</option>
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
                                <select>
                                    <option>_</option>
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
                                <select>
                                    <option>_</option>
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
                                <select>
                                    <option>_</option>
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
                            <label class="red">请输入6~20位密码</label>
                        </fieldset>
                    </form>
                    <div>
                        <div class="btn btn_two round btn_outline"><a href="javascript:;">取消</a></div>
                        <div class="btn btn_two round btn_blue02"><a href="javascript:;">确定</a></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="so-shade"></div>
    </div>
</template>

<script>
import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'

export default {
  name: 'Login',
  mixins:[Mixin],
  components: {
   // AutoCloseDialog,
      FooterNav ,
  },
    data: function() {
        return {

        }
    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' )  ;

  },
  methods: {

}

}
</script>