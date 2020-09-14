<template>
  <a-layout class="layout">
    <!-- layout header -->
    <global-header>
      <div class="userBox" slot="userInfo">
        <a-dropdown>
          <div>
            <img src="../assets/user.png" class="userHead" />
            <a @click="e => e.preventDefault()" class="userName">admin</a>
          </div>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <span>修改密码</span>
            </a-menu-item>
            <a-menu-item key="1">
              <span>退出</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </global-header>

    <!-- layout content -->
    <a-layout-content>
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GlobalHeader from "@/components/GlobalHeader";
import { Layout, Dropdown, Menu, Icon } from "ant-design-vue";

@Component({
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    GlobalHeader,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item
  }
})
export default class ClassName extends Vue {}
</script>

<style lang="less" scope>
.layout {
  padding-left: 0px;
  min-height: 100vh;
  .ant-layout-content {
    height: 100%;
  }
  .userBox {
    .userHead {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    .userName {
      line-height: 54px;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.85);
    }
    .icon {
      line-height: 54px;
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>