<template>
  <route-layout :isSubView="false">
    <div class="video-group">
      <div class="video-player-pie"
           v-for="(item, index) in videos"
           :key="index">
        <div class="title">
          <p class="txt">{{item.title}}</p>
        </div>
        <div class="video-con">
          <flv-player v-if="item.type == 'flv'"
                      :src="item.src"></flv-player>
          <hls-player v-if="item.type == 'hls'"
                      :src="item.src"></hls-player>
          <rtmp-player v-if="item.type == 'rtmp'"
                       :src="item.src"></rtmp-player>
        </div>
      </div>
    </div>
  </route-layout>
</template>

<script lang="ts">
import FlvPlayer from "@/components/FlvPlayer.vue";
import HlsPlayer from "@/components/HlsPlayer.vue";
import RtmpPlayer from "@/components/RtmpPlayer.vue";
import { RouteLayout } from "@/layouts";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { RouteLayout, FlvPlayer, HlsPlayer, RtmpPlayer },
})
export default class System extends Vue {
  private videos = [
    {
      type: "flv",
      title: "flv视频流",
      src:
        "http://192.168.1.20:30030/video/d0eb09f2745f3850c0559a45f6abd93c_20200923105717.flv",
    },
    {
      type: "hls",
      title: "hls视频流",
      src: "http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8",
    },
    {
      type: "rtmp",
      title: "rtmp视频流",
      src: "rtmp://media3.sinovision.net:1935/live/livestream",
    },
    {
      type: "flv",
      title: "flv视频流",
      src:
        "http://192.168.1.20:30030/video/d0eb09f2745f3850c0559a45f6abd93c_20200923105717.flv",
    },
  ];
}
</script>
<style lang="less">
.video-con {
  .vjs-custom-skin {
    .video-js {
      width: 100%;
    }
    .vjs-big-play-button {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
<style lang="less" scope>
.video-group {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  padding: 15px;
  .video-player-pie {
    width: calc(50% - 5px);
    height: 300px;
    margin-bottom: 10px;
    &:nth-of-type(2n) {
      margin-right: 0;
    }
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    overflow: hidden;
    .title {
      width: 100%;
      height: 36px;
      line-height: 36px;
      padding: 0 10px;
      background: rgba(29, 30, 31, 0.8);
      border-bottom: 1px solid #e6e6e6;
      .txt {
        font-size: 14px;
        color: #fff;
      }
    }
    .video-con {
      width: 100%;
      height: calc(100% - 36px);
    }
  }
}
</style>