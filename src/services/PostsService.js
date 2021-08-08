import { AppState } from '../AppState'
import { api } from './AxiosService'
// TODO: Change the way posts are saved in the AppState and access posts by digging into the object
class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    console.log(res.data)
    AppState.postsObj = res.data
    AppState.posts = res.data.posts
  }

  async getPage(page) {
    const res = await api.get(AppState.postsObj[page])
    console.log(res.data)
    AppState.postsObj = res.data
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

  async destroy(id, creator) {
    console.log(creator)
    if (AppState.account.id === creator) {
      try {
        const res = await api.delete('api/posts/' + id)
        console.log(res)
        AppState.posts = AppState.posts.filter(p => p.id !== id)
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export const postsService = new PostsService()
