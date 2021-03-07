<template>
  <div class="hot">
    <div class="tumb">
      <div class="icon"></div>
      <div class="riqi">更新日期：{{ time }}</div>
    </div>
    <ul>
      <SongsList
        v-for="(song, index) in newSongs"
        :key="song.id"
        :song="song"
        :index="index"
        :gender="gender"
        @update:music="$emit('update:music', $event)"
        @update:playlist="$emit('update:playlist', newSongs)"
        @update:genter="$emit('update:genter', $event)"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
      />
    </ul>
  </div>
</template>

<script>
import SongsList from "@/components/SongsList.vue";
export default {
  components: {
    SongsList,
  },
  data: function () {
    return {
      newSongs: [],
      genter: "Hot",
      time: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next((vm) => {
      vm.gender = to.name || "Hot";
    });
  },
  created() {
    this.$root.isShowLoading = true;
    // let _this = this;
    this.axios.get("/top/list?idx=1").then((response) => {
      // console.log(
      //   response.data.playlist.trackIds
      //     .slice(0, 20)
      //     .map((e) => e.id)
      //     .join()
      // );
      // console.log(response.data.playlist.trackNumberUpdateTime);
      this.time = this.format(response.data.playlist.trackNumberUpdateTime);
      // console.log(this.time)
      this.axios
        .get(
          "/song/detail?ids=" +
            response.data.playlist.trackIds
              .slice(0, 20)
              .map((e) => e.id)
              .join()
        )
        .then((response) => {
          // console.log(response);
          this.newSongs = response.data.songs;
          // console.log(this.newSongs);
        })
        .finally(() => {
          this.$root.isShowLoading = false;
        });
    });
  },
  methods: {
    format: function (times) {
      {
        //shijianchuo是整数，否则要parseInt转换
        let time = new Date(times);
        let m = time.getMonth() + 1;
        let d = time.getDate();
        return this.add0(m) + "月" + this.add0(d) + "日";
      }
    },
    add0: function (m) {
      return m < 10 ? "0" + m : m;
    },
  },
};
</script>

<style scoped lang="less">
.hot {
  width: 100%;
  .tumb {
    width: 100%;
    height: 125px;
    padding: 10px 0 10px 20px;
    box-sizing: border-box;
    background: url("https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee=")
      no-repeat;
    background-size: cover;
    .icon {
      width: 142px;
      height: 67px;
      background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
        no-repeat;
      background-position: -24px -30px;
      background-size: 166px 97px;
    }
    .riqi {
      margin: 10px 0 0 0;
      color: #eeeeee;
      font-size: 12px;
    }
  }
}
</style>