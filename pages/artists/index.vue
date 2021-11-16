<template>
    <div>
    <v-row>
      <v-col cols="12" md="8"  class="justify-center">
        <h2 class ="pl-6 font-weight-bold xs12 d-inline">Our Community</h2>
        <v-btn v-if="isAuthenticated" small icon outlined color="indigo" class="mb-2 ml-2" to="/create/website/">
        <v-icon small>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="4" class= "pr-6 justify-end px-6" >
          <v-text-field
            label="Search artists"
            rounded
            solo
            prepend-inner-icon="mdi-magnify"
            v-model="search"
          ></v-text-field>
      </v-col>
    </v-row>
      <v-layout row wrap justify-center>
        <div v-for="artist in filteredArtists" :key ="artist.index">
          <v-flex sm6 xs6> 
            <ArtistCard :artist="artist" ></ArtistCard> 
          </v-flex>
          </div>
    </v-layout>
    </div>
</template>

<script>
import ArtistCard from '@/components/ArtistCard.vue'
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
export default {
  scrollToTop: true,
  head() {  //head function (a property of vue-meta), returns an object
    return {
      title: 'Artists',
      meta: [ 
        {
          hid: 'description',
          name: 'description',
          content: 
              'Gebbles community'
        }
      ]
    }
  },
  async asyncData({error}) {
    try {
      const response = await EventService.getArtists()
      return {
        artists: response.data
      }
    } catch (e) {
        error({statusCode:503, message: "unable to fetch artist data at this point"})
    }
  },
  components: {
    ArtistCard
  },
  data() {
    return {
      search: ""
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'userHasPortfolio', 'loggedInUser']),
    filteredArtists: function(){
      return this.artists.filter((artist) => {
        return artist.artist_name.toLowerCase().match(this.search.toLowerCase())||artist.username.toLowerCase().match(this.search.toLowerCase());
      });
      
    }
  }
}
</script>
