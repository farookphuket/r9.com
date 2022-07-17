<template>
    <div class="modal" 
        :class="active?'is-active':''">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
              {{title}}
          </p>
          <button class="delete" aria-label="close" 
              @click.prevent="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="content has-text-centered"
              v-html="body"></div>
        </section>
        <footer class="card-footer">
          <button class="button card-footer-item" 
              @click.prevent="close">Cancel</button>
        </footer>
      </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'

const props = defineProps(["title","body","active"])

const emit = defineEmits(["close"])

const close = () => {
    emit('close')
}

</script>
