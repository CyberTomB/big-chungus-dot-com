<template>
  <main>
    <div class="row flex-grow-1">
      <div class="col-md-3 my-2">
        <LoginComponent />
      </div>
      <div class="col-md-9">
        <Navbar />
        <router-view />
      </div>
    </div>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
