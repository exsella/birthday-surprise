<script setup>
import { ref } from 'vue'
import { RotateCcw } from 'lucide-vue-next'
import { birthday } from '../data/birthday'
import GiftBox from '../components/GiftBox.vue'
import StepActions from '../components/StepActions.vue'

const revealed = ref(false)
const box = ref(null)
function replay() { revealed.value = false; box.value?.reset() }
</script>

<template>
  <main class="page">
    <h1 class="title">Open Your Gift</h1>
    <p class="subtitle">One last thing, just for you ♡</p>

    <GiftBox ref="box" @revealed="revealed = true" />

    <transition name="fade">
      <div v-if="revealed" class="secret glass">
        <p>{{ birthday.giftMessage }}</p>
      </div>
    </transition>

    <StepActions prev="/letter" next="/final" :next-disabled="!revealed">
      <button v-if="revealed" class="btn btn-ghost" @click="replay"><RotateCcw :size="18" />Replay Surprise</button>
    </StepActions>
  </main>
</template>

<style scoped>
.secret { max-width: 440px; padding: 22px 26px; }
.secret p { margin: 0; font-family: var(--font-display); font-style: italic; font-weight: 600; font-size: 1.55rem; line-height: 1.3; text-shadow: var(--glow); }
</style>
