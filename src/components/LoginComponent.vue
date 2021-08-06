<template>
  <div id="profile-card" class="d-flex flex-column bg-light">
    <div class="">
      <img src="http://placekitten.com/200/300" alt="Profile Picture" id="profile-img">
    </div>
    <div id="profile-name">
      <small class="text-grey">Summer 2021</small>
      <h4>Big Chungus</h4>
    </div>
    <div id="profile-links">
      <p class="mdi mdi-github">
        Github
      </p>
      <p class="mdi mdi-linkedin">
        LinkedIn
      </p>
      <p class="mdi mdi-file-account">
        Resume
      </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#profile-img{
  border-radius: 50%;
  height: 10rem;
  width: 10rem;
  object-fit: cover;
  margin-bottom: 2rem;
}

#profile-card{
  margin-left: 1rem;
  margin-right: 1rem;
  box-shadow: 3px 5px 20px darkgray;
  padding-top: 15vh;
  align-items: center;
  padding-bottom: 20vh;
}

#profile-links{
  /* TODO: Get links to align left */
  margin-top: 1rem;
}

</style>
