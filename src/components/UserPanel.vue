<script setup lang="ts">
import { ref } from 'vue'
import { LOGOUT_PATH, type Me } from '@/api'
import ThemeToggle from '@/components/ThemeToggle.vue'

defineProps<{ me: Me }>()

// Use default avatar icon if the app can't load the user's avatar
const avatarFailed = ref(false)
const DEFAULT_AVATAR = 'https://cdn.discordapp.com/embed/avatars/0.png'
</script>

<template>
  <div class="user-panel">
    <img class="avatar" :src="avatarFailed ? DEFAULT_AVATAR : me.avatarURL" alt=""
      @error="avatarFailed = true">
    <div class="names">
      <p class="logged-in-as">Logged in as</p>
      <p class="display-name">{{ me.globalName || me.username }}</p>
      <p class="username">{{ me.username }}</p>
    </div>
    <theme-toggle/>
    <a class="icon-btn logout" :href="LOGOUT_PATH" title="Log out" aria-label="Log out">
      <!-- Sign-out icon -->
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
    </a>
  </div>
</template>

<style scoped>
.user-panel {
  align-items: center;
  background: var(--bg-dark-3);
  border-radius: .5rem;
  box-shadow: 0 .25rem 1rem rgba(0, 0, 0, .25);
  display: flex;
  padding: .375rem .375rem .375rem .5rem;
  user-select: none;
}
.avatar {
  border-radius: 50%;
  flex-shrink: 0;
  height: 2rem;
  object-fit: cover;
  width: 2rem;
}
.names {
  flex: 1;
  line-height: 1.25;
  margin-left: .5rem;
  min-width: 0;
}
.display-name, .username {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.display-name {
  font-weight: 600;
}
.username {
  color: var(--text-muted);
  font-size: .75rem;
}
.logged-in-as {
  color: var(--text-muted);
  font-size: .6rem;
  margin: 0;
}
/* Reuse login icon design from modmail dashboard */
.icon-btn {
  align-items: center;
  border-radius: var(--roundness);
  color: var(--text-muted);
  display: flex;
  flex-shrink: 0;
  height: 2rem;
  justify-content: center;
  text-decoration: none;
  transition: background .2s ease-in-out, color .2s ease-in-out;
  width: 2rem;
}
.icon-btn:hover {
  background: color-mix(in srgb, var(--bg-dark-1), white 10%);
}
.logout:hover {
  color: var(--red);
}
</style>
