import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';

const options = {
  color: '#34495e',
  failedColor: '#e74c3c',
  thickness: '5px',
  location: 'top',
};

Vue.use(VueProgressBar, options);
