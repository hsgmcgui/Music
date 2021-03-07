<template>
  <div class="play-list-next" v-if="!$route.meta.isShowNav">
    <div class="header">
      <div class="zezao">
        <div class="mask" :style="{ background: `url(${coverImgUrl})` }"></div>
      </div>

      <div class="gedan">
        <div class="fanhui" @click="navigateToPlayList"></div>
        <div>歌单</div>
      </div>

      <div class="xiangqing">
        <div class="left">
          <img :src="coverImgUrl" alt="" />
          <span>{{ playCount | formatPlayCountWan }}</span>
        </div>
        <div class="right">
          <div class="top">{{ biaotiName }}</div>
          <div class="bottom">
            <img :src="avatarUrl" alt="" />{{ nickname }}
          </div>
        </div>
      </div>
    </div>

    <div class="play-list">
      <div class="list">歌曲列表</div>

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
    <Comments :comments="comments" />
  </div>
</template>

<script>
import SongsList from "@/components/SongsList.vue";
import Comments from "@/components/Comments.vue";
export default {
  components: {
    SongsList,
    Comments
  },
  data: function () {
    return {
      id: null,
      biaotiName: null,
      nickname: null,
      newSongs: [],
      coverImgUrl: null,
      avatarUrl: null,
      playCount: null,
      gender: "PlayListNext",
      comments: []
    };
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next((vm) => {
      vm.gender = to.name || "PlayListNext";
    });
  },
  created() {
    this.$root.isShowLoading = true;
  },
  //   created() {
  //     this.id = this.$route.query.id;
  //   },
  watch: {
    id: function () {
      this.$root.isShowLoading = true;
      this.axios.get("/comment/playlist?id="+this.id).then((res) => {
        
        this.comments = res.data.comments;
        console.log(this.comments);
      });
      this.axios.get("/playlist/detail?id=" + this.id).then((response) => {
        // console.log(response.data.playlist);
        this.biaotiName = response.data.playlist.name;
        this.coverImgUrl = response.data.playlist.coverImgUrl;
        this.nickname = response.data.playlist.creator.nickname;
        this.avatarUrl = response.data.playlist.creator.avatarUrl;
        this.playCount = response.data.playlist.playCount;
        // console.log(this.biaotiName)
        // console.log(this.nickname)
        this.axios
          .get(
            "/song/detail?ids=" +
              response.data.playlist.trackIds
                .slice(0, 20)
                .map((e) => e.id)
                .join()
          )
          .then((response) => {
            // console.log(response.data);
            this.newSongs = response.data.songs;
            // console.log(this.newSongs);
          })
          .finally(() => {
            this.$root.isShowLoading = false;
          });
      });
    },
  },
  filters: {
    formatPlayCountWan: function (value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
  //   beforeRouteUpdate(to, from, next) {
  //     // console.log('beforeUpdate',to.query.id);
  //     this.id = to.query.id;
  //     next();
  //   },
  activated() {
    // console.log('activated',this.$route.query.id);
    this.id = this.$route.query.id;
  },
  methods: {
    navigateToPlayList: function () {
      // console.log(1111);
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>

<style scoped lang="less">
.play-list-next {
  width: 100%;
  .header {
    width: 100%;
    padding: 5px 10px 30px 15px;
    position: relative;
    left: 0;
    top: 0;
    overflow: hidden;
    .zezao {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      // overflow: hidden;
      background: linear-gradient(
        to right,
        rgb(56, 56, 56),
        rgb(95, 95, 95),
        rgb(56, 56, 56)
      );
      .mask {
        display: inline-block;
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        // background: rgba(0, 0, 0, 0.5);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        z-index: 1;
        filter: blur(30px) brightness(0.5);
      }
    }

    .gedan {
      // width: 100%;
      height: 40px;
      color: #fff;
      font-size: 17px;
      display: flex;
      z-index: 2;
      position: absolute;
      // left: 0;
      // top: 0;
      // box-sizing: border-box;
      .fanhui {
        width: 14px;
        height: 14px;
        border-left: 2px solid #fff;
        border-top: 2px solid #fff;
        margin: 13px 30px 13px 0;
        transform: rotate(-45deg);
        position: relative;
        &::after {
          content: "";
          display: block;
          width: 25px;
          height: 0;
          border-top: 2px solid #fff;
          transform: rotate(45deg);
          position: absolute;
          left: 0;
          top: 12px;
        }
      }
      div:nth-child(2) {
        width: 1%;
        flex: 1 1 auto;
        line-height: 40px;
      }
    }
    .xiangqing {
      display: flex;
      margin: 50px 0 0 0;
      .left {
        // flex: 1 1 calc(100vw / 2 - 70px);
        width: 114px;
        height: 114px;
        position: relative;
        left: 0;
        top: 0;
        z-index: 2;
        // margin: 0 10px 0 0;
        img {
          display: block;
          width: 114px;
          height: 114px;
          // vertical-align:middle;
        }
        span {
          position: absolute;
          top: 0;
          right: 0;
          color: #fff;
          font-size: 12px;
          text-shadow: 0 0 1px black;
          display: block;
          margin: 3px 3px 0 0;
          &::before {
            content: "";
            display: inline-block;
            width: 13px;
            height: 13px;
            background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+")
              no-repeat;
            background-size: cover;
            //   background-position: left center;
          }
        }
      }
      .right {
        width: 1%;
        flex: 1 1 auto;
        margin-left: 15px;
        color: #fff;
        z-index: 2;
        .top {
          font-size: 17px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 20px;
        }
        .bottom {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .play-list {
    width: 100%;
    z-index: 3;
    .list {
      width: 100%;
      height: 23px;
      padding: 0 10px;
      color: #666;
      font-size: 12px;
      line-height: 23px;
      background-color: #eeeff0;
    }
  }
}
</style>