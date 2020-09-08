export module User {
  //登录请求参数
  export interface Login {
    username: string,
    password: string,
    captcha: string,
    uuid: string
  }
}