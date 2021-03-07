<template>
  <li
    class="songs-list"
    @click="
      $emit('update:music', { song, index, id });
      $emit('update:playlist');
      $emit('update:genter', gender);
    "
  >
    <div
      :class="{ active: index < 3 && gender === 'Hot' }"
      class="xuhao"
      v-if="gender != 'Recommend' && gender != 'Search'"
    >
      {{ index + 1 }}
    </div>
    <div class="song-left">
      <div class="top">{{ song.name }}</div>
      <div class="bottom">
        <span></span>
        <span
          v-for="(artist, index) in gender === 'Recommend'
            ? song.song.artists
            : song.ar"
          :key="index"
        >
          <template v-if="index">/</template>{{ artist.name }} </span
        >-{{ song.name }}
      </div>
    </div>
    <div class="song-right">
      <div
        class="donghua"
        :class="{ paused: paused }"
        v-if="currentMusic && currentMusic.id === song.id"
      >
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div class="bofang" v-else></div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["song", "index", "currentMusic", "paused", "gender"],
  data: function () {
    return {
      id: this.song.id,
      // gender: null
    };
  },
};
</script>

<style scoped lang="less">
.songs-list {
  padding-left: 10px;
  height: 55px;
  // background: pink;
  display: flex;
  // position: relative;
  word-break: break-all;
  .xuhao {
    line-height: 55px;
    font-size: 17px;
    margin-right: 10px;
    color: #333;
    &.active {
      color: red;
    }
  }
  .song-left {
    flex: 4;
    padding: 6px 0;
    color: #333;

    .top {
      font-size: 17px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bottom {
      color: #888;
      font-size: 12px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      span:nth-child(1) {
        display: inline-block;
        width: 12px;
        height: 8px;
        background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
          no-repeat;
        background-position: 0 0;
        background-size: 166px 97px;
        margin-right: 4px;
      }
    }
  }
  .song-right {
    flex: 1;
    div {
      width: 22px;
      height: 22px;
      margin: 16.5px auto;
    }
    .bofang {
      background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
        no-repeat;
      background-position: -24px 0;
      background-size: 166px 97px;
    }
    .donghua {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      i {
        transform-origin: center bottom;
        display: inline-block;
        width: 3px;
        height: 22px;
        background-color: skyblue;
        animation: playing 0.6s linear -0.2s infinite alternate-reverse;
        &:nth-child(1) {
          // background-color: rgb(31, 221, 14);
          animation-delay: 0s;
        }

        &:nth-child(3) {
          // background-color: skyblue;
          animation-delay: -0.4s;
        }
      }

      &.paused {
        i {
          animation-play-state: paused;
        }
      }
    }
  }
}

@keyframes playing {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(0.2);
  }
}
</style>