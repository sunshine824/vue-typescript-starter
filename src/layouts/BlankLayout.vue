<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BlankLayout extends Vue {}
</script>

<style lang="less" scope>
</style>