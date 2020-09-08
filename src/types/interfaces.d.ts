declare namespace StoreState {
  //接口返回结构
  export interface Result {
    code: number,
    data: any,
    status: boolean,
    msg: string
  }

  //请求参数结构
  export interface FetchParams {
    url: string,
    data: object | string,
    [propName: string]: any
  }
}