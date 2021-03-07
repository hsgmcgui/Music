<template>
  <div class="recommend">
    <RecommendPlayList :currentRecommends="currentRecommends" />
    <RecommendNewMusic
      :newSongs="newSongs"
      @update:music="$emit('update:music', $event)"
      @update:genter="$emit('update:genter', $event)"
      :currentMusic="$attrs.currentMusic"
      :paused="$attrs.paused"
      :gender="gender"
      @update:playlist="$emit('update:playlist', $event)"
    />
  </div>
</template>

<script>
import RecommendPlayList from "@/components/RecommendPlayList.vue";
import RecommendNewMusic from "@/components/RecommendNewMusic.vue";
export default {
  components: {
    RecommendPlayList,
    RecommendNewMusic,
  },
  data: function () {
    return {
      recommends: [],
      newSongs: [],
      gender: "Recommend",
      count: 0
    };
  },
  computed: {
    currentRecommends: function () {
      return this.recommends.slice(0, 6);
    },
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next((vm) => {
      vm.gender = to.name || "Recommend";
    });
  },
  created() {
    // 请求推荐歌单
    this.$root.isShowLoading = true;
    this.axios
      .get("/personalized")
      .then((respone) => {
        console.log(respone);
        this.recommends = respone.data.result;
        // console.log(this.recommends)
      })
      .finally(() => {
        this.count = this.count + 1;
      });
    // 请求最新歌单
    this.axios
      .get("/personalized/newsong")
      .then((respone) => {
        // console.log(respone);
        this.newSongs = respone.data.result;
        // console.log(this.newSongs)
      })
      .finally(() => {
        this.count = this.count + 1;
      });
  },
  watch: {
    count: function(n){
      if(n >= 2){
        this.$root.isShowLoading = false;
      }
    }
  }
};
</script>

<style>
</style>