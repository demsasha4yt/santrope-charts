<template>
  <v-layout>
    <v-flex class="sm11 ma-auto graph">
      <div class="graph" ref="chartdiv">
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import OnlineService from '@/services/OnlineService'
am4core.useTheme(am4themes_animated);
export default {
  name: 'HelloWorld',
  data() {
    return {
       onlineData: null,
       chart: null,
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    createChart() {
      am4core.options.minPolylineStep = 5;
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
      chart.responsive.enabled = true;
      chart.data = this.onlineData.reverse()
      chart.paddingRight = 20;
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "createdAt"
      categoryAxis.renderer.inside = true;
      let label = categoryAxis.renderer.labels.template;
      label.wrap = true;
      label.maxWidth = 120;
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;
      let series = chart.series.push(new am4charts.LineSeries());
      series.minBulletDistance = 20;
      series.dataFields.categoryX = "createdAt";
      series.dataFields.valueY = "players";
      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();
      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      scrollbarX.parent = chart.bottomAxesContainer;
      chart.scrollbarX = scrollbarX;
      
      this.chart = chart;
      // console.log(this.chart.data)/
    },
    update() {
        OnlineService.online()
          .then(response => {
            this.onlineData = response.data
            this.onlineData.map(x => {
              x.createdAt = (new Date(x.createdAt)).toLocaleString()
            })
            this.createChart()
          })
      },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 300px;
}
.graph {
  height: 400px;
  max-height: 100%
}
</style>