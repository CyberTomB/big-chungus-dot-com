import { AppState } from '../AppState'
import { api } from './AxiosService'

class AdsService {
  async getAds() {
    const res = await api.get('api/ads')
    AppState.ads = res.data
  }
}

export const adsService = new AdsService()
