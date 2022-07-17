
import {createWebHistory,createRouter} from 'vue-router'


// public router
import PubView from '../components/PubView.vue'
import Home from '../pages/asPublic/Home.vue'
import WhatupRead from '../pages/asPublic/Whatup/WhatupRead.vue'
import About from '../pages/asPublic/About.vue'
import Blog from '../pages/asPublic/Blog.vue'
import BlogRead from '../pages/asPublic/Blog/BlogRead.vue'
import Register from '../pages/asPublic/Register.vue'
import RegisterActivation from '../pages/asPublic/User/RegisterActivation.vue'
import ActivationSuccess from '../pages/asPublic/User/ActivationSuccess.vue'
import ActivationError from '../pages/asPublic/User/ActivationErrors.vue'
import Login from '../pages/asPublic/Login.vue'
import Logout from "../pages/asPublic/Logout.vue"



// member
import MemberView from "../components/MemberView.vue"
import MemberDashboard from "../pages/asMember/Dashboard.vue"
import Profile from "../pages/asMember/Profile/Profile.vue"

// admin route
import AdminView from "../components/AdminView.vue"
import AdminDashboard from '../pages/asAdmin/Dashboard.vue'
import AdminPost from '../pages/asAdmin/Post/Post.vue'
import AdminUser from '../pages/asAdmin/User/User.vue'
import AdminComment from '../pages/asAdmin/Comment/Comment.vue'
export const user_id = window.lsDefault.user_id

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
                name:'Blog',
                path:'/blog',
                component:Blog
            },
            {
                name:'BlogRead',
                path:'/:slug',
                component:BlogRead
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
                name:'RegisterActivation',
                path:'/activated/:token',
                component:RegisterActivation
            },
            
            {
                name:'ActivationError',
                path:'/activation-errors',
                component:ActivationError
            },
            {
                name:'ActivationSuccess',
                path:'/activation-success',
                component:ActivationSuccess
            },

            {
                name:'Login',
                component:Login,
                path:'/login'
            },
        ]

    },

    /* Logout START */
    {
        name:'Logout',
        path:'/logout',
        component:Logout,
        beforeEnter:(to,from,next)=>{
            if(!user_id) next({name:'Home'})
            else next()
        },
    },
    /* Logout END */
    {
        path:'/member',
        redirect:'/member/member-dashboard',
        component:MemberView,
        children:[
            {
                name:'MemberDashboard',
                component:MemberDashboard,
                path:'/member-dashboard'
            }
        ],
        beforeEnter:(to,from,next)=>{
            if(!user_id){
                next({name:'Login'})
            }else{
                next()
            }

        },
    },
    {
        name:"Profile",
        path:"/profile",
        component:Profile,
        beforeEnter:(to,from,next)=>{
            if(!user_id){
                next({name:'Login'})
            }else{
                next()
            }

        },
    },
    {
        /* ==== ADMIN START ============== */
        path:'/admin',
        redirect:'/admin/admin-dashboard',
        component:AdminView,
        children:[
            {
                name:'AdminDashboard',
                path:'/admin-dashboard',
                component:AdminDashboard
            },
            {
                name:"AdminPost",
                path:'/post',
                component:AdminPost
            },
            {
                name:"AdminUser",
                path:'/user',
                component:AdminUser
            },
            {
                name:'AdminComment',
                path:'/admin-comment',
                component:AdminComment
            }
        ],
        beforeEnter:(to,from,next)=>{
            if(!user_id){
                next({name:'Login'})
            }else{
                next()
            }

        },
        /* ==== ADMIN END ============== */
    },
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

export default router
