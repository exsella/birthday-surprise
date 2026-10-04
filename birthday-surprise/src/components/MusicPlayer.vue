<script setup>
import { ref, watch } from 'vue'
import { Music2, Pause, Play } from 'lucide-vue-next'
import { music, toggleMusic, setVolume } from '../music'

const note = ref(false)
watch(() => music.missing, (m) => {
  if (m) { note.value = true; setTimeout(() => (note.value = false), 4500) }
})
function onVolume(e) { setVolume(Number(e.target.value)) }
</script>

<template>
  <div class="player glass" role="group" aria-label="Pemutar musik">
    <button class="disc" :class="{ spin: music.playing }" @click="toggleMusic"
      :aria-label="music.playing ? 'Jeda musik' : 'Putar musik'">
      <Music2 :size="20" class="note" />
      <component :is="music.playing ? Pause : Play" :size="14" class="state" />
    </button>
    <label class="vol">
      <span class="sr-only">Volume</span>
      <input type="range" min="0" max="1" step="0.05" :value="music.volume" @input="onVolume" />
    </label>
    <transition name="fade">
      <p v-if="note" class="toast">Musik belum ada. Taruh file di public/music/ ♡</p>
    </transition>
  </div>
</template>

<style scoped>
.player {
  position: fixed; top: max(14px, env(safe-area-inset-top)); right: 14px; z-index: 60;
  display: flex; align-items: center; gap: 10px; padding: 6px 14px 6px 6px; border-radius: 999px;
}
.disc {
  position: relative; width: 42px; height: 42px; border-radius: 50%; border: 0; display: grid; place-items: center;
  background: conic-gradient(from 0deg, var(--pink), var(--purple), var(--rose), var(--pink));
  color: #fff; box-shadow: 0 0 16px rgba(255, 79, 147, .6);
}
.disc.spin .note { animation: spin 3s linear infinite; }
.disc .state { position: absolute; right: -2px; bottom: -2px; background: var(--black); border-radius: 50%; padding: 3px; width: 20px; height: 20px; }
@keyframes spin { to { transform: rotate(360deg); } }
.vol input { width: 72px; accent-color: var(--pink); height: 28px; }
.toast {
  position: absolute; top: calc(100% + 10px); right: 0; margin: 0; width: max-content; max-width: 70vw;
  background: rgba(16, 7, 13, .92); border: 1px solid var(--pink); border-radius: 14px; padding: 8px 14px; font-size: .85rem;
}
</style>
