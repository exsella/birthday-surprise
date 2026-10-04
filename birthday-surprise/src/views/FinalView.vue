<script setup>
import { ref, computed, inject, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { RotateCcw, Wind } from 'lucide-vue-next'
import { birthday } from '../data/birthday'
import { resetJourney } from '../state'

const fx = inject('fx')
const router = useRouter()
const candles = [116, 138, 160, 182]
const lit = ref(candles.map(() => true))
const celebrated = ref(false)
const timers = []
const allOut = computed(() => lit.value.every((l) => !l))

function celebrate() {
  if (celebrated.value) return
  celebrated.value = true
  fx.value?.confetti(220)
  fx.value?.fireworksShow(9, 450)
  timers.push(setTimeout(() => fx.value?.heartsBurst(innerWidth / 2, innerHeight * 0.4, 40), 600))
  timers.push(setTimeout(() => fx.value?.confetti(140), 2600))
}
function snuff(i) {
  if (!lit.value[i]) return
  lit.value[i] = false
  if (allOut.value) timers.push(setTimeout(celebrate, 500))
}
function blowAll() {
  lit.value.forEach((l, i) => l && timers.push(setTimeout(() => snuff(i), i * 140)))
}
function replay() {
  resetJourney(2)
  router.push('/birthday')
}
onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
  <main class="page">
    <transition name="fade" mode="out-in">
      <p v-if="!celebrated" key="w" class="subtitle wish">Make a wish, then blow out the candles ♡</p>
      <h1 v-else key="t" class="title big">{{ birthday.finalTitle }}</h1>
    </transition>

    <svg class="cake" viewBox="0 0 300 290" role="img" aria-label="Kue ulang tahun dengan lilin">
      <defs>
        <radialGradient id="fl" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#fff6c8" /><stop offset=".5" stop-color="#ffb347" /><stop offset="1" stop-color="#ff4f93" /></radialGradient>
        <radialGradient id="gl"><stop offset="0" stop-color="#ffd27a" stop-opacity=".55" /><stop offset="1" stop-color="#ffd27a" stop-opacity="0" /></radialGradient>
      </defs>
      <ellipse cx="150" cy="268" rx="138" ry="15" fill="#FFB6D5" opacity=".25" />
      <rect x="40" y="200" width="220" height="66" rx="14" fill="#F52F70" />
      <path d="M42 214 q18 22 36 0 q18 22 36 0 q18 22 36 0 q18 22 36 0 q18 22 36 0 q18 22 36 0 v-14 h-216z" fill="#FFF8FC" />
      <rect x="70" y="145" width="160" height="58" rx="12" fill="#FF4F93" />
      <path d="M72 158 q13 18 26 0 q13 18 26 0 q13 18 26 0 q13 18 26 0 q13 18 26 0 q13 18 26 0 v-13 h-156z" fill="#FFF8FC" />
      <rect x="100" y="95" width="100" height="50" rx="12" fill="#C58BFF" />
      <path d="M102 106 q12 16 24 0 q12 16 24 0 q12 16 24 0 q12 16 24 0 v-11 h-96z" fill="#FFF8FC" />
      <g fill="#FFF8FC" font-size="16" text-anchor="middle"><text x="95" y="244">♥</text><text x="150" y="250">♥</text><text x="205" y="244">♥</text><text x="112" y="186">♥</text><text x="188" y="186">♥</text></g>
      <g v-for="(cx, i) in candles" :key="cx" class="candle" role="button" tabindex="0" :aria-label="`Tiup lilin ${i + 1}`" @click="snuff(i)" @keydown.enter="snuff(i)">
        <rect :x="cx - 4" y="62" width="8" height="34" rx="2" :fill="i % 2 ? '#FFB6D5' : '#FFF8FC'" />
        <circle :cx="cx" cy="52" r="20" fill="url(#gl)" class="halo" :class="{ off: !lit[i] }" />
        <g :transform="`translate(${cx} 62)`">
          <path d="M0 0 C-7 -9 -4 -19 0 -27 C4 -19 7 -9 0 0Z" fill="url(#fl)" class="flame" :class="{ off: !lit[i] }" />
        </g>
        <circle v-if="!lit[i]" :cx="cx" cy="58" r="3" class="smoke" />
      </g>
    </svg>

    <transition name="fade" mode="out-in">
      <div v-if="!celebrated" key="b" class="actions">
        <button class="btn" @click="blowAll"><Wind :size="20" />Blow the Candles</button>
      </div>
      <div v-else key="m" class="end">
        <p class="lead msg">{{ birthday.finalMessage }}</p>
        <div class="actions">
          <button class="btn" @click="replay"><RotateCcw :size="18" />Replay Our Story</button>
          <button class="btn btn-ghost" @click="fx?.fireworksShow(6, 450)">More Fireworks</button>
        </div>
      </div>
    </transition>
  </main>
</template>

<style scoped>
.wish { font-size: 1.5rem; }
.big { font-size: clamp(2.3rem, 9vw, 4.4rem); max-width: 14ch; }
.cake { width: min(88vw, 340px); filter: drop-shadow(0 0 28px rgba(255, 79, 147, .45)); overflow: visible; }
.candle { cursor: pointer; }
.flame { transform-origin: 0 0; transition: opacity .35s, transform .35s; animation: flick .22s ease-in-out infinite alternate; }
.flame.off { opacity: 0; transform: scale(.1); animation: none; }
.halo { transition: opacity .35s; }
.halo.off { opacity: 0; }
@keyframes flick { from { transform: scale(1, 1) rotate(-3deg); } to { transform: scale(.92, 1.08) rotate(3deg); } }
.smoke { fill: rgba(255, 248, 252, .6); animation: puff 1.6s ease-out forwards; }
@keyframes puff { to { transform: translateY(-34px) scale(3); opacity: 0; } }
.end { display: grid; gap: 16px; justify-items: center; }
.msg { font-size: 1.12rem; }
</style>
