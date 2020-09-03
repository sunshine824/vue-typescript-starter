declare namespace StoreState {
  //登录参数
  export interface Login {
    username: string,
    password: string,
    captcha: string,
    uuid: string
  }

  //接口返回结构
  export interface Result {
    code: number,
    data: any,
    status: boolean,
    msg: string
  }
}