<template>
  <div class="my-2 col-12 p-2 bg-light shadow">
    <div class="row">
      <router-link :to="{name: 'Profile', params: {id: post.creator.id}}" v-if="post.creator.id" class="col-3 text-center">
        <div class="h-100">
          <img :src="post.creator.picture" :alt="post.creator.name" class="profile-img" :title="post.creator.name">
          <br>
          <small class="">{{ post.creator.name }}</small>
        </div>
      </router-link>
      <div class="col-9">
        <div class="row h-100 align-items-between">
          <h6 class="text-wrap text-break col-12">
            {{ post.body }}
          </h6>
          <small class="col-4 post-detail">{{ post.createdAt }}</small>
          <small class="col-4 post-detail justify-content-end">Likes: {{ post.likeIds.length }}</small>
          <small class="post-detail col-4">
            <div v-if="account.id">
              <i
                @click="likePost(post.id)"
                class="text-primary action-btn mdi"
                :class="{'mdi-thumb-up-outline': !isLiked, 'mdi-thumb-up': isLiked}"
                v-if="post.creator.id !== account.id"
                title="like"
              ></i>
            </div>
            <i @click="deletePost(post.id, post.creator.id)" v-if="post.creator.id == account.id" class="text-danger action-btn mdi mdi-delete" title="delete"></i>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { likesService } from '../services/LikesService'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Notifier'
export default {
  setup() {
    return {
      async likePost(id) {
        try {
          await likesService.likePost(id)
        } catch (error) {
          Pop.toast(error)
        }
      },
      async deletePost(id, creator) {
        if (await Pop.confirm()) {
          try {
            await postsService.destroy(id, creator)
          } catch (error) {
            Pop.toast(error)
          }
        }
      },
      account: computed(() => AppState.account)
    }
  },
  props: {
    post: {
      type: Object,
      required: true,
      default: () => { return { likeIds: [] } }
    }
  },
  computed: {
    isLiked() {
      let value = false
      const accountId = AppState.account.id
      let found
      if (this.post.likeIds !== null) {
        found = this.post.likeIds.find(x => x === accountId)
      }
      if (found !== undefined) {
        value = true
      }
      return value
    }
  }
}
</script>

<style scoped>
.action-btn{
  font-size: 22px;
  cursor: pointer;
}
.post-detail{
  display: flex;
  align-items: flex-end;
  padding-right: 2rem;
}
.profile-img{
  border-radius: 50%;
  object-fit: cover;
  width: 6rem;
  height: 6rem;
}
</style>
