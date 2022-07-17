<template>
    <div class="modal" 
        :class="isActive?'is-active':''">
      <div class="modal-background"></div>
      <div class="modal-content">
        <!-- Any other Bulma elements you want -->
        <div v-html="body" 
            class="box"></div>
      </div>
      <button class="modal-close is-large" aria-label="close" 
          @click="$emit('close')"></button>
    </div>

</template>
<script setup>
import {ref} from 'vue'

const prop = defineProps(["body","isActive"])
const emit = defineEmits(["close"])


const open = () => {
    isActive.value = 'is-active'
}
</script>
