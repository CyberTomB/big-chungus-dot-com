<template>
  <div class="row" id="new-post-form">
    <div class="card-body border-top col-12">
      <form @submit.prevent="createPost" class="row" action="">
        <small>New Post:</small>
        <div class="input-group">
          <textarea name="body" class="form-control" aria-label="new-post" v-model="state.newPost"></textarea>
          <button class="btn btn-secondary" type="submit">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="row justify-content-between">
    <button class="col-3 btn btn-info" @click="turnPage('newer')" :disabled="state.page.newer == null">
      NEWER
    </button>
    <button class="col-3 btn btn-info" @click="turnPage('older')" :disabled="state.page.older == null">
      OLDER
    </button>
  </div>
  <div class="row">
    <PostComponent v-for="p in posts" :key="p.id" :post="p" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import PostComponent from '../components/PostComponent.vue'
export default {
  setup() {
    const state = reactive({
      newPost: '',
      page: computed(() => AppState.postsObj)
    })
    onMounted(async() => {
      try {
        await postsService.getAll()
      } catch (error) {
        console.error(error)
      }
    })
    return {
      state,
      posts: computed(() => AppState.posts),
      async createPost() {
        await postsService.create(state.newPost)
        state.newPost = ''
      },
      async turnPage(dir) {
        if (AppState.postsObj[dir] !== null) {
          try {
            await postsService.getPage(dir)
          } catch (error) {
            console.error(error)
          }
        }
      }
    }
  },
  components: {
    PostComponent
  }
}
</script>

<style scoped>
button[disabled] {
  background-color: lightgray;
  border-color: darkgray
}
</style>
