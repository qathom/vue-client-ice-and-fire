// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import store from '@/store';

// plugins
import '@/plugins/vuex';
import '@/plugins/router';
import '@/plugins/bootstrap-vue';
import '@/plugins/progress';
import '@/plugins/icons';

import router from '@/router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
