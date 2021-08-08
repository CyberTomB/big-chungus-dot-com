import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfilesService {
  async getProfileById(id) {
    try {
      const profile = '/api/profiles/' + id
      const res = await api.get(profile)
      AppState.activeProfile = res.data
      this.getPostsByProfileId(id)
    } catch (error) {
      console.error(error)
    }
  }

  async getPostsByProfileId(id) {
    try {
      const res = await api.get('/api/profiles/' + id + '/posts')
      AppState.posts = res.data.posts
      AppState.postsObj = res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export const profilesService = new ProfilesService()
