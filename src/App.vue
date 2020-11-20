<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script lang="ts">
import { UserModule } from "@/store/modules/user";
import { Component, Prop, Vue, Provide } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  private isRouterAlive: boolean = true;
  mounted() {
    const lang = sessionStorage.getItem("LANGUAGE");
    if (!lang) {
      sessionStorage.setItem("LANGUAGE", "zh");
    }
  }
  //刷新页面
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
@import "./public/css/base.css";
@import "./public/css/init.less";
</style>
