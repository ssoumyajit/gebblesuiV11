<template>
  <v-card 
      class="ma-2 "
      max-width="270" >
      <div v-if = events.ev_photo>
        <v-img :src="events.ev_photo" class="centerImage" height="180px"/>
        <v-card-title v-if = events.ev_event>
        <h6>{{events.ev_event}}</h6>
        </v-card-title>
        <v-card-actions>
        <v-overlay :z-index="2" :value="overlay_judge" >
          <v-container class="rounded-lg black" >
            <v-col cols="12" align="end" justify="end">
            <v-btn icon color="error" @click="overlay_judge = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-col>
            <v-row>
                <v-col cols="12" md="6" align="center" justify="center">
                    <v-img :src="events.ev_photo" class="centerImage mb-6" width="80%" max-height="480px"/>
                </v-col>
                <v-col cols="12" md="6" class="pl-6">
                    <v-row class="pt-2 pr-4">
                    <p class="font-weight-light">{{events.ev_date}}</p>
                  </v-row>
                    <v-row class="py-4 pr-4">
                    <h4>{{events.ev_event}}</h4>
                  </v-row>
                  <v-row class="py-4 pr-4">
                    <h4 class="font-weight-light">{{events.ev_artist}}: {{events.ev_content}}</h4>
                  </v-row>
                  <v-row class="py-4 pr-4">
                    <!-- <v-btn icon color="orange" @click="snackbar_judge = true">
                      <v-icon>mdi-heart-outline</v-icon>
                    </v-btn> -->
                    <!-- <v-spacer></v-spacer> -->
                    <v-btn v-if="events.ev_link" icon color="indigo" @click="openlink">
                      <v-icon>mdi-link</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
            </v-row>
        </v-container>
        </v-overlay>
        <!-- <v-btn color="orange" icon @click="snackbar_judge = true">
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn> -->
          <v-spacer></v-spacer>
          <v-btn v-if="events.ev_link" icon color="indigo" @click="openlink" >
            <v-icon>mdi-link</v-icon>
          </v-btn>
          <v-btn @click="overlay_judge = true" icon>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
          <!-- <v-btn icon @click="show = !show" v-if = events.w_context>
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn> -->
        </v-card-actions>
        <!-- <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
                {{events.w_context}}
            </v-card-text>
          </div>
        </v-expand-transition> -->
        <!-- <div class="text font-weight-bold" v-if = events.w_content>
          {{events.w_content}}
        </div>
        <div class="text font-weight-light" v-if = events.w_context>
          {{events.w_context}}
        </div> -->
        
    <v-snackbar v-model="snackbar_judge">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="error"
          icon
          v-bind="attrs"
          @click="snackbar_judge = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
      </div>  
  </v-card>
  
</template>

<script>
  export default {
    props: {
      events: Object,
    },
    data() {
      return {
        show: false,
        overlay_judge: false,
        zIndex: 0,
        snackbar_judge: false,
        text: `Cheers!`,
        }
    },
    mounted(){
      // console.log(this.events);
    },
    methods:{
      openlink(){
        var url = this.events.ev_link;
        var win = window.open(url, '_blank');
        win.focus();
      }
    },
  }
</script>

