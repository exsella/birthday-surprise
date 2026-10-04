<script setup>
const props = defineProps({
  count: { type: Number, default: 16 },
  symbols: { type: Array, default: () => ['♥', '♡', '✦', '♥'] },
  fixed: { type: Boolean, default: true },
})
const colors = ['#FF4F93', '#FFB6D5', '#F52F70', '#C58BFF']
const items = Array.from({ length: props.count }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 12 + Math.random() * 28,
  dur: 10 + Math.random() * 13,
  delay: -Math.random() * 22,
  sym: props.symbols[i % props.symbols.length],
  op: 0.25 + Math.random() * 0.45,
  sway: 12 + Math.random() * 34,
  color: colors[i % colors.length],
}))
</script>

<template>
  <div class="hearts" :class="{ local: !fixed }" aria-hidden="true">
    <span v-for="h in items" :key="h.id" class="h"
      :style="{ left: h.left + '%', fontSize: h.size + 'px', animationDuration: h.dur + 's', animationDelay: h.delay + 's', color: h.color, '--op': h.op, '--sway': h.sway + 'px' }">{{ h.sym }}</span>
  </div>
</template>

<style scoped>
.hearts { position: fixed; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; }
.hearts.local { position: absolute; z-index: 0; }
.h { position: absolute; bottom: -40px; opacity: 0; text-shadow: 0 0 12px currentColor; animation: rise linear infinite; will-change: transform, opacity; }
@keyframes rise {
  0% { transform: translate3d(0, 0, 0) rotate(-8deg); opacity: 0; }
  10% { opacity: var(--op); }
  50% { transform: translate3d(var(--sway), -55vh, 0) rotate(8deg); }
  100% { transform: translate3d(calc(var(--sway) * -1), -115vh, 0) rotate(-8deg); opacity: 0; }
}
</style>
