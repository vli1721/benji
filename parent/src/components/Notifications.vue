<template>
        <v-sheet
                style="width: 40%; margin: 20px 20px 20px auto; height: 40%;"
                class="d-flex"
                color="blue lighten-3"
        >

            <div style="overflow: hidden; margin: 20px">
                <p style="margin: 0 20px; font-size: 4vw; text-align: center; overflow-wrap: normal;">Notifications</p>

                <ul style="overflow-y: scroll; height: 100px; padding: 10px">
                    <li v-for="notif in notificationsList"  style="display:block;" @click="removeItem(notif.id)">{{notif.body}}</li>
                </ul>
            </div>


        </v-sheet>
</template>

<script>
    export default {
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
                    }
                ]
            }
        },
        methods: {
            removeItem(id){
                console.log('clicked')
                console.log(id)
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