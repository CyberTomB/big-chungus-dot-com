<template>
  <main>
    <div class="row flex-grow-1">
      <div class="col-md-3 my-2">
        <LoginComponent />
      </div>
      <div class="col-md-9">
        <Navbar />
        <div class="row">
          <div class="col-md-9 py-3">
            <router-view />
          </div>
          <div class="col-md-3">
            <AdComponent />
          </div>
        </div>
      </div>
    </div>
  </main>
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
