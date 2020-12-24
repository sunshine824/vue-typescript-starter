import service from "@/utils/fetch"
import qs from 'qs'

//用户登录
export const login = (params: any): any => {
  return service({
    method: "post",
    url: '/login',
    data: params
  })
}

//用户登出
export const logout = (params: any) => {
  return service({
    method: "get",
    url: '/logout',
    data: params
  })
}

//获取权限列表
export const getPermissionsList = (params: any) => {
  return service({
    method: "get",
    url: "/navPerson",
    data: qs.stringify(params)
  })
}