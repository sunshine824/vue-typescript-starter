<template>
  <div id="app">
    <router-view />
    <Button ref="btn" type="primary">按钮</Button>
  </div>
</template>

<script lang="ts">
import { Button } from "ant-design-vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    Button
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
@import "./public/css/base.css";
</style>
