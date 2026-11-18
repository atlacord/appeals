<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'

const LAST_UPDATED = 'November 18, 2026'
</script>

<template>
  <div class="page">
    <header class="top-bar">
      <router-link class="action-btn" to="/">Back to appeal</router-link>
      <theme-toggle boxed/>
    </header>
    <p class="page-title">Privacy Policy</p>
    <p class="subtitle">Last updated {{ LAST_UPDATED }}</p>

    <article class="policy card">
      <p>
        The purpose of this website is to allow users banned from the Avatar: Seven Havens (formerly Avatar: The Last Airbender) Discord community to appeal their ban.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Your Discord user ID</strong> Your user ID is used to link your ban appeal to our moderation system. It is also necessary to add you to our appeal server and create the modmail thread that is opened once you submit your appeal.
        </li>
        <li>
          <strong>The content of your appeal</strong> The answers you type into the form are stored by our moderation system. This can be deleted upon request by emailing admin@atlacord.com
        </li>
      </ul>

      <h2>Discord permissions</h2>
      <p>Logging in asks Discord for two permissions:</p>
      <ul>
        <li><strong>identify</strong>, to read the account details listed above.</li>
        <li>
          <strong>guilds.join</strong>, to add you to the ATLAcord appeal server when you submit an
          appeal, so the staff team can talk to you about it. It is only used for this purpose
        </li>
      </ul>
      <p>We do not have access to your messages or any other details associated with your Discord account.</p>

      <h2>Cookies</h2>
      <p>
        After you log in, we set one cookie, <code>appeal_token</code>, which keeps you logged in. It is deleted
        when you log out. <strong>This is not your Discord user token</strong>. We don't use advertising or tracking cookies.
      </p>

      <h2>How your appeal is handled</h2>
      <p>
        Submitting an appeal adds you to the appeal server (Lake Laogai) and opens a thread with Hawky, the community modmail bot. Your answers, and
        any messages you exchange with staff in that thread, are stored by the bot and can be read
        by staff members. This information is only user to review your appeal and to talk with you about it. It is confidential and will not be visible to anyone outside the staff team.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>You can log out at any time, which deletes the login cookie from your browser.</li>
        <li>
          You can remove the site's access to your Discord account at any time from <strong>User Settings → Authorized
          Apps</strong> in Discord.
        </li>
        <li>
          If you have any further questions or concerns, please email the admin team at admin@atlacord.com.
        </li>
      </ul>
    </article>
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
  text-align: center;
}
.policy {
  background: var(--bg-dark-2);
  border-radius: var(--roundness);
  font-family: var(--thread-text);
  line-height: 1.55;
  margin: 0 auto;
  max-width: 40rem;
  padding: 1.5rem;
}
.policy > :first-child {
  margin-top: 0;
}
.policy > :last-child {
  margin-bottom: 0;
}
h2 {
  font-family: var(--sans-serif);
  font-size: 1.125rem;
  margin: 1.75rem 0 .5rem;
}
ul {
  padding-left: 1.25rem;
}
li + li {
  margin-top: .5rem;
}
code {
  background: var(--bg-dark-3);
  border-radius: .25rem;
  font-family: var(--mono);
  font-size: .875em;
  padding: .1em .35em;
}
.todo {
  background: color-mix(in srgb, var(--red), transparent 85%);
  border-radius: var(--roundness);
  color: var(--red);
  padding: .5rem .75rem;
}

@media (max-width: 767px) {
  .page {
    padding-left: .75rem;
    padding-right: .75rem;
  }
  .page-title {
    font-size: 1.75rem;
  }
  .policy {
    padding: 1.25rem;
  }
}
</style>
