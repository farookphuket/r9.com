<template>
    <div class="pb-4 mb-4 pt-4">

        <div class="columns is-mobile is-multiline">
            <div class="column is-4 is-post-list" 
                v-for="wp in whatup.data" v-if="whatup.data">


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
                              {{title.smartTitle(wp.wp_title,16)}}
                          </p>
                          <p class="subtitle is-6">@{{wp.user.name}}</p>
                      </div>
                    </div>
                    <p>
                        {{wp.wp_title}}
                    </p>
                    <div class="content">

                        <span class="mr-2">
                            {{moment(wp.created_at).format("YYYY-MM-DD H:m:s")}}
                        </span>
                        <span>
                            {{moment(wp.created_at).fromNow()}}
                        </span>
                    </div>

                  </div>
                  <div class="card-footer">

                          <button class="button is-primary is-small is-rounded 
                                  is-outlined card-footer-item"
                                  @click.prevent="$emit('edit',wp.id)"
                              >
                              <font-awesome-icon 
                                  icon="edit"></font-awesome-icon>
                          </button>
                          <button class="button is-danger is-small is-rounded 
                                  is-outlined ml-2" 
                                @click.prevent="$emit('del',wp.id)"
                              >
                              <font-awesome-icon 
                                  icon="trash"></font-awesome-icon>
                          </button>

                  </div>
                </div>
                <!-- card END -->
            </div>

        </div>

        <!-- pagination area START -->
        <div class="mt-6 mb-4 d-flex justify-content-center" 
            >
            <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
                <a class="pagination-previous is-current">All post(s) {{whatup.total}}</a>
                <a class="pagination-next is-current">page {{whatup.current_page}}</a>
              <ul class="pagination-list" v-for="ln in whatup.links">
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
    import {ref,computed} from 'vue'
    import sTitle from '../../../core/CustomText.js'
    import moment from 'moment'


    const title = new CustomText()


    const emit = defineEmits(["edit","del","getWhatup"])
    const props = defineProps(["whatup"])
    //console.log(props)

</script>
