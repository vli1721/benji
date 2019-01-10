<template>
    <div  class="notification-container">
        <p class="text-body">{{this.notif.body}}</p>
        <v-btn flat class="confirm"><i class="fas fa-check"></i></v-btn>
        <v-btn flat class="deny" @click="handleClick"><i class="fas fa-ban"></i></v-btn>
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
            }
        }


    }
</script>

<style scoped>
    .notification_container{
        display: flex;
    }

    .text-body{

    }

    .confirm{

    }

    .deny{

    }
</style>

