<template>
    <div class="">
        <form action="" 
            @submit.prevent="saveComment">

            <div class="field">
                <div class="control">
                    <input v-model="cForm.title" 
                    class="input" type="text" name="">
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <jodit-editor 
                        v-model="cForm.body" 
                        :editorOptions='options'
                        height=450></jodit-editor>
                </div>
            </div>
            <nav class="level">
                <div class="level-left">
                    <div v-html="res_status"></div>
                </div>
                <div class="level-right">
                    <button class="button is-primary is-outlined 
                        is-rounded" 
                        type="submit" 
                        @click.prevent="saveComment">
                        <font-awesome-icon 
                            icon='check'></font-awesome-icon>
                    </button>
                </div>
            </nav>
        </form>
    </div>
</template>
<script setup>
import {ref,reactive} from 'vue'
import Form from '../../../core/Form.js'

const res_status = ref('')

const options = {
    disablePlugins:"powered-by-jodit"
}

const prop = defineProps(["post_id"])
const emit = defineEmits(["getPostComments"])

const cForm = reactive(new Form({
    title:'',
    body:''
}))

const saveComment = async () => {
    try{
        let url = `/api/member/comment?post_id=${prop.post_id}`
        let res = await axios.post(url,{...cForm})
        res_status.value = res.data.msg
        setTimeout(() => {
            res_status.value = ''
            emit("getPostComments")
        },2300)
    }catch(err){
        res_status.value = `<span class="has-text-danger has-text-weight-bold">
            ${Object.values(err.response.data.errors).join()}</span>`
    } 
    
}

</script>
