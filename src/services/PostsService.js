import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    console.log(res.data)
    AppState.posts = res.data.posts
  }

  async create(body) {
    const post = {
      creatorId: AppState.account.id,
      body: body
    }
    const res = await api.post('api/posts', post)
    AppState.posts.unshift(res.data)
  }
}

export const postsService = new PostsService()
