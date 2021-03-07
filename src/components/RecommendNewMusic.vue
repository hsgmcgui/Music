<template>
    <div class="recommend-new-music">
        <h3>最新音乐</h3>
        <ul>
            <SongsList 
                v-for="(song,index) in newSongs" 
                :key="song.id" 
                :song="song"
                :index="index"
                @update:music="$emit('update:music',$event)"
                @update:genter="$emit('update:genter',$event)"
                @update:playlist="$emit('update:playlist', newSongs)"
                :currentMusic="$attrs.currentMusic"
                :paused="$attrs.paused"
                :gender="$attrs.gender" />
        </ul>
    </div>
</template>

<script>
import SongsList from '@/components/SongsList.vue'
export default {
    components: {
        SongsList
    },
    props: {
        newSongs: {
            type: Array
        }
    }
}
</script>

<style scoped lang="less">
.recommend-new-music {
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
      width: 100%;
  }
}
</style>