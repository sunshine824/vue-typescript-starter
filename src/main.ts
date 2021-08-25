import Vue from 'vue';
import { Modal } from 'ant-design-vue';
import { Message, Notification } from '@/utils/resetMessage';
import VueVideoPlayer from 'vue-video-player';
import Es6Promise from 'es6-promise';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import moment from 'moment';

moment.locale('zh-cn');

// 导入视频播放组件
import 'video.js/dist/video-js.css';

import '@/public/font/iconfont.css';
import '@/mock';

// 解决ie白屏问题
import 'babel-polyfill';

Vue.use(Modal);
Vue.use(VueVideoPlayer);

Es6Promise.polyfill();

Vue.config.productionTip = false;
Vue.prototype.$URL = window.config;
Vue.prototype.$message = Message;
Vue.prototype.$notification = Notification;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
