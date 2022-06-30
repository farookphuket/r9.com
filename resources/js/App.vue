<template>
    <div class="wrapper">
        <pub-nav></pub-nav>
        <main>

            <pub-view></pub-view>
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
import Visitor from './components/Visitor.vue'
import PubView from './components/PubView.vue'
import PubNav from './components/PubNav.vue'

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
