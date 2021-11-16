<template>
    <v-app>
        <!-- <v-container grid-list-md>
            <v-layout class="flex-wrap" >
                <v-flex v-if="usersBio.gallery1" xs6 md6>
                    <v-img :src="usersBio.gallery1" width = "270px" height = "270px"/>
                </v-flex>
                <v-flex v-if="usersBio.gallery2" xs6 md6>
                    <v-img :src="usersBio.gallery2" width = "270px" height = "270px"/>
                </v-flex>
                <v-flex v-if="usersBio.gallery3" xs6 md6>
                    <v-img :src="usersBio.gallery3" width = "270px" height = "270px"/>
                </v-flex>
                <v-flex v-if="usersBio.gallery4" xs6 md6>
                    <v-img :src="usersBio.gallery4" width = "270px" height = "270px"/>
                </v-flex>
            </v-layout>
        </v-container> -->

    </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
    ...mapGetters(['notifications','artists', 'loggedInUser','usersBio']),
    },
    methods:{
    }
}
</script>