<script setup lang="ts">
import { computed } from 'vue'
import { theme, toggleTheme } from '@/theme'

// Boxed: filled background, for use on its own. Otherwise matches the user panel's icon buttons.
defineProps<{ boxed?: boolean }>()

const label = computed(() => theme.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')
</script>

<template>
  <button class="theme-toggle" :class="{ boxed }" type="button" :title="label" :aria-label="label" @click="toggleTheme">
    <!-- Sun icon, shown in dark mode -->
    <svg v-if="theme === 'dark'" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
    <!-- Moon icon, shown in light mode -->
    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>
</template>

<style scoped>
/* Same look as the user panel's logout button */
.theme-toggle {
  align-items: center;
  background: none;
  border: none;
  border-radius: var(--roundness);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 2rem;
  justify-content: center;
  padding: 0;
  transition: background .2s ease-in-out, color .2s ease-in-out;
  width: 2rem;
}
.theme-toggle:hover {
  background: color-mix(in srgb, var(--bg-dark-1), white 10%);
  color: var(--text);
}
/* Same look as .action-btn, so it sits nicely beside the login button */
.theme-toggle.boxed {
  background: var(--bg-dark-2);
}
.theme-toggle.boxed:hover {
  background: var(--bg-dark-3);
}
</style>
