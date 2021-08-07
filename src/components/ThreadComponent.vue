<template>
  <div class="row">
    <div class="card-body border-top col-12">
      <!-- TODO: get new post to render without refresh -->
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
      newPost: ''
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
      }
    }
  },
  components: {
    PostComponent
  }
}
</script>
