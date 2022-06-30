
import {ref} from 'vue'
import axios from 'axios'
import {useCookies} from 'vue3-cookies'




export default function useUser(){
    const {cookies} = useCookies()

    const perpage = ref('')
    const users = ref('')


    const friends = ref('')
    const getAllFriends = async (page) => {
        let url = ''

        if(page){
            url = `${page}&perpage=${perpage.value}`
            cookies.set('fd_old_page',url)
        }
        url = cookies.get('fd_old_page')
        if(!url) url = `/api/your-friends?perpage=${perpage.value}`
        let res = await axios.get(url)
        friends.value = res.data.users
    }

    return{
        perpage,
        users,
        friends,
        getAllFriends,
    }
}
