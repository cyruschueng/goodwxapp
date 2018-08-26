
const util = require('../../utils/util.js');
const bus = require('../../utils/bus.js');
const animate = require('../../utils/animate.js');
const api = require('../../services/api.js');

Component({
  data: {
    top: 0,
    coins: 300,
    visible: false,
    animate: null
  },
  methods: {
    show: function (coins) {

      this.setData({
        top: Math.floor((bus.system.windowHeight - 380) / 2),
        coins: coins,
        visible: true
      });

      util.setData(this, "animate", animate.modal.ready());
      util.setData(this, "animate", animate.modal.fadeIn(), 100);
    },
    close: function(){

      this.setData({
        animate: animate.modal.fadeOut()
      });

      util.setData(this, "visible", false, 360);
    }
  }
})