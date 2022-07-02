
import {ref} from 'vue'
import axios from 'axios'
import {useCookies} from "vue3-cookies"



export default function usePost(){

    const postList = ref('')
    const {cookies} = useCookies()
    const perpage = ref('')
    // get post 
    const getPost = async(page) =>{
//        alert('has call')
        let url = ''
        if(perpage.value === '') perpage.value = 15
        if(page){
            url = `${page}&perpage=${perpage.value}`
            cookies.set('old_post_page',url)
        }
        url = cookies.get('old_post_page')
        if(!url) url = `/api/post?perpage=${perpage.value}`

        let res = await axios.get(url)

        postList.value = res.data.post
        /*
        axios.get(url)
            .then(res=>{
                postList.value = res.data.post
            })
            */
    }


    return{
        getPost,
        postList,
        perpage,
    }
}
