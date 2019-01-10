<template>
    <v-sheet
            style="width: 40%; margin: 20px auto 20px 20px; min-height: 100%; "
            color="yellow lighten-3"
    >

            <div style="overflow: hidden; margin: 20px">
                <p style="margin:0 20px; font-size: 4vw; text-align: center">Chores</p>

                <div class="addChore">
                    <input type="text" placeholder="chore" style="width: 100%" v-model="choreInput">
                    <v-btn small round flat style="margin: 0 0 0 auto; width: 20px" @click="addChore">Add Chore</v-btn>

                </div>
                <ul style="margin:0; overflow-y: scroll; height: 100px; padding: 0px">
                    <li v-for="c in choresList"  style="display:flex;" @Mouseover="displayButtons">
                        <p style="margin: 0; margin: auto 0">{{c.body}}</p>
                        <v-btn flat style="margin: 0 0 0 auto">delete</v-btn>
                    </li>
                </ul>
            </div>
    </v-sheet>
</template>

<script>
    export default {
        data() {
            return {
                choreInput: '',
                // pull from firebase to fill array
                choresList: [
                    {
                        id: 1,
                        body: 'Wash dishes'
                    },
                    {
                        id: 2,
                        body: 'Take out trash'
                    },
                    {
                        id: 3,
                        body: 'Behave in school'
                    },
                    {
                        id: 4,
                        body: 'Behave at work'
                    },
                    {
                        id: 5,
                        body: 'Eat food'
                    }
                ]
            }
        },
        methods: {
            displayButtons(){

            },
            addChore(){
                console.log(this.choreInput)
            }
        },

    }
</script>

<style>
    .addChore{
        display: flex;

    }
</style>