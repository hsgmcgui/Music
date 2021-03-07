<template>
  <div class="play-full-hear">
    <FanHui @isshow-xxx="$emit('isshow-xxx')" />
    <div class="lyric">
      <h3>{{ currentMusic.name }}</h3>
      <p>
        <span v-for="(artist, index) in gender === 'Recommend' ? currentMusic.song.artists:currentMusic.ar" :key="index"
          ><template v-if="index">/</template>{{ artist.name }}</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import FanHui from "@/components/FanHui.vue";
export default {
  props: ["currentMusic","gender"],
  components: {
    FanHui,
  },
};
</script>

<style scoped lang="less">
.play-full-hear {
  width: 100%;
  height: 42px;
  // background-color: pink;
  overflow: hidden;
  display: flex;
  .lyric {
    flex: 3;
    margin-left: 5px;
    color: #fff;

    h3 {
      font-size: 18px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 12px;
      color: #eeeeee;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>