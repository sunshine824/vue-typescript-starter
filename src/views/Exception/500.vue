<template>
  <exception-page type="500" />
</template>

<script lang="ts">
import ExceptionPage from "@/components/Exception";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    ExceptionPage
  }
})
export default class Exception500 extends Vue {}
</script>

<style lang="less" scope>
</style>