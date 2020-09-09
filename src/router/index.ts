import Vue from 'vue'
import VueRouter, { RawLocation, Route, RouterOptions } from 'vue-router'
import { mainRoutes, baseRoutes } from './router.config'

//防止路由重复点击报错
const originalPush: any = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: RawLocation): Promise<Route> {
  return originalPush.call(this, location).catch((err: any) => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: [mainRoutes].concat(baseRoutes)
})

export default router
