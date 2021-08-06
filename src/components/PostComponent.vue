<template>
  <div class="my-2 col-12 p-2 bg-light shadow">
    <div class="row">
      <div class="col-2">
        <img :src="post.creator.picture" :alt="post.creator.name" class="profile-img">
        <!-- <small>{{ post.creator.name }}</small> -->
      </div>
      <div class="col-10">
        <h6>
          {{ post.body }}
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.profile-img{
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
}
</style>
