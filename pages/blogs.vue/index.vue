<template>
    <v-container>
      <v-row>
          <h4 class ="pl-6 my-4 xs12 font-weight-light">Community Blogs</h4>
        <v-spacer></v-spacer>
          <v-btn v-if="$auth.loggedIn" class="text-decoration-none mt-2 mx-6  pa-4" rounded color="indigo" dark 
          to="/write_blog" >Write a post</v-btn>
      </v-row>
      <v-layout row wrap class="mt-6 ml-4" >
            <v-flex sm6 xs6> 
              <BlogCard></BlogCard>
            </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import BlogCard from '@/components/BlogCard'
export default {
    components: 
    { 
        BlogCard
    },
}

</script>