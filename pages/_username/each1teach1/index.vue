<template>
    <v-app class="ma-2">
        <!-- <v-container> -->
        <nuxt-child :sharing="sharing"/>
        <div v-if="sharing.length">
        <h3 class="font-weight-light mt-4 ml-2 d-inline">My Teachers</h3>
        <v-btn x-small v-if="isAuthenticated && loggedInUser.user.username==artist.username" icon outlined color="indigo" class="ml-2" to="/create/each1teach1/">
        <v-icon>mdi-plus</v-icon>
        </v-btn>
        <div class="d-flex flex-wrap my-4 ">
            <div v-for = "share in sharing" :key = "share.index">
                <div v-if="share.username === artist.username">
                    <TeachersCard :e1t1="share" ></TeachersCard>
                </div>
            </div>
        </div>
        <h3 class="font-weight-light mt-8 pl-4 ">My Students</h3>
        <div class="d-flex flex-wrap my-4 ">
            <div v-for = "share in sharing" :key = "share.index">
                <StudentsCard v-if="share.teacher === artist.username" :share="share" ></StudentsCard>
            </div>
        </div>
        </div>
        <div v-else >
            <div v-if="isAuthenticated && loggedInUser.user.username==artist.username" >
            <h3 class="font-weight-light mb-4 pl-4 mt-4 d-inline">Add Each One Teach One</h3>
            <v-btn x-small v-if="isAuthenticated && loggedInUser.user.username==artist.username" icon outlined color="indigo" class="ml-2" to="/create/each1teach1/">
            <v-icon>mdi-plus</v-icon>
            </v-btn>
            </div>
            <center>  
                <img class="mt-12" src="@/assets/no_posts.png" height="auto" width="30%">
            </center>
        </div>
        <!-- </v-container> -->
    </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import StudentsCard from '@/components/StudentsCard.vue'
import TeachersCard from '@/components/TeachersCard.vue'
import { mapGetters} from 'vuex'

export default {
    props: ['artist'],
    components: {
        StudentsCard,
        TeachersCard
    }, 
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    },
    head() {
        return {
            title: this.artist.artist_name,     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' + this.artist.artist_name
                }
            ]
        }
    },
    methods:{
        goback(){
            window.history.back();
        },
    },
    async asyncData({error, params}) {
      try {
        let sharing_response = await EventService.getEach1Teach1_user(params.username)
        return {
            sharing: sharing_response.data
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
}
</script>