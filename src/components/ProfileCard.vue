<template>
  <div class="row bg-light shadow py-2 mb-3">
    <div class="col">
      <router-link :to="{name: 'Profile', params: {id: profile._id}}" v-if="profile._id">
        <div id="profile-elements" class="row">
          <div class="col-3">
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
          <div class="col-6 text-right">
            <div class="row">
              <div id="profile-links" class="col-12">
                <ProfileLinksComponent :profile="profile" />
              </div>
              <div class="col-12">
                <p>{{ profile.bio }}</p>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true,
      default: () => { return { } }
    }
  }
}
</script>

<style scoped>
.action-btn{
  font-size: 22px;
  cursor: pointer;
}
#profile-img{
  border-radius: 50%;
  object-fit: cover;
  width: 6rem;
  height: 6rem;
}
</style>
