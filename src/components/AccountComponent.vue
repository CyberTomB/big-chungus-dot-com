<template>
  <!-- Modal -->
  <div class="modal fade" id="edit-profile" tabindex="-1" aria-labelledby="edit-profile" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="edit-profile">
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
                     v-model="account.name"
              >
            </div>
            <div class="form-group">
              <label for="account-class">Class:</label>
              <input type="text"
                     class="form-control"
                     id="account-class"
                     placeholder="Big Chungus"
                     v-model="account.class"
              >
            </div>
            <div class="form-group">
              <label for="account-github">Github:</label>
              <input type="text"
                     class="form-control"
                     id="account-github"
                     placeholder="Big Chungus"
                     v-model="account.github"
              >
            </div>
            <div class="form-group">
              <label for="account-linkedin">LinkedIn:</label>
              <input type="text"
                     class="form-control"
                     id="account-linkedin"
                     placeholder="Big Chungus"
                     v-model="account.linkedin"
              >
            </div>
            <div class="form-group">
              <label for="account-resume">Resume:</label>
              <input type="text"
                     class="form-control"
                     id="account-resmue"
                     placeholder="Big Chungus"
                     v-model="account.resmue"
              >
            </div>
            <div class="form-group">
              <label for="account-picture">Profile Image URL:</label>
              <input type="text" class="form-control" id="account-picture" placeholder="http://big-chungus.com" v-model="account.picture">
            </div>
            <div class="form-group">
              <label for="account-cover-img">Cover Image URL:</label>
              <input type="text" class="form-control" id="account-cover-img" placeholder="http://big-chungus.com" v-model="account.coverImg">
            </div>
            <div class="form-group">
              <label for="account-bio">Bio:</label>
              <textarea class="form-control" id="account-bio" rows="3" v-model="account.bio"></textarea>
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
  <!-- Profile -->
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
        <div class="col-12 d-flex justify-content-end">
          <i class="text-warning action-btn mdi mdi-pencil"
             title="edit"
             alt="edit"
             @click="state.editorOn = !state.editorOn"
             data-toggle="modal"
             data-target="#edit-profile"
          >
          </i>
        </div>
      </div>
    </div>
  </div>
  <div id="profile-thread">
    <!-- TODO: Get posts to load on this page -->
    <ThreadComponent />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'
import { accountService } from '../services/AccountService'
import $ from 'jquery'
import Pop from '../utils/Notifier'
export default {
  setup() {
    const state = reactive({
      dropOpen: false,
      editorOn: false,
      newAccount: {
        picture: '',
        bio: '',
        name: ''
      }
    })
    onMounted(async() => {
      profilesService.getPostsByProfileId(AppState.account.id)
    })
    return {
      state,
      profile: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      async updateAccount() {
        try {
          await accountService.edit(AppState.account)
          $('#edit-profile').modal('hide')
          Pop.toast('Created!', 'success')
        } catch (e) {
          Pop.toast(e, 'error')
        }
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
  border: 6px double lightgray;
  position: absolute;
  bottom: 0rem;
}

.action-btn{
  font-size: 22px;
  cursor: pointer;
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
