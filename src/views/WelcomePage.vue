<template>
  <v-container fluid class="welcome-background">
    <v-row justify="center" align="center" class="pt-16">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="welcome-card" elevation="10">
          <!-- Welcome header -->
          <v-card-title class="text-center green darken-2 white--text py-4">
            <h1 class="text-h3 font-weight-bold w-100">WELCOME TO GREEN FOR YOU</h1>
          </v-card-title>

          <!-- User profile section -->
          <v-card-text v-if="isAuthenticated" class="text-center py-8">
            <v-avatar size="150" class="mb-4">
              <v-img
                :src="userPhotoUrl"
                alt="User Photo"
                cover
              ></v-img>
            </v-avatar>

            <div class="text-uppercase text-h4 font-weight-bold my-2">
              {{ userName }}
            </div>

            <div class="text-uppercase text-h6 font-weight-medium grey--text text--darken-1 mb-2">
              {{ userEmail }}
            </div>

            <div class="text-uppercase text-body-1 green--text text--darken-2 font-weight-medium">
              {{ userRole }}
            </div>

            <v-divider class="my-6"></v-divider>

            <!-- Welcome message -->
            <p class="text-body-1 text-center mx-auto" style="max-width: 80%;">
              Thank you for joining Kenya's green energy revolution! Track your energy usage,
              contribute to our national energy map, and help build a sustainable future.
            </p>

            <!-- Action buttons -->
            <v-row class="mt-8">
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  color="green darken-1"
                  dark
                  large
                  router
                  to="/energy-map"
                >
                  <v-icon left>mdi-map</v-icon>
                  View Energy Map
                </v-btn>
              </v-col>

              <v-col cols="12" sm="6">
                <v-btn
                  block
                  outlined
                  color="green darken-1"
                  large
                  router
                  to="/submit-data"
                >
                  <v-icon left>mdi-solar-panel</v-icon>
                  Submit Energy Data
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Guest view -->
          <v-card-text v-else class="text-center py-8">
            <v-avatar size="150" class="mb-4">
              <v-img
                src="@/assets/green-energy-icon.png"
                alt="Guest"
                cover
              ></v-img>
            </v-avatar>

            <div class="text-h4 font-weight-bold my-2">
              JOIN KENYA'S ENERGY REVOLUTION
            </div>

            <v-divider class="my-6"></v-divider>

            <!-- Welcome message for guests -->
            <p class="text-body-1 text-center mx-auto" style="max-width: 80%;">
              Track and share your clean energy usage to help map Kenya's renewable energy adoption.
              Register now to be part of our national green energy database.
            </p>

            <!-- Action buttons for guests -->
            <v-row class="mt-8">
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  color="green darken-1"
                  dark
                  large
                  router
                  to="/login"
                >
                  <v-icon left>mdi-login</v-icon>
                  Login
                </v-btn>
              </v-col>

              <v-col cols="12" sm="6">
                <v-btn
                  block
                  outlined
                  color="green darken-1"
                  large
                  router
                  to="/sign-up"
                >
                  <v-icon left>mdi-account-plus</v-icon>
                  Register
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../services/auth.service'

const router = useRouter()
const { isAuthenticated, currentUser, loadUserInfo } = useAuth()

// Load user data on component mount
onMounted(async () => {
  await loadUserInfo()
})

// Computed properties for user info
const userName = computed(() => {
  return currentUser.value?.name || 'ENERGY CHAMPION'
})

const userEmail = computed(() => {
  return currentUser.value?.email || ''
})

const userRole = computed(() => {
  return currentUser.value?.role?.name || 'Community Member'
})

const userPhotoUrl = computed(() => {
  if (currentUser.value?.user_photo) {
    return currentUser.value.user_photo
  } else {
    return '@/assets/green-energy-user.png'
  }
})
</script>

<style scoped>
.welcome-background {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%);
  min-height: 100vh;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.welcome-card {
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid #2e7d32;
}
</style>