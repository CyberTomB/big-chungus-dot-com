<template>
  <div class="row bg-light shadow pb-2 mb-3">
    <div class="col">
      <div class="row">
        <img :src="profile.coverImg" alt="cover image" title="cover image" id="cover-img">
      </div>
      <div id="profile-elements" class="row">
        <div class="col-3" style="min-width: 12rem">
          <img :src="profile.picture"
               :alt="profile.name"
               :title="profile.name"
               id="profile-img"
               class=""
          >
        </div>
        <div id="profile-name" class="col-3">
          <small class="text-grey">{{ profile.class }}</small>
          <h2>
            {{ profile.name }}
          </h2>
          <small v-if="profile.graduated">Graduated</small>
          <small v-else>Undergrad</small>
        </div>
        <div id="profile-links" class="col-6 text-right">
          <i class="mdi mdi-github">
          </i>
          <i class="mdi mdi-linkedin">
          </i>
          <i class="mdi mdi-file-account">
          </i>
        </div>
      </div>
      <div id="profile-bio" class="row justify-content-center pt-5">
        <div class="col-12">
          <p>{{ profile.bio }}</p>
        </div>
      </div>
    </div>
  </div>
  <div id="profile-thread">
    <ThreadComponent />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const state = reactive({
      dropOpen: false
    })
    const route = useRoute()
    onMounted(async() => {
      try {
        await profilesService.getProfileById(route.params.id)
      } catch (error) {
        console.error(error)
      }
    })
    return {
      state,
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped>
#profile-img{
  border-radius: 50%;
  height: 10rem;
  width: 10rem;
  object-fit: cover;
  border: 6px double lightgray;
  position: absolute;
  bottom: 0rem;
}

#profile-elements{}

#profile-name{
}

#cover-img{
  width: 100%;
  max-height: 10rem;
  object-fit: cover;
}

#profile-card{
  margin-left: 1rem;
  box-shadow: 3px 5px 20px darkgray;
  padding-top: 15vh;
  align-items: center;
  padding-bottom: 20vh;
}

#profile-links{
font-size: 3rem;
}

.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
.action {
  cursor: pointer;
}
</style>
