<template>
  <a-layout class="level-layout">
    <!-- layout header -->
    <global-header @goToHome="goToHome">
      <template slot="rightCon">
        <menus></menus>
        <div class="user-info">
          <a-dropdown>
            <div>
              <img src="../assets/user.png"
                   class="user-head" />
              <a @click="e => e.preventDefault()"
                 class="user-name">{{userName}}</a>
            </div>
            <a-menu slot="overlay">
              <a-menu-item key="0">
                <div @click="handlePass">修改密码</div>
              </a-menu-item>
              <a-menu-divider />
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
      <router-view />
    </a-layout-content>

    <!-- update password -->
    <update-pass ref="updatePass"></update-pass>
  </a-layout>
</template>

<script lang="ts">
import { logout } from "@/api/users";
import { Component, Vue, Ref } from "vue-property-decorator";
import { GlobalHeader, Menus } from "@/components/GlobalHeader";
import UpdatePass from "@/views/user/model/updatePass.vue";
import { Layout, Dropdown, Menu, Icon, Modal } from "ant-design-vue";

@Component({
  components: {
    Menus,
    GlobalHeader,
    UpdatePass,
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AMenuDivider: Menu.Divider,
  },
})
export default class LevelBasicLayout extends Vue {
  @Ref() readonly updatePass!: UpdatePass;

  private goToHome() {
    this.$router.push("/");
  }

  //显示修改密码框
  private handlePass() {
    this.updatePass.show();
  }

  get userName() {
    let userInfo = sessionStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo).username : "admin";
  }

  //用户登出
  private userLoyout() {
    Modal.confirm({
      title: "确定进行[退出]操作?",
      okText: "确定",
      class: "my-modal",
      cancelText: "取消",
      onOk: async () => {
        let { data } = await logout({});
        sessionStorage.clear();
        this.$router.push("/login");
      },
      onCancel: () => {
        console.log("Cancel");
      },
    });
  }
}
</script>

<style lang="less" scope>
.level-layout {
  padding-left: 0px;
  min-height: 100vh;
  .ant-layout-content {
    height: 100%;
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