<template>
  <AccountComponent />
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import AccountComponent from '../components/AccountComponent.vue'
export default {
  name: 'Account',
  components: {
    AccountComponent
  },
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
