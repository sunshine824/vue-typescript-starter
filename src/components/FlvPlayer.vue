<template>
  <video class="video-item" controls ref="flvPlayerElem" muted></video>
</template>

<script lang="ts">
import flv from "flv.js";
import { message } from "ant-design-vue";
import { Component, Vue, Prop, Ref } from "vue-property-decorator";

@Component
export default class FlvPlayer extends Vue {
  @Prop({ type: String }) src!: string;

  //inital data
  //初始化视频实例
  private player: flv.Player = flv.createPlayer(
    {
      type: "flv",
      url: this.src
    },
    {
      enableStashBuffer: false,
      isLive: true,
      lazyLoad: false,
      lazyLoadMaxDuration: 0,
      lazyLoadRecoverDuration: 0,
      deferLoadAfterSourceOpen: false,
      fixAudioTimestampGap: false
    }
  );
  //音量开始状态
  private muted: boolean = true;
  //是否现在播放
  private playing: boolean = false;

  mounted() {
    //当前浏览器是否支持
    let isSupported: boolean = flv.isSupported();
    if (!isSupported) {
      message.error("当前浏览器不支持播放flv视频！");
    } else {
      let videoElem = this.$refs["flvPlayerElem"] as HTMLMediaElement;
      this.player.attachMediaElement(videoElem);
      this.player.load();
      this.play();
    }
  }

  //inital methods
  //视频播放
  play() {
    this.player.play();
    this.playing = true;
  }

  //视频暂停
  pause() {
    this.player.pause();
    this.playing = false;
  }

  //视频销毁
  destory() {
    this.player.destroy();
    this.playing = false;
  }
}
</script>

<style lang="less" scope>
.video-item {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>