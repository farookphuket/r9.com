<template>
    <div class="container">
        <p class="title">
            Activation
        </p>
        <p v-html="res_status"></p>
    </div>
</template>
<script setup>
import {useRoute,useRouter} from 'vue-router'
import {ref,onMounted} from 'vue'

const route = useRoute()
onMounted(() => {
    //console.log(route.params.token)
    getActive()
})

const res_status = ref('')

const getActive = async () => {
    let url = `/api/activate-user/${route.params.token}`
    let res = await axios.get(url)
    res_status.value = res.data.msg
    //console.log(res)
}


</script>
