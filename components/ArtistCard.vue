<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="ma-1"
      data-view
      :to="'/' + artist.username" 
      :elevation="hover ? 12 : 0"
      outlined
      min-width="160" 
      max-height="160"
    >
      <v-img
        v-if = artist.thumb :src = "artist.thumb" 
        :lazy-src= "artist.thumb" 
        class="grey lighten-2 white--text"
        height="100"
        width="160"
      />
      <v-img
        v-else :src="require('@/assets/each1teach1.jpeg')"
        class="grey lighten-2 white--text"
        height="100"
        width="160"
      />
    <!-- <v-card-subtitle>
      {{ artist.artist_name }} <country-flag size=small :country= 'artist.country' />
    </v-card-subtitle> -->
      <v-card-actions height="32px">
        <div v-if="artist.artist_name" width="100" class="text-decoration-none caption" style="max-width: fit-content; height: 1.3em;
          line-height: initial;
          overflow: hidden">
        <p>{{ artist.artist_name }} </p>
        </div>
        <div v-else width="100" class="text-decoration-none caption" style="max-width: fit-content; height: 1.3em;
          line-height: initial;
          overflow: hidden">
        <p>{{ artist.username }} </p>
        </div>
        <v-spacer></v-spacer>
        <country-flag size=small  :country= 'artist.country' />
        <!-- <v-btn icon class="text-decoration-none" >
          <country-flag size=small  :country= 'artist.country' />
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
import CountryFlag from 'vue-country-flag'
    export default {
      head() {  //head function (a property of vue-meta), returns an object
      return {
          title: 'InMyGroove Community',
          }
      },
      name: 'ArtistCard',
      props: {
        artist: Object
      },
      components: {
        CountryFlag
      },
      }
</script>

