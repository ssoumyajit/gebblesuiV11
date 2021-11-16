<template>
    <v-container >
        <div class="text-xs-center mb-6" align = "center">
            <v-btn icon class="elevation-0 white text-decoration-none float-left" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
            <!-- <v-btn small outlined  color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/highlights/`">test</v-btn>
            <v-btn small dark color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/website/`">Edit Website</v-btn>
            <v-btn small outlined color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/journey/`">Add Journey </v-btn> -->
         </div>
        <!-- <v-divider class="mx-4" ></v-divider> -->
            <v-row>
            <v-col cols="12" md="6" class="pl-sm-6">
                <v-row>
                <v-col cols="8">
                    <h3 class="mt-4">Build your website</h3>
                </v-col>
                <v-col cols="2">
                    <v-row class="justify-end mt-4 mr-8">
                    <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" color="indigo"><v-icon>mdi-information-outline</v-icon></v-btn>
                    </template>
                    <span>Share about yourself. Who you are. What you like.<br> 
                        The dance styles/crew that you represent along with your social handles.<br>
                        You can preview it while uploading the information. <br>
                        Time to upload contents, let's go.</span>
                    </v-tooltip>
                    </v-row>
                </v-col>
                </v-row>
                <v-form v-on:submit.prevent="submit_about">
                        <v-row>
                            <v-col cols="12" md="9">
                                <v-text-field
                                    required 
                                    v-model = "artist_data.artist_name"
                                    label="Name"
                                    :maxlength="30">
                                </v-text-field>
                                <v-select label="Representing(country)" v-model= "artist_data.country"
                                    :items="countries"
                                    item-text="name"
                                    item-value="code"
                                    required
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-form>
                <v-form v-on:submit.prevent="submit">
                    <v-row>
                        <v-col cols="12" md="9">
                            <v-autocomplete 
                                v-model= "dummy_style" 
                                :items="styles" 
                                attach 
                                chips 
                                hide-selected
                                clearable
                                deletable-chips
                                label="Dance Style" 
                                @input="makeString"
                                multiple>
                            </v-autocomplete>
                            <v-text-field
                                v-model= "bio.crew"
                                label="Crew you represent"
                                :maxlength="120">
                            </v-text-field>
                            <v-text-field
                                v-model= "bio.quote"
                                label="Any Favourite Quote?"
                                :maxlength="120">
                            </v-text-field>
                            <v-textarea
                                v-model= "bio.introduction"
                                label="A little background">
                            </v-textarea>
                            <v-btn v-show="!inputInsta &&!bio.ig" icon color=pink @click="inputInsta=true"><v-icon>mdi-instagram</v-icon></v-btn>
                            <v-text-field
                                v-show="inputInsta || bio.ig"
                                color="pink"
                                prepend-icon="mdi-instagram"
                                v-model= "bio.ig"
                                append-icon="mdi-close"
                                label="Instagram ID"
                                @click:append="bio.ig=''; inputInsta=!inputInsta">
                            </v-text-field>
                            <v-btn v-show="!inputFace &&!bio.fb" icon color=indigo @click="inputFace=true"><v-icon>mdi-facebook</v-icon></v-btn>
                            <v-text-field
                                v-show="inputFace || bio.fb"
                                prepend-icon="mdi-facebook"
                                v-model= "bio.fb"
                                append-icon="mdi-close"
                                label="Facebook ID"
                                @click:append="bio.fb=''; inputFace=!inputFace">
                            </v-text-field>
                            <v-btn v-show="!inputMail &&!bio.site" icon color=blue @click="inputMail=true"><v-icon>mdi-mail</v-icon></v-btn>
                            <v-text-field
                                v-show="inputMail ||bio.site"
                                prepend-icon="mdi-email"
                                v-model= "bio.site"
                                append-icon="mdi-close"
                                label="Personal Website URL"
                                @click:append="bio.site=''; inputMail=!inputMail"
                                >
                            </v-text-field>
                            <v-btn v-show="!bio.vid1 && !yt" icon color=red @click="yt=true"><v-icon>mdi-youtube</v-icon></v-btn>
                            <v-text-field
                                :error-messages="ytLinkError1"
                                v-show="yt || bio.vid1"
                                color="red"
                                v-model= "bio.vid1"
                                label="Youtube link"
                                prepend-icon="mdi-plus"
                                append-icon="mdi-close"
                                @input="showYoutubeVideo(1)"
                                @click:append="bio.vid1 =''; yt=!yt;showYoutubeVideo(1)"
                                @click:prepend="yt1=true"
                                >
                            </v-text-field>
                            <v-text-field
                            :error-messages="ytLinkError2"
                            @input="showYoutubeVideo(2)"
                                v-show="yt1 || bio.vid2"
                                color="red"
                                v-model= "bio.vid2"
                                label="Youtube link"
                                prepend-icon="mdi-plus"
                                append-icon="mdi-close"
                                @click:append="bio.vid2 =''; yt1=!yt1;showYoutubeVideo(2)"
                                @click:prepend="yt2=true">
                            </v-text-field>
                            <v-text-field
                            :error-messages="ytLinkError3"
                            @input="showYoutubeVideo(3)"
                                v-show="yt2 || bio.vid3"
                                color="red"
                                v-model= "bio.vid3"
                                label="Youtube link"
                                prepend-icon="mdi-plus"
                                append-icon="mdi-close"
                                @click:append="bio.vid3 =''; yt2=!yt2;showYoutubeVideo(3)"
                                @click:prepend="yt3=true">
                            </v-text-field>
                            <v-text-field
                            :error-messages="ytLinkError4"
                            @input="showYoutubeVideo(4)"
                                v-show="yt3 || bio.vid4"
                                color="red"
                                v-model= "bio.vid4"
                                label="Youtube link"
                                append-icon="mdi-close"
                                @click:append="bio.vid4 =''; yt3=!yt3; showYoutubeVideo(4)">
                            </v-text-field>
                            <v-container grid-list-md :class="{'pa-1': $vuetify.breakpoint.smAndDown, 'ma-1': $vuetify.breakpoint.mdAndUp}">
                                <v-layout class="flex-wrap">
                                    <v-flex xs6 md6>
                                        <div class=" rounded-lg grey lighten-4">
                                            <v-img :src="imageData1" height="200px" width="200px"></v-img>
                                            <v-btn icon>
                                                <v-icon color="indigo" small @click="onPick">mdi-image-plus</v-icon>
                                            </v-btn>
                                            <input 
                                            type="file" 
                                            name = "gallery" 
                                            style="display:none" 
                                            ref="fileInput" 
                                            accept="image/*"
                                            required
                                            @change="onFileChange">
                                            <v-btn icon>
                                                <v-icon color="error" small @click="removeImage">mdi-delete-outline</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-flex>
                                    <v-flex xs6 md6>
                                        <div class="rounded-lg grey lighten-4">
                                            <v-img :src="imageData2" height="200px" width="200px"></v-img>
                                            <v-btn icon>
                                                <v-icon color="indigo" small @click="onPick1">mdi-image-plus</v-icon>
                                            </v-btn>
                                            <input 
                                            type="file" 
                                            name = "gallery" 
                                            style="display:none" 
                                            ref="fileInput1" 
                                            accept="image/*"
                                            required
                                            @change="onFileChange1">
                                            <v-btn icon>
                                                <v-icon color="error" small @click="removeImage1">mdi-delete-outline</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-flex>
                                    <v-flex xs6 md6>
                                        <div class="rounded-lg grey lighten-4">
                                            <v-img :src="imageData3" height="200px" width="200px"></v-img>
                                            <v-btn icon>
                                                <v-icon color="indigo" small @click="onPick2">mdi-image-plus</v-icon>
                                            </v-btn>
                                            <input 
                                            type="file" 
                                            name = "gallery" 
                                            style="display:none" 
                                            ref="fileInput2" 
                                            accept="image/*"
                                            required
                                            @change="onFileChange2">
                                            <v-btn icon>
                                                <v-icon color="error" small @click="removeImage2" >mdi-delete-outline</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-flex>
                                    <v-flex xs6 md6>
                                        <div class="rounded-lg grey lighten-4">
                                            <v-img :src="imageData4" height="200px" width="200px"></v-img>
                                            <v-btn icon>
                                                <v-icon color="indigo" small @click="onPick3">mdi-image-plus</v-icon>
                                            </v-btn>
                                            <input 
                                            type="file" 
                                            name = "gallery" 
                                            style="display:none" 
                                            ref="fileInput3" 
                                            accept="image/*"
                                            required
                                            @change="onFileChange3">
                                            <v-btn icon>
                                                <v-icon color="error" small @click="removeImage3" >mdi-delete-outline</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-container> 
                            <v-btn v-if="!userHasBio && !userHasPortfolio" outlined small class="text-decoration-none"  color="indigo" dark
                                @click="submit">Submit</v-btn>
                                <v-btn v-if="userHasBio || userHasPortfolio" small class="mt-2 mr-2 text-decoration-none" outlined  color="indigo" dark
                                @click="update">Update</v-btn>
                            <v-dialog  v-model="dialog" width="500">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-if="userHasBio || userHasPortfolio" dark small color="error" class="mt-2 mr-2 text-decoration-none" 
                                v-bind="attrs" v-on="on">Delete Website</v-btn>
                            </template>
                            <v-card class="pa-4">
                                <p>Are you sure you want to delete your website?</p>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn small class="px-4 text-decoration-none"  color="error" dark 
                                    @click="deleted">Delete</v-btn>
                                <v-btn color="indigo" small class="px-4 text-decoration-none"  dark outlined  @click="dialog = false">
                                    Cancel
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col cols="12" md="6" class="pl-sm-6 lighten-4 rounded-xl">
                <h3 class="my-4">Preview your website</h3>
                <v-col>
                    <v-row class="pb-6 justify-center text-center">
                        <h2> {{artist_data.artist_name}}</h2>
                        <v-spacer></v-spacer>
                        <v-btn v-if="artist_data.country " icon class="text-decoration-none" >
                            <country-flag :country= artist_data.country />
                        </v-btn>
                    </v-row>
                    <v-row class="pb-6 justify-center text-center">
                        <croppa
                            v-model="cropImage"
                            canvas-color="transparent"
                            :width="600"
                            :height="340"
                            :show-loading="true"
                            :initial-image="initialImage"
                            :prevent-white-space="true"
                            :remove-button-color="'black'"
                        ></croppa>
                    </v-row>
                    </v-col>
                    <v-col>
                    <v-row class="pb-6 justify-center text-center">
                        <h5 class=" text-center">{{bio.introduction}} </h5>
                    </v-row>
                    <v-row v-if="bio.quote" class="pb-6 justify-center text-center">
                        <h5 class=" text-center font-italic">"{{bio.quote}}" </h5>
                    </v-row>
                    <v-row v-if="bio.style" class="pb-6 justify-center text-center">
                        <h5 class="text-center font-italic">{{bio.style}} </h5>
                    </v-row>
                    <v-row v-if="bio.crew" class="pb-6 justify-center text-center">
                        <h5 class=" text-center">Representing: {{bio.crew}} 🙏 </h5>
                    </v-row>
                    <v-row class="pb-6 justify-center text-center">
                        <v-col v-if="bio.ig"><v-icon>mdi-instagram</v-icon></v-col>
                        <v-col v-if="bio.fb"><v-icon>mdi-facebook</v-icon></v-col>
                        <v-col v-if="bio.site"><v-icon>mdi-email</v-icon></v-col>
                    </v-row>
                    </v-col>
                    <v-row >
                    <v-col
                    v-if="videoId1"
                    class="d-flex child-flex"
                    cols="6">
                    <youtube width="auto" height="100%" :video-id= 'videoId1'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId2"
                    class="d-flex child-flex"
                    cols="6">
                    <youtube width="auto" height="100%" :video-id= 'videoId2'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId3"
                    class="d-flex child-flex"
                    cols="6">
                    <youtube width="auto" height="100%" :video-id= 'videoId3'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId4"
                    class="d-flex child-flex"
                    cols="6">
                    <youtube width="auto" height="100%" :video-id= 'videoId4'></youtube>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-snackbar v-model="snackbar" color="success">
        <div>
            Changes saved.
        </div>
        <template v-slot:action="{ attrs }">
            <v-btn small color="blue" text v-bind="attrs" @click="snackbar = false">
                <v-icon>mdi-check</v-icon>
            </v-btn>
        </template>
        </v-snackbar>
    </v-container>
</template>
<script>
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import Vue from "vue";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
Vue.use(Croppa);

export default {
    middleware : 'check_auth',
    components: {
        CountryFlag,
        Youtube
    },
    computed: {
        ...mapGetters(['usersBio', 'userHasBio', 'usersPortfolio', 'userHasPortfolio', 'loggedInUser'])
    },
    mounted() {
        this.$store.dispatch("check_user_portfolio");
        this.$store.dispatch("check_user_bio");
    },
    created(){
        if(this.$store.state.hasPortfolio)
        {
            this.artist_data = Object.assign({}, this.$store.getters.usersPortfolio);
            this.initialImage = this.artist_data.cover
        }
        if(this.$store.state.hasBio) 
        {
            this.bio = Object.assign({}, this.$store.getters.usersBio);
            if(this.bio.style==""){
                this.dummy_style = [];
            }
            else{
                let arr = this.bio.style.split(',');
            this.dummy_style = arr;}
            //assigning the bio from store if it exists
            this.imageData1 = this.bio.gallery1
            this.imageData2 = this.bio.gallery2
            this.imageData3 = this.bio.gallery3
            this.imageData4 = this.bio.gallery4
            let url1 = this.bio.vid1 //getting value of youtube video urls
            let url2 = this.bio.vid2
            let url3 = this.bio.vid3
            let url4 = this.bio.vid4
            let videoId1 = getIdFromURL(url1) //getting id from video url
            this.videoId1 = videoId1 //assigning the id to <youtube> video id
            let videoId2 = getIdFromURL(url2)
            this.videoId2 = videoId2
            let videoId3 = getIdFromURL(url3)
            this.videoId3 = videoId3
            let videoId4 = getIdFromURL(url4)
            this.videoId4 = videoId4
        }
    },
    data(){
        return {
                // this is bio object
            bio: {
                username: this.$store.state.auth.user.user.username,
                style: "",
                introduction: "",
                quote: "",
                crew: "",
                ig: "",
                fb: "",
                site: "",
                gallery1 : "",
                gallery2 : "",
                gallery3 : "",
                gallery4 : "",
                vid1:"",
                vid2:"",
                vid3:"",
                vid4:""
            },
            artist_data: {
                artist_name: "",
                username: this.$store.state.auth.user.user.username,
                country: "",
                cover: "",
            },
            rm:"",
            dummy_style:[], //keep style in string from array
            cropImage: null, //imagecropper
            initialImage:'',
            dialog: false,
            styles: ['Breaking','HipHop', 'House', 'Locking', 'Popping','Experimental','Other', 'Still Exploring'],
            imageData: "",
            imageData1: "",
            imageData2: "",
            imageData3: "",
            imageData4: "",
            yt: false,
            yt1: false,
            yt2: false,
            yt3: false,
            videoId1:'',
            videoId2:'',
            videoId3:'',
            videoId4:'',
            ytLinkError1:'',
            ytLinkError2:'',
            ytLinkError3:'',
            ytLinkError4:'',
            inputInsta: false,
            inputFace: false,
            inputMail: false,
            snackbar: false,
            text: 'Website created successfully.',
            overlay: false,
            progress: 0,
            countries: [
                {"name": "Afghanistan", "code": "AF"},
                {"name": "Åland Islands", "code": "AX"},
                {"name": "Albania", "code": "AL"},
                {"name": "Algeria", "code": "DZ"},
                {"name": "American Samoa", "code": "AS"},
                {"name": "AndorrA", "code": "AD"},
                {"name": "Angola", "code": "AO"},
                {"name": "Anguilla", "code": "AI"},
                {"name": "Antarctica", "code": "AQ"},
                {"name": "Antigua and Barbuda", "code": "AG"},
                {"name": "Argentina", "code": "AR"},
                {"name": "Armenia", "code": "AM"},
                {"name": "Aruba", "code": "AW"},
                {"name": "Australia", "code": "AU"},
                {"name": "Austria", "code": "AT"},
                {"name": "Azerbaijan", "code": "AZ"},
                {"name": "Bahamas", "code": "BS"},
                {"name": "Bahrain", "code": "BH"},
                {"name": "Bangladesh", "code": "BD"},
                {"name": "Barbados", "code": "BB"},
                {"name": "Belarus", "code": "BY"},
                {"name": "Belgium", "code": "BE"},
                {"name": "Belize", "code": "BZ"},
                {"name": "Benin", "code": "BJ"},
                {"name": "Bermuda", "code": "BM"},
                {"name": "Bhutan", "code": "BT"},
                {"name": "Bolivia", "code": "BO"},
                {"name": "Bosnia and Herzegovina", "code": "BA"},
                {"name": "Botswana", "code": "BW"},
                {"name": "Bouvet Island", "code": "BV"},
                {"name": "Brazil", "code": "BR"},
                {"name": "British Indian Ocean Territory", "code": "IO"},
                {"name": "Brunei Darussalam", "code": "BN"},
                {"name": "Bulgaria", "code": "BG"},
                {"name": "Burkina Faso", "code": "BF"},
                {"name": "Burundi", "code": "BI"},
                {"name": "Cambodia", "code": "KH"},
                {"name": "Cameroon", "code": "CM"},
                {"name": "Canada", "code": "CA"},
                {"name": "Cape Verde", "code": "CV"},
                {"name": "Cayman Islands", "code": "KY"},
                {"name": "Central African Republic", "code": "CF"},
                {"name": "Chad", "code": "TD"},
                {"name": "Chile", "code": "CL"},
                {"name": "China", "code": "CN"},
                {"name": "Christmas Island", "code": "CX"},
                {"name": "Cocos (Keeling) Islands", "code": "CC"},
                {"name": "Colombia", "code": "CO"},
                {"name": "Comoros", "code": "KM"},
                {"name": "Congo", "code": "CG"},
                {"name": "Congo, The Democratic Republic of the", "code": "CD"},
                {"name": "Cook Islands", "code": "CK"},
                {"name": "Costa Rica", "code": "CR"},
                {"name": "Cote D'Ivoire", "code": "CI"},
                {"name": "Croatia", "code": "HR"},
                {"name": "Cuba", "code": "CU"},
                {"name": "Cyprus", "code": "CY"},
                {"name": "Czech Republic", "code": "CZ"},
                {"name": "Denmark", "code": "DK"},
                {"name": "Djibouti", "code": "DJ"},
                {"name": "Dominica", "code": "DM"},
                {"name": "Dominican Republic", "code": "DO"},
                {"name": "Ecuador", "code": "EC"},
                {"name": "Egypt", "code": "EG"},
                {"name": "El Salvador", "code": "SV"},
                {"name": "Equatorial Guinea", "code": "GQ"},
                {"name": "Eritrea", "code": "ER"},
                {"name": "Estonia", "code": "EE"},
                {"name": "Ethiopia", "code": "ET"},
                {"name": "Falkland Islands (Malvinas)", "code": "FK"},
                {"name": "Faroe Islands", "code": "FO"},
                {"name": "Fiji", "code": "FJ"},
                {"name": "Finland", "code": "FI"},
                {"name": "France", "code": "FR"},
                {"name": "French Guiana", "code": "GF"},
                {"name": "French Polynesia", "code": "PF"},
                {"name": "French Southern Territories", "code": "TF"},
                {"name": "Gabon", "code": "GA"},
                {"name": "Gambia", "code": "GM"},
                {"name": "Georgia", "code": "GE"},
                {"name": "Germany", "code": "DE"},
                {"name": "Ghana", "code": "GH"},
                {"name": "Gibraltar", "code": "GI"},
                {"name": "Greece", "code": "GR"},
                {"name": "Greenland", "code": "GL"},
                {"name": "Grenada", "code": "GD"},
                {"name": "Guadeloupe", "code": "GP"},
                {"name": "Guam", "code": "GU"},
                {"name": "Guatemala", "code": "GT"},
                {"name": "Guernsey", "code": "GG"},
                {"name": "Guinea", "code": "GN"},
                {"name": "Guinea-Bissau", "code": "GW"},
                {"name": "Guyana", "code": "GY"},
                {"name": "Haiti", "code": "HT"},
                {"name": "Heard Island and Mcdonald Islands", "code": "HM"},
                {"name": "Holy See (Vatican City State)", "code": "VA"},
                {"name": "Honduras", "code": "HN"},
                {"name": "Hong Kong", "code": "HK"},
                {"name": "Hungary", "code": "HU"},
                {"name": "Iceland", "code": "IS"},
                {"name": "India", "code": "IN"},
                {"name": "Indonesia", "code": "ID"},
                {"name": "Iran, Islamic Republic Of", "code": "IR"},
                {"name": "Iraq", "code": "IQ"},
                {"name": "Ireland", "code": "IE"},
                {"name": "Isle of Man", "code": "IM"},
                {"name": "Israel", "code": "IL"},
                {"name": "Italy", "code": "IT"},
                {"name": "Jamaica", "code": "JM"},
                {"name": "Japan", "code": "JP"},
                {"name": "Jersey", "code": "JE"},
                {"name": "Jordan", "code": "JO"},
                {"name": "Kazakhstan", "code": "KZ"},
                {"name": "Kenya", "code": "KE"},
                {"name": "Kiribati", "code": "KI"},
                {"name": "Korea, Democratic People'S Republic of", "code": "KP"},
                {"name": "Korea, Republic of", "code": "KR"},
                {"name": "Kuwait", "code": "KW"},
                {"name": "Kyrgyzstan", "code": "KG"},
                {"name": "Lao People'S Democratic Republic", "code": "LA"},
                {"name": "Latvia", "code": "LV"},
                {"name": "Lebanon", "code": "LB"},
                {"name": "Lesotho", "code": "LS"},
                {"name": "Liberia", "code": "LR"},
                {"name": "Libyan Arab Jamahiriya", "code": "LY"},
                {"name": "Liechtenstein", "code": "LI"},
                {"name": "Lithuania", "code": "LT"},
                {"name": "Luxembourg", "code": "LU"},
                {"name": "Macao", "code": "MO"},
                {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
                {"name": "Madagascar", "code": "MG"},
                {"name": "Malawi", "code": "MW"},
                {"name": "Malaysia", "code": "MY"},
                {"name": "Maldives", "code": "MV"},
                {"name": "Mali", "code": "ML"},
                {"name": "Malta", "code": "MT"},
                {"name": "Marshall Islands", "code": "MH"},
                {"name": "Martinique", "code": "MQ"},
                {"name": "Mauritania", "code": "MR"},
                {"name": "Mauritius", "code": "MU"},
                {"name": "Mayotte", "code": "YT"},
                {"name": "Mexico", "code": "MX"},
                {"name": "Micronesia, Federated States of", "code": "FM"},
                {"name": "Moldova, Republic of", "code": "MD"},
                {"name": "Monaco", "code": "MC"},
                {"name": "Mongolia", "code": "MN"},
                {"name": "Montserrat", "code": "MS"},
                {"name": "Morocco", "code": "MA"},
                {"name": "Mozambique", "code": "MZ"},
                {"name": "Myanmar", "code": "MM"},
                {"name": "Namibia", "code": "NA"},
                {"name": "Nauru", "code": "NR"},
                {"name": "Nepal", "code": "NP"},
                {"name": "Netherlands", "code": "NL"},
                {"name": "Netherlands Antilles", "code": "AN"},
                {"name": "New Caledonia", "code": "NC"},
                {"name": "New Zealand", "code": "NZ"},
                {"name": "Nicaragua", "code": "NI"},
                {"name": "Niger", "code": "NE"},
                {"name": "Nigeria", "code": "NG"},
                {"name": "Niue", "code": "NU"},
                {"name": "Norfolk Island", "code": "NF"},
                {"name": "Northern Mariana Islands", "code": "MP"},
                {"name": "Norway", "code": "NO"},
                {"name": "Oman", "code": "OM"},
                {"name": "Pakistan", "code": "PK"},
                {"name": "Palau", "code": "PW"},
                {"name": "Palestinian Territory, Occupied", "code": "PS"},
                {"name": "Panama", "code": "PA"},
                {"name": "Papua New Guinea", "code": "PG"},
                {"name": "Paraguay", "code": "PY"},
                {"name": "Peru", "code": "PE"},
                {"name": "Philippines", "code": "PH"},
                {"name": "Pitcairn", "code": "PN"},
                {"name": "Poland", "code": "PL"},
                {"name": "Portugal", "code": "PT"},
                {"name": "Puerto Rico", "code": "PR"},
                {"name": "Qatar", "code": "QA"},
                {"name": "Reunion", "code": "RE"},
                {"name": "Romania", "code": "RO"},
                {"name": "Russian Federation", "code": "RU"},
                {"name": "RWANDA", "code": "RW"},
                {"name": "Saint Helena", "code": "SH"},
                {"name": "Saint Kitts and Nevis", "code": "KN"},
                {"name": "Saint Lucia", "code": "LC"},
                {"name": "Saint Pierre and Miquelon", "code": "PM"},
                {"name": "Saint Vincent and the Grenadines", "code": "VC"},
                {"name": "Samoa", "code": "WS"},
                {"name": "San Marino", "code": "SM"},
                {"name": "Sao Tome and Principe", "code": "ST"},
                {"name": "Saudi Arabia", "code": "SA"},
                {"name": "Senegal", "code": "SN"},
                {"name": "Serbia and Montenegro", "code": "CS"},
                {"name": "Seychelles", "code": "SC"},
                {"name": "Sierra Leone", "code": "SL"},
                {"name": "Singapore", "code": "SG"},
                {"name": "Slovakia", "code": "SK"},
                {"name": "Slovenia", "code": "SI"},
                {"name": "Solomon Islands", "code": "SB"},
                {"name": "Somalia", "code": "SO"},
                {"name": "South Africa", "code": "ZA"},
                {"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
                {"name": "Spain", "code": "ES"},
                {"name": "Sri Lanka", "code": "LK"},
                {"name": "Sudan", "code": "SD"},
                {"name": "Suriname", "code": "SR"},
                {"name": "Svalbard and Jan Mayen", "code": "SJ"},
                {"name": "Swaziland", "code": "SZ"},
                {"name": "Sweden", "code": "SE"},
                {"name": "Switzerland", "code": "CH"},
                {"name": "Syrian Arab Republic", "code": "SY"},
                {"name": "Taiwan, Province of China", "code": "TW"},
                {"name": "Tajikistan", "code": "TJ"},
                {"name": "Tanzania, United Republic of", "code": "TZ"},
                {"name": "Thailand", "code": "TH"},
                {"name": "Timor-Leste", "code": "TL"},
                {"name": "Togo", "code": "TG"},
                {"name": "Tokelau", "code": "TK"},
                {"name": "Tonga", "code": "TO"},
                {"name": "Trinidad and Tobago", "code": "TT"},
                {"name": "Tunisia", "code": "TN"},
                {"name": "Turkey", "code": "TR"},
                {"name": "Turkmenistan", "code": "TM"},
                {"name": "Turks and Caicos Islands", "code": "TC"},
                {"name": "Tuvalu", "code": "TV"},
                {"name": "Uganda", "code": "UG"},
                {"name": "Ukraine", "code": "UA"},
                {"name": "United Arab Emirates", "code": "AE"},
                {"name": "United Kingdom", "code": "GB"},
                {"name": "United States", "code": "US"},
                {"name": "United States Minor Outlying Islands", "code": "UM"},
                {"name": "Uruguay", "code": "UY"},
                {"name": "Uzbekistan", "code": "UZ"},
                {"name": "Vanuatu", "code": "VU"},
                {"name": "Venezuela", "code": "VE"},
                {"name": "Viet Nam", "code": "VN"},
                {"name": "Virgin Islands, British", "code": "VG"},
                {"name": "Virgin Islands, U.S.", "code": "VI"},
                {"name": "Wallis and Futuna", "code": "WF"},
                {"name": "Western Sahara", "code": "EH"},
                {"name": "Yemen", "code": "YE"},
                {"name": "Zambia", "code": "ZM"},
                {"name": "Zimbabwe", "code": "ZW"}
                ],
        }
    },
    methods: {
        ...mapActions(['check_user_bio','check_user_portfolio']),
        showYoutubeVideo(id){
            switch(id) {
                case 1:
                    {
                        let url= this.bio.vid1
                        if (url != undefined || url != '') {        
                            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                            var match = url.match(regExp);
                            if (match && match[2].length == 11) {
                                // Do anything for being valid        
                                this.ytLinkError1 =``
                            } else {
                                //invalid youtube url
                                this.ytLinkError1 = `Enter a valid Youtube URL.`
                            }
                        }
                        let videoId1 = getIdFromURL(url) //getting id from video url
                        this.videoId1 = videoId1
                    }
                    break;
                case 2:
                    {
                        let url= this.bio.vid2
                        if (url != undefined || url != '') {        
                            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                            var match = url.match(regExp);
                            if (match && match[2].length == 11) {
                                // Do anything for being valid        
                                this.ytLinkError2 =``
                            } else {
                                //invalid youtube url
                                this.ytLinkError2 = `Enter a valid Youtube URL.`
                            }
                        }
                        let videoId2 = getIdFromURL(url) //getting id from video url
                        this.videoId2 = videoId2
                    }
                    break;
                case 3:
                    {
                        let url= this.bio.vid3
                        if (url != undefined || url != '') {        
                            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                            var match = url.match(regExp);
                            if (match && match[2].length == 11) {
                                // Do anything for being valid        
                                this.ytLinkError3 =``
                            } else {
                                //invalid youtube url
                                this.ytLinkError3 = `Enter a valid Youtube URL.`
                            }
                        }
                        let videoId3 = getIdFromURL(url) //getting id from video url
                        this.videoId3 = videoId3
                    }
                    break;
                case 4:
                    {
                        let url= this.bio.vid4
                        if (url != undefined || url != '') {        
                            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                            var match = url.match(regExp);
                            if (match && match[2].length == 11) {
                                // Do anything for being valid        
                                this.ytLinkError4 =``
                            } else {
                                //invalid youtube url
                                this.ytLinkError4 = `Enter a valid Youtube URL.`
                            }
                        }
                        let videoId4 = getIdFromURL(url) //getting id from video url
                        this.videoId4 = videoId4
                    }
                    break;
                default:
                    // code block
                }
        },
        goback(){
            window.history.back();
        },
        makeString() //making array as string for backend to accept
        {
            if(this.dummy_style.length == 0)
            {
                this.bio.style= ""
                this.dummy_style=[]
                console.log("empty the style");
                console.log("style",this.bio.style);
                console.log(this.bio);
                }
            else{
                let arr = this.dummy_style;
                console.log(this.dummy_style);
                console.log(this.bio.style);
                this.bio.style= arr.join();
                console.log(this.bio.style);
                console.log("style after JOIN",this.bio.style);
            }
        },
        toShowImage(){
            if(this.artist_data.cover)
	        this.imageData = URL.createObjectURL(this.artist_data.cover);
        },
        onFileChange(e) {
            let files = e.target.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData1 = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                this.bio.gallery1 = files[0];
            }
        },
        onFileChange1(e) {
            let files = e.target.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData2 = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                this.bio.gallery2 = files[0];
            }
        },
        onFileChange2(e) {
            let files = e.target.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData3 = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                this.bio.gallery3 = files[0];
            }
        },
        onFileChange3(e) {
            let files = e.target.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData4 = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                this.bio.gallery4 = files[0];
            }
        },
        onPick() //changing the click from button to input using refs
        {
            this.$refs.fileInput.click()
        },
        onPick1() //changing the click from button to input using refs
        {
            this.$refs.fileInput1.click()
        },
        onPick2() //changing the click from button to input using refs
        {
            this.$refs.fileInput2.click()
        },
        onPick3() //changing the click from button to input using refs
        {
            this.$refs.fileInput3.click()
        },
        removeImage(){
            this.imageData1 = ""
            this.bio.gallery1 =''
        },
        removeImage1(){
            this.imageData2 = ""
            this.bio.gallery2 =''
        },
        removeImage2(){
            this.imageData3 = ""
            this.bio.gallery3 =''
        },
        removeImage3(){
            this.imageData4 = ''
            this.bio.gallery4 =''
        },
        dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
            u8arr[n] = bstr.charCodeAt(n);
            }
        return new File([u8arr], filename, {type:mime});
        },
        
        async submit(){
            //generating a file object from cropedimage url
            // console.log(this.cropImage);
                let url = this.cropImage.generateDataUrl(); 
                if (!url){
                    console.log("no image");}
                else{
                    var fileData = this.dataURLtoFile(url, "coverimage.png");
                    this.artist_data.cover = fileData;
                }
             // style is taken as array and made into a string
            //required attributes check..
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token,
                    },
                onUploadProgress: (progressEvent) => {
                  var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                  this.progress = percentCompleted;
                  console.log(this.progress);
                }
            };
            let formPortfolio = new FormData();
            let formBio= new FormData();
            
            for (let data in this.artist_data) //append
            {
                formPortfolio.append(data, this.artist_data[data]);
            }
            for (let data in this.bio) {
                formBio.append(data, this.bio[data]);
            }
            try {
                await this.$axios.$post("/v1/artist/portfolios/", formPortfolio, config)
                await this.$axios.$post("/v1/artist/bios/", formBio, config)
                // let [someResult, anotherResult] = await Promise.allSettled([this.$axios.$post("/v1/artist/portfolios/", formPortfolio, config), this.$axios.$post("/v1/artist/bios/", formData, config)]);
                // console.log('res from portfolio',someResult);
                // console.log('res from bio',anotherResult);
                this.$store.dispatch("check_user_portfolio");
                this.$store.dispatch("check_user_bio");
                this.snackbar = true;
                this.$router.push("/" + this.bio.username);
            } catch (e) {
                console.log(e);
            }
        },
        async update() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            let url = this.cropImage.generateDataUrl(); 
                if (!url){
                    console.log("no image");}
                else{
                    var fileData = this.dataURLtoFile(url, "coverimage.png");
                    this.artist_data.cover = fileData;
                }
    let myObj1 = this.usersPortfolio 
	let myObj2 = this.artist_data
	let myObj3 = this.usersBio
	let myObj4 = this.bio
	// find keys 
	let keyObj1 = Object.keys(myObj1); 
	let keyObj2 = Object.keys(myObj2); 
	let keyObj3 = Object.keys(myObj3); 
	let keyObj4 = Object.keys(myObj4); 
		 
	// find values 
	let valueObj1 = Object.values(myObj1); 
	let valueObj2 = Object.values(myObj2); 
	let valueObj3 = Object.values(myObj3); 
	let valueObj4 = Object.values(myObj4); 
	
	// now compare their keys and values  
	for(var i=0; i<keyObj1.length; i++) { 
		if(keyObj1[i] == keyObj2[i] && valueObj1[i] == valueObj2[i]) { 
			console.log(" value not changed for: ",keyObj1[i]+' -> '+valueObj2[i]);	 
		} else { 
            // it prints keys have different values 
            let formName = new FormData();
            formName.append(keyObj1[i], valueObj2[i]);
            formName.append("username", this.artist_data['username']);
            console.log("key obj1: "+keyObj1[i]+"keyobj2: "+keyObj2[i]+'\n myObj1 value: '+ valueObj1[i] + '\nmyObj2 value: '+ valueObj2[i] +'\n');
            await this.$axios.$patch("/v1/artist/portfolios/"+this.usersPortfolio.username + '/', formName, config)
            console.log( valueObj1[i] ," changed"); 
		} 
    }
    for(var i=0; i<keyObj3.length; i++) { 
		if(keyObj3[i] == keyObj4[i] && valueObj3[i] == valueObj4[i]) { 
			console.log(" value not changed for: ",keyObj3[i]+' -> '+valueObj4[i]);	 
		} else { 
            // it prints keys have different values 
            let formName = new FormData();
            formName.append(keyObj3[i], valueObj4[i]);
            formName.append("username", this.bio['username']);
            // console.log("key obj3: "+keyObj3[i]+"\nkeyobj4: "+keyObj4[i]+'\n myObj3 value: '+ valueObj3[i] + '\nmyObj4 value: '+ valueObj4[i] +'\n');
            await this.$axios.$patch("/v1/artist/bios/"+this.usersPortfolio.username + '/', formName, config).catch(function(err){console.log(err.response.data);})
            console.log( valueObj3[i] ," changed"); 
		} 
	}
        this.$store.dispatch("check_user_bio");
        this.$store.dispatch("check_user_portfolio");
        this.snackbar = true;
        this.$router.push("/" + this.bio.username);
        },
        async deleted() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            try {
                if(this.usersBio) await this.$axios.$delete("/v1/artist/bios/"+this.usersBio.username, config)
                if(this.usersPortfolio) await this.$axios.$delete("/v1/artist/portfolios/"+this.usersPortfolio.username, config)
                console.log("Artist Bio deleted.");
                console.log("Artist portfolio deleted.");
                //update store
                this.$store.dispatch("remove_portfolio")
                this.$store.dispatch("remove_bio")
                for (let data in this.bio) {
                    this.bio[data] = ''
                }
                this.artist_data.artist_name = ''
                this.artist_data.country = ''
                this.artist_data.cover = null
                this.artist_data.username= this.$store.state.auth.user.user.username,
                this.imageData = ''
                this.bio.username= this.$store.state.auth.user.user.username,
                this.imageData4 = ''
                this.imageData2 = ''
                this.imageData1 = ''
                this.imageData3 = ''
                this.yt= false,
                this.yt1= false,
                this.yt2= false,
                this.yt3= false,
                this.videoId1='',
                this.videoId2='',
                this.videoId3='',
                this.videoId4='',
                this.ytLinkError1='',
                this.ytLinkError2='',
                this.ytLinkError3='',
                this.ytLinkError4='',
                this.dummy_style =[],
                this.cropImage.remove()
                this.dialog =false,
                this.snackbar = true;
                this.$router.push("/create/website");
            } catch (e) {
                console.log(e);
            }
        },
    }
}
</script>
