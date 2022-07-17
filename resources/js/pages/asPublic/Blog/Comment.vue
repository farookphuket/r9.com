<template>
    <div class="container">
        <div class="mb-4 pb-4">
            <p class="title">
                {{comment_post.total}}
                comment(s).</p>
        </div>

        <comment-form 
            v-if="is_login === true"
            :post_id="post_id" 
            @getPostComments="getPostComments($event)"></comment-form>

        <div class="mb-4" 
            v-else>
            <p class="subtitle">
                Do you want to make a comment?  

            </p>
            <p>
                please 
                <router-link :to="{name:'Login'}" 
                    class="has-text-info has-text-weight-bold">
                    login
                </router-link>
                <span class="ml-4">หากท่านต้องการเขียนคอมเม้น กรุณาล๊อคอินก่อนนะครับ</span>
            </p>
        </div>

        <div class="pt-4 mt-4">
            <div class="box" 
                v-for="co in comment_post.data" :key="co.id">
                <p class="title has-text-centered">{{co.title}}</p>
                <div v-html="co.body"></div>
                <nav class="level">
                    <div class="level-left">
                        <p>
                            <span class="mr-2">
                                <font-awesome-icon 
                                    icon="calendar-week">
                                </font-awesome-icon>
                            </span>
                            <span class="mr-4">
                                {{moment(co.created_at).format("YYYY-MM-DD HH:mm:ss")}}
                            </span>
                            <span>
                                {{moment(co.created_at).fromNow()}}
                            </span>
                        </p>
                    </div>
                    <div class="level-right">
                        <p>
                            <span class="mr-2">
                                <font-awesome-icon 
                                    icon="user"></font-awesome-icon>
                            </span>
                            <span class="">
                                {{co.user.name}}
                            </span>
                            <span class="ml-4" 
                                v-if="is_login === true">
                                <a href="" 
                                    @click.prevent="showReplyForm(co.id)">
                                    reply
                                </a>
                            </span>
                        </p>

                    </div>
                </nav>

                <div class="pt-4"
                    v-if="isShowReplyForm === true 
                    && commentItems.show_form === true 
                    && commentItems.comment_id === co.id">
                    <form action="">
                        <div class="field">
                            <div class="control">
                                <input v-model="rForm.title" 
                                class="input" type="text" placeholder="title...">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <jodit-editor 
                                    v-model="rForm.body" 
                                    height=450 
                                    :editorOptions="options"></jodit-editor>

                            </div>

                        </div>

                        <nav class="level">
                            <div class="level-left">
                                <div v-html="res_status"></div>
                            </div>
                            <div class="level-right">
                                <button class="button is-primary" 
                                    type="submit" 
                                    @click.prevent="saveReply">
                                    reply
                                </button>
                            </div>
                        </nav>
                    </form>

                </div>

                <!-- reply list START -->
                <div class="mt-4 mb-4">
                    <p class="subtitle has-text-right">
                        replies {{Object.values(co.reply).length}} item(s).
                    </p>
                    <div class="box" v-for="re in co.reply" :key="re.id">
                        <p class="title">{{re.title}}</p>
                        <div class="pt-4">
                            <p v-html="re.body"></p>
                        </div>
                        <nav class="level">
                            <div class="level-left">
                                <p>
                                    <span class="mr-2">
                                        <font-awesome-icon 
                                            icon="calendar-week">
                                        </font-awesome-icon>
                                    </span>
                                    <span>
                                        {{moment(re.created_at)
                                        .format("YY-MMM-dd HH:mm:ss")}}
                                    </span>
                                    <span class="ml-2">
                                        {{moment(re.created_at).fromNow()}}
                                    </span>
                                </p>
                            </div>
                            <div class="level-right">
                                <p>
                                    <span class="mr-2">
                                        <font-awesome-icon 
                                            icon="user"></font-awesome-icon>
                                    </span>
                                    <span>{{re.user.name}}</span>
                                </p>
                            </div>
                        </nav>
                    </div>
                </div>
                <!-- reply list END -->
            </div>
            

        <!-- pagination area START -->
        <div class="mt-6 mb-4 d-flex justify-content-center" 
            v-if="comment_count !== 0">
            <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
                <a class="pagination-previous is-current">All comment(s) {{comment_post.total}}</a>
                <a class="pagination-next is-current">page {{comment_post.current_page}}</a>
              <ul class="pagination-list" v-for="ln in comment_post.links">
                <li v-if="ln.url != null && ln.active == false">
                  <a class="pagination-link" 
                  aria-label="Page 1" aria-current="page" v-html="ln.label" 
                  @click.prevent="cP(ln.url)"></a>
                </li>
                <li v-else>
                  <a class="pagination-link is-current"  v-if="ln.active == true" 
                  aria-label="" aria-current="page" v-html="ln.label" 
                  ></a>

                  <a class="pagination-link"  v-else 
                  aria-label="" aria-current="page" v-html="ln.label" 
                  ></a>
                </li>

              </ul>
            </nav>
        </div>
        <!-- pagination area END -->

        </div>
    </div>
</template>
<script setup>

import {ref,reactive,watchEffect} from 'vue'
import useComment from '../../../composable/useComment.js'
import CommentForm from './CommentForm.vue'
import moment from 'moment'

import Form from '../../../core/Form.js'

const {getPostComments,comment_post,perpage,pageSlug} = useComment()

const prop = defineProps(["post_id","comment_count"])
const is_login = window.lsDefault.USER_IS_LOGIN

const options = {
    disablePlugins:"powered-by-jodit"
}

const commentItems = ref('')

const isShowReplyForm = ref(false)
const res_status = ref('')

// the reply form
const rForm = reactive(new Form({
    title:'',
    body:'',
    comment_id:''
}))

const saveReply = async () => {
    try{
        let url = `/api/member/reply?comment_id=${rForm.comment_id}`
        let res = await axios.post(url,{...rForm})
        res_status.value = res.data.msg
    }catch(err){
        res_status.value = `<span class="has-text-danger has-text-weight-bold">
            ${Object.values(err.response.data.errors).join()}</span>`
    }

}

const showReplyForm = (id) => {

    isShowReplyForm.value = false 
    commentItems.value = {
        comment_id:id,
        show_form:true
    }
    rForm.comment_id = id
    isShowReplyForm.value = true
}

const cP = async (page) => {

    perpage.value = 25
    await getPostComments(page)
    await pageSlug
    let res = await comment_post._rawValue

}

watchEffect(() => {
    //console.log(prop.comment_count)
    if(prop.comment_count !== 0) cP()
})





</script>
