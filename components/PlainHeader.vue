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
        <div v-if="isAuthenticated"> <v-menu transition="slide-y-transition" open-on-hover offset-y bottom left>
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
                    <v-icon >mdi-dots-vertical</v-icon>
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
        </v-toolbar>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import store from 'vuex'
export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio','usersPortfolio'])
    },
}
</script>