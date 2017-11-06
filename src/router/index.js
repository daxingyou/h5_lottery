import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Reg from '@/components/Reg'
// import HksixlotIndex from '@/components/hksixlot/Index'
import Jc11x5Index from '@/components/jc11x5/Index'  // 江西11选5
import SD11x5Index from '@/components/jc11x5/ShanDongIndex'  // 山东11选5
import GD11x5Index from '@/components/jc11x5/GuangDongIndex'  // 广东11选5
import K3Index from '@/components/k3/Index'  // 广东11选5
import AnHuiK3Index from '@/components/k3/AnHuiIndex'  // 安徽快3
import HuBeiK3Index from '@/components/k3/HuBeiIndex'  // 湖北快3

import Pk10Index from '@/components/pk10/Index'  // 北京 pk10
import CqsscIndex from '@/components/cqssc/Index'  // 重庆时时彩
import TjsscIndex from '@/components/tjssc/Index'  // 天津时时彩
import XjsscIndex from '@/components/xjssc/Index'  // 新疆时时彩
import PastView from '@/components/publicTemplate/PastView'
import lobbyPastView from '@/components/lobbyPastView'  // 大厅往期开奖
import BetRecord from '@/components/publicTemplate/BetRecord'
import lobbyBetRecord from '@/components/lobbyBetRecord'  // 大厅投注记录
import RoadBeads from '@/components/publicTemplate/RoadBeads'
import pk10RoadBeads from '@/components/publicTemplate/pk10RoadBeads'
import DsLong from '@/components/publicTemplate/DsLong'
import info from '@/components/lobbyTemplate/info'  // 大厅个人中心
import analysis from '@/components/lobbyTemplate/analysis'  // 大厅个人中心 盈亏分析
import acdetial from '@/components/lobbyTemplate/acdetial'  // 大厅个人中心 帐户明细
import deposit from '@/components/lobbyTemplate/deposit'  // 大厅个人中心 充值
import withdrawals from '@/components/lobbyTemplate/withdrawals'  // 大厅个人中心 提款
import agent from '@/components/lobbyTemplate/agent'  // 大厅代理加盟
import info_data from '@/components/lobbyTemplate/info_data'  //个人中心-账户管理
import notification from '@/components/lobbyTemplate/notification'  //个人中心-个人消息
import join from '@/components/lobbyTemplate/join'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base:'/app/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg
    },
    // {
    //   path: '/hksixlot', name: 'hksixlotIndex', component: HksixlotIndex
    // },
    {
      path: '/jc11x5/',
      name: 'jc11x5Index',
      component: Jc11x5Index
    },
    {
      path: '/jc11x5/sd11x5Index',
      name: 'jc11x5Index',
      component: SD11x5Index
    },
    {
      path: '/jc11x5/gd11x5Index',
      name: 'jc11x5Index',
      component: GD11x5Index
    },
    {
      path: '/k3/',
      name: 'k3Index',
      component: K3Index
    },
    {
      path: '/k3/anHuiK3Index',
      name: 'AnHuiK3Index',
      component: AnHuiK3Index
    },

    {
      path: '/k3/huBeiK3Index',
      name: 'HuBeiK3Index',
      component: HuBeiK3Index
    },

    {
      path: '/pk10/',
      name: 'pk10Index',
      component: Pk10Index
    },
    { //重庆时时彩
      path: '/cqssc/',
      name: 'cqsscIndex',
      component: CqsscIndex
    }, 
    {  // 天津时时彩
      path: '/tjssc/',
      name: 'tjsscIndex',
      component: TjsscIndex
    },
      {  // 新疆时时彩
          path: '/xjssc/',
          name: 'xjsscIndex',
          component: XjsscIndex
      },
    { path: '/publicTemplate/pastView', name:'pastView', component: PastView },
    { path: '/lobbyPastView', name:'lobbyPastView', component: lobbyPastView },
    { path: '/publicTemplate/betRecord', name:'betRecord', component: BetRecord },
    { path: '/lobbyBetRecord', name:'lobbyBetRecord', component: lobbyBetRecord },
    { path: '/publicTemplate/roadBeads', name:'roadBeads', component: RoadBeads },
    { path: '/publicTemplate/pk10roadBeads', name:'pk10roadBeads', component: pk10RoadBeads },
    { path: '/publicTemplate/dsLong', name:'dsLong', component: DsLong },
    { path: '/lobbyTemplate/info', name:'info', component: info },
    { path: '/lobbyTemplate/analysis', name:'analysis', component: analysis },
    { path: '/lobbyTemplate/acdetial', name:'acdetial', component: acdetial },
    { path: '/lobbyTemplate/deposit', name:'deposit', component: deposit },
    { path: '/lobbyTemplate/withdrawals', name:'deposit', component: withdrawals },
    { path: '/lobbyTemplate/agent', name:'deposit', component: agent },
    { path: '/lobbyTemplate/info_data', name:'deposit', component: info_data },
    { path: '/lobbyTemplate/notification', name:'deposit', component:notification },
    { path: '/lobbyTemplate/join', name:'deposit', component:join }

  ]
})
