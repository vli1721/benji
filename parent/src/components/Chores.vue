<template>
    <v-sheet
            style="width: 40%;  min-height: 100%; "
            color="yellow lighten-3"
            elevation="3"
    >

        <div style="overflow: hidden; margin: 20px;">
            <p style=" font-size: 4vw; margin: 0" class="the-font">Chores</p>
            <v-sheet
                    color="yellow lighten-4"
                    style="padding: 10px;"
            >
            <div class="addChore hoverable">
                <v-form style="width: 80%; display: flex; justify-content: space-between">
                    <v-text-field label="Chore" style="width: 30%; margin: 0 5px;" v-model="choreInput"></v-text-field>
                    <v-text-field label="Reward" style="width: 30%; margin: 0 5px;" v-model="rewardInput"></v-text-field>
                </v-form>
                <v-btn small round flat style="margin: auto 0 15px auto; width: 20px" class="text-capitalize add-btn"
                       @click="writeUserData"><i class="fas fa-plus"></i></v-btn>
            </div>

                <ul style="margin:0; overflow-y: scroll; height: 100px; padding: 0px;">
                    <li v-for="c in choresList" v-if="c.description !== 'default' " style="display:flex;" @Mouseover="displayButtons" class="hoverable">
                        <p style="margin: 0; margin: auto 0;" class="text-capitalize">{{c.description}}</p>
                        <v-btn flat style="margin: 0 0 0 auto;" class="text-capitalize delete-btn" @click="deleteChore(c.id)"><i
                                class="fas fa-trash "></i></v-btn>
                    </li>
                </ul>
            </v-sheet>
        </div>
    </v-sheet>
</template>

<script>


    export default {
        props: ['db'],
        data() {
            return {
                choreInput: '',
                rewardInput: '',
                // pull from firebase to fill array
                choresList: [],
                ref: this.db.ref('users/bobby')
            }
        },
        mounted() {
            //retrieve just added node
            const vm = this;
            this.ref.on("value", function (snapshot) {
                vm.choresList = []
                    for (var x in snapshot.val()['chores']) {
                        var obj = snapshot.val()['chores'][x];
                        if (!vm.choresList.includes(x)) {
                            vm.choresList.push(
                                {
                                    description: obj.description,
                                    reward: obj.reward,
                                    id: obj.id,
                                    verify: obj.false,
                                    completed: obj.false
                                }
                            )
                        
                    }
                    }
                },
                function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
        },
        methods: {
            displayButtons() {
            },
            hashCode(s) {
              var h = 0, l = s.length, i = 0;
              if ( l > 0 )
                while (i < l)
                  h = (h << 5) - h + s.charCodeAt(i++) | 0;
              return h;
            },
            writeUserData() {
                var postsRef = this.ref.child("chores");
                var date = new Date();
                var choreObj = {
                    description: this.choreInput,
                    reward: "10",
                    id: date.toString(),
                    verify: false,
                    completed: false
                };
                
                console.log(choreObj);
                var newPostRef = postsRef.push();
                newPostRef.set(choreObj);
            },
            deleteChore(id) { //delete the chore you click on
                //client
                for (var i = 0; i < this.choresList.length; ++i) {
                    if (id === this.choresList[i].id) {
                        this.choresList.splice(i, 1);
                        break
                    }
                }
                //server
                const vm = this;
                ref.on("value", function (snapshot) {

                    // console.log(snapshot.val());
                    for (var x in snapshot.val()['chores']) {
                        var obj = snapshot.val()['chores'][x];
                        if (obj.id === id) {
                            var deleteRef = Firebase.database().ref('users/bobby/chores/' + x);
                            deleteRef.remove().then(function () {
                            }).catch(function (e) {
                                console.log('OOPS, problem: ' + e.message);
                            });
                            break;
                        }
                    }
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            }
        },
    }
</script>
<style>
    .addChore {
        display: flex;
    }
    .hoverable:hover {
        opacity: .8;
    }

    .delete-btn:hover i{
        color: red;
    }

    .add-btn:hover i{
        color: lightgreen;
    }


</style>