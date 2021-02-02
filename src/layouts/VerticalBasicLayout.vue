<template>
  <a-layout class="vertical-layout">
    <!-- layout header -->
    <global-header @goToHome="goToHome">
      <template slot="rightCon">
        <div class="user-info">
          <a-select :default-value="lang"
                    size="small"
                    @change="toggleChangeLang"
                    class="lang-box">
            <a-select-option v-for="(item) in Languages"
                             :value="item.value"
                             :key="item.value">{{$t(item.label)}}</a-select-option>
          </a-select>
          <a-dropdown>
            <div>
              <img src="../assets/user.png"
                   class="user-head" />
              <a @click="e => e.preventDefault()"
                 class="user-name">{{userName}}</a>
            </div>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <div @click="userLoyout">{{$t("action.exit")}}</div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </template>
    </global-header>

    <!-- layout content -->
    <a-layout-content>
      <div class="left-menus"
           :style="{width:collapsed ? '60px' : '220px'}">
        <menus mode="inline"></menus>
        <div class="tootip"
             @click="collapseExpand">
          <a-icon v-if="!collapsed"
                  class="icon"
                  type="left" />
          <a-icon v-else
                  class="icon"
                  type="right" />
        </div>
      </div>
      <div class="main-con">
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { Languages } from '@/utils/const';
import { logout } from '@/api/users';
import { CommonModule } from '@/store/modules/common';
import { Component, Vue, Inject } from 'vue-property-decorator';
import { Layout, Dropdown, Menu, Icon, Modal, Select } from 'ant-design-vue';
import { GlobalHeader, Menus } from '@/components/GlobalHeader';

@Component({
  components: {
    Menus,
    GlobalHeader,
    AIcon: Icon,
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AMenuDivider: Menu.Divider,
    ASelect: Select,
    ASelectOption: Select.Option,
  },
})
export default class VerticalBasicLayout extends Vue {
  @Inject() reload!: any;

  private Languages: { value: string; label: string }[] = Languages;

  private lang: string = sessionStorage.getItem('LANGUAGE') as string;

  get userName() {
    const userInfo = sessionStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo).username : 'admin';
  }

  get collapsed(): boolean {
    return CommonModule.getCollapsed;
  }

  // 切换语言
  private toggleChangeLang(val: string) {
    this.$i18n.locale = val;
    sessionStorage.setItem('LANGUAGE', val);
    this.reload();
  }

  // 修改展开收缩状态
  private collapseExpand() {
    CommonModule.setCollapsedState(!this.collapsed);
  }

  // 返回主页
  private goToHome() {
    this.$router.push('/');
  }

  // 用户登出
  private userLoyout() {
    Modal.confirm({
      title: '确定进行[退出]操作?',
      okText: '确定',
      class: 'my-modal',
      cancelText: '取消',
      onOk: async () => {
        await logout({});
        sessionStorage.clear();
        this.$router.push('/login');
      },
      onCancel: () => {
        console.log('Cancel');
      },
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
      transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
      position: relative;
      .tootip {
        width: 13px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        background: #38383d;
        border: 1px solid #151618;
        border-left: none;
        position: absolute;
        right: -13px;
        cursor: pointer;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        top: 45%;
        margin-top: -40px;
        z-index: 100;
        .icon {
          color: #fff;
          font-size: 10px;
        }
      }
    }
    .main-con {
      flex: 1;
      background: #fff;
      margin: 10px 10px 0 10px;
      box-shadow: 0 1px 20px #c6c4c4;
      overflow: hidden;
    }
  }
  .user-info {
    min-width: 100px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    .lang-box {
      width: 80px;
      margin-right: 10px;
      &.ant-select {
        font-size: 12px;
      }
      .ant-select-selection {
        background: transparent;
        border: 1px solid #a7a5a5;
        color: #fff;
      }
      .ant-select-arrow {
        color: #fff;
        font-size: 10px;
      }
    }
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
