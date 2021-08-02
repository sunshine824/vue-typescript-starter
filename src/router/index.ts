import Vue from 'vue';
import VueRouter, { RawLocation, Route, RouteConfig } from 'vue-router';
import { getToken } from '@/utils/token';
import { getPermissionsList } from '@/api/users';
import { RouteLayout } from '@/layouts';
import { mainRoutes, baseRoutes } from './router.config';

// 是否需要动态路由   true:是  false:否
const DYNROUTER = true;

// 防止路由重复点击报错
const originalPush: any = VueRouter.prototype.push;
VueRouter.prototype.push = function push(
  location: RawLocation
): Promise<Route> {
  return originalPush.call(this, location).catch((err: any) => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: [mainRoutes].concat(baseRoutes)
});

function fnAddDynamicMenuRoutes(
  menuList: StoreState.Role[],
  routes: RouteConfig[] = []
) { 
  menuList.forEach((item) => {
    if (!item.list) {
      routes.push({
        path: `/${item.url}`,
        name: item.url,
        component: (resolve: any) => require([`@/views/${item.url}/index`], resolve),
        meta: {
          title: item.name,
          hidden: false,
          icon: item.icon
        }
      });
    } else if (item.list && item.list.length) {
      routes.push({
        path: `/${item.url}`,
        name: item.url,
        component: RouteLayout,
        children: fnAddDynamicMenuRoutes(item.list, []),
        meta: {
          title: item.name,
          hidden: false,
          icon: item.icon
        }
      });
    }
  });
  return routes;
}

if (DYNROUTER) {
  router.beforeEach(async (to, from, next: any) => {
    const token: string = getToken() as string;
    if (token) {
      // 第一次加载路由列表并且该项目需要动态路由
      if (!router.options.isAddDynamicMenuRoutes) {
        // 获取权限列表
        try {
          const res = await getPermissionsList({});
          if (res.code == 200) {
            const menu = res.data;
            const menuRoutes: any = fnAddDynamicMenuRoutes(
              menu.menuList || []
            );
            mainRoutes.children = menuRoutes;
            router.addRoutes([
              mainRoutes,
              { path: '*', redirect: { name: '403' } }
            ]);
            router.options.isAddDynamicMenuRoutes = true;
            sessionStorage.setItem(
              'permissions',
              JSON.stringify(menu.permissions || '[]')
            );
            if (to.path == '/' || to.path == '/login') {
              const firstName = menuRoutes.length && menuRoutes[0].name;
              next({ name: firstName, replace: true });
            } else {
              next({ path: to.redirectedFrom });
            }
          } else {
            sessionStorage.setItem('menuList', '[]');
            sessionStorage.setItem('permissions', '[]');
            next();
          }
        } catch (error) {
          console.log(
            `%c${error} 请求菜单列表和权限失败，跳转至登录页！！`,
            'color:blue'
          );
        }
      } else {
        if (to.path == '/' || to.path == '/login') {
          next(from);
        } else {
          next();
        }
      }
    } else {
      router.options.isAddDynamicMenuRoutes = false;
      if (to.name != 'login') {
        next({ name: 'login' });
      }
      next();
    }
  });
}

export default router;
