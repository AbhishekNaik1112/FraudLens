// store/authStore.ts
import {create} from 'zustand'

type AuthState = {
  isAuthenticated: boolean
  setAuthenticated: (auth: boolean) => void
}

const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  setAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),
}))

export default useAuthStore
