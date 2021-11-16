<template>
    <v-app> 
        <v-container>
            <div class="ma-4x">
            <h2 class="my-4">Notifications</h2>
            <h3 class="font-weight-bold">New</h3>
            <div width="700" class="my-1" style="cursor:pointer;"
             v-for="e1t1 in filteredNotifications" :key ="e1t1.id"  @click="seen(e1t1.id,e1t1.e1t1object)">
                <h4>You have a notification from {{e1t1.sender}}.</h4>
                <p class="caption blue--text">{{e1t1.time}}</p>
                <v-divider class="my-1"></v-divider>
            </div>
            <v-divider class="my-4"></v-divider>
            <h3 class="mt-4">Earlier</h3>
            <div width="700" class="my-1" style="cursor:pointer;"
             v-for="e1t1 in filteredNotificationsOld" :key ="e1t1.id" @click="opene1t1(e1t1.e1t1object)">
             <!-- <v-btn @click="timeSince(e1t1.time)">click</v-btn> -->
                <h4>You have a notification from {{e1t1.sender}}.</h4>
                <p class="caption blue--text">{{e1t1.time}}</p>
                <v-spacer></v-spacer>
                <!-- <v-menu transition="slide-y-transition" open-on-hover offset-y bottom left>
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
                    >
                    <v-list-item-title>Mark as unseen.</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu> -->
                <v-divider class="my-1"></v-divider>
            </div>
            </div>
        </v-container>
    </v-app>
</template>
<script>
import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['notifications' ,'loggedInUser']),
        filteredNotifications: function(){
            // console.log(this.notifications);
            if(this.notifications)//on refresh data of undefined error
            {let n = this.notifications
            return n.filter((note) => {
            return note.is_seen==false;
        });}
        },
        filteredNotificationsOld: function(){
            if(this.notifications)
            {
            let n = this.notifications
            return n.filter((note) => {
            return note.is_seen==true; });
            }}
        },
  methods:{
        async seen(id, obj){
            const config = {
                headers: {
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            let form= new FormData();
                form.append('e1t1object', obj);
                form.append('is_seen', 'true');
            await this.$axios.$patch("/v1/notifications/"+id, form, config);

            this.$store.dispatch("check_share_notifications",this.loggedInUser.user.username);
            this.$store.dispatch("check_learn_notifications",this.loggedInUser.user.username);
            this.$router.push('/e1t1/'+obj)
        },
        opene1t1(obj){
            this.$router.push('/e1t1/'+obj)
        },
        timeSince(date) {
            const currentDate = new Date();
            let month =currentDate.getMonth();
            let dates = currentDate.getDate();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let secondss = currentDate.getSeconds();
            month++;
            month = ("0" + month).slice(-2);
            dates = ("0" + date).slice(-2);
            hours = ("0" + hours).slice(-2);
            minutes = ("0" + minutes).slice(-2);
            secondss = ("0" + secondss).slice(-2);
            let useCurrentDate = currentDate.getFullYear()+ "-" + month+ '-'+ dates+' '+ hours+':'+ minutes+':'+ secondss;
            // console.log(useCurrentDate);
            // console.log('dateeee',date);
            // console.log(currentDate);
            //change 'date' to that format(javascript date format)
            let seconds = Math.floor((currentDate - date) / 1000);
            // console.log((new Date() - dates)/1000);
            console.log("sec", seconds);
            var interval = seconds / 31536000;
            if (interval > 1) {
                console.log(Math.floor(interval) + " years");
                return Math.floor(interval) + " years";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                console.log(Math.floor(interval) + " months");
                return Math.floor(interval) + " months";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                console.log(Math.floor(interval) + " days");
                return Math.floor(interval) + " days";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                console.log(Math.floor(interval) + " hours");
                return Math.floor(interval) + " hours";
            }
            interval = seconds / 60;
            if (interval > 1) {
                console.log(Math.floor(interval) + " minutes");
                return Math.floor(interval) + " minutes";
            }
            console.log(Math.floor(seconds) + " seconds");
            return Math.floor(seconds) + " seconds";
        }
    }
}
</script>