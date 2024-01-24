import { Storage } from '@/utils/storage'

const app = {
  state: {
    collapsed: Storage.get('collapsed') || false
  },

  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.collapsed = !state.collapsed
      Storage.set('collapsed', state.collapsed)
    }
  }
}

export default app
