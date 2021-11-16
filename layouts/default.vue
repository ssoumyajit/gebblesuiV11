<template>
  <v-app>
    <the-header/>
      <nuxt/>
    <the-footer/>
  </v-app>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
export default {
  components:{
    TheHeader,
    TheFooter
  },
  head() {  //head function (a property of vue-meta), returns an object
    return {
      titleTemplate: '%s',
      meta: [
        {
          hid: 'description', //create page overrides the description, hid helps to stop redundancy
          name: 'description',
          content: 
              'Gebbles- a thread connecting music, movement and artists.'
        }
      ]
    }
  } 
}
</script>


