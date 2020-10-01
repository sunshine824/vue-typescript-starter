<template>
  <a-layout class="vertical-layout">
    <!-- layout header -->
    <global-header @goToHome="goToHome">
      <template slot="rightCon">
        <div class="user-info">
          <a-dropdown>
            <div>
              <img src="../assets/user.png" class="user-head" />
              <a @click="e => e.preventDefault()" class="user-name">{{userName}}</a>
            </div>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <div @click="userLoyout">退出</div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </template>
    </global-header>

    <!-- layout content -->
    <a-layout-content>
      <div class="left-menus">
        <Menus mode="inline"></Menus>
      </div>
      <div class="main-con">
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { logout } from "@/api/users";
import { Component, Vue } from "vue-property-decorator";
import { Layout, Dropdown, Menu, Icon, Modal } from "ant-design-vue";
import { GlobalHeader, Menus } from "@/components/GlobalHeader";

@Component({
  components: {
    Menus,
    GlobalHeader,
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AMenuDivider: Menu.Divider
  }
})
export default class VerticalBasicLayout extends Vue {
  get userName() {
    let userInfo = sessionStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo).username : "admin";
  }

  private goToHome() {
    this.$router.push("/");
  }

  //用户登出
  private userLoyout() {
    Modal.confirm({
      title: "确定进行[退出]操作?",
      okText: "确定",
      class: "my-modal",
      cancelText: "取消",
      onOk: async () => {
        let { code } = await logout({});
        if (code == 200) {
          sessionStorage.clear();
          this.$router.push("/login");
        }
      },
      onCancel: () => {
        console.log("Cancel");
      }
    });
  }
}
</script>

<style lang="less" scope>
.vertical-layout {
  padding-left: 0px;
  min-height: 100vh;
  .ant-layout-content {
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    background: #f5f5f5;
    .left-menus {
      width: 220px;
      background: #1d1e1f;
      height: calc(100vh - 54px);
    }
    .main-con {
      flex: 1;
      background: #fff;
      margin: 10px 10px 0 10px;
      box-shadow: 0 1px 20px #c6c4c4;
    }
  }
  .user-info {
    min-width: 100px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    .ant-dropdown-trigger {
      height: 54px;
      line-height: 54px;
    }
    .user-head {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      margin-top: -4px;
    }
    .user-name {
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