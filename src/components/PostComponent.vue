<template>
  <div class="my-2 col-12 p-2 bg-light shadow">
    <div class="row">
      <div class="col-3 text-center h-100">
        <img :src="post.creator.picture" :alt="post.creator.name" class="profile-img" :title="post.creator.name">
        <br>
        <small class="text-break">{{ post.creator.name }}</small>
      </div>
      <div class="col-9 px-3 align-items-center d-flex">
        <h6 class="text-wrap text-break">
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
  object-fit: cover;
  width: 6rem;
  height: 6rem;
}
</style>
