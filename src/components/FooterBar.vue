<template>
  <v-footer class="footer-custom" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.text"
        router
        :to="link.route"
        class="mx-2 white--text footer-link"
        rounded="xl"
        variant="text"
        active-class="footer-active"
      >
        {{ link.text }}
      </v-btn>
      <v-col class="text-center mt-4 white--text" cols="12">
        <strong>Green For You</strong> &copy; {{ new Date().getFullYear() }}
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue'

const links = ref([
  { text: 'Home', route: '/' },
  { text: 'About Us', route: '/about-us' },
  { text: 'Services', route: '/services' },
  { text: 'Contact Us', route: '/contact-us' },
  { text: 'Login', route: '/login' },
])
</script>

<style scoped>
.footer-custom {
  background-color: #2c3e50;
  color: white;
  padding: 24px 0;
}

.footer-link {
  color: white !important;
  font-weight: 500;
}

.footer-link .v-btn__content {
  color: white !important;
}

.footer-active {
  border-bottom: 2px solid white;
}
</style>
