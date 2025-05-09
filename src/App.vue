<template>
  <v-app>
    <NavBar />

    <v-main>
      <!-- Use fluid + no padding -->
      <v-container class="pa-0" fluid>
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
