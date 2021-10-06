<template>
  <button class="btn btn-warning" id="sup" @click="clicked">
    {{ btnName }}
  </button>
</template>

<script>
export default {
  props: {
    btnName: {
      type: String,
      default: 'sup'
    }
  },
  setup() {
    return {
      clicked() {
        console.log('sup')
      }
    }
  }
}
</script>

<style scoped>
#sup {
  color: purple;
}
</style>
