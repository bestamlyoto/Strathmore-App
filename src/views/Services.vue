<template>
  <v-container class="py-12">
    <v-row justify="center" class="mb-10">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="text-h3 font-weight-bold">Our Services</h1>
        <p class="text-subtitle-1 mt-2">
          At GreenForYou (GFY), we empower individuals and communities to embrace clean energy and sustainability.
        </p>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" sm="6" md="4" class="mb-6" v-for="(service, index) in services" :key="index">
        <v-card class="elevation-3 pa-5" rounded="2xl">
          <v-icon size="48" color="green darken-2" class="mb-3">{{ service.icon }}</v-icon>
          <h3 class="text-h6 font-weight-bold">{{ service.title }}</h3>
          <p class="text-body-2 mt-2">{{ service.description }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Services",
  data() {
    return {
      services: [
        {
          title: "Green Project Submission",
          description: "Submit data from your sustainability initiatives and contribute to a cleaner future.",
          icon: "mdi-file-document-edit-outline",
        },
        {
          title: "Clean Energy Insights",
          description: "Visualize and analyze energy trends to make data-driven decisions.",
          icon: "mdi-chart-line",
        },
        {
          title: "Sustainability Dashboard",
          description: "Track environmental impact and progress over time with our interactive dashboard.",
          icon: "mdi-speedometer",
        },
        {
          title: "Educational Resources",
          description: "Access tutorials, guides, and videos on how to implement sustainable practices.",
          icon: "mdi-school-outline",
        },
        {
          title: "Community Support",
          description: "Join forums and groups to connect with other sustainability advocates.",
          icon: "mdi-account-group-outline",
        },
        {
          title: "Partnership Opportunities",
          description: "Collaborate with us on green projects, grants, and awareness campaigns.",
          icon: "mdi-handshake-outline",
        },
      ],
    };
  },
};
</script>

<style scoped>
h1 {
  color: #2e7d32; /* Green primary */
}
</style>
