
const util = require('../../utils/util.js');
const animate = require('../../utils/animate.js');

Component({
  data: {
    'visible': false,
    'animation': null
  },
  methods: {
    show: function (content, cssName) {

      this.setData({
        visible: true,
        content: content,
        cssName: cssName
      });
      
      util.setData(this, 'animation', animate.toast.ready(), 0);
      util.setData(this, 'animation', animate.toast.fadeIn(), 100);
      util.setData(this, 'animation', animate.toast.fadeOut(), 600);
      util.setData(this, 'visible', false, 1400);
    }
  }
})