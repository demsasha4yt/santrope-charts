<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>SANTROPE </span>
        <span class="font-weight-light">Online viewer</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <!-- <OnlineChart /> -->
      <AmChartOnline :height="300"/>
    </v-content>
  </v-app>
</template>

<script>
//import OnlineChart from './components/OnlineChart';
import  AmChartOnline from './components/amChartOnline'

export default {
  name: 'App',
  components: {
    // OnlineChart,
    AmChartOnline
  },
  data: () => ({
    //
  }),
};
</script>
