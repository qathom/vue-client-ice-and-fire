import Vue from 'vue';
import Auth from '@/containers/Auth';
import { login } from '@/auth';
import users from '@/auth/users';

import '@/plugins/bootstrap-vue';

describe('Auth.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Auth);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#emailInputGroup'))
      .toBeDefined();
    expect(vm.$el.querySelector('#emailInput'))
      .toBeDefined();
    expect(vm.$el.querySelector('#passwordInputGroup'))
      .toBeDefined();
    expect(vm.$el.querySelector('#passwordInput'))
      .toBeDefined();
  });

  it('should not log the user', () => {
    expect(login('random', 'random')).toBe(false);
  });

  it('should log the user', () => {
    const user = users[0];
    expect(login(user.email, user.password)).toBe(true);
  });
});
