<template>
  <v-app>
    <v-toolbar color="pink lighten-3" style="box-shadow: none">
      <v-toolbar-title>Benji</v-toolbar-title>
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
  import Firebase from 'firebase'
  
  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyDa8Xluwh_e0fp-vVjyoZxDqekd7IcAoCk",
    authDomain: "benji-42f8d.firebaseapp.com",
    databaseURL: "https://benji-42f8d.firebaseio.com",
    projectId: "benji-42f8d",
    storageBucket: "benji-42f8d.appspot.com",
    messagingSenderId: "533301633340"
  };
  
  let app = Firebase.initializeApp(config)
  let db = app.database()
  let choresRef = db.ref('users/bobby/chores')
  export default{
      firebase: {
        chore: choresRef
      },
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
  .mycard{
    border-radius: 20px;
  }
</style>