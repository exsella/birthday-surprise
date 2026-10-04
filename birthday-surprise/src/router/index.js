import { createRouter, createWebHashHistory } from 'vue-router'
import { state, setReached } from '../state'

import WelcomeView from '../views/WelcomeView.vue'
import BirthdayView from '../views/BirthdayView.vue'
import MemoriesView from '../views/MemoriesView.vue'
import VideoView from '../views/VideoView.vue'
import LetterView from '../views/LetterView.vue'
import GiftView from '../views/GiftView.vue'
import FinalView from '../views/FinalView.vue'

export const steps = [
  { path: '/', name: 'welcome', label: 'Access Our World', component: WelcomeView },
  { path: '/birthday', name: 'birthday', label: 'Happy Birthday', component: BirthdayView },
  { path: '/memories', name: 'memories', label: 'Our Precious Memories', component: MemoriesView },
  { path: '/video', name: 'video', label: 'Our Special Video', component: VideoView },
  { path: '/letter', name: 'letter', label: 'A Letter From Me', component: LetterView },
  { path: '/gift', name: 'gift', label: 'Open Your Gift', component: GiftView },
  { path: '/final', name: 'final', label: 'Final Surprise', component: FinalView },
].map((s, i) => ({ ...s, meta: { step: i + 1 } }))

const router = createRouter({
  // hash history: tidak butuh konfigurasi server, aman untuk hosting statis
  history: createWebHashHistory(),
  routes: [...steps, { path: '/:pathMatch(.*)*', redirect: '/' }],
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  const step = to.meta.step
  if (step > 1 && !state.unlocked) return '/'
  // Boleh ke halaman yang sudah dilewati atau satu halaman berikutnya
  if (step > state.reached + 1) return steps[state.reached - 1].path
})
router.afterEach((to) => { if (to.meta.step) setReached(to.meta.step) })

export default router
