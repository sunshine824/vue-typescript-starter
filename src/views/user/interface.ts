export module User {
  //登录请求参数
  export interface Login {
    username: string,
    password: string,
    captcha: string,
    uuid: string
  }

  //修改密码
  export interface UpdatePass {
    userName: string,
    password: string,
    newPassword: string,
    confirmPassword: string
  }
}