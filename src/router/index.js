import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import TestPage from '../views/TestPage.vue'
import ContactUsView from '../views/ContactUsView.vue'
import LoginPage from '../views/LoginPage.vue'
import SignUpPage from '../views/SignUp.vue'
import WelcomePage from '../views/WelcomePage.vue'
import LocationPage from '../views/LocationPage.vue'
import EnergyMap from '../views/EnergyMap.vue'
import Submitdata from '@/views/SubmitData.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import Services from '../views/Services.vue'

// Dummy authentication function (replace with your actual authentication logic)
const isAuthenticated = () => {
  return localStorage.getItem('user') !== null; // Adjust according to your auth flow
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutView
    },
    {
      path: '/test',
      name: 'TestPage',
      component: TestPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/sign-up',
      name: 'SignUpPage',
      component: SignUpPage
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: ContactUsView
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomePage
    },
    {
      path: '/location',
      name: 'Location',
      component: LocationPage
    },
    {
      path: '/submit-data',
      name: 'submit-data',
      component: Submitdata,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next();
        } else {
          next('/login'); // Redirect to login if not authenticated
        }
      }
    },
    {
      path: '/energy_map',
      name: 'energy_map',
      component: EnergyMap
    },
    {
      path: '/services',
      name: 'Services',
      component: Services
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    }
  ]
})

export default router
