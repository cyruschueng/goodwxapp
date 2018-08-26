import Vue from 'vue';
import store from './store';

import Share from './share.vue';

const app = new Vue({
  el: '#share',
  template: '<Share/>',
  store,
  components: { Share }
});