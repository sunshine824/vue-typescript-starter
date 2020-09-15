import { Post, Get } from "@/public/js/fetch"
import qs from 'qs'

//用户登录
export const login = (params: any) => {
  return Post({
    url: '/sys/login',
    data: params
  })
}

//用户登出
export const logout = (params: any) => {
  return Post({
    url: '/sys/logout',
    data: params
  })
}

//获取权限列表
export const getPermissionsList = (params: any) => {
  return Get({
    url: "/sys/menu/navPerson",
    data: qs.stringify(params)
  })
}