import { ref, onBeforeUnmount } from 'vue'

export function useTyping() {
  const text = ref('')
  const done = ref(false)
  let timer

  function stop() { clearInterval(timer) }
  function start(full, speed = 28) {
    stop(); text.value = ''; done.value = false
    let i = 0
    timer = setInterval(() => {
      i++
      text.value = full.slice(0, i)
      if (i >= full.length) { stop(); done.value = true }
    }, speed)
  }
  function finish(full) { stop(); text.value = full; done.value = true }

  onBeforeUnmount(stop)
  return { text, done, start, finish, stop }
}
