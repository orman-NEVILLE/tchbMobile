import { computed, ref } from 'vue'

const STORAGE_KEY = 'tchb-auth-user'

const storedUser = localStorage.getItem(STORAGE_KEY)

const user = ref(
  storedUser
    ? JSON.parse(storedUser)
    : null
)

const isAuthenticated = computed(() => {
  return user.value !== null
})

const login = (credentials) => {
  const authenticatedUser = {
    id: 1,
    name: 'Jean Dupont',
    whatsapp: credentials.whatsapp,
  }

  user.value = authenticatedUser

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(authenticatedUser)
  )
}

const logout = () => {
  user.value = null

  localStorage.removeItem(STORAGE_KEY)
}

export const useAuth = () => {
  return {
    user,
    isAuthenticated,
    login,
    logout,
  }
}