<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Energy Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Energy Type Distribution -->
      <div class="bg-white p-4 shadow rounded">
        <h2 class="text-lg font-semibold mb-2">Energy Type Distribution</h2>
        <canvas ref="typeChartCanvas"></canvas>
      </div>

      <!-- Installation Growth -->
      <div class="bg-white p-4 shadow rounded">
        <h2 class="text-lg font-semibold mb-2">Installation Growth Over Time</h2>
        <canvas ref="growthChartCanvas"></canvas>
      </div>

      <!-- House Type Adoption -->
      <div class="bg-white p-4 shadow rounded md:col-span-2">
        <h2 class="text-lg font-semibold mb-2">Adoption by House Type</h2>
        <canvas ref="houseChartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'
import axios from 'axios'

export default {
  name: 'EnergyDashboard',
  setup() {
    const typeChartCanvas = ref(null)
    const growthChartCanvas = ref(null)
    const houseChartCanvas = ref(null)

    const fetchAndRenderCharts = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/analytics')

        // Pie Chart: Energy Type Distribution
        new Chart(typeChartCanvas.value, {
          type: 'pie',
          data: {
            labels: data.energy_types.map(e => e.name),
            datasets: [{
              label: 'Energy Type Distribution',
              data: data.energy_types.map(e => e.count),
              backgroundColor: data.energy_types.map(e => e.color),
            }]
          }
        })

        // Line Chart: Installation Growth Over Time
        new Chart(growthChartCanvas.value, {
          type: 'line',
          data: {
            labels: data.installation_growth.map(item => item.date),
            datasets: [{
              label: 'Installations',
              data: data.installation_growth.map(item => item.total),
              fill: false,
              borderColor: '#3490dc',
              tension: 0.3
            }]
          }
        })

        // Bar Chart: House Type Adoption
        new Chart(houseChartCanvas.value, {
          type: 'bar',
          data: {
            labels: data.house_types.map(item => item.type),
            datasets: [{
              label: 'Installations',
              data: data.house_types.map(item => item.count),
              backgroundColor: '#38c172'
            }]
          }
        })

      } catch (error) {
        console.error('Failed to load chart data:', error)
      }
    }

    onMounted(fetchAndRenderCharts)

    return {
      typeChartCanvas,
      growthChartCanvas,
      houseChartCanvas
    }
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}
</style>
