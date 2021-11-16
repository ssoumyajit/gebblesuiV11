<template>
	<v-card width="500" class="mx-auto mt-6 ">
		<v-card-title class="justify-center my-4">
			<h2>Welcome to Gebbles</h2>
		</v-card-title>
		<v-card-text>
			<v-text-field 
					:error-messages="errorEmail"
					v-model="userInfo.email" 
					label="Email" 
					prepend-icon="mdi-account-circle" />
				<v-text-field  
					:error-messages="errorPassword"    
                    v-model="userInfo.password"
					:type="showPassword ? 'text' : 'password'"
					label="Password"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
				/>
		</v-card-text>
		<v-card-actions class="mb-3 justify-center">
			<v-btn @click="submitForm()" class="px-4" small  color="yellow">Log in</v-btn>
			<v-btn to='/register' class="ml-4 px-4 text-decoration-none" small  color="primary" >Register</v-btn>
		</v-card-actions>
		<v-divider></v-divider>
		<p class="text-center ma-0 py-4"><v-btn to='/passwordrenew' class=" text-decoration-none" small text color="primary" >I forgot my password</v-btn></p>
		<!-- <p class="text-center pa-4">Inmygroove is currently a community of {{img_artists}} dancers.</p> -->
	</v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	methods:{
		async submitForm(){
			try{
				const config = {
					headers: {"content-type": "multipart/form-data"}
				};
				let res = await this.$auth.loginWith('local', {
				data: {
					'email':this.userInfo.email,
					'password':this.userInfo.password
					}
				}).then(res => {
				this.$auth.setUser(res.data)
				this.$auth.setUserToken(res.data.access_token)
				this.$auth.setRefreshToken('local', res.data.refresh_token);
				this.$store.dispatch("check_artists");
				this.$store.dispatch("check_user_portfolio");
				this.$store.dispatch("check_user_bio");
				this.$store.dispatch("check_share_notifications",res.data.user.username);
				this.$store.dispatch("check_learn_notifications",res.data.user.username);
				this.$store.dispatch("merge_notifications");
				this.$router.push('/'+res.data.user.username)})
			}catch(error){
				if(error.response.data.non_field_errors){
					this.errorEmail = `${error.response.data.non_field_errors}`
				}
				if(error.response.data.email){
					this.errorEmail = `${error.response.data.email}`
				}
			}
		}
	},
	data() {
      return {
		errorEmail:'',
		errorPassword:'',
        showPassword: false,
		hasName: false,
        userInfo: {
          email: '',
		  password: ''
        },
        // ...validations
      }
	},
	// mounted() {
	// this.$store.dispatch("check_artists");
	// },
	// computed: {
	// 	...mapGetters(['img_artists'])
	// },
	layout: 'login'
}
</script>