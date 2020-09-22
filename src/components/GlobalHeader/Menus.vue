<template>
  <div class="menu-class">
    <a-menu
      :selected-keys="[activeRoute]"
      @click="handleMenuItem"
      mode="horizontal"
      :style="{ lineHeight: '54px' }"
    >
      <template v-for="menu in menuLists">
        <a-menu-item v-if="!menu.children || !menu.children.length" :key="menu.path">
          <span>{{menu.meta['title']}}</span>
        </a-menu-item>
        <sub-menu v-else :menu="menu" :key="menu.path"></sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { RouteConfig, Route } from "vue-router";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Layout, Menu, Dropdown } from "ant-design-vue";
import SubMenu from "./SubMenu.vue";

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
    this.routeChange(this.$route, this.$route);
  }

  //inital computed
  get menuLists(){
    return this.menus.filter((item)=>{
      return !item.meta['hidden']
    })
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
.menu-class {
  .ant-menu {
    background: @navThemeColor;
    max-width: 700px;
    margin-right: 20px;
    .ant-menu-item {
      color: #b0b0b1;
      font-size: 15px;
      border-bottom: none;
      top: 0;
      &-active {
        color: rgba(255, 255, 255, 0.9);
      }
      &-selected {
        background: #4a4b4c;
        position: relative;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.9);
        border-bottom: none;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          height: 3px;
          width: 100%;
          background: #0972fe;
          left: 0;
        }
      }
    }
  }
  .ant-menu-submenu {
    top: 0;
    border-bottom: none;
    &-title {
      color: #b0b0b1;
      font-size: 15px;
      &:hover {
        color: #fff;
      }
    }
    &-active {
      color: rgba(255, 255, 255, 0.9);
      border-bottom: none !important;
    }
    &-selected {
      background: #4a4b4c;
      position: relative;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.9);
      border-bottom: none !important;
      .ant-menu-submenu-title {
        color: #fff;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        height: 3px;
        width: 100%;
        background: #0972fe;
        left: 0;
      }
    }
  }
}
</style>