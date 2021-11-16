<template>
  <div>
      <!-- for mobile -->
       <!-- <v-img
        class="hidden-md-and-up "
        height="250"
        :src="require('@/assets/bboys.jpeg')"
        >
       </v-img>
       <div class="hidden-md-and-up mr-4">
        <div align="end" justify="end" >
            <h2 class="mr-4"> Represent Right!</h2>
            <div class="mt-2" >
              <v-btn outlined dark color="#BD3D30" 
              class="text-decoration-none elevation-none mr-4 px-4 justify-end" 
              :to= "`/artists/`"><h5>community</h5>
              <v-icon right>
                mdi-arrow-right
              </v-icon>
            </v-btn>
            </div>
        </div>
      </div> -->
      <!-- for desktop -->
    <!-- <v-img
    class="hidden-sm-and-down"
    width="100%"
    :src="require('@/assets/bboys.jpeg')"
    >
    <v-layout
        align-center
        fill-height 
      >
      <v-col>
        <v-row class="align-center
        justify-end">
        <h1 class="mr-8 font-weight-bold"> Represent Right!</h1></v-row>
        <v-row class="align-center
        justify-end">  
          <v-btn outlined dark color="#BD3D30" class="text-decoration-none elevation-none px-4 mr-8" :to= "`/artists/`"><h5>community </h5>
          <v-icon right>
            mdi-arrow-right
          </v-icon>
        </v-btn>
        </v-row>
      </v-col>
    </v-layout>
    </v-img> -->
      <v-row
      align="center" justify="center" align-content="center" class="ma-md-12 my-8 hidden-sm-and-down " grey >
        <h1 class="text-center">
          "connecting the groove worldwide<br>
          celebrating<span style="color:red;"> Each one Teach one.</span>"
        </h1>
      </v-row>
      <v-row class="justify-center align-center mt-12">
        <v-col cols="12" md="6">
          <div align="center" justify="center">
          <img src = "~/assets/e1t11.jpeg"  width="70%" alt="portfolio logo">
          </div>
          <h2 class="text-center hidden-md-and-up my-6 mx-4">
          "connecting teachers and students worldwide <br>
          celebrating<span style="color:red;" > Each one Teach one.</span>"
        </h2>
        </v-col>
        <v-col cols="12" md="6">
          <div class="caption mx-8" align-content="left" align="left" justify="center">
              <h1 style="font-size:32px" >Gebbles</h1><br>
              <h1 class="mr-16 font-weight-light" style="line-height: 1.6;">Gebbles, is a platform for the street dancers of the hiphop culture. At gebbles, you can make a dance portfolio, document your HipHop journey & stay connected
              to some of the people who matter the most, your teachers and students in this culture.
              </h1>
              <v-btn outlined dark color="#BD3D30" 
              class="text-decoration-none elevation-none mt-4 px-4 justify-end" 
              :to= "`/artists/`"><h5>community</h5>
              <v-icon right>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </div>
          <!-- <div class="mx-8" align="left" justify="left">
          <h3 class=" font-weight-bold"> Each 1 Teach 1</h3>
          <h5 class="font-weight-light mt-2">we celebrate the 'EACH 1 TEACH 1'
            legacy of the hiphop culture and it starts with you,
            who represents the culture right.</h5>
          <v-btn dark outlined color="#35463A" class="mt-4 text-decoration-none elevation-none px-4" :to= "`/create/each1teach1/`"><h5>Each One Teach One</h5>
          <v-icon right>
            mdi-arrow-right
          </v-icon></v-btn>
          </div> -->
        </v-col>
      </v-row>
      <v-container class="mt-16">
      <v-row >
        <v-col>
          <v-hover v-slot:default="{ hover }">
          <v-card
          outlined
          :to="'/create'" 
          :elevation="hover ? 6 : 0"
          class="mx-auto"
          max-width="244"
          max-height="200"
          >
            <v-img
              :src="require('@/assets/bboys.jpeg')"
              height="150px"
              position="top"
            ></v-img>
            <v-card-subtitle>
              <h3>Create your Portfolio</h3>
            </v-card-subtitle>
          </v-card>
          </v-hover>
        </v-col>
        <v-col>
          <v-hover v-slot:default="{ hover }">
          <v-card
          outlined
          :to="'/create/journeyindex'" 
          :elevation="hover ? 6 : 0"
          class="mx-auto"
          max-width="244"
          max-height="200"
          >
            <v-img
              :src="require('@/assets/each1teach1.jpeg')"
              height="150px"
              position="top"
            ></v-img>
            <v-card-subtitle>
             <h3> Your dance journey</h3>
            </v-card-subtitle>
          </v-card>
          </v-hover>
        </v-col>
        <v-col>
          <v-hover v-slot:default="{ hover }">
          <v-card
          :to="'/create/e1t1index'" 
          :elevation="hover ? 6 : 0"
          class="mx-auto"
          max-width="244"
          max-height="200"
          outlined
          >
            <v-img
              :src="require('@/assets/e1t11.jpeg')"
              height="150px"
              position="top"
            ></v-img>
            <v-card-subtitle>
              <h3>Each One Teach One</h3>
            </v-card-subtitle>
          </v-card>
          </v-hover>
        </v-col>
      </v-row>
      </v-container>
      <v-row class="justify-center align-center mt-16">
        <!-- <p>The vision is to document the flow of knowledge from the origin to the future so that the history stays true and the people are given due credits for their sharing and passing the knowledge. In the process, we hope that together we can strengthen our bonds with our fellow artists and empower the culture even more.</p> -->
          <v-col cols="12">
            <div data-aos="fade-up" data-aos-duration="1200" class="caption mx-8 mt-8" align-content="center" align="center" justify="center">
              <h1 align="center" justify="center" >Our Vision</h1><br>
            <h2 class=" font-weight-light mb-12">The vision is to document the flow of knowledge from the origin to the 
              future so that the history stays true and the people are given due credits 
              for their sharing and passing the knowledge. In the process, we hope that 
              together we can strengthen our bonds with our fellow artists and empower 
              the culture even more.</h2>
            </div>
          </v-col>
      </v-row>
    <!-- </v-container> -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import vuex from 'vuex' 
export default {
  head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'Gebbles',
        }
      },
  mounted() {
    if(this.isAuthenticated){
      this.$store.dispatch("check_share_notifications",this.loggedInUser.user.username);
        this.$store.dispatch("check_learn_notifications",this.loggedInUser.user.username);
        this.$store.dispatch("merge_notifications");
    // console.log("check not2 index page");
    }
  },
  computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio'])
  },
  data(){
    return {
      model: null,
  //     slides: [
  //     {
  //       image: require('@/assets/comm.png'),
  //       cap: " Check out the community of dancers around the world."
  //     },
  //     {
  //       image: require('@/assets/rr.png'),
  //       cap: " Represent yourself!"
  //     },
  //     {
  //       image: require('@/assets/portfolio.png'),
  //       cap: " Share your dance journey and highlights. "
  //     },
  //     {
  //       image: require('@/assets/highlights.png'),
  //       cap: " Mention your teachers and let them know you've learnt from them."
  //     },
  //     {
  //       image: require('@/assets/e1t1.png'),
  //       cap: " Let's build the community stronger."
  //     }
    
  // ]
  }
  }
}
//https://stackoverflow.com/questions/57800048/how-to-enable-dark-mode-with-custom-colors-in-light-theme-in-vuetify
//You know that you have a groove that no other dancer has in this 
// world. We all have our grooves. It is our identity as dancers.
// When you dance someone connects deeply with you without your notice. 
// When you teach, a part of you lives in their dance. we are all unique
//yet connected.This is how Hip Hop connects, through sharing. Each One Teach One. 
// "In My Groove" is an effort to connect us 
//a little more, connect Hip Hop a little more, connect the students with their 
//teachers and the teachers with their students a little more so that the legacy stays forever.

</script>
<style scoped>
/* .app{
  background-color:beige;
} */
</style>