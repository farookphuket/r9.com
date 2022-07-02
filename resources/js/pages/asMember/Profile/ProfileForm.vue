<template>
    <div class="pt-4 mb-4 pb-4">
        <form action="">
            <div class="field">
                <div class="control">
                    <label class="label" for="">Name</label>
                    <input v-model="uForm.name" 
                    class="input" type="text" 
                    placeholder="Your name...">
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <label class="label" for="">email</label>
                    <input v-model="uForm.email" 
                    class="input" type="text" 
                    placeholder="Your name...">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <label class="label" for="">new password 
                        <span class="has-text-danger">if you do not want to 
                            change password just leave this field blank!

                        </span>
                    </label>
                    <input v-model="uForm.password" 
                    class="input" type="text" 
                    placeholder="~~~~">
                </div>
            </div>
            <div class="mt-4 pt-4 mb-4 pb-4">
                <nav class="level">
                    <div class="level-left">
                        <div class="level-item" v-html="res_status"></div>
                    </div>
                    <div class="level-right">
                        <button class="button is-primary is-outlined 
                            is-rounded" 
                            type="submit" 
                            @click.prevent="saveChange(user_id)">
                            <font-awesome-icon 
                                icon="check"></font-awesome-icon>
                        </button>
                    </div>
                </nav>
            </div>
        </form>
    </div>
</template>
<script setup>

import {ref,reactive,watchEffect} from 'vue'

import Form from "../../../core/Form.js"
import {useCookies} from 'vue3-cookies'

const prop = defineProps(["profile"])
const emit = defineEmits(["userHasConfirm","uU"])
const {cookies} = useCookies()
const uForm = reactive(new Form({
    name:'',
    email:'',
    password:''
}))

const user_id = ref('')
const res_status = ref('')

const edit = watchEffect(() => {
//    console.log(prop.profile)
    let fF = prop.profile
    uForm.name = fF.name
    uForm.email = fF.email
    user_id.value = fF.id
})

const saveChange = async (id) => {

        try{
            let url = `/api/member/profile/${id}`
            let fData = new FormData()
            fData.append("name",uForm.name)
            fData.append("email",uForm.email)
            fData.append("password",uForm.password)
            fData.append("_method","PUT")

            // check if user has confirm his password 
            if(cookies.get("USER_HAS_CONFIRMED")){
                let res = await axios.post(url,fData)
                res_status.value = res.data.msg

                setTimeout(() => {
                    res_status.value = ''
                    emit('uU')
                },2300)
            }else{
                // if not then show form input then return
                emit('userHasConfirm')
                return
            }


        }catch(err){
            res_status.value = `<span class="has-text-danger has-text-weight-bold">
                ${Object.values(err.response.data.errors).join()}</span>`
        }
    



}



</script>
