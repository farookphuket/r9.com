<template>
    <div class="container">
        <p class="title">register</p>
        <div class="box">
            <form action="">
                <div class="field">
                    <div class="control">
                        <input v-model="rForm.name" 
                        class="input" type="text" 
                        placeholder="Name...">
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <input v-model="rForm.email" 
                        class="input" type="email" 
                        placeholder="E-mail...">
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <input v-model="rForm.password" 
                        class="input" type="password" 
                        placeholder="~~~~">
                    </div>
                </div>
                <nav class="level">
                    <div class="level-left">
                        <div v-html="res_status"></div>
                    </div>
                    <div class="level-right">
                        <button class="button is-primary is-outlined 
                            is-rounded" 
                            type="submit" 
                            @click.prevent="register">
                            <font-awesome-icon 
                                icon="check"></font-awesome-icon>
                        </button>
                    </div>
                </nav>
            </form>
        </div>
    </div>
</template>
<script setup>
import {ref,reactive} from 'vue'
import Form from '../../../js/core/Form.js'

const rForm = reactive(new Form({
    name:'',
    email:'',
    password:''
}))

const res_status = ref('')
const register = async () => {
    try{

        let url = `/api/register`
        let res = await axios.post(url,{...rForm})
        res_status.value = res.data.msg
    }catch(err){
        res_status.value = `<span class="has-text-danger has-text-weight-bold">
            ${Object.values(err.response.data.errors).join()}</span>`
    }

}
</script>
