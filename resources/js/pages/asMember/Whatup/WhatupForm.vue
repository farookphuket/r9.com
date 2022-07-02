<template>
    <div class="mb-4 pb-4 mt-4">
        <form class="p-4" action="" ENCTYPE="multipart/form-data">
            <div class="field">
                <div class="control">
                    <input v-model="wForm.wp_title" class="input" 
                    placeholder="Enter the title..."
                    type="text" ref="wTitleRef">
                </div>
            </div>

            <div class="is-post-list mt-4 pb-4 ">

                <div class="columns is-mobile">
                    <div class="column">
                        <div class="field">
                            <div class="control">
                                <input  class="input" 
                                ref="fileUploadRef"
                                type="file" name="" 
                                @change="file_preview">
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field is-horizontal">
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input v-model="wForm.wp_img_url" 
                                        class="input" type="text" 
                                        placeholder="image url..." 
                                        >
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <button class="button 
                                            is-primary is-rounded is-outlined" 
                                            @click.prevent="url_preview">
                                            <font-awesome-icon 
                                                icon="eye"></font-awesome-icon>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div><!-- end of div.field.is-horizontal -->

                    </div>

                </div>

                <!-- preview area START -->
                <div class="mb-4 pb-4 has-text-centered" 
                    v-if="is_show_preview !== false">
                    <figure style="max-width:340px;" 
                        class="image is-inline-block">
                        <img :src="photo.src" :alt="photo.alt" 
                        class="is-3by2 ">
                    </figure>

                    <p>
                        {{photo.alt}}  
                        <span v-if="is_has_error === true" 
                              class="has-text-danger 
                              has-text-weight-bold">{{is_error_msg}}</span>

                    </p>
                </div>
                <!-- preview area END -->

            </div>
            <!-- end of div.mt-4 select cover -->


            <div class="field ">
                <div class="control has-icons-right">
                    <textarea v-model="wForm.wp_excerpt" class="textarea" 
                        placeholder="Description here is a short explain..." ></textarea>
                    <span class="icon is-right">
                        {{wForm.wp_excerpt.length}}
                    </span>
                </div>
            </div>
            <!-- end of textarea wp_excerpt -->

            <div class="field">
                <div class="control">
                    <jodit-editor 
                        v-model="wForm.wp_body" 
                        height=450 
                        :editorOptions="options"></jodit-editor>
                </div>
                <div class="mt-4 pt-4" 
                    v-if="editId !== 0">
                    <p class="pt-4 mt-4 pb-4">
                        copy this below code then paste into the post body in code 
                        view mode.
                    </p>
                    <div class="field">
                        <textarea v-model="wForm.wp_body" 
                            class="textarea" 
                            @click="copyToClipboard" 
                            ref="copyMeRef"></textarea>
                    </div>
                </div>

            </div>

            <div class="mb-4 pb-4 pt-4 is-post-list">
                <div class="columns is-mobile">
                    <div class="column">
                        <div v-html="res_status"></div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label for="" class="checkbox">
                                <input v-model="wForm.is_public" 
                                type="checkbox" name="">
                                <span class="ml-2 has-text-weight-bold 
                                    has-background-success is-uppercase p-2" 
                                    v-if="wForm.is_public === true">public</span>
                                <span class="ml-2 has-text-weight-bold 
                                    has-background-warning is-uppercase p-2" 
                                    v-else>private</span>
                            </label>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field is-pulled-right">
                            <button class="button is-primary is-outlined 
                                is-rounded" 
                                type="submit" 
                                @click.prevent="post(editId)">
                                <font-awesome-icon  
                                    icon='check'></font-awesome-icon>
                            </button>
                            <button class="button is-danger is-outlined 
                                is-rounded is-uppercase ml-2" 
                                @click.prevent="formCancel">cancel</button>
                        </div>
                    </div>
                </div>
            </div><!-- end of div.mb-4 button -->

        </form>
    </div>
</template>
<script setup>

import {ref,reactive,watchEffect,nextTick} from "vue"

import Form from '../../../core/Form.js'

const wTitleRef = ref('')
const fileUploadRef = ref('')
const copyMeRef = ref('')

// prop
const prop = defineProps(["editId"])

// emit 
const emit = defineEmits(["getWhatup","formCancel"])

const photo = ref('')

const wForm = reactive(new Form({
    wp_title:'',
    wp_file_upload:'',
    wp_img_url:'',
    wp_excerpt:'',
    wp_body:'',
    is_public:''
}))

const is_has_error = ref('')
const is_error_msg = ref('')
const is_show_preview = ref(false)

const options = {
    disablePlugins:"powered-by-jodit"
}

const copyToClipboard = () => {
    copyMeRef.value.select() 
    document.execCommand('copy')
}

const res_status = ref('')

// watch for edit id
const edit = watchEffect( async () => {
    if(prop.editId !== 0){
        nextTick(() => {
            wTitleRef.value.focus()
        })
        let url = `/api/member/whatup/${prop.editId}`
        let res = ''
        let rData = ''
        is_show_preview.value = true
        try{
            res = await axios.get(url)
            rData = await res.data.whatup
       //     console.log(rData)
            if(rData.is_public !== 0) wForm.is_public = true
            wForm.wp_title = rData.wp_title
            wForm.wp_excerpt = rData.wp_excerpt
            wForm.wp_body = rData.wp_body

            photo.value = {
                src:rData.wp_cover,
                alt:rData.wp_title
            }
        }catch(err){
            console.log(err)
        }
    }
})

const formCancel = () => {
    wForm.reset()
    emit('formCancel')
}

const file_preview = (e) => {

        // reset the input field
        wForm.wp_img_url = ''
        is_show_preview.value = true

        let theFile = e.target.files[0]
        if(!theFile) return
        let f_size = theFile.size/1024/1024
        let f_name = theFile.name

        if(f_size > 2){

            res_status.value = `<span class="has-text-danger 
            has-text-weight-bold">Error the upload file is too big.</span>`
            is_has_error.value = true
            is_error_msg.value = `Error! file too big! 
                please select file size less than 2 MB.`
        }else{

            // show preview 
            photo.value = {
                src:URL.createObjectURL(theFile),
                alt:theFile.name
            }
            // set value for upload field
            wForm.wp_file_upload = theFile
        }
}

const url_preview = () => {
    // reset the upload field
    fileUploadRef.value.value = '' 
    wForm.wp_file_upload = ''

    if(wForm.wp_img_url.length !== 0){
        // preview the url 
        photo.value = {
            src:wForm.wp_img_url,
            alt:wForm.wp_title
        }

        is_show_preview.value = true

    }
}



const post = async (id) => {
    let url = `/api/member/whatup`
    let fData = new FormData()
    fData.append('wp_title',wForm.wp_title)
    fData.append('wp_excerpt',wForm.wp_excerpt)
    fData.append('wp_body',wForm.wp_body)
    fData.append('is_public',wForm.is_public)
    fData.append('wp_file_upload',wForm.wp_file_upload)
    fData.append('wp_img_url',wForm.wp_img_url)

    if(id && id !== 0){
        url = `/api/member/whatup/${id}`
        fData.append("_method","PUT")
    }
    let res = ''
    try{

        res = await axios.post(url,fData)
        res_status.value = await res.data.msg
        setTimeout(() =>{
            wForm.reset()
            res_status.value = ''
            emit('getWhatup')
            emit('formCancel')
        },3200)
    }catch(err){
        //console.log(Object.values(err.response.data.errors).join())
        res_status.value = `<span class="has-text-danger 
        has-text-weight-bold">${Object.values(err
            .response.data.errors).join()}</span>`
        nextTick(() => {
            wTitleRef.value.focus()
        })
    }

    
}

/*
export default{
    name:"WhatupForm",
    props:['editId'],
    setup(props,context){
        const wForm = reactive(new Form({
            wp_title:'',
            wp_file_upload:'',
            wp_img_url:'',
            wp_excerpt:'',
            wp_body:'',
            is_public:''
        }))


        const res_status = ref('')
        const is_error_msg = ref('')
        const is_has_error = ref(false)

        const cover_file = ref(null)

        const  photo = ref('') // will return array of image and alt tag
        const wTitleRef = ref('')


        const options = {
            disablePlugins:"powered-by-jodit"
        }

        const select_preview = (e) =>{
            // reset error
            reset_error()

            // reset the input field
            wForm.wp_img_url = ''

            let theFile = e.target.files[0]
            let f_size = theFile.size/1024/1024
            let f_name = theFile.name

            if(f_size > 2){

                res_status.value = `<span class="has-text-danger 
                has-text-weight-bold">Error the upload file is too big.</span>`
                is_has_error.value = true
                is_error_msg.value = `Error! file too big! 
                    please select file size less than 2 MB.`
            }else{

                // show preview 
                photo.value = {
                    src:URL.createObjectURL(theFile),
                    alt:theFile.name
                }
                // set value for upload field
                wForm.wp_file_upload = theFile
            }
        }
        const url_preview = (e) =>{
            e.preventDefault()
            reset_error()

            // try to reset the upload 
            wForm.wp_file_upload = null



            if(wForm.wp_img_url.length !== 0){
                // preview the url 
                photo.value = {
                    src:wForm.wp_img_url,
                    alt:wForm.wp_title
                }

            }

        }

        const edit_id  = watchEffect((id) => {
            if(props.editId !== 0){
                nextTick(() => {
                    //alert(props.editId)
                    wTitleRef.value.focus()

                })
                let url = `/api/admin/whatup/${props.editId}`
                axios.get(url)
                    .then(res=>{
//                        console.log(res.data.whatup)
                        let rData = res.data.whatup 
                        photo.value = {
                            src:rData.wp_cover,
                            alt:rData.wp_title
                        }
                        if(rData.is_public !== 0){
                            wForm.is_public = true
                        }
                        wForm.wp_title = rData.wp_title
                        wForm.wp_excerpt = rData.wp_excerpt
                        wForm.wp_body = rData.wp_body

                    })
            }

        })


        const post = (id) =>{

            res_status.value = ''

            let url = `/api/admin/whatup`
            let fData = new FormData()
            fData.append('wp_title',wForm.wp_title)
            fData.append('wp_excerpt',wForm.wp_excerpt)
            fData.append('wp_body',wForm.wp_body)
            fData.append('is_public',wForm.is_public)
            fData.append('wp_file_upload',wForm.wp_file_upload)
            fData.append('wp_img_url',wForm.wp_img_url)

            if(id && id !== 0){
                url = `/api/admin/whatup/${id}`
                fData.append("_method","PUT")
            }
            
            axios.post(url,fData)
                .then(res => {
                    res_status.value = res.data.msg
                    setTimeout(() =>{
                        wForm.reset()
                        res_status.value = ''
                        context.emit('getWhatup')
                    },3200)
                })
                .catch(err => {
                    res_status.value = `<span class="has-text-danger 
                    has-text-weight-bold">${Object.values(err
                        .response.data.errors).join()}</span>`
                    nextTick(() => {
                        wTitleRef.value.focus()
                    })
                })
            
        }



        const reset_error = () =>{
            is_has_error.value = false 
            is_error_msg.value = ''
            res_status.value = ''
        }

        const copyMeRef = ref(null)

        const copyToClipboard = () => {
            //console.log(copyMeRef.value.value)
            copyMeRef.value.select()
            document.execCommand('copy')
        }

        return{
            wForm,
            select_preview,
            res_status,
            options,
            url_preview,
            photo,
            is_has_error,
            is_error_msg,
            reset_error,
            cover_file,
            post,
            edit_id,
            copyToClipboard,
            copyMeRef,
            wTitleRef,
        }
    }
}
*/

</script>
