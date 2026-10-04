<script setup>
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { birthday } from '../data/birthday'
import { asset } from '../utils'
import StepActions from '../components/StepActions.vue'

// Array 4 foto masa kecil dari data birthday.js (fallback jika kosong)
const photos = birthday.childhoodPhotos || [
  'images/memories/1.jpeg',
  'images/memories/2.jpeg',
  'images/memories/3.jpeg',
  'images/memories/4.jpeg'
]

const currentIndex = ref(0)

function nextPhoto() {
  currentIndex.value = (currentIndex.value + 1) % photos.length
}

function prevPhoto() {
  currentIndex.value = (currentIndex.value - 1 + photos.length) % photos.length
}
</script>

<template>
  <main class="page">
    <h1 class="title">{{ birthday.childhoodTitle || 'Adorable Childhood' }}</h1>
    <p class="subtitle">{{ birthday.childhoodSubtitle || 'Geser untuk melihat potret berharganya' }}</p>

    <!-- Frame Slider Bergaya Sesuai Asli -->
    <div class="frame glowing-frame">
      <div class="slider-container">
        <!-- Foto Aktif -->
        <img :src="asset(photos[currentIndex])" alt="Foto Masa Kecil" class="slide-img" />
        
        <!-- Badge Nomor Foto (Misal: 1 / 4) -->
        <span class="badge" aria-hidden="true">0{{ currentIndex + 1 }} / 0{{ photos.length }}</span>

        <!-- Tombol Navigasi Geser Kiri / Kanan -->
        <button class="nav-btn prev" @click="prevPhoto" aria-label="Foto Sebelumnya">
          <ChevronLeft :size="24" />
        </button>
        <button class="nav-btn next" @click="nextPhoto" aria-label="Foto Selanjutnya">
          <ChevronRight :size="24" />
        </button>

        <!-- Titik Indikator (Dots) di Bawah -->
        <div class="dots">
          <span 
            v-for="(photo, index) in photos" 
            :key="index" 
            :class="['dot', { active: index === currentIndex }]"
            @click="currentIndex = index"
          />
        </div>
      </div>
    </div>

    <p class="lead">{{ birthday.childhoodNote || 'Dulu selucu ini, sekarang makin luar biasa!' }}</p>
    
    <!-- Navigasi Langkah -->
    <StepActions prev="/memories" next="/letter" />
  </main>
</template>

<style scoped>
/* Menyesuaikan gaya frame agar mirip dengan komponen video aslinya */
.frame {
  position: relative;
  width: min(100%, 760px);
  aspect-ratio: 16 / 9;
  border-radius: 22px;
  overflow: hidden;
  border: 2px solid var(--pink);
  background: #000;
  box-shadow: 0 0 22px rgba(255, 79, 147, .55), 0 0 60px rgba(245, 47, 112, .25);
  transition: box-shadow .6s;
}

.glowing-frame {
  animation: glow 2.4s ease-in-out infinite alternate;
}

@keyframes glow {
  to { box-shadow: 0 0 36px rgba(255, 79, 147, .95), 0 0 110px rgba(245, 47, 112, .55); }
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0.4; }
  to { opacity: 1; }
}

/* Badge nomor urut di pojok */
.badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(20, 10, 15, 0.75);
  border: 1px solid var(--pink);
  color: var(--pink);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
  backdrop-filter: blur(4px);
  z-index: 2;
}

/* Tombol Navigasi Kiri / Kanan */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(20, 10, 15, 0.6);
  border: 1px solid var(--pink);
  color: #fff;
  border-radius: 50%;
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  z-index: 2;
}

.nav-btn:hover {
  background: var(--pink);
  transform: translateY(-50%) scale(1.1);
}

.nav-btn.prev { left: 16px; }
.nav-btn.next { right: 16px; }

/* Titik Indikator Slide */
.dots {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.4);
  padding: 6px 14px;
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
}

.dot.active {
  background: var(--pink);
  transform: scale(1.3);
}

@media (max-width: 520px) {
  .nav-btn {
    width: 38px;
    height: 38px;
  }
}
</style>Z