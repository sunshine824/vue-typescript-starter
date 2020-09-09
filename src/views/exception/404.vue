<template>
  <exception-page type="404" />
</template>

<script lang="ts">
import ExceptionPage from "@/components/Exception";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    ExceptionPage
  }
})
export default class Exception404 extends Vue {}
</script>

<style lang="less" scope>
</style>