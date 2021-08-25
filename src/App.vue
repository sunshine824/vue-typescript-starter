<template>
  <a-config-provider :locale="locale">
    <div id="app"
         class="app">
      <router-view v-if="isRouterAlive" />
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import locale from 'ant-design-vue/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'ant-design-vue';
import { Component, Vue, Provide } from 'vue-property-decorator';

@Component({
  components: {
    AConfigProvider: ConfigProvider,
  },
})
export default class App extends Vue {
  private locale: any = locale;

  private isRouterAlive = true;

  mounted() {
    const lang = sessionStorage.getItem('LANGUAGE');
    if (!lang) {
      sessionStorage.setItem('LANGUAGE', 'zh');
    }
  }

  // 刷新页面
  @Provide()
  private reload() {
    this.isRouterAlive = false;
    this.$nextTick(() => {
      this.isRouterAlive = true;
    });
  }
}
</script>

<style lang="less">
@import './public/css/base.css';
@import './public/css/init.less';
</style>
