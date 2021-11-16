<template>
<v-app>
    <v-container class="ma-24">
        <div class="text-xs-center mb-6" align = "center">
            <!-- <v-btn small outlined  color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/judging/`">test</v-btn> -->
            <v-btn icon class="elevation-0 white text-decoration-none float-left" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
           <!-- <v-btn small outlined  color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/website/`">Edit Website</v-btn>
            <v-btn small dark  color="indigo" class="mr-2 elevation-0 text-decoration-none" :to= "`/create/journey/`">Add Journey </v-btn> -->
        </div>
            <!-- <v-divider class="ma-4" ></v-divider> -->
            <!-- <h4 class="ma-4">Share your journey</h4> -->
        <v-row class="mx-2">
        <v-col cols="12" md="6" class="pa-0">
             <h3 class="ma-4">Share your journey</h3>
            <v-stepper v-model="e6" vertical >
                <v-stepper-step :complete="e6 > 1" step="1">
                Share images* 
                <!-- <small>Summarize if needed</small> -->
                </v-stepper-step>
                <v-stepper-content step="1" width="100%" class="ma-0"> 
                    <v-slide-group
                    min-width="2px"
                    v-model="model"
                    class="py-4 ma-0"
                    show-arrows>
                    <v-slide-item>
                        <div class=" rounded-lg grey lighten-4">
                            <v-img :src="imageData1" height="150px" width="150px"></v-img>
                            <v-btn icon>
                                <v-icon color="indigo" small @click="onPick(1)">mdi-image-plus</v-icon>
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
                                <v-icon color="error" small @click="removeImage(1)">mdi-delete-outline</v-icon>
                            </v-btn>
                        </div>
                    </v-slide-item>
                    <v-slide-item v-if="imageData1">
                        <div class="mx-2 rounded-lg grey lighten-4">
                            <v-img :src="imageData2" height="150px" width="150px"></v-img>
                            <v-btn icon>
                                <v-icon color="indigo" small @click="onPick(2)">mdi-image-plus</v-icon>
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
                                <v-icon color="error" small @click="removeImage(2)">mdi-delete-outline</v-icon>
                            </v-btn>
                        </div>
                    </v-slide-item>
                    <v-slide-item v-if="imageData2">
                        <div class="mx-2 rounded-lg grey lighten-4">
                            <v-img :src="imageData3" height="150px" width="150px"></v-img>
                            <v-btn icon>
                                <v-icon color="indigo" small @click="onPick(3)">mdi-image-plus</v-icon>
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
                                <v-icon color="error" small @click="removeImage(3)">mdi-delete-outline</v-icon>
                            </v-btn>
                        </div>
                    </v-slide-item>
                    <v-slide-item v-if="imageData3">
                        <div class="mx-2 rounded-lg grey lighten-4">
                            <v-img :src="imageData4" height="150px" width="150px"></v-img>
                            <v-btn icon>
                                <v-icon color="indigo" small @click="onPick(4)">mdi-image-plus</v-icon>
                            </v-btn>
                            <input 
                            type="file" 
                            name = "gallery" 
                            style="display:none" 
                            ref="fileInput4" 
                            accept="image/*"
                            required
                            @change="onFileChange4">
                            <v-btn icon>
                                <v-icon color="error" small @click="removeImage(4)">mdi-delete-outline</v-icon>
                            </v-btn>
                        </div>
                    </v-slide-item>
                    <v-slide-item v-if="imageData4">
                        <div class="mx-2 rounded-lg grey lighten-4">
                            <v-img :src="imageData5" height="150px" width="150px"></v-img>
                            <v-btn icon>
                                <v-icon color="indigo" small @click="onPick(5)">mdi-image-plus</v-icon>
                            </v-btn>
                            <input 
                            type="file" 
                            name = "gallery" 
                            style="display:none" 
                            ref="fileInput5" 
                            accept="image/*"
                            required
                            @change="onFileChange5">
                            <v-btn icon>
                                <v-icon color="error" small @click="removeImage(5)">mdi-delete-outline</v-icon>
                            </v-btn>
                        </div>
                    </v-slide-item>
                    </v-slide-group>
                <v-btn color="indigo" text outlined @click="e6 = 2">Continue</v-btn>
                <!-- <v-btn color="indigo" text @click="e6 = 1">Previous</v-btn> -->
                <v-btn text @click="goback">Cancel</v-btn>
                </v-stepper-content>
        
                <v-stepper-step :complete="e6 > 2" step="2">Caption</v-stepper-step>
                <v-stepper-content step="2" class="ma-0">
                    <v-text-field
                        v-model = "journey.joevent"
                        label= "Title*"
                        :rules="[() => !!journey.joevent || 'This field is required']"
                        :maxlength="50">
                    </v-text-field>
                    <v-textarea
                        v-model = "journey.jocontent"
                        label= "Caption">
                    </v-textarea>
                    <v-menu
                        ref="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model= "journey.jodate"
                            label="Date"
                            prepend-icon="mdi-calendar"        
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model= "journey.jodate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="indigo" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="indigo" @click="$refs.menu.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-text-field
                        :error-messages="linkError"
                        v-model = "journey.jolink"
                        label= "Add a link"
                        :maxlength="50"
                        @change="checkLink">
                    </v-text-field>
                    <v-btn color="indigo" text outlined @click="e6 = 3">Continue</v-btn>
                    <v-btn color="indigo" text @click="e6 = 1">Previous</v-btn>
                    <v-btn text @click="goback">Cancel</v-btn>
                </v-stepper-content>
        
                <v-stepper-step :complete="e6 > 3" step="3">Privacy</v-stepper-step>
                <v-stepper-content step="3" class="ma-0">
                    <h4 class="font-weight-light">Add to highlights</h4>
                        <v-radio-group
                            v-model="journey.ishighlight"
                            row
                            >
                            <v-radio
                                label="Yes"
                                :value="true"
                            ></v-radio>
                            <v-radio
                                label="No"
                                :value="false"
                            ></v-radio>
                        </v-radio-group>
                    <h4 class="font-weight-light">Do you want to keep it private?</h4>
                        <v-radio-group
                            v-model="journey.isprivate"
                            row
                            >
                            <v-radio
                                label="Yes"
                                :value="true"
                            ></v-radio>
                            <v-radio
                                label="No"
                                :value="false"
                            ></v-radio>
                        </v-radio-group>
                    <v-btn v-if="!editing_obj" outlined small class="text-decoration-none"  color="indigo" dark
                    @click="submit">Submit</v-btn>
                    <v-btn v-else outlined small class="text-decoration-none"  color="indigo" dark
                    @click="update">Update</v-btn>
                    <v-btn color="indigo" text @click="e6 = 2">Previous</v-btn>
                    <v-btn text @click="goback">Cancel</v-btn>
                </v-stepper-content>
            </v-stepper>
        </v-col>
        <v-col cols="12" md="6" class="px-sm-8 lighten-4 rounded-xl">
            <h3 class="ma-4">Preview your journey</h3>
            <v-row v-if="journey.jodate" class="pb-2">
                <caption class="ma-6">{{journey.jodate}} </caption>
            </v-row>
            <v-row v-if="journey.joevent" class="pb-6 justify-center text-center">
                <h3 class="text-center">{{journey.joevent}} </h3>
            </v-row>
            <client-only>
                  <Slider v-if="imageData1"
                      :autoplay = false
                      width="520px"
                      height="500px">
                      <div v-if="imageData1">
                      <SliderItem >
                      <v-img
                            :src="imageData1"
                            contain
                            height="500px"
                            width="800px"
                          ></v-img>
                      </SliderItem>
                      </div>
                      <div v-if="imageData2">
                      <SliderItem>
                      <v-img
                            :src="imageData2"
                            contain
                            height="500px"
                            width="800px"
                          ></v-img>
                      </SliderItem>
                      </div>
                      <div v-if="imageData3">
                      <SliderItem >
                      <v-img
                            :src="imageData3"
                            contain
                            height="500px"
                            width="800px"
                          ></v-img>
                      </SliderItem>
                      </div>
                      <div v-if="imageData4">
                      <SliderItem >
                      <v-img
                            :src="imageData4"
                            contain
                            height="500px"
                            width="800px"
                          ></v-img>
                      </SliderItem>
                      </div>
                      <div v-if="imageData5">
                      <SliderItem >
                      <v-img
                            :src="imageData5"
                            contain
                            height="500px"
                            width="800px"
                          ></v-img>
                      </SliderItem>
                      </div>
                  </Slider>
                </client-only>
            <!-- <v-slide-group
                min-width="2px"
                v-model="model"
                class="pb-8 ma-0"
                show-arrows>
                <v-slide-item>
                     <div class=" rounded-lg grey lighten-4">
                        <v-img :src="imageData1" height="250px" width="250px"></v-img>
                    </div>
                </v-slide-item>
                <v-slide-item>
                     <div class="mx-2 rounded-lg grey lighten-4">
                        <v-img :src="imageData2" height="250px" width="250px"></v-img>
                    </div>
                </v-slide-item>
                <v-slide-item>
                     <div class="mx-2 rounded-lg grey lighten-4">
                        <v-img :src="imageData3" height="250px" width="250px"></v-img>
                    </div>
                </v-slide-item>
                <v-slide-item>
                     <div class="mx-2 rounded-lg grey lighten-4">
                        <v-img :src="imageData4" height="250px" width="250px"></v-img>
                    </div>
                </v-slide-item>
                <v-slide-item>
                     <div class="mx-2 rounded-lg grey lighten-4">
                        <v-img :src="imageData5" height="250px" width="250px"></v-img>
                    </div>
                </v-slide-item>
            </v-slide-group> -->
            <v-row v-if="journey.jocontent" class="pb-6 pt-4 justify-center text-center">
                <h4 class=" text-center"> {{journey.username}}: {{journey.jocontent}} </h4>
            </v-row>
            <v-row v-if="journey.jolink" class="pb-6 justify-center text-center">
                <v-btn v-if="journey.jolink"  icon color="indigo" @click="openlink">
                  <v-icon >mdi-link</v-icon>
                </v-btn>
                <v-tooltip v-if="journey.ishighlight" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs"
                        v-on="on">
                        <v-icon class="pl-2 float-right" yellow small>mdi-star</v-icon>
                    </v-btn>
                  </template>
                  <span>This is a highlighted post.</span>
                </v-tooltip>
                <v-tooltip v-if="journey.isprivate" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs"
                        v-on="on">
                        <v-icon class="pl-2 float-right" small>mdi-lock</v-icon>
                    </v-btn>
                  </template>
                  <span>This is your private post.</span>
                </v-tooltip>
            </v-row>
             <!-- preview -->
        </v-col>
        </v-row>
        <v-snackbar v-model="valid_snackbar">
            Please fill the required details.
        </v-snackbar>
    </v-container>
</v-app>
</template>
<script>
import { Slider, SliderItem } from "vue-easy-slider";
import { mapGetters } from 'vuex'
export default {
    middleware : 'check_auth',
    components: {
        Slider,
        SliderItem
    },
    created (){
        if(this.$store.state.editing_obj)
        {
            this.journey = Object.assign({}, this.$store.getters.editing_obj);
            this.imageData1 = this.journey.jophoto1
            this.imageData2 = this.journey.jophoto2
            this.imageData3 = this.journey.jophoto3
            this.imageData4 = this.journey.jophoto4
            this.imageData5 = this.journey.jophoto5
            if(this.journey.ishighlight){
                this.journey.ishighlight = true
            }else{this.journey.ishighlight =false}
            if(this.journey.isprivate){
                this.journey.isprivate =true
            }else{this.journey.isprivate =false}
            if(this.journey.isevent){
                this.journey.isevent =true
            }else{this.journey.isevent =false}
        }
    },
    computed: {
        ...mapGetters(['editing_obj'])
    },
    data(){
        return {
            journey: {
                username: this.$store.state.auth.user.user.username,
                jocontent: "",
                joevent: "",
                jodate: "",
                jophoto1: "",
                jophoto2: "",
                jophoto3: "",
                jophoto4: "",
                jophoto5: "",
                jolink: "",
                ishighlight: false,
                isprivate: false,
            },
            date:"",
            slide: null,
            imageData1: "",
            imageData2: "",
            imageData3: "",
            imageData4: "",
            imageData5: "",
            e6: 1,
            linkError:'',
            model:"",
            valid_snackbar: false,
        }
    },
    methods: {
        checkLink(){
            let urlLink = this.journey.jolink;
            if(urlLink){ //if link exists check if it's valid
                var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
                let check = !!pattern.test(this.journey.jolink);
                if(check){
                    let checkStartsHttp = urlLink.startsWith('http')
                    console.log( "checkStartsHttp", checkStartsHttp);
                    if(!checkStartsHttp)
                    {
                        console.log("doesn't start with http")
                        console.log("url",this.journey.jolink);
                        this.journey.jolink = 'http://'+ this.journey.jolink
                        console.log("url",this.journey.jolink);
                        this.linkError=``
                        //add http to url
                    }
                }
                else{
                    this.linkError=`Enter a valid URL.`
                }
            }
        },
        goback(){
            this.$store.dispatch("remove_editing_obj")
            window.history.back();
        },
        onPick(num) //changing the click from button to input using refs
        {
            switch(num) {
                case 1:
                    this.$refs.fileInput1.click()
                    break;
                case 2:
                    this.$refs.fileInput2.click()
                    break;
                case 3:
                    this.$refs.fileInput3.click()
                    break;
                case 4:
                    this.$refs.fileInput4.click()
                    break;
                case 5:
                    this.$refs.fileInput5.click()
                    break;
                default:
                    // code block
                }
        },
        removeImage(num){
            switch(num) {
                case 1:
                    this.imageData1 = ""
                    this.journey.jophoto1 =''
                    break;
                case 2:
                    this.imageData2 = ""
                    this.journey.jophoto2 =''
                    break;
                case 3:
                    this.imageData3 = ""
                    this.journey.jophoto3 =''
                    break;
                case 4:
                    this.imageData4 = ""
                    this.journey.jophoto4 =''
                    break;
                case 5:
                    this.imageData5 = ""
                    this.journey.jophoto5 =''
                    break;
                default:
                    // code block
                }
        },
        onFileChange1(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData1 = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                this.journey.jophoto1 = files[0];
            }
        },
        onFileChange2(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData2 = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                this.journey.jophoto2 = files[0];
            }
        },
        onFileChange3(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData3 = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                this.journey.jophoto3 = files[0];
            }
        },
        onFileChange4(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData4 = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                this.journey.jophoto4 = files[0];
            }
        },
        onFileChange5(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData5 = e.target.result;
                }
                fileReader.readAsDataURL(files[0]);
                this.journey.jophoto5 = files[0];
            }
        },
        openlink(){
            var url = this.journey.jolink;
            var win = window.open(url, '_blank');
            win.focus();
            },
        refresh(){
            this.date ="";
            this.imageData1 = '',
            this.imageData2='',
            this.imageData3='',
            this.imageData4='',
            this.imageData5='',
            this.journey.username = this.$store.state.auth.user.user.username;
            this.journey.jocontent= "";
            this.journey.joevent= "";
            this.journey.jodate= "";
            this.journey.jophoto1= null;
            this.journey.jophoto2= null;
            this.journey.jophoto3= null;
            this.journey.jophoto4= null;
            this.journey.jophoto5= null;
            this.journey.jolink= "";
            this.journey.ishighlight= false;
            this.journey.isprivate = false;
        },
        async submit(){
            if(this.journey.joevent != "" && this.journey.jophoto1)
            { 
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
            };
            let formData = new FormData();
            for (let data in this.journey) {
                formData.append(data, this.journey[data]);
            }
            try {
                let response = await this.$axios.$post("/v1/artist/journey/", formData, config);
                this.$store.dispatch("check_user_journey");
                this.refresh();
                this.snackbar = true;
                this.$router.push("/"+this.$store.state.auth.user.user.username+"/journey");
            } catch (e) {
                console.log(e);
            }
            }
            else{
                this.valid_snackbar =true
            }
        },
        async update() {
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            let myObj1 = this.editing_obj 
            let myObj2 = this.journey
            // find keys 
            let keyObj1 = Object.keys(myObj1); 
            let keyObj2 = Object.keys(myObj2);
                
            // find values 
            let valueObj1 = Object.values(myObj1); 
            let valueObj2 = Object.values(myObj2); 
            
            // now compare their keys and values  
            for(var i=0; i<keyObj1.length; i++) { 
                if(keyObj1[i] == keyObj2[i] && valueObj1[i] == valueObj2[i]) { 
                    console.log(" value not changed for: ",keyObj1[i]+' -> '+valueObj2[i]);	 
                } 
                else { 
                    // it prints keys have different values 
                    let formName = new FormData();
                    formName.append(keyObj1[i], valueObj2[i]);
                    formName.append("id", this.journey['id']);

                    console.log("key obj1: "+keyObj1[i]+"\nkeyobj2: "+keyObj2[i]+'\n myObj1 value: '+ valueObj1[i] + '\nmyObj2 value: '+ valueObj2[i] +'\n');
                    await this.$axios.$patch("/v1/artist/journey/"+this.editing_obj.id, formName, config);
                    console.log( valueObj1[i] ," changed"); 
                } 
            }
            this.$store.dispatch("check_user_journey");
            this.$store.dispatch("remove_editing_obj");
            this.refresh();
            this.snackbar = true;
            this.$router.push("/"+this.$store.state.auth.user.user.username+"/journey");
        }, 
    },
    }
</script>