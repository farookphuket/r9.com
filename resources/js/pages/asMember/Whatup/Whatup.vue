<template>
    <div class="post-thumbnail">
        <div class="pb-4 mb-6">
            <div class="field is-pulled-right" 
                v-if="editId === 0">
                <button class="button is-primary is-rounded is-outlined" 
                    @click.prevent="formIsShow = true" 
                    v-if="formIsShow !== true">
                    <font-awesome-icon 
                        icon="plus"></font-awesome-icon>
                    <span class="is-uppercase">
                        show form
                    </span>
                </button>
                <button class="button is-danger is-rounded is-outlined" 
                    @click.prevent="formIsShow = false" 
                    v-else>
                    <font-awesome-icon 
                        icon="eye-slash"></font-awesome-icon>
                    <span class="is-uppercase">
                        close
                    </span>
                </button>
            </div>
        </div>
        <hr class="mb-4">
        
        <whatup-form 
            :editId="editId" 
            @getWhatup="getWhatup($event)" 
            @formCancel="formCancel($event)"
            v-if="formIsShow === true"></whatup-form>

        <whatup-list 
            :whatup="whatup" 
            @edit="edit($event)" 
            @del="del($event)" 
            @getWhatup="getWhatup($event)" 
            @open="open($event)"
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

const editId = ref(0)

const {whatup,getWhatup,perpage} = useWhatup()

const formIsShow = ref(false)


const wP = async (page) => {
    perpage.value = 30
    await getWhatup(page)
}

/*
const whatup = ref('')

const perpage = ref(6)

const getWhatup = async (page) => {
    let url = ''
    if(page){
        url = `${page}&perpage=${perpage.value}`
        cookies.set('mwhat_old_page',url)
    }
    url = cookies.get('mwhat_old_page')
    if(!url) url = `/api/whatup?perpage=${perpage.value}`

    let res = await axios.get(url)
    whatup.value = res.data.whatup

}

*/

const edit = (id) => {
    editId.value = id
    formIsShow.value = true
}

const formCancel = () => {
    editId.value = 0
    formIsShow.value = false 

}

const open =  (id) => {
    let url = `/whatup/${id}`
    location.href=url
}

const del = (id) =>{
    if(id && id !== 0){
        if(confirm(`will delete id ${id}`) === true){
            let url = `/api/member/whatup/${id}`
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




onMounted(() => {
   wP() 

})

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
