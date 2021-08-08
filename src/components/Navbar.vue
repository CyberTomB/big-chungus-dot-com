<template>
  <nav class="row navbar navbar-expand-lg navbar-dark bg-dark">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'Home' }" class="nav-link">
            <img alt="logo" src="src\assets\img\bigchungus.png" height="45" />
            HOME
          </router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0" @submit.prevent="sendQuery">
        <input class="form-control mr-sm-2"
               type="search"
               placeholder="Search"
               aria-label="Search"
               v-model="state.search"
        >
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { postsService } from '../services/PostsService'
import { profilesService } from '../services/ProfilesService'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      dropOpen: false,
      search: ''
    })
    return {
      state,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      search: computed(() => AppState.search),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      sendQuery() {
        postsService.getAllByQuery(state.search)
        profilesService.getAllByQuery(state.search)
        router.push({ name: 'SearchResults' })
      }
    }
  }
}
</script>

<style scoped>
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
</style>
