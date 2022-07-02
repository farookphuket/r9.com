<template>
    <div class="wrapper">

        <member-nav v-if="is_login === true && is_member === true"></member-nav>
        <admin-nav v-else-if="is_login === true && is_root === true"></admin-nav>
        <pub-nav 
            :is_root="is_root" 
            :is_member="is_member" 
            :is_login="is_login" 
            v-else></pub-nav>
        <main>

            <member-view v-if="is_login !== false && is_member === true"></member-view>
            <admin-view v-else-if="is_root === true && is_login === true"></admin-view>
            <pub-view v-else></pub-view>
        </main>

        <footer class="footer">
          <div class="content has-text-centered">
            <p>
                <strong>{{host_name}}</strong> has develop by using 
                "free source code" from 
                <span class="has-text-info has-text-weight-bold 
                mr-2 ml-2 " 
                      v-for="so in sourceCodeList" 
                      :key="so.id">{{so.name}}</span>


            </p>
            <visitor></visitor>
          </div>
        </footer>
    </div>

</template>

<script setup>
import {ref,onMounted} from 'vue'
import Visitor from './components/Visitor.vue'
import PubView from './components/PubView.vue'
import PubNav from './components/PubNav.vue'


import MemberView from './components/MemberView.vue'
import MemberNav from './components/MemberNav.vue'

import AdminView from './components/AdminView.vue'
import AdminNav from './components/AdminNav.vue'

import {useCookies} from 'vue3-cookies'
const {cookies} = useCookies()

const is_login = ref(false)
const is_root = ref(false)
const is_member = ref(false)


onMounted(() => {
    isUserHasLogin()
})

const isUserHasLogin = async () => {
    let token = cookies.get('token')
    if(token !== null){
        /*
        is_login.value = window.lsDefault.USER_IS_LOGIN
        is_member.value = window.lsDefault.is_member
        is_root.value = window.lsDefault.is_root
        */
        let res = ''
        let is_has_passport = ''
        try{
            let url = `/api/user-has-passport`
            res = await axios.get(url)
            is_has_passport = await res.data.has_passport
            is_login.value = window.lsDefault.USER_IS_LOGIN
            is_member.value = window.lsDefault.is_member
            is_root.value = window.lsDefault.is_root
            //console.log(res.data.has_passport)
            if(!is_has_passport){
                is_login.value = false
                is_member.value = false
                is_root.value = false
                // remove cookies 
                cookies.remove(token)
            }
            
        }catch(err){
            console.log(err)
            if(err.message){
                //console.log(err)
                is_login.value = false
                is_member.value = false
                is_root.value = false
                // remove cookies 
                cookies.remove(token)
            }
        }
    }

}





const host_name = window.location.host
const sourceCodeList = [
    {
        id:1,
        name:"Laravel"
    },

    {
        id:2,
        name:"Bulma css"
    },

    {
        id:3,
        name:"Vue 3"
    },
]
</script>
