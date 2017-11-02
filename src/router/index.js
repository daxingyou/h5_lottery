import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Reg from '@/components/Reg'
// import HksixlotIndex from '@/components/hksixlot/Index'
 import Jc11x5Index from '@/components/jc11x5/Index'  // 江西11选5
 import Pk10Index from '@/components/pk10/Index'  // 北京 pk10
import CqsscIndex from '@/components/cqssc/Index'  // 重庆时时彩
import TjsscIndex from '@/components/tjssc/Index'  // 天津时时彩
import XjsscIndex from '@/components/xjssc/Index'  // 新疆时时彩
import PastView from '@/components/publicTemplate/PastView'
import BetRecord from '@/components/publicTemplate/BetRecord'
import RoadBeads from '@/components/publicTemplate/RoadBeads'
import pk10RoadBeads from '@/components/publicTemplate/pk10RoadBeads'
import DsLong from '@/components/publicTemplate/DsLong'


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
    { path: '/publicTemplate/betRecord', name:'betRecord', component: BetRecord },
    { path: '/publicTemplate/roadBeads', name:'roadBeads', component: RoadBeads },
    { path: '/publicTemplate/pk10roadBeads', name:'pk10roadBeads', component: pk10RoadBeads },
    { path: '/publicTemplate/dsLong', name:'dsLong', component: DsLong },

  ]
})
