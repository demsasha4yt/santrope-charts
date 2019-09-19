<template>
<div>
  <v-layout class="pt-10 pb-10" column>
    <v-flex>
      <v-layout justify-center>
        <v-flex class="xs2 ma-auto">
          <v-card>
            <v-card-title class="caption">From</v-card-title>
            <v-card-text class="caption">
                {{dateStart}}
            </v-card-text>            
          </v-card>
        </v-flex>
        <v-flex class="xs6 ma-auto">
          <v-range-slider
            v-model="range"
            :max="max"
            :min="min"
            hide-details
            class="align-center"
          >
        </v-range-slider>
        </v-flex>
        <v-flex class="xs2 ma-auto">
          <v-card>
            <v-card-title class="caption">To</v-card-title>
            <v-card-text class="caption">
                {{dateEnd}}
            </v-card-text>            
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    </v-layout>
    <v-layout>
    <v-flex class="sm11 ma-auto">
    <div class="columns">
      <div class="column">
        <h3>Santrope Online</h3>
        <line-chart
          :chart-data="datacollection"
          :height="300" 
          :options="options"
          ></line-chart>
      </div>
    </div>
    </v-flex>
    </v-layout>
</div>
</template>

<script>
  import LineChart from './LineChart.js'
  import OnlineService from '@/services/OnlineService'
  export default {
    components: {
      LineChart
    },
    data () {
      return {
        min: 0,
        max: 10000,
        range: [0, 10000],
        rangeDate: [0, 0],
        periodStart: null,
        periodEnd: null,
        onlineData: null,
        filteredData: null,
        dateStart: null,
        dateEnd: null,
        datacollection: null,
        options: {
          elements: {
            point: {
              radius: 0.5
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              },
              scaleLabel: {
                display: true,
                labelString: "Онлайн",
                fontColor: "black"
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 11
              },
              display: false,
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.update()
    },
    watch: {
      range: function () {
        this.dateStart = this.getDateFromStr(this.onlineData[this.range[0]].createdAt)
        this.dateEnd = this.getDateFromStr(this.onlineData[this.range[1]].createdAt)
        this.filteredData = this.onlineData.slice(this.range[0], this.range[1] - this.range[0])
        this.fill()
      },
    },
    methods: {
      update() {
        OnlineService.online()
          .then(response => {
            this.onlineData = response.data.reverse()
            this.filteredData = this.onlineData
            this.min = 0
            this.max = this.onlineData.length - 1
            this.dateStart = this.getDateFromStr(this.filteredData[0].createdAt)
            this.dateEnd = this.getDateFromStr(this.filteredData[this.max].createdAt)
            this.fill()
          })
      },
      getDateFromStr(date) {
        let d = new Date(date)
        return d.toLocaleString()
      },
      fill() {
        let newDataCollection = {
          labels: this.filteredData.map(a => this.getDateFromStr(a.createdAt)),
          datasets: [
            {
              label: 'players',
              borderWidth: 2,
              borderColor: '#FF0000',
              pointBackgroundColor: '#FF0000',
              backgroundColor: 'transparent',
              data: this.filteredData.map(a => a.players)
            },
            {
              label: 'maxplayers',
              borderWidth: 0.5,
              borderColor: '#FF4500',
              pointBackgroundColor: '#FF4500',
              backgroundColor: 'transparent',
              data: this.onlineData.map(a => a.maxplayers)
            }
          ]
        }
        this.datacollection = newDataCollection     
      }
    }
  }
</script>

<style>
</style>