import { Post, Get } from "@/public/js/fetch"
import qs from 'qs'

//用户登录
export const login = (params: any) => {
  return Post({
    url: '/sys/login',
    data: params
  })
}

//获取权限列表
export function getPermissionsList(params: any) {
  return Get({
    url: "/sys/menu/navPerson",
    data: qs.stringify(params)
  })
}