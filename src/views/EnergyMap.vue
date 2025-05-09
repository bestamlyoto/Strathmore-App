<template>
  <v-container class="energy-map-container">
    <!-- Header Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <h1 class="text-h3 text-center green--text text--darken-2">
          Kenya Renewable Energy Map
        </h1>
        <p class="text-h6 text-center mt-2">
          Visualizing clean energy adoption across all 47 counties
        </p>
      </v-col>
    </v-row>

    <!-- Map Controls -->
    <v-row class="mb-4">
      <v-col cols="12" md="8">
        <v-card class="pa-4" elevation="2">
          <div class="d-flex flex-wrap align-center">
            <v-select
              v-model="selectedCounty"
              :items="kenyanCounties"
              label="Filter by County"
              outlined
              dense
              clearable
              class="mr-4"
              style="min-width: 200px"
            ></v-select>

            <v-select
              v-model="selectedEnergyType"
              :items="energyTypes"
              label="Energy Type"
              outlined
              dense
              clearable
              class="mr-4"
              style="min-width: 200px"
            ></v-select>

            <v-select
              v-model="timePeriod"
              :items="timePeriods"
              label="Time Period"
              outlined
              dense
              class="mr-4"
              style="min-width: 180px"
            ></v-select>

            <v-btn color="green darken-2" dark @click="applyFilters" class="mr-2">
              Apply
            </v-btn>
            <v-btn @click="resetFilters" outlined color="green darken-2">
              Reset
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="2">
          <div class="d-flex justify-space-between align-center">
            <span class="text-body-1 font-weight-medium">
              Total Households Mapped:
            </span>
            <span class="text-h6 green--text">
              {{ totalHouseholds.toLocaleString() }}
            </span>
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex justify-space-between align-center">
            <span class="text-body-1 font-weight-medium">Last Updated:</span>
            <span class="text-body-1">{{ lastUpdated }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Interactive Map -->
    <v-row>
      <v-col cols="12">
        <v-card class="pa-2" elevation="2">
          <div class="map-wrapper">
            <div class="placeholder-map">
              <v-img
                src="@/assets/kenya-energy-map.jpg"
                alt="Interactive Kenya Energy Map"
                contain
                height="500"
              ></v-img>
              <div class="map-overlay">
                <v-chip
                  v-for="(county, index) in sampleCountyData"
                  :key="index"
                  :color="getEnergyColor(county.energyType)"
                  dark
                  small
                  class="ma-1 county-chip"
                  :style="{ left: county.x + '%', top: county.y + '%' }"
                >
                  {{ county.name }}
                </v-chip>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Statistics Section -->
    <v-row class="mt-8">
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="2">
          <h2 class="text-h5 mb-4">Energy Distribution by Type</h2>
          <div style="height: 300px">
            <v-img
              src="@/assets/energy-distribution-chart.png"
              alt="Energy Distribution Chart"
              contain
              height="100%"
            ></v-img>
          </div>
          <v-simple-table class="mt-4">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Energy Type</th>
                  <th class="text-right">Households</th>
                  <th class="text-right">Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in energyStats" :key="item.type">
                  <td>
                    <v-icon :color="getEnergyColor(item.type)" small class="mr-2">mdi-circle</v-icon>
                    {{ item.type }}
                  </td>
                  <td class="text-right">{{ item.households?.toLocaleString() || 'N/A' }}</td>
                  <td class="text-right">{{ item.percentage }}%</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="2" height="100%">
          <h2 class="text-h5 mb-4">Top Performing Counties</h2>
          <v-list>
            <v-list-item v-for="(county, index) in topCounties" :key="county.name">
              <v-list-item-avatar>
                <v-avatar :class="getRankColor(index)" size="36">
                  <span class="white--text">{{ index + 1 }}</span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ county.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ county.households?.toLocaleString() || 'N/A' }} households • {{ county.energyType }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip small :color="getEnergyColor(county.energyType)" dark>
                  {{ county.adoptionRate }}%
                </v-chip>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Data Submission CTA -->
    <v-row class="mt-8">
      <v-col cols="12">
        <v-card color="green lighten-5" class="pa-6 text-center">
          <h2 class="text-h5 mb-2">Don't See Your Community?</h2>
          <p class="mb-4">
            Help us improve our data by submitting your household's energy information
          </p>
          <v-btn color="green darken-2" dark large to="/submit-data" class="mt-2">
            Submit Your Data
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      countiesFromBackend: [],
      sampleCountyData: [],
      energyStats: [],
      topCounties: [],
      selectedCounty: null,
      selectedEnergyType: null,
      timePeriod: "Last 12 Months",
      lastUpdated: new Date().toLocaleDateString("en-KE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      kenyanCounties: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
      energyTypes: ["Solar", "Wind", "Hydro", "Biogas", "Geothermal", "Hybrid"],
      timePeriods: ["Last 7 Days", "Last 30 Days", "Last 12 Months", "All Time"],
    };
  },
  computed: {
    totalHouseholds() {
      return this.topCounties.reduce((sum, c) => sum + (c.households || 0), 0);
    }
  },
  mounted() {
    this.fetchCountyData();
  },
  methods: {
    async fetchCountyData() {
      try {
        const res = await fetch("http://localhost:8000/api/county-data");
        const data = await res.json();
        this.countiesFromBackend = data;
        this.mapCountyData(data);
      } catch (error) {
        console.error("Failed to fetch county data:", error);
      }
    },

    mapCountyData(counties) {
      const coordMap = {
        Nairobi: { x: 65, y: 45 },
        Mombasa: { x: 80, y: 70 },
        Kisumu: { x: 50, y: 65 },
        Nakuru: { x: 60, y: 40 },
        Eldoret: { x: 55, y: 35 },
      };

      this.sampleCountyData = counties.map(county => {
        const submissions = county.energy_submissions || [];
        const dominant = submissions.reduce((max, curr) =>
          curr.count > max.count ? curr : max, { count: 0, energy_type: { name: "Unknown" } });

        return {
          name: county.name,
          x: coordMap[county.name]?.x || 50,
          y: coordMap[county.name]?.y || 50,
          energyType: dominant.energy_type.name,
        };
      });

      this.energyStats = this.getEnergyStatsFromCountyData(counties);
      this.topCounties = this.getTopCounties(counties);
    },

    getEnergyStatsFromCountyData(counties) {
      const typeTotals = {};
      counties.forEach(county => {
        const submissions = county.energy_submissions || [];
        submissions.forEach(sub => {
          const type = sub.energy_type.name;
          typeTotals[type] = (typeTotals[type] || 0) + sub.count;
        });
      });

      const total = Object.values(typeTotals).reduce((sum, val) => sum + val, 0);
      return Object.entries(typeTotals).map(([type, count]) => ({
        type,
        households: count,
        percentage: total ? ((count / total) * 100).toFixed(1) : 0,
      }));
    },

    getTopCounties(counties) {
      return counties
        .map(county => {
          const totalHouseholds = county.energy_submissions.reduce((sum, sub) => sum + sub.count, 0);
          const adoptionRate = (totalHouseholds / county.population) * 100;
          return {
            name: county.name,
            households: totalHouseholds,
            energyType: county.energy_type.name,
            adoptionRate: adoptionRate.toFixed(1),
          };
        })
        .sort((a, b) => b.adoptionRate - a.adoptionRate)
        .slice(0, 5);
    },

    getEnergyColor(type) {
      switch (type) {
        case "Solar": return "orange";
        case "Wind": return "blue";
        case "Hydro": return "lightblue";
        case "Biogas": return "green";
        case "Geothermal": return "brown";
        case "Hybrid": return "purple";
        default: return "grey";
      }
    },

    getRankColor(index) {
      switch (index) {
        case 0: return "red";
        case 1: return "orange";
        case 2: return "yellow";
        default: return "blue";
      }
    },

    applyFilters() {
      // Filter logic here based on the selected county, energy type, and time period
    },

    resetFilters() {
      this.selectedCounty = null;
      this.selectedEnergyType = null;
      this.timePeriod = "Last 12 Months";
    },
  }
};
</script>

<style scoped>
.energy-map-container {
  padding: 20px;
}

.map-wrapper {
  position: relative;
}

.placeholder-map {
  position: relative;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.county-chip {
  position: absolute;
  pointer-events: none;
}

</style>
