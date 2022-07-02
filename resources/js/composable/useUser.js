
import {ref} from 'vue'
import axios from 'axios'

import {useCookies} from 'vue3-cookies'

export default function useUser(){

    const users = ref('')
    const friends = ref('')
    const roles = ref('')

    const singleUser = ref('')

    // profile 
    const profile = ref('')

    const {cookies} = useCookies()

    const perpage = ref(6)

    const getUsers = async (page)=>{
        let url = ''
        if(page){
            url = `${page}&perpage=${perpage.value}`
        }else{
            url = `/api/admin/user?perpage=${perpage.value}`
        }

        let res = await axios.get(url)
        users.value = res.data.users
        roles.value = res.data.roles
    }

    const getSingleUser = async (id) => {
        let url = `/api/admin/user/${id}`
        let res = await axios.get(url)
        singleUser.value = res.data.user
    }

    const getYourFriends = async (page)=>{
        let url = ''
        if(page){
            url = `${page}&perpage=${perpage.value}`
            cookies.set("friends_old_page",url)
        }

        url = cookies.get("friends_old_page")
        if(!url) url = `/api/your-friends?perpage=${perpage.value}`

        let res = await axios.get(url)
        friends.value = res.data.users
    }

    const getProfile = async () => {
        let url = `/api/member/profile`
        let res = await axios.get(url)
        profile.value = res.data.user
    }

    return{
        users,
        getUsers,
        getYourFriends,
        friends,
        getSingleUser,
        singleUser,
        perpage,
        roles,
        profile,
        getProfile
    }
}
