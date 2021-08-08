import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'
// TODO: Change the way posts are saved in the AppState and access posts by digging into the object
class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    AppState.postsObj = res.data
    AppState.posts = res.data.posts
  }

  async getAllByQuery(query) {
    const res = await api.get('api/posts?query=' + query)
    AppState.searchResults.posts = res.data.posts
  }

  async getPage(page) {
    const res = await api.get(AppState.postsObj[page])
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
    if (AppState.account.id === creator) {
      try {
        const res = await api.delete('api/posts/' + id)
        logger.log(res.data)
        AppState.posts = AppState.posts.filter(p => p.id !== id)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }
}

export const postsService = new PostsService()
