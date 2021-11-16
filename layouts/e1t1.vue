<template>
  <v-app>
    <e1t1-header/>
      <nuxt/>
    <the-footer />
  </v-app>
</template>

<script>
import TheFooter from '@/components/TheFooter'
import E1t1Header from '@/components/E1t1Header'
export default {
  components:{
    TheFooter,
    E1t1Header
  },
  head() {  //head function (a property of vue-meta), returns an object
    return {
      titleTemplate: 'E1T1 - InMyGroove',
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


