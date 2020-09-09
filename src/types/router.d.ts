import { RouterOptions } from 'vue-router'

declare module "vue-router" {
  //给第三方 interface 添加属性
  export interface RouterOptions {
    isAddDynamicMenuRoutes?: boolean
  }
}