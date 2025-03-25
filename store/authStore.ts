// store/authStore.ts
import { create } from 'zustand'

type AuthState = {
  isAuthenticated: boolean
  setAuthenticated: (auth: boolean) => void
}

// Check localStorage on initial load (client-side only)
const initializeAuthState = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true'
  }
  return false
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: initializeAuthState(),
  setAuthenticated: (auth: boolean) => {
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', auth ? 'true' : 'false')
    }
    set({ isAuthenticated: auth })
  },
}))

export default useAuthStore