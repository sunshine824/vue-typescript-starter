<template>
  <video-player
    class="vjs-custom-skin"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    customEventName="customstatechangedeventname"
  ></video-player>
</template>

<script lang="ts">
import "videojs-flash";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class RtmpPlayer extends Vue {
  @Prop({ type: String }) src!: string;

  //视频播放参数
  private playerOptions = {
    height: '264',
    sources: [
      {
        type: "rtmp/mp4",
        src: this.src
      }
    ],
    techOrder: ["flash"],
    autoplay: true, // 自动播放
    // controls: true, // 控制条
    //fluid: true, // 按比例缩放适应容器
    // preload: 'auto', // 预加载
    // muted: true, // 消除所有音频
    // loop: false, // 循环播放
    //aspectRatio: "16:9"
    // poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-9.jpg' //首屏图片
  };
}
</script>

<style lang="less" scope>
</style>