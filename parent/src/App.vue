<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>Benji</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items >
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <Balance class="mycard"></Balance>
    <div style="display: flex">
      <Chores class ="mycard"></Chores>
      <Notifications class="mycard"></Notifications>
    </div>
  </v-app>
</template>

<script>
  import Balance from './components/Balance.vue'
  import Notifications from './components/Notifications'
  import Chores from './components/Chores'


  export default{

      components: {
          Balance,
          Notifications,
          Chores
      },
      methods: {

      }
  }
</script>

<style>
  /**{*/
    /*border: 1px solid red;*/
  /*}*/
</style>