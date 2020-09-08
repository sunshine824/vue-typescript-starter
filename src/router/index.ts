import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { BasicLayout } from "@/layouts"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
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
        meta: { title: '控制台', keepAlive: false }
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
