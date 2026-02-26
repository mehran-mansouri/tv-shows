import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import primeVueConfiguration from './configs/primevue-configuration'
import VueLazyLoad from 'vue3-lazyload'
import './styles/global.scss'
import { createHead } from '@unhead/vue/client'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(PrimeVue, primeVueConfiguration);
app.use(VueLazyLoad, {})
app.use(head)

app.mount('#app');
