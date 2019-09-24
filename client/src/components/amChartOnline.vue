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
import OnlineService from '@/services/OnlineService'

am4core.options.queue = true;
am4core.options.minPolylineStep = 5;
am4core.options.onlyShowOnViewport = true;

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
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "createdAt"
      categoryAxis.renderer.labels.template.adapter.add("text", (label, target, key) => {
        return label
      });
      let label = categoryAxis.renderer.labels.template;
      label.wrap = true;
      label.maxWidth = 120;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;
      valueAxis.min = 0
      valueAxis.max = 1000

      let series = chart.series.push(new am4charts.LineSeries());
      series.minBulletDistance = 20;
      series.dataFields.categoryX = "createdAt";
      series.dataFields.valueY = "players";
      series.tooltipText = "{valueY.value}";
     
      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      scrollbarX.parent = chart.bottomAxesContainer;

      chart.zoomOutButton.align = "left"
      chart.responsive.enabled = true;
      chart.data = this.onlineData.reverse()
      chart.cursor = new am4charts.XYCursor();
      chart.scrollbarX = scrollbarX;
      chart.events.on("ready", function(){
        let curDate = new Date();
        let x = Number((new Date().getTime() - (curDate.getTime() - 1000*60*60*26))/1000/60/10).toFixed(0) - 1
        categoryAxis.zoomToIndexes(chart.data.length - 1 - x, chart.data.length - 1)
      })
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