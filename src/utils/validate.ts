/*
 * @Description: 验证库
 * @Author: chenxin
 * @Date: 2020-09-28 16:13:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-16 23:18:30
 */

//手机号验证
export const validateMobile = (value: string) => {
  return /^[1][3,4,5,7,8,9][0-9]{9}$/.test(value);
};

//身份证验证
export const validateCard = (value: string) => {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
};

//验证年龄
export const validateAge = (value: string) => {
  return /^(([0-9]|[1-9][1-9]|1[0-7][0-9])(\\.[0-9]+)?|180)$/.test(value);
};

// 微信号验证
export const validatWeChat = (value: string) => {
  return /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/.test(value);
};

// 中文验证
export const validateEnName = (value: string) => {
  return /^[\u4e00-\u9fa5]{0,10}$/.test(value);
};

// 验证IP
export const validateIP = (value: string) => {
  return /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(
    value
  );
};

// 验证端口  为正整数，值范围1-65535
export const validatePort = (value: string) => {
  return /(^[1-9]\d{0,3}$)|(^[1-5]\d{4}$)|(^6[0-4]\d{3}$)|(^65[0-4]\d{2}$)|(^655[0-2]\d$)|(^6553[0-5]$)/.test(
    value
  );
};

// 服务地址限定条件 英文、数字、:、/、.、@、_、#、*,长度为1-256
export const validateAddress = (value: string) => {
  return /^[A-Za-z0-9:/@._#*]{1,256}$/.test(value)
}

//验证1到99999999正整数
export const validateRate = (value: string) => {
  return /^[1-9][0-9]{0,7}$/.test(value)
}