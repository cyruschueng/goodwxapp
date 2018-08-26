import Vue from 'vue';
import Share from './share.vue';
import store from './store';

const app = new Vue({
  el: '#share',
  template: '<Share/>',
  store,
  components: { Share }
});