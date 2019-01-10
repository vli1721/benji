<template>
    <v-container>
        <v-sheet
                style="width: 40%; margin: 0 auto; height: 40%;"
                class="d-flex"
                color="green lighten-3"
        >

            <p style="margin: 20px; font-size: 4vw; text-align: center">Balance: {{'$'+balance}}</p>
        </v-sheet>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                balance: 20
            }
        }
    }
</script>
