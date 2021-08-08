import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class ProfilesService {
  async getProfileById(id) {
    try {
      const profile = '/api/profiles/' + id
      const res = await api.get(profile)
      AppState.activeProfile = res.data
      this.getPostsByProfileId(id)
    } catch (error) {
      Pop.toast(error)
    }
  }

  async getAllByQuery(query) {
    const res = await api.get('/api/profiles?query=' + query)
    AppState.searchResults.profiles = res.data
  }

  async getPostsByProfileId(id) {
    try {
      const res = await api.get('/api/profiles/' + id + '/posts')
      AppState.posts = res.data.posts
      AppState.postsObj = res.data
    } catch (error) {
      Pop.toast(error)
    }
  }
}

export const profilesService = new ProfilesService()
