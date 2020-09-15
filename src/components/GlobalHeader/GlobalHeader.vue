<template>
  <div class="header-animat">
    <a-layout-header>
      <div class="logo" @click="goToHome" style="margin-top:-15px;">
        <img src="../../assets/logo.png" />
      </div>
      <div class="right-con">
        <a-menu
          :selected-keys="[activeRoute]"
          @click="handleMenuItem"
          mode="horizontal"
          :style="{ lineHeight: '54px' }"
        >
          <template v-for="item in menus" v-if="!item.meta['hidden']">
            <template v-if="!item.children || !item.children.length">
              <a-menu-item :key="item.path">
                <span>{{item.meta['title']}}</span>
              </a-menu-item>
            </template>
            <template v-else>
              <a-menu-item-group :key="item.name">
                <a-menu-item v-for="(subItem, index) in item.children" :key="subItem.path">
                  <span>{{subItem.meta['title']}}</span>
                </a-menu-item>
              </a-menu-item-group>
            </template>
          </template>
          <a-menu-item></a-menu-item>
        </a-menu>
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

@Component({
  components: {
    ALayoutHeader: Layout.Header,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AMenuItemGroup: Menu.ItemGroup,
    ADropdown: Dropdown
  }
})
export default class GlobalHeader extends Vue {
  private activeRoute: string = "";
  private menus: RouteConfig[] = [];

  mounted() {
    this.getMenus();
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

  //跳转到home
  @Emit("goToHome")
  goToHome() {}

  @Watch("$route")
  routeChange(val: Route, oldVal: Route): void {
    this.activeRoute = val.path;
  }
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
    .ant-menu {
      background: @navThemeColor;
      max-width: 700px;
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