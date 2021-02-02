<template>
  <video-player class="vjs-custom-skin"
                ref="videoPlayer"
                :options="playerOptions"
                @ready="playerReadied"></video-player>
</template>

<script lang="ts">
import 'videojs-contrib-hls';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class HlsPlayer extends Vue {
  @Prop({ type: String }) src!: string;

  // 视频加载参数
  private playerOptions: any = {
    height: '264',
    sources: [
      {
        withCredentials: false,
        type: 'application/x-mpegURL',
        src: this.src,
      },
    ],
    controlBar: {
      timeDivider: false,
      durationDisplay: false,
    },
    flash: { hls: { withCredentials: false } },
    html5: { hls: { withCredentials: false } },
    autoplay: true, // 自动播放
    controls: true, // 控制条
    // fluid: true, // 按比例缩放适应容器
    // preload: 'auto', // 预加载
    // muted: true, // 消除所有音频
    // loop: false, // 循环播放
    // aspectRatio: "16:9"
    // poster: '' //首屏图片
  };

  // 视频准备完毕
  private playerReadied(player: any) {
    player.tech({ IWillNotUseThisInPlugins: true });
    player.tech_.hls.xhr.beforeRequest = (options: any) => {
      console.log(options);
    };
  }
}
</script>

<style lang="less" scope>
</style>
