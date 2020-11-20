import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import { Modal } from "ant-design-vue";

import "@/public/font/iconfont.css";
import "@/mock";

// 解决ie白屏问题
import "babel-polyfill";
import Es6Promise from "es6-promise";

Vue.use(Modal);

Es6Promise.polyfill();

Vue.config.productionTip = false;
Vue.prototype.$URL = window.config;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
