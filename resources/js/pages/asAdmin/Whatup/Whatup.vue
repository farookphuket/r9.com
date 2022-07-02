<template>
    <div class="post-thumbnail">

        <whatup-form 
            :editId="editId" 
            @getWhatup="getWhatup($event)"></whatup-form>

        <whatup-list 
            :whatup="whatup" 
            @edit="edit($event)" 
            @del="del($event)" 
            @getWhatup="getWhatup($event)"
            ></whatup-list>


    </div>
</template>
<script setup>
import WhatupForm from './WhatupForm.vue'
import WhatupList from '../Whatup/WhatupList.vue'

import {ref,onMounted} from 'vue'

import {useCookies} from 'vue3-cookies'

import useWhatup from '../../../composable/useWhatup.js'

const {cookies} = useCookies()

const {perpage,whatup,getWhatup} = useWhatup()

const editId = ref(0)

/*
const getWhatup = async (page) => {
    let url = ''
    if(page){
        url = `${page}&perpage=${perpage.value}`
        cookies.set('aw_old_page',url)
    }
    url = cookies.get('aw_old_page') 
    if(!url) url = `/api/whatup?perpage=${perpage.value}`

    let res = await axios.get(url)
    whatup.value = res.data.whatup
}
*/

const wp = async (page) => {
    perpage.value = 36 
    await getWhatup(page)
}

onMounted(() => {
    wp()
})

const edit = (id) => {
    editId.value = id
}



const del = (id) =>{
    if(id && id !== 0){
        if(confirm(`will delete id ${id}`) === true){
            let url = `/api/admin/whatup/${id}`
            axios.delete(url)
                .then(res=>{
                    let rData = res.data.msg
                    alert(rData)
                    setTimeout(() =>{
                       getWhatup() 
                    },1500)
                })
        }
        return
    }
}


/*
export default{
    name:"Whatup",
    components:{
        WhatupForm,
        WhatupList,
    },
    setup(props,context){
        const {getWhatup,whatup,resMsg,perpage} = useWhatup()

        // edit id 
        const editId = ref(0)


        onMounted(() =>{
            getWhatup()
        })




        const edit = (id) => {
            if(id && id !== 0){
                editId.value = id
            }
        }
        const del = (id) =>{
            if(id && id !== 0){
                if(confirm(`will delete id ${id}`) === true){
                    let url = `/api/admin/whatup/${id}`
                    axios.delete(url)
                        .then(res=>{
                            let rData = res.data.msg
                            alert(rData)
                            setTimeout(() =>{
                               getWhatup() 
                            },1500)
                        })
                }
                return
            }
        }
        return{
            getWhatup,
            whatup,
            resMsg,
            edit,
            editId,
            del,
        }
    }
}
*/

</script>
