<template>
        <v-sheet
                style="width: 40%; margin: 20px 20px 20px auto; min-height: 100%;"
                color="blue lighten-3"
                elevation="3"
        >

            <div style="overflow: hidden; margin: 20px; ">
                <p style="margin: 0 20px; font-size: 4vw; text-align: center; overflow-wrap: normal;">Notifications</p>

                <div style="overflow-y: scroll; height: 150px; padding: 10px">
                    <NI v-for="notif in notificationsList" :notif="notif" @remove="removeItem"></NI>
                </div>
            </div>


        </v-sheet>
</template>

<script>
    import firebase from 'firebase'
    import { db } from '../main'
    import NI from './NotificationItem'

    export default {
        props: ['db'],
        components: {
            NI
        },
        data () {
            return {
                // someway push notif objects into this list
                notificationsList: [], 
                ref: this.db.ref('users/bobby')
            }
        },
        methods: {
            removeItem(id){
                for(var i = 0; i < this.notificationsList.length; ++i){
                    if(id === this.notificationsList[i].id){
                        this.notificationsList.splice(i,1);
                        break
                    }
                }
                console.log(this.notificationsList)
            },


        },
        mounted() {
            //retrieve just added node
            
            const vm = this;
            this.ref.on("value", function (snapshot) {
                console.log('hi')
                vm.notificationsList = []
                    for (var x in snapshot.val()['chores']) {
                        var obj = snapshot.val()['chores'][x];
                        if (!obj.completed) {
                            vm.notificationsList.push(
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
                    console.log(this.notificationsList)
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