<template>
    <div class="container">
        <div v-if="about !== null">
            <p class="title">{{about.title}}</p>

            <!-- if root show edit button START -->
            <div class="mt-4 mb-4" 
                v-if="root">
                <div class="field is-pulled-right">
                    <button class="button is-primary is-rounded 
                        is-outlined" 
                        @click.prevent="edit(about.id)">
                        <font-awesome-icon 
                            icon="edit"></font-awesome-icon>
                    </button>
                </div>
            </div>
            <!-- if root show edit button END -->

            <div class="pt-4 pb-4" 
                v-html="about.body"></div>
        </div>
        <div class="content" v-else>

            <!-- you can just delete this START -->
            <about-farook 
                v-if="ab_count === 0"></about-farook>
            <!-- you can just delete this END -->
        </div>

        <!-- only if the user is root START -->
        <div class="pb-4 pt-2" 
            v-if="root === true">
            <div class="field is-pulled-right">
                <button class="button is-primary is-outlined is-rounded" 
                    @click.prevent="showForm = true"
                    v-if="showForm === false">
                    open edit
                </button>
                <button class="button is-danger is-rounded is-outlined" 
                    @click.prevent="showForm = false"
                    v-else>
                    close
                </button>
            </div>
        </div>
        <div class="pt-4 mt-4 mb-4 pb-4"
            v-if="showForm === true">
            <about-form 
                :editId="editId" 
                @getAbout="getAbout($event)"></about-form>
        </div>
        <!-- only if the user is root END -->


    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'

import AboutForm from './About/AboutForm.vue'
import AboutFarook from './AboutFarook.vue'


const about = ref('')

const ab_count = ref(0)

const root = window.lsDefault.is_root

const showForm = ref(false)

const editId = ref(0)

onMounted(() => {
    getAbout()
})
const getAbout = async () => {
    showForm.value = false
    editId.value = 0
    let url = `/api/about-us`
    let res = await axios.get(url)
    let rData = await res.data.about
    about.value = rData
    if(rData !== null) ab_count.value = Object.values(rData).length
//    console.log(res)
}

const edit = (id) => {
    showForm.value = true
    editId.value = id

}
</script>
