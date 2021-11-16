<template>
  <v-footer class="ma-6 white">
    <!-- <v-container> -->
      <!-- <img src="@/assets/vivi.png"  width="100px"> -->
      <!-- <v-divider set="inset"></v-divider> -->
      <!-- <img class="mt-4" src="@/assets/vivi.png"  width="100px"> -->
      <v-row class="mt-2">
        <!-- <v-col cols="12" sm="6" > -->
          <v-row>
            <p class="mb-2">&copy; gebbles {{ new Date().getFullYear() }}</p><br>
          </v-row>
        <!-- </v-col> -->
      <v-spacer></v-spacer>
      <!-- <v-col cols="12" sm="6"> -->
        <v-row :class="{'justify-center': $vuetify.breakpoint.smAndDown, 'justify-end mb-2 ': $vuetify.breakpoint.mdAndUp}">
        <v-btn plain small text :to= "`/about_us/`"><h3>About</h3></v-btn>
          <v-btn plain small text :to= "`/contact/`"><h3>Contact Us</h3></v-btn>
          <v-btn small icon class="text-decoration-none"  @click="openig" >
            <v-icon>mdi-instagram</v-icon>
        </v-btn>
        </v-row>
      <!-- </v-col> -->
      </v-row>
    <!-- </v-container> -->
  </v-footer>
</template>
<script>
export default {
  methods: {
    openig(){
      var url = 'https://www.instagram.com/inmygroove.dance/';
      var win = window.open(url, '_blank');
      win.focus();
    },
  }
}
</script>