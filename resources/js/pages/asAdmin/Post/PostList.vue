<template>
    <div class="post-thumbnail">


        <div class="columns is-multiline is-mobile">
            <div class="column is-4 is-post-list" 
                v-for="po in postList.data" 
                :key="po.id">

                <!-- card START -->
                <div class="card">
                  <div class="card-image">
                    <figure class="image is-4by3">
                        <a href="" 
                            :title="po.title" 
                            @click.prevent="$emit('openMe',po.slug)">
                            <img :src="po.cover" :alt="po.title">
                        </a>
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <p class="title is-4">

                            <span class="ml-2">
                                <a href="" 
                                    @click.prevent="$emit('openMe',po.slug)" 
                                    :title="po.title">
                                    {{title.smartTitle(po.title,29)}}
                                </a>
                            </span>
                        </p>
                        <p class="subtitle is-6 has-text-right">
                            <font-awesome-icon 
                                icon="user"></font-awesome-icon>
                            <span class="ml-1">
                                @{{po.user.name}}
                            </span>

                        </p>
                      </div>
                    </div>

                    <div class="content">
                      <p>
                          {{title.smartTitle(po.excerpt,95)}}
                      </p>
                      <p class="pt-2 pb-2">
                          <span class="ml-2">
                              {{moment(po.created_at).format("YY-MM-DD HH:mm:ss")}}
                          </span>
                          <span class="ml-2">
                              {{moment(po.created_at).fromNow()}}
                          </span>
                      </p>

                      <!-- edit,delete button START -->
                      <div class="card-footer">

                              <button class="button is-rounded is-primary 
                                  is-outlined is-small card-footer-item" 
                                  @click.prevent="$emit('edit',po.id)">
                                  <font-awesome-icon 
                                      icon="edit"></font-awesome-icon>
                                  <span>edit</span>
                              </button>

                              <button class="button is-rounded is-danger 
                                  is-outlined is-small ml-2" 
                                  @click.prevent="$emit('del',po.id)">
                                  <font-awesome-icon 
                                      icon="trash"></font-awesome-icon>
                                  <span>delete</span>
                              </button>

                      </div>
                      <!-- edit,delete button END -->
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

const emit = defineEmits(["openMe","edit","del","getPost"])

const title = new CustomText()

</script>
