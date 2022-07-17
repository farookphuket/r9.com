<template>
    <div class="container">
        <p class="title">
            manage comment
        </p>
        <comment-list 
            :comments="comments" 
            @getComments="getComments($event)" 
            @edit="edit($event)"
            ></comment-list>
    </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'

import useComment from '../../../composable/useComment.js'

const {getComments,perpage,comments} = useComment()
import CommentList from './CommentList.vue'

import moment from 'moment'
const cM = async (page) => {
    perpage.value = 3
    await getComments(page)
    //console.log(comments._rawValue)
}

const edit = async (id) => {

}

onMounted(() => {
    cM()
})


</script>
