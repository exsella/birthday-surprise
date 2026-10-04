<script setup>
import { ref, inject, onMounted } from 'vue'
import { birthday } from '../data/birthday'
import { useTyping } from '../composables/useTyping'
import StepActions from '../components/StepActions.vue'

const fx = inject('fx')
const typing = useTyping()
const gifted = ref(false)

onMounted(() => {
  setTimeout(() => fx.value?.fireworksShow(4, 600), 500)
  setTimeout(() => typing.start(birthday.greeting, 34), 1200)
})
function openGift(e) {
  gifted.value = true
  const r = e.currentTarget.getBoundingClientRect()
  fx.value?.confetti(130)
  fx.value?.heartsBurst(r.left + r.width / 2, r.top, 26)
}
const balloons = [
  { l: '6%', d: '0s', c: '#FF4F93' }, { l: '84%', d: '-2s', c: '#C58BFF' },
  { l: '16%', d: '-4s', c: '#F52F70' }, { l: '74%', d: '-1s', c: '#FFB6D5' },
]
</script>

<template>
  <main class="page">
    <span v-for="(b, i) in balloons" :key="i" class="balloon" aria-hidden="true" :style="{ left: b.l, animationDelay: b.d, color: b.c }">♥<i /></span>

    <p class="eyebrow">A SPECIAL DAY FOR SOMEONE SPECIAL</p>
    <h1 class="title">Happy Birthday,<br /><span class="name">{{ birthday.name }}</span></h1>

    <div class="age" aria-label="Usia baru">
      <strong>{{ birthday.age }}</strong>
      <small>{{ birthday.specialDate }}</small>
    </div>

    <p class="lead typed" aria-live="polite">{{ typing.text.value }}<span class="caret" /></p>

    <div class="giftzone">
      <transition name="fade">
        <div v-if="gifted" class="pop glass">
          <span class="box" aria-hidden="true">🎁</span>
          <p>{{ birthday.giftTeaser }}</p>
        </div>
      </transition>
      <button v-if="!gifted" class="btn" @click="openGift">Open Your Gift</button>
      <StepActions v-else next="/memories" />
    </div>
  </main>
</template>

<style scoped>
.name { font-style: italic; font-size: 1.12em; background: linear-gradient(90deg, var(--soft), var(--pink), var(--purple)); -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: none; filter: drop-shadow(0 0 16px rgba(255, 79, 147, .6)); }
.age { width: 104px; height: 104px; border-radius: 50%; display: grid; place-content: center; border: 2px dashed var(--soft); box-shadow: 0 0 30px rgba(255, 79, 147, .45), inset 0 0 24px rgba(255, 79, 147, .25); animation: pulse 3s ease-in-out infinite; }
.age strong { font-family: var(--font-display); font-size: 2.9rem; line-height: 1; }
.age small { color: var(--soft); font-size: .78rem; font-weight: 700; }
.typed { min-height: 5.2em; }
.caret { display: inline-block; width: 2px; height: 1em; margin-left: 2px; background: var(--pink); vertical-align: -2px; animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }
.giftzone { display: grid; gap: 16px; justify-items: center; min-height: 140px; }
.pop { display: flex; align-items: center; gap: 14px; padding: 14px 18px; max-width: 380px; text-align: left; }
.pop p { margin: 0; font-size: .98rem; }
.box { font-size: 2.6rem; animation: bounce .8s cubic-bezier(.3, 1.8, .5, 1); }
@keyframes bounce { from { transform: scale(0) rotate(-30deg); } }
.balloon { position: absolute; top: 22%; z-index: 0; font-size: 62px; line-height: 1; text-shadow: 0 0 22px currentColor; animation: bob 6s ease-in-out infinite; pointer-events: none; opacity: .85; }
.balloon i { position: absolute; left: 50%; top: 92%; width: 1px; height: 90px; background: linear-gradient(rgba(255, 182, 213, .7), transparent); }
@keyframes bob { 50% { transform: translateY(-24px) rotate(4deg); } }
@media (max-width: 520px) { .balloon { font-size: 40px; } }
</style>
