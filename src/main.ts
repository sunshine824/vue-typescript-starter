import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 解决ie白屏问题
import 'babel-polyfill'
import Es6Promise from 'es6-promise'

Es6Promise.polyfill()

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
