<template>
  <a-menu
    :selected-keys="[activeRoute]"
    @click="handleMenuItem"
    mode="horizontal"
    :style="{ lineHeight: '54px' }"
  >
    <template v-for="(menu, index) in menus" v-if="!menu.meta['hidden']">
      <a-menu-item v-if="!menu.children || !menu.children.length" :key="menu.path">
        <span>{{menu.meta['title']}}</span>
      </a-menu-item>
      <sub-menu v-else :menu="menu" :key="menu.path"></sub-menu>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { RouteConfig, Route } from "vue-router";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Layout, Menu, Dropdown } from "ant-design-vue";
import SubMenu from "./SubMenu.vue"

@Component({
  components: {
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ASubMenu: Menu.SubMenu,
    SubMenu
  }
})
export default class Menus extends Vue {
  private activeRoute: string = "";
  private menus: RouteConfig[] = [];

  mounted() {
    this.getMenus();
    console.log(this.menus);
    this.routeChange(this.$route, this.$route);
  }

  //获取路由列表
  private getMenus() {
    let routes = this.$router.options.routes || [];
    routes.map((item: any) => {
      if (item.path == "/") {
        this.menus = item.children;
      }
    });
  }

  //路由跳转
  private handleMenuItem(item: any) {
    this.$router.push(item.key);
  }

  @Watch("$route")
  routeChange(val: Route, oldVal: Route): void {
    this.activeRoute = val.path;
  }
}
</script>

<style lang="less" scope>
</style>