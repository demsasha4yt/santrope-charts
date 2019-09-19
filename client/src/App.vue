<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>SANTROPE </span>
        <span class="font-weight-light">Online viewer</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <OnlineChart />
    </v-content>
  </v-app>
</template>

<script>
import OnlineChart from './components/OnlineChart';

export default {
  name: 'App',
  components: {
    OnlineChart
  },
  data: () => ({
    //
  }),
};
</script>
