<template>
  <div class="page-view">
    <div class="top-info">
      <h3 class="title">{{$t(routeOptions['title'])}}</h3>
    </div>
    <div class="view-con">
      <router-view v-if="isSubView" />
      <slot v-else></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Route } from "vue-router";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component
export default class RouteLayout extends Vue {
  @Prop({
    type: Boolean,
    default: true
  })
  isSubView!: Boolean;

  private routeOptions: object = this.$route.meta;

  @Watch("$route")
  changeRoute(val: Route, oldVal?: Route) {
    this.routeOptions = val.meta;
  }
}
</script>

<style lang="less" scope>
.page-view {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  .top-info {
    background: #fff;
    padding: 10px 10px;
    box-shadow: 0 2px 7px rgba(0, 21, 41, 0.08);
    .title {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.8);
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-bottom: 0;
      &::before {
        content: "";
        width: 4px;
        height: 24px;
        background: #1890ff;
        margin-right: 10px;
      }
    }
  }
  .view-con {
    flex: 1;
    margin: 10px 10px 5px 10px;
    box-shadow: 0 1px 20px #c6c4c4;
    background: #fff;
    border-radius: 4px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>