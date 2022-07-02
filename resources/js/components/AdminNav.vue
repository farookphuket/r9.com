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
                             :to="{name:'AdminDashboard'}">home</router-link>
            </span>
            <span>
                <router-link class="navbar-item is-uppercase  has-text-weight-bold" 
                             :to="{name:'About'}">about</router-link>
            </span>
            <span>
                <router-link class="navbar-item is-uppercase  has-text-weight-bold" 
                             :to="{name:'AdminPost'}">blog</router-link>
            </span>


            
            <!-- user profile link START -->
            <div class="navbar-item has-dropdown is-hoverable" 
                >
                <a class="navbar-link button is-primary is-outlined" href="">
                    <font-awesome-icon 
                        icon="user"></font-awesome-icon>
                </a>
                <div class="navbar-dropdown" 
                    >

                    <router-link 
                        class="navbar-item is-uppercase has-text-weight-bold" 
                        :to="{name:'AdminUser'}">
                        Manage User
                    </router-link>

                    <hr>
                    
                    <router-link class="navbar-item is-uppercase has-text-weight-bold" 
                                 :to="{name:'Profile'}">
                        profile
                    </router-link>
                    <router-link class="navbar-item is-uppercase has-text-weight-bold" 
                                 :to="{name:'Logout'}">
                        logout

                    </router-link>
                </div>
            </div>
            <!-- user profile link END -->



        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import throttle from 'lodash/throttle'

import {ref,onMounted,nextTick} from 'vue'

const isActive = ref(false)
const showNavbar = ref(true)
const lastScrollPosition = ref(0)

onMounted(() => {
    nextTick(() => {
        window.addEventListener('resize', throttle(() => { closeMenu() }, 500))
        window.addEventListener('scroll', throttle(() => {  hideNav()}, 250))
    })
})
const hideNav = () => {
  const currentScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop
  if (currentScrollPosition < 0) return
  if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) return
  showNavbar.value = currentScrollPosition < lastScrollPosition.value
  lastScrollPosition.value = currentScrollPosition
    setTimeout(() => { closeMenu() }, 250)
}
const closeMenu = () => {
    isActive.value = false
}

/*
export default {
    name:'AdminNav',
  data() {
    return {
      isActive: false,
      showNavbar: true,
      lastScrollPosition: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', throttle(this.closeMenu, 500))
      window.addEventListener('scroll', throttle(this.hideNav, 250))
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.closeMenu)
    window.removeEventListener('scroll', this.hideNav)
  },
  methods: {
    closeMenu() {
      this.isActive = false
    },
    hideNav() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) return
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) return
      this.showNavbar = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
      setTimeout(this.closeMenu, 250)
    }
  }
}
*/
</script>
