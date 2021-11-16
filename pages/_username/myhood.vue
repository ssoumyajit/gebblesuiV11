<template>
    <v-container>
        <center>
            <img src = "@/assets/cipher_dojo.png" width="30%" >
            </center>
        <v-row>
            <v-col cols="12" md="4">
                <v-container class="grey lighten-4 pa-4 mt-4 rounded-lg" > 
                <h4 class="font-weight-light"> Members</h4>
                <div class="caption">
                    48 members, 12 countries
                </div>
                <v-card-actions> 
                    <!-- loop through members -->
                    <v-avatar class="mr-2" >
                    <img
                        src="@/assets/yiyasha.jpeg"
                        alt="img"
                    >
                    </v-avatar>
                    <v-avatar>
                        <img
                        src="~/assets/river.jpeg"
                        alt="img"
                    >
                    </v-avatar>
                    
                </v-card-actions>
                </v-container>
            </v-col>
            <v-col cols="12" md="8">
                <v-container class="grey lighten-4 pa-4 mt-4 rounded-lg" > 
                    <v-dialog v-model="dialog" width="500" >
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" 
                        color="indigo" dark  class="float-right mr-2 text-decoration-none">Make a post</v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="headline grey lighten-2">
                            Write a post
                            </v-card-title>
                            <v-card-text>
                                <v-text-field label="Title"></v-text-field>
                                <v-textarea label="Write something.."></v-textarea>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="dialog = false">
                                Post
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <h4 class="font-weight-light">Cipher Dojo</h4>
                    <v-card class="lighten-4 pa-4 mt-6">
                        <v-row>
                        <v-col class="d-inline-flex">
                            <v-avatar class="mr-2" >
                                <img src="@/assets/martha.jpeg" alt="img">
                            </v-avatar>
                            <div>
                            <div>@martha</div>
                            <div class="caption">5 Jan 2021</div>
                            </div>
                        </v-col>
                        </v-row>
                        <v-row class="pa-4 mt-2">
                            <div class="title">CYPHER SESSION jam organised by astro.</div>
                            <div> Hey ya'll there's a jam this friday, check out the astro's insta page.</div>
                        </v-row>
                        <v-row class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn icon color="orange" >
                        <v-icon>mdi-heart</v-icon> 34
                        </v-btn>
                        <v-btn class="ml-4" icon color="indigo" >
                        <v-icon>mdi-comment</v-icon>5
                        </v-btn>
                        </v-row>
                        <!-- <h4>Posts</h4> -->
                    </v-card>
                    <v-card class="lighten-4 pa-4 mt-6">
                        <v-row>
                        <v-col class="d-inline-flex">
                            <v-avatar class="mr-2" >
                                <img src="@/assets/martha.jpeg" alt="img">
                            </v-avatar>
                            <div>
                            <div>@martha</div>
                            <div class="caption">25 Dec 2020</div>
                            </div>
                        </v-col>
                        </v-row>
                        <v-row class="pa-4 mt-2">
                            <div class="title">Welcome to the room everyone.</div>
                            <div> Hope ya'll are safe at home. Let's share and grow together.</div>
                        </v-row>
                        <v-row class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn icon color="orange" >
                        <v-icon>mdi-heart</v-icon> 34
                        </v-btn>
                        <v-btn class="ml-4" icon color="indigo" >
                        <v-icon>mdi-comment</v-icon>5
                        </v-btn>
                        </v-row>
                        <!-- <h4>Posts</h4> -->
                    </v-card>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data(){
        return{
            dialog: false,
        }
    },
    
}
</script>