<template>
    <div class="container">
        <div class="post-thumbnail">


            <!-- level START -->
            <nav class="level">
                <div class="level-left">
                    <div class="content">
                        <p class="title">
                            Login page
                        </p>
                        <div class="box">
                            <p>
                                this web site did not require you to login or 
                                create account unless you want to.
                            </p>
                        </div>
                    </div>

                    <div class="level-right">
                        <div class="level-item">
                            <login-form></login-form>

                        </div>

                    </div>


                </div>
            </nav>
            <!-- level END -->
        </div>

    </div>
</template>
<script setup>

import LoginForm from '../../components/LoginForm.vue'

import {ref,reactive,onMounted,inject} from 'vue'

import {useCookies} from 'vue3-cookies'



/*

export default{
    name:"Login",
    components:{
        LoginForm,
    },
    setup(){

        onMounted(()=>{
            reToken()
        })
        const cookies = useCookies()

        const reToken = () =>{

        }

        const msg = ref('')
        return{
            msg,
            reToken,
        }
    }
}
*/
</script>

