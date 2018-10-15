<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="emailInputGroup"
                    label="Email address:"
                    label-for="emailInput">
        <b-form-input id="emailInput"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="passwordInputGroup"
                    label="Password:"
                    label-for="passwordInput">
        <b-form-input id="passwordInput"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>

      <b-alert variant="danger"
              dismissible
              :show="error"
              fade
              @dismissed="error=false">
        The username and password you specified are invalid.
      </b-alert>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import { login } from '@/auth';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Auth',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: false,
    };
  },
  created() {
    if (this.isLogged) {
      this.$router.push({ name: 'home' });
    }
  },
  methods: {
    onSubmit() {
      const logged = login(this.form.email, this.form.password);
      this.error = !logged;

      if (logged) {
        this.setIsLogged(true);
        this.$router.push({ name: 'home' });
      }
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
