<template>
    <v-app> 
        <v-container>
        <v-card width="490" class="mx-auto mt-16 ">
            <v-card-title class="justify-center align-center">
                <h3>Forgot your password</h3>
            </v-card-title>
            <v-text-field :error-messages="resetError"  class="mx-6"  v-model="email" label="Email" prepend-icon="mdi-account-circle" />
            <v-card-actions class="mb-3 pb-6 justify-center">
                <v-btn small class="text-decoration-none" outlined :loading="progressbar" color="indigo" dark
                    @click="reset">Send me password reset instructions</v-btn>
            </v-card-actions>
	    </v-card>
            <v-snackbar v-model="snackbar"> 
                Password reset instructions sent.
            </v-snackbar>
        </v-container>
    </v-app>
</template>
<script>
export default {
    data() {
      return {
          progressbar:false,
          email:'',
          snackbar:false,
          resetError:''
      }
    },
    methods: {
        async reset() {
            let resetForm = new FormData();
                resetForm.append('email', this.email)
                this.progressbar = true
            try {
                let response = await this.$axios.$post("v1/auth/password/reset/",resetForm)
                this.snackbar = true;
                this.email=''
                this.progressbar = false
            } catch (err) {
                if(err.response.data){
                    let er = err.response.data
                    console.log(er);
                    for (const key in er) {
                        if(`${key}` == 'email'){
                        this.resetError = `${er[key]}`
                        }
                    }
                }
            }
            
        }   
    }
}
</script>