<template>
  <div class="header-animat">
    <a-layout-header>
      <div class="logo"></div>
      <a-menu></a-menu>
    </a-layout-header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Layout, Menu } from "ant-design-vue";

@Component({
  components: {
    ALayoutHeader: Layout.Header,
    AMenu: Menu
  }
})
export default class ClassName extends Vue {}
</script>

<style lang="less" scope>
.header-animat {
  position: relative;
  z-index: 100;
  .ant-layout-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    padding: 0 40px 0 15px;
    .logo {
      min-width: 120px;
      height: 46px;
      background:red;
      cursor: pointer;
    }
  }
}
</style>