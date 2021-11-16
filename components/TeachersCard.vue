<template>
<v-hover v-slot:default="{ hover }">
    <v-card
      class="ma-1"
      data-view
      :to="'/e1t1/' + e1t1.id"
      :elevation="hover ? 12 : 0"
      outlined
      min-width="160" 
      max-height="175">
      <div class="caption pa-2">{{e1t1.username}}
        <country-flag :country= 'e1t1.s_student_country' size='small'/>
      </div>
      <div v-if = "e1t1.s_photo">
        <v-img :src = "e1t1.s_photo" width="160px" height="100px"></v-img>
      </div>
        <div class="caption pa-2">
          {{e1t1.s_teacher_name}}
          <country-flag :country= 'e1t1.s_teacher_country' size='small'/>
        </div>
    </v-card>
  </v-hover>
</template>

<script>
import CountryFlag from 'vue-country-flag'
    export default {
      name: 'TeachersCard',
      props: {
        e1t1: Object
      },
      components:{
         CountryFlag
         }
    }
</script>

