<template>
  <v-container class="ma-2 px-8">
    <section>
          <div v-for="(message, i) in messages" :key="i" class="d-flex align-start">
              <div v-for="artist in artists" :key ="artist.index">
                <nuxt-link :to="'/'+ message.username">
                    <v-list-item-avatar v-if=" message.username == artist.username">
                            <img :src = "artist.thumb" alt="img">
                    </v-list-item-avatar>
                </nuxt-link>
              </div>
              <div>
                <div class="subtitle grey--text">
                  <nuxt-link :to="'/'+ message.username">{{message.username}}</nuxt-link>
                  {{message.created}}
                </div>
                <p class="messageFormat">{{message.messagetext}}</p></div>
            <v-spacer></v-spacer>
        <v-menu v-if="isAuthenticated" transition="slide-y-transition" open-on-hover offset-y bottom left>
            <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs"
                v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
                </div>
            </template>
            <v-list>
                <v-list-item
                v-if="message.username == loggedInUser.user.username"
                class="text-decoration-none pl-6 pr-12"
                color="error"
                @click="deleted(message.id)"
                >
                <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
                <v-list-item
                v-else
                class="text-decoration-none pl-6 pr-12"
                @click="reported(message.shareid)"
                >
                <v-list-item-title>Report</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
            <!-- <v-divider v-if="i + 1 < message.length"></v-divider> -->
        </div>
    </section>
    <v-snackbar v-model="delete_snackbar">
            Deleted.
            <template v-slot:action="{ attrs }">
            <v-btn
                color="error"
                icon
                v-bind="attrs"
                @click="delete_snackbar = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </template>
    </v-snackbar>
    <v-snackbar v-model="report_snackbar">
        Reported.
        <template v-slot:action="{ attrs }">
        <v-btn
            color="error"
            icon
            v-bind="attrs"
            @click="report_snackbar = false"
        >
            <v-icon>mdi-close</v-icon>
        </v-btn>
        </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import store from 'vuex'
  export default {
    props: {
      messages: Array,
    },
    data() {
      return {
        show: false,
        report_snackbar: false,
        delete_snackbar :false
        }
    },
    mounted(){
      // console.log(this.events);
    },
    computed: {
        ...mapGetters(['loggedInUser', 'artists' ,'isAuthenticated']),
    },
    methods:{
      async deleted(id){
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token
            }
        };
        try {
            let response = await this.$axios.$delete("/v1/e1t1/qna/"+ id, config)
            this.$store.dispatch("check_personal_room", id)
            this.delete_snackbar =true
        } catch (e) {
            console.log(e.response);
        }
    },
    async reported(message){
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access
            }
        };
        try {
          this.report_snackbar =true
        } catch (e) {
            console.log(e);
        }
      }
    }
  }
</script>
<style scoped>
.messageFormat{
   white-space: pre-line;  
}
</style>

