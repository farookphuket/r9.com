<template>
    <div class="container">

        <p class="title">{{wP.wp_title}}</p>
        <nav class="level">
            <div class="level-left">
                <p class="level-item">
                    <span class="mr-2">
                        <font-awesome-icon 
                            icon="user"></font-awesome-icon>
                    </span>
                    <span class="mr-2">
                        @{{owner}}
                    </span>
                    <span class="mr-2">
                        <font-awesome-icon 
                            icon="calendar-week"></font-awesome-icon>
                    </span>
                    <span>
                        {{moment(wP.created_at).format("YYYY-MM-DD HH:mm:ss")}}
                    </span>
                </p>
            </div>
            <div class="level-right">
                <p>
                    <span class="mr-2">
                        <font-awesome-icon 
                            icon="eye"></font-awesome-icon>
                    </span>
                    <span>{{read_count}}</span>
                </p>
            </div>
        </nav>
        <div class="has-text-centered">
            <figure>
                <img :src="wP.wp_cover" :alt="wP.wp_title">
            </figure>
            <p class="pt-2">{{wP.wp_title}}</p>
        </div>
        <pre>{{wP.wp_excerpt}}</pre>
        <div v-html="wP.wp_body"></div>
    </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import {useRoute} from 'vue-router'
import useWhatup from '../../../composable/useWhatup.js'
import moment from 'moment'
const {getSingleWhatup,whatup} = useWhatup()
const route = useRoute()
const owner = ref('')

const wP = ref('')
const read_count = ref(0)
const getPage = async () => {
    await getSingleWhatup(route.params.id)
    let rData = whatup._rawValue

    wP.value = rData
    read_count.value = Object.values(rData.read).length
    owner.value = rData.user.name

}

onMounted(() => {
    getPage()
})

</script>
