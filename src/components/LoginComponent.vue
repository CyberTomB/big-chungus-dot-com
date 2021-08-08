<template>
  <div id="profile-card" class="d-flex flex-column bg-light">
    <div v-if="user.isAuthenticated">
      <div class="text-center">
        <img :src="account.picture"
             id="profile-img"
             class="action bg-info"
        >
      </div>
      <div id="profile-name">
        <small class="text-grey">{{ account.class }}</small>
        <h4>{{ account.name }}</h4>
      </div>
      <div id="profile-links">
        <p class="mdi mdi-github">
          {{ account.github || ' not linked' }}
        </p>
        <p class="mdi mdi-linkedin">
          {{ account.linkedin }}
        </p>
        <p class="mdi mdi-file-account">
          {{ account.resume }}
        </p>
      </div>
    </div>
    <button
      class="btn btn-outline-primary text-uppercase"
      @click="login"
      v-if="!user.isAuthenticated"
    >
      Login
    </button>

    <div class="dropdown text-primary" v-else>
      <div
        class="dropdown-toggle"
        @click="state.dropOpen = !state.dropOpen"
      >
        <i class="rounded mdi mdi-cog"></i>
        <span class="mx-3">{{ user.name }}</span>
      </div>
      <div
        class="dropdown-menu p-0 list-group w-100"
        :class="{ show: state.dropOpen }"
        @click="state.dropOpen = false"
      >
        <router-link :to="{ name: 'Account' }">
          <div class="list-group-item list-group-item-action hoverable">
            Account
          </div>
        </router-link>
        <router-link :to="{ name: 'Profile', params: {id: account.id}}">
          <div class="list-group-item list-group-item-action hoverable">
            Profile
          </div>
        </router-link>
        <div
          class="list-group-item list-group-item-action hoverable"
          @click="logout"
        >
          Logout
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
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
  margin-bottom: 2rem;
  border: 6px double lightgray
}

#profile-card{
  margin-left: 1rem;
  box-shadow: 3px 5px 20px darkgray;
  padding-top: 15vh;
  align-items: center;
  padding-bottom: 20vh;
}

#profile-links{
  /* TODO: Get links to align left */
  margin-top: 1rem;
  margin-bottom: 3rem;
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
