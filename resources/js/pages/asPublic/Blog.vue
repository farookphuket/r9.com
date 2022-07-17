<template>
    <div class="container">
        <blog-list 
            :postList="postList" 
            @openMe="openMe($event)" 
            @getPost="getPost($event)"></blog-list>
    </div>
</template>

<script setup>

import {ref,onMounted} from 'vue'
import usePost from '../../composable/usePost.js'

import BlogList from '../asPublic/Blog/BlogList.vue'

const {postList,perpage,getPost} = usePost()

const pP = async (page) => {
    perpage.value = 12
    await getPost(page)
}

onMounted(() => {
    pP()
})



const openMe = (slug) => {
    let url = `/${slug}`
    location.href=url
}
</script>
