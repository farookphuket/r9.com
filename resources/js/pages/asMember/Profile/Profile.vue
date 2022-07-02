<template>
    <div class="container">
        <profile-form 
            :profile="profile" 
            @uU="uU($event)"
            @userHasConfirm="userHasConfirm($event)"></profile-form>

        <div class="content">
            <p class="title has-text-centered has-text-danger pt-4">
                Danger Zone.
            </p>
            <div class="box">
                <p>
                    if you delete your profile account you will be no longer 
                    see your post,comment,photo at all! please make sure 
                    you have backup your data.
                </p>
                <div class="pt-4 mb-4 pb-4">
                    <div class="field is-pulled-right">
                        <button class="button is-danger is-outlined 
                            is-rounded" 
                            v-if="isAdmin === false" 
                            @click.prevent="delAccount">
                            <font-awesome-icon 
                                icon="trash"></font-awesome-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--modal START --> 
        <password-confirm 
            :isActive="isActive"
            @close="close($event)"></password-confirm>
        <!--modal END --> 
    </div>
</template>
<script setup>

import {ref,onMounted} from 'vue'
import ProfileForm from './ProfileForm.vue'
import useUser from '../../../composable/useUser.js'
import {useCookies} from 'vue3-cookies'

import passwordConfirm from "./passwordConfirm.vue"

const {profile,getProfile} = useUser()

const pf = ref('')
const {cookies} = useCookies()

const isAdmin = ref(false)

const uU = async () => {
    await getProfile()

    let ia = await profile._rawValue
    if(ia.is_admin !== 0){
        isAdmin.value = true
    }
}

const isActive = ref(false)

const token = ref('')

const userHasConfirm = () =>{
    if(!cookies.get("USER_HAS_CONFIRMED")){
        isActive.value = 'is-active' 
        return false
    }
    close()
    return true
}

const close = () => {
    isActive.value = ''
}

const delAccount = () => {
    if(userHasConfirm() || cookies.get("USER_HAS_CONFIRMED") === true){
        alert('ok')
    }
    
}
onMounted(() => {
    uU()
})
</script>
