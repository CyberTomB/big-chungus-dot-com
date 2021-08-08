import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async edit(newAccount) {
    if (AppState.user.isAuthenticated) {
      try {
        const res = await api.put('/account', newAccount)
        logger.log(res.data)
      } catch (error) {
        Pop.toast(error)
      }
    } else {
      Pop.toast('This is not your account!')
    }
  }
}

export const accountService = new AccountService()
