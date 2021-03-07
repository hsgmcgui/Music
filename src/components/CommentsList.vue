<template>
  <li class="comments-list">
    <div class="touxiang">
      <img :src="item.user.avatarUrl" alt="" />
    </div>
    <div class="pinglun">
      <div class="name">{{ item.user.nickname }}</div>
      <div class="neirong">
        <span v-if="item.beReplied.length">
          回复<i v-for="(user, index) in item.beReplied" :key="index"
            >@{{ user.user.nickname }}</i
          >：
        </span>
        {{ item.content }}
      </div>
      <div class="who" v-if="item.beReplied.length">
        <div v-for="(item,index) in item.beReplied" :key="index">
          <span>@{{item.user.nickname}}：</span>
          <span>{{item.content}}</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item"],
};
</script>
 
<style scoped lang="less">
.comments-list {
  width: 100%;
  padding: 10px 0 0 0;
  display: flex;
  flex-direction: row;
  .touxiang {
    width: 30px;
    flex: none;
    margin: 0 10px;
    img {
      border-radius: 50%;
      // overflow: hidden;
    }
  }
  .pinglun {
    flex: auto;
    padding: 0 10px 11px 0;
    border-bottom: 1px solid rgba(0,0,0,.1);
    .name{
        font-size: 14px;
        color: #666666;
        margin-bottom: 5px;
    }
    .neirong{
        font-size: 15px;
        color: #333;
        span{
            i{
                color: skyblue;
            }
        }
    }
    .who{
        border: 1px solid rgba(0,0,0,.1);
        color: #888;
        margin: 5px 0;
        padding: 10px;
    }
  }
}
</style>