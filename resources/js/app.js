//import './bootstrap';
//
// bulma 
require('../scss/app.scss')
import {createApp} from 'vue'
import App from './App.vue'


// font awesome 28 Jan 2022
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// jodit 
// copy code from https://libraries.io/npm/jodit-vue3
import 'jodit/build/jodit.min.css'
//import JoditEditor from 'jodit-vue3'
import JoditEditor from 'jodit-vue3'


// copy code from https://www.npmjs.com/package/vue3-cookies
import VueCookies from 'vue3-cookies'

// axios 
import VueAxios from 'vue-axios'
window.axios = require("axios")

/* this 2 lines not working 
//import axios from 'axios'
//const axios = require('axios')
//*/

// custom class 
import CustomText from '../js/core/CustomText'
window.CustomText = CustomText

// router 
import router from './router'

const app = createApp(App)
app.component('font-awesome-icon',FontAwesomeIcon)
app.use(router)
app.use(VueAxios,axios)
app.use(JoditEditor)
app.use(VueCookies)
app.mount('#app')
