<template>
  <v-container class="profile-page-container">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6" elevation="4">
          <v-card-title class="text-center green--text text--darken-2 mb-6">
            <h2 class="text-h4">My Profile</h2>
          </v-card-title>

          <v-alert v-if="!authStore.user" type="error" class="mb-4">
            No user data available. Please log in again.
          </v-alert>

          <v-card-text v-else>
            <v-list dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green darken-2">mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ authStore.user.name }}</v-list-item-title>
                  <v-list-item-subtitle>Name</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green darken-2">mdi-email</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ authStore.user.email }}</v-list-item-title>
                  <v-list-item-subtitle>Email</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green darken-2">mdi-calendar</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ formattedJoinDate }}</v-list-item-title>
                  <v-list-item-subtitle>Joined On</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-btn
              color="green darken-2"
              dark
              block
              large
              class="mt-6"
              @click="logout"
            >
              <v-icon left>mdi-logout</v-icon>
              Logout
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'ProfilePage',
  setup() {
    const authStore = useAuthStore();

    function logout() {
      authStore.logout();
      // After logout, go to login page
      window.location.href = '/login'; // or use router push if you prefer
      // this.$router.push('/login'); // if you import router
    }

    function formattedJoinDate() {
      if (!authStore.user || !authStore.user.created_at) return 'N/A';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(authStore.user.created_at).toLocaleDateString(undefined, options);
    }

    return {
      authStore,
      logout,
      formattedJoinDate
    }
  }
}
</script>

<style scoped>
.profile-page-container {
  max-width: 800px;
  margin: 0 auto;
}
.v-card {
  border-radius: 12px;
}
</style>
