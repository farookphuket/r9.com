<template>

    <div class="container">
        <p class="title">User</p>
        <div class=" mb-6 pb-4">
            <div class="field is-pulled-right">
                <button class="button is-primary is-rounded is-outlined" 
                    v-if="isFormShow === false" 
                    @click.prevent="isFormShow = true">
                    <font-awesome-icon 
                        icon="plus"></font-awesome-icon>
                </button>
                <button 
                    class="button is-danger is-outlined is-rounded"
                    @click.prevent="isFormShow = false" v-else>
                    <font-awesome-icon 
                        icon="circle-xmark"></font-awesome-icon>
                </button>
            </div>
        </div>
        <user-form 
            v-if="isFormShow !== false" 
            @getUsers="getUsers($event)" 
            :editId="editId" 
            :role_list="roles" 
            @closeForm="closeForm($event)"></user-form>

        <user-list :user_list="users" 
            @edit="edit($event)" 
            @del="del($event)" 
            @getUsers="getUsers($event)"
            ></user-list>
    </div>
</template>
<script setup>

import {ref,onMounted} from "vue"
import UserForm from './UserForm.vue'
import UserList from './UserList.vue'

import useUser from "../../../composable/useUser.js"

const {getUsers,users,perpage,roles} =  useUser()

const isFormShow = ref(false)
const editId = ref(0)

const uU = async (page) => {
    perpage.value = 3 
    await getUsers(page)

}

onMounted(() => {
    uU()
})

const edit = (id) => {
    editId.value = id 
    isFormShow.value = true
}

const del = async (id) => {
    alert(`the id is ${id}`)
}

const closeForm = () => {
    editId.value = 0
    isFormShow.value = false
    uU()
}

</script>
