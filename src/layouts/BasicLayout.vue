<template>
  <a-layout class="layout">

    <!-- layout header -->
    <global-header></global-header>

    <!-- layout content -->
    <a-layout-content>
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GlobalHeader from "@/components/GlobalHeader";
import { Layout } from "ant-design-vue";

@Component({
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    GlobalHeader
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
}
</style>