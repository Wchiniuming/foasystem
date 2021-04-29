<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('./assets/css/normalize.css');
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
