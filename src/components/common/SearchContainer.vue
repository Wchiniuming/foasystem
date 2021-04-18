<template>
  <div class='searchcontainer'>
    <slot name='querycd'></slot>
  </div>
</template>
<script>
export default {
  name: 'SearchContainer'
}
</script>
<style scoped>
  .searchcontainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
