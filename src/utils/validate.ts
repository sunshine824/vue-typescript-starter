/*
 * @Description: 验证库
 * @Author: chenxin
 * @Date: 2020-09-28 16:13:12
 * @LastEditors: chenxin
 * @LastEditTime: 2020-09-28 17:25:43
 */

//手机号验证
export const validateMobile = (value: string) => {
  return /^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)
}

//身份证验证
export const validateCard = (value: string) => {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
}

//验证年龄
export const validateAge = (value: string) => {
  return /^(([0-9]|[1-9][1-9]|1[0-7][0-9])(\\.[0-9]+)?|180)$/.test(value)
}