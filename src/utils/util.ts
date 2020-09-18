import CryptoJS from "crypto-js"
import SparkMD5 from 'spark-md5'

//初始化背景墙
export const initBg = () => {
  const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8,
    STAR_SIZE = 3,
    STAR_MIN_SCALE = 0.2,
    OVERFLOW_THRESHOLD = 50;

  const canvas = document.querySelector("#bg"),
    context = (canvas as any).getContext("2d");

  let scale = 1, // device pixel ratio
    width: any,
    height: any;

  let stars: any[] = [];

  let pointerX: any, pointerY: any;

  let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

  let touchInput = false;

  generate();
  resize();
  step();

  window.onresize = resize;

  function generate() {
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: 0,
        y: 0,
        z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
      });
    }
  }

  function placeStar(star: any) {
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  }

  function recycleStar(star: any) {
    let direction = "z";

    let vx = Math.abs(velocity.x),
      vy = Math.abs(velocity.y);

    if (vx > 1 || vy > 1) {
      let axis;

      if (vx > vy) {
        axis = Math.random() < vx / (vx + vy) ? "h" : "v";
      } else {
        axis = Math.random() < vy / (vx + vy) ? "v" : "h";
      }

      if (axis === "h") {
        direction = velocity.x > 0 ? "l" : "r";
      } else {
        direction = velocity.y > 0 ? "t" : "b";
      }
    }

    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

    if (direction === "z") {
      star.z = 0.1;
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    } else if (direction === "l") {
      star.x = -OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === "r") {
      star.x = width + OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === "t") {
      star.x = width * Math.random();
      star.y = -OVERFLOW_THRESHOLD;
    } else if (direction === "b") {
      star.x = width * Math.random();
      star.y = height + OVERFLOW_THRESHOLD;
    }
  }

  function resize() {
    scale = window.devicePixelRatio || 1;

    width = window.innerWidth * scale;
    height = window.innerHeight * scale;

    (canvas as any).width = width;
    (canvas as any).height = height;

    stars.forEach(placeStar);
  }

  function step() {
    context.clearRect(0, 0, width, height);

    update();
    render();

    requestAnimationFrame(step);
  }

  function update() {
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;

    velocity.x += (velocity.tx - velocity.x) * 0.8;
    velocity.y += (velocity.ty - velocity.y) * 0.8;

    stars.forEach(star => {
      star.x += velocity.x * star.z;
      star.y += velocity.y * star.z;

      star.x += (star.x - width / 2) * velocity.z * star.z;
      star.y += (star.y - height / 2) * velocity.z * star.z;
      star.z += velocity.z;

      // recycle when out of bounds
      if (
        star.x < -OVERFLOW_THRESHOLD ||
        star.x > width + OVERFLOW_THRESHOLD ||
        star.y < -OVERFLOW_THRESHOLD ||
        star.y > height + OVERFLOW_THRESHOLD
      ) {
        recycleStar(star);
      }
    });
  }

  function render() {
    stars.forEach(star => {
      context.beginPath();
      context.lineCap = "round";
      context.lineWidth = STAR_SIZE * star.z * scale;
      context.strokeStyle =
        "rgba(255,255,255," + (0.5 + 0.5 * Math.random()) + ")";

      context.beginPath();
      context.moveTo(star.x, star.y);

      var tailX = velocity.x * 2,
        tailY = velocity.y * 2;

      // stroke() wont work on an invisible line
      if (Math.abs(tailX) < 0.1) tailX = 0.5;
      if (Math.abs(tailY) < 0.1) tailY = 0.5;

      context.lineTo(star.x + tailX, star.y + tailY);

      context.stroke();
    });
  }

  function movePointer(x: any, y: any) {
    if (typeof pointerX === "number" && typeof pointerY === "number") {
      let ox = x - pointerX,
        oy = y - pointerY;

      velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
      velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
    }

    pointerX = x;
    pointerY = y;
  }
}

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