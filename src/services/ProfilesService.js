import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfilesService {
  async getProfileById(id) {
    try {
      const profile = '/api/profiles/' + id
      const res = await api.get(profile)
      const postsRes = await api.get(profile + '/posts')
      AppState.activeProfile = res.data
      AppState.posts = postsRes.data.posts
      AppState.postsObj = postsRes.data
    } catch (error) {
      console.error(error)
    }
  }
}

export const profilesService = new ProfilesService()
