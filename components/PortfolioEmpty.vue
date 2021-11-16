<template>
    <v-container>
        <youtube :video-id="videoId"></youtube>
    </v-container>
</template>
<script>
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
export default {
    components: {
            Youtube
        },
    created(){
        let url ='https://www.youtube.com/watch?v=nI8uTbUwYJs'
        let videoId = getIdFromURL(url)
        this.videoId = videoId
    },
    data(){
        return{
            videoId: ''
        }
    }

}
</script>