<template>
<v-app>
    <v-container>
        <h2 class="my-2">Notifications</h2>
        <v-list two-line>
            <v-subheader
            >New</v-subheader>
        <template v-for="(item) in filteredNotifications">
            <v-list-item :key="item.index" @click="seen(item)">
            <div v-for="artist in artists" :key ="artist.index">
                <v-list-item-avatar v-if=" item.sender == artist.username && artist.thumb">
                    <img :src = "artist.thumb" alt="img">
                </v-list-item-avatar>
                <v-list-item-avatar color="blue" v-if=" item.sender == artist.username && !artist.thumb">
                <v-icon dark>
                    mdi-account-circle
                </v-icon>
              </v-list-item-avatar>
            </div>

            <v-list-item-content>
                <v-list-item-title v-if="item.notification_type == 1" >{{item.sender}} has liked your post.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" >{{item.sender}} has commented on your post.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" >{{item.sender}} has tagged you.</v-list-item-title>
                <v-list-item-subtitle> {{item.time}} </v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
        </template>
        </v-list>
        <v-divider></v-divider>
        <v-list two-line>
            <v-subheader>Earlier</v-subheader>
        <template v-for="(item) in filteredNotificationsOld">
            <v-list-item :key="item.index" @click="opene1t1(item)">
                <div v-for="artist in artists" :key ="artist.index">
                <v-list-item-avatar v-if=" item.sender == artist.username && artist.thumb">
                    <img :src = "artist.thumb" alt="img">
                </v-list-item-avatar>
                <v-list-item-avatar color="blue" v-if=" item.sender == artist.username && !artist.thumb">
                    <v-icon dark>
                        mdi-account-circle
                    </v-icon>
                </v-list-item-avatar>
            </div>
            <v-list-item-content>
                <v-list-item-title v-if="item.notification_type == 1" >{{item.sender}} has liked your post.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" >{{item.sender}} has commented on your post.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" >{{item.sender}} has tagged you.</v-list-item-title>
                <v-list-item-subtitle> {{item.time}}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
        </template>
        </v-list>
    </v-container>
</v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    middleware : 'check_auth',
    mounted(){
        this.$store.dispatch("merge_notifications");
        // const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // let date = this.e1t1.s_date;
        // let datetype= date.slice(8, 10);
        // let month = date.slice(5, 7);
        // let yeartpye = date.slice(0, 4)
        // const regex = new RegExp("^0+(?!$)",'g');
        // month = month.replaceAll(regex, "");
        // let monthtype = months[month-1]
        // this.e1t1.s_date = datetype+" "+monthtype +" "+yeartpye;
    },
    computed: {
        ...mapGetters(['notifications','artists', 'loggedInUser']),
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
        async seen(obj){
            if ('learningobject' in obj)// check if its share otification or learn notitfication
            {
                const config = {
                    headers: {
                        "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                    }
                };
                let temp = this.filteredNotifications;
                let tempe = temp.filter(temp => temp.learningobject == obj.learningobject);
                for(var i=0; i<tempe.length; i++) {
                    let form= new FormData();
                    form.append('is_seen', 'true');
                    await this.$axios.$put("/v1/notifications/e1t1/learnings/"+tempe[i].id, form, config);
                }
                this.$store.dispatch("check_share_notifications",this.loggedInUser.user.username);
                this.$store.dispatch("check_learn_notifications",this.loggedInUser.user.username);
                this.$store.dispatch("merge_notifications");
                    this.$router.push('/e1t1/'+ obj.e1t1object);
            }
            else{
                const config = {
                    headers: {
                        "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                    }
                };
                //for all notifications with filternotification whose e1t1 matches
                let temp = this.filteredNotifications;
                let tempe = temp.filter(temp => temp.e1t1object == obj.e1t1object);
                for(var i=0; i<tempe.length; i++) {
                    let form= new FormData();
                    // form.append('e1t1object', obj.e1t1object);
                    form.append('is_seen', 'true');
                    await this.$axios.$put("/v1/notifications/e1t1/"+tempe[i].id, form, config);
                }
                this.$store.dispatch("check_share_notifications",this.loggedInUser.user.username);
                this.$store.dispatch("check_learn_notifications",this.loggedInUser.user.username);
                this.$store.dispatch("merge_notifications");
                this.$router.push('/e1t1/'+ obj.e1t1object);

            }
        },
        opene1t1(obj){
            if ('e1t1object' in obj){
                this.$router.push('/e1t1/'+obj.e1t1object)
            }else{
                this.$router.push('/e1t1/'+obj.learningobject)
            }
        },
    }
}
</script>