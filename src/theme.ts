import { ref, watch } from 'vue'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    // Storage blocked; fall through to the system preference
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export const theme = ref<Theme>(initialTheme())

watch(theme, (value) => {
  document.documentElement.dataset.theme = value
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Storage blocked; the theme still applies for this visit
  }
}, { immediate: true })

// Keep in sync with the transition duration on .theme-fading in main.css
const FADE_MS = 300
let fadeTimer: ReturnType<typeof setTimeout> | undefined

export function toggleTheme() {
  // Only fade while switching, so hover transitions stay snappy the rest of the time
  const root = document.documentElement
  root.classList.add('theme-fading')
  clearTimeout(fadeTimer)
  fadeTimer = setTimeout(() => root.classList.remove('theme-fading'), FADE_MS)

  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
