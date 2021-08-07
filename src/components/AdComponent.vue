<template>
  <div v-if="ads[0]">
    <a id="square-ad" :href="'https://' + ads[0].linkURL" rel="external" target="_blank" class="row m-2">
      <img :src="ads[0].square" alt="" class="img-fluid" :title="ads[0].linkURL">
    </a>
    <a id="tall-ad"
       :href="'https://' + ads[1].linkURL"
       rel="external"
       target="_blank"
       class="row m-2"
       v-if="ads[1]"
    >
      <img :src="ads[1].tall" alt="" class="img-fluid" :title="ads[1].linkURL">
    </a>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { adsService } from '../services/AdsService'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await adsService.getAds()
      } catch (error) {
        console.error(error)
      }
    })
    return {
      ads: computed(() => AppState.ads)
    }
  }
}
</script>
