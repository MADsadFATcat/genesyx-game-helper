<template>
  <v-app>
    <v-content>
      <Sett />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Sett from './components/Sett.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Sett,
  },

  data: () => ({
    //
  }),
});
</script>
