<template>
    <div class="container">
        <p class="title">test bulma css</p>
        <div class="box">
            <p class="has-text-info">
                bulma is now working.
            </p>
        </div>
        <p class="title">test JoditEditor</p>
        <div class="content">
            <div class="box">
                <div class="field">
                    <div class="control">
                        <jodit-editor 
                            v-model="body" 
                            height=450 
                            :editorOptions="options"></jodit-editor>
                    </div>
                </div>
            </div>
        </div>
        <p class="title">test font awesome icon</p>
        <p>
            this is home 
            <span class="mr-4">
                <font-awesome-icon 
                    icon="house"></font-awesome-icon>
            </span>
            <span>
                this is trash 
            </span>
            <span class="ml-2">
                <font-awesome-icon icon="trash"></font-awesome-icon>
            </span>
        </p>

    </div>
</template>
<script setup>
import {ref} from 'vue'
const body = ref('this is the body')
const options = {
 disablePlugins:'powered-by-jodit'
}
</script>
