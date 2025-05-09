<template>
  <!-- Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    class="custom-drawer"
    dark
    app
    v-if="isAuthenticated || !hideForUnauthenticated"
    style="background-color: #2c3e50;"
  >
    <v-layout column align-center>
      <v-flex class="my-2 mx-auto text-center">
        <v-avatar size="100">
          <v-img :src="userAvatar"></v-img>
        </v-avatar>
        <p class="white--text subheading mt-1 text-center" v-if="isAuthenticated">{{ userName }}</p>
      </v-flex>
    </v-layout>
    <v-list flat>
      <v-list-item
        v-for="path in filteredPaths"
        :key="path.text"
        router
        :to="path.route"
        active-class="border"
      >
        <v-list-item-content class="d-flex align-center">
          <v-icon>{{ path.icon }}</v-icon>
          <span class="ml-2">{{ path.text }}</span>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- App Bar -->
  <div class="glow-wrapper">
    <v-app-bar flat class="elevation-10 navbar-glow" dark style="background-color: #2c3e50;">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="isAuthenticated || !hideForUnauthenticated"
      ></v-app-bar-nav-icon>

      <div class="logo-container d-flex align-center">
        <img src="@/assets/logo.svg" alt="GreenForYou Logo" class="logo-image" />
        <span class="logo-text ml-2">GreenForYou</span>
      </div>

      <v-spacer></v-spacer>

      <!-- Desktop Menu -->
      <div class="d-none d-md-flex">
        <v-btn
          v-for="path in publicPaths"
          :key="path.text"
          text
          :to="path.route"
          class="mx-1 white--text nav-item"
        >
          <v-icon left class="white--text">{{ path.icon }}</v-icon>
          {{ path.text }}
        </v-btn>
      </div>

      <!-- Mobile Menu -->
      <v-menu offset-y class="d-md-none">
        <template v-slot:activator="{ props }">
          <v-btn text v-bind="props" class="white--text nav-item">
            <v-icon left class="white--text">mdi-menu</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="path in filteredPaths"
            :key="path.text"
            router
            :to="path.route"
          >
            <v-list-item-title>{{ path.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Auth Buttons -->
      <v-btn
        v-if="!isAuthenticated"
        text
        to="/login"
        class="ml-2 white--text nav-item"
      >
        <v-icon left class="white--text">mdi-login</v-icon>
        <span>Login</span>
      </v-btn>

      <v-btn
        v-if="isAuthenticated"
        text
        @click="handleLogout"
        class="ml-2 white--text nav-item"
      >
        <v-icon left class="white--text">mdi-logout</v-icon>
        <span>Logout</span>
      </v-btn>
    </v-app-bar>
    <!-- Glowing effect below bar -->
    <div class="glow-bar"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../services/auth.service'
import { useRouter } from 'vue-router'

const props = defineProps({
  hideForUnauthenticated: {
    type: Boolean,
    default: true,
  },
})

const drawer = ref(false)
const router = useRouter()
const { isAuthenticated, currentUser, isAdmin, logout, loadUserInfo } = useAuth()

onMounted(async () => {
  await loadUserInfo()
})

const userName = computed(() => currentUser.value?.name || 'Guest')
const userAvatar = computed(() => currentUser.value?.user_photo || 'https://cdn.vuetifyjs.com/images/john.jpg')

function handleLogout() {
  logout()
  router.push('/')
}

const publicPaths = [
  { icon: 'mdi-home', text: 'Home', route: '/' },
  { icon: 'mdi-map', text: 'Energy Map', route: '/energy_map' },
  { icon: 'mdi-information', text: 'About', route: '/about-us' }
]

const protectedPaths = [
  { icon: 'mdi-account', text: 'Profile', route: '/profile', requiresAuth: true },
  { icon: 'mdi-solar-power', text: 'Submit Data', route: '/submit', requiresAuth: true },
  { icon: 'mdi-table', text: 'Submissions', route: '/submissions', requiresAdmin: true }
]

const filteredPaths = computed(() => {
  return [
    ...publicPaths,
    ...protectedPaths.filter(path => {
      if (path.requiresAuth && isAuthenticated.value) {
        return !path.requiresAdmin || isAdmin.value
      }
      return false
    })
  ]
})
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 40px;
  width: auto;
  filter: drop-shadow(0 0 4px rgba(0, 255, 204, 0.6));
}

.logo-text {
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
}

.glow-wrapper {
  position: relative;
  z-index: 10;
}

.glow-bar {
  height: 10px;
  background: #2c3e50;
  box-shadow: 0 0 20px 8px #2c3e50;
  border-radius: 50%;
  filter: blur(4px);
  margin-top: -4px;
  z-index: 1;
  position: relative;
}

.border {
  border-left: 4px solid #ffffff;
}

.custom-drawer {
  color: white;
}

.custom-drawer .v-list-item-title,
.custom-drawer .v-icon,
.custom-drawer .v-list-item-content span {
  color: white !important;
}

.nav-item {
  color: white !important;
}

.nav-item .v-icon {
  color: white !important;
}
</style>
