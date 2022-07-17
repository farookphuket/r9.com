<template>
    <div class="container">
        <p class="title has-text-centered">
            {{post.title}}
        </p>
        <p class="subtitle has-text-right">

            <span class="ml-4 mr-2">
                <font-awesome-icon 
                    icon="user"></font-awesome-icon>
            </span>
            <span >{{u_name}}</span>

        </p>
        <nav class="level">
            <div class="level-left">
                <p class="level-item">
                    <span class="mr-2">
                        <font-awesome-icon 
                            icon="calendar-week"></font-awesome-icon>
                    </span>
                    <span class="mr-1">
                        {{moment(post.created_at).format("YYYY-MMMM-ddd d HH:mm:ss")}}
                    </span>
                    <span class="ml-1">
                        {{moment(post.created_at).fromNow()}}
                    </span>
                </p>
            </div>
            <div class="level-right">
                <p class="level-item">
                    <span class="ml-4 mr-2 has-text-info">
                        <font-awesome-icon 
                            icon="eye"></font-awesome-icon>
                    </span>
                    <span>
                        {{read_count}}
                    </span>
                    <span class="ml-4 mr-2 has-text-info">
                        <font-awesome-icon 
                            icon="comment"></font-awesome-icon>
                    </span>
                    <span>{{comment_count}}</span>
                </p>
            </div>
        </nav>
        <div class="pt-4 pb-4 has-text-centered">
            <figure class="is-4by5">
                <img :src="post.cover" :alt="post.title">
            </figure>
            <p>{{post.excerpt}}</p>
        </div>
        <div class="content" v-html="post.body">
        </div>

        <comment :post_id="post_id" 
        :comment_count="comment_count"></comment>
    </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import {useRoute} from 'vue-router'

import Comment from './Comment.vue'

import moment from 'moment'
const route = useRoute()

const post = ref('')

const u_name = ref('')
const read_count = ref(0)
const comment_count = ref(0)
const post_id = ref('')

onMounted(() => {
    readPost(route.params.slug)
})
 
const readPost = async (theSlug) => {
    let url = `/api/post/${theSlug}`
    let res = await axios.get(url)
    let rData = res.data.post
    read_count.value = Object.values(rData.read).length
    comment_count.value = Object.values(rData.comment).length
    u_name.value = rData.user.name
    post.value = rData
    post_id.value = rData.id
    //console.log(res)
}
</script>
