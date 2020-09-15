import Vue from 'vue'
import VueRouter, { RawLocation, Route, RouteConfig } from 'vue-router'
import { mainRoutes, baseRoutes } from './router.config'
import { getToken } from '@/utils/token';
import { getPermissionsList } from '@/api/users';
import { isURL } from '@/utils/methods';

//防止路由重复点击报错
const originalPush: any = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: RawLocation): Promise<Route> {
  return originalPush.call(this, location).catch((err: any) => err)
}

Vue.use(VueRouter)

//路由字典表
const dictPath: {
  [key: string]: any
} = {
  "Control": '/control',
  "Arrange": '/arrange',
  "Schedule": '/schedule',
  "Monitor": '/monitor'
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: [mainRoutes].concat(baseRoutes)
})

router.beforeEach(async (to, from, next: any) => {
  let token: string = getToken() as string
  if (token) {
    if (!router.options.isAddDynamicMenuRoutes) {
      //获取权限列表
      try {
        let res = await getPermissionsList({})
        if (res.code == 200) {
          let menu = res['data']['sync']
          let mainRoutes: any = fnAddDynamicMenuRoutes(menu['menuList'] || [])
          router.options.isAddDynamicMenuRoutes = true
          sessionStorage.setItem("userInfo", JSON.stringify(res['data']['userInfo']))
          sessionStorage.setItem("sysCompany", JSON.stringify(res['data']['sysCompany']))
          sessionStorage.setItem('permissions', JSON.stringify(menu['permissions'] || '[]'))
          if (to.path == '/' || to.path == '/login') {
            let firstName = mainRoutes.length && mainRoutes[0].name
            next({ name: firstName, replace: true })
          } else {
            next({ path: to.redirectedFrom })
          }
        } else {
          sessionStorage.setItem('menuList', '[]')
          sessionStorage.setItem('permissions', '[]')
          next()
        }
      } catch (error) {
        console.log(`%c${error} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      }
    } else {
      if (to.path == '/' || to.path == '/login') {
        next(from)
      } else {
        next()
      }
    }
  } else {
    router.options.isAddDynamicMenuRoutes = false
    if (to.name != 'login') {
      next({ name: 'login' })
    }
    next()
  }
})

function fnAddDynamicMenuRoutes(menuList: StoreState.Role[], routes: RouteConfig[] = []) {
  let temp: StoreState.Role[] = []
  menuList.map((item: StoreState.Role) => {
    if (item.list && item.list.length >= 1) {
      temp = temp.concat(item.list)
    } else if (item.url && /\S/.test(item.url)) {
      item.url = item.url.replace(/^\//, '')
      let route: any = {
        path: dictPath[item.url] || item.url,
        component: null,
        name: item.url.toLowerCase(),
        meta: {
          menuId: item.menuId,
          title: item.name,
          keepAlive: false,
          hidden: false
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(item.url)) {
        route['path'] = `i-${item.menuId}`
        route['name'] = `i-${item.menuId}`
        route['meta']['iframeUrl'] = item.url
      } else {
        try {
          route['component'] = (resolve: any) => require([`@/views/${item.url}/index`], resolve)
        } catch (e) { }
      }
      routes.push(route)
    }
  })
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.children = routes.concat(mainRoutes.children as RouteConfig[])
    router.addRoutes([
      mainRoutes,
      { path: '*', redirect: { name: '403' } }
    ])
    return mainRoutes.children
  }
}

export default router
