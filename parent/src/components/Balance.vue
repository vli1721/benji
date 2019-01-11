<template>
    <v-sheet
            style="width: 40%; margin: 20px auto; min-height: 40%;"
            color="green lighten-3"
            elevation="3"

    >

        <p style="margin: 20px; font-size: 4vw; text-align: center">Balance: {{'$'+balance}}</p>
        <p style="margin: 20px; font-size: 4vw; text-align: center">Almost to goal of 40</p>

    </v-sheet>
</template>

<script>
    var config = {
        apiKey: "AIzaSyDa8Xluwh_e0fp-vVjyoZxDqekd7IcAoCk",
        authDomain: "benji-42f8d.firebaseapp.com",
        databaseURL: "https://benji-42f8d.firebaseio.com",
        projectId: "benji-42f8d",
        storageBucket: "benji-42f8d.appspot.com",
        messagingSenderId: "533301633340"
    };

    if (!firebase.apps.length) {
        var database = firebase.database();
        var ref = firebase.database().ref('users/bobby/balance');
    }



    export default {
        data() {
            return {
                balance: 0
            }
        },
        mounted() {
            console.log('hi')
            ref.on("value", function (snapshot) {
                console.log('');
                // this.balance = snapshot.val()
            });
        }
    }
</script>