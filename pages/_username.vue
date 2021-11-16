<template>
  <v-app>
    <!-- <v-container> -->
    <v-row class="ma-1">
        <v-col cols="12" sm="6" >
            <v-layout align-center>
                <nuxt-link :to="'/'" class="text-decoration-none">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 32 : 40"
                class="ml-2 clickable"
                :src="require('@/assets/gebbleslogo.png')"/></nuxt-link>
                <nuxt-link :to="'/'+artist.username" class="text-decoration-none">
                <h1 v-if="artist.artist_name" class="xs12" style="color:black;">{{artist.artist_name}}</h1>
                <h1 v-else class="xs12" style="color:black;">{{artist.username}}</h1></nuxt-link>
                <v-spacer></v-spacer>
                <div class= "hidden-sm-and-up">
                <v-btn small v-if="isAuthenticated && userHasPortfolio && loggedInUser.user.username==artist.username  && notifications_notseen.length>0" icon dark color="indigo" class="mr-2 text-decoration-none" :to= "`/${artist.username}/notifications`">
                <v-badge color="error" overlap :content='notifications_notseen.length'>
                <v-icon color="black">mdi-bell</v-icon>
                </v-badge>
                </v-btn>
                <v-btn small v-if="isAuthenticated && userHasPortfolio && loggedInUser.user.username==artist.username  && notifications_notseen.length==0" icon dark color="indigo" class="mr-2 text-decoration-none" :to= "`/${artist.username}/notifications`">
                <v-icon color="black">mdi-bell</v-icon>
                </v-btn>
                </div>
                <div class= "hidden-sm-and-up">
                    <div v-if="isAuthenticated"> 
                        <v-menu transition="slide-y-transition" open-on-hover offset-y bottom left>
                        <template v-slot:activator="{ on, attrs }">
                            <div v-bind="attrs"
                            v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                            </div>
                        </template>
                        <v-list>
                            <v-list-item
                            :to="'/'"
                            class="text-decoration-none pl-6 pr-12"
                            >
                            <img
                                height="30"
                                    :src="require('@/assets/gebbleslogo.png')"
                                    alt="img"
                                >
                                <v-list-item-title ><h4 style="font-family: 'Poiret One', cursive;">gebbles</h4></v-list-item-title>
                            </v-list-item>
                            <v-list-item
                            v-if="userHasPortfolio"
                            :to="'/'+ loggedInUser.user.username"
                            class="text-decoration-none pl-6 pr-12"
                            >
                            <v-avatar size="36" v-if="usersPortfolio.thumb">
                            <img
                                :src = "usersPortfolio.thumb" 
                                alt="img"
                            >
                            </v-avatar>
                            <v-avatar size="36" color="indigo" v-else >
                                <v-icon dark>
                                    mdi-account-circle
                                </v-icon>
                            </v-avatar>
                            <v-list-item-title class="pl-2">@{{ loggedInUser.user.username }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item
                            v-if="!userHasPortfolio"
                            :to="'/create/website'"
                            class="text-decoration-none pl-6 pr-12"
                            >
                            <v-list-item-title>Create a portfolio</v-list-item-title>
                            </v-list-item>
                            <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/website'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Edit your portfolio</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/journey'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Add journey</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/each1teach1'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Create E1T1</v-list-item-title>
                    </v-list-item>
                            <v-list-item
                            :to="'/settings'"
                            class="text-decoration-none pl-6 pr-12"
                            >
                            <v-list-item-title>Settings</v-list-item-title>
                            </v-list-item>
                            <v-list-item
                            :to="'/logout'"
                            class="text-decoration-none pl-6 pr-12"
                            >
                            <v-list-item-title>Log Out</v-list-item-title>
                            </v-list-item>
                        </v-list>
                        </v-menu>
                    </div>
                    <div v-else>
                        <v-menu transition="slide-y-transition" open-on-hover offset-y bottom left>
                            <template v-slot:activator="{ on, attrs }">
                                <div v-bind="attrs"
                                v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                                </div>
                            </template>
                            <v-list>
                                <v-list-item
                                :to="'/login'"
                                class="text-decoration-none pl-6 pr-12"
                                >
                                <v-list-item-title>Login</v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                :to="'/register'"
                                class="text-decoration-none pl-6 pr-12"
                                >
                                <v-list-item-title>Register</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
            </v-layout>
        </v-col>
        <v-col cols="12" sm="6" :class="{'align-center justify-center': $vuetify.breakpoint.xs, 'px-2 d-flex align-end justify-end': $vuetify.breakpoint.smAndUp}">
            <v-btn small text class="elevation-0 text-decoration-none mx-1" :to= "`/${artist.username}`"><h4>About</h4></v-btn>
            <v-btn small text class="elevation-0 text-decoration-none mx-1" :to= "`/${artist.username}/journey`"> <h4>Journey</h4></v-btn> 
            <v-btn small text class="elevation-0 text-decoration-none mx-1" :to= "`/${artist.username}/each1teach1`"><h4>E1T1</h4></v-btn>
            <div class= "d-none d-sm-block">
            <v-btn small v-if="isAuthenticated && userHasPortfolio && loggedInUser.user.username==artist.username  && notifications_notseen.length>0" icon dark color="indigo" class="mr-2 text-decoration-none" :to= "`/${artist.username}/notifications`">
            <v-badge color="error" overlap :content='notifications_notseen.length'>
            <v-icon color="black">mdi-bell</v-icon>
            </v-badge>
            </v-btn>
            <v-btn small v-if="isAuthenticated && userHasPortfolio && loggedInUser.user.username==artist.username  && notifications_notseen.length==0" icon dark color="indigo" class="mr-2 text-decoration-none" :to= "`/${artist.username}/notifications`">
            <v-icon color="black">mdi-bell</v-icon>
            </v-btn>
            </div>
            <div class= "d-none d-sm-block">
            <div v-if="isAuthenticated"> 
                <v-menu transition="slide-y-transition" open-on-hover offset-y bottom left>
                <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs"
                    v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                    </div>
                </template>
                <v-list>
                    <v-list-item
                    :to="'/'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <img
                        height="30"
                            :src="require('@/assets/gebbleslogo.png')"
                            alt="img"
                        >
                        <v-list-item-title ><h4 style="font-family: 'Poiret One', cursive;">gebbles</h4></v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/'+ loggedInUser.user.username"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-avatar size="36" v-if="usersPortfolio.thumb">
                    <img
                        :src = "usersPortfolio.thumb" 
                        alt="img"
                    >
                    </v-avatar>
                    <v-avatar size="36" color="indigo" v-else >
                        <v-icon dark>
                            mdi-account-circle
                        </v-icon>
                    </v-avatar>
                    <v-list-item-title class="pl-2">@{{ loggedInUser.user.username }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="!userHasPortfolio"
                    :to="'/create/website'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Create a portfolio</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/website'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Edit your portfolio</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/journey'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Add journey</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/each1teach1'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Create E1T1</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    :to="'/settings'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    :to="'/logout'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Log Out</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
            </div>
            <div v-else>
                <v-menu transition="slide-y-transition" open-on-hover offset-y bottom left>
                    <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs"
                        v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                        </div>
                    </template>
                    <v-list>
                        <v-list-item
                        :to="'/login'"
                        class="text-decoration-none pl-6 pr-12"
                        >
                        <v-list-item-title>Login</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                        :to="'/register'"
                        class="text-decoration-none pl-6 pr-12"
                        >
                        <v-list-item-title>Register</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            </div>
        </v-col>
    </v-row>
    <!-- </v-container> -->
    <nuxt-child :artist='artist' :bio='bio' />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import EventService from '@/services/EventService.js'
export default {
    head() {
        return {
            title: this.artist.artist_name,     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' + this.artist.name
                }
            ]
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio','usersPortfolio', 'notifications', 'notifications_notseen'])
    },
    async asyncData({error, params}) {
      try {
          let artist_response = await EventService.getArtist(params.username)
          let bio_response = await EventService.getBio(params.username)
        // let artist_response = await EventService.getArtist(params.username)
        return {
            artist: artist_response.data,
            bio: bio_response.data,
        }} catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
    layout: 'username'
    
}
</script>

<style scoped>

</style>
