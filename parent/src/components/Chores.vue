<template>
    <v-sheet
            style="width: 40%; margin: 20px auto 20px 20px; min-height: 100%; "
            color="yellow lighten-3"
            elevation="3"
    >

            <div style="overflow: hidden; margin: 20px">
                <p style="margin:0 20px; font-size: 4vw; text-align: center">Chores</p>

                <div class="addChore hoverable">
                    <v-form style="width: 100%">
                        <v-text-field label="Chore" style="width: 80%" v-model="choreInput"></v-text-field>
                    </v-form>
                    <v-btn small round flat style="margin: auto 0 auto auto; width: 20px" @click="addChore">Add Chore</v-btn>


                </div>
                <ul style="margin:0; overflow-y: scroll; height: 100px; padding: 0px">
                    <li v-for="c in choresList"  style="display:flex;" @Mouseover="displayButtons" class="hoverable">
                        <p style="margin: 0; margin: auto 0">{{c.body}}</p>
                        <v-btn flat style="margin: 0 0 0 auto" @click="deleteChore(c.id)">delete</v-btn>
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
                ],
                newChore: {
                    description: '',
                    reward: ''
                }
            }
        },
        methods: {
            displayButtons(){

            },

            addChore(){
                console.log(this.choreInput)
            },
            deleteChore(id){
                console.log('clicked');
                console.log(id);
                for(var i = 0; i < this.choresList.length; ++i){
                    if(id === this.choresList[i].id){
                        this.choresList.splice(i,1);
                        break
                    }
                }
                console.log(this.choresList)
            }
        },

    }
</script>

<style>
    .addChore{
        display: flex;

    }

    .hoverable:hover{
        opacity: .8;
    }
</style>