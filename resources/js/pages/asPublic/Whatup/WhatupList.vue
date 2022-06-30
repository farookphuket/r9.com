<template>
    <div class="post-thumbnail">
        
        <div class="columns is-mobile is-multiline">
            <div class="column is-post-list is-4" 
                v-for="w in wp.data" :key="w.id">

                <div class="card">
                  <div class="card-image">
                    <figure class="image is-4by3">
                        <a href="" 
                           :title="w.wp_title"
                            @click.prevent="emit('openMe',w.id)">

                            <img :src="w.wp_cover" :alt="w.wp_title">
                        </a>
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <p class="title is-4">
                            {{tT.smartTitle(w.wp_title,28)}}
                        </p>
                        <p class="subtitle is-6">@{{w.user.name}}</p>
                      </div>
                    </div>

                    <div class="content">
                        <p>{{tT.smartTitle(w.wp_excerpt,80)}}</p>
                    </div>
                    <nav class="level">
                        <div class="level-left">
                            <p class="level-item">
                                <span class="mr-2">
                                    <font-awesome-icon 
                                        icon="calendar-week"></font-awesome-icon>
                                </span>
                                <span>
                                    {{moment(w.created_at).format("YYYY-MMM-DD HH:mm:ss")}}
                                </span>

                            </p>
                        </div>
                        <div class="level-right">
                            <span class="mr-2">
                                <font-awesome-icon 
                                    icon="eye"></font-awesome-icon>
                            </span>
                            <span>{{Object.values(w.read).length}}</span>
                        </div>
                    </nav>
                  </div>
                </div>
            </div>
        </div>


        <!-- pagination area START -->
        <div class="mt-6 mb-4 d-flex justify-content-center" 
            >
            <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
                <a class="pagination-previous is-current">All post(s) {{wp.total}}</a>
                <a class="pagination-next is-current">page {{wp.current_page}}</a>
              <ul class="pagination-list" v-for="ln in wp.links">
                <li v-if="ln.url != null && ln.active == false">
                  <a class="pagination-link" 
                  aria-label="Page 1" aria-current="page" v-html="ln.label" 
                  @click.prevent="$emit('getWhatup',ln.url)"></a>
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
import {ref} from 'vue'
import moment from 'moment'
import rt from '../../../core/CustomText.js'

const tT = new CustomText()

const prop = defineProps(["wp"])
const emit = defineEmits(["openMe","getWhatup"])
</script>
