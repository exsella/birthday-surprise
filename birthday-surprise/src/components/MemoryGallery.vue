<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { asset } from '../utils'

const props = defineProps({ items: { type: Array, required: true } })
const current = ref(-1)
const dir = ref('next')

const rot = (i) => [-3, 2, -2, 4, -4, 2][i % 6]
function tilt(e) {
  const r = e.currentTarget.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  e.currentTarget.style.setProperty('--ry', px * 12 + 'deg')
  e.currentTarget.style.setProperty('--rx', -py * 12 + 'deg')
}
function untilt(e) { e.currentTarget.style.setProperty('--ry', '0deg'); e.currentTarget.style.setProperty('--rx', '0deg') }
function hideBroken(e) { e.target.style.display = 'none' }

const openAt = (i) => { current.value = i }
const close = () => { current.value = -1 }
function go(step) {
  dir.value = step > 0 ? 'next' : 'prev'
  current.value = (current.value + step + props.items.length) % props.items.length
}
function onKey(e) {
  if (current.value < 0) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') go(1)
  if (e.key === 'ArrowLeft') go(-1)
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="board">
    <button 
      v-for="(m, i) in items" 
      :key="i" 
      class="polaroid" 
      :style="{ '--r': rot(i) + 'deg' }"
      :aria-label="`Buka foto: ${m.caption}`" 
      @click="openAt(i)" 
      @pointermove="tilt" 
      @pointerleave="untilt"
    >
      <span class="tape" />
      <span class="photo"><img :src="asset(m.src)" :alt="m.caption" loading="lazy" @error="hideBroken" /></span>
      <span class="cap">{{ m.caption }}</span>
      <span class="sticker" aria-hidden="true">{{ m.sticker }}</span>
    </button>
  </div>

  <Teleport to="body">
    <transition name="fade">
      <div v-if="current >= 0" class="lightbox" role="dialog" aria-modal="true" :aria-label="items[current].caption" @click.self="close">
        <button class="x" aria-label="Tutup" @click="close"><X :size="26" /></button>
        <button class="nav l" aria-label="Foto sebelumnya" @click="go(-1)"><ChevronLeft :size="30" /></button>
        
        <transition :name="'slide-' + dir" mode="out-in">
          <figure :key="current" class="big">
            <div class="photo">
              <img :src="asset(items[current].src)" :alt="items[current].caption" @error="hideBroken" />
            </div>
            <figcaption>
              <div class="caption-title">{{ items[current].caption }} <span class="lightbox-sticker">{{ items[current].sticker }}</span></div>
              <!-- Menampilkan Deskripsi Panjang di Sini -->
              <p v-if="items[current].description" class="caption-desc">
                {{ items[current].description }}
              </p>
            </figcaption>
          </figure>
        </transition>

        <button class="nav r" aria-label="Foto berikutnya" @click="go(1)"><ChevronRight :size="30" /></button>
        <p class="count">{{ current + 1 }} / {{ items.length }}</p>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.board { 
  display: grid; 
  grid-template-columns: repeat(2, 1fr); 
  gap: 26px 18px; 
  width: min(100%, 980px); 
  padding: 10px 4px; 
}

@media (min-width: 720px) { 
  .board { grid-template-columns: repeat(3, 1fr); gap: 38px 30px; } 
}

.polaroid {
  --rx: 0deg; 
  --ry: 0deg; 
  position: relative; 
  border: 0; 
  padding: 12px 12px 14px; 
  background: #ffffff; 
  color: #3b1026; 
  border-radius: 6px;
  transform: perspective(800px) rotate(var(--r)) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.3s cubic-bezier(.25, .8, .25, 1), box-shadow 0.3s ease; 
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45), 0 0 20px rgba(255, 79, 147, .15);
  cursor: pointer;
}

.polaroid:nth-child(even) { margin-top: 18px; }

.polaroid:hover { 
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55), 0 0 32px rgba(255, 79, 147, .45); 
  z-index: 3; 
}

.photo { 
  display: block; 
  aspect-ratio: 1 / 1.05; 
  overflow: hidden; 
  border-radius: 3px;
  background: linear-gradient(135deg, var(--maroon), var(--pink)); 
}

.photo img { 
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
  display: block; 
}

.cap { 
  display: block; 
  font-family: var(--font-hand); 
  font-weight: 700; 
  font-size: 1.4rem; 
  line-height: 1.2; 
  padding: 10px 2px 2px; 
  text-align: center;
}

.tape { 
  position: absolute; 
  top: -10px; 
  left: 50%; 
  width: 60px; 
  height: 20px; 
  margin-left: -30px; 
  transform: rotate(-3deg); 
  background: rgba(255, 182, 213, 0.65); 
  backdrop-filter: blur(2px); 
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.sticker { 
  position: absolute; 
  right: -8px; 
  bottom: -8px; 
  font-size: 1.8rem; 
  transform: rotate(12deg); 
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.3)); 
}

/* Lightbox Styling */
.lightbox { 
  position: fixed; 
  inset: 0; 
  z-index: 100; 
  background: rgba(16, 7, 13, 0.88); 
  backdrop-filter: blur(12px); 
  display: grid; 
  place-items: center; 
  padding: 20px; 
}

.big { 
  margin: 0; 
  width: min(85vw, 460px); 
  background: #ffffff; 
  color: #3b1026; 
  padding: 16px 16px 18px; 
  border-radius: 8px; 
  box-shadow: 0 0 50px rgba(255, 79, 147, 0.4); 
}

.caption-title { 
  font-family: var(--font-hand); 
  font-weight: 700; 
  font-size: 1.7rem; 
  text-align: center; 
  padding-top: 10px; 
}

.lightbox-sticker {
  font-size: 1.4rem;
  margin-left: 4px;
}

.caption-desc {
  font-family: var(--font-body, sans-serif);
  font-size: 0.95rem;
  line-height: 1.4;
  text-align: center;
  color: #6a324c;
  margin: 8px 0 0 0;
  padding: 0 8px;
}

.big .photo { 
  aspect-ratio: 1 / 1.05; 
  max-height: 52svh; 
  border-radius: 4px;
}

.x, .nav { 
  position: absolute; 
  border: 1px solid rgba(255, 182, 213, 0.5); 
  background: rgba(255, 182, 213, 0.15); 
  color: var(--white); 
  width: 48px; 
  height: 48px; 
  border-radius: 50%; 
  display: grid; 
  place-items: center; 
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.x:hover, .nav:hover {
  background: var(--pink);
  transform: scale(1.08);
}

.x { top: 20px; right: 20px; }
.nav { top: 50%; margin-top: -24px; }
.nav.l { left: 16px; } 
.nav.r { right: 16px; }

.count { 
  position: absolute; 
  bottom: 20px; 
  margin: 0; 
  color: var(--pink); 
  font-weight: 700; 
  font-size: 1.1rem;
  background: rgba(20, 10, 15, 0.6);
  padding: 4px 12px;
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

.slide-next-enter-active, .slide-next-leave-active, .slide-prev-enter-active, .slide-prev-leave-active { 
  transition: opacity 0.25s ease, transform 0.25s ease; 
}
.slide-next-enter-from, .slide-prev-leave-to { 
  opacity: 0; 
  transform: translateX(30px) rotate(2deg); 
}
.slide-next-leave-to, .slide-prev-enter-from { 
  opacity: 0; 
  transform: translateX(-30px) rotate(-2deg); 
}
</style>