<template>
  <div class="play-full-footer">
    <div class="jindutiao">
      <div class="bofangjindu">{{ currentTime | PlayCurrentTime }}</div>
      <div class="gundong">
        <input
          type="range"
          min="0"
          :max="duration"
          step="1"
          :value="currentTime"
          @input="getValue"
        />
        <span :style="{ width: (currentTime / duration) * 100 + '%' }"></span>
      </div>
      <div class="zongshijian">{{ duration | PlayDuration }}</div>
    </div>

    <div class="play-btn" :class="{paused: paused}">
      <div class="play-btn-son">
        <div>
          <div @click="$emit('xxx-lll')"></div>
        </div>
        <div>
          <div @click="$emit('xxx-yyy')"></div>
        </div>
        <div>
          <div @click="$emit('xxx-rrr')"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentTime", "duration" , "paused"],
  data: function () {
    return {
      fal: true,
      zong: 0,
    };
  },
  filters: {
    PlayDuration: function (value) {
      let hr = parseInt((value / 60 / 60) % 24);
      let min = parseInt((value / 60) % 60);
      let sec = parseInt(value % 60);
      min = min > 9 ? min : "0" + min;
      sec = sec > 9 ? sec : "0" + sec;
      if (hr != 0) {
        hr = hr > 9 ? hr : "0" + hr;
        return hr + ":" + min + ":" + sec;
      }
      return min + ":" + sec;
    },
    PlayCurrentTime: function (value) {
      let hr = parseInt((value / 60 / 60) % 24);
      let min = parseInt((value / 60) % 60);
      let sec = parseInt(value % 60);
      min = min > 9 ? min : "0" + min;
      sec = sec > 9 ? sec : "0" + sec;
      if (hr != 0) {
        hr = hr > 9 ? hr : "0" + hr;
        return hr + ":" + min + ":" + sec;
      }
      return min + ":" + sec;
    },
  },
  methods: {
    getValue: function (e) {
      // console.log(e.target.value)
      if (this.fal) {
        this.$emit("update:currentTime", e.target.value);
      }
    },
  },
};
</script>

<style scoped lang="less">
.play-full-footer{
  .play-btn{
    &.paused{
      .play-btn-son{
        &>div:nth-child(2){
          div{
            background-position: -6px -6px;
          }
        }
      }
    }
  }
}
.play-full-footer {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  //   background-color: pink;
  color: #fff;
  .jindutiao {
    display: flex;
    // overflow: hidden;
    .bofangjindu {
      // flex: 1;
      width: 15%;
    }
    .gundong {
      // flex: 4;
      width: 70%;
      height: 6px;
      position: relative;
      margin: 6.7px 3px;
      border-radius: 3px;
      background: linear-gradient(to right, lightblue, lightcoral);
      input {
        width: 100%;
        //   height: 2px;
        //   margin: 8.2px 0;
        opacity: 0;
        z-index: 999;
        position: absolute;
      }
      span {
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        background: rgb(30, 124, 38);
        border-radius: 3px;
      }
    }
    .zongshijian {
      // flex: 1;
      width: 15%;
    }
  }
  .play-btn {
    width: 100%;
    height: 50px;
    margin: 10px 0;
    // background-color: pink;
    .play-btn-son {
      width: 65%;
      height: 100%;
      // background-color: skyblue;
      margin: 0 auto;
      display: flex;
      // justify-items: ;
      div {
        flex: 1;
        &>div {
          
          background: url("https://www.kugou.com/yy/static/images/play/btn.png")
            no-repeat;
          // background-position: -6px -66px;
          // margin: 1px auto;
        }
        &:nth-child(1) {
          // background-color: red;
          div{
            width: 38px;
            height: 38px;
            background-position: 0px -154px;
            background-size: 317px 322.25px;
            margin: 6px auto;
          }
        }
        &:nth-child(2) {
          // background-color:blue;
          div {
            width: 48px;
            height: 48px;
            // background: url("https://www.kugou.com/yy/static/images/play/btn.png")
            //   no-repeat;
            background-position: -6px -66px;
            margin: 1px auto;
          }
        }
        &:nth-child(3) {
          // background-color: green;
          div{
            width: 38px;
            height: 38px;
            background-position: -152px -154px;
            background-size: 317px 322.25px;
            margin: 6px auto;
          }
        }
      }
    }
  }
}
</style>