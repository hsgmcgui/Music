<template>
  <div class="search">
    <div class="search-box">
      <form class="my-input">
        <div class="inputcover">
          <div class="magnifier">
            <i></i>
          </div>
          <input
            type="text"
            placeholder="搜索歌曲、歌手、专辑"
            v-model.trim="inputValue"
            @input="inputing = true"
            @keyup.enter="xxx(inputValue)"
          />
          <div class="delete" @click="inputValue = ''">
            <i></i>
          </div>
        </div>
      </form>
      <div class="btn" v-if="!inputing && !newSongs.length">
        <h3>热门搜索</h3>
        <ul>
          <li
            v-for="(item, index) in searchHot"
            :key="index"
            @click="xxx(item.first)"
          >
            {{ item.first }}
          </li>
        </ul>
      </div>
      <ul class="search-hint" v-if="inputing && suggests.length">
        <h3>搜索“{{inputValue}}”</h3>
        <li
          v-for="(item, index) in suggests"
          :key="index"
          @click="xxx(item.keyword)"
        >
          {{ item.keyword }}
        </li>
      </ul>

      <ul v-if="!inputing && inputValue">
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
      inputValue: "",
      inputing: false,
      suggests: [],
      newSongs: [],
      gender: "Search",
      searchHot: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next((vm) => {
      vm.gender = to.name || "Search";
    });
  },
  created() {
    this.axios.get("/search/hot").then((res) => {
      console.log(res);
      this.searchHot = res.data.result.hots;
    });
  },
  watch: {
    inputValue: function (n) {
      // console.log(this.inputValue);
      // console.log(n)
      if (n) {
        if (this.inputing) {
          this.axios
            .get("/search/suggest?keywords=" + n + "&type=mobile")
            .then((res) => {
              // console.log("搜索建议", res.data.result.allMatch);
              this.suggests = res.data.result.allMatch;
            });
        } else {
          console.log("搜索结果");
        }
      } else {
        this.inputing = false;
        this.suggests = [];
        this.newSongs = [];
      }
    },
  },
  methods: {
    xxx: function (n) {
      
      if (n) {
        this.inputing = false;
        this.inputValue = n;
        this.axios.get("/search?keywords=" + this.inputValue).then((res) => {
          // console.log("搜索建议", res.data.result.allMatch);
          // console.log(res);
          this.newSongs = res.data.result.songs;
          // console.log(this.newSongs)
          // this.suggests = res.data.result.allMatch;
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.search {
  width: 100%;
  color: #333;
  .search-box {
    width: 100%;
    background: #fbfcfd;
    position: relative;
    .my-input {
      width: 100%;
      // background-color: pink;
      padding: 15px 10px;
      border: 0 solid rgba(0, 0, 0, 0.1);
      border-bottom-width: 1px;
      .inputcover {
        width: 100%;
        height: 30px;
        padding: 0 30px;
        background-color: #ebecec;
        border-radius: 15px;
        position: relative;
        .magnifier {
          width: 30px;
          height: 30px;
          // background-color: pink;
          position: absolute;
          left: 0;
          top: 0;
          i {
            display: block;
            width: 13px;
            height: 13px;
            background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==")
              no-repeat;
            background-position: center;
            background-size: cover;
            margin: 8.5px auto;
          }
        }
        input {
          width: 100%;
          height: 30px;
          outline-style: none;
          border: none;
          padding: 0;
          background: rgba(0, 0, 0, 0);
          line-height: 18px;
        }
        .delete {
          width: 30px;
          height: 30px;
          // background-color: pink;
          position: absolute;
          right: 0;
          top: 0;
          i {
            display: block;
            width: 13px;
            height: 13px;
            background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==")
              no-repeat;
            background-position: center;
            background-size: cover;
            margin: 8.5px auto;
          }
        }
      }
    }
    .btn {
      width: 100%;
      padding: 15px 10px 0 10px;
      h3 {
        font-size: 12px;
        margin-bottom: 10px;
      }
      ul {
        width: 100%;
        // display: flex;
        li {
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          display: inline-block;
          padding: 0 14px;
          margin: 0 8px 8px 0;
          border: 1px solid #d3d4da;
          border-radius: 18px;
          color: #333;
        }
      }
    }
    .search-hint {
      width: 100%;
      position: absolute;
      h3{
        height: 45px;
        line-height: 45px;
        padding-left: 10px;
        color: skyblue;
        font-size: 14px;
      }
      li {
        width: 100%;
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #ebecec;
        padding-left: 10px;
      }
    }
  }
}
</style>