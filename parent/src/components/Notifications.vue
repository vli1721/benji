<template>
    <v-sheet
            style="width: 40%; margin: 20px auto 20px 0; min-height: 100%;"
            color="blue lighten-3"
            elevation="3"
    >


        <div style="overflow: hidden; margin: 20px; ">
            <p style="margin: 0; font-size: 4vw; overflow-wrap: normal;" class="the-font">
                Notifications</p>
            <v-sheet
                    color="blue lighten-4"
                    style="padding: 10px;"
            >
                <div style="overflow-y: scroll; height: 150px; padding: 10px">
                    <NI v-for="notif in notificationsList" :notif="notif" @changeVerify = "changeVerify" @remove="removeItem"></NI>
                </div>
            </v-sheet>
        </div>


    </v-sheet>
</template>

<script>
    import firebase from 'firebase'
    import {db} from '../main'
    import NI from './NotificationItem'

    export default {
        props: ['db'],
        components: {
            NI
        },
        data() {
            return {
                // someway push notif objects into this list
                notificationsList: [], 
                ref: this.db.ref('users/brian')
            }
        },
        methods: {
            removeItem(id) {
                for (var i = 0; i < this.notificationsList.length; ++i) {
                    if (id === this.notificationsList[i].id) {
                        console.log("hi");
                        this.notificationsList.splice(i, 1);
                        break
                    }
                }


            },
            changeVerify(b){
                const vm = this;
                this.ref.on("value", function (snapshot) {
                console.log('hi')
                // console.log(snapshot.val()['chores'])
                    for (var x in snapshot.val()['chores']) {
                        var obj = snapshot.val()['chores'][x];
                        console.log(obj)
                        console.log(b)

                        if (obj.id.toString() === b.toString()) {
                            var postsRef = vm.ref.child("chores");
                            var date = new Date();
                            var choreObj = {
                                description: obj.description,
                                reward: obj.reward,
                                id: obj.id,
                                verify: true,
                                completed: true
                            };
                            
                //             console.log("hsdadai");
                //             // var newPostRef = postsRef.push();
                //             // newPostRef.set(choreObj);
                            
                        }
                    }
                    console.log(vm.notificationsList)
                },
                function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            }


        },
        mounted() {
            const vm = this;
            this.ref.on("value", function (snapshot) {
                vm.notificationsList= []
                    for (var x in snapshot.val()['chores']) {
                        var obj = snapshot.val()['chores'][x];
                        if (obj.completed) {
                            vm.notificationsList.push(
                                {
                                    description: obj.description,
                                    reward: obj.reward,
                                    id: obj.id,
                                    verify: obj.false,
                                    completed: obj.true
                                }
                            )
                        
                    }
                    }
                },
                function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
        },


    }
</script>

<style>
    ::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
</style>