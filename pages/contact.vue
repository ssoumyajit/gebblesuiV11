
<template>
    <v-app> 
        <v-container>
            <div class="ma-6">
                <h2 class="my-4">We would love to hear from you.</h2>
                <h3 class="py-2">Email us at <a href="https://mailto:gebbles.art@gmail.com" target="_blank">gebbles.art@gmail.com</a>.</h3>
                <h3 class="py-2"> Instagram <a href="https://instagram.com/gebbles.art/" target="_blank">@gebbles.art.</a></h3>
                <h3 class="py-2">To report a bug or suggest any additional features for the platform.</h3>
                <v-text-field
                label="Name"
                :error-messages="errorName"
                    max-width="100px"
                    class="py-2"
                    v-model="report.name"
                    ></v-text-field>
                    <v-text-field
                label="Email"
                    max-width="100px"
                    class="py-2"
                    v-model="report.email"
                    :error-messages="errorEmail"></v-text-field>
                <v-textarea
                label="Message"
                    max-width="70%"
                    class="py-2"
                    v-model="report.question"
                    :error-messages="errorQuestion">
                </v-textarea>
                <v-btn outlined small class="text-decoration-none"  color="indigo" dark
                     @click="submit">Send</v-btn>
            </div>
        </v-container>
        <v-snackbar v-model="snackbar">Thankyou for your feedback</v-snackbar>
    </v-app>
</template>
<script>
export default {
    data(){
        return{
            report: {
                name:'',
                email:'',
                question:''
            },
            errorEmail:'',
            errorName:'',
            errorQuestion:'',
            snackbar:false
        }
    },
    methods:{
        clearform(){
            this.report.name=''
            this.report.email=''
            this.report.question=''
            this.errorEmail =''
            this.errorName =''
            this.errorQuestion =''
            this.snackbar =true
        },
        async submit(){
            console.log("submit", this.report);
            //post request
            try{
            await this.$axios.$post("/v1/inquiry/", this.report).then(resp=>{this.errorName = ``
            this.errorQuestion =''
            this.errorQuestion=''
            this.clearform();
            this.snackbar = true
            })}
            catch(err){
                console.log("errorrr",err.response.data);
                let er = err.response.data
                for (const key in er) {
						if(`${key}` == 'name'){
						this.errorName = `${er[key]}`
						}
						if(`${key}` == 'email'){
						this.errorEmail = `${er[key]}`
						}
						if(`${key}` == 'question'){
						this.errorQuestion= `${er[key]}`
						}
						// console.log(`${key}: ${er[key]}`);
					}
            }

        }
    }
}
</script>