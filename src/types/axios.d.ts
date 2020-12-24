import * as axios from 'axios'

declare module 'axios' {
  //解决axios “AxiosResponse<any>”上不存在属性“XXXX” 问题
  export interface AxiosResponse<T = any> extends StoreState.Result { }
}