<template>
        <div class="post-thumbnail">

            <!-- for now still not allow member to create post -->
            <div class="pb-4 mb-4" v-if="is_member === true">

            </div>
            <!-- END -->

            <div class="columns is-multiline is-mobile">
                <div class="column is-4 is-post-list" 
                    v-for="po in postList.data" 
                    :key="po.id">

                    <!-- card START -->
                    <div class="card">
                      <div class="card-image">
                        <figure class="image is-4by3">
                        <a href="" 
                            @click.prevent="$emit('openMe',po.slug)" 
                            :title="po.title">

                          <img :src="po.cover" :alt="po.title">
                        </a>
                        </figure>
                      </div>
                      <div class="card-content">
                        <div class="media">
                          <div class="media-content">
                            <p class="title is-4">
                                <a href="" 
                                    @click.prevent="$emit('openMe',po.slug)" 
                                    :title="po.title">
                                    {{title.smartTitle(po.title,28)}}
                                </a>
                            </p>
                            <p class="subtitle is-6 has-text-right">
                                <span class="mr-2">
                                    <font-awesome-icon 
                                        icon="user"></font-awesome-icon>
                                </span>
                                <span>
                                    @{{po.user.name}}
                                </span>
                                <span class="ml-4 mr-2 has-text-info">
                                    <font-awesome-icon 
                                        icon="eye"></font-awesome-icon>
                                </span>
                                <span>
                                    {{Object.values(po.read).length}}
                                </span>
                            </p>
                          </div>
                        </div>

                        <div class="content">
                            <p>
                                {{title.smartTitle(po.excerpt,89)}}
                            </p>
                            <p class="pt-2 pb-4">
                              <span>
                                  <font-awesome-icon 
                                      icon="calendar-week"></font-awesome-icon>
                              </span>
                              <span class="ml-2">
                                  {{moment(po.created_at).format("YY-MMM-DD HH:mm:ss")}}
                              </span>
                              <span class="ml-2">
                                  {{moment(po.created_at).fromNow()}}
                              </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <!-- card END -->

                </div>
            </div>


        <!-- pagination area START -->
        <div class="mt-6 mb-4 d-flex justify-content-center" 
            >
            <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
                <a class="pagination-previous is-current">All post(s) {{postList.total}}</a>
                <a class="pagination-next is-current">page {{postList.current_page}}</a>
              <ul class="pagination-list" v-for="ln in postList.links">
                <li v-if="ln.url != null && ln.active == false">
                  <a class="pagination-link" 
                  aria-label="Page 1" aria-current="page" v-html="ln.label" 
                  @click.prevent="$emit('getPost',ln.url)"></a>
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
import sT from '../../../core/CustomText.js'

const props = defineProps(["postList"])
const emit = defineEmits(["openMe"])

const title = new CustomText()

const is_member = window.lsDefault.is_member
</script>
