
<template functional>
  <a-sub-menu
    popupClassName="sub-menu-class"
    :key="props.menu.path"
    :title="props.menu.meta['title']"
  >
    <template v-for="item in props.menu.children">
      <a-menu-item v-if="!item.children || !item.children.length" :key="item.path">
        <span>{{item.meta['title']}}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu="item"></sub-menu>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SubMenu extends Vue {}
</script>

<style lang="less" scope>
.sub-menu-class {
  & > .ant-menu {
    background: @navThemeColor;
  }
  .ant-menu-submenu-title {
    height: 36px !important;
    line-height: 36px !important;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .ant-menu-item {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    height: 36px !important;
    line-height: 36px !important;
    color: rgba(255, 255, 255, 0.8);
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: rgb(19 114 254);
    color: #fff;
  }
  .ant-menu-sub {
    li {
      border-bottom: 1px solid #494949;
      &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      &:last-child {
        border-bottom: none;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
}
</style>