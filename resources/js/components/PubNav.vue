<template>
 <header :class="{ 'is-transformed': !showNavbar }" class="navbar is-fixed-top is-transparent is-spaced" >
    <div class="container">
      <div class="navbar-brand is-family-secondary">
          <router-link :to="{name:'Home'}" class="navbar-item">
              <figure class="logo">
                <img src="/img/see_logo_10-apr-2022.png" alt="see southern dot com">
              </figure>
        </router-link>
        <a :aria-expanded="isActive" :class="{ 'is-active': isActive }" role="button" class="navbar-burger" aria-label="menu" data-target="collapse" @click="isActive = !isActive" >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div id="collapse" :class="{ 'is-active': isActive }" class="navbar-menu is-paddingless" >
        <nav class="navbar-end">
            <!--
          <router-link to="http://blp.proj" class="navbar-item">Home</router-link>
            -->


            <span>
                <router-link class="navbar-item is-uppercase has-text-weight-bold" 
                             :to="{name:'Home'}">home</router-link>
            </span>

            <span>
                <router-link class="navbar-item is-uppercase  has-text-weight-bold" 
                             :to="{name:'Blog'}">blog</router-link>
            </span>

            <span>
                <router-link class="navbar-item is-uppercase  has-text-weight-bold" 
                             :to="{name:'About'}">about</router-link>
            </span>

            <span>
                <router-link class="navbar-item is-uppercase  has-text-weight-bold" 
                             :to="{name:'Register'}">register</router-link>
            </span>


            <span v-if="is_login === false">
                <router-link class="navbar-item is-uppercase  has-text-weight-bold" 
                             :to="{name:'Login'}">Login</router-link>
            </span>
            <span v-else>
                <router-link class="navbar-item is-uppercase  
                             has-text-weight-bold has-text-danger" 
                             :to="{name:'Logout'}">Logout</router-link>
            </span>

        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import throttle from 'lodash/throttle'
import {ref,onMounted,nextTick} from 'vue'

onMounted(() => {
    nextTick(() => {
        window.addEventListener('resize', throttle(() => {close()}, 500))
        window.addEventListener('scroll', throttle(() => {hideNav()}, 250))
    })
})



const isActive = ref(false)
const prop = defineProps(["is_login","is_member","is_admin"])

const close = () => {
    isActive.value = false
}
const lastScrollPosition = ref(0)
const showNavbar = ref(true)

const hideNav = () => {

      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) return
      if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) return
      showNavbar.value = currentScrollPosition < lastScrollPosition.value
      lastScrollPosition.value = currentScrollPosition

    setTimeout(() => {
        close()
    }, 250)
}
</script>

