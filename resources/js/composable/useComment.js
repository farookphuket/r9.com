
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import axios from 'axios'

import {useCookies} from 'vue3-cookies'

export default function useComment(){

const {cookies} = useCookies()
const route = useRoute()

const comments = ref('')
const comment_post = ref('')
const postId = ref('')
const perpage = ref('')
const pageSlug = ref('')

    const getComments = async (page) => {
        let url = ''
        if(page){
            url = `${page}&perpage=${perpage.value}`
            cookies.set('comment_old_page',url)
        }
        url = cookies.get('comment_old_page')
        if(!url) url = `/api/comment?perpage=${perpage.value}`
        let res = await axios.get(url)
        comments.value = res.data.comment

    }
    const getPostComments = async (page) => {
        let url = ''
        pageSlug.value = route.params.slug
        if(page){
            url = `${page}&perpage=${perpage.value}&post_slug=${pageSlug.value}`
            cookies.set('pcomment_old_page',url)
        }
        url = cookies.get('pcomment_old_page')
        if(!url) url = `/api/get-post-comment?perpage=${perpage.value}&post_slug=${pageSlug.value}`
        let res = await axios.get(url)
        comment_post.value = res.data.comment
        //console.log(res)
    }

    return{
        getComments,
        comments,
        getPostComments,
        comment_post,
        postId,
        perpage,
        pageSlug
    }
}
