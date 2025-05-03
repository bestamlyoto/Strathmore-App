<template>
  <v-app>
    <NavBar />

    <!-- Correct layout element -->
    <v-main>
      <v-container class="pa-4">
        <RouterView />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/FooterBar.vue'
</script>
