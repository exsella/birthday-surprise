<script setup>
import { ref, nextTick } from 'vue'
import { birthday } from '../data/birthday'
import { useTyping } from '../composables/useTyping'
import Envelope from '../components/Envelope.vue'
import FloatingHearts from '../components/FloatingHearts.vue'

const stage = ref('closed') // closed | reading
const typing = useTyping()
const envKey = ref(0)
const body = birthday.letter.body

function onOpened() {
  stage.value = 'reading'
  nextTick(() => typing.start(body, 26))
}
function readAgain() {
  typing.stop()
  stage.value = 'closed'
  envKey.value++ // membuat amplop baru dalam keadaan tertutup
}
const skip = () => { if (!typing.done.value) typing.finish(body) }
</script>

<template>
  <main class="page">
    <FloatingHearts :count="12" :symbols="['♡', '♥']" :fixed="false" />
    <h1 class="title">{{ birthday.letter.title }}</h1>
    <p class="subtitle">{{ birthday.letter.subtitle }}</p>

    <!-- KUCING CHIBI SUPER LUCU YANG MENUNJUK SURAT -->
    <div v-if="stage === 'closed'" class="cute-cat-wrapper">
      <div class="speech-bubble">
        <span>Buka suratnya dong, Kaka! 🐾</span>
        <div class="bubble-tail"></div>
      </div>
      
      <div class="chibi-cat">
        <!-- Telinga Kucing -->
        <div class="ear left"></div>
        <div class="ear right"></div>
        
        <!-- Kepala Kucing -->
        <div class="head">
          <div class="eye left">
            <div class="sparkle-eye"></div>
          </div>
          <div class="eye right">
            <div class="sparkle-eye"></div>
          </div>
          <div class="blush left"></div>
          <div class="blush right"></div>
          <div class="nose"></div>
          <div class="mouth"></div>
        </div>

        <!-- Tangan/Cakar yang Menunjuk Semangat -->
        <div class="pointing-paw"></div>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <Envelope v-if="stage === 'closed'" :key="envKey" @opened="onOpened" />
      <article v-else class="paper" @click="skip" aria-live="polite">
        <p class="text">{{ typing.text.value }}<span v-if="!typing.done.value" class="caret" /></p>
      </article>
    </transition>

    <transition name="fade">
      <div v-if="stage === 'reading' && typing.done.value" class="actions">
        <button class="btn btn-ghost" @click="readAgain">Read Again</button>
        <router-link class="btn btn-ghost" to="/memories">Back to Memories</router-link>
        <router-link class="btn" to="/gift">Next Surprise</router-link>
      </div>
      <p v-else-if="stage === 'reading'" class="skip">Ketuk surat untuk melihat semuanya</p>
    </transition>
  </main>
</template>

<style scoped>
/* --- KELOMPOK KUCING CHIBI SUPER GEMAS --- */
.cute-cat-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
  z-index: 3;
  animation: floatCat 2.5s ease-in-out infinite alternate;
}

@keyframes floatCat {
  0% { transform: translateY(0px) rotate(-1deg); }
  100% { transform: translateY(-8px) rotate(1deg); }
}

/* Karakter Utama Kucing (Pure CSS Art) */
.chibi-cat {
  position: relative;
  width: 64px;
  height: 56px;
}

.head {
  position: absolute;
  width: 60px;
  height: 50px;
  background: #ffedd8; /* Warna krem kuning gading hangat */
  border: 3px solid #4a1230;
  border-radius: 50% 50% 44% 44%;
  bottom: 0;
  left: 2px;
  box-shadow: 0 4px 10px rgba(245, 47, 112, 0.2);
}

.ear {
  position: absolute;
  width: 18px;
  height: 20px;
  background: #ffedd8;
  border: 3px solid #4a1230;
  top: 2px;
  border-radius: 6px 6px 0 0;
}
.ear.left { left: 4px; transform: rotate(-15deg); }
.ear.right { right: 4px; transform: rotate(15deg); }

.ear::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 10px;
  background: #ffb3c6; /* Dalam telinga pink */
  border-radius: 4px 4px 0 0;
  top: 3px;
  left: 2px;
}

.eye {
  position: absolute;
  width: 11px;
  height: 14px;
  background: #4a1230;
  border-radius: 50%;
  top: 16px;
  animation: blinkCat 4s infinite;
}
.eye.left { left: 13px; }
.eye.right { right: 13px; }

/* Mata Berbinar Anime */
.sparkle-eye {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  top: 2px;
  left: 2px;
}

@keyframes blinkCat {
  0%, 96%, 100% { transform: scaleY(1); }
  98% { transform: scaleY(0.1); }
}

.blush {
  position: absolute;
  width: 12px;
  height: 7px;
  background: #ff758f;
  border-radius: 50%;
  top: 26px;
  opacity: 0.7;
}
.blush.left { left: 7px; }
.blush.right { right: 7px; }

.nose {
  position: absolute;
  width: 6px;
  height: 4px;
  background: #4a1230;
  border-radius: 50%;
  left: 50%;
  top: 25px;
  transform: translateX(-50%);
}

.mouth {
  position: absolute;
  width: 12px;
  height: 6px;
  border-bottom: 3px solid #4a1230;
  border-radius: 0 0 8px 8px;
  left: 50%;
  top: 27px;
  transform: translateX(-50%);
}

/* Cakar Mengarah ke Bawah (Menunjuk Amplop) */
.pointing-paw {
  position: absolute;
  width: 14px;
  height: 14px;
  background: #ffedd8;
  border: 3px solid #4a1230;
  border-radius: 50%;
  bottom: -4px;
  right: 6px;
  animation: tapPaw 0.6s ease-in-out infinite alternate;
}

@keyframes tapPaw {
  from { transform: translateY(0) scale(1); }
  to { transform: translateY(5px) scale(1.1); }
}

/* Balon Kata Lucu */
.speech-bubble {
  background: #ffffff;
  color: #d81b60;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 0.88rem;
  font-family: var(--font-hand);
  font-weight: 700;
  border: 2.5px solid #ff8fa3;
  box-shadow: 0 4px 15px rgba(245, 47, 112, 0.2);
  position: relative;
  animation: pulseBubble 1.8s ease-in-out infinite;
}

.bubble-tail {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid #ff8fa3;
}

@keyframes pulseBubble {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}

/* --- KODE KERTAS & SURAT --- */
.paper {
  width: min(100%, 520px); min-height: 360px; padding: 34px 28px; text-align: left; position: relative; z-index: 1; cursor: pointer;
  color: #4a1230; border-radius: 6px 6px 18px 18px;
  background: repeating-linear-gradient(transparent 0 35px, rgba(245, 47, 112, .14) 35px 36px), #fff8fc;
  box-shadow: 0 20px 60px rgba(0, 0, 0, .6), 0 0 50px rgba(255, 79, 147, .35);
  transform: rotate(-.6deg);
}
.text { margin: 0; white-space: pre-wrap; font-family: var(--font-hand); font-weight: 500; font-size: 1.55rem; line-height: 36px; }
.caret { display: inline-block; width: 2px; height: 1.1em; background: var(--rose); vertical-align: -3px; animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }
.skip { margin: 0; color: var(--soft); font-size: .9rem; }
</style>