<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { UserModule } from "@/store/modules/user";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {}
</script>

<style lang="less">
@import "./public/css/base.css";
@import "./public/css/init.less";
</style>
