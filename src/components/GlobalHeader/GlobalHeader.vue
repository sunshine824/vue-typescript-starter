<template>
  <div class="header-animat">
    <a-layout-header>
      <div class="logo"
           @click="goToHome">
        <img src="../../assets/logo.png" />
        <span class="txt">{{$t('home.title')}}</span>
      </div>
      <div class="right-con">
        <slot name="rightCon"></slot>
      </div>
    </a-layout-header>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { Layout } from 'ant-design-vue';

@Component({
  components: {
    ALayoutHeader: Layout.Header,
  },
})
export default class GlobalHeader extends Vue {
  // 跳转到home
  @Emit('goToHome')
  goToHome() {}
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
    border-bottom: 1px solid #434343;
    .logo {
      min-width: 120px;
      height: 100%;
      cursor: pointer;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      img {
        height: 80%;
        margin-right: 10px;
      }
      .txt {
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        letter-spacing: 3px;
      }
    }
  }
}
</style>
