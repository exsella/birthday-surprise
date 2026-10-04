import { createApp } from 'vue'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/600-italic.css'
import '@fontsource/caveat/500.css'
import '@fontsource/caveat/700.css'
import '@fontsource-variable/nunito'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
