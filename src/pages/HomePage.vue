<template>
  <div class="row">
    <div class="col-md-9">
      <ThreadComponent />
    </div>
    <div class="col-md-3">
      <AdComponent />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
