<template>
  <v-main>
    <v-container fluid fill-height class="login-background">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card elevation="10" class="pa-6 rounded-lg">
            <v-form @submit.prevent="handleLogin" ref="form">
              <div class="text-center mb-6">
                <v-img
                  src="@/assets/logo.png"
                  alt="GreenForYou Logo"
                  max-height="80"
                  contain
                  class="mb-4"
                ></v-img>
                <h1 class="text-h4 font-weight-bold green--text text--darken-2">Welcome Back</h1>
                <p class="text-subtitle-1 mt-2">Access your green energy dashboard</p>
              </div>
              <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>
              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                :rules="emailRules"
                required
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :rules="passwordRules"
                required
                outlined
                dense
              ></v-text-field>
              <div class="d-flex justify-space-between align-center mb-2">
                <v-checkbox
                  v-model="rememberMe"
                  label="Remember me"
                  color="green darken-2"
                  hide-details
                  dense
                ></v-checkbox>
                <router-link
                  to="/forgot-password"
                  class="green--text text--darken-2 text-body-2"
                >
                  Forgot password?
                </router-link>
              </div>
              <v-btn
                block
                color="green darken-2"
                dark
                class="mt-4"
                large
                type="submit"
                :loading="loading"
              >
                Log In
              </v-btn>
              <div class="text-center mt-6">
                <p class="mb-1">
                  New to GreenForYou?
                </p>
                <v-btn
                  to="/sign-up"
                  color="green lighten-4"
                  class="green--text text--darken-2"
                  text
                  small
                >
                  Create Account
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Form fields
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const form = ref(null)

// Validation rules
const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const passwordRules = [
  v => !!v || 'Password is required',
  v => (v && v.length >= 6) || 'Password must be at least 6 characters'
]

// Login handler with form validation
async function handleLogin() {
  const { valid } = await form.value.validate()

  if (!valid) return

  try {
    const userData = {
      name: 'John Doe',
      email: email.value,
      created_at: new Date().toISOString(),
      token: 'fake_token',  // Replace with actual token
    }

    await authStore.login(userData)

    router.push('/submit-data')
  } catch (err) {
    console.error('Login failed', err)
    alert('Login failed. Please try again.')
  }
}
</script>

<style scoped>
.login-background {
  background-color: #f5f5f5;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    url('@/assets/green-energy-bg.jpg');
  background-size: cover;
  background-position: center;
}

.rounded-lg {
  border-radius: 10px;
}
</style>
