<template>
    <div>
       <form action="" class="is-mobile p-4">
            <div class="field">
                <div class="control">
                    <label class="label" for="">Email</label>
                    <input v-model="lForm.email" class="input" type="email" 
                    ref="emailRef" placeholder="Email....">
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <label class="label" for="">Password</label>
                    <input v-model="lForm.password" class="input" type="password" 
                    name="" placeholder="~~~~">
                </div>
            </div>
            <div class="mt-4 pt-4 mb-4 pb-4">
                <div class="columns is-mobile">
                    <div class="column">
                        <div v-html="res_status"></div>
                    </div>

                    <div class="column">
                        <div class="field is-pulled-right">
                            <button class="button is-primary is-rounded 
                                is-outlined" 
                                type="submit"
                                @click.prevent="goLogin">
                                login
                            </button>
                        </div>
                    </div>

                </div>
            </div>
       </form>
    </div>
</template>
<script setup>
import {ref,reactive,nextTick} from 'vue'
import useUser from '../composable/useUser.js'
import {useCookies} from 'vue3-cookies'

import Form from "../core/Form.js"

const {cookies} = useCookies()

const emailRef = ref('')

const lForm = reactive(new Form({
    email:'',
    password:''
}))

const res_status = ref('')
const token = ref('')

const goLogin = async () => {
    try{
        let url = `/api/login`
        let res = await axios.post(url,{...lForm})
        let rData = await res.data 
        res_status.value = rData.msg
        token.value = rData.token


        if(token.value !== ''){
            cookies.set('token',token.value)
        }
        //console.log(rData)
        setTimeout(() => {
            location.href=rData.url
        },2300)

    }catch(err){
        res_status.value = `<span class="has-text-danger has-text-weight-bold">
            ${Object.values(err.response.data.errors).join()}</span>`
        setTimeout(() => {
            nextTick(() => {
                emailRef.value.focus()
            })
        },800)
    }

}


/*
export default{
    name:'LoginForm',
    setup(){
        const lForm = reactive(new Form({
            email:'',
            password:''
        }))

        const res_status = ref('')
        const res_url = ref('')

        const {cookies} = useCookies()
        const token = ref('')

        const goLogin = ()=>{
            let url = `/api/login`
            axios.post(url,{...lForm})
                .then(res=>{
                    //console.log(res)
                    res_status.value = res.data.msg
                    res_url.value = res.data.url
                    token.value = res.data.token 

                    if(token.value !== ''){
                        cookies.set('token',token.value)
                    }
                    setTimeout(()=>{
                        location.href=res_url.value
                    },2500)
                })
                .catch(err=>{
                    res_status.value = `<span class="has-text-danger 
                    has-text-weight-bold">${Object.values(err
                            .response.data.errors).join()}</span>`

                })


        }

        return{
            lForm,
            goLogin,
            res_status,
            res_url,
            cookies,
            token,
        }
    }
}
*/
</script>
