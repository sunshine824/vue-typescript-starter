<template>
  <route-layout :isSubView="false"></route-layout>
</template>

<script lang="ts">
import { RouteLayout } from "@/layouts";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { RouteLayout }
})
export default class Smart extends Vue {}
</script>

<style lang="less" scope>
</style>