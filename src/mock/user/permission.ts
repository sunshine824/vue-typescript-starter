import Mock from "mockjs"
import { Result } from "../result"

const Roles = [
  { name: '控制台', url: 'control' },
  { name: '任务编排', url: 'arrange' },
  { name: '作业调度', url: 'schedule' },
  { name: '监控管理', url: 'monitor' },
]

Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/navPerson`, 'get', () => {
  let result = new Result()
  let menuList: StoreState.Role[] = []
  Roles.map(role => {
    menuList.push(role)
  })
  result.data = {
    menuList: menuList,
    permissions: []
  }
  return result
})