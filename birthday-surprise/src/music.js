import { reactive } from 'vue'
import { birthday } from './data/birthday'
import { asset } from './utils'

// Satu audio untuk seluruh website, jadi tidak mulai ulang saat pindah halaman
export const music = reactive({ playing: false, volume: 0.6, missing: false })
let audio

function ensure() {
  if (!audio) {
    audio = new Audio()
    audio.loop = true
    audio.preload = 'none'
    audio.volume = music.volume
    audio.src = asset(birthday.music)
    audio.addEventListener('error', () => { music.missing = true; music.playing = false })
    audio.addEventListener('playing', () => { music.playing = true })
    audio.addEventListener('pause', () => { music.playing = false })
  }
  return audio
}

export async function playMusic() {
  try { await ensure().play() } catch { music.playing = false }
}
export function pauseMusic() { audio?.pause() }
export function toggleMusic() { music.playing ? pauseMusic() : playMusic() }
export function setVolume(v) { music.volume = v; if (audio) audio.volume = v }
