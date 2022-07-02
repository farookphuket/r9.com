<template>
    <div class="container">
        <p class="title">Logout</p>
        <p>logging out...</p>
    </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useCookies} from 'vue3-cookies'

const {cookies} = useCookies()

const router = useRouter()

onMounted(() => {
    getLogout()
})
const getLogout = async () => {
    let url = `/api/member/logout`
    let res = await axios.delete(url)

    // remove the token
    if(cookies.get('token')) cookies.remove('token')

    setTimeout(() => {
        router.push({name:'Home'})
        location.reload()
    },2300)
}
</script>
