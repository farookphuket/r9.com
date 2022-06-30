<template>
    <div>
        <p class="title">Hey! what's up</p>
        <whatup-list 
            :wp="wpList" 
            @getWhatup="wp($event)"
            @openMe="openMe($event)"></whatup-list>
    </div>
</template>
<script setup>

import {ref,onMounted} from 'vue'
import useWhatup from '../../../composable/useWhatup.js'
import WhatupList from './WhatupList.vue'

const {getWhatup,whatups,perpage} = useWhatup()
const wpList = ref('')

const wp = async (page) => {
    perpage.value = 30
    await getWhatup(page)
    wpList.value = whatups._rawValue 
}

const openMe = async (id) => {
    let url = `/whatup/${id}`
    location.href=url
}

onMounted(() => {
    wp()
})

</script>
