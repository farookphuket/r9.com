<template>
    <div class="pt-4 mt-4 pb-4">
       <div class="table-wrapper">
           <table class="table is-bordered is-hoverable is-fullwidth">
               <thead>
                   <th>name/email</th>
                   <th>join</th>
                   <th>role(s)</th>
               </thead>
               <tbody>
                   <tr v-for="u in user_list.data">
                       <td>
                           <span class="mr-2">
                                {{u.name}}
                           </span>
                           <span class="mr-2">
                                {{u.email}}
                           </span>
                           <span class="mr-2">
                               <button class="button is-primary is-rounded 
                                   is-outlined is-small" 
                                   @click.prevent="$emit('edit',u.id)">
                                   <font-awesome-icon 
                                       icon="edit"></font-awesome-icon>
                               </button>
                           </span>
                           <span 
                               v-if="u.id !== user_id && u.is_admin !== 1">
                               <button class="button is-danger is-outlined 
                                   is-small is-rounded" 
                                   @click.prevent="$emit('del',u.id)">
                                   <font-awesome-icon 
                                       icon="trash"></font-awesome-icon>
                               </button>
                           </span>
                       </td>
                       <td>
                           <span class="mr-2 p-2">
                               {{moment(u.created_at).format("YYYY-MM-DD HH:mm:ss")}}
                           </span>
                           <span class="mr-2 p-2"> 
                               {{moment(u.created_at).fromNow()}}
                           </span>
                           <span class="has-text-success" 
                               v-if="u.email_verified_at !== null">activated</span>
                           <span class="has-text-danger" v-else>not activate</span>
                       </td>
                       <td>
                           <span 
                               class="p-2 mr-2 has-text-weight-bold"
                               v-for="r in u.role" :key="r.id">
                               {{r.role_name}}
                           </span>
                       </td>
                   </tr>

               </tbody>
           </table>
       </div>
        <!-- pagination area START -->
        <div class="mt-6 mb-4 d-flex justify-content-center" 
            >
            <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
                <a class="pagination-previous is-current">All post(s) {{user_list.total}}</a>
                <a class="pagination-next is-current">page {{user_list.current_page}}</a>
              <ul class="pagination-list" v-for="ln in user_list.links">
                <li v-if="ln.url != null && ln.active == false">
                  <a class="pagination-link" 
                  aria-label="Page 1" aria-current="page" v-html="ln.label" 
                  @click.prevent="$emit('getUsers',ln.url)"></a>
                </li>
                <li v-else>
                  <a class="pagination-link is-current"  v-if="ln.active == true" 
                  aria-label="" aria-current="page" v-html="ln.label" 
                  ></a>

                  <a class="pagination-link"  v-else 
                  aria-label="" aria-current="page" v-html="ln.label" 
                  ></a>
                </li>

              </ul>
            </nav>
        </div>
        <!-- pagination area END -->
    </div>
</template>
<script setup>

import {ref,onMounted} from "vue"
import moment from 'moment'
const prop = defineProps(["user_list"])
const emit = defineEmits(["getUsers","edit","del"])
const active_status = ref('')

const user_id = window.lsDefault.user_id

</script>

<style scope>
.table-wrapper{
    overflow-x:auto;
}
</style>
