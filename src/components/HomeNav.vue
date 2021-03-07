<template>
  <ul id="home-nav">
    <li>
      <router-link to="/">推荐音乐</router-link>
    </li>
    <li>
      <router-link to="/hot">热歌榜</router-link>
    </li>
    <li>
      <router-link to="/search">搜索</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  
};
</script>

<style scoped lang="less">
#home-nav {
  width: 100%;
  height: 41px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  li {
    flex: 1;
    text-align: center;
    // line-height: 41px;
    a {
      text-decoration: none;
      color: #000;
      display: inline-block;
      padding: 0 10px;
      line-height: 40px;
      &.router-link-exact-active {
        border-bottom: 2px solid #dd001b;
        color: #dd001b;
      }
    }
  }
}
</style>