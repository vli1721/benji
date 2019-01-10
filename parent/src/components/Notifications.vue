<template>
        <v-sheet
                style="width: 40%; margin: 20px 20px 20px auto; height: 40%;"
                class="d-flex"
                color="blue lighten-3"
        >

            <div>
                <p style="margin: 20px; font-size: 4vw; text-align: center; overflow-wrap: normal;">Notifications</p>

                <ul style="overflow-y: scroll; height: 100px">
                    <li v-for="i in 100"  style="display:block;">{{i}}</li>
                </ul>
            </div>


        </v-sheet>
</template>

<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>
