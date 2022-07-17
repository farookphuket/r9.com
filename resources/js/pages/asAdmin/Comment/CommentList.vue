<template>
    <div class="container">
        <article v-for="co in comments.data" 
            class="box mb-2">
            <div>
                <p class="title">
                    {{co.title}}
                </p>
                <div v-html="co.body"></div>
                <div class="has-text-right">

                </div>
            </div>
            <nav class="level">
                <div class="level-left">

                    <p>
                        <span class="mr-2">
                            {{moment(co.created_at)
                            .format("YY-MM-DD HH:mm:ss")}}
                        </span>
                        <span class="mr-2">
                            {{moment(co.created_at).fromNow()}}
                        </span>
                    </p>

                </div>
                <div class="level-right">
                    <p> 
                        <span class="mr-4">
                            {{co.user.name}}
                        </span>
                        <a href="" 
                            class="ml-2" 
                            @click.prevent="showReplyForm(co.id)" 
                            >
                            reply
                        </a>
                        <a href="" class="ml-2" 
                            @click.prevent="$emit('edit',co.id)">
                            edit
                        </a>

                    </p>
                </div>
            </nav>
            <div class="pt-4 mt-4 mb-4" 
                v-if="isShowReplyForm === true && 
                commentItems.comment_id === co.id">
                <p class="title">reply form</p>
                <div class="box">
                    <form action="">
                        <div class="field">
                            <div class="control">
                                <input v-model="rForm.title" 
                                class="input" type="text" name="">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <jodit-editor 
                                    :editorOptions="options" 
                                    height=450 
                                    v-model="rForm.body"></jodit-editor>
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
            </div>
            <div class="pt-4 mt-4 mb-4">
                <p class="subtitle">
                    reply {{Object.values(co.reply).length}} item(s).
                </p>
                <div class="box" 
                    v-for="re in co.reply" :key="re.id">
                    <p class="subtitle">{{re.title}}</p>
                    <p>{{re.body}}</p>
                    <nav class="level">
                        <div class="level-left">
                            <span>{{moment(re.created_at)
                                .format("YYYY-MM-DD HH:mm:ss")}}
                            </span>
                            <span class="ml-2">
                                {{moment(re.created_at).fromNow()}}
                            </span>
                        </div>
                        <div class="level-right">
                            <span>{{re.user.name}}</span>
                        </div>
                    </nav>
                </div>
            </div>

        </article>

        <!-- pagination area START -->
        <div class="mt-6 mb-4 d-flex justify-content-center" 
            >
            <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
                <a class="pagination-previous is-current">All post(s) 
                    {{comments.total}}</a>
                <a class="pagination-next is-current">page {{comments.current_page}}</a>
              <ul class="pagination-list" v-for="ln in comments.links">
                <li v-if="ln.url != null && ln.active == false">
                  <a class="pagination-link" 
                  aria-label="Page 1" aria-current="page" v-html="ln.label" 
                  @click.prevent="$emit('getComments',ln.url)"></a>
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
</template>

<script setup>
import {ref,reactive,nextTick,watchEffect} from 'vue'
import moment from 'moment'

import Form from '../../../core/Form.js'

const props = defineProps(["comments"])
const emit = defineEmits(["getComments","edit"])

const res_status = ref('')

const isShowReplyForm = ref(false)
const commentItems = ref({
    comment_id:0,
    show_form:false
})
const showReplyForm = (id) => {
    isShowReplyForm.value = false
    commentItems.value = {
        comment_id:id,
        show_form:true
    }
    rForm.comment_id = id 
    isShowReplyForm.value = true
}


const hideReplyForm = (id) =>{

    isShowReplyForm.value = true
    commentItems.value = {
        show_form:false,
        comment_id:0
    }
    isShowReplyForm.value = false 
    rForm.comment_id = 0
}

const options = {
    disablePlugins:"powered-by-jodit"
}

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
        setTimeout(() => {
            emit('getComments')
            res_status.value = ''
        },2300)
    }catch(err){
        res_status.value = `<span class="has-text-danger has-text-weight-bold">
            ${Object.values(err.response.data.errors).join()}</span>`
    }
}

</script>
