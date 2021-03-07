<template>
  <div
    class="play-full-lyric"
    @click="$emit('xxx-false')"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <ul :style="{ top: top }">
      <li v-for="(item, index) in geCi" :key="index">
        {{ item.text || "~~~~~" }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["geCi", "audio"],
  data() {
    return {
      currentTime: null,
      top: "150px",
      touching: false,
      scrollY: 0,
      marTop: 0
    };
  },
  watch:{
      scrollY: function(){
        //   this.top = -this.scrollY + this.marTop + "px";
      }
  },
  mounted() {
    this.audio.addEventListener("timeupdate", () => {
      // console.log("当前播放到", this.currentTime);
      this.currentTime = this.audio.currentTime;
      let i = this.geCi.findIndex((element) => {
        if (element.time < this.currentTime) {
          return element.time > this.currentTime;
        }
        return element.time > this.currentTime;
      });
      // console.log(this.geCi.length)

      if (i <= this.geCi.length) {
        let lis = document.querySelectorAll(".play-full-lyric ul li");
        for (let k = 0; k < lis.length; k++) {
          lis[k].style.color = "rgba(255, 255, 255, 0.452)";
        }

        // console.log(lis[i - 1].offsetHeight);
        if (lis[i - 1]) {
          if (!this.touching) {
            this.top = -lis[i - 1].offsetHeight * (i - 1) + 150 + "px";
            this.marTop = this.top;
          }
          
          lis[i - 1].style.color = "#fff";
          lis[i - 1].style.fontSize = "16px";
        }
      }
    });
  },
  methods: {
    touchstart: function (e) {
      this.touching = true;
      this.y = e.touches[0].clientY;
        // console.log(this.marTop)
    },
    touchmove: function(e){
        this.scrollY = Math.floor((this.y - e.touches[0].clientY));
        // console.log(this.scrollY)
        // console.log(this.marTop)
    },
    touchend: function(){
        this.touching = false;
        // console.log('松开')
    }
  },
};
</script>

<style scoped lang="less">
.play-full-lyric {
  width: 100%;
  height: 60%;
  overflow: hidden;
  // color: #fff;
  position: relative;
  margin-top: 50px;
  ul {
    width: 100%;
    position: absolute;
    left: 0;
    top: 150px;
    transition: all 1s;
    li {
      width: 100%;
      //   height: 20px;
      font-size: 14px;
      text-align: center;
      padding: 15px;
      // box-sizing: border-box;
      //   margin: 15px 0;
      //   line-height: 20px;
    }
  }
}
</style>