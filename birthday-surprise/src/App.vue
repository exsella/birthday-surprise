<script setup>
import { ref, provide, computed } from 'vue'
import { useRoute } from 'vue-router'
import FloatingHearts from './components/FloatingHearts.vue'
import Fireworks from './components/Fireworks.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import ProgressNavigation from './components/ProgressNavigation.vue'

const route = useRoute()
const fx = ref(null)
provide('fx', fx) // views memanggil fx.value.confetti(), .burst(), dll

const showChrome = computed(() => route.meta.step >= 1)
const stars = Array.from({ length: 36 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  s: 2 + Math.random() * 3, d: 2 + Math.random() * 4, delay: -Math.random() * 5,
}))
</script>

<template>
  <div class="bg" aria-hidden="true">
    <div class="blob b1" /><div class="blob b2" /><div class="blob b3" />
    <span v-for="s in stars" :key="s.id" class="star"
      :style="{ left: s.x + '%', top: s.y + '%', width: s.s + 'px', height: s.s + 'px', animationDuration: s.d + 's', animationDelay: s.delay + 's' }" />
  </div>
  <FloatingHearts :count="14" />
  <Fireworks ref="fx" />
  <MusicPlayer v-if="showChrome" />
  <ProgressNavigation v-if="showChrome" />

  <router-view v-slot="{ Component, route: r }">
    <transition name="page" mode="out-in">
      <component :is="Component" :key="r.path" />
    </transition>
  </router-view>
</template>

<style>
.bg {
  position: fixed; inset: 0; z-index: 0; overflow: hidden;
  background:
    radial-gradient(120% 80% at 50% 0%, #31091D 0%, transparent 60%),
    radial-gradient(100% 70% at 50% 120%, #4a0f2c 0%, transparent 60%),
    #10070D;
}
.blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: .5; will-change: transform; }
.b1 { width: 60vmax; height: 60vmax; left: -25vmax; top: -20vmax; background: #FF4F93; opacity: .22; animation: drift 18s ease-in-out infinite alternate; }
.b2 { width: 50vmax; height: 50vmax; right: -22vmax; bottom: -18vmax; background: #F52F70; opacity: .24; animation: drift 22s ease-in-out infinite alternate-reverse; }
.b3 { width: 34vmax; height: 34vmax; right: 10vmax; top: 10vmax; background: #C58BFF; opacity: .12; animation: drift 26s ease-in-out infinite alternate; }
@keyframes drift { to { transform: translate3d(6vmax, 4vmax, 0) scale(1.12); } }
.star { position: absolute; border-radius: 50%; background: #FFF8FC; box-shadow: 0 0 8px #FFB6D5; opacity: .2; animation: twinkle ease-in-out infinite; }
@keyframes twinkle { 0%, 100% { opacity: .1; transform: scale(.7); } 50% { opacity: .95; transform: scale(1.3); } }
</style>
