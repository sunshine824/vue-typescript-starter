### 简介

此项目是基于 Vue 全家桶 + TypeScript + Antd 搭建简易脚手架。

TypeScript 具有类型系统，且是 JavaScript 的超集，TypeScript 在 2018 年 势头迅猛，可谓遍地开花。

Vue3.0 将使用 TS 重写，重写后的 Vue3.0 将更好的支持 TS。2020 年 TypeScript 将会更加普及，能够熟练掌握 TS，并使用 TS 开发过项目，将更加成为前端开发者的优势。

### 目录结构

```bash
.
├── README.md
├── babel.config.js
├── package-lock.json
├── package.json
├── public
│   ├── config.js
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── api                     # 接口管理模块
│   ├── assets                  # 静态资源模块
│   ├── components              # 公共组件模块
│   ├── i18n                    # 国际化模块
│   ├── layouts                 # 公共自定义布局
│   ├── main.ts                 # 入口文件
│   ├── public                  # 公共资源模块
│   ├── router                  # 路由
│   ├── store                   # vuex状态库
│   ├── types                   # 声明文件
│   ├── utils                   # 公共方法模块
│   └── views                   # 视图模块
├── tsconfig.json
└── vue.config.js
```

### 功能

#### 已经完成功能

- [x] 登录
- [x] 退出
- [x] 修改密码
- [x] 动态路由
- [x] 国际化
- [x] eslint
- [x] 支持 flv，hls，rtmp 格式视频播放

#### 如何关闭动态路由

将 src/router/index.ts 中 DYNROUTER 变量设置为 false，即为关闭，反之开启.  
当 DYNROUTER 为关闭状态时，路由可配置在 router.config.ts 的 mainRoutes 主路由中

#### 待优化或者实现

刚开始学习 TypeScript，对 TS 的运用还有待提高，后续会触入更多的 TypeScript 特性。

- [ ] 使用 vuex-module-decorators
- [ ] 更多 TypeScript 的优化技巧
- [ ] 服务器渲染 SSR

### 相关包版本号

所有技术都是当前最新的。

- vue： ^2.6.11
- typescript : ^3.9.3
- ant-design-vue： 1.6.5
- vue-router : ^3.2.0
- less： ^3.0.4
- vuex: ^3.4.0
- axios：0.19.0
- vuex-module-decorators： ^0.17.0

### Build Setup

```
# clone
git clone https://github.com/sunshine824/vue-typescript-starter.git
```

```
# cd
cd  vue-typescript-starter
```

```
# install dependencies
npm install
```

```
# Compiles and hot-reloads for development
npm run serve
```

```
# Compiles and minifies for production
npm run build
```

### 项目截图

<img src="https://github.com/sunshine824/vue-typescript-starter/blob/master/src/assets/screenshot/sreen01.png" width="550" height="300"/>
<img src="https://github.com/sunshine824/vue-typescript-starter/blob/master/src/assets/screenshot/sreen04.png" width="550" height="300"/>
<img src="https://github.com/sunshine824/vue-typescript-starter/blob/master/src/assets/screenshot/sreen02.png" width="550" height="300"/>
<img src="https://github.com/sunshine824/vue-typescript-starter/blob/master/src/assets/screenshot/sreen03.png" width="550" height="300"/>
由于每个项目呈现内容不同，所以在这里我就只搭建了一个骨架，具体内容自定义。

### 最后

如果你觉得该项目不错，或者对你有所帮助，点个 Star 、或者真心赞赏一下 都是对我最大的鼓励，我会更有动力维护好该项目
