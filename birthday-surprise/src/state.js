import { reactive } from 'vue'

// Status perjalanan (disimpan di sessionStorage supaya refresh tidak mengulang dari awal)
export const state = reactive({
  unlocked: sessionStorage.getItem('bd-unlocked') === '1',
  reached: Number(sessionStorage.getItem('bd-reached') || 1),
})

export function unlock() {
  state.unlocked = true
  sessionStorage.setItem('bd-unlocked', '1')
}

export function setReached(n) {
  if (n > state.reached) {
    state.reached = n
    sessionStorage.setItem('bd-reached', String(n))
  }
}

export function resetJourney(toStep = 2) {
  state.reached = toStep
  sessionStorage.setItem('bd-reached', String(toStep))
}
