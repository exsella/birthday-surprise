<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { User, KeyRound } from 'lucide-vue-next'
import { birthday } from '../data/birthday'
import { unlock } from '../state'
import { playMusic } from '../music'

const router = useRouter()
const fx = inject('fx')
const user = ref('')
const pass = ref('')
const error = ref('')
const shaking = ref(false)
const opening = ref(false)
const btn = ref(null)

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

function wrong(msg) {
  error.value = msg
  shaking.value = false
  requestAnimationFrame(() => { shaking.value = true })
  setTimeout(() => (shaking.value = false), 500)
}

function submit() {
  if (opening.value) return
  if (!user.value.trim()) return wrong('Tulis namamu dulu ya ♡')
  if (norm(pass.value) !== norm(birthday.password)) return wrong('Kata sandi belum tepat. ' + birthday.passwordHint)
  error.value = ''
  opening.value = true
  const r = btn.value?.getBoundingClientRect()
  fx.value?.heartsBurst(r ? r.left + r.width / 2 : innerWidth / 2, r ? r.top : innerHeight / 2, 30)
  unlock()
  playMusic() // dipicu klik pengguna, jadi boleh diputar
  setTimeout(() => router.push('/birthday'), 1300)
}
</script>

<template>
  <main class="page">
    <div class="lock" :class="{ open: opening }" aria-hidden="true">
      <svg viewBox="0 0 120 130" width="132" height="143">
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF86B8" /><stop offset="1" stop-color="#F52F70" /></linearGradient>
        </defs>
        <path class="shackle" d="M40 58 V38 a20 20 0 0 1 40 0 V58" fill="none" stroke="#FFB6D5" stroke-width="9" stroke-linecap="round" />
        <path d="M60 124 C8 88 6 50 32 46 C46 44 56 52 60 62 C64 52 74 44 88 46 C114 50 112 88 60 124Z" fill="url(#hg)" />
        <circle cx="60" cy="78" r="7" fill="#31091D" /><rect x="57" y="80" width="6" height="16" rx="3" fill="#31091D" />
      </svg>
    </div>

    <h1 class="title">Access Our World</h1>
    <p class="subtitle">A special place, just for you ♡</p>

    <form class="card glass" :class="{ shake: shaking }" novalidate @submit.prevent="submit">
      <label class="field">
        <User :size="20" />
        <input v-model="user" type="text" autocomplete="off" placeholder="Nama kamu" aria-label="Nama atau username" />
      </label>
      <label class="field">
        <KeyRound :size="20" />
        <input v-model="pass" type="text" inputmode="numeric" autocomplete="off" placeholder="Tanggal spesial (DDMM)" aria-label="Kata sandi tanggal spesial" />
      </label>
      <p class="err" role="alert">{{ error }}</p>
      <button ref="btn" type="submit" class="btn">Unlock Surprise</button>
    </form>
  </main>
</template>

<style scoped>
.lock { filter: drop-shadow(0 0 22px rgba(255, 79, 147, .7)); animation: pulse 2.2s ease-in-out infinite; }
.shackle { transition: transform .8s cubic-bezier(.3, 1.6, .5, 1); transform-origin: 80px 58px; }
.lock.open { animation: none; }
.lock.open .shackle { transform: translateY(-14px) rotate(32deg); }
.card { width: min(100%, 380px); padding: 26px 22px; display: grid; gap: 14px; margin-top: 8px; }
.field {
  display: flex; align-items: center; gap: 10px; padding: 0 16px; height: 54px; border-radius: 999px;
  background: rgba(16, 7, 13, .55); border: 1.5px solid rgba(255, 182, 213, .35); color: var(--soft); transition: border-color .25s, box-shadow .25s;
}
.field:focus-within { border-color: var(--pink); box-shadow: 0 0 18px rgba(255, 79, 147, .5); }
.field input { flex: 1; min-width: 0; background: none; border: 0; outline: 0; color: var(--white); font-size: 1rem; }
.field input::placeholder { color: rgba(255, 182, 213, .55); }
.err { min-height: 1.5em; margin: 0; font-size: .92rem; color: #ff9fc0; }
</style>
