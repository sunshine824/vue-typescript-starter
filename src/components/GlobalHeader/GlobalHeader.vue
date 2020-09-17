<template>
  <div class="header-animat">
    <a-layout-header>
      <div class="logo" @click="goToHome" style="margin-top:-15px;">
        <img src="../../assets/logo.png" />
      </div>
      <div class="right-con">
        <menus></menus>
        <div class="userInfo">
          <slot name="userInfo"></slot>
        </div>
      </div>
    </a-layout-header>
  </div>
</template>

<script lang="ts">
import { RouteConfig, Route } from "vue-router";
import { Component, Vue, Watch, Emit } from "vue-property-decorator";
import { Layout, Menu, Dropdown } from "ant-design-vue";
import Menus from "./Menus.vue";

@Component({
  components: {
    ALayoutHeader: Layout.Header,
    Menus
  }
})
export default class GlobalHeader extends Vue {
  //跳转到home
  @Emit("goToHome")
  goToHome() {}
}
</script>

<style lang="less" scope>
.header-animat {
  position: relative;
  z-index: 100;
  .right-con {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
  .ant-layout-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    padding: 0 40px 0 15px;
    background: @navThemeColor;
    .logo {
      min-width: 120px;
      height: 46px;
      cursor: pointer;
      img {
        height: 100%;
      }
    }
  }
  .userInfo {
    min-width: 100px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    .ant-dropdown-trigger {
      height: 54px;
      line-height: 54px;
    }
  }
}
</style>