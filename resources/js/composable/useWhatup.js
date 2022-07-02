import {ref} from 'vue'
import axios from 'axios'

import {useCookies} from 'vue3-cookies'




export default function useWhatup(){

    const {cookies} = useCookies()

    const perpage = ref('')

    const whatup = ref('')
    const whatupSingle = ref('')

    const getWhatup = async (page) => {
        let url = ''

        if(page){
            url = `${page}&perpage=${perpage.value}`
            cookies.set('wp_old_page',url)
        }
        url = cookies.get('wp_old_page')
        if(!url) url = `/api/whatup?perpage=${perpage.value}`
        let res = await axios.get(url)
        whatup.value = res.data.whatup
    }

    const getWhatupSingle = async (id) => {
        let url = `/api/whatup/${id}`
        let res = await axios.get(url)
        whatupSingle.value = res.data.whatup
    }

    return{
        perpage,
        whatup,
        getWhatup,
        getWhatupSingle,
        whatupSingle
    }
}

