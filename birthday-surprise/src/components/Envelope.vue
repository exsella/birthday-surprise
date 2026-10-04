<script setup>
import { ref } from 'vue'

const emit = defineEmits(['opened'])
const open = ref(false)
let t

function openIt() {
  if (open.value) return
  open.value = true
  t = setTimeout(() => emit('opened'), 1900)
}
function reset() { clearTimeout(t); open.value = false }
defineExpose({ reset })
</script>

<template>
  <div class="wrap">
    <button class="env" :class="{ open }" :disabled="open" aria-label="Buka amplop surat" @click="openIt">
      <span class="back" />
      <span class="paper"><i /><i /><i /><i /></span>
      <span class="front" />
      <span class="flap" />
      <span class="seal">♥</span>
    </button>
    <p class="hint" :class="{ gone: open }">Tap the envelope ♡</p>
  </div>
</template>

<style scoped>
.wrap { display: grid; justify-items: center; gap: 22px; }
.env {
  position: relative; width: min(84vw, 340px); aspect-ratio: 3 / 2; border: 0; background: none; padding: 0;
  perspective: 900px; animation: float 4s ease-in-out infinite; filter: drop-shadow(0 20px 40px rgba(245, 47, 112, .35));
}
.env:disabled { animation: none; cursor: default; }
@keyframes float { 50% { transform: translateY(-10px) rotate(-1deg); } }
.env span { position: absolute; display: block; }
.back { inset: 0; background: #c92a6a; border-radius: 12px; }
.paper {
  left: 7%; right: 7%; top: 8%; bottom: 8%; background: var(--white); border-radius: 6px; z-index: 1; padding: 14px;
  transition: transform 1s cubic-bezier(.3, .8, .3, 1) .55s; display: grid; align-content: start; gap: 10px;
}
.paper i { display: block; height: 4px; border-radius: 4px; background: rgba(245, 47, 112, .25); }
.paper i:nth-child(2) { width: 70%; } .paper i:nth-child(4) { width: 45%; }
.front {
  inset: 0; z-index: 2; border-radius: 12px; background: linear-gradient(160deg, #ff6aa8, #e8317a);
  clip-path: polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%);
}
.flap {
  left: 0; right: 0; top: 0; height: 56%; z-index: 3; transform-origin: top center;
  background: linear-gradient(180deg, #ff86b8, #ff4f93); clip-path: polygon(0 0, 100% 0, 50% 100%);
  transition: transform .7s ease, z-index 0s .35s;
}
.seal {
  left: 50%; top: 56%; z-index: 4; width: 54px; height: 54px; margin: -27px 0 0 -27px; border-radius: 50%;
  display: grid; place-items: center; font-size: 26px; color: #fff;
  background: radial-gradient(circle at 35% 30%, #ff9bc4, #b3124f); box-shadow: 0 4px 14px rgba(0, 0, 0, .4);
  animation: pulse 1.6s ease-in-out infinite; transition: opacity .4s, transform .4s;
}
.open .flap { transform: rotateX(180deg); z-index: 0; }
.open .paper { transform: translateY(-48%); }
.open .seal { opacity: 0; transform: scale(1.6); animation: none; }
.hint { margin: 0; color: var(--soft); font-family: var(--font-hand); font-size: 1.7rem; transition: opacity .4s; }
.hint.gone { opacity: 0; }
</style>
