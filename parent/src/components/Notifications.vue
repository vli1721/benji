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
        components: {
            NI
        },
        data () {
            return {
                // someway push notif objects into this list
                notificationsList: [
                    {
                        id: 1,
                        body: 'Your child successfully washed the dishes'
                    },
                    {
                        id: 2,
                        body: 'Your child successfully threw out the trash'
                    },
                    {
                        id: 3,
                        body: 'Your child successfully won a hackathon'
                    },
                    {
                        id: 4,
                        body: 'Your child successfully walked the dogs'
                    },
                    {
                        id: 5,
                        body: 'Your child successfully fed the dogs'
                    },
                    {
                        id: 5,
                        body: 'Your child successfully fed the dogs'
                    },
                    {
                        id: 5,
                        body: 'Your child successfully fed the dogs'
                    },
                    {
                        id: 5,
                        body: 'Your child successfully fed the dogs'
                    }
                ]
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
            }

        }


    }
</script>

<style>
    ::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
</style>