export module User {
  //登录参数
  export interface Login {
    username: string,
    password: string,
    captcha: string,
    uuid: string
  }
}