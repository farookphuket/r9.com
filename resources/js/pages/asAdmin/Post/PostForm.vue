<template>
    <div class="pt-4 pb-4 mb-4">
        <form action="">

            <!-- title START -->
            <div class="field">
                <div class="control has-icons-right">
                    <span class="icon is-right">
                        {{pForm.title.length}}
                    </span>
                    <input v-model="pForm.title" 
                    class="input" type="text" 
                    ref="titleRef"
                    placeholder="Enter title...">
                </div>
                <div class="control pb-2 pt-2" v-if="pForm.title.length > 3">
                    <p class="has-text-success ">
                        <span class="mr-2 has-text-info has-text-weight-bold">
                            Slug
                        </span>
                        <span>
                            {{tSlug.thaiSlug(pForm.title)}}
                        </span>
                    </p>
                </div>
            </div>
            <!-- title END -->

            <!-- excerpt START -->
            <div class="field">
                <div class="control has-icons-right">
                    <span class="icon is-right">
                        {{pForm.excerpt.length}}
                    </span>
                    <textarea v-model="pForm.excerpt" class="textarea" 
                        placeholder="Excerpt for this post"></textarea>
                </div>
            </div>
            <!-- excerpt END -->

            <!-- post cover START -->
            <div class="pb-4 pt-4">
                <div class="columns is-mobile">
                    <div class="column">
                        <div class="file">
                          <label class="file-label">
                            <input class="file-input" type="file" 
                            ref="coverUploadRef" 
                            @change.prevent="showUploadPreview">
                            <span class="file-cta">
                              <span class="file-icon">
                                <i class="fas fa-upload"></i>
                              </span>
                              <span class="file-label">
                                Choose a file…
                              </span>
                            </span>
                            <span class="file-name">
                                {{photo.alt}}
                            </span>
                          </label>
                        </div>
                    </div><!-- end of div.column 1 -->

                    <div class="column">
                        <div class="field has-addons">
                            <div class="control ">
                                <input v-model="pForm.url_cover" class="input" 
                                type="text" 
                                placeholder="eg: http://see-southern.com/img/default_kob.jpg">
                            </div>
                            <div class="control">
                                <a class="button is-info is-uppercase" 
                                    @click.prevent="urlPreview">
                                    preview
                                </a>
                            </div>
                        </div>
                    </div>

                </div><!-- end of div.columns -->

                <!-- preview area START -->
                <div class="pb-4 pt-4 has-text-centered">
                    <figure>
                        <img :src="photo.src" :alt="photo.alt" 
                        style="max-width:340px;">
                    </figure>
                    <p class="has-text-danger has-text-weight-bold" 
                        v-if="file_is_too_big === true">
                        {{photo.alt}}
                    </p>
                </div>
                <!-- preview area END -->
            </div>
            <!-- post cover END -->

            <!-- body editor START -->
            <div class="field">
                <jodit-editor 
                    v-model="pForm.body" 
                    :editorOptions="options"
                    height=450></jodit-editor>
                <div class="control pt-4 mt-4 pb-4" 
                    v-if="isEditMode === true">
                    <p class="has-text-info">
                        if the edit content not show in the editor change the 
                        editor mode to code then copy the content from the 
                        below box into the editor. 
                    </p>
                    <textarea v-model="pForm.body" 
                        class="textarea" 
                        ref="bodyRef" 
                        @click.prevent="copyMe"
                        ></textarea>
                </div>
            </div>
            <!-- body editor END -->

            <!-- status,public,button START -->
            <div class="mt-4 pt-4 mb-4">
                <div class="columns is-mobile">
                    <div class="column">
                        <div v-html="res_status"></div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label for="" class="checkbox">
                                <input v-model="pForm.is_public" 
                                type="checkbox" name="">
                                <span>public</span>
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
                                is-rounded ml-2" 
                                @click.prevent="clearForm">
                                <font-awesome-icon  
                                    icon='trash'></font-awesome-icon>
                                <span class="ml-1 is-uppercase">
                                    clear & reload
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- status,button START -->

        </form>
    </div>
</template>
<script setup>

    import {ref,reactive,nextTick,onMounted,watchEffect} from 'vue'

    import sL from '../../../core/CustomText.js'

    // form
    const pForm = reactive(new Form({
        title:'',
        cover:'',
        slug:'',
        excerpt:'',
        body:'',
        is_public:'',
        upload_cover:'',
        url_cover:''
    }))

    const props = defineProps(["editId"])

    const emit = defineEmits(["getPost"])

    const isEditMode = ref(false)

    // make thai slug
    const tSlug = new CustomText()

    // edit data 
    const edit = watchEffect(() => {
        if(props.editId !== 0){
            isEditMode.value = true
            nextTick(() => {
                titleRef.value.focus()
            })
            let url = `/api/admin/post/${props.editId}/edit`
            axios.get(url)
                .then(res => {
                    let rData = res.data.post
                    pForm.title  = rData.title
                    pForm.excerpt  = rData.excerpt
                    pForm.body  = rData.body

                    // public
                    if(rData.is_public !== 0) pForm.is_public = true

                    // cover
                    photo.value = {
                        src:rData.cover,
                        alt:rData.title
                    }
                })
        }
    })

    // res status
    const res_status = ref('')

    // ref
    const titleRef = ref('')

    // jodit config 
    const options = {
        disablePlugins:"powered-by-jodit"
    }

    const photo = ref('')
    const file_is_too_big = ref(false)

    // mounted 
    onMounted(() => {
        photo.value = {
            alt:'select the file'
        }
    })

    // preview upload
    const showUploadPreview = (e) =>{
        photo.value = ''
        pForm.url_cover = ''
        file_is_too_big.value = false
        let theFile = e.target.files[0]
        let f_size = theFile.size/1024/1024
        let f_name = theFile.name

        if(f_size > 2){
            // file is too big
            photo.value = {
                src:'/img/file_is_too_big.jpeg',
                alt:'Error please select file less than 2 MB.'
            }
            file_is_too_big.value = true
        }else{
            photo.value = {
                src:URL.createObjectURL(theFile),
                alt:f_name
            }

            pForm.upload_cover = theFile
        }

    }

    // url preview
    const urlPreview = () => {
        photo.value = ''

        if(pForm.url_cover.length !== 0){
            photo.value = {
                src:pForm.url_cover,
                alt:pForm.title
            }
            return pForm.url_cover
        }

        
    }

    // clear form
    const clearForm = () => {
        pForm.reset()
        location.reload()
    }

    // copy to clipboard
    const bodyRef = ref('')
    const copyMe = () => {
        bodyRef.value.select()
        document.execCommand('copy')
    }

    // make post 
    const post = (id) => {
       // alert(`the id ${id}`)
        res_status.value = ''
        let url = `/api/admin/post`
        let fData = new FormData()

        fData.append('title',pForm.title)
        fData.append('excerpt',pForm.excerpt)
        fData.append('slug',tSlug.thaiSlug(pForm.title))
        fData.append('body',pForm.body)
        fData.append('is_public',pForm.is_public)

        fData.append('cover_upload',pForm.upload_cover)
        fData.append('cover_url',pForm.url_cover)

        if(id && id !== 0){
            url = `/api/admin/post/${id}`
            fData.append("_method","PUT")
        }

        axios.post(url,fData)
            .then(res=>{
                res_status.value = res.data.msg
                setTimeout(() =>{
                    res_status.value = ''
                    pForm.reset()
                    emit('getPost')
                },2300)
            })
            .catch(err =>{
                res_status.value = `<span class="has-text-danger 
                has-text-weight-bold">
${Object.values(err.response.data.errors).join()}
                </span>`
            })


    }
</script>
