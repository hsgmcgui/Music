<template>
  <div id="app">
    <div class="loading" v-show="$parent.isShowLoading">
      <div>
        加载中
        <span>...</span>
      </div>
    </div>

    <Play
      v-if="currentMusic"
      :currentMusic="currentMusic"
      @update:paused="paused = $event"
      :playlist="playlist"
      :currentIndex="currentIndex"
      :geCi="geCi"
      :gender="gender"
      @update:music="
        currentMusic = $event.song;
        currentIndex = $event.index;
      "
    />
    <HomeNav v-if="$route.meta.isShowNav" />

    <div v-show="!$parent.isShowLoading">
      <keep-alive>
        <router-view
          @update:music="
            currentMusic = $event.song;
            currentIndex = $event.index;
          "
          @update:genter="gender = $event"
          v-bind:currentMusic="currentMusic"
          v-bind:paused="paused"
          @update:playlist="playlist = $event"
        >
        </router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import HomeNav from "@/components/HomeNav.vue";
import Play from "@/components/Play.vue";
export default {
  components: {
    HomeNav,
    Play,
  },
  data: function () {
    return {
      currentMusic: null,
      paused: null,
      currentIndex: 0,
      playlist: [],
      geCi: null,
      gender: "Recommend",
    };
  },
  watch: {
    currentMusic: function () {
      let id = this.currentMusic.id;
      // console.log(id);
      this.axios.get("/lyric?id=" + id).then((respone) => {
        // console.log(respone.data.lrc.lyric);
        // this.recommends = respone.data.result;
        // console.log(this.recommends)
        this.geCi = this.geCiLyric(respone.data.lrc.lyric);
        // console.log(this.geCi)
      });
    },
  },
  methods: {
    geCiLyric: function (lyric) {
      var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
      var arr = lyric
        .split("\n")
        .filter((e) => e)
        .map((str) => {
          var time = str.match(patt)[0].replace(/(\[|\])/gi, "");
          var timeArr = time.split(":");
          time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
          var text = str.replace(patt, "");
          return { time, text };
        });
      return arr;
    },
  },
  // beforeRouteEnter (to, from, next) {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当守卫执行前，组件实例还没被创建
  //   next((vm) => {
  //     vm.gender = this.$router.name || 'Recommend';
  //   })
  // },
};
</script>

<style scoped lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  .loading {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 99;
    top: 41px;
    left: 0;
    // background-color: pink;
    font-size: 20px;
    div {
      width: 100px;
      // line-height: 50px;
      margin: 150px auto;
      position: relative;
      span {
        display: inline-block;
        // line-height: 50px;
        // transform-origin: left center;
        animation: loading 0.6s linear infinite;
        overflow: hidden;
        position: absolute;
        bottom: 0;
      }
    }
  }
}

@keyframes loading {
  from {
    // transform: scaleX(0.2);
    width: 0;
  }
  to {
    // transform: scaleX(1);
    width: 20px;
  }
}
</style>
