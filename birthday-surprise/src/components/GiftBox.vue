<script setup>
import { ref, inject, onBeforeUnmount } from 'vue'

const emit = defineEmits(['revealed'])
const fx = inject('fx', ref(null))
const stage = ref('idle') // idle -> untie -> open -> done
const timers = []

function unwrap() {
  if (stage.value !== 'idle') return
  stage.value = 'untie'
  timers.push(setTimeout(() => {
    stage.value = 'open'
    fx.value?.confetti(170)
    fx.value?.heartsBurst(innerWidth / 2, innerHeight * 0.42, 34)
    fx.value?.burst(innerWidth / 2, innerHeight * 0.3, 80)
  }, 1100))
  timers.push(setTimeout(() => { stage.value = 'done'; emit('revealed') }, 2600))
}
function reset() { timers.forEach(clearTimeout); stage.value = 'idle' }
onBeforeUnmount(() => timers.forEach(clearTimeout))
defineExpose({ reset })

const risers = Array.from({ length: 11 }, (_, i) => ({ 
  id: i, 
  x: (i - 5) * 18, 
  d: 0.1 * i, 
  s: 14 + (i % 3) * 8 
}))
</script>

<template>
  <div class="gift">
    <div class="scene" :class="stage" @click="unwrap">
      <div class="glow" />
      
      <!-- KONTEN DALAM KADO: BONEKA BERUANG LUCU -->
      <div class="bear-container">
        <div class="bear-face">
          <div class="ear left"></div>
          <div class="ear right"></div>
          <div class="eye left"></div>
          <div class="eye right"></div>
          <div class="blush left"></div>
          <div class="blush right"></div>
          <div class="snout">
            <div class="nose"></div>
            <div class="smile"></div>
          </div>
        </div>
      </div>

      <div class="rig">
        <div class="body">
          <div class="f front" /><div class="f back" /><div class="f left" /><div class="f right" />
          <div class="f bottom" /><div class="f inside" />
        </div>
        <div class="lid">
          <div class="f front" /><div class="f back" /><div class="f left" /><div class="f right" />
          <div class="f top" />
          <div class="bow">
            <i class="loop l1" /><i class="loop l2" /><i class="loop l3" /><i class="loop l4" /><i class="knot" />
          </div>
        </div>
      </div>
      <template v-if="stage === 'open' || stage === 'done'">
        <span v-for="r in risers" :key="r.id" class="rise" :style="{ '--x': r.x + 'px', animationDelay: r.d + 's', fontSize: r.s + 'px' }">🧸</span>
      </template>
    </div>
    <button v-if="stage === 'idle'" class="btn" @click="unwrap"> Sentuh untuk Buka Kado </button>
    <p v-else-if="stage === 'untie'" class="status">Sabarlah, pitanya lagi dibuka gemesin... 🎀</p>
    <p v-else class="status">Horeeee! Ada beruang imut buat kamu! 🧸</p>
  </div>
</template>

<style scoped>
.gift { display: grid; justify-items: center; gap: 22px; }
.scene {
  --s: 150px; --h: 112px; --lh: 36px; --ls: 162px;
  position: relative; width: 300px; height: 320px; perspective: 900px; cursor: pointer;
}
.rig { position: absolute; inset: 0; transform-style: preserve-3d; animation: sway 4s ease-in-out infinite alternate; }
@keyframes sway {
  from { transform: translateY(20px) rotateX(-22deg) rotateY(-20deg); }
  to { transform: translateY(20px) rotateX(-18deg) rotateY(20deg); }
}
.untie .rig { animation: wobble .25s ease-in-out infinite alternate; }
@keyframes wobble { from { transform: translateY(20px) rotateX(-20deg) rotateY(-5deg) rotateZ(-3deg); } to { transform: translateY(20px) rotateX(-20deg) rotateY(5deg) rotateZ(3deg); } }
.open .rig, .done .rig { animation: none; transform: translateY(30px) rotateX(-36deg) rotateY(-12deg); transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1); }

.f { position: absolute; }
.body, .lid { position: absolute; transform-style: preserve-3d; }
.body { left: calc(50% - var(--s) / 2); top: calc(50% - var(--h) / 2); width: var(--s); height: var(--h); }
.body .front, .body .back, .body .left, .body .right { width: var(--s); height: var(--h); }
.body .front { transform: translateZ(calc(var(--s) / 2)); background: linear-gradient(135deg, #ff7eb3, #ff4785); }
.body .back { transform: rotateY(180deg) translateZ(calc(var(--s) / 2)); background: #d63372; }
.body .right { transform: rotateY(90deg) translateZ(calc(var(--s) / 2)); background: linear-gradient(135deg, #ff6b9d, #c92a6a); }
.body .left { transform: rotateY(-90deg) translateZ(calc(var(--s) / 2)); background: linear-gradient(135deg, #ff8dae, #e03175); }
.body .bottom, .body .inside { width: var(--s); height: var(--s); top: calc((var(--h) - var(--s)) / 2); }
.body .bottom { transform: rotateX(-90deg) translateZ(calc(var(--h) / 2)); background: #a61e4d; }
.body .inside { transform: rotateX(90deg) translateZ(calc(var(--h) / 2 - 8px)); background: radial-gradient(circle, #fff0f6 0%, #ffdeeb 50%, #faa2c1 100%); }

.lid {
  left: calc(50% - var(--ls) / 2); top: calc(50% - var(--lh) / 2); width: var(--ls); height: var(--lh);
  transform: translateY(calc(-1 * (var(--h) + var(--lh)) / 2));
  transition: transform 1.2s cubic-bezier(.2, .8, .2, 1), opacity .6s ease .7s;
}
.lid .front, .lid .back, .lid .left, .lid .right { width: var(--ls); height: var(--lh); }
.lid .front { transform: translateZ(calc(var(--ls) / 2)); background: linear-gradient(135deg, #ff91be, #ff5c9d); }
.lid .back { transform: rotateY(180deg) translateZ(calc(var(--ls) / 2)); background: #b82c65; }
.lid .right { transform: rotateY(90deg) translateZ(calc(var(--ls) / 2)); background: #f06595; }
.lid .left { transform: rotateY(-90deg) translateZ(calc(var(--ls) / 2)); background: #e64980; }
.lid .top { width: var(--ls); height: var(--ls); top: calc((var(--lh) - var(--ls)) / 2); transform: rotateX(90deg) translateZ(calc(var(--lh) / 2)); background: linear-gradient(135deg, #ffa8c5, #ff6b9d); }
.open .lid, .done .lid { transform: translateY(calc(-1 * (var(--h) + var(--lh)) / 2 - 210px)) rotateZ(25deg) rotateX(20deg); opacity: 0; }

/* BONEKA BERUANG DI DALAM KADO (CSS ART) */
.bear-container {
  position: absolute;
  left: 50%;
  top: 52%;
  width: 90px;
  height: 90px;
  margin-left: -45px;
  margin-top: -45px;
  transform: translateY(20px) scale(0.5);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 2;
}
.open .bear-container, .done .bear-container {
  transform: translateY(-40px) scale(1.1);
  opacity: 1;
}
.bear-face {
  position: relative;
  width: 90px;
  height: 80px;
  background: #d4a373; /* Warna cokelat beruang madu yang hangat */
  border-radius: 45px 45px 40px 40px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
.ear {
  position: absolute;
  width: 32px;
  height: 32px;
  background: #d4a373;
  border-radius: 50%;
  top: -8px;
}
.ear.left { left: -4px; }
.ear.right { right: -4px; }
.ear::after {
  content: '';
  position: absolute;
  inset: 6px;
  background: #fcd5ce;
  border-radius: 50%;
}
.eye {
  position: absolute;
  width: 10px;
  height: 12px;
  background: #2b2d42;
  border-radius: 50%;
  top: 26px;
}
.eye.left { left: 24px; }
.eye.right { right: 24px; }
.eye::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 3px;
  background: #fff;
  border-radius: 50%;
  top: 2px;
  left: 2px;
}
.blush {
  position: absolute;
  width: 14px;
  height: 8px;
  background: #ff8fa3;
  border-radius: 50%;
  top: 36px;
  opacity: 0.7;
}
.blush.left { left: 14px; }
.blush.right { right: 14px; }
.snout {
  position: absolute;
  width: 34px;
  height: 24px;
  background: #faedcd;
  border-radius: 50%;
  left: 50%;
  top: 38px;
  transform: translateX(-50%);
}
.nose {
  position: absolute;
  width: 12px;
  height: 8px;
  background: #2b2d42;
  border-radius: 6px;
  left: 50%;
  top: 4px;
  transform: translateX(-50%);
}
.smile {
  position: absolute;
  width: 16px;
  height: 8px;
  border-bottom: 3px solid #2b2d42;
  border-radius: 0 0 10px 10px;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
}

/* Pita Kado */
.f::after, .top::before { content: ''; position: absolute; background: linear-gradient(90deg, #b197fc, #e5dbff, #b197fc); transition: opacity .8s; }
.front::after, .back::after, .left::after, .right::after { left: 50%; width: 26px; margin-left: -13px; top: 0; bottom: 0; }
.top::after { left: 50%; width: 26px; margin-left: -13px; top: 0; bottom: 0; }
.top::before { top: 50%; height: 26px; margin-top: -13px; left: 0; right: 0; background: linear-gradient(#b197fc, #e5dbff, #b197fc); }
.bottom::after, .inside::after { display: none; }
.untie .f::after, .untie .top::before, .open .f::after, .open .top::before, .done .f::after, .done .top::before { opacity: 0; }

.bow { position: absolute; left: 50%; top: 50%; transform-style: preserve-3d; transform: translateY(calc(-1 * var(--lh) / 2 - 4px)); transition: transform 1s ease, opacity .8s ease; }
.untie .bow, .open .bow, .done .bow { transform: translateY(-130px) rotateZ(50deg) scale(.5); opacity: 0; }
.loop { position: absolute; left: -26px; top: -34px; width: 52px; height: 34px; border: 9px solid #9775fa; border-radius: 50%; transform-origin: 50% 100%; }
.l1 { transform: rotateZ(-30deg) translateX(-14px); } .l2 { transform: rotateZ(30deg) translateX(14px); }
.l3 { transform: rotateY(90deg) rotateZ(-30deg) translateX(-14px); } .l4 { transform: rotateY(90deg) rotateZ(30deg) translateX(14px); }
.knot { position: absolute; left: -12px; top: -16px; width: 24px; height: 24px; border-radius: 50%; background: #845ef7; }

.glow {
  position: absolute; left: 50%; top: 42%; width: 340px; height: 340px; margin: -170px 0 0 -170px; border-radius: 50%; opacity: 0; transform: scale(.2);
  background: radial-gradient(circle, rgba(255, 230, 242, .95), rgba(255, 107, 157, .5) 40%, transparent 70%); transition: all 1.2s ease; pointer-events: none;
}
.open .glow, .done .glow { opacity: .9; transform: scale(1); }
.rise { position: absolute; left: 50%; top: 45%; color: var(--pink); text-shadow: 0 0 12px var(--pink); opacity: 0; animation: up 2.4s ease-out infinite; pointer-events: none; }
@keyframes up { 0% { transform: translate(var(--x), 0); opacity: 0; } 20% { opacity: 1; } 100% { transform: translate(calc(var(--x) * 1.8), -210px); opacity: 0; } }
.status { margin: 0; font-family: var(--font-hand); font-size: 1.6rem; color: #d63372; text-align: center; }
.btn {
  background: linear-gradient(135deg, #ff6b9d, #e03175);
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 1.1rem;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(224, 49, 117, 0.3);
  transition: transform 0.2s;
}
.btn:hover { transform: scale(1.05); }
@media (max-width: 380px) { .scene { transform: scale(.85); margin: -24px 0; } }
</style>