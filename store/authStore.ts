import { create } from 'zustand'

type AuthState = {
  isAuthenticated: boolean
  setAuthenticated: (auth: boolean) => void
}

// Initialize state from localStorage
const initializeAuthState = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true'
  }
  return false
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: initializeAuthState(),
  setAuthenticated: (auth: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', auth ? 'true' : 'false')
    }
    set({ isAuthenticated: auth })
  },
}))

export default useAuthStore