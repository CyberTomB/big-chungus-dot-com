<template>
  <div class="row" id="posts">
    <PostComponent v-for="p in posts" :key="p.id" :post="p" />
  </div>
  <ProfileCard v-for="p in profiles" :key="p.id" :profile="p" />
</template>

<script>
import { computed } from '@vue/runtime-core'
import PostComponent from '../components/PostComponent.vue'
import { AppState } from '../AppState'
import ProfileCard from '../components/ProfileCard.vue'
export default {
  setup() {
    return {
      posts: computed(() => AppState.searchResults.posts),
      profiles: computed(() => AppState.searchResults.profiles)
    }
  },
  components: {
    PostComponent,
    ProfileCard
  }
}
</script>
