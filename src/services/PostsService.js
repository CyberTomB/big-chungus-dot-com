import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    console.log(res.data)
    AppState.posts = res.data.posts
  }
}

export const postsService = new PostsService()
