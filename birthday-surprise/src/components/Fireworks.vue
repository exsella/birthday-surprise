<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cv = ref(null)
const colors = ['#FF4F93', '#FFB6D5', '#F52F70', '#FFF8FC', '#C58BFF']
const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const scale = reduce ? 0.25 : 1
let ctx, w, h, dpr, raf = 0
let parts = []
const timers = []

const rand = (a, b) => a + Math.random() * (b - a)
const pick = () => colors[(Math.random() * colors.length) | 0]

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = window.innerWidth; h = window.innerHeight
  cv.value.width = w * dpr; cv.value.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function loop() {
  ctx.clearRect(0, 0, w, h)
  parts = parts.filter((p) => p.life > 0 && p.y < h + 40)
  for (const p of parts) {
    p.life--
    p.x += p.vx; p.y += p.vy
    p.vy += p.g; p.vx *= p.drag; p.vy *= p.drag
    p.rot += p.vr
    const a = Math.min(1, p.life / (p.max * 0.4))
    ctx.globalAlpha = Math.max(a, 0)
    ctx.fillStyle = p.color
    if (p.type === 'spark') {
      ctx.shadowColor = p.color; ctx.shadowBlur = 8
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 6.283); ctx.fill()
      ctx.shadowBlur = 0
    } else if (p.type === 'conf') {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot)
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2); ctx.restore()
    } else {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot)
      ctx.font = `${p.size}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.shadowColor = p.color; ctx.shadowBlur = 10
      ctx.fillText('♥', 0, 0); ctx.restore()
    }
  }
  ctx.globalAlpha = 1
  raf = parts.length ? requestAnimationFrame(loop) : 0
  if (!parts.length) ctx.clearRect(0, 0, w, h)
}
const start = () => { if (!raf) raf = requestAnimationFrame(loop) }

function burst(x = rand(w * 0.2, w * 0.8), y = rand(h * 0.15, h * 0.5), n = 70) {
  const color = pick(), color2 = pick()
  n = Math.round(n * scale)
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * 6.283 + rand(-0.05, 0.05)
    const sp = rand(1.5, 5.5)
    parts.push({ type: 'spark', x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, g: 0.045, drag: 0.985,
      life: rand(55, 90), max: 90, size: rand(1.4, 2.8), color: i % 3 ? color : color2, rot: 0, vr: 0 })
  }
  start()
}

function confetti(n = 120) {
  n = Math.round(n * scale)
  for (let i = 0; i < n; i++) {
    parts.push({ type: 'conf', x: rand(0, w), y: rand(-60, -10), vx: rand(-1.5, 1.5), vy: rand(1.5, 4.5), g: 0.05, drag: 0.995,
      life: rand(160, 260), max: 260, size: rand(7, 13), color: pick(), rot: rand(0, 6), vr: rand(-0.2, 0.2) })
  }
  start()
}

function heartsBurst(x = w / 2, y = h / 2, n = 26) {
  n = Math.round(n * scale)
  for (let i = 0; i < n; i++) {
    const ang = rand(0, 6.283), sp = rand(2, 7)
    parts.push({ type: 'heart', x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 2, g: 0.07, drag: 0.98,
      life: rand(70, 120), max: 120, size: rand(14, 30), color: pick(), rot: rand(-0.5, 0.5), vr: rand(-0.05, 0.05) })
  }
  start()
}

function fireworksShow(count = 6, gap = 520) {
  for (let i = 0; i < count; i++) timers.push(setTimeout(() => burst(), i * gap))
}

onMounted(() => {
  ctx = cv.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(raf); timers.forEach(clearTimeout)
})

defineExpose({ burst, confetti, heartsBurst, fireworksShow })
</script>

<template>
  <canvas ref="cv" class="fx" aria-hidden="true" />
</template>

<style scoped>
.fx { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 50; pointer-events: none; }
</style>
