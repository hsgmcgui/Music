<template>
  <div class="recommend-play-list">
    <h3>推荐歌单</h3>
    <ul>
      <PlayList
        v-for="(item, index) in currentRecommends"
        :key="index"
        :item="item"
      />
    </ul>
  </div>
</template>



<script>
import PlayList from "@/components/PlayList.vue";
export default {
  components: {
    PlayList,
  },
  props: {
    currentRecommends: {
      type: Array,
    },
  },
};
</script>

<style scoped lang="less">
.recommend-play-list {
  margin-top: 10px;
  h3 {
    height: 40px;
    color: #000;
    font-size: 17px;
    line-height: 40px;
    padding-left: 10px;
    position: relative;
    &::before {
      content: "";
      display: inline-block;
      width: 0;
      height: 17px;
      border-left: 2px solid red;
      //   margin-top: 20px;
      position: absolute;
      left: 0;
      top: 11.5px;
    }
  }
  ul{
      display: flex;
      flex-wrap: wrap;
  }
}
</style>