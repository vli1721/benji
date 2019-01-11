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
    export default {
        props: ['db'],
        data() {
            return {
                balance: 0,
                ref: this.db.ref('users/bobby/balance')
            }
        },
        mounted() {
            console.log('hi')
            console.log(this.db)
            this.ref.on("value", function (snapshot) {
                console.log('');
                // this.balance = snapshot.val()
            });
        }
    }
</script>