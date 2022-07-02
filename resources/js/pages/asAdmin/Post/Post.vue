<template>
    <div class="container">
        <div class="mb-4 mt-4 pb-6">
            <div class="field is-pulled-right">
                <button class="button is-primary is-outlined 
                    is-rounded" 
                    @click.prevent="showPostForm = true" 
                    v-if="showPostForm === false">
                    <font-awesome-icon 
                        icon="plus"></font-awesome-icon>
                    <span class="ml-2 is-uppercase">new post</span>
                </button>
                <button class="button is-danger is-rounded 
                    is-outlined" 
                    @click.prevent="showPostForm = false"
                    v-else>
                    <font-awesome-icon 
                        icon="window-close"></font-awesome-icon>
                    <span class="ml-2 is-uppercase">close</span>
                </button>
            </div>
        </div>

        <post-form v-if="showPostForm === true" 
            :editId="editId" 
            @getPost="getPost($event)"></post-form>

        <post-list :postList="postList" 
            @edit="edit($event)" 
            @del="del($event)" 
            @openMe="openMe($event)" 
            @getPost="getPost($event)"></post-list>
    </div>
</template>
<script setup>
    import {ref,onMounted} from 'vue'

    // usePost 
    import usePost from '../../../composable/usePost.js'
    // post list 
    import PostList from './PostList.vue'

    // post form
    import PostForm from '../Post/PostForm.vue'

    const {postList,perpage,getPost} = usePost()

    const showPostForm = ref(false)

    onMounted(() =>{
        gP()
    })


// get the post list 
const gP = async (page) =>{
    perpage.value = 3
    await getPost(page)

}

    const editId = ref(0)

    const edit = (id) =>{
        showPostForm.value = true
        editId.value = id
    }

    const del = (id) => {
        if(id && id !== 0){
            if(confirm(`will delete post id ${id}`) === true){
                let url = `/api/admin/post/${id}`
                axios.delete(url)
                    .then(res => {
                        setTimeout(() => {
                            getPost()
                        },2500)
                    })
            }
            return
        }
    }

    const openMe = (slug) => {
        let url = `/${slug}`
        location.href=url
    }

</script>
