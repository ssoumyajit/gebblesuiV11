<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="ma-1"
      data-view
      @click="openDialog(journey.id)" 
      :elevation="hover ? 12 : 0"
      outlined
      min-width="160" 
    >
      <v-img
        v-if = journey.jophoto1 :src = "journey.jophoto1" 
        :lazy-src= "journey.jophoto1" 
        class="grey lighten-2 white--text"
        height="100"
        width="160"
      />
      <v-dialog
        v-model="dialog"
        persistent
        width="80%">
        <div class="rounded-lg white">
          <v-col cols="12" align="end" justify="end">
          <v-btn icon color="error" @click="closeDialog" >
            <v-icon >mdi-close</v-icon>
          </v-btn>
          </v-col>
          <v-row class="ma-4">
            <v-col cols="12" md="6" align="center" justify="center">
              <v-row>
                <client-only>
                  <Slider
                      :autoplay = false
                      width="600px"
                      height="500px">
                      <div v-if="fullJourney">
                      <div v-if="fullJourney.jophoto1 !=null">
                      <SliderItem>
                      <v-img
                            :src="fullJourney.jophoto1"
                            contain
                            height="500px"
                            width="800px"
                          ></v-img>
                      </SliderItem>
                      </div>
                      <div v-if="fullJourney.jophoto2!=null">
                      <SliderItem>
                      <v-img
                            :src="fullJourney.jophoto2"
                            contain
                            height="500px"
                            width="800px"
                          ></v-img>
                      </SliderItem>
                      </div>
                      <div v-if="fullJourney.jophoto3!=null">
                      <SliderItem>
                      <v-img
                            :src="fullJourney.jophoto3"
                            contain
                            height="500px"
                            width="800px"
                          ></v-img>
                      </SliderItem>
                      </div>
                      <div v-if="fullJourney.jophoto4!=null">
                      <SliderItem>
                      <v-img
                            :src="fullJourney.jophoto4"
                            contain
                            height="500px"
                            width="800px"
                          ></v-img>
                      </SliderItem>
                      </div>
                      <div v-if="fullJourney.jophoto5!=null">
                      <SliderItem>
                      <v-img
                            :src="fullJourney.jophoto5"
                            contain
                            height="500px"
                            width="800px"
                          ></v-img>
                      </SliderItem>
                      </div>
                      </div>
                  </Slider>
                </client-only>
              </v-row>
            </v-col>
            <v-col cols="12" md="6" class="pl-6">
              <div v-if="loggedInUser">
              <v-row align="end" justify="end" v-if="loggedInUser.user.username == journey.username">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon small>
                      <v-icon color="indigo" small @click="editJourney(fullJourney)" v-bind="attrs" v-on="on" >mdi-circle-edit-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Edit</span>
                    </v-tooltip>
                <v-dialog v-model="dialogDelete" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-tooltip top v-bind="attrs" v-on="on">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn small icon>
                                <v-icon color="error" small  @click="saveJourneyId(journey.id)" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>Delete</span>
                      </v-tooltip>
                    </template>
                    <v-card class="pa-4">
                        <p> Are you sure you want to delete this journey?</p>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="px-4 text-decoration-none" small rounded color="error" dark
                            @click="confirmDelete(rm)">Delete</v-btn>
                        <v-btn color="indigo" class="px-4 text-decoration-none" small rounded outlined  @click="dialogDelete = false">
                            Cancel
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
              </v-row>
              </div>
              <v-row class="px-4">
                <h5 class="font-weight-light">{{journey.jodate}}</h5>
              </v-row>
              <v-row class="px-4 pt-4" v-if="fullJourney">
                <!-- {{fullJourney}} -->
                  <h4>{{fullJourney.joevent}}</h4> 
                  <v-spacer></v-spacer>
                <v-btn v-if="fullJourney.jolink"  icon color="indigo" @click="openlink">
                  <v-icon >mdi-link</v-icon>
                </v-btn>
                <v-tooltip v-if="fullJourney.ishighlight" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs"
                        v-on="on">
                        <v-icon class="pl-2 float-right" yellow small>mdi-star</v-icon>
                    </v-btn>
                  </template>
                  <span>This is a highlighted post.</span>
                </v-tooltip>
                <v-tooltip v-if="fullJourney.isprivate" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs"
                        v-on="on">
                        <v-icon class="pl-2 float-right" small>mdi-lock</v-icon>
                    </v-btn>
                  </template>
                  <span>This is your private post.</span>
                </v-tooltip>
              </v-row>
              <v-row class="pa-4 ">
                <p><nuxt-link :to="'/'+ journey.username"><b>{{journey.username}}</b> </nuxt-link> <span v-if="fullJourney">{{fullJourney.jocontent}}</span></p>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-dialog>
      <v-card-actions >
        <div width="100" class="text-decoration-none caption" style="max-width: fit-content; height:2em; overflow:hidden">
        <p class="font-weight-bold">{{ journey.joevent }} </p>
        </div>
        <v-spacer></v-spacer>
        <v-icon v-if="journey.isprivate" class="pl-2 float-right" small>mdi-lock</v-icon>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
import {mapGetters} from 'vuex'
import { Slider, SliderItem } from "vue-easy-slider";

export default {
  props: {
    journey: Object,
  },
  components: {
    Slider,
    SliderItem
  },
  methods:{
    openDialog() {
    this.dialog= true
    this.$store.dispatch("check_full_journey", this.journey.id,this.journey.username);
    },
    closeDialog() {
    this.dialog= false
    this.$store.dispatch("remove_full_journey");
    },
    openlink(){
      var url = this.fullJourney.jolink;
      var win = window.open(url, '_blank');
      win.focus();
    },
    saveJourneyId(id){
      this.dialogDelete=true;
      this.rm=id;
    },
    editJourney(journey){
      this.$store.dispatch("check_editing_obj", journey);
      this.$router.push("/create/journey");
    },
    async confirmDelete(id){
      const config = {
      headers: {"content-type": "multipart/form-data",
          "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
      };
      try {
          await this.$axios.$delete("/v1/artist/journey/"+id , config);
          this.dialogDelete =false;
          this.dialog = false
          this.snackbar = true;
          //send event to parent component i.e journey page
          // this.$emit('delete',this.journey.username)
          this.$router.push("/create/journey");
          // this.$router.push("/"+this.journey.username+"/journey");
      } 
      catch (e) {
          console.log(e);
      }
      },
    },
    computed: {
        ...mapGetters(['loggedInUser','fullJourney']),
	  },
    data() {
      return {
        dialog: false,
        dialogDelete:false,
        rm:""
        }
    }
  }
</script>
<style scoped>

</style>

