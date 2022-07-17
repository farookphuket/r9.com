<template>
    <div class="pb-4 pt-4">
        <form action="">
            <div class="field">
                <div class="control">
                    <input v-model="aForm.title" class="input" type="text" 
                    placeholder="Enter the title..." 
                    ref="titleRef"
                    @blur="makeSlug">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input v-model="aForm.slug" class="input" type="text" 
                    ref="slugRef">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <jodit-editor 
                        :editorOptions="options" 
                        v-model="aForm.body" 
                        height="450"></jodit-editor>
                </div>
                <div class="field pt-2 pb-4" 
                    v-if="isEditMode === true">
                    <div class="mb-4 mt-4 has-background-warning 
                        has-text-info">
                        <p class="has-text-dark">
                            on the edit mode the editor cannot be show content 
                            this is the bug from "jodit-vue3" 
                            click the text box then paste into the editor.
                        </p>
                        <ul>
                            <li>
                                change the editor mode to code.
                            </li>
                            <li>
                                click the text box below (this will copy the 
                                content from the text box).
                            </li>
                            <li>
                                paste the content into the editor.
                            </li>
                        </ul>
                    </div>
                    <div class="control has-icons-right">
                        <span class="icon is-right">{{aForm.body.length}}</span>
                        <textarea v-model="aForm.body" class="textarea" 
                            ref="bodyRef" 
                            @click.prevent="copyMe"></textarea>
                    </div>
                </div>
            </div>
            <!-- status,button START -->
            <div class="mt-4 mb-4 pt-4 pb-4">
                <div class="columns is-mobile">
                    <div class="column">
                        <div v-html="res_status"></div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label for="" class="checkbox">
                                <input v-model="aForm.is_public" 
                                type="checkbox" name="">
                                <span class="has-text-success"
                                    v-if="aForm.is_public === true">public</span>
                                <span class="has-text-info has-background-warning p-2" 
                                    v-else>private</span>
                            </label>
                        </div>
                    </div>

                    <div class="column">
                        <div class="field is-pulled-right">
                            <button class="button is-primary is-rounded 
                                is-outlined" 
                                type="submit" 
                                @click.prevent="save(editId)">
                                <font-awesome-icon 
                                    icon="check"></font-awesome-icon>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <!-- status,button END -->
        </form>
    </div>
</template>
<script setup>
import {ref,reactive,onMounted,watchEffect,nextTick} from 'vue'
import Form from '../../../core/Form.js'
import cT from '../../../core/CustomText.js'

const aForm = reactive(new Form({
    title:'',
    slug:'',
    body:'',
    is_public:''
}))

const res_status = ref('')

const sl = new CustomText()

const options = {
    disablePlugins:"powered-by-jodit"
}
const titleRef = ref('')
const slugRef = ref('')
const bodyRef = ref('')

const makeSlug = () => {
    return aForm.slug = sl.thaiSlug(aForm.title)
}

const copyMe = () => {
    bodyRef.value.select()
    document.execCommand('copy')
}
const prop = defineProps(['editId'])
const emit = defineEmits(['getAbout'])

const isEditMode = ref(false)

const edit = watchEffect(async () => {
    if(prop.editId === 0) return
    nextTick(() => {
        titleRef.value.focus()
    })
    try{
        let url = `/api/admin/static-page/${prop.editId}/edit`
        let res = await axios.get(url)
        let p = await res.data.page
        aForm.title = p.title
        aForm.slug = p.slug
        aForm.body = p.body
        if(p.is_public !== 0){
            aForm.is_public = true
        }
        isEditMode.value = true
        //console.log(p)
    }catch(e){

    }
})

const save = async (id) => {
    res_status.value = ''
    isEditMode.value = false
    try{

        let url = `/api/admin/static-page`
        let fData = new FormData()
        fData.append('title',aForm.title)
        fData.append('slug',aForm.slug)
        fData.append('body',aForm.body)
        fData.append('is_public',aForm.is_public)
        if(id && id !== 0){
            fData.append('_method','PUT')
            url = `/api/admin/static-page/${id}`
        }
        let res = await axios.post(url,fData)
        let rData = await res.data.msg
        res_status.value = rData
        //console.log(res)
        setTimeout(() => {
            res_status.value = ''
            aForm.reset()
            emit('getAbout')
        },2300)
    }catch(e){
        //console.log(e.response.data.errors)
        res_status.value = `<span class="has-text-danger 
        has-text-weight-bold">${Object.values(e.response.data.errors).join()}
        </span>`
    }
}
</script>
