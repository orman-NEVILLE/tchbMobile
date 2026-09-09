import { ref } from 'vue'

const STORAGE_KEY = 'tchb-theme'

const theme = ref(
  localStorage.getItem(STORAGE_KEY) || 'system'
)

const applyTheme = (selectedTheme) => {
  const root = document.documentElement

  root.classList.remove('theme-light', 'theme-dark')

  if (selectedTheme === 'light') {
    root.classList.add('theme-light')
    return
  }

  if (selectedTheme === 'dark') {
    root.classList.add('theme-dark')
    return
  }

  const prefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  root.classList.add(
    prefersDark ? 'theme-dark' : 'theme-light'
  )
}

const setTheme = (selectedTheme) => {
  theme.value = selectedTheme

  localStorage.setItem(
    STORAGE_KEY,
    selectedTheme
  )

  applyTheme(selectedTheme)
}

const initializeTheme = () => {
  applyTheme(theme.value)
}

export const useTheme = () => {
  return {
    theme,
    setTheme,
    initializeTheme,
  }
}