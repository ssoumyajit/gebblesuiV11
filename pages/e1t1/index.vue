<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" class="justify-center">
        <h2 class ="pl-6 my-2 font-weight-bold xs12 d-inline">Each 1 Teach 1</h2>
        <v-btn dark v-if="isAuthenticated" x-small fab color="indigo" 
            class="text-decoration-none mb-2 ml-2" @click="addteacher">
        <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="4"  class= "pr-6 justify-end mb-2 px-6" >
        <v-text-field
          class="ma-0 pa-0"
          label="Search teachers"
          placeholder=""
          solo
          prepend-inner-icon="mdi-magnify"
          v-model="search">
        </v-text-field>
      </v-col>
    </v-row>
      <!-- <v-btn color="indigo" outlined class="mx-2 mt-2 mb-6 text-decoration-none justify-end"
       dark @click="addteacher">
      <v-icon class="px-2">mdi-account-multiple-plus-outline</v-icon>
      Share my experience</v-btn> -->
    <v-layout row wrap justify-center >
      <div v-for="teacher in filteredteachers" :key ="teacher.index">
        <v-flex sm6 xs6> 
            <teachers-card :e1t1="teacher"></teachers-card>
        </v-flex>
      </div>
    </v-layout>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="overline">
          To mention your teacher, you need to make your portfolio.
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="ml-4 px-4" outlined 
            @click="create_portfolio"
          >
            Okay
          </v-btn>
          <v-btn
            color="error"
            class="ml-4 px-4" outlined
            @click="dialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import TeachersCard from '@/components/TeachersCard.vue'
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
export default {
  head() {  //head function (a property of vue-meta), returns an object
    return {
      title: 'Each One Teach One -InMyGroove',
      meta: [ 
        {
          hid: 'description',
          name: 'description',
          content: 
              'List of teachers tagged - InMyGroove Community'
        }
      ]
    }
  },
  async asyncData({error}) {
    try {
      const response = await EventService.getEach1Teach1s()
      return {
        teachers: response.data
      }
    } catch (e) {
        error({statusCode:503, message: "unable to fetch teacher data at this point"})
    }
  },
  components: {
    TeachersCard
  },
  data() {
    return {
      search: "",
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'userHasPortfolio', 'loggedInUser']),
    filteredteachers: function(){
      return this.teachers.filter((teacher) => {
        return teacher.teacher.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  methods:{
    addteacher(){
      if(this.userHasPortfolio){
      this.$store.dispatch("remove_share_obj")
      this.$router.push('/create/each1teach1/')
      }
      else{
        this.dialog = true     
      }
    },
    create_portfolio(){
      this.$router.push('/create/about/')
    }
  },
  // layout: 'e1t1'
}
</script>
