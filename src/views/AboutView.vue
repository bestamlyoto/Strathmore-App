<template>
  <v-container class="about-us">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center text-h3 my-6 green--text text--darken-2">About GreenForYou</h1>
      </v-col>
    </v-row>

    <!-- Hero Section -->
    <v-row class="hero-section mb-12">
      <v-col cols="12" md="6" class="d-flex align-center">
        <div>
          <h2 class="text-h4 mb-4 font-weight-medium">Our Green Journey</h2>
          <p class="text-body-1">
            Founded in 2020, GreenForYou began with a bold vision: to accelerate Kenya's transition to renewable energy.
            What started as a small initiative to track solar adoption in Nairobi has grown into a nationwide platform
            mapping clean energy usage across all 47 counties.
          </p>
          <p class="text-body-1 mt-4">
            Our passion for sustainable development and energy independence drives everything we do, from our community
            engagement programs to our innovative energy mapping technology.
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-img
          src="@/assets/green-energy-team.jpg"
          alt="Green energy team in Kenya"
          class="rounded-lg elevation-3"
          height="400"
          cover
        ></v-img>
      </v-col>
    </v-row>

    <!-- Our Mission -->
    <v-row class="my-10">
      <v-col cols="12">
        <h2 class="text-h4 text-center mb-8 font-weight-medium">Our Mission</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%" class="px-4 py-6 text-center elevation-2">
          <v-icon size="x-large" color="green darken-2" class="mb-4">mdi-solar-panel</v-icon>
          <h3 class="text-h5 mb-3">Energy Mapping</h3>
          <p>Track and visualize renewable energy adoption across Kenya to identify opportunities for growth and investment.</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%" class="px-4 py-6 text-center elevation-2">
          <v-icon size="x-large" color="green darken-2" class="mb-4">mdi-account-group</v-icon>
          <h3 class="text-h5 mb-3">Community Empowerment</h3>
          <p>Educate and connect Kenyans with clean energy solutions tailored to their local needs and resources.</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%" class="px-4 py-6 text-center elevation-2">
          <v-icon size="x-large" color="green darken-2" class="mb-4">mdi-chart-line</v-icon>
          <h3 class="text-h5 mb-3">Data-Driven Impact</h3>
          <p>Provide actionable insights to policymakers and investors to accelerate Kenya's renewable energy transition.</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Team Section -->
    <v-row class="my-10">
      <v-col cols="12">
        <h2 class="text-h4 text-center mb-8 font-weight-medium">Our Green Team</h2>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="text-center elevation-2">
          <v-img src="@/assets/team/james-mwangi.jpg" height="250" cover></v-img>
          <v-card-title class="justify-center">James Mwangi</v-card-title>
          <v-card-subtitle>Founder & CEO</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="text-center elevation-2">
          <v-img src="@/assets/team/wanjiru-kamau.jpg" height="250" cover></v-img>
          <v-card-title class="justify-center">Wanjiru Kamau</v-card-title>
          <v-card-subtitle>Energy Specialist</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="text-center elevation-2">
          <v-img src="@/assets/team/olivia-akinyi.jpg" height="250" cover></v-img>
          <v-card-title class="justify-center">Olivia Akinyi</v-card-title>
          <v-card-subtitle>Community Coordinator</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="text-center elevation-2">
          <v-img src="@/assets/team/david-otieno.jpg" height="250" cover></v-img>
          <v-card-title class="justify-center">David Otieno</v-card-title>
          <v-card-subtitle>Technology Director</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Achievements -->
    <v-row class="my-10 achievements-section py-6">
      <v-col cols="12">
        <h2 class="text-h4 text-center mb-8 font-weight-medium">Our Impact</h2>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">47</span>
        </div>
        <h3 class="mb-2">Counties Mapped</h3>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">10K+</span>
        </div>
        <h3 class="mb-2">Households Registered</h3>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">85%</span>
        </div>
        <h3 class="mb-2">Solar Adoption</h3>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">4.9</span>
        </div>
        <h3 class="mb-2">User Satisfaction</h3>
      </v-col>
    </v-row>

    <!-- Partners -->
    <v-row class="my-10">
      <v-col cols="12">
        <h2 class="text-h4 text-center mb-8 font-weight-medium">Our Partners</h2>
      </v-col>
      <v-col cols="6" sm="4" md="2" v-for="n in 6" :key="n">
        <v-card flat class="pa-4 d-flex align-center justify-center" height="120">
          <v-img :src="`@/assets/partners/partner-${n}.png`" contain max-height="80"></v-img>
        </v-card>
      </v-col>
    </v-row>

    <!-- CTA Section -->
    <v-row class="mt-12 mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h4 mb-4">Join Kenya's Clean Energy Movement</h2>
        <p class="mb-6 text-body-1">Register your household or learn how you can contribute to our mission.</p>
        <v-btn
          color="green darken-1"
          size="large"
          class="white--text mr-4"
          to="/register"
        >
          Register Now
        </v-btn>
        <v-btn
          color="green lighten-4"
          size="large"
          class="green--text text--darken-2"
          to="/contact"
          outlined
        >
          Contact Us
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// No additional setup logic needed
</script>

<style scoped>
.about-us {
  padding-top: 2rem;
  padding-bottom: 4rem;
  max-width: 1200px;
}

.achievements-section {
  background-color: #f0f9f0;
  border-radius: 8px;
}

.stat-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(0, 150, 136, 0.1);
  border: 2px solid #009688;
  color: #009688;
}

.hero-section p {
  line-height: 1.8;
  font-size: 1.1rem;
}

.v-card {
  transition: transform 0.3s ease;
}

.v-card:hover {
  transform: translateY(-5px);
}
</style>