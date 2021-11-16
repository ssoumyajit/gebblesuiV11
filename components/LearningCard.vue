<template>
<v-container>
  <v-list two-line v-for="(learning, i) in learnings" :key="i" class="pa-0" style="cursor:pointer;" >
    <v-list-item 
    :key="learning.lesson"
    @click="openDialog(learning.id,learning.timestamp)"
    >
    <v-list-item-content>
        <v-list-item-title >{{learning.lesson}}</v-list-item-title>
        <!-- <v-list-item-subtitle> 2 mins ago</v-list-item-subtitle> -->
    </v-list-item-content>
    <v-list-item-avatar color="blue" v-if="learning.videouploaded">
        <v-icon dark>mdi-play</v-icon>
    </v-list-item-avatar>
    <v-menu v-if=" isAuthenticated && learning.username == loggedInUser.user.username " transition="slide-y-transition" open-on-hover offset-y bottom left>
          <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs"
              v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
              </div>
          </template>
          <v-list>
              <v-list-item
              class="text-decoration-none pl-6 pr-12"
              color="error"
              @click="deleteLearning(learning.id,learning.shareidobj)"
              >
              <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
          </v-list>
        </v-menu>
    </v-list-item>
    <v-dialog
        :retain-focus="false"
        v-model="videoDialog"
        width="860px"
        persistent>
        <v-container class="rounded-lg white pa-8">
        <v-col cols="12" align="end" justify="end">
          <v-btn icon color="error" @click="closeDialog(learn_obj.video)">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        </v-col>
        <!-- <div v-if="loggedInUser && learn_obj" align="end" justify="end">
        <v-col class="ma-0" v-if="loggedInUser.user.username == learn_obj.username" >
        <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-btn small icon v-bind="attrs"
            v-on="on">
            <v-icon small color="indigo" @click="editLearning">mdi-circle-edit-outline</v-icon>
        </v-btn>
        </template>
        <span>Edit</span>
        </v-tooltip>
        <v-dialog v-if="loggedInUser" v-model="deleteLearnDialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-tooltip top v-bind="attrs" v-on="on">
            <template v-slot:activator="{ on, attrs }">
                <v-btn small icon >
                <v-icon small color="error" @click="deleteLearnDialog = true" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                </v-btn>
            </template>
            <span>Delete</span>
            </v-tooltip>
        </template>
        <v-card class="pa-4">
            <p>Are you sure you want to delete this lesson?</p>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small class="px-4 text-decoration-none" color="error" dark
                @click="deleteLearning(learn_obj.id,learn_obj.shareidobj)">Delete</v-btn>
            <v-btn small color="indigo" class="px-4text-decoration-none" outlined  @click="deleteLearnDialog = false">
                Cancel
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        </v-col>
        </div> -->
        <v-col cols="12" align="center" justify="center" v-if="learn_obj" >
        <video id="videoId" max-width="300px" height="300px" controls v-if="learn_obj.video" class="hidden-xs-only">
            <source :src="learn_obj.video" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <video id="videoId" height="150px" controls v-if="learn_obj.video" class="hidden-sm-and-up">
            <source :src="learn_obj.video" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div align="left" justify="left">
        <div class="my-4">
          <h5 class="caption">Posted on {{learndate}}</h5>
        </div>
        <div class="my-4" >
        <h4>{{learn_obj.lesson}}</h4>
        </div>
          <div class="my-4">
            <v-btn icon @click="react_like()" class="mx-1">
              <v-icon color="black" v-if="!learn_has_like">mdi-heart-outline</v-icon>
              <v-icon color="red" v-else>mdi-heart</v-icon>
              <div v-if="like.length">{{like.length}}</div>
            </v-btn>
            <v-btn icon @click="react_dope()" class="mx-1">
              <v-icon color="black" v-if="!learn_has_dope">mdi-fire</v-icon>
              <v-icon color="orange" v-else>mdi-fire</v-icon>
              <div v-if="dope.length">{{dope.length}}</div>
            </v-btn>
            <v-btn icon @click="react_info()" class="mx-1">
              <v-icon color="black" v-if="!learn_has_info">mdi-head-flash-outline</v-icon>
              <v-icon color="green" v-else>mdi-head-flash-outline</v-icon>
              <div v-if="info.length">{{info.length}}</div>
            </v-btn>
        </div>
        </div>
        <div>
          <v-row class="my-4 pl-2">
              <h3 class="font-weight-light">
                Comments <span v-if="learning_comments_list.length" >{{learning_comments_list.length}}</span>
              </h3>
          </v-row>
          <v-row no-gutters style="flex-wrap: nowrap;">
              <v-avatar size="36" v-if="isAuthenticated && userHasPortfolio && usersPortfolio.thumb" >
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
              <v-textarea v-if="isAuthenticated && userHasPortfolio" class="mx-4"
                  v-model= "comments.comment"
                  outlined
                  auto-grow
                  rows="1"
                  row-height="15"
                  max-width= "200"
                  label="Share your thoughts">
              </v-textarea>
              <v-textarea v-else class="mx-4"
                  @click="logindialog=true"
                  outlined
                  rows="1"
                  row-height="15"
                  max-width= "200"
                  label="Share your thoughts">
              </v-textarea>
              <v-btn v-if="isAuthenticated && userHasPortfolio"
                  small class="text-decoration-none mt-2" 
                  @click="post_comment(learn_obj.id)"
                      color="indigo" dark >Post
              </v-btn>
          </v-row>
          <v-row class="px-4" v-if="learning_comments_list.length">
            <learning-comments-card :comments = "learning_comments_list"></learning-comments-card>
          </v-row>
        </div>
        </v-col>
    </v-container>
    </v-dialog> 
    <v-dialog
    v-model="logindialog"
    width="500" >
    <v-card class="pa-4">
      <v-card-title>
        Log in and make your portfolio to continue.
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="ml-4 px-4" text 
          @click="create_portfolio"
        >
          Okay
        </v-btn>
        <v-btn
          color="error"
          class="ml-4 px-4" text 
          @click="logindialog = false"
        >
          Maybe, later
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>
    <v-dialog
      v-model="addLearning"
      width="800">
      <v-card class="pa-8">
          <v-form v-on:submit.prevent="submit">
            <v-row>
                <v-col cols="12" align="end" justify="end" class="pa-0">
                <v-btn icon color="error" @click="addLearning = false" >
                    <v-icon >mdi-close</v-icon>
                </v-btn>
          </v-col>
                <v-col cols="12">
                    <v-btn outlined color="blue-grey" class="mb-6 ma-2 white--text" @click="onPick" >
                        Upload
                        <v-icon right dark> mdi-cloud-upload </v-icon>
                    </v-btn><br>
                    <input style="display:none" ref="fileInputVideo" type="file" accept="video/*" @change="onFileChange"> 
                    <video width="320" height="240" controls id="videoPreview">
                    Your browser does not support the video tag.
                    </video>
                    <!-- <video id="videoPreview" width="300" height="300" controls></video> -->
                    <v-text-field
                        v-if="learn_obj "
                        v-model = "learn_obj.lesson"
                        label= "Describe the lessons you learnt.">
                    </v-text-field>
                        <v-btn class="text-decoration-none" outlined  color="indigo" dark
                        @click="updateLearning">Update</v-btn>
                </v-col>
            </v-row>
        </v-form>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="valid_snackbar">
        Write something to post.
    </v-snackbar>
    <v-snackbar v-model="login_snackbar">
        Please login first.
    </v-snackbar>
    <v-snackbar v-model="thankyou_snackbar">
          Thank you for sharing.
    </v-snackbar>
    <!-- <v-divider></v-divider> -->
  </v-list>
</v-container>
</template>
<script>
import EventService from '@/services/EventService.js'
import LearningCommentsCard from '~/components/LearningCommentsCard.vue'
import { mapGetters } from 'vuex'
  export default {
    components:{
        LearningCommentsCard
    },
    props: {
      learnings: Array,
    },
    name: 'LearningCard',
    data() {
      return {
        deleteLearnDialog: false,
        addLearning: false,
        timeLearn:'',
        valid_snackbar: false,
        login_snackbar: false,
        logindialog: false,
        thankyou_snackbar: false,
        videoDialog: false,
        learndate:'',
        comments : {
            username : "",
            comment: "",
            learningidobj: ""
        },
        reactForm:{
            username: "",
            learningidobj: "",
            like_type:"",
        },
        learningForm: {
                username: "",
                lesson: "",
                video: [],
                shareidobj: "",
            },
        }
    },
    computed: {
      ...mapGetters(['loggedInUser', 'userHasPortfolio', 'usersPortfolio', 'artists' ,'isAuthenticated',
      'like', 'dope', 'info', 'learning_comments_list', 'learn_has_like','learn_has_like_id', 
      'learn_has_dope','learn_has_dope_id','learn_has_info','learn_has_info_id','learn_obj']),
    },
    methods:{
      closeAddLearning(){
        this.$store.dispatch("remove_learn_obj");
        this.addLearning = false
      },
      async updateLearning(){
          
      },
      create_portfolio()
        {
            if(this.loggedInUser){
                this.$router.push("/create/about");
            }
            else{
                this.$router.push("/login");
            }
      },
      editLearning(){
        // this.$store.dispatch("check_learn_obj",id);
        console.log(this.learn_obj);
        this.addLearning = true
      },
      dateFormat(recdate){
        const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = recdate;
        let datetype= date.slice(8, 10);
        let month = date.slice(5, 7);
        let yeartpye = date.slice(0, 4)
        const regex = new RegExp("^0+(?!$)",'g');
        month = month.replaceAll(regex, "");
        let monthtype = months[month-1]
        this.learndate = datetype+" "+monthtype +" "+yeartpye;
      },
      async openDialog(id, time){
        //check likes and comments for particular opened learning id
        this.dateFormat(time)
        this.$store.dispatch("check_learn_obj",id);
        this.$store.dispatch("check_learn_reactions",id);
        this.$store.dispatch("check_learn_comments",id);
        this.videoDialog= true;
      },
      closeDialog(video) //pressing outside dialog pauses video
      {
        //remove likes and comments for particular opened learning id
        this.$store.dispatch("remove_learn_reactions");
        this.$store.dispatch("remove_learn_obj");
        // this.$store.dispatch("remove_learnings")
        this.videoDialog =false;
        this.learndate =""
        if(video){
          var vid = document.getElementById("videoId"); 
          vid.pause();
        }
      },
      async deleteLearning(id,shareid){
          const config = {
          headers: {"content-type": "multipart/form-data",
              "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
          };
          try {
              let response = await this.$axios.$delete("/v1/e1t1/learnings/"+id , config);
              console.log(response);
              this.closeDialog(null)
              this.$store.dispatch("check_learnings", shareid)
              this.$store.dispatch("remove_learnings")
          } 
          catch (e) {
              console.log(e);
          }
          //remove particular gallery image by id
      },
      onPick() //changing the click from button to input using refs
        {
            this.$refs.fileInputVideo.click()
        },
        onFileChange(e) {
            let files = e.target.files;
            if (files[0]) {
                console.log(files[0]);
                let i = Math.floor(files[0].size * 0.000001)
                if(i>=150){
                    this.sizeExceed = true;
                }
                else{
                    this.learningForm.video = files[0];
                    let blobURL = URL.createObjectURL(files[0]);
                    document.getElementById("videoPreview").src = blobURL;
                }
            }
        },
      async react_like(){
          if(this.isAuthenticated){
          this.reactForm.username = this.$store.state.auth.user.user.username;
          this.reactForm.learningidobj = this.learn_obj.id
          this.reactForm.like_type = 'LO'
          if(this.learn_has_like){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token
            }
            };
              try {
                await this.$axios.$delete("/v1/e1t1/learnings/likes/"+this.learn_has_like_id , config)
                this.$store.dispatch("check_learn_reactions", this.learn_obj.id)
                //store make learn love false
            } catch (e) {
                console.log(e);
            }
          }
          else{
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
          let formData = new FormData();
          for (let data in this.reactForm) {
              formData.append(data, this.reactForm[data]);
          }
          try {
              await this.$axios.$post("/v1/e1t1/learnings/likes/", formData, config)
              this.$store.dispatch("check_learn_reactions", this.learn_obj.id)
          } catch (e) {
              console.log(e);
          }
          }
        }
        else{
            this.login_snackbar = true
        }
      },
      async react_dope(){
        if(this.isAuthenticated){
          this.reactForm.username = this.$store.state.auth.user.user.username;
          this.reactForm.learningidobj = this.learn_obj.id
          this.reactForm.like_type = 'FI'
          if(this.learn_has_dope){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token
            }
            };
              try {
                await this.$axios.$delete("/v1/e1t1/learnings/likes/"+this.learn_has_dope_id , config)
                this.$store.dispatch("check_learn_reactions", this.learn_obj.id)
                //store make learn love false
            } catch (e) {
                console.log(e);
            }
          }
          else{
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
          let formData = new FormData();
          for (let data in this.reactForm) {
              formData.append(data, this.reactForm[data]);
          }
          try {
              await this.$axios.$post("/v1/e1t1/learnings/likes/", formData, config)
              this.$store.dispatch("check_learn_reactions", this.learn_obj.id)
          } catch (e) {
              console.log(e);
          }
          }
        }
        else{
            this.login_snackbar = true
        }
      },
      async react_info(){
        if(this.isAuthenticated){
          this.reactForm.username = this.$store.state.auth.user.user.username;
          this.reactForm.learningidobj = this.learn_obj.id
          this.reactForm.like_type = 'DE'
          if(this.learn_has_info){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token
            }
            };
              try {
                await this.$axios.$delete("/v1/e1t1/learnings/likes/"+this.learn_has_info_id , config)
                this.$store.dispatch("check_learn_reactions", this.learn_obj.id)
                //store make learn love false
            } catch (e) {
                console.log(e);
            }
          }
          else{
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
          let formData = new FormData();
          for (let data in this.reactForm) {
              formData.append(data, this.reactForm[data]);
          }
          try {
              await this.$axios.$post("/v1/e1t1/learnings/likes/", formData, config)
              this.$store.dispatch("check_learn_reactions", this.learn_obj.id)
          } catch (e) {
              console.log(e);
          }
          }
        }
        else{
            this.login_snackbar = true
        }
      },
      async post_comment(id) {
          if(this.isAuthenticated){
          if(this.comments.comment != "" )
          {
          this.comments.username = this.$store.state.auth.user.user.username;
          this.comments.learningidobj = id
          const config = {
              headers: {"content-type": "multipart/form-data",
                  "Authorization": "Bearer " + this.$store.state.auth.user.access_token
              }
          };
          let formData = new FormData();
          for (let data in this.comments) {
              formData.append(data, this.comments[data]);
          }
          try {
              let response = await this.$axios.$post("/v1/e1t1/learnings/comments/", formData, config)
              this.$store.dispatch("check_learn_comments",id)
              this.comments.comment = ''
              this.thankyou_snackbar = true
          } catch (e) {
              console.log(e);
          }
          }
          else{
              this.valid_snackbar = true
          }}
          else{
              this.login_snackbar = true
          }
      },
    }
  }
</script>

