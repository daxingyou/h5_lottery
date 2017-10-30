import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Reg from '@/components/Reg'
// import HksixlotIndex from '@/components/hksixlot/Index'
 import Jc11x5Index from '@/components/jc11x5/Index'
// import Pk10Index from '@/components/pk10/Index'
// import Cqssc from '@/components/Cqssc/Default'
import CqsscIndex from '@/components/cqssc/Index'
import PastView from '@/components/publicTemplate/PastView'
import BetRecord from '@/components/publicTemplate/BetRecord'
import RoadBeads from '@/components/publicTemplate/RoadBeads'
import DsLong from '@/components/publicTemplate/DsLong'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/app/',
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
   /* {
      path: '/pk10/',
      name: 'pk10Index',
      component: Pk10Index
    },*/
    {
      path: '/cqssc/',
      name: 'cqsscIndex',
      component: CqsscIndex
    }, 
    { path: '/publicTemplate/pastView', name:'pastView', component: PastView },
    { path: '/publicTemplate/betRecord', name:'betRecord', component: BetRecord },
    { path: '/publicTemplate/roadBeads', name:'roadBeads', component: RoadBeads },
    { path: '/publicTemplate/dsLong', name:'dsLong', component: DsLong },

  ]
})
