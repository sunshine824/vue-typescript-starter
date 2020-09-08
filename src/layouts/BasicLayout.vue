<template>
  <a-layout class="layout layout-pc">
    <global-header></global-header>
    <router-view />
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GlobalHeader from "@/components/GlobalHeader";
import { Layout } from "ant-design-vue";

@Component({
  components: {
    ALayout: Layout,
    GlobalHeader
  }
})
export default class ClassName extends Vue {}
</script>

<style lang="less" scope>
</style>