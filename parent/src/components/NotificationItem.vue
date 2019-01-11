<template>
    <div  class="notification-container">
        <div class="text-body">
            <p style="margin: 0">{{this.notif.description}}</p>
        </div>
        <div class="b-group">
            <button class="confirm" @click="verifyClick"><i class="fas fa-check"></i></button>
            <button class="deny" @click="handleClick"><i class="fas fa-ban"></i></button>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['notif'],
        data () {
            return {
            }
        },
        methods: {
            handleClick(){
                this.$emit('remove', this.notif.id)
            }, 
            verifyClick(){
                this.$emit('changeVerify', this.notif.id)
            }
        }


    }
</script>

<style scoped>
    .notification-container{
        display: flex;
        /*justify-content: space-between;*/
    }

    .text-body:hover{
        opacity: .8;
    }

    .text-body{
        width: 80%;
        margin: 0;
    }

    .b-group{
        display: flex;
        width: 10%;
    }

    .b-group button{
        margin: 0 5px;
        width: 40%;
    }
</style>

