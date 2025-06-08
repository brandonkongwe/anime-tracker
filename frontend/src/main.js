import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMoon, faSun, faSearch, faListCheck, faUser, faTv } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'

// font awesome icons
library.add(faGithub, faLinkedin, faTwitter, faMoon, faSun, faSearch, faListCheck, faUser, faTv)

const pinia = createPinia();
pinia.use(createPersistedState);

axios.defaults.withCredentials = true;

createApp(App)
    .use(router)
    .use(pinia)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

