<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Update Profile
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="updateAccount">
          <div class="modal-body">
            <div class="form-group">
              <label for="account-name">Name:</label>
              <input type="text"
                     class="form-control"
                     id="account-name"
                     placeholder="Big Chungus"
                     v-model="state.newAccount.name"
              >
            </div>
            <div class="form-group">
              <label for="account-picture">Image URL:</label>
              <input type="text" class="form-control" id="account-picture" placeholder="http://big-chungus.com" v-model="state.newAccount.picture">
            </div>
            <div class="form-group">
              <label for="account-bio">Bio:</label>
              <textarea class="form-control" id="account-bio" rows="3" v-model="state.newAccount.bio"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Profile Card -->
  <div id="profile-card" class="d-flex flex-column bg-light">
    <div v-if="user.isAuthenticated" class="">
      <img :src="account.picture"
           id="profile-img"
           data-toggle="modal"
           data-target="#exampleModal"
           class="action bg-info"
      >
      <div id="profile-name">
        <small class="text-grey">{{ account.class }}</small>
        <h4>{{ account.name }}</h4>
      </div>
      <div id="profile-links">
        <p class="mdi mdi-github">
          {{ user.github || ' not linked' }}
        </p>
        <p class="mdi mdi-linkedin">
          {{ user.linkedin }}
        </p>
        <p class="mdi mdi-file-account">
          {{ user.resume }}
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
        <router-link :to="{ name: 'Profile'}">
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
import { accountService } from '../services/AccountService'
export default {
  setup() {
    const state = reactive({
      dropOpen: false,
      newAccount: {
        picture: '',
        bio: '',
        name: ''
      }
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
      },
      async updateAccount() {
        console.log('account updated', state.newAccount)
        await accountService.edit(state.newAccount)
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
