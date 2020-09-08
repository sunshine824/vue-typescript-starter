import { Post } from "@/public/js/fetch"
import qs from 'qs'

//用户登录
export const login = (params: any) => {
  return Post({
    url: '/sys/login',
    data: params
  })
}