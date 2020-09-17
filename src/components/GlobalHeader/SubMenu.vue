
<template functional>
  <a-sub-menu popupClassName="sub-menu-class" :key="props.menu.path" :title="props.menu.meta['title']">
    <template v-for="item in props.menu.children">
      <a-menu-item v-if="!item.children || !item.children.length" :key="item.path">
        <span>{{item.meta['title']}}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu="item"></sub-menu>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SubMenu extends Vue {}
</script>

<style lang="less" scope>
.sub-menu-class{

}
</style>