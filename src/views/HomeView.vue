<template>
  <div class="green-energy-homepage">
    <!-- Hero Section with Fullscreen Background Video -->
    <section class="hero">
      <video
        class="hero-video"
        autoplay
        loop
        muted
        playsinline
      >
        <source src="@/assets/solarvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>


    </section>
    <div class="hero-content">
        <h1>Powering Kenya's Green Future</h1>
        <p>Track, share, and celebrate renewable energy adoption across Kenya</p>
        <router-link to="/sign-up" class="cta-button">Join Our Network</router-link>
      </div>
    <!-- Featured Section -->
    <section class="featured-section">
      <div class="container">
        <h2 class="section-title">Our Energy Solutions</h2>
        <div class="featured-items">
          <div class="featured-item">
            <div class="featured-image">
              <img src="@/assets/solar-panels.jpg" alt="Solar Energy">
            </div>
            <h3>Solar Power</h3>
            <p>Harnessing Kenya's abundant sunshine for clean, affordable energy</p>
          </div>
          <div class="featured-item">
            <div class="featured-image">
              <img src="@/assets/wind-turbines.jpg" alt="Wind Energy">
            </div>
            <h3>Wind Energy</h3>
            <p>Utilizing Kenya's wind corridors for sustainable power generation</p>
          </div>
          <div class="featured-item">
            <div class="featured-image">
              <img src="@/assets/biogas.jpg" alt="Biogas Energy">
            </div>
            <h3>Biogas Systems</h3>
            <p>Converting organic waste into renewable energy for rural communities</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="section-title">Our Mission</h2>
            <p>Founded in 2020, GreenForYou emerged from a vision to accelerate Kenya's transition to renewable energy. Our platform maps clean energy adoption across all 47 counties, creating visibility for sustainable development.</p>
            <p>We partner with households, communities, and policymakers to track progress toward Kenya's Vision 2030 energy goals and the UN Sustainable Development Goals.</p>
            <router-link to="/about" class="secondary-button">Our Story</router-link>
          </div>
          <div class="about-image">
            <img src="@/assets/kenya-map.jpg" alt="Kenya Energy Map">
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title">Community Impact</h2>
        <div class="testimonials">
          <div class="testimonial">
            <div class="stars">★★★★★</div>
            <p class="quote">"GreenForYou helped our village access solar solutions we never thought possible. Our energy costs have dropped by 70%!"</p>
            <p class="author">- James M., Nakuru County</p>
          </div>
          <div class="testimonial">
            <div class="stars">★★★★★</div>
            <p class="quote">"The energy map helped our county secure funding for 500 new solar installations in rural areas."</p>
            <p class="author">- County Energy Officer, Kisumu</p>
          </div>
          <div class="testimonial">
            <div class="stars">★★★★★</div>
            <p class="quote">"Registering my household inspired my neighbors to switch to clean energy too. Together we're making a difference!"</p>
            <p class="author">- Wanjiku K., Machakos</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-container">
          <div class="stat-card">
            <h3>24,817</h3>
            <p>Households Registered</p>
          </div>
          <div class="stat-card">
            <h3>47</h3>
            <p>Counties Mapped</p>
          </div>
          <div class="stat-card">
            <h3>85%</h3>
            <p>Solar Adoption Rate</p>
          </div>
          <div class="stat-card">
            <h3>4.9</h3>
            <p>Average User Rating</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to be part of Kenya's energy revolution?</h2>
          <div class="cta-buttons">
            <router-link to="/sign-up" class="cta-button">Register Your Household</router-link>
            <router-link to="/energy_map" class="secondary-button">Explore Energy Map</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped>
/* Base Styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

/* Hero Section with Fullscreen Video */
.hero {
  position: relative;
  width: 100vw; /* Make sure it spans full width */
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: black; /* fallback */
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 0;
}
.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0.5;
}

.hero-content {
  position: absolute;
  z-index: 1;
  color: white;
  max-width: 90%;
  padding: 0 20px;
  text-align: center;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.cta-button {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  text-decoration: none;
  display: inline-block;
}

.cta-button:hover {
  background-color: #219653;
}

/* Featured Section */
.featured-section {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.featured-items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}

.featured-item {
  flex: 1;
  min-width: 300px;
  text-align: center;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.featured-image {
  height: 250px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.featured-image img:hover {
  transform: scale(1.05);
}

.featured-item h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  padding: 0 1rem;
}

.featured-item p {
  color: #666;
  padding: 0 1rem 1.5rem;
}

/* About Section */
.about-section {
  padding: 5rem 0;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
}

.about-text, .about-image {
  flex: 1;
  min-width: 300px;
}

.about-text p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #555;
}

.about-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.secondary-button {
  background-color: transparent;
  color: #27ae60;
  border: 2px solid #27ae60;
  padding: 10px 25px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
}

.secondary-button:hover {
  background-color: #27ae60;
  color: white;
}

/* Testimonials Section */
.testimonials-section {
  padding: 5rem 0;
  background-color: #f5f5f5;
}

.testimonials {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

.testimonial {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 300px;
  max-width: 400px;
}

.stars {
  color: #f1c40f;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.quote {
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.author {
  font-weight: bold;
  text-align: right;
  color: #27ae60;
}

/* Stats Section */
.stats-section {
  padding: 5rem 0;
  background-color: #27ae60;
  color: white;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}

.stat-card {
  flex: 1;
  text-align: center;
  min-width: 200px;
}

.stat-card h3 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.stat-card p {
  font-size: 1.2rem;
}

/* CTA Section */
.cta-section {
  padding: 5rem 0;
  background-color: #2c3e50;
  color: white;
  text-align: center;
}

.cta-content h2 {
  margin-bottom: 2rem;
  font-size: 2rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  .about-content {
    flex-direction: column;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-buttons a {
    width: 100%;
    text-align: center;
  }
}
</style>
