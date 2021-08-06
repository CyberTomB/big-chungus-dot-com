<template>
  <div class="row">
    <PostComponent v-for="p in posts" :key="p.id" :post="p" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import PostComponent from '../components/PostComponent.vue'
export default {
  setup() {
    onMounted(async() => {
      try {
        await postsService.getAll()
      } catch (error) {
        console.error(error)
      }
    })
    return {
      posts: computed(() => AppState.posts)
    }
  },
  components: {
    PostComponent
  }
}
</script>
