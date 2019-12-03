<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <Sett/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Sett from './components/Sett.vue';

  @Component({
    components: {
      Sett,
    },
  })
  export default class App extends Vue {
  }
</script>

<style lang="scss">
  html {
    min-width: 640px;
    font-size: 12px !important;
  }

  .v-input--selection-controls {
    margin-top: 4px !important;
    padding-top: 4px !important;
  }

  .col {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .remove-padding {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
</style>  