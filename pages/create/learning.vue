<template>
    <v-app>
        <v-container class="ma-24" >
        <div class="text-xs-center mb-6" align = "center">
            <v-btn icon class="elevation-0 white text-decoration-none float-left" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
        </div>
            <v-divider class="mx-4" ></v-divider>
            <v-row>
                <v-col cols="12" md="6" class="pl-sm-6">
                    <v-row>
                    <v-col cols="8">
                        <h5 class="font-weight-light mt-4">Learning</h5>
                    </v-col>
                    </v-row>
                    <v-form v-on:submit.prevent="submit">
                        <v-row>
                            <v-col cols="12" md="9">
                                <v-text-field
                                    v-model = "learnings.lesson"
                                    label= "Title"
                                    :maxlength="30">
                                </v-text-field>
                                
                                <v-file-input
                                    show-size
                                    type="file"
                                    v-model = "learnings.video" 
                                    label="Upload image" 
                                    accept="image/*"
                                    prepend-icon="mdi-image"
                                    @change="toShowImage"
                                ></v-file-input>
                                    <v-btn v-if="editing_obj == null" class="text-decoration-none"  color="indigo" dark outlined
                                    @click="submit">Submit</v-btn>
                                    <v-btn v-else class="mt-2 mr-2 text-decoration-none" outlined  color="indigo" dark
                                    @click="update">Update</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
                <v-col cols="12" md="4" class="pl-sm-6 mt-6 grey lighten-4 rounded-xl">
                        <v-col>
                        <v-row class="pb-6 justify-center text-center">
                            <h2> {{learnings.hicontext}}</h2>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <v-img :src="imageData" height="300px" width="500px"></v-img>
                        </v-row>
                        <v-row class="pb-6 justify-center text-center">
                            <h5 class="pb-6 text-center">{{learnings.hicontent}} {{learnings.hidate}}</h5>
                        </v-row>
                        <v-row v-if="learnings.hilink" class="pb-6 justify-center text-center">
                            <v-btn icon color="indigo" >
                                <v-icon>mdi-link</v-icon>
                            </v-btn>
                        </v-row>
                        </v-col>
                </v-col>
            </v-row>
            <v-snackbar v-model="valid_snackbar">
                Please fill the required details.
                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="error"
                    icon
                    v-bind="attrs"
                    @click="valid_snackbar = false"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
            <v-snackbar v-model="snackbar">
                <div>
                    Changes saved.
                </div>
                <template v-slot:action="{ attrs }">
                    <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                        Okay.
                    </v-btn>
                </template>
            </v-snackbar>
        </v-container>
    </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    middleware : 'check_auth',
    data(){
        return {
            valid_snackbar: false,
            snackbar: false,
            learnings: {
                username: this.$store.state.auth.user.user.username,
                lesson: "",
                video: "",
                shareidobj: "",
            },
            progress:0
        }
    },
    computed: {
    ...mapGetters([])
    },
    mounted() {
    },
    methods: {
        goback(){
            window.history.back();
        },
        async remove(id){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
            };
            try {
                let response = await this.$axios.$delete("/v1/e1t1/learnings/"+id , config);
                this.dialog =false;
                this.snackbar = true;
            } 
            catch (e) {
                console.log(e);
            }
            //remove particular gallery image by id
        },
        refresh(){
            this.learnings.username = this.$store.state.auth.user.user.username;
            this.learnings.lesson= "";
            this.learnings.video= "";
            this.learnings.shareidobj= "";
        },
        async submit() {
            if(this.learnings.lesson != "" && this.shareidobj!= "" && this.learnings.hiphoto)
            {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token},
                onUploadProgress: (progressEvent) => {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    this.progress = percentCompleted;
                    console.log(this.progress);
                }

            };
            let formData = new FormData();
            for (let data in this.learnings) {
                formData.append(data, this.learnings[data]);
            }
            try {
                let response = await this.$axios.$post("/v1/e1t1/learnings/", formData, config);
                this.refresh();
                this.snackbar = true;
            } catch (e) {
                console.log(e);
            }
        }
        else{
            this.valid_snackbar =true;
        }
        } ,
        async update() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            this.refresh();
        },       
    }
}
</script>