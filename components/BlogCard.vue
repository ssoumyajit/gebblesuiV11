<template>
<v-hover>
  <template v-slot="{ hover }" >
  <v-card class = "ma-1 pa-1 grey lighten-5" 
  :elevation="hover ? 6 : 1" :to="'/blogs'" 
  min-width="260" max-height="260">
    <v-container align="center">
      <h1>title</h1>
      <h5>@username</h5>
      <p>This is a blog card.</p>
    </v-container>
  </v-card>
  </template>
</v-hover>
</template>

<script>
    export default {
      name: 'BlogCard',
      }
</script>

