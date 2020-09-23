<template>
  <a-layout class="layout">
    <!-- layout header -->
    <global-header @goToHome="goToHome">
      <div class="userBox" slot="userInfo">
        <a-dropdown>
          <div>
            <img src="../assets/user.png" class="userHead" />
            <a @click="e => e.preventDefault()" class="userName">{{userName}}</a>
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
import GlobalHeader from "@/components/GlobalHeader";
import UpdatePass from "@/views/user/model/updatePass.vue";
import { Layout, Dropdown, Menu, Icon, Modal } from "ant-design-vue";

@Component({
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    GlobalHeader,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AMenuDivider: Menu.Divider,
    UpdatePass
  }
})
export default class ClassName extends Vue {
  @Ref() readonly updatePass!: UpdatePass;

  private goToHome() {
    this.$router.push("/");
  }

  //显示修改密码框
  private handlePass() {
    this.updatePass.show()
  }

  get userName(){
    let userInfo = sessionStorage.getItem('userInfo')
    return userInfo ? JSON.parse(userInfo).username : 'admin'
  }

  //用户登出
  private userLoyout() {
    Modal.confirm({
      title: "确定进行[退出]操作?",
      okText: "确定",
      class:"my-modal",
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
      margin-top: -4px;
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