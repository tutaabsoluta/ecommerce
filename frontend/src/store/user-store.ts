import { create } from 'zustand'
import { AuthUser } from '@/types'

interface UserStore {
  user: AuthUser | null
  token: string | null
  setUserAndToken: (user: AuthUser | null, token: string | null) => void
  logout: () => void
}

const LOCAL_STORAGE_KEY = 'auth'

const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: null,

  setUserAndToken: (user, token) => {
    if (user && token) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ user, token }))
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
    set({ user, token })
  },

  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    set({ user: null, token: null })
  },
}))

if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (stored) {
    const { user, token } = JSON.parse(stored)
    useUserStore.setState({ user, token })
  }
}

export default useUserStore
