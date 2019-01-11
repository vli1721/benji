<template>
    <v-sheet
            style="width: 40%; "
            color="green lighten-3"
            elevation="3"


    >

        <p style="margin: 40px; font-size: 4vw; text-align: center; display: inline" class="the-font">Balance: {{'$'+animatedNumber}}</p>

    </v-sheet>
</template>

<script>
    export default {
        props: ['db'],
        data() {
            return {
                balance: 0,
                ref: this.db.ref('users/brian/balance'),
            }
        },
        mounted() {
            var vm = this;
            this.ref.on("value", function (snapshot) {
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