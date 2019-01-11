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
                <li v-for="c in choresList" v-if="c.description !== 'default' " style="display:flex;" @Mouseover="displayButtons" class="hoverable">
                    <p style="margin: 0; margin: auto 0" class="text-capitalize">{{c.description}}</p>
                    <v-btn flat style="margin: 0 0 0 auto;" class="text-capitalize" @click="deleteChore(c.id)"><i
                            class="fas fa-trash"></i></v-btn>
                </li>
            </ul>
        </div>
    </v-sheet>
</template>

<script>
<<<<<<< Updated upstream
=======
import Firebase from 'firebase'
    // Initialize Firebase
    // var config = {
    //     apiKey: "AIzaSyDa8Xluwh_e0fp-vVjyoZxDqekd7IcAoCk",
    //     authDomain: "benji-42f8d.firebaseapp.com",
    //     databaseURL: "https://benji-42f8d.firebaseio.com",
    //     projectId: "benji-42f8d",
    //     storageBucket: "benji-42f8d.appspot.com",
    //     messagingSenderId: "533301633340"
    // };
    // let app = Firebase.initializeApp(config)
    // let db = app.database()
    // let ref = db.ref('users')
    // if (!firebase.apps.length) {
    //     var database = firebase.database();
    //     var ref = firebase.database().ref('users/bobby');
    // }


>>>>>>> Stashed changes
    export default {
        props: ['db'],
        data() {
            return {
                choreInput: '',
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
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
                newPostRef.set(choreObj);

                //client
                // this.choresList.push(
                //     choreObj
                // );
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

<<<<<<< Updated upstream
                this.ref.on("value", function (snapshot) {
                    console.log('HEREEEE')
=======
                ref.on("value", function (snapshot) {
>>>>>>> Stashed changes
                    // console.log(snapshot.val());

                    for (var x in snapshot.val()['chores']) {
                        var obj = snapshot.val()['chores'][x];
                        if (obj.id === id) {
<<<<<<< Updated upstream
                            var deleteRef = vm.db.ref('users/bobby/chores/' + x);
                            console.log('in here')
                            console.log(deleteRef)
=======
                            var deleteRef = Firebase.database().ref('users/bobby/chores/' + x);
>>>>>>> Stashed changes
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
</style>