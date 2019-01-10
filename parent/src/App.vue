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

  .mycard{
    border-radius: 20px;
  }

</style>