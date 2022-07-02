<template>
    <div class="pt-4 mt-4">

        <div class="columns is-mobile is-multiline">
            <div class="column is-4 is-post-list" 
                v-for="wp in whatup.data" >


                <!-- card START -->
                <div class="card">
                  <div class="card-image">
                    <figure class="image is-5by3">
                      <img :src="wp.wp_cover" :alt="wp.wp_title" 
                      >
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                          <p class="title is-4">
                              <a href="" 
                                  @click.prevent="$emit('open',wp.id)">
                                {{title.smartTitle(wp.wp_title,16)}}
                              </a>
                          </p>
                          <p class="subtitle is-6">
                              <span class="mr-4">
                                @{{wp.user.name}}
                              </span>

                            <span class="ml-2 has-text-success mr-2">
                                <font-awesome-icon 
                                    icon="eye"></font-awesome-icon>
                            </span>
                            <span>
                                {{Object.values(wp.read).length}} 
                            </span>
                          </p>
                          <p class="pt-2 pb-2">
                              {{title.smartTitle(wp.wp_excerpt,80)}}
                          </p>
                      </div>
                    </div>

                    <div class="content">

                        <span class="mr-2">
                            {{moment(wp.created_at).format("YYYY-MM-DD H:m:s")}}
                        </span>
                        <span>
                            {{moment(wp.created_at).fromNow()}}
                        </span>

                    </div>
                  </div>
                  <div class="card-footer" 
                      v-if="user_id === wp.user_id">
                        <div class="card-footer-item">
                              <button class="button is-primary is-small is-rounded 
                                      is-outlined"
                                      @click.prevent="$emit('edit',wp.id)"
                                  >
                                  <font-awesome-icon 
                                      icon="edit"></font-awesome-icon>
                              </button>
                        </div>
                        <div class="card-footer-item">
                              <button class="button is-danger is-small is-rounded 
                                      is-outlined ml-2" 
                                    @click.prevent="$emit('del',wp.id)"
                                  >
                                  <font-awesome-icon 
                                      icon="trash"></font-awesome-icon>
                              </button>
                        </div>

                  </div>
                </div>
                <!-- card END -->
            </div>

        </div>

        <div class="pt-4 mt-4 pb-4" v-if="whatup.links">
            <nav class="pagination" role="navigation" aria-label="pagination">
                <a class="pagination-previous">page {{whatup.current_page}}</a>
                <a class="pagination-next">of {{whatup.last_page}}</a>
                <ul class="pagination-list">
                <li v-for="pa in whatup.links" :key="pa.id">
                  <a class="pagination-link"  
                     v-html="pa.label" 
                     @click="$emit('getWhatup',pa.url)"
                      v-if="pa.url !== null && pa.active !== true">
                  </a>
                  <span class="pagination-link is-current"
                      v-html="pa.label"  
                      v-else></span>
                </li>
              </ul>
            </nav>
        </div>

    </div>
</template>
<script setup>
    import {ref} from 'vue'
    import sTitle from '../../../core/CustomText.js'
    import moment from 'moment'


    const title = new CustomText()


    const emit = defineEmits(["edit","del","getWhatup","open"])

    const props = defineProps(["whatup"])

    const user_id = window.lsDefault.user_id
    //console.log(props)

</script>
