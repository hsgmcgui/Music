<template>
  <div class="play" :class="{ paused: paused }">
    <!-- controls -->
    <audio
      :src="
        'https://music.163.com/song/media/outer/url?id=' +
        currentMusic.id +
        '.mp3'
      "
      style="width: 100%; height: 40px"
      autoplay
      ref="audio"
    ></audio>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div
        class="play-bar"
        v-show="isShowPlayBar"
        @click="isShowPlayBar = false"
      >
        <img v-if="gender != 'Search'" :src="gender === 'Recommend'? currentMusic.picUrl:currentMusic.al.picUrl" alt="" />
        <img v-else src="http://p3.music.126.net/chniRNXvDaCCpCJZ7uVYug==/109951165541304779.jpg" alt="" />
        <div class="play-bar-son1">{{ currentMusic.name }}</div>
        <div class="play-bar-son2" @click.stop="togglePlayState">
          <canvas ref="circle" width="50" height="50"></canvas>
          <!-- <canvas ref="circle2"></canvas> -->
          <div class="icon"></div>
        </div>
      </div>
    </transition>

    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div class="play-full" v-show="!isShowPlayBar">
        <div
          v-if="gender != 'Search'"
          class="mask"
          :style="{ backgroundImage: `url('${gender === 'Recommend' ? currentMusic.picUrl:currentMusic.al.picUrl}')` }"
        ></div>
        <div
          v-else
          class="mask"
          :style="{ backgroundImage: `url('http://p3.music.126.net/chniRNXvDaCCpCJZ7uVYug==/109951165541304779.jpg')` }"
        ></div>
        <PlayFullHear :currentMusic="currentMusic" :gender="gender" @isshow-xxx="isShowPlay" />
        <PlayFullLyric
          :geCi="geCi"
          v-if="isShowLyric"
          :audio="this.$refs.audio"
          :currentTime="currentTime"
          @xxx-false="isShowLyric = false"
        />
        <PlayFullChart
          v-else
          :currentMusic="currentMusic"
          :paused="paused"
          :gender="gender"
          @xxx-true="isShowLyric = true"
        />
        <PlayFullFooter
          :currentTime="currentTime"
          :duration="duration"
          @update:currentTime="$refs.audio.currentTime = $event"
          :paused="paused"
          @xxx-yyy="togglePlayState"
          @xxx-rrr="playNext"
          @xxx-lll="shangYiQu"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import PlayFullHear from "@/components/PlayFullHear.vue";
import PlayFullLyric from "@/components/PlayFullLyric.vue";
import PlayFullChart from "@/components/PlayFullChart.vue";
import PlayFullFooter from "@/components/PlayFullFooter.vue";
export default {
  props: ["currentMusic", "currentIndex", "playlist", "geCi","gender"],
  components: {
    PlayFullHear,
    PlayFullLyric,
    PlayFullChart,
    PlayFullFooter,
  },
  data() {
    return {
      paused: null,
      duration: 0,
      currentTime: 0,
      // paused: null
      isShowPlayBar: true,
      isShowLyric: false,
      shang: false,
    };
  },

  mounted() {
    // console.log("mounted", this.$refs.audio);
    let audio = this.$refs.audio;
    audio.addEventListener("pause", () => {
      this.paused = true;
    });
    audio.addEventListener("play", () => {
      this.paused = false;
    });

    audio.addEventListener("durationchange", () => {
      this.duration = audio.duration;
      // console.log("当前歌曲时长", this.duration);
    });

    audio.addEventListener("timeupdate", () => {
      // console.log("当前播放到", this.currentTime);
      this.currentTime = audio.currentTime;
      this.drawCircle(this.currentTime, this.duration);
    });

    audio.addEventListener("ended", () => {
      this.playNext();
    });
  },
  methods: {
    drawCircle: function (n, total) {
      let canvas = this.$refs.circle;
      // console.log(canvas)

      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 50, 50);
      ctx.beginPath();
      ctx.strokeStyle = "orange";
      // ctx.lineWidth = 2;
      ctx.arc(
        25,
        25,
        20,
        Math.PI * -0.5,
        Math.PI * ((n / total) * 2 - 0.5),
        false
      ); // 绘制
      ctx.stroke();
      ctx.closePath();

      // ctx.beginPath();
      // ctx.strokeStyle = "#000";
      // // ctx.lineWidth = 2;
      // ctx.arc(25, 25, 18, 0, Math.PI * 2, false); // 绘制
      // ctx.stroke();
      // ctx.closePath();

      // ctx.beginPath();
      // ctx.strokeStyle = "rgba(255, 0, 0)";
      // // ctx.lineWidth = 2;
      // ctx.arc(
      //   25,
      //   25,
      //   19,
      //   Math.PI * -0.5,
      //   Math.PI * ((n / total) * 2 - 0.5),
      //   false
      // ); // 绘制
      // ctx.stroke();
      // ctx.closePath();
    },
    togglePlayState: function () {
      let audio = this.$refs.audio;
      if (this.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },

    isShowPlay: function () {
      this.isShowPlayBar = true;
      // console.log(1111)
    },
    calculateNext: function () {
      let next = 0;
      if (this.currentIndex < this.playlist.length - 1) {
        if (this.shang) {
          if (this.currentIndex > 0) {
            next = this.currentIndex - 1;
          } else {
            next = this.playlist.length - 1;
          }
          this.shang = false;
        } else {
          next = this.currentIndex + 1;
        }
      } else {
        next = 0;
      }
      return next;
    },
    playNext: function () {
      // console.log("下一曲/上一曲");
      let index = this.calculateNext();
      this.$emit("update:music", {
        song: this.playlist[index],
        index: index,
        id: this.playlist[index].id,
      });
    },
    shangYiQu: function () {
      this.shang = true;
      this.playNext();
    },
  },
  watch: {
    paused: function (e) {
      this.$emit("update:paused", e);
    },
  },
};
</script>

<style scoped lang="less">
.play {
  &.paused {
    .play-bar {
      img {
        animation-play-state: paused;
      }
      .play-bar-son2 {
        .icon {
          background-position: -6px -6px;
        }
      }
    }
  }
}

.play-bar {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  z-index: 9;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  background-color: #fff;
  height: 50px;
  img {
    // display: block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    // box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    vertical-align: middle;
    margin: 8px;
    animation: playing 6s linear infinite;
  }
  .play-bar-son1 {
    flex: 1;
    line-height: 50px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .play-bar-son2 {
    position: relative;
    width: 50px;
    .icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 25px;
      transform: translate(-50%, -50%);
      // background-color:pink;
      background: rgba(0, 0, 0, 0.5)
        url("https://www.kugou.com/yy/static/images/play/btn.png") no-repeat;
      background-position: -6px -53px;
      background-size: 238px 238px;
      // z-index: 9;
    }
  }
}

.play-full {
  background: linear-gradient(
    to right,
    rgb(56, 56, 56),
    rgb(95, 95, 95),
    rgb(56, 56, 56)
  );

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: red;
  z-index: 9;
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    z-index: -1;
    filter: blur(30px) brightness(0.5);
  }
}

@keyframes playing {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>