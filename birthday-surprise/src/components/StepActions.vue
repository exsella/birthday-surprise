<script setup>
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
defineProps({
  prev: String,
  next: String,
  prevLabel: { type: String, default: 'Previous' },
  nextLabel: { type: String, default: 'Next Surprise' },
  nextDisabled: Boolean,
})
</script>

<template>
  <div class="actions">
    <router-link v-if="prev" :to="prev" class="btn btn-ghost"><ArrowLeft :size="18" />{{ prevLabel }}</router-link>
    <router-link v-if="next" :to="next" class="btn" :class="{ 'is-disabled': nextDisabled }" :aria-disabled="nextDisabled">
      {{ nextLabel }}<ArrowRight :size="18" />
    </router-link>
    <slot />
  </div>
</template>
