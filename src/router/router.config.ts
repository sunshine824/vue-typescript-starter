/*
 * @Description: 路由配置
 * @Author: chenxin
 * @Date: 2020-09-22 16:11:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-16 23:12:19
 */
import { RouteConfig } from 'vue-router'
import { VerticalBasicLayout, LevelBasicLayout } from "@/layouts"

//主要路由
const mainRoutes: RouteConfig = {
  path: '/',
  name: 'home',
  redirect: '/login',
  component: LevelBasicLayout,
  children: [
    {
      path: '/404',
      name: '404',
      component: resolve => require(['@/views/exception/404'], resolve),
      meta: { title: '404', permission: ['exception'], hidden: true }
    },
    {
      path: '/403',
      name: '403',
      component: resolve => require(['@/views/exception/403'], resolve),
      meta: { title: '403', permission: ['exception'], hidden: true }
    },
    {
      path: '/500',
      name: '500',
      component: resolve => require(['@/views/exception/500'], resolve),
      meta: { title: '500', permission: ['exception'], hidden: true }
    }
  ]
}

//基础路由
const baseRoutes: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/user/login'], resolve)
  },
  {
    path: '*',
    redirect: '/403',
  }
]

export { mainRoutes, baseRoutes }
