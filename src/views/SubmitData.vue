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
            <!-- County -->
            <v-select
              v-model="formData.county_id"
              :items="counties"
              item-title="name"
              item-value="id"
              label="Select County"
              :rules="[v => !!v || 'County is required']"
              outlined
              dense
              required
              class="mb-4"
            />

            <!-- Energy Type -->
            <v-select
              v-model="formData.energy_type_id"
              :items="energyTypes"
              item-title="name"
              item-value="id"
              label="Energy Type"
              :rules="[v => !!v || 'Energy type is required']"
              outlined
              dense
              required
              class="mb-4"
            >
              <template #item="{ props, item }">
                <v-list-item v-bind="props">
                  <v-list-item-title>
                    <v-icon :style="{ color: item.raw.color }" class="mr-2">mdi-circle</v-icon>
                    {{ item.raw.name }}
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template #selection="{ item }">
                <v-icon :style="{ color: item.color }" class="mr-1">mdi-circle</v-icon>
                {{ item.name }}
              </template>
            </v-select>

            <!-- House Type -->
            <v-select
              v-model="formData.house_type"
              :items="houseTypes"
              label="House Type"
              :rules="[v => !!v || 'House type is required']"
              outlined
              dense
              required
              class="mb-4"
            />

            <!-- Energy Capacity -->
            <v-text-field
              v-model="formData.energy_capacity"
              label="Energy Capacity (kW)"
              type="number"
              step="0.01"
              outlined
              dense
              class="mb-4"
            />

            <!-- Installation Date -->
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template #activator="{ props }">
                <v-text-field
                  v-model="formData.installation_date"
                  label="Installation Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="props"
                  outlined
                  dense
                  class="mb-4"
                />
              </template>
              <v-date-picker
                v-model="formData.installation_date"
                @update:model-value="dateMenu = false"
              />
            </v-menu>

            <!-- Is Primary -->
            <v-checkbox
              v-model="formData.is_primary"
              label="This is my primary energy source"
              class="mb-4"
            />

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
import axios from '@/services/axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const formData = ref({
  county_id: null,
  energy_type_id: null,
  house_type: null,
  energy_capacity: null,
  installation_date: '', // Format: YYYY-MM-DD
  is_primary: false
})

const counties = ref([])
const energyTypes = ref([])
const houseTypes = [
  'Apartment',
  'Bungalow',
  'Maisonette',
  'Standalone House',
  'Eco-Dome'
]

const dateMenu = ref(false)
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const form = ref(null)

async function fetchCounties() {
  try {
    const res = await axios.get('/counties')
    counties.value = res.data.map(({ id, name }) => ({ id, name }))
  } catch (e) {
    console.error('Error fetching counties:', e)
  }
}

async function fetchEnergyTypes() {
  try {
    const res = await axios.get('/energy-types')
    energyTypes.value = res.data.map(({ id, name, color }) => ({
      id, name, color
    }))
  } catch (e) {
    console.error('Error fetching energy types:', e)
  }
}

async function submitData() {
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    await axios.post('/submit-energy', formData.value)
    successMessage.value = 'Energy data submitted successfully!'
    form.value.reset()
  } catch (e) {
    console.error(e)
    errorMessage.value = e.response?.data?.message || 'Submission failed.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCounties()
  fetchEnergyTypes()
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
