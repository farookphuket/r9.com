<template>
    <nav class="level is-mobile">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Today</p>
          <p class="title">{{visitor.visited_today}}</p>
          
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div>
          <p class="heading">This Month</p>
          <p class="title">{{visitor.visited_month}}</p>
          
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">All</p>
          <p class="title">{{visitor.visited_all}}</p>
          
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div>
          <p class="heading">You</p>
          <p class="title">{{visitor.ip}}</p>
          
        </div>
      </div>
    </nav>
</template>

<script setup>
import {ref,onMounted} from 'vue'

const visitor =ref('')
const vS = async () => {
    let url = `/api/visitor`
    let res = await axios.get(url)
    visitor.value = res.data.visitor
}

onMounted(() => {
    vS()
})

</script>
