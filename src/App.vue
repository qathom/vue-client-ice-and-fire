<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <main-navbar />
    <main class="container my-4">
      <router-view/>
    </main>
  </div>
</template>

<script>
import MainNavbar from '@/components/MainNavbar';

export default {
  name: 'App',
  components: {
    MainNavbar,
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress) {
        this.$Progress.start();
      }

      next();
    });

    this.$router.afterEach((to) => {
      if (to.meta.progress) {
        this.$Progress.finish();
      }
    });
  },
};
</script>

<style lang="scss">
  @import './scss/app';
</style>
