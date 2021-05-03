<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  // 解决页面刷新时store中的数据被删除无法获取的情况：在页面刷新时将数据存储在sessionstorage中，加载的时候重新读取
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
@import url('./assets/css/normalize.css');
  /* 解决滚动条出现，导致页面抖动问题 */
  html {
    overflow-x: hidden;
    overflow-y: auto;
  }
  body {
    width: 100vw;
    overflow: hidden;
    padding-right: calc(100vw - 100%);
  }
</style>
