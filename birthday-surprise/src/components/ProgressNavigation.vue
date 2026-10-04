<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { steps } from '../router'
import { state } from '../state'

const route = useRoute()
const current = computed(() => route.meta.step || 1)
const label = computed(() => steps[current.value - 1]?.label)
const pct = computed(() => ((current.value - 1) / (steps.length - 1)) * 100)
</script>

<template>
  <nav class="progress glass" aria-label="Alur kejutan">
    <ol>
      <li v-for="s in steps" :key="s.name">
        <router-link v-if="s.meta.step <= state.reached && s.meta.step > 1" :to="s.path" class="dot"
          :class="{ now: s.meta.step === current, done: s.meta.step < current }"
          :aria-label="`Halaman ${s.meta.step}: ${s.label}`" :aria-current="s.meta.step === current ? 'step' : undefined" />
        <span v-else class="dot" :class="{ now: s.meta.step === current, done: s.meta.step < current }" aria-hidden="true" />
      </li>
    </ol>
    <span class="count">{{ current }}/{{ steps.length }}</span>
    <span class="name">{{ label }}</span>
    <i class="bar" :style="{ width: pct + '%' }" />
  </nav>
</template>

<style scoped>
.progress {
  position: fixed; top: max(14px, env(safe-area-inset-top)); left: 14px; z-index: 60;
  display: flex; align-items: center; gap: 10px; padding: 0 16px; height: 54px; border-radius: 999px; overflow: hidden;
}
ol { display: flex; gap: 7px; list-style: none; margin: 0; padding: 0; }
.dot { display: block; width: 10px; height: 10px; border-radius: 50%; background: rgba(255, 182, 213, .25); transition: all .4s; }
a.dot { cursor: pointer; }
.dot.done { background: var(--soft); }
.dot.now { width: 26px; border-radius: 6px; background: var(--pink); box-shadow: 0 0 12px var(--pink); }
.count { font-weight: 800; font-size: .85rem; color: var(--soft); }
.name { display: none; font-family: var(--font-display); font-style: italic; font-weight: 600; font-size: 1.05rem; }
.bar { position: absolute; left: 0; bottom: 0; height: 3px; background: linear-gradient(90deg, var(--pink), var(--purple)); transition: width .6s ease; }
@media (min-width: 900px) { .name { display: inline; } }
@media (max-width: 380px) { .count { display: none; } }
</style>
