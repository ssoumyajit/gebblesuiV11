<template>
<v-app>
	<v-container>
	<v-card width="500" class="mx-auto mt-16 ">
		<v-card-title class="justify-center align-center">
            <h3>Are you sure you want to sign out?</h3>
		</v-card-title>
		<v-card-actions class="pb-6 justify-center">
			<v-btn class="ml-4 px-4" small dark color="error" @click="signout">Sign Out</v-btn>
			<v-btn class="ml-4 px-4" small outlined color="indigo" @click="cancel">Cancel</v-btn>
		</v-card-actions>
	</v-card>
	</v-container>
</v-app>
</template>

<script>
import { mapActions } from 'vuex'
import vuex from 'vuex'
export default {
	methods:{
		signout(){
			console.log("logged out");
			this.$store.dispatch("remove_portfolio")
			this.$store.dispatch("remove_bio")
			this.$store.dispatch("remove_highlights")
			this.$store.dispatch("remove_journey")
			this.$store.dispatch("remove_love")
			this.$store.dispatch("remove_share_obj")
			this.$store.dispatch("remove_editing_obj")
			this.$store.dispatch("remove_artists_sharing")
			this.$store.dispatch("remove_personal_messages")
			this.$store.dispatch("remove_notifications")
			this.$store.dispatch("remove_learnings")
			this.$store.dispatch("remove_learn_reactions")
			this.$auth.logout();
		},
		cancel(){
			this.$router.push("/");
		}
	}
}
</script>