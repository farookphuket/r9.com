<template>
    <div>
        <p class="title">comment list</p>
        <div class="box" 
            v-for="co in commentObj">
            <p class="title">{{co.title}}</p>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'


const prop = defineProps(["commentObj"])
</script>
