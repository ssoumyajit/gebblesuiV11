<template>
  <v-app>
    <the-header/>
      <nuxt/>
    <login-footer/>
  </v-app>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import LoginFooter from '@/components/LoginFooter'
export default {
  components:{
    TheHeader,
    LoginFooter
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


