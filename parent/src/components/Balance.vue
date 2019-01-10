<template>
    <v-container>
        <v-sheet
                class="d-flex"
                color="green lighten-3"
                height="424"
        >

            <p style="margin: 20px; font-size: 24px">Balance: {{'$'+balance}}</p>
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
