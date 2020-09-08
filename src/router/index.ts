import Vue from 'vue'
import VueRouter, { RouteConfig, RawLocation, Route } from 'vue-router'
import { BasicLayout } from "@/layouts"

//防止路由重复点击报错
const originalPush: any = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: RawLocation): Promise<Route> {
  return originalPush.call(this, location).catch((err: any) => err)
}

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
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
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/user/Login'], resolve)
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
