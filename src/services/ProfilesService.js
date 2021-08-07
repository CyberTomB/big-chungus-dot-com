import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfilesService {
  async getProfileById(id) {
    try {
      const res = await api.get('/api/profiles/' + id)
      AppState.activeProfile = res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export const profilesService = new ProfilesService()
