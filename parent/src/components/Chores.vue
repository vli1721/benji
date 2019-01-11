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
                <v-btn small round flat style="margin: auto 0 10px auto; width: 20px" class="text-capitalize"
                       @click="writeUserData"><i class="fas fa-plus"></i></v-btn>


            </div>
            <ul style="margin:0; overflow-y: scroll; height: 100px; padding: 0px">
                <li v-for="c in choresList" style="display:flex;" @Mouseover="displayButtons" class="hoverable">
                    <p style="margin: 0; margin: auto 0" class="text-capitalize">{{c.description}}</p>
                    <v-btn flat style="margin: 0 0 0 auto;" class="text-capitalize" @click="deleteChore(c.id)"><i
                            class="fas fa-trash"></i></v-btn>
                </li>
            </ul>
        </div>
    </v-sheet>
</template>

<script>
    export default {
        props: ['db'],
        data() {
            return {
                choreInput: '',
                // pull from firebase to fill array
                choresList: [],
                ref: this.db.ref('users/bobby/chores')
            }
        },
        mounted() {
            //retrieve just added node
            const vm = this;
            this.ref.on("value", function (snapshot) {
                    for (var x in snapshot.val()['chores']) {
                        var obj = snapshot.val()['chores'][x];
                        if (!vm.choresList.includes(obj)) {
                            vm.choresList.push(
                                {
                                    description: obj.description,
                                    reward: obj.reward,
                                    id: obj.id
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
            writeUserData() {
                var choreObj = {
                    description: this.choreInput,
                    reward: "10",
                    id: this.choresList.length
                };
                //server
                var postsRef = this.ref.child("chores");
                var newPostRef = postsRef.push();
                console.log(newPostRef);
                newPostRef.set(choreObj);

                //client
                this.choresList.push(
                    choreObj
                );
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

                this.ref.on("value", function (snapshot) {
                    console.log('HEREEEE')
                    // console.log(snapshot.val());

                    for (var x in snapshot.val()['chores']) {
                        var obj = snapshot.val()['chores'][x];
                        if (obj.id === id) {
                            var deleteRef = vm.db.ref('users/bobby/chores/' + x);
                            console.log('in here')
                            console.log(deleteRef)
                            deleteRef.remove().then(function () {
                                console.log('OK, gone');
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
</style>