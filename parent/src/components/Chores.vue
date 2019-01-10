<template>
<v-sheet
                style="width: 40%; margin: 20px auto 20px 20px; height: 40%;"
                class="d-flex"
                color="blue lighten-3"
        >
  <v-expansion-panel>
    <v-expansion-panel-content
      v-for="(item,i) in 5"
      :key="i"
    >
      <div slot="header">Item</div>
      <v-card>
        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>

</v-sheet>
</template>

<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>
