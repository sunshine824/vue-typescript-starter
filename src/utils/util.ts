import CryptoJS from "crypto-js"
import SparkMD5 from 'spark-md5'

const KEY: string = 'ZHONGGUODIANWANG'

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
* 对密码进行加密，传输给后台进行验证
* @param  {String}     word    需要加密的密码
* @param  {String}     keyStr    对密码加密的秘钥
* @return {String}     加密的密文
* */
export const encrypt = (word: string | number, keyStr?: string) => {
  keyStr = keyStr ? keyStr : KEY;
  word = typeof word == 'number' ? word.toString() : word
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let encryptedData = CryptoJS.AES.encrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encryptedData.toString();
}

/*
* 对加密之后的密文在页面上进行解密，以便用户进行修改
* @param  {String}     word    需要加密的密码
* @param  {String}     keyStr    对密码加密的秘钥
* @return {String}      解密的明文
* */
export const decrypt = (word: string | number, keyStr?: string) => {
  keyStr = keyStr ? keyStr : KEY;
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
      return resolve(encrypt(md5))
    }
  })
}