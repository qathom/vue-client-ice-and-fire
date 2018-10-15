import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';

const options = {
  color: '#6610f2',
  failedColor: '#874b4b',
  thickness: '5px',
  location: 'top',
};

Vue.use(VueProgressBar, options);
