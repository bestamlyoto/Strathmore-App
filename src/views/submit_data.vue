<template>
  <v-container class="submit-data-container">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6" elevation="4">
          <v-card-title class="text-center green--text text--darken-2 mb-6">
            <h2 class="text-h4">Submit Your Energy Data</h2>
          </v-card-title>

          <v-alert v-if="successMessage" type="success" class="mb-4">
            {{ successMessage }}
          </v-alert>

          <v-alert v-if="errorMessage" type="error" class="mb-4">
            {{ errorMessage }}
          </v-alert>

          <v-form ref="form" @submit.prevent="submitData">
            <!-- County Selection -->
            <v-select
              v-model="formData.county_id"
              :items="counties"
              item-text="name"
              item-value="id"
              label="Select County"
              :rules="[v => !!v || 'County is required']"
              outlined
              dense
              required
              class="mb-4"
            ></v-select>

            <!-- Energy Type Selection -->
            <v-select
              v-model="formData.energy_type_id"
              :items="energyTypes"
              item-text="name"
              item-value="id"
              label="Energy Type"
              :rules="[v => !!v || 'Energy type is required']"
              outlined
              dense
              required
              class="mb-4"
            >
              <template v-slot:item="{ item }">
                <v-icon :color="item.color" class="mr-2">mdi-circle</v-icon>
                {{ item.name }}
              </template>
            </v-select>

            <!-- House Type Selection -->
            <v-select
              v-model="formData.house_type"
              :items="houseTypes"
              label="House Type"
              :rules="[v => !!v || 'House type is required']"
              outlined
              dense
              required
              class="mb-4"
            ></v-select>

            <!-- Energy Capacity -->
            <v-text-field
              v-model="formData.energy_capacity"
              label="Energy Capacity (kW)"
              type="number"
              step="0.01"
              outlined
              dense
              class="mb-4"
            ></v-text-field>

            <!-- Installation Date -->
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formData.installation_date"
                  label="Installation Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                  class="mb-4"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formData.installation_date"
                @input="dateMenu = false"
              ></v-date-picker>
            </v-menu>

            <!-- Primary Source Checkbox -->
            <v-checkbox
              v-model="formData.is_primary"
              label="This is my primary energy source"
              class="mb-4"
            ></v-checkbox>

            <!-- Submit Button -->
            <v-btn
              color="green darken-2"
              dark
              block
              large
              type="submit"
              :loading="loading"
            >
              <v-icon left>mdi-send</v-icon>
              Submit Data
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth' // (Update path if needed)
import { useRouter } from 'vue-router'
import axios from '@/services/axios' // If you have a centralized axios, better to import it

const router = useRouter()
const authStore = useAuthStore()
const user = authStore.user

// Form data
const formData = ref({
  county_id: null,
  energy_type_id: null,
  house_type: null,
  energy_capacity: null,
  installation_date: null,
  is_primary: false
})

const houseTypes = [
  'Apartment',
  'Bungalow',
  'Maisonette',
  'Standalone House',
  'Eco-Dome'
]
const counties = ref([])
const energyTypes = ref([])
const dateMenu = ref(false)
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const form = ref(null)

async function fetchCounties() {
  try {
    const response = await axios.get('/api/counties')
    counties.value = response.data
  } catch (error) {
    console.error('Error fetching counties:', error)
  }
}

async function fetchEnergyTypes() {
  try {
    const response = await axios.get('/api/energy-types')
    energyTypes.value = response.data
  } catch (error) {
    console.error('Error fetching energy types:', error)
  }
}

async function submitData() {
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await axios.post('/api/submit-energy', formData.value)

    successMessage.value = 'Energy data submitted successfully!'
    form.value.reset()

  } catch (error) {
    console.error('Submission error:', error)
    errorMessage.value = error.response?.data?.message || 'Failed to submit energy data. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchCounties()
  await fetchEnergyTypes()
})
</script>


<style scoped>
.submit-data-container {
  max-width: 800px;
  margin: 0 auto;
}

.v-card {
  border-radius: 12px;
}
</style>