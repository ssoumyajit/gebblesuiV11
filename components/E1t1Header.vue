<template>
   <v-container>
        <v-toolbar flat class="mt-1">
            <nuxt-link :to="'/'" class="text-decoration-none">
            <v-layout align-center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 32 : 40"
                class="ml-2 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <v-toolbar-title><h2 style="color:black; font-family: 'Poiret One', cursive;">gebbles</h2></v-toolbar-title>
            </v-layout>
            </nuxt-link>
            <v-spacer></v-spacer> 
            <v-btn small v-if="isAuthenticated && notifications_notseen.length>0" icon dark color="indigo" class="mr-2 text-decoration-none" :to= "`/${loggedInUser.user.username}/notifications`">
            <v-badge color="error" overlap :content='notifications_notseen.length'>
            <v-icon color="black">mdi-bell</v-icon>
            </v-badge>
            </v-btn>
            <v-btn small v-if="isAuthenticated && notifications_notseen.length==0" icon dark color="indigo" class="mr-2 text-decoration-none" :to= "`/${loggedInUser.user.username}/notifications`">
            <v-icon color="black">mdi-bell</v-icon>
            </v-btn>
            <v-menu v-if="isAuthenticated" transition="slide-y-transition" open-on-hover offset-y bottom left>
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
                    <v-avatar size="36">
                    <img
                        :src = "usersPortfolio.thumb" 
                        alt="img"
                    >
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
                    :to="'/create'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Edit your portfolio</v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item
                    :to="'/notifications'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Notifications</v-list-item-title>
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
        <div v-if="!isAuthenticated">
            <v-btn rounded color="yellow" class="mr-2 text-decoration-none" to="/login">Log in</v-btn>
            <v-btn rounded color="indigo" dark class="mr-2 text-decoration-none" to="/register">Register</v-btn>
        </div>
        </v-toolbar>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio','usersPortfolio', 'notifications', 'notifications_notseen'])
    },
}
</script>