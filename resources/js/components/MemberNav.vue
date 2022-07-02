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
                             :to="{name:'MemberDashboard'}">home</router-link>
            </span>
            <span>
                <router-link class="navbar-item is-uppercase  has-text-weight-bold" 
                             :to="{name:'About'}">about</router-link>
            </span>


            <!-- dropdown menu START -->
             <div class="navbar-item has-dropdown is-hoverable">

                    <router-link class="navbar-link is-uppercase has-text-weight-bold" 
                                 :to="{name:'Profile'}">
                      profile
                    </router-link>

                    <div class="navbar-dropdown">
                        <a class="navbar-item is-uppercase has-text-weight-bold" 
                            @click.prevent="blogIndex">
                          blog
                        </a>
                      <hr class="navbar-divider">
                      <a class="navbar-item">
                        Report an issue
                      </a>
                      <router-link class="navbar-item" 
                                   :to="{name:'Logout'}">
                        Logout
                      </router-link>
                    </div>
                  </div>
            <!-- dropdown menu START -->



        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import {ref,onMounted,nextTick} from 'vue'
import {useRouter} from 'vue-router'
import throttle from 'lodash/throttle'


const  isActive = ref(false) 
const  showNavbar = ref(true) 
const  lastScrollPosition = ref(0) 

const router = useRouter()

onMounted(() => {
    nextTick(() => {

        window.addEventListener('resize', throttle(() => {closeMenu() }, 500))
        window.addEventListener('scroll', throttle(() => { hideNav()}, 250))

    })
})

const closeMenu = () => {
    isActive.value = false
}

const hideNav = () => {
  const currentScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop
  if (currentScrollPosition < 0) return
  if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) return
  showNavbar.value = currentScrollPosition < lastScrollPosition.value
  lastScrollPosition.value = currentScrollPosition
  setTimeout(closeMenu(), 250)
}

const logMeOut = () => {
    router.push({name:'Logout'})
}

const blogIndex = () => {
    router.push({name:'Blog'})
}
/*
export default {
    name:'PubNav',
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
