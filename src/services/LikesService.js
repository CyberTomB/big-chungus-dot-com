import { AppState } from '../AppState'
import { api } from './AxiosService'
class LikesService {
  async likePost(id) {
    const res = await api.post(`api/posts/${id}/like`)
    console.log(res.data.id, 'post 0:', AppState.posts[0].id)
    const found = AppState.posts.find(p => p.id === res.data.id)
    found.likeIds = res.data.likeIds
  }
}

export const likesService = new LikesService()
