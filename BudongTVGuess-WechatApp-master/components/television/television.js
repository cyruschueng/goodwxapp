
const util = require('../../utils/util.js');
const bus = require('../../utils/bus.js');

Component({
  data: {
    outerWidth: 0,
    antennaWidth: 0,
    buttonWidth: 0,
    buttonSize: 0,
    screenWidth: 0,
    screenMargin: 0,
    height: 0
  },
  methods: {
    show: function(width){
      
      if (width) {
        if (width < 1){
          width = Math.floor(bus.system.windowWidth * width);
        }
      }else{
        width = Math.floor(bus.system.windowWidth * 0.6);
      }
      this.setData({
        outerWidth: width,
        antennaWidth: Math.floor(width * 0.25),
        buttonSize: Math.floor((width * .2) * .4),
        buttonWidth: Math.floor(width * .2),
        buttonMargin: Math.floor(width * .06),
        screenHeight: Math.floor(width * 0.6),
        screenMargin: Math.floor(width * .06)
      });
    }
  }
})