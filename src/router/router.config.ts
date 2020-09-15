import { RouteConfig } from 'vue-router'
import { BasicLayout } from "@/layouts"

//主要路由
const mainRoutes: RouteConfig = {
  path: '/',
  name: 'home',
  redirect: '/login',
  component: BasicLayout,
  children: [
    {
      path: '/404',
      name: '404',
      component: resolve => require(['@/views/Exception/404'], resolve),
      meta: { title: '404', permission: ['exception'], hidden: true }
    },
    {
      path: '/403',
      name: '403',
      component: resolve => require(['@/views/Exception/403'], resolve),
      meta: { title: '403', permission: ['exception'], hidden: true }
    },
    {
      path: '/500',
      name: '500',
      component: resolve => require(['@/views/Exception/500'], resolve),
      meta: { title: '500', permission: ['exception'], hidden: true }
    }
  ]
}

//基础路由
const baseRoutes: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/User/Login'], resolve)
  },
  {
    path: '*',
    redirect: '/403',
  }
]

export { mainRoutes, baseRoutes }
