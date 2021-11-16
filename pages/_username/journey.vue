<template>
    <v-app class="ma-2">
        <div v-if="upcoming.length >0">
        <h3 class="font-weight-light mb-4 pl-4 mt-4 d-inline">Upcoming events</h3>
        <div class="d-flex flex-wrap pa-0 my-4" >
            <div v-for = "upcoming in upcoming" :key = "upcoming.index" class="pa-0">
                <journey-card :journey = "upcoming" ></journey-card>
            </div>
        </div>
        </div>
        <div v-if="journey.length">
            <h3 class="font-weight-light mb-4 ml-2 mt-4 d-inline">Highlights</h3>
            <v-btn x-small v-if="isAuthenticated && loggedInUser.user.username==artist.username" 
            icon outlined color="indigo" class="ml-2" @click="createJourney">
                <v-icon >mdi-plus</v-icon>
            </v-btn>
            <div class="d-flex flex-wrap pa-0 my-4" >
                <div v-for = "journey in journey" :key = "journey.index" class="pa-0">
                    <journey-card :journey = "journey" v-if="journey.ishighlight" ></journey-card>
                </div>
            </div>
            <div >
                <h3 class="font-weight-light mb-4 pl-4 mt-4 d-inline">Journey</h3>
                <div class="d-flex flex-wrap" >
                    <div v-for = "journey in journey" :key = "journey.index" >
                        <journey-card :journey = "journey" v-if="!journey.ishighlight"></journey-card>
                    </div>
                </div>
            </div>
        </div>
        <div v-else >
            <div v-if="isAuthenticated && loggedInUser.user.username==artist.username" >
            <h3 class="font-weight-light mb-4 pl-4 mt-4 d-inline">Share your journey</h3>
            <v-btn x-small icon outlined color="indigo" class="ml-2" @click="createJourney">
                <v-icon >mdi-plus</v-icon>
            </v-btn>
            </div>
            <center>
                <img class="mt-12" src="@/assets/no_posts.png" height="auto" width="30%">
            </center>
        </div>
    </v-app>
</template>
<script>
import { mapGetters} from 'vuex'
import EventService from '@/services/EventService.js'
import JourneyCard from "@/components/JourneyCard.vue"
export default {
    head() {
        return {
            title: this.artist.username,     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' + this.artist.name
                }
            ]
        }
    },
    components:{
        JourneyCard
    },
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    },
    props: ["artist"],
    async asyncData({error, params, store}) {
        if(store.state.auth.user ){ //if user is logged in
            if(store.state.auth.user.user.username == params.username){ //if user is checking own data
                const config = {
                headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + store.state.auth.user.access_token}
                };
                try {
                let journey_response = await EventService.getJourney(params.username, config)
                let upcoming_events = await EventService.getUpcomingEvents(params.username, config)
                return {
                        journey: journey_response.data,
                        upcoming: upcoming_events.data
                    }
                } catch (err) {
                    console.log(err);
                    error({statusCode:503,  message: err.message})
                    } 
            }}
        try {
        let journey_response = await EventService.getJourney(params.username)
        let upcoming_events = await EventService.getUpcomingEvents(params.username)
        return {
                journey: journey_response.data,
                upcoming: upcoming_events.data
            }
        } catch (err) {
            console.log(err);
            error({statusCode:503,  message: err.message})
        }
    },
    methods: {
    goback(){
        window.history.back();
    },
    createJourney(){
        this.$store.dispatch("remove_editing_obj");
        this.$router.push("/create/journey");
    }
    }
}
</script>