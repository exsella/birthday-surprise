<script setup>
import { birthday } from '../data/birthday'
import MemoryGallery from '../components/MemoryGallery.vue'
import StepActions from '../components/StepActions.vue'
</script>

<template>
  <main class="page top">
    <div class="header-box">
      <h1 class="title">Our Precious Memories</h1>
      <p class="subtitle">Moments that mean everything ♡</p>
    </div>

    <div class="gallery-wrapper">
      <MemoryGallery :items="birthday.memories" />
    </div>

    <p class="tip">Ketuk foto untuk melihatnya lebih besar</p>
    <StepActions prev="/birthday" next="/video" />
  </main>
</template>

<style scoped>
.page.top { 
  justify-content: flex-start; 
  gap: 28px;
  padding: 40px 16px;
}

.header-box {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* --- GALLERY WRAPPER --- */
.gallery-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.tip { 
  margin: 0; 
  color: var(--soft); 
  font-family: var(--font-hand); 
  font-size: 1.35rem; 
  letter-spacing: 0.3px;
}
</style>