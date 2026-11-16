<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchMe, LOGIN_PATH, type Me } from '@/api'
import AppealForm from '@/components/AppealForm.vue'
import UserPanel from '@/components/UserPanel.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const me = ref<Me | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    me.value = await fetchMe()
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page">
    <header class="top-bar">
      <user-panel v-if="me" :me="me" class="user"/>
      <template v-else>
        <theme-toggle boxed/>
      </template>
    </header>
    <p class="page-title">ATLAcord Ban Appeal</p>
    <p class="subtitle">Fill out the form below and the staff team will review your appeal. You will also automatically be added to our appeal server so we can communicate with you.</p>

    <div class="column">
      <p v-if="loading" class="status">Loading...</p>

      <div v-else-if="!me" class="login card">
        <p class="status">Log in with Discord to appeal</p>
        <a class="action-btn primary" :href="LOGIN_PATH">Log in with Discord</a>
      </div>

      <template v-else>
        <appeal-form v-if="me.banned" :cooldown-ends-at="me.appealCooldownEndsAt"/>
        <div v-else class="notice card">
          <p class="status">You aren't banned from the server, so there's nothing to appeal.</p>
          <a class="action-btn primary" href="https://discord.gg/avatar">Join Server</a>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 1rem 4rem 2rem;
}
.top-bar {
  align-items: center;
  display: flex;
  gap: .5rem;
  justify-content: flex-end;
  margin-bottom: .5rem;
  min-height: 2.75rem;
}
.page-title {
  font-size: 2.25rem;
  margin: 0;
  text-align: center;
}
.subtitle {
  color: var(--text-muted);
  font-family: var(--thread-text);
  margin: .5rem auto 1.5rem;
  max-width: 40rem;
  text-align: center;
}
.column {
  margin: 0 auto;
  max-width: 40rem;
}
.user {
  width: 14rem;
}
.status {
  color: var(--text-muted);
  font-family: var(--thread-text);
  margin: 0 0 1rem;
  text-align: center;
}
.login, .notice {
  align-items: center;
  background: var(--bg-dark-2);
  border-radius: var(--roundness);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

@media (max-width: 767px) {
  .page {
    padding-left: .75rem;
    padding-right: .75rem;
  }
  .page-title {
    font-size: 1.75rem;
  }
}
</style>
