<template>
  <div :class="['menu-class', mode+'-menu-class']">
    <a-menu theme="dark"
            :selected-keys="[activeRoute]"
            :default-open-keys="openKeys"
            @click="handleMenuItem"
            :mode="mode"
            :inline-collapsed="collapsed"
            :style="{ lineHeight: '54px' }">
      <template v-for="menu in menuLists">
        <a-menu-item v-if="!menu.children || !menu.children.length"
                     :key="menu.path">
          <span v-if="menu.meta['icon']"
                :class="['iconfont', menu.meta['icon'], 'menu-icon']"></span>
          <span>{{$t(menu.meta['title'])}}</span>
        </a-menu-item>
        <sub-menu v-else
                  :menu="menu"
                  :transferI18n="transferI18n"
                  :key="menu.path"></sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { CommonModule } from "@/store/modules/common";
import { RouteConfig, Route } from "vue-router";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Layout, Menu, Dropdown } from "ant-design-vue";
import SubMenu from "./SubMenu.vue";

@Component({
  components: {
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ASubMenu: Menu.SubMenu,
    SubMenu,
  },
})
export default class Menus extends Vue {
  @Prop({
    type: String,
    required: false,
    default: "horizontal",
  })
  mode!: string;

  //inital data
  private activeRoute: string = "";
  private menus: RouteConfig[] = [];

  mounted() {
    this.getMenus();
    this.routeChange(this.$route, this.$route);
  }
  //inital computed
  get openKeys() {
    if (this.mode == "inline" && !this.collapsed) {
      return ["/smart", "/eoms", "/system", "/database"];
    } else {
      return [];
    }
  }
  get collapsed(): boolean {
    return CommonModule.getCollapsed;
  }
  get menuLists() {
    return this.menus.filter((item) => {
      return !item.meta["hidden"];
    });
  }
  get transferI18n() {
    return (val: string) => {
      return this.$t(val);
    };
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
  //监听点击标题事件
  private titleClick({ key, domEvent }: { key: string; domEvent: any }) {
    this.$router.push(key);
  }

  @Watch("$route")
  routeChange(val: Route, oldVal: Route): void {
    this.activeRoute = val.path;
  }
}
</script>

<style lang="less" scope>
.menu-class {
  .menu-icon {
    margin-right: 15px;
  }
  .ant-menu-inline-collapsed {
    width: 60px;
    & > .ant-menu-submenu {
      & > .ant-menu-submenu-title {
        padding: 0 24px !important;
        .menu-icon {
          & + span {
            opacity: 0;
          }
        }
      }
    }
    & > .ant-menu-item {
      padding: 0 24px !important;
      .menu-icon {
        & + span {
          opacity: 0;
        }
      }
    }
  }
  &.horizontal-menu-class {
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
  &.inline-menu-class {
    .ant-menu-dark,
    .ant-menu-dark .ant-menu-sub {
      background: @navThemeColor;
    }
    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      background: #000c17;
    }
    .ant-menu-item {
      font-size: 15px;
      border-bottom: none;
      top: 0;
      &-active {
        background: rgba(57, 57, 57, 0.5);
        color: rgba(255, 255, 255, 0.9);
      }
      &-selected {
        background: #1f7eff;
        position: relative;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }
}
</style>