<template>
  <v-container>
    <v-col align="center" justify="center">
      <h1 v-if="error.statusCode === 404">
        Oops! Sorry. {{ pageNotFound }}
        <img src="@/assets/vivi.png" width="150px">
      </h1>
      <h1 v-else>
        Oops! Sorry. {{ otherError }}
        <img src="@/assets/vivi.png"  width="150px">
      </h1>
      <h1> <NuxtLink to="/">Let's return to the home page.</NuxtLink></h1>
    </v-col>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
