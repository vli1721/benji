<template>
    <v-app>
        <v-toolbar color="pink lighten-3" style="box-shadow: none">
            <v-toolbar-title>Benji</v-toolbar-title>
        </v-toolbar>
        <div style="margin: 60px auto">
            <Balance :db="database" class="mycard"></Balance>
            <div style="display: flex; ">
                <Chores :db="database" class="mycard"></Chores>
                <Notifications :db="database" class="mycard"></Notifications>
            </div>
        </div>

    </v-app>

</template>

<script>
    import Balance from './components/Balance.vue'
    import Notifications from './components/Notifications'
    import Chores from './components/Chores'
    import Firebase from 'firebase'

    var config = {
        apiKey: "AIzaSyDa8Xluwh_e0fp-vVjyoZxDqekd7IcAoCk",
        authDomain: "benji-42f8d.firebaseapp.com",
        databaseURL: "https://benji-42f8d.firebaseio.com",
        projectId: "benji-42f8d",
        storageBucket: "benji-42f8d.appspot.com",
        messagingSenderId: "533301633340"
    };

    let app = Firebase.initializeApp(config)
    var database = app.database();
    // var ref = database.ref('users/bobby/chores');


    export default {
        data() {
            return {
                database
            }
        },
        components: {
            Balance,
            Notifications,
            Chores
        },
        methods: {}
    }
</script>

<style>
    /**{*/
    /*border: 1px solid red;*/
    /*}*/
    .mycard {
        border-radius: 20px;
        margin: 20px;
    }

    .the-font {
        font-family: 'Open Sans', sans-serif;
    }
</style>