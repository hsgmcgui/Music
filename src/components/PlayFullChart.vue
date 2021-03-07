<template>
  <div class="play-full-chart" :class="{paused:paused}" @click="$emit('xxx-true')">
    <div class="m-song">
      <div class="m-song-son">
        <div class="m-song-son-son">
          <img
            v-if="gender != 'Search'"
            :src="gender === 'Recommend'? currentMusic.picUrl:currentMusic.al.picUrl"
            alt=""
          />
          <img
            v-else
            src="http://p3.music.126.net/chniRNXvDaCCpCJZ7uVYug==/109951165541304779.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['currentMusic',"paused","gender"]
};
</script>

<style scoped lang="less">
.play-full-chart{
    &.paused{
        .m-song{
            .m-song-son{
                animation-play-state: paused;
            }
        }
    }
}

.play-full-chart {
  width: 100%;
  height: 248px;
//   background-color: red;
  margin-top: 20px;
  .m-song {
    width: 248px;
    height: 248px;
    margin: 0 auto;
    .m-song-son {
      width: 248px;
      height: 248px;
      background: url('https://s3.music.126.net/mobile-new/img/disc.png?d3bdd1080a72129346aa0b4b4964b75f=') no-repeat;
      background-position: center;
      background-size: cover;
      position: relative;
      animation: playing 6s linear infinite;
      .m-song-son-son{
          width: 150px;
          height: 150px;
          background: red;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          overflow: hidden;
          img{
              width: 100%;
              height: 100%;
          }
      }
    }
  }
}

@keyframes playing {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>