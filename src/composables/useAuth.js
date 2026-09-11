import { computed, ref } from 'vue'

const USER_STORAGE_KEY = 'tchb-auth-user'
const TOKEN_STORAGE_KEY = 'tchb-auth-token'

const getStoredUser = () => {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY)

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser)
  } catch (error) {
    console.error(
      'Impossible de récupérer la session TCHB :',
      error
    )

    localStorage.removeItem(USER_STORAGE_KEY)

    return null
  }
}

const user = ref(getStoredUser())

const token = ref(
  localStorage.getItem(TOKEN_STORAGE_KEY)
)

const isAuthenticated = computed(() => {
  return !!token.value && user.value !== null
})

const setSession = ({
  user: authenticatedUser,
  token: authToken,
}) => {
  user.value = authenticatedUser
  token.value = authToken

  localStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify(authenticatedUser)
  )

  localStorage.setItem(
    TOKEN_STORAGE_KEY,
    authToken
  )
}

const logout = () => {
  user.value = null
  token.value = null

  localStorage.removeItem(USER_STORAGE_KEY)
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}

export const useAuth = () => {
  return {
    user,
    token,
    isAuthenticated,
    setSession,
    logout,
  }
}