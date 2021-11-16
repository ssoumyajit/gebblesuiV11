<template>
    <v-app>
        <v-container>
        <v-btn icon class="elevation-0 white text-decoration-none ml-2" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-row class="px-4">
            <v-col cols="12" md="6" class="pa-4">
                <div align="center" justify="center">
                <img src = "~/assets/e1t11.jpeg"  width="100%" alt="portfolio logo">
                </div>
            </v-col>
            <v-col cols="12" md="6">

              <nuxt-link :to="'/create/each1teach1/'" class="text-decoration-none"><h1 class="icon">Each 1 Teach 1 <v-icon large class="icon">mdi-chevron-right</v-icon></h1></nuxt-link>
                <h2 class="font-weight-light mt-4 " style="margin:auto;" >
                Sharing is an essential part of the hiphop culture. We learn and get inspired from some amazing artists.
                Here we can acknowledge all those HipHop artists who passed their knowledge,
                skills and experiences to make us better at our own craft. You can tag and appreciate 
                your teachers and peers and let them know how much their words and teachings meant to 
                you in your own journey. Similarly you will have a list of all your 
                students and peers who learned something from you when they mention you.
            </h2>
            </v-col>
        </v-row>
        </v-container>
    </v-app>
</template>
<script>
export default {
    middleware : 'check_auth',
    data(){
        return{}
    },
    methods: {
         goback(){
            window.history.back();
        },
            
    },

}
</script>