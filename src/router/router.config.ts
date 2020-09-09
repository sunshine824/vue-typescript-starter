import { RouteConfig} from 'vue-router'
import { BasicLayout } from "@/layouts"

//主要路由
const mainRoutes: RouteConfig = {
  path: '/',
  name: 'Home',
  redirect: '/login',
  component: BasicLayout,
  children: [
    {
      path: '/control',
      name: 'control',
      component: resolve => require(['@/views/control/index'], resolve),
      meta: { title: '控制台', keepAlive: false, hidden: false }
    },
    {
      path: '/404',
      name: 'Exception404',
      component: resolve => require(['@/views/exception/404'], resolve),
      meta: { title: '404', permission: ['exception'], hidden: true }
    }
  ]
}

//基础路由
const baseRoutes: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/user/Login'], resolve)
  },
  {
    path: '*',
    redirect: '/404',
  }
]

export { mainRoutes, baseRoutes }
