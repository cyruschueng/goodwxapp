
const util = require('../../utils/util.js');
const bus = require('../../utils/bus.js');
const animate = require('../../utils/animate.js');
const api = require('../../services/api.js');

Component({
  data: {
    success: false,
    subjectTitle: '',
    subjectThumbUrl: '',
    visible: false,
    marginTop: 0,
    animate: null
  },
  methods: {
    show: function (success, title, url) {

      this.setData({
        success: success,
        subjectTitle: '《' + title +'》', 
        subjectThumbUrl: url,
        visible: true,
        marginTop: Math.floor((bus.system.windowHeight - 190 - (bus.system.windowWidth * 0.45))) / 2
      });
      this.selectComponent('#television').show(.5);

      util.setData(this, "animate", animate.modal.ready());
      util.setData(this, "animate", animate.modal.fadeIn(), 100);
    },
    _continue: function () {

      var _this = this;

      this.close(function () {

        _this.triggerEvent('_continue');
      });
    },
    reload: function(){

      var _this = this;

      this.close(function(){

        _this.triggerEvent('reload');
      });
    },
    close: function (callback) {

      this.setData({
        animate: animate.modal.fadeOut()
      });

      util.setData(this, "visible", false, 360);
      setTimeout(callback, 360);
    }
  }
})