<template>
  <v-container class="ma-2 px-8">
    <section>
      <div v-for="(comment, i) in comments" :key="i" class="d-flex align-start">
        <div v-for="artist in artists" :key ="artist.index">
          <nuxt-link :to="'/'+ comment.username">
              <v-list-item-avatar size="36" v-if=" comment.username == artist.username && artist.thumb">
                <img :src = "artist.thumb" alt="img">
              </v-list-item-avatar>
              <v-list-item-avatar size="36" v-if=" comment.username == artist.username && !artist.thumb">
                <v-icon>
                      mdi-account-circle
                  </v-icon>
              </v-list-item-avatar>
          </nuxt-link>
        </div>
        <div>
          <div class="subtitle grey--text text-decoration-none"><nuxt-link :to="'/'+ comment.username" class="text-decoration-none">{{comment.username}} </nuxt-link> <template> <p class="caption">{{comment.timestamp}}</p></template></div>
          <p class="commentFormat">{{comment.comment}}</p></div>
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
                    v-if="comment.username == loggedInUser.user.username"
                    class="text-decoration-none pl-6 pr-12"
                    color="error"
                    @click="deleted(comment)"
                    >
                    <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-else
                    class="text-decoration-none pl -6 pr-12"
                    @click="reported(comment)"
                    >
                    <v-list-item-title>Report</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <!-- <v-divider v-if="i + 1 < comments.length"></v-divider> -->
      </div>
    </section>
    <v-snackbar v-model="delete_snackbar">
        Your comment is deleted.
    </v-snackbar>
    <v-snackbar v-model="report_snackbar">
        We have reported this comment.
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    props: {
      comments: Array,
    },
    data() {
      return {
        show: false,
        report_snackbar: false,
        delete_snackbar :false
        }
    },
    computed: {
      ...mapGetters(['loggedInUser', 'artists' ,'isAuthenticated']),
    },
    methods:{
      async deleted(comment){
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token
            }
        };
        try {
            let response = await this.$axios.$delete("/v1/e1t1/sharing/comments/"+ comment.id, config)
            this.$store.dispatch("check_share_comments", comment.shareidobj)
            this.delete_snackbar =true
        } catch (e) {
            console.log(e.response);
        }
      },
      async reported(comment){
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
.commentFormat{
   white-space: pre-line;  
}
</style>

