<template>
    <div class="post-thumbnail">
        <p class="title">about farook's page</p>
        <p class="subtitle has-text-centered">
            your help is important!
        </p>
        <p>
            you have see this because you do not have any "About" page.
        </p>
        <p>
            to get rid of this message just log in as "root" and create about 
            page where has title of "about" and slug of "about" the content of 
            page you can put as you need
        </p>
        <p class="title">
            เวปที่ไม่ได้บ้าการเมือง
        </p>
        <p class="subtitle">
            #อย่าปล่อยให้ใครหลอกไปติดคุก #คนรุ่นใหม่อย่าโง่
        </p>
        <p class="pb-4">
            ทุกวันนี้ข่าวสารแล้วแต่คนจะเลือกดู เด็กรุ่นใหม่หลายๆ คนโดนพวกหลอกให้ไปติดคุก
            ในเรื่องที่ตัวเองไม่ได้รู้เลยว่ามันจริงเท่าไหร่ แต่ที่แน่ๆ คือโดนหลอก
        </p>

        <div class="mb-4 pb-4">
            <p class="title">Contact Me</p>
            <div class="box">
                <div class="has-text-centered">
                    <figure class="image" 
                        >
                        <img 
                        style="max-width:220px;"
                        src="https://lh3.googleusercontent.com/BDqstlJYLcyVljDHQcyNtrlYGMC7DAftzx3PVmShKnsmY8wEObSSm2Rs6nKyVGQ2nfxYb1tBNpP7ZWaz0ThyS2unIMvgJMi_W6C0ilplyejeUpsOsaDrbcAl_bTs2ionccGrgGVhqEE=w2400" alt="farook">
                    </figure>
                    <p>farook</p>
                </div>
                <p>tel. +66 95 954-3920 or +66 81 397-4489</p>
                <p>email : 
                    <span class="mr-2">
                        <a href="mailto:firefrook@gmail.com">firefrook@gmail.com</a>
                    </span>

                    <span class="mr-2">
                        <a href="mailto:farookphuket@gmail.com">farookphuket@gmail.com</a>
                    </span>

                    <span class="mr-2">
                        <a href="mailto:admin@see-southern.com">admin@see-southern.com</a>
                    </span>
                </p>
            </div>
        </div>

        <p class="title">support me</p>
        <p class="mb-4 pb-4">
            if you like our work and you want to support by transfer money to 
            the following account.
        </p>
        <div class="columns is-mobile is-multiline">
            <div class="column is-4 is-post-list" 
                v-for="b in banks" :key="b.id">
                <figure class="image is-inline-block">
                    <a :href="b.img"  
                        @click.prevent="openModal(b.id)"
                        target="_blank">
                        <img :src="b.img" 
                        alt="Kasikorn Bank" 
                        >
                    </a>
                </figure>

                <p class="pt-2 has-text-centered">{{b.alt}}</p>

            </div>
        </div><!-- end of div.columns -->


        <modal-view 
            :title="mTitle"  
            :body="mBody"  
            :active="isActive" 
            @close="isActive = ''"></modal-view>

    </div>
</template>
<style scope>

.post-thumbnail{
    padding:2px;
    margin:2px;
}
</style>
<script setup>
import {ref} from 'vue'

import ModalView from "../../components/ModalView.vue"

const banks = [{
        id:1,
        img:'https://i.ibb.co/mXnBdJK/bkk-bank-8-jun-22.jpg',
        alt:'Bangkok Bank'
    },
    {

        id:2,
        img:'https://i.ibb.co/DQkPn3W/farook-kasikorn-23-apr-2022.jpg',
        alt:'Kasikorn Bank'
    },

    {

        id:3,
        img:'https://i.ibb.co/09TBBPk/farook-krungthai-23-apr-2022.jpg',
        alt:'Krung Thai Bank'
    },
    {

        id:4,
        img:'https://i.ibb.co/ygrb4xk/farook-SCB-23-apr-2022.jpg',
        alt:'SCB Bank'
    },

    {

        id:5,
        img:'https://i.ibb.co/Y0tjwrf/farook-true-wallet-23-apr-2022.jpg',
        alt:'true wallet'
    },
]

const isActive = ref('')

const mTitle = ref('')
const mBody = ref('')
const openModal = (id) => {
    banks.map((v) => {
        if(v.id === id){
            mTitle.value = v.alt 
            mBody.value = `<a href=${v.img} target="_blank" ><img src=${v.img} alt=${v.alt} /></a>` 
            isActive.value = 'is-active'
        }
    })
}
</script>
