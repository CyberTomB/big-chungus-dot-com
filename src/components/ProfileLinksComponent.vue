<template>
  <a v-if="profile.github"
     class="mdi mdi-github action"
     :href="profile.github || 'https://github.com'"
     target="_blank"
     alt="github"
     :title="profile.github || 'github'"
     rel="external"
     @click.stop
  >
  </a>
  <a v-if="profile.linkedin"
     class="mdi mdi-linkedin action"
     :href="profile.linkedin || 'https://linkedin.com'"
     target="_blank"
     alt="linkedin"
     :title="profile.linkedin || 'linkedin'"
     rel="external"
     @click.stop
  >
  </a>
  <a v-if="profile.resume"
     class="mdi mdi-file-account action"
     :href="profile.resume || '#'"
     target="_blank"
     alt="resume"
     :title="profile.resume || 'resume'"
     rel="external"
     @click.stop
  >
  </a>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true,
      default: () => { return {} }
    }
  }
}
</script>

<style scoped>
.action {
  cursor: pointer;
}
</style>
