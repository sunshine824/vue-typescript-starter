/*
 * @Description: 工具包
 * @Author: chenxin
 * @Date: 2020-09-22 16:11:50
 * @LastEditors: chenxin
 * @LastEditTime: 2020-09-29 11:14:29
 */

import CryptoJS from "crypto-js"
import SparkMD5 from 'spark-md5'

const PublicKey: string = 'ZHONGGUODIANWANG'
const IvKey: string = 'ZHONGGUODIANWANG'

/**
 * URL地址
 * @param {*} s
 */
export const isURL = (s: string): boolean => {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 验证密码强度
 * @param value
 */
export const checkPassModes = (value: string): number => {
  let modes: number = 0;
  //正则表达式验证符合要求的
  if (value.length < 1) return modes;
  if (/\d/.test(value)) modes++; //数字
  if (/[a-z]/.test(value)) modes++; //小写
  if (/[A-Z]/.test(value)) modes++; //大写
  if (/\W/.test(value)) modes++; //特殊字符
  return modes;
}

/**
 * 判断是否是IE
 */
export const isIE = () => {
  const bw = window.navigator.userAgent
  const compare = (s: string) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/*
* ECB加密
* @param  {String}     word    需要加密的密码
* @param  {String}     keyStr    对密码加密的秘钥
* @return {String}     加密的密文
* */
export const ECBEncrypt = (word: string | number, keyStr?: string) => {
  keyStr = keyStr ? keyStr : PublicKey;
  word = typeof word != 'string' ? word.toString() : word
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let encryptedData = CryptoJS.AES.encrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encryptedData.toString();
}

/*
* ECB解密
* @param  {String}     word    需要加密的密码
* @param  {String}     keyStr    对密码加密的秘钥
* @return {String}      解密的明文
* */
export const ECBDecrypt = (word: string | number, keyStr?: string) => {
  keyStr = keyStr ? keyStr : PublicKey;
  word = typeof word == 'number' ? word.toString() : word
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let encryptedHexStr = CryptoJS.enc.Base64.parse(word);
  let encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decryptedData.toString(CryptoJS.enc.Utf8)
}

/*
* CBC加密
* @param  {String}     word    需要加密的密码
* @param  {String}     keyStr    对密码加密的秘钥
* @return {String}     加密的密文
* */
export const CBCEncrypt = (word: string | number, keyStr?: string) => {
  keyStr = keyStr ? keyStr : PublicKey;
  word = typeof word == 'number' ? word.toString() : word
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(IvKey);

  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/*
* CBC解密
* @param  {String}     word    需要加密的密码
* @param  {String}     keyStr    对密码加密的秘钥
* @return {String}      解密的明文
* */
export const CBCDecrypt = (word: string | number, keyStr?: string) => {
  keyStr = keyStr ? keyStr : PublicKey;
  word = typeof word == 'number' ? word.toString() : word
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const iv = CryptoJS.enc.Utf8.parse(IvKey);

  let encryptedHexStr = CryptoJS.enc.Base64.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();

}

/**
 * 获取上传文件md5
 * @param {*} dataFile
 */
export const getUploadFileMd5 = (dataFile: Blob) => {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader()
    let spark = new SparkMD5.ArrayBuffer()
    //获取文件二进制数据
    fileReader.readAsArrayBuffer(dataFile)
    fileReader.onload = (e: ProgressEvent) => {
      spark.append((e.target as any).result)
      var md5 = spark.end()
      return resolve(ECBEncrypt(md5))
    }
  })
}