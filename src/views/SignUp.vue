<template>
  <v-main>
    <v-container fluid fill-height class="signup-background">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card elevation="10" class="pa-6 rounded-lg">
            <v-form @submit.prevent="register" ref="form">
              <div class="text-center mb-6">
                <v-img
                  src="@/assets/green-for-you-logo.png"
                  alt="GreenForYou Logo"
                  contain
                  height="80"
                  class="mb-4"
                ></v-img>
                <h1 class="text-h4 font-weight-bold green--text text--darken-2">
                  Join GreenForYou
                </h1>
                <p class="text-subtitle-1 mt-2">
                  Register to track your clean energy usage and contribute to Kenya's energy map
                </p>
              </div>

              <v-alert v-if="errorMessage" type="error" class="mb-4">{{ errorMessage }}</v-alert>

              <v-text-field
                v-model="name"
                label="Full Name"
                prepend-inner-icon="mdi-account"
                :rules="[(v) => !!v || 'Name is required']"
                required
                outlined
                dense
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                :rules="[
                  (v) => !!v || 'Email is required',
                  (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
                ]"
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
                :rules="[
                  (v) => !!v || 'Password is required',
                  (v) => v.length >= 8 || 'Password must be at least 8 characters',
                ]"
                required
                outlined
                dense
              ></v-text-field>

              <v-text-field
                v-model="passwordConfirmation"
                label="Confirm Password"
                prepend-inner-icon="mdi-lock-check"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmPassword ? 'text' : 'password'"
                @click:append="showConfirmPassword = !showConfirmPassword"
                :rules="[
                  (v) => !!v || 'Please confirm your password',
                  (v) => v === password || 'Passwords must match',
                ]"
                required
                outlined
                dense
              ></v-text-field>

              <!-- Dropdown to select County -->
              <v-select
                v-model="county"
                :items="kenyanCounties"
                item-title="name"
                item-value="id"
                label="Select Your County"
                prepend-inner-icon="mdi-map-marker"
                :rules="[(v) => !!v || 'County is required']"
                required
                outlined
                dense
                class="mt-4"
              ></v-select>

              <div class="mt-4">
                <v-file-input
                  v-model="userPhoto"
                  :rules="[(v) => !v || v.size < 2000000 || 'Image size should be less than 2 MB']"
                  accept="image/png, image/jpeg, image/jpg"
                  placeholder="Profile picture (optional)"
                  prepend-icon="mdi-camera"
                  label="Profile Picture"
                  show-size
                  counter
                  outlined
                  dense
                ></v-file-input>
              </div>

              <v-checkbox
                v-model="termsAgreed"
                :rules="[(v) => !!v || 'You must agree to the terms']"
                label="I agree to the Terms and Conditions"
                required
                class="mt-2"
              ></v-checkbox>

              <v-btn
                block
                color="green darken-2"
                dark
                class="mt-4"
                large
                type="submit"
                :loading="loading"
              >
                <v-icon left>mdi-account-plus</v-icon>
                Register
              </v-btn>

              <div class="text-center mt-6">
                <p>
                  Already have an account?
                  <router-link to="/login" class="green--text text--darken-2 font-weight-medium"
                    >Login Here</router-link
                  >
                </p>
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
import { useAuthStore } from '@/services/auth'
import kenyanCounties from '@/data/kenyanCounties'

const router = useRouter()
const authStore = useAuthStore()

const form = ref(null)
const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const county = ref(null)
const userPhoto = ref(null)
const termsAgreed = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const register = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true
  errorMessage.value = ''

  try {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('email', email.value)
    formData.append('password', password.value)
    formData.append('password_confirmation', passwordConfirmation.value)
    formData.append('county_id', county.value)

    if (userPhoto.value) {
  const file = Array.isArray(userPhoto.value) ? userPhoto.value[0] : userPhoto.value
  if (file instanceof File) {
    formData.append('user_photo', file)
  }
}


    await authStore.register(formData)
    router.push({ name: 'welcome' })
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message || 'Registration failed.'
    console.error('Registration error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.signup-background {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%);
  min-height: 100vh;
}

.rounded-lg {
  border-radius: 12px;
}
</style>
