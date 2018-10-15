<template>
  <b-navbar toggleable="md" type="dark" variant="primary" :sticky=true>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand :to="{ name: 'home' }">NavBar</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'home' }" exact>Home</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item class="float-right" v-show="!isLogged" :to="{ name: 'auth' }">Login</b-nav-item>
        <b-nav-item-dropdown text="Account" right v-show="isLogged">
          <b-dropdown-item href="#" @click.prevent="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { logout } from '@/auth';

export default {
  name: 'MainNavbar',
  methods: {
    logout() {
      logout();
      this.setIsLogged(false);
      this.$router.push({ name: 'auth' });
    },
    ...mapActions([
      'setIsLogged',
    ]),
  },
  computed: {
    ...mapGetters([
      'isLogged',
    ]),
  },
};
</script>
