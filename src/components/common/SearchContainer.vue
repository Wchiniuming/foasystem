<template>
  <div class='searchContainer'>
    <slot name='queryCd'></slot>
  </div>
</template>
<script>
export default {
  name: 'SearchContainer'
}
</script>
<style scoped>
  .searchContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
