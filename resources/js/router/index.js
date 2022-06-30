
import {createWebHistory,createRouter} from 'vue-router'


// public router
import PubView from '../components/PubView.vue'
import Home from '../pages/asPublic/Home.vue'
import WhatupRead from '../pages/asPublic/Whatup/WhatupRead.vue'
import About from '../pages/asPublic/About.vue'
import Register from '../pages/asPublic/Register.vue'
import Login from '../pages/asPublic/Login.vue'


const routes = [
    {
        path:'/',
        redirect:'/',
        component:PubView,
        children:[
            {
                name:'Home',
                path:'/',
                component:Home
            },
            {
                name:'About',
                path:'/about',
                component:About
            },
            {
                name:'WhatupRead',
                path:'/whatup/:id',
                component:WhatupRead
            },
            {
                name:'Register',
                component:Register,
                path:'/register'
            },
            {
                name:'Login',
                component:Login,
                path:'/login'
            },
        ]

    }
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

export default router
