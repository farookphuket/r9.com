<template>
    <div class="container">
        <div class="modal" 
            :class="isActive?'is-active':''">
          <div class="modal-background"></div>
          <div class="modal-content">
            <!-- Any other Bulma elements you want -->
            <div class="box">

            <div class="mb-2 pb-4 p-2">
                <form action="">
                    <div class="field">
                        <label class="label" for="">password 
                            <span class="has-text-info 
                                has-text-weight-bold">
                                please enter your current password  hit enter 
                                to confirm.
                            </span>
                        </label>
                        <div class="control">
                            <input 
                                v-model="pForm.password_confirm" 
                             class="input" ref="pConfRef"
                            type="password" placeholder="~~~~" 
                            @keypress.enter.prevent="userHasConfirm">
                        </div>
                    </div>
                    <nav class="level">
                        <div class="level-left">
                            <p class="level-item" 
                                v-html="res_status">

                            </p>
                        </div>
                        <div class="level-right">
                            <p class="level-item">
                                <button class="button is-outlined is-primary 
                                    is-small is-rounded" 
                                    type="submit" 
                                    @click.prevent="userHasConfirm">
                                    <font-awesome-icon 
                                        icon="check"></font-awesome-icon>
                                </button>
                            </p>
                        </div>
                    </nav>
                </form>
            </div>
            </div>

          </div>
          <button class="modal-close is-large" aria-label="close" 
              @click="$emit('close')"></button>
        </div>
    </div>
</template>
<script setup>
import {ref,reactive,watchEffect} from 'vue'

import {useCookies} from 'vue3-cookies'

const {cookies} = useCookies()

import Form from '../../../core/Form.js'


const emit = defineEmits(["close"])
const prop = defineProps(["isActive"])

const pForm = reactive(new Form({
    password_confirm:''
}))

const pConfRef = ref('')
const uConf = ref('')
const res_status = ref('')



const isModalShow = watchEffect(() => {
    if(prop.isActive === 'is-active'){
        setTimeout(() => {
            pConfRef.value.focus()
        },1500)
    }
})

const userHasConfirm = async () => {
    try{
        let url = `/api/member/user-confirm`
        let res = await axios.post(url,{...pForm})
        res_status.value = res.data.msg
        if(res.data.res === 1){
            uConf.value = cookies.set("USER_HAS_CONFIRMED",true)
           emit('close') 
        }
    }catch(err){
        res_status.value = `<span class="has-text-danger has-text-weight-bold">
            ${Object.values(err.response.data.errors).join()}</span>`
    }
}

</script>
