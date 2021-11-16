<template>
  <v-app>
    <!-- <plain-header/> -->
      <nuxt/>
    <the-footer />
  </v-app>
</template>

<script>
import PlainHeader from '@/components/PlainHeader'
import TheFooter from '@/components/TheFooter'
export default {
  components:{
    PlainHeader,
    TheFooter
  },
  head() {  //head function (a property of vue-meta), returns an object
    return {
      titleTemplate: '%s - InMyGroove',
      meta: [
        {
          hid: 'description', //create page overrides the description, hid helps to stop redundancy
          name: 'description',
          content: 
            'InMyGroove - The thread connecting music, movement and artists, connecting HipHop Elements'
        }
      ]
    }
  } 
}
</script>


