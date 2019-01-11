<template>
    <v-sheet
            style="width: 40%; margin: 20px auto; min-height: 40%;"
            color="green lighten-3"
            elevation="3"

    >

        <p style="margin: 20px; font-size: 4vw; text-align: center">Balance: {{'$'+animatedNumber}}</p>

        <p style="margin: 20px; font-size: 4vw; text-align: center">Almost to goal of 40</p>

    </v-sheet>
</template>

<script>
    export default {
        props: ['db'],
        data() {
            return {
                balance: 0,
                ref: this.db.ref('users/bobby/balance'),
            }
        },
        mounted() {
            var vm = this;
            this.ref.on("value", function (snapshot) {
                // vm.number = snapshot.val()
                TweenLite.to(vm.$data, 0.5, { balance: snapshot.val() });

            });
        },
        computed: {
            animatedNumber: function() {
                return this.balance.toFixed(0);
            }
        }
    }
</script>