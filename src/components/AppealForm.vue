<script setup lang="ts">
import { computed, onUnmounted, reactive, ref } from 'vue'
import { submitAppeal, type Appeal } from '@/api'

const props = defineProps<{ cooldownEndsAt: number | null }>()

const MAX_LENGTH = 1000

const form = reactive<Appeal>({
  banReason: '',
  appealReason: '',
  behaviorChange: ''
})

// Only show validation errors once a field has been touched or a submit was attempted
const touched = reactive({ banReason: false, appealReason: false, behaviorChange: false })
const attempted = ref(false)
const submitting = ref(false)
const submitted = ref(false)
const error = ref<string | null>(null)

const errors = computed(() => ({
  banReason: !form.banReason.trim() ? 'Why were you banned?' : null,
  appealReason: !form.appealReason.trim() ? 'Why do you feel that you should be unbanned?' : null,
  behaviorChange: !form.behaviorChange.trim() ? 'What will you do to avoid being banned in the future?' : null
}))

// Ticks every second while a cooldown is running, so the countdown stays live
const now = ref(Date.now())
const timer = setInterval(() => {
  now.value = Date.now()
  if (!cooldownRemaining.value)
    clearInterval(timer)
}, 1000)
onUnmounted(() => clearInterval(timer))

const cooldownRemaining = computed(() =>
  props.cooldownEndsAt ? Math.max(0, props.cooldownEndsAt - now.value) : 0)

const cooldownText = computed(() => {
  const total = Math.ceil(cooldownRemaining.value / 1000)
  const h = Math.floor(total / 3600)
  const m = Math.floor(total / 60) % 60
  const s = total % 60
  return [h && `${h}h`, (h || m) && `${m}m`, `${s}s`].filter(Boolean).join(' ')
})

const valid = computed(() => Object.values(errors.value).every(e => !e))

function showError (field: keyof Appeal) {
  return (touched[field] || attempted.value) ? errors.value[field] : null
}

async function submit () {
  attempted.value = true
  error.value = null
  if (!valid.value || submitting.value || cooldownRemaining.value)
    return

  submitting.value = true
  try {
    await submitAppeal({
      banReason: form.banReason.trim(),
      appealReason: form.appealReason.trim(),
      behaviorChange: form.behaviorChange.trim()
    })
    submitted.value = true
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    submitting.value = false
  }
}

function reset () {
  form.banReason = form.appealReason = form.behaviorChange = ''
  touched.banReason = touched.appealReason = touched.behaviorChange = false
  attempted.value = false
  submitted.value = false
  error.value = null
}
</script>

<template>
  <div class="card">
    <div class="card-header">Ban Appeal</div>

    <div v-if="submitted" class="card-body success">
      <p class="success-title">Appeal submitted</p>
      <p class="muted">Thanks! You have been added to our appeal server. The moderation team will review your appeal and get back to you through modmail.</p>
    </div>

    <form v-else class="card-body" novalidate @submit.prevent="submit">
      <div class="field">
        <label for="banReason">Why were you banned?</label>
        <textarea id="banReason" v-model="form.banReason" rows="4" :maxlength="MAX_LENGTH"
          :class="{ invalid: showError('banReason') }" @blur="touched.banReason = true"></textarea>
        <div class="field-footer">
          <p v-if="showError('banReason')" class="error">{{ showError('banReason') }}</p>
          <span class="count">{{ form.banReason.length }}/{{ MAX_LENGTH }}</span>
        </div>
      </div>

      <div class="field">
        <label for="appealReason">Why should you be unbanned?</label>
        <textarea id="appealReason" v-model="form.appealReason" rows="6" :maxlength="MAX_LENGTH"
          :class="{ invalid: showError('appealReason') }" @blur="touched.appealReason = true"></textarea>
        <div class="field-footer">
          <p v-if="showError('appealReason')" class="error">{{ showError('appealReason') }}</p>
          <span class="count">{{ form.appealReason.length }}/{{ MAX_LENGTH }}</span>
        </div>
      </div>

      <div class="field">
        <label for="behaviorChange">What will you do to avoid being banned in the future?</label>
        <textarea id="behaviorChange" v-model="form.behaviorChange" rows="6" :maxlength="MAX_LENGTH"
          :class="{ invalid: showError('behaviorChange') }" @blur="touched.behaviorChange = true"></textarea>
        <div class="field-footer">
          <p v-if="showError('behaviorChange')" class="error">{{ showError('behaviorChange') }}</p>
          <span class="count">{{ form.behaviorChange.length }}/{{ MAX_LENGTH }}</span>
        </div>
      </div>

      <p v-if="cooldownRemaining" class="cooldown" role="status">
        You can submit your appeal in <strong>{{ cooldownText }}</strong>. Appeals open 24 hours after your ban.
      </p>

      <p v-if="error" class="submit-error">Couldn't submit your appeal: {{ error }}</p>

      <div class="actions">
        <button class="action-btn primary" type="submit" :disabled="submitting || !!cooldownRemaining">
          {{ submitting ? 'Submitting…' : 'Submit Appeal' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.card {
  background: var(--bg-dark-2);
  border-radius: var(--roundness);
  margin: 0 auto;
  max-width: 40rem;
  overflow: hidden;
  width: 100%;
}
/* Same as the thread table's header row */
.card-header {
  background: var(--primary);
  color: #fff;
  font-weight: 600;
  padding: .5rem var(--roundness);
}
.card-body {
  padding: 1.25rem;
}
.field + .field {
  margin-top: 1.25rem;
}
label {
  display: block;
  font-weight: 600;
  margin-bottom: .375rem;
}
.hint, .muted {
  color: var(--text-muted);
  font-family: var(--thread-text);
  font-size: .875rem;
  margin: 0 0 .5rem;
}
input, textarea {
  background: var(--bg-dark-3);
  border: 1px solid var(--bg-dark-3);
  border-radius: var(--roundness);
  color: var(--text);
  display: block;
  font-family: var(--thread-text);
  font-size: 1rem;
  outline: none;
  padding: .5rem .75rem;
  transition: border-color .3s ease-in-out;
  width: 100%;
}
input {
  font-family: var(--mono);
  height: 2.25rem;
}
textarea {
  resize: vertical;
}
input:hover:not(:focus), textarea:hover:not(:focus) {
  border-color: color-mix(in srgb, var(--bg-dark-3), white 15%);
}
input:focus, textarea:focus {
  border-color: color-mix(in srgb, var(--primary), white 10%);
}
input.invalid, textarea.invalid {
  border-color: var(--red);
}
input::placeholder, textarea::placeholder {
  color: color-mix(in srgb, var(--text-muted), transparent 40%);
}
.field-footer {
  align-items: flex-start;
  display: flex;
  margin-top: .25rem;
}
.error {
  color: var(--red);
  font-size: .875rem;
  margin: .25rem 0 0;
}
.count {
  color: var(--text-muted);
  font-family: var(--mono);
  font-size: .75rem;
  margin-left: auto;
  padding-top: .25rem;
}
.submit-error {
  background: color-mix(in srgb, var(--red), transparent 85%);
  border-radius: var(--roundness);
  color: var(--red);
  font-size: .875rem;
  margin: 1.25rem 0 0;
  padding: .5rem .75rem;
}
.cooldown {
  background: color-mix(in srgb, var(--primary), transparent 85%);
  border-radius: var(--roundness);
  font-size: .875rem;
  margin: 1.25rem 0 0;
  padding: .5rem .75rem;
}
.cooldown strong {
  font-family: var(--mono);
  font-variant-numeric: tabular-nums;
}
.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;
}
.success {
  text-align: center;
}
.success-title {
  color: var(--green);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 .5rem;
}
.mt {
  margin-top: .75rem;
}

@media (max-width: 767px) {
  .card-body { padding: 1rem; }
  .actions .action-btn { width: 100%; height: 2.5rem; }
}
</style>
