<template>
    <div class="pt-4 mb-4">
        <form action="">

            <div class="field">
                <div class="control">
                    <input v-model="uForm.name" 
                    class="input" type="text" 
                                  ref="nameRef"
                    placeholder="Enter your name...">
                </div>
            </div>


            <div class="field">
                <div class="control">
                    <input v-model="uForm.email" 
                    class="input" type="text" 
                    placeholder="Enter your email...">
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <input v-model="uForm.password" 
                    class="input" type="password" 
                    placeholder="~~~~">
                </div>
            </div>

            <!-- roles,status START -->
            <div class="mt-4 pt-4 pl-2 pr-2">
                <nav class="level">
                    <div class="level-left">
                        <div class="field">
                            <label for="" class="checkbox" 
                                v-for="ro in role_list" :key="ro.id">
                                <input  
                                ref="roleRef" 
                                v-model="uForm.role" 
                                :value="ro.id"
                                type="checkbox" name="" 
                                >
                                <span class="mr-4 ml-2">{{ro.role_name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="field">
                            <label class="checkbox" for="">
                                <input v-model="uForm.verified" 
                                type="checkbox" name="">
                                <span class="ml-2">verified user</span>
                            </label>
                        </div>
                    </div>
                </nav>

            </div>
            <!-- roles,verify status END -->
            <!-- button ,process status START -->
            <div class="pt-4 mb-4 pb-4 pr-4 pl-4">
                <nav class="level">
                    <div class="level-left">
                        <div v-html="res_status"></div>
                    </div>
                    <div class="level-right">
                        <div class="field">
                            <button class="button is-primary is-outlined 
                                is-rounded" 
                                @click.prevent="save(editId)">
                                <font-awesome-icon 
                                    icon="check"></font-awesome-icon>
                            </button>
                            <button class="button is-danger is-rounded 
                                is-outlined">
                                <font-awesome-icon 
                                    icon="circle-xmark"></font-awesome-icon>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
            <!-- button ,process status END -->
        </form>
    </div>
</template>
<script setup>

import {ref,reactive,watchEffect,nextTick} from "vue"
import Form from "../../../core/Form.js"
import useUser from '../../../composable/useUser.js'

const uForm = reactive(new Form({
    name:'',
    email:'',
    password:'',
    role:[],
    verified:''
}))

const photo = ref('')
const nameRef = ref('')
const roleRef = ref('')
const res_status = ref('')

const prop = defineProps(["editId","role_list"])
const emit = defineEmits(["closeForm"])

const {singleUser,getSingleUser} = useUser()

const edit = watchEffect(async () => {
    if(prop.editId === 0) return

    setTimeout(() => {
        nextTick(() => {
            nameRef.value.focus()
        })
    },1500)

    // role set empty
    uForm.role = []
    uForm.verified = false

    await getSingleUser(prop.editId)
    let res = await singleUser._rawValue
    let ro = res.role
    ro.map((rr) => {
        if(rr.pivot.user_id === res.id){
            uForm.role.push(rr.id)
        }
    })
    if(res.email_verified_at !== null){
        uForm.verified = true
    }
    uForm.name = res.name
    uForm.email = res.email
    console.log(res)
})

const save = async (id) => {
    let url = `/api/admin/user`
    let role = uForm.role
    let fData = new FormData()
    fData.append("name",uForm.name)
    fData.append("email",uForm.email)
    fData.append("password",uForm.password)
    
    let verify = 0 
    if(uForm.verified === true){
        verify = 1
    }

    fData.append("verified",verify)

    // test the attach method
    role.forEach((ro) => {
        fData.append("roles[]",ro)
    })

    if(id && id !== 0){
        url = `/api/admin/user/${id}`
        fData.append("_method","PUT")
    }

    try{
        let res = await axios.post(url,fData)
        //console.log(res)
        res_status.value = res.data.msg
        setTimeout(() => {
            res_status.value = ''
            emit("closeForm")
        },2300)
    }catch(err){
        res_status.value = `<span class="has-text-danger has-text-weight-bold">
            ${Object.values(err.response.data.errors).join()}</span>`
    }
}
</script>
