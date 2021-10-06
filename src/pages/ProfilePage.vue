<template>
  <div class="profile">
    <ProfileComponent />
    <TestComponent btn-name="test" />
    <TestComponent />
  </div>
</template>

<script>
import ProfileComponent from '../components/ProfileComponent.vue'
export default {
  name: 'ProfilePage',
  components: {
    ProfileComponent
  }
}
</script>

    TestComponent
