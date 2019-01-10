<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>Benji</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Link One</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <Balance></Balance>

  </v-app>
</template>

<script>
  import Balance from './components/Balance.vue'

  export default{
      components: {
          Balance
      }
  }
</script>
